import {post, get, patch, put, del} from "@/fetch/http.js"
import {apiUrl} from "@/fetch/apiUrl.js"
import SSH from '@/util/sessionStorageHandler.js'
import ReconnectingWebSocket from '@/util/ReconnectingWebSocket.js'
import utils from '@/util/utils.js'
import bus from '@/eventBus.js'
import {Message} from 'element-ui';
//获取当前时间
const now = new Date();
const state = {
    // 输入的搜索值
    searchText: '',
    // 展示群成员列表
    showGroupMembers: false,
    searchAdd: '',
    // websocket链接对象
    ws: '',
    chatDelFlag: '0',
    // 当前登录用户
    user: {},
    // 对话好友列表
    chatlist: [],
    consultlist: [],
    // 好友列表
    friendlist: [
        {
            id: 0,
            userName: '新朋友',
            trueName: "新朋友",  //昵称
            hPath: 'static/images/newFriend.png', //头像
            name: '',
        },
        {
            id: 1,
            userName: '群聊',
            trueName: "群聊",  //昵称
            hPath: 'static/images/group.png', //头像
            name: '',
        },
    ],
    //emoji表情
    emojis: [
        {file: '100.gif', code: '/::)', title: '微笑', reg: /\/::\)/g},
        {file: '101.gif', code: '/::~', title: '伤心', reg: /\/::~/g},
        {file: '102.gif', code: '/::B', title: '美女', reg: /\/::B/g},
        {file: '103.gif', code: '/::|', title: '发呆', reg: /\/::\|/g},
        {file: '104.gif', code: '/:8-)', title: '墨镜', reg: /\/:8-\)/g},
        {file: '105.gif', code: '/::<', title: '哭', reg: /\/::</g},
        {file: '106.gif', code: '/::$', title: '羞', reg: /\/::\$/g},
        {file: '107.gif', code: '/::X', title: '哑', reg: /\/::X/g},
        {file: '108.gif', code: '/::Z', title: '睡', reg: /\/::Z/g},
        {file: '109.gif', code: '/::\'(', title: '哭', reg: /\/::'\(/g},
        {file: '110.gif', code: '/::-|', title: '囧', reg: /\/::-\|/g},
        {file: '111.gif', code: '/::@', title: '怒', reg: /\/::@/g},
        {file: '112.gif', code: '/::P', title: '调皮', reg: /\/::P/g},
        {file: '113.gif', code: '/::D', title: '笑', reg: /\/::D/g},
        {file: '114.gif', code: '/::O', title: '惊讶', reg: /\/::O/g},
        {file: '115.gif', code: '/::(', title: '难过', reg: /\/::\(/g},
        {file: '116.gif', code: '/::+', title: '酷', reg: /\/::\+/g},
        {file: '117.gif', code: '/:--b', title: '汗', reg: /\/:--b/g},
        {file: '118.gif', code: '/::Q', title: '抓狂', reg: /\/::Q/g},
        {file: '119.gif', code: '/::T', title: '吐', reg: /\/::T/g},
        {file: '120.gif', code: '/:,@P', title: '笑', reg: /\/:,@P/g},
        {file: '121.gif', code: '/:,@-D', title: '快乐', reg: /\/:,@-D/g},
        {file: '122.gif', code: '/::d', title: '奇', reg: /\/::d/g},
        {file: '123.gif', code: '/:,@o', title: '傲', reg: /\/:,@o/g},
        {file: '124.gif', code: '/::g', title: '饿', reg: /\/::g/g},
        {file: '125.gif', code: '/:|-)', title: '累', reg: /\/:\|-\)/g},
        {file: '126.gif', code: '/::!', title: '吓', reg: /\/::!/g},
        {file: '127.gif', code: '/::L', title: '汗', reg: /\/::L/g},
        {file: '128.gif', code: '/::>', title: '高兴', reg: /\/::>/g},
        {file: '129.gif', code: '/::,@', title: '闲', reg: /\/::,@/g},
        {file: '130.gif', code: '/:,@f', title: '努力', reg: /\/:,@f/g},
        {file: '131.gif', code: '/::-S', title: '骂', reg: /\/::-S/g},
        {file: '133.gif', code: '/:,@x', title: '秘密', reg: /\/:,@x/g},
        {file: '134.gif', code: '/:,@@', title: '乱', reg: /\/:,@@/g},
        {file: '135.gif', code: '/::8', title: '疯', reg: /\/::8/g},
        {file: '136.gif', code: '/:,@!', title: '哀', reg: /\/:,@!/g},
        {file: '137.gif', code: '/:!!!', title: '鬼', reg: /\/:!!!/g},
        {file: '138.gif', code: '/:xx', title: '打击', reg: /\/:xx/g},
        {file: '139.gif', code: '/:bye', title: 'bye', reg: /\/:bye/g},
        {file: '142.gif', code: '/:handclap', title: '鼓掌', reg: /\/:handclap/g},
        {file: '145.gif', code: '/:<@', title: '什么', reg: /\/:<@/g},
        {file: '147.gif', code: '/::-O', title: '累', reg: /\/::-O/g},
        {file: '153.gif', code: '/:@x', title: '吓', reg: /\/:@x/g},
        {file: '155.gif', code: '/:pd', title: '刀', reg: /\/:pd/g},
        {file: '156.gif', code: '/:<W>', title: '水果', reg: /\/:<W>/g},
        {file: '157.gif', code: '/:beer', title: '酒', reg: /\/:beer/g},
        {file: '158.gif', code: '/:basketb', title: '篮球', reg: /\/:basketb/g},
        {file: '159.gif', code: '/:oo', title: '乒乓', reg: /\/:oo/g},
        {file: '195.gif', code: '/:circle', title: '跳舞', reg: /\/:circle/g},
        {file: '160.gif', code: '/:coffee', title: '咖啡', reg: /\/:coffee/g}
    ],
    // 得知当前选择的是哪个对话
    selectId: "",
    chatType: "",
    // 得知当前选择的是哪个咨询
    selectConsultList: [],
    selectConsultId: '',
    // 得知当前选择的是哪个咨询
    theConsult: {},
    // 得知当前选择的是哪个好友
    selectFriendId: '',
    // 得知当前选择的是侧边栏
    selectCard: 1,
    //是否展示右边栏
    openDetail: false,
    //是否展示添加好友列表
    showAdd: false,
    //展示表情面板
    showEmoji: false,
    // -整个聊天工具的显示隐藏，显示的时候websocket长连接；
    openChat: false,
    // -websocket链接后未读消息条数
    unReadNum: 0,
    // 创建群聊1，删除群聊人员2，好友聊天时创建群聊3
    addChatType: 1,
    //判断是否开启心跳
    heartOpen: true,
    //选中人员列表
    selectFriendsList: [],
    //@人员列表
    selectMembersList: [],
    selectArr: [],
    //待添加的人员列表
    addFriendList: [],

    msgNum: 0, // -好友消息（群里消息，好友消息）
    addNum: 0, // -好友申请（好友申请消息）
    selNum: 0, // -咨询消息

    isclick:true,
    groupChatMembers:[],//@群聊成员列表

}
// state.ws = new ReconnectingWebSocket("ws://" + localAddr + ":8094/socketServer?userName=" + SSH.getItem('userInfo').username + '&type=pc');
const mutations = {
    initChat(state) {
        let localAddr = SSH.getItem('localAddr');
        let ipconf = localAddr.substr(localAddr.lastIndexOf('.') + 1, localAddr.length - 1);
        if (ipconf == '131' || ipconf == '132' || ipconf == '129') {
            state.ws = new ReconnectingWebSocket("ws://" + localAddr + ":8094/socketServer?userName=" + SSH.getItem('userInfo').username + '&type=pc');
        } else {
            let protocolStr = document.location.protocol;
            if (protocolStr == 'http:' || protocolStr == 'http') {
                state.ws = new ReconnectingWebSocket("ws://want.ccb.com/IM/socketServer?userName=" + SSH.getItem('userInfo').username + '&type=pc');
            } else {
                state.ws = new ReconnectingWebSocket("wss://want.ccb.com/IM/socketServer?userName=" + SSH.getItem('userInfo').username + '&type=pc');
            }
        }
        // SSH.setItem('ws',state.ws)
        state.ws.onopen = function () {
            console.log('链接成功');
            state.heartOpen = true
            //发送心跳确定是否断开链接 时间1min 40000ms
            if (SSH.getItem('userInfo')) {
                mutations.heartTimeOut(state);
            }
        };
        // 接收服务端数据时触发事件
        state.ws.onmessage = function (e) {
            let datajson = JSON.parse(e.data);
            if (datajson.resultCode) {
                if (datajson.resultCode == 'CLT000000004') {
                    console.log('CLT000000004！')
                    state.heartOpen = false
                    state.ws.close();
                } else if (datajson.resultCode != "CLT000000000") {
                }
            } else {
                if (datajson.type == 'notice') {
                    switch (datajson.content) {
                        case "friendAgree":
                            if (!state.openChat) {
                                // -聊天界面没打开情况下
                                state.unReadNum++
                            }
                            if (state.selectCard != 2) {
                                state.addNum++;
                            }
                            Message.warning({
                                message: datajson.senderName + '同意了您的好友申请！',
                                duration: 3000
                            })
                            // -同意添加好友 -更新好友列表
                            post(apiUrl.chat.getFriendsList,
                                {
                                    pageNum: 1,
                                    pageSize: 100,
                                    type: '1',
                                    userId: SSH.getItem('userInfo').id,
                                }
                            ).then((response) => {
                                mutations.initData(state, response.resultData)
                            });
                            mutations.changeChatType(state, datajson.senderId)
                            // -发送申请
                            post(apiUrl.chat.getFriendsList,
                                {
                                    pageNum: 1,
                                    pageSize: 100,
                                    type: '3',
                                    userId: SSH.getItem('userInfo').id,
                                }
                            ).then((response) => {
                                state.consultlist = response.resultData
                                if (state.selectCard != 3) {
                                    state.selNum = state.consultlist.length;
                                }
                                state.selectConsultList = []
                                state.theConsult = {}
                                state.selectConsultId = ''
                                SSH.setItem('consultList', state.consultlist);
                            });
                            break;
                        case "friendAgreeNo":
                            // -拒绝添加好友
                            Message.warning({
                                message: datajson.senderName + '拒绝了您的好友添加！',
                                duration: 3000
                            })
                            break;
                        case "remind":
                            // -@好友提醒todo
                            post(apiUrl.chat.getRecentChats, {
                                userId: SSH.getItem('userInfo').id
                            }).then((response) => {
                                mutations.refreshMessageList(state, response.resultData);
                                let object = state.chatlist.find(session => session.id == datajson.groupId);
                                if (state.selectId == datajson.groupId) {
                                    object.extString='';
                                }else{
                                    object.extString="needRemind";
                                }
                                SSH.setItem('messageList', state.chatlist);
                            });
                            break;
                        case "groupAddMembers":
                            post(apiUrl.chat.getRecentChats, {
                                userId: SSH.getItem('userInfo').id
                            }).then((response) => {
                                let result = state.chatlist.find(session => session.id == datajson.groupId);
                                let messages = []
                                if (result) {
                                    messages = result.messages
                                }
                                mutations.refreshMessageList(state, response.resultData);
                                //刷新聊天列表
                                result = state.chatlist.find(session => session.id == datajson.groupId);
                                if (result) {
                                    result.messages = messages
                                }
                            });
                            break;
                        case "friendDel":
                            // -好友删除 -更新好友列表 -更新聊天记录

                            post(apiUrl.chat.getFriendsList,
                                {
                                    pageNum: 1,
                                    pageSize: 100,
                                    type: '1',
                                    userId: SSH.getItem('userInfo').id,
                                }
                            ).then((response) => {
                                mutations.initData(state, response.resultData)
                            });
                            // -获取聊天列表
                            post(apiUrl.chat.getRecentChats, {
                                userId: SSH.getItem('userInfo').id
                            }).then((response) => {
                                mutations.refreshMessageList(state, response.resultData)
                            });
                            Message.warning({
                                message: datajson.senderName + '删除了您！',
                                duration: 3000
                            })
                            break;
                        case "consultAgree":
                            // -同意咨询 -不做操作
                            Message.warning({
                                message: datajson.senderName + '咨询同意！',
                                duration: 3000
                            })
                            // -发送申请
                            post(apiUrl.chat.getFriendsList,
                                {
                                    pageNum: 1,
                                    pageSize: 100,
                                    type: '3',
                                    userId: SSH.getItem('userInfo').id,
                                }
                            ).then((response) => {
                                state.consultlist = response.resultData
                                if (state.selectCard != 3) {
                                    state.selNum = state.consultlist.length;
                                }
                                state.selectConsultList = []
                                state.theConsult = {}
                                state.selectConsultId = ''
                                SSH.setItem('consultList', state.consultlist);
                            });
                            break;
                        case "friendRequest":
                            // -好友申请
                            if (!state.openChat) {
                                // -聊天界面没打开情况下
                                state.unReadNum++
                            }
                            if (state.selectCard != 2) {
                                state.addNum++;
                            }
                            if (state.selectCard == 2 && state.selectFriendId == 0) {
                                bus.$emit("refreshFriendRequest", 4);
                            }
                            break;
                        case "consultRequest":
                            // -发送申请
                            post(apiUrl.chat.getFriendsList,
                                {
                                    pageNum: 1,
                                    pageSize: 100,
                                    type: '3',
                                    userId: SSH.getItem('userInfo').id,
                                }
                            ).then((response) => {
                                state.consultlist = response.resultData
                                if (state.selectCard != 3) {
                                    state.selNum = state.consultlist.length;
                                }
                                state.selectConsultList = []
                                state.theConsult = {}
                                state.selectConsultId = ''
                                SSH.setItem('consultList', state.consultlist);
                            });
                            break;
                        case "consultDel":
                            // -结束咨询 -删除聊天列表
                            let list = [];
                            for (let chat of state.chatlist) {
                                if (chat.id != datajson.senderId) {
                                    list.push(chat)
                                }
                            }
                            state.chatlist = list;
                            state.selectId = ''
                            state.chatType = ''
                            SSH.setItem('messageList', state.chatlist);
                            post(apiUrl.chat.getFriendsList,
                                {
                                    pageNum: 1,
                                    pageSize: 100,
                                    type: '3',
                                    userId: SSH.getItem('userInfo').id,
                                }
                            ).then((response) => {
                                state.consultlist = response.resultData
                                state.selectConsultList = []
                                state.theConsult = {}
                                state.selectConsultId = ''
                                SSH.setItem('consultList', state.consultlist);
                            });
                            Message.warning({
                                message: datajson.senderName + '结束了咨询！',
                                duration: 3000
                            })
                            break;
                        case "consultAgreeNo":
                            // -拒绝咨询 -不做操作
                            let listArry = [];
                            for (let chat of state.chatlist) {
                                if (chat.id != datajson.senderId) {
                                    listArry.push(chat)
                                }
                            }
                            state.chatlist = listArry;
                            state.selectId = ''
                            state.chatType = ''
                            SSH.setItem('messageList', state.chatlist);
                            post(apiUrl.chat.getFriendsList,
                                {
                                    pageNum: 1,
                                    pageSize: 100,
                                    type: '3',
                                    userId: SSH.getItem('userInfo').id,
                                }
                            ).then((response) => {
                                state.consultlist = response.resultData
                                state.selectConsultList = []
                                state.theConsult = {}
                                state.selectConsultId = ''
                                SSH.setItem('consultList', state.consultlist);
                            });
                            Message.warning({
                                message: datajson.senderName + '拒绝了您的咨询！',
                                duration: 3000
                            })
                            break;
                        case "groupAdd":
                            // -创建群聊 -拉人入群（进群） -不做操作
                            Message.warning({
                                message: datajson.senderName + '邀请您进入群聊！',
                                duration: 3000
                            });
                            if (state.selectCard == 2 && state.selectFriendId == 1) {
                                bus.$emit("refreshGroupList", 4);
                            }
                            
                            break;
                        case "groupDel":
                            // -删除人员 -退出群聊（退群） 删除对应群聊信息
                            // Message.warning('群聊解散通知！')
                            // let listArry1 = [];
                            // for (let chat of state.chatlist) {
                            //     if (chat.id != datajson.groupId) {
                            //         listArry1.push(chat)
                            //     }
                            // }
                            // state.chatlist = listArry1;
                            // state.selectId = ''
                            // state.chatType = ''
                            // SSH.setItem('messageList', state.chatlist);
                            let result = state.chatlist.find(session => session.id == datajson.groupId);
                            result.delFlag = '1'
                            state.chatDelFlag = '1'
                            bus.$emit("refreshList", 2);
                            SSH.setItem('messageList', state.chatlist);
                            break;
                        case "groupMemberDel":
                            // -删除人员  删除对应群聊信息
                            // Message.warning('被移出群聊！')
                            let listArry2 = [];
                            for (let chat of state.chatlist) {
                                if (chat.id != datajson.groupId) {
                                    listArry2.push(chat)
                                }
                            }
                            state.chatlist = listArry2;
                            state.selectId = ''
                            state.chatType = ''
                            SSH.setItem('messageList', state.chatlist);
                            break;
                        case "groupNameChange":
                            // Message.warning('有群名更改了！')
                            post(apiUrl.chat.getRecentChats, {
                                userId: SSH.getItem('userInfo').id
                            }).then((response) => {
                                let result = state.chatlist.find(session => session.id == datajson.groupId);
                                let messages = []
                                if (result) {
                                    messages = result.messages
                                }
                                mutations.refreshMessageList(state, response.resultData);
                                //刷新聊天列表
                                result = state.chatlist.find(session => session.id == datajson.groupId);
                                if (result) {
                                    result.messages = messages
                                }
                            });
                            break;
                        case "nickNameChange":
                            //修改群昵称
                            mutations.refreshGroupHistory(state, datajson.senderId);
                            break;
                    }
                } else if (datajson.type == 'heart') {

                }else if(datajson.type == 'updateChatRecordStatus'){
                    if(datajson.chatType=='group'){
                        let result = state.chatlist.find(session => session.id == datajson.recipient);
                        if((state.unReadNum-result.unReadNum)>=0){
                            state.unReadNum=state.unReadNum-result.unReadNum;
                        }else{
                            state.unReadNum=0;
                        }
                        result.unReadNum=0;
                        result.extString='';
                    }else{
                        let result = state.chatlist.find(session => session.receiver == datajson.recipient);
                        if((state.unReadNum-result.unReadNum)>=0){
                            state.unReadNum=state.unReadNum-result.unReadNum;
                        }else{
                            state.unReadNum=0;
                        }
                        result.unReadNum=0;
                        result.extString='';
                    }
                    SSH.setItem('messageList', state.chatlist);
                } else {
                    if (!state.openChat) {
                        // -聊天界面没打开情况下
                        state.unReadNum++
                    }
                    mutations.getMessage(state, datajson)
                }
            }
        };
        // 断开 web socket 连接成功触发事件
        state.ws.onclose = function () {
            // state.ws.close()
            console.log('websocket关闭了！')
        };
        state.ws.onerror = function () {
            // state.ws.close()
            // Message.warning('连接断开，正在重新连接，请稍后重新发送！')
        };
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            state.ws.close();
        }
    },

    // -
    initData(state, list) {
        // -好友列表
        if (list.length > 0) {
            let temp = [
                {
                    id: 0,
                    userName: '新朋友',
                    trueName: "新朋友",  //昵称
                    hPath: 'static/images/newFriend.png', //头像
                    name: '',
                },
                {
                    id: 1,
                    userName: '群聊',
                    trueName: "群聊",  //昵称
                    hPath: 'static/images/group.png', //头像
                    name: '',
                },]
            state.friendlist = temp.concat(list);
            SSH.setItem('friendList', state.friendlist);
        } else {
            // -list为空的情况下，走session

            if (SSH.getItem('friendList')) {
                if (SSH.getItem('friendList').length > 0) {
                    state.friendlist = SSH.getItem('friendList');
                } else {
                    state.friendlist = [
                        {
                            id: 0,
                            userName: '新朋友',
                            trueName: "新朋友",  //昵称
                            hPath: 'static/images/newFriend.png', //头像
                            name: '',
                        },
                        {
                            id: 1,
                            userName: '群聊',
                            trueName: "群聊",  //昵称
                            hPath: 'static/images/group.png', //头像
                            name: '',
                        },]
                }

            } else {
                state.friendlist = [
                    {
                        id: 0,
                        userName: '新朋友',
                        trueName: "新朋友",  //昵称
                        hPath: 'static/images/newFriend.png', //头像
                        name: '',
                    },
                    {
                        id: 1,
                        userName: '群聊',
                        trueName: "群聊",  //昵称
                        hPath: 'static/images/group.png', //头像
                        name: '',
                    },]
            }
            // -user信息
            if (SSH.getItem('userInfo')) {
                state.user = SSH.getItem('userInfo');
            }
        }
        // -websocket重新初始化
    },
    initConsultList(state, list) {
        if (list.length > 0) {
            state.consultlist = list
            SSH.setItem('consultList', state.consultlist);
        } else {
            // -list为空的情况下，走session
            if (SSH.getItem('consultList')) {
                state.consultlist = SSH.getItem('consultList');
            }
        }
    },
    playAudio() {
        let audio = new Audio('static/audio/cnwav.wav');
        audio.play();
    },
    // -初始化聊天记录
    refreshMessageList(state, list) {
        let arrayList = []
        for (let i = 0; i < list.length; i++) {
            let tmp = {
                id: list[i].senderid,
                photoUrl: list[i].photoUrl,
                extString:list[i].extString,//是否有人@我
                sender: SSH.getItem('userInfo').username,//发送人登录名
                receiver: list[i].sender,//接收人登录名
                msg: list[i].msg,//消息内容
                // status: '',//状态
                createDate: new Date(list[i].createDate),//时间
                type: list[i].type,//类型(例如:friend、group)
                sendName: SSH.getItem('userInfo').username,//发送人真实姓名
                username: list[i].senderName,//用户名
                companyName: list[i].companyName,//公司名称
                relTpcdName: list[i].relTpcdName,
                sex: list[i].sex,
                delFlag: list[i].delFlag,
                messages: [],
                unReadNum: parseInt(list[i].unreadCount),
            }
            if (state.selectId == list[i].senderid) {
                tmp.unReadNum = 0;
                tmp.extString='';
            }
            if (list[i].type === 'group') {
                tmp = {
                    id: list[i].receiver,
                    photoUrl: '',
                    extString:list[i].extString,//是否有人@我
                    sender: SSH.getItem('userInfo').username,//发送人登录名
                    receiver: list[i].senderName,//接收人登录名
                    msg: list[i].msg,//消息内容
                    // status: '',//状态
                    createDate: new Date(list[i].createDate),//时间
                    type: list[i].type,//类型(例如:friend、group)
                    sendName: SSH.getItem('userInfo').username,//发送人真实姓名
                    username: list[i].senderName,//用户名
                    companyName: '',//公司名称
                    messages: [],
                    nickName: list[i].nickName,
                    delFlag: list[i].delFlag,
                    createBy: list[i].groupOwner,
                    unReadNum: parseInt(list[i].unreadCount),
                }
                if (state.selectId == list[i].receiver) {
                    tmp.unReadNum = 0;
                    tmp.extString='';
                }
            }
            arrayList.push(tmp);
        }
        state.chatlist = arrayList
        SSH.setItem('messageList', state.chatlist);
    },
    refreshMessageList2(state, list, msg) {
        let arrayList = []
        for (let i = 0; i < list.length; i++) {
            let tmp = {
                id: list[i].senderid,
                photoUrl: list[i].photoUrl,
                sender: SSH.getItem('userInfo').username,//发送人登录名
                receiver: list[i].sender,//接收人登录名
                msg: list[i].msg,//消息内容
                // status: '',//状态
                createDate: new Date(list[i].createDate),//时间
                type: list[i].type,//类型(例如:friend、group)
                sendName: SSH.getItem('userInfo').username,//发送人真实姓名
                username: list[i].senderName,//用户名
                companyName: list[i].companyName,//公司名称
                relTpcdName: list[i].relTpcdName,
                sex: list[i].sex,
                delFlag: list[i].delFlag,
                messages: [],
                unReadNum: parseInt(list[i].unreadCount),
            }
            if (list[i].type === 'group') {
                tmp = {
                    id: list[i].receiver,
                    photoUrl: '',
                    sender: SSH.getItem('userInfo').username,//发送人登录名
                    receiver: list[i].senderName,//接收人登录名
                    msg: list[i].msg,//消息内容
                    // status: '',//状态
                    createDate: new Date(list[i].createDate),//时间
                    type: list[i].type,//类型(例如:friend、group)
                    sendName: SSH.getItem('userInfo').username,//发送人真实姓名
                    username: list[i].senderName,//用户名
                    companyName: '',//公司名称
                    messages: [],
                    nickName: list[i].nickName,
                    delFlag: list[i].delFlag,
                    createBy: list[i].groupOwner,
                    unReadNum: parseInt(list[i].unreadCount),
                }
            }
            arrayList.push(tmp);
        }
        state.chatlist = arrayList;
        let result = state.chatlist.find(session => session.id == msg.groupId);
        result.messages.push({
            sender: msg.sender,
            senderName: msg.senderName,
            receiver: '',
            photoUrl: msg.photoUrl,
            msg: msg,
            createDate: new Date(),
        });
        SSH.setItem('messageList', state.chatlist);
    },
    // -初始化聊天记录
    initMessageList(state, list) {
        if (list.length > 0) {
            // 聊天记录转换
            mutations.refreshMessageList(state, list)
        } else {
            // -list为空的情况下，走session
            if (SSH.getItem('messageList')) {
                state.chatlist = SSH.getItem('messageList');
            }
        }
    },
    initApplyList(state, list) {
        state.unReadNum = state.unReadNum + list.length
        state.addNum = state.addNum + list.length
    },

    // 获取搜索值
    search(state, value) {
        state.searchText = value
    }, // 获取搜索值
    searchAdd(state, value) {
        state.searchAdd = value
    },
    // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
    selectSession(state, value) {
        state.selectId = value;
        let result = state.chatlist.find(session => session.id == value);
        result.unReadNum = 0;
        result.extString='';
        state.chatType = result.type;
        state.chatDelFlag = result.delFlag;
        let receiver = '';
        if (result.type === 'friend') {
            state.selectFriendId = value;
            post(apiUrl.chat.getMemberInfos, {userId: value}).then((response) => {
                let user = response.resultData;
                result.relTpcdName = user.relTpcdName;
                result.sex = user.sex;
                // post(apiUrl.chat.updateChatRecordStatus, {
                //     sender: state.user.username,
                //     receiver: user.userName,
                //     type: result.type
                // }).then((response) => {

                // })
                let msg = {
                    "sender": state.user.username + '',
                    "recipient": user.userName + '',
                    "type": 'updateChatRecordStatus', //(群聊:group,私聊:friend,咨询:consult)
                    "chatType":'friend',
                };
                let param = JSON.stringify(msg);
                mutations.sendWs(state, param);
            })
        }
        if (result.type === 'consult') {
            post(apiUrl.chat.getMemberInfos, {userId: value}).then((response) => {
                let user = response.resultData;
                result.relTpcdName = user.relTpcdName
                result.sex = user.sex
                // post(apiUrl.chat.updateChatRecordStatus, {
                //     sender: state.user.username,
                //     receiver: user.userName,
                //     type: result.type
                // }).then((response) => {

                // })
                let msg = {
                    "sender": state.user.username + '',
                    "recipient": user.userName + '',
                    "type": 'updateChatRecordStatus', //(群聊:group,私聊:friend,咨询:consult)
                    "chatType":'consult'
                };
                let param = JSON.stringify(msg);
                mutations.sendWs(state, param);
            })
        }
        if (result.type === 'group') {
            receiver = state.selectId
            // post(apiUrl.chat.updateChatRecordStatus, {
            //     sender: state.user.username,
            //     receiver: receiver,
            //     type: result.type
            // }).then((response) => {

            // })
            let msg = {
                "sender": state.user.username+ '',
                "recipient": state.selectId+ '',
                "type": 'updateChatRecordStatus', //(群聊:group,私聊:friend,咨询:consult)
                "chatType":'group',
            };
            let param = JSON.stringify(msg);
            mutations.sendWs(state, param);
            mutations.getGroupMembers(state);
        }
        mutations.getHisMsg(state.selectId);
        SSH.setItem('messageList', state.chatlist);
    },
    //获取@群成员
    getGroupMembers(state){
        state.groupChatMembers=[];
        post(apiUrl.chat.getGroupMemberList,
            {
                pageNum: 1,
                pageSize: 100,
                groupId: state.selectId
            }
        ).then((response) => {
            state.groupChatMembers = response.resultData;
            //去除本身的群成员
            for(var i=0;i<state.groupChatMembers.length;i++){
                if(state.groupChatMembers[i].userName==SSH.getItem('userInfo').username){
                    state.groupChatMembers.splice(i,1);
                }
            }
        })
    },
    // -获取历史聊天记录
    getHisMsg(val) {
        let result = state.chatlist.find(session => session.id + '' === val + '');
        if (result.messages.length > 0) {
            return
        }
        //群聊聊天类型
        if (result.type === 'friend' || result.type === 'consult') {
            let friend = state.friendlist.find(friend => friend.id + '' === val + '');
            if (friend) {
                post(apiUrl.chat.getChatHistory, {
                    pageNum: 1,
                    pageSize: 999,
                    sender: state.user.username,
                    receiver: friend.userName,
                    type: result.type
                }).then((response) => {
                    let t = response.resultData.list;
                    for (let i = 0; i < t.length; i++) {
                        let time = new Date(t[i].createDate);
                        let obj = {
                            "senderId": t[i].senderid,
                            "recipientId": t[i].receiverid,
                            "sender": t[i].sender,
                            "recipient": t[i].receiver,
                            "msgType": t[i].msgType,
                            "content": t[i].msg,
                            "type": t[i].type,
                        }
                        let p = {
                            photoUrl: friend.hPath, // -添加好友头像
                            sender: t[i].sender,
                            receiver: t[i].receiver,
                            msg: obj,
                            createDate: time,
                        }
                        result.messages.push(p)
                    }
                })
            }
        } else if (result.type === 'group') {
            mutations.refreshGroupHistory(state, val);
        }
    },
    // 群聊历史记录重载
    refreshGroupHistory(state, value) {
        let result = state.chatlist.find(session => session.id + '' === value + '');
        if (result) {
            post(apiUrl.chat.getGroupChatHistory, {
                pageNum: 1,
                pageSize: 999,
                sender: state.user.username,
                receiver: value,
            }).then((response) => {
                let t = response.resultData.list;
                for (let i = 0; i < t.length; i++) {
                    let time = new Date(t[i].createDate);
                    let obj = {
                        "senderId": t[i].senderid,
                        "recipientId": t[i].receiver,
                        "sender": t[i].sender,
                        "senderName": t[i].senderName,
                        "recipient": t[i].receiver,
                        "msgType": t[i].msgType,
                        "content": t[i].msg,
                        "type": t[i].type,
                    }
                    let p = {
                        photoUrl: t[i].photoUrl, // -添加好友头像
                        sender: t[i].sender,
                        senderName: t[i].senderName,
                        receiver: t[i].receiver,
                        msg: obj,
                        createDate: time,
                    }
                    result.messages.push(p)
                }
            })
            //获取群成员信息
            post(apiUrl.chat.getMemberInfos, {
                userId: SSH.getItem('userInfo').id,
                groupId: value,
            }).then((response) => {
                result.nickName = response.resultData.nickName
            })
        }
    },

    // 删除聊天记录
    deleteChatHistory(state, value) {
        let result = state.chatlist.find(session => session.id == state.selectId);
        let receiver = ''
        if (value == 'friend') {
            receiver = result.receiver
        }
        if (value == 'group') {
            receiver = state.selectId
        }
        post(apiUrl.chat.deleteHistoryList, {
            sender: SSH.getItem('userInfo').username,
            receiver: receiver,
            type: value,
        }).then((response) => {
            if (response.resultCode == 'CLT000000000') {

                result.messages = []
                SSH.setItem('messageList', state.chatlist);
                Message.success('聊天记录清空成功!')
            }

        })
    },
    // 修改群昵称
    changeNickName(state, value) {
        let result = state.chatlist.find(session => session.id == state.selectId);
        result.nickName = value
        for (let message of result.messages) {
            message.senderName = value
        }
        SSH.setItem('messageList', state.chatlist);
    },
    consult(state, value) {
        // -咨询入口 -清空未读消息数
        state.unReadNum = 0;
        let userInfo = SSH.getItem('userInfo');
        //登陆者自己的服务或者需求
        if (userInfo.id == value.userId || userInfo.username == value.userName) {

        } else {
            post(apiUrl.chat.getMemberInfos, value).then((response) => {
                let user = response.resultData;
                post(apiUrl.chat.getRelationship, {
                    userid: userInfo.id,
                    friendid: user.id
                }).then((response) => {
                    let data = response.resultData.type;
                    //1:表示已添加好友，0:表示待添加的好友3:待咨询 2:没有任何关系4:同意咨询
                    let result = state.chatlist.find(session => session.id == user.id);
                    let friend = state.friendlist.find(session => session.id == user.id);
                    let consult = state.consultlist.find(session => session.id == user.id);
                    // if (data == '0') {
                    //     state.openChat = true;
                    //     state.selectCard = 2;
                    //     state.chatType = 'friend';
                    // } else
                    if (data === '1') {
                        state.openChat = true;
                        state.selectCard = 1;
                        state.chatType = 'friend';
                        if (result) {
                            state.selectId = user.id;
                        } else {
                            state.chatlist.unshift({
                                id: user.id,
                                photoUrl: user.hPath,//头像
                                sender: SSH.getItem('userInfo').username,//发送人登录名
                                receiver: user.userName,//接收人登录名
                                msg: '',//消息内容
                                // status: '',//状态
                                createDate: new Date(),//时间
                                type: 'friend',//类型(例如:friend、group)
                                sendName: SSH.getItem('userInfo').truename,//发送人真实姓名
                                username: user.trueName,//用户名
                                companyName: user.name,//公司名称
                                messages: [],
                                relTpcdName: user.relTpcdName,
                                sex: user.sex,
                                delFlag: '0',
                            });
                            SSH.setItem('messageList', state.chatlist);
                            state.selectId = user.id;
                            state.chatDelFlag = '0';
                        }
                    } else {
                        state.openChat = true;
                        state.selectCard = 1;
                        state.chatType = 'consult';
                        if (result) {
                            state.selectId = user.id;
                        } else {
                            if (consult) {
                                state.selectCard = 3;
                                post(apiUrl.chat.getConsultHistoryList,
                                    {
                                        sender: consult.userName,
                                        receiver: SSH.getItem('userInfo').username
                                    }
                                ).then((response) => {
                                    let list = response.resultData.list;
                                    let listArray = []
                                    for (let listElement of list) {
                                        listElement.photoUrl = consult.hPath
                                        listArray.push(listElement)
                                    }
                                    state.selectConsultId = consult.id
                                    state.selectConsultList = listArray;
                                    state.theConsult = consult
                                });
                            } else {
                                state.chatlist.unshift({
                                    id: user.id,
                                    photoUrl: user.hPath,//头像
                                    sender: SSH.getItem('userInfo').username,//发送人登录名
                                    receiver: user.userName,//接收人登录名
                                    msg: '',//消息内容
                                    // status: '',//状态
                                    createDate: new Date(),//时间
                                    type: 'consult',//类型(例如:frined、group)
                                    sendName: SSH.getItem('userInfo').truename,//发送人真实姓名
                                    username: user.trueName,//用户名
                                    companyName: user.name,//公司名称
                                    messages: [],
                                    relTpcdName: user.relTpcdName,
                                    sex: user.sex,
                                    delFlag: '0',
                                });
                                SSH.setItem('messageList', state.chatlist);
                                state.selectId = user.id;
                                state.chatDelFlag = '0';
                            }
                        }
                    }
                });
            })
        }
    },
    // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
    deleteSession(state, value) {
        state.chatlist.splice(value)
    },
    // 得知用户当前选择的是哪个好友。
    selectFriend(state, value) {
        state.selectFriendId = value
    },
    // @其他人的时候添加到列表中
    selectMembers(state, value) {
        //防止过快点击，造成多次触发
        if(state.isclick){
            state.isclick= false;
            //下面添加需要执行的事件
              let list = [];
            list.push(value)
            state.selectMembersList = list;
            bus.$emit("addMembers", value);
        
            //定时器
            setTimeout(function(){ 
                state.isclick = true;
            }, 500);
        }
    },
    // 得知用户当前选择的是哪个咨询。便于匹配对应的对话框
    selectConsult(state, value) {
        post(apiUrl.chat.getConsultHistoryList,
            {
                sender: value.userName,
                receiver: SSH.getItem('userInfo').username
            }
        ).then((response) => {
            let list = response.resultData.list;
            let result = state.consultlist.find(session => session.id == value.id);
            let listArray = []
            for (let listElement of list) {
                listElement.photoUrl = result.hPath
                listArray.push(listElement)
            }
            state.selectConsultId = value.id
            state.selectConsultList = listArray;
            state.theConsult = value
            // Vue.set(state.theConsult, value)
        });
    },
    selectCard(state, value) {
        state.selectCard = value;
        if (state.selectCard == 1) {
            state.msgNum = 0;
        } else if (state.selectCard == 2) {
            state.addNum = 0;
        } else {
            state.selNum = 0;
        }
        state.openDetail = false;
        state.selectFriendId = 0;
    },
    openDetail(state, value) {
        state.openDetail = value
    },
    showAdd(state, value) {
        // 创建群聊1，删除群聊人员2，好友聊天时创建群聊3 ,群聊添加人员4
        if (state.addChatType === 1) {
            let list = [];
            for (let listElement of state.friendlist) {
                if (listElement.id != 1 && listElement.id != 0) {
                    list.push(listElement)
                }
            }
            state.addFriendList = list;
            state.showAdd = value;
        }
        if (state.addChatType === 2) {
            post(apiUrl.chat.getGroupMemberList, {
                pageNum: 1,
                pageSize: 100,
                groupId: state.selectId
            }).then((response) => {
                let list = []
                for (let responseElement of response.resultData) {
                    if (responseElement.id != SSH.getItem('userInfo').id) {
                        list.push(responseElement)
                    }
                }
                state.addFriendList = list;
                state.showAdd = value;
            })
        }
        if (state.addChatType === 3) {
            let list = [];
            for (let listElement of state.friendlist) {
                if (listElement.id != 1 && listElement.id != 0) {
                    list.push(listElement)
                }
            }
            let arrayList = []
            for (let listElement of list) {
                if (listElement.id != state.selectId) {
                    arrayList.push(listElement)
                }
            }
            state.addFriendList = arrayList
            state.showAdd = value;

        }
        if (state.addChatType === 4) {
            post(apiUrl.chat.getGroupMemberList, {
                pageNum: 1,
                pageSize: 100,
                groupId: state.selectId
            }).then((response) => {
                //好友列表去除群聊中的人员
                let friends = state.friendlist
                let chatMembers = response.resultData
                let arrayList = []
                for (let i = 0; i < friends.length; i++) {
                    let result = chatMembers.find(session => session.id == friends[i].id);
                    if (result) {
                    } else {
                        arrayList.push(friends[i])
                    }
                }
                let list = []
                for (let listElement of arrayList) {
                    if (listElement.id != 1 && listElement.id != 0) {
                        list.push(listElement)
                    }
                }
                state.addFriendList = list
                state.showAdd = value;

            })
        }
    },
    compare(property) {
        return function (b, a) {
            var value1 = Date.parse(a[property]);
            var value2 = Date.parse(b[property]);
            return value1 - value2;
        }
    },
    // 发送信息
    sendMessage(state, msg) {
        msg.content = msg.content.replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
        let result = state.chatlist.find(session => session.id == state.selectId);
        let friend = state.friendlist.find(friend => friend.id == state.selectId);
        if (result.type == 'consult') {
            result.messages.push({
                sender: state.user.username,
                receiver: result.receiver,
                msg: msg,
                createDate: new Date(),
            });
        } else if (result.type == 'friend') {
            result.messages.push({
                sender: state.user.username,
                receiver: friend.userName,
                msg: msg,
                createDate: new Date(),
            });

        } else if (result.type == 'group') {
            result.messages.push({
                sender: state.user.username,
                receiver: state.selectId,
                msg: msg,
                createDate: new Date(),
            });
        }
        result.createDate = new Date()//时间
        state.chatlist.sort(mutations.compare('createDate'))
        SSH.setItem('messageList', state.chatlist);
    },
    getMessage(state, msg) {
        // mutations.playAudio()
        if (msg.type == 'consult') {
            post(apiUrl.chat.getMemberInfos, {
                userId: msg.recipientId,
            }).then((response) => {
                let user = response.resultData;
                post(apiUrl.chat.getRelationship, {
                    userid: SSH.getItem('userInfo').id,
                    friendid: msg.senderId
                }).then((response) => {
                    let data = response.resultData.type;
                    //1:表示已添加好友，0:表示待添加的好友3:待咨询 2:没有任何关系4:同意咨询
                    let result = state.chatlist.find(session => session.id == msg.senderId);
                    if (data === '4' || data === '1') {
                        if (state.selectCard != 1) {
                            state.msgNum++;
                        }
                        state.openChat = true;
                        state.selectCard = 1;
                        state.chatType = msg.type;
                        if (result) {
                            result.createDate = new Date();//时间
                            if (state.selectId != msg.senderId) {
                                result.unReadNum++
                            } else {
                                post(apiUrl.chat.getMemberInfos, {userId: msg.senderId}).then((response) => {
                                    let user = response.resultData;
                                    // post(apiUrl.chat.updateChatRecordStatus, {
                                    //     sender: state.user.username,
                                    //     receiver: user.userName,
                                    //     type: result.type
                                    // }).then((response) => {

                                    // })
                                    let msg = {
                                        "sender": state.user.username+ '',
                                        "recipient": user.userName + '',
                                        "type": 'updateChatRecordStatus', //(群聊:group,私聊:friend,咨询:consult)
                                        "chatType":state.chatType,
                                    };
                                    let param = JSON.stringify(msg);
                                    mutations.sendWs(state, param);
                                })
                            }
                            result.messages.push({
                                sender: msg.sender,
                                photoUrl: msg.photoUrl,
                                receiver: msg.recipient,
                                msg: msg,
                                createDate: new Date(),
                            });
                        } else {
                            state.chatlist.unshift({
                                unReadNum: 1,
                                delFlag: '0',
                                id: msg.senderId,
                                photoUrl: user.hPath,//头像
                                sender: SSH.getItem('userInfo').username,//发送人登录名
                                receiver: user.userName,//接收人登录名
                                msg: msg.msg,//消息内容
                                // status: '',//状态
                                createDate: new Date(),//时间
                                type: msg.type,//类型(例如:friend、group)
                                sendName: SSH.getItem('userInfo').truename,//发送人真实姓名
                                username: user.trueName,//用户名
                                companyName: user.name,//公司名称
                                relTpcdName: user.relTpcdName,//用户角色名
                                messages: [{
                                    sender: msg.sender,
                                    photoUrl: msg.photoUrl,
                                    receiver: msg.recipient,
                                    msg: msg,
                                    createDate: new Date(),
                                }],
                            });
                        }
                    } else {

                    }
                    SSH.setItem('messageList', state.chatlist);
                })
            })
        } else if (msg.type == 'friend') {
            if (state.selectCard != 1) {
                state.msgNum++;
            }
            let result = state.chatlist.find(session => session.id == msg.senderId);
            let friend = state.friendlist.find(session => session.id == msg.senderId);
            if (result) {
                if (state.selectId != msg.senderId) {
                    result.unReadNum++
                } else {
                    post(apiUrl.chat.getMemberInfos, {userId: msg.senderId}).then((response) => {
                        let user = response.resultData;
                        // post(apiUrl.chat.updateChatRecordStatus, {
                        //     sender: state.user.username,
                        //     receiver: user.userName,
                        //     type: result.type
                        // }).then((response) => {

                        // })
                        let msg = {
                            "sender": state.user.username + '',
                            "recipient": user.userName + '',
                            "type": 'updateChatRecordStatus', //(群聊:group,私聊:friend,咨询:consult)
                            "chatType":'friend',
                        };
                        let param = JSON.stringify(msg);
                        mutations.sendWs(state, param);
                    })
                }
                state.chatType = result.type;
                result.createDate = new Date();//时间
                result.messages.push({
                    photoUrl: friend.hPath, // -添加好友头像
                    sender: msg.sender,
                    receiver: msg.recipient,
                    msg: msg,
                    createDate: new Date(),
                });
            } else {
                state.chatlist.unshift({
                    unReadNum: 1,
                    delFlag: '0',
                    id: msg.senderId,
                    photoUrl: friend.hPath,//头像
                    sender: SSH.getItem('userInfo').username,//发送人登录名
                    receiver: friend.userName,//接收人登录名
                    msg: msg.msg,//消息内容
                    // status: '',//状态
                    createDate: new Date(),//时间
                    type: msg.type,//类型(例如:friend、group)
                    sendName: SSH.getItem('userInfo').truename,//发送人真实姓名
                    username: friend.trueName,//用户名
                    companyName: friend.name,//公司名称
                    relTpcdName: friend.relTpcdName,//用户角色名
                    messages: [{
                        photoUrl: friend.hPath, // -添加好友头像
                        sender: msg.sender,
                        receiver: msg.recipient,
                        msg: msg,
                        createDate: new Date(),
                    }],
                });
            }
            state.chatlist.sort(mutations.compare('createDate'))
            SSH.setItem('messageList', state.chatlist);
        } else if (msg.type == 'group') {
            if (state.selectCard != 1) {
                state.msgNum++;
            }
            let result = state.chatlist.find(session => session.id == msg.groupId);
            if (result) {
                state.chatType = result.type;
                if (state.selectId != msg.groupId) {
                    result.unReadNum++
                } else {
                    // post(apiUrl.chat.updateChatRecordStatus, {
                    //     sender: state.user.username,
                    //     receiver: msg.groupId,
                    //     type: result.type
                    // }).then((response) => {

                    // })
                    let msg = {
                        "sender":state.user.username + '',
                        "recipient": state.selectId+ '',
                        "type": 'updateChatRecordStatus', //(群聊:group,私聊:friend,咨询:consult)
                        "chatType":'group',
                    };
                    let param = JSON.stringify(msg);
                    mutations.sendWs(state, param);
                }
                //时间
                result.createDate = new Date()
                if (result.messages.length > 0) {
                    result.messages.push({
                        sender: msg.sender,
                        senderName: msg.senderName,
                        receiver: '',
                        photoUrl: msg.photoUrl,
                        msg: msg,
                        createDate: new Date(),
                    });
                } else {
                    mutations.getHisMsg(msg.groupId);
                }
                state.chatlist.sort(mutations.compare('createDate'))
                SSH.setItem('messageList', state.chatlist);
            } else {
                // -获取聊天列表
                post(apiUrl.chat.getGroupInfoById, {
                    groupId: msg.groupId
                }).then((response) => {
                    state.chatlist.unshift({
                        unReadNum: 1,
                        delFlag: '0',
                        id: msg.groupId,
                        photoUrl: msg.photoUrl,//头像
                        sender: SSH.getItem('userInfo').username,//发送人登录名
                        receiver: response.resultData.groupname,//接收人登录名
                        msg: msg.msg,//消息内容
                        // status: '',//状态
                        createDate: new Date(),//时间
                        createBy: response.resultData.createBy,
                        type: msg.type,//类型(例如:friend、group)
                        sendName: SSH.getItem('userInfo').truename,//发送人真实姓名
                        username: response.resultData.groupname,//用户名
                        companyName: response.resultData.groupname,//公司名称
                        messages: [{
                            photoUrl: msg.photoUrl, // -添加好友头像
                            sender: msg.sender,
                            senderName: msg.senderName,
                            receiver: '',
                            msg: msg,
                            createDate: new Date(),
                        }],
                    });
                    SSH.setItem('messageList', state.chatlist);
                });
            }
        }
    },
    changeChatType(state, value) {
        let result = state.chatlist.find(session => session.id == value);
        if (result) {
            result.type = 'friend'
            state.chatType = 'friend'
        }
        SSH.setItem('messageList', state.chatlist);
        // state.openDetail = false
    },
    windowChat(state, value) {
        state.openChat = value
    },
    modifyGroup(state, value) {
        post(apiUrl.chat.getRecentChats, {
            userId: SSH.getItem('userInfo').id
        }).then((response) => {
            let result = state.chatlist.find(session => session.id == state.selectId);
            let messages = []
            if (result) {
                messages = result.messages
            }
            mutations.refreshMessageList(state, response.resultData);
            //刷新聊天列表
            result = state.chatlist.find(session => session.id == state.selectId);
            if (result) {
                result.messages = messages
            }
        });
    },
    groupAddMembers(state, value) {
        let userId = ''
        for (var valueElement of value) {
            if (userId === '') {
                userId = valueElement.id
            } else {
                userId = userId + ',' + valueElement.id
            }
        }
        post(apiUrl.chat.sendJoinGroupRequest, {
                groupId: state.selectId,
                userId: userId,
                createBy: SSH.getItem('userInfo').id
            }
        ).then((response) => {
            bus.$emit("refreshList", 1);
            let msg = {
                "senderId": SSH.getItem('userInfo').id + '',
                "senderName": SSH.getItem('userInfo').truename + '',
                "recipientId": state.selectId + '',
                "sender": SSH.getItem('userInfo').username + '',
                "recipient": state.selectId + '',
                "msgType": 'text', //(文本:text,图片:image)
                "content": 'groupAddMembers',
                "action": 'otherGroupMember',
                "groupId": state.selectId + '',
                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
            };
            let param = JSON.stringify(msg);
            mutations.sendWs(state, param);
            post(apiUrl.chat.getRecentChats, {
                userId: SSH.getItem('userInfo').id
            }).then((response) => {
                let result = state.chatlist.find(session => session.id == state.selectId);
                let messages = result.messages
                //刷新聊天列表
                mutations.refreshMessageList(state, response.resultData);
                mutations.getGroupMembers(state);
                result = state.chatlist.find(session => session.id == state.selectId);
                result.messages = messages
            });
        })

    },
    createChat(state, value) {
        let groupName = '';
        let memberInfos = [];
        memberInfos.push({
            userId: state.user.id,
            userName: state.user.truename,
        })
        for (var valueElement of value) {
            if (groupName === '') {
                groupName = valueElement.trueName
            } else {
                groupName = groupName + '、' + valueElement.trueName
            }
            memberInfos.push({
                userId: valueElement.id,
                userName: valueElement.trueName,
            })
        }
        groupName = state.user.truename + '、' + groupName;
        post(apiUrl.chat.createGroup, {
                createId: SSH.getItem('userInfo').id,
                groupName: groupName,
                avatarUrl: '',
                remarks: '',
                memberInfos: memberInfos
            }
        ).then((response) => {
            state.selectFriendsList = [];
            state.selectArr = [];
            state.addFriendList = [];
            state.selectCard = 1;
            state.chatType = 'group';
            let groupId = response.resultData.groupId
            state.chatlist.unshift({
                id: groupId,
                createBy: SSH.getItem('userInfo').id,
                photoUrl: '',//头像
                extString:'',
                sender: SSH.getItem('userInfo').username,//发送人登录名
                receiver: groupName,//接收人登录名
                msg: '',//消息内容
                // status: '',//状态
                createDate: new Date(),//时间
                type: 'group',//类型(例如:friend、group)
                sendName: SSH.getItem('userInfo').truename,//发送人真实姓名
                nickName: SSH.getItem('userInfo').truename,//发送人真实姓名
                username: groupName,//用户名
                companyName: '',//公司名称
                delFlag: '0',
                messages: [],
            });
            state.chatDelFlag='0'
            SSH.setItem('messageList', state.chatlist);
            state.selectId = groupId;
            let msg = {
                "senderId": SSH.getItem('userInfo').id + '',
                "senderName": SSH.getItem('userInfo').truename + '',
                "recipientId": groupId + '',
                "sender": SSH.getItem('userInfo').username + '',
                "recipient": groupId + '',
                "msgType": 'text', //(文本:text,图片:image)
                "content": 'groupAdd',
                "action": 'otherGroupMember',
                "groupId": groupId + '',
                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
            };
            let param = JSON.stringify(msg);
            mutations.sendWs(state, param);
            mutations.getGroupMembers(state);
        })
    },
    quitChat(state, val) {
        //delete 群主删除群聊 quit 群成员退群
        if (val === 'delete') {
            // let list = [];
            // for (let chat of state.chatlist) {
            //     if (chat.id !== state.selectId) {
            //         list.push(chat)
            //     }
            // }
            // state.chatlist = list
            // state.selectId = ''
            // state.chatType = '';
            // SSH.setItem('messageList', state.chatlist);
            let result = state.chatlist.find(session => session.id == state.selectId);
            result.delFlag = '1'
            state.chatDelFlag = '1'
            SSH.setItem('messageList', state.chatlist);
        }
        if (val === 'quit') {
            let list = [];
            for (let chat of state.chatlist) {
                if (chat.id !== state.selectId) {
                    list.push(chat)
                }
            }
            state.chatlist = list
            state.selectId = ''
            state.chatType = '';
            SSH.setItem('messageList', state.chatlist);
        }
    },
    deleteChatMembers(state, value) {
        let userId = ''
        for (let valueElement of value) {
            if (userId === '') {
                userId = valueElement.id
            } else {
                userId = userId + ',' + valueElement.id
            }
        }
        post(apiUrl.chat.delGroupMember, {
                userId: userId,
                groupId: state.selectId,
                operationId: SSH.getItem('userInfo').id
            }
        ).then((response) => {
            state.selectFriendsList = [];
            state.selectArr = [];
            state.addFriendList = [];
            bus.$emit("refreshList", 1);
            for (let valueElement of value) {
                let msg = {
                    "senderId": SSH.getItem('userInfo').id + '',
                    "recipientId": valueElement.id + '',
                    "senderName": SSH.getItem('userInfo').truename + '',
                    "sender": SSH.getItem('userInfo').username + '',
                    "recipient": valueElement.userName + '',
                    "msgType": 'text', //(文本:text,图片:image)
                    "content": 'groupMemberDel',
                    "action": 'single',
                    "groupId": state.selectId + '',
                    "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                };
                let param = JSON.stringify(msg);
                mutations.sendWs(state, param);
            }
            let msg = {
                "senderId": SSH.getItem('userInfo').id + '',
                "recipientId": state.selectId + '',
                "senderName": SSH.getItem('userInfo').truename + '',
                "sender": SSH.getItem('userInfo').username + '',
                "recipient": state.selectId + '',
                "msgType": 'text', //(文本:text,图片:image)
                "content": 'groupNameChange',
                "action": 'otherGroupMember',
                "groupId": state.selectId + '',
                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
            };
            let param = JSON.stringify(msg);
            mutations.sendWs(state, param);
            post(apiUrl.chat.getRecentChats, {
                userId: SSH.getItem('userInfo').id
            }).then((response) => {
                let result = state.chatlist.find(session => session.id == state.selectId);
                let messages = result.messages
                //刷新聊天列表
                mutations.refreshMessageList(state, response.resultData);
                mutations.getGroupMembers(state);
                result = state.chatlist.find(session => session.id == state.selectId);
                result.messages = messages
            });
        })
    },
    //发送失败关闭链接重新链接重新发送
    sendWs(state, param) {
        state.ws.send(param);
    },
    //心跳重连
    heartTimeOut(state) {
        if (SSH.getItem('userInfo') && state.heartOpen) {
            let msg = {
                "senderId": SSH.getItem('userInfo').id + '',
                "recipientId": SSH.getItem('userInfo').id + '',
                "sender": SSH.getItem('userInfo').username + '',
                "senderName": SSH.getItem('userInfo').username + '',
                "recipient": SSH.getItem('userInfo').username + '',
                "msgType": 'text', //(文本:text,图片:image)
                "content": 'heartBeat',
                "action": 'single',
                "type": 'heart'
            };
            let param = JSON.stringify(msg);
            mutations.sendWs(state, param);
            setTimeout(function () {
                mutations.heartTimeOut(state)
            }, 30000);
        }
    }
}

