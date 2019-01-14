<template>
    <div class="indexMenu">
        <!--/parkHall/manage/activityPoolAddPark-->
        <!--  公告快捷入口的模块-->
        <div class="noticeBox">
            <div class="swiper_com esspclearfix">
                <div class="swiper_inner">通知公告：</div>
                <div v-if="infoList.length>0">
                    <div
                        v-if="infoList[0].title && infoList[0].title.length<28"
                        class="swiper_inner3"
                        v-html="infoList[0].title"
                        @click="$router.push({path:'/parkHall/manage/noAndADDetail',query:{id:infoList[0].id}})"
                    ></div>
                    <marquee
                        v-else
                        behavior="scroll"
                        direction="left"
                        width="430"
                        class="swiper_inner1"
                        onmouseover="this.stop()"
                        onmouseout="this.start()"
                    >
                        <div
                            v-if="infoList[0] && infoList[0].title"
                            v-html="infoList[0].title"
                            @click="$router.push({path:'/parkHall/manage/noAndADDetail',query:{id:infoList[0].id}})"
                        ></div>
                    </marquee>
                    <div class="swiper_inner2" v-if="infoList && infoList[0].createTime">
                        {{infoList[0].createTime | timerFormat}}
                    </div>
                    <span
                        class="more"
                        v-if="LoginUserRole.includes('33') || LoginUserRole.includes('34')"
                        @click="$router.push('/parkHall/manage/noticeAndAD')"
                    >More&gt;</span>
                </div>
                <div v-else class="noData">暂无通知通告~~</div>
            </div>
            <!-- 有新入园通知 -->
            <div class="swiper_com swiper_com1 esspclearfix"
                 v-if="LoginUserRole.includes('33') || LoginUserRole.includes('34')">
                <div class="swiper_inner">任务池：</div>
                <div class="esspclearfix" v-if="lastApplyParkFlag">
                    <div class="swiper_inner3" @click="cancelAudit(lastApplyPark.id)">{{lastApplyPark.cstNm}}申请入园</div>
                    <div class="swiper_inner2"> {{lastApplyPark.joinTime | timerFormat}}</div>
                    <span
                        class="more"
                        v-if="LoginUserRole.includes('33') || LoginUserRole.includes('34')"
                        @click="linkToPage"
                    >More&gt;</span>
                </div>
                <div class="noData" v-else>您当前暂无要处理入园申请~~</div>
            </div>

        </div>
        <!-- 快捷菜单 -->
        <div class="row_width_auto">
            <el-row :gutter="0">
                <el-col
                    :span="isBdPark?'6':'8'"
                    v-for="(item,index) in menuList"
                    :key="index"
                    v-if="item.isShow"
                >
                    <div class="grid-content">
                        <img :src="item.src" alt="" @click.stop="linkTo(item)">
                        <p><span @click.stop="linkTo(item)">{{item.name}}</span></p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog :visible.sync="showPower" width="650px" height="350px" class="noAccess">
            <p class="color1">
                <img src="./imgs/parkIndex.png" alt>请先申请加入园区
            </p>
            <p>点击申请后，系统将自动跳转至申请入驻园区详情页面</p>
            <p>
                <el-button
                    type="primary"
                    size="small"
                    @click="toRequestAddParK"
                >立即申请
                </el-button>
            </p>
        </el-dialog>
        <dialog-need-range :showNeedRange.sync="showNeedRange"></dialog-need-range>
    </div>
</template>

