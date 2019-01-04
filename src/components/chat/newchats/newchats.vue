<template>
    <div class="newchat">
        <div class="add">
            <img class="detail-button" src="../../../assets/chat-icon/add.png" @click="openAdd">
            <div class="detail-name" @click="openAdd">创建群组</div>
        </div>
        <div class="add-list">
            <ul>
                <li v-if="groupChatList.length>0" class="friend-info" v-for="item in groupChatList">
                    <div class="friend-info-wrapper" @click="selectGroupChat(item)">
                        <img class="avatar-chat" width="50" height="50"  src="static/images/group.png">
                        <div class="remark">{{item.groupname}}</div>
                    </div>
                    <!--<div style="display: flex">-->
                    <!--<div v-for="(item2,key) in searchedFriendlist" :key="key" :style="styleA(key)">-->
                    <!--<img class="avatar-chat" width="50" height="50" :alt="item2.img" :src="item2.img">-->
                    <!--</div>-->
                    <!--</div>-->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import bus from '../../../eventBus'
    export default {
        name: "newfriend",
        components: {},
        computed: {
            ...mapState([
                'chat'
            ]),
            ...mapGetters([
                'searchedChatlist',
                'searchedFriendlist',
            ])
        },
        data() {
            return {
                groupChatList: []
            }
        },
        watch: {},
        created() {
            //获取群聊列表
            this.getChatsList();
        },
        //生命周期内销毁防止多次请求
        beforeDestroy() {
            bus.$off('refreshGroupList')
        },
        mounted() {
            let vm = this;
            bus.$on("refreshGroupList", function (val) {
                vm.getChatsList();
            })
        },
        methods: {
            selectGroupChat(val) {
                let vm=this
                let groupChat = this.$store.state.chat.chatlist.find(msg => msg.id == val.id)
                if (!groupChat) {
                    this.$post(this.$apiUrl.chat.getGroupInfoById, {
                        groupId:val.id
                        }
                    ).then((response) => {
                        vm.$store.state.chat.chatlist.unshift({
                            id: val.id,
                            sender: vm.SSH.getItem('userInfo').username,//发送人登录名
                            receiver: response.resultData.groupname,//接收人登录名
                            msg: '',//消息内容
                            // status: '',//状态
                            createDate:  new Date(),//时间
                            type: 'group',//类型(例如:friend、group)
                            sendName: vm.SSH.getItem('userInfo').username,//发送人真实姓名
                            username: response.resultData.groupname,//用户名
                            companyName: '',//公司名称
                            photoUrl: '',//头像
                            messages: [],
                            nickName: vm.SSH.getItem('userInfo').truename,
                            delFlag: "0",
                            createBy: response.resultData.createBy
                        })
                        vm.$store.state.chat.chatDelFlag='0'
                        vm.SSH.setItem('messageList', vm.$store.state.chat.chatlist);
                    });
                }
                this.$store.state.chat.selectCard = 1
                this.$store.state.chat.selectId = val.id;
                this.$store.state.chat.chatType = 'group';
                this.$store.state.chat.chatpenDetail = false
            },
            getChatsList() {
                let vm = this
                this.$post(this.$apiUrl.chat.getGroupList, {}
                ).then((response) => {
                    vm.groupChatList = response.resultData
                });
            },
            openAdd() {
                this.$store.state.chat.addChatType = 1;
                this.$store.dispatch('showAdd', true)
            },
            styleA(val) {
                if (val === 0) {
                    return {}
                } else {
                    let a = "-" + 30 * val + "px";
                    return {
                        position: "relative",
                        left: a,
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .newchat {
        background-color: #f6f6f6;
        padding-left: 20px;
    }

    .add {
        height: 60px;
        padding-top: 24px;
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        .detail-button {
            width: 36px;
            height: 36px;
            margin: 0 6px;
        }
        .detail-name {
            padding-top: 14px;
            color: #000000;
            font-size: 18px;
        }
    }

    .add-list {
        height: 470px;
        overflow-y: auto;
        .friend-info {
            padding-top: 24px;
            transition: background-color .1s;
            font-size: 0;
            border-bottom: 1px solid #f0f0f0;
            .friend-info-wrapper{
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin-bottom: 5px;
                .avatar-chat {
                    border-radius: 25px;
                    margin-left: 8px
                }
                .remark {
                    margin-top: 5px;
                    font-size: 18px;
                    margin-left: 10px;
                    line-height: 36px;
                    color: #000000;
                    width: 440px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
