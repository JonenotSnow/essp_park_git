<template>
  <div class="header-wrap">
    <div class="header">
      <div class="no-support esspclearfix" v-show="isuplevel">
        <i class="el-icon-error"></i>
        <div class="sup-txt">当前浏览器版本过低，请更换其他浏览器进行访问！
          <span class="uplevel" @click="uplevel">升级</span>
        </div>
      </div>

      <div class="headinfo esspclearfix">
        <div class="auto">
          <div class="desc" v-if="!loginShow">
            <span>亲，欢迎来到企业智能撮合综合服务平台（ESSP）！</span>
            <span class="login" @click="toLogin">登录</span>
            <span> / </span>
            <span class="register" @click="toRegister">注册</span>
          </div>
          <div class="desc" v-else>
            {{userName}} &nbsp;您好，欢迎来到企业智能撮合综合服务平台！
            <span @click="logout" class="desclogout"> [退出]</span>
          </div>
          <ul class="headulcon">
            <li @click="toHome">首页</li>
            <li @click="toPersonalCenter">个人中心</li>
            <li @click="toMessageCenter">消息中心
              <span class="msg" v-show="new_msg && loginShow" :class="{'msg-line': !isNum}">{{msgNum}}</span>
            </li>
            <li @click="toHelpCenter">关于我们</li>
            <li @click="toCustomerService">帮助中心</li>
            <li @click="toAdmin" v-if="toAdminShow">管理后台</li>
            <!--<li @click="toOAsys">乐享OA</li>-->
          </ul>
        </div>
      </div>

      <div style="height: 76px;">
        <!-- 如果需要调整，请联系林河钦 -->
        <!-- <div> -->
        <div class="headmain" id="bignav" :class="searchBarFixed == true ? 'isFixed' :''">
          <div class="auto padding esspclearfix">
            <div class="logocon">
              <img :src="isBdPark?logoUrl:logoUrl1" alt="" :class="isBdPark?'bdlogo':''" @click="toHome">
            </div>

            <div class="header_nav">
              <EsspNav :routerType="routerTypeNum"></EsspNav>
              <div class="search" v-if="!isBdPark">
                  <i class="el-icon-search open" v-if="!tab" @click="changeTab"></i>
                  <div v-else>
                      <div class="searchBox">
                          <span class="left" slot="reference" @click="show = !show">{{typeName}}<i class="el-icon-arrow-down" :class="{'iActive':show}"></i></span>
                          <input type="text" placeholder="请输入搜索关键字" v-model="indexSeachKW">
                          <i class="el-icon-search" @click="goSearchPage"></i>
                      </div>
                      <transition name="el-zoom-in-top">
                          <div class="pop" v-if="show">
                              <ul v-for="(item,i) in searchList" :key="i">
                                  <li @click.self="getListInfoTags(item)">{{item.name}}</li>
                              </ul>
                          </div>
                      </transition>
                  </div>
              </div>
            </div>

            <!-- 全局搜索控件 -->
            <!-- <div :class="isSearchPage?'search-list':'seachinput-dropdown'"
                 v-if="routerTypeNum != 1">
              <el-input placeholder="请输入服务/商品/需求名称或关键词"
                        v-model="search.keyword"
                        class="input-with-select">
                <el-select v-model="search.type"
                           slot="prepend"
                           placeholder="类型">
                  <el-option label="企业"
                             value="0"></el-option>
                  <el-option label="服务"
                             value="1"></el-option>
                  <el-option label="需求"
                             value="2"></el-option>
                  <el-option label="商品"
                             value="4"></el-option>
                </el-select>
                <div slot="append"
                     class="search-button"
                     @click="redirectToSearchPage">
                  <span>搜索</span>
                </div>
              </el-input>
            </div> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import EsspNav from "@/components/EsspNav";
