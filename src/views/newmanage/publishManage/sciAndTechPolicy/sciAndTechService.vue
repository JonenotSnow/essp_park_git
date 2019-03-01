<template>
    <div class="sci-a1nd-tech-service-wrap">
        <div class="sci-a1nd-tech-service-head">
            <div class="head-div head-left">
                <span :class="{'span-click': status=='1'}" @click="switchStatus(1)">已发布</span>
                <span :class="{'span-click': status=='0'}" @click="switchStatus(0)">草稿箱</span>
                <span :class="{'span-click': status=='2'}" @click="switchStatus(2)">已审核</span>
            </div>
            <div class="head-div head-right">
                <div class="right-div search-wrap">
                    <div class="searchBox1">
                        <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
                        <i class="icon iconfont icon-sousuo" @click="search()"></i>
                    </div>
                </div>
                <div class="right-div publish-btn-wrap">
                    <p class="publish-btn">
                        <i class="el-icon-circle-plus"></i>
                        <span @click="linkToPublish()">立即发布</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="sci-a1nd-tech-service-main">

            <list-status-and-classify
                v-if="status=='1' || status=='2'"
                :list="dataList"
                :type="status"
                :totalCount="totalCount"
                :requestTip='requestTip'
                :approveType="approveType"
                @childDeleted="childDeleted"
                @childSwitchStatus="childSwitchStatus"
            />

            <list-only-classify
                v-if="status=='0'"
                :list="dataList"
                :type="status"
                :totalCount="totalCount"
                :requestTip='requestTip'
                :approveType="approveType"
                @childDeleted="childDeleted"
            />
        </div>

        <div class="pageList" v-if="dataList">
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
</template>

<script>
    import listOnlyClassify from './common/listOnlyClassify';
    import listStatusAndClassify from './common/listStatusAndClassify';

    export default {
        name: 'sci-and-tech-service',
        props: {},
        components: {
            listOnlyClassify,
            listStatusAndClassify
        },
        data() {
            return {
                msg: '科技服务',
                parkId: sessionStorage.getItem("parkId") || "",

                status: this.$route.query.status || '1',    // 状态值
                approveType: '',                             // 审核状态

                searchContent: '',                           // 查询字段
                satpType: '02',

                // 分页相关字段
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,

                // 返回的数据
                dataList: [],

                requestTip: '数据加载中...',
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.getPolicieAndRegulation();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getPolicieAndRegulation();
            },
            // 状态切换
            switchStatus(status) {
                this.status = status;
                this.type = status;
                this.searchContent = '';
                this.approveType = '';
                this.pageNum = '1';
                this.getPolicieAndRegulation(this.status);
            },

            // 查询事件
            search() {
                this.getPolicieAndRegulation(this.status);
            },

            // 跳转发布页面
            linkToPublish() {
                this.$router.push({
                    path: '/parkHall/manage/publishSciAndTechPolicy',
                    query: {
                        applyType: '02'
                    }
                });
            },

            // 获取全部政策法规
            getPolicieAndRegulation(status) {
                this.requestTip = '数据加载中...';
                let params = {
                    parkId: this.parkId,            // 园区ID
                    pageNum: this.pageNum,          // 页码
                    pageSize: this.pageSize,        // 每页显示数量
                    type: this.satpType,            // 01 政策法规， 02 科技服务
                    status: status,                 // 1 已发布， 0 草稿箱， 2 已审核
                    approveType: this.approveType,  // 02 已通过，12 拒绝，13 待审核
                    title: this.searchContent,          // 查询事件字段
                    // classtType: this.classtType     // 科技服务才会有这个字段---
                };
                this.$post("/policy/getMyPubPol", params).then(response => {
                    // let codestatus = response.resultCode;
                    // if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                        let resultData = response.resultData;
                        this.totalCount = resultData.total;
                        this.dataList = resultData.policyList;
                        this.requestTip = '数据加载完毕';
                    // } else {
                    //     this.$message.info(response.resultMsg);
                    // }
                }, err => {
                    this.$message.error("接口异常");
                })
            },

            /**
             * 子组件传递上来的事件------------开始
             */
            // 子组件执行删除事件后传递到父组件的事件
            childDeleted(status) {
                // 重新获取数据
                this.getPolicieAndRegulation(status);
            },

            // 子组件里的状态切换事件
            childSwitchStatus(approveType) {
                // 重新获取数据
                this.approveType = approveType;
                this.getPolicieAndRegulation();
            }
            /**
             * 子组件传递上来的事件------------结束
             */

        },
        mounted() {
            this.getPolicieAndRegulation(this.status);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .sci-a1nd-tech-service-wrap {
        .sci-a1nd-tech-service-head {
            margin-top: 22px;
            padding-left: 40px;
            padding-right: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid #ccc;
            .head-div {
                display: inline-block;
                vertical-align: top;
            }

            .head-left {
                padding-top: 3px;
                span {
                    display: inline-block;
                    margin-right: 15px;
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999;
                    border-radius: 3px;
                    border: solid 1px #ccc;
                    &:hover {
                        color: #fff;
                        border: solid 1px #00a0e9;
                        background-color: #00a0e9;
                        cursor: pointer;
                    }
                }

                .span-click {
                    color: #fff;
                    border: solid 1px #00a0e9;
                    background-color: #00a0e9;
                }
            }

            .head-right {
                float: right;
                .right-div {
                    display: inline-block;
                }

                .search-wrap {
                    .searchBox1 {
                        width: 198px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: 17.5px;
                        border: solid 1px #cccccc;
                        input {
                            padding: 0;
                            margin-left: 18px;
                            width: 150px;
                            height: 35px;
                            line-height: 35px;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #ccc;
                            outline: none;
                            border: none;
                        }
                        input::-webkit-input-placeholder {
                            color: #ccc;
                        }
                        input::-moz-placeholder { /* Mozilla Firefox 19+ */
                            color: #ccc;
                        }
                        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                            color: #ccc;
                        }
                        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                            color: #ccc;
                        }

                        i {
                            width: 17px;
                            height: 17px;
                            color: #ccc;
                            cursor: pointer;
                        }
                    }
                }

                .publish-btn-wrap {
                    margin-top: 2px;
                    margin-left: 15px;
                    vertical-align: top;
                    .publish-btn {
                        width: 130px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #ffffff;
                        border-radius: 3px;
                        background-color: #00a0e9;
                        cursor: pointer;
                    }
                }

            }
        }

        .sci-a1nd-tech-service-main {

        }
    }

    .pageList {
        width: 910px;
        margin: 45px auto 57px;
        text-align: right;
        padding-bottom: 57px;
    }
</style>
