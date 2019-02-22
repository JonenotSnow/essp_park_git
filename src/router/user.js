import sessionStorageHandler from "../util/sessionStorageHandler";
import NProgress from "nprogress";
// import { Message } from "element-ui";
import Message from '../util/message'
import constants from "../util/constants";
import utils from "../util/utils";

export const userRouter = {
    path: '/userIndex',
    name:"user-login",
    // component: resolve => require(['@/views/user/login/index'], resolve),
    component: resolve => require(['@/components/EsspHeadFootRouter'], resolve),
    redirect: '/userIndex/login',
    children: [
        { // 登录
            path: '/userIndex/login',
            name:"login",
            component: resolve => require(['@/views/user/login/userLogin'], resolve),
        }
    ],
    beforeEnter: (to, from, next) => {
        verifyLogin(to, from, next)
    }
}


export const personInforRouter = {
    path: '/userIndex',
    name:"user",
    // component: resolve => require(['@/views/user/index'], resolve),
    component: resolve => require(['@/components/EsspHeadFootRouter'], resolve),
    redirect: '/userIndex',
    children: [
        {
            path: '/personalCenter',
            name:"user-personalCenter",
            component: resolve => require(['@/components/EsspLeft'], resolve),
            redirect: '/personalCenter/personalInfor',
            children:[
                { // 个人信息
                    path:'/personalCenter/personalInfor',
                    name:'user-personalInfor',
                    component: resolve => require(['@/views/user/personalCenter/personalInfor'], resolve),
                    meta: {
                        api: 'guangkai',
                        urlKey: 'portrait'
                    }
                },{ // 修改密码
                    path:'/personalCenter/changePwd',
                    name:'user-changePwd',
                    component: resolve => require(['@/views/user/personalCenter/personalInfor'], resolve),
                    meta: {
                        api: 'guangkai',
                        urlKey: 'modifypass'
                    }
                },{ // 个人实名认证
                    path:'/certInfor/personalCert',
                    name:'user-personalCert',
                    component: resolve => require(['@/views/user/personalCenter/personalInfor'], resolve),
                    meta: {
                        api: 'guangkai',
                        urlKey: 'auth'
                    }
                },{ // 企业认证
                    path:'/certInfor/enterpriseCert',
                    name:'user-enterpriseCert',
                    component: resolve => require(['@/views/user/certInfor/enterpriseCert'], resolve),
                },{ // 加入企业子账号
                    path:'/certInfor/addEnterpriseSubaccount',
                    name:'user-addEnterpriseSubaccount',
                    component: resolve => require(['@/views/user/certInfor/addEnterpriseSubaccount'], resolve),
                },{ // 关注的企业
                    path: '/myFocus/comFocus',
                    name: 'user-comFocus',
                    component: resolve => require(['@/views/user/myFocus/companyFocus'], resolve),
                },{ // 关注的需求
                    path: '/myFocus/rqmFocus',
                    name: 'user-rqmFocus',
                    component: resolve => require(['@/views/user/myFocus/requirementFocus'], resolve),
                },{ // 关注的服务
                    path: '/myFocus/serFocus',
                    name: 'user-serFocus',
                    component: resolve => require(['@/views/user/myFocus/serviceFocus'], resolve),
                },{
                    path: '/myFocus/golpov',
                    name: 'user-golpov',
                    component: resolve => require(['@/views/user/myFocus/golpov'], resolve),
                },{ // 关注的商品
                    path: '/myFocus/product',
                    name: 'user-product',
                    component: resolve => require(['@/views/user/myFocus/productFocus'], resolve),
                },{ // 商机个性化
                    path: '/personalBusiness/personalBusiness',
                    name: 'user-personalBusiness',
                    component: resolve => require(['@/views/user/personalBusiness/personalBusiness'], resolve),
                    beforeEnter: (to, from, next) => {
                        bankTypeEnter(to, from, next);
                    }
                },
            ]
        }, {
            path: '/messageCenter',
            name:"user-msg",
            component: resolve => require(['@/components/EsspLeft'], resolve),
            redirect: '/messageCenter/sysMsg',
            children:[
                { // 系统信息
                    path: '/messageCenter/sysMsg',
                    name: 'user-sysMsg',
                    component: resolve => require(['@/views/user/messageCenter/sysMsg'], resolve),
                    meta: {
                        type: '0'
                    }
                },{ // 商机信息
                    path: '/messageCenter/businessMsg',
                    name: 'user-businessMsg',
                    component: resolve => require(['@/views/user/messageCenter/sysMsg'], resolve),
                    meta: {
                        type: '1'
                    }
                },{ // 订阅消息
                    path: '/messageCenter/subscribeMsg',
                    name: 'user-subscribeMsg',
                    component: resolve => require(['@/views/user/messageCenter/sysMsg'], resolve),
                    meta: {
                        type: '2'
                    }
                },{ // 推荐消息
                    path: '/messageCenter/recommendMsg',
                    name: 'user-recommendMsg',
                    component: resolve => require(['@/views/user/messageCenter/sysMsg'], resolve),
                    meta: {
                        type: '3'
                    }
                }
            ]
        },{ // 免费注册
            path: '/userIndex/register',
            name:"register",
            component: resolve => require(['@/views/user/personalCenter/personalInfor'], resolve),
            meta: {
                api: 'guang',
                urlKey: 'reg'
            }
        }, { // 忘记密码
            path: '/userIndex/forgetPwd',
            name:"forgetPwd",
            component: resolve => require(['@/views/user/personalCenter/personalInfor'], resolve),
            meta: {
                api: 'guang',
                urlKey: 'forget'
            }
        },
    ],
    beforeEnter: (to, from, next) => {
        verifyLogin(to, from, next)
    }
}

function verifyLogin(to, from, next) {
    let href = window.location.href
    let pathname = window.location.pathname
    if(pathname.indexOf(constants.bdParkData.bdUrl)>-1){
        let tmp = href.split(constants.bdParkData.bdUrl)[0]+constants.bdParkData.esspUrl+href.split(constants.bdParkData.bdUrl)[1]
        let url = tmp.split('#')[0]+'#'+to.fullPath
        window.open(url,'_self')
    }else{
        next();
    }
}

function bankTypeEnter(to, from, next) {
    let flag = true;
    if (!utils.isEmpty(sessionStorageHandler.getItem('cstBscInfVo'))
        && sessionStorageHandler.getItem('cstBscInfVo').cstTycd == constants.enterpriseType.bankEntType.key) {
        flag = false;
    }
    if (flag) {
        next();
    } else {
        NProgress.done();
        Message.warning('您的客户类型无权限发访问');
        next(
            {path: from.fullPath}
        );
    }
}
