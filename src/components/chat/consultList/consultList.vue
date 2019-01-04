<template>
    <div class="msglist">
        <ul>
            <li v-for="(item,index) in searchedConsultlist" class="sessionlist"
                :class="{ active: item.id == chat.selectConsultId}" @click="selectChat(item)" :key="index">
                <img class="avatar-chat list-left" width="42" height="42" :alt="item.hPath" :src="item.hPath">
                <div class="list-right">
                    <div>
                        <div class="name" :title="item.name" v-if="item.name" >{{item.name}}</div>
                        <div class="name" :title="item.name" v-else>{{item.trueName}}</div>
                    </div>
                    <div class="name2" :title="item.name">{{item.relTpcdName}}</div>
                    <span class="time">{{item.msg | changeTime}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions,mapGetters} from 'vuex'
    import utils from '../../../util/utils'

    export default {
        created() {
            // this.getList();
        },
        data() {
            return {}
        },
        computed: {
            ...mapState([
                'chat'
            ]),
            ...mapGetters([
                'searchedConsultlist'
            ])
        },
        methods: {
            ...mapActions([
                'selectSession',
                'deleteSession',
            ]),
            getList() {
                let vm = this;
                this.$post(vm.$apiUrl.chat.getFriendsList,
                    {
                        pageNum: 1,
                        pageSize: 100,
                        type: '3',
                        userId: vm.SSH.getItem('userInfo').id,
                    }
                ).then((response) => {
                    vm.consultlist = response.resultData;
                    vm.$store.state.chat.consultlist = vm.consultlist;
                })
            },
            selectChat(val) {
                this.$store.dispatch('selectConsult', val);
            }
        },
        filters: {
            // 将日期过滤为 hour:minutes
            changeTime(msg) {
                let time = JSON.parse(msg)
                return utils.changeTime(time[0].createDate)
            }
        },
    }
</script>

<style lang="less" scoped>
    .msglist {
        overflow-y: auto;
        .sessionlist {
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
                margin-top: 4px;
                .name {
                    width: 200px;
                    font-size: 16px;
                    color: #000000;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .name2{
                    width: 200px;
                    font-size: 14px;
                    color: #999999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .time {
                    float: right;
                    color: #999;
                    font-size: 12px;
                    vertical-align: top;

                }
                .lastmsg {
                    position: absolute;
                    font-size: 14px;
                    width: 130px;
                    height: 15px;
                    line-height: 15px;
                    color: #999999;
                    bottom: 4px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
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
