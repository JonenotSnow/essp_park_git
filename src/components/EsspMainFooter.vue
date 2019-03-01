<template>
  <div class="footer-container">
    <div class="root">
      <div class="root-pagination esspclearfix auto">

        <div class="root-center">
          <div class="center-list center-title-help">
            <div class="center-title">帮助中心</div>
            <ul>
              <li><a @click="toWebState">网站声明</a></li>
              <li><a @click="toAboutState">关于我们</a></li>
              <li><a @click="toContactUs">联系我们</a></li>
              <li><a @click="toVersion">版本说明</a></li>
              <li><a @click="toGuidance">操作指导</a></li>
              <li><a @click="toProblem">常见问题</a></li>
            </ul>
          </div>
          <div class="center-list center-title-hot">
            <div class="center-title">热门撮合</div>
            <ul>
              <li><a @click="redirectToRqmList('03',['04'])">投资融资</a></li>
              <li><a @click="redirectToRqmList('03',['03'])">国企混改</a></li>
              <li><a @click="redirectToRqmList('03',['09'])">文化产业</a></li>
              <li><a @click="redirectToRqmList('03',['05'])">节能减排</a></li>
              <li><a @click="redirectToRqmList('03',['01'])">PPP项目</a></li>
              <li><a @click="redirectToRqmList('03',['08'])">资产转让</a></li>
              <li><a @click="redirectToRqmList('03',['02'])">融资租赁</a></li>
            </ul>
          </div>
          <div class="center-list center-title-help">
            <div class="center-title">&nbsp;</div>
            <ul>
              <li><a @click="redirectToRqmList('03',['06'])">旅游项目</a></li>
              <li><a @click="redirectToRqmList('03',['07'])">金融扶贫</a></li>
            </ul>
          </div>
          <div class="center-list center-list-wisdom">
            <div class="center-title">智慧生态圈</div>
            <ul>
              <li><a @click="getUrlPath('bdPark')">保定科技企业服务平台</a></li>
              <li><a @click="getUrlPath('haPark')">淮安高新科技产业开发区</a></li>
              <li><a @click="getUrlPath('green')">绿色投融资项目库</a></li>
            </ul>
          </div>
          <div class="center-list center-list-entrance">
            <div class="center-title">快速入口</div>
            <ul>
              <li><a @click="publish">需求发布</a></li>
              <li><a @click="redirectToFoot(0)">我的商机</a></li>
              <li><a @click="toRequList">需求库</a></li>
              <li><a @click="toRequHall">需求大厅</a></li>
              <li><a @click="redirectToFoot(3)">资讯大厅</a></li>
              <li><a @click="redirectToFoot(1)">企业中心</a></li>
              <li><a @click="clickHandle(7)">乐享OA</a></li>
              <li><a @click="redirectToFoot(2)">精准扶贫</a></li>
            </ul>
          </div>
        </div>
        <div style="width: 510px;float: left;">
          <div class="esspclearfix">
            <div class="root-left esspclearfix">
              <div class="root-pagination-serverTel">
                <p class="serverTel">免费客服热线</p>
              </div>
              <div class="pm-content">
                <span class="pm-txt">咨询：</span>
                <span class="phone-num">0592-2155112</span>
              </div>
              <div class="pm-content">
                <span class="pm-txt">合作：</span>
                <span class="phone-num">0592-2155195</span>
              </div>
              <div class="pm-button"
                   @click="smartChat">
                <span>智能客服</span>
              </div>
            </div>
            <div class="root-right">
              <p style="color: #d4d4d4;font-size: 14px;margin-bottom: 16px; margin-right: 72px;">平台APP</p>
              <div>
                <!-- <img src="../assets/imgs/home/towCode-1.png" /> -->
                <img src="@/assets/imgs/jrzh-app.jpg"
                     width="128"
                     height="128" />
              </div>
              <div class="right-content">
              </div>
            </div>
          </div>
          <div class="root-right-img">
            <img src="../assets/imgs/home/ccb-2.png" />
            <img style="margin-left: 20px"
                 src="../assets/imgs/home/ccb-1.png" />
          </div>
        </div>

      </div>
    </div>
    <div class="root-foot">
      <div class="root-foot-div">
        <span class="root-foot-div-span">关注建行: </span>
        <span @click="bottomUrl(1)">建行官网</span>
        <span @click="bottomUrl(2)">善融商务</span>
        <span @click="bottomUrl(3)">企业网银</span>
        <span @click="bottomUrl(4)">建融家园</span>
        <span @click="bottomUrl(5)">建行云</span>
      </div>
    </div>

    <div class="root-bottom">
      <div class="bottom-pagination auto">
        <div class="content">
          <div class="txt">
            <span class="txt-2">Copyight 2017-2018 建信金科有限责任公司版权所有 京ICP备13030780号</span>
            <span class="txt-2"><img class="police"
                   src="../assets/imgs/home/police.png" />京公网安备：110102000450</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "@/fetch/apiUrl.js";

