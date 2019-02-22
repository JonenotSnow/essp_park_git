import constants from "../../util/constants";
import Message from '../../util/message';

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
        if(state.messageList.findIndex(o => o.errType === constants.RETURN_CODE.ERROR_SYSTEM_TYPE)<0) {
            state.messageList.push({
                id: 0,
                message: '很抱歉服务器感冒了，点击查看病因',
                type: 'error',
                duration: constants.RETURN_CODE.MSG_TIME,
                errType: constants.RETURN_CODE.ERROR_SYSTEM_TYPE,
                detailShow: true,
                downShow: true,
            })
        }
    },
    pushTimeOutMsgList(state, errMsg){
        state.timeOutMsgList.push(errMsg)
        if(state.messageList.findIndex(o => o.errType === constants.RETURN_CODE.ERROR_NETWORK_TYPE)<0) {
            state.messageList.push({
                id: 1,
                message: '连接服务器失败,请检查网络是否正常',
                type: 'error',
                duration: constants.RETURN_CODE.MSG_TIME,
                errType: constants.RETURN_CODE.ERROR_NETWORK_TYPE,
                detailShow: true,
                downShow: true,
            })
        }
    },
    pushMessageList(state, msg) {
        if(msg.errType !== constants.RETURN_CODE.ERROR_BUSINESS_TYPE && state.messageList.findIndex(o => o.errType === msg.errType)>=0){
            let num = state.messageList.findIndex(o => o.errType === msg.errType)
            if(num>=0){
                state.messageList[num].time = 0
            }
        }else{
            state.messageList.push(msg)
        }
    },
    clearMessageList(state, msg) {
        state.messageList = state.messageList.filter(o => o.id !== msg.id)
        if(msg.errType === constants.RETURN_CODE.ERROR_SYSTEM_TYPE){
            state.errMsgList = []
        }
        if(msg.errType === constants.RETURN_CODE.ERROR_NETWORK_TYPE){
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
                row.duration--
            })
            state.errMsgList = state.errMsgList.filter(o => o.duration > 0)
        }
        if(state.timeOutMsgList.length>0){
            state.timeOutMsgList.forEach(row=>{
                row.duration--
            })
            state.timeOutMsgList = state.timeOutMsgList.filter(o => o.duration > 0)
        }
        if(state.messageList.length>0){
            state.messageList.forEach(row=>{
                row.duration--
            })
            let messageListTmp = state.messageList.filter(o => o.duration > 0 && o.errType !== constants.RETURN_CODE.ERROR_SYSTEM_TYPE && o.errType !== constants.RETURN_CODE.ERROR_NETWORK_TYPE)

            // state.messageList = state.messageList.filter(o => o.duration > 0 && o.errType !== constants.RETURN_CODE.ERROR_SYSTEM_TYPE && o.errType !== constants.RETURN_CODE.ERROR_NETWORK_TYPE)
            if(state.timeOutMsgList.length>0){
                if(state.messageList.findIndex(o => o.errType === constants.RETURN_CODE.ERROR_NETWORK_TYPE)<0){
                    messageListTmp.push({
                        id: 1,
                        message: '连接服务器失败,请检查网络是否正常',
                        type: 'error',
                        duration: constants.RETURN_CODE.MSG_TIME,
                        errType: constants.RETURN_CODE.ERROR_NETWORK_TYPE,
                        detailShow: true,
                        downShow: true,
                    })
                }else{
                    state.messageList.forEach(row=>{
                        if(row.errType === constants.RETURN_CODE.ERROR_NETWORK_TYPE){
                            row.duration = constants.RETURN_CODE.MSG_TIME
                            messageListTmp.push(row)
                        }
                    })
                }
            }else{
                state.timeOutMsgList = []
            }
            if(state.errMsgList.length>0){
                if(state.messageList.findIndex(o => o.errType === constants.RETURN_CODE.ERROR_SYSTEM_TYPE)<0){
                    messageListTmp.push({
                        id: 0,
                        message: '很抱歉服务器感冒了，点击查看病因',
                        type: 'error',
                        duration: constants.RETURN_CODE.MSG_TIME,
                        errType: constants.RETURN_CODE.ERROR_SYSTEM_TYPE,
                        detailShow: true,
                        downShow: true,
                    })
                }else{
                    state.messageList.forEach(row=>{
                        if(row.errType === constants.RETURN_CODE.ERROR_SYSTEM_TYPE){
                            row.duration = constants.RETURN_CODE.MSG_TIME
                            messageListTmp.push(row)
                        }
                    })
                }
            }else{
                state.errMsgList = []
            }
            state.messageList = messageListTmp
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
