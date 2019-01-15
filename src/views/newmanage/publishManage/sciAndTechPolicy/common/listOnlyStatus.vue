<template>
    <div>
        <!-- 列表只有类型 已发布、已审核-->
        <div v-if="list.length>0">
            <div class="selectTitle">
                <span class="all">
                    <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="selectAll"
                        @change="handleSelectAll"
                    >全选</el-checkbox>
                </span>
                共<span class="total">{{list.length}}</span>条，
                已选<span class="total">{{hascheckedNum}}</span>条
                <span class="removeBtn" @click.stop="showDialog()">删除</span>
                <span class="selectStatus">状态：

                    <select v-model="status" v-if="type == 1" @change="switchStatus()">
                        <option value="">全部</option>
                        <option value="12">审核不通过</option>
                        <option value="13">待审核</option>
                        <option value="02">审核通过</option>
                    </select>

                    <select v-model="status" v-if="type == 2" @change="switchStatus()">
                        <option value="">全部</option>
                        <option value="12">审核不通过</option>
                        <option value="02">审核通过</option>
                    </select>
                </span>
            </div>
            <ul class="listWrap">
                <li class="list" v-for="(item, index) in list" :key="index">
                    <div class="ListTop">
                        <el-checkbox name="selectOne" v-model="checkedIds" :checked="checkedStatus"
                                     @change="selectOrUnSelect()"/>
                        <span class="time">保存时间：{{item.createTimeitem | timerFormat(item.createTime)}}</span>
                        <span class="create">发布人：{{item.userName}}</span>
                        <span class="classifyC">状态：
                            <span v-if="item.status == '02'">审核通过</span>
                            <span v-if="item.status == '13'">待审核</span>
                            <span v-if="item.status == '12'">审核不通过</span>
                        </span>
                        <i class="el-icon-delete remove" @click="showDialog(item.id)"></i>
                    </div>
                    <div class="listBottom">
                        <div class="contentTitle">
                            {{item.policyTitle}}
                        </div>
                        <div class='editorBtn2' v-if="type == 2">
                            <span @click.stop="linkToDetail(item.id)">查看</span>
                            <span @click.stop="linkToPublish(item.id)">编辑</span>
                        </div>
                        <div class='editorBtn1' v-if="type == 1">
                            <span @click.stop="linkToPublish(item.id)">编辑</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else class="noData">
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
                default: '0'
            }
        },
        data() {
            return {
                totalCount: 3,
                pageNum: 1,
                pageSize: 10,
                checkedIds: [],//选择的资源
                selectedCount: 15,      // 已选择条数
                status: '',             // 状态

                // 删除事件相关字段
                dialogVisible: false,
                deleteId: '',
                allSelectDelete: [],

                // 选中事件相关字段
                checkedStatus: false,
                selectAll: [],
                isIndeterminate: true
            }
        },
        created() {
        },
        methods: {
            /**
             *  状态切换事件
             * */
            switchStatus() {
                this.$emit('childSwitchStatus', this.status);
            },

            /**
             * 删除操作相关事件---开始
             * @param followId
             * @param index
             */
            // 弹窗
            showDialog(deleteId) {

                this.dialogVisible = true;

                // 删除单个
                if (deleteId) {
                    this.deleteId = deleteId;
                    return false;
                }

                // 全部删除
                let allSelectDelete = this.allSelectDelete.join(',');
                this.deleteId = allSelectDelete;

            },
            dealWithDelete() {
                let params = {
                    id: this.deleteId
                };
                this.$post('/policy/delBatchPol', params).then(response => {
                    var codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.dialogVisible = false;
                        this.$message.success(response.resultMsg);

                        // 通知父组件，重新获取数据
                        this.$emit("childDeleted", {});

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

            // 跳转发布详情页面
            linkToDetail(id) {
                this.$router.push({
                    path: '/parkHall/manage/sciAndTechPolicyAuditDetail',
                    query: {
                        applyType: '01',
                        id: id
                    }
                });
            },


            /**
             *  单选/全选相关事件
             */
            // 全选按钮事件
            handleSelectAll() {
                this.checkedIds = val ? this.allListIds : [];
                this.isIndeterminate = false;
            },
            //全选
            AllChange(val) {
                this.checkedIds = val ? this.allListIds : [];
                this.isIndeterminate = false;
            },
            // 单选按钮事件
            selectOrUnSelect(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.allListIds.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.allListIds.length;//有选择但不是全部
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        computed: {
            //已选数量
            hascheckedNum() {
                return this.checkedIds.length;
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
        .selectStatus {
            margin-left: 14px;
            select {
                width: 100px;
                height: 30px;
                border-radius: 3px;
                border: solid 1px #cccccc;
                outline: none;
                padding: 0 10px;
            }
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
                line-height: 25px;
                margin: 0 auto;
                overflow: hidden;
                .time {
                    display: inline-block;
                    width: 230px;
                    margin-left: 8px;
                }
                .create, .classifyC {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: relative;
                    top: 7px;
                }
                .create {
                    display: inline-block;
                    width: 100px;
                    margin-left: 50px;
                }
                .classifyC {
                    display: inline-block;
                    // width:150px;
                    margin-left: 42px;
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
                    margin-top: 16px;
                    width: 106px;
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
                    }
                }
                .editorBtn2 {
                    float: right;
                    width: 180px;
                    margin-top: 16px;
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
