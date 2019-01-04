<template>
    <!-- 已成交招商 -->
    <div id="finishedInvestment">
        <div class="esspclearfix optiondes">
            <div class="optionH">
                已成交商机
            </div>
        </div>
        <!-- 查询工具区 -->
        <div class="esspclearfix toolarea">
            <div class="toolkey">
                <span class="spankey">项目名称</span>
                <el-input class="inputkey" v-model="atractInvestTitle" placeholder="项目名称" size="small"></el-input>
            </div>
            <div class="searchBtn">
                <el-button type="primary" icon="el-icon-search" size="small" @click.native.prevent="getResrveList()">
                    搜索
                </el-button>
            </div>
        </div>
        <div class="esspclearfix listcon">
            <ul class="listconitem" v-if="listData.length">
                <li class="listdes" v-for="(items,index) in listData" :key="index">
                    <div class="esspclearfix deslist">
                        <h3 class="listhtitle" @click="goDetail(items)">{{items.atractInvestTitle}}</h3>
                        <div class="listtagcon">
                            <el-tag type="success">{{items.importantLevel
                                |formatImportantLevel(items.importantLevel)}}
                            </el-tag>
                            <el-tag type="info" v-if="items.projectManagerName">{{items.projectManagerName}}</el-tag>
                            <el-tag type="warning">{{items.spaceSize | formatSpaceSize(items.spaceSize)}}</el-tag>
                            <el-tag type="danger">{{items.customName}}</el-tag>
                        </div>
                    </div>
                    <div class="list_detail esspclearfix">
                        <div class="detail-con">
                            <div class="detailon">
                                <span class="detailtit">商机内容：</span>
                                <span class="detailspans">{{items.atractInvestContent}}</span>
                            </div>
                            <div class="detailon">
                                <span class="detailtit">最近跟踪纪要：</span>
                                <span class="detailspans" v-if="items.attractFollow == null">暂无跟踪纪要</span>
                                <span class="detailspans" v-else @click="showDetail(items)"><strong
                                    class="followperson">【{{items.attractFollow.followPersonName}}】</strong>&nbsp;&nbsp;{{items.attractFollow.followDesc || ''}}</span>

                            </div>
                        </div>
                        <div class="detail-tool">
                            <el-button type="primary" @click="showTranceRecords(items)">跟踪记录</el-button>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else class="emptycon">
                <div class="emptyTip">暂无数据</div>
            </div>
        </div>
        <div class="pageList">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allTotal">
            </el-pagination>
        </div>

        <!-- 跟踪记录 -->
        <trace-records :show="isShow" @parentShow="parentShow" :afId="afId"></trace-records>


        <!-- 跟踪概要 -->
        <item-trace-dialog :show='detailListDetailShow' @parentShowTrance="parentShowTrance"
                           :detail='detailListDetail'></item-trace-dialog>
    </div>
</template>

