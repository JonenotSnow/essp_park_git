import store from "../store";
import constants from "./constants";

var id = 2;
const Message = function(options){
    options = options || {}
    if (typeof options === 'string') {
        options = {
            message: options
        }
    }

    options['id'] = id++
    if(!options.errType){
        options['errType'] = constants.RETURN_CODE.ERROR_BUSINESS_TYPE
    }
    if(!options.type){
        options['type'] = 'info'
    }
    if(!options.duration){
        options['duration'] = constants.RETURN_CODE.MSG_TIME/1000
    }else{
        options.duration = options.duration/1000
    }
    if(!options.detailShow){
        options['detailShow'] = false
    }
    if(!options.downShow){
        options['downShow'] = false
    }
    const actions = new Map([
        [constants.RETURN_CODE.ERROR_BUSINESS_TYPE, ()=>{ store.commit('pushMessageList', options) }],
        [constants.RETURN_CODE.ERROR_SYSTEM_TYPE, ()=>{ store.commit('pushErrMsgList', options) }],
        [constants.RETURN_CODE.ERROR_OTHER_LOGIN_TYPE, ()=>{ store.commit('pushMessageList', options) }],
        [constants.RETURN_CODE.ERROR_UNKNOWN_TYPE, ()=>{ store.commit('pushErrMsgList', options) }],
        [constants.RETURN_CODE.ERROR_NETWORK_TYPE, ()=>{ store.commit('pushTimeOutMsgList', options) }],
        [constants.RETURN_CODE.ERROR_INVALID_TOKEN_TYPE, ()=>{ store.commit('pushMessageList', options) }],
        [constants.RETURN_CODE.ERROR_SERVICE_TYPE, ()=>{ store.commit('pushMessageList', options) }],
        [constants.RETURN_CODE.ERROR_OLD_ERROR_TYPE, ()=>{ store.commit('pushMessageList', options) }],
        ['default', ()=>{ store.commit('pushMessageList', options) }]
    ])
    let action = actions.get(options.errType) || actions.get('default')
    action.call(this)
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Message(options);
    };
});

export default Message;
