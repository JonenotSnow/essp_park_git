<template>
    <div class="achievement-detail-wrap">
        <!-- 成果详情页 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="newscontainer">
            <div class="newstitle">
                <div class="firsttitle">
                    <h3>{{achievementResult.name}}</h3>
                </div>
                <div class="secondtitle">
                    <span>发布时间：</span>
                    <div class="publishtime">
                        <!--{{achievementResult.createTime | timerFormat(achievementResult.createTime)}}-->
                        2018-12-20
                    </div>
                    <span>浏览量：</span>
                    <div class="overviewnum">{{achievementResult.viewSum}}</div>
                </div>
                <div class="remarks">
                    <span>所属领域：</span>
                    <div class="field">
                        {{achievementResult.field | formatField(achievementResult.field)}}
                    </div>
                    <span>发明人：</span>
                    <div class="publisher">
                        {{achievementResult.inventor}}
                    </div>
                </div>
            </div>
            <div class="newscontent ql-container ql-snow bord-none" style="border: none; padding: 0 110px">
                <div class="ql-editor bord-none" v-html="achievementResult.detail" v-if="achievementResult.detail != null"></div>
                <div v-else>
                    暂无详细内容
                </div>
            </div>
        </div>
        <!--成果名称end-->
    </div>

</template>
<script>
    import Moment from "moment";
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";

    export default {
        name: "",
        components: {
            Moment,
            EsspBreadCrumb
        },
        data() {
            return {
                msg: "成果详情页",
                achievementResult: [],//具体详情数据
                // id: '20181215171811012' // 测试数据
                id: this.$route.query.id || "",
                opMark: this.$route.query.opMark || "01",
                breadlist: [
                    {
                        path: "/parkHome",
                        name: "首页"
                    },
                    {
                        path: "/parkIndex/achievementDetail",
                        name: "成果详情"
                    }
                ],
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            },
            formatField(vaule) {
                let defaulT = "暂无";
                let fieldMap = {
                    "0": "电子信息",
                    "1": "生物与新医药",
                    "2": "新材料",
                    "3": "高新技术服务",
                    "4": "新能源与节流",
                    "5": "资源与环境",
                    "6": "现代农业",
                    "7": "高端装备制造",
                    "8": "其他"
                };
                return fieldMap[vaule] || defaulT;
            }
        },
        created() {
            this.initData()
        },
        methods: {
            async initData() {
                await this.getAchievementDetail();
            },
            getAchievementDetail() {
                let url = this.$apiUrl.home.getAchievByKey;
                let pop = {
                    id: this.id,
                    opMark: this.opMark
                };
                this.$post(url, pop).then(
                    response => {
                        this.achievementResult = response.resultData
                    },
                    err => {
                        this.$message.error(response.resultMsg);
                    }
                );
            }
        }

    }
</script>
<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .achievement-detail-wrap {
        margin: 0 auto;
        width: 1200px;
        .achievement-detail__nav {
            margin-top: 32px;
            margin-bottom: 5px;
            height: 12px;
            line-height: 12px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666;
        }

        .newscontainer {
            margin-bottom: 20px;
            background-color: #fff !important;
            .newstitle {
                color: #333333;
                text-align: center;
                .firsttitle {
                    padding-top: 65px;
                    h3 {
                        height: 23px;
                        line-height: 23px;
                        font-size: 24px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #333333;
                        .esspellipsis()
                    }
                }

                .secondtitle {
                    margin-top: 26px;
                    height: 11px;
                    line-height: 11px;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999;
                    .publishtime {
                        display: inline-block;
                        margin-right: 40px;
                    }
                    .overviewnum {
                        display: inline-block;
                    }
                }

                .remarks {
                    margin-top: 54px;
                    width: 1100px;
                    text-align: center;
                    span {
                        display: inline-block;
                        height: 15px;
                        line-height: 15px;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0.4px;
                        color: #999;
                    }
                    .field {
                        display: inline-block;
                        margin-right: 108px;
                        height: 16px;
                        line-height: 16px;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #666;
                    }
                    .publisher {
                        display: inline-block;
                        height: 16px;
                        line-height: 16px;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #666;
                    }
                }
            }

            .newscontent {
                margin-left: 50px;
                padding: 50px 0;
                width: 1100px;
                text-align: left;
                text-indent: 28px;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                color: #999;
                letter-spacing: 0px;
            }
        }
    }

</style>
