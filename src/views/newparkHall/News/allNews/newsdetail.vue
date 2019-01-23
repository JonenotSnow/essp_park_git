<template>
    <div style="margin-bottom: 30px;">
        <div v-show="isShow">
            <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
            <!-- 资讯详情页 -->
            <div class="newscon">
                <h2>{{informationTitle}}</h2>
                <div class="newstatus esspclearfix">
        <span class="statusitemsA">
          <label>发布时间：</label>
          <em>{{createTime | timerFormat(createTime)}}</em>
        </span>
                    <span class="statusitemsB">
          <label>浏览量：</label>
          <em>{{viewTime}}</em>
        </span>
                    <!--<span class="statusitems">-->
                    <!--<div class="follow">-->
                    <!--<i class="icon iconfont icon-liulan"></i>-->
                    <!--<em>{{viewTime}}</em>-->
                    <!--</div>-->
                    <div class="follow cursor guanzhu" @click="showDialog()">
                        <i class="icon iconfont"
                           :class="followStatus == 0 ?'icon-aixin-xianxing':'icon-collect2'"
                           style="font-size: 14px"></i>
                        <span>{{followStatus == 0 ? "关注" : "已关注"}}</span>
                        <span>(已关注{{countFollower || 0}})</span>
                    </div>
                    <!--<div-->
                    <!--class="follow cursor"-->
                    <!--@click="tipOffFn(3,infoDetailData.informationId,infoDetailData.informationTitle)"-->
                    <!--&gt;-->
                    <!--<i class="iconfont icon-warning" style="font-size: 14px;"></i>-->
                    <!--<em>举报</em>-->
                    <!--</div>-->
                    <!-- </span> -->
                </div>
                <div class="tagscon" v-show="tags.length">
                    <div class="tags_con esspclearfix">
                        <div class="tagssubcon">
                            <essp-park-tag
                                v-for="(item, eptIndex) in tags"
                                :value="item"
                                :key="eptIndex"
                            />
                        </div>
                        <!--<button class="infojb"-->
                        <!--@click="tipOffFn(3,infoDetailData.informationId,infoDetailData.informationTitle)">举报-->
                        <!--</button>-->
                    </div>
                </div>
                <!-- <div class="btncon">
                          <el-button type="primary" @click="upDatefollowStatus(followStatus)">{{followStatus==0?"关注":"取消关注"}}</el-button>
                </div>-->
                <div class="jbnc" v-if="prompt == 1">PS: 该内容因被举报正在取证中，请您谨慎对待。</div>
            </div>
            <div class="infoDetail ql-container ql-snow">
                <div class="realinfo ql-editor" v-html="infoDetail"></div>
            </div>

            <div class="pinglun">
                <essp-info-comment commentSty="2"></essp-info-comment>
            </div>

            <!--<div class="common_titwrap esspclearfix">-->
            <!--<div class="moreinfo esspclearfix">-->
            <!--<h3 class="common_titdesa">更多热门资讯</h3>-->
            <!--<div class="info_more" @click="goParkInfoAll">查看更多></div>-->
            <!--</div>-->
            <!--&lt;!&ndash; 更多资讯模块 &ndash;&gt;-->
            <!--<div class="newscard_con">-->
            <!--<more-news></more-news>-->
            <!--</div>-->
            <!--</div>-->

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
        <div style="height:40px;line-height:40px;text-align: center;background-color: #fff;" v-show="!isShow">由于详情内容过大，加载比较慢，请您耐心等候！</div>


    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import EsspInfoComment from "@/components/EsspInfoComment";
    import EsspParkTag from "@/components/EsspParkTag";
    import mixin from '@/components/mixins/mixins_windowOpen.js'

    export default {
        name: "",
        mixins: [mixin],
        components: {
            EsspBreadCrumb,
            EsspInfoComment,
            EsspParkTag
        },
        data() {
            return {
                msg: "资讯详情",
                isShow: false,
                breadlist: [
                    {
                        path: "/newsinfo",
                        name: "资讯公告",
                    },
                    {
                        path: "/news/alllistnews",
                        name: "新闻动态",
                    },
                    {
                        path: "/news/newsdetail",
                        name: "新闻详情"
                    }
                ],
                infoDetailData: {},
                source: "", //总数据
                informationTitle: "", //资讯标签
                content: "", //资讯简介
                infoDetail: "", //资讯详情
                createTime: "", //发布时间
                cstNm: "", //发布机构
                informationId: "", //资讯id
                viewTime: "", //浏览数
                countFollower: "", //关注数
                countComment: "", //评论数
                tags: [], //资讯标签
                prompt: 0,

                // 关注
                dialogVisible: false,
                followStatus: "", //资讯关注状态，非0 就是关注了
                followId: "", // 关注id,
                LoginUserRol: this.SSH.getItem("LoginUserRol").toString(),
                loginFlag: this.SSH.getItem("loginFlag")
            };
        },
        created() {

            this.detailInfoP();
            this.isPit();
        },
        methods: {
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
                    if (response.resultCode == "CLT000000000") {
                        this.prompt = response.resultData.prompt;
                        //                        this.prompt = 1
                    }
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
                this.$post(url, pop).then(response => {
                        var codestatus = response.resultCode;
                        this.dialogVisible = false;
                        let data = response.resultData;
                        this.$message.success(successMsg);
                        this.followId = data.followId;
                        this.followStatus = data.followStatus;
                        if (data.followStatus == 0) {
                            this.countFollower = parseInt(this.countFollower) - 1;
                        }
                        if (data.followStatus == 1) {
                            this.countFollower = parseInt(this.countFollower) + 1;
                        }
                    }, err => {
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
                            var codestatus = response.resultCode;
                            if (codestatus == "CLT000000000") {
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
                                this.isShow = true;
                            } else {
                                this.$message.info(response.resultMsg);
                                this.isShow = false;
                            }
                        },
                        err => {
                            this.$message.error("接口异常");
                            this.isShow = false;
                        }
                    );
                }
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../../../../assets/css/mixin";

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
        .essp_width_auto();
        background: #fff;
        padding: 40px 0 0;
        // border-bottom: 1px solid #ccc;
        // margin-bottom: 15px;
        h2 {
            .esspellipsis(); //超出省略号
            font-size: 20px;
            line-height: 36px;
            color: #333;
            text-align: center;
            margin-bottom: 15px;
            font-weight: normal;
        }
        //关注按钮
        .btncon {
            text-align: center;
        }
    }

    //标签模块样式
    .tagscon {
        .essp_width_auto();
        background: #fff;
        margin-bottom: 0;
        .tags_con {
            padding: 0 5%;
            text-align: center;
            overflow: hidden;
            .tagssubcon {
                /*float: left;*/
                line-height: 30px;
                .taglables {
                    float: left;
                    margin-right: 20px;
                    font-size: 14px;
                    line-height: 30px;
                }
                .tagitem {
                    float: left;
                    margin-right: 20px;
                    color: #fff;
                    background-color: #409eff;
                    border-color: #409eff;
                }
            }
        }
    }

    .newstatus {
        padding: 0 15% 20px;
        /*margin-bottom: 20px;*/
        .statusitemsA {
            float: left;
            width: 30%;
            font-size: 14px;
            line-height: 25px;
            color: #999;
            text-align: center;
            em {
                font-style: normal;
            }
        }
        .statusitemsB {
            float: left;
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
        .statusitems {
            float: left;
            width: 20%;
            margin-left: 30px;
            font-size: 14px;
            line-height: 25px;
            color: #999;
            text-align: center;
            .follow {
                float: left;
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
        .essp_width_auto();
        background: #fff;
        padding: 34px 0px 0;
        line-height: 30px;
        text-indent: 2em;
        /*border-bottom: 1px solid #ccc;*/
        .content_p {
            padding: 0px 50px;
        }
        .realinfo {
            padding: 10px 50px;
            line-height: 30px;
        }
    }

    .moreinfo {
        margin-bottom: 20px;
        margin-right: 50px;
        .common_titdesa {
            float: left;
            font-size: 20px;
            margin-left: 35px;
            padding: 0 12px 4px;
            font-weight: normal;
            border-left: 10px solid #00a0e9;
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
        .essp_width_auto();
        background: #fff;
        margin-bottom: 30px;
    }

    .cursor {
        cursor: pointer;
    }

    .pinglun {
        width: 1100px;
        padding: 50px 50px 0;
        margin: 0 auto;
        background-color: #fff;
        overflow: hidden;
    }

    .icon-collect2 {
        color: #ff0000;
    }
</style>
