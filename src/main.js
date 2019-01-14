import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import App from "./App";
import router from "./router";
// import VueRouter from 'vue-router'
import ElementUI from "element-ui";
import echarts from "echarts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 引入下架图标
import "./assets/icon/iconfont.css";

Vue.use(ElementUI);
// 兼容IE9
import "babel-polyfill";
Vue.config.productionTip = false;

import VueLazyload from "vue-lazyload"; //引入这个懒加载插件
Vue.use(VueLazyload);

// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
    loading: "./assets/loading.png",
    error: "./assets/error.png"
});
// ajax全局配置
import { post, get, patch, put, del } from "./fetch/http";
import { apiUrl } from "./fetch/apiUrl";
import sessionStorageHandler from "./util/sessionStorageHandler"; // sessionStorage管理类
import localStorageHandler from "./util/localStorageHandler"; // localStorage管理类
import utils from "./util/utils";
import constants from "./util/constants";

//服务器域名
import { setting } from "./util/serveHttp";
// 设置字体图库
import fontIcon from "./assets/font/iconfont.css";
// 引入公共的举报弹窗
import commonJs from "./commonFun/commonJs";
import { menuListData } from "./mock/menuList";

//定义全局变量
Vue.prototype.$apiUrl = apiUrl;
Vue.prototype.$commonJs = commonJs;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$del = del;
Vue.prototype.$serveHttp = setting;
Vue.prototype.SSH = sessionStorageHandler; // 挂载一个sessionStorage的操作类到Vue
Vue.prototype.LSH = localStorageHandler; // 挂载一个localStorage的操作类到Vue
Vue.prototype.utils = utils;
Vue.prototype.constants = constants;
Vue.prototype.$echarts = echarts; // 图表库

import Moment from "moment";
Vue.filter("timerFormat", function(value){
    return Moment(value).format("YYYY-MM-DD HH:mm");
})

