<template>
    <div class="checkcon">
        <!-- 资讯审核 -->
        <div class="themeTit">
            <span class="borderone"></span>
            <span class="bordertwo"></span>
            <span class="tittext">资讯发布审核</span>
        </div>
        <div class="toolcon auditing_con_menu">
            <div class="esspclearfix tsdiv">
                <div class="tdcon">
                    <span class="inlinespan">资讯标题：</span>
                    <el-input class="inlineinput" v-model="title" placeholder=""></el-input>
                </div>
                <div class="tdcon">
                    <span class="inlinespan">发布人：</span>
                    <el-input class="inlineinput inlineinput1" v-model="name" placeholder=""></el-input>
                </div>
            </div>
            <div class="timetools">
                <span class="inlinespan">提交日期：</span>
                <el-date-picker
                    v-model="timeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div class="btntools">
                <el-button class="lookserch" type="primary" @click="getAuditInfoList()">查询</el-button>
                <el-button class="" type="info" @click="reSetSerchOption()">重置</el-button>
            </div>
        </div>
        <div class="auditcon">
            <el-table v-loading="auditingLoading"
                      :data="mcCardDataList"
                      style="border:1px solid #eee;font-weight:normal;width: 100%">
                <el-table-column
                    align="center"
                    label="序号"
                    width="85"
                >
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="center"
                                 prop="informationTitle"
                                 label="资讯标题"
                                 width="185"
                >
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="center"
                                 prop="createTime"
                                 label="提交时间"
                                 width="120">
                    <template slot-scope="scope">
                        {{scope.row.createTime | timerFormat(scope.row.createTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="userName"
                    label="资讯发布人"
                    width="115">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="phone"
                    label="联系手机"
                    width="130">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="status"
                    label="发布状态"
                    width="115">
                    <template slot-scope="scope">
                        {{scope.row.status | filterStatus(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- 通过 02，10 拒绝 03，12 审核中（未审核 01，21，审核中：05，统一归审核中） -->
                        <el-button type="text" class="status_button sel"
                                   v-if="scope.row.status=='10'||scope.row.status=='03'||scope.row.status=='02'||scope.row.status=='12'"
                                   @click="tolink(scope,'01')">查看
                        </el-button>
                        <el-button type="text" class="status_button" v-else @click="tolink(scope)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页部分 -->
        <div class="pageList">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="pageRanges"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Moment from 'moment'

    export default {
        data() {
            return {
                pageRanges: [5, 10, 20, 50, 100],//默认每页10条数区间
                pageNum: 1,//当前页码
                pageSize: 10,//每页条数
                allTotal: 0,//总条数
                title: "",//搜索关键词
                name: "",//搜索发布人
                mcCardDataList: [],
                timeRange: [],
                auditingLoading: true

            }
        },
        created() {
            this.getAuditInfoList();
        },
        methods: {
            reSetSerchOption() {
                this.timeRange = [];
                this.name = "";
                this.title = ""
            },
            tolink(scope,type) {
                console.log(scope)
                var informationId = scope.row.informationId;
                this.$router.push({
                    path: '/parkIndex/infoAuditDetail',
                    query: {
                        informationId: informationId,
                        type: type
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getAuditInfoList();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getAuditInfoList();
            },
            getAuditInfoList() {
                var url = this.$apiUrl.parkInfo.focusInfo;
                var parkId = sessionStorage.getItem("parkId") || "";
                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.timeRange[0] ? this.timeRange[0] : "",
                    endDate: this.timeRange[1] ? this.timeRange[1] : "",
                    title: this.title,//资讯标题搜索
                    name: this.name,//发布人搜索
                    parkId: parkId
                }).then(response => {
                    this.auditingLoading = false;
                    this.mcCardDataList = response.resultData.informationList;
                    this.allTotal = response.resultData.total;

                }, err => {
                    this.auditingLoading = false;
                    this.$message.error(err.resultMsg);
                })
            },

        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            },
            filterStatus(value) {
                //通过 02，10 拒绝 03，12 审核中（未审核 01，21，审核中：05，统一归审核中）

                let stautsMap = {
                    "01": "审核中",
                    "21": "审核中",
                    "05": "审核中",
                    "02": "通过",
                    "10": "通过",
                    "03": "拒绝",
                    "12": "拒绝"
                }
                return stautsMap[value] ? stautsMap[value] : "审核中";
            }
        }
    }
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
        color: #666;
        font-size: 16px;
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

    //分页样式
    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }

    .btnrs {
        color: #ccc;
        cursor: not-allowed;
    }

</style>