import { apiUrl } from "@/fetch/apiUrl.js";
import EsspJzfpNav from "@/components/EsspJzfpNav";
import { mapGetters } from "vuex";
import bus from "../eventBus";
import mixin from "@/components/mixins/mixins_windowOpen.js";
// 如果type值等于2,那么加载精准扶贫导航,反之正常加载
// navBarData 引入导航数据
// active 告知精准扶贫导航现在哪个点亮
export default {
    name: "",
    props: ["routerTypeNum", "type", "navBarData", "jzfpLogo", "active"],
    mixins: [mixin],
    components: {
        EsspNav,
        EsspJzfpNav
    },
    data() {
        return {
            seachVal: "",
            searchBarFixed: false,
            loginShow: false,
            userName: "",
            search: {
                keyword: "",
                type: "2"
            },
            isSearchPage: false,
            OApath: "",
            userInfo: "",
            toAdminShow: false,
            sendTo: false,
            new_msg: false,
            msgNum: 0,
            isNum: true,
            isuplevel: false,
            isBdPark: this.utils.isBdPark() || "",
            logoUrl: require("@/assets/newparkimg/home/logo.png"),
            logoUrl1: require("@/assets/essp_logo.png"),
            typeselect: "park_activity",
            typeName: "活动",
            show:false,
            searchList:[
                {
                    name:'活动',
                    id:'park_activity'
                },
                {
                    name:'惠政',
                    id:'park_gover'
                },
                {
                    name:'资讯',
                    id:'park_information'
                }
            ],
            indexSeachKW:'',//搜索框内容
        };
    },
    computed: {
        ...mapGetters(["getUnReadNum"]),
        tab(){
            return this.$store.state.park.searchState;
        }
    },
    mounted() {
        this.ready();
        this.addEvent("scroll", this.handleScroll);
    },
    created() {
        let vm = this;

        // alert("正版的isBdPark"+this.isBdPark);
        this.isLogin();
        this.getNewMsg();
        // this.checkIsSearchPage();
        this.adminShow();
        bus.$on("isRefresh", function(val) {
            vm.getNewMsg();
        });
        // -IE9 判断
        if (navigator.userAgent.indexOf("MSIE 9") > -1) {
            this.isuplevel = true;
        }
    },
    watch: {
        $route() {
            this.isLogin();
            // this.checkIsSearchPage();
            this.adminShow();
            this.isBdPark = this.utils.isBdPark();
        },
        navBarData: {
            handler: function(val) {
                this.navBarData = val;
            },
            immediate: true, //关键
            deep: true
        },
        sendTo: {
            handler: function(val) {
                this.$emit("getValue", val);
            },
            deep: true
        }
    },
    methods: {
        uplevel() {
            window.open(
                "https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads"
            );
        },

        smartChat() {
            this.$router.push({
                name: "help-smartSer1"
            });
        },

        windowChat() {
            let userInfo = this.SSH.getItem("userInfo");
            let vm = this;
            if (userInfo) {
                this.$post(this.$apiUrl.chat.getFriendsList, {
                    pageNum: 1,
                    pageSize: 100,
                    type: "1",
                    userId: vm.SSH.getItem("userInfo").id
                }).then(response => {
                    let list = [];
                    list = response.resultData;
                    vm.$store.dispatch("initData", list);
                });
                this.$store.dispatch("windowChat", true);
                this.$store.state.chat.unReadNum = 0;
            } else {
                this.windowHrefUrl("/userIndex/login");
            }
        },
        getNewMsg() {
            let vm = this;
            if (
                !this.utils.roleExist(this.constants.userRole.systemManager.key)
            ) {
                if (!this.loginShow) {
                    return;
                } else {
                    this.$post(apiUrl.user.getNewMsg, {}).then(response => {
                        let msgData = response.resultData;
                        if (
                            msgData.rqmMsg > 0 ||
                            msgData.systemMsg > 0 ||
                            msgData.subMsg > 0
                        ) {
                            vm.new_msg = true;
                            vm.msgNum =
                                msgData.rqmMsg +
                                msgData.systemMsg +
                                msgData.subMsg;
                            if (vm.msgNum > 99) {
                                vm.isNum = false;
                                vm.msgNum = "...";
                            }
                        } else if (
                            msgData.rqmMsg == 0 ||
                            msgData.systemMsg == 0 ||
                            msgData.subMsg == 0
                        ) {
                            vm.new_msg = false;
                            vm.msgNum = 0;
                        }
                    });
                }
            }
        },
        handleScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop > 35) {
                this.searchBarFixed = true;
            } else {
                this.searchBarFixed = false;
            }
            let windowHeight = $(window).height();
            if (scrollTop + windowHeight >= 538) {
                this.sendTo = true;
            }
        },
        addEvent(ev, fn) {
            if (window.attachEvent) {
                window.attachEvent("on" + ev, fn);
            } else {
                window.addEventListener(ev, fn, false);
            }
        },
        login() {},
        toHome() {
            if(this.isBdPark) {
                this.tolink();
            } else {
                this.windowOpenNoParams("/");
            }

        },
        tolink() {
            this.$router.push("/parkHome");
        },
        toLogin() {
            this.windowHrefUrl("/userIndex/login");
        },
        toRegister() {
            this.windowOpenNoParams("/userIndex/register");
        },
        toPersonalCenter() {
            this.windowOpenNoParams("/personalCenter");
        },
        toMessageCenter() {
            this.new_msg = false;
            this.windowOpenNoParams("/messageCenter");
        },
        toCustomerService() {
            this.windowOpenNoParams("/helpCenter");
        },
        toHelpCenter() {
            this.windowOpenNoParams("/aboutUs/aboutState");
        },
        isLogin() {
            let data = this.SSH.getItem("userInfo");
            let flag = this.SSH.getItem("loginFlag");
            if (flag) {
                this.userName = data.truename;
                this.SSH.setItem("userName", data.truename);
            }
            this.loginShow = flag;
        },
        toOAsys() {
            if (this.OApath) {
                window.open(this.OApath);
            }
        },
        adminShow() {
            if (
                this.utils.roleExist([
                    this.constants.userRole.platformPrimaryManager.key,
                    this.constants.userRole.platformAdvancedManager.key,
                    this.constants.userRole.primaryService.key,
                    this.constants.userRole.advancedService.key,
                    this.constants.userRole.contentOperation.key,
                    this.constants.userRole.dataAnalysis.key,
                    this.constants.userRole.developer.key,
                    this.constants.userRole.branchOperationManager.key,
                    this.constants.userRole.systemManager.key
                ])
            ) {
                this.toAdminShow = true;
            } else {
                this.toAdminShow = false;
            }
        },
        toAdmin() {
            if (
                this.utils.roleExist(
                    this.constants.userRole.branchOperationManager.key
                )
            ) {
                this.$router.push({
                    name: "admin-certification"
                });
            } else {
                this.$router.push({
                    path: "/admin"
                });
            }
        },

        async logout() {
            if (this.SSH.getItem("loginFlag")) {
                this.loginShow = false;
                this.SSH.setItem("LoginUserRol", ["11"]);
                await this.selectResMenu();
                await this.utils.logoutDelSSH();
                this.SSH.setItem("loginFlag", false);

                this.$message.info("退出登录成功!");
                // this.$router.push({
                //     path: '/parkHome',
                // });
                let that = this;
                setTimeout(() => {
                    that.windowHrefUrlNormal("/userIndex/login");
                }, 1000);
            }
        },
        // 获取菜单权限 需要传入 parkId, 角色权限
        async selectResMenu() {
            var urlapi = this.$apiUrl.home.selectResMenu;
            var pop = {
                sysType: "park",
                sysBsnAttr: this.SSH.getItem("bdParkId"),
                postIdList: ["11"]
            };
            await this.$post(urlapi, pop).then(
                response => {
                    console.log(4);
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    var menuList = response.resultData.menuList[0] || {};
                    this.SSH.setItem("menuList", menuList);
                    this.SSH.setItem(
                        "menuResource",
                        response.resultData.routerResMap
                    );
                    // } else {
                    //     this.$message.info(response.resultMsg);
                    // }
                },
                response => {
                    this.$message.info(response.data.resultMsg);
                }
            );
        },
        //标准版搜索框
        changeTab(){
            this.$store.commit('getSearchState',{show:!this.tab})
        },
        //监听搜索框选项改变
        ready() {
            document.addEventListener('click', (e) => {
                if (e.path[0].className == 'el-icon-arrow-down' || e.path[0].className == 'left') {
                    this.show = true
                }else{
                    this.show = false
                }
            })
        },
        getListInfoTags(item){
            this.typeselect = item.id;
            this.typeName = item.name;
            this.show = false;
        },
        goSearchPage() {
            //重新打开页面打开
            // var type = this.typeselect; //类型
            // var tagTxt = this.tagTxt; //标签内容
            // var title = this.indexSeachKW;
            // let routeData = this.$router.resolve({
            //     name: "detail",
            //     query: {type, tagTxt, title}
            // });
            // window.open(routeData.href, '_blank');

            this.$store.commit('getSearchState',{show:!this.tab})
            let _this = this;
            var type = this.typeselect; //类型
            var tagTxt = this.tagTxt; //标签内容
            var title = this.indexSeachKW;
            setTimeout(() => {
                _this.$router.push({
                    path: "/parkSearch",
                    query: {type, tagTxt, title}
                });
            }, 1000);
            this.indexSeachKW = '';
            this.typeselect = 'park_activity'
        }
    }
};
</script>

