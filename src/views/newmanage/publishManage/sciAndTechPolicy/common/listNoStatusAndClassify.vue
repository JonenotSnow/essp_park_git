<template>
    <div>
        <!-- 列表没有状态和类型 草稿箱-->
        <div v-if="list.length>0">
            <div class="selectTitle">
                <el-checkbox v-model="allCheck" @change="changeAllChecked">全选</el-checkbox>
                共<span class="total">{{totalCount}}</span>条，
                已选<span class="total">{{selectCheckItem.length}}</span>条
                <span class="removeBtn" @click.stop="showDialog()">删除</span>
            </div>
            <ul class="listWrap">
                <li class="list" v-for="(item, index) in list" :key="index">
                    <div class="ListTop">
                        <el-checkbox v-model="item.isChecked" @change="changeChecked(item,index)">备选项</el-checkbox>
                        <span class="time">保存时间：{{item.createTime | timerFormat(item.createTime)}}</span>
                        <span class="create">发布人：{{item.userName}}</span>
                        <i class="el-icon-delete remove" @click="showDialog(item.id)"></i>
                    </div>
                    <div class="listBottom">
                        <div class="contentTitle">
                            {{item.policyTitle}}
                        </div>
                        <div class='editorBtn2'>
                            <!--// 业务更换，不需要这个按钮了-->
                            <!--<span>发布</span>-->
                            <span @click.stop="linkToPublish(item.id)">编辑</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="noData" v-if="list.length == 0 && requestTip == '数据加载中...'">
            <p>{{requestTip}}</p>
        </div>
        <div class="noData" v-if="list.length == 0 && requestTip == '数据加载完毕'">
            <span>尚未发布成果，点击右上方发布按钮立即发布吧！</span>
            <img src="@assets/newparkimg/newmanage/achievementSet/no_list.png" alt="">
        </div>

        <!-- 删除事件对话框start -->
        <el-dialog
            class="quguanbox"
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <div>
                <i class="icon iconfont icon-tishi"></i><span class="quguan">是否删除该信息</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dealWithDelete">确 认</el-button>
            </span>
        </el-dialog>
        <!-- 删除事件对话框end -->
    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        props: {
            list: {
                type: Array,
                default: []
            },
            type: {
                type: String,
                default: ''
            },
            totalCount: {
                type: String,
                default: '0'
            },
            requestTip: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                pageNum: 1,
                pageSize: 10,

                // 选中事件---删除事件相关字段
                dialogVisible: false,
                deleteId: '',
                allCheck: false,
                selectCheckItem: [],  // 已选择项
            }
        },
        created() {
        },
        methods: {
            /**
             * 删除操作相关事件---开始
             * @param followId
             * @param index
             */
            // 弹窗
            showDialog(deleteId) {

                this.dialogVisible = true;

                if (deleteId) {
                    // 删除单个
                    this.deleteId = deleteId;
                } else {
                    // 全部删除
                    let selectCheckList = [];
                    let selectCheckIds = "";
                    // 获取id
                    for (let i = 0; i < this.selectCheckItem.length; i++) {
                        selectCheckList[i] = this.selectCheckItem[i].id;
                    }
                    selectCheckIds = selectCheckList.join(',');
                    this.deleteId = selectCheckIds;
                }

            },
            dealWithDelete() {
                let params = {
                    ids: this.deleteId
                };
                this.$post('/policy/delBatchPol', params).then(response => {
                    var codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.dialogVisible = false;
                        this.$message.success(response.resultMsg);

                        // 通知父组件，重新获取数据
                        this.$emit("childDeleted", this.type);
                    } else {
                        this.$message.error(response.resultMsg);
                    }
                }, err => {
                    this.$message.error(err.resultMsg);
                });
            },
            /**
             * 删除操作相关事件---结束
             */

            // 跳转编辑【发布】页面
            linkToPublish(id) {
                this.$router.push({
                    path: '/parkHall/manage/publishSciAndTechPolicy',
                    query: {
                        applyType: '01',
                        id: id
                    }
                });
            },

            /**
             *  单选/全选相关事件
             */
            // 全选选择项
            changeAllChecked() {
                this.selectCheckItem = [];

                this.list.forEach((item, index) => {
                    item.isChecked = this.allCheck;
                    if (this.allCheck) {
                        this.selectCheckItem.push(item);
                    }
                });
            },
            // 列表选择项
            changeChecked(item, index) {
                if (item.isChecked) {
                    this.selectCheckItem.push(item);
                    if (this.selectCheckItem.length == this.list.length) {
                        this.allCheck = true;
                    }
                } else {
                    if (this.selectCheckItem.length) {
                        var index = this.selectCheckItem.indexOf(item);
                        if (index > -1) {
                            this.selectCheckItem.splice(index, 1)
                        }
                    }
                }
            },
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style lang='less' scoped>
    .selectTitle, .listWrap {
        width: 910px;
        margin: 0 auto;
    }

    .selectTitle {
        margin: 15px auto 19px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0px;
        color: #666666;
        .all {
            i {
                margin-right: 6px;
            }
        }
        .total {
            font-size: 14px;
            font-weight: normal;
            letter-spacing: 0px;
            color: #00a0e9;
        }
        .removeBtn {
            display: inline-block;
            width: 48px;
            height: 28px;
            background-image: linear-gradient(0deg,
            #f5f5f5 0%,
            #ffffff 100%);
            border-radius: 5px;
            border: solid 1px #cccccc;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #666666;
            text-align: center;
            cursor: pointer;
            margin-left: 14px;
        }
    }

    .listWrap {
        // width: 910px;
        // margin: 0 auto;
        .list {
            margin-bottom: 20px;
            border: solid 1px #cccccc;
            .ListTop, .ListTopStatus {
                height: 40px;
                width: 876px;
                background-color: #f5f5f5;
                padding: 0 16px;
                line-height: 40px;
                margin: 0 auto;
                overflow: hidden;
                .time {
                    display: inline-block;
                    width: 230px;
                    margin-left: 8px;
                }
                .create {
                    display: inline-block;
                    width: 120px;
                    margin-left: 50px;
                }
                .classifyC {
                    display: inline-block;
                    width: 150px;
                    margin-left: 100px;
                    span {
                        color: #10b5ff;
                    }
                }
                .remove {
                    float: right;
                    margin-top: 13px;
                    color: #999;
                    cursor: pointer;
                }
            }
            .ListTopStatus {
                .create {
                    display: inline-block;
                    width: 120px;
                    margin-left: 50px;
                }
                .classify {
                    display: inline-block;
                    width: 150px;
                    span {
                        color: #10b5ff;
                    }
                }
                .classifyA {
                    margin-left: 42px;
                }
                .classifyB {
                    margin-left: 62px;
                }
            }
            .listBottom {
                height: 60px;
                width: 840px;
                margin: 0 auto;
                padding: 0 40px 0 29px;
                overflow: hidden;
                .contentTitle {
                    float: left;
                    width: 500px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    line-height: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .editorBtn1 {
                    float: right;
                    margin-right: 5px;
                    width: 106px;
                    margin-top: 46px;
                    span {
                        display: inline-block;
                        width: 80px;
                        height: 28px;
                        background-color: #10b5ff;
                        border-radius: 14px;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #fefefe;
                        text-align: center;
                        line-height: 28px;
                        cursor: pointer;
                    }
                }
                .editorBtn2 {
                    float: right;
                    margin-top: 16px;
                    width: 180px;
                    text-align: right;
                    span {
                        display: inline-block;
                        width: 80px;
                        height: 28px;
                        background-color: #10b5ff;
                        border-radius: 14px;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #fefefe;
                        text-align: center;
                        line-height: 28px;
                        cursor: pointer;
                        &:nth-of-type(2) {
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
    }

    .noData {
        position: relative;
        margin: 57px 137px 238px 237px;
        text-align: center;
        span {
            position: absolute;
            top: 90px;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
        }
    }

    .pageList {
        width: 910px;
        margin: 45px auto 57px;
        text-align: right;
        padding-bottom: 57px;
    }
</style>
