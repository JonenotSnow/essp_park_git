<!-- 咨询请求 -->
<template>
    <div>
        <div>
            <header class="header">
                <span class="close" @click="windowChat"><img src="../../../assets/chat-icon/close.png"></span>
                <span class="close suoxiao" @click="windowChat"><img src="../../../assets/chat-icon/suoxiao.png"></span>
                <div class="friendname">咨询请求
                </div>
            </header>
            <div class="apply-detail">
                <div v-if="chat.selectConsultId">
                    <div class="apply-detail-user">
                        <img class="avatar-chat" width="50" height="50" :src="chat.theConsult.hPath">
                        <div class="remark">
                            <div>
                                <div class="remark-name" v-if="chat.theConsult.name">{{chat.theConsult.name}}</div>
                                <div class="remark-name" v-else>{{chat.theConsult.trueName}}</div>
                            </div>
                            <div class="remark-company">{{chat.theConsult.relTpcdName}}</div>
                        </div>
                    </div>
                    <div class="apply-detail-list">
                        <div v-for="(item,index) in chat.selectConsultList.slice(0,3)" :key="index"
                             class="apply-detail-items">
                            <div class="text" v-html="replaceFace(item.msg)"
                                 v-if="item.msgType === 'text'"></div>
                            <div class="img" v-else>
                                <img :src="item.msg" @click="clickImg($event)"/>
                            </div>
                            <div class="time">{{item.createDate | changeTime}}</div>
                        </div>
                    </div>
                    <div class="apply-detail-buttons">
                        <el-button size="mini" class="apply-detail-button-agree"
                                   @click="agreeAdd(4,chat.theConsult.ufId)">同意
                        </el-button>
                        <el-button size="mini" class="apply-detail-button-disagree"
                                   @click="agreeAdd(2,chat.theConsult.ufId)">
                            拒绝
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import bigImg from '../bigImg/bigImg'
    import utils from '../../../util/utils'

    export default {
        computed: {
            ...mapState([
                'chat'
            ]),
            ...mapGetters([
                'selectedFriend',
            ])
        },
        data() {
            return {
                showImg: false,
                imgSrc: ''
            }
        },
        components: {
            bigImg
        },
        methods: {
            windowChat() {
                this.$store.dispatch('windowChat', false);
            },
            clickImg(e) {
                this.showImg = true;
                // 获取当前图片地址
                this.imgSrc = e.currentTarget.src;
            },
            viewImg() {
                this.showImg = false;
            },
            replaceFace(con) {
                if (con) {
                    var arrEntities = {'nbsp': ' '};
                    return con.replace(/&(nbsp);/ig, function (all, t) {
                        return arrEntities[t]
                    })
                }
                return con;
            },
            //获取咨询列表
            getConsultList() {
                let vm = this
                // -获取咨询列表
                vm.$post(this.$apiUrl.chat.getFriendsList,
                    {
                        pageNum: 1,
                        pageSize: 100,
                        type: '3',
                        userId: vm.SSH.getItem('userInfo').id,
                    }
                ).then((response) => {
                    vm.$store.state.chat.consultlist = response.resultData;
                    vm.SSH.setItem('consultList', vm.$store.state.chat.consultlist);
                });
            },
            agreeAdd(value, id) {
                let vm = this;
                //同意
                if (value === 4) {
                    this.$post(this.$apiUrl.chat.agreeAddFriend,
                        {
                            id: id,
                            type: value
                        }
                    ).then((response) => {
                        let result = vm.$store.state.chat.chatlist.find(session => session.id == vm.$store.state.chat.selectConsultId);
                        if (result) {

                        } else {
                            let messages = []
                            let t = vm.$store.state.chat.selectConsultList
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
                                    photoUrl: t[i].photoUrl, // -添加好友头像
                                    sender: t[i].sender,
                                    receiver: t[i].receiver,
                                    msg: obj,
                                    createDate: time,
                                }
                                messages.push(p)
                            }
                            vm.$store.state.chat.chatlist.unshift({
                                id: vm.$store.state.chat.selectConsultId,
                                photoUrl: vm.$store.state.chat.theConsult.hPath,//头像
                                sender: vm.SSH.getItem('userInfo').username,//发送人登录名
                                receiver: vm.$store.state.chat.theConsult.userName,//接收人登录名
                                msg: '',//消息内容
                                // status: '',//状态
                                createDate: new Date(),//时间
                                relTpcdName: vm.$store.state.chat.theConsult.relTpcdName,
                                sex: vm.$store.state.chat.theConsult.sex,
                                type: 'consult',//类型(例如:friend、group)
                                sendName: vm.SSH.getItem('userInfo').username,//发送人真实姓名
                                username: vm.$store.state.chat.theConsult.trueName,//用户名
                                companyName: vm.$store.state.chat.theConsult.name,//公司名称
                                messages: messages,
                                unReadNum: 0
                            });
                        }
                        vm.SSH.setItem('messageList', vm.$store.state.chat.chatlist);
                        let msg = {
                            "senderId": vm.SSH.getItem('userInfo').id + '',
                            "senderName": vm.SSH.getItem('userInfo').cstNm || vm.SSH.getItem('userInfo').ccbLv3InsNm || vm.SSH.getItem('userInfo').ccbLv3InsNm,
                            "recipientId": vm.$store.state.chat.selectConsultId + '',
                            "sender": vm.SSH.getItem('userInfo').username + '',
                            "recipient": vm.$store.state.chat.theConsult.userName + '',
                            "msgType": 'text', //(文本:text,图片:image)
                            "content": 'consultAgree',
                            "action": 'single',
                            "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                        };
                        let param = JSON.stringify(msg);
                        vm.$store.dispatch('sendWs', param);
                        vm.$store.state.chat.selectCard = 1;
                        vm.$store.state.chat.chatType = 'consult';
                        vm.$store.state.chat.selectId = vm.$store.state.chat.selectConsultId;
                        vm.$store.state.chat.selectConsultList = []
                        vm.$store.state.chat.theConsult = {}
                        vm.$store.state.chat.selectConsultId = ''
                        vm.$store.state.chat.chatDelFlag = '0'
                        vm.$store.state.chat.selNum = 0
                        // -获取咨询列表
                        vm.getConsultList()
                    });
                }
                //拒绝
                if (value === 2) {
                    this.$post(this.$apiUrl.chat.agreeAddFriend,
                        {
                            id: id,
                            type: "2"
                        }
                    ).then((response) => {
                        let msg = {
                            "senderId": vm.SSH.getItem('userInfo').id + '',
                            "senderName": vm.SSH.getItem('userInfo').cstNm || vm.SSH.getItem('userInfo').ccbLv3InsNm,
                            "recipientId": vm.$store.state.chat.selectConsultId + '',
                            "sender": vm.SSH.getItem('userInfo').username + '',
                            "recipient": vm.$store.state.chat.theConsult.userName + '',
                            "msgType": 'text', //(文本:text,图片:image)
                            "content": 'consultAgreeNo',
                            "action": 'single',
                            "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                        };
                        let param = JSON.stringify(msg);
                        vm.$store.dispatch('sendWs', param);
                        vm.$store.state.chat.selectConsultList = []
                        vm.$store.state.chat.theConsult = {}
                        vm.$store.state.chat.selectConsultId = ''
                        vm.$store.state.chat.chatDelFlag = '0'
                        vm.$store.state.chat.selNum = 0
                        // -获取咨询列表
                        vm.getConsultList()
                        vm.$message({
                            type: 'success',
                            message: '拒绝成功!'
                        });
                    });
                }

            }
        },
        filters: {
            // 将日期过滤为 hour:minutes
            changeTime(time) {
                return utils.changeTime(time)
            }
        },
    }
