<!-- 好友信息 -->
<template>
    <div>
        <div>
            <header class="header">
                <span class="close" @click="windowChat"><img src="../../../assets/chat-icon/close.png"></span>
                <span class="close suoxiao" @click="windowChat"><img src="../../../assets/chat-icon/suoxiao.png"></span>
                <div class="friendname">{{selectedFriend.trueName}}</div>
            </header>
            <div v-if="selectedFriend.id ===0">
                <newfriend></newfriend>
            </div>
            <div v-if="selectedFriend.id ===1">
                <newchats></newchats>
            </div>
        </div>
        <div class="friendInfo" v-show="selectedFriend.id > 1">
            <div class="esInfo">
                <div class="left">
                    <div class="people">
                        <div class="nickname">{{selectedFriend.trueName}}</div>
                        <div class="signature">{{selectedFriend.name}}</div>
                        <!--<div :class="[selectedFriend.sex===1?'gender-male':'gender-female']"></div>-->
                    </div>
                    <!--<div class="signature">{{selectedFriend.signature}}</div>-->
                </div>
                <div class="right">
                    <img class="avatar-chat" width="60" height="60" :src="selectedFriend.hPath">
                </div>
            </div>
            <div class="detInfo">
                <div class="remark"><span>岗位</span>{{selectedFriend.relTpcdName}}</div>
                <div class="area"><span>性别</span>{{selectedFriend.sex |getSex}}</div>
                <!--<div class="wxid"><span>微信号</span>{{selectedFriend.wxid}}</div>-->
            </div>
            <div class="send" @click="send">
                <span>发消息</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import newfriend from '../newfriend/newfriend'
    import newchats from '../newchats/newchats'

    export default {
        computed: {
            ...mapGetters([
                'selectedFriend'
            ])
        },
        components: {
            newfriend,
            newchats
        },
        methods: {
            send() {
                let msg = this.$store.state.chat.chatlist.find(msg => msg.id == this.$store.state.chat.selectFriendId)
                let friend = this.$store.state.chat.friendlist.find(friend => friend.id == this.$store.state.chat.selectFriendId);
                if (!msg) {
                    this.$store.state.chat.chatlist.unshift({
                        unReadNum: 0,
                        delFlag: "0",
                        id: this.$store.state.chat.selectFriendId,
                        sender: this.SSH.getItem('userInfo').username,//发送人登录名
                        receiver: friend.userName,//接收人登录名
                        msg: '',//消息内容
                        // status: '',//状态
                        createDate: new Date(),//时间
                        type: 'friend',//类型(例如:friend、group)
                        sendName: this.SSH.getItem('userInfo').username,//发送人真实姓名
                        username: friend.trueName,//用户名
                        companyName: friend.name,//公司名称
                        photoUrl: friend.hPath,//头像
                        relTpcdName: friend.relTpcdName,
                        sex: friend.sex,
                        messages: [],
                    })
                    this.SSH.setItem('messageList', this.$store.state.chat.chatlist);
                }
                this.$store.state.chat.selectCard = 1
                this.$store.state.chat.selectId = this.$store.state.chat.selectFriendId;
                this.$store.state.chat.chatType = 'friend';
                this.$store.state.chat.chatpenDetail = false
            },
            windowChat() {
                this.$store.dispatch('windowChat', false);
            }
        },
        filters: {
            // 将性别返显
            getSex(sex) {
                switch (sex) {
                    case "0":
                        return "男";
                    case '1':
                        return "女";
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .new-add {
        margin-left: 20px
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

    .friendInfo {
        padding: 0 90px;
        height: 550px;
        background-color: #f6f6f6;
        .esInfo {
            display: flex;
            align-items: center;
            padding: 100px 0 45px 0;
            .left {
                flex: 1;
                .people {
                    .nickname {
                        display: inline-block;
                        font-size: 20px;
                        margin-bottom: 16px;
                    }
                    .gender-male,
                    .gender-female {
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        vertical-align: top;
                        margin-top: 2px;
                    }
                    .gender-male {
                        background-image: url(man.png);
                        background-size: cover;
                    }
                    .gender-female {
                        background-image: url(woman.png);
                        background-size: cover;
                    }
                }
                .signature {
                    font-size: 14px;
                    color: rgba(153, 153, 153, .8);
                }
            }
            .right {
                .avatar-chat {
                    border-radius: 25px
                }
            }
        }
        .detInfo {
            padding: 40px 0;
            border-top: 1px solid #e7e7e7;
            border-bottom: 1px solid #e7e7e7;
            .remark,
            .area,
            .wxid {
                font-size: 14px;
                margin-top: 20px;
                span {
                    font-size: 14px;
                    color: rgba(153, 153, 153, .8);
                    margin-right: 40px;
                }
            }
            .remark {
                margin-top: 0
            }
        }
        .send {
            position: relative;
            text-align: center;
            width: 140px;
            height: 36px;
            left: 115px;
            top: 50px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            background-color: #22a2fa;
            cursor: pointer;
            border-radius: 25px;
            &:hover {
                background: #22affa;
            }
        }
    }
</style>