export default {
  name: "EsspMainFooter",
  props: {},
  components: {},
  data() {
    return {
      showBack: false,
      searchForm: {},
      hotRecords: [],
      EsspUrl: '',
      OApath: "",
      userMobile: ""
    };
  },
  created() {
    let flag = this.SSH.getItem("loginFlag");
    if (this.SSH.getItem("userInfo")) {
      this.userMobile = this.SSH.getItem("userInfo").mobile;
    }
    this.OApath = this.SSH.getItem("OApath");
    let hotRecords = localStorage.getItem("hotRecords");
    if (!hotRecords) {
      this.getHotRecord();
    } else {
      this.hotRecords = JSON.parse(hotRecords);
    }
      this.$post(this.$apiUrl.loving.esspLogin, {
          urlType: 'vue'
      })
          .then((response) => {
              //1级菜单
              this.EsspUrl = response.resultData
              console.log(this.EsspUrl)
          }, (err) => {

          })
  },
  methods: {
    getHotRecord() {
      this.$post(apiUrl.home.getHotRecord, {}).then(response => {
        if (response.resultMsg == "success")
          this.hotRecords = response.resultData.srchRcdList;
        localStorage.setItem("hotRecords", JSON.stringify(this.hotRecords));
      });
    },
    goToRqmList() {
//      this.$router.push({
//        name: "requ-requRqmlist",
//        params: { data: this.searchForm }
//      });
        window.open(this.EsspUrl + `/requIndex/requRqmlist?serviecTpCd=${serviecTpCd}&rqmTpCd=${rqmTpCd}&channel=INFO`,'_blank')
    },
    redirectToRqmList(serviecTpCd, rqmTpCd, keyword) {
      // if (serviecTpCd || rqmTpCd) {
      //   this.searchForm.serviecTpCd = serviecTpCd;
      //   this.searchForm.rqmTpCd = rqmTpCd;
      // }
      // console.log("searchForm:",this.searchForm);
      // this.$router.push({
      //   name: "requ-requRqmlist",
      //   params: { data: this.searchForm }
      // });
//      let urlData = this.$router.resolve({
//        name: "requ-requRqmlist",
//        query: {
//          serviecTpCd: serviecTpCd,
//          rqmTpCd: rqmTpCd,
//          keyword: keyword
//        }
//      });
      window.open(this.EsspUrl + `/requIndex/requRqmlist?serviecTpCd=${serviecTpCd}&rqmTpCd=${rqmTpCd}&keyword=${keyword?keyword:''}&channel=INFO`,'_blank')
//      window.open(urlData.href, "_blank");
    },
    scrollHandle() {
      let scorllTop =
        window.pageYOffset ||
        document.documentElement.scorllTop ||
        document.body.scorllTop;
      if (scorllTop > 538) {
        this.showBack = true;
      } else {
        this.showBack = false;
      }
    },
    bottomUrl(s) {
      switch (s) {
        case 1:
          this.utils.advUrlturn("http://www.ccb.com");
          break;
        case 2:
          this.utils.advUrlturn("http://mall.ccb.com");
          break;
        case 3:
          this.utils.advUrlturn(
            "http://www.ccb.com/cn/ebank/homepage_corporate.html"
          );
          break;
        case 4:
          this.utils.advUrlturn("http://wh.jiayuan.ccbhome.cn/");
          break;
        case 5:
          this.utils.advUrlturn("http://yun.ccb.com");
          break;
      }
    },
    greenPro(s) {
      switch (s) {
        case 0:
          this.utils.advUrlturn("/cqgreenfin/#/");
          break;
        case 1:
          this.utils.advUrlturn("/bdppc/#/parkHome?label=bdPark2018");
          break;
        case 2:
          this.utils.advUrlturn("/essp_park/#/parkHome?label=haPark2018");
          break;
      }
    },
    toTop() {
      // - 回到滚动顶部
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    toPublishPage(url) {
      let userInfo = this.SSH.getItem("userInfo");
      if (!this.utils.isEmpty(userInfo)) {
        this.toTop();
//        this.$router.push("/requIndex/publish/" + url);
          window.open(this.EsspUrl + "/requIndex/publish/" + url + "?&channel=INFO",'_blank')
      } else {
        this.$message({
          type: "error",
          message: "您还未登录，请先登录！"
        });
//        this.$router.push({ path: "/userIndex/login" });
          window.open(this.EsspUrl + "/userIndex/login?&channel=INFO",'_blank')
      }
    },
    toRequHall() {
//      let urlData = this.$router.resolve({
//        path: "/requIndex/allClass"
//      });
        window.open(this.EsspUrl + "/requIndex/allClass?&channel=INFO",'_blank')
//      window.open(urlData.href, "_blank");
    },
    toRequList() {
//      let urlData = this.$router.resolve({
//        path: "/requIndex/requRqmlist"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/requIndex/requRqmlist?&channel=INFO",'_blank')
    },
    toGuidance() {
//      let urlData = this.$router.resolve({
//        path: "/helpCenter/guidance"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/helpCenter/guidance?&channel=INFO",'_blank')
    },
    toProblem() {
//      let urlData = this.$router.resolve({
//        path: "/helpCenter/problem"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/helpCenter/problem?&channel=INFO",'_blank')
    },
    toVersion() {
//      let urlData = this.$router.resolve({
//        path: "/aboutUs/version"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/aboutUs/version?&channel=INFO",'_blank')
    },
    toContactUs() {
//      let urlData = this.$router.resolve({
//        path: "/aboutUs/contactUs"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/aboutUs/contactUs?&channel=INFO",'_blank')
    },
    toWebState() {
//      let urlData = this.$router.resolve({
//        path: "/aboutUs/webState"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/aboutUs/webState?&channel=INFO",'_blank')
    },
    toAboutState() {
//      let urlData = this.$router.resolve({
//        path: "/aboutUs/aboutState"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/aboutUs/aboutState?&channel=INFO",'_blank')
    },
    //去数据库获取菜单path
    getUrlPath(urlTmp) {
      let vm = this;
      this.$post(this.$apiUrl.loving.esspLogin, {
        mobile: "",
        urlType: urlTmp
      }).then(response => {
        vm.OApath = response.resultData;
        window.open(vm.OApath, "_blank");
      });
    },
    smartChat() {
//      let urlData = this.$router.resolve({
//        name: "help-smartSer1"
//      });
//      window.open(urlData.href, "_blank");
        window.open(this.EsspUrl + "/helpCenter/smartSer1?&channel=INFO",'_blank')
    },
    redirectToFoot(val) {
      switch (val) {
        case 0:
//          let urlData = this.$router.resolve({
//            path: "/requIndex/requMyrqm/all"
//          });
//          window.open(urlData.href, "_blank");
            window.open(this.EsspUrl + "/requIndex/requMyrqm/all?&channel=INFO",'_blank')
          break;
        case 1:
//          let urlData2 = this.$router.resolve({
//            path: "/centerIndex/home"
//          });
//          window.open(urlData2.href, "_blank");
            window.open(this.EsspUrl + "/centerIndex/home?&channel=INFO",'_blank')
          break;
        case 2: //精准扶贫
          this.getUrlPath("jzfp");
          break;
        case 3: //资讯大厅
          this.getUrlPath("news");
          break;
      }
    },
    //需求发布跳转
    publish() {
      let vm = this;
      let userInfo = this.SSH.getItem("userInfo");
      if (!this.utils.isEmpty(userInfo)) {
//        let url = this.$router.resolve({
//          path: "/requIndex/publish/pro-server/ppp"
//        });
//        window.open(url.href, "_blank");
          window.open(this.EsspUrl + "/requIndex/publish/pro-server/ppp?&channel=INFO",'_blank')
      } else {
        this.$message({
          type: "error",
          message: "您还未登录，请先登录！"
        });
//        this.$router.push({ path: "/userIndex/login" });
          window.open(this.EsspUrl + "/userIndex/login?&channel=INFO",'_blank')
      }
    },
    clickHandle(index) {
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          // -乐享OA
          let vm = this;
          this.$post(apiUrl.user.getOApath, {
            mobile: this.userMobile
          }).then(response => {
            vm.OApath = response.resultData;
            vm.SSH.setItem("OApath", response.resultData);
            window.open(this.OApath);
          });
          break;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.scrollHandle);
  }
};
</script>
<style lang="less" scoped>
.footer-container {
  position: relative;
}
.root {
  width: 100%;
  height: 313px;
  display: flex;
  //justify-content: center;
  background: #2b3237;

  .root-pagination {
    height: 100%;
    margin: 0px auto;
    width: 1200px;
    .root-left {
      .root-pagination-serverTel {
        margin-bottom: 14px;
      }
      margin-right: 24px;
      float: right;
      margin-top: 36px;
      .serverTel {
        color: #d4d4d4;
        font-size: 12px;
      }
      .pm-button {
        cursor: pointer;
        margin-top: 16px;
        width: 56px;
        border: 1px solid #1ca2ff;
        background: #1ca2ff;
        padding: 8px 30px;
        span {
          width: 58px;
          color: #ffffff;
          font-size: 14px;
        }
          &:hover{
              background: #66b1ff;
              border-color: #66b1ff;
              color: #fff;
          }
      }
      .pm-content {
        display: flex;
        align-items: center;
        margin-top: 4px;
        .pm-txt {
          font-size: 14px;
          color: #999999;
        }
        .phone-num {
          width: 207px;
          font-size: 28px;
          color: #ffffff;
        }
      }
    }
    .root-center {
      margin-top: 36px;
      float: left;
      border-right: 1px solid #4e4e4e;
      .center-list {
        float: left;
        width: 124px;
        .center-title {
          font-size: 14px;
          color: #ffffff;
        }
        ul {
          margin-top: 13px;
          li {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
              color: #cacaca;
              font-size: 12px;
              line-height: 26px;
              height: 26px;
              cursor: pointer;
              &:hover {
                color: #fff;
              }
            }
          }
        }
      }
      .center-list-wisdom {
        width: 220px;
      }
      .center-title-help {
        width: 129px;
      }
      .center-title-hot {
        width: 98px;
      }
      .center-list-entrance {
        width: 110px;
      }
    }
    .root-right {
      width: 232px;
      margin-top: 36px;
      float: left;
      text-align: center;
      .right-content {
        margin-top: 26px;
      }
      .root-right-txt {
        color: #ffffff;
        margin-top: 2px;
        .r-sp {
          padding-left: 4px;
        }
        .r-addr {
          font-size: 12px;
        }
        .r-addr-img {
          margin-left: 1px;
        }
        .r-mail {
          font-size: 15px;
          letter-spacing: 0.5px;
        }
      }
    }
    .root-right-img {
      margin-left: 50px;
      margin-top: 4px;
    }
  }
}

.root-bottom {
  width: 100%;
  height: 35px;
  background: #2b3237;
  .bottom-pagination {
    text-align: center;
    border-top: 1px solid #5c5c5c;
    .content {
      padding: 0px !important;
      .txt {
        font-size: 12px;
        color: #858585;
        line-height: 33px;
        .txt-1 {
          font-size: 14px;
        }
        .txt-2 {
          font-size: 14px;
          .police {
            display: inline-block;
            vertical-align: -4px;
            margin: 0 4px;
          }
        }
      }
    }
  }
}
.root-foot {
  width: 100%;
  height: 50px;
  background-color: #2b3237;
  .root-foot-div {
    margin: 0px auto;
    width: 1200px;
    border-top: 1px solid #4e4e4e;
    height: 100%;
    line-height: 50px;
    color: #7e8f96;
    span {
      margin-right: 36px;
      cursor: pointer;
        &:hover{
            color: #fff;
        }
    }
    .root-foot-div-span {
      color: #d4d4d4;
      cursor: text;
    }
  }
}
</style>
