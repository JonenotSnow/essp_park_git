<template>
    <div class="parkList">
        <div class="parkItem parkItem1">
            <h3>您所在的生态圈</h3>
            <div class="park_list_loading" v-if="isLoding">
                <i class="el-icon-loading"></i>加载园区中~
            </div>
            <el-row :gutter="120" v-if="endLoding">
                <el-col :span="8" v-for="(item,index) in myParkList" :key="index">
                    <div class="grid_comp_logo grid_comp_logo1">
                        <div class="comp_logo" @click="linkTo(item,2)">
                            <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
                            <img v-else src="../../../assets/actlogo.png" alt="">
                        </div>
                        <p class="park_list_p">{{item.parkNm}}</p>
                        <!-- <p style="padding: 10px 0" @click="linkTo(item,1)"><el-button size="mini" round>加入园区</el-button></p>   已在园区不用此按钮-->
                        <p @click="linkTo(item,2)" class="local_address">
                            <i class="el-icon-location" style="color:#00a0e9;"></i>
                            <span v-if="item.parkPosition" :title="item.parkPosition">{{item.parkPosition}}</span>
                            <span v-else>暂时还没有地址</span>
                        </p>
                    </div>
                </el-col>
            </el-row>
            <p v-if="myParkList.length == 0 && endLoding" class="parkTip"></p>
        </div>
        <div class="parkItem">
            <div class="toolleft">
                <span class="showDefault" :class="{'showblue': type == 0}" @click="changeType(0)">园企生态圈</span>
                <span class="showDefault" :class="{'showblue': type == 1}" @click="changeType(1)">政企生态圈</span>
            </div>
            <div class="park_list_loading" v-if="isLoding">
                    <i class="el-icon-loading"></i>加载园区中~
                </div>
                <div v-if="type == 0">
                    <div class="parkCon" v-if="parkList.length > 0" :class="changeHeight?'changeHeight':''">
                        <el-row :gutter="120" v-if="endLoding">
                            <el-col :span="8" style="margin-top:20px;" v-for="(item,index) in parkList" :key="index"  >
                                <div class="grid_comp_logo">
                                    <div class="comp_logo">
                                        <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
                                        <img v-else src="../../../assets/actlogo.png" alt="">
                                    </div>
                                    <p class="park_list_p">{{item.parkNm}}</p>
                                    <div class="mask" @click="linkTo(item,1)">
                                        <p class="bg"></p>
                                        <p class="wz">{{item.parkNm}}</p>
                                    </div>
                                    <p style="padding:10px 0;">
                                        <el-button size="mini" class="join_park_btn" round @click="toApplyForm(item)">加入园区</el-button>
                                    </p>
                                    <p @click="linkTo(item,1)"  class="local_address">
                                        <i class="el-icon-location" style="color:#00a0e9;"></i>
                                        <span v-if="item.parkPosition" :title="item.parkPosition">{{item.parkPosition}}</span>
                                        <span v-else>暂时还没有地址</span>
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div v-if="type == 1">
                    <div class="parkCon" v-if="parkList.length > 0" :class="changeHeight?'changeHeight':''">
                        <el-row :gutter="120" v-if="endLoding">
                            <el-col :span="8" style="margin-top:20px;">
                                <div class="grid_comp_logo">
                                    <div class="comp_logo" @click="toGreen">
                                        <img :src="require(`../../parkHall/home/green.png`)" alt="">

                                    </div>
                                    <p class="park_list_p">绿色投融资项目库</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <p v-if="parkList.length == 0 && endLoding" class="parkTip"></p>
        </div>
        <div style="text-align: center;padding-bottom: 30px;" v-if="endLoding">
            <el-button size="mini" round v-show="!changeHeight" @click="changeHeightFn">{{btnname[0]}}</el-button>
            <el-button size="mini" round v-show="changeHeight" @click="changeHeightFn">{{btnname[1]}}</el-button>
        </div>
    </div>
</template>

