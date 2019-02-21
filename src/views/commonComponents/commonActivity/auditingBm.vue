<template>
    <div class="checkcon">
        <!-- 审核报名活动 -->
        <div class="themeTit">
            <span class="borderone"></span>
            <span class="bordertwo"></span>
            <span class="tittext">活动报名审核</span>
        </div>
        <div class="toolcon auditing_con_menu">
            <div class="esspclearfix tsdiv">
                <div class="tdcon">
                    <span class="inlinespan">公司名称：</span>
                    <el-input class="inlineinput" v-model="model1" placeholder=""></el-input>
                </div>
                <div class="tdcon">
                    <span class="inlinespan">报名状态：</span>
                    <el-select v-model="model2" placeholder="请选择" class="inline_select">
                        <el-option v-for="(item,index) in status_items" :key="index" :label="item.name"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="timetools">
                <span class="inlinespan">报名日期：</span>
                <el-date-picker v-model="model3" type="daterange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期" @change="changeData()">
                </el-date-picker>
            </div>
            <div class="btntools">
                <el-button class="" type="primary" @click="queryList()">查询</el-button>
                <el-button class="" type="info" @click="reSet()">重置</el-button>
            </div>
        </div>
        <div class="auditcon">
            <el-table :data="auditconData" v-loading="auditingLoading" empty-text
                      style="border:1px solid #eee;font-weight:normal;width: 100%">
                <el-table-column align="center" prop="index" label="序号" width="80" style="font-weight: normal">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="activityTheme" label="活动主题" width="175"
                                 style="font-weight: normal">
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="cstName" label="公司名称" width="160"
                                 style="font-weight: normal">
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="enterNumber" label="报名人数" width="85"
                                 style="font-weight: normal">
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="contactName" label="公司联系人" width="100"
                                 style="font-weight: normal">
                    <template slot-scope="scope">
                        {{scope.row.contactName || "—"}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="tel" label="联系电话" width="115">
                    <template slot-scope="scope">
                        {{scope.row.contactPhone || "—"}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="status" label="报名状态" width="100">
                    <template slot-scope="scope">
                        {{scope.row.auditState | statusCn(scope.row.auditState)}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" class="status_button" v-if="scope.row.auditState=='02'||scope.row.auditState=='03'" @click="tolink(scope.row,'01')">查看
                        </el-button>
                        <el-button type="text" class="status_button" v-else  @click="tolink(scope.row)">领取并审核
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页部分 -->
        <div class="pageList">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           layout="total, prev, pager, next, jumper" :total="allTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        data() {
            return {

                activityId: '',

                tel: "接口中。。",
                currentPageNum: 1, //当前页
                pageSize: 10, //每页的记录数
                activityListSize: 0,
                allTotal: 0,
                auditingLoading: true,
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                model1: "",
                model2: "",
                model3: "",
                auditconData: [],
                status_items: [
                    {
                        id: "",
                        name: "全部",
                        value: ""
                    },
                    {
                        id: "01",
                        name: "待审核",
                        value: "01"
                    },
                    {
                        id: "02",
                        name: "报名成功",
                        value: "02"
                    },
                    {
                        id: "03",
                        name: "报名失败",
                        value: "03"
                    },
                    {
                        id: "10",
                        name: "报名审核中",
                        value: "10"
                    }
                ],
                timeStart: "",
                timeEnd: ""
            };
        },
        created() {
            let activityId = this.$route.query.activityId;
            this.activityId = activityId;

            this.queryList();
        },
        methods: {
            tolink(row,type) {

                this.$router.push({
                    path: "/parkIndex/activityBmAuditDetail",
                    query: {
                        id: row.activityId,
                        enterinfoId: row.enterinfoId,
                        type: type
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
                var pageSize = this.pageSize;
                // if (this.model3 != null) {
                //     this.timeStart = Moment(this.model3[0]).format("YYYY-MM-DD");
                //     this.timeEnd = Moment(this.model3[1]).format("YYYY-MM-DD");
                // }
                this.$post(this.$apiUrl.active.enterinforList, {
                    pageNum: this.currentPageNum,
                    pageSize: this.pageSize,
                    parkId: window.sessionStorage.getItem("parkId"),
                    activityId: this.activityId,
                    //status: "21",
                    cstName: this.model1,
                    auditState: this.model2,
                    startTime: this.timeStart, //提交起始时间
                    endTime: this.timeEnd //提交结束时间
                }).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.auditingLoading = false;
                            this.auditconData = response.resultData.list;
                            this.allTotal = response.resultData.total;
                        // } else {
                        //     this.$message.error(err.resultMsg);
                        // }
                    },
                    err => {
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
            },
            changeData() {
                if (this.model3 != null) {
                    this.timeStart = Moment(this.model3[0]).format("YYYY-MM-DD");
                    this.timeEnd = Moment(this.model3[1]).format("YYYY-MM-DD");
                } else {
                    this.timeStart = "";
                    this.timeEnd = "";
                }
            }
        },
        computed: {},
        components: {},
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
            },
            statusCn(value) {
                var statuMap = {
                    "01": "待审核", //待审核
                    "02": "报名成功", //报名成功
                    "03": "报名失败", //报名失败
                    "10": "报名审核中", //报名审核中
                };
                return statuMap[value] || "待审核";
            }
        }
    };
</script>
<style>
    .auditing_con_menu .el-input__inner {
        height: 35px;
        line-height: 35px;
    }

    .auditing_con_menu .el-date-editor .el-range__icon {
        line-height: 29px;
    }

    .auditing_con_menu .el-date-editor .el-range-separator {
        line-height: 26px;
    }

    .auditing_con_menu .btntools .el-button {
        width: 60px;
        height: 30px;
        line-height: 30px;
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
        button {
            margin-right: 75px;
        }
        button:nth-child(2) {
            margin-right: 0;
        }
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
            .inline_select {
                float: left;
                width: 134px;
                background-color: #fff !important;
                .el-input {
                    float: left;
                    width: 100%;
                }
            }
        }
    }

    .timetools {
        margin-bottom: 30px;
    }

    .btntools {
        text-align: center;
    }

    .status_button.sel {
        color: #ddd;
        cursor: not-allowed;
    }

    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }
</style>
