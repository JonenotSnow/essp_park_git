<template>
    <div class="indexMenu" :class="isBdPark?'':'noBackgroundImg'">
        <!--/parkHall/manage/activityPoolAddPark-->
        <!--<marquee-->
        <!--v-else-->
        <!--behavior="scroll"-->
        <!--direction="left"-->
        <!--width="430"-->
        <!--class="swiper_inner1"-->
        <!--onmouseover="this.stop()"-->
        <!--onmouseout="this.start()"-->
        <!--&gt;-->
        <!--<div-->
        <!--v-if="infoList[0] && (infoList[0].title || infoList[0].informationTitle)"-->
        <!--v-html="infoList[0].title||infoList[0].informationTitle"-->
        <!--@click="getNoticeDetail()"-->
        <!--&gt;</div>-->
        <!--</marquee>-->
        <notice-bar></notice-bar>
        <!-- 快捷菜单 -->
        <div class="row_width_auto" v-if="isBdPark">
            <el-row :gutter="0">
                <el-col
                    :span="isBdPark?'6':'8'"
                    v-for="(item,index) in menuList"
                    :key="index"
                    v-if="item.isShow"
                >
                    <div class="grid-content">
                        <img :src="item.src" alt @click.stop="linkTo(item)">
                        <p>
                            <span @click.stop="linkTo(item)">{{item.name}}</span>
                        </p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div  class="standard-menu" v-else>

            <el-carousel height="170px" indicator-position="none" arrow="always" :autoplay="false">
                <el-carousel-item v-for="(items,indexs) in menuListStandard" :key="indexs">
                    <div class="standard-menu-wrap" >
                        <div class="standard-item" v-for="(item,index) in items" :key="index">
                            <img :src="item.url" alt="" @mouseover="imgHover(item)" @mouseleave="imgOut(item)" @click="linkTo(item)">
                            <div class="name" @click="linkTo(item)">{{item.name}}</div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>

        </div>
        <el-dialog :visible.sync="showPower" width="650px" height="350px" class="noAccess">
            <p class="color1">
                <img src="./imgs/parkIndex.png" alt>请先申请加入园区
            </p>
            <p>点击申请后，系统将自动跳转至申请入驻园区详情页面</p>
            <p>
                <el-button type="primary" size="small" @click="toRequestAddParK">立即申请</el-button>
            </p>
        </el-dialog>
        <dialog-need-range :showNeedRange.sync="showNeedRange"></dialog-need-range>
    </div>
</template>

