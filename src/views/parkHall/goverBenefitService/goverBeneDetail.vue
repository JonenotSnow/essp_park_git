<template>
    <div style="margin-bottom: 30px;">
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

                <!-- <span class="statusitems">
                    <label>已申报人数：</label>
                    <em>{{dataDetail.approvedNum || '0'}}</em>
                </span> -->
            </div>
            <div class="tagscon" v-show="tags && tags.length>0">
                <div style="text-align: center">
                    <essp-park-tag
                        v-for="(item, eptIndex) in tags"
                        :value="item"
                        :key="eptIndex"
                    />
                </div>
            </div>
            <div class="newsbtncon">
                <!--<el-button type="primary" size="mini" round>立即申请</el-button>-->
                <div class="btncon">
                    <!--{{followStatus == 0 ? "立即申请" : "取消申请"}}-->
                    <span v-if="dataDetail.isonlineApply == '1'" style="margin-right: 120px">
                        <el-button type="primary" size="mini" round
                                   v-if="new Date(dataDetail.avaliableTime).valueOf() < this.now &&
                                    this.now < new Date(dataDetail.avaliableEndTime).valueOf()"
                                   @click="linkTo(dataDetail.id)">立即申报</el-button>
                        <el-button type="info" size="mini" round
                                   v-if="new Date(dataDetail.avaliableTime).valueOf() > this.now">预告中</el-button>
                    </span>
                    <!--<span v-if="dataDetail.isonlineApply == '0'">-->
                    <!--<el-button type="info" size="mini" round>未开放</el-button>-->
                    <!--</span>-->

                    <el-button type="primary" size="mini" round
                               class="focus-btn"
                               @click="showDialog()"
                    >
                        <i class="iconfont icon-font-size"
                           :class="followStatus == 0 ? 'icon-aixin-xianxing':'icon-collect2'"></i>{{followStatus
                        == 0 ? "关注" : "已关注"}}
                    </el-button>
                </div>
            </div>
            <div class="newscontain" v-html="dataDetail.infoDetail">
            </div>
            <div class="fileListDown" v-if="fileList.length > 0">
                <div class="scfj">上传附件:</div>
                <div v-for="(item,index) in fileList" :key="index">
                    <a :href="item.url" target="_blank" :download="item.name">{{item.name}}</a>
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
    import Moment from "moment";
    import mixin from '@/components/mixins/mixins_windowOpen.js'

    export default {
        name: "",
        mixins:[mixin],
        components: {
            EsspBreadCrumb,
            EsspParkTag,
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
                LoginUserRol:this.SSH.getItem("LoginUserRol").toString(),
                loginFlag:this.SSH.getItem("loginFlag")
            };
        },

        created() {
            this.now = new Date().valueOf();
            this.getGoverBenneDetail();
            this.getTagList();

        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        },
        methods: {
            linkTo(id) {
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
                    if (response.resultCode == "CLT000000000") {
                        let lblInfo = response.resultData.lblInfo;
                        if (response.resultData.lblInfo) {

                            for (let i = 0, len = lblInfo.length; i < len; i++) {

                                _self.tags.push(lblInfo[i].lblTxt);
                            }
                        }
                    }
                });
            },

            /**
             * 关注事件
             */
            // 弹窗
            showDialog() {
                //未登录
                if(!this.utils.isLoginMode()){
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function(){
                        _this.windowHrefUrl('/userIndex/login')
                    },2000);
                    return
                }
                //游客模式暂不支持关注
                if(this.utils.isVisitorMode()){
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
                var pop =
                    type == 0 ? {id: this.$route.query.id} : {followId: this.followId};
                var url =
                    type == 0
                        ? this.$apiUrl.goverBene.addMyFocus
                        : this.$apiUrl.goverBene.cancelMyFocus;
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
    .newsbtncon {
        text-align: center;
        .btncon {
            .focus-btn {
                color: black;
                min-width: 100px;
                border-color: #cccccc;
                background-color: #fff;
                i {
                    margin-right: 5px;
                    color: #fc1878;
                    font-size: 12px;
                }

            }
        }
    }

    .fileListDown {
        padding: 10px 48px;
        .scfj {
            padding-bottom: 10px;
        }
        a {
            padding: 0 10px;
            display: block;
            height: 30px;
            line-height: 30px;
        }
        a:hover {
            background: #ccf;
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
    .newscontain {
        margin: 30px auto 0 auto;
        padding: 30px 0;
        width: 1100px;
        border-top: 1px solid #ccc;

        background: @con_bg;

    }

    .news_td {
        padding: 5px 50px;
        margin-bottom: 10px;
        .news_to,
        h2 {
            font-size: 16px;
            line-height: 30px;
            margin-bottom: 15px;
            color: #333;
        }
        p {
            line-height: 30px;
            font-size: 14px;
            text-indent: 2em;
            margin-bottom: 10px;
            color: #444;
        }
    }

    .tit_con {
        width: 81%;
        margin: 0 auto 20px;
        background-color: #fef9f0;
        border: solid 1px #ff9900;
        padding: 18px 24px;
        p {
            text-align: left;
            font-size: 16px;
            line-height: 24px;
            color: #666666;
        }
    }

    //基本信息布局
    .tdcon {
        overflow: hidden;
        // margin-bottom: 25px;
        width: 500px;
        margin: 0 auto;
        margin-bottom: 25px;
        // margin-left: 150px;
        //text-align: center;

        .inline_div {
            line-height: 40px;
            margin-left: 50px;

            .tagsspanbox {
                float: left;
                .it_tag {
                    float: left;
                    margin-right: 5px;
                    margin-top: 10px;
                }
            }
        }
    }

    //标签模块样式
    .tagscon {
        background: @con_bg;
        padding-bottom: 40px;
        .essp_width_auto(1100px);
        .tags_con {
            // padding: 30px 5%;
            overflow: hidden;
            .taglables {
                float: left;
                margin-right: 20px;
                font-size: 14px;
                // line-height: 30px;
            }
            .tagitem {
                margin-right: 20px;
                color: #fff;
                border: solid 1px #999999;
                background-color: #999;
            }
        }
    }

    .icon-font-size {
        font-size: 12px;
    }

    .icon-red {
        color: #ca0c16;
    }
</style>
