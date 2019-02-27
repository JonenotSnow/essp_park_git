<template>
    <div class="app" id="app" v-loading="loading2">
        <div :class="messageFixed == true ? 'init_isFixed' :'init_default'"  v-if="msgList.length>0">
            <essp-message :messageList="msgList" :errMsgList="errMsgList" :timeOutMsgList="timeOutMsgList"></essp-message>
        </div>
        <div class="myChat" :style="getTheWidth()" v-show="chat.openChat" @mousedown="moveChat" id='myChat'>
            <chat></chat>
        </div>
        <!--<el-dialog :visible.sync="chat.openChat"-->
        <!--custom-class="esspchat"-->
        <!--@close="closeHandle" >-->
        <!--<div class="myChat" @mousedown="moveChat" id='myChat'>-->
        <!--<chat></chat>-->
        <!--</div>-->
        <!--</el-dialog>-->
        <!-- <essp-ueditor></essp-ueditor> -->
        <router-view/>
    </div>
</template>

<script>
    import chat from '@/components/chat/chatIndex'
    import {apiUrl} from "@/fetch/apiUrl.js";
    import constants from '@/util/constants'
    import {Notification} from 'element-ui';
    import {mapState} from 'vuex'
    import mixins from '@/components/mixins/mixins_windowOpen.js'
    // import baseLogin from "@/views/user/login/loginCommon.js";
    import EsspMessage from '@/components/EsspMessage'

    export default {
        name: 'App',
        mixins: [mixins],
        components: {
            chat,
            EsspMessage
        },
        data() {
            return {
                loginFlag: this.SSH.getItem('loginFlag'),
                time: null,
                buriedTime: 0,
                msgList: [],
                errMsgList: [],
                timeOutMsgList: [],
                messageFixed:false
            }
        },
        computed: {
            ...mapState([
                'chat',
            ]),
            messageListChange() {
                let msgData = {
                    messageList: this.$store.state.errMsg.messageList,
                    errMsgList: this.$store.state.errMsg.errMsgList,
                    timeOutMsgList: this.$store.state.errMsg.timeOutMsgList
                }
                return msgData;
            }
        },
        watch: {
            $route() {
                let val = this.SSH.getItem('loginFlag')
                if (!this.utils.isEmpty(val) || val) {
                    this.mouseMove()
                } else {
                    window.clearInterval(this.time);
                    this.time = null;
                }
            },
            messageListChange: function(newVal, oldVal){
                this.msgList = newVal.messageList
                this.errMsgList = newVal.errMsgList
                this.timeOutMsgList = newVal.timeOutMsgList
            },
        },
        created() {
            this.SSH.setItem('version', this.version)
            this.mouseMove();
            this.getMessage();
            // 未进入园区 去其他模块判空
            if (!(sessionStorage.getItem("myList"))) {
                sessionStorage.setItem("myList", []);
            }
        },
        methods: {
            addEvent(ev, fn) {
                if (window.attachEvent) {
                    window.attachEvent("on" + ev, fn);
                } else {
                    window.addEventListener(ev, fn, false);
                }
            },
            handleScroll() {
                var scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                if (scrollTop > 35) {
                    this.messageFixed = true;
                } else {
                    this.messageFixed = false;
                }
            },
            getTheWidth() {
                if (this.$store.state.chat.openDetail) {
                    return {width: "1188px",}
                } else {
                    return {width: "908px",}
                }
            },
            // 解决重新部署后菜单权限缓存问题
            closeHandle() {
                this.$store.dispatch('windowChat', false);
            },
            // 聊天框拖动
            moveChat(e) {
                if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea'
                    || e.target.contentEditable === 'true'|| e.target.isContentEditable == true) {
                    return false;
                }
                let vm = this;
                // -获取目标元素
                let chatDiv = document.getElementById('myChat');
                //算出鼠标相对元素的位置
                let disX = e.clientX - chatDiv.offsetLeft;
                let disY = e.clientY - chatDiv.offsetTop;
                document.onmousemove = (e) => {
                    //鼠标按下并移动的事件
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;

                    //绑定元素位置到positionX和positionY上面
                    vm.positionX = top;
                    vm.positionY = left;

                    //移动当前元素
                    chatDiv.style.left = left + 'px';
                    chatDiv.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            // 鼠标移除事件
            mouseMove() {
                let path = this.$router.currentRoute.path
                const self = this
                if (this.SSH.getItem('loginFlag')) {
                    if (path != '/userIndex/login') {
                        var maxTime = 1800; // seconds 1800
                        var count = ''

                        document.body.addEventListener("mousemove", function () {
                            count = maxTime; // reset
                        }, false);

                        if (!this.time) {
                            count = maxTime;
                            this.time = setInterval(() => {
                                if (count > 0 && count <= maxTime) {
                                    count--;
                                } else {
                                    this.utils.logoutDelSSH()
                                    // Message.info('退出登录成功')
                                    // this.$router.push('/userIndex/login');
                                    this.$message.error('由于您长时间未操作，请重新登录！')
                                    clearInterval(this.time);
                                    this.time = null;
                                }
                            }, 1000)
                        }
                    }
                }
            },
            // 消息轮巡推送
            getMessage() {
                const self = this;
                let time = 60;
                let userInfo = this.SSH.getItem('userInfo')
                let timer = null;
                this.buriedTime++;

                if (!this.utils.isEmpty(userInfo) && userInfo.userType !== this.constants.userType.backgroundUser) {
                    if(this.buriedTime >= 5 && historyArr){
                        this.$post("/intermediary/termnl/insert", {
                            usrBhvrAnlParamList: historyArr.path
                        })
                        historyArr = {path: []}
                        this.LSH.setItem('history', historyArr)
                        this.buriedTime = 0
                    }
                    this.$post(apiUrl.user.getUnreadMessageUrl, {}).then((response) => {
                        let data = response.resultData
                        if (!this.utils.isEmpty(data.rqmMessageList) && data.rqmMessageList.length > 0) {
                            for (let i = 0; i < data.rqmMessageList.length; i++) {
                                if (data.rqmMessageList[i].freeze) {
                                    self.getUserSSH('self')
                                }
                                setTimeout(function () {
                                    self.businessMsg(data.rqmMessageList[i])
                                }, 1000)
                            }
                        }
                        if (!this.utils.isEmpty(data.sysMessageList) && data.sysMessageList.length > 0) {
                            for (let i = 0; i < data.sysMessageList.length; i++) {
                                if (data.sysMessageList[i].freeze) {
                                    self.getUserSSH('self')
                                }
                                setTimeout(function () {
                                    self.sysMsg(data.sysMessageList[i])
                                }, 1000)
                            }
                        }
                        if (!this.utils.isEmpty(data.subMessageList) && data.subMessageList.length > 0) {
                            for (let i = 0; i < data.subMessageList.length; i++) {
                                if (data.subMessageList[i].freeze) {
                                    self.getUserSSH('self')
                                }
                                setTimeout(function () {
                                    self.subMsg(data.subMessageList[i])
                                }, 1000)
                            }
                        }
                        timer = setInterval(function () {
                            time--;
                            if (time < 0) {
                                clearInterval(timer);
                                time = 60;
                                self.getMessage()
                            }
                        }, 1000)
                    }, err => {
                        timer = setInterval(function () {
                            time--;
                            if (time < 0) {
                                clearInterval(timer);
                                time = 60;
                                self.getMessage()
                            }
                        }, 1000)
                    })
                } else {
                    timer = setInterval(function () {
                        time--;
                        if (time < 0) {
                            clearInterval(timer);
                            time = 60;
                            self.getMessage()
                        }
                    }, 1000)
                }
            },
            // 弹出系统消息
            sysMsg(data) {
                const self = this;
                this.$notify({
                    title: data.title,
                    duration: 60000,
                    dangerouslyUseHTMLString: false,
                    onClick: function () {
                        this.close()
                        self.windowOpenNoParams("/messageCenter/sysMsg");
                        this.close()
                    }
                });
            },
            // 弹出商机消息
            businessMsg(data) {
                const self = this;
                this.$notify({
                    title: data.title,
                    duration: 60000,
                    dangerouslyUseHTMLString: false,
                    onClick: function () {
                        this.close()
                        self.windowOpenNoParams("/messageCenter/businessMsg");
                        this.close()
                    }
                });
            },
            // 弹出订阅消息
            subMsg(data) {
                const self = this;
                this.$notify({
                    title: data.title,
                    duration: 60000,
                    dangerouslyUseHTMLString: false,
                    onClick: function () {
                        this.close()
                        self.windowOpenNoParams("/messageCenter/subscribeMsg");
                        this.close()
                    }
                });
            },
        },
    }
</script>

<style lang="less">
    @import "./assets/css/mixin";
    .init_default{
        z-index: 9999;
    }
    .init_isFixed {
        position: fixed;
        background-color: @essp_con_bg;
        top: 0;
        width: 100%;
        min-width: @essp_width_auto;
        z-index: 9999;
        box-shadow: 0px 4px 21px 0px rgba(116, 116, 116, 0.12);
    }
    .app{
        .init_isFixed {
            position: fixed;
            background-color: @essp_con_bg;
            top: 0;
            width: 100%;
            min-width: @essp_width_auto;
            z-index: 1002;
            box-shadow: 0px 4px 21px 0px rgba(116, 116, 116, 0.12);
        }
    }
    .esspchat {
        .el-dialog__header {
            display: none;
        }
        .el-dialog__body {
            padding: 0;
        }
    }

    .myChat {
        width: 1188px;
        height: 600px;
        position: fixed;
        top: 30px;
        left: 150px;
        z-index: 1111;
    }

    .user-agree-dialog {
        .el-dialog__header {
            padding-top: 33px;
            padding-bottom: 0px;
            .el-dialog__title {
                font-size: 24px;
                color: #22a2fa;
            }
        }
        .el-dialog--center .el-dialog__body {
            padding: 26px 32px 30px;
            .dialog-border {
                height: 480px;
                .agree-checkbox {
                    margin-top: 20px;
                    color: #333;
                }
            }
            .agree-btn {
                margin-top: 20px;
                text-align: center;
            }
        }
    }
</style>
