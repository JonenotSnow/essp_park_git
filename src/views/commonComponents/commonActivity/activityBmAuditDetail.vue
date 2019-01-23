<template>
    <div class="actauditpage" id="manageActivityAudit">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="common_titwrap">
            <div style="padding: 0 80px;">
                <p class='Otitle'><span>活动报名审核</span></p>
                <div class="k1">
                    <div class="bmContentList esspclearfix">
                        <p>
                            <span>活动的主题：</span>
                            <span>{{infoList.activityTheme || "暂无主题"}}</span>
                        </p>
                        <p>
                            <span>公司名称：</span>
                            <span>{{infoList.cstName || "暂无公司名称"}}</span>
                        </p>
                        <p>
                            <span>联系人姓名：</span>
                            <span>{{infoList.contactName || "暂无联系人"}}</span>
                        </p>
                        <p>
                            <span>报名人数：</span>
                            <span>{{infoList.enterNumber || 0}}人</span>
                        </p>
                        <p>
                            <span>联系人手机：</span>
                            <span>{{infoList.contactPhone || "暂无联系电话"}}</span>
                        </p>
                    </div>
                </div>
                <h3 class="common_t">报名人信息表</h3>
                <div class="enroll_margin" v-if="enrollType == '0'">
                    <div class="tablemain changeWidth">
                        <!-- 报名表界面 -->
                        <div v-for="(item,index) in nrollFormList" :key="index">
                            <div v-for="(childItem,childIndex) in item" :key="childIndex"  class="tablemain_item">
                                <div class="tabletit esspclearfix">
                                    <p class="text_align_l" @click="childItem.isShow = !childItem.isShow">
                                        <ul>
                                            <li style="list-style: square;cursor: pointer">报名人{{childIndex+1}} (票种: <span>{{childItem.pName}})</span>
                                                <i :class="childItem.isShow?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
                                            </li>
                                        </ul>

                                    </p>
                                    <!--<p class="text_align_c">报名人{{childIndex}}</p>-->
                                    <!--<p class="text_align_r" v-show="!childItem.isShow"><el-button round size="mini" >查看详情</el-button></p>-->
                                </div>
                                <div class="tabmain" v-show="childItem.isShow">
                                    <div class="itemdiv itemdiv1" v-for="(formListItem, formListIndex) in childItem.formRqList" :key="formListIndex">
                                        <label for=""><em class="importanticon" v-if="formListItem.requir">*</em>{{formListItem.name+'：'}}</label>
                                        <!--输入框-->
                                        <input v-if="formListItem.type=='text'" readonly type="text" :placeholder="'请输入'+formListItem.name" v-model="formListItem.tittext">
                                        <!--文本框-->
                                        <el-input type="textarea" disable v-if="formListItem.type=='textarea'" :rows="2" :placeholder="'请输入'+formListItem.name" v-model="formListItem.tittext"></el-input>
                                        <!--单选框-->
                                        <el-select v-if="formListItem.type=='radio'" v-model="formListItem.tittext" clearable placeholder="请选择">
                                            <el-option
                                                v-for="(item,index) in formListItem.childrens"
                                                :key="item.value"
                                                :label="index"
                                                :value="item.name">
                                            </el-option>
                                        </el-select>
                                        <!--复选框-->
                                        <el-select multiple collapse-tags v-if="formListItem.type=='checkbox'" v-model="formListItem.tittext" clearable placeholder="请选择">
                                            <el-option
                                                v-for="(item,index) in formListItem.childrens"
                                                :key="item.value"
                                                :label="index"
                                                :value="item.name">
                                            </el-option>
                                        </el-select>
                                        <!--日期模版-->
                                        <el-date-picker v-if="formListItem.type=='dataTime'" v-model="formListItem.tittext" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                        <!--数字模版-->
                                        <el-input  v-if="formListItem.type=='numberBox'" v-model="formListItem.tittext" type="number" auto-complete="off" class="cpm"></el-input>

                                    </div>
                                    <div class="itemdiv itemdiv2">
                                        <el-button round class="tablebtn" size="mini" @click="savePeopleInfo(childItem)">保存并收起</el-button>
                                    </div>
                                </div>
                                <div style="height: 1px;background: #ccc;" v-show="!childItem.isShow"></div>
                            </div>
                        </div>
                    </div>
                    <div v-show="radio == '2'" style="background: #fff;">
                        <div style="width: 1000px;margin: 0 auto;">

                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small">下载模板</el-button>
                                <el-button size="small">点击上传</el-button>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="company" v-if="enrollType == '1'">
                    <div class="tablemain changeWidth">
                        <div class="tabmain" style="padding-bottom: 30px;">
                            <div class="itemdiv" v-for="(item,index) in nrollFormList" :key="index">
                                <label for=""><em class="importanticon" v-if="item.requir">*</em>{{item.name}}</label>
                                <input v-if="item.type=='text'" type="text" :placeholder="'请输入'+item.name" v-model="item.tittext">
                                <!--文本框-->
                                <el-input type="textarea" v-if="item.type=='textarea'" :rows="2" :placeholder="'请输入'+item.name" v-model="item.tittext"></el-input>
                                <!--单选框-->
                                <el-select v-if="item.type=='radio'" v-model="item.tittext" clearable placeholder="请选择">
                                    <el-option
                                        v-for="(item,index) in item.childrens"
                                        :key="item.value"
                                        :label="index"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                                <!--复选框-->
                                <el-select multiple collapse-tags v-if="item.type=='checkbox'" v-model="item.tittext" clearable placeholder="请选择">
                                    <el-option
                                        v-for="(item,index) in item.childrens"
                                        :key="item.value"
                                        :label="index"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                                <!--日期模版-->
                                <el-date-picker v-if="item.type=='dataTime'" v-model="item.tittext" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                <!--数字模版-->
                                <el-input  v-if="item.type=='numberBox'" v-model="item.tittext" type="number" auto-complete="off" class="cpm"></el-input>
                            </div>
                            <!--<div class="itemdiv">-->
                            <!--<label for=""><em class="importanticon">*</em>联系人姓名</label>-->
                            <!--<input type="text" v-model="companyForm.name">-->
                            <!--</div>-->
                            <!--<div class="itemdiv">-->
                            <!--<label for=""><em class="importanticon">*</em>联系人电话</label>-->
                            <!--<input type="text" v-model="companyForm.tel">-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>

                <p class="btn" v-if="type != '01'">
                    <span  @click="access =true">通过</span>
                    <span @click="noAccess = true">不通过</span>
                    <span @click="cancelOption">取消</span>
                    <!--<el-button type="primary" size="small">通过</el-button>-->
                    <!--<el-button type="primary" size="small" ></el-button>-->
                    <!--<el-button type="primary" size="small"></el-button>-->
                </p>
            </div>

        </div>

        <!-- 通过审核弹窗 -->
        <el-dialog :visible.sync="access" width='560px' class='noAccess'>
            <p>报名审核通过意见</p>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入审核通过意见"
                v-model="mark">
            </el-input>
            <p>
                <el-button type="primary" size="small" @click="access =false">取消</el-button>
                <el-button type="primary" size="small" @click="auditOption('02')">确认</el-button>
            </p>
        </el-dialog>

        <!-- 未通过审核弹窗 -->
        <el-dialog :visible.sync="noAccess" width='560px' class='noAccess'>
            <p>报名审核不通过意见</p>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入审核不通过意见"
                v-model="mark">
            </el-input>
            <p>
                <el-button type="primary" size="small" @click="noAccess =false">取消</el-button>
                <el-button type="primary" size="small" @click="auditOption('03')">确认</el-button>
            </p>
        </el-dialog>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"

    export default {
        data() {
            return {
                breadlist: [
                    {
                        path: '/parkIndex/park/all',
                        name: this.utils.isBdPark()?'平台活动':"园区活动"
                    },
                    {
                        path: `/parkIndex/park/auditingBm`,
                        name: "我审核的活动"
                    },
                    {
                        path: '',
                        name: "活动报名审核"
                    }
                ],
                type: this.$route.query.type,
                items: [],//票务列表信息
                nrollFormList: [],//申报表列表信息
                auditType: "",    //审核类型（企业审核、园区审核）
                infoList: {},
                access: false,
                noAccess: false,
                radio: '1',
                enrollType:'', // 报名类型
                mark: '',
                typeList: [
                    {
                        type: '1',
                        name: '培训'
                    },
                    {
                        type: '2',
                        name: '论坛'
                    },
                    {
                        type: '3',
                        name: '比赛'
                    },
                    {
                        type: '4',
                        name: '聚会'
                    },
                    {
                        type: '5',
                        name: '研讨会'
                    },
                    {
                        type: '6',
                        name: '发布会'
                    },
                    {
                        type: '7',
                        name: '分享会'
                    },
                    {
                        type: '8',
                        name: '沙龙'
                    }
                ]
            }
        },
        components: {
            EsspBreadCrumb
        },
        created() {
            this.getInfo()
        },
        methods: {
            /*获取企业活动审核详情页面的活动信息 */
            getInfo() {
                var opMark = this.type == "01" ? '01' : '03';
                this.$post(this.$apiUrl.active.getByKeyId, {
                    activityId: this.$route.query.id,
                    parkId: sessionStorage.getItem("parkId"),
                    enterinfoId: this.$route.query.enterinfoId,
                    opMark: opMark
                }).then((response) => {
                    if (response.resultCode == 'CLT000000000') {
                        this.infoList = response.resultData;
                        this.items = JSON.parse(this.infoList.ticketForm);//票务信息
                        var enterForm = JSON.parse(this.infoList.enterForm); //申报信息

                        this.enrollType =  this.infoList.enterType;
                        this.nrollFormList = enterForm;
                    } else {
                        this.$message.error(response.resultMsg)
                    }


                }, (response) => {
                    this.$message.error(response.resultMsg)
                })
            },
            // 取消
            cancelOption(){
                this.$post(this.$apiUrl.active.cancelOption, {
                    activityId: this.$route.query.id,
                    parkId: sessionStorage.getItem("parkId"),
                    enterinfoId: this.$route.query.enterinfoId,
                    opMark: '03'
                })
                .then(response => {
                    if (response.resultCode == 'CLT000000000') {
                        this.$router.push("/parkIndex/park/auditingBm");
                    } else {
                        this.$message.error(response.resultMsg)
                    }
                    this.noAccess = false;
                }, response => {
                    this.noAccess = false;
                    this.$message.error(response.resultMsg)
                })

            },
            savePeopleInfo(item){

                item.isShow = false
            },
            // 通过  或者 不通过
            auditOption(type){
                var reason = this.mark;

                if(this.mark == "") {
                    this.$message.error("拒绝理由必填！");
                    return;
                }
                this.$post(this.$apiUrl.active.auditOption, {
                    activityId: this.$route.query.id,
                    parkId: sessionStorage.getItem("parkId"),
                    enterinfoId: this.$route.query.enterinfoId,
                    reason: reason,
                    auditState: type
                })
                .then(response => {
                    this.access = false;
                    if (response.resultCode == 'CLT000000000') {
                        this.$alert(response.resultMsg, '审核', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push("/parkIndex/park/auditingBm");
                            }
                        });
                    } else {
                        this.$message.error(response.resultMsg)
                    }

                }, response => {
                    this.access = false;
                    this.$message.error(response.resultMsg)
                })
            }
        }, filters: {
            openStatus(value) {
                if (value == '0') {
                    return '本园区';
                } else if (value == '1') {
                    return '全开放';
                }
            }

        }

    }
