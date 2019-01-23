import NProgress from "nprogress";
import constants from "./constants";
import utils from "./utils";
import sessionStorageHandler from "./sessionStorageHandler";
import {Message} from "element-ui";

export function checkResource(to, from, next){

    // 判断当前平台是否为撮合平台
    // let isEsscFlag = platform()===constants.platformType.esscType.key ? true : false
    // 临时url记录
    let urlTmp = ''
    //  登录权限
    let loginPermission = false
    //  个人认证权限
    let cetificatePermission = false
    //  企业认证权限
    let enterprisePermission = false
    //  权限
    let authPermission = false
    //  当前页面
    let nameRes = null
    //  权限值标志，如果为menuResource则为true，否则为false
    let resourceFlag = true
    //  当前用户权限
    let resource = sessionStorageHandler.getItem('menuResource')

    if (!utils.isEmpty(resource)) {
        resourceFlag = true
        debugger
        nameRes = resource[to.name]
    }
    if(utils.isEmpty(nameRes)){
        resourceFlag = false
        resource = sessionStorageHandler.getItem('menuResourceTmp')
        if (!utils.isEmpty(resource)) {
            nameRes = resource[to.name]
        }
    }
    if(utils.isEmpty(nameRes)){
        let url = window.location.href
            if(sessionStorageHandler.getItem('toUrlResource') && sessionStorageHandler.getItem('toUrlResource').isclick==='1'){
            next({
                path: from.path,
            })
            Message.error(sessionStorageHandler.getItem('toUrlResource').message)
            sessionStorageHandler.delItem('toUrlResource')
        }else if(utils.arrayIsContain(to.query.channel, constants.srcCode) && !sessionStorageHandler.getItem('token') && !utils.isEmpty(to.query.remoteToken)){
            sessionStorageHandler.setItem('inFullUrl',to.path)
            next();
        }else{
            next({
                path: from.path,
            })
            Message.error('您没有权限访问此页面!')
        }
    }else{
        //  判定登录权限
        if (nameRes.loginflag == '1') {
            if (sessionStorageHandler.getItem('loginFlag')) {
                loginPermission = true
            } else {
                loginPermission = false
            }
        } else {
            loginPermission = true
        }
        //  判定个人认证权限
        if (nameRes.cetificateflag == '1') {
            if (sessionStorageHandler.getItem('cetificateFlag')) {
                cetificatePermission = true
            } else {
                cetificatePermission = false
            }
        } else {
            cetificatePermission = true
        }
        //  判定企业认证权限
        if (nameRes.enterpriseflag == '1') {
            if (sessionStorageHandler.getItem('enterpriseFlag')) {
                enterprisePermission = true
            } else {
                enterprisePermission = false
            }
        } else {
            enterprisePermission = true
        }
        // 判定角色的访问权限
        if(resourceFlag === true){
            authPermission = true
        }else{
            authPermission = false
        }

        if(!authPermission && nameRes.isclick === '1'){
            Message.error(resource[to.name].message)
        }else if (loginPermission && cetificatePermission && enterprisePermission && authPermission) {
            if (to.name == 'center-subaccountManage') {
                if (!utils.isEmpty(sessionStorageHandler.getItem('userInfo'))) {
                    if (utils.roleExist(constants.userRole.entAdmin.key)) {
                        NProgress.start();
                        next();
                    } else {
                        Message.error('无权限登录，请使用注册会员管理员岗位登录！')
                    }
                } else {
                    Message.error('无权限登录，请使用注册会员管理员岗位登录！')
                }
            } else {
                NProgress.start();
                next();
            }
        } else if (!loginPermission) {
                // next({
                //     path: '/userIndex/login',
                //     query: { redirect: to.fullPath }
                // })
            Message.error('您还未登录，请先登录!')
        } else if (!cetificatePermission) {
            // 未登录跳转至登录界面
            Message.error('您还未通过个人实名认证，请先通过个人实名认证!')
        } else if (!enterprisePermission) {
            // 未登录跳转至登录界面
            Message.error('您还未通过企业认证，请先通过企业认证!')
        } else if (!authPermission) {
            Message.error('您没有权限访问此页面!')
        }
    }
}