<script>
    import Moment from "moment";
    import DialogNeedRange from '@/components/DialogNeedRange'
    export default {
        components:{
            DialogNeedRange
        },
        data() {
            return {
                showNeedRange:false,
                infoList: [],
                isBdPark: this.utils.isBdPark(),
                showPower: false,
                menuList: [
                    {
                        name: "发布活动",
                        path: "/parkIndex/launchForm",
                        src: require("@/assets/imgs/icon1.png"),
                        isShow: true,
                        query: {}
                    },
                    {
                        name: "发布惠政",
                        path: "parkIndex/publishGover",
                        src: require("@/assets/imgs/icon2.png"),
                        isShow: true,
                        query: {}
                    },
                    {
                        name: "发布资讯",
                        path: "/parkIndex/publishNewInfo",
                        src: require("@/assets/imgs/icon3.png"),
                        isShow: true,
                        query: {}
                    },
                    {
                        name: "任务池",
                        path: "/parkHall/manage/activityPoolAddPark",
                        src: require("@/assets/imgs/icon4.png"),
                        isShow: true,
                        query: {
                            type: 1
                        }
                    },
                    {
                        name: "惠政管理",
                        path: "/parkIndex/goverBene/all",
                        src: require("@/assets/imgs/icon5.png"),
                        isShow: true,
                        query: {}
                    },
                    {
                        name: "成员管理",
                        path: "/parkHall/manage/userManage",
                        src: require("@/assets/imgs/icon6.png"),
                        isShow: true,
                        query: {}
                    }
                ],
                LoginUserRole: this.SSH.getItem("LoginUserRol").toString(),
                ccbUser:this.SSH.getItem('LoginUserRol') || [],

                // 首页任务池---最新申请入园消息
                lastApplyPark: {},
                lastApplyParkFlag: false
            };
        },
        created() {
            this.getNoticeList();
            // this.getCcbUser();

            // 管理员身份登录才调用这个方法
            if (this.LoginUserRole.includes('33') || this.LoginUserRole.includes('34')) {
                this.getLastApplyPark();
            }
        },
        methods: {
            linkToPage(){
                this.$router.push('/parkHall/manage/activityPoolAddPark')
            },
            // 点击任务池标题获取该审核权限
            cancelAudit(id){
                this.$post(this.$apiUrl.manage.auditCancer,{
                    entityId:id,
                    type:'01',
                    status : '01'
                })
                    .then((response) => {
                        if (response.resultCode == 'CLT000000000') {
                            this.$router.push({path:'/parkHall/manage/manageAuditing',query:{id:id}})
                        } else {
                            this.$message.error(response.resultMsg);
                        }
                    },(response)=>{
                        this.$message.error(response.resultMsg);
                    })
            },
            linkTo(item) {
                let ctData = JSON.parse(sessionStorage.getItem("ctData"));
                let isInPark = this.SSH.getItem("LoginUserRol").indexOf("11") > -1;
                let query = !isInPark ? {
                    linkSrc: sessionStorage.getItem("parkId")
                } : {}
                console.log(isInPark);
                if (item.name === "需求发布") {
                    this.showNeedRange =true
                    return false;
                }

                if (item.name === "入驻申请") {
                    this.showPower = true;
                    return false;
                }

                if (item.path == "") {
                    this.$message("暂无该栏目");
                    return;
                }
                this.$router.push(item.path);
            },
            //列表
            getNoticeList() {
                this.$post(this.$apiUrl.manage.getNoticeList, {
                    parkId: window.sessionStorage.getItem("parkId"),
                    pageSize: 10,
                    pageNum: 1
                }).then(response => {
                    if (response.resultData.list.length > 0) {
                        this.infoList = response.resultData.list;
                    }
                });
                if (this.isBdPark) {
                    this.menuList = [
                        {
                            name: "关于我们",
                            path: "/parkIndex/scanIndex",
                            src: require("@/assets/newparkimg/home/img0.png"),
                            isShow: true,
                            query: {}
                        },
                        {
                            name: "入驻申请",
                            path: "/parkHall/manage/requestAddPark",
                            src: require("@/assets/imgs/icon5.png"),
                            isShow: true,
                            query: {}
                        },
                        {
                            name: "需求发布",
                            path: "/requIndex/publish",
                            src: require("@/assets/newparkimg/home/img2.png"),
                            isShow: true,
                            query: {}
                        },
                        {
                            name: "普惠金融",
                            path: "/parkHall/manage/inclusiveFinance",
                            src: require("@/assets/imgs/icon6.png"),
                            isShow: true,
                            query: {}
                        },
                        {
                            name: "入驻审核",
                            path: "/parkHall/manage/activityPoolAddPark",
                            src: require("@/assets/imgs/icon4.png"),
                            isShow: false,
                            query: {
                                type: 1
                            }
                        },
                        {
                            name: "发布政策",
                            path: "parkIndex/publishGover",
                            src: require("@/assets/imgs/icon2.png"),
                            isShow: false,
                            query: {}
                        },
                        {
                            name: "发布资讯",
                            path: "/parkIndex/publishNewInfo",
                            src: require("@/assets/imgs/icon3.png"),
                            isShow: false,
                            query: {}
                        },
                        {
                            name: "发布活动",
                            path: "/parkIndex/launchForm",
                            src: require("@/assets/imgs/icon1.png"),
                            isShow: false,
                            query: {}
                        }
                    ];
                    console.log(this.SSH.getItem("LoginUserRol"))
                    if (
                        this.SSH.getItem("LoginUserRol").indexOf("33") > -1 ||
                        this.SSH.getItem("LoginUserRol").indexOf("34") > -1
                    ) {
                        this.menuList.forEach((item, index) => {
                            this.$set(this.menuList[index], 'isShow', true)
                        });
                        console.log(this.menuList)
                    }
                }
            },

            /**
             * 首页任务池---最新申请入园消息
             */
            getLastApplyPark() {
                this.$post(this.$apiUrl.manage.getLastApplyPark, {
                    parkId: window.sessionStorage.getItem("parkId"),
                }).then(response => {
                    if (response.resultData) {
                        this.lastApplyPark = response.resultData;
                        if (this.lastApplyPark.cstNm && this.lastApplyPark.joinTime) {
                            this.lastApplyParkFlag = true;
                        }
                    }
                });
            },
            toRequestAddParK() {
                //如果已在该园区
                if (this.LoginUserRole.includes('31') || this.LoginUserRole.includes('32')
                    || this.LoginUserRole.includes('33') || this.LoginUserRole.includes('34')) {
                    this.$message.error("您已加入该园区，不能做此操作");
                    return;
                }
                //申请入园操作需要 园区游客身份+平台企业管理员身份（11+32）
                if (!this.ccbUser.includes('32')) {
                    this.$message.error("当前用户为平台企业管理员才能做此操作");
                    return;
                }
                this.$router.push('/parkHall/manage/requestAddPark');
            },
            //获取当前用户在平台的角色，用于申请入园页面权限校验
            getCcbUser() {
                if (!this.SSH.getItem("loginFlag")) return;
                if (!(this.SSH.getItem("userInfo").cstBscInfVo)) return;
                if (!(this.SSH.getItem("userInfo").cstBscInfVo.cstId)) return;
                let userId = this.SSH.getItem("userInfo").id;
                let cstId = this.SSH.getItem("userInfo").cstBscInfVo.cstId;
                this.$post(this.$apiUrl.home.selectCstPostIdList, {
                    userId: userId,
                    cstId: cstId,
                    sysBsnAttr: '0000'
                })
                    .then((response) => {
                        this.ccbUser = response.resultData;
                    }, (err) => {
                    })
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        }
    };
</script>
<style lang="less" scoped>
    @import "../../../assets/css/mixin";

    .indexMenu {
        position: relative;
        background: #fff url("../../../assets/imgs/ar-background.png") no-repeat center bottom;
        background-size: contain;
        /*padding-top: 110px;*/
        /*padding-bottom: 16px;*/
        .noticeBox {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            width: 800px;
            padding: 30px 11px 30px 45px;
            left: 50%;
            top: -30px;
            margin-left: -400px;
            background: #fff;
            z-index: 2;
            box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -webkit-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -moz-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -ms-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            -o-box-shadow: 2.5px 4.3px 4.8px 0.2px rgba(0, 0, 0, 0.2);
            .esspborder-radius(6px);
        }

        .grid-content {
            padding-bottom: 55px;
            img {
                display: block;
                margin: 0 auto;
                width: 130px;
                cursor: pointer;
            }
            p {
                margin: 30px auto 0;
                text-align: center;
                span {
                    display: inline-block;
                    cursor: pointer;
                }
            }
        }
    }

    .swiper_com {
        height: 20px;
        line-height: 20px;
        /*position: absolute;*/
        .swiper_inner {
            float: left;
            width: 80px;
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
            /*font-size: 16px;*/
        }
        .swiper_inner2 {
            text-align: center;
            float: left;
            width: 120px;
            color: #999;
        }
        .swiper_inner3 {
            /*text-align: center;*/
            width: 430px;
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

    .row_width_auto {
        width: 1100px;
        margin: 0 auto;
        font-size: 18px;
        color: #666;
    }

    .noData {
        float: left;
        margin-left: 90px;
        width: 430px;
        font-size: 16px;
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