</script>
<style>

    #manageActivityAudit .noAccess .el-dialog__body {
        text-align: center;
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
    .text_align_l {
        li {
            font-size: 18px;
        }
    }
    .common_titwrap {
        .essp_width_auto();
        background: #fff;
        .Otitle {
            font-size: 24px;
            line-height: 36px;
            margin-bottom: 20px;
            color: #333333;
            text-align: center;
            span {
                position: relative;
            }
            span:before,span:after {
                position: absolute;
                content: "";
                top: 50%;
                width: 70px;
                height: 1px;
                background: #ccc;
            }
            span:before {
                left: -92px;
            }
            span:after {
                right: -92px;
            }
        }
        .title {
            width: 102 0px;
            margin: 0 auto;
            overflow: hidden;
        }
        .bmContentList {
            .essp_width_auto();
            padding-top: 30px;
            p{
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
                    font-size: 14px;
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
            display: inline-block;
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            margin-right: 130px;
            cursor: pointer;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            font-size: 16px;
        }
        span:nth-child(1) {
            background: #0275cc;
        }
        span:nth-child(2) {
            background: #999;
        }
        span:nth-child(3) {
            background: #999;
            margin-right: 0;
        }
    }
    .common_t {
        padding: 5px 0;
        padding-left: 9px;
        background: #f7f7f7;
        border-left: 4px solid #0066b3;
        margin-top: 86px;
        color:#00A0E9;
        font-size: 16px;
    }
    @com_font_size: 16px;
    @con_bg: #fff;
    .tablemain{
        /*overflow: hidden;*/
        .essp_width_auto();
        background: #fff;
        padding-top: 35px;
        &.changeWidth{
            width: 1000px;
        }
        /*padding-bottom: 55px;*/
        .tablemain_item {
            position: relative;
            /*border: 1px solid #ccc;*/
            /*width: 1000px;*/
            /*margin: 0 auto ;*/
            .esspborder-radius(5px);
            margin-bottom: 20px;
        }
    }
    .minus,.plus {
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
            outline:none;
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
                    color: @essp_nav_bg
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
    .tabletit{
        position: relative;
        text-align: center;
        padding: 0 40px 0 20px;

        .avatarlogo{
            width:78px;
            height:78px;
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
    .tabmain{
        padding:25px 28% 0;
        border: 1px solid #ccc;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        -webkit-box-shadow: 5px 3px 13px 2px rgba(0,102,179,0.15);
        -moz-box-shadow: 5px 3px 13px 2px rgba(0,102,179,0.15);
        box-shadow:  5px 3px 13px 2px rgba(0,102,179,0.15);
        .itemdiv{
            label{
                display: block;
                margin-bottom: 10px;
                margin-top: 10px;
                padding:0 5px;
                font-size: 14px;
                color: #666;
            }
            .importanticon{
                color:#ff9900;
                margin-right: 5px;
            }
            input{
                display: block;
                width:530px;
                height:35px;
                margin-bottom: 10px;
                background-color: #f6f9fb;
                border:1px  solid  #eaeff2;
                padding: 0 10px;
            }

        }
        .tablebtn{
            display: block;
            margin:20px auto;
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
        .esspsc(16px)
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
            height: 100%
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
        b, em {
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
</style>

