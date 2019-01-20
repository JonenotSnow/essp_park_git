<template>
    <!-- 更多资讯的更多模块 -->
    <div>
        <div class="more_newscon esspclearfix" v-if="moreNewDates.length>0">
            <div class="left_news" @click="goinfoDetail(ftsNewDates)">
                <div class="imgcon">
                    <img :src="ftsNewDates.titleImg" :alt="ftsNewDates.informationTitle">
                    <div class="img_tips">
                        <div class="tip_tit">{{ftsNewDates.informationTitle}}</div>
                        <div class="tip_time">{{ftsNewDates.createTime | timerFormat(ftsNewDates.createTime)}}</div>
                    </div>
                </div>
            </div>
            <div class="right_news">
                <ul class="news_ul">
                    <li class="news_item esspclearfix" v-for="(item,index) in moreNewDates" :key="index"
                        @click="goinfoDetail(item)" v-if="index<7">
                        <div class="news_h">
                            <span>·</span>
                            <span>{{item.informationTitle}}</span></div>
                        <div class="news_time">{{item.createTime | timerFormat(item.createTime)}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else style="text-align:center;color:#999; padding:20px 0">暂无数据</div>
    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        data() {
            return {
                ftsNewDates: [],
                informationId: "",//点击要排除的资讯id
                moreNewDates: [],

            }
        },
        created() {
            this.getHotInfoList();
        },

        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm")
            }
        },
        methods: {
            //获取热门资讯
            getHotInfoList() {
                var url = this.$apiUrl.parkInfo.hotListInfo;
                var pop = {
                    pageNum: 0,
                    pageSize: 10,
                    type: "2",
                    parkId: window.sessionStorage.getItem("parkId"),
                    informationId: this.informationId
                };
                this.$post(url, pop)
                    .then((response) => {
                        var codestatus = response.resultCode;
                        if (codestatus == "CLT000000000") {
                            var data = response.resultData;
                            this.moreNewDates = data.newest ? data.newest : [];
                            this.ftsNewDates = data.newest[0] ? data.newest[0] : [];
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    }, (err) => {
                        this.$message.error("接口异常");
                    })
            },
            goinfoDetail(item) {
                this.informationId = item.informationId;
                this.getHotInfoList();
                this.$router.push({path: '/parkIndex/infoDetail', query: {informationId: this.informationId}})
            },

        }

    }
</script>

<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .more_newscon {
        padding: 10px 35px 32px;
    }

    .left_news {
        float: left;
        width: 560px;
    }

    .right_news {
        float: right;
        width: 48%;
    }

    .imgcon {
        &:hover .img_tips {
            display: block;
        }
        position: relative;
        img {
            display: block;
            width: 100%;
            height: 330px;
            border: none;
            &:hover {
                cursor: pointer;
            }
        }
        .img_tips {
            display: none;
            overflow: hidden;
            position: absolute;
            width: 100%;
            font-size: 12px;
            height: 40px;
            line-height: 40px;
            background-color: rgba(0,0,0,0.5);
            bottom: 0;
            color: #fff;
            transition:all 2s;
            .esspopacity(0.6);
            cursor: pointer;
            &:hover{
                .esspopacity(0.8);
            }
            .tip_tit {
                float: left;
                padding-left: 10px;
            }
            .tip_time {
                float: right;
                padding-right: 10px;
            }

        }
    }

    .news_item {
        /*margin-bottom: 10px;*/
        border-bottom: 1px dashed #ccc;
        /*padding: 10px 0;*/
        line-height: 30px;
        font-size: 12px;

        &:hover {
            cursor: pointer;
            color: #00a0e9;
        }
        .news_h {
            float: left;
            width: 67%;
            span {
                float: left;
                .esspellipsis();

            }

            span:nth-child(1) {
                font-size: 40px;
                line-height: 30px;
                margin-right: 5px;
                color: #999;
                &:hover{
                    color: #00a0e9
                }
            }
            span:nth-child(2) {
                float:left;
                font-size: 12px;
                line-height: 35px;
                max-width: 360px;
                color: #333;
                &:hover{
                    color: #00a0e9
                }

            }


        }
        .news_time {
            float: right;
            text-align: right;
            width: 23%;
            .esspellipsis();
        }
    }

    .no_newtips {
        width: 100%;
        height: 330px;
        line-height: 330px;
        text-align: center;
        color: #00a0e9;
    }

</style>
