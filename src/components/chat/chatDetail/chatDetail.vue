<template>
    <div class="detailList">
        <div v-if="type==='friend'">
            <div class="detailList-list">
                <ul>
                    <li class="detail" @click="openAdd(3)">
                        <button class="detail-button">+</button>
                        <div class="detail-name">添加</div>
                    </li>
                    <li class="detail">
                        <img class="avatar-chat-detail" width="34" height="34" :src="user.photoUrl">
                        <div class="name">
                            {{user.username}}
                        </div>
                    </li>
                </ul>
            </div>
            <!--<div class="group">-->
            <!--<div class="group-title">设置备注</div>-->
            <!--<input class="group-detail" type='search' placeholder="点击编辑"/>-->
            <!--</div>-->
            <div class="group">
                <div class="group-title">公司名称</div>
                <div class="group-detail">
                    {{user.companyName}}
                </div>
            </div>
            <div class="group">
                <div class="group-title">岗位</div>
                <div class="group-detail">
                    {{user.relTpcdName}}
                </div>
            </div>
            <button @click="clearChat('friend')"
                    class="clear-chat">
                清空聊天记录
            </button>
            <!--<div class="group">-->
            <!--<div class="group-title">消息免打扰</div>-->
            <!--<div class="group-switch">-->
            <!--<el-switch-->
            <!--v-model="value1"-->
            <!--active-color="##999999"-->
            <!--inactive-color="#22a22fa">-->
            <!--</el-switch>-->
            <!--</div>-->
            <!--</div>-->
            <div class="out" @click="deleteFriend">
                <span class="out-bg">删除好友</span>
            </div>
        </div>
        <div v-if="type==='group'">
            <!--<div>-->
            <!--<search></search>-->
            <!--</div>-->
            <div class="detailList-list">
                <ul>
                    <li class="detail" @click="openAdd(4)">
                        <button class="detail-button">+</button>
                        <div class="detail-name">添加</div>
                    </li>
                    <li class="detail" @click="openAdd(2)">
                        <button class="detail-button">-</button>
                        <div class="detail-name">删除</div>
                    </li>
                    <li class="detail" v-for="item in groupChatMembers">
                        <img class="avatar-chat-detail" :alt="item.remark" :src="item.hPath">
                        <div class="name" :title="item.trueName">
                            {{item.trueName}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="group">
                <div class="group-title">群名</div>
                <input class="group-detail" type='search' v-model="groupName" @blur="saveChatName"
                       :disabled="chat.chatDelFlag=='1'"
                       :title="groupName" placeholder="点击编辑"/>
            </div>
            <div class="group">
                <div class="group-title">我的群昵称</div>
                <div class="group-detail">
                    <input class="group-detail" type='search' v-model="nickName" :title="nickName" @blur="saveNickName"
                           :disabled="chat.chatDelFlag=='1'"
                           placeholder="点击编辑"/>
                </div>
            </div>
            <button @click="clearChat('group')"
                    class="clear-chat">
                清空聊天记录
            </button>
            <!--<div class="group">-->
            <!--<div class="group-title">消息免打扰</div>-->
            <!--<div class="group-switch">-->
            <!--<el-switch-->
            <!--v-model="value1"-->
            <!--active-color="##999999"-->
            <!--inactive-color="#22a22fa">-->
            <!--</el-switch>-->
            <!--</div>-->
            <!--</div>-->
            <div class="out2" @click="quitChat">
                <span class="out-bg">删除并退出</span>
            </div>
        </div>
        <div v-if="type==='consult'">
            <div class="consult">
                <div>
                    <img class="avatar-chat" width="34" height="34" :src="user.photoUrl">
                </div>
                <div class="company-detail">
                    <div>
                        <div class="company-name" v-if="user.companyName">
                            {{user.companyName}}
                        </div>
                        <div class="company-name" v-else>
                            {{user.username}}
                        </div>
                    </div>
                    <div class="company-operate">
                        {{user.relTpcdName}}
                    </div>
                </div>
            </div>
            <div>
                <button class="out3" @click="addFriend">添加为好友</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    import search from '../search/search'
    import bus from '../../../eventBus'
    import utils from '../../../util/utils'

    export default {
        components: {
            search
        },
        computed: {
            ...mapState([
                'chat'
            ]),
            ...mapGetters([
                'selectedChat',
                'getFriendsList',
            ])
        },
        data() {
            return {
                value1: true,
                type: '',
                groupName: '',
                nickName: '',
                user: {},
                groupChatMembers: [],
            }
        },
        created() {
            if (this.$store.state.chat.chatlist) {
                this.user = this.$store.state.chat.chatlist.find(session => session.id == this.$store.state.chat.selectId);
                this.type = this.user.type
                this.groupName = this.user.receiver
                if (this.type === 'group') {
                    if (this.$store.state.chat.chatDelFlag != '1') {
                        this.getGroupMembers();
                    }
                    this.nickName = this.user.nickName
                }
            }
        },
        //生命周期内销毁防止多次请求
        beforeDestroy() {
            bus.$off('refreshList')
        },
        mounted() {
            let vm = this;
            bus.$on("refreshList", function (val) {
                if(val==1){
                    vm.getGroupMembers();
                }else {
                    vm.groupChatMembers=[]
                }
            })
        },
        methods: {
            ...mapActions([
                'selectSession',
            ]),
            openAdd(val) {
                if (this.$store.state.chat.chatDelFlag == '1') {
                    this.$message.warning('当前群聊已解散！')
                    return;
                }
                // 创建群聊1，删除群聊人员2，好友聊天时创建群聊3 ,群聊添加人员4
                this.$store.state.chat.addChatType = val;
                if (this.$store.state.chat.addChatType == 2) {
                    if (this.user.createBy == this.SSH.getItem('userInfo').id) {
                        this.$store.state.chat.addChatType = val;
                        this.$store.dispatch('showAdd', true);
                    } else {
                        this.$message.warning('只有群主能删除！')
                    }
                } else {
                    this.$store.state.chat.addChatType = val;
                    this.$store.dispatch('showAdd', true)
                }
            },
            saveNickName() {
                let vm = this
                if (this.nickName.length > 10) {
                    this.$message.warning('群昵称不能超过10个字!');
                    this.nickName = this.user.nickName
                    return
                }
                this.$post(this.$apiUrl.chat.modifyGroupNickname,
                    {
                        userId: this.SSH.getItem('userInfo').id,
                        groupId: this.$store.state.chat.selectId,
                        remarks: this.nickName
                    }
                ).then((response) => {
                    if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        vm.$store.dispatch('changeNickName', vm.nickName);
                        let msg = {
                            "senderId": vm.SSH.getItem('userInfo').id + '',
                            "recipientId": vm.$store.state.chat.selectId + '',
                            "sender": vm.SSH.getItem('userInfo').username + '',
                            "senderName": vm.nickName + '',
                            "recipient": vm.$store.state.chat.selectId + '',
                            "msgType": 'text', //(文本:text,图片:image)
                            "content": 'nickNameChange',
                            "action": 'otherGroupMember',
                            "groupId": vm.$store.state.chat.selectId + '',
                            "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                        };
                        let param = JSON.stringify(msg);
                        vm.$store.dispatch('sendWs', param);
                    }
                })
            },
            saveChatName() {
                let vm = this
                if (this.user.createBy == this.SSH.getItem('userInfo').id) {
                    if (this.groupName != '') {
                        if (this.groupName.length >= 16) {
                            this.$message.warning('群名不能超过16个字！')
                            this.groupName = this.user.receiver
                        } else {
                            this.$post(this.$apiUrl.chat.modifyGroup,
                                {
                                    id: this.$store.state.chat.selectId,
                                    groupname: this.groupName
                                }
                            ).then((response) => {
                                if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                                    vm.$store.dispatch('modifyGroup', vm.groupName);
                                    let msg = {
                                        "senderId": vm.SSH.getItem('userInfo').id + '',
                                        "recipientId": vm.$store.state.chat.selectId + '',
                                        "sender": vm.SSH.getItem('userInfo').username + '',
                                        "senderName": vm.SSH.getItem('userInfo').truename + '',
                                        "recipient": vm.$store.state.chat.selectId + '',
                                        "msgType": 'text', //(文本:text,图片:image)
                                        "content": 'groupNameChange',
                                        "action": 'otherGroupMember',
                                        "groupId": vm.$store.state.chat.selectId + '',
                                        "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                                    };
                                    let param = JSON.stringify(msg);
                                    vm.$store.dispatch('sendWs', param);
                                } else {
                                    vm.groupName = vm.user.receiver
                                }
                            })
                        }
                    } else {
                        this.$message.warning('群名不能为空！')
                        this.groupName = this.user.receiver
                    }
                } else {
                    this.$message.warning('不是群主不能修改群名！')
                    this.groupName = this.user.receiver
                }

            },
            quitChat() {
                let vm = this;
                let chat = this.$store.state.chat.chatlist.find(session => session.id == this.$store.state.chat.selectId);
                if (this.SSH.getItem('userInfo').id == chat.createBy) {
                    if (this.$store.state.chat.chatDelFlag == '1') {
                        this.$message.warning('当前群聊已解散！')
                        return;
                    }
                    this.$confirm('是否删除群聊?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$post(this.$apiUrl.chat.delGroup,
                            {
                                id: this.$store.state.chat.selectId
                            }
                        ).then((response) => {
                            vm.$post(this.$apiUrl.chat.delGroupMember,
                                {
                                    userId: vm.SSH.getItem('userInfo').id,
                                    groupId: vm.$store.state.chat.selectId,
                                    operationId: vm.SSH.getItem('userInfo').id
                                }
                            ).then((response) => {
                                let message = {
                                    "senderId": vm.SSH.getItem('userInfo').id + '',
                                    "recipientId": vm.$store.state.chat.selectId + '',
                                    "groupId": vm.$store.state.chat.selectId + '',
                                    "sender": vm.SSH.getItem('userInfo').username + '',
                                    "recipient": vm.$store.state.chat.selectId + '',
                                    "senderName": vm.SSH.getItem('userInfo').cstNm + '',
                                    "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                                    "msgType": 'text', //(文本:text,图片:image)
                                    "content": 'groupNameChange',
                                    "action": 'otherGroupMember',
                                    "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                                };
                                let param = JSON.stringify(message);
                                vm.$store.dispatch('sendWs', param);
                                vm.$store.dispatch('quitChat', 'quit');
                            })
                            let msg = {
                                "senderId": vm.SSH.getItem('userInfo').id + '',
                                "recipientId": vm.$store.state.chat.selectId + '',
                                "sender": vm.SSH.getItem('userInfo').username + '',
                                "senderName": vm.SSH.getItem('userInfo').truename + '',
                                "recipient": vm.$store.state.chat.selectId + '',
                                "msgType": 'text', //(文本:text,图片:image)
                                "content": 'groupDel',
                                "action": 'otherGroupMember',
                                "groupId": vm.$store.state.chat.selectId + '',
                                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                            };
                            let param = JSON.stringify(msg);
                            vm.$store.dispatch('sendWs', param);
                            vm.$store.dispatch('quitChat', 'delete');
                            vm.groupChatMembers=[]
                        })
                    })

                } else {
                    this.$confirm('是否退出群聊?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$post(this.$apiUrl.chat.delGroupMember,
                            {
                                userId: this.SSH.getItem('userInfo').id,
                                groupId: this.$store.state.chat.selectId,
                                operationId: this.SSH.getItem('userInfo').id
                            }
                        ).then((response) => {
                            let message = {
                                "senderId": vm.SSH.getItem('userInfo').id + '',
                                "recipientId": vm.$store.state.chat.selectId + '',
                                "groupId": vm.$store.state.chat.selectId + '',
                                "sender": vm.SSH.getItem('userInfo').username + '',
                                "recipient": vm.$store.state.chat.selectId + '',
                                "senderName": vm.SSH.getItem('userInfo').cstNm + '',
                                "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                                "msgType": 'text', //(文本:text,图片:image)
                                "content": 'groupNameChange',
                                "action": 'otherGroupMember',
                                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                            };
                            let param = JSON.stringify(message);
                            vm.$store.dispatch('sendWs', param);
                            vm.$store.dispatch('quitChat', 'quit');
                        })
                    })
                }
            },
            getGroupMembers() {
                let vm = this;
                this.$post(this.$apiUrl.chat.getGroupMemberList,
                    {
                        pageNum: 1,
                        pageSize: 100,
                        groupId: this.$store.state.chat.selectId
                    }
                ).then((response) => {
                    vm.groupChatMembers = response.resultData
                })
            },
            addFriend() {
                let vm = this
                this.$prompt('', '验证信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder: '请输入验证信息',
                    inputPattern: /^[\s\S]{0,15}$/,
                    inputErrorMessage: '验证信息0-16个字！'
                }).then(({value}) => {
                    this.$post(this.$apiUrl.chat.requestAddFriend,
                        {
                            userid: vm.SSH.getItem('userInfo').id,
                            friendid: vm.user.id,
                            msg: value,
                        }
                    ).then((response) => {
                        vm.$message({
                            type: 'success',
                            message: '发送申请成功'
                        });
                        let chat = this.$store.state.chat.chatlist.find(friend => friend.id == vm.$store.state.chat.selectId);
                        let msg = {
                            "senderId": vm.SSH.getItem('userInfo').id + '',
                            "recipientId": vm.$store.state.chat.selectId + '',
                            "sender": vm.SSH.getItem('userInfo').username + '',
                            "recipient": chat.receiver + '',
                            "senderName": vm.SSH.getItem('userInfo').cstNm + '',
                            "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                            "msgType": 'text', //(文本:text,图片:image)
                            "content": 'friendRequest',
                            "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                        };
                        let param = JSON.stringify(msg);
                        vm.$store.dispatch('sendWs', param);
                    });
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '取消申请'
                    });
                });
            },
            deleteFriend() {
                let vm = this;
                this.$confirm('是否删除好友？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$apiUrl.chat.delFriend,
                        {
                            userid: vm.SSH.getItem('userInfo').id,
                            friendid: vm.user.id,
                            type: 'delFriend'
                        }
                    ).then((response) => {
                        //先发通知，否则在chatlist删除该聊天时，找不到对应的聊天
                        let chat = this.$store.state.chat.chatlist.find(friend => friend.id == vm.$store.state.chat.selectId);
                        let msg = {
                            "senderId": vm.SSH.getItem('userInfo').id + '',
                            "recipientId": vm.$store.state.chat.selectId + '',
                            "sender": vm.SSH.getItem('userInfo').username + '',
                            "recipient": chat.receiver + '',
                            "senderName": vm.SSH.getItem('userInfo').cstNm + '',
                            "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                            "msgType": 'text', //(文本:text,图片:image)
                            "content": 'friendDel',
                            "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                        };
                        let param = JSON.stringify(msg);
                        vm.$store.dispatch('sendWs', param);

                        let friendArray = [];
                        let chatArray = [];
                        for (let friend of vm.$store.state.chat.friendlist) {
                            if (friend.id != vm.$store.state.chat.selectId) {
                                friendArray.push(friend);
                            }
                        }
                        for (let chat of vm.$store.state.chat.chatlist) {
                            if (chat.id != vm.$store.state.chat.selectId) {
                                chatArray.push(chat);
                            }
                        }
                        vm.SSH.setItem('messageList', chatArray);
                        vm.SSH.setItem('friendList', friendArray);
                        vm.$store.state.chat.chatlist = chatArray;
                        vm.$store.state.chat.friendlist = friendArray;
                        vm.$store.state.chat.selectCard = 2;
                        vm.$store.state.chat.selectId = '';
                        vm.$store.state.chat.chatType = '';
                        vm.$store.state.chat.selectFriendId = 0;
                        vm.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        
                    });
                }).catch(() => {

                });
            },
            clearChat(type) {
                let vm = this
                if (this.$store.state.chat.chatDelFlag == '1') {
                    this.$message.warning('当前群聊已解散！')
                    return;
                }
                this.$confirm('是否清空聊天记录?', '提示', {
                    confirmButtonText: '清空',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$store.dispatch('deleteChatHistory', type)
                    // vm.$message({
                    //     type: 'success',
                    //     message: '清除成功!'
                    // });
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消清空！'
                    });
                });
            }
        }
        ,
        filters: {
            // 将日期过滤为 hour:minutes
            time(date) {
                return utils.changeTime(date)
            }
        }
        ,
    }
