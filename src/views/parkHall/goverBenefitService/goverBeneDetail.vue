<template>
    <div class="park-gov-detail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <!-- 惠政服务申请模板 -->
        <div class="newscon">
            <h2>{{dataDetail.policyTitle}}</h2>
            <div class="newstatus esspclearfix">
                <span class="statusitems">
                    <label>发布时间：</label>
                    <em>{{dataDetail.createTime | timerFormat(dataDetail.createTime)}} </em>
                </span>
                <span class="statusitems">
                    <label>发布机构：</label>
                    <em>{{dataDetail.cstNm || '暂无机构'}}</em>
                </span>
                <span class="statusitems">
                    <label>惠政类型：</label>
                    <em v-if="dataDetail.classtType == '1'">科教文卫</em>
                    <em v-if="dataDetail.classtType == '2'">监管监督</em>
                    <em v-if="dataDetail.classtType == '3'">产业支持</em>
                    <em v-if="dataDetail.classtType == '4'">民政事务</em>
                    <em v-if="dataDetail.classtType == '5'">政务政策</em>
                    <em v-if="dataDetail.classtType == '6'">基建生产</em>
                    <em v-if="dataDetail.classtType == '7'">民族宗教</em>
                    <em v-if="dataDetail.classtType == '8'">对外事务</em>
                    <em v-if="dataDetail.classtType == '9'">财政金融</em>
                    <em v-if="dataDetail.classtType == '10'">司法安全</em>
                </span>
            </div>
            <div class="newsbtncon">
                <div class="btncon">
                    <span v-if="dataDetail.isonlineApply == '1'" class="apply-btn-status">
                        <button
                            class="btn-apply"
                            v-if="new Date(dataDetail.avaliableTime).valueOf() < this.now &&
                                    this.now < new Date(dataDetail.avaliableEndTime).valueOf()"
                            @click="linkTo(dataDetail.id)">立即申报</button>
                        <button class="btn-announce"
                                v-if="new Date(dataDetail.avaliableTime).valueOf() > this.now">预告中</button>
                        <button class="btn-end"
                                v-if="new Date(dataDetail.avaliableEndTime).valueOf() < this.now">已结束</button>
                    </span>
                    <span class="focus-btn" @click="showDialog()">
                        <i class="iconfont icon-font-size"
                           :class="followStatus == 0 ? 'icon-aixin-xianxing':'icon-collect2'"></i>
                        {{followStatus == 0 ? "关注" : "已关注"}}
                    </span>
                </div>
            </div>
            <div class="main-body">
                <div class="editor-content" v-html="dataDetail.infoDetail"></div>
            </div>
            <div class="main-foot">
                <div class="file-down">
                    <p class="attachment-p attachment-title" v-if="fileList && fileList.length > 0">附件下载：</p>
                    <p class="attachment-p attachment-main"
                       v-for="(item, index) in fileList"
                       :key="index"
                    >
                        <a :href="item.url" :download="item.name">·附件{{index+1}}：{{item.name}}</a>
                    </p>
                </div>

                <!--<div class="park-tag" v-if="tags && tags.length > 0">-->
                <div v-if="tags && tags.length > 0">
                    <essp-park-tag-busi
                        tagBusiName="惠政标签"
                        tagWidth="900"
                        :tagList="tags"
                    />
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
    import EsspParkTag from "@/components/EsspParkTag";
    import EsspParkTagBusi from "@/components/EsspParkTagBusi";
    import Moment from "moment";
    import mixin from '@/components/mixins/mixins_windowOpen.js'

    export default {
        name: "",
        mixins: [mixin],
        components: {
            EsspBreadCrumb,
            EsspParkTag,
            EsspParkTagBusi,
            Moment
        },
        data() {
            return {
                msg: "惠政详情",
                tags: [],
                breadlist: [
                    {
                        path: "/parkIndex/goverBene/all",
                        name: "园区惠政"
                    },
                    {
                        path: "/parkIndex/goverBeneDetail",
                        name: "惠政详情"
                    }
                ],
                now: '',
                dataDetail: {},

                // 关注
                dialogVisible: false,
                followStatus: "", //资讯关注状态，非0 就是关注了

                //
                id: "",
                followId: "",
                fileList: [], // 附件数据,
                LoginUserRol: this.SSH.getItem("LoginUserRol").toString(),
                loginFlag: this.SSH.getItem("loginFlag"),
            };
        },
        mounted() {
            this.getGoverBenneDetail();
            this.getTagList();
        },
        created() {
            this.now = new Date().valueOf();
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        },
        methods: {
            linkTo(id) {
                if (!this.utils.isLoginMode()) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function () {
                        _this.windowHrefUrl('/userIndex/login')
                    }, 2000);
                    return;
                }
                this.$router.push({
                    path: '/parkIndex/goverEnrollForm',
                    query: {
                        id: id
                    }
                })
            },
            getGoverBenneDetail() {
                this.$post(this.$apiUrl.goverBene.getPolById, {
                    id: this.$route.query.id
                }).then(response => {
                    this.dataDetail = response.resultData;
                    this.followStatus = response.resultData.followStatus;
                    this.followId = response.resultData.followId;
                    this.tags = this.dataDetail.tagsTxt ? this.dataDetail.tagsTxt.split(",") : [];
                    this.fileList = JSON.parse(this.dataDetail.fileUrl);
                });
            },
            // 请求标签接口
            getTagList() {
                this.$post(this.$apiUrl.common.findEntityTag, {
                    entId: this.$route.query.id
                }).then(response => {
                    let _self = this;
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    let lblInfo = response.resultData.lblInfo;
                    if (response.resultData.lblInfo) {
                        for (let i = 0, len = lblInfo.length; i < len; i++) {
                            _self.tags.push(lblInfo[i].lblTxt);
                        }
                    }
                    // }
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
                var pop = type == 0 ? {id: this.$route.query.id} : {followId: this.followId};
                var url = type == 0 ? this.$apiUrl.goverBene.addMyFocus : this.$apiUrl.goverBene.cancelMyFocus;
                var successMsg = type == 0 ? "关注成功" : "取消关注成功";
                var failMsg = type == 0 ? "关注失败" : "取消关注失败";
                this.$post(url, pop).then(
                    response => {
                        var codestatus = response.resultCode;
                        let data = response.resultData;
                        this.$message.success(successMsg);
                        this.followId = data.followId;
                        this.followStatus = data.followStatus;
                        this.dialogVisible = false;
                    },
                    err => {
                        this.$message.error(response.resultMsg);
                    }
                );
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../../../assets/css/mixin";

    @com_font_size: 16px;
    @con_bg: #fff;

    .park-gov-detail {
        margin-bottom: 20px;

        .newsbtncon {
            text-align: center;
            .btncon {
                .apply-btn-status {
                    margin-right: 50px;
                    button {
                        width: 120px;
                        height: 35px;
                        line-height: 35px;
                        color: #fff;
                        border-radius: 3px;
                        border: none;
                        outline: none;
                    }
                    .btn-apply {
                        background-color: #00a0e9;
                        cursor: pointer;
                    }
                    .btn-announce {
                        background-color: #fbba1e;
                    }
                    .btn-end {
                        background-color: #c9ccd3;
                    }
                }
                .focus-btn {
                    min-width: 100px;
                    color: #999999;
                    background-color: #fff;
                    cursor: pointer;
                    i {
                        margin-right: 5px;
                        font-size: 12px;
                        color: #999999;
                    }
                }
            }
        }

        .newscon {
            .essp_width_auto();
            background: @con_bg;
            padding: 58px 0 38px;
            h2 {
                margin-bottom: 20px;
                line-height: 36px;
                text-align: center;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333;
            }

            em {
                font-style: normal;
            }

        }

        .newstatus {
            padding: 0 15%;
            margin-bottom: 20px;
            margin-left: 120px;
            .statusitems {
                float: left;
                margin: 0 24px;
                font-size: 14px;
                line-height: 25px;
                color: #999;
                text-align: center;
            }
        }

        .newstags {
            margin-bottom: 20px;
            text-align: center;
            .tagsbox {
                margin-right: 12px;
                background-color: #cccccc;
                color: #fff;
                font-size: 12px;
                height: 24px;
                line-height: 24px;
            }
        }

        //新闻详情页内容区填充
        .main-body {
            margin: 55px auto 0 auto;
            padding: 30px 0;
            width: 1100px;
            border-top: 1px solid #ccc;
            background: @con_bg;
        }
        .main-foot {
            padding: 60px 50px 0;

            .file-down {
                margin-bottom: 35px;
                padding-bottom: 30px;
                border-bottom: 1px solid #ccc;
                .attachment-p {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #666666;
                }
                .attachment-title {

                }
                .attachment-main {
                    text-indent: 1rem;
                    a {
                        &:hover {
                            color: #00a0e9;
                            cursor: pointer;
                        }
                    }
                }
            }

            .park-tag {
            }

        }

        .icon-font-size {
            font-size: 12px;
        }

        .icon-red {
            color: #ca0c16;
        }
    }
</style>
