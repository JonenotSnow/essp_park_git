<template>
    <div>
        <div v-if="parkService == '1'" class="scanOneM">
            <el-carousel indicator-position="none" height="450px" v-if="bannerDisList && bannerDisList.length>0" >
                <el-carousel-item v-for="(item,i) in bannerDisList" :key="i">
                    <img :src="item" alt="" @click="delBannerClick(item)">
                </el-carousel-item>
            </el-carousel>
            <div class="listContent">
                <div class="aside">
                    <p class="addressParkName">{{dataMap.parkNm}}</p>
                    <p class="address"><img :src="dataMap.imgUrl" alt=""></p>
                    <p class="address" style="margin-top:20px;">成立日期：
                        <span v-if="dataMap.setUpTime">{{dataMap.setUpTime.slice(0,10)}}</span>
                    </p>
                    <p class="address">联系电话：{{dataMap.parkAdminTel}}</p>
                    <p class="address">占地面积：{{dataMap.parkSize}}平方米</p>
                    <div class="addressT">
                        <span>园区地址：</span>
                        <div>{{dataMap.parkPosition}}</div>
                    </div>
                    <p class="addressBtn">
                        <span @click="toRequestAddParK">申请加入园区</span>
                    </p>
                </div>
                <div class="main displayMain">
                    <div class="moduleContent"  @click="getCurType('content')" v-for="(it,moudelIndex) in list.moduleList" :key="moudelIndex">

                        <p class="title">{{it.title}}</p>
                        <div v-html="it.content">
                        </div>
                        <div class="picList" v-if="scanImgList && scanImgList[moudelIndex] && scanImgList[moudelIndex].length > 0" >
                            <div :class="{'one':scanImgList[moudelIndex].length == 1,'two':scanImgList[moudelIndex].length == 2,'three':scanImgList[moudelIndex].length == 3}">
                                <img v-for="(is,i) in scanImgList[moudelIndex]" :key="i" :src="scanImgList[moudelIndex][i]" alt="">
                            </div>
                        </div>
                        <div class="divider" v-if="moudelIndex<list.moduleList.length-1"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="parkService == '2'" class="scanIndex">

            <div class="pic">
                <img src="../../../assets/scan_bg.png" alt="">
                <div class="middle">
                    <div>
                        <div class="logo">
                            <img :src="logoPic" alt="">
                        </div>
                        <div class="addDisplay">
                            <p>{{dataMap.parkNm}}</p>
                            <p>成立日期：<span v-if="dataMap.setUpTime">{{dataMap.setUpTime.slice(0,10)}}</span></p>
                            <p>联系电话：{{dataMap.parkAdminTel}}</p>
                            <p>占地面积：{{dataMap.parkSize}}平方米</p>
                            <p>园区地址：{{dataMap.parkPosition}}</p>
                        </div>
                    </div>
                    <div>
                        <p>点击立即申请加入园区</p>
                        <p>
                            <span @click="toRequestAddParK">申请加入园区</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="list">
                <p>
                    <i></i>
                    {{title}}
                    <i></i>
                </p>
                <div class="listC" v-for="(it,i) in list" :key="i">
                    <div class="left">
                        <img :src="it.img" alt="">
                    </div>
                    <div class="right">
                        <p class="title" style="margin-bottom: 20px">{{it.title}}</p>
                        <div class="content" v-html="it.content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from '@/components/mixins/mixins_windowOpen.js'
    export default {
        name: "",
        mixins:[mixin],
        data() {
            return {
                logoPic:'',
                list:[],
                dataMap:{},
                parkService:'',
                bannerDisList:[],
                scanImgList:[],
                title:this.utils.isBdPark()?"关于我们":"园区概览",
                ccbUser:[],
                LoginUserRole: this.SSH.getItem("LoginUserRol")?this.SSH.getItem("LoginUserRol").toString():[],
                parkId:sessionStorage.getItem("parkId")
            }
        },
        created() {
            this.getParkById();
            if (this.$route.query.id) {
                this.getPower(this.$route.query.id)
            }
        },
        methods: {
            getParkById(){
                if (this.$route.query.id) {
                    this.park = this.$route.query.id;
                }else{
                    this.park = sessionStorage.getItem("parkId");
                }
                this.$post(this.$apiUrl.manage.getParkById,{
                    parkId : this.park
                })
                .then((response) => {
                    this.dataMap = Object.assign({},response.resultData);
                    this.logoPic = this.dataMap.imgUrl;
                    this.parkService = this.dataMap.parkService;
                    if (this.parkService == '1') {
                        this.list = JSON.parse(this.dataMap.parkSet2);
                        this.bannerDisList = this.list.bannerDisList;
                        var moduleList = this.list.moduleList;
                        var arr = [];
                        moduleList.forEach(element => {
                            let brr = [];
                            if (element.isPic == '1') {
                                element.imgList.forEach((el,i) => {
                                    if (el != '') {
                                        brr.push(el);
                                    }
                                });
                            }
                            this.scanImgList.push(brr)
                        });
                    }else if(this.parkService == '2'){
                        this.list = JSON.parse(this.dataMap.parkSet);
                    }
                },(err)=>{
                    this.$message({
                        type: 'warn',
                        message: response.resultMsg
                    });
                })
            },
            toRequestAddParK(){
                let loginFlag = this.SSH.getItem("loginFlag");
                //未登录提示
                if (loginFlag == null) {
                    this.$message.error("你当前未登录，不能作此操作，请先登录");
                    this.windowHrefUrl('/userIndex/login')
                    return;
                }
                if (!(this.SSH.getItem("userInfo").cstBscInfVo) || !(this.SSH.getItem("userInfo").cstBscInfVo.cstId)){
                    this.$message.error("该账号未通过企业认证，请先通过企业认证");
                    return;
                };
                let userId = this.SSH.getItem("userInfo").id;
                let cstId = this.SSH.getItem("userInfo").cstBscInfVo.cstId;
                
                this.$post(this.$apiUrl.home.selectCstPostIdList, {
                    userId: userId,
                    cstId: cstId,
                    sysBsnAttr : '0000'
                })
                .then((response) => {
                    this.ccbUser = response.resultData;
                    if (this.ccbUser.length>0) {
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
                    }
                }, (err) => {})
                
            },
            //获取当前用户在平台的角色，用于申请入园页面权限校验
            getCcbUser() {
            },
            //邀请函跳转过来获取游客权限
            
            getPower(parkId){
                this.$post(this.$apiUrl.home.selectResMenu, {
                        'sysType':"park",
                        'sysBsnAttr':'newPark2',
                        'postIdList':['11'] //点击邀请函过来是游客
					})
					.then((response) => {
                        let parkInitPower = response.resultData.routerResMap;
                        //用于平台进入退出园区校验
                        this.SSH.setItem(parkId,response.resultData.routerResMap);

                        let loginMenuResource = this.SSH.getItem("loginMenuResource");
                        let initMenuResource = this.SSH.getItem("initMenuResource");
                        let tmpRes=response.resultData
                        if(tmpRes&& tmpRes.menuList && tmpRes.menuList[0] && tmpRes.menuList[0].children ){
                            this.SSH.setItem("menuList",tmpRes.menuList[0]);
                        }
                        let menuList = this.SSH.getItem("menuList");
                        let loginFlag = this.SSH.getItem("loginFlag");
                        let curUserAllParkPower = {};
                        if (loginFlag){
                            curUserAllParkPower = Object.assign({},loginMenuResource,parkInitPower)
                        }else{
                            curUserAllParkPower = Object.assign({},initMenuResource,parkInitPower)
                        }
                        this.SSH.setItem("menuResource",curUserAllParkPower);

                    }, (err) => {})
            },
        }
    }
