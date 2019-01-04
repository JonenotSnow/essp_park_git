<template>
    <!-- 部门招商 -->
    <div id="departmentInvestment">
        <div class="top">
            <div class="topLeft">
                <div class="topLeftTitle">
                    <span class="title">重要性</span>
                </div>

                <!--<el-select multiple collapse-tags v-model="importantLevelSelect" placeholder="请选择项目重要程度">-->
                <el-select collapse-tags v-model="importantLevel" placeholder="请选择项目重要程度">
                    <el-option v-for="(it,index) in importantLevelList"
                               :label="it.context"
                               :value="it.tureval"
                               :key="index"></el-option>
                </el-select>
            </div>
            <div class="topMiddle">
                <p class="title">成交率：</p>
                <el-select v-model="dealPercent" placeholder="--请选择--">
                    <el-option :label="it.context" :value="it.tureval" v-for="(it,index) in dealPercentList"
                               :key="index"></el-option>
                </el-select>
            </div>
            <div class="topRight">
                <p class="title">关键字：</p>
                <el-input v-model="projectManager" placeholder="项目名称"></el-input>
                <el-button type="primary" class="el-icon-search" @click="search()"></el-button>
            </div>
        </div>
        <div class="content">
            <ul class="contentList">
                <li class="item" v-for="(item,i) in list" :key="i">
                    <div class="itemLeft">
                        <p class="itemLeftOneLine" @click="linkTo(item)">
                            {{item.atractInvestTitle}}
                            <span
                                v-if="item.importantLevel">{{item.importantLevel | formatImportantLevel(item.importantLevel)}}</span>
                            <span v-if="item.projectManagerName">{{item.projectManagerName}}</span>
                            <span v-if="item.spaceSize">{{item.spaceSize | formatSpaceSize(item.spaceSize)}}</span>
                        </p>
                        <p class="itemLeftTwoLine">项目简介：<span>{{item.atractInvestContent}}</span></p>
                        <p class="itemLeftThreeLine">最近跟踪纪要：
                            <span class="sa" v-if="item.attractFollow == null">暂无跟踪纪要</span>
                            <span class="sa" v-else @click="showDetail(item)">【{{item.attractFollow.followPersonName}}】&nbsp;&nbsp;&nbsp;{{item.attractFollow.followDesc || ''}}</span>
                        </p>
                        <!--<p class="itemLeftThurseLine">已转为企业：<span-->
                        <!--@click="$router.push('/parkHall/attrForeInve/zhaoshangDetail')"></span></p>-->
                    </div>
                    <div class="itemRight">
                        <el-button type="primary" @click="showTranceRecords(item)">跟踪记录</el-button>
                        <el-button type="primary" v-if="projectManagerId == item.projectManager" plain
                                   @click="parentShowTransferClick(item)">项目转派
                        </el-button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="pageList">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
        <TraceRecords :show='showOne' @parentShow="parentShow" :afId="afId"></TraceRecords>
        <ItemTransfer :dataItem="thisProjectItem" @submitFn="submitFns" :showItemTransfer='showTwo'
                      @parentShowTransfer="parentShowTransfer"></ItemTransfer>
        <item-trace-dialog :show='detailListDetailShow' @parentShowTrance="parentShowTrance"
                           :detail='detailListDetail'></item-trace-dialog>

    </div>
</template>

