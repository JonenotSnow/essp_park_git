<template>

    <div class="main-investcon">
        <!-- 在谈招商 -->
        <!-- 描述区 -->
        <div class="descon">
            <div class="esspclearfix optiondes">
                <div class="optionH">
                    在谈招商
                </div>
                <!--<div class="optionTool">-->
                    <!--<el-button type="primary" @click="linkTo">招商报备</el-button>-->
                <!--</div>-->
            </div>
            <!-- 查询工具区 -->
            <div class="esspclearfix toolarea">
                <div class="toolkey">
                    <span class="spankey">项目名称</span>
                    <el-input class="inputkey" v-model="atractInvestTitle" placeholder="项目名称" size="small"></el-input>
                </div>
                <div class="searchBtn">
                    <el-button type="primary" icon="el-icon-search" size="small"
                               @click.native.prevent="getResrveList()">搜索
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
                                <el-tag type="info" v-if="items.projectManagerName">{{items.projectManagerName}}
                                </el-tag>
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
                                <el-dropdown split-button type="primary" @command="handleCommand"
                                             @click="goProcessTrack(items)">
                                    跟踪登记
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :command="{items,keyindex:0}">跟踪记录</el-dropdown-item>
                                        <el-dropdown-item :command="{items,keyindex:1}">转为储备</el-dropdown-item>
                                        <el-dropdown-item :command="{items,keyindex:2}">转为成交</el-dropdown-item>
                                        <el-dropdown-item :command="{items,keyindex:3}">转为搁置</el-dropdown-item>
                                        <el-dropdown-item :command="{items,keyindex:4}">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else class="emptycon">
                    <div class="emptyTip">暂无数据</div>
                </div>

            </div>
        </div>
        <!-- 分页器 -->
        <div class="pageList">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="pageRanges"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allTotal">
            </el-pagination>
        </div>

        <trace-records
            :show="isShow"
            @parentShow="parentShow"
            :afId="afId"></trace-records>

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
                msg: "在谈招商",
                pageRanges: [5, 10, 20, 50], //默认每页10条数区间
                pageNumber: 1, //当前页码
                pageSize: 10, //每页条数
                allTotal: 1, //总条数
                listData: [],//全部数据源头
                //新版接口字段
                followStatus: "1",//商机状态（0：储备，1：在谈，2：已成交，3：搁置）
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
        beforeCreate() {

        },
        created() {
            this.init();
        },

        methods: {
            // 展示详情列表里的详情内容
            showDetail(item) {
                this.detailListDetail = item.attractFollow;
                if (typeof item.attractFollow.followAccessory == "string") {
                    this.detailListDetail.followAccessory = JSON.parse(item.attractFollow.followAccessory);
                    this.detailListDetail.followIntention = JSON.parse(item.attractFollow.followIntention);
                }
                this.detailListDetailShow = true;
                this.parentShowTrance(this.detailListDetailShow);
            },

            parentShowTrance(msg) {
                this.detailListDetailShow = msg;
            },

            // 获取跟进详情
            getAttractFollowDetail(afId) {
                this.$post("/attractFollow/getAttractFollowByKey", {afId: afId}).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.attractFollowDetailTotal = response.resultData.count;
                            this.attractFollowDetailtableData = response.resultData.list;
                        // }
                    },
                    err => {
                    }
                );
            },

            async init() {
                await this.getResrveList()
            },

            //更改商机的状态方法封装
            editInvest(options) {
                var api = this.$apiUrl.investment.addAttractFollow;
                var pop = {
                    followNumber: options.followNumber,//
                    followTime: options.followTime,
                    followStatus: options.followStatus,
                    parkId: options.parkId,
                };
                this.$post(api, pop).then(
                    response => {
                        this.$notify({
                            title: '状态更新提示',
                            message: '状态已更新成功',
                            type: 'success',
                            dangerouslyUseHTMLString: false,
                        });
                        this.getResrveList();

                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            editInvestHandle(items) {
                var map = {
                    "0": "储备招商",
                    "1": "在谈招商",
                    "2": "已成交招商",
                    "3": "搁置招商"
                };
                var tiptext = map[items.followStatus];
                this.$confirm(`此操作将改变该项目状态为<i style='color:red'>${tiptext}</i>, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    type: 'warning'
                }).then(() => {
                    this.editInvest(items);

                }).catch(() => {
                    this.$message.warning("取消删除");
                });

            },
            //删除商机
            delInvest(options) {
                var api = this.$apiUrl.investment.deleteAttractInvestInfo;
                var pop = {
                    id: options.id
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
            linkTo() {
                var url = "/parkHall/manage/myInvestment/promotionInvest.vue";
                this.$router.push(url);
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
            goDetail(options) {
                var url = "/parkHall/attrForeInve/zhaoshangDetail";
                this.$router.push({
                    path: url,
                    query: {
                        id: options.id
                    }
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getResrveList();
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getResrveList();
            },

            // 子传父
            parentShow(msg) {
                this.isShow = msg;
            },

            parentShowTrance(msg) {
                this.detailListDetailShow = msg;
            },

            handleCommand(command) {
                var items = command.items;
                //  跟踪记录详情
                if (command.keyindex == "0") {
                    this.afId = items.id;
                    this.isShow = true;
                    this.parentShow(this.isShow);
                }
                // 转为储备
                if (command.keyindex == "1") {
                    var opitons = {followNumber: items.id, followTime: new Date(), followStatus: 0, parkId: this.parkId}
                    this.editInvestHandle(opitons)
                }
                // 转为成功
                if (command.keyindex == "2") {
                    var opitons = {followNumber: items.id, followTime: new Date(), followStatus: 2, parkId: this.parkId}
                    this.editInvestHandle(opitons)
                }
                // 转为搁置
                if (command.keyindex == "3") {
                    var opitons = {followNumber: items.id, followTime: new Date(), followStatus: 3, parkId: this.parkId}
                    this.editInvestHandle(opitons)
                }
                // 删除招商
                if (command.keyindex == "4") {
                    this.delInvestHandle(items)
                }
            },
            goProcessTrack(options) {
                var url = "/parkHall/merchants/processTracking";
                this.$router.push({
                    path: url,
                    query: {
                        id: options.id,
                        processType: "1"
                    }
                });
            }
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
        computed: {},
    };
</script>

<style lang='less' scoped>
    @import "../../../../assets/css/mixin";
    // 描述层
    .descon {
        padding: 15px 15px 0 15px;
        margin-bottom: 15px;
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

    //pageList 分页器部分
    .pageList {
        text-align: right;
        padding: 15px 15px 0px 15px;

    }
</style>
