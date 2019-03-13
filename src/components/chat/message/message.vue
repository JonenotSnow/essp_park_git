<!-- 消息框 -->
<template>
    <div class="message">
        <header class="header">
            <span class="close" @click="windowChat"><img src="../../../assets/chat-icon/close.png"></span>
            <span class="close suoxiao" @click="windowChat"><img src="../../../assets/chat-icon/suoxiao.png"></span>
            <span v-if="chat.selectId" class="moreDetail" @click="open(chat.openDetail)"><img
                src="../../../assets/chat-icon/detail.png"></span>
            <div v-if="selectedChat" class="friendname">
                <div v-if="chat.chatType=='friend'&&selectedChat.relTpcdName" class="title" :title="selectedChat.username">
                    {{selectedChat.username+"("+selectedChat.relTpcdName+")"}}
                </div>
                <div v-else-if="chat.chatType=='group'" class="title" :title="selectedChat.username">
                    {{selectedChat.username}}
                </div>
                <div v-else-if="chat.chatType=='consult'&&selectedChat.companyName&&selectedChat.relTpcdName" class="title"
                     :title="selectedChat.companyName">
                    {{selectedChat.companyName+"("+selectedChat.relTpcdName+")"}}
                </div>
                <div v-else class="title" :title="selectedChat.companyName">
                    {{selectedChat.username}}
                </div>
            </div>
        </header>
        <div class="message-wrapper" ref="list" @click="chat.showEmoji = false">
            <ul v-if="selectedChat">
                <li v-for="item in selectedChat.messages" class="message-item">
                    <div class="time"><span>{{item.createDate | time}}</span></div>
                    <div class="main" :class="{ self: item.sender== chat.user.username }">
                        <!--<img class="avatar-chat" width="36px" height="36px" @contextmenu.prevent="getContextMenu"-->
                        <!--:src="item.sender === chat.user.username ? chat.user.photoUrl : item.photoUrl"/>   -->
                        <img class="avatar-chat" width="36px" height="36px"
                             :src="item.sender === chat.user.username ? chat.user.photoUrl : item.photoUrl"/>
                        <div class="senderName" v-if="selectedChat.type=='group'&&item.sender!= chat.user.username ">
                            {{item.msg.senderName}}
                        </div>
                        <div class="content">
                            <div class="text" v-html="replaceFace(item.msg.content)"
                                 v-if="item.msg.msgType === 'text'"></div>
                            <div class="img" v-else-if="item.msg.msgType === 'image'">
                                <img :src="item.msg.content" @click="clickImg($event)"/>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="quitChat" v-if="selectedChat&&chat.chatDelFlag=='1'&&chat.chatType=='group'">
                <span>当前群聊已解散</span>
            </div>
        </div>
        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
        <!--自定义右键菜单html代码-->
        <!--<div id="menu">-->
        <!--<div class="menu">功能1</div>-->
        <!--<div class="menu">功能2</div>-->
        <!--<div class="menu">功能3</div>-->
        <!--<div class="menu">功能4</div>-->
        <!--<div class="menu">功能5</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import bigImg from '../bigImg/bigImg'
    import utils from '../../../util/utils'

    export default {
        computed: {
            ...mapGetters([
                'selectedChat',
                'messages'
            ]),
            ...mapState([
                'chat',
            ])
        },
        components: {
            bigImg
        },
        data() {
            return {
                showImg: false,
                imgSrc: ''
            }
        },
        mounted() {
            //  在页面加载时让信息滚动到最下面
            if (this.$refs.list)
                setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight + 99999, 1000)
        },
        watch: {
            // 发送信息后,让信息滚动到最下面
            messages() {
                setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight + 99999, 1000)
            }
        },
        methods: {
//             getContextMenu(e){
//                 var menu=document.querySelector("#menu");
//
// //根据事件对象中鼠标点击的位置，进行定位
//                 menu.style.left=e.clientX+'px';
//                 menu.style.top=e.clientY+'px';
//
// //改变自定义菜单的宽，让它显示出来
//                 menu.style.width='125px';
//
//             },
            //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
            //  再经过v-html 渲染成真正的图片
            replaceFace(con) {
                if (con) {
                    var arrEntities = {'nbsp': ' '};
                    return con.replace(/&(nbsp);/ig, function (all, t) {
                        return arrEntities[t]
                    })
                }
                // if (con.includes('/:')) {
                //     var emojis = this.chat.emojis;
                //     for (var i = 0; i < emojis.length; i++) {
                //         con = con.replace(emojis[i].reg, '<img src="static/emoji/' + emojis[i].file + '"  alt="" style="vertical-align: middle; width: 24px; height: 24px" />');
                //     }
                //     return con;
                // }
                return con;
            },
            clickImg(e) {
                this.showImg = true;
                // 获取当前图片地址
                this.imgSrc = e.currentTarget.src;
            },
            viewImg() {
                this.showImg = false;
            },
            open(val) {
                this.$store.dispatch('openDetail', !val);

            },
            windowChat() {
                this.$store.dispatch('windowChat', false);
            }
        },
        filters: {
            // 将日期过滤为 hour:minutes
            time(date) {
                return utils.changeTime(date)
            }
        },
    }
