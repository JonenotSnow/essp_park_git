<template>
    <div class="noticeBar">
        <!--/parkHall/manage/activityPoolAddPark-->
        <!--  公告快捷入口的模块-->
        <div class="noticeBox"
             :class="{lineTwo:(LoginUserRole.includes('33') || LoginUserRole.includes('34'))?true:false}">
            <div class="swiper_com esspclearfix">
                <div class="swiper_inner">通知公告：</div>
                <div v-if="infoList.length>0">
                    <!--<div-->
                    <!--v-if="(infoList[0].title && infoList[0].title.length<28)||(infoList[0].informationTitle&& infoList[0].informationTitle.length<28)"-->
                    <!--class="swiper_inner3"-->
                    <!--v-html="infoList[0].title||infoList[0].informationTitle"-->
                    <!--@click="getNoticeDetail()"-->
                    <!--&gt;</div>-->
                    <essp-roll listType="infoList" :list="infoList" class="swiper_inner3"/>
                    <!--<div-->
                    <!--style="padding-top: 8px"-->
                    <!--class="swiper_inner2"-->
                    <!--v-if="infoList && infoList[0].createTime"-->
                    <!--&gt;{{infoList[0].createTime | timerFormat}}-->
                    <!--</div>-->
                    <span
                        style="display: inline-block; padding-top: 9px"
                        class="more"
                        v-if="LoginUserRole.includes('33') || LoginUserRole.includes('34')"
                        @click="goNoticeList()"
                    >More&gt;</span>
                </div>
                <div v-else class="noData">暂无公告~~</div>
            </div>
            <!-- 有新入园通知 -->
            <div
                class="swiper_com swiper_com1 esspclearfix"
                v-if="LoginUserRole.includes('33') || LoginUserRole.includes('34')"
            >
                <div class="swiper_inner">{{isBdPark?'审核管理':'任务池'}}：</div>
                <div class="esspclearfix" v-if="applyParkList.length>0">
                    <!--<div class="esspclearfix">-->
                    <!--<div class="swiper_inner3" @click="cancelAudit(applyParkList[0].id)">-->
                    <!--{{applyParkList[0].cstNm}}-->
                    <!--</div>-->
                    <essp-roll listType="applyParkList" :list="applyParkList" class="swiper_inner3"/>

                    <!-- <span
                        style="display: inline-block; padding-top: 9px"
                        class="more"
                        v-if="LoginUserRole.includes('33') || LoginUserRole.includes('34')"
                    >More&gt;</span> -->
                </div>
                <div class="noData" v-else style="height: 35px;line-height: 35px">暂无任务~~</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Moment from "moment";
    import EsspRoll from "@/components/EsspRoll";

    export default {
        name: "",
        components: {
            EsspRoll
        },
        data() {
            return {
                infoList: [],
                // 首页任务池---最新申请入园消息
                applyParkList: [],
                isBdPark: this.utils.isBdPark(),
                LoginUserRole: this.SSH.getItem("LoginUserRol").toString(),
            }
        },
        created() {
            if (this.isBdPark) {
                this.getBdNotice();
            } else {
                this.getNoticeList();
            }

            // this.getCcbUser(); //不再需要这个接口，从本地获取当前状态

            // 管理员身份登录才调用这个方法
            if (
                this.LoginUserRole.includes("33") ||
                this.LoginUserRole.includes("34")
            ) {
                this.getApplyParkList();
            }
        },
        methods: {
            getBdNotice() {
                let parkId = sessionStorage.getItem("parkId") || "";
                this.$post("/information/getAllInformation", {
                    endDate: "",
                    pageNum: 1,
                    pageSize: 1,
                    parkId: parkId,
                    startDate: "",
                    title: "",
                    type: 2
                }).then(result => {
                    this.infoList = result.resultData.informationList; //通告数据源
                }).catch(err => {
                    this.$message.error("接口异常");
                });
            },
            //列表
            getNoticeList() {
                this.$post(this.$apiUrl.manage.getNoticeList, {
                    parkId: window.sessionStorage.getItem("parkId"),
                    flag: '0',
                    pageSize: 10,
                    pageNum: 1
                }).then(response => {
                    if (response.resultData.list.length > 0) {
                        this.infoList = response.resultData.list;
                    }
                });
            },
            /**
             * 首页任务池---最新申请入园消息
             */
            getApplyParkList() {
                this.$post(this.$apiUrl.manage.getLastApplyPark, {
                    parkId: window.sessionStorage.getItem("parkId")
                }).then(response => {
                    if (response.resultData) {
                        this.applyParkList = [];
                        if (this.isBdPark) {
                            for (let i = 0; i < response.resultData.length; i++) {
                                if (response.resultData[i].type == 1) {
                                    this.applyParkList.push(response.resultData[i])
                                }
                            }
                        }
                    }
                });
            },
            getNoticeDetail() {
                if (this.isBdPark) {
                    this.$router.push({
                        path: "/news/noticedetail",
                        query: {informationId: this.infoList[0].informationId}
                    });
                } else {
                    this.$router.push({
                        path: "/parkHall/manage/noAndADDetail",
                        query: {id: this.infoList[0].id}
                    });
                }
            },
            //校验审核状态
            cancelAudit(rows) {
                this.$router.push({
                    path: '/parkHall/manage/manageParkAuditDetail',
                    query: {entityId: rows.id, cstId: rows.cstId}
                });
            },
            goNoticeList() {
                if (this.isBdPark) {
                    this.$router.push("/news/notice");
                } else {
                    this.$router.push("/parkHall/manage/noticeAndAD");
                }
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../assets/css/mixin";

    .noticeBar {
        position: relative;
        background-size: contain;
        /*padding-top: 110px;*/
        /*padding-bottom: 16px;*/
        .noticeBox {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            width: 800px;
            padding: 5px 11px 5px 45px;
            left: 50%;
            top: -45px;
            margin-left: -400px;
            background: rgba(255, 255, 255, 0.8);
            z-index: 2;
            font-size: 14px;
            /*box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -webkit-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -moz-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -ms-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -o-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            .esspborder-radius(6px);*/
            -wekit-border-radius: 6px 6px 0px 0px;
            -moz-border-radius: 6px 6px 0px 0px;
            -ms-border-radius: 6px 6px 0px 0px;
            -o-border-radius: 6px 6px 0px 0px;
            border-radius: 6px 6px 0px 0px;
        }
        .noticeBox.lineTwo {
            top: -80px;
        }
    }

    .swiper_com {
        height: 20px;
        line-height: 20px;
        /*position: absolute;*/
        .swiper_inner {
            float: left;
            width: 80px;
            line-height: 35px;
            color: #333;
            font-size: 14px;
            overflow: hidden;
            transition: all 0.5s;
            -webkit-transition: all 0.5s;
            -moz-transition: all 0.5s;
            -ms-transition: all 0.5s;
            -o-transition: all 0.5s;
        }
        .swiper_inner1,
        .swiper_inner3 {
            float: left;
            margin-left: 90px;
            font-size: 14px;
        }
        .swiper_inner2 {
            text-align: center;
            float: left;
            width: 120px;
            color: #999;
        }
        .swiper_inner3 {
            /*text-align: center;*/
            /*width: 430px;*/
            width: 550px;
        }
        ul,
        li,
        li span {
            float: left;
        }
        ul,
        li {
            width: 100%;
            cursor: pointer;
        }
        li {
            margin-bottom: 16px;
            span {
                font-size: 14px;
                .esspellipsis();
            }
            span:nth-child(1) {
                width: 14%;
                padding-left: 2%;
                font-weight: bold;
            }
            span:nth-child(2) {
                width: 69%;
                padding-left: 2%;
            }
            span:nth-child(3) {
                width: 13%;
                text-align: right;
            }
        }
    }

    .swiper_com1 {
        margin-top: 15px;
    }

    .noAccess {
        box-shadow: 1.5px 2.6px 3px 0px rgba(0, 160, 233, 0.15),
            -1.5px -2.6px 3px 0px rgba(0, 102, 179, 0.15);
        border-radius: 6px;
        p {
            text-align: center;
            line-height: 72px;
            font-size: 18px;
            button {
                width: 140px;
                font-size: 18px;
                width: 277px;
                height: 50px;
                margin-bottom: 20px;
            }
            &.color1 {
                width: 80%;
                margin-left: 10%;
                margin-bottom: 15px;
                border-bottom: 1px solid #f5f5f5;
                color: #ccc;
                img {
                    width: 22px;
                    height: 22px;
                    position: relative;
                    top: 3px;
                    left: -4px;
                }
            }
            &:nth-of-type(2) {
                margin-top: 15px;
                color: #666;
            }
        }
    }

    .noData {
        float: left;
        margin-left: 90px;
        width: 430px;
        line-height: 35px;
        font-size: 14px;
        color: #444;
    }

    .more {
        font-size: 14px;
        color: #999;
        margin-left: 20px;
        &:hover {
            color: #00a0e9;
        }
    }
</style>