</script>

<style lang="less" scoped>
    .detailList {
        height: 600px;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #f5f5f5;
        .detailList-list {
            padding: 20px 0 20px 0;
            justify-content: space-between;
            border-bottom: 1px solid #f0f0f0;
            overflow: auto;
            .detail {
                float: left;
                margin-left: 12px;
                margin-bottom: 12px;
                .detail-button {
                    cursor: pointer;
                    width: 36px;
                    height: 36px;
                    margin: 0 6px;
                    font-weight: lighter;
                }
                .avatar-chat-detail {
                    border-radius: 25px;
                    width: 36px;
                    height: 36px;
                    margin: 0 6px;
                }
                .name {
                    margin: 0 6px;
                    text-align: center;
                    font-size: 12px;
                    width: 36px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .detail-name {
                    text-align: center;
                    font-size: 12px;
                    color: #333;
                    width: 36px;
                    margin: 0 6px;
                }
            }
        }
        .group {
            margin: 24px 20px;
            .group-title {
                color: #999999;
                font-size: 14px;
            }
            .group-switch {
                border: none;
                margin-top: 10px;
                font-size: 14px;
            }
            .group-detail {
                background-color: #f5f5f5;
                border: none;
                margin-top: 10px;
                color: #333333;
                width: 230px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .clear-chat {
            cursor: pointer;
            background-color: #22a2fa;
            color: #ffffff;
            font-size: 14px;
            width: 108px;
            height: 24px;
            margin: 5px 20px;
            border-radius: 3px;
            border: none
        }
        .out {
            cursor: pointer;
            text-align: center;
            color: #f01b1b;
            padding-top: 15px;
            font-size: 18px;
            height: 40px;
            margin-top: 300px;
            .out-bg {
                padding: 7px 65px;
                background-color: #fff;
                border-radius: 4px;
            }
        }
        .out3 {
            text-align: center;
            color: #ffffff;
            border-radius: 3px;
            font-size: 14px;
            border: none;
            margin-top: 40px;
            margin-left: 50px;
            width: 92px;
            height: 24px;
            background-color: #22a2fa;
        }
        .out2 {
            text-align: center;
            color: red;
            height: 40px;
            padding-top: 15px;
            font-size: 14px;
            margin-top: 150px;
            cursor: pointer;
            .out-bg {
                padding: 7px 65px;
                background-color: #fff;
                border-radius: 4px;
            }
        }
        .avatar-chat {
            border-radius: 25px;
            margin-left: 8px
        }
        .company-detail {
            margin-left: 16px;
            .company-name {
                color: #333333;
                width: 190px;
                font-size: 14px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .company-operate {
                color: #999999;
                font-size: 12px;
            }
        }

        .consult {
            display: flex;
            padding: 30px 0 30px 20px;
            border-bottom: 1px solid #f0f0f0;
        }

    }
    .detailList::-webkit-scrollbar-track {
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    .detailList::-webkit-scrollbar-thumb {
        border-radius: 10px;
        padding: 0;
        background-color: rgba(0, 0, 0, .2);
    }

    .detailList::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }
</style>
