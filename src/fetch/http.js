import axios from 'axios';
import qs from 'qs'
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


let loadinginstance,
    loadCount = 0,
    loadingArray = [];
axios.interceptors.request.use(
    config => {
        //判断用户是否被冻结
        if (SSH.getItem('freezeFlag') === '1') {
            var freezeUrl = constants.urlList
            if (utils.isFreeze(config.url)) {
                Message.error({
                    message: '您已被限制使用该功能，若需继续使用，请与您的建行客户经理联系或在线发起申诉。',
                    duration: 3000
                });
                return Promise.reject(config)
            }
        }
        config.headers.requester = 'PC'
        if (!utils.isEmpty(SSH.getItem('grayFlag')))
            config.headers.GrayFlag = SSH.getItem('grayFlag')
        if (SSH.getItem('token')) {
            config.headers.Authorization = `${'bearer '}${SSH.getItem('token')}`;
        }
        loadCount++
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
        loadCount--
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
        if (res.data.resultCode == 'CLT000000004') {
            Message.error({
                message: res.data.resultMsg,
                duration: 3000
            });
            utils.logoutDelSSH(401)
            return Promise.reject(res);
        } else if (res.data.resultCode != 'CLT000000000' && res.data.resultCode != '0000000000') {
            let msg = '服务器开小差了..请稍后再试。报错参数：' + res.request.responseURL + ' -- ' + res.data.resultMsg
            // Message.error({
            //     message: msg,
            //     duration: 3000
            // });
            Message.error({
                message: res.data.resultMsg,
                duration: 3000
            });
            return Promise.reject(res);
        }
    }
    else if (res === null) {
        Message.error({
            message: '连接服务器失败,请检查网络是否正常',
            duration: 3000
        })
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    NProgress.done();
    loadCount--;
    if (!loadCount) {
        loadingArray.forEach(item => item.close())
    }
    // console.log('error.response',error.response)
    //404等问题可以在这里处理
    if (error.response) {
        if (error.response.status == 401 && error.response.data.error == 'invalid_token') {
            Message.error({
                message: '身份令牌失效，请重新登录',
                duration: 3000
            });
            utils.logoutDelSSH(401)
            // router.replace({
            //     path: '/userIndex/login',
            // })
        } else if (error.response.config.url) {
            if (SSH.getItem('freezeFlag') != '1' || !utils.isFreeze(error.response.config.url.toString().substring(4, error.response.config.url.length))) {
                if (error.response.data && error.response.data.toString().indexOf('Error occured while trying to proxy to:') > -1) {
                    Message.error({
                        message: '连接服务器失败,请检查网络是否正常',
                        duration: 3000
                    })
                } else {
                    // if(error.response.data.path){
                    //     let msg = '服务器开小差了..请稍后再试。报错参数：' + error.response.data.path+' -- ' + error.response.data.error
                    //     Message.error({
                    //         message: msg,
                    //         duration: 3000
                    //     })
                    // }else{
                    Message.error({
                        message: error.response.data,
                        duration: 3000
                    })
                    // }
                }
            }
        } else {
            // if(error.response.data.path){
            //     let msg = '服务器开小差了..请稍后再试。报错参数：' + error.response.data.path+' -- ' + error.response.data.error
            //     Message.error({
            //         message: msg,
            //         duration: 3000
            //     })
            // }else{
            Message.error({
                message: error.response.data,
                duration: 3000
            })
            // }
        }
    }
    // else {
    //     Message.error({
    //         message: '连接服务器失败,请检查网络是否正常',
    //         duration: 3000
    //     })
    // }
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

