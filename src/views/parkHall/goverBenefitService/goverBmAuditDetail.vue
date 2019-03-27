<template>
    <div class="actauditpage" id="manageActivityAudit">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="common_titwrap">
            <div style="padding: 0 80px;">
                <p class='Otitle'>惠政申报审核</p>
                <div class="k1">
                    <div class="title">
                        <h3 class="common_titdes" style="margin-left: 0">基本信息</h3>
                    </div>
                    <div class="bmContentList esspclearfix">
                        <p>
                            <span>参与惠政主题：</span>
                            <span>{{infoList.policyTitle || "暂无主题"}}</span>
                        </p>
                        <p>
                            <span>公司名称：</span>
                            <span>{{infoList.companyName || "暂无公司名称"}}</span>
                        </p>
                        <p>
                            <span>联系人姓名：</span>
                            <span>{{infoList.name || "暂无联系人"}}</span>
                        </p>
                        <p>
                            <span>报名人数：</span>
                            <span>{{infoList.applyNum || 0}}人</span>
                        </p>
                        <p>
                            <span>联系人手机：</span>
                            <span>{{infoList.phone || "暂无联系电话"}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--个人信息-->
        <div class="personal" v-if="enrollType != '1'">
            <div class="common_titwrap esspclearfix">
                <div>
                    <h3 class="common_titdes" style="margin-left:80px;">填写报名信息</h3>
                </div>
            </div>
            <div class="txform" v-if="enrollType != '1'">
                <div class="item_wrap esspclearfix">
                    <div class="item">
                        <div class="floats">
                            <span>*</span>联系人姓名：
                        </div>
                        <div class="floats">
                            <el-input disabled v-model="inputName" placeholder="请输入姓名"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="floats">
                            <span>*</span>联系人手机：
                        </div>
                        <div class="floats">
                            <el-input disabled v-model="inputTel" type="number" placeholder="请输入手机号"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="txform" v-if="enrollType != '1'">
                <div class="item_wrap esspclearfix">
                    <div class="item">
                        <el-radio v-model="radio" label="1" disabled>在网页中填写</el-radio>
                        <el-radio v-model="radio" label="2" disabled>报名表批量导入</el-radio>
                    </div>
                    <div class="item text_align_r">
                        <span>友情提醒：当报名人数>5人时，建议批量导入</span>
                    </div>
                </div>
            </div>
            <div class="enroll_margin" style="width: 1200px;margin: 0 auto;">
                <div class="tablemain" v-show="radio == '1'">
                    <!-- 报名表界面 -->
                    <div v-for="(item,index) in nrollFormList" :key="index">
                        <div class="tablemain_item">
                            <div class="tabletit esspclearfix">
                                <p class="text_align_c" style="width: 90%;">报名人{{index + 1}}</p>
                                <p class="text_align_c" v-show="!item.isShow" style="width: 10%;">
                                    <el-button round size="mini" @click="item.isShow = !item.isShow">查看详情</el-button>
                                </p>
                            </div>
                            <div class="tabmain" v-show="item.isShow">

                                <div class="itemdiv" v-for="(formListItem, formListIndex) in item.formRqList"
                                     :key="formListIndex">
                                    <label for="">
                                        <em class="importanticon"
                                            v-if="formListItem.requir">*</em>{{formListItem.name + '：'}}
                                    </label>
                                    <!--输入框-->
                                    <input disabled v-if="formListItem.type=='text'" type="text"
                                           :placeholder="'请输入'+formListItem.name" v-model="formListItem.tittext">
                                    <!--文本框-->
                                    <el-input disabled type="textarea" v-if="formListItem.type=='textarea'" :rows="2"
                                              :placeholder="'请输入'+formListItem.name"
                                              v-model="formListItem.tittext"></el-input>
                                    <!--单选框-->
                                    <el-select disabled v-if="formListItem.type=='radio'" v-model="formListItem.tittext"
                                               clearable placeholder="请选择">
                                        <el-option v-for="(item,index) in formListItem.childrens" :key="item.value"
                                                   :label="index" :value="item.name">
                                        </el-option>
                                    </el-select>
                                    <!--复选框-->
                                    <el-select disabled multiple collapse-tags v-if="formListItem.type=='checkbox'"
                                               v-model="formListItem.tittext" clearable placeholder="请选择">
                                        <el-option v-for="(item,index) in formListItem.childrens" :key="item.value"
                                                   :label="index" :value="item.name">
                                        </el-option>
                                    </el-select>
                                    <!--日期模版-->
                                    <el-date-picker disabled readonly="true" v-if="formListItem.type=='dataTime'"
                                                    v-model="formListItem.tittext" type="datetime"
                                                    placeholder="选择日期时间"></el-date-picker>
                                    <!--数字模版-->
                                    <el-input disabled readonly="true" v-if="formListItem.type=='numberBox'"
                                              v-model="formListItem.tittext" type="number" auto-complete="off"
                                              class="cpm"></el-input>
                                </div>
                                <div class="itemdiv">
                                    <el-button round class="tablebtn" size="mini" @click="item.isShow = !item.isShow ">
                                        收起
                                    </el-button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-show="radio == '2'" style="background: #fff;">
                    <div class="esspclearfix"
                         style="position:relative;padding-bottom:30px;width: 1000px;margin: 0 auto;">
                        <el-button size="small" style="position: absolute;left: 95px;">下载模板
                        </el-button>
                        <el-upload class="upload-demo" style="float:left;" action="" multiple :limit="3"
                                   :on-exceed="handleExceed" :file-list="fileList">

                            <el-button size="small">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>
            </div>
        </div>
        <!--公司信息-->
        <div class="company" v-if="enrollType == '1'">
            <div class="common_titwrap esspclearfix">
                <div>
                    <h3 class="common_titdes" style="margin-left: 80px;">填写报名信息</h3>
                </div>
            </div>
            <div class="tablemain">
                <div class="tabmain" style="padding-bottom: 30px;">
                    <div class="itemdiv" v-for="(item,index) in formRqList" :key="index">
                        <label for="">
                            <em class="importanticon" v-if="item.requir">*</em>{{item.name}}</label>
                        <input v-if="item.type=='text'" type="text" :placeholder="'请输入'+item.name"
                               v-model="item.tittext" readonly="true">
                        <!--文本框-->
                        <el-input type="textarea" v-if="item.type=='textarea'" :rows="2" :placeholder="'请输入'+item.name"
                                  v-model="item.tittext" readonly="true"></el-input>
                        <!--单选框-->
                        <el-select readonly="true" v-if="item.type=='radio'" v-model="item.tittext" clearable placeholder="请选择">
                            <el-option v-for="(item,index) in item.childrens" :key="item.value" :label="index"
                                       :value="item.name">
                            </el-option>
                        </el-select>
                        <!--复选框-->
                        <el-select readonly="true" multiple collapse-tags v-if="item.type=='checkbox'" v-model="item.tittext" clearable
                                   placeholder="请选择">
                            <el-option v-for="(item,index) in item.childrens" :key="item.value" :label="index"
                                       :value="item.name">
                            </el-option>
                        </el-select>
                        <!--日期模版-->
                        <el-date-picker readonly="true" v-if="item.type=='dataTime'" v-model="item.tittext" type="datetime"
                                        placeholder="选择日期时间"></el-date-picker>
                        <!--数字模版-->
                        <el-input v-if="item.type=='numberBox'" v-model="item.tittext" type="number" auto-complete="off"
                                  class="cpm" readonly="true"></el-input>
                        <!--数字模版"number"-->
                        <el-input v-if="item.type=='number'" v-model="item.tittext" type="number" auto-complete="off"
                                  class="cpm" readonly="true"></el-input>
                    </div>
                </div>
            </div>
        </div>

        <p class="btn" v-if="vIshow != '02'">
            <span @click="openOne">通过</span>
            <span @click="noAccess = true">不通过</span>
            <span @click="auditOption('01')">取消</span>
        </p>

        <!-- 申报人数判断 -->
        <el-dialog :visible.sync="accessB" width='560px' class='access'>
            <p>申报人数大于可申报人数上限，无法通过审核！</p>
            <p>
                <el-button type="primary" size="small" @click="accessB = false">好的</el-button>
            </p>
        </el-dialog>
        <!-- 通过审核弹窗 -->
        <el-dialog :visible.sync="access" width='560px' class='access'>
            <p>是否确认通过审核！</p>
            <p>
                <el-button type="primary" size="small" @click="access =false">取消</el-button>
                <el-button type="primary" size="small" @click="auditOption('02')">确认</el-button>
            </p>
        </el-dialog>

        <!-- 未通过审核弹窗 -->
        <el-dialog :visible.sync="noAccess" width='560px' class='noAccess'>
            <p>拒绝原因</p>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="mark">
            </el-input>
            <p>
                <el-button type="primary" size="small" @click="noAccess =false">取消</el-button>
                <el-button type="primary" size="small" @click="auditOption('03')">确认</el-button>
            </p>
        </el-dialog>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";

    export default {
        data() {
            return {
                breadlist: [
                    {
                        path: "/parkIndex/goverBene/all",
                        name: "园区惠政"
                    },
                    {
                        path: `/parkIndex/goverReviewBm`,
                        name: "我审核的惠政"
                    },
                    {
                        path: "",
                        name: "惠政申报审核"
                    }
                ],
                items: [], //票务列表信息
                nrollFormList: [], //申报表列表信息
                auditType: "", //审核类型（企业审核、园区审核）
                infoList: {},
                inputName: "",
                vIshow: this.$route.query.isShow,
                inputTel: "",
                maxNum: 1, // 报名上限
                fileList: [
                    {
                        name: "food.jpeg",
                        url:
                            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                    }
                ],
                access: false,
                noAccess: false,
                radio: "1",
                enrollType: "", // 报名类型
                mark: "",
                typeList: [
                    {
                        type: "1",
                        name: "培训"
                    },
                    {
                        type: "2",
                        name: "论坛"
                    },
                    {
                        type: "3",
                        name: "比赛"
                    },
                    {
                        type: "4",
                        name: "聚会"
                    },
                    {
                        type: "5",
                        name: "研讨会"
                    },
                    {
                        type: "6",
                        name: "发布会"
                    },
                    {
                        type: "7",
                        name: "分享会"
                    },
                    {
                        type: "8",
                        name: "沙龙"
                    }
                ],
                accessB: false
            };
        },
        components: {
            EsspBreadCrumb
        },
        created() {
            this.getInfo();
        },
        methods: {
            /*获取企业活动审核详情页面的活动信息 */
            getInfo() {
                this.$post(this.$apiUrl.goverBene.getApplyById, {
                    id: this.$route.query.id
                }).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.infoList = response.resultData;

                        this.enrollType = this.infoList.applyType;
                        this.inputName = this.infoList.name;
                        this.inputTel = this.infoList.phone;

                        this.nrollFormList = JSON.parse(
                            this.infoList.applyInfo
                        );
                        this.formRqList = JSON.parse(this.infoList.applyInfo);
                        // } else {
                        //     this.$message.error(response.resultMsg);
                        // }
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            // 取消
            cancelOption() {
                this.$post(this.$apiUrl.active.cancelOption, {
                    activityId: this.$route.query.id,
                    parkId: sessionStorage.getItem("parkId"),
                    enterinfoId: this.$route.query.enterinfoId,
                    opMark: "03"
                }).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.$router.push("/parkIndex/park/auditingBm");
                        // } else {
                        //     this.$message.error(response.resultMsg);
                        // }
                        this.noAccess = false;
                    },
                    err => {
                        this.noAccess = false;
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            savePeopleInfo(item) {
                item.isShow = false;
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${
                        files.length
                        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
                );
            },
            openOne() {
                if (this.infoList.canApplyNum < this.infoList.applyNum) {
                    this.accessB = true;
                    return;
                }
                this.access = true;
            },
            // 通过02  或者 不通过03  取消 01
            auditOption(type) {
                var reason = type == "02" ? "" : this.mark;
                var resultMsg = "";
                if (type == "01") {
                    resultMsg = "取消锁定成功";
                    this.$alert(resultMsg, "审核", {
                        confirmButtonText: "确定",
                        callback: action => {
                            this.$router.push("/parkIndex/goverReviewBm");
                        }
                    });
                    return;
                }
                if (type == "02") {
                    resultMsg = "申请审核通过";
                }
                if (type == "03") {
                    resultMsg = "申请审核不通过";
                }
                if (type == "03" && this.mark == "") {
                    this.$message.error("拒绝理由必填");
                    return;
                }
                this.$post(this.$apiUrl.goverBene.approvePolicy, {
                    id: this.$route.query.id,
                    auditComment: reason,
                    status: type
                }).then(
                    response => {
                        this.access = false;
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
//                        this.$alert(resultMsg, "审核", {
//                            confirmButtonText: "确定",
//                            callback: action => {
                                this.$router.push("/parkIndex/goverReviewBm");
//                            }
//                        });
                        // } else {
                        //     this.$message.error(response.resultMsg);
                        // }
                    },
                    err => {
                        this.access = false;
                        this.$message.error(err.resultMsg);
                    }
                );
            }
        },
        filters: {
            openStatus(value) {
                if (value == "0") {
                    return "本园区";
                } else if (value == "1") {
                    return "全开放";
                }
            }
        }
    };
</script>
<style>
    #manageActivityAudit .access .el-dialog__body,
    #manageActivityAudit .noAccess .el-dialog__body {
        text-align: center;
    }

    #manageActivityAudit .access .el-dialog__body p:nth-of-type(1) {
        line-height: 100px;
    }

    #manageActivityAudit .noAccess .el-dialog__body textarea {
        width: 460px;
        min-width: 460px;
        max-width: 460px;
        min-height: 80px;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid #ddd;
        outline: none;
        padding: 20px;
    }

    #manageActivityAudit .noAccess .el-dialog__body p:nth-of-type(1) {
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        color: #444;
        text-indent: 25px;
    }

    #manageActivityAudit .noAccess .el-dialog__body p:nth-of-type(2) {
        margin-top: 20px;
    }