<script>
    import EsspHead from "@/components/EsspHeadPark";

    export default {
        name: "",
        components: {
            EsspHead
        },
        data() {
            return {
                msg: "园区列表",
                myParkList: [],
                btnname: ["查看全部", "收起按钮"],
                parkList: [],
                changeHeight: false,
                isLoding: true,
                endLoding: false,
                LoginUserRol:[],
                parkId:'',
                parkNm:'',
                curIs:false,
                userMobile: "",
                type:0,
                ccbUser:[],
                // LoginUserRole:this.SSH.getItem("LoginUserRol")?this.SSH.getItem("LoginUserRol").toString():''
            };
        },
        created() {
            // alert("是否登陆"+this.utils.isLoginMode())
            // alert("是否游客模式"+this.utils.isVisitorMode())
            this.userName = this.SSH.getItem("userName");
            this.getParkList();
            this.getCodeType()
            this.getCcbUser()
        },
        methods: {
            changeType(type){
                this.type = type;
            },

            toGreen(){
                let vm  = this;
                if (this.SSH.getItem("userInfo")) {
                    this.userMobile = this.SSH.getItem("userInfo").mobile;
                }

                let urlTmp = "green";

                this.$post(this.$apiUrl.user.getOApath, {
                    mobile: this.userMobile,
                    urlType: urlTmp
                }).then(response => {

                    vm.OApath = response.resultData;
                    window.open(this.OApath, "_self");

                });
            },

            getParkList() {
                this.isLoding = true;
                this.$post(this.$apiUrl.home.getParkList, {
                    "channel":'PC'
                }).then(response => {
                    this.myParkList = response.resultData.myParkList;
                    this.parkList = response.resultData.parkList;
                    if (this.myParkList && this.myParkList.length>0) {
                        let myList = [];
                        myList = this.myParkList.map(x=>x.parkId);
                        sessionStorage.setItem("myList", myList);
                    }
                    setTimeout(() => {
                        this.isLoding = false;
                        this.endLoding = true;
                    }, 500);
                });
            },
            //获取行业字典并保存
			getCodeType() {
				this.$post(this.$apiUrl.manage.getIdyInfo, {
						codeType: 'RZZL_00012'
					})
					.then((response) => {
						if(response.resultData) {
							window.localStorage.setItem('rzz', JSON.stringify(response.resultData))
						}
					}, (err) => {})
            },
            getPower(parkId){
                this.$post(this.$apiUrl.home.selectResMenu, {
                        'sysType':"park",
                        'sysBsnAttr':parkId,
                        'postIdList':this.LoginUserRol
                        // 'postIdList':['31']
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
                        // menuList.forEach(el => {
                        //     if (el.name == 'parkList' && response.resultData.menuList.length>0 && response.resultData.menuList[0].children) {
                        //         el.children = response.resultData.menuList[0].children;
                        //     }else{
                        //         console.log('没有获取到权限资源');
                        //     }
                        // });
                        this.SSH.setItem("menuResource",curUserAllParkPower);

                        console.log(this.curIs)
                        if(this.curIs){
                            this.$router.push('/parkHall/manage/requestAddPark')
                        }else{
                            this.$router.push("/parkHome");
                        }

                    }, (err) => {})
            },
            linkTo(item, type) {
                this.curIs = false;
                this.$post(this.$apiUrl.home.getLoginUserRole, {
                        parkId: item.parkId,
                        flag:item.bdParkId
					})
					.then((response) => {
                        this.LoginUserRol = response.resultData;
                        if (item.bdParkId) {
                            this.parkId = item.bdParkId;
                        }else{
                            this.parkId = item.parkId;
                        }
                        this.parkNm = item.parkNm;
                        this.SSH.delItem('oldParkId')
                        ///01/09隐藏 请勿增加local维护字段 
                        // localStorage.setItem("parkId", item.parkId);
                        this.SSH.setItem("parkId", item.parkId);
                        //01/09 不要用local维护麻烦，谢谢
                        this.SSH.setItem("parkName", this.parkNm);
                        this.SSH.setItem("parkId", item.parkId);
                        //请勿用parkFLag增加多余字段去维护
                        this.SSH.setItem("bdParkId", item.bdParkId);

                        this.SSH.setItem("LoginUserRol",this.LoginUserRol);
                        this.getPower(this.parkId);

                    }, (err) => {})
            },
            changeHeightFn() {
                this.changeHeight = !this.changeHeight;
            },
            toApplyForm(item) {

                this.curIs = true;
                let loginFlag = this.SSH.getItem("loginFlag");
                //未登录提示
                if (loginFlag == null) {
                    this.$message.error("你当前未登录，不能作此操作，请先登录");
                    this.$router.push('/userIndex/login')
                    return;
                }
                //申请入园操作需要 园区游客身份+平台企业管理员身份（11+32）
                if (!this.ccbUser.includes('32')) {
                    this.$message.error("当前用户为平台企业管理员才能做此操作");
                    return;
                }
                this.SSH.delItem('oldParkId')
                this.$post(this.$apiUrl.home.getLoginUserRole, {
						parkId: item.parkId
					})
					.then((response) => {
                        this.LoginUserRol = response.resultData;
                        this.parkId = item.parkId;
                        this.parkNm = item.parkNm;
                        this.SSH.setItem("LoginUserRol",this.LoginUserRol);
                        this.SSH.setItem("parkId", item.parkId);
                        this.SSH.setItem("parkName", this.parkNm);
                        this.SSH.setItem("bdParkId", item.bdParkId);
                        this.getPower(item.parkId);
                    }, (err) => {})
            },
            getCcbUser() {
                if (!this.SSH.getItem("loginFlag"))return;
                if (!(this.SSH.getItem("userInfo").cstBscInfVo))return;
                if (!(this.SSH.getItem("userInfo").cstBscInfVo.cstId))return;
                let userId = this.SSH.getItem("userInfo").id;
                let cstId = this.SSH.getItem("userInfo").cstBscInfVo.cstId;
                this.$post(this.$apiUrl.home.selectCstPostIdList, {
                    userId: userId,
                    cstId: cstId,
                    sysBsnAttr : '0000'
                })
                .then((response) => {
                    this.ccbUser = response.resultData;
                }, (err) => {})
            }
        }
    };
