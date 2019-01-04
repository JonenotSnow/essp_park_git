<template>
    <div style="display: flex;background-color: #ffffff">
        <div style="width: 300px;">
            <div class="friendlist">
                <ul>
                    <li v-if="getGroupChatMembers.length>0" v-for="(item,index) in getGroupChatMembers" :key="index"
                        class="frienditem">
                        <div class="friend-info" @click="selectMembers(item)">
                            <img class="avatar-chat" width="40" height="40" :src="item.hPath">
                            <div class="remark">
                                <div class="t">{{item.trueName}}</div>
                                <div class="b">{{item.name}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
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
                'getGroupChatMembers'
            ])
        },
        data() {
            return {
                groupChatMembers:[]
            }
        },
        // created(){
        //     this.getGroupMembers();
        // },
        methods: {
            ...mapActions([
                'selectMembers',
            ]),
            getGroupMembers(){
                let vm = this;
                this.$post(this.$apiUrl.chat.getGroupMemberList,
                    {
                        pageNum: 1,
                        pageSize: 100,
                        groupId: this.$store.state.chat.selectId
                    }
                ).then((response) => {
                    vm.groupChatMembers = response.resultData;
                    for(var i=0;i<vm.groupChatMembers.length;i++){
                        if(vm.groupChatMembers[i].userName==this.SSH.getItem('userInfo').username){
                            vm.groupChatMembers.splice(i,1);
                        }
                    }
                })
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
