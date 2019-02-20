import constants from "../../util/constants";

// 状态值
const state = {
    messageList: [],   // 消息列表
    errMsgList: [],    // 技术错误消息
    timeOutMsgList: [],  // 连接超时消息
}
// getters
const getters = {

}

// actions
const actions = {
}

// mutations
const mutations = {
    pushErrMsgList(state, errMsg) {
        state.errMsgList.push(errMsg)
        if(state.messageList.findIndex(o => o.type === constants.RETURN_CODE.ERROR_SYSTEM_TYPE)<0) {
            let msg = {
                message: '服务器感冒了，点击查看病因',
                time: 0,
                type: constants.RETURN_CODE.ERROR_SYSTEM_TYPE,
                show: true,
                downShow: true
            }
            state.messageList.push(msg)
        }
    },
    pushTimeOutMsgList(state, errMsg){
        state.timeOutMsgList.push(errMsg)
        if(state.messageList.findIndex(o => o.type === constants.RETURN_CODE.ERROR_NETWORK_TYPE)<0) {
            let msg = {
                message: '连接服务器失败,请检查网络是否正常',
                time: 0,
                type: constants.RETURN_CODE.ERROR_NETWORK_TYPE,
                show: true,
                downShow: true
            }
            state.messageList.push(msg)
        }
    },
    pushMessageList(state, msg) {
        if(msg.type !== constants.RETURN_CODE.ERROR_BUSINESS_TYPE && state.messageList.findIndex(o => o.type === msg.type)>=0){
            let num = state.messageList.findIndex(o => o.type === msg.type)
            if(num>=0){
                state.messageList[num].time = 0
            }
        }else{
            state.messageList.push(msg)
        }
    },
    clearMessageList(state, msg) {
        state.messageList = state.messageList.filter(o => o.id !== msg.id)
        if(msg.type === constants.RETURN_CODE.ERROR_SYSTEM_TYPE){
            state.errMsgList = []
        }
        if(msg.type === constants.RETURN_CODE.ERROR_NETWORK_TYPE){
            state.timeOutMsgList = []
        }
    },
    clearAllMsgList(state){
        state.errMsgList = []
        state.messageList = []
        state.timeOutMsgList = []
    },
    messageTime(state){
        if(state.errMsgList.length>0){
            state.errMsgList.forEach(row=>{
                row.time++
            })
            state.errMsgList = state.errMsgList.filter(o => o.time < 10)
        }
        if(state.timeOutMsgList.length>0){
            state.timeOutMsgList.forEach(row=>{
                row.time++
            })
            state.timeOutMsgList = state.timeOutMsgList.filter(o => o.time < 10)
        }
        if(state.messageList.length>0){
            state.messageList.forEach(row=>{
                row.time++
            })
            state.messageList = state.messageList.filter(o => o.time < 10 && o.type !== constants.RETURN_CODE.ERROR_SYSTEM_TYPE && o.type !== constants.RETURN_CODE.ERROR_NETWORK_TYPE)
            if(state.timeOutMsgList.length>0){
                state.messageList.push({
                    message: '连接服务器失败,请检查网络是否正常',
                    time: 0,
                    type: constants.RETURN_CODE.ERROR_NETWORK_TYPE,
                    show: true,
                    downShow: true
                })
            }else{
                state.timeOutMsgList = []
            }
            if(state.errMsgList.length>0){
                state.messageList.push({
                    message: '服务器感冒了，点击查看病因',
                    time: 0,
                    type: constants.RETURN_CODE.ERROR_SYSTEM_TYPE,
                    show: true,
                    downShow: true
                })
            }else{
                state.errMsgList = []
            }
        }else{
            state.errMsgList = []
            state.messageList = []
            state.timeOutMsgList = []
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
