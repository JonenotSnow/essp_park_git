<template>
    <div class="checkcon">
        <!-- 活动审核 -->
        <div class="themeTit">
            <span class="borderone"></span>
            <span class="bordertwo"></span>
            <span class="tittext">活动发布审核</span>
        </div>
        <div class="toolcon auditing_con_menu">
            <div class="esspclearfix tsdiv">
                <div class="tdcon">
                    <span class="inlinespan">活动主题：</span>
                    <el-input class="inlineinput" v-model="model1" placeholder=""></el-input>
                </div>
                <div class="tdcon">
                    <span class="inlinespan">发布人：</span>
                    <el-input class="inlineinput inlineinput1" v-model="model2" placeholder=""></el-input>
                </div>
            </div>
            <div class="timetools">
                <span class="inlinespan">提交日期：</span>
                <el-date-picker v-model="model3" type="daterange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="btntools">
                <el-button class="" type="primary" @click="queryList()">查询</el-button>
                <el-button class="" type="info" @click="reSet()">重置</el-button>
            </div>
        </div>
        <div class="auditcon">
            <el-table :data="auditconData" v-loading="auditingLoading"
                      style="border:1px solid #eee;font-weight:normal;width: 100%">
                <el-table-column align="center" prop="index" label="序号" width="85">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="activityTheme" label="活动主题" width="185">
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="initiatorTime" label="提交时间" width="160">
                    <template slot-scope="scope">
                        {{scope.row.initiatorTime | timerFormat(scope.row.initiatorTime)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="initiatorName" label="发布人" width="115">
                </el-table-column>
                <el-table-column align="center" prop="initiatorPhone" label="联系手机" width="130">
                    <template slot-scope="scope">
                        {{scope.row.initiatorPhone || "—"}}
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="status" label="发布状态" width="120">
                    <template slot-scope="scope">
                        {{scope.row.status | statusCn(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" class="status_button" v-if="scope.row.status=='10'||scope.row.status=='03'||scope.row.status=='02'||scope.row.status=='12'" @click="tolink(scope.row,'01')">查看</el-button>
                        <el-button type="text" class="status_button" v-else @click="tolink(scope.row,'03')">
                            审核
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页部分 -->
        <div class="pageList">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPageNum" layout="total, prev, pager, next, jumper" :total="allTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        data() {
            return {
                currentPageNum: 1, //当前页
                pageSize: 10, //每页的记录数
                activityListSize: 0,
                allTotal: 0,
                auditingLoading: true,
                model1: "",
                model2: "",
                model3: "",
                auditconData: [],
                timeStart: "",
                timeEnd: "",
                userId:''
            };
        },
        created() {
            this.userId = this.SSH.getItem('userInfo').id;
            this.queryList();
        },
        methods: {
            tolink(row,opMark) {
                //var draftId = scope.row.draftId
//                if(row.status == '10' || row.status == '03' ) {
//                    return;
//                }
                var opMark = opMark || "03";
                this.$router.push({
                    path: "/parkHall/manage/manageActivityAudit",
                    query: {
                        id: row.activityId,
                        opMark: opMark
                    }
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryList();
            },
            handleCurrentChange(val) {
                this.currentPageNum = val;
                this.queryList();
            },
            /**==========查询列表=============****/
            queryList() {
                var currentPageNum = this.currentPageNum;
                if (this.model3.length == 2) {
                    this.timeStart = Moment(this.model3[0]).format("YYYY-MM-DD");
                    this.timeEnd = Moment(this.model3[1]).format("YYYY-MM-DD");
                }
                this.$post(this.$apiUrl.active.auditList, {
                    pageNum: this.currentPageNum,
                    pageSize: this.pageSize,
                    parkId: window.sessionStorage.getItem("parkId"),
                    activityTheme: this.model1, //活动主题
                    initiatorName: this.model2, //发布人
                    timeStart: this.timeStart, //提交起始时间
                    timeEnd: this.timeEnd //提交结束时间
                }).then(
                    response => {
                        this.auditingLoading = false;
                        this.auditconData = response.resultData.list;
                        this.allTotal = response.resultData.activityList;
                    },
                    err => {
                        this.auditingLoading = false;
                        this.$message.error(err.resultMsg);
                    }
                );
            },

            /**
             * 重置查询条件
             * model1 资讯标题
             * model2 发布人
             * model3 提交时间
             */
            reSet() {
                this.model1 = ""; //资讯标题
                this.model2 = ""; //发布人
                this.model3 = ""; //提交时间
            }
        },
        computed: {},
        components: {},
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
            },
            statusCn(value) {
                const statuMap = {
                    "0":"起草中",//起草中
                    "01": "园区审核中", //园区审核中
                    "02": "园区审核通过", //园区审核通过
                    "03": "审核不通过", //企业管理员审核拒绝
                    "05": "企业审核中", //报名审核中
                    "10": "企业审核通过", //企业审核通过
                    "11": "已邀请待回复", //已邀请待回复
                    "12": "审核不通过", //已邀请待回复
                    "21": "企业待审核" //企业待审核
                };
                return statuMap[value]||"审核";

            }
        }
    };
</script>
<style>
    .auditing_con_menu .el-input__inner {
        height: 35px;
        line-height: 35px;
    }
    .auditing_con_menu  .el-date-editor .el-range__icon {
        line-height: 29px;
    }
    .auditing_con_menu .el-date-editor .el-range-separator {
        line-height: 26px;
    }
    .auditing_con_menu .btntools .el-button {
        width: 60px;
        height: 30px;
        line-height:30px;
        padding: 0;
    }
    .auditing_con_menu .el-date-editor--daterange {
        width: 435px;
    }
    .auditing_con_menu .el-input__icon {
        line-height: 35px;
    }
    .auditcon .el-table th {
        padding: 13px 0;
        background: #f5f5f5;
        color: #333;
        font-size: 16px;
        font-weight: normal;
     }
    .auditcon .el-table td {
        padding: 9px 0;
        font-size: 14px;
    }
</style>
<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .checkcon {
        background-color: #fff;
        padding: 30px 40px;
    }
    .status_button.sel {
        color: #ddd;
        cursor: not-allowed;
    }

    .themeTit {
        position: relative;
        margin-bottom: 30px;
        text-align: center;
        .tittext {
            font-size: 24px;
            line-height: 36px;
            color: #333333;
        }
        .borderone {
            position: absolute;
            width: 68px;
            left: 32%;
            top: 18px;
            border-top: 2px solid #cccccc;
        }
        .bordertwo {
            position: absolute;
            width: 68px;
            right: 32%;
            top: 18px;
            border-top: 2px solid #cccccc;
        }
    }

    .toolcon {
        margin-bottom: 58px;
    }
    .timetools {
        .inlinespan {
            float: left;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
        }
    }
    .tsdiv {
        margin-bottom: 20px;

        .tdcon {
            float: left;
            width: 35%;
            .inlinespan {
                float: left;
                height: 35px;
                line-height: 35px;
                font-size: 16px;
            }
            .inlineinput {
                float: left;
                width: 220px;
            }
            .inlineinput1 {
                width: 134px;
            }
        }
    }

    .timetools {
        margin-bottom: 30px;
    }

    .btntools {
        text-align: center;
        button {
            margin-right: 75px;
        }
        button:nth-child(2) {
            margin-right: 0;
        }
    }

    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }
</style>
