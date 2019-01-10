<template>
    <div class="enroll_form">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="enrollform_con">
            <div class="activemain">
                <div class="activemain_con esspclearfix">
                    <!-- 活动介绍模块 -->
                    <div class="actleft">
                        <div>
                            <div class="acttit">主办方</div>
                            <div>
                                <img class="actlogo" :src="logo" alt="">
                                <p class="actcpname login_con_a" @click="interCc()">{{actData.cstName ?actData.cstName:"进入企业橱窗>>"}}</p>
                                <!-- <a href="javascript:void(0)" class="login_con_a" @click="interCc()">进入企业橱窗 <i
                                    class="el-icon-d-arrow-right"></i></a> -->
                            </div>
                        </div>
                    </div>
                    <div class="actright">
                        <div class="maininfo esspclearfix">
                            <div class="logocon1">
                                <img class="detaillogo" :src="actData.activityPhoto" alt="详细活动报名logo">
                            </div>
                            <div class="detailcon">
                                <h2>{{actData.activityTheme}}</h2>
                                <div class="tagcon esspclearfix">
                                    <span v-for="(item,index) in activityLabelList" v-if="index < 3" :key="index">{{item}}</span>
                                </div>
                                <div class="infos">
                                    <div class="infos_item"><i class="icon iconfont icon-riqi1"></i>
                                        <b>时间：</b><em>{{actData.activityStarttime}}</em></div>
                                    <div class="infos_item btns"><i class="icon iconfont icon-dizhi"></i>
                                        <b>地点：</b><em>{{actData.activityPlace}}</em></div>
                                    <div class="infos_item"><i class="icon iconfont icon-faburen"></i>
                                        <b>发布机构：</b><em>{{actData.initiatorWay || '暂无发起人'}}</em></div>
                                    <div style="margin-bottom: 18px;"><i class="icon iconfont icon-piaozhong"></i> <b style="padding-left: 0;">票种：</b><em></em></div>
                                </div>
                                <div class="infobtn esspclearfix">
                                    <div class="btnitem" v-for="(item,index) in tableData" :key="index">
                                        ￥{{item.ticketPirce || '0.00'}} {{item.ticketType}}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div class="common_titwrap esspclearfix">
                <div>
                    <h3 class="common_titdes">填写票务信息</h3>
                </div>
            </div>
            <div class="piaoj">
                <div class="pjdiv">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            prop="ticketType"
                            label="票种"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="ticketPirce"
                            align="center"
                            label="价格"
                            width="180">
                            <template slot-scope="scope">
                                {{scope.row.ticketPirce | changePrice}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="ticketNum"
                            align="center"
                            label="数量">
                            <template slot-scope="scope">
                                <div class="count esspclearfix">
                                    <!-- 有待优化吧 -->
                                    <div class="esspfl minus" v-if="scope.row.ticketNum > 0 && scope.row.maxPNum > 0"
                                         @click="minus(scope.$index,scope.row)"><i class="el-icon-minus"></i></div>
                                    <div class="esspfl inputs myinput_no">
                                        <input type="number" @change="changeNum(scope.$index,scope.row)"
                                               v-model="scope.row.ticketNum">
                                    </div>
                                    <div class="esspfl plus" @click="plus(scope.$index,scope.row)" v-if="scope.row.maxPNum > scope.row.ticketNum "><i
                                        class="el-icon-plus"></i></div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="总价">
                            <template slot-scope="scope">
                                {{scope.row.ticketPirce * scope.row.ticketNum | changePrice}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <!--个人信息-->
            <!-- enrollType 个人报名0 -->
            <div class="personal" v-if="enrollType =='0'">
                <div class="common_titwrap esspclearfix">
                    <div>
                        <h3 class="common_titdes">填写报名信息</h3>
                    </div>
                </div>
                <div class="txform" v-if="enrollType =='0'">
                    <div class="item_wrap esspclearfix">
                        <div class="item">
                            <div class="floats"><span>*</span>联系人姓名：</div>
                            <div class="floats">
                                <el-input v-model="inputName" placeholder="请输入姓名"></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <div class="floats"><span>*</span>联系人手机：</div>
                            <div class="floats">
                                <el-input v-model="inputTel" type="text" placeholder="请输入手机号"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="txform" v-if="enrollType == '0'">
                    <div class="item_wrap item_wrap_bor esspclearfix">
                        <div class="item">
                            <el-radio v-model="bookstyle" label="1">在网页中填写</el-radio>
                            <el-radio v-model="bookstyle" label="2">报名表批量导入</el-radio>
                        </div>
                        <div class="item text_align_r">
                            <span>友情提醒：当报名人数>5人时，建议批量导入</span>
                        </div>
                    </div>
                </div>
                <div class="enroll_margin">
                    <div class="tablemain" v-show="bookstyle == '1'">
                        <!-- 报名表界面 -->
                        <div v-for="(item,index) in nrollFormList" :key="index">
                            <div v-for="(childItem,childIndex) in item" :key="childIndex" class="tablemain_item">
                                <div class="tabletit esspclearfix">
                                    <p class="text_align_l">票种: <span>{{childItem.pName}}</span></p>
                                    <p class="text_align_c text_align_c1"></p>
                                    <p class="text_align_r" v-show="!childItem.isShow">
                                        <el-button round size="mini" @click="childItem.isShow = !childItem.isShow">
                                            查看详情
                                        </el-button>
                                    </p>
                                    <span class="close" @click="deleteItem(childItem,index,childIndex)">
                                        <i class="el-icon-close"></i>
                                    </span>
                                </div>
                                <div class="tabmain" v-show="childItem.isShow">

                                    <div class="itemdiv" v-for="(formListItem, formListIndex) in childItem.formRqList"
                                         :key="formListIndex">
                                        <label for=""><em class="importanticon"
                                                          v-if="formListItem.requir">*</em>{{formListItem.name + '：'}}</label>
                                        <!--输入框-->
                                        <input v-if="formListItem.type=='text'" type="text"
                                               :placeholder="'请输入'+formListItem.name" v-model="formListItem.tittext">
                                        <!--文本框-->
                                        <el-input type="textarea" v-if="formListItem.type=='textarea'" :rows="2"
                                                  :placeholder="'请输入'+formListItem.name"
                                                  v-model="formListItem.tittext"></el-input>
                                        <!--单选框-->
                                        <el-select v-if="formListItem.type=='radio'" v-model="formListItem.tittext"
                                                   clearable placeholder="请选择">
                                            <el-option
                                                v-for="(item,index) in formListItem.childrens"
                                                :key="item.value"
                                                :label="index"
                                                :value="item.name">
                                            </el-option>
                                        </el-select>
                                        <!--复选框-->
                                        <el-select multiple collapse-tags v-if="formListItem.type=='checkbox'"
                                                   v-model="formListItem.tittext" clearable placeholder="请选择">
                                            <el-option
                                                v-for="(item,index) in formListItem.childrens"
                                                :key="item.value"
                                                :label="index"
                                                :value="item.name">
                                            </el-option>
                                        </el-select>
                                        <!--日期模版-->
                                        <el-date-picker v-if="formListItem.type=='dataTime'"
                                                        v-model="formListItem.tittext" type="datetime"
                                                        placeholder="选择日期时间"></el-date-picker>
                                        <!--数字模版-->
                                        <el-input v-if="formListItem.type=='numberBox'" v-model="formListItem.tittext"
                                                  type="number" auto-complete="off" class="cpm"></el-input>
                                    </div>
                                    <div class="itemdiv" style="
                                        overflow: hidden;
                                        width: 160%;">
                                        <el-button round class="tablebtn" size="mini" style="float: right;"
                                                   @click="savePeopleInfo(childItem)">收起
                                        </el-button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div v-show="bookstyle == '2'" class="batchimport esspclearfix">
                        <!-- 批量导入 -->
                        <div class="batchbtn">
                            <el-button size="small" type="primary" class="downloadbtn"><a class="down_a" :href="actData.enrolTemplateUrl">下载模板</a></el-button>
                            <el-upload class="uploadbtn upload-demo"
                                action="#"
                                :file-list="listFile"
                                :before-upload="beforeup">
                                <el-button size="small" slot="trigger" type="primary">选择文件</el-button>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <!--公司信息-->
            <div class="company" v-if="enrollType == '1'">
                <div class="common_titwrap esspclearfix">
                    <div>
                        <h3 class="common_titdes">填写报名信息</h3>
                    </div>
                </div>
                <div class="tablemain">
                    <div class="tabmain" style="padding-bottom: 30px;">
                        <div class="itemdiv" v-for="(item,index) in formRqList" :key="index">
                            <label for=""><em class="importanticon" v-if="item.requir">*</em>{{item.name}}</label>
                            <input v-if="item.type=='text'" type="text" :placeholder="'请输入'+item.name"
                                   v-model="item.tittext">
                            <!--文本框-->
                            <el-input type="textarea" v-if="item.type=='textarea'" :rows="2"
                                      :placeholder="'请输入'+item.name" v-model="item.tittext"></el-input>
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
                            <el-select multiple collapse-tags v-if="item.type=='checkbox'" v-model="item.tittext"
                                       clearable placeholder="请选择">
                                <el-option
                                    v-for="(item,index) in item.childrens"
                                    :key="item.value"
                                    :label="index"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                            <!--日期模版-->
                            <el-date-picker v-if="item.type=='dataTime'" v-model="item.tittext" type="datetime"
                                            placeholder="选择日期时间"></el-date-picker>
                            <!--数字模版-->
                            <el-input v-if="item.type=='numberBox'" v-model="item.tittext" type="number"
                                      auto-complete="off" class="cpm"></el-input>
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

            <div class="txform">
                <div class="item_wrap esspclearfix">
                    <span style="padding-right: 10px;">报名是否需要审核:</span>
                    <el-radio class="radio_span" v-model="radioEnroll" disabled label="1">是</el-radio>
                    <el-radio class="radio_span" v-model="radioEnroll" disabled label="0">否</el-radio>
                </div>
            </div>
            <div class="submit_btns">
                <div class="submit_btns_inner esspclearfix">
                    <span class="sure_btn" @click="submitForm(bookstyle)">{{btnText}}</span>
                    <span class="cancel_btn" @click="enrollFormMaskCus = true">取消</span>
                    <!--<el-button class="sure_btn"  type="primary" size="small"></el-button>-->
                    <!--<el-button class="cancel_btn" size="small" >-->
                    <!--</el-button>-->
                </div>
            </div>
            <el-dialog
                :visible.sync="enrollFormMaskCus"
                title="提示"
                class="enroll_success enroll_succ">
                <p class="icon_p icon_p1"><i class="el-icon-warning"></i>是否确认取消活动报名</p>
                <div slot="footer" class="dialog-footer">
                    <span @click="enrollFormMaskCus = false">取消</span>
                    <span @click="btnLinks">确定</span>
                    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
                    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                </div>
            </el-dialog>
            <el-dialog
                :visible.sync="enrollFormMask"
                class="enroll_success">
                <div class="icon_div"><i class="iconfont icon-queren"></i></div>
                <p class="icon_p">恭喜您活动报名成功</p>
                <div slot="footer" class="dialog-footer">
                    <span @click="btnLink(1)">查看我报名的活动</span>
                    <span @click="btnLink(2)">返回首页</span>
                    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
                    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                </div>
            </el-dialog>
        </div>


    </div>
</template>

<script>
    import activityBrief from "@/views/parkHall/activity/activityBrief"
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"

    export default {
        data() {
            return {
                logo: "",
                activityLabelList: [],
                enrollFormMask: false,      // 报名成功弹窗
                enrollFormMaskCus: false,   // 报名取消
                msg: "个人或者报名",
                btnText: "确定报名",
                btnBloon: true,
                enrollType: parseInt(this.$route.query.enrollType), // 根据个人还是公司报名 0.个人 1. 公司
                input: '',
                bookstyle: '1',// 前提个人报名时候，选择是网页报名或者批量报名
                radioEnroll: '0', // 报名是否需要审核
                showBtn: true,   // true 表示确定隐藏
                inputName: '',
                inputTel: '',
                maxNum: 1,  // 报名上限
                num1: '',
                actData: {},  // 详情数据
                formRqList: [],
                companyForm: {
                    companyName: "",
                    tel: '',
                    name: ''
                },
                selcetfile:'',
                listfile:[],
                listFile:[],
                nrollFormList: [],
                breadlist: [
                    {
                        path: '/parkIndex/park/all',
                        name: "园区活动"
                    },
                    {
                        path: '/parkIndex/activityDetail',
                        name: "活动报名"
                    }
                ],
                tableData: []
            }
        },
        components: {
            activityBrief,
            EsspBreadCrumb
        },
        filters: {
            changePrice: function (value) {
                value = Number(value);
                return "￥" + value.toFixed(2)
            },

        },
        created() {

            this.initData();
        },
        methods: {
            //上传表格
            interCc() {
                this.$router.push({
                    path: '/centerIndex/showHome',
                    query: {cstId: this.actData.cstId}
                })
            },
            btnLink(type) {
              var url = type ==1?'/parkIndex/park/enroll':'/parkHome';
              this.$router.push(url);
            },
            btnLinks() {
                this.$router.push("/parkIndex/park/all");
            },
            handleRemove(file, fileList) {

            },
            handlePreview(file) {

            },
            initData() {
                this.$post(this.$apiUrl.active.activeDetail, {
                    activityId: this.$route.query.activeId,
                    parkId: sessionStorage.getItem("parkId"),
                    opMark: '01'
                })
                    .then((response) => {
                        this.actData = response.resultData;

                        this.tableData = JSON.parse(this.actData.ticketForm);

                        this.tableData.forEach((item,index) => {
                            this.$set(item,"maxPNum", item.ticketNum);
                            item.ticketNum = 0;
                        })
                            console.log(this.tableData);
                        var arr = JSON.parse(this.actData.enterForm).formRqList;
                        var arr1 = JSON.parse(this.actData.enterForm).formTypeList;
                        this.maxNum = this.actData.topLimit;
                        this.radioEnroll = this.actData.enterNeedAudit


                        this.formRqList = arr.concat(arr1);

                        if (this.enrollType != '1') {
                            this.creadFormList();
                        }

                        if (this.actData.activityLabel) {
                            this.activityLabelList = (this.actData.activityLabel).split(",");
                        }
                        this.getLogo();//获取企业logo


                    });


            },
            getLogo() {
                /* 获取企业logo */
                this.$post(this.$apiUrl.active.getLogo, {
                    cstId: this.actData.cstId
                }).then((response) => {
                    this.logo = response.resultData.logo;

                });
            },


            creadFormList() {
                this.tableData.forEach((item, index) => {
                    var arr = [];
                    console.log(item.ticketNum);
                    if (item.ticketNum == 0) {
                        this.nrollFormList.push(arr);
                        return;
                    }
                    for (var i = 0; i < item.ticketNum; i++) {
                        var a = JSON.parse(JSON.stringify(this.formRqList));
                        var info = {
                            pName: item.ticketType,
                            pType: index,
                            formRqList: a,
                            isShow: (i == 0 && index == 0) ? true : false
                        }
                        arr.push(info);
                        if (i == item.ticketNum - 1) {
                            this.nrollFormList.push(arr);
                        }
                    }
                })

            },
            changeNum(index, item) {

                console.log(this.enrollType,item.ticketNum);
                if(item.ticketNum == "") {
                    item.ticketNum = 0;
                }
                if(item.ticketNum < 0) {
                    item.ticketNum = 0;
                    this.$message.error("票种不能小于0");
                }
                if(item.ticketNum > item.maxPNum) {
                    item.ticketNum = item.maxPNum;
                    this.$message.error("票数量不能大于"+item.ticketNum+'张');
                }

                console.log(this.nrollFormList[index]);

                var len = this.nrollFormList[index].length;

                var diff = item.ticketNum - len;


                console.log(len,diff);

                if (diff > 0) {
                    for (var i = 0; i < diff; i++) {
                        var info = {
                            pName: this.tableData[index].ticketType,
                            pType: index,
                            formRqList: this.formRqList,
                            isShow: false
                        }
                        info = JSON.parse(JSON.stringify(info));
                        this.nrollFormList[index].push(info);
                    }
                } else {

                    this.nrollFormList[index].splice(this.nrollFormList[index].length - Math.abs(diff), Math.abs(diff));
                }
            },
            changeFormList(index, type) {
                // type == 1是属于减数量  其他就是加数量
                var info = {
                    pName: this.tableData[index].ticketType,
                    pType: index,
                    formRqList: this.formRqList,
                    isShow: false
                }
                info = JSON.parse(JSON.stringify(info));
                if (type === 1) {
                    this.nrollFormList[index].splice(this.nrollFormList[index].length - 1, 1);
                } else {
                    this.nrollFormList[index].push(info);
                }
            },

            deleteItem(childItem, index, childIndex) {
                var len = this.nrollFormList[index].length;
                if (len <= 0) {
                    this.$alert('最少报名人数为0', '删除', {
                        confirmButtonText: '确定'
                    })
                    return
                }
                this.$alert('您是否确定删除？', '删除', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.nrollFormList[index].splice(childIndex, 1);
                        this.tableData[index].ticketNum--;
//                        if(childIndex == 0) {
//                            this.nrollFormList[index][childIndex].isShow = true;
//                        }

                    }
                });

            },
            minus(index, item) {
                item.ticketNum--;
                if(item.ticketNum < 0) {
                    return;
                }
                if (this.enrollType === 1) {
                    return;
                }
                this.changeFormList(index, 1)
            },
            plus(index, item) {
                item.ticketNum++;
                if (this.enrollType === 1) {
                    return;
                }
                this.changeFormList(index, 2)
            },
            savePeopleInfo(item) {

                item.isShow = false
            },
            // 检查报名表是否都填写
            rulenrollFormList(nrollFormList) {
                var isNull = false;
                console.log(nrollFormList);
                nrollFormList.forEach((item, index) => {
                    item.forEach((itemChild, indexChild) => {
                        itemChild.formRqList.forEach((itemChilds,indexChild1) => {
                            if(itemChilds.tittext == "" && itemChilds.requir) {
                                isNull = true;
                                return;
                            }
                        })
                    })
                })
                return isNull;
            },
            getTitleName(val) {
                var tit = '';

                if (val == "username") {
                    tit = "姓名";
                }
                if (val == "tel") {
                    tit = "手机";
                }
                if (val == "job") {
                    tit = "职位";
                }
                if (val == "company") {
                    tit = "公司";
                }
                if (val == "getInfo") {
                    tit = "期望从活动中获得哪些信息";
                }
                return tit;
            },
            // 获取总人数
            getAllNum() {
                var num = 0;
                this.tableData.forEach((item, index) => {
                    num += parseInt(item.ticketNum);
                })
                return num;
            },

            // 点击报名
            submitForm(bookstyle) {
//                this.grSubmit();
                // enterType 1 公司   0 个人提交
                this.grSubmit(bookstyle);
            },
            reFile(){
                this.selcetfile = "";
                this.listfile = [];
            },
            beforeup(file){

                this.reFile();//每次开始重置为空
                this.selcetfile = file;
                this.listfile = this.listfile.push(file);
                this.listFile = [{
                    name: file.name,
                    url:''
                }]
                return;
            },
            // 个人提交
            grSubmit(bookstyle) {
                if(bookstyle==2){

                    if(this.listfile.length==0){
                        this.$message.error("请您选择")
                        return
                    }
                    if (this.inputName == "") {
                        this.btnBloon = true;
                        this.$message.error("报名信息联系人不能为空");
                        return;
                    }
                    if (this.inputTel == "") {
                        this.btnBloon = true;
                        this.$message.error("报名信息手机号不能为空");
                        return;
                    }
                    var allNum = this.getAllNum();
                    let param = new FormData();
                    param.append("parkId", sessionStorage.getItem("parkId"));
                    param.append("activityId", this.actData.activityId);
                    param.append("access_token", this.SSH.getItem('token'));
                    param.append("contactName", this.inputName);
                    param.append("contactPhone", this.inputTel);
                    param.append("enterNumber", allNum);
                    param.append("ticketForm", JSON.stringify(this.tableData));
                    param.append("file",this.selcetfile);
                    var url = this.$apiUrl.active.importData;
                    this.$post(url,param).then(response => {
                        if(response.resultCode == "CLT000000000"){
//                            this.$message.success("批量报名")
                            this.$alert("批量报名成功！", '报名提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push("/parkIndex/park/all")
                                }
                            })

                        }else{
                            this.$message.error(response.resultMsg)
                        }
                    },err=>{
                        this.$message.error(err.resultMsg)
                    });
                    return
                }
                var parkId = sessionStorage.getItem("parkId") || "";
                var allNum = this.getAllNum();
                var companyName = ''; // 公司名称
                var contactName = '';  // 联系人
                var contactPhone = '';   // 联系电话
                if (this.enrollType == "1") {
                    var enterForm = this.formRqList;
                    console.log(enterForm);
                    companyName = enterForm[0].tittext;
                    contactName = enterForm[1].tittext;
                    contactPhone = enterForm[2].tittext;
                    if(companyName == "") {
                        this.$message.error("公司名称不能为空")
                        return;
                    }
                    if(contactName == "") {
                        this.$message.error("联系人不能为空")
                        return;
                    }
                    if(contactPhone == "") {
                        this.$message.error("联系电话不能为空")
                        return;
                    }
                    if (allNum == 0) {
                        this.btnBloon = true;
                        this.$message.error(`当前报名人数至少一人`);
                        return;
                    }
                    var isNullVal = false;
                    if(enterForm.length > 3) {
                        for(var i = 0; i < enterForm.length; i++) {
                            if(enterForm[i].requir && enterForm[i].tittext == "") {
                                this.$message.error(enterForm[i].name + "不能为空!");
                                isNullVal = true;
                                break;
                            }
                        }
                    }
                    if(isNullVal) {
                        return;
                    }



                } else {
                    if (!this.btnBloon) {
                        return;
                    }
                    if (allNum == 0) {
                        this.btnBloon = true;
                        this.$message.error(`当前报名人数至少一人`);
                        return;
                    }
                    if (this.inputName == "") {
                        this.btnBloon = true;
                        this.$message.error("报名信息联系人不能为空");
                        return;
                    }
                    if (this.inputTel == "") {
                        this.btnBloon = true;
                        this.$message.error("报名信息手机号不能为空");
                        return;
                    }
                    var enterForm = this.nrollFormList;
                    companyName = '';
                    contactName = this.inputName;
                    contactPhone = this.inputTel;
                    var isNull = this.rulenrollFormList(enterForm);   // 判断报名信息是否填写完整
                    if (isNull) {
                        this.btnBloon = true;
                        this.$message.error("您报名的信息未填写完整，请仔细查看！");
                        return;
                    }
                }
                this.btnBloon = false;
                this.$post(this.$apiUrl.active.addEnterinfo, {
                    parkId: parkId,
                    activityId: this.$route.query.activeId,
                    contactName: contactName,
                    contactPhone: contactPhone,
                    enterType: this.enrollType,
                    companyName: companyName,
                    enterNumber: allNum,
                    enterForm: enterForm,  // 报名表
                    ticketForm: this.tableData,
                    enterNeed_audit: this.radioEnroll
                })
                .then((response) => {
                    this.btnBloon = true;
                    if (response.resultCode == "CLT000000000") {
                        this.enrollFormMask  = true;
                    } else {
                        this.$message.error(response.resultMsg);
                    }

                }).catch((response) => {
                    this.btnBloon = true;
                    this.$message.error(response.resultMsg);
                })
            }
        },
    }