<style lang='less'>
@import "../assets/css/mixin";
@headifon_btn_height: 36px;
@head_font_s: 12px;
@head_font_c: #999999;
.header-wrap {
    .el-scrollbar__wrap {
        overflow: hidden;
    }
    background-color: @essp_con_bg;
    border-bottom: #addbff 1px solid;
}

.header {
    .desc {
        float: left;
        .padding(7px 0);
        font-size: @head_font_s;
        color: @head_font_c;
        .login {
            cursor: pointer;
            color: #00a0e9;
        }
        .register {
            cursor: pointer;
            &:hover {
                color: #00a0e9;
            }
        }
    }
    .desclogout {
        .padding(7px 0);
        font-size: @head_font_s;
        cursor: pointer;
    }
    .no-support {
        padding: 4px 0 4px 20px;
        color: #ed4a43;
        background-color: #fcf0f0;
        border: 2px solid #ffd4d2;
        .sup-txt {
            display: inline-block;
            color: #ed4a43;
            .uplevel {
                cursor: pointer;
                color: #00a0e9;
            }
        }
    }
    .headinfo {
        .auto {
            .essp_width_auto();
            overflow: hidden;
        }
        background-color: #ffffff;
        border-bottom: 1px solid #eeeeee;
    }
    .isFixed {
        position: fixed;
        background-color: @essp_con_bg;
        top: 0;
        width: 100%;
        min-width: @essp_width_auto;
        z-index: 1001;
        box-shadow: 0px 4px 21px 0px rgba(116, 116, 116, 0.12);
    }
}

