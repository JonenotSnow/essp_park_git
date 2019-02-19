import axios from 'axios';
import store from '../store/index'
import router from '../router'
import SSH from '../util/sessionStorageHandler'
import utils from '../util/utils'
import { Message, Loading } from 'element-ui';
import constants from "../util/constants";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置前缀引用
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/api';
var id = 0;

let loadinginstance,
    loadCount = 0,
    loadingArray = [];
axios.interceptors.request.use(
    config => {
        //判断用户是否被冻结
        if (SSH.getItem('freezeFlag') === '1') {
            if (utils.isFreeze(config.url)) {
                let msg = {};
                msg['id'] = id++;
                msg['message'] = '您已被限制使用该功能，若需继续使用，请与您的建行客户经理联系或在线发起申诉';
                msg['type'] = constants.RETURN_CODE.ERROR_BUSINESS_TYPE;
                msg['time'] = 0;
                msg['show'] = false;
                store.commit('pushMessageList', msg);
                return Promise.reject(config)
            }
        }
        config.headers.requester = 'PC';
        if (!utils.isEmpty(SSH.getItem('grayFlag')))
            config.headers.GrayFlag = SSH.getItem('grayFlag');
        if (SSH.getItem('token')) {
            config.headers.Authorization = `${'bearer '}${SSH.getItem('token')}`;
        }
        if (SSH.getItem('location')) {
            config.headers.location = SSH.getItem('location')
        }
        loadCount++;
        // 正式请求需要加上
        // loadinginstance = Loading.service({
        //     target: '.content-wrapper',
        //     fullscreen: false,
        //     text: '正在加载中.....',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // })
        // loadingArray.push(loadinginstance);
        // 获取URL自定义配置
        let cstCfg = utils.getUrlCstCfg(config.url);
        if (cstCfg.process) {
            NProgress.start();
        }
        return Object.assign({}, config, cstCfg);
    },
    err => {
        loadCount--;
        if (!loadCount) {
            loadingArray.forEach(item => item.close())
        }
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use((res) => {
    NProgress.done();
    loadCount--;
    if (!loadCount) {
        loadingArray.forEach(item => item.close())
    }
    if (!!res.data["resultCode"]) {
        if (res.data.resultCode === 'CLT000000004') {
            let msg = {};
            msg['id'] = id++;
            msg['message'] = res.data.resultMsg;
            msg['type'] = constants.RETURN_CODE.ERROR_OTHER_LOGIN_TYPE;
            msg['time'] = 0;
            msg['show'] = false;
            store.commit('pushMessageList', msg);
            utils.logoutDelSSH(401);
            return Promise.reject(res);
        } else if (!utils.arrayIsContain(res.data.resultCode, constants.RETURN_CODE.SUCCESS_CODE)) {
            if (constants.RETURN_CODE.BUSINESS_RULE.test(res.data.resultCode)) {
                let msg = {};
                msg['id'] = id++;
                msg['message'] = res.data.resultMsg;
                msg['type'] = constants.RETURN_CODE.ERROR_BUSINESS_TYPE;
                msg['time'] = 0;
                msg['show'] = false;
                store.commit('pushMessageList', msg)
            } else if (constants.RETURN_CODE.TECHNOLOGY_RULE.test(res.data.resultCode) || res.data.resultCode === constants.RETURN_CODE.ERROR_CODE) {
                let msg = {};
                msg['id'] = id++;
                msg['message'] = '服务器感冒了，点击查看病因';
                msg['detailMessage'] = '报错参数：' + res.request.responseURL + ' ;报错码：' + res.data.resultCode + ' ;报错类型：' + constants.RETURN_CODE.ERROR_SYSTEM_TYPE + ' ;报错详情：' + res.data.resultMsg;
                msg['type'] = constants.RETURN_CODE.ERROR_SYSTEM_TYPE;
                msg['time'] = 0;
                store.commit('pushErrMsgList', msg)
            } else {
                Message.error({
                    message: res.data.resultMsg,
                    duration: 3000
                });
            }
            return Promise.reject(res);
        }
    }
    else if (res === null) {
        let msg = {}
        msg['id'] = id++
        msg['message'] = '连接服务器失败,请检查网络是否正常'
        msg['detailMessage'] = '报错参数：' + res.request.responseURL + ' ;报错类型：' + constants.RETURN_CODE.ERROR_NETWORK_TYPE
        msg['type'] = constants.RETURN_CODE.ERROR_NETWORK_TYPE
        msg['time'] = 0
        store.commit('pushTimeOutMsgList', msg)
        return Promise.reject(res);
    }
    return res
}, (error) => {
    NProgress.done();
    loadCount--;
    if (!loadCount) {
        loadingArray.forEach(item => item.close())
    }
    //404等问题可以在这里处理
    if (error.response) {
        if (error.response.status === 401) {
            if (error.response.data.error === 'invalid_token') {
                let msg = {};
                msg['id'] = id++;
                msg['message'] = '身份令牌失效，请重新登录';
                msg['type'] = constants.RETURN_CODE.ERROR_INVALID_TOKEN_TYPE;
                msg['time'] = 0;
                msg['show'] = false;
                store.commit('pushMessageList', msg);
                utils.logoutDelSSH(401)
            } else {
                let msg = {};
                msg['id'] = id++;
                msg['message'] = '服务器感冒了，点击查看病因';
                msg['detailMessage'] = '报错参数：' + (error.response && error.response.config && error.response.config.url ? error.response.config.url : null) +
                    ' ;报错类型：' + constants.RETURN_CODE.ERROR_SYSTEM_TYPE +
                    ' ;报错状态码：' + (error.response && error.response.status ? error.response.status : null) +
                    ' ;报错详情：' + error.response.data.message;
                msg['type'] = constants.RETURN_CODE.ERROR_SYSTEM_TYPE;
                msg['time'] = 0;
                store.commit('pushErrMsgList', msg)
            }
        } else if (error.response.status === 500) {
            let msg = {}
            msg['id'] = id++
            msg['message'] = '连接服务器失败,请检查网络是否正常'
            msg['detailMessage'] = '报错参数：' + (error.response && error.response.config && error.response.config.url ? error.response.config.url : null) +
                ' ;报错状态码：' + (error.response && error.response.status ? error.response.status : null) +
                ' ;报错类型：' + constants.RETURN_CODE.ERROR_NETWORK_TYPE
            msg['type'] = constants.RETURN_CODE.ERROR_NETWORK_TYPE
            msg['time'] = 0
            console.log('msg', msg)
            store.commit('pushTimeOutMsgList', msg)
        } else if (error.response.status === 502 || error.response.status === 504) {
            let msg = {};
            msg['id'] = id++;
            msg['message'] = '服务器开小差';
            msg['type'] = constants.RETURN_CODE.ERROR_SERVICE_TYPE;
            msg['time'] = 0;
            msg['show'] = false;
            store.commit('pushMessageList', msg)
        } else {
            let msg = {};
            msg['id'] = id++;
            msg['message'] = '服务器感冒了，点击查看病因';
            msg['detailMessage'] = '报错参数：' + error.response && error.response.config && error.response.config.url ? error.response.config.url : null +
                ' ;报错类型：' + constants.RETURN_CODE.ERROR_UNKNOWN_TYPE +
                ' ;报错状态码：' + (error.response && error.response.status ? error.response.status : null) +
                ' ;报错详情：' + error.response.data
            msg['type'] = constants.RETURN_CODE.ERROR_UNKNOWN_TYPE
            msg['time'] = 0
            store.commit('pushErrMsgList', msg)
        }
    } else {
        let msg = {}
        msg['id'] = id++
        msg['message'] = '连接服务器失败,请检查网络是否正常'
        msg['detailMessage'] = '报错参数：' + (error.response && error.response.config && error.response.config.url ? error.response.config.url : null) +
            ' ;报错状态码：' + (error.response && error.response.status ? error.response.status : null) +
            ' ;报错类型：' + constants.RETURN_CODE.ERROR_NETWORK_TYPE
        msg['type'] = constants.RETURN_CODE.ERROR_NETWORK_TYPE
        msg['time'] = 0
        store.commit('pushTimeOutMsgList', msg)
    }
    return Promise.reject(error);
});


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                if (response) {
                    resolve(response.data);
                }
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                if (response) {
                    resolve(response.data);
                }
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装del请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, { data: params })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

