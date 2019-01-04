<template>
    <div style="display: flex;background-color: #ffffff">
        <div style="width: 300px;border-right: 1px solid #f0f0f0">
            <search></search>
            <div class="friendlist">
                <ul>
                    <li v-if="getFriendsList.length>0" v-for="(item,index) in getFriendsList" :key="index"
                        class="frienditem">
                        <div class="friend-info" @click="selectFriend(item)">
                            <img class="avatar-chat" width="40" height="40" :src="item.hPath">
                            <div class="remark">
                                <div class="t">{{item.trueName}}</div>
                                <div class="b">{{item.name}}</div>
                            </div>
                            <img class="selectImg" v-show="chat.selectArr.indexOf(item.id) > -1"
                                 src="../../../assets/chat-icon/select.png">
                            <div class="select-bg" v-show="chat.selectArr.indexOf(item.id) <= -1">
                                <img src="../../../assets/chat-icon/no-select.png">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div style="width: 300px">
            <div style="margin:16px 0 0 24px;color: #999999;font-size: 14px;">请选择需要添加的联系人</div>
            <div class="friendlist">
                <ul>
                    <li v-for="(item,index) in chat.selectFriendsList" :key="index" class="frienditem">
                        <div class="friend-info">
                            <img class="avatar-chat" width="40" height="40" :src="item.hPath">
                            <div class="remark">
                                <div class="t">{{item.trueName}}</div>
                                <div class="b">{{item.name}}</div>
                            </div>
                            <div class="select-bg" @click="selectFriend(item)">
                                <i class="el-icon-circle-close"></i>
                                <!--<img @click="selectFriend(item)" src="../../../assets/chat-icon/no-select.png">-->
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chat-dialog-btn" style="margin-left: 120px">
                <el-button size="mini" type="success" v-if="chat.addChatType ===1" @click="save1">确定</el-button>
                <el-button size="mini" type="success" v-if="chat.addChatType ===2" @click="del2">删除</el-button>
                <el-button size="mini" type="success" v-if="chat.addChatType ===3" @click="save3">确定</el-button>
                <el-button size="mini" type="success" v-if="chat.addChatType ===4" @click="save4">确定</el-button>
                <el-button size="mini" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    import search from '../search/searchAdd'

    export default {
        name: "addFriend",
        components: {
            search
        },
        computed: {
            ...mapState([
                'chat'
            ]),
            ...mapGetters([
                'getFriendsList'
            ])
        },
        data() {
            return {}
        },
        methods: {
            ...mapActions([
                'selectFriend',
            ]),
            selectFriend(val) {
                let ind = this.$store.state.chat.selectArr.indexOf(val.id);
                if (ind > -1) {
                    this.$store.state.chat.selectArr.splice(ind, 1);
                    let friendArray = [];
                    for (let friend of  this.$store.state.chat.selectFriendsList) {
                        if (friend.id != val.id) {
                            friendArray.push(friend);
                        }
                    }
                    this.$store.state.chat.selectFriendsList = friendArray;
                } else {
                    this.$store.state.chat.selectArr.push(val.id);
                    this.$store.state.chat.selectFriendsList.push(val);
                }
            },
            cancel() {
                this.$store.state.chat.showAdd = false;
                this.$store.state.chat.selectFriendsList = [];
                this.$store.state.chat.addFriendList = [];
            },
            // 创建群聊1，删除群聊人员2，好友聊天时创建群聊3 ,群聊添加人员4
            save1() {
                if (this.$store.state.chat.selectFriendsList) {
                    if (this.$store.state.chat.selectFriendsList.length > 1) {
                        this.$store.dispatch('createChat', this.$store.state.chat.selectFriendsList);
                    } else {
                        this.$message('创建群聊至少要邀请2人！');
                    }
                }
                this.$store.state.chat.showAdd = false;
            },
            save3() {
                if (this.$store.state.chat.selectFriendsList.length > 0) {
                    let result = this.$store.state.chat.chatlist.find(session => session.id == this.$store.state.chat.selectId);
                    let list = this.$store.state.chat.selectFriendsList
                    list.push({
                        id: this.$store.state.chat.selectId,
                        trueName: result.username,
                    })
                    this.$store.state.chat.selectFriendsList = list
                    this.$store.dispatch('createChat', this.$store.state.chat.selectFriendsList);
                } else {
                    this.$message('至少选择一人邀请入群！');
                }
                this.$store.state.chat.showAdd = false;
            },
            save4() {
                if (this.$store.state.chat.selectFriendsList.length > 0) {
                    this.$store.dispatch('groupAddMembers', this.$store.state.chat.selectFriendsList);

                } else {
                    this.$message('至少选择一人邀请入群！');
                }
                this.$store.state.chat.showAdd = false;
            },
            del2() {
                if (this.$store.state.chat.selectFriendsList) {
                    this.$store.dispatch('deleteChatMembers', this.$store.state.chat.selectFriendsList);
                } else {
                    this.$message('未选中要删除的群成员！');
                }
                this.$store.state.chat.showAdd = false;
            }
        }
    }
</script>
<style lang="less">
    .chatIndex {
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__headerbtn {
            font-size: 12px;
            top: 5px;
            right: 8px;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #555;
        }
    }
</style>

<style lang="less" scoped>
    .friendlist {
        height: 480px;
        overflow-y: auto;
        .frienditem {
            /*border-top: 1px solid #dadada;*/
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
                /*&:hover {*/
                /*background-color: #c9e0fa;*/
                /*}*/
                /*&.active {*/
                /*background-color: #c9e0fa;*/
                /*}*/
                .avatar-chat {
                    border-radius: 25px;
                    margin-right: 12px;
                }
                .remark {
                    width: 150px;
                    margin-right: 7px;
                    .t {
                        font-size: 16px;
                        color: #000000;
                    }
                    .b {
                        font-size: 14px;
                        color: #999999;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
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
    .selectImg {
        width: 20px;
        height: 20px;
        position: relative;
        padding: 10px;
        right: 5px;
        cursor: pointer;
    }

    .select-bg {
        margin-top: 10px;
        margin-left: 5px;
        cursor: pointer;
        .el-icon-circle-close {
            font-size: 18px;
            color: #dadada;
        }
    }

    .chat-dialog-btn {
        .el-button--mini {
            padding: 7px 18px;
        }
        .el-button--mini, .el-button--small {
            border-radius: 0px;
        }
        .el-button + .el-button {
            margin-left: 6px;
        }
        .el-button--success {
            color: #fff;
            background-color: #1aad19;
            border-color: #1aad19;
        }
    }

</style>
