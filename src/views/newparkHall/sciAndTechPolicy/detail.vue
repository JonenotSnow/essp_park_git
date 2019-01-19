<template>
    <div class="sci-and-tech-policy-detail">
        <div class="bread-crumb">
            <essp-bread-crumb :breadList="breadlist_01" v-if="applyType == '01'"/>
            <essp-bread-crumb :breadList="breadlist_02" v-if="applyType == '02'"/>
        </div>
        <div class="main">
            <div class="main-head">
                <div class="head-title">{{satpDate.policyTitle}}</div>
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
                applyType: this.$route.query.applyType || '',
                id: this.$route.query.id || '',
                breadlist_01: [
                    {
                        path: "/sciIndex/policieAndRegulation/policieAndRegulation",
                        name: "科技政策",
                    },
                    {
                        path: "/sciIndex/policieAndRegulation/policieAndRegulation",
                        name: "政策法规",
                    },
                    {
                        path: "",
                        name: "政策法规详情"
                    }
                ],
                breadlist_02: [
                    {
                        path: "/sciIndex/policieAndRegulation/policieAndRegulation",
                        name: "科技政策",
                    },
                    {
                        path: "/sciIndex/sciAndTechService/technInnoCertificate",
                        name: "科技服务",
                    },
                    {
                        path: "",
                        name: "科技服务详情"
                    }
                ],
                satpDate: {},
                fileList: [],   // 附件字段
            }
        },
        methods: {
            /**
             * 获取“科技政策”的详情数据
             */
            getSatpDate() {
                let params = {
                    id: this.id
                };
                this.$post("/policy/getPolById", params).then(response => {
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
            },

            // 跳转出新窗口，看上传的附件
            linkToFile(url) {
                window.open(url)
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
