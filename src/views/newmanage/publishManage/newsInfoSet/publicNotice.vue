<template>
    <div class="policie-and-regulation-wrap">
        <div class="policie-and-regulation-head">
            <div class="head-div head-left">
                <span v-for="(item,index) in itemsouces" :key="index" :class="{'span-click': status==item.status}"
                      @click="switchStatus(item)">{{item.fnName}}</span>
            </div>
            <div class="head-div head-right">
                <div class="right-div search-wrap">
                    <div class="searchBox">
                        <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
                        <i class="icon iconfont icon-sousuo" @click="search()"></i>
                    </div>
                </div>
                <div class="right-div publish-btn-wrap">
                    <p class="publish-btn">
                        <i class="el-icon-circle-plus"></i>
                        <span @click="goToPublish()">立即发布</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="policie-and-regulation-main">
            <oneCardModel :list="list" :requestTip="requestTip" :classtType="approveType" :allCheck="isAllChecked" :type="type" @changeStatusList="changeStatusList" @delectList="getPublicedNews" :customopts={status,temeTit,allTotal}></oneCardModel>
        </div>
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

    import oneCardModel from "./common/oneCardModel"

    export default {
        name: 'policie-and-regulation',
        props: {},
        components: {
            oneCardModel
        },
        data() {
            return {
                temeTit: "通知公告",
                currentTime: [],
                requestTip: "数据加载中...",
                parkId: sessionStorage.getItem("parkId") || "",
                pageRanges: [5, 10, 20],//默认每页10条数区间
                pageNum: 1,//当前页码
                pageSize: 5,//每页条数
                allTotal: 0,//总条数
                isAllChecked: false,
                type: '2',  // 类型（新闻与公告）新闻1，公告2
                status: this.$route.query.status || '1',                // 状态值
                searchContent: '',          // 查询字段
                list: [],
                approveType: '',   // 审核状态的筛选条件
                itemsouces: [
                    {
                        fnName: "已发布",
                        status: 1
                    },
                    {
                        fnName: "草稿箱",
                        status: 0

                    },
                    {
                        fnName: "已审核",
                        status: 2

                    }
                ],
            }
        },
        created() {
               this.getPublicedNews();
        },
        methods: {
            getPublicedNews() {
                this.requestTip = '数据加载中...'
                var url = this.$apiUrl.newsinfo.getMyPubInfo;
                var pop = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.currentTime[0] || "",
                    endDate: this.currentTime[1] || "",
                    title: this.searchContent,
                    parkId: this.parkId,
                    status: this.status,
                    type: this.type,
                    statusType: this.approveType
                }
                this.list = []
                this.$post(url, pop).then(res => {
                    this.requestTip = '数据加载完毕';
                    var arr = res.resultData.informationList;
                    arr.forEach((item,index) => {
                        if(!item.isChecked) {
                            this.$set(item,"isChecked", false);
                        } else {
                            item.isChecked = false;
                        }
                    })
                    this.list = arr;
                    this.allTotal = res.resultData.total;
                }, err => {
                    console.log(err)
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getPublicedNews();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getPublicedNews();
            },
            // 状态切换
            switchStatus(item) {
                this.status = item.status;
                this.isAllChecked = false;
                this.selectCheckItem = [];
                this.approveType = '';
                this.getPublicedNews();
            },
            // 改变审核状态
            changeStatusList(val){
                console.log(val);
                this.approveType = val;

                this.getPublicedNews();
            },
            // 查询事件
            search() {
                this.getPublicedNews();
            },
            goToPublish() {
                this.$router.push({
                    path: '/news/addNews',
                    query: {
                        applyType: '02'
                    }
                })
            }

        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .policie-and-regulation-wrap {
        .policie-and-regulation-head {
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
                    .searchBox {
                        width: 198px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: 17.5px;
                        border: solid 1px #cccccc;
                        input {
                            padding: 0;
                            margin-left: 18px;
                            width: 150px;
                            height: 33px;
                            line-height: 33px;
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

        .policie-and-regulation-main {

        }
    }

    .pageList {
        width: 910px;
        margin: 45px auto 57px;
        text-align: right;
        padding-bottom: 57px;
    }
</style>
