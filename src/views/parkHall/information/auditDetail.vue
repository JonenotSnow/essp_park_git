<template>
    <div class="sponsorcon">
        <!-- 资讯审核查看详情页面 -->

        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="infobox">
            <div class="themeTit">
                <span class="borderone"></span>
                <span class="bordertwo"></span>
                <span class="tittext">资讯发布审核</span>
            </div>
            <div class="itemCon">
                <div class="dtcon">
                    <span class="lable_span">资讯标题：</span>
                    <span class="line_span">{{draftInfo.informationTitle}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">发布人：</span>
                    <span class="line_span">{{draftInfo.userName}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">联系人手机：</span>
                    <span class="line_span">{{draftInfo.phone}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">提交日期：</span>
                    <span class="line_span">{{draftInfo.createTime | timerFormat(draftInfo.createTime)}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">标题配图：</span>
                    <span class="line_img"><img v-lazy="draftInfo.titleImg"></span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">资讯简介：</span>
                    <span class="line_area line_area1">{{draftInfo.content}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">资讯详情：</span>
                    <span class="line_area"><div v-html="draftInfo.infoDetail"></div></span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">备注：</span>
                    <span class="line_area line_area1">{{draftInfo.pubComment}}</span>
                </div>
                <div class="dtcon" v-if="!showBtnTool">
                    <div class="sugtitle" v-show="draftInfo.auditList.length">审核记录</div>
                    <div v-for="(item,index) in draftInfo.auditList" :key="index" class="auditItems">
                        <div class="dtcon">
                            <span class="lable_span">审核人：</span>
                            <span class="line_span">{{item.auditer}}</span>
                        </div>
                        <div class="dtcon">
                            <span class="lable_span">当前审核状态：</span>
                            <span class="line_span">{{item.auditResult | filterStatus(item.auditResult)}}</span>
                        </div>
                        <div class="dtcon">
                            <span class="lable_span">审核时间：</span>
                            <span class="line_span">{{item.createTime | timerFormatDetail(item.createTime)}}</span>
                        </div>
                        <div class="dtcon">
                            <span class="lable_span">审核意见：</span>
                            <span class="line_span">{{item.mark || "暂无建议"}}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div>
            <div class="toolbtn" v-if="isShowBtn">
                <span @click="cPass()">通&nbsp;&nbsp;&nbsp;过</span>
                <span @click="cDisPass()">不通过</span>
                <span @click="cCancel()">取&nbsp;&nbsp;&nbsp;消</span>
            </div>
            <div class="toolbtn" v-else>
                <el-button type="primary" @click="goBack()">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import Moment from "moment";

    export default {
        data() {
            return {
                isShowBtn: this.$route.query.type == '01' ? false : true,
                breadlist: [
                    {
                        path: "/parkIndex/parkInformation/all",
                        name: "园区资讯"
                    },
                    {
                        path: "parkInformation/auditing",
                        name: "资讯发布审核"
                    },
                    {
                        path: "/parkIndex/infoAuditDetail",
                        name: "审核资讯详情"
                    }
                ],
                draftInfo: {
                    informationTitle: "",
                    userName: "",
                    phone: "",
                    createTime: "",
                    titleImg: "",
                    content: "",
                    informationId: "",
                    status: "",//审核状态
                    auditList: [],//历史审核记录
                    pubComment: "",//备注
                    infoDetail: ""//资讯详情
                }

            }
        },
        components: {
            EsspBreadCrumb
        },
        created() {
            this.getAuditDetail();
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            },
            timerFormatDetail(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss")
            },
            filterStatus(value) {
                //通过 02，10 拒绝 03，12 审核中（未审核 01，21，审核中：05，统一归审核中）
                let stautsMap = {
                    "01": "审核中",
                    "21": "审核中",
                    "05": "审核中",
                    "02": "通过",
                    "10": "通过",
                    "03": "拒绝",
                    "12": "拒绝"
                }
                return stautsMap[value] || "审核中";
            }
        },
        computed: {
            showBtnTool() {
                //通过 02，10 拒绝 03，12 审核中（未审核 01，21，审核中：05，统一归审核中）
                let showBtnMap = {
                    "01": true,
                    "21": true,
                    "05": true,
                    "02": false,
                    "10": false,
                    "03": false,
                    "12": false
                }
                return showBtnMap[this.draftInfo.status] || true
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            getAuditDetail() {
                var informationId = this.$route.query.informationId;
                var parkId = sessionStorage.getItem("parkId") || "";
                var pop = {informationId: informationId, flag: "1", parkId};
                this.$post(this.$apiUrl.parkInfo.infoById, pop)
                    .then((response) => {
                        var codestatus = response.resultCode;
                        if (codestatus == "CLT000000000") {
                            var result = response.resultData;
                            this.draftInfo = {
                                informationTitle: result.informationTitle,
                                userName: result.userName,
                                phone: result.phone,
                                createTime: result.createTime,
                                titleImg: result.titleImg,
                                content: result.content,
                                informationId: result.informationId,
                                status: result.status,//审核的状态
                                createTime: result.createTime,//审核时间
                                auditList: result.auditList || [],//审核记录
                                infoDetail: result.infoDetail,//资讯详情
                                pubComment: result.pubComment || "暂无备注信息"//备注内容
                            }

                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    }, (err) => {
                        this.$message.error(err.resultMsg);
                    })
            },
            //审核通过
            cPass() {
                var informationId = this.$route.query.informationId;
                this.$prompt('审核意见（不能超过100字）', {
                    confirmButtonText: '提交',
                    inputPlaceholder: "请输入审核意见",
//                cancelButtonText: '取消',
                    showCancelButton: false,
                    inputType: "textarea",
                    customClass: "information_audit_mask"
                }).then(({value}) => {
                    var newval = value == null ? "" : value.replace(/\s+/g, "")
                    if (newval == "") {
                        this.$message.warning("此处审核意见不能为空");
                        return
                    }
                    if (newval.length >= 100) {
                        this.$message.warning("此处审核意见不能超过100字");
                        return
                    }
                    this.checkPass({
                        pop: {
                            informationId: informationId,
                            status: "10",
                            approveComment: newval
                        },
                        successtips: "流程已提交至园区管理员审核"
                    })
                }).catch(() => {
                    this.$message.info("取消操作")
                })
            },
            //审核不通过
            cDisPass() {
                var informationId = this.$route.query.informationId;
                this.$prompt('审核不通过意见（不能超过100字）', {
                    confirmButtonText: '提交',
                    inputPlaceholder: "请输入审核意见",
//                cancelButtonText: '取消',
                    showCancelButton: false,
                    inputType: "textarea",
                    customClass: "information_audit_mask"
                }).then(({value}) => {
                    var newval = value == null ? "" : value.replace(/\s+/g, "")
                    if (newval == "") {
                        this.$message.warning("此处审核意见不能为空");
                        return
                    }
                    if (newval.length >= 100) {
                        this.$message.warning("此处审核意见不能超过100字");
                        return
                    }
                    this.checkPass({
                        pop: {
                            informationId: informationId,
                            status: "03",
                            approveComment: newval
                        },
                        successtips: `资讯审核不通过`
                    })
                }).catch(() => {
                    this.$message.info("取消操作")
                })
            },
            //取消锁定
            cCancel() {

                // 需求变动，“取消锁定”功能不需要了，这里直接返回审核列表页面
                this.$router.push({path: "/parkIndex/parkInformation/auditing"});
                // 这里直接返回了
                return;

                var informationId = this.$route.query.informationId;
                this.$confirm('是否取消审核?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkPass({
                        pop: {
                            informationId: informationId,
                            status: "21"
                        },
                        successtips: "资讯审核取消成功"
                    })
                }).catch(() => {
                    this.$message.info("取消操作")
                });
            },
            //审核通过不通过
            checkPass(options) {
                var _this = this;
                var pop = options.pop;//接口参数
                var successMsg = options.successtips;//前端提示语
                this.$post(this.$apiUrl.parkInfo.auditDetail, pop)
                    .then((response) => {
                        var codestatus = response.resultCode;
                        if (codestatus == "CLT000000000") {
                            this.$message.success(successMsg);
                            setTimeout(function () {
                                _this.$router.push({path: "/parkIndex/parkInformation/auditing"})
                            }, 1500)
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    }, (err) => {
                        this.$message.error(err);
                    })
            }
        }
    }
</script>
<style>
    .information_audit_mask .el-message-box__headerbtn {
        top: 8px;
        right: 6px;
    }

    .information_audit_mask .el-message-box__content {
        padding: 10px 35px 0;
    }

    .information_audit_mask .el-message-box__input {
        padding-top: 5px;
    }

    .information_audit_mask {
        width: 670px;
    }

    .information_audit_mask .el-textarea__inner {
        height: 180px;

    }

    .information_audit_mask .el-message-box__btns {
        padding-top: 0;
        padding-bottom: 15px;
    }
</style>
<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .sponsorcon {
        .essp_width_auto();
        padding-bottom: 50px;
        margin-bottom: 20px;
        background-color: #fff;
    }

    .infobox {
        padding: 35px 0 0;
        margin-bottom: 30px;
    }

    .themeTit {
        position: relative;
        margin-bottom: 30px;
        text-align: center;
        .tittext {
            font-size: 24px;
            line-height: 36px;
            color: #333333;
        }
        .borderone {
            position: absolute;
            width: 68px;
            left: 37%;
            top: 18px;
            border-top: 2px solid #cccccc;
        }
        .bordertwo {
            position: absolute;
            width: 68px;
            right: 37%;
            top: 18px;
            border-top: 2px solid #cccccc;

        }
    }

    .itemCon {
        padding-left: 100px;
        .dtcon {
            width: 100%;
            margin-bottom: 15px;
            overflow: hidden;
        }
        .lable_span {
            float: left;
            width: 15%;
            margin-right: 5px;
            text-align: right;
            font-size: 16px;
            line-height: 40px;
            letter-spacing: 0.4px;
            color: #666666;
        }
        .line_span {
            float: left;
            font-size: 14px;
            line-height: 40px;
            letter-spacing: 0.4px;
            color: #666666;
        }
        .line_img {
            float: left;
            width: 245px;
            img {
                display: block;
                width: 100%;
            }
        }
        .line_area {
            float: left;
            width: 600px;
            min-height: 100px;
            padding: 10px;
            border: 1px solid #ccc;
            font-size: 14px;
        }
        .line_area1 {
            line-height: 30px;
        }

        //审核记录部分
        .auditItems {
            border-top: 1px dashed #ccc;
            padding-top: 15px;
        }
        .sugtitle {
            padding: 15px;
            font-size: 18px;
            text-align: center;
        }
    }

    .toolbtn {
        text-align: center;
        span {
            display: inline-block;
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            cursor: pointer;
            background: #00a0e9;
            color: #fff;
            margin-right: 130px;
        }
        span:nth-child(2) {
            background: #ccc;
        }
        span:nth-child(3) {
            margin-right: 0;
        }
    }

</style>
