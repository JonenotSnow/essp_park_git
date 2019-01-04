<template>
    <div class="experteam-wrap">
        <div class="achievement-bg-img">
            <!--<img :src="require('./img/experteam_bg.png')">-->
        </div>
        <!--专家团队start-->
        <div class="achievement_exhibition">
            <div class="exhibition_title">
                <div class="first_title">专家团队</div>
                <div class="second_title">聘请高校专家，重点实验室，技术专家，为企业提供专业服务</div>
            </div>

            <div class="achievement_result">
                <div class="achievement_result-list">
                    <div class="achievement_result-item" v-for="(item, index) in resultInfo"
                         @click="linkToDetail(item)" :key="index">
                        <div class="result_item-img">
                            <img :src="item.photo">
                        </div>
                        <div class="result_item-info">
                            <div class="result-titlename">{{item.name || "暂无"}}</div>
                            <div class="expertlevel">{{item.title || "暂无"}}</div>

                            <div class="result-des">
                                {{item.introduction || "暂无"}}
                            </div>

                            <div class="result-des__hover">
                            <p>联系电话：{{item.phone}}</p>
                            <p>联系邮箱：{{item.email}}</p>
                            </div>
                        </div>
                        <div class="readmore">
                            <span>>></span>
                        </div>
                    </div>
                </div>
                <div class="achievement_result-pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="pageRanges"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <!--专家团队end-->
    </div>
</template>

<script>

    import Moment from "moment";

    export default {
        name: "",
        data() {
            return {
                resultInfo: [],
                pageRanges: [10, 20, 30, 40], //默认每页10条数区间
                pageNum: 1, //当前页码
                pageSize: 10, //每页条数
                allTotal: 0, //总条数
                total: 0
            };
        },
        components: {},
        created() {
            this.getExpertList();
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
            }
        },
        methods: {
            //获取专家列表
            getExpertList() {
                let pop = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    title: ''
                };
                this.$post(this.$apiUrl.home.getExpertInfo, pop).then(
                    response => {
                        this.resultInfo = response.resultData.expertList;
                        this.total = response.resultData.total
                    },
                    err => {
                        this.$message.error(response.resultMsg);
                    }
                );
            },
            //跳转专家详情
            linkToDetail(item) {
                this.$router.push({
                    path: '/parkIndex/expertDetail',
                    query: {id: item.id}
                })
            },

            handleSizeChange(val) {
                this.pageSize = val;
                 this.getExpertList();

            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getExpertList();

            },

        }
    };
</script>

<style lang='less' scoped>

    .experteam-wrap {
        .achievement-bg-img {
            width: 100%;
            height: 500px;
            background: url('./img/experteam_bg.png') no-repeat center center;
        }
        .achievement_exhibition {
            margin: -135px auto 20px auto;
            width: 1200px;
            background-color: #fff;

            .exhibition_title {
                padding-top: 52px;
                padding-bottom: 10px;
                text-align: center;
                .first_title {
                    padding: 0;
                    height: 27px;
                    line-height: 27px;
                    text-align: center;
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 2.8px;
                    color: #333333;
                }

                .second_title {
                    margin-top: 20px;
                    height: 16px;
                    line-height: 16px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0.4px;
                    color: #cccccc;
                }
            }

            .achievement_result {
                .achievement_result-list {
                    .achievement_result-item {
                        overflow: hidden;
                        width: 1100px;
                        height: 200px;
                        background-color: #f5f5f5;
                        margin: 30px auto 0;

                        .result_item-img {
                            float: left;
                            padding: 10px;
                            width: 315px;
                            height: 180px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .result_item-info {
                            float: left;
                            margin-left: 30px;
                            padding: 10px;
                            text-align: left;

                            .result-titlename {
                                margin-top: 25px;
                                height: 19px;
                                line-height: 19px;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #333333;
                            }

                            .expertlevel {
                                margin-top: 20px;
                                height: 12px;
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #777;
                            }

                            .result-des {
                                display: block;
                                margin-top: 20px;
                                width: 600px;
                                height: 60px;
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #999999;
                                overflow: hidden;
                            }
                            .result-des__hover {
                                display: none;
                                margin-top: 35px;
                                p {
                                    margin-top: 10px;
                                    height: 14px;
                                    line-height: 14px;
                                    font-size: 14px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    letter-spacing: 0px;
                                }
                            }
                        }

                        .readmore {
                            float: right;
                            margin: 70px 0;
                            width: 100px;
                            height: 90px;
                            line-height: 90px;
                            color: #ccc;
                            border-left: 1px solid #ccc;
                            span {
                                margin-left: 40px;
                                width: 17px;
                                height: 17px;
                            }
                        }

                        &:hover {
                            background-color: #00a0e9;
                            cursor: pointer;

                            .result-titlename,
                            .expertlevel,
                            .result-des {
                                color: #fff;
                            }

                            .result-des {
                                display: none;
                            }

                            .result-des__hover {
                                display: block;
                                p {
                                    margin-top: 10px;
                                    height: 14px;
                                    line-height: 14px;
                                    font-size: 14px;
                                    color: #fff
                                }
                            }
                            .readmore {
                                border-left: 1px solid #fff;
                                color: #fff;
                            }
                        }
                    }
                }

                .achievement_result-pagination {
                    margin: 0 auto;
                    padding-top: 90px;
                    padding-bottom: 80px;
                    width: 1100px;
                    text-align: right;
                }
            }
        }
    }

</style>

