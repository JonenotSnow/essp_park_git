<template>
  <div class="actauditpage" id="manageActivityAudit">
    <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
    <div class="common_titwrap">
      <p class='Otitle'>活动发布审核</p>
      <div class="k1">
        <div class="title">
          <h3 class="common_tit_des">基本信息</h3>
        </div>
        <div class="contentList">
          <p>
            <span>活动主题：</span>
            <span>{{activeDetailData.activityTheme}}</span>
          </p>
          <p>
            <span>活动类别：</span>
            <span v-if="activeDetailData.activityType == it.type" v-for="(it,i) in typeList" :key="i">{{it.name}}</span>
          </p>
          <p>
            <span>活动开始时间：</span>
            <span>{{activeDetailData.activityStarttime}}</span>
          </p>
          <p>
            <span>活动天数：</span>
            <span>{{activeDetailData.activityDays}}</span>
          </p>
          <p>
            <span>活动地点：</span>
            <span>{{activeDetailData.activityPlace}}</span>
          </p>
          <p>
            <span>是否收费：</span>
            <span>{{activeDetailData.isCharge == 1 ? '是' : '否'}}</span>
          </p>
          <p v-if="activeDetailData.isCharge==1">
            <span>收费说明：</span>
            <span>{{activeDetailData.chargeInfo}}</span>
          </p>
          <p>
            <span>报名是否需审核：</span>
            <span>{{activeDetailData.enterNeedAudit == 0 ? '否' : '是'}}</span>
          </p>
          <p>
            <span style="float: left">活动详情：</span>
            <span style="border: none; padding:0;" class="ql-editor" v-html="activeDetailData.activityDetails"></span>
          </p>
          <p class="esspclearfix">
            <span style="float: left">活动宣传图/海报：</span>
            <img style="float: left;width: 245px;" :src="activeDetailData.activityPhoto" alt="">
          </p>
          <p>
            <span>活动标签：</span>
            <span>{{activeDetailData.activityLabel || "无"}}</span>
          </p>
          <p>
            <span>发起单位：</span>
            <span>{{activeDetailData.initiateUnits}}</span>
          </p>
          <p v-if="activeDetailData.cstNam">
            <span>发布方：</span>
            <span>{{activeDetailData.cstName}}</span>
          </p>
        </div>
      </div>
      <div class="k1">
        <div class="title">
          <h3 class="common_tit_des">报名表设置</h3>
        </div>
        <p class="radioBtn">
          <el-radio v-model="radio" disabled label="0">个人实名分页申报</el-radio>
          <el-radio v-model="radio" disabled label="1">企业实名分页申报</el-radio>
        </p>
        <div class="contentList1">
          <div v-for=" (item,index)  in formRqList" :key="index">
            <p>
              <i v-if="item.requir">*</i>
              <span>{{item.name}}：</span>
            </p>
            <p><input type="text" v-model="item.tittext" disabled></p>
            <!-- <input type="text" disabled> -->
          </div>
        </div>
      </div>
      <div class="k2">
        <div class="title">
          <h3 class="common_tit_des">其他设置</h3>
        </div>
        <p class="infoTitle">票务信息：</p>
        <ul class="tickInfo">
          <li>
            <span>票种名称</span>
            <span>价格</span>
            <span>数量</span>
            <span>操作</span>
          </li>
          <li v-for="item in items" :key="item.ticketType">
            <span>{{item.ticketType}}</span>
            <span>￥{{item.ticketPirce}}</span>
            <span>{{item.ticketNum}}</span>
            <span>
              <i class="el-icon-delete" style="color:#ddd;"></i>
            </span>
          </li>
        </ul>
        <div class="contentList2">
          <p>
            <span>活动开放范围：</span>
            <span>{{activeDetailData.openScope | openStatus(activeDetailData.openScope)}}</span>
          </p>
          <p>
            <span>报名人数上限：</span>
            <span>{{numberToplimit}}</span>
          </p>
          <p>
            <span>报名开始时间：</span>
            <span>{{activeDetailData.enterStarttime}}</span>
          </p>
          <p>
            <span>报名截止时间：</span>
            <span>{{activeDetailData.enterEndtime}}</span>
          </p>
          <!--<p>-->
          <!--<span>邀请对象：</span>-->
          <!--<span>xxxxxxxxxxx</span>-->
          <!--</p>-->
        </div>
      </div>
      <hr>
      <p class="submitMark">
        <span>提交审核备注：</span>
        <span>{{activeDetailData.activityRemarks || "无"}}</span>
      </p>
      <p class="markReason esspclearfix">
        <span>
          <i style="color: red;margin-right: 5px;">*</i>审核原因：</span>
        <textarea v-model="mark" :disabled="$route.query.opMark==='01'"></textarea>
      </p>
      <p class="btn" v-if="$route.query.opMark==='03'">
        <span @click="access = true">通过</span>
        <span @click="noAccess = true">不通过</span>
        <span @click="$router.go(-1)">取消</span>
        <!--<el-button type="primary" size="small" @click="access = true"></el-button>-->
        <!--<el-button type="primary" size="small" @click="noAccess = true">不通过</el-button>-->
        <!--<el-button type="primary" size="small" @click="$router.go(-1)">取消</el-button>-->
      </p>
    </div>
    <!-- 通过审核弹窗 -->
    <el-dialog :visible.sync="access" width='560px' class='access'>
      <p>是否确认通过审核！</p>
      <p>
        <el-button type="primary" size="small" @click="access =false">取消</el-button>
        <el-button type="primary" size="small" @click="auditFn('10')">确认</el-button>
      </p>
    </el-dialog>

    <!-- 未通过审核弹窗 -->
    <el-dialog :visible.sync="noAccess" width='560px' class='noAccess'>
      <p>是否拒绝通过审核</p>
      <p>
        <el-button type="primary" size="small" @click="noAccess =false">取消</el-button>
        <el-button type="primary" size="small" @click="auditFn('03')">确认</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"
    import EsspInfoComment from "@/components/EsspInfoComment"

    import 'swiper/dist/css/swiper.css' ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import Moment from "moment";
    import EsspParkTag from "@/components/EsspParkTag";
    import mixin from '@/components/mixins/mixins_windowOpen.js'
    export default {
        mixins:[mixin],
        components: {
            EsspBreadCrumb,
            swiper,
            swiperSlide,
            EsspInfoComment,
            EsspParkTag
        },
        filters: {
            fromDates(vaule) {
                var a = Moment(vaule);
                var b = Moment(new Date());
                var day = b.diff(a, 'days');
                var hour = b.diff(a, 'hour');
                var minutes = b.diff(a, 'minutes');
                var second = b.diff(a, 'second');
                var str = "之前";
                if (day > 0) {
                    return day + "天" + str;
                }
                if (hour > 0) {
                    return hour + "小时" + str;
                }
                if (minutes > 0) {
                    return minutes + "分钟" + str;
                }
                if (second > 0) {
                    return second + "秒" + str;
                }
                return
            }
        },
        data() {
            return {
                publishId:"1",//长度为1不能改
                logo: "",
                icons: [
                    "icon iconfont icon-riqi1",
                    "icon iconfont icon-dizhi",
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2",
                    "icon iconfont icon-faburen",
                    "icon iconfont icon-pinglun"
                ],
                userInfo: {},
                activityLabelList: [],
                flollowStatus: "0",
                flollowStatusCn: "关注",
                dataModel: {},  //活动详情model
                signUpList: [],//报名情况列表
                hotActivityList: [],//热门活动列表
                active: 0,
                companyName: this.$route.query.cstName,
                showBtnV: true,
                activeDetailData: {},

                prompt: 0,
                plist: [],
                showBtn: false,
                selist: [
                    {
                        id: '0',
                        name: '美食'
                    },
                    {
                        id: '1',
                        name: '交流'
                    },
                    {
                        id: '2',
                        name: '创业'
                    }
                ],
                imglist: [],// 报名情况
                imglist1: [],  // 热门活动
                currAttenStatus: '0',  // 是否已关注  0 未关注  1已关注
                allEnterCount: 0,
                swiperOption: {
                    nitialSlide: 0,//设定初始化时slide的索引
                    notNextTick: true,
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
                        prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
                    }
                },
                swiperOption1: {
                    nitialSlide: 0,//设定初始化时slide的索引
                    notNextTick: true,
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 18,
                    navigation: {
                        nextEl: '.swiper-button-next1', //前进按钮的css选择器或HTML元素。
                        prevEl: '.swiper-button-prev1', //后退按钮的css选择器或HTML元素。
                    }
                },
                breadlist: [
                    {
                        path: '/parkIndex/park/all',
                        name: this.utils.isBdPark()?'平台活动':"园区活动"
                    },
                    {
                        path: '/parkIndex/activityDetail',
                        name: "活动详情"
                    }
                ],
                btnText: 0,
                nowTime: new Date().getTime(),

                // 关注
                dialogVisible: false,
                flollowStatus: "", //资讯关注状态，非0 就是关注了,
                LoginUserRol: this.SSH.getItem("LoginUserRol")?this.SSH.getItem("LoginUserRol").toString():'',
                loginFlag: this.SSH.getItem("loginFlag") ? this.SSH.getItem("loginFlag") : false
            }
        },
        created() {
            this.userInfo = this.SSH.getItem('userInfo');

            // 判断是否显示提示
            this.isPit(this.$route.query.activityId);
            this.getActListSource();

        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        watch: {
            '$route'(to, from) {
                this.getActListSource();
            }
        },
        methods: {
            getTime(timeValue) {
                let nowTime = timeValue.replace(/-/g, '/');
                let time = new Date(nowTime);
                return time.getTime();
            },
            getBtnText() {
                if (this.nowTime < this.getTime(this.activeDetailData.enterStarttime)) {
                    this.btnText = 0;
                } else if (this.nowTime >= this.getTime(this.activeDetailData.enterStarttime) && this.nowTime <= this.getTime(this.activeDetailData.enterEndtime)) {
                    this.btnText = 1;
                } else if (this.nowTime > this.getTime(this.activeDetailData.enterEndtime)) {
                    this.btnText = 2;
                }
                console.log( this.btnText);

            },
            lineTo(activityId) {
                this.$router.push({
                    path: '/parkIndex/activityDetail',
                    query: {
                        activityId: activityId
                    }
                })
            },
            // 举报是否需要提示
            isPit(entId) {
                // 举报 3. 资讯模块  4. 活动模块  5. 评论模块
                this.$post("/inform/findPrompt", {
                    informType: 4,
                    entId: entId
                }).then((response) => {
                    // if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                        this.prompt = response.resultData.prompt;
                    // }
                });
            },
            // 举报 3. 资讯模块  4. 活动模块  5. 评论模块
            tipOffFn(type, id, title, cstNm, byInformer) {
                //未登录
                if (!this.utils.isLoginMode()) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function () {
                        _this.windowHrefUrl('/userIndex/login')
                    }, 2000);
                    return;
                }
                if(this.utils.isVisitorMode()){
                    this.$message.warning("您暂无权限进行举报");
                    return;
                }
                var parkId = sessionStorage.getItem("parkId");
                var cstNm = cstNm || this.activeDetailData.initiatorWay;
                var byInformer = byInformer || this.activeDetailData.initiatorUsername;
                console.log(id + '_' + parkId);

                this.$commonJs.tipOffMask({
                    informType: type,                                      // 类型（必填）
                    informContent: title,                                  // 举报标题
                    byInformer: byInformer,                                // 被举报人（必填）
                    informerEnt: cstNm,                                    // 被举报人所在企业（必填）
                    entId: id                                               //  实体编号  类似id比如 活动id， 评论id等（必填）
                });
            },
            interCc() {
                this.windowOpenUrl('/centerIndex/showHome',{cstId:this.activeDetailData.cstId})
            },
            /* 获取企业logo */
            getLogo() {
                /* 获取企业logo */
                this.$post(this.$apiUrl.active.getLogo, {
                    cstId: this.activeDetailData.cstId
                }).then((response) => {
                    this.logo = response.resultData.logo;

                });
            },
            /* 立即报名 */
            signUp(enrollType) {

                if (!this.loginFlag) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    return;
                }
                // 游客没权限参与活动
                if (this.loginFlag && this.LoginUserRol.includes('11')) {
                    this.$message.error('园区成员才能做此操作');
                    return;
                }

                if (!this.loginFlag && enrollType == '0') {
                    this.$message.warning('本活动仅对本园区开放');
                    return;
                }
                if(this.activeDetailData.topLimit == 0) {
                    this.$message.warning('本活动报名人数已达到上限');
                    return;
                }
                this.$router.push({
                    path: '/parkIndex/enrollForm',
                    query: {
                        activeId: this.$route.query.activityId,
                        enrollType: enrollType
                    }
                })

            },

            // 弹窗
            showDialog() {
                // if (!this.loginFlag) {
                //     this.$message.error('登录并且入驻园区才能关注');
                // }
                // if (this.LoginUserRol == '11' && this.loginFlag) {
                //     this.$message.error('入驻园区才能关注');
                // }
                //未登录
                if (!this.utils.isLoginMode()) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function () {
                        _this.windowHrefUrl('/userIndex/login')
                    }, 2000);
                    return;
                }
                //游客模式暂不支持关注
                if(this.utils.isVisitorMode()){
                    this.$message.warning("您暂无权限进行关注/取消关注");
                    return;
                }
                if (this.flollowStatus == '1') {
                    this.dialogVisible = true;
                }
                if (this.flollowStatus != '1') {
                    this.follow();
                }
            },
            cancleFocus() {
                this.follow();
            },
            follow() {
                // this.activeDetailData.currAttenStatus === "1" 1 已关注  0 未关注
                var isClick = true;
                if (!isClick) {
                    return;
                }
                isClick = false;

                this.flollowStatus = this.flollowStatus === "1" ? "0" : "1";

                var url = this.flollowStatus === "0" ? "/attention/removeAttention" : this.$apiUrl.active.addAttention;

                this.$post(url, {
                    activityId: this.$route.query.activityId,
                    parkId: window.sessionStorage.getItem("parkId")
                }).then((response) => {
                    isClick = true;
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.dialogVisible = false;
                        this.$message.success(response.resultMsg);
                    // } else {
                    //     this.$message({
                    //         type: "info",
                    //         message: response.resultMsg
                    //     });
                    // }
                }, response => {
                    isClick = true;
                    this.$message.error(response.resultMsg)
                });
            },

            getActListSource() {
                var op = this.$route.query.op || '01'
                /* =======获取活动详情信息 ================================================*/
                this.$post(this.$apiUrl.active.activeDetail, {
                    activityId: this.$route.query.activityId,
                    parkId: sessionStorage.getItem("parkId"),
                    opMark: op
                }).then((response) => {
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {

                        this.activeDetailData = response.resultData;
                        this.activeDetailData.ticketForm= JSON.parse(this.activeDetailData.ticketForm)
                        this.flollowStatus = response.resultData.currAttenStatus;

                        if (response.resultData.activityLabel) {
                            this.activityLabelList = response.resultData.activityLabel.split(",");
                        } else {
                            this.activityLabelList = [];
                        }
                        this.getLogo();
                        this.getBtnText();
                        this.publishId=""
                        this.publishId=response.resultData.initiator
                        console.log(this.btnText)
                        console.log('444',this.publishId)
                    // } else {
                    //     this.$message({
                    //         type: "info",
                    //         message: response.resultMsg
                    //     });
                    // }

                });
                /*============= 获取报名情况列表 ====================================*/
                this.$post(this.$apiUrl.active.getEnterSum, {
                    activityId: this.$route.query.activityId,
                    parkId: sessionStorage.getItem("parkId")
                }).then((response) => {
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
//                        var obj = [
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            },
//                            {
//                                cstId: "9131011205506145X2",
//                                cstLogo: null,
//                                cstName: "上海依图网络科技有限公司",
//                                enterCount: 1,
//                                firstTime: "2018-12-05 19:01:59"
//                            }
//                        ]
//                        this.signUpList = obj;
                        this.signUpList = response.resultData;
                        var num = 0;
                        this.signUpList.forEach((item, index) => {
                            num += parseInt(item.enterCount);
                        })
                        this.allEnterCount = num;
                    // } else {
                    //     this.$message({
                    //         type: "info",
                    //         message: response.resultMsg
                    //     });
                    // }

                });
                /*============= 获取更多热门活动 ==================================*/
                this.$post(this.$apiUrl.active.getHotActivity, {
                    pageNum: 0,
                    pageSize: 10,
                    type: 0,
                    parkId: window.sessionStorage.getItem("parkId")
                }).then((response) => {
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.imglist1 = response.resultData.hot;
                    // } else {
                    //     this.$message({
                    //         type: "info",
                    //         message: response.resultMsg
                    //     });
                    // }
                });

            }


        }
    }
