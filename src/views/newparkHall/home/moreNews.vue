<template>
  <div class="news_con">
    <!-- 最新资讯的模块 -->
    <div class="title_home esspclearfix">
      <div class="newstitle">
        <h3 class="newsfirtitle">园区资讯</h3>
        <p class="newssectitle">Latest News</p>
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
  components:{
      MoreNews
  },
  methods:{
    
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.title_home {
  .newstitle{
    float:unset;
    text-align: center;
    .newsfirtitle{
      font-size: 28px;
    }
    .newssectitle{
      font-size: 16px;
    }
  }
  .essp_width_auto();
  padding-top: 50px;
  div:nth-child(1) {
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
    &.title_home_btn {
      position: relative;
      top: 25px;
      a{
        cursor:pointer;
      }
    }
  }
}
.news_condetail {
  .essp_width_auto();
  width: 1180px;
}
</style>