const getters = {
    // 筛选出含有搜索值的聊天列表
    searchedChatlist(state) {
        if (state.chatlist.length > 0) {
            let chats = state.chatlist.filter(chats => chats.receiver.includes(state.searchText));
            return chats
        }
    },
    //获取聊天成员列表
    getGroupChatMembers(state){
        let groupChatMembers=state.groupChatMembers;
        return  groupChatMembers;
    },
    // 筛选出含有搜索值的好友列表
    searchedFriendlist(state) {
        if (state.friendlist.length > 0) {
            let friends = state.friendlist.filter(friends => friends.trueName.includes(state.searchText));
            return friends
        }
    },
    // 获取创建群聊的好友列表
    searchedConsultlist(state) {
        if (state.consultlist.length > 0) {
            let friends = state.consultlist.filter(friends => friends.trueName.includes(state.searchAdd));
            return friends
        }
    },
    // 获取创建群聊的好友列表
    getFriendsList(state) {
        if (state.addFriendList.length > 0) {
            let friends = state.addFriendList.filter(friends => friends.trueName.includes(state.searchAdd));
            return friends
        }
    },
    // 通过当前选择是哪个对话匹配相应的对话
    selectedChat(state) {
        let session = state.chatlist.find(session => session.id == state.selectId);
        state.openDetail = false;
        return session
    },
    // 通过当前选择是哪个好友匹配相应的好友
    selectedFriend(state) {
        let friend = state.friendlist.find(friend => friend.id == state.selectFriendId);
        return friend
    },

    messages(state) {
        let session = state.chatlist.find(session => session.id == state.selectId);
        if (session) {
            return session.messages
        } else {
            return null;
        }
    },
    getUnReadNum(state) {
        return state.unReadNum;
    },
    getMsgNum(state) {
        return state.msgNum;
    },
    getAddNum(state) {
        return state.addNum;
    },
    getSelNum(state) {
        return state.selNum;
    },
}

