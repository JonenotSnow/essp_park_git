<template>
    <div id="ActivityDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <!-- <p class="detailNav">园区活动>活动详情</p> -->
        <div class="wrap">

            <div class="activemain">
                <div class="activemain_con esspclearfix">
                    <!-- 活动介绍模块 -->
                    <!--<div class="actleft">-->
                        <!--<div>-->
                            <!--<div class="acttit">主办方</div>-->
                            <!--<div>-->
                                <!--<img class="actlogo" :src="logo" alt="">-->
                                <!--<p class="actcpname login_con_a" @click="interCc()">{{activeDetailData.cstName-->
                                    <!--?activeDetailData.cstName:"进入企业橱窗>>"}}</p>-->
                                <!--&lt;!&ndash;<a href="javascript:void(0)" class="login_con_a" @click="interCc()">进入企业橱窗 <i&ndash;&gt;-->
                                <!--&lt;!&ndash;class="el-icon-d-arrow-right"></i></a>&ndash;&gt;-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->


                    <div class="actright">
                        <div class="maininfo esspclearfix">
                            <div class="logocon">
                                <img class="detaillogo" :src="activeDetailData.activityPhoto" alt="">
                            </div>
                            <div class="detailcon">
                                <h2>{{activeDetailData.activityTheme}}</h2>
                                <p class="icon_p_font">
                                    <span><i :class="icons[2]" style="color: #ccc"></i>{{activeDetailData.viewSum}}</span>
                                    <span><i :class="icons[3]" style="color: #ccc"></i>{{activeDetailData.attentionSum}}</span>
                                    <span><i :class="icons[5]" style="color: #ccc"></i>{{activeDetailData.commentSum}}</span>
                                </p>
                                <div class="tagcon esspclearfix" v-if="activityLabelList.length">
                                    <span v-if="eptIndex < 3" :key="eptIndex" v-for="(item, eptIndex) in activityLabelList" >{{item}}</span>
                                </div>
                                <div class="infos">
                                    <div class="infos_item">
                                        <i class="icon iconfont icon-riqi1" style="color: #ccc;"></i>
                                        <b>时间：</b><em>{{activeDetailData.activityStarttime}}</em></div>
                                    <div class="btns">
                                        <i class="icon iconfont icon-dizhi" style="color: #ccc;"></i>
                                        <b>地点：</b><em>{{activeDetailData.activityPlace}}</em>
                                    </div>
                                    <!--<div><i class="iconcoom el-icon-zoom-in"></i>-->
                                    <!--<b>发起人：</b><em>{{activeDetailData.initiatorName || '暂无发起人'}}</em></div>-->
                                    <div style="margin-bottom: 20px;">
                                        <i class="icon iconfont icon-piaozhong" style="color: #ccc;"></i>
                                        <b style="padding-left: 7px;">票种：</b>
                                    </div>
                                </div>
                                <div class="infobtn esspclearfix">
                                    <div class="btnitem"
                                         v-for="(item,index) in activeDetailData.ticketForm"
                                         v-if=" activeDetailData.ticketForm != null && index<10" :key="index">
                                        ￥{{item.ticketPirce || "0.00"}} {{item.ticketType}}
                                    </div>
                                </div>
                                <div class="status_btn">
                                    <button
                                        class="no_begin_active_btn"
                                        v-if="activeDetailData.status == '02' && btnText == 0"
                                        disabled
                                    >预告中
                                    </button>
                                    <button
                                        v-else-if="activeDetailData.status == '02' && btnText==1">
                                        <em class="btn_text_i" :class="!loginFlag ? 'sel':''"  @click="signUp(activeDetailData.enterType)">立即报名</em>
                                    </button>
                                    <button
                                        class="end_activ_btn"
                                        v-else-if="activeDetailData.status == '02' && btnText == 2"
                                        disabled
                                    >已结束
                                    </button>
                                    <button v-else disabled>未审核</button>

                                    <span @click="showDialog()" v-if="flollowStatus === '0'" round><i
                                        class="iconfont icon-aixin-xianxing"
                                        style="margin-right:5px;color:#fc1878;font-size: 12px;"></i>关注</span>
                                    <span class="btn-icon-star-on" size="mini" @click="showDialog()"
                                          v-if="flollowStatus === '1'" round><i class="iconfont icon-collect2"
                                                                                style="margin-right:5px;color:#fc1878;font-size: 12px;"></i>已关注</span>
                                    <span
                                        @click="tipOffFn(4,activeDetailData.activityId,activeDetailData.activityTheme)"
                                        style="cursor: pointer;"><i class="iconfont icon-warning"
                                                                    style="margin-right:5px;"></i>举报</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="jbnc" v-if="prompt == 1">
                PS: 该内容因被举报正在取证中，请您谨慎对待。
            </div>
            <div class="active_detail_div">
                <div>
                    <p class="clickTitle">
                        <span style="margin-right: 50px;">报名情况</span>
                        <span>已报名 <strong>{{allEnterCount}}</strong>人</span>
                    </p>
                </div>
                <div class="swiperwrap swiperwrap2">
                    <!--少于6个，防止滑动-->
                    <div class="no_swiper" v-if="signUpList.length< 6"></div>
                    <div class="swipercon" v-if="signUpList.length>0" style="margin-bottom: 20px;">
                        <swiper :options="swiperOption" ref="mySwiper">
                            <swiper-slide v-for="(item,index) in signUpList" :key="index">　　　　　　
                                <div class="swiper_item">
                                    <div class="itempic">
                                        <img :src="item.cstLogo" alt=""></div>
                                    <h3>报名人数: <span>{{item.enterCount}}</span>人</h3>
                                    <p>{{item.timeShow}}</p>
                                </div>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                    <div class="swipercon" v-if="signUpList.length==0" style="padding-bottom: 20px;">
                        <div style="text-align: center">
                            <p style="display: inline-block"><img src="./noEroll.png" alt=""></p>
                            <p style="display: inline-block; margin-left: 40px; height: 98px; line-height: 98px;">
                                <span>暂无人报名，点击报名按钮，立即报名吧</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="activityD border-top">
                    <p class="clickTitle" style="margin-bottom: 30px;"><span>活动详情</span></p>
                <div class=" ql-container ql-snow bord-none">
                    <div style="border: none; padding:0;" class="ql-editor" v-html="activeDetailData.activityDetails"></div>
                </div>
                </div>
                <div class="tipOffBox border-top esspclearfix">
                    <div class="l">
                        <p><strong>收费说明 :</strong>{{activeDetailData.chargeInfo || "无收费说明"}}</p>
                        <p><strong>发起单位 :</strong>{{activeDetailData.initiateUnits || "暂无"}}</p>
                        <p>
                            <strong>活动标签 :</strong>
                            <essp-park-tag
                                v-for="(item, eptIndex) in activityLabelList"
                                :value="item"
                                :key="eptIndex"
                            />
                        </p>
                    </div>
                    <!--<div class="r">-->
                    <!--<el-button type="danger" size="mini" round @click="tipOffFn(4,activeDetailData.activityId,activeDetailData.activityTheme)">举报</el-button>-->
                    <!--</div>-->
                </div>
                <!--commentSty 传入的类型-->
                <essp-info-comment commentSty="1"></essp-info-comment>
            </div>
            <div class="active_detail_div active_detail_div1">
                <div class="moreActive">
                    <p class="clickTitle">
                        <span>更多热门活动</span>
                        <span><router-link to="/parkIndex/park/all"
                                           style="color: #00a0e9;font-size: 14px;">更多>></router-link></span>
                    </p>
                </div>
                <div class="swiperwrap swiperwrap1">
                    <div class="swipercon" v-if="imglist1.length > 0">

                        <swiper :options="swiperOption1" ref="mySwiper1" style="width: 100%;">
                            <swiper-slide v-for="(item,index) in imglist1" :key="index">　　　　　　
                                <div class="swiper_item" @click="lineTo(item.activityId)">
                                    <div class="itempic">
                                        <img :src="item.activityPhoto" alt="">
                                        <span>{{item.activityStarttime.substring(0,11)}}</span>
                                    </div>
                                    <h3>{{item.activityTheme}}</h3>
                                    <!--<router-link :to="{path:'/parkIndex/activityDetail',query:{activityId:item.activityId}}">-->
                                    <!---->
                                    <!--</router-link>-->
                                </div>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-next1"></div>
                        <div class="swiper-button-prev1"></div>
                    </div>
                    <div class="swipercon" v-if="imglist1.length==0">暂无热门活动！</div>
                </div>
            </div>
        </div>

        <!-- 关注事件对话框start -->
        <el-dialog class="quguanbox"
                   title="提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :before-close="handleClose">
            <!-- <span style="display: inline-block; width: 100%; text-align: center;font-size: 16px">确定取消该关注？</span> -->
            <div>
                <i class="icon iconfont icon-tishi"></i><span class="quguan">是否取消该关注</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancleFocus()">确 认</el-button>
            </span>
        </el-dialog>
        <!-- 关注事件对话框end -->
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
                    setTimeout(function () {
                        _this.windowHrefUrl('/userIndex/login')
                    }, 2000);
                    return;
                }
                // 游客没权限参与活动
                if (this.loginFlag && this.LoginUserRol.includes('11')) {
                    this.$message.error('您不是园区企业，可先申请加入园区');
                    return;
                }

                if (!this.loginFlag && enrollType == '0') {
                    this.$message.warning('本活动仅对本园区开放');
                    return;
                }
                if(this.activeDetailData.topLimit == 0) {
                    this.$message.warning('报名人数已达到上限,无法进行报名');
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
                var op = this.$route.query.op || '01';
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
                        console.log(this.btnText)
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
        span {
            margin-left: 30px;
            cursor: pointer;
        }
        button {
            width: 140px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            border: none;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
            font-size: 14px;
            background-image: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%),
            linear-gradient(#00a0e9, #00a0e9);
            background-blend-mode: normal, normal;
        }
        .no_begin_active_btn {
            background-image: linear-gradient(40deg, #fbba1e 0%, #fcc518 50%, #fccd11 100%),
            linear-gradient(#00a0e9, #00a0e9);
            background-blend-mode: normal, normal;
        }
        .end_activ_btn {
            background-image: linear-gradient(256deg, #dddee2 0%, #c9ccd3 100%),
            linear-gradient(#00a0e9, #00a0e9);
            background-blend-mode: normal, normal;
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
        margin-right: 41px;
        .detaillogo {
            display: block;
            width: 100%;
            height: 100%;
            cursor: none;
        }
    }

    .detailcon {
        float: left;
        width: 665px;
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
        .icon_p_font {
            margin-bottom: 15px;
        }
    }

    //标签模块
    .tagcon {
        margin-bottom: 5px;
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
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
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
            padding-left: 15px;
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
        .btnitem {
            float: left;
            width: 125px;
            overflow: hidden;
            padding: 0 5px;
            margin-bottom: 5px;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #999;
            height: 30px;
            line-height: 30px;
            margin-right: 10px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
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
