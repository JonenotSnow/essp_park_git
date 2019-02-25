<template>
    <!-- 全局提示框 class="dialog-tips dialog-center"-->
    <div class="essp_message_position"
         @mouseenter="clearTimer"
         @mouseleave="startTimer">
        <div style="min-height:10px">
            <!--<div v-for="item in messageList" :class="['el-message',`el-message&#45;&#45;error`,'is-center',]">-->
            <div v-for="item in messageList" :class="`essp_message_style essp_message_${ item.type }`">
                <div class="essp_message_setting">
                    <i :class="`essp_message_logo essp_message_content_${ item.type } el-icon-${ item.type }`"></i>
                    <span :class="`essp_message-content essp_message_content_${ item.type }`">{{item.message}}</span>
                    <i class="essp_message_detailmsg el-icon-arrow-down" @click="detailMsgShow(false,item)" v-if="item.downShow && item.detailShow"></i>
                    <i class="essp_message_detailmsg el-icon-arrow-up" @click="detailMsgShow(true,item)" v-if="!item.downShow && item.detailShow"></i>
                    <i class="essp-message__closeBtn el-icon-close" @click="closeMessageList(item)"></i>
                </div>
                <div v-if="errMsgShow && item.detailShow" style="border-top: 1px solid #f56c6c; margin-top: 15px;padding-bottom:10px">
                    <p v-for="erritem in errMsgList" class="essp_detail_message-content">{{erritem.detailMessage}}</p>
                </div>
                <div v-if="timeOutMsgShow && item.detailShow" style="border-top: 1px solid #f56c6c; margin-top: 15px;padding-bottom:10px">
                    <p class="essp_detail_message-content" v-for="timeoutitem in timeOutMsgList">{{timeoutitem.detailMessage}}</p>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    const typeMap = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error'
    };
    export default {
        props: ['messageList', 'errMsgList', 'timeOutMsgList'],
        data() {
            return {
                message: "",
                allMessage: '',
                detailShow: false,
                errMsgShow: false,
                timeOutMsgShow: false,
                timer: null,
            };
        },
        mounted() {
            this.startTimer();
        },
        methods: {
            detailMsgShow(val,item){
                item.downShow = val
                if(item.downShow === true){
                    this.errMsgShow = false
                    this.timeOutMsgShow = false
                }else{
                    if(item.errType===this.constants.RETURN_CODE.ERROR_NETWORK_TYPE){
                        this.errMsgShow = false
                        this.timeOutMsgShow = true
                    }else if(item.errType===this.constants.RETURN_CODE.ERROR_SYSTEM_TYPE){
                        this.errMsgShow = true
                        this.timeOutMsgShow = false
                    }
                }
                // this.detailShow =val
            },
            closeMessageList(val){
                if(val.errType === this.constants.RETURN_CODE.ERROR_NETWORK_TYPE){
                    this.timeOutMsgShow = false
                }else if(val.errType===this.constants.RETURN_CODE.ERROR_SYSTEM_TYPE){
                    this.errMsgShow = false
                }
                this.$store.commit('clearMessageList',val)
            },
            clearTimer() {
                clearTimeout(this.timer);
            },
            startTimer() {
                this.timer = setTimeout(() => {
                    this.$store.commit('messageTime')
                    if(this.messageList.length>0){
                        this.startTimer()
                    }
                }, 1000);
            },
        },
        destroyed: function () {
            clearTimeout(this.timer);
            this.timer = null;
        },
    };
</script>
<style lang="less" scope>
    .essp_message_success{
        border-color: #e1f3d8;
        background-color: #f0f9eb;
    }
    .essp_message_content_success{
        color: #67c23a;
    }
    .essp_message_info{
        border-color: #ebeef5;
        background-color: #edf2fc;
    }
    .essp_message_content_info{
        color: #909399;
    }
    .essp_message_warning{
        border-color: #faecd8;
        background-color: #fdf6ec;
    }
    .essp_message_content_warning{
        color: #e6a23c;
    }
    .essp_message_error{
        border-color: #fde2e2;
        background-color: #fef0f0;
    }
    .essp_message_content_error{
        color: #f56c6c;
    }
    .essp_message_position{
        z-index: 9999;
        position: fixed;
        top: 20px;
        left: 50%;
        overflow: auto;
        max-height: 88vh;
        transform: translateX(-50%);
    }
    .essp_message_style{
        z-index: 9999;
        width: 600px;
        margin: 5px 0px;
        border-width: 1px;
        border-style: solid;
        /*transform: translateX(-50%);*/
        /*transition: opacity .3s,transform .4s,-webkit-transform .4s;*/
        padding: 15px 33px 15px 20px;
        display: flex;
        flex-direction: column;
        -webkit-box-align: center;
        /*align-items: center;*/
        border-radius: 4px;
        overflow: hidden;
        /*box-sizing: border-box;*/
        /*justify-content: center;*/
        -webkit-box-pack: center;
        .essp_message_setting {
            display: flex;
            align-items: center;
            .essp_message-content{
                margin: 0;
                font-size: 14px;
                /*color: #f56c6c;*/
                line-height: 22px;
            }
            .essp_message_logo{
                margin-right: 10px;
                /*color: #f56c6c;*/
            }
            .essp_message_detailmsg{
                margin-left: 10px;
            }
            .essp-message__closeBtn {
                position: absolute;
                right: 15px;
                cursor: pointer;
                color: #c0c4cc;
                font-size: 16px;
            }
        }
        .essp_detail_message-content{
            /*margin: 0;*/
            /*margin-top: 10px;*/
            font-size: 14px;
            color: #f56c6c;
            line-height: 1;
            margin: 13px 25px;
            word-break: break-all;
        }
    }
    .xw-body-wrap-scroll,
    .xw-body-wrap-scroll-main {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: hidden;
        -webkit-overflow-scrolling: auto;
    }

    .xw-scroll-ul {
        min-height: 340px;
    }
    ::-webkit-scrollbar-track {
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        padding: 0;
        background-color: rgba(0, 0, 0, 0.2);
    }

    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }
</style>