const actions = {
    search: ({commit}, value) => {
        setTimeout(() => {
            commit('search', value)
        }, 100)
    },
    searchAdd: ({commit}, value) => {
        setTimeout(() => {
            commit('searchAdd', value)
        }, 100)
    },
    selectSession: ({commit}, value) => commit('selectSession', value),
    selectConsult: ({commit}, value) => commit('selectConsult', value),
    //咨询
    consult: ({commit}, value) => commit('consult', value),
    deleteSession: ({commit}, value) => commit('deleteSession', value),
    selectFriend: ({commit}, value) => commit('selectFriend', value),
    selectCard: ({commit}, value) => commit('selectCard', value),
    selectMembers: ({commit}, value) => commit('selectMembers', value),
    openDetail: ({commit}, value) => commit('openDetail', value),
    showAdd: ({commit}, value) => commit('showAdd', value),
    sendMessage: ({commit}, msg) => commit('sendMessage', msg),
    getMessage: ({commit}, msg) => commit('getMessage', msg),
    send: ({commit}) => commit('send'),
    initMessageList: ({commit}, list) => commit('initMessageList', list),
    initApplyList: ({commit}, list) => commit('initApplyList', list),
    initData: ({commit}, list) => commit('initData', list),
    initConsultList: ({commit}, list) => commit('initConsultList', list),
    initChat: ({commit}) => commit('initChat'),
    windowChat: ({commit}, value) => commit('windowChat', value),
    //创建群聊
    createChat: ({commit}, value) => commit('createChat', value),
    //修改群名
    modifyGroup: ({commit}, value) => commit('modifyGroup', value),
    //删除群聊人员
    deleteChatMembers: ({commit}, value) => commit('deleteChatMembers', value),
    //退出群聊
    quitChat: ({commit}, value) => commit('quitChat', value),
    //群聊拉人
    groupAddMembers: ({commit}, value) => commit('groupAddMembers', value),
    //群聊拉人
    deleteChatHistory: ({commit}, value) => commit('deleteChatHistory', value),
    //添加好友后如果存在咨询聊天改为好友聊天
    changeChatType: ({commit}, value) => commit('changeChatType', value),
    sendWs: ({commit}, value) => commit('sendWs', value),
    //修改群昵称
    changeNickName: ({commit}, value) => commit('changeNickName', value),
    getFriendsList: ({commit}) => commit('getFriendsList'),
}

export default {
    state,
    getters,
    actions,
    mutations
}