</script>

<style lang="less" scoped>
    .apply-detail {
        background-color: #f6f6f6;
        height: 520px;
        padding-top: 30px;
        .apply-detail-user {
            display: flex;
            margin-left: 38px
        }
        .apply-detail-list {
            margin-left: 92px;
            height: 300px;
            overflow: auto;
            .apply-detail-items {
                text-align: left;
                margin-left: 8px;
                /*display: -webkit-box;*/
                /*-webkit-box-orient: vertical;*/
                /*-webkit-line-clamp: 1;*/
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 6px;
                color: #737373;
                font-size: 16px;
                word-wrap: break-word;
                line-height: 22px;
                .text {
                    width: 340px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .img {
                    max-width: 330px;
                    /*max-height: 330px;*/
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .time {
                    width: 50px;
                    position: relative;
                    float: right;
                    top: -20px;
                    right: 50px;
                    font-size: 12px;
                }
            }
        }
        .apply-detail-list::-webkit-scrollbar-track {
            border-radius: 0;
            padding: 0;
            background-color: transparent;
        }

        .apply-detail-list::-webkit-scrollbar-thumb {
            border-radius: 10px;
            padding: 0;
            background-color: rgba(0, 0, 0, .2);
        }

        .apply-detail-list::-webkit-scrollbar {
            width: 7px;
            height: 7px;
            background-color: transparent;
        }
        .apply-detail-buttons {
            display: flex;
            margin-left: 104px;
            .apply-detail-button-agree {
                background-color: #22a2fa;
                color: #ffffff
            }
            .apply-detail-button-disagree {
                background-color: #ffffff
            }
        }
    }

    .header {
        height: 51px;
        color: #333333;
        font-size: 20px;
        box-sizing: border-box;
        background-color: #ffffff;
        border-bottom: 1px solid #e7e7e7;
        .friendname {
            padding: 16px 0 0 20px;
            font-size: 18px;
        }
        .close {
            float: right;
            margin-right: 10px;
            font-size: 12px;
            margin-top: 4px;
            cursor: pointer;
        }
        .suoxiao {
            margin-right: 20px;
        }
    }

    .avatar-chat {
        border-radius: 25px;
        margin-left: 8px
    }

    .remark {
        width: 340px;
        color: #000000;
        margin-left: 10px;
        line-height: 36px;
        .remark-name {
            color: #000000;
            font-size: 18px;
            line-height: 30px
        }
        .remark-company {
            color: #999999;
            font-size: 14px;
            line-height: 20px
        }
    }
</style>

