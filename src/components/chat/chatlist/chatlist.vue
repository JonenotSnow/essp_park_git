<!-- 聊天列表 -->
<template>
    <div class="msglist">
        <ul>
            <li v-for="(item,index) in searchedChatlist" class="sessionlist"
                :class="{ active: item.id == chat.selectId}" @click="selectChat(item.id)" :key="index">
                <img class="avatar-chat list-left" v-if="item.type==='group'" :alt="item.receiver"
                     src="static/images/group.png">
                <img class="avatar-chat list-left" v-if="item.type!=='group'" :alt="item.receiver" :src="item.photoUrl">
                <span class="msg-chat" v-show="item.unReadNum > 0" :class="{'msg-chat-line': item.unReadNum > 99}">{{item.unReadNum < 100? item.unReadNum: '...'}}</span>
                <div class="list-right">
                    <div v-if="item.type=='friend'&&item.relTpcdName" class="name" :title="item.username">
                        {{item.username+"("+item.relTpcdName+")"}}
                    </div>
                    <div v-else-if="item.type=='group'" class="name" :title="item.username">
                        {{item.username}}
                    </div>
                    <div v-else-if="item.type=='consult'&&item.companyName!=''&&item.relTpcdName" class="name" :title="item.companyName">
                        {{item.companyName+"("+item.relTpcdName+")"}}
                    </div>
                    <div v-else class="name" :title="item.companyName">
                        {{item.username}}
                    </div>
                    <!--<span class="time">{{item.messages[item.messages.length-1].date | time}}</span>-->
                    <div class="lastmsg">{{item.createDate |time }}</div>
                    <div v-if="item.type==='consult'" class="lastmsg2">咨询窗口</div>
                    <div v-if="item.type==='group' && item.extString==='needRemind'"  class="needRemind">[有人@你]</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    import utils from '../../../util/utils'

    export default {
        computed: {
            ...mapState([
                'chat'
            ]),
            ...mapGetters([
                'searchedChatlist'
            ])
        },
        methods: {
            ...mapActions([
                'selectSession',
                'deleteSession',
            ]),
            selectChat(val) {
                this.$store.dispatch('selectSession', val);
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
    .msglist {
        height: 540px;
        overflow-y: auto;
        .sessionlist {
            position: relative;
            display: flex;
            padding: 12px;
            transition: background-color .1s;
            font-size: 0;
            &:hover {
                background-color: #c9e0fa;
            }
            &.active {
                background-color: #c9e0fa;
            }
            .avatar-chat {
                border-radius: 25px;
                margin-right: 12px;
            }
            .list-left {
                width: 42px;
                height: 42px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .list-right {
                position: relative;
                flex: 1;
                .name {
                    font-size: 16px;
                    color: #000000;
                    width: 185px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .time {
                    float: right;
                    color: #999;
                    font-size: 10px;
                    vertical-align: top;
                }
                .lastmsg {
                    position: absolute;
                    font-size: 14px;
                    width: 130px;
                    height: 15px;
                    line-height: 15px;
                    color: #999999;
                    bottom: 0px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .lastmsg2 {
                    position: absolute;
                    font-size: 14px;
                    border-radius: 2px;
                    /*margin-top: 4px;*/
                    padding: 1px 5px 3px 5px;
                    /*width: 60px;*/
                    height: 15px;
                    line-height: 15px;
                    color: #ffffff;
                    bottom: 0px;
                    background-color: #a0cfff;
                    left: 128px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .needRemind {
                   position: absolute;
                    font-size: 14px;
                    height: 15px;
                    line-height: 15px;
                    letter-spacing: 0px;
                    color: #dd2b2b;
                    bottom: 0px;
                    left: 128px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .msg-chat {
                background: #e97259;
                border-radius: 50%;
                border: 2px solid #e97259;
                position: absolute;
                z-index: 100;
                top: 4px;
                left: 40px;
                text-align: center;
                color: #FFF;
                transform: scale(0.7);
                width: 20px;
                height: 20px;
                font-size: 14px;
            }
            .msg-chat-line {
                line-height: 10px;
            }
        }

    }
    .msglist::-webkit-scrollbar-track {
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    .msglist::-webkit-scrollbar-thumb {
        border-radius: 10px;
        padding: 0;
        background-color: rgba(0, 0, 0, .2);
    }

    .msglist::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }
</style>
