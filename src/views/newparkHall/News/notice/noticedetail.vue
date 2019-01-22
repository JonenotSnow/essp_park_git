<template>
    <div>
        <EsspBreadCrumb class="detailNav" :breadList="breadlist"></EsspBreadCrumb>
        <div class="newscon">
            <div class="detail-tit">{{info.informationTitle || ''}}</div>
            <div class="newstatus esspclearfix">
            <span class="statusitemsA" v-if="info.createTime">
                <label>发布时间：</label>
                <em>{{ info.createTime | timerFormat(info.createTime)}}</em>
            </span>
                <span class="statusitemsB" v-if="info.cstNm">
                <label>发布机构：</label>
                <em>{{info.cstNm }}</em>
            </span>
                <span class="statusitemsC" v-if="info.viewTime">
                <label>浏览量：</label>
                <em>{{info.viewTime}}</em>
            </span>
            </div>
            <div class="tagscon">
                <div class="tags_con esspclearfix">
                    <div class="tagssubcon" v-if="tags.length > 0">
                        <span v-for="(item,index) in tags" :key="index" class="tagspan">{{item}}</span>
                    </div>
                </div>
            </div>
            <div class="infoDetail">
                <div class="realinfo" v-html="mockdetalhtml"></div>
            </div>
            <div class="pinglun">
                <EsspInfoComment commentSty="2"></EsspInfoComment>
            </div>
        </div>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import EsspInfoComment from "@/components/EsspInfoComment";
    import Moment from "moment";

    export default {
        data() {
            return {
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
                info: {},
                informationId: this.$route.query.informationId || '',  // 新闻id
                tags:  [],//["新闻","新闻热点","人民英雄纪念碑"]
                mockdetalhtml: '' //"<p style='color:red'>全是通知公告的mock详情数据</p>"
            }
        },
        components: {
            EsspBreadCrumb,
            EsspInfoComment
        },
        created() {
            this.getInfoById();
        },
        computed: {},
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm");
            }
        },
        methods: {
            getInfoById(){
                this.$post(this.$apiUrl.newsinfo.getInfoById,{
                    informationId: this.informationId
                }).then((response) => {

                        this.info = response.resultData;
                        this.tags = this.info.tagsTxt || [];
                        this.mockdetalhtml = this.info.infoDetail;
                });
            }
        }

    }
</script>

<style lang='less' scoped>
    @import "../../../../assets/css/mixin.less";

    .newscon {
        .essp_width_auto();
        background: #fff;
        padding: 40px 0 50px;
        .detail-tit {
            font-family: "MicrosoftYaHei";
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
            text-align: center;
            .esspellipsis();
            margin-bottom: 30px;
        }
        .newstatus {
            padding: 0 15%;
            margin-bottom: 20px;
            .statusitemsA {
                float: left;
                width: 30%;
                font-size: 14px;
                line-height: 25px;
                color: #999;
                text-align: center;
                em {
                    font-style: normal;
                }
            }
            .statusitemsB {
                float: left;
                width: 40%;
                font-size: 14px;
                line-height: 25px;
                color: #999;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                em {
                    font-style: normal;
                }
            }
            .statusitemsC {
                float: left;
                width: 28%;
                font-size: 14px;
                line-height: 25px;
                color: #999;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                em {
                    font-style: normal;
                }
            }
        }
        //新闻详情
        .infoDetail {
            .essp_width_auto();
            background: #fff;
            padding: 34px 0px 38px;
            line-height: 30px;
            text-indent: 2em;
            border-bottom: 1px solid #ccc;
            .realinfo {
                padding: 10px 50px;
                line-height: 30px;
            }
        }
        //标签模块样式
        .tagscon {
            .essp_width_auto();
            background: #fff;
            margin-bottom: 10px;
            .tags_con {
                padding: 30px 5%;
                overflow: hidden;
                .tagssubcon {
                    float: left;
                    width: 100%;
                    line-height: 30px;
                    text-align: center;
                    .tagspan {
                        margin-right: 20px;
                        height: 20px;
                        line-height: 20px;
                        color: #fff;
                        padding: 5px;
                        background-color: #cccccc;
                    }

                }
            }
        }
        //评论模块
        .pinglun {
            width: 1100px;
            padding: 50px 50px 0;
            margin: 0 auto;
            background-color: #fff;
            overflow: hidden;
        }
    }

</style>
