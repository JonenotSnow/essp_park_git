<!-- 好友列表 -->
<template>
    <div class="friendlist">
        <ul>
            <li v-for="item in searchedFriendlist" class="frienditem" :class="{ noborder: !item.initial}">
                <div class="list_title" v-if="item.initial">{{item.initial}}</div>
                <div class="friend-info" :class="{ active: item.id === chat.selectFriendId }"
                     @click="selectFriend(item.id)">
                    <img class="avatar-chat" width="36" height="36" :src="item.hPath">
                    <span class="msg-chat" v-show="item.unReadNum > 0" :class="{'msg-chat-line': item.unReadNum > 99}">{{item.unReadNum < 100? item.unReadNum: '...'}}</span>
                    <div class="remark">
                        <div class="t" v-if="item.id>1&&item.relTpcdName">{{ item.trueName + "(" + item.relTpcdName + ")"}}</div>
                        <div class="t" v-if="item.id>1&&!item.relTpcdName">{{ item.trueName}}</div>
                        <div class="t" v-if="item.id<=1">{{ item.trueName}}</div>
                        <div class="b" :title="item.name">{{item.name}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapState([
                'chat'
            ]),
            ...mapGetters([
                'searchedFriendlist'
            ])
        },
        methods: {
            ...mapActions([
                'selectFriend',
            ])
        },
        filter(item) {
            if (item > 1) {
                return item.trueName + "(" + item.relTpcdName + ")"
            } else {
                return item.trueName
            }
        }
    }
</script>

<style lang="less" scoped>
    .friendlist {
        height: 540px;
        overflow-y: auto;
        .frienditem {
            border-top: 1px solid #dadada;
            &:first-child,
            &.noborder {
                border-top: none;
            }
            .list_title {
                box-sizing: border-box;
                width: 100%;
                font-size: 12px;
                padding: 15px 0 3px 12px;
                color: #999;
            }
            .friend-info {
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
                .remark {
                    .t {
                        font-size: 16px;
                        color: #000000;
                    }
                    .b {
                        font-size: 14px;
                        color: #999999;
                        width: 190px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .friendlist::-webkit-scrollbar-track {
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    .friendlist::-webkit-scrollbar-thumb {
        border-radius: 10px;
        padding: 0;
        background-color: rgba(0, 0, 0, .2);
    }

    .friendlist::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }
</style>