</script>

<style lang='less' scoped>
    @import "../../../assets/css/mixin";
    /*取关弹窗的样式*/
    .btn_text_i {
        color: #fff;
        display: inline-block;
        height: 100%;
        width: 100%;
        font-style: normal;
    }
    .btn_text_i.sel {
        background-color: #999;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 30px;
    }
    .jbnc {
        .essp_width_auto();
        height: 32px;
        line-height: 32px;
        color: #f22;
        font-size: 16px;
        font-weight: bold;
    }

    .active_detail_div {
        position: relative;
        .essp_width_auto();
        background: #fff;
        margin-top: 10px;
        padding: 45px 50px;
        width: 1100px;
        .no_swiper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
        }
    }

    .active_detail_div {
        margin-bottom: 10px;
        .swipercon {
            margin-bottom: 0;
        }
    }

    .swiperwrap2 {
        position: relative;

    }

    .status_btn {
        padding-left: 26px;
        span {
            margin-left: 30px;
            cursor: pointer;
        }
        button {
            width: 100px;
            height: 30px;
            line-height: 30px;
            color: #fff;
            border: none;
            border-radius: 20px;
            background-color: #04a2ea;
            cursor: pointer;
            outline: none;
        }
        i {
            font-size: 14px;
            margin-right: 2px;
            color: #999;
        }
        .icon-collect2, .icon-aixin-xianxing {
            font-size: 12px;
        }
        .icon-warning {
            font-size: 16px;
        }
    }

    #ActivityDetail {

        background: #f5f5f5;
        .detailNav {
            font-size: 16px;
            line-height: 30px;
            color: #666;
        }
        .icon_p_font {
            span {
                margin-right: 27px;
            }
            i {
                margin-right: 10px;
                color: #ff9900;
                font-size: 14px;
            }
            .icon-collect2:before {
                font-size: 12px;
            }
            .icon-pinglun {
                font-size: 12px;
            }
        }
        .tipOffBox {
            padding: 30px 0 20px;
            //            .essp_width_auto();
            .l {
                float: left;
                width: 80%;
                p {
                    height: 30px;
                    line-height: 30px;
                    color: #444;
                }
                strong {
                    padding-right: 6px;
                    font-weight: normal;
                    font-size: 16px;
                }
                span {
                    padding: 0 6px;
                    min-width: 65px;
                    height: 20px;
                    color: #fff;
                    margin-right: 10px;
                    background-color: #cccccc;
                    -webkit-border-radius: 3px;
                    -moz-border-radius: 3px;
                    border-radius: 3px;
                    font-size: 12px;

                }
            }
            .r {
                float: right;
                button {
                    width: 80px;
                    height: 30px;
                    background-color: #f56c6c !important;
                    border-radius: 15px;
                }
            }
        }
        .wrap {
            .headerItem {
                width: 1151px;
                height: 302px;
                overflow: hidden;
                margin: 0 22px 30px 27px;
                overflow: hidden;
                .headerLeft {
                    width: 180px;
                    padding-top: 36px;
                    float: left;
                    button {
                        outline: none;
                        border: none;
                        width: 180px;
                        height: 40px;
                        font-size: 20px;
                        background-color: #0066b3;
                        line-height: 30px;
                        color: #ffffff;
                    }
                    img {
                        width: 180px;
                        height: 180px;
                        margin-top: 20px;
                    }
                    p {
                        line-heihgt: 30px;
                        &:nth-of-type(1) {
                            font-size: 18px;
                            color: #333;
                        }
                        &:nth-of-type(2) {
                            font-size: 18px;
                            margin-top: 10px;
                            color: #666;
                            margin-bottom: 20px;
                        }
                    }
                }
                .headerMiddle {
                    padding-top: 36px;
                    margin-left: 38px;
                    float: left;
                    img {
                        width: 420px;
                        height: 240px;
                    }
                }
                .headerRight {
                    padding-top: 36px;
                    margin-left: 14px;
                    float: left;
                    p.title {
                        width: 499px;
                        height: 56px;
                        font-size: 20px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 36px;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                    p.sel {
                        line-height: 40px;
                        margin-top: 18px;
                        span {
                            display: inline-block;
                            width: 40px;
                            height: 20px;
                            line-height: 20px;
                            margin-left: 20px;
                            text-align: center;
                            background-color: #cccccc;
                            cursor: pointer;
                        }
                    }
                    p.rightCommon {
                        font-size: 12px;
                        line-height: 30px;
                        color: #666666;
                    }
                    p.tickSelect {
                        overflow: hidden;
                        span {
                            display: inline-block;
                            float: left;
                            width: 110px;
                            height: 30px;
                            overflow: hidden;
                            font-size: 12px;
                            line-height: 30px;
                            text-align: center;
                            color: #ccc;
                            border: solid 1px #ccc;
                            cursor: pointer;
                            &:nth-of-type(1) {
                                margin-left: 15px;
                            }
                            &:nth-of-type(2) {
                                margin-left: 10px;
                            }
                            & > i {
                                font-size: 10px;
                                -moz-transform: rotate(90deg);
                                -ms-transform: rotate(90deg);
                                -o-transform: rotate(90deg);
                                -webkit-transform: rotate(90deg);
                                position: relative;
                                top: 13px;
                                right: -18px
                            }
                            &.active {
                                color: #ff9900;
                                border: solid 1px #ff9900;
                                & > i {
                                    color: #ff9900;
                                }
                            }
                        }
                    }
                    p:nth-last-of-type(1) {
                        margin-top: 30px;
                        & > button {
                            width: 100px;
                            height: 30px;
                            background-color: #00a0e9;
                            border-radius: 15px;
                            outline: none;
                            border: none;
                            font-size: 12px;
                            line-height: 25px;
                            color: #fff;
                            cursor: pointer;
                            margin-left: 20px;
                            &:nth-of-type(2) {
                                width: 100px;
                                height: 30px;
                                border-radius: 15px;
                                border: solid 1px #cccccc;
                                background: #fff;
                                color: #999;
                                & > i {
                                    color: #fc1878;
                                    margin: 0 5px 0 -5px;
                                }
                            }
                        }
                    }
                }
            }
            .clickItem {
                width: 1180px;
                height: 261px;
                margin: 0 auto;
                padding: 40px 0 50px;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                .clickPic {
                    width: 1108px;
                    overflow: hidden;
                    margin: 20px auto 0;
                    & > img {
                        float: left;
                        position: relative;
                        top: 50px;
                        margin: 0 5px;
                    }
                    & > ul {
                        overflow: hidden;
                        float: left;
                        li {
                            float: left;
                            margin-right: 35px;
                            img {
                                width: 150px;
                                height: 150px;
                            }
                            & > p {
                                font-size: 16px;
                                line-height: 36px;
                                color: #333333;
                                text-align: center;
                                &:nth-of-type(2) {
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                            &:nth-last-of-type(1) {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }

            .activityD {
                position: relative;
                //                .essp_width_auto();
                padding: 40px 0 50px;
                /*border-bottom: 1px solid #ccc;*/
                & > p {
                    &:nth-of-type(1) {
                        span {
                            font-size: 20px;
                            margin-left: 0 !important;
                            line-height: 36px;
                            color: #333333;
                            /*border-bottom: 4px solid #0066b3;*/
                        }
                    }
                    &:nth-of-type(2) {
                        margin-top: 15px;
                        span {
                            display: block;
                            font-size: 13px;
                            line-height: 15px;
                            color: #666666;
                        }
                    }
                }
                .content {
                    margin: 15px auto;
                    width: 1098px;
                    height: auto;
                    font-size: 14px;
                    line-height: 30px;
                    color: #777777
                }
                .imgA {
                    width: 880px;
                    height: 378px;
                    margin: 0 auto;
                    & > img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .dList {
                    width: 1098px;
                    height: auto;
                    font-size: 14px;
                    margin: 20px auto 0;
                    h3 {
                        font-size: 16px;
                        line-height: 40px;
                        color: #333333;
                    }
                    p {
                        line-height: 30px;
                    }
                }
                .detailT, .detailO {
                    font-size: 14px;
                    line-height: 30px;
                }
                .detailO {
                    margin-top: 30px;
                }
            }
            .border-top {
                position: relative;
            }
            .border-top:before {
                position: absolute;
                left: -3%;
                top: 0;
                content: "";
                height: 1px;
                width: 106%;
                background: #ccc;
            }
            .clickTitle {
                line-height: 36px;
                color: #333333;
                span {
                    padding-bottom: 5px;
                    &:nth-of-type(1) {
                        font-size: 20px;
                        /*border-bottom: 4px solid #0066b3;*/
                        line-height: 20px;
                    }
                    &:nth-of-type(2) {
                        font-size: 16px;
                    }
                }
            }
            .moreActive {
                margin-bottom: 35px;
                .clickTitle {
                    span {
                        &:nth-of-type(2) {
                            float: right;
                            line-height: 36px;
                            font-size: 20px;
                            color: #666;
                            cursor: pointer;
                        }
                    }
                }
                .clickItem {
                    border-top: none;
                    border-bottom: none;
                    margin-top: 0;
                    padding: 0;
                }
                .more {
                    ul {
                        li {
                            img {
                                width: 246px;
                                height: 141px;
                            }
                        }
                    }
                }
            }
        }
    }

    .activemain {
        .essp_width_auto();
    }

    .activemain_con {
        padding: 38px 34px 42px;
        background: #fff;
    }

    .login_con_a {
        .esspsc(16px);
        cursor: pointer;
        font-size: 18px;
        width: 180px;
        overflow: hidden;
        margin-top: 10px;
    }

    .bmbtn {
        margin-left: 20px;
        em {
            padding-right: 5px;
        }
    }

    .swiperwrap {
        position: relative;
    }

    .swiperwrap h3 {
        text-align: center;
    }

    .swiperwrap1 .swiper_item .itempic {
        position: relative;
        width: 246px;
        height: 142px;
        overflow: hidden;
        span {
            position: absolute;
            width: 98%;
            left: 0;
            bottom: 0;
            padding-right: 2%;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            text-align: right;
        }
    }

    .swiper_item {
        /*padding: 8px;*/
        background: #fff;
        /*border: 1px solid #999;*/

    }

    .swipercon {
        width: 1016px;
        margin: 33px auto 38px;
    }

    .swiperwrap {
        .swiper-button-prev, .swiper-button-next,
        .swiper-button-prev1, .swiper-button-next1 {
            width: 50px;
            height: 72px;
        }

        .swiperwrap .swiper-button-prev1, .swiperwrap .swiper-button-next1 {
            margin-top: -35px;
        }
        /*Swiper原样式 */
        .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
            background-image: url("l1.jpg");
            left: -9px;
            right: auto;
        }
        .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
            background-image: url("r1.jpg");
            right: -9px;
            left: auto;
        }
        .swiper-button-prev1, .swiper-container-rtl .swiper-button-next1 {
            /*background-image: url("l2.jpg");*/
            background-image: url("l1.jpg");
            left: -9px;
            right: auto;
        }
        .swiper-button-next1, .swiper-container-rtl .swiper-button-prev1 {
            /*background-image: url("r2.jpg");*/
            background-image: url("r1.jpg");
            right: -9px;
            left: auto;
        }
        .swiper-button-prev1, .swiper-button-next1, .swiper-button-prev, .swiper-button-next {
            position: absolute;
            top: 35%;
            margin-top: -22px;
            z-index: 10;
            cursor: pointer;
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
        }
        .itempic {
            width: 150px;
            height: 150px;
            margin: 0 auto;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                min-height: 100%;
            }
        }
        h3 {
            font-size: 16px;
            margin-top: 8px;
            margin-bottom: 10px;
            text-align: center;
            font-weight: normal;
            .esspellipsis();
            padding: 0 10px;
        }
        p {
            font-size: 12px;
            .esspellipsis();
            text-align: center;
            color: #999;
        }
        .gn {
            padding: 15px 0;
            text-align: right;
            .bm {
                margin-left: 36px;
                strong {
                    font-size: 24px;
                    color: @essp_nav_bg;
                }
            }
        }
        .swiper-button-prev, .swiper-button-next {
            margin-top: -35px;
        }

    }

    // 左侧部分
    .actleft {
        float: left;
        padding: 0 0 10px;
        margin-right: 31px;
        /*border: 1px solid #ccc;*/

        .acttit {
            width: 180px;
            height: 40px;
            background-color: @essp_nav_bg;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin-bottom: 20px;
            font-size: 20px;
            background: rgb(21, 152, 255); /* Old browsers */
            background: -moz-linear-gradient(right, rgba(21, 152, 255, 1) 0%, rgba(54, 191, 253, 1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(right, rgba(21, 152, 255, 1) 0%, rgba(54, 191, 253, 1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(21, 152, 255, 1) 0%, rgba(54, 191, 253, 1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1598ff', endColorstr='#36bffd', GradientType=0); /* IE6-9 */
        }
        .actlogo {
            display: block;
            width: 180px;
            height: 180px;
        }
    }

    // 右侧部分
    .actright {
        float: left;
    }

    .logocon {
        width: 420px;
        height: 240px;
        float: left;
        margin-right: 14px;
        .detaillogo {
            display: block;
            width: 100%;
            height: 100%;
            cursor: none;
        }
    }

    .detailcon {
        float: left;
        width: 485px;
        h2 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            -moz-line-clamp: 2;
            -moz-box-orient: vertical;
            -ms-line-clamp: 2;
            -ms-box-orient: vertical;
            font-weight: normal;
        }
    }

    //标签模块
    .tagcon {
        margin-bottom: 5px;
        padding-left: 22px;
        min-height: 25px;
        span {
            float: left;
            margin-right: 20px;
            margin-bottom: 10px;
            padding: 2px 10px;
            font-size: 12px;
            background-color: #cccccc;
            text-align: center;
            color: #fff;
        }

    }

    .infos {
        margin-bottom: 5px;
        .iconcoom {
            margin-right: 4px;
        }
        i {
            font-size: 12px;
        }
        > div {
            margin-bottom: 6px;
        }
        .icon-piaozhong {
            font-size: 14px;
            b {
                padding-left: 0;
                margin-left: -3px;
            }
        }
        .icon-dizhi {
            font-size: 14px;
        }
        b {
            padding-left: 5px;
        }
        b, em {
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            font-style: normal;

        }
    }

    .infobtn {
        margin-bottom: 20px;
        padding-left: 15px;
        .btnitem {
            float: left;
            width: 125px;
            overflow: hidden;
            padding: 0 5px;
            margin-bottom: 5px;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            &:hover {
                cursor: pointer
            }
        }
        .selecrborder {
            position: relative;
            color: #ff9900;
            border: 1px solid #ff9900;
        }
        .selecrborder:before {
            position: absolute;
            content: ' ';
            bottom: 0px;
            right: 0px;
            width: 0;
            height: 0;
            border-width: 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent transparent #fc0; /*透明 透明 透明 黄*/
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
        }

    }

    .btns {
        overflow: hidden;
        i {
            float: left;
            position: relative;
            top: 5px;
        }
        b {
            float: left;
        }
        em {
            float: left;
            display: inline-block;
            width: 400px;
        }
    }
</style>
