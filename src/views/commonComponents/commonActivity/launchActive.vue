<template>
    <div>
        <!-- 我发起的活动模版 -->

        <!--当前记录被操作员：卡里斯特 编辑或者审核-->

        <div class="launchcon">
            <div class="toolcon esspclearfix">
                <!-- 整合我发起的（活动，资讯，惠政，草稿）的顶部公共模块 -->
                <div class="toolleft">
                    <span :class="{'showblue': type == 0}" @click="changeType(0)">已发布</span>
                    <span :class="{'showblue': type == 1}" @click="changeType(1)">草稿箱</span>
                </div>
                <div class="toolright" v-if="flag">
                    <el-button class="toolright_btn" type="primary" size="mini"
                               @click="$router.push('/parkIndex/launchForm')"><i class="el-icon-circle-plus"></i>发布新活动
                    </el-button>
                </div>
            </div>
            <div v-show="type == 0">
                <ul class="esspclearfix">
                    <li class="itemli" v-for="(item, index) in activedata" :key="index">
                        <div class="infostit esspclearfix">
                        <span>发布人:
                            <em>{{item.initiatorName}}</em>
                        </span>
                            <span>发布时间:
                            <em>{{item.initiatorTime | timerFormat(item.initiatorTime)}}</em>
                        </span>
                            <span>活动状态:
                            <em>{{item.status | statusFormat(item.status)}}</em>
                        </span>
                            <!--<span>有效期:-->
                            <!--<em>{{getEffectDt(item)}}天</em>-->
                            <!--</span>-->
                            <div class="delete" v-if="checkActivityOperateAuth(item.initiatorName)">
                                <i class="el-icon-delete" @click="getId(item.activityId)"></i>
                            </div>
                        </div>
                        <div class="infocon esspclearfix">
                            <div class="logocon" @click="goActiveDetail(item)">
                                <img class="detaillogo" v-lazy="item.activityPhoto" alt="">
                                <!--<div class="img_tips">-->
                                <!--<p class="enrolled">已报名：{{item.enterSum}}人</p>-->
                                <!--<p class="cost">{{item.isCharge == '1' ? "收费" : "免费"}}</p>-->
                                <!--</div>-->
                            </div>
                            <div class="detailcon">
                                <h2 @click="goActiveDetail(item)">{{item.activityTheme}}</h2>
                                <div class="goactive_l">
                                    <div class="statusnum esspclearfix">
                                        <span>已报名成功人数：{{item.enterSum}}人</span>
                                        <span>待审核报名人数：{{item.enterToAuditSum}}人</span>
                                    </div>
                                    <div class="addrdiv">
                                        <i class="icon iconfont icon-dizhi"></i>地址:
                                        <em>{{item.activityPlace}}</em>
                                    </div>
                                    <div class="fundiv">
                                    <span class="funitems">
                                        <i class="icon iconfont icon-liulan"></i>
                                        <em>{{item.viewSum}}</em>
                                    </span>
                                        <span class="funitems">
                                        <i class="icon iconfont icon-collect2"></i>
                                        <em>{{item.attentionSum}}</em>
                                    </span>
                                        <span class="funitems">
                                        <i class="icon iconfont icon-pinglun"></i>
                                        <em>{{item.commentSum}}</em>
                                    </span>
                                    </div>
                                </div>
                                <div class="goactive_r" v-if="checkActivityOperateAuth(item.initiatorName)">
                                    <el-button
                                        type="primary" class="essp-btn"
                                        @click="editActivity(item.activityId)"
                                    >编辑
                                    </el-button>
                                    <!--v-if="item.currEnrolStatus == '1'"-->

                                    <el-button
                                        type="primary" class="essp-btn"
                                        @click="auditActivity(item.activityId)"
                                    >报名审核
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
                <div class="pageList">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNumber"
                        :page-sizes="pageRanges"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="allTotal">
                    </el-pagination>
                </div>
            </div>
            <div v-show="type == 1">
                <!-- 我发起的活动草稿模版 -->
                <div class="draftcon">
                    <div>
                        <div class="esspclearfix tools">
                    <span class="tdspan">
                        <el-button type="info" plain @click="delDraft()">删除草稿</el-button>
                    </span>
                            <span class="tdspan"><el-date-picker
                                v-model="timeRange"
                                type="daterange"
                                range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </span>
                            <span class="tdspan">
                        <el-button type="primary" icon="el-icon-search" @click="seachDraft">搜索</el-button>
                    </span>
                        </div>
                        <el-table ref="multipleTable" :data="drafLists" tooltip-effect="dark" style="width: 100%"
                                  @selection-change="handleSelectionChange">
                            <el-table-column type="selection">
                            </el-table-column>
                            <el-table-column prop="updatorName" label="更新人" width="100" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="保存时间" width="155" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    {{ scope.row.updateTime | timerFormat(scope.row.updateTime)}}
                                </template>
                            </el-table-column>

                            <el-table-column width="300" label="活动主题" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span class="hd-title">{{ scope.row.activityTheme}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="right" label="操作">
                                <template slot-scope="scope">
                                    <!--<el-button type="primary" @click="goBaoMing(scope)" size="mini">编辑</el-button>-->
                                    <button class="edit-btn" @click="goBaoMing(scope)"><span class="edit-text">编</span>辑
                                    </button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="pageList">
                    <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="pageNumber1"
                        :page-sizes="pageRanges1"
                        :page-size="pageSize1"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="allTotal">
                    </el-pagination>
                </div>
            </div>

        </div>
        <!-- 移除活动 -->
        <el-dialog :visible.sync="dialogTableVisible" title="提示" width='520px' class='removeParks'>
            <p class="removeParks_p"><i class="el-icon-warning"></i><span>是否确认删除该条活动</span></p>
            <p class="removeParks_btn">
                <el-button @click="dialogTableVisible = false">取消</el-button>
                <el-button type="primary" @click="delActivity">确定</el-button>
            </p>
        </el-dialog>
    </div>

</template>

<script>
    import Moment from "moment";

    export default {
        components: {},
        name: "",
        data() {
            return {
                msg: "我发起的活动",
                pageType: "launchActive",
                btn: ["编辑", "报名审核"],
                activedata: [],
                pageNumber: 1,
                pageSize: 10, // 每一页条数
                allTotal: 0,
                pageRanges: [5, 10, 20, 50], //默认每页10条数区间

                pageNumber1: 1,
                pageRanges1: [5, 10, 20, 50], //默认每页10条数区间
                pageSize1: 10,
                allTotal: 0,
                timeRange: [],
                drafLists: [],
                ids:'', // 草稿选已选择ids
                dialogTableVisible: false,
                curId: '',
                type: 0,
                flag: sessionStorage.getItem('myList').includes(sessionStorage.getItem('parkId')),

            };
        },
        created() {
            if (this.$route.query.type) {
                this.type = this.$route.query.type
                console.log(this.type == 1)
                if (this.type == 1) {
                    return this.getActDraftList()
                }
            }
            this.getActiveList()

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
                }
                return statusList[value] ? statusList[value] : '————'
            },
            disableBtnFormat(code) {
                // 在审核状态不可编辑
                return code == "01" || code == "10" || code == "02"
            },
            timerFormat(vaule){
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        methods: {
            getId(id) {
                this.curId = id;
                this.dialogTableVisible = true;
            },
            changeType(type) {
                if (type == 0) {
                    this.type = type;
                    this.getActiveList();
                }
                if (type == 1) {
                    this.type = type;
                    this.getActDraftList();
                }
            },
            getMillisecond(vaule) {
                // 获取秒数
                return Moment(vaule).unix();
            },
            statusCn(startTime, endTime) {
                var thisTime = this.getMillisecond(new Date());
                var enterStarttime = this.getMillisecond(startTime);
                var enterEndtime = this.getMillisecond(endTime);           // 活动报名截止时间

                if (thisTime < enterStarttime) {
                    return "预告中";
                }
                if (thisTime >= enterStarttime && thisTime <= enterEndtime) {
                    return "发布中";
                }
                if (thisTime > enterEndtime) {
                    return "已结束";
                }
            },
            //控制分页条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.getActiveList();
            },
            //切换当前页码
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getActiveList();
            },
            goActiveDetail(item) {
                var url = "/parkIndex/activityDetail";
                this.$router.push({
                    path: url,
                    query: {
                        activityId: item.activityId
                    }
                });
            },

            getEffectDt(item) {
                if (typeof item == "undefined") {
                    return "0";
                }
                if (
                    this.utils.isEmpty(item.activityDays) ||
                    this.utils.isEmpty(item.activityStarttime)
                ) {
                    return "0";
                }

                var startDate = new Date(
                    Moment(item.activityStarttime).format("YYYY-MM-DD")
                );
                var curDate = new Date(Moment(new Date()).format("YYYY-MM-DD"));
                var total = ((startDate.getTime() - curDate.getTime()) / 1000).toString();
                var day =
                    parseInt(parseInt(total) / (24 * 60 * 60)) +
                    parseInt(item.activityDays);
                return day < 0 ? "0" : day;
            },
            getActiveList() {
                var url = this.$apiUrl.active.actLanch;
                this.$post(url, {
                    pageNum: this.pageNumber,
                    pageSize: this.pageSize,
                    parkId: window.sessionStorage.getItem("parkId")
                }).then(
                    response => {

                        if (response.resultCode == "CLT000000000") {
                            this.activedata = response.resultData.activityList;

                            this.allTotal = response.resultData.total;
                        } else {
                            this.$message.error(response.resultMsg);
                        }
                    },
                    response => {
                        this.$message.info(response.resultMsg);
                    }
                );
            },
            editActivity(activityId) {
                this.$router.push({
                    path: "/parkIndex/launchForm",
                    query: {activityId: activityId, opMark: "02"}
                });
            },
            auditActivity(activityId) {
                this.$router.push({
                    query: {
                        activityId: activityId
                    },
                    path: "/parkIndex/park/auditingBm"
                })
            },
            delActivity() {
                var pop = {
                    activityId: this.curId,
                    parkId: sessionStorage.getItem("parkId")
                };

                var url = this.$apiUrl.active.delActivity;
                this.$post(url, pop).then(
                    response => {
                        if (response.resultCode == "CLT000000000") {
                            this.$message.success("删除成功");
                            this.getActiveList();
                        } else {
                            this.$message.error(failMsg + response.resultMsg);
                        }
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
                this.dialogTableVisible = false;
            },

            //取得草稿列表
            getActDraftList() {
                var pop = {
                    pageNum: this.pageNumber1,
                    pageSize: this.pageSize1,
                    parkId: window.sessionStorage.getItem("parkId"),
                    timeStart2: this.timeRange[0] ? this.timeRange[0] : "",
                    timeEnd2: this.timeRange[1] ? this.timeRange[1] : "",
                };

                this.$post(this.$apiUrl.active.actDraftList, pop).then(
                    response => {
                        var result = response.resultData.activityList;
                        this.allTotal = response.resultData.total;
                        this.drafLists = result;
                        this.timeRange = [];
                    },
                    response => {
                        this.$message.error(response.resultMsg);
                    }
                );
            },
            // 搜索
            seachDraft() {
                this.getActDraftList();
            },
            // 删除
            delDraft() {
                if (this.ids == "") {
                    this.$message("您没有选择删除的项目！");
                    return;
                }
                console.log(this.ids);
                var ids = this.ids;
                var pop = {
                    activityId: ids,
                    parkId: sessionStorage.getItem("parkId")
                };
                var url = this.$apiUrl.active.delActivity;
                this.$post(url, pop).then(
                    response => {

                        if (response.resultCode == "CLT000000000") {
                            this.$message.success("删除成功");
                            this.getActDraftList();
                        } else {
                            this.$message.error(failMsg + response.resultMsg);
                        }
                    },
                    response => {
                        this.$message.error(response.resultMsg);
                    }
                );
            },
            goBaoMing(scope) {
                var activityId = scope.row.activityId;
                this.$router.push({
                    path: "/parkIndex/launchForm",
                    query: {activityId: activityId, opMark: "02"}
                });
            },
            //控制分页条数
            handleSizeChange1(val) {
                this.pageSize1 = val;
                if (this.type == 0) {
                    this.getActiveList();
                }
                if (this.type == 1) {
                    this.getActDraftList();
                }
            },
            //切换当前页码
            handleCurrentChange1(val) {
                this.pageNumber1 = val;
                if (this.type == 0) {
                    this.getActiveList();
                }
                if (this.type == 1) {
                    this.getActDraftList();
                }
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                var _this = this;
                var selectArray = [];
                this.multipleSelection = val;
                this.multipleSelection.forEach(function (item) {
                    var id = item.activityId;
                    selectArray.push(id);
                });
                _this.ids = selectArray.join(",");

            },
            //我发起的活动列表，校验是否有删除及编辑的权限
            //author：米格   20181217
            checkActivityOperateAuth(recordOwner){
                let defautlFlag = false;
                let currentUser = localStorage.getItem("userName");

                if(currentUser === recordOwner){
                    defautlFlag = true;
                }

                return defautlFlag;
            }
        }
    };
</script>
<style>
    .removeParks .el-dialog {
        border-top: 5px solid #00a0e9;
    }

    .removeParks .el-dialog__header {
        padding: 27px 40px 30px;
    }

    .removeParks .el-dialog__title {
        font-size: 24px;
        color: #333;
    }

    .removeParks .el-dialog__body {
        padding: 0 40px 26px;
    }

    .removeParks_p {
        position: relative;
        line-height: 28px;
        font-size: 20px;
        color: #333;
        padding-left: 49px;
        margin-bottom: 54px;
    }

    .removeParks_p i {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 28px;
        color: #00a0e9;
    }

    .removeParks_btn {
        text-align: right;
    }

    .removeParks_btn button {
        width: 100px;
        height: 35px;
        line-height: 35px;
        padding: 0;
        text-align: center;
        font-size: 18px;
    }

    .removeParks_btn button:nth-child(1) {
        background: #e6f4ff;
        color: #00a0e9;
    }

    .removeParks_btn button:nth-child(2) {
        background: #e6f4ff;
        color: #fff;
        background: #1598ff;
        background: -webkit-gradient(linear, left top, right top, from(#1598ff), to(#36bffd));
        background: linear-gradient(to right, #1598ff 0%, #36bffd 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1598ff', endColorstr='#36bffd', GradientType=0);
    }
</style>
<style scoped lang='less'>
    @import "../../../assets/css/mixin";

    em {
        font-style: normal;
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

    .launchcon {
        padding: 0px 20px 0;
        background: #fff;
    }

    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }

    .goactive_l {
        float: left;
        width: 80%;
    }

    .goactive_r {
        float: left;
        width: 20%;
        .essp-btn {
            width: 80px;
            padding: 0 10px;
            height: 28px;
            font-size: 14px;
            color: #fff;
            border-radius: 14px;
            margin-bottom: 10px;
            border: 1px solid #fff;
            outline: none;
            margin-left: 30px;
        }

    }

    // 消息简介汇总
    .itemli {
        margin-bottom: 25px;
    }

    .infostit {
        background-color: #f1f1f1;
        height: 30px;
        line-height: 30px;
        span {
            float: left;
            width: 23%;
            padding-left: 1%;
            text-align: left;
            color: #666;
            em {
                margin-left: 4px;
            }
        }

        .delete {
            float: right;
            i {
                cursor: pointer;
                padding-right: 15px;
            }
        }
    }

    .infocon {
        margin-top: 10px;
        &:hover {
            zoom: 1;
            box-shadow: 1px 1px 2px 0px rgba(0, 102, 179, 0.15);
        }
        h2 {
            margin-top: 5px;
        }
        .funitems {
            margin-right: 15px;
            i {
                margin-right: 5px;
                color: #ff9900;
            }
        }
    }

    .logocon {
        width: 25.6%;
        height: 140px;
        float: left;
        margin-right: 2%;
        position: relative;
        transition: all 1s;
        &:hover .img_tips {
            display: block;
            transform: scale(1.02);
        }
        //显示hover效果的遮盖层
        .img_tips {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20px;
            background-color: #000000;
            .esspopacity(@value:0.8); //调节透明度
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
        float: left;
        width: 72.4%;
        h2 {
            width: 80%;
            .esspellipsis();
            font-size: 18px;
            line-height: 24px;
            color: #444;
            font-weight: normal;
            margin-bottom: 15px;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .statusnum {
        margin-bottom: 15px;
        span {
            float: left;
            margin-right: 20px;
            font-size: 16px;
            line-height: 30px;
            color: #777;
        }
    }

    .addrdiv {
        margin-bottom: 15px;
        color: #999999;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        i {
            font-size: 12px;
            margin-right: 5px;
            color: #999;
        }
    }

    .fundiv {
        margin-bottom: 10px;
        .funitems {
            font-size: 12px;
            i {
                color: #999;
                font-size: 14px;
                margin-right: 5px;
            }
            .icon-collect2, .icon-pinglun {
                font-size: 12px;
            }
        }
    }

    .draftcon {
        padding: 0px 20px 0;
        background: #fff;
    }

    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }

    .tools {
        padding: 0px 5px;
        margin-bottom: 10px;
        .tdspan {
            float: left;
            margin-right: 10px;
            height: 40px;
            line-height: 40px;
        }
    }

    .hd-title:hover {
        color: #04a2ea;
    }

    .edit-btn {
        padding: 5px 15px;
        width: 85px;
        height: 30px;
        line-height: 20px;
        color: #fff;
        border: none;
        border-radius: 50px;
        background: #409EFF;
        .edit-text {
            margin-right: 15px;
        }
    }

</style>