<script>
    import Moment from "moment";
    import DialogNeedRange from "@/components/DialogNeedRange";
    import mixin from "@/components/mixins/mixins_windowOpen.js";
    import EsspRoll from "@/components/EsspRoll";
    import NoticeBar from "@/views/newparkHall/home/NoticeBar";
    export default {
        components: {
            DialogNeedRange,
            EsspRoll,
            NoticeBar
        },
        mixins: [mixin],
        data() {
            return {
                showNeedRange: false,
                LoginUserRole: this.SSH.getItem("LoginUserRol"),
                isLogin: this.SSH.getItem("LoginUserRol").indexOf("11") > -1,
                isBdPark: this.utils.isBdPark(),
                showPower: false,
                menuList: [
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
                        path: "/parkHall/manage/publishSciAndTechPolicy?applyType=01",
                        src: require("@/assets/imgs/icon2.png"),
                        isShow: false,
                        query: {}
                    },
                    {
                        name: "发布资讯",
                        path: "/news/addNews",
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
                ],
                menuListStandard: [
                    [{
                        name: "发布活动",
                        path: "/parkIndex/launchForm",
                        url: require("@/assets/imgs/home/activityPublish.png"),
                        src: require("@/assets/imgs/home/activityPublish.png"),
                        srcHover: require("@/assets/imgs/home/activityPublishHover.png"),
                        isShow: true,
                        query: {}
                    },
                        {
                            name: "发布惠政",
                            path: "parkIndex/publishGover",
                            url: require("@/assets/imgs/home/servicePublish.png"),
                            src: require("@/assets/imgs/home/servicePublish.png"),
                            srcHover: require("@/assets/imgs/home/servicePublishHover.png"),
                            isShow: true,
                            query: {}
                        },
                        {
                            name: "发布资讯",
                            path: "/parkIndex/publishNewInfo",
                            url: require("@/assets/imgs/home/newsPublish.png"),
                            src: require("@/assets/imgs/home/newsPublish.png"),
                            srcHover: require("@/assets/imgs/home/newsPublishHover.png"),
                            isShow: true,
                            query: {}
                        }],
                    [{
                        name: "任务池",
                        path: "/parkHall/manage/activityPoolAddPark",
                        url: require("@/assets/imgs/home/joinAudit.png"),
                        src: require("@/assets/imgs/home/joinAudit.png"),
                        srcHover: require("@/assets/imgs/home/joinAuditHover.png"),
                        isShow: true,
                        query: {
                            type: 1
                        }
                    },
                        {
                            name: "惠政管理",
                            path: "/parkIndex/goverBene/all",
                            url: require("@/assets/imgs/home/servicePublish.png"),
                            src: require("@/assets/imgs/home/servicePublish.png"),
                            srcHover: require("@/assets/imgs/home/servicePublishHover.png"),
                            isShow: true,
                            query: {}
                        },
                        {
                            name: "成员管理",
                            path: "/parkHall/manage/userManage",
                            url: require("@/assets/imgs/home/managePeople.png"),
                            src: require("@/assets/imgs/home/managePeople.png"),
                            srcHover: require("@/assets/imgs/home/managePeopleHover.png"),
                            isShow: true,
                            query: {}
                        }]
                ],
                ccbUser: this.SSH.getItem("LoginUserRol") || [],
            };
        },
        created() {
            this.setMenuList();
            let userRol = this.SSH.getItem("LoginUserRol").indexOf("11") > -1
            console.log(this.menuListStandard)
            userRol?(this.menuListStandard=this.menuListStandard.slice(0,1)):''
            console.log(this.menuListStandard)
        },
        methods: {
            imgHover(item){
                item.url = item.srcHover
            },
            imgOut(item){
                item.url = item.src
            },
            linkToPage() {
                this.$router.push("/parkHall/manage/activityPoolAddPark");
            },
            linkTo(item) {
                // 标准版追加逻辑
                    if(!this.isBdPark && this.LoginUserRole.includes('11') && !this.SSH.getItem('loginFlag')){
                        this.$message("您尚未登陆，请您先登陆");
                        let that = this
                        setTimeout(() => {
                            that.windowHrefUrl('/userIndex/login')
                        }, 1000);
                        return false
                    }
                //——————————————————————————————
                let isInPark = !(this.SSH.getItem("LoginUserRol").indexOf("11") > -1);
                let query = isInPark
                    ? {
                        linkSrc: sessionStorage.getItem("parkId")
                    }
                    : {};
                console.log(isInPark);
                if (item.name === "需求发布") {
                    this.showNeedRange = true;
                    return false;
                }

                if (item.name === "入驻申请") {
                    if (isInPark) {
                        return this.$message("已入驻园区,请勿重复申请");
                    } else {
                        this.showPower = true;
                        return false;
                    }
                }

                //园区管理员才有任务池和入驻审核的权限
                if (item.name == "任务池" || item.name == "入驻审核") {
                    if (
                        !(
                            this.LoginUserRole.includes("33") ||
                            this.LoginUserRole.includes("34")
                        )
                    ) {
                        this.$message("只有园区管理员才有此权限");
                        return;
                    }
                    this.$router.push(item.path);
                    return;
                }
                if (item.name == "") {
                    this.$message("暂无该栏目");
                    return;
                }
                this.$router.push(item.path);
            },
            setMenuList() {
                if (this.isBdPark) {
                    if (
                        this.SSH.getItem("LoginUserRol").indexOf("33") > -1 ||
                        this.SSH.getItem("LoginUserRol").indexOf("34") > -1
                    ) {
                        this.menuList.forEach((item, index) => {
                            this.$set(this.menuList[index], "isShow", true);
                        });
                    }
                }
            },
            toRequestAddParK() {
                let loginFlag = this.SSH.getItem("loginFlag");
                //未登录提示
                if (loginFlag == null) {
                    this.$message.error("你当前未登录，不能作此操作，请先登录");
                    this.windowHrefUrl("/userIndex/login");
                    return;
                }
                if (
                    !this.SSH.getItem("userInfo").cstBscInfVo ||
                    !this.SSH.getItem("userInfo").cstBscInfVo.cstId
                ) {
                    this.$message.error("该账号未通过企业认证，请先通过企业认证");
                    return;
                }
                let userId = this.SSH.getItem("userInfo").id;
                let cstId = this.SSH.getItem("userInfo").cstBscInfVo.cstId;
                this.$post(this.$apiUrl.home.selectCstPostIdList, {
                    userId: userId,
                    cstId: cstId,
                    sysBsnAttr: "0000"
                }).then(
                    response => {
                        this.ccbUser = response.resultData;
                        if (this.ccbUser.length > 0) {
                            //如果已在该园区
                            if (
                                this.LoginUserRole.includes("31") ||
                                this.LoginUserRole.includes("32") ||
                                this.LoginUserRole.includes("33") ||
                                this.LoginUserRole.includes("34")
                            ) {
                                this.$message.error("您已加入该园区，不能做此操作");
                                return;
                            }
                            //申请入园操作需要 园区游客身份+平台企业管理员身份（11+32）
                            if (!this.ccbUser.includes("32")) {
                                this.$message.error("当前用户为平台企业管理员才能做此操作");
                                return;
                            }
                            this.$router.push("/parkHall/manage/requestAddPark");
                        }
                    },
                    err => {
                    }
                );
            },


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
    .row_width_auto {
        width: 1100px;
        margin: 0 auto;
        /*padding-top: 113px;*/
        font-size: 18px;
        color: #666;
    }
    .standard-menu{
        width: 1200px;
        height: 170px;
        margin: 0 auto;
        padding: 15px 0 60px;
        .standard-menu-wrap{
            display: flex;
            width: 930px;
            height: 160px;
            margin: 5px auto;
            box-shadow: 0 0 14.2px 0.8px
            rgba(0, 0, 0, 0.08);
            .standard-item{
                position: relative;
                width: 310px;
                height: 160px;
                // background-color: #333;
                img {
                    display: block;
                    margin: 20px auto;
                    cursor: pointer;
                    width: 80px;
                }
                .name{
                    text-align: center;
                    cursor: pointer;
                    font-size: 20px;
                    color: #333
                }
                &::before{
                    position: absolute;
                    right: 0;
                    top: 20px;
                    content: ' ';
                    height: 120px;
                    width: 1px;
                    background-color: #eeeeee
                }

            }
            &:last-child{
                &::before{
                    display: none
                }
            }
        }
    }
    .noBackgroundImg{
        background-image: none;
        // overflow: hidden;
    }
    /deep/.el-carousel__arrow:hover{

        background-color: #409EFF
    }
    
    .noAccess {	    
        border-radius: 6px;	        
        font-size: 18px;
        p {	        
            color: #666;
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
        }
        .color1 {	
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
</style>

