<template>
  <div class="newpark_warp warp_active">
    <!-- 保定新园区的活动 -->
    <div class="main_inter">
      <div class="com-tit">平台活动</div>
      <div class="tabtool">
        <span
          class="child_span"
          v-for="(item,index) in tabscons"
          :key="index"
          :class="activeTabIndex==index?'sel':''"
          @click="activeTab(index)"
        >{{item.name}}</span>
      </div>
      <div class="swiperwrap">
        <div class="swipercon esspclearfix" v-if="activityList.length">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in activityList" :key="index" style="float:left">
              <div class="swiper_item" @click="toDetail(0,item.activityId)">
                <!-- 跳转到活动详情 -->
                <div class="itempic">
                  <img :src="item.activityPhoto" alt>
                  <div class="index_mask_item">
                    <div class="index_l">
                      <i class="el-icon-location"></i>
                      {{item.activityPlace}}
                    </div>
                    <div class="index_r">{{item.activityStarttime}}</div>
                  </div>
                  <span v-if="activeTabIndex==0" class="index_item_tag index_item_tag1">最新</span>
                  <span v-else class="index_item_tag">热门</span>
                </div>
                <h3>{{item.activityTheme}}</h3>
                <p>
                  <span v-html="item.activityDetails"></span>
                  <!--  为进一步加强安全生产宣传工作，普及安全生产常识，强化安全生产意识，软件园一期深入开展2018年“安全···产月”活动。6月11日，软投公司邀请市安全生产协会技术专家到园区为大家开设“生命至上、安全发展”主题讲座。 -->
                </p>
                <div class="gn">
                  <el-button type="primary" size="small">查看详情</el-button>
                  <!-- <el-button type="primary" size="small" @click="signUp(item.activityId)">立即报名</el-button> -->
                  <!-- <span class="bm">已报名: <strong>{{item.enterNumber}}</strong>人</span> -->
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>
          <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>
          <!-- <div class="swiper-button-next" v-if="activityList.length > 3"></div>
          <div class="swiper-button-prev" v-if="activityList.length > 3"></div>-->
        </div>
        <div class="nothing" v-else>
          <img src="../../../assets/newparkimg/home/noting.png" alt>
          <span class="tipspan">暂无平台活动</span>
        </div>
        <div class="more_con">
          <div class="conmore" @click="goActivityList">More></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css"; ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      tabscons: [
        {
          name: "最新活动"
        },
        {
          name: "热门活动"
        }
      ],
      activityList: [],
      activeTabIndex: 0,
      nowTime: new Date().getTime(),
      active: 0,
      swiperOption: {
        // banner轮播
        nitialSlide: 0, //设定初始化时slide的索引
        notNextTick: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 18,
        navigation: {
          nextEl: ".swiper-button-next", //前进按钮的css选择器或HTML元素。
          prevEl: ".swiper-button-prev" //后退按钮的css选择器或HTML元素。
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      },
      activity_hot:[],
      activity_newest:[],
      list: []
    };
  },
  created() {
    this.getInfo()
  },
  // props: ["activity_newest", "activity_hot"],

  components: {
    swiper,
    swiperSlide
  },

  methods: {
    getTime(timeValue) {
      let nowTime = timeValue.replace(/-/g, "/");
      let time = new Date(nowTime);
      return time.getTime();
    },
    signUp(id) {
      //alert("立即报名:"+id);

      this.$router.push({
        path: "/parkIndex/enrollForm",
        query: { activeId: id }
      });
    },
    /* 活动  */
    activeTab(type) {
      this.activeTabIndex = type;
      //默认是最新活动-0  热门是热门活动-1
      this.activityList = type == 0 ? this.activity_newest : this.activity_hot;
    },
    /* 更多园区活动 */
    goActivityList() {
      this.$router.push({
        path: "/parkIndex/park/all"
      });
    },
    /* 跳转到详情  0:活动 1:惠政 2:资讯*/
    toDetail(type, id) {
      if (type == 0) {
        this.$router.push({
          path: "/parkIndex/activityDetail",
          query: { activityId: id }
        });
      }
    },
    getInfo() {
      //0:表示活动1:表示惠政2:表示资讯 this.$post(url,param)
      this.$post(this.$apiUrl.home.homeInfo, {
        pageNum: 0,
        pageSize: 10,
        type:0,
        parkId: window.sessionStorage.getItem("parkId")
      })
        //activity_hot   activity_newest  huizheng_hot huizheng_newest information_newest
        .then(response => {
          this.activity_hot = response.resultData.hot; //热门活动
          this.activity_newest = response.resultData.newest; //最新活动
        });
    }
  },
  watch: {
    activity_hot: function(val) {
      this.activeTab(0);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/newpark/home.common.less";
@import "../../../assets/css/mixin";
.warp_active {
  height: 670px;
  background-color: #ffffff;
}
.tabtool {
  overflow: hidden;
  text-align: center;
  margin: 20px 0px 40px;
  .child_span {
    display: inline-block;
    padding: 0 20px;
    line-height: 30px;
    height: 30px;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    border-right: 1px solid #999999;
    cursor: pointer;
    &:last-child {
      border-right: none;
    }
  }
  .sel {
    color: #00a0e9;
  }
}

.nothing {
  position: relative;
  margin: 0 auto;
  width: 500px;
  height: 255px;
  margin-bottom: 160px;
  .tipspan {
    position: absolute;
    bottom: 60%;
    left: 34%;
    font-size: 18px;
    color: #999;
  }
  img {
    display: block;
    outline: none;
    width: 418px;
    height: 316px;
    margin: 0 auto;
  }
}
.more_con {
  width: 100%;
  .conmore {
    float: right;
    width: 46px;
    cursor: pointer;

    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ccc;
  }
}
.index_item_tag {
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px 4px;
  background-color: #fb3131;
  color: #fff;
}

.index_item_tag1 {
  background-color: #1ed2d2;
}

.swiperwrap {
  position: relative;
}

.swiper_item {
  padding: 8px;
  background: #fff;
  margin-bottom: 40px;
  border: 1px solid #999;
}

// .swiperwrap:hover .swiper-button-prev,
// .swiperwrap:hover .swiper-button-next,
// .swiperwrap:hover .swiper-button-prev1,
// .swiperwrap:hover .swiper-button-next1 {
//   display: block;
// }

.swiperwrap {
  .swiper-button-prev,
  .swiper-button-next,
  .swiper-button-prev1,
  .swiper-button-next1 {
    width: 50px;
    height: 72px;
  }

  .swiperwrap .swiper-button-prev1,
  .swiperwrap .swiper-button-next1 {
    margin-top: -70px;
  }
  /*Swiper原样式 */
  .swiper-button-prev,
  .swiper-container-rtl .swiper-button-next {
    background-image: url("./imgs/l1.jpg");
  }
  .swiper-button-next {
    right: -50px;
  }
  .swiper-button-prev {
    left: -50px;
  }
  .swiper-button-next,
  .swiper-container-rtl .swiper-button-prev {
    background-image: url("./imgs/r1.jpg");
  }
  .swiper-button-prev1,
  .swiper-container-rtl .swiper-button-next1 {
    background-image: url("./imgs/l2.jpg");
    left: 10px;
    right: auto;
  }
  .swiper-button-next1,
  .swiper-container-rtl .swiper-button-prev1 {
    background-image: url("./imgs/r2.jpg");
    right: 10px;
    left: auto;
  }
  .swiper-button-prev1,
  .swiper-button-next1,
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    margin-top: -22px;
    z-index: 10;
    cursor: pointer;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  .itempic {
    position: relative;
    height: 212px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
    .index_mask_item {
      display: none;
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 96%;
      padding: 0 2%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      // .esspopacity(0.6);
      transition: all 2s;
      &:hover {
        .esspopacity(1);
      }
      .index_l {
        float: left;
        width: 77%;
        height: 25px;
        line-height: 25px;
        .esspellipsis();
      }
      .index_place_icons {
        width: 72%;
        padding-left: 5%;
        background: url("./imgs/peo.png") no-repeat left center;
      }
      .index_r {
        float: right;
        width: 23%;
        height: 25px;
        line-height: 25px;
      }
    }
  }
  h3 {
    line-height: 54px;
    font-size: 18px;
    .esspellipsis();
    font-weight: normal;
  }
  p {
    height: 60px;
    line-height: 30px;
    font-size: 14px;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .gn {
    padding: 15px 0;
    text-align: center;
    .bm {
      margin-left: 36px;
      strong {
        font-size: 24px;
        color: @essp_nav_bg;
      }
    }

    button {
      font-size: 16px;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    margin-top: -70px;
  }
}

.swiper_item:hover {
  cursor: pointer;
  box-shadow: 2px 2px 5px 1px #ccf;
  -webkit-box-shadow: 2px 2px 5px 1px #ccf;
  -moz-box-shadow: 2px 2px 5px 1px #ccf;
  -ms-box-shadow: 2px 2px 5px 1px #ccf;
  -o-box-shadow: 2px 2px 5px 1px #ccf;
}

.swiper_item:hover .index_mask_item {
  display: block;
}

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

.swipercon {
  .essp_width_auto();
}
</style>