</script>

<style lang="less" scoped>
    .message {
        width: 100%;
        height: 440px;
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
                width: 484px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                .title {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
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
                cursor: pointer;
            }
            .moreDetail {
                cursor: pointer;
                float: right;
                margin-top: 20px;
                margin-right: -36px;
            }
        }
        .message-wrapper {
            min-height: 390px;
            max-height: 390px;
            padding: 10px 15px;
            box-sizing: border-box;
            overflow-y: auto;
            border-bottom: 1px solid #e7e7e7;
            background-color: #f6f6f6;
            .message {
                margin-bottom: 15px;
            }
            .time {
                width: 100%;
                font-size: 12px;
                padding: 4px;
                text-align: center;
                span {
                    display: inline-block;
                    padding: 0 6px;
                    color: #fff;
                    border-radius: 3px;
                    background-color: #dcdcdc;
                }
            }
            .quitChat {
                width: 100%;
                font-size: 15px;
                padding: 6px;
                text-align: center;
                span {
                    display: inline-block;
                    padding: 0 6px;
                    color: #fff;
                    border-radius: 3px;
                    background-color: #dcdcdc;
                }
            }
            .main {
                .avatar-chat {
                    float: left;
                    margin-left: 15px;
                    border-radius: 3px;
                }
                .senderName {
                    color: #22a2fa;
                    font-size: 10px;
                    padding-left: 60px;
                }
                .content {
                    display: inline-block;
                    margin-left: 10px;
                    position: relative;
                    padding: 6px 10px;
                    max-width: 330px;
                    min-height: 36px;
                    line-height: 24px;
                    box-sizing: border-box;
                    color: #333333;
                    font-size: 16px;
                    text-align: left;
                    word-wrap: break-word;
                    background-color: #e4e4e4;
                    border-radius: 4px;
                    .img {
                        max-width: 330px;
                        /*max-height: 330px;*/
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &:before {
                        content: " ";
                        position: absolute;
                        top: 12px;
                        right: 100%;
                        border: 6px solid transparent;
                        border-right-color: #e4e4e4;
                    }
                }
            }
            .self {
                text-align: right;
                .avatar-chat {
                    float: right;
                    margin: 0 15px;
                }
                .content {
                    background-color: #c9e9ff;
                    &:before {
                        right: -12px;
                        vertical-align: middle;
                        border-right-color: transparent;
                        border-left-color: #c9e9ff;
                    }
                }
            }
        }
        .message-wrapper::-webkit-scrollbar-track {
            border-radius: 0;
            padding: 0;
            background-color: transparent;
        }

        .message-wrapper::-webkit-scrollbar-thumb {
            border-radius: 10px;
            padding: 0;
            background-color: rgba(0, 0, 0, .2);
        }

        .message-wrapper::-webkit-scrollbar {
            width: 7px;
            height: 7px;
            background-color: transparent;
        }
        /*css代码*/
        #menu {
            width: 0; /*设置为0 隐藏自定义菜单*/
            height: 125px;
            overflow: hidden; /*隐藏溢出的元素*/
            box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
            position: absolute; /*自定义菜单相对与body元素进行定位*/
        }
        .menu {
            width: 130px;
            height: 25px;
            line-height: 25px;
            padding: 0 10px;
        }
    }
</style>