</script>

<style scoped lang='less'>
    @import "../../../assets/css/mixin";

    @boxshowcolor: rgba(0, 0, 0, 0.2);
    .park_list_loading {
        text-align: center;
    }

    .parkCon {
        height: 812px;
        overflow: hidden;
    }

    .changeHeight {
        height: auto;
    }

    .parkTip {
        padding-left: 30px;
        text-align: center;
        height: 205px;
        margin: 10px 0 20px;
        background: url("no_park_list.png") no-repeat center center;
        background-size: 266px;
    }

    .parkList {
        background: #fff;
        min-height: 300px;
        .essp_width_auto();
        margin-top: 20px;
        margin-bottom: 20px;
        .join_park_btn {
            font-size: 16px;
        }
        .local_address {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            margin-bottom: 27px;
        }
        .park_list_p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 18px;
            padding:  24px 0 15px;
        }
        .grid_comp_logo {
            position: relative;
            width: 220px;
            margin: 0 auto;
            /*padding: 5px;*/
            /*border: 1px solid #eee;*/
            cursor: pointer;
            /*height: 280px;*/
            position:relative;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            &>p {
                text-align: center;
            }

            &>.mask{
                position: absolute;
                top:5px;
                left: 5px;
                width:95%;
                height:208px;
                line-height:208px;
                text-align: center;
                z-index: 90;
                overflow: hidden;
                display:none;
                &>.bg{
                    position: absolute;
                    top:0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    opacity: 0.6;
                    z-index: 100;
                }
                &>.wz{
                    position: absolute;
                    top: 0;
                    left: 55px;
                    z-index: 101;
                    left: 10px;
                    width: 170px;
                    color:#fff;
                    text-align: center;
                }
            }
        }
        .grid_comp_logo1:hover .comp_logo,
        .grid_comp_logo1 .comp_logo.sel {
            -webkit-box-shadow: 0 0 8px 1px @boxshowcolor;
            -moz-box-shadow: 0 0 8px 1px @boxshowcolor;
            -ms-box-shadow: 0 0 8px 1px @boxshowcolor;
            -o-box-shadow: 0 0 8px 1px @boxshowcolor;
            box-shadow: 0 0 8px 1px @boxshowcolor;

            -webkit-transform: scale(1.02);
            -moz-transform: scale(1.02);
            -ms-transform: scale(1.02);
            transform: scale(1.02);

            transition: all 0.6s;
            -webkit-transition: all 0.6s;
            -moz-transition: all 0.6s;
            -ms-transition: all 0.6s;
        }
        .grid_comp_logo:hover,
        .grid_comp_logo.sel {
            // box-shadow: 3px 0px 3px 0px @boxshowcolor, -3px 0px 3px 0px @boxshowcolor;
            // -webkit-box-shadow: 3px 0px 3px 0px @boxshowcolor,
            // -3px 0px 3px 0px @boxshowcolor;
            // -moz-box-shadow: 3px 0px 3px 0px @boxshowcolor,
            // -3px 0px 3px 0px @boxshowcolor;
            // -ms-box-shadow: 3px 0px 3px 0px @boxshowcolor,
            // -3px 0px 3px 0px @boxshowcolor;
            &>.mask{
                display: block;
            }
        }
        .parkItem1 {
            border-bottom: 1px solid #eee;
        }
        .parkItem {
            padding: 50px 100px 0;

            .comp_logo {
                width: 208px;
                height: 208px;
                padding: 5px;
                overflow: hidden;
                border: 1px solid #eee;
                img {
                    display: block;
                    width: 100%;
                    min-height: 208px;
                }
            }

            h3 {
                margin-bottom: 50px;
                padding-left: 28px;
                font-family: "Microsoft YaHei";
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 0px;
                color: #333333;
            }
        }
    }
    .showDefault{
        cursor: pointer;
        margin-bottom: 50px;
        padding-left: 28px;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0px;
        color: #333333;
    }
    .showblue {
        color: #00a0e9 !important;
    }
</style>
