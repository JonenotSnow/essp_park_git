<template>
    <!-- 全局提示框 class="dialog-tips dialog-center"-->
    <div class="essp_message_position"
         @mouseenter="clearTimer"
         @mouseleave="startTimer">
        <div class="essp_message_position">
            <!--<div v-for="item in messageList" :class="['el-message',`el-message&#45;&#45;error`,'is-center',]">-->
            <div v-for="item in messageList" class="essp_message_style">
                <div>
                    <i class="essp_message_logo el-icon-error"></i>
                    <span class="essp_message-content">{{item.message}}</span>
                    <i class="el-icon-arrow-down" @click="detailMsgShow(false,item)" v-if="item.downShow && item.show"></i>
                    <i class="el-icon-arrow-up" @click="detailMsgShow(true,item)" v-if="!item.downShow && item.show"></i>
                    <i class="el-message__closeBtn el-icon-close" @click="closeMessageList(item)"></i>
                </div>
            </div>
            <div v-if="errMsgShow" class="essp_message_style_detail">
                <div><p v-for="item in errMsgList" class="essp_message-content">{{item.detailMessage}}</p></div>

            </div>
            <div v-if="timeOutMsgShow" class="essp_message_style_detail">
                <p class="essp_message-content" v-for="item in timeOutMsgList">{{item.detailMessage}}</p>
            </div>

        </div>
    </div>

</template>
<script>
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
                    if(item.type===this.constants.RETURN_CODE.ERROR_NETWORK_TYPE){
                        this.errMsgShow = false
                        this.timeOutMsgShow = true
                    }else if(item.type===this.constants.RETURN_CODE.ERROR_SYSTEM_TYPE){
                        this.errMsgShow = true
                        this.timeOutMsgShow = false
                    }
                }
                // this.detailShow =val
            },
            closeMessageList(val){
                this.errMsgShow = false
                this.timeOutMsgShow = false
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
<style lang="less">
    .essp_message_position{
        z-index: 2000;
        position: fixed;
        top: 20px;
        left: 50%;
    }
    .essp_message_style{
        z-index: 2000;
        width: 600px;
        margin: 5px 0px;
        border-width: 1px;
        border-style: solid;
        transform: translateX(-50%);
        transition: opacity .3s,transform .4s,-webkit-transform .4s;
        padding: 15px 15px 15px 20px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
        border-color: #fde2e2;
        background-color: #fef0f0;
        /*box-sizing: border-box;*/
        /*justify-content: center;*/
        -webkit-box-pack: center;
        .essp_message-content{
            margin: 0;
            font-size: 14px;
            color: #f56c6c;
            line-height: 1;
        }
        .essp_message_logo{
            margin-right: 10px;
            color: #f56c6c;
        }
    }
    .essp_message_style_detail{
        z-index: 2000;
        width: 600px;
        margin: 5px 0px;
        border-width: 1px;
        border-style: solid;
        transform: translateX(-50%);
        transition: opacity .3s,transform .4s,-webkit-transform .4s;
        padding: 15px 15px 15px 20px;
        -webkit-box-align: center;
        align-items: center;
        border-radius: 4px;
        overflow: auto;
        border-color: #fde2e2;
        background-color: #fef0f0;
        -webkit-box-pack: center;
        max-height: 80vh;
        .essp_message-content{
            margin: 0;
            font-size: 14px;
            color: #f56c6c;
            line-height: 1;
            margin: 8px 25px;
            word-break: break-all;
        }
        .essp_message_logo{
            margin-right: 10px;
            color: #f56c6c;
        }
    }
</style>
