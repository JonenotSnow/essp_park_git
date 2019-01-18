<template>
    <div class="wrapper">
        <div class="content">
            <!--咨询，需求模块-->
            <div class="rqm">
                <div class="rqm-title">中心热门需求</div>
                <div class="rqm-pagination auto">
                    <div class="rqm-item">面向全国，免费发布，智能撮合</div>

                    <div class="rqm-detail">
                        <div class="esspclearfix" v-if="hotRqmList.length">
                            <div class="news-2 pointer" v-for="(item,index) in hotRqmList" :key="index">
                                <div class="rqm-top">
                                    <img class="top-img" :src="getPath(item)">
                                    <span
                                        class="top-txt"
                                        :id="item.bsnRqmId"
                                        @click.stop="toDetailrqm(item)"
                                    >{{item.prjNm}}</span>
                                    <div class="top-right" @click.stop="focus(item,index)">
                                        <div v-if="item.fcsFlage == '1'" class="top-right-content">
                                            <img src="@/assets/imgs/requirehall/icon_like_red.png">
                                            <span class="right-center">已关注</span>
                                        </div>
                                        <div v-else class="top-right-content">
                                            <img src="@/assets/imgs/searchpage/icon_like.png">
                                            <span class="right-center">关注</span>
                                        </div>
                                        <span>(</span>
                                        <span>{{item.fcsNm}}</span>
                                        <span>已关注)</span>
                                    </div>
                                </div>
                                <div class="rqm-bottom">
                                    <div class="bottom-item">
                                        <span>所在地:</span>
                                        <span>{{item.areaName}}</span>
                                    </div>
                                    <div class="bottom-item mag-1">
                                        <span>发布时间:</span>
                                        <span>{{item.ancDtStr}}</span>
                                    </div>
                                    <div class="bottom-item mag-2">
                                        <div class="item-num">
                                            <img class="num-img" src="@/assets/imgs/usercenter/icon_view.png">
                                            <span class="num-txt">{{item.clckNm}}</span>
                                        </div>
                                        <div class="item-num">
                                            <img class="num-img" src="@/assets/imgs/usercenter/icon_like_off.png">
                                            <span class="num-txt">{{item.fcsNm}}</span>
                                        </div>
                                        <!--<div class="item-num">-->
                                        <!--<img class="num-img" src="@/assets/imgs/usercenter/icon_comment.png">-->
                                        <!--<span class="num-txt">{{item.clckNm}}</span>-->
                                        <!--</div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nothing" v-else>
                            <img src="../../../assets/newparkimg/home/noting.png" alt>
                            <span class="tipspan">暂无中心热门需求</span>
                        </div>
                        <div class="refresh">
                            <div class="ref-content">
                                <img class="ref-img" src="@/assets/imgs/home/refresh.png">
                                <span class="ref-txt" @click="getHotRqm">换一批</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixin from '@/components/mixins/mixins_windowOpen.js'
    export default {
        mixins:[mixin],
        data: () => ({
            hotRqmList: [],
            pageNum: 1,
            pageSize: 6,
            userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
            codeMap: {
                "01": require("@/assets/imgs/requimgs/provider.png"),
                "02": require("@/assets/imgs/requimgs/demander.png"),
                "03": require("@/assets/imgs/requimgs/buyer.png"),
                "04": require("@/assets/imgs/requimgs/seller.png"),
                "05": require("@/assets/imgs/requimgs/society.png"),
                "06": require("@/assets/imgs/requimgs/govern.png"),
                "07": require("@/assets/imgs/requimgs/tenant.png"),
                "08": require("@/assets/imgs/requimgs/rent.png"),
                "09": require("@/assets/imgs/requimgs/financing.png"),
                "10": require("@/assets/imgs/requimgs/investor.png"),
                "11": require("@/assets/imgs/requimgs/financing.png"),
                "12": require("@/assets/imgs/requimgs/investor.png"),
                "13": require("@/assets/imgs/requimgs/energy_serve.png"),
                "14": require("@/assets/imgs/requimgs/energy_use.png"),
                "15": require("@/assets/imgs/requimgs/recommend.png"),
                "16": require("@/assets/imgs/requimgs/investor.png"),
                "17": require("@/assets/imgs/requimgs/demand.png"),
                "18": require("@/assets/imgs/requimgs/provide.png"),
                "19": require("@/assets/imgs/requimgs/buyer.png"),
                "20": require("@/assets/imgs/requimgs/seller.png"),
                "21": require("@/assets/imgs/requimgs/iPublish.png"),
                "22": require("@/assets/imgs/requimgs/partner.png"),
                "23": require("@/assets/imgs/requimgs/demand.png"),
                "24": require("@/assets/imgs/requimgs/investor.png"),
                "25": require("@/assets/imgs/requimgs/provider.png"),
                "26": require("@/assets/imgs/requimgs/demander.png")
            },
            maxNum: 1,
            isClick: true //判断是否可点击需求关注
        }),
        methods: {
            getList(type, pageNum, pageSize) {
                let parkId = this.SSH.getItem("parkId");
                this.$post(this.$apiUrl.home.getHotRqm, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    linkSrc: parkId
                }).then(res => {
                    this.hotRqmList = [];
                    var tmpArr = res.resultData;
                    if (tmpArr && tmpArr.length > 0) {
                        this.maxNum = tmpArr[0].total;
                        this.hotRqmList.push(...tmpArr);
                    }
                });
            },

            getPath(item) {
                let path = this.codeMap[item.rqmRole];
                return path;
            },
            getHotRqm() {
                var maxPage = Math.ceil(this.maxNum/this.pageSize);
                if( maxPage > 1) {
                    this.pageNum++;
                    if(this.pageNum > maxPage) {
                        this.pageNum = 1;
                    }
                    this.getList();
                }
            },
            toDetailrqm(val) {
                let displayUrl = "";
                let usrid = "";

                if (!this.utils.isEmpty(this.userInfo)) {
                    this.$post("/requirement/requirement_other_detail_head", {
                        bsnId: val.bsnRqmId
                    }).then(response => {
                        if (response.resultCode === "CLT000000000") {
                            usrid = response.resultData.param.usrid;
                            if (
                                !this.utils.isEmpty(this.userInfo.id) &&
                                !this.utils.isEmpty(usrid)
                            ) {
                                if (this.userInfo.id == usrid) {
                                    displayUrl = "/requIndex/display-own";
                                } else {
                                    displayUrl = "/requIndex/display-other";
                                }
                                //标签页打开页面
                                // let routerData = this.$router.resolve({
                                //     path: displayUrl,
                                //     query: {
                                //         bsnRqmId: val.bsnRqmId,
                                //         tplId: val.tplId
                                //     }
                                // });
                                // window.open(routerData.href, "_blank");
                                let pramas = val.bsnRqmId?'?bsnRqmId='+val.bsnRqmId:''
                                pramas += val.tplId?'&tplId='+val.tplId:''
                                this.windowOpenUrl(displayUrl,pramas)
                            } else {
                                displayUrl = "/requIndex/display-other";
                                //标签页打开页面
                                // let routerData = this.$router.resolve({
                                //     path: displayUrl,
                                //     query: {
                                //         bsnRqmId: val.bsnRqmId,
                                //         tplId: val.tplId
                                //     }
                                // });
                                // window.open(routerData.href, "_blank");
                                let pramas = val.bsnRqmId?'?bsnRqmId='+val.bsnRqmId:''
                                pramas += val.tplId?'&tplId='+val.tplId:''
                                this.windowOpenUrl(displayUrl,pramas)
                            }
                        }
                    });
                } else {
                    displayUrl = "/requIndex/display-other";
                    //标签页打开页面
                    // let routerData = this.$router.resolve({
                    //     path: displayUrl,
                    //     query: {
                    //         bsnRqmId: val.bsnRqmId,
                    //         tplId: val.tplId
                    //     }
                    // });
                    // window.open(routerData.href, "_blank");
                    let pramas = val.bsnRqmId?'?bsnRqmId='+val.bsnRqmId:''
                                pramas += val.tplId?'&tplId='+val.tplId:''
                                this.windowOpenUrl(displayUrl,pramas)
                }
            },
            focus(item, index) {

                if (this.utils.isEmpty(this.userInfo)) {
                    return this.$message.info("请先登陆");
                }
                let msg = '是否取消关注'
                if (!this.isClick) {
                    return false
                }
                this.isClick = false
                if (item.fcsFlage == '0') {
                    this.$post("/myfocus/focusClick", {
                        bsnRqmId: item.bsnRqmId,
                        fcsStInd: item.fcsFlage,
                        fcsTp: "2"
                    }).then(res => {
                        item.fcsFlage = res.resultData.fcsStInd;
                        item.fcsNm = res.resultData.focusNum;
                        this.$set(this.hotRqmList, index, item);
                        this.isClick = true
                    });
                } else {
                    this.$confirm(msg, "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(res => {
                        this.$post("/myfocus/focusClick", {
                            bsnRqmId: item.bsnRqmId,
                            fcsStInd: item.fcsFlage,
                            fcsTp: "2"
                        }).then(res => {
                            item.fcsFlage = res.resultData.fcsStInd;
                            item.fcsNm = res.resultData.focusNum;
                            this.$set(this.hotRqmList, index, item);
                            this.isClick = true
                        });
                    }).catch(error => {
                        console.log(1)
                        this.isClick = true
                    });
                }

            }
        },
        created() {
            this.getList();
        }
    };
