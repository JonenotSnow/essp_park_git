<template>
    <div id="noOpenNeed">
        <div class="baseInfo">
            <div class="searchAdd">
                <ul>
                    <li>
                        <div>
                            <span>标题名称：</span>
                            <input type="text" v-model="searchCondition.policyTitle">
                        </div>
                        <div>
                            <span>发布人：</span>
                            <input type="text" v-model="searchCondition.userName">
                        </div>
                        <div>
                            <span>状态：</span>
                            <select v-model="searchCondition.status">
                                <option value="">全部</option>
                                <option value="02">发布中</option>
                                <option value="13">待审核</option>
                                <option value="12">审核不通过</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>提交时间：</span>
                            <el-date-picker
                                v-model="searchCondition.startDate"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"/>
                            -
                            <el-date-picker
                                v-model="searchCondition.endDate"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"/>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="saveBtn">
                <button class="my-btn btn-search" @click='search()'>查询</button>
                <button class="my-btn btn-reset" @click='reset()'>重置</button>
            </div>
            <div class="selectTitle">
                <p>采取先到先得的任务领取审核方式</p>
            </div>
            <div class="tabList">
                <el-table v-if="policieAndRegulationData && policieAndRegulationData.length > 0"
                          :data="policieAndRegulationData" @row-click="getDetail" style="width: 100%">
                    <el-table-column align="center" type="index" label="全部" width="85"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="policyTitle" label="标题名称"
                                     width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="userName" label="发布人">
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="提交时间" width="150">
                        <template slot-scope="scope">
                            {{scope.row.createTime | timerFormat(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="状态" width="130">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == '02'">发布中</span>
                            <span v-if="scope.row.status == '13'">待审核</span>
                            <span v-if="scope.row.status == '12'">审核不通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" width="100" label="操作">
                        <template slot-scope="scope">
                            <!--<span v-if="scope.row.status == '02'" class="operation"-->
                            <!--@click="linkToAuditDetail(scope.row)">查看</span>-->
                            <span v-if="scope.row.status == '02'" class="operation"
                                  @click="linkToPublishDetail(scope.row)">查看</span>
                            <!--<span v-if="scope.row.status == '12'" class="operation"-->
                            <!--@click="linkToAuditDetail(scope.row)">查看</span>-->
                            <span v-if="scope.row.status == '12'" class="operation"
                                  @click="linkToPublishDetail(scope.row)">查看</span>
                            <span v-if="scope.row.status == '13'" class="operation"
                                  @click="linkToAuditDetail(scope.row)">领取并审核</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="noData" v-if="policieAndRegulationData.length == 0 && requestTip == '数据加载中...'">
                    <div class="no-list-desc">
                        {{requestTip}}
                    </div>
                </div>
                <div class="noData" v-if="policieAndRegulationData.length == 0 && requestTip == '数据加载完毕'">
                    <div class="no-list-pic">
                        <img src="@assets/newparkimg/no-list-img.png" alt="">
                    </div>
                    <div class="no-list-desc">
                        暂无数据
                    </div>
                </div>
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
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                parkId: sessionStorage.getItem("parkId") || "",

                satpType: '01',     // 政策法规
                policieAndRegulationData: [],
                requestTip: '数据加载中...',

                // 查询条件
                searchCondition: {
                    policyTitle: '',
                    userName: '',
                    status: '',
                    startDate: '',      //开始时间
                    endDate: '',        //结束时间
                },

                // 分页相关字段
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,
            }
        },
        created() {
            this.getSciAndTechPolicy();
        },
        methods: {

            // 查询事件
            search() {
                this.getSciAndTechPolicy();
            },

            // 重置事件
            reset() {
                this.searchCondition.policyTitle = '';
                this.searchCondition.userName = '';
                this.searchCondition.status = '';
                this.searchCondition.startDate = '';
                this.searchCondition.endDate = '';
                this.getSciAndTechPolicy();
            },


            // 前往发布查看详情页面
            linkToPublishDetail(item) {
                this.$router.push({
                    path: '/parkHall/manage/sciAndTechPolicyAuditDetail',
                    query: {
                        applyType: '01',
                        id: item.id
                    }
                });
            },

            // 前往审核详情页面
            linkToAuditDetail(item) {
                this.$router.push({
                    path: '/parkHall/manage/audit',
                    query: {
                        applyType: '01',
                        id: item.id,
                        status: item.status
                    }
                });
            },


            /**
             * 获取“科技政策”的数据
             */
            getSciAndTechPolicy() {
                this.requestTip = '数据加载中...';
                let params = {
                    parkId: this.parkId,              // 园区ID
                    pageNum: this.pageNum,            // 页码
                    pageSize: this.pageSize,          // 每页显示数量
                    entityType: this.satpType,        // 政策01，或科技服务02
                    type: '04', //（后台要求的【必填】）

                    // 查询用到的字段
                    title: this.searchCondition.policyTitle,  // 标题名称
                    name: this.searchCondition.userName,        // 发布人
                    status: this.searchCondition.status,            // 状态
                    startDate: this.searchCondition.startDate,      // 开始时间
                    endDate: this.searchCondition.endDate,          // 结束时间
                };


                this.$post("/audit/getAuditList", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        let resultData = response.resultData;
                        this.totalCount = resultData.policyCount;
                        this.policieAndRegulationData = resultData.policyList;
                        this.requestTip = '数据加载完毕';
                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            },

            /**
             * 分页相关事件
             * @param val
             */
            handleSizeChange(val) {
                this.pageSize = val;
                this.getSciAndTechPolicy();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getSciAndTechPolicy();
            }
        },
    }
</script>

<style lang='less' scoped>
    #noOpenNeed {
        .baseInfo {
            width: 990px;
            margin-bottom: 50px;
            padding-bottom: 20px;
            background-color: #ffffff;
            .searchAdd {
                margin: 40px auto 0;
                width: 890px;
                ul {
                    li {
                        margin-bottom: 20px;
                        & > div {
                            display: inline-block;
                            margin-right: 35px;
                            & > span {
                                font-size: 16px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 40px;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                            & > input {
                                width: 208px;
                                padding: 0 5px;
                                outline: none;
                                height: 35px;
                                caret-color: #666;
                                color: #606266;
                                border: 1px solid #e4e7ed;
                                background: #fff;
                                border-radius: 4px;
                            }
                            & > select {
                                width: 138px;
                                padding: 0 5px;
                                outline: none;
                                height: 35px;
                                color: #606266;
                                border: 1px solid #e4e7ed;
                                border-radius: 4px;
                                background-color: #ffffff;

                            }
                        }
                        &:nth-of-type(1) {
                            div:nth-of-type(2) {
                                input {
                                    width: 119px;
                                }
                            }
                        }
                    }
                }
            }
            .saveBtn {
                margin-top: 50px;
                text-align: center;
                .my-btn {
                    width: 60px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    outline: none;
                }
                .btn-search {
                    margin-right: 80px;
                    background-color: #00a0e9;
                }
                .btn-reset {
                    background-color: #999;
                }
            }
            .selectTitle {
                margin: 60px auto 0;
                width: 890px;
                text-align: right;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.4px;
                color: #00a0e9;
            }

            .tabList {
                margin: 10px auto;
                width: 890px;
                border: 1px solid #ebeef5;
                border-bottom: none;
                .operation {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #00a0e9;
                    cursor: pointer;
                }

                .noData {
                    margin-top: 100px;
                    margin-bottom: 50px;
                    padding-bottom: 50px;
                    text-align: center;
                    border-bottom: 1px solid #ebeef5;
                    .no-list-pic {
                        padding-left: 320px;
                        width: 245px;
                        height: 189px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .no-list-desc {
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #666666;
                    }

                }
            }

            .pageList {
                width: 880px;
                margin: 38px auto 53px;
                text-align: right;
            }
        }

    }
</style>