</script>

<style scoped lang='less'>
.scanIndex{
    &>p{
        &:nth-of-type(1){
            width:1200px;
            margin:15px auto 9px;
            font-size: 16px;
	        color: #666666;
        }
    }
    .pic{
        margin: 0 auto;
        position:relative;
        height:180px;
        &>img{
            max-width:100%;
            position:absolute;
            height:180px;
        }
        .middle{
            width:1200px;
            margin:0 auto;
            position:relative;
            z-index:2;
            overflow: hidden;
            &>div{
                width:600px;
                float:left;
                &:nth-of-type(1){
                    padding-left:5%;
                    width:65%;
                    margin-top:15px;
                    &>div{
                        overflow: hidden;
                        &.logo{
                            float: left;
                            &>img{
                                width:150px;
                                height:150px;
                            }
                        }
                        &:nth-of-type(2){
                            margin-left:25px;
                            float: left;
                            width:590px;
                            height:150px;
                            &>p{
                                font-size: 14px;
                                line-height: 30px;
                                color: #ffffff;
                                &:nth-of-type(1){
                                    font-size: 20px;
                                    line-height: 30px;
                                    color: #ffffff;
                                }
                            }
                        }
                    }
                }
                &:nth-of-type(2){
                    margin-top:39px;
                    width:30%;
                    &>p{
                        text-align: center;
                        &:nth-of-type(1){
                            line-height:40px;
                            font-size: 18px;
                            color: #ffffff;
                        }
                        &:nth-of-type(2){
                            margin-top:10px;
                            span{
                                display:inline-block;
                                width: 149px;
                                height: 40px;
                                background-image: linear-gradient(0deg, #f5f5f5 0%, #ffffff 100%);
                                box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                                border-radius: 20px;
                                border: solid 1px #cccccc;
                                font-size: 16px;
                                line-height: 40px;
                                color: #666666;
                                cursor: pointer;
                                &:hover{
                                    background: #f2f2f2;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .list{
        width:1200px;
        margin:0 auto 20px;
        &>p{
            margin:45px auto 55px;
            text-align: center;
            font-size: 24px;
            color: #333333;
            line-height: 36px;
            color: #333333;
            text-align: center;
            i {
                display: inline-block;
                width: 80px;
                border: 1px solid #ddd;
                position: relative;
                top: -6px;
            }
        }
        .listC{
            height:420px;
            background:#fff;
            overflow: hidden;
            .left{
                float:left;
                width:600px;
                img{
                    width:600px;
                    height:420px;
                }
            }
            .right{
                overflow-y: auto;
                float:right;
                padding:20px;
                width:560px;
                &>p{
                    &.title{
                        font-size: 20px;
                        color: #444444;
                        margin: 20px 0 0;
                        padding: 0 5px;
                    }
                    &:nth-of-type(2){
                        margin-top:40px;
                    }
                    &:nth-of-type(3){
                        margin-top:20px;
                    }
                    &:not(:first-child){
                        line-height:25px;
                    }
                }
                .content{
                    width:550px;
                    overflow-y: auto;
                    height:338px;
                    padding:0 20px 0 0;
                }
            }
            &:nth-of-type(2n){
                .left{
                    float:right;
                }
                .right{
                    float:left;
                }
            }
        }

    }
}

.view_more {
    padding: 38px;
    text-align: center;
}
.scanOneM{
    margin:0 auto;
    .el-carousel img{
        height:450px;
        width:100%;
    }
    .listContent{
        width:1200px;
        margin:37px auto 50px;
        overflow: hidden;
        .aside{
            width:270px;
            float:left;
			&>div{
				margin-top:10px;
			}
            &>p.address,&>p.addressParkName{
                width:80%;
                margin-left:45px;
                font-size: 14px;
                color:#777;
                &:nth-of-type(1){
                    line-height: 30px;
                    font-size:16px;

                    color:#333;
                }
                &:nth-of-type(2){
                    margin-top:15px;
                }
                &:nth-of-type(3),
                &:nth-of-type(4),
				&:nth-of-type(5){
                    font-size: 14px;
                    line-height: 20px;
                    margin-top:10px;
                }
                img{
                    width: 150px;
                    height:150px;
                }
            }
            .addressParkName{
                font-size:16px;
                color:#333;
            }
            .addressT{
                width:80%;
                margin-left:45px;
                overflow: hidden;
                font-size: 14px;
                color:#777;
                span{
                    display: inline-block;
                    float: left;
                }
                &>div{
                    width:145px;
                    float: left;
                }
            }
            .addressBtn{
                display: inline-block;
                width: 149px;
                margin-left:48px;
                height: 40px;
                background-image: -webkit-gradient(linear, left bottom, left top, from(#f5f5f5), to(#ffffff));
                background-image: linear-gradient(0deg, #f5f5f5 0%, #ffffff 100%);
                -webkit-box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                border-radius: 20px;
                border: solid 1px #cccccc;
                font-size: 16px;
                line-height: 40px;
                color: #666666;
                text-align: center;
                margin-top: 33px;
                cursor: pointer
            }
        }
        .main{
            width:780px;
            float:right;
            .moduleContent{
                width:100%;
                margin-bottom: 42px;
                &>.title{
                    margin-bottom: 36px;
                    font-size: 16px;
                    color: #444444;
                }
                .picList{
                    width:780px;
                    margin-bottom:40px;
                    .one{
                        width:100%;
                        text-align: center;
                        margin-top:20px;
                        img{
                            width: 520px;
                            height:250px;
                            text-align: center;
                        }
                    }
                    .two{
                        width:100%;
                        margin-top:20px;
                        text-align: center;
                        overflow: hidden;
                        img{
                            width: 320px;
                            margin-left:45px;
                            height:160px;
                            float:left;
                        }
                    }
                    .three{
                        width:100%;
                        margin-top:20px;
                        text-align: center;
                        overflow: hidden;
                        img{
                            width: 240px;
                            margin-right:30px;
                            float:left;
                            height:120px;
                            &:nth-last-of-type(1){
                                margin-right:0;
                            }
                        }
                    }
                }
                &:nth-last-of-type(1){
                    &>div{
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
.divider{
    width:100%;
    height: 1px;
    /*margin:20px auto;*/
    margin-top: 40px;
    color:#ddd;
    background: #d8d8d8;
    /*border: 1px solid #d8d8d8;*/
}
</style>
