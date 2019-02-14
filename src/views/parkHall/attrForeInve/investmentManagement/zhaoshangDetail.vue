<template>
    <div>
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div id="zhaoshangDetail">
            <div class="header">
                <span>项目详情</span>
            </div>
            <div class="main">
                <div class="resume">
                    <div class="titleDescribe">
                        <span class="title">{{attractInvestion.atractInvestTitle}}</span>
                        <span v-if="getLevel">{{getLevel}}</span>
                        <span v-if="attractInvestion.projectManagerName">{{attractInvestion.projectManagerName}}</span>
                        <span v-if="attractInvestion.spaceSize">{{attractInvestion.spaceSize}}/㎡</span>
                    </div>
                    <div class="itemResume esspclearfix">
                        <span class="itemResumeTitle">推&nbsp;&nbsp;荐&nbsp;人：</span>
                        <span class="describe">{{attractInvestion.referrer || '无'}}</span>
                    </div>
                    <div class="itemResume esspclearfix">
                        <span class="itemResumeTitle">项目来源：</span>
                        <span class="describe">{{getSource || '无'}}</span>
                    </div>
                    <div class="itemResume esspclearfix">
                        <span class="itemResumeTitle">首访日期：</span>
                        <span class="describe">{{attractInvestion.visitDate | timerFormat}}</span>
                    </div>
                    <div class="itemResume esspclearfix">
                        <span class="itemResumeTitle">项目简介：</span>
                        <span class="describe">{{attractInvestion.atractInvestContent || '无' }}
                    </span>
                    </div>
                    <div class="itemResume esspclearfix">
                        <span class="itemResumeTitle">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;：</span>
                        <span class="describe">{{attractInvestion.investComment || '无'}}</span>
                    </div>
                </div>
                <div class="content">
                    <div class="contentleft">
                        <h3>跟踪记录</h3>
                        <p>

                            <el-input v-model="input" placeholder="快速添加跟踪记录,按回车键保存"
                                      @keyup.enter.native="submit(input)"></el-input>
                        </p>
                        <div class="step">
                            <ul>
                                <li v-for="(item, index) in followHistory" :key="index" :class="{'active':index==0}">
                                    <div class="project-list-title">
                                        <div class="pull-left">
                                            <!-- <img v-if='index==0' src="./1.png" alt=""> -->
                                            <img v-if='index==0' src="@/assets/imgs/investment/elected.png" alt="">
                                            <img v-else src="@/assets/imgs/investment/elected.png" alt="">
                                            <span class="time">{{item.followTime | timerFormat}}</span>
                                            {{item.followPersonName}}
                                            <!--<img class="editer" src="./3.png" alt="">-->
                                        </div>
                                        <div class="pull-right">
                                            {{itemStatus(item.followType)}}
                                        </div>
                                    </div>
                                    <div class="project-list-content" @click="parentShow(true,item)">{{item.followDesc}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="contentRight">
                        <div class="contentRightTop">
                            <h3>项目需求</h3>

                            <p>空间需求：<span>{{attractInvestion.spaceSize||'0'}}/㎡</span></p>
                            <p>需要帮助：<span>{{getHelp || '无'}}</span></p>
                        </div>
                        <div class="contentRightMiddle">
                            <h3>联系人</h3>
                            <div class="middle">

                                <div class="middleLeft">{{attractInvestion.customName || '无'}}</div>
                                <div class="middleRight">

                                    <p><img src="" alt="">手机：<span>{{attractInvestion.customMobile || '无'}}</span></p>
                                    <p><img src="" alt="">QQ：<span>{{attractInvestion.customQq || '无'}}</span></p>
                                    <p><img src="" alt="">邮箱：<span>{{attractInvestion.customEmail || '无'}}</span></p>
                                    <p><img src="" alt="">微信：<span>{{attractInvestion.customWechat || '无'}}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="contentRightBottom" v-if="attractInvestion.attachment">
                            <h3>附件</h3>
                            <a class="el-icon-document" :href="attractInvestion.attachment" target="_blank"></a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 项目转派 -->
            <ItemTraceDialog :show='showOne' :detail='item' @parentShowTrance="parentShow"></ItemTraceDialog>
        </div>
    </div>
</template>

<script>

    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import ItemTraceDialog from "./component/itemTraceDialog.vue";
    import Moment from "moment";

    export default {
        components: {
            EsspBreadCrumb,
            ItemTraceDialog
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        },
        data() {
            return {
                breadlist: [
                    {
                        path: "/parkHall/manage/myInvestment/reserveInvestment",
                        name: "招商管理"
                    },
                    {
                        name: "招商详情"
                    }
                ],

                showOne: false,
                id: this.$route.query.id,
                attractInvestion: {},
                followHistory: [],
                item: {},
                input: '',
                needList: [
                    {context: "项目申报", tureval: "1"},
                    {context: "政策咨询", tureval: "2"},
                    {context: "天使投资", tureval: "3"},
                    {context: "贷款", tureval: "4"},
                    {context: "融资", tureval: "5"},
                    {context: "场地", tureval: "6"},
                    {context: "项目包装", tureval: "7"},
                    {context: "上市辅导", tureval: "8"},
                    {context: "创业辅导", tureval: "9"},
                    {context: "咨询培训", tureval: "10"},
                    {context: "技术支撑", tureval: "11"},
                    {context: "人才招聘", tureval: "12"},
                    {context: "注册/变更", tureval: "13"},
                    {context: "财税代理", tureval: "14"},
                    {context: "专利代理", tureval: "15"},
                    {context: "注册/变更", tureval: "16"},
                    {context: "财税代理", tureval: "17"},
                    {context: "专利代理", tureval: "18"}
                ],
                // 重要程度
                importantLevelList: [
                    {context: "一般项目", tureval: "1"},
                    {context: "重点项目", tureval: "2"},
                    {context: "特殊项目", tureval: "3"}
                ],
                // 项目来源
                investSourceList: [
                    {context: "中介推荐", tureval: "1"},
                    {context: "同事推荐", tureval: "2"},
                    {context: "网站宣传", tureval: "3"},
                    {context: "招商活动", tureval: "4"},
                    {context: "领导推荐", tureval: "5"}
                ],
                needMap: new Map(),
                importantLevel: new Map(),
                investSource: new Map()
            };
        },
        methods: {

            // 返回
            goBack() {
                window.history.go(-1);
            },

            parentShow(msg, item) {
                this.showOne = msg;
                if (item) {
                    this.item = item;
                    if (typeof item.followAccessory == "string") {
                        this.item.followAccessory = JSON.parse(item.followAccessory);
                        this.item.followIntention = JSON.parse(item.followIntention);
                    }
                }
            },

            getDetail() {
                this.$post(this.$apiUrl.investment.getAttracById, {id: this.id})
                    .then(result => {
                        if (result.resultCode === "CLT000000000" || codestatus == "0000000000") {
                            this.attractInvestion = result.resultData.attractInvestion;
                        }
                    })
                    .catch(err => {
                    });
            },
            geiAttractFollowPage() {
                this.$post(this.$apiUrl.processTrack.getAttractFollowPage, {
                    followNumber: this.id
                }).then(response => {
                    if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                        this.followHistory = response.resultData.list;
                        this.input = '';
                        console.log(this.followHistory);
                    } else {
                        this.$message.error(response.resultMsg)
                    }
                }, (response) => {
                    this.$message.error(response.resultMsg)
                })
            },
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
            },
            // 提交跟踪记录
            submit(val) {
                if (val == "") {
                    this.$message.warning('请先输入要查询的关键字');
                    return;
                }
                console.log(val);
                this.$post(this.$apiUrl.processTrack.addAttractFollow, {
                    followNumber: this.id,       // 项目编号
                    followTime: this.timerFormat(this.attractInvestion.visitDate),                  // 跟进时间
                    followType: 1, // 跟进类型   (必填)
                    followDesc: val,                         // 跟进详情(过程纪要)    (必填)
                    followStatus: this.attractInvestion.followStatus,   // 跟进状态（项目状态）   (必填)
                    followPerson: this.attractInvestion.issuer,         // 跟进人   (必填)
                    followIntention: "",                                  // 意向房源 JSON.stringify(this.form.roomInfoList)
                    followAccessory: [],                                  // 附件
                    parkId: this.attractInvestion.parkId                // 园区ID（必填）
                }).then(response => {
                    if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                        this.geiAttractFollowPage()
                    } else {
                        this.$message.error(response.resultMsg)
                    }
                }, (response) => {
                    this.$message.error(response.resultMsg)
                })
            },
            itemStatus: function (followStatu) {
                if (followStatu == 1) {
                    return "来访";
                } else if (followStatu == 2) {
                    return "走访";
                } else if (followStatu == 3) {
                    return "电话";
                } else {
                    return "邮件";
                }
            }
        },
        computed: {
            getHelp: function () {
                if (!this.attractInvestion.needHelp) {
                    return "";
                }
                let list = this.attractInvestion.needHelp.split(",");
                let strList = [];
                list.forEach(item => {
                    strList.push(this.needMap.get(item));
                });
                return strList.join(",");
            },
            getLevel: function () {
                return this.importantLevel.get(this.attractInvestion.importantLevel);
            },
            getSource: function () {
                return this.investSource.get(this.attractInvestion.investSource);
            }
        },
        created() {
            this.getDetail();

            this.geiAttractFollowPage(); // 获取跟进信息列表

            var _this = this;
            this.needList.forEach(item => {
                this.needMap.set(item.tureval, item.context);
            });
            this.importantLevelList.forEach(item => {
                this.importantLevel.set(item.tureval, item.context);
            });
            this.investSourceList.forEach(item => {
                this.investSource.set(item.tureval, item.context);
            });

        }
    };