.header_nav {
    float: left;
    // width: 604px;
}

.headulcon {
    float: right;

    li {
        position: relative;
        float: left;
        .padding(7px 0);
        margin-left: 40px;
        cursor: pointer;
        &:hover {
            color: #00a0e9;
        }
    }
    .msg {
        background: #e97259;
        border-radius: 50%;
        border: 2px solid #e97259;
        position: absolute;
        z-index: 100;
        top: -2px;
        margin-left: -6px;
        text-align: center;
        color: #fff;
        transform: scale(0.7);
        width: 20px;
        height: 20px;
    }
    .msg-line {
        line-height: 10px;
    }
}

.seachinput {
    float: left;
    width: 200px;
    padding-top: 5px;
    input {
        height: 28px;
        line-height: 28px;
    }
    .el-input__inner {
        border: 2px solid @essp_nav_bg;
    }
    .el-input-group__append,
    .el-input-group__prepend {
        border: 2px solid @essp_nav_bg;
        background-color: @essp_nav_bg;
        color: @essp_con_bg;
        .padding(0 10px);
        .el-button {
            margin: -10px -12px;
            padding: 0 20px;
        }
    }
}

.search-list {
    .el-input-group__prepend .el-select .el-input {
        width: 85px;
    }
    .el-select .el-input__inner {
        width: 100%;
        padding-right: 0px;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 0px;
    }
    .el-input-group__prepend {
        width: 45px;
        font-size: 14px;
        background-color: transparent;
        color: #666;
        border: 2px solid #26a7eb !important;
        border-right-width: 0px;
        border-radius: 0px;
    }
    .el-input-group__append {
        border: 2px solid #26a7eb;
        background-color: #00a0e9;
        color: #666;
        border-radius: 0px;
    }
    .el-input__inner {
        border-top: 2px solid #26a7eb;
        border-bottom: 2px solid #26a7eb;
        border-left-width: 0px;
        border-right-width: 0px;
        font-size: 14px;
    }
    input {
        height: 46px;
        line-height: 46px;
    }
}

