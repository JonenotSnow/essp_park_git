<template>
    <div>
        <!-- 我发布的惠政 页面模版 -->
        <div class="launchcon launchcon_hz">
            <div class="toolcon esspclearfix">
                <div class="toolleft">
                    <span :class="{'showblue': type == 0}" @click="changeType(0)">已发布</span>
                    <span :class="{'showblue': type == 1}" @click="changeType(1)">草稿箱</span>
                </div>
                <div class="toolright">
                    <el-button class="toolright_btn" type="primary" size="mini" @click="$router.push('/parkIndex/publishGover')">
                        <i class="el-icon-circle-plus"></i>发布新惠政
                    </el-button>
                </div>
            </div>
            <!-- 草稿箱 -->
            <div v-if="type == 1">
                <div class="esspclearfix tools">
                    <span class="tdspan">
                        <el-button type="info" plain @click="delDelDraft()">删除草稿</el-button>
                    </span>
                    <span class="tdspan">
                        <el-date-picker v-model="timeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </span>
                    <span class="tdspan">
                        <el-button type="primary" icon="el-icon-search" @click="getGoverList()">搜索</el-button>
                    </span>
                </div>
                <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="userName" label="发布人" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="保存时间" width="155" show-overflow-tooltip>
                        <template slot-scope="scope">{{ scope.row.createTime | timerFormatDraft(scope.row.createTime)}}
                        </template>
                    </el-table-column>

                    <el-table-column width="300" label="惠政标题" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="hz-title">{{ scope.row.policyTitle}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <!--<el-button type="primary" @click="goBaoMing(scope)" size="mini">编辑</el-button>-->
                            <button class="edit-btn" @click="goBaoMing(scope)">
                                <span class="edit-text">编</span>辑
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 已发布 -->
            <ul v-if="type == 0" class="esspclearfix">
                <li v-if="activedata.length!=0" class="itemli" v-for="(item, index) in activedata" :key="index">
                    <div class="infostit esspclearfix">
                        <span class="spanfabu">发布人:
                            <em>{{item.userName}}</em>
                        </span>
                        <span class="spantime">发布时间:
                            <em>{{item.createTime | timerFormat(item.createTime)}}</em>
                        </span>
                        <span>惠政状态:
                            <em>{{item.status | statusFormat(item.status)}}</em>
                        </span>
                        <!--<span class="spantime">-->
                        <!--有效期:-->
                        <!--<em>{{ diffDate(item.avaliableTime ,item.avaliableEndTime)}}</em>-->
                        <!--</span>-->
                        <span class="spanfabuzhong">
                            <!--<em>惠政状态:{{statusCn(item.avaliableTime ,item.avaliableEndTime)}} </em>-->
                        </span>
                        <div class="delete" v-if="checkActivityOperateAuth(item.userName)">
                            <i class="el-icon-delete" @click="delBene(item.id)"></i>
                        </div>
                    </div>
                    <div class="infocon esspclearfix">
                        <div class="logocon" @click="goActiveDetail(item.id)">
                            <img class="detaillogo" v-lazy="item.titleImg" alt>
                        </div>
                        <div class="detailcon detailcon_l essp-card-cont-inner1">
                            <h2 @click="goActiveDetail(item.id)">{{item.policyTitle}}</h2>
                            <!--<p class="release-introduce">{{item.infoDetail}}</p>-->
                            <div class="release-introduce" id="reset_con_style" v-html="item.infoDetail"></div>
                            <div class="fundiv">
                                <span class="funitems">
                                    <i :class="icons[2]"></i>
                                    {{item.viewTime || 0}}
                                </span>
                                <span class="funitems">
                                    <i :class="icons[3]" style="font-size: 13px"></i>
                                    {{item.countFollower || 0}}
                                </span>
                            </div>
                        </div>
                        <div class="detailcon detailcon_r essp-card-cont-inner1" v-if="checkActivityOperateAuth(item.userName)">
                            <el-button type="primary" class="essp-btn" :disabled="item.status|disableBtnFormat(item.status)" @click="editActivity(item.id)">编辑
                            </el-button>
                            <!--<el-button type="primary" v-if="statusCn(item.avaliableTime ,item.avaliableEndTime) != '已结束'" class="essp-btn" @click="auditActivity(item.id)">立即申请</el-button>-->
                            <el-button style="margin-left: 0px; margin-top: 10px" type="primary" class="essp-btn" @click="goGoverReviewBm(item.id)">报名审核
                            </el-button>
                        </div>
                    </div>
                </li>
                <li v-if="activedata.length==0">
                    <!-- <div style="text-align: center">{{lodingMsg}}</div> -->
                    <essp-loading :loading="!isLoginEnd"  :nodata="activedata.length==0 && isLoginEnd"></essp-loading>
                </li>
            </ul>
        </div>
        <div class="pageList">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageRanges" :page-size="pageSize" layout="total,sizes, prev, pager, next, jumper" :total="allTotal"></el-pagination>
        </div>
    </div>
</template>

<script>
    // import EsspTopToolbar from "@/components/EsspTopToolbar";
    import { goverBene } from "@/fetch/api/goverBene/goverBene";
    import Moment from "moment";

    export default {
        components: {
            // EsspTopToolbar,
            Moment
        },
        name: "",
        data() {
            return {
                msg: "我发起的惠政",
                pageRanges: [5, 10, 20, 50, 100], //默认每页10条数区间
                pageNum: 1, //当前页码
                pageSize: 10, //每页条数
                allTotal: 1, //总条数
                startDate: "", //起始时间
                endDate: "", //结束时间
                pageType: "releaseGover", //发起的惠政列表页
                activedata: [],
                tag: [],
                isLoginEnd:false,
                curent_toolspan: 0,
                toolspans: [
                    {
                        id: 1,
                        name: "已发布",
                        path: "/parkIndex/goverBene/release"
                    },
                    {
                        id: 2,
                        name: "草稿箱",
                        path: "/parkIndex/goverBene/draft"
                    }
                ],
                thisPage: 1, // 当前页数
                icons: [
                    "icon iconfont icon-riqi",
                    "icon iconfont icon-dizhi",
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2"
                ],
                curstatus: 0,
                nowTime: new Date().getTime(),

                //草稿合并参数
                tableData3: [],
                ids: "", //删除的ids
                timeRange: [],
                type: 0
            };
        },
        methods: {
            changeType(type) {
                if (type == 0) {
                    this.type = type;
                    this.getMyPubPolList();
                }
                if (type == 1) {
                    this.type = type;
                    this.getGoverList();
                }
            },
            handleSizeChange(val) {
                this.pageSize = val;
                if (this.type == 0) {
                    this.getMyPubPolList();
                } else {
                    this.getGoverList();
                }
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                if (this.type == 0) {
                    this.getMyPubPolList();
                } else {
                    this.getGoverList();
                }
            },
            auditActivity(id) {
                this.$router.push({
                    path: "/parkIndex/goverEnrollForm",
                    query: {
                        id: id
                    }
                });
            },
            editActivity(id) {
                this.$router.push({
                    path: "/parkIndex/publishGover",
                    query: {
                        draftId: id
                    }
                });
            },
            goGoverReviewBm(goverBenefitId) {
                // /parkIndex/goverReviewBm
                this.$router.push({
                    path: "/parkIndex/goverReviewBm",
                    query: {
                        goverBenefitId: goverBenefitId
                    }
                });
            },
            goActiveDetail(beneid) {
                this.$router.push({
                    path: "/parkIndex/goverBeneDetail",
                    query: { id: beneid }
                });
            },
            linkTo() {
                this.$router.push("/parkIndex/publishGover");
            },
            diffDate(vaule, values1) {
                var diff = values1 - vaule;
                var day = Math.floor(diff / 1000 / 60 / 60 / 24);
                return day + "天";
            },
            getMillisecond(vaule) {
                // 获取秒数
                return Moment(vaule).unix();
            },
            statusCn(startTime, endTime) {
                if (!startTime && !endTime) {
                    return "发布成功";
                }
                // var thisTime = this.getMillisecond(new Date());
                var enterEndtime = startTime / 1000; // 活动报名截止时间
                var enterStarttime = endTime / 1000; // 活动报名开始时间
                if (this.nowTime < enterStarttime) {
                    this.curstatus = 0;
                    return "预告中";
                }
                if (
                    this.nowTime >= enterStarttime &&
                    this.nowTime <= enterEndtime
                ) {
                    this.curstatus = 1;
                    return "发布中";
                }
                if (this.nowTime > enterEndtime) {
                    this.curstatus = 2;
                    return "已结束";
                }
            },
            getMyPubPolList() {
                var url = this.$apiUrl.goverBene.getMyPubPol;
                this.isLoginEnd = false;
                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    status: "01",
                    parkId: sessionStorage.getItem("parkId") || ""
                }).then(
                    response => {
                        // if (
                        //     response.resultCode == "CLT000000000" ||
                        //     response.resultCode == "0000000000"
                        // ) {
                        this.isLoginEnd = true;
                        this.activedata = response.resultData.policyList;
                        this.allTotal = response.resultData.total;
                        this.tag = this.activedata.tagsTxt
                            ? this.activedata.tagsTxt
                            : [];
                        // } else {
                        //     this.$message.info(response.resultMsg);
                        // }
                    },
                    err => {
                        this.isLoginEnd = true;
                        this.$message.error("接口异常");
                    }
                );
            },
            delBene(id) {
                if (id == "") {
                    this.$message("您没有选择删除的项目！");
                    return;
                }
                var pop = { ids: id };
                var url = this.$apiUrl.goverBene.delPolicy;

                this.$confirm("删除该项目,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$post(url, pop).then(
                        response => {
                            // if (
                            //     response.resultCode == "CLT000000000" ||
                            //     response.resultCode == "0000000000"
                            // ) {
                            this.$message.success("删除成功");
                            this.activedata = [];
                            this.getMyPubPolList();
                            // } else {
                            //     this.$message.info(response.resultMsg);
                            // }
                        },
                        err => {
                            this.$message.error("接口异常");
                        }
                    );
                });
            },
            goBaoMing(scope) {
                var draftId = scope.row.id;
                this.$router.push({
                    path: "/parkIndex/publishGover",
                    query: { draftId: draftId }
                });
            },
            handleSelectionChange(val) {
                var _this = this;
                var selectArray = [];
                this.multipleSelection = val;
                this.multipleSelection.forEach(function(item) {
                    var id = item.id;
                    selectArray.push(id);
                });
                _this.ids = selectArray.join(",");
            },
            getGoverList() {
                var url = goverBene["getMyPubPol"] || "";

                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.timeRange[0] ? this.timeRange[0] : "",
                    endDate: this.timeRange[1] ? this.timeRange[1] : "",
                    status: "0",
                    parkId: sessionStorage.getItem("parkId") || ""
                }).then(response => {
                    this.timeRange = [];
                    this.tableData3 = response.resultData.policyList;
                    this.allTotal = response.resultData.total;
                });
            },
            delDelDraft() {
                if (this.ids == "") {
                    this.$message("您没有选择删除的项目！");
                    return;
                }
                var ids = this.ids;
                var pop = { ids: ids };
                var url = this.$apiUrl.goverBene.delPolicy;
                this.$post(url, pop).then(
                    response => {
                        // if (
                        //     response.resultCode == "CLT000000000" ||
                        //     response.resultCode == "0000000000"
                        // ) {
                        this.getGoverList();
                        // } else {
                        //     this.$message.info(response.resultMsg);
                        // }
                    },
                    err => {
                        this.$message.error("接口异常");
                    }
                );
            },

            // 判断是不是自己发布的
            checkActivityOperateAuth(recordOwner) {
                let defautlFlag = false;
                let currentUser = this.SSH.getItem("userName");

                if (currentUser === recordOwner) {
                    defautlFlag = true;
                }

                return defautlFlag;
            }
        },
        mounted() {},
        created() {
            if (this.$route.query.type) {
                this.type = this.$route.query.type;
                if (this.type == 1) {
                    return this.getGoverList();
                }
            }
            this.getMyPubPolList();
        },
        computed: {
            activityLabelList() {
                let arr = [];
                let brr = [];
                let len = this.activedata.length;
                for (let i = 0; i < len; i++) {
                    if (this.activedata[i].tagsTxt != undefined) {
                        arr = this.activedata[i].tagsTxt.split(",");
                    } else {
                        arr = [];
                    }
                    brr.push(arr);
                }
                return brr;
            }
        },
        filters: {
            statusFormat(value) {
                let statusList = {
                    "10": "园区待审核",
                    "01": "园区审核中",
                    "02": "发布中",
                    "12": "园区审核未通过",
                    "21": "企业待审核",
                    "05": "企业审核中",
                    "03": "企业审核未通过",
                    "13": "高级管理员待审核",
                    "14": "高级管理员审核中"
                };
                return statusList[value] ? statusList[value] : "————";
            },
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            },
            timerFormatDraft(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm");
            },
            disableBtnFormat(code) {
                // 在审核状态不可编辑
                return code == "01" || code == "10";
            }
        }
    };