<script>
    import TraceRecords from '../investmentManagement/component/traceRecords.vue';
    import ItemTransfer from '../investmentManagement/component/itemTransfer.vue';
    import ItemTraceDialog from '../investmentManagement/component/itemTraceDialog.vue'


    const cityOptions = [
        {context: "一般项目", tureval: "1"},
        {context: "重点项目", tureval: "2"},
        {context: "特殊项目", tureval: "3"}
    ];
    export default {
        components: {
            TraceRecords,
            ItemTransfer,
            ItemTraceDialog
        },
        data() {
            return {
                checkAll: false,
                checkedCities: [],
                cities: cityOptions,
                isIndeterminate: true,
                totalCount: 0,
                pageNum: 1,
                afId: '',
                pageSize: 5,
                projectManagerId: JSON.parse(sessionStorage.getItem("ctData")).userInfo.id,
                thisProjectItem: [],
                dealPercentList: [
                    {context: "100%", tureval: "1"},
                    {context: "80%", tureval: "2"},
                    {context: "60%", tureval: "3"},
                    {context: "40%", tureval: "4"},
                    {context: "20%", tureval: "5"},
                    {context: "0", tureval: "6"}
                ],
                // 重要程度
                importantLevel: '',                         // 单选字段
                importantLevelSelect: ["1", "2", "3"],      // 多选字段
                importantLevelList: [
                    {context: "所有项目", tureval: ""},
                    {context: "一般项目", tureval: "1"},
                    {context: "重点项目", tureval: "2"},
                    {context: "特殊项目", tureval: "3"}
                ],
                dealPercent: "",
                projectManager: '',
                showOne: false,
                showTwo: false,
                startDate: '',
                endDate: '',
                trancer: '',
                trancerWay: '',
                tranceList: "",
                list: [],


                // 详情
                detailListDetail: {},
                detailListDetailShow: false
            };
        },
        created() {
            this.getList(this.pageNum);
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
        methods: {

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
            parentShowTrance(msg) {
                this.detailListDetailShow = msg;
            },

            linkTo(item) {
                this.$router.push({
                    path: '/parkHall/attrForeInve/zhaoshangDetail',
                    query: {
                        id: item.id
                    }
                })
            },
            handleCheckAllChange(val) {
                // this.checkedCities = val ? cityOptions : [];
                cityOptions.forEach(element => {
                    if (val) {
                        this.checkedCities.push(element.tureval);
                    } else {
                        this.checkedCities = [];
                    }
                });
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getList(this.pageNum);
            },
            handleCurrentChange(val) {
                // this.pageNum = val;
                this.getList(val);
            },
            submitFns(val) {
                this.getList();
            },
            // 弹出跟踪记录
            showTranceRecords(items) {
                console.log("弹出跟踪记录======");
                console.log(items);
                this.afId = items.id;
                this.isShow = true;
                this.parentShow(this.isShow);
            },
            parentShow(msg) {
                this.showOne = msg;
            },
            parentShowTransfer(msg) {
                this.showTwo = msg;
            },
            parentShowTransferClick(item) {
                this.showTwo = true;
                this.parentShowTransfer(this.showTwo);
                this.thisProjectItem = item;
            },
            search() {
                this.pageNum = 1;
                this.getList(this.pageNum);
            },
            getList(pageNum) {
                this.$post(this.$apiUrl.investment.getAttractInvestInfo, {
                    parkId: sessionStorage.getItem("parkId"),
                    // pageNumber: this.pageNum,
                    pageNumber: pageNum,
                    pageSize: this.pageSize,
                    atractInvestTitle: this.projectManager,//项目名称
                    importantLevel: this.importantLevel,
                    dealPercent: this.dealPercent
                }).then(
                    response => {
                        this.list = response.resultData.listData;
                        this.totalCount = response.resultData.totalNumber;
                    },
                    err => {
                        this.$message({
                            type: "warn",
                            message: response.returnMsg
                        });
                    }
                );
            },
        },
        computed: {
            getRecordsList() {
                var arr = [];
                this.list.forEach((item, index) => {
                    arr.push(item.attractFollow.followPersonName)
                });
                return arr;
            }
        }
    }
</script>

<style lang='less' scoped>
    #departmentInvestment {
        .top {
            box-shadow: 0 0 5px #ddd;
            height: 80px;
            overflow: hidden;
            .topLeft, .topMiddle, .topRight {
                float: left;
                line-height: 80px;
                overflow: hidden;
                .title {
                    color: #666;
                    font-size: 16px;
                }
            }
            .topLeft {
                width: 45%;
                margin-right: 5%;
                .topLeftTitle {
                    margin-left: 4%;
                    float: left;
                    .title {
                        margin-right: 5%;
                    }
                }
                .el-checkbox-group {
                    width: 60%;
                    margin-left: 2%;
                    float: left;
                }
                .el-checkbox + .el-checkbox {
                    margin-left: 10px;
                }
            }
            .topMiddle {
                width: 20%;
                p {
                    float: left;
                }
                .el-select {
                    width: 60%;
                    float: left;
                }
            }
            .topRight {
                width: 30%;
                p {
                    float: left;
                }
                .el-input {
                    width: 54%;
                }
            }
        }
        .content {
            margin-top: 20px;
            box-shadow: 0 0 5px #ddd;
            .contentList {
                .item {
                    padding: 20px;
                    border-bottom: 1px solid #ddd;
                    overflow: hidden;
                    .itemLeft {
                        float: left;
                        width: 65%;
                        .itemLeftOneLine, .itemLeftTwoLine, .itemLeftThreeLine, .itemLeftThurseLine {
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            line-height: 40px;
                            font-size: 18px;
                            color: #5ea3d4;
                            cursor: pointer;
                            .sa {
                                color: #ea6969;
                            }
                        }
                        .itemLeftOneLine {
                            span {
                                color: #fff;
                                display: inline-block;
                                height: 26px;
                                line-height: 26px;
                                padding: 0 15px;
                                -webkit-border-radius: 13px;
                                -moz-border-radius: 13px;
                                border-radius: 13px;
                                margin: 5px;
                                font-size: 13px;
                                &:nth-of-type(4n) {
                                    background-color: #c1f2f3;
                                    color: #0db8bc !important;
                                }
                                &:nth-of-type(4n-1) {
                                    background-color: #ecf7e9;
                                    color: #489036 !important;
                                }
                                &:nth-of-type(4n-2) {
                                    background-color: #fceced;
                                    color: #be444a !important;
                                }
                                &:nth-of-type(4n-3) {
                                    background-color: #faefd8;
                                    color: #b28d3d !important;
                                }
                            }
                        }
                        .itemLeftTwoLine, .itemLeftThreeLine, .itemLeftThurseLine {
                            color: #444;
                            font-size: 14px;
                            span {
                                color: #888;
                            }
                        }
                        .itemLeftThurseLine {
                            span {
                                color: rgb(0, 185, 213);
                                cursor: pointer;
                            }
                        }
                    }
                    .itemRight {
                        width: 25%;
                        margin-top: 40px;
                        float: right;
                    }
                }
            }
        }

        .pageList {
            width: 880px;
            margin: 20px auto;
            text-align: right;
        }
    }
</style>
