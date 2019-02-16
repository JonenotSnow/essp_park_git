<template>
    <div class="newfriend">
        <div>
            <el-input
                placeholder="请搜索手机号/账户号"
                prefix-icon="el-icon-search"
                type="text"
                @keyup.enter.native="searchFriend"
                v-model="value1">
            </el-input>
        </div>
        <div class="add-list" v-if="value1===''">
            <ul>
                <li v-if="showAddFriendList" class="friend-info" v-for="(item,index) in addFriendList" :key="index">
                    <div style="display: flex">
                        <img class="avatar-chat" width="50" height="50" :alt="item.trueName" :src="item.hPath">
                        <div class="remark">
                            <div class="remark-name">{{item.trueName}}</div>
                            <div class="remark-company">{{item.name}}</div>
                            <div class="remark-detail">
                                {{item.msg}}
                            </div>
                        </div>
                        <button v-if='item.showAdd' @click="agreeAddFriend(item,index)" class="add-button">
                            {{item.isAdd}}
                        </button>
                        <button v-if='item.showDisagree' @click="disagreeAddFriend(item,index)" class="add-button3">
                            {{item.isDisagree}}
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="add-list" v-if="value1">
            <ul>
                <li v-if="showSearchList" class="friend-info" v-for="(item,index) in searchList" :key="index">
                    <div style="display: flex">
                        <img class="avatar-chat" width="50" height="50" :alt="item.trueName" :src="item.hPath">
                        <div class="remark">
                            <div class="remark-name">{{item.trueName}}</div>
                            <div class="remark-company">{{item.name}}</div>
                        </div>
                        <button @click="addNewFriend(item,index)" class="add-button2" v-if="item.type=='2'">{{item.isSend}}</button>
                        <span v-if="item.type=='1' || item.type=='4'" class="already-add-button">已是好友</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import search from '../search/search'
    import {mapState, mapGetters} from 'vuex'
    import bus from '../../../eventBus'
    export default {
        name: "newfriend",
        data() {
            return {
                value1: '',
                isAdd: false,
                isApply: false,
                showAddFriendList: false,
                showSearchList: false,
                //查找返回列表
                // id:对方用户的ID
                // loginName:登录名称
                // trueName:用户姓名
                // name:所属公司名称
                // hPath:用户头像
                // hName:
                searchList: [{
                    id: '',
                    loginName: '',
                    trueName: '',
                    name: '',
                    hPath: '',
                    hName: '',
                    isSend: '申请加为好友',
                }
                ],
                //待添加好友列表
                addFriendList: [{
                    id: '',
                    loginName: '',
                    trueName: '',
                    name: '',
                    hPath: '',
                    ufId: '',
                    isAdd: '添加',
                    showAdd: true,
                    showDisagree: true,
                    isDisagree: '拒绝',
                    msg: ''
                }
                ]
            }
        },
        components: {
            search
        },
        computed: {
            ...mapState([
                'chat',
            ]),
            ...mapGetters([
                'searchedChatlist',
                'searchedFriendlist',
            ])
        },
        watch: {
            value1() {
                this.showSearchList = false
            }
        },
        created() {
            //获取待添加好友列表
            this.getFriendsList();
        },
        //生命周期内销毁防止多次请求
        beforeDestroy() {
            bus.$off('refreshFriendRequest')
        },
        mounted() {
            let vm = this;
            bus.$on("refreshFriendRequest", function(val) {
                vm.getFriendsList();
            })
        },
        methods: {
            getFriendsList() {
                let vm = this;
                this.$post(this.$apiUrl.chat.getFriendsList,
                    {
                        pageNum: 1,
                        pageSize: 100,
                        type: '0',
                        userId: vm.SSH.getItem('userInfo').id,
                    }
                ).then((response) => {
                    if (response.resultData != undefined) {
                        if (response.resultData.length > 0) {
                            vm.showAddFriendList = true;
                            let list = []
                            for (let resultDatum of response.resultData) {
                                resultDatum.isAdd = '添加'
                                resultDatum.isDisagree = '拒绝'
                                resultDatum.showAdd = true
                                resultDatum.showDisagree = true
                                list.push(resultDatum)
                            }
                            vm.addFriendList = list;
                        }
                    }
                });
            },
            searchFriend() {
                let vm = this
                vm.searchList = []
                vm.isApply = false
                vm.showSearchList = false
                this.$post(this.$apiUrl.chat.searchFriend,
                    {
                        mobile: this.value1,
                        senderId: vm.SSH.getItem('userInfo').id
                    }
                ).then((response) => {
                    if (response.resultData != undefined) {
                        if (response.resultData.length > 0) {
                            vm.showSearchList = true
                            let list = []
                            for (let resultDatum of response.resultData) {
                                resultDatum.isSend = '申请加为好友';
                                list.push(resultDatum)
                            }
                            vm.searchList = list;
                        } else {
                            this.$message({
                                type: 'info',
                                message: '未找到对应的用户！'
                            });
                        }
                    }
                });
            },
            addNewFriend(val,index) {
                let vm = this
                if (vm.SSH.getItem('userInfo').id == val.id) {
                    this.$message({
                        type: 'info',
                        message: '不能添加自己为好友！'
                    });
                } else {
                    if (val.isSend == '申请加为好友') {
                        let result = vm.$store.state.chat.friendlist.find(friend => friend.id ==  val.id);
                        if(result){
                            this.$message({
                                    type: 'info',
                                    message: '对方已是您的好友！'
                                });
                            return;
                        }
                        this.$prompt('', '验证信息', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputPlaceholder: '请输入验证信息',
                            inputPattern: /^[\s\S]{0,15}$/,
                            inputErrorMessage: '验证信息0-16个字！'
                        }).then(({value}) => {
                            vm.searchList[index].isSend = '已申请'
                            this.$post(this.$apiUrl.chat.requestAddFriend,
                                {
                                    userid: vm.SSH.getItem('userInfo').id,
                                    friendid: val.id,
                                    msg: value,
                                }
                            ).then((response) => {
                                this.$message({
                                    type: 'success',
                                    message: '发送申请成功'
                                });
                                let msg = {
                                    "senderId": vm.SSH.getItem('userInfo').id + '',
                                    "recipientId": val.id + '',
                                    "sender": vm.SSH.getItem('userInfo').username + '',
                                    "senderName": vm.SSH.getItem('userInfo').truename + '',
                                    "recipient": val.userName + '',
                                    "msgType": 'text', //(文本:text,图片:image)
                                    "content": 'friendRequest',
                                    "action": 'single',
                                    "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                                };
                                let param = JSON.stringify(msg);
                                vm.$store.dispatch('sendWs', param);
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消申请'
                            });
                        });
                    } else {
                        this.$message({
                            type: 'info',
                            message: '已申请'
                        });
                    }
                }
            },
            agreeAddFriend(value, index) {
                let vm = this;
                if (value.isAdd == '添加') {
                    vm.addFriendList[index].isAdd = '已添加'
                    vm.addFriendList[index].showDisagree = false
                    this.$post(this.$apiUrl.chat.agreeAddFriend,
                        {
                            id: value.ufId,
                            type: 1,
                        }
                    ).then((response) => {
                        if (response.resultCode != 'CLT000000000' && response.resultCode != '0000000000') {
                            vm.addFriendList[index].isAdd = '添加'
                        } else {
                            vm.$message({
                                type: 'success',
                                message: '添加成功！'
                            });
                            vm.$store.dispatch('changeChatType', value.id);
                            let msg = {
                                "senderId": vm.SSH.getItem('userInfo').id + '',
                                "recipientId": value.id + '',
                                "sender": vm.SSH.getItem('userInfo').username + '',
                                "senderName": vm.SSH.getItem('userInfo').truename + '',
                                "recipient": value.userName + '',
                                "msgType": 'text', //(文本:text,图片:image)
                                "content": 'friendAgree',
                                "action": 'single',
                                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                            };
                            let param = JSON.stringify(msg);
                            vm.$store.dispatch('sendWs', param);
                            let result = vm.$store.state.chat.friendlist.find(friend => friend.id == vm.addFriendList[index].id)
                            if (!result) {
                                vm.SSH.setItem('friendList', vm.$store.state.chat.friendlist.push(vm.addFriendList[index]));
                            }
                        }
                    });
                }
            },
            disagreeAddFriend(value, index) {
                let vm = this;
                if (value.isDisagree == '拒绝') {
                    vm.addFriendList[index].isDisagree = '已拒绝'
                    vm.addFriendList[index].showAdd = false
                    this.$post(this.$apiUrl.chat.delFriend,
                        {
                            userid: vm.SSH.getItem('userInfo').id,
                            friendid: value.id,
                            type: 'refuseFriend'
                        }
                    ).then((response) => {
                        if (response.resultCode != 'CLT000000000' && response.resultCode != '0000000000') {
                            vm.addFriendList[index].isDisagree = '已拒绝'
                        } else {
                            vm.$message({
                                type: 'success',
                                message: '拒绝成功！'
                            });
                            let msg = {
                                "senderId": vm.SSH.getItem('userInfo').id + '',
                                "recipientId": value.id + '',
                                "sender": vm.SSH.getItem('userInfo').username + '',
                                "senderName": vm.SSH.getItem('userInfo').truename + '',
                                "recipient": value.userName + '',
                                "msgType": 'text', //(文本:text,图片:image)
                                "content": 'friendAgreeNo',
                                "action": 'single',
                                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                            };
                            let param = JSON.stringify(msg);
                            vm.$store.dispatch('sendWs', param);
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .newfriend {
        background-color: #f6f6f6;
        padding-left: 10px;
    }

    .add-list {
        height: 470px;
        overflow-y: auto;
        .friend-info {
            padding: 12px;
            transition: background-color .1s;
            border-bottom: 1px solid #f0f0f0;
            font-size: 0;
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
                .remark-detail {
                    color: #737373;
                    font-size: 18px;
                    line-height: 25px;
                    margin-top: 5px
                }
            }
            .add-button {
                width: 70px;
                height: 28px;
                background-color: #22a2fa;
                border: none;
                color: white;
                margin-top: 6px;
            }
            .add-button3 {
                width: 70px;
                height: 28px;
                background-color: #ff0000;
                border: none;
                color: white;
                margin-top: 6px;
            }
            .add-button-allready {
                width: 70px;
                height: 28px;
                background-color: #22a2fa;
                border: none;
                color: white;
                margin-top: 6px;
            }
            .add-button2 {
                width: 100px;
                height: 28px;
                background-color: #22a2fa;
                border: none;
                color: white;
            }
            .already-add-button {
                width: 100px;
                height: 28px;
                font-size: 14px;
                background-color: #a0a0a0;
                letter-spacing: 0px;
                padding-top: 12px;
                color: white;
                text-align: center;
            }
        }

    }
    .add-list::-webkit-scrollbar-track {
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    .add-list::-webkit-scrollbar-thumb {
        border-radius: 10px;
        padding: 0;
        background-color: rgba(0, 0, 0, .2);
    }

    .add-list::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }
    .el-input--prefix .el-input__inner {
        padding-left: 30px;
        border-radius: 10px;
    }

    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        border-radius: 11px;
        background-color: #ffffff;
        color: #666666;
        width: 470px;
        margin: 20px;
    }

</style>