</script>

<style scoped lang='less'>
    @import "../../../assets/css/mixin";

    .launchcon {
        padding: 0px 20px 0;
        background: #fff;
    }

    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }

    // 消息简介汇总
    .itemli {
        margin-top: 25px;
    }

    .infostit {
        background-color: #f1f1f1;
        height: 30px;
        line-height: 30px;
        span {
            float: left;
            // width: 30%;
            padding-left: 1%;
            text-align: left;
            color: #666666;
            em {
                margin-left: 4px;
                font-style: normal;
                /*color: #00a0e9;*/
            }
        }

        .spanfabu {
            width: 23%;
        }

        .spantime {
            width: 23%;
        }

        .spanfabuzhong {
            width: 15%;
        }

        .delete {
            float: right;
            margin-right: 10px;

            i {
                cursor: pointer;
            }
        }
    }

    .infocon {
        margin-top: 10px;
        transition: all 1s;
        &:hover {
            zoom: 1;
            box-shadow: 1px 1px 2px 0px rgba(0, 102, 179, 0.15);
        }
        h2 {
            margin-top: 5px;
        }
        .funitems {
            margin-right: 15px;
        }
    }

    .logocon {
        display: inline-block;
        position: relative;
        margin-right: 20px;
        width: 25%;
        height: 140px;
        line-height: 140px;
        transition: all 1s;
        &:hover .img_tips {
            display: block;
            transform: scale(1.02);
        }
        //显示hover效果的遮盖层
        .img_tips {
            display: none;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20px;
            background-color: #000000;
            p {
                position: absolute;
                top: 0;
                color: #fff;
            }
            .enrolled {
                left: 10px;
            }
            .cost {
                right: 10px;
            }
        }
        .detaillogo {
            display: block;
            width: 100%;
            height: 100%;
            transition: all 1s;
            &:hover {
                transform: scale(1.02);
            }
        }
    }

    .detailcon {
    }

    .detailcon_l {
        display: inline-block;
        width: 60%;
        height: 140px;
        h2 {
            margin-top: 10px;
            font-size: 18px;
            color: #444;
            .esspellipsis();
            font-weight: normal;
            &:hover {
                cursor: pointer;
            }
        }
        .release-introduce {
            margin: 15px 0;
            overflow: hidden;
            height: 38px;
            &>p{
                .esspellipsitwo();
            }
        }
        .fundiv {
            .funitems {
                i {
                    margin-right: 5px;
                    color: #ff9900;
                }
            }
            p {
                margin-bottom: 10px;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0;
                color: #999999;
                i {
                    margin-right: 10px;
                    color: #ff9900;
                }
                span {
                    margin-right: 20px;
                }
            }
        }
    }

    .detailcon_r {
        display: inline-block;
        float: right;
        padding-top: 40px;
        padding-right: 10px;
        .essp-btn {
            display: block;
            padding: 0 10px;
            min-width: 80px;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            color: #fff;
            border-radius: 14px;
            outline: none;
        }
    }

    .statusnum {
        margin-bottom: 15px;
        span {
            float: left;
            margin-right: 20px;
            font-size: 16px;
            line-height: 24px;
            color: #777;
        }
    }

    .addrdiv {
        margin-bottom: 15px;
        color: #999999;
        i {
            margin-right: 5px;
        }
    }

    //合并草稿箱追加
    .toolcon {
        /*margin-bottom: 10px;*/
        padding: 24px 0;
        .toolleft {
            float: left;
            span {
                font-size: 18px;
                cursor: pointer;
                &:nth-of-type(1) {
                    padding-right: 15px;
                    border-right: 1px solid #ccc;
                }
                &:nth-of-type(2) {
                    padding-left: 15px;
                }
            }
            .showblue {
                color: #00a0e9 !important;
            }
            .toolspan {
                float: left;
                padding: 0 7px;
                position: relative;
                font-size: 18px;
                padding-right: 15px;
                height: 30px;
                line-height: 30px;
                color: #333333;
                &:hover {
                    cursor: pointer;
                }
                &:before {
                    content: " ";
                    position: absolute;
                    width: 1px;
                    height: 70%;
                    right: 0;
                    top: 5px;
                    background: #ccc;
                }
                &:last-child {
                    padding-left: 15px;
                    border-right: none;
                    &:before {
                        width: 0;
                    }
                }
            }
        }
        .toolright {
            float: right;
            .toolright_btn {
                position: relative;
                line-height: 30px;
                font-size: 14px;
                padding: 0 8px 0 35px;
                i {
                    position: absolute;
                    left: 6px;
                    top: 4px;
                    font-size: 22px;
                }
            }
        }

    }
    .launchcon_hz ul li:nth-child(1) {
        margin-top: 0;
    }
    .edit-btn {
        padding: 5px 15px;
        width: 85px;
        height: 30px;
        line-height: 20px;
        color: #fff;
        border: none;
        border-radius: 50px;
        background: #409eff;
        .edit-text {
            margin-right: 15px;
        }
    }
</style>

<!--该问题为了暂时修复内容BUG-->
<style>
    #reset_con_style p, #reset_con_style li, #reset_con_style ul,
    #reset_con_style div, #reset_con_style span,#reset_con_style em,
    #reset_con_style i, #reset_con_style strong, #reset_con_style ol,
    #reset_con_style dl, #reset_con_style dt, #reset_con_style dd,
    #reset_con_style h1, #reset_con_style h2, #reset_con_style h3,
    #reset_con_style h4, #reset_con_style h5 {
        font-size: 14px!important;
        color: #555!important;
        line-height: 18px!important;
        font-weight: normal!important;
        font-style: normal!important;
        text-align: left!important;
        text-indent: 0!important;
        padding: 0!important;
        margin: 0!important;
        text-decoration: none!important;
        border: none!important;
    }
</style>