<script>
    import ItemTraceDialog from './component/itemTraceDialog'
    import TraceRecords from './component/traceRecords'


    export default {
        components: {
            ItemTraceDialog,
            TraceRecords
        },
        data() {
            return {
                pageRanges: [5, 10, 20, 50], //默认每页10条数区间
                pageNumber: 1, //当前页码
                pageSize: 10, //每页条数
                allTotal: 1, //总条数
                listData: [],//全部数据源头
                //新版接口字段
                followStatus: "2",//商机状态（0：储备，1：在谈，2：已成交，3：搁置）
                atractInvestContent: "",//商机内容
                atractInvestTitle: "",//商机名称
                attachment: [],//商机附件
                attractFollow: {},//最近跟踪记录
                customEmail: "",//客户邮箱
                customMobile: "",//客户手机
                customName: "",//客户名字
                customPhone: "",//客户电话
                customPosition: "",//客户职位
                customQq: "",//客户qq
                customWechat: "",//客户微信
                dealPercent: "",//成交概率
                id: "",//商机id
                important: "",//全部商机重要程度
                importantLevel: "",//商机列表的重要程度
                investComment: "",//商机备注
                investMethod: "",//入驻方式
                investSource: "",//商机来源
                issueDate: "",//创建日期
                issuer: "",//创建人id 暂时不用
                needHelp: [],//需要帮助
                parkId: "",//园区id
                projectManager: "",//项目经理ID
                projectManagerName: "",//项目经理
                referrer: "",//推荐人
                spaceSize: "",//需要空间
                visitDate: "",//首访时间


                // 获取跟进详情
                isShow: false,
                afId: '',
                detailListDetail: {},
                detailListDetailShow: false

            };
        },
        created() {
            this.getResrveList()
        },
        methods: {

            // 弹出跟踪记录
            showTranceRecords(items) {
                console.log("弹出跟踪记录======");
                console.log(items);
                this.afId = items.id;
                this.isShow = true;
                this.parentShow(this.isShow);
            },

            // 展示详情列表里的详情内容
            showDetail(item) {
                this.detailListDetail = item.attractFollow;
                if (typeof item.attractFollow.followAccessory == "string") {
                    this.detailListDetail.followAccessory = JSON.parse(item.attractFollow.followAccessory);
                    this.detailListDetail.followIntention = JSON.parse(item.attractFollow.followIntention);
                }
                this.detailListDetailShow = true;
                this.parentShowTrance(this.detailListDetailShow)
            },

            // 子传父
            parentShow(msg) {
                console.log(msg);
                this.isShow = msg;
            },

            parentShowTrance(msg) {

                this.detailListDetailShow = msg;
            },

            //删除商机
            delInvest(options) {
                var api = this.$apiUrl.investment.deleteAttractInvestInfo;
                var pop = {
                    id: options.id//商机状态（0：储备，1：在谈，2：已成交，3：搁置）
                };
                this.$post(api, pop).then(
                    response => {
                        this.$message.success("删除成功");
                        this.getResrveList();
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            delInvestHandle(items) {
                this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delInvest(items);
                }).catch(() => {
                    this.$message.warning("取消删除");
                });

            },
            getResrveList() {
                var api = this.$apiUrl.investment.getMyAttractInfo;
                var pop = {
                    followStatus: this.followStatus,//商机状态（0：储备，1：在谈，2：已成交，3：搁置）
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    atractInvestTitle: this.atractInvestTitle,//商机标题
                    parkId: sessionStorage.getItem("parkId"),
                    // projectManager:this.projectManager,//项目经理
                    // improtantLevel:this.improtantLevel,//重要程度（根据前端定义数字）
                    // dealPercent:this.dealPercent//成交概率（根据前端定义数字）
                };
                this.$post(api, pop).then(
                    response => {
                        var res = response.resultData;
                        this.allTotal = res.totalNumber; //总条数
                        this.listData = res.listData || [];//全部数据源

                    },
                    err => {
                        this.$message.error(err.resultMsg);

                    }
                );
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getResrveList();
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getResrveList();
            },
            goDetail(options) {
                var url = "/parkHall/attrForeInve/zhaoshangDetail";
                this.$router.push({
                    path: url,
                    query: {id: options.id}
                });
            },
        },
        filters: {
            formatImportantLevel(val) {
                var maps = {
                    "1": "一般项目",
                    "2": "重点项目",
                    "3": "特殊项目"
                };
                return maps[val] || "一般项目"
            },
            formatSpaceSize(val) {
                return val + 'm²'
            }
        },
    }
</script>

<style lang='less' scoped>
    @import "../../../../assets/css/mixin";

    #finishedInvestment {
        padding: 15px 15px 0 15px;
        margin-bottom: 15px;
        //描述区
        .optiondes {
            width: 100%;
            margin-bottom: 15px;
            .optionH {
                float: left;
                border-left: 4px solid #00a0e9;
                font-size: 18px;
                line-height: 40px;
                padding-left: 20px;
            }
            .optionTool {
                float: right;
            }
        }
        //工具层
        .toolarea {
            padding: 15px 15px 0 15px;
            margin-bottom: 15px;
            box-shadow: 0 0 5px #ddd;
            .toolkey {
                float: left;
                margin-left: 20px;
                padding: 10px 0;
                height: 40px;
                line-height: 40px;
                .inputkey {
                    float: left;
                    width: 250px;
                }
                .spankey {
                    float: left;
                    margin-right: 10px;
                }
            }
            .searchBtn {
                float: left;
                margin-left: 20px;
                padding: 10px 0;
                height: 40px;
                line-height: 40px;
            }
        }
        //数据列表
        .listcon {
            padding: 15px 15px 0px 15px;
            margin-bottom: 15px;
            box-shadow: 0 0 5px #ddd;
        }
        //数据为空的时候
        .emptycon {
            .emptyTip {
                text-align: center;
                color: #444;
                line-height: 40px;
            }
        }
        .listdes {
            margin-bottom: 15px;
            border-bottom: 1px solid #ccc;
            .deslist {
                .listhtitle {
                    font-size: 20px;
                    height: 40px;
                    line-height: 36px;
                    width: 90%;
                    cursor: pointer;
                    margin-bottom: 10px;
                    .esspellipsis();
                }
                .listtagcon {
                    margin-bottom: 10px;
                }
            }
        }

        //列表详情
        .list_detail {
            margin-bottom: 15px;
            .detail-con {
                float: left;
                width: 85%;
                .detailon {
                    margin-bottom: 10px;
                    height: 40px;
                    .detailtit {
                        float: left;
                        font-size: 14px;
                        line-height: 36px;
                        height: 36px;
                        margin-left: 10px;
                    }
                    .detailspans {
                        float: left;
                        width: 70%;
                        .esspellipsis();
                        font-size: 14px;
                        line-height: 36px;
                        height: 36px;
                        strong {
                            color: red;
                        }
                    }
                }
            }
            .detail-tool {
                float: right;
            }
        }
        .pageList {
            width: 880px;
            margin: 20px auto;
            text-align: right;
        }
        .removeParkTrace {
            .el-dialog__header {
                display: none;
            }
            .el-dialog__body {
                .title {
                    height: 50px;
                    color: #333;
                    font-size: 18px;
                    text-indent: 20px;
                    line-height: 50px;
                }
                .content {
                    margin: 10px;
                    padding: 10px 20px;
                    .condition {
                        border-bottom: 1px solid #eee;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        .el-input {
                            width: 180px;
                        }
                    }
                    .tabList {
                        border-bottom: none;
                        margin: 0 auto 20px;
                    }
                }
                .pageList {
                    margin-top: 15px;
                    width: 880px;
                    margin: 0 auto;
                    text-align: right;
                }
                .btn {
                    text-align: center;
                }
            }
        }
    }
</style>
