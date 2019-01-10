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
                <el-table :data="list" @row-click="getDetail" style="width: 100%">
                    <el-table-column align="center" type="index" label="全部" width="85"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="policyTitle" label="标题名称"
                                     width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="userName" label="发布人">
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="提交时间" width="130">
                        <template slot-scope="scope">
                            {{scope.row.createTime | statusFormat(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="状态" width="130">
                        <template slot-scope="scope">
                            {{scope.row.status | statusFormat(scope.row.status)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" width="100" label="操作">
                        <template slot-scope="scope">
                            <span class="operation" @click="linkToAuditDetail(scope.row.id)">领取并审核</span>
                        </template>
                    </el-table-column>
                </el-table>
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
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,
                list: [
                    {
                        id: '123456',                       // 政策id
                        createTime: '1546928463894',        // 发布时间
                        cstNm: '建行',                      // 发布机构
                        policyTitle: '政策法规标题1',       // 标题
                        userName: '行长',                   // 发布人
                        status: '已发布',                   // 发布状态
                        applyType: '01',                    // 政策01，或科技服务02
                        classtType: "高企认定",              // 类型【服务类型】
                        desc: '政策简介政策简介政策简介政策简介'
                    },
                    {
                        id: '123456',                       // 政策id
                        createTime: '1546928463894',        // 发布时间
                        cstNm: '交行',                      // 发布机构
                        policyTitle: '政策法规标题2',       // 标题
                        userName: '行长',                   // 发布人
                        status: '已审核',                   // 发布状态
                        applyType: '01',                    // 政策01，或科技服务02
                        classtType: "科小认定",              // 类型【服务类型】
                        desc: '政策简介政策简介政策简介政策简介政策简介政策简介政策简介政策简介政策简介政策简介'
                    },
                    {
                        id: '123456',                       // 政策id
                        createTime: '1546928463894',        // 发布时间
                        cstNm: '交行',                      // 发布机构
                        policyTitle: '政策法规标题3',       // 标题
                        userName: '行长',                   // 发布人
                        status: '未审核',                   // 发布状态
                        applyType: '01',                    // 政策01，或科技服务02
                        classtType: "风险投资",              // 类型【服务类型】
                        desc: '政策简介政策简介政策简介政策简介政策简介政策简介政策简介政策简介政策简介政策简介'
                    }
                ],
                searchCondition: {   //查询条件
                    parkId: sessionStorage.getItem("parkId"),
                    policyTitle: '',
                    userName: '',
                    status: '',
                    startDate: '',      //开始时间
                    endDate: '',        //结束时间
                }
            }
        },
        created() {

        },
        methods: {

            // 查询事件
            search() {

            },

            // 重置事件
            reset() {

            },

            // 前往审核详情页面
            linkToAuditDetail(id) {
                this.$router.push({
                    path: '/parkHall/manage/audit',
                    query: {
                        applyType: '01',
                        id: id
                    }
                });
            },

            /**
             * 获取“科技政策”的数据
             */
            getSciAndTechPolicy() {
                let params = {
                    parkId: this.parkId,            // 园区ID
                    pageNum: this.pageNum,          // 页码
                    pageSize: this.pageSize,        // 每页显示数量
                    startDate: this.startDate,      // 信息发布时间---开始时间
                    endDate: this.endDate,          // 信息发布时间---结束时间
                    title: '',                       // 标题,
                    type: this.satpType,            // 政策01，或科技服务02
                    classtType: this.classtType     // 科技服务才会有这个字段---
                };

                // “政策法规”不需要“classtType”这个字段
                if (this.satpType === '01') {
                    delete params.classtType;
                }

                this.$post(" /policy/getAllPolicy", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        let resultData = response.resultData;
                        this.allTotal = resultData.total;
                        this.mcCardDataList = resultData.policyList;
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
            },
            handleCurrentChange(val) {
                this.pageNum = val;
            }
        },
    }
</script>

<style lang='less' scoped>
    #noOpenNeed {
        .baseInfo {
            width: 1000px;
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
