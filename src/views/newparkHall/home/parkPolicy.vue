<template>
  <div class="park_active" style="background: #fff;">
      <!-- 淮安，旧园区 -->
    <div class="title_home esspclearfix">
      <div>
        <h3>园区惠政</h3>
        <p>Preferential Policy</p>
      </div>
      <div>
        <a
          href="javascript:void(0);"
          :class="huizhengTabIndex==0?'sel':''"
          @click="huizhengTab(0)"
        >最新惠政</a>
        丨
        <a
          href="javascript:void(0);"
          :class="huizhengTabIndex==1?'sel':''"
          @click="huizhengTab(1)"
        >热门惠政</a>
      </div>
    </div>
    <div class="swiperwrap">
      <div class="swipercon esspclearfix">
        <swiper :options="swiperOption1" ref="mySwiper1">
          <swiper-slide v-for="(item,index) in huizhengList" :key="index" style="float:left">
            <div class="swiper_item" @click="toDetail(1,item.id)">
              <div class="itempic">
                <img :src="item.titleImg" alt>
                <div class="index_mask_item">
                  <div class="index_l index_place_icons">发布方:{{item.pubCstName}}</div>
                  <div class="index_r">{{item.createTime | timerFormat(item.createTime)}}</div>
                </div>
                <span class="index_item_tag index_item_tag1" v-if="huizhengTabIndex==0">最新</span>
                <span class="index_item_tag" v-else>热门</span>
              </div>
              <h3>{{item.policyTitle}}</h3>
              <p>
                <span v-html="item.infoDetail"></span>
              </p>
              <div class="gn">
                <el-button type="primary" size="small">立即查看</el-button>
                <!-- <span class="bm">已报名: <strong>5</strong>人</span> -->
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <!-- <div class="swiper-button-next1" v-if="huizhengList.length > 3"></div>
        <div class="swiper-button-prev1" v-if="huizhengList.length > 3"></div>-->
        <div class="swiper-button-next1" tabindex="0" role="button" aria-label="Next slide"></div>
        <div class="swiper-button-prev1" tabindex="0" role="button" aria-label="Previous slide"></div>
        <div class="view_more">
          <el-button
            type="primary"
            plain
            size="small"
            style="font-size:14px;"
            @click="getHuiZhengList()"
          >查看更多园区惠政</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Moment from "moment";
import "swiper/dist/css/swiper.css"; ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components:{   
            swiper,
            swiperSlide,
            },
  data: () => ({
    huizheng_hot:[],
    huizheng_newest:[],
    huizhengList: [],
    huizhengTabIndex: 0,
    swiperOption1: {
      // banner轮播
      nitialSlide: 0, //设定初始化时slide的索引
      notNextTick: true,
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 18,
      navigation: {
        nextEl: ".swiper-button-next1", //前进按钮的css选择器或HTML元素。
        prevEl: ".swiper-button-prev1" //后退按钮的css选择器或HTML元素。
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    },
  }),
  watch: {
    huizheng_hot: function(val) {
    },
    huizheng_newest: function(val) {
      this.huizhengTab(0);
    }
  },
  created() {
    this.getInfo()
  },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD HH:mm");
    }
  },
  methods: {
    /* 更多园区惠政 */
    getHuiZhengList() {
      this.$router.push({
        path: "/parkIndex/goverBene/all"
      });
    },

    /* 跳转到详情  0:活动 1:惠政 2:资讯*/
    toDetail(type, id) {
      //惠政详情
      this.$router.push({
        path: "/parkIndex/goverBeneDetail",
        query: { id: id }
      });
      //alert("惠政详情");
    },

    huizhengTab(type) {
      this.huizhengTabIndex = type;
      if (type == 0) {
        this.huizhengList = this.huizheng_newest;
      } else {
        this.huizhengList = this.huizheng_hot;
      }
    },
    getInfo() {
      //0:表示活动1:表示惠政2:表示资讯 this.$post(url,param)
      this.$post(this.$apiUrl.home.homeInfo, {
        pageNum: 0,
        pageSize: 10,
        type:1,
        parkId: window.sessionStorage.getItem("parkId")
      })
        //activity_hot   activity_newest  huizheng_hot huizheng_newest information_newest
        .then(response => {

          this.huizheng_hot = response.resultData.hot; //热门惠政
          this.huizheng_newest = response.resultData.newest; //最新惠政
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
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

.swiperwrap:hover .swiper-button-prev,
.swiperwrap:hover .swiper-button-next,
.swiperwrap:hover .swiper-button-prev1,
.swiperwrap:hover .swiper-button-next1 {
  display: block;
}

.swiperwrap {
  .swiper-button-prev,
  .swiper-button-next,
  .swiper-button-prev1,
  .swiper-button-next1 {
    display: none;
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

.view_more {
  padding-bottom: 38px;
  text-align: center;
  button {
    color: #666;
    font-size: 14px;
    border-color: #999;
    padding: 7px 15px;
    background: none;
  }
  /*padding-right: 35px;*/
}

.rzqy {
  .essp_width_auto();
  min-height: 30px;
  background: #fff;
  img {
    float: left;
    width: 100px;
    margin-right: 20px;
  }
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


