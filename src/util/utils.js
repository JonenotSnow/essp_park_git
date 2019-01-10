import constants from "./constants";
import SSH from './sessionStorageHandler'
import LSH from './localStorageHandler'
import {del} from '../fetch/http'
import {apiUrl} from '../fetch/apiUrl'
import {Message} from 'element-ui';
import store from '../store'
import router from '../router'

const utils = {
    /**
     *  非空判断
     *  value: 需要判断的值
     */
    isEmpty: function (value) {
        if (value == '' || value == 'null' || value == null || typeof value == 'undefined' || JSON.stringify(value) == '{}') {
            return true;
        } else {
            return false;
        }
    },
    //根据当前的环境（http/https）跳转url
    advUrlturn: function (url) {
        if (!this.isEmpty(url)) {
            //如果当前环境是https
            let urlc = ""
            if (window.location.href.indexOf('https') !== -1) {
                if (url.indexOf('https') === -1) {
                    urlc = url.replace('http', 'https')
                    window.open(urlc)
                    return
                }
                window.open(url)
            } else {
                if (url.indexOf('https') !== -1) {
                    urlc = url.replace('https', 'http')
                    window.open(urlc)
                    return
                }
                window.open(url)
            }
        }
    },
    /**
     *  冻结后无法访问url判断
     *  postUrl：访问后台url
     */
    isFreeze: function (postUrl) {
        let listUrl = constants.urlList
        for (let o of listUrl) {
            if (o.indexOf(postUrl) !== -1) {
                return true
                break
            }
        }
        return false
    },
    /**
     * 自定义请求axios配置
     *
     * @param {Srting} postUrl url
     * @memberof utils
     */
    getUrlCstCfg(postUrl) {
        let config = {
            process: true // 默认顶部显示请求进度动画
        };
        constants.urlCstCfg
            .filter(o => o.url === postUrl)
            .forEach(o => {
                Object.assign(config, o.config)
            });
        return config;
    },
    /**
     *  角色判断，传入值为String或者数组类型
     *  role:  需要被校验的角色
     */
    roleExist: function (role) {
        var roleList = []
        if (SSH.getItem('userInfo') && !utils.isEmpty(SSH.getItem('userInfo').userPostList)) {
            roleList = SSH.getItem('userInfo').userPostList
        } else {
            return false
        }
        if (typeof role == 'object') {
            for (var i = 0; i < role.length; i++) {
                if (roleList.indexOf(role[i]) > -1) {
                    return true
                }
            }
        } else if (typeof role == 'string') {
            if (roleList.indexOf(role) > -1) {
                return true
            }
        }
        return false
    },
    /**
     *   数组是否含有一个元素或是否含有另一个数组
     *   name： 被含有元素或数组
     *   nameList： 该数组是否包含其他
     */
    arrayIsContain: function (name, nameList) {
        if (utils.isEmpty(name) || utils.isEmpty(nameList)) {
            return false
        }
        if (typeof name == 'object') {
            for (var i = 0; i < name.length; i++) {
                if (nameList.indexOf(name[i]) > -1) {
                    return true
                }
            }
        } else if (typeof name == 'string') {
            if (nameList.indexOf(name) > -1) {
                return true
            }
        }
        return false
    },
    /**
     *   查看或下载PDF
     *   该查看或下载请使用a标签
     *   url：pdf的路径
     *   txt: 当前标签定义的id
     */
    viewOrDownPDF: function (url, txt) {
        var odownLoad = document.getElementById(txt);
        var browserType = utils.myBrowser();
        if (browserType === "IE" || browserType === "Edge") {
            //IE
            odownLoad.href = "#";
            var oImg = document.createElement("img");
            oImg.src = url;
            oImg.id = "downImg";
            var odown = document.getElementById("down");
            odown.appendChild(oImg);
            utils.SaveAs5(document.getElementById('downImg').src)
        } else {
            //!IE
            odownLoad.href = url;
            odownLoad.download = "";
        }
    },
    myBrowser: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (userAgent.indexOf("Opera") > -1) {
            return "Opera"
        }
        ; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }
        ; //判断是否IE浏览器
        if (userAgent.indexOf("Trident") > -1) {
            return "Edge";
        } //判断是否Edge浏览器
    },
    SaveAs5: function (imgURL) {
        var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
        for (; oPop.document.readyState != "complete";) {
            if (oPop.document.readyState == "complete") break;
        }
        oPop.document.execCommand("SaveAs");
        oPop.close();
    },
    /**
     *   时间转换
     *   date：
     */
    changeTime(date) {
        if (date) {
            date = new Date(date);
            //一天的时间戳
            let oneDay = 86400000;
            //今天0点时间戳
            let temp = new Date();
            temp.setHours(0)
            temp.setMinutes(0)
            temp.setSeconds(0)
            temp.setMilliseconds(0)
            let today = temp.getTime();
            let lessThanTen = date.getHours() + ':0' + date.getMinutes();
            let moreThanTen = date.getHours() + ':' + date.getMinutes();
            if (date.getTime() > today) {
                if (date.getMinutes() < 10) {
                    return lessThanTen;
                } else {
                    return moreThanTen;
                }
            }
            if (date.getTime() < today && date.getTime() > today - oneDay) {
                if (date.getMinutes() < 10) {
                    return '昨天' + " " + lessThanTen;
                } else {
                    return '昨天' + " " + moreThanTen;
                }
            }
            if (date.getTime() < today - oneDay && date.getTime() > today - oneDay * 2) {
                if (date.getMinutes() < 10) {
                    return '前天' + " " + lessThanTen;
                } else {
                    return '前天' + " " + moreThanTen;
                }
            }
            if (date.getTime() < today - oneDay * 2 && date.getTime() > today - oneDay * 6) {
                switch (date.getDay()) {
                    case 1:
                        if (date.getMinutes() < 10) {
                            return '星期一' + " " + lessThanTen;
                        } else {
                            return '星期一' + " " + moreThanTen;
                        }
                        break;
                    case 2:
                        if (date.getMinutes() < 10) {
                            return '星期二' + " " + lessThanTen;
                        } else {
                            return '星期二' + " " + moreThanTen;
                        }
                        break;
                    case 3:
                        if (date.getMinutes() < 10) {
                            return '星期三' + " " + lessThanTen;
                        } else {
                            return '星期三' + " " + moreThanTen;
                        }
                        break;
                    case 4:
                        if (date.getMinutes() < 10) {
                            return '星期四' + " " + lessThanTen;
                        } else {
                            return '星期四' + " " + moreThanTen;
                        }
                        break;
                    case 5:
                        if (date.getMinutes() < 10) {
                            return '星期五' + " " + lessThanTen;
                        } else {
                            return '星期五' + " " + moreThanTen;
                        }
                        break;
                    case 6:
                        if (date.getMinutes() < 10) {
                            return '星期六' + " " + lessThanTen;
                        } else {
                            return '星期六' + " " + moreThanTen;
                        }
                        break;
                    case 0:
                        if (date.getMinutes() < 10) {
                            return '星期日' + " " + lessThanTen;
                        } else {
                            return '星期日' + " " + moreThanTen;
                        }
                        break;
                }
            }
            if (date.getTime() < today - oneDay * 6) {
                if (date.getMinutes() < 10) {
                    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + lessThanTen;
                } else {
                    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + moreThanTen;
                }
            }
        }
    },
    /**
     *   上传校验
     *   file：上传的文件
     *   index: 需要校验类型传入参数的个数
     *   n个type：需要校验的类型
     *   注：传入参数可以传入多个需要校验的类型，即传入参数可以超过两个
     */
    uploadTypecheck(file, index) {
        let endNames = []
        let mimeTypes = []
        for (let i = 0; i < index; i++) {
            if (typeof arguments[i + 2] == 'object') {
                for (let key in arguments[i + 2]) {
                    endNames.push(arguments[i + 2][key].split(';')[0])
                    mimeTypes.push(arguments[i + 2][key].split(';')[1])
                }
            } else if (typeof arguments[i + 2] == 'string') {
                endNames.push(arguments[i + 2].split(';')[0])
                mimeTypes.push(arguments[i + 2].split(';')[1])
            }
        }

        // 因File构造函数在IE下不支持，只能转成Blob对象，又Blob不支持指定name，故此添加对文件名的判断，
        let fileName = file.name || "";
        if (fileName.length > 0) {
            if (fileName.split('.').length !== 2) {
                return 'error';
            }
            let fileEndName = fileName.split(".")[1];
            if (!utils.arrayIsContain(fileEndName.toLocaleLowerCase(), endNames)) {
                return false;
            }
        }
        if (!utils.arrayIsContain(file.type, mimeTypes)) {
            return false;
        }
        return true;
    },
    /**
     *   根据key值获取map中的value值
     *   key：需要获取的key值
     *   map：存放json的数组
     */
    getValueByKey(key, map) {
        let value = ''
        for (let keyTmp in map) {
            if (key === keyTmp) {
                value = map[keyTmp]
            }
        }
        return value
    },

    /**
     *  退出操作清除缓存
     *  val: '401'时只清缓存不调用后端删token； 否则删除token
     */
    logoutDelSSH: async function (val) {
        if (val == 401) {
            utils.delSSH();
        } else if (router.currentRoute.name != 'login' && SSH.getItem('token')) {
            await del(apiUrl.user.getLogoutUrl, {
                access_token: SSH.getItem('token')
            })
                .then((response) => {
                    utils.delSSH();
                }, (err) => {
                    utils.delSSH();
                })
        }
    },

    /**
     *  清除缓存
     */
    delSSH: function () {
        // -聊天工具数据清理
        store.state.chat.openChat = false;
        store.state.chat.chatlist = [];
        store.state.chat.selectId = '';
        store.state.chat.selectConsultId = '';
        store.state.chat.chatType = '';
        store.state.chat.consultlist = [];
        store.state.chat.friendlist = [];
        store.state.chat.selectConsultList = [];
        store.state.chat.selectCard = 1;
        store.state.chat.openDetail = false;
        store.state.chat.selectFriendId = '';
        try {
            store.state.chat.ws.close();
        } catch (e) {
        }
        SSH.delItem('oldParkId')
        SSH.delItem('friendList');
        SSH.delItem('messageList');
        SSH.delItem('consultList');
        SSH.delItem('token')
        SSH.delItem('userInfo')
        SSH.delItem('applyTag')
        SSH.delItem('freezeFlag')
        SSH.delItem('localAddr');
        // SSH.setItem('menuList', SSH.getItem('initMenuList'))

        SSH.delItem('loginMenuResource')
        // SSH.setItem('menuResourceTmp', utils.getMenuResource(SSH.getItem('initMenuList')))
        // SSH.setItem('menuResource', SSH.getItem('initMenuResource'))
        SSH.delItem('loginFlag')
        SSH.delItem('cetificateFlag')
        SSH.delItem('enterpriseFlag')
        SSH.delItem('grayFlag')
    },
    /**
     *  比较菜单id，获取菜单层级
     */
    compareId(id, menuList) {
        for (let i = 0; i < menuList.length; i++) {
            if (id == menuList[i].id) {
                return i
            }
        }
        return null
    },
    /**
     *  将菜单转为权限json格式
     */
    getMenuResource(menuList) {
        var allMenuData = {}
        for (let i = 0; i < menuList.length; i++) {
            allMenuData[menuList[i].name] = menuList[i]
            if (!utils.isEmpty(menuList[i].children) && menuList[i].children.length > 0) {
                utils.getMenuResourceChild(menuList[i].children, allMenuData)
            }
        }
        return allMenuData
    },
    getMenuResourceChild(childData, allMenuData) {
        for (let i = 0; i < childData.length; i++) {
            allMenuData[childData[i].name] = childData[i]
            if (childData[i].children) {
                utils.getMenuResourceChild(childData[i].children, allMenuData)
            }
        }
        return allMenuData
    },
    photoCompressAsync(file, parms = {}) {
        return new Promise((resolve, reject) => {
            this.photoCompress(file, parms, file => {
                resolve(file);
            });
        });
    },
    /**
     *  图片压缩 quality值越小，所绘制出的图像越模糊
     *  file:图片文件
     *  parms: 其他参数，列如：｛quality: 0.3,width:200,height:300，ie:true｝ie为true时IE浏览器下也进行压缩返回blob
     *  使用默认则传空对象｛｝即可；默认(quality: 0.3）宽高比例默认
     *  callback:回调函数
     */
    photoCompress: function (file, parms, callback) {
        //大于500k重绘一下
        if (file.size < 512000) {
            callback(file)
        } else {
            utils.fileBack(file, parms, callback)
        }
    },
    fileBack: function (file, parms, callback) {
        var ready = new FileReader();
        ready.readAsDataURL(file);
        ready.onload = function () {
            var re = this.result;
            utils.canvasDataURL(re, parms, file.name, callback)
        }
    },
    canvasDataURL: function (path, obj, name, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function () {
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.3;  // 默认图片质量为0.3
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                quality = obj.quality;
            }
            var base64 = canvas.toDataURL('image/jpeg', quality);
            var arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            //ie下返回的是blob 因为ie不支持file对象
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                // 回调函数返回Blob
                callback(new Blob([u8arr], {type: mime}));
            } else {
                let file = new File([new Blob([u8arr], {type: mime})], name, {type: mime});
                // 回调函数返回file
                callback(file);
            }
        }
    },
    //是否是游客权限
    isVisitorMode: function () {
        var isVisitorFlag = false;
        if (SSH.getItem("LoginUserRol")) {
            let LoginUserRolArr = SSH.getItem("LoginUserRol") || [];//数组
            var flag = LoginUserRolArr.find((value, index, arr) => {
                return value == 11;//11表示游客
            })
            return flag ? true : false;

        }
        return isVisitorFlag
    },
    //判断是否登陆
    isLoginMode: function () {
        return SSH.getItem("loginFlag") ? true : false
    },
    //是否是保定园区
    isBdPark: function () {
        //暂时依靠两种方案判断，（parkname 有保定 ，或者登陆带了 bdFlag 任意一个都算保定园区）
        var isParkNameHasBd = false;
        let bdParkId = sessionStorage.getItem("bdParkId")
        let bdFlag =  bdParkId && bdParkId.indexOf('bd')>-1
        let parkName = sessionStorage.getItem("parkName")
        if (parkName) {         
            var falg = parkName.indexOf("保定") > -1;
            isParkNameHasBd = falg;
        }
        return isParkNameHasBd || bdFlag;
    }

}
export default utils
