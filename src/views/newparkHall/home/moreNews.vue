<template>
    <div class="news_con">
        <!-- 最新资讯的模块 -->
        <div class="title_home esspclearfix">
            <div class="newstitle">
                <h3 class="newsfirtitle">园区资讯</h3>
                <p class="newssectitle">Campus info</p>
            </div>
            <div class="title_home_btn">
                <!-- <router-link to="/parkIndex/parkInformation/all" class="link_more">查看更多</router-link> -->
            </div>
        </div>
        <div class="news_condetail">
            <more-news :moreNewDates="moreNewDates"></more-news>
            <!-- <router-link to="/parkIndex/parkInformation/all" class="entermore">More ></router-link> -->
        </div>
    </div>
</template>
<script>
    import MoreNews from "@/views/parkHall/information/moreNews"; //更多资讯
    export default {
        data: () => ({
            huizhengTabIndex: 0,
        }),
        components: {
            MoreNews
        },
        methods: {}
    };
</script>
<style lang="less" scoped>
    @import "../../../assets/css/mixin";

    .title_home {
        .newstitle {
            float: unset;
            text-align: center;
            .newsfirtitle {
                margin: 0;
                font-size: 28px;
                color: #333;
                letter-spacing: 2.8px;
                font-weight: normal;
            }
            .newssectitle {
                font-size: 16px;
                color: #999;
                letter-spacing: 1.6px;
                padding-top: 15px;
            }
        }
        .essp_width_auto();
        padding-top: 50px;
        div:nth-child(2) {
            float: right;
            line-height: 63px;
            &.title_home_btn {
                position: relative;
                top: 25px;
                a {
                    cursor: pointer;
                }
            }
        }
    }

    .news_condetail {
        .essp_width_auto();
        width: 1180px;
    }
</style>

