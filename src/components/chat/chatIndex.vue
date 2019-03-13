<template>
    <div class="chatIndex" ref="cont">
        <div class="sidebar"  @click="chat.showEmoji=false">
            <mycard></mycard>
        </div>

        <div class="content-chat" v-if="chat.selectCard===1">
            <div class="msglist">
                <search></search>
                <chatlist></chatlist>
            </div>
            <div class="chatbox">
                <message></message>
                <component :is="vtext"></component>
                <!--<v-text></v-text>-->
            </div>
            <div class="chatdetail" v-if="chat.openDetail">
                <el-collapse-transition>
                    <div>
                        <chat-detail></chat-detail>
                    </div>
                </el-collapse-transition>
            </div>
        </div>

        <div class="content-chat" v-if="chat.selectCard===2">
            <div class="friend-wrapper">
                <search></search>
                <friendlist></friendlist>
            </div>
            <div class="friendinfo">
                <info></info>
            </div>
        </div>

        <div class="content-chat" v-if="chat.selectCard===3">
            <div class="msglist">
                <search></search>
                <div class="zxMsg">
                    <div class="zm">咨询请求</div>
                </div>
                <consultList @childByValue="childByValue"></consultList>
            </div>
            <!--未咨询同意过的展示确认页面-->
            <div class="chatbox">
                <consult :obj="obj"></consult>
            </div>
        </div>
        <el-dialog :visible.sync="chat.showAdd"
                   @close="closeDialog"
                   :modal="false"
                   width="600px">
            <addfriends v-if="chat.showAdd"></addfriends>
        </el-dialog>
        <el-dialog :visible.sync="chat.showGroupMembers"
                   @close="closeDialog2"
                   :modal="false"
                   width="300px">
            <group-members></group-members>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import mycard from '../chat/mycard/mycard'
    import search from '../chat/search/search'
    import chatlist from '../chat/chatlist/chatlist'
    import message from '../chat/message/message'
    // import vText from '../chat/text/text'
    import friendlist from '../chat/friendlist/friendlist'
    import info from '../chat/info/info'
    import chatDetail from '../chat/chatDetail/chatDetail'
    import groupMembers from '../chat/addfriends/groupMembers'
    import addfriends from '../chat/addfriends/addFriend'
    import consult from '../chat/consult/consult'
    import consultList from '../chat/consultList/consultList'
    import bus from '../../eventBus'

    export default {
        name: "chatIndex",
        components: {
            mycard,
            search,
            chatlist,
            message,
            // vText,
            friendlist,
            info,
            chatDetail,
            addfriends,
            consult,
            consultList,
            groupMembers,
        },
        computed: {
            ...mapState([
                'chat',
            ])
        },
        data() {
            return {
                obj: {},
                isIE9: navigator.userAgent.indexOf('MSIE 9') > -1,
                vtext: ''
            }
        },
        created() {
            let vm = this;
            this.$store.dispatch('initData', []);
            this.$store.dispatch('initMessageList', []);
            this.$store.dispatch('initConsultList', []);
            if (!this.isIE9) {
                vm.vtext = () => import('../chat/text/text')
                if (vm.SSH.getItem('userInfo')) {
                    this.$post(this.$apiUrl.user.getOtherTokenUrl, {'access_token': this.SSH.getItem('token')}).then((response) => {
                        vm.$store.dispatch('initChat');
                    })
                }
            } else {
                return
            }
        },
        methods: {
            clearSearch() {
                this.$store.dispatch('search', '')
            },
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                this.obj = childValue
            },
            closeDialog() {
                this.$store.state.chat.showAdd = false;
                this.$store.state.chat.selectFriendsList = [];
                this.$store.state.chat.addFriendList = [];
                this.$store.state.chat.selectArr = [];
                this.$store.state.chat.searchAdd = '';
                bus.$emit("clearSearch", 1);
            },
            closeDialog2() {
                this.$store.state.chat.showGroupMembers = false;

            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/font/iconfont.css';

    .chatIndex {
        display: flex;
        position: absolute;
        -webkit-box-shadow: 0px 4px 21px 0px rgba(116, 116, 116, 0.4);
        box-shadow: 0px 4px 21px 0px rgba(116, 116, 116, 0.4);
        .content-chat {
            display: flex;
            height: 600px;
        }
        .sidebar {
            width: 78px;
            height: 600px;
            background: #bdbdbd;
        }
        .msglist {
            width: 280px;
            background: rgb(230, 230, 230);
            .zxMsg {
                padding: 4px 10px;
                font-size: 14px;
                .zm {
                    border-bottom: 2px solid #c9e0fa;
                    padding-bottom: 8px;
                }
            }
        }
        .chatbox {
            width: 550px;
            background-color: #f6f6f6;
        }
        .chatdetail {
            width: 280px;
            background-color: #f6f6f6;
        }
        .friend-wrapper {
            width: 280px;
            background: rgb(230, 230, 230)

        }
        .friendinfo {
            width: 550px;
        }
    }
</style>