.seachinput-dropdown {
    float: right;
    width: 360px;
    input {
        height: 36px;
        line-height: 36px;
    }
    .el-input-group__prepend .el-select .el-input {
        width: 72px;
    }
    .el-select .el-input__inner {
        width: 100%;
        padding-right: 0px;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 0px;
    }
    .el-input__inner {
        border: 1px solid #26a7eb;
        font-size: @head_font_s;
    }
    .el-input-group__append {
        border: 1px solid #26a7eb;
        background-color: #409eff;
        color: @essp_con_bg;
        .padding(0 10px);
        .el-button {
            margin: -10px -12px;
            padding: 0 20px;
        }
    }
    .el-input-group__prepend {
        width: 40px;
        font-size: @head_font_s;
        border: 1px solid #26a7eb;
        background-color: transparent;
        color: #000000;
        border-right-width: 0px;
        .padding(0 12px);
        .el-select {
            margin: -10px -16px;
            .el-input {
                .el-select__caret {
                    font-size: @head_font_s;
                }
            }
        }
        .el-input__icon {
            line-height: 16px;
        }
    }
    .search-button {
        font-size: 16px;
        color: #ffffff;
        padding: 9px 14px;
        line-height: 16px;
        cursor: pointer;
        background-color: #409eff;
        border-color: #409eff;
    }
}

.headbtncon {
    span {
        float: left;
        height: 36px;
        margin-right: 5px;
        color: #666;
        line-height: 36px;
        &:hover {
            color: #932;
        }
    }
}

.headmain {
    padding: 20px 0;
    .auto {
        .essp_width_auto();
    }
    background: @essp_con_bg;
}

.logocon {
    float: left;
    width: 187px;
    height: 38px;
    margin-right: 29px;
    position: relative;
    &.bdlogo {
        width: 212px;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .jzfp-logo {
        position: absolute;
        width: 160px;
        height: 60px;
        top: -11px;
        left: 20px;
    }
}

.serchcon {
    float: left;
    .headserch {
        float: left;
        width: 420px;
        height: 36px;
        border: solid 2px #0066b3;
    }
    .serchbtn {
        float: left;
        width: 45px;
        height: 40px;
        background-color: #0066b3;
    }
}

.headul {
    float: right;
    li {
        float: left;
    }
    li a {
        float: left;
        margin-left: 33px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        color: #333333;
        &:hover {
            color: #932;
        }
    }
}
</style>
<style lang='less' scoped>
.el-select-dropdown__item {
    padding: 0 15px;
}

.search-list {
    width: 60%;
    margin: 0 auto;
    z-index: 999;
    margin-left: 20%;
    .search-button {
        font-size: 16px;
        color: #ffffff;
        padding: 9px 12px;
        line-height: 16px;
        cursor: pointer;
        span {
            letter-spacing: 4px;
        }
    }
}

.smartSer {
    cursor: pointer;
    display: block;
    position: fixed;
    right: 3px;
    bottom: 10px;
    z-index: 99;
    span {
        float: left;
    }
    .msg-chat {
        background: #e97259;
        border-radius: 50%;
        border: 2px solid #e97259;
        position: relative;
        z-index: 100;
        left: -34px;
        text-align: center;
        color: #fff;
        transform: scale(0.7);
        width: 20px;
        height: 20px;
    }
    .msg-chat-line {
        line-height: 10px;
    }
}

.search{
    float: left;
    width: 290px;
    position: relative;
    top:3px;
}
.open{
    color:#00a0e9;
    position: absolute;
    top:6px;
    font-size: 18px;
    left: 15px;
    cursor: pointer;
}
.searchBox{
    width: 210px;
    height: 30px;
    padding: 0 10px;
    line-height:30px;
    background-color: #f8f8f8;
    border-radius: 15px;
    position: relative;
    top: 2px;
    left: 40px;
    .left{
        cursor: pointer;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1.2px;
        color: #666666;
        border-right:1px solid #ccc;
        i{
            padding:0 9px;
            transform: rotate(0deg);
        }
        .iActive{
            transform: rotate(180deg)
        }
    }
    input{
        border:none;
        outline: none;
        height:30px;
        background:#f8f8f8;
        width:115px;
        padding:0 5px;
    }
    &>i{
        cursor: pointer;
    }

}
.pop{
    position: absolute;
    top: 38px;
    left: 48px;
    z-index: 101;
    border-radius:4px;
    background: #fff;
    box-shadow: 0 0 5px #ddd;
    ul{
        width:60px;
        li{
            height:30px;
            line-height:30px;
            color: #333;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>
