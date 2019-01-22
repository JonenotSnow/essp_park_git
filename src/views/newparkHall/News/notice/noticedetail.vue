<template>
    <div class="sci-and-tech-policy-detail">
        <div class="bread-crumb">
            <essp-bread-crumb :breadList="breadlist"/>
        </div>
        <div class="main">
            <div class="main-head">
                <div class="head-title">{{satpDate.informationTitle}}</div>
                <div class="head-info">
                    <p class="info-p release-time">
                        <span>发布时间：</span>
                        <span>{{satpDate.createTime | timerFormat(satpDate.createTime)}}</span>
                    </p>
                    <p class="info-p view-total">
                        <span>浏览量：</span>
                        <span>{{satpDate.viewTime}}</span>
                    </p>
                </div>
                <div class="head-tag">
                    <span v-if="satpDate.tagsTxt && satpDate.tagsTxt.length > 0"
                          v-for="(item ,index) in satpDate.tagsTxt"
                          :key="index"
                    >{{item}}</span>
                </div>
            </div>
            <div class="main-body">
                <div v-html="satpDate.infoDetail"></div>
            </div>
            <div class="main-foot">
                <p class="attachment-p attachment-title">附件下载：</p>
                <p class="attachment-p attachment-main"
                   v-if="fileList && fileList.length > 0"
                   v-for="(item, index) in fileList"
                   :key="index"
                >
                    <a :href="item.url" :download="item.name">·附件{{index+1}}：{{item.name}}</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import Moment from "moment";

    export default {
        components: {
            EsspBreadCrumb
        },
        data() {
            return {
                id: this.$route.query.informationId || '',  // 新闻id
                breadlist: [
                    {
                        path: "/newsinfo",
                        name: "资讯公告",
                    },
                    {
                        path: "/news/notice",
                        name: "通知公告",
                    },
                    {
                        path: "/news/noticedetail",
                        name: "通知公告详情"
                    }
                ],
                satpDate: {},
                fileList: [],   // 附件字段
            }
        },
        methods: {
            /**
             * 获取“通知公告”的详情数据
             */
            getSatpDate() {
                let params = {
                    informationId: this.id
                };
                this.$post(this.$apiUrl.newsinfo.getInfoById, params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {

                        this.satpDate = response.resultData;

                        // 对标签进行处理
                        if (this.satpDate.tagsTxt) {
                            this.satpDate.tagsTxt = this.satpDate.tagsTxt.split(',');
                        }

                        // 对附件进行处理
                        if (this.satpDate.fileUrl) {
                            let fileList = JSON.parse(this.satpDate.fileUrl);

                            fileList.forEach((item, index) => {
                                var obj = {
                                    name: item.name,
                                    url: item.url
                                };
                                this.fileList.push(obj);
                            })
                        }

                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            }
        },
        created() {
            this.getSatpDate();
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        }
    }
</script>

<style lang='less' scoped>

    .sci-and-tech-policy-detail {
        .bread-crumb {
        }

        .main {
            margin: 0 auto 20px;
            padding-top: 65px;
            padding-bottom: 60px;
            width: 1200px;
            background-color: #fff;

            .main-head {
                .head-title {
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #333;
                }
                .head-info {
                    margin-top: 35px;
                    text-align: center;
                    .info-p {
                        display: inline-block;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #999;
                    }
                    .release-time {
                        margin-right: 38px;
                    }
                }

                .head-tag {
                    margin-top: 30px;
                    text-align: center;
                    span {
                        margin-right: 20px;
                        padding: 5px 8px;
                        width: 40px;
                        color: #fff;
                        background-color: #cccccc;
                    }
                }
            }
            .main-body {
                padding: 40px 50px 0;
            }
            .main-foot {
                padding: 60px 50px 0;
                .attachment-p {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #666666;
                }
                .attachment-title {

                }
                .attachment-main {
                    text-indent: 1rem;
                    a {
                        &:hover {
                            color: #00a0e9;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

</style>
