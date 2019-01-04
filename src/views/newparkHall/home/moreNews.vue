<template>
  <div class="news_con">
    <!-- 最新资讯的模块 -->
    <div class="title_home esspclearfix">
      <div>
        <h3>最新资讯</h3>
        <p>Latest News</p>
      </div>
      <div class="title_home_btn">
        <router-link to="/parkIndex/parkInformation/all" class="link_more">查看更多</router-link>
      </div>
    </div>
    <div class="news_condetail">
      <more-news :moreNewDates="moreNewDates"></more-news>
    </div>
  </div>
</template>
<script>
import MoreNews from "@/views/parkHall/information/moreNews"; //更多资讯
export default {
  data: () => ({
  }),
  components:{
      MoreNews
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.title_home {
        .essp_width_auto();
        padding-top: 20px;
        div:nth-child(1) {
            float: left;
            h3 {
                font-weight: normal;
                margin-bottom: 8px;
            }
            p {
                color: #999;
                font-size: 14px;
            }
        }
        div:nth-child(2) {
            float: right;
            line-height: 63px;
            a:hover,
            a.sel {
                color: @essp_nav_bg;
            }
            &.title_home_btn {
                position: relative;
                top: 25px;
            }
        }
    }
.news_condetail {
  .essp_width_auto();
  width: 1270px;
  /*padding: 34px 0; */
}
</style>