</script>
<style>
    .radio_span .el-radio__input.is-checked .el-radio__inner {
        margin-top: 0;
    }
    .enroll_success .el-dialog {
        width: 480px;
        height: 280px;
        padding: 0 20px;
        border-top: 5px solid #00a0e9;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        overflow: hidden;
    }
    .enroll_succ .el-dialog {
        height: 220px;
    }
    .enroll_succ .el-dialog__title{
        font-size: 24px;
        color: #333;
    }
    .enroll_success .el-dialog__footer {
        text-align: center;
    }
    .enroll_success .dialog-footer span {
        display: inline-block;
        height: 40px;
        line-height:40px;
        text-align: center;
        padding: 0 26px;
        cursor: pointer;
        border: 1px solid #00a0e9;
        color: #00a0e9;
        margin-left: 40px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .enroll_success .dialog-footer span:nth-child(1) {
        background: #00a0e9;
        color: #fff;
        margin-left: 0;
    }
    .enroll_success .el-dialog__headerbtn {
        top: 5px;
        right: 10px;
    }
    .enroll_succ .el-dialog__footer {
        text-align: right;
    }
    .enroll_succ .el-dialog__footer span {
        line-height: 35px;
        height: 35px;
        width: 44px;
        background: #e6f4ff;
        color: #00a0e9;
        border: none;
        background: rgb(21,152,255); /* Old browsers */
        background: -moz-linear-gradient(right, rgba(21,152,255,1) 0%, rgba(54,191,253,1) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(right, rgba(21,152,255,1) 0%,rgba(54,191,253,1) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right , rgba(21,152,255,1) 0%,rgba(54,191,253,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1598ff', endColorstr='#36bffd',GradientType=0 ); /* IE6-9 */
        color: #fff;
        font-size: 18px;
    }
    .enroll_succ .el-dialog__footer span:nth-child(1) {
        background: #e6f4ff;
        color: #00a0e9;
    }
</style>

<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    @com_font_size: 16px;
    @con_bg: #fff;
    .common_titdes {
        font-weight: normal;
    }
    .item_wrap_bor {
        border-bottom: 1px solid #ccc;
    }
    .tablemain {
        overflow: hidden;
        .essp_width_auto();
        background: #fff;
        padding-top: 74px;
        /*padding-bottom: 55px;*/
        .tablemain_item {
            position: relative;
            border: 1px solid #ccc;
            width: 1000px;
            margin: 0 auto;
            .esspborder-radius(5px);
            margin-bottom: 50px;
        }
    }
    //批量报名模块(样式伪造)
    .batchimport{
        .essp_width_auto();
        background: #fff;
        padding-bottom:20px;
        .batchbtn{
            margin-left:100px;
            float: left;
            padding-top: 40px;
            .downloadbtn{
                display: block;
                margin-bottom:20px;
                .down_a {
                    color: #fff;
                }
            }
            .uploadbtn{
                display: block;
                margin-bottom:20px;
                color: #fff;
                &:hover{
                    cursor: pointer;
                }
            }
        }

    }

    .minus, .plus {
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
           text-align: center;
            button {
                float: left;
                min-width: 100px;
            }
            span {
                display:  inline-block;
                width: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                margin-right: 130px;
            }
            .sure_btn {
               background: #00a0e9;
            }
            .cancel_btn {
                background: #999;
                margin-right: 0;
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
        padding: 38px 34px 42px;
        background: #fff;
    }

    .login_con_a {
            margin-top: 10px;
        .esspsc(16px);
        cursor: pointer;
        font-size: 18px;
        width: 180px;
        overflow: hidden;
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
        margin-right: 31px;
        /*border: 1px solid #ccc;*/

        .acttit {
            width: 180px;
            height: 40px;
            background-color: @essp_nav_bg;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin-bottom: 20px;
            font-size: 20px;
            background: rgb(21,152,255); /* Old browsers */
            background: -moz-linear-gradient(right, rgba(21,152,255,1) 0%, rgba(54,191,253,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(right, rgba(21,152,255,1) 0%,rgba(54,191,253,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right , rgba(21,152,255,1) 0%,rgba(54,191,253,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1598ff', endColorstr='#36bffd',GradientType=0 ); /* IE6-9 */
        }
        .actlogo {
            display: block;
            width: 180px;
            height: 180px;
        }
    }

    // 右侧部分
    .actright {
        float: left;
    }

    .enroll_success {

        .icon_div {
            text-align: center;
        }
        .icon_p {
            text-align: center;
            color: #333;
            font-size: 20px;
            padding: 26px 0 0;
            i {
                color: #00a0e9;
                font-size: 28px;
            }
        }
        .icon_p1 {
            position: relative;
            line-height:28px;
            text-align: left;
            padding-top: 0;
            font-size: 20px;
            color: #333;
            padding-left: 40px;
            i {
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .icon-queren {
            font-size: 50px;
            color: #00a0e9;
        }

    }
    .myinput_no input::-webkit-outer-spin-button,
    .myinput_no input::-webkit-inner-spin-button,{
        -webkit-appearance: none;
    }
    .myinput_no input[type="number"] {
        -moz-appearance: textfield;
    }
    .logocon1 {
        width: 420px;
        height: 240px;
        float: left;
        margin-right: 14px;
        cursor: pointer;
        .detaillogo {
            display: block;
            width: 100%;
            height: 100%
        }
    }
    .text_align_c1 {
        position: relative;
        i {
            position: absolute;
            left: 41%;
            top: -28%;
            font-size: 60px;
            color: #00a0e9;
            background: #fff;
        }
    }
    .detailcon {
        float: left;
        width: 485px;
        h2 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 20px;
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
            font-weight:normal;
        }
    }

    .detailcon {
        float: left;
        width: 485px;
        h2 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 20px;
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
            font-weight:normal;
        }
    }

    //标签模块
    .tagcon {
        margin-bottom: 5px;
        padding-left: 22px;
        min-height: 25px;
        span {
            float: left;
            margin-right: 20px;
            margin-bottom: 10px;
            padding: 2px 10px;
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
        i {
            font-size: 12px;
            color: #ff9900;
        }
        >div {
            margin-bottom: 6px;
        }
        .icon-piaozhong {
            font-size: 14px;
        }
        .icon-dizhi {
            font-size: 14px;
        }
        b {
            padding-left: 5px;
        }
        b, em {
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            font-style: normal;

        }
    }

    .infobtn {
        margin-bottom: 20px;
        padding-left: 15px;
        .btnitem {
            float: left;
            width: 125px;
            overflow: hidden;
            padding:0 5px;
            margin-bottom:5px;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #ccc;
            margin-bottom: 5px;
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
    .btns{
        overflow: hidden;
        i{
            float: left;
            position: relative;
            top: 5px;
        }
        b{
            float: left;
        }
        em{
            float: left;
            display: inline-block;
            width: 400px;
        }
    }

</style>