</script>

<style lang='less' scoped>
    #zhaoshangDetail {
        position: relative;
        width: 1200px;
        background: #fff;
        /*margin: 20px auto;*/
        margin: 0px auto;
        padding: 20px 10px;
        .gobackBtn {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 16px;
            text-align: center;
        }
        .header {
            width: 100%;
            text-align: center;
            height: 51px;
            padding: 20px 0;
            span {
                position: relative;
                font-size: 25px;
            }
            span:before {
                position: absolute;
                content: " ";
                left: -168px;
                top: 50%;
                width: 150px;
                height: 1px;
                background: #ccc;
            }
            span:after {
                position: absolute;
                content: " ";
                right: -168px;
                top: 50%;
                width: 150px;
                height: 1px;
                background: #ccc;
            }
        }
        .main {
            overflow-x: hidden;
            overflow-y: auto;
            padding: 0px 30px;
            margin-top: 10px;
            .resume {
                width: 100%;
                /*padding: 20px 40px;*/
                /*border: #eee solid 1px;*/
                .titleDescribe {
                    line-height: 50px;
                    .title {
                        font-size: 22px;
                    }
                    span {
                        &:not(:first-child) {
                            max-width: 135px;
                            height: 22px;
                            text-align: center;
                            line-height: 22px;
                            border: solid 1px;
                            border-radius: 2px;
                            font-size: 12px;
                            margin-left: 15px;
                            padding: 0 10px;
                            overflow: hidden;
                            margin-top: 15px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            &:nth-of-type(3n) {
                                border-color: #ff9b70;
                                color: #ff9b70;
                            }
                            &:nth-of-type(3n-1) {
                                border-color: #20a148;
                                color: #20a148;
                            }
                            &:nth-of-type(3n-2) {
                                border-color: #ff6a6a;
                                color: #ff6a6a;
                            }
                        }
                    }
                }
                .itemResume {
                    font-size: 14px;
                    height: 40px;

                    .itemResumeTitle {
                        float: left;
                        width: 90px;
                        /*text-align: space-around;*/
                        color: #999;
                    }
                    .describe {
                        float: left;
                        width: 80%;
                        /*white-space: nowrap;*/
                        /*text-overflow: ellipsis;*/
                        /*overflow: hidden;*/
                        /*position: relative;*/
                        /*top: 5px;*/
                    }
                }
            }
            .content {
                width: 100%;
                margin-top: 20px;
                overflow: hidden;
                .contentleft {
                    width: 60%;
                    float: left;
                    min-height: 132px;
                    border: 1px solid #eee;
                    h3 {
                        padding: 20px;
                    }
                    p,
                    .step {
                        width: 80%;
                        margin: 0 auto 30px;
                    }
                    .step {
                        ul {
                            li {
                                .project-list-title {
                                    height: 50px;
                                    line-height: 50px;
                                    overflow: hidden;
                                    .pull-left {
                                        float: left;
                                        color: #333;
                                        img {
                                            width: 16px;
                                            height: 16px;
                                            position: relative;
                                            top: 3px;
                                        }
                                        .editer {
                                            margin-left: 10px;
                                            display: none;
                                        }
                                    }
                                    .pull-right {
                                        float: right;
                                        color: #888;
                                        cursor: pointer;
                                    }
                                    &:hover {
                                        .pull-left {
                                            // background: red;
                                            .editer {
                                                display: block;
                                            }
                                        }
                                    }
                                }
                                .project-list-content {
                                    padding: 5px 0;
                                    border-left: 1px dashed #ddd;
                                    text-indent: 20px;
                                    cursor: pointer;
                                }
                                &.active {
                                    .project-list-content {
                                        border-left: 1px dashed #00bdda;
                                        color: #00bdda;
                                    }
                                }
                            }
                        }
                    }
                }
                .contentRight {
                    width: 35%;
                    float: right;
                    & > div {
                        border: #eee solid 1px;
                        padding: 10px 20px;
                        min-width: 100px;
                    }
                    .contentRightTop {
                        p {
                            /*height: 40px;*/
                            line-height: 40px;
                            color: #333;
                            span {
                                color: #979595;
                            }
                        }
                    }
                    .contentRightMiddle {
                        margin-top: 20px;
                        .middle {
                            margin-top: 15px;
                            overflow: hidden;
                            .middleLeft {
                                width: 30%;
                                float: left;
                            }
                            .middleRight {
                                padding-left: 4%;
                                width: 65%;
                                float: right;
                                border-left: 1px dashed #ddd;
                                p {
                                    line-height: 35px;
                                }
                            }
                        }
                    }
                    .contentRightBottom {
                        margin-top: 20px;
                        min-height: 200px;
                    }
                }
            }
        }
    }
</style>
