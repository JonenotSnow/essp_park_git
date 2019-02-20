<template>

    <div>

        <el-dialog :visible.sync="centerDialogVisible"
                   width="720px"
                   center
                   :before-close="setVisible">
            <div class="tabletit">
                <h3>推荐标签</h3>
                <p class="title_p">请添加合适该项目的标签，可多选，同一标签不能重复</p>
            </div>

            <div class="tagstore">
                <el-button :key="tag"
                           v-for="tag in tagStores"
                           size="small"
                           @click="handleInputTag(tag)">
                    {{tag}}
                </el-button>
            </div>
            <div class="taginput">
                <el-tag :key="index"
                        v-for="(tag,index) in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-tooltip v-if="inputVisible"
                            :disabled="isValid"
                            effect="dark"
                            content="不能添加重复标签"
                            placement="top">
                    <el-input class="input-new-tag"
                              v-model="inputValue"
                              ref="saveTagInput"
                              size="small"
                              maxlength=6
                              @keyup.enter.native="handleInputConfirm"
                              @blur="handleInputConfirm">
                    </el-input>
                </el-tooltip>
                <el-button v-else
                           class="button-new-tag"
                           size="small"
                           @click="showInput">+ 新标签
                </el-button>
            </div>
            <span slot="footer"
                  class="dialog-footer">
        <el-button @click="setVisible()">取 消</el-button>
        <el-button type="primary"
                   @click="setVisible()">确 定</el-button>
      </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        props: {
            centerDialogVisible: {
                type: Boolean,
                required: true
            },
            tagprops: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: "",
                isValid: true,
                tagStores: [],
                gdArr: []
            };
        },
        methods: {
            handleClose(tag) {
                let index = this.dynamicTags.indexOf(tag);
                //onsole.log(this.gdArr);
                var isTrue = this.isUpPush(tag, this.gdArr);
                if (index > -1) {
                    this.dynamicTags.splice(index, 1);
                }
                index = this.tagStores.indexOf(tag);
                if (isTrue && index === -1) {
                    this.tagStores.push(tag);
                }
            },
            isUpPush(val, arr) {
                var isT = false;
                arr.forEach((item, index) => {
                    if (item == val) {
                        isT = true;
                        return;
                    }
                })
                return isT;
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                console.log(inputValue);
                this.isValid = true;
                if (inputValue) {
                    if (this.dynamicTags.indexOf(inputValue) === -1) {
                        this.dynamicTags.push(inputValue);
                        this.inputVisible = false;
                        this.inputValue = "";
                    } else {
                        this.isValid = false;
                    }
                } else {
                    this.inputVisible = false;
                    this.inputValue = "";
                }
            },
            handleInputTag(tag) {
                if (this.dynamicTags.indexOf(tag) === -1) {
                    this.dynamicTags.push(tag);
                }
                this.tagStores.splice(this.tagStores.indexOf(tag), 1);
            },
            setVisible() {
                this.$emit("showtag", {viewtags: this.dynamicTags});
            },
            removeExistRecomTags() {

                // 从推荐标签中移除已添加标签，防止推荐标签、已添加标签中出现同内容标签
                this.tagStores = this.tagStores.filter(
                    o => this.dynamicTags.indexOf(o) === -1
                );
                console.log(this.tagStores);

            },
            findRecomTags() {
                this.tagStores = [];
                this.$post(this.$apiUrl.common.findRecomTags, {
                    lblTpCd: this.tagprops.lblTpCd
                }).then(response => {
                    if (
                        // (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") &&
                        response.resultData["lblInfo"]
                    ) {
                        let lblInfo = response.resultData.lblInfo;
                        // 去除已添加项
                        if (lblInfo && lblInfo.length > 0) {
                            // -
                            for (let i = 0; i < lblInfo.length; i++) {
                                this.tagStores.push(lblInfo[i].lblTxt);
                            }
                            this.gdArr = JSON.parse(JSON.stringify(this.tagStores));
                            console.log("====",this.gdArr);
                            console.log("dd====",this.tagStores);
                            console.log(this.dynamicTags);
                            // 从推荐标签中移除已添加标签，防止推荐标签、已添加标签中出现同内容标签
                            this.removeExistRecomTags();
                        }
                    }
                });
            },
            findEntityTag() {
                this.dynamicTags = [];
                if (this.tagprops.entId != "") {
                    this.$post(this.$apiUrl.common.findEntityTag, {
                        entId: this.tagprops.entId
                    }).then(response => {
                        if (
                            // (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") &&
                            response.resultData["lblInfo"]
                        ) {
                            let lblInfo = response.resultData.lblInfo;
                            for (let i = 0; i < lblInfo.length; i++) {
                                this.dynamicTags.push(lblInfo[i].lblTxt);
                            }
                            console.log("this.dynamicTags:;",this.dynamicTags);
                            // 从推荐标签中移除已添加标签，防止推荐标签、已添加标签中出现同内容标签
                            this.removeExistRecomTags();
                        }
                    });
                } else {
                    this.dynamicTags = [];
                }
            }
        },
        created() {
            //获取推荐标签
            if (!this.tagprops.getTpCd && this.tagprops.lblTpCd) {
                this.findRecomTags();
            }
            console.log("this.tagprops.entId==",this.tagprops.entId);
            if (this.tagprops.entId) {
                this.findEntityTag();
            }
        },
        watch: {
            "tagprops.lblTpCd": {
                handler(newValue, oldValue) {
                    this.findRecomTags();
                },
                deep: true
            },
            "tagprops.entId": {
                handler(newValue, oldValue) {
                    this.findEntityTag();
                },
                deep: true
            }
        }
    };
</script>

<style lang='less' scoped>
    .el-tag {
        margin-left: 10px;
        margin-top: 10px;
        height: auto;
        white-space: normal;
    }

    .button-new-tag {
        margin-left: 10px;
        margin-top: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 20px;
        margin-top: 10px;

        /*vertical-align: bottom;width: 90px;*/
    }

    .tagstore {
        /*margin: 20px 30px;*/
        margin: 20px 0;
        .el-button {
            margin-top: 10px;
        }
    }

    .taginput {
        border: 1px solid #ccc;
        background: #fff;
        margin-top: 10px;
        /*padding-bottom: 10px;*/
        /*margin-left: 30px;*/
        /*width: 660px;*/
        min-height: 130px;
    }

    .tabletit {
        /*padding-top: 20px;*/
        text-align: center;
        border-bottom: 1px solid #ccc;
        h3 {
            font-size: 20px;
            /*padding: 0 4px 4px;*/
            padding: 5px;
            color: #333333;
            font-weight: normal;
        }
    }

    .title_p {
        margin: 10px 0 20px 0 ;
        color: #999999;
    }
</style>
