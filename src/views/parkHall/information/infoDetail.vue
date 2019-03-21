<template>
    <div style="margin-bottom: 30px;">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <!-- 资讯详情页 -->
        <div class="content-wrap">
            <div class="content-limit">
                <div class="newscon">
                    <h2>{{informationTitle}}</h2>
                    <div class="newstatus esspclearfix">
                        <p class="statusitemsA">
                            <em>{{createTime | timerFormat(createTime)}}</em>
                        </p>
                        <div class="flex-between">
                            <div>
                    <span class="statusitemsB">
                        <label>资讯类型：</label>
                        <em>{{classtType | typeFormat }}</em>
                    </span>
                                <span class="center_bord"></span>
                                <span class="statusitemsB" style="cursor: pointer" @click="enterBusiness">
                        <label>发布机构：</label>
                        <em>{{cstNm}}</em>
                    </span>
                            </div>
                            <span class="statusitems">
                        <div class="follow cursor guanzhu" @click="showDialog()">
                                <i class="icon iconfont"
                                   :class="followStatus == 0 ?'icon-aixin-xianxing':'icon-collect2'"></i>
                                <em>{{followStatus == 0 ? "关注" : "已关注"}}</em>
                            </div>
                            <div
                                class="follow cursor"
                                @click="tipOffFn(3,infoDetailData.informationId,infoDetailData.informationTitle)"
                            >
                            <i class="iconfont icon-warning" style="font-size: 14px;"></i>
                            <em>举报</em>
                        </div>
                    </span>
                        </div>
                    </div>
                    <!-- <div class="btncon">
                            <el-button type="primary" @click="upDatefollowStatus(followStatus)">{{followStatus==0?"关注":"取消关注"}}</el-button>
                    </div>-->
                    <div class="jbnc" v-if="prompt == 1">PS: 该内容因被举报正在取证中，请您谨慎对待。</div>
                </div>
                <div><img class="img-width" :src="titleImg" alt=""></div>
                <div class="">
                    <div class="realinfo editor-content" v-html="infoDetail"></div>
                </div>

                <div class="park-info-tag" v-if="tags && tags.length>0">
                    <essp-park-tag-busi
                        :tagList="tags"
                        tagBusiName="资讯标签"
                        tagMainWidth="580"
                    />
                </div>

                <div class="pinglun">
                    <essp-info-comment commentSty="2"></essp-info-comment>
                </div>
            </div>
            <div class="">
                <div class="moreinfo">
                    <h3 class="common_titdesa">相关资讯</h3>
                    <!-- <div class="info_more" @click="goParkInfoAll">查看更多></div> -->
                </div>
                <!-- 更多资讯模块 -->
                <div class="newscard_con">
                    <about-news :classtType=classtType></about-news>
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
                <el-button type="primary" @click="upDatefollowStatus()">确 认</el-button>
            </span>
        </el-dialog>
        <!-- 关注事件对话框end -->

    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import aboutNews from "@/views/parkHall/information/aboutNews";
    import EsspInfoComment from "@/components/EsspInfoComment";
    import EsspParkTagBusi from "@/components/EsspParkTagBusi";
    import Moment from "moment";
    import mixin from '@/components/mixins/mixins_windowOpen.js'
    // import {classtType} from "./../../../util/classtType";
    const types = {
        "": "全部",
        "1": "行业动态",
        "2": "通知公告",
        "3": "政府公告",
        "4": "方针政策",
        "5": "专家解读",
        "6": "专栏",
        "7": "财经新闻",
        "8": "其他"
    }
    export default {
        name: "",
        mixins: [mixin],
        components: {
            EsspBreadCrumb,
            EsspInfoComment,
            aboutNews,
            EsspParkTagBusi
        },
        data() {
            return {
                msg: "资讯详情",
                breadlist: [
                    {
                        path: "/parkIndex/parkInformation/all",
                        name: "园区资讯"
                    },
                    {
                        path: "/parkIndex/parkInformation/infoDetail",
                        name: "资讯详情"
                    }
                ],
                infoDetailData: {},
                source: "", //总数据
                informationTitle: "", //资讯标签
                content: "", //资讯简介
                infoDetail: "", //资讯详情
                createTime: "", //发布时间
                cstNm: "", //发布机构
                followStatus: "", //资讯关注状态，非0 就是关注了
                informationId: "", //资讯id
                viewTime: "", //浏览数
                countFollower: "", //关注数
                countComment: "", //评论数
                tags: [], //资讯标签
                followId: "", //关注id
                prompt: 0,

                // 关注
                dialogVisible: false,
                followStatus: "", //资讯关注状态，非0 就是关注了
                followId: "", // 关注id,
                LoginUserRol: this.SSH.getItem("LoginUserRol").toString(),
                loginFlag: this.SSH.getItem("loginFlag"),
                classtType: '',
                titleImg: '',
                cstId: ''
            };
        },
        created() {
            this.detailInfoP();
            this.isPit();
        },
        methods: {
            enterBusiness(item) {
                this.windowOpenUrl('/centerIndex/showHome', {cstId: this.cstId})
            },
            goParkInfoAll() {
                this.$router.push({path: "/parkIndex/parkInformation/all"});
            },
            // 举报是否需要提示
            isPit() {
                var informationId = this.$route.query.informationId;
                // 举报 3. 资讯模块  4. 活动模块  5. 评论模块
                this.$post("/inform/findPrompt", {
                    informType: 3,
                    entId: informationId
                }).then(response => {
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    this.prompt = response.resultData.prompt;
                    //                        this.prompt = 1
                    // }
                });
            },
            tipOffFn(type, id, title, cstNm, byInformer) {
                //未登录

                if (!this.utils.isLoginMode()) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function () {
                        _this.windowHrefUrl('/userIndex/login')
                    }, 2000);
                    return
                }
                //游客模式暂不支持关注
                if (this.utils.isVisitorMode()) {
                    this.$message.warning("您暂无权限进行举报");
                    return;
                }
                var cstNm = cstNm || this.infoDetailData.cstNm;
                var byInformer = byInformer || this.infoDetailData.usrNm;
                var parkId = sessionStorage.getItem("parkId");
                this.$commonJs.tipOffMask({
                    informType: type, // 类型（必填）
                    informContent: title, // 举报标题
                    byInformer: byInformer, // 被举报人（必填）
                    informerEnt: cstNm, // 被举报人所在企业（必填）
                    entId: id //  实体编号  类似id比如 活动id， 评论id等（必填）
                });
            },
            /**
             * 关注事件
             */
            // 弹窗
            showDialog() {
                //未登录
                if (!this.utils.isLoginMode()) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function () {
                        _this.windowHrefUrl('/userIndex/login')
                    }, 2000);
                    return
                }
                //游客模式暂不支持关注
                if (this.utils.isVisitorMode()) {
                    this.$message.warning("您暂无权限进行关注/取消关注");
                    return;
                }
                if (this.followStatus == '1') {
                    this.dialogVisible = true;
                }
                if (this.followStatus != '1') {
                    this.upDatefollowStatus();
                }
            },
            upDatefollowStatus() {
                let type = this.followStatus;
                var pop = type == 0 ? {informationId: this.informationId} : {followId: this.followId};
                var url = type == 0 ? this.$apiUrl.parkInfo.addMyFocus : this.$apiUrl.parkInfo.delMyFocus;
                var successMsg = type == 0 ? "关注成功" : "取消关注成功";
                var failMsg = type == 0 ? "关注失败" : "取消关注失败";
                this.$post(url, pop).then(
                    response => {
                        var codestatus = response.resultCode;
                        this.dialogVisible = false;
                        let data = response.resultData;
                        this.$message.success(successMsg);
                        this.followId = data.followId;
                        this.followStatus = data.followStatus;

                    },
                    err => {
                        this.$message.info(response.resultMsg);
                    }
                );
            },

            //获取文章
            detailInfoP() {
                var informationId = this.$route.query.informationId;
                if (informationId) {
                    var pop = {
                        informationId: informationId
                    };
                    this.$post(this.$apiUrl.parkInfo.infoById, pop).then(
                        response => {
                            // var codestatus = response.resultCode;
                            // if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                            let data = response.resultData;
                            this.infoDetailData = response.resultData;
                            this.source = data;
                            this.informationId = data.informationId; //资讯id
                            this.informationTitle = data.informationTitle; //资讯标题
                            this.content = data.content; //资讯简介
                            this.approveType = data.approveType; //是否需要公司内部审核1是0否
                            this.infoDetail = data.infoDetail; //资讯详情
                            this.pubComment = data.pubComment; //资讯备注
                            this.tags = data.tagsTxt ? data.tagsTxt.split(",") : []; //资讯标签
                            this.createTime = data.createTime; //发布时间
                            this.cstNm = data.cstNm; //资讯发布机构
                            this.followStatus = data.followStatus; //关注状态，0 未关注，非0 关注
                            this.viewTime = data.viewTime; //浏览数
                            this.countFollower = data.countFollower; //关注数
                            this.countComment = data.countComment; //评论数
                            this.followId = data.followId; //关注id，供取消关注用
                            this.classtType = data.classtType
                            this.titleImg = data.titleImg
                            this.cstId = data.pubCstName
                            // } else {
                            //     this.$message.info(response.resultMsg);
                            // }
                        },
                        err => {
                            this.$message.error("接口异常");
                        }
                    );
                }
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm");
            },
            typeFormat(type) {
                return types[type]

            }
        },
        watch: {
            $route(to, from) {
                //监听路由
                this.detailInfoP();
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../../../assets/css/mixin";

    .jbnc {
        .essp_width_auto();
        height: 32px;
        line-height: 32px;
        color: #f22;
        text-indent: 4em;
        font-size: 16px;
        font-weight: bold;
    }

    em {
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
    }

    .infojb {
        float: right;
        width: 80px;
        height: 30px;
        background-color: #f56c6c;
        border-radius: 15px;
        color: #fff;
        outline: none;
        border: 0px;
        cursor: pointer;
    }

    .newsbtncon {
        text-align: center;
    }

    .newscon {
        // .essp_width_auto();

        padding: 0 0 10px;
        // border-bottom: 1px solid #ccc;
        // margin-bottom: 15px;
        h2 {
            .esspellipsis(); //超出省略号
            font-size: 20px;
            line-height: 36px;
            color: #333;
            text-align: left;
            margin-bottom: 15px;
            font-weight: normal;
        }
        //关注按钮
        .btncon {
            text-align: center;
        }
    }

    //标签模块样式
    .park-info-tag {
        padding: 30px 0;
    }

    .newstatus {
        // padding: 0 15%;
        margin-bottom: 20px;
        .statusitemsA {
            width: 30%;
            font-size: 14px;
            line-height: 25px;
            color: #999;
            text-align: left;
            em {
                font-style: normal;
            }
        }
        .statusitemsB {
            width: 40%;
            font-size: 14px;
            line-height: 25px;
            color: #999;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            em {
                font-style: normal;
            }

        }
        .center_bord {
            width: 60px;
            height: 16px;
            position: relative;
            display: inline-block;
            vertical-align: middle;
            &::before {
                content: ' ';
                height: 16px;
                width: 1px;
                background-color: #ccc;
                position: absolute;
                left: 50%;
                top: 0;
            }
        }
        .statusitems {
            width: 200px;
            margin-left: 30px;
            font-size: 14px;
            line-height: 25px;
            color: #999;
            text-align: center;
            display: flex;
            justify-content: flex-end;
            .follow {
                margin-right: 15px;
                em {
                    font-style: normal;
                }
            }
            .guanzhu {
                i {
                    color: #fc1878;
                    font-size: 12px;
                }
            }
        }
    }

    .infoDetail {
        // .essp_width_auto();

        padding: 34px 0px 0;
        line-height: 30px;
        text-indent: 2em;
        /*border-bottom: 1px solid #ccc;*/
        .content_p {
            padding: 0px 50px;
        }
        .realinfo {
            // padding: 10px 50px;
            line-height: 30px;
        }
    }

    .moreinfo {
        margin-bottom: 20px;
        margin-right: 50px;
        display: flex;
        .common_titdesa {
            font-size: 16px;
            margin-left: 35px;
            padding: 0 12px 4px;
            color: #666;
            font-weight: normal;
            border-left: 4px solid #00a0e9;
        }
        .info_more {
            float: right;
            font-size: 16px;
            line-height: 40px;
            color: #00a0e9;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .newscard_con {
        //.essp_width_auto();
        // width:1180px;
        margin: 0 auto;
        background: #fff;
        margin-bottom: 30px;
    }

    .cursor {
        cursor: pointer;
    }

    .pinglun {
        // width: 1100px;
        // padding: 50px 50px 0;
        margin: 0 auto;
        background-color: #fff;
        overflow: hidden;
    }

    .content-wrap {
        padding: 40px;
        background: #fff;
        width: 1120px;
        margin: 0 auto;
        display: flex;
        .content-limit {
            width: 770px;

        }
    }

    .flex-between {
        display: flex;
        justify-content: space-between;
    }

    .img-width {
        max-width: 100%;
    }
</style>
