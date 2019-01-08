<template>
    <div id="noOpenNeed">
        <div class="baseInfo">
            <div class="searchAdd">
                <ul>
                    <li>
                        <div>
                            <span>标题名称：</span>
                            <input type="text" v-model="searchCondition.companyName">
                        </div>
                        <div>
                            <span>发布人：</span>
                            <input type="text" v-model="searchCondition.publisher">
                        </div>
                        <div>
                            <span>状态：</span>
                            <select v-model="searchCondition.policiesStatus">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>提交时间：</span>
                            <el-date-picker v-model="searchCondition.startDate" type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                            -
                            <el-date-picker v-model="searchCondition.endDate" type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="saveBtn">
                <el-button type="primary" size='small' @click='getList'>查询</el-button>
                <el-button type="info" size='small' @click='reset'>重置</el-button>
            </p>
            <div class="selectTitle">
                <p>采取先到先得的任务领取审核方式</p>
            </div>
            <div class="tabList">
                <el-table :data="list" @row-click="getDetail" style="width: 100%">
                    <el-table-column align="center" type="index" label="全部" width="85"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="cstNm" label="标题名称"
                                     width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="idyTpcd" label="发布人">
                        <template slot-scope="scope">
                            {{scope.row.idyTpcd | idType(scope.row.idyTpcd)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="提交时间" width="130">
                        <template slot-scope="scope">
                            {{scope.row.status | statusFormat(scope.row.status)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="状态" width="130">
                        <template slot-scope="scope">
                            {{scope.row.status | statusFormat(scope.row.status)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" width="100" label="操作">
                        <template slot-scope="scope">
                            <span class="look">领取并审核</span>
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
                pageSize: 5,
                list: [],
                rzz: JSON.parse(window.localStorage.getItem('rzz')),
                statusList: [
                    {
                        id: '',
                        name: '全部'
                    },
                    {
                        id: '10',
                        name: '园区待审核'
                    },
                    {
                        id: '01',
                        name: '园区审核中'
                    },
                    {
                        id: '02',
                        name: '审核通过'
                    },
                    {
                        id: '12',
                        name: '园区审核未通过'
                    },
                    {
                        id: '21',
                        name: '企业待审核'
                    },
                    {
                        id: '05',
                        name: '企业审核中'
                    },
                    {
                        id: '03',
                        name: '企业审核未通过'
                    },
                    {
                        id: '13',
                        name: '高级管理员待审核'
                    },
                    {
                        id: '14',
                        name: '高级管理员审核中'
                    }
                ],
                searchCondition: {   //查询条件
                    parkId: sessionStorage.getItem("parkId"),
                    type: '01',         //查询条件
                    startDate: '',      //开始时间
                    endDate: '',        //结束时间
                    publisher: '',      //发布人
                    companyName: '',    //公司名称
                    policiesStatus: ''  // 状态
                }
            }
        },
        created() {

        },
        methods: {
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
            // min-height: 570px;
            padding-bottom: 20px;
            background-color: #ffffff;
            .searchAdd {
                height: 135px;
                & > ul {
                    width: 885px;
                    margin: 40px auto 0;
                    padding: 0 0 10px;
                    li {
                        width: 100%;
                        height: 30px;
                        // line-height:50px;
                        margin-top: 20px;
                        & > div {
                            float: left;
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
                                background-color: #ffffff;
                                border: solid 1px #cccccc;
                                caret-color: #666;
                                color: #606266;
                                border: 1px solid #e4e7ed;
                                background: #fff;
                                border-radius: 4px;
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
            & > p {
                &:nth-of-type(1) {
                    text-align: center;
                    & > button {
                        &:nth-of-type(1) {
                            margin-right: 79px;
                        }
                    }
                }
            }
            .saveBtn {
                button {
                    font-size: 16px;
                }
            }
            & > ul, .tabList {
                border: 1px solid #ebeef5;
                border-bottom: none;
                width: 890px;
                margin: 0 auto 20px;
                li {
                    height: 50px;
                    line-height: 50px;
                    border: 1px solid #ccc;
                    & > span {
                        display: inline-block;
                        text-align: center;
                        &:nth-of-type(1) {
                            width: 110px;
                        }
                        &:nth-of-type(2) {
                            width: 240px;
                        }
                        &:nth-of-type(3) {
                            width: 120px;
                        }
                        &:nth-of-type(4) {
                            width: 120px;
                        }
                        &:nth-of-type(5) {
                            width: 120px;
                        }
                        &:nth-of-type(6) {
                            width: 140px;
                        }
                    }
                    &:nth-of-type(2n) {
                        border-left: 1px solid #ccc;
                        border-right: 1px solid #ccc;
                        border-bottom: none;
                        border-top: none;
                    }
                    &:nth-last-of-type(1) {
                        border-bottom: 1px solid #ccc;
                    }
                    &:nth-of-type(1) {
                        background-color: #f5f5f5;
                        font-size: 16px;
                        color: #333333;
                    }
                    &:not(:first-child) {
                        font-size: 14px;
                        color: #666666;
                        & > span {
                            &:nth-last-of-type(1) {
                                i {
                                    color: #00a0e9;
                                    cursor: pointer;
                                }
                                .disabledClick {
                                    color: #999;
                                    cursor: not-allowed;
                                }
                            }
                        }
                    }
                    &.noData {
                        text-align: center;
                    }
                }
                .look {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 40px;
                    letter-spacing: 0.4px;
                    color: #00a0e9;
                    cursor: pointer;
                }
            }
            .pageList {
                width: 880px;
                margin: 38px auto 53px;
                text-align: right;
            }
        }
        .selectTitle {
            margin: 59px auto 19px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #666666;
            width: 890px;
            .all {
                margin-left: 10px;
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
                width: 100px;
                height: 35px;
                background-image: linear-gradient(0deg,
                #f5f5f5 0%,
                #ffffff 100%);
                border-radius: 5px;
                border: solid 1px #cccccc;
                text-align: center;
                cursor: pointer;
                margin-left: 14px;
                line-height: 35px;
            }
        }
    }
</style>
