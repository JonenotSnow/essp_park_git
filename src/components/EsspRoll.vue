<template>
    <div class="esspRoll-wrap">
        <ul class="roll-content">
            <li
                v-if="listType == 'infoList'"
                :class="{anim : animate == true}"
                v-for="(item, index) in listTemp"
                :key="index"
                ref="esspRoll"
                @click.stop="getNoticeDetail(item)"
                @mouseover="stop"
                @mouseout="start"
            >
                <span style="display: inline-block">{{item.title || item.informationTitle}}</span>
                <span
                    style="display: inline-block; float: right; color: #999;"
                >{{item.createTime | timerFormat}}</span>
            </li>
            <li
                v-if="listType == 'applyParkList'"
                :class="{anim : animate == true}"
                v-for="(item, index) in listTemp"
                :key="index"
                ref="esspRoll"
                @click.stop="cancelAudit(item)"

                @mouseover="stop"
                @mouseout="start"
            >
                <span style="display: inline-block">{{item | messageFormat}}</span>
                <span
                    style="display: inline-block; float: right; color: #999;"
                >{{(item.joinTime || item.time) | timerFormat}}</span>

                <!--<span style="display: inline-block">{{item.title || item.informationTitle}}</span>-->
                <!--<span style="display: inline-block; float: right; color: #999;">{{item.createTime | timerFormat}}</span>-->
            </li>
        </ul>
    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        name: "essp-roll",
        props: {
            listType: {
                type: String,
                default: ""
            },
            list: {
                type: Array,
                default: []
            }
        },
        components: {},
        data() {
            return {
                msg: "essp-roll",
                animate: false,
                listTemp: [],
                isBdPark: this.utils.isBdPark() || false,
                timerInt: null,
                timerSet:null,
                timerSetAnm:null
            };
        },
        methods: {
            scroll() {
                let _this = this;
                // _this.listTemp.push(_this.listTemp.shift());
                this.animate = false;
                
                // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                
                _this.$nextTick(function () {
                    
                    // _this.animate = !_this.animate;
                })
                this.timerSetAnm = setTimeout(function () {
                    // _this.listTemp.push(_this.listTemp.shift());
                    _this.animate = true;
                }, 1500);
                this.timerSet = setTimeout(function () {
                    _this.animate = false;
                    _this.listTemp.push(_this.listTemp.shift());
                    
                }, 2000);
            },
            stop(){
                if (this.listTemp.length > 1) {
                    
                    clearInterval(this.timerInt)
                    clearInterval(this.timerSet)
                    clearInterval(this.timerSetAnm)
                    this.animate = false;
                } 
                
            },
            start(){
                if (this.listTemp.length > 1) {
                    // this.animate = true
                    this.timerInt = setInterval(this.scroll, 2500);
                } else {
                    this.animate = false;
                }
            },
            // 前往详情
            getNoticeDetail(item) {
                if (this.isBdPark) {
                    this.$router.push({
                        path: "/news/noticedetail",
                        query: {informationId: item.informationId}
                    });
                } else {
                    this.$router.push({
                        path: "/parkHall/manage/noAndADDetail",
                        query: {id: item.id}
                    });
                }
            },
            //校验审核状态
            cancelAudit(rows) {
                // 1.入园审核 2.惠政申报审核 3.惠政发布 4.活动发布 5.资讯审核 6.活动报名
                let selectObj = {};
                console.log(rows);
                switch (Number(rows.type)) {
                    case 1:
                        Object.assign(selectObj, {
                            path: "/parkHall/manage/manageAuditing",
                            query: {entityId: rows.id, cstId: rows.cstId}
                        });
                        break;
                    case 2:
                        Object.assign(selectObj, {
                            path: "/parkIndex/goverBmAuditDetail",
                            query: {id: rows.id}
                        });

                        break;

                    case 3:
                        Object.assign(selectObj, {
                            path: "/parkHall/manage/manageGoverAuditing",
                            query: {entityId: rows.id}
                        });
                        break;

                    case 4:
                        Object.assign(selectObj, {
                            path: "/parkHall/manage/manageActivityAudit",
                            query: {id: rows.id}
                        });
                        break;
                    case 5:
                        Object.assign(selectObj, {
                            path: "/parkHall/manage/manageZXAuditing",
                            query: {id: rows.id}
                        });
                        break;
                    case 6:
                    // /parkIndex/activityBmAuditDetail?id=20190223105445004&enterinfoId=20190223105505002
                        Object.assign(selectObj, {
                            path: "/parkIndex/activityBmAuditDetail",
                            query: {id: rows.mark,enterinfoId:rows.id}
                        });
                        break;
                    default:
                        break;
                }

                this.$router.push(selectObj);
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            },
            messageFormat(rows) {
                // 1.入园审核 2.惠政申报审核 3.惠政发布 4.活动发布 5.资讯审核 6.活动报名
                switch (Number(rows.type)) {
                    case 1:
                        return rows.cstNm + "申请加入园区,请及时审核";
                        break;
                    case 2:
                        return "您收到一条惠政申报申请,请及时审核";

                        break;

                    case 3:
                        return "您收到一条惠政发布申请,请及时审核";

                        break;

                    case 4:
                        return "您收到一条活动发布申请,请及时审核";

                        break;
                    case 5:
                        return "您收到一条资讯发布申请,请及时审核";
                        break;
                    case 6:
                        return "您收到一条活动报名申请,请及时审核";

                        break;
                    default:
                        return "消息异常,请联系管理员处理";
                        break;
                }
            }
        },
        mounted() {
            this.listTemp = this.list;
            this.start()
        },
        destroyed() {
            clearInterval(this.timerInt)
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .esspRoll-wrap {
        .roll-content {
            height: 35px;
            line-height: 35px;
            overflow: hidden;
            transition: all 0.5s;
            li {
                height: 35px;
                line-height: 35px;
                &:hover {
                    color: #00a0e9;
                    cursor: pointer;
                }
            }
        }

        //   .anim {
        //     transition: all 0.5s;
        //     transform: translateY(-35px);
        //   }
        .anim {
            animation: mymove 0.5s;
        }
        @keyframes mymove {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(-35px);
            }
        }
    }
</style>
