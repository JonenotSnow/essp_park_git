<template>
 <div>
   <!-- 旧园区的头部搜索框，暂时作废 -->
    <div class="banner_index">
        <div class="banner_bg"></div>
        <div class="indexSeach">
            <el-input placeholder="请输入关键字" v-model="indexSeachKW">
                <el-select v-model="typeselect" slot="prepend" placeholder="请选择" class="typecon"
                            @change="getListInfoTags">
                    <el-option label="活动" value="park_activity"></el-option>
                    <el-option label="惠政" value="park_gover"></el-option>
                    <el-option label="资讯" value="park_information"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="goSearchPage()">园区内搜索</el-button>
            </el-input>
            <div class="local esspclearfix">
                <span v-for="(item,index) in sometags" :key="index" v-if="index<5" @click="clickTag(item,index)"
                        :class="{'sel':currentIndex===index}"
                >{{item}}</span>
            </div>
        </div>
    </div>
    <!-- <div class="indexMenu">
        <div class="swiper_com">
            <div class="swiper_inner">
                通知公告：
            </div>
            <div v-if="infoList && infoList.title && infoList.title.length<28" class="swiper_inner3"
                    v-html="infoList.title"
                    @click="$router.push({path:'/parkHall/manage/noAndADDetail',query:{id:infoList.id}})"></div>
            <marquee v-else behavior="scroll" direction="left" width='450' class="swiper_inner1"
                        onmouseover=this.stop() onmouseout=this.start()>
                <div v-if="infoList && infoList.title" v-html="infoList.title"
                        @click="$router.push({path:'/parkHall/manage/noAndADDetail',query:{id:infoList.id}})"></div>
            </marquee>
            <div class="swiper_inner2" v-if="infoList && infoList.createTime">{{infoList.createTime |
                timerFormat}}
            </div>
        </div>
        <div class="row_width_auto">
            <el-row :gutter="0">
                <el-col :span="8" v-for="(item,index) in menuList" :key="index" v-if="item.isShow">
                    <div class="grid-content" @click="linkTo(item)">
                        <img :src="item.src" alt="">
                        <p>{{item.name}}</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>   -->
 </div>
</template>

<script>
 export default {
   data () {
     return {
         typeselect: "park_activity",
         currentIndex: "",
         msg: "新版园区首页",
        indexSeachKW: '',
        tagItems: [],
        sometags: [],
        tagTxt: "",//标签内容
     }
   },
   async created () {
        await this.getListInfoTags();
   },
   computed: {

   },
   methods:{
        clickTag(item, index) {
        this.tagTxt = item;
        this.currentIndex = index;
        this.goSearchPage();

        },
        //获取列表的标签
        resometags(data) {
            this.sometags = [];
            if (data && data.length) {
                this.sometags = data.map((item, index) => {
                    return item.tagTxt
                })
            }
        },
       goSearchPage() {
            let _this = this;
            var type = this.typeselect;//类型
            var tagTxt = this.tagTxt;//标签内容
            var title = this.indexSeachKW;
            setTimeout(() => {
                _this.$router.push({path: "/parkSearch", query: {type, tagTxt, title}});
            }, 1000)
        },
         //获取热门标签
       getListInfoTags() {
            var url = this.$apiUrl.parkInfo.getListTags;
            var parkId = sessionStorage.getItem("parkId") || "";
            var tagTpObj = {
                "park_activity": "3000002",//活动标签
                "park_gover": "3000004",//惠政标签
                "park_information": "3000003"//资讯标签
            }
            var tagTp = tagTpObj[this.typeselect] ? tagTpObj[this.typeselect] : "3000003";
            this.$post(url, {
                tagTp: tagTp,
                parkId: parkId

            })
                .then(response => {
                    var codestatus = response.resultCode;
                    if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                        var data = response.resultData;
                        this.tagItems = data;
                        this.resometags(data);
                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
        },
   },
   components: {

   }
 }
</script>

<style lang='less' scoped >
@import "../../../assets/css/mixin";
.banner_index {
  position: relative;
  height: 500px;
  overflow: hidden;
  .banner_bg {
    height: 100%;
    background: url("../../../assets/parkbanner.png") no-repeat center;
    .bgSize(cover);
  }
  .indexSeach {
    position: absolute;
    left: 50%;
    top: 40px;
    padding: 12px 16px 0;
    background-color: rgba(0, 0, 0, 0.7);
    margin-left: -450px;
    width: 900px;
    .typecon {
      //被傻逼全局污染了 只能打补丁了
      width: 80px;
      font-size: 16px;
      background: #fff;
    }
    .el-input-group__append {
      border: 1px solid @essp_nav_bg;
    }
    .el-input-group__append button.el-button {
      background-color: @essp_nav_bg;
      border: 1px solid @essp_nav_bg;
      color: #fff;
      .esspborder-radius(0);
      width: 118px;
      padding-left: 0;
      padding-right: 0;
    }
    .esspborder-radius(10px);
    .local {
      /*padding: 10px;*/
      padding-top: 5px;
      padding-bottom: 2px;
      span {
        float: left;
        height: 20px;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        margin-right: 10px;
        cursor: pointer;
      }
      .sel {
        color: @essp_nav_bg;
      }
    }
  }
}
.swiper_com {
  position: absolute;
  overflow: hidden;
  cursor: pointer;
  width: 800px;
  padding: 0 18px;
  left: 50%;
  top: -30px;
  height: 60px;
  line-height: 60px;
  margin-left: -400px;
  background: #fff;
  z-index: 1;
  box-shadow: 2px 2px 5px 1px #ccf;

  .esspborder-radius(6px);
  .swiper_inner {
    float: left;
    width: 80px;
    height: 52px;
    color: #333;
    overflow: hidden;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
  }
  .swiper_inner1,
  .swiper_inner3 {
    float: left;
    margin-left: 90px;
    font-size: 16px;
  }
  .swiper_inner2 {
    text-align: center;
    float: right;
    width: 120px;
    color: #999;
  }
  .swiper_inner3 {
    text-align: center;
    width: 450px;
  }
  ul,
  li,
  li span {
    float: left;
  }
  ul,
  li {
    width: 100%;
    cursor: pointer;
  }
  li {
    margin-bottom: 16px;
    span {
      font-size: 14px;
      .esspellipsis();
    }
    span:nth-child(1) {
      width: 14%;
      padding-left: 2%;
      font-weight: bold;
    }
    span:nth-child(2) {
      width: 69%;
      padding-left: 2%;
    }
    span:nth-child(3) {
      width: 13%;
      text-align: right;
    }
  }
}
// .indexMenu {
//   position: relative;
//   background: #fff url("../../../assets/imgs/ar-background.png") no-repeat
//     center bottom;
//   background-size: contain;
//   padding-top: 110px;
//   padding-bottom: 16px;
//   .grid-content {
//     cursor: pointer;
//     img {
//       display: block;
//       width: 130px;
//       margin: 0 auto;
//     }
//     p {
//       width: 200px;
//       margin: 0 auto;
//       text-align: center;
//       padding-top: 30px;
//       padding-bottom: 55px;
//     }
//   }
// }
 
</style>