// Vue.prototype.$uploadCommom = uploadCommom;
let openUlr = "http://128.196.235.129:1345/essp_vue/#";
console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV === "production") {
//     openUlr = "http://want.bbc.com/essp/#";
// }
Vue.prototype.$openUrl = openUlr;

import axios from "axios";
Vue.prototype.$axios = axios;

// store 状态管理
import store from "./store";

// 在加载页面之前需要请求一个接口，这个接口主要是来判断是否需要请求菜单权限，
// 如果是从平台过来的表示已经登陆了，如果直接进来的则表示是表示域名进来的，
//  而这两种方式不同在于，从平台进来的，菜单权限已经有了，如果域名进来的则无需要调接口
// 判断是否从平台进来的还是从域名进来的
let LoginUserRol = "";
let bdParkId = "";
let oneId = "";
router.beforeEach(async (to, from, next) => {
    // 获取当前园区的权限
    // 没有token的时候，直接假数据
    // if (!to.token) {
    //     var mockdata = menuListData.menuList[0];
    //     sessionStorage.setItem("menuList", JSON.stringify(mockdata));
    //     next();
    // }

    // let query  = getQueryObjuect()
    let menuList = sessionStorageHandler.getItem("menuList");
    let parkId = to.query.parkId;
    if (parkId) {
        sessionStorageHandler.setItem("parkId", parkId);
    }
    let isUrlHasBd = window.location.origin.indexOf("bdppc") > -1;
    oneId = sessionStorageHandler.getItem("bdParkId")
    console.log(oneId)
        if(!oneId){
            oneId = sessionStorageHandler.getItem("parkId")
        }
    if (to.query.token) {
        sessionStorageHandler.setItem("token", to.query.token);
        if(to.query.label){
            await getParkByName(to.query.label);
        }else if(to.query.parkId){
            await getParkById(to.query.parkId)
        }
        await refreshAuthToken(to.query.token);
        // bdParkId 有此字段优先返回
        
        console.log(oneId)
        await getLoginUserRole({ parkId: oneId });
        await selectResMenu({ oneId, LoginUserRol });
        // router.push(to.path)
    } else if (!menuList && to.path !== "/parkList") {

        // 当路径中有parkId说明是别的地方直跳园区项目
        if (isUrlHasBd) {
            //判断是否保定园区路径，否则淮安， 以下通过方法获取保定园区信息
            await getParkByName("bdppc");
        } else if (to.query.parkId) {
            //获取淮安信息
            await getParkById(to.query.parkId);
        } else {
            //没有parkId时
            return router.push("/parkList");
        }
        await getLoginUserRole({ parkId: oneId});
        await selectResMenu({ oneId, LoginUserRol });
    }

    next();
});

async function getParkByName(name) {
    await post("/parkManage/getParkByRealmName", {
        realmName: name
    }).then(res => {
        if (res.resultData) {
            console.log(res.resultData)
            bdParkId = res.resultData.bdParkId
            sessionStorageHandler.setItem("parkId", res.resultData.parkId);
            sessionStorageHandler.setItem("parkName", res.resultData.parkNm);
            sessionStorageHandler.setItem("bdParkId", res.resultData.bdParkId);
            // 1/3去除多余参数不采用parkFlag
            // sessionStorageHandler.setItem("parkFlag", res.resultData.bdParkId);
            // 规则，如果有
            oneId = bdParkId ? bdParkId : sessionStorageHandler.getItem('parkId');
        }
    });
}
async function getLoginUserRole(options) {
    var urlapi = apiUrl.home.getLoginUserRole;
    var pop = { parkId: options.parkId };
    await post(urlapi, pop).then(
        response => {
            console.log(3);
            if (response.resultCode == "CLT000000000") {
                LoginUserRol = response.resultData;
                sessionStorage.setItem("LoginUserRol", LoginUserRol);
            } else {
                Message.info(response.resultMsg);
            }
        },
        response => {
            Message.info(response.resultMsg);
        }
    );
}
// 获取菜单权限 需要传入 parkId, 角色权限
async function selectResMenu(options, next) {
    var urlapi = apiUrl.home.selectResMenu;
    var pop = {
        sysType: "park",
        sysBsnAttr: options.oneId,
        postIdList: options.LoginUserRol
    };
    await post(urlapi, pop).then(
        response => {
            console.log(4);
            if (response.resultCode == "CLT000000000") {
                var menuList = response.resultData.menuList[0] || {};
                sessionStorageHandler.setItem("menuList", menuList);
            } else {
                Message.info(response.resultMsg);
            }
        },
        response => {
            Message.info(response.resultMsg);
        }
    );
}

async function refreshAuthToken(token) {
    await post(apiUrl.user.getOtherTokenUrl, { access_token: token }).then(
        response => {
            console.log(2);
            let data = response.resultData;
            // 开发阶段没必要加，暂时注释
            loginCtrl(data)
        }
    );
}
async function getParkById(parkId) {
    await post("/parkManage/getParkById", {
        parkId: parkId
    }).then(res => {
        if (res.resultCode == "CLT000000000") {
            console.log(res.resultData);
            if (res.resultData) {


                sessionStorageHandler.setItem("parkId", res.resultData.parkId);
                sessionStorageHandler.setItem(
                    "parkName",
                    res.resultData.parkNm
                );
                sessionStorageHandler.setItem(
                    "bdParkId",
                    res.resultData.bdParkId
                );
                bdParkId = res.resultData.bdParkId
                oneId = bdParkId ? bdParkId : sessionStorageHandler.getItem('parkId');
            }
        }
    });
}
function loginCtrl(data) {
    console.log(data.esspUserLoginVo);
    sessionStorageHandler.setItem("userInfo", data.esspUserLoginVo);
    sessionStorageHandler.setItem("freezeFlag", data.freeze);
    sessionStorageHandler.setItem("applyTag", data.applyTag);
    sessionStorageHandler.setItem("menuList", data.menuList);
    sessionStorageHandler.setItem("localAddr", data.localAddr);
    sessionStorageHandler.setItem("menuResource", data.routerResMap);
    // sessionStorageHandler.setItem(
    //     "menuResourceTmp",
    //     utils.getMenuResource(data.menuList)
    // );
    sessionStorageHandler.setItem("cstBscInfVo", data.cstBscInfVo);
    sessionStorageHandler.setItem("loginFlag", true);
    store.state.chat.user = data.esspUserLoginVo;
    if(data && data.esspUserLoginVo && data.esspUserLoginVo.userType){
        if (data.esspUserLoginVo.userType !== "01") {
            // 进行个人实名认证判断，
            // -1：异常   0：未认证   >1：已认证    2：认证开通  3：审核开通  4：刷脸认证开通
            let userAuthFlagTmp = parseInt(data.userAuthFlag);
            switch (userAuthFlagTmp) {
                case 2:
                case 3:
                case 4:
                    sessionStorageHandler.setItem("cetificateFlag", true);
                    break;
                case 0:
                    Message.info("该用户未进行实名认证");
                    sessionStorageHandler.setItem("cetificateFlag", false);
                    break;
                case 1:
                    Message.info("该用户个人实名认证中");
                    sessionStorageHandler.setItem("cetificateFlag", false);
                    break;
                default:
                    Message.info("该用户实名认证异常");
                    sessionStorageHandler.setItem("cetificateFlag", false);
                    break;
            }
            // 进行企业实名认证判断: -1：异常   0：未认证   1：认证中    2：已认证通过  3：已认证不通过
            let entAuthFlagTmp = parseInt(data.entAuthFlag);
            let enterpriseflagval = entAuthFlagTmp === 2 ? true : false;
            sessionStorageHandler.setItem("enterpriseFlag", enterpriseflagval);
        } else {
            sessionStorageHandler.setItem("cetificateFlag", true);
            sessionStorageHandler.setItem("enterpriseFlag", true);
        } 
    }
    
}
function getQueryObjuect(url) {
    url = url == null ? window.location.href : url;
    let search = url.substring(url.lastIndexOf("?") + 1);
    let obj = {};
    let reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function(rs, $1, $2) {
        let name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}
function getCodeType() {
    post(apiUrl.manage.getIdyInfo, {
        codeType: "RZZL_00012"
    }).then(
        response => {
            if (response.resultData) {
                window.localStorage.setItem(
                    "rzz",
                    JSON.stringify(response.resultData)
                );
            }
        },
        err => {}
    );
}
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>",
    created() {
        let rzz = localStorage.getItem("rzz");
        if (!rzz) {
            getCodeType();
        }
    }
});