</style>

<style scoped lang="less">
    @import "../../../assets/css/mixin";

    @com_font_size: 16px;
    @con_bg: #fff;
    .common_titwrap {
        .essp_width_auto();
        background: #fff;
        .Otitle {
            font-size: 24px;
            line-height: 36px;
            margin-bottom: 20px;
            color: #333333;
            text-align: center;
        }
        .title {
            width: 102 0px;
            margin: 0 auto;
            overflow: hidden;
        }
        .bmContentList {
            .essp_width_auto();
            padding-top: 30px;
            p {
                float: left;
                width: 50%;
                span {
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                }
                span:nth-child(1) {
                    padding-right: 2%;
                    width: 20%;
                    text-align: right;
                }
                span:nth-child(2) {
                    width: 78%;
                    .esspellipsis();
                }
            }
        }
        .contentList,
        .contentList1,
        .contentList2 {
            width: 990px;
            margin: 20px auto;
            & > p {
                line-height: 50px;
                span {
                    display: inline-block;
                    width: 140px;
                    font-size: 16px;
                    line-height: 40px;
                    margin-right: 10px;
                    color: #666666;
                    text-align: right;
                    &:nth-of-type(2) {
                        width: 700px;
                        font-size: 14px;
                        line-height: 30px;
                        color: #333333;
                        text-align: left;
                    }
                }
                &.texta {
                    position: relative;
                    overflow: hidden;
                    span {
                        float: left;
                    }
                    textarea {
                        width: 820px;
                        float: left;
                        min-width: 820px;
                        max-width: 820px;
                        padding: 5px;
                        min-height: 140px;
                    }
                }
            }
        }
        .radioBtn {
            width: 1034px;
            margin: 20px auto;
            margin-bottom: 20px;
            label {
                cursor: pointer;
                margin-right: 20px;
                input {
                    position: relative;
                    top: 2px;
                    margin-right: 5px;
                }
            }
        }
        .contentList1 {
            width: 1034px;
            margin: 0 auto;
            padding-bottom: 20px;
            /*height: 404px;*/
            border-radius: 6px;
            border: solid 1px #cccccc;
            & > div {
                width: 550px;
                margin: 0 auto;
                line-height: 35px;
                & > p {
                    i {
                        color: #ff9900;
                        margin-right: 5px;
                        font-size: 16px;
                    }
                    span {
                        color: #666;
                        font-size: 16px;
                    }
                    input {
                        width: 550px;
                        height: 35px;
                        background-color: #f6f9fb;
                        border: solid 1px #eaeff2;
                    }
                }
                &:nth-of-type(1) {
                    margin-top: 20px;
                }
            }
        }
        .k2 {
            .title {
                margin: 40px 0 20px;
            }
            .infoTitle {
                width: 1000px;
                margin: 20px auto;
                margin-bottom: 20px;
            }
            .tickInfo {
                width: 1060px;
                margin: 0 auto;
                border: solid 1px #cccccc;
                li {
                    display: flex;
                    height: 50px;
                    line-height: 50px;
                    border-top: solid 1px #cccccc;
                    span {
                        flex: 1;
                        text-align: center;
                    }
                    &:nth-of-type(1) {
                        border-top: none;
                    }
                }
            }
        }
    }

    hr {
        color: #666;
    }

    .submitMark {
        width: 990px;
        margin: 0 auto;
        line-height: 50px;
        span {
            display: inline-block;
            width: 140px;
            font-size: 16px;
            line-height: 40px;
            margin-right: 10px;
            color: #666666;
            text-align: right;
            &:nth-of-type(2) {
                width: 700px;
                font-size: 14px;
                line-height: 30px;
                color: #333333;
                text-align: left;
            }
        }
    }

    .btn {
        text-align: center;
        line-height: 100px;
        span {
            margin-right: 130px;
            display: inline-block;
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            background: #00a0e9;
            color: #fff;
            cursor: pointer;
        }
        span:nth-child(2) {
            background: #999;
        }
        span:nth-child(3) {
            margin-right: 0;
        }
    }

    @com_font_size: 16px;
    @con_bg: #fff;
    .tablemain {
        overflow: hidden;
        .essp_width_auto();
        background: #fff;
        /*padding-top: 74px;*/
        /*padding-bottom: 55px;*/
        .tablemain_item {
            position: relative;
            border: 1px solid #ccc;
            width: 1000px;
            margin: 0 auto;
            .esspborder-radius(5px);
            margin-bottom: 20px;
        }
    }

    .minus,
    .plus {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #fbfbfb;
        border: 1px solid #ccc;
    }

    .close {
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
    }

    .minus {
        border-right: 0;
    }

    .plus {
        border-left: 0;
    }

    .inputs {
        width: 50px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #ccc;
        input {
            display: block;
            width: 96%;
            height: 100%;
            padding: 0 2%;
            text-align: center;
            background: #fff;
            border: none;
            outline: none;
        }
    }

    .count {
        display: inline-block;
    }

    .txform {
        .essp_width_auto();
        background: @con_bg;
        .item_wrap {
            padding: 0 100px 35px;
            .floats {
                .esspfloat();
                height: 34px;
                line-height: 34px;
                font-size: @com_font_size;
            }

            .item {
                .esspfloat();
                width: 50%;
                span {
                    color: @essp_nav_bg;
                }
            }
        }
    }

    .submit_btns {
        .essp_width_auto();
        background: @con_bg;
        padding-bottom: 50px;
        margin-bottom: 20px;
        .submit_btns_inner {
            .essp_width_auto(330px);
            button {
                float: left;
                min-width: 100px;
            }
            .cancel_btn {
                float: right;
            }
        }
    }

    .piaoj {
        .essp_width_auto();
        background: @con_bg;
        padding-bottom: 50px;
        .pjdiv {
            padding: 0 100px;
        }
    }

    .tabletit {
        position: relative;
        text-align: center;
        padding: 0 40px 0 20px;

        .avatarlogo {
            width: 78px;
            height: 78px;
        }
        p {
            float: left;
            width: 33.33%;
            padding: 20px 0;
            height: 30px;
            line-height: 30px;
            span {
                color: @essp_nav_bg;
            }
        }
    }
    .mark {
        width: 960px;
        margin: 0 auto 40px;
        overflow: hidden;
        span {
            float: left;
            width: 126px;
            margin-right: 5px;
            text-align: right;
            font-size: 16px;
            letter-spacing: 0.4px;
            color: #666666;
            line-height: 38px;
        }
        textarea {
            width: 600px;
            min-width: 560px;
            max-width: 460px;
            min-height: 80px;
            border: 1px solid #ddd;
            outline: none;
            padding: 10px 20px;
            float: left;
        }
    }
    .tabmain {
        padding: 0 28%;
        .itemdiv {
            label {
                display: block;
                margin-bottom: 10px;
                margin-top: 10px;
                padding: 0 5px;
                font-size: 16px;
                color: #666;
            }
            .importanticon {
                color: #ff9900;
                margin-right: 5px;
            }
            input {
                display: block;
                width: 530px;
                height: 35px;
                margin-bottom: 10px;
                background-color: #f6f9fb;
                border: 1px solid #eaeff2;
                padding: 0 10px;
            }
        }
        .tablebtn {
            display: block;
            margin: 20px auto;
        }
    }

    .activemain {
        .essp_width_auto();
    }

    .activemain_con {
        padding: 20px;
        background: #fff;
    }

    .login_con_a {
        .esspsc(16px);
    }

    .bmbtn {
        margin-left: 20px;
        em {
            padding-right: 5px;
        }
    }

    // 左侧部分
    .actleft {
        float: left;
        padding: 0 0 10px;
        margin-right: 25px;
        /*border: 1px solid #ccc;*/

        .acttit {
            width: 180px;
            height: 40px;
            background-color: @essp_nav_bg;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin-bottom: 10px;
        }
        .actlogo {
            display: block;
            width: 180px;
            height: 180px;
        }
        .actcpname {
            font-size: 12px;
            width: 180px;
            overflow: hidden;
            line-height: 30px;
            color: #333333;
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
        margin-right: 10px;
        cursor: pointer;
        .detaillogo {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .detailcon {
        float: left;
        width: 522px;
        h2 {
            height: 72px;
            font-size: 20px;
            font-weight: bolder;
            line-height: 36px;
            color: #333333;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            -moz-line-clamp: 2;
            -moz-box-orient: vertical;
            -ms-line-clamp: 2;
            -ms-box-orient: vertical;
            cursor: pointer;
        }
    }

    //标签模块
    .tagcon {
        margin-bottom: 5px;
        padding-left: 20px;
        span {
            float: left;
            margin-right: 20px;
            padding: 4px 10px;
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
        b,
        em {
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
        }
    }

    .infobtn {
        margin-bottom: 20px;
        .btnitem {
            float: left;
            width: 110px;
            height: 30px;
            line-height: 30px;
            margin-left: 15px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #ccc;
            &:hover {
                cursor: pointer;
            }
        }
        .selecrborder {
            position: relative;
            color: #ff9900;
            border: 1px solid #ff9900;
        }
        .selecrborder:before {
            position: absolute;
            content: " ";
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

    .common_titdes {
        font-weight: normal;
    }
</style>