</script>

<style lang="less" scoped>
    .wrapper {
        width: 100%;
        height: 760px;
        background-color: #fff;
        background-image: url("../../../assets/imgs/newHome/homebg3.png");
        background-position: center bottom;
        background-repeat: no-repeat;

        .content {
            width: 1200px;
            margin: 0 auto;
            .rqm {
                width: 100%;
                position: relative;
                .rqm-title {
                    text-align: center;
                    width: 100%;
                    font-size: 28px;
                    color: #333333;
                    padding: 25px 0 26px;
                }
                .rqm-pagination {
                    position: relative;
                    text-align: center;
                    .rqm-item {
                        display: inline-block;
                        font-size: 16px;
                        color: #999999;
                    }
                    .left {
                        padding-right: 16px;
                    }
                    .right {
                        padding-left: 20px;
                        border-left: 1px solid #666666;
                    }
                    .active {
                        color: #26a4fa;
                    }
                    .rqm-detail {
                        margin-top: 53px;
                        .nothing {
                            position: relative;
                            margin: 0 auto;
                            width: 500px;
                            height: 316px;
                            .tipspan {
                                position: absolute;
                                bottom: 60%;
                                left: 34%;
                                font-size: 18px;
                                color: #999;
                            }
                            img {
                                display: block;
                                outline: none;
                                width: 418px;
                                height: 316px;
                                margin: 0 auto;
                            }
                        }
                        .news-2 {
                            margin-bottom: 17px;
                            text-align: left;
                            margin-left: 59px;
                            width: 1111px;
                            box-sizing: border-box;
                            border-bottom: 1px solid #e4e4e4;
                            &:hover {
                                cursor: pointer;
                            }
                            .rqm-top {
                                width: 100%;
                                .top-img {
                                    float: left;
                                    margin-top: 2px;
                                }
                                .top-txt {
                                    margin-left: 9px;
                                    font-size: 20px;
                                    color: #000000;
                                    cursor: pointer;
                                    &:hover {
                                        color: #0e9dff;
                                    }
                                }
                                .top-right {
                                    float: right;
                                    font-size: 14px;
                                    color: #999999;
                                    cursor: pointer;
                                    .top-right-content {
                                        float: left;
                                        img {
                                            float: left;
                                            margin-top: 2px;
                                        }
                                        .right-center {
                                            margin: 0 10px;
                                        }
                                    }
                                }
                            }
                            .rqm-bottom {
                                margin: 8px 0 12px 0;
                                font-size: 16px;
                                width: 100%;
                                .bottom-item {
                                    display: inline-block;
                                    font-size: 16px;
                                    color: #888888;
                                    .item-num {
                                        display: inline-block;
                                        margin-left: 22px;
                                        .num-img {
                                            float: left;
                                            margin-top: 2px;
                                        }
                                        .num-txt {
                                            margin-left: 8px;
                                        }
                                    }
                                }
                                .mag-1 {
                                    margin-left: 54px;
                                }
                                .mag-2 {
                                    margin-left: 26px;
                                }
                            }
                        }
                        .refresh {
                            position: relative;
                            margin: 28px 0 37px;
                            .ref-content {
                                display: inline-block;
                                .ref-img {
                                    float: left;
                                    margin-top: 2px;
                                }
                                .ref-txt {
                                    margin-left: 6px;
                                    font-size: 16px;
                                    color: #999999;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .scroll-box {
                        width: 1200px;
                        height: 500px;
                        margin: 20px auto;
                        overflow: hidden;
                        ul {
                            list-style: none;
                            width: 100%;
                            height: 100%;
                            li {
                                height: 40px;
                                line-height: 40px;
                                span {
                                    // font-family: PingFangSC-Light;
                                    font-size: 18px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #333333;
                                }
                                .perbsop-arrow {
                                    width: 20px;
                                    display: inline-block;
                                    vertical-align: sub;
                                    margin-left: 60px;
                                    height: 20px;
                                    background: url("../../../assets/imgs/home/perbsop-arrow.png");
                                    // background-color: #ffffff;
                                }
                            }
                            li:hover {
                                // color:#ff0000;
                                height: 40px;
                                line-height: 40px;
                                background-color: #0e9dff;
                                width: 1100px;
                                margin: 0 auto;
                                box-shadow: 0px 8px 19.8px 0.2px rgba(0, 0, 0, 0.12);
                                span {
                                    // font-family: PingFangSC-Light;
                                    font-size: 18px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #ffffff;
                                }
                            }
                        }
                        .notice {
                            .notice-content {
                                margin-top: 66px;
                                .notice-img {
                                    width: 260px;
                                    height: 197px;
                                    margin: 0 auto;
                                    background: url("../../../assets/imgs/home/per-bus.png");
                                }
                                .notice-p1 {
                                    font-size: 20px;
                                    color: #2374fe;
                                    margin-top: 40px;
                                }
                                .notice-p2 {
                                    font-size: 16px;
                                    letter-spacing: 0.4px;
                                    color: #999999;
                                    margin-top: 16px;
                                }
                                .btn {
                                    width: 140px !important;
                                    height: 38px !important;
                                    margin-top: 57px;
                                }
                            }
                            .no-content-notice {
                                margin-top: 66px;
                                .no-content-img {
                                    width: 246px;
                                    height: 164px;
                                    margin: 0 auto;
                                    background-repeat: no-repeat;
                                    background: url("../../../assets/imgs/home/no-content-notice.png");
                                }
                                .no-content-p {
                                    font-size: 16px;
                                    letter-spacing: 0.4px;
                                    color: #999999;
                                    text-align: center;
                                    margin-top: 16px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
