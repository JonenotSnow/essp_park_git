<template>
    <div id='wrap' class="occupancyApplication">
        <p>
            <span :class="{'differ':isBdPark}">申请表设置</span>
        </p>
        <p style="margin-bottom:8px;">
            <span style="margin-left:4px;">设置企业申请入驻园区时需要填写的申请信息</span>
            <span @click="settingDetail = !settingDetail">
                <i class="el-icon-question"></i>设置说明</span>
        </p>
        <div class="tableContent">
            <ul class="tableTitle">
                <li>名称</li>
                <li>是否必填</li>
                <li>提示信息</li>
                <li>操作</li>
            </ul>
            <ul v-for="(it,i) in displayList.slice(0,6)" :key="i" class="require">
                <li>{{it.name}}</li>
                <li>
                    <el-checkbox v-model="it.requir" :disabled="i<6">必填</el-checkbox>
                </li>
                <li v-if="it.fx" style="color:#999;">系统反显</li>
                <li v-else>
                    <input v-if="it.type == 'text' || it.type == 'textarea'" type="text" :placeholder="`请输入${it.name}`" disabled>
                    <select v-else-if="it.type == 'radioDown'" disabled :placeholder="`请选择${it.name}`">
                    </select>
                    <select v-else-if="it.type == 'checkbox'" :placeholder="`请输入${it.name}`" disabled></select>
                    <el-date-picker class="selectTime" v-else-if="it.type == 'dateTime'" v-model="it.value" type="date" placeholder="选择日期" disabled></el-date-picker>
                </li>
                <li>
                    <i class='el-icon-delete' style="color:#ccc;"></i>
                </li>
            </ul>
            <ul v-if="displayList.length > 6" v-for="(item,index) in displayList.slice(6,displayList.length)" :class="{'downSel':',radio,checkbox,radioDown,checkboxDown,'.indexOf(','+item.type+',')>-1}" class="addItem" :key="index">

                <!-- 申请表第一列 -->
                <li v-if="item.own == 'common' && ',注册资本,实收资本,成立日期,经营范围,企业规模,'.indexOf(','+item.name+',')>-1">
                    {{item.name}}
                </li>
                <!-- 下拉框 -->
                <li v-if="item.own != 'common' && ',radioDown,checkboxDown,'.indexOf(','+item.type+',')>-1" class="downSelClass">
                    <div>
                        <span class="title">
                            <input type="text" style="margin-top: 13px;" v-model="item.name" placeholder="添加单选框标题">
                        </span>
                    </div>
                    <div>
                        <div class="ro_tiem" style="margin-top: 10px;" v-for="(it,index) in item.childrens" :key="index">
                            <i class="tsb"></i>
                            <input type="text" class="orderinput" v-model="it.name" :requir="it.requir" :placeholder="it.placeholder">
                            <i v-if="item.childrens.length>2" class="delitems el-icon-remove" style="position: relative;left: 0px;color: rgb(204, 204, 204);cursor:pointer;" @click="delChidrens(item.childrens,index)"></i>
                        </div>
                        <i class="additems el-icon-circle-plus" style="color:#ccc;cursor:pointer;" @click="addChidrens(item)"></i>
                    </div>
                </li>
                <!-- 单选框 -->
                <li v-else-if="item.own != 'common' && item.type == 'radio'" class="downSelClass" style="padding-top:15px;">
                    <div>
                        <span class="title">
                            <input type="text" style="
                            -top: 13px;" v-model="item.name" placeholder="添加单选框标题">
                        </span>
                    </div>
                    <div>
                        <div class="ro_tiem" style="margin-top: 10px;" v-for="(it,index) in item.childrens" :key="index">
                            <i class="tsb"></i>
                            <input type="text" class="orderinput" v-model="it.name" :requir="it.requir" :placeholder="it.placeholder">
                            <i v-if="item.childrens.length>2" class="delitems el-icon-remove" style="position: relative;left: 0;color: rgb(204, 204, 204);cursor:pointer;" @click="delChidrens(item.childrens,index)"></i>
                        </div>
                        <i class="additems el-icon-circle-plus" style="color:#ccc;cursor:pointer;" @click="addChidrens(item)"></i>
                    </div>
                </li>
                <!-- 复选框 -->
                <li v-else-if="item.own != 'common' && item.type == 'checkbox'" class="downSelClass">
                    <div>
                        <span class="title">
                            <input type="text" style="margin-top: 13px;" v-model="item.name" placeholder="添加单选框标题">
                        </span>
                    </div>
                    <div>
                        <div class="ro_tiem" style="margin-top: 10px;" v-for="(it,index) in item.childrens" :key="index">
                            <i class="tsb"></i>
                            <input type="text" class="orderinput" v-model="it.name" :requir="it.requir" :placeholder="it.placeholder">
                            <i v-if="item.childrens.length>2" class="delitems el-icon-remove" style="position: relative;left: 0;color: rgb(204, 204, 204);cursor:pointer;" @click="delChidrens(item.childrens,index)"></i>
                        </div>
                        <i class="additems el-icon-circle-plus" style="color:#ccc;cursor:pointer;" @click="addChidrens(item)"></i>
                    </div>
                </li>
                <!-- 其他 -->
                <li class="title" v-else-if="item.own != 'common' && ',注册资本,注册资本,成立日期,经营范围,企业规模,'.indexOf(','+item.name+',')<0">
                    <input type="text" v-model="item.name" :placeholder="item.name">
                </li>

                <!-- 申请表第二列 -->
                <li>
                    <el-checkbox v-model="item.requir">必填</el-checkbox>
                </li>

                <!-- 申请表第三列 -->
                <!-- 下拉框 -->
                <li class="title" v-if="',radioDown,checkboxDown,selectTS,'.indexOf(','+item.type+',')>-1">
                    <select :placeholder="`请选择${item.name}`" disabled></select>
                </li>
                <li v-if="item.type == 'radio'">
                    <el-radio-group>
                        <el-radio :label="is.name" disabled v-for="(is,j) in item.childrens.slice(0,2)" :key="j">{{is.name}}</el-radio>
                    </el-radio-group>
                </li>
                <li v-if="item.type == 'checkbox'">
                    <el-checkbox-group>
                        <el-checkbox :label="item.name" disabled v-for="(is,j) in item.childrens.slice(0,2)" :key="j">{{is.name}}</el-checkbox>
                    </el-checkbox-group>
                    <!-- 单行文本 -->
                    <!-- 多行文本 -->
                    <li v-if="item.type == 'text' || item.type == 'textarea'"><input type="text" :value="`请输入${item.name}`" disabled></li>
                    <!-- 日期模版 -->
                    <li v-if="item.type == 'dateTime' || item.type == 'dataTime'">
                        <el-date-picker class="selectTime" type="date" placeholder="选择日期" disabled></el-date-picker>
                    </li>
                    <!-- 数字模版 -->
                    <li v-if="',numberBox,number,'.indexOf(','+item.type+',')>-1"><input type="text" disabled :placeholder='`请输入${item.name}`'></li>
                    <!-- 企业规模 -->
                    <li class="title" v-else-if="item.type == 'selectTS'">
                        <select :placeholder="item.name" disabled>
                            <option :value="is.id" :label="is.name" v-for="(is,j) in item.childrens" :key="j">{{is.name}}</option>
                        </select>
                    </li>
                    <!-- 申请表第四列 -->
                    <li>
                        <i class='el-icon-delete personCursor' @click="getIndex(item,index)"></i>
                    </li>
            </ul>
        </div>
        <div class="selectO">
            <p>新增报名项</p>
            <ul>
                <li v-if="commonList.length>0">
                    <span>常用栏位:</span>
                    <div>
                        <span v-if="it.show" v-for="(it,i) in commonList" @click="getAddCommonOne(it,it.id,it.show)" :key='i'>
                            <i class="el-icon-plus"></i>{{it.name}}</span>
                    </div>
                </li>
                <li>
                    <span>自定义报名项:</span>
                    <div>
                        <span v-for="(it,i) in selfDefined" :key='i' @click="getAddCommonTwo(it)">
                            <i class="el-icon-plus"></i>{{it.btn_name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <p class="scan">
            <span @click="displayY"> 预&nbsp;&nbsp;览</span>
        </p>
        <p class="submit">
            <span @click="submitForm">保&nbsp;&nbsp;&nbsp;&nbsp;存</span>
        </p>
        <!-- 预览申请信息 -->
        <el-dialog :visible.sync="addType" width='1000px' class='scanRequest'>
            <div class="wrap">
                <div class="content">
                    <p>申请入驻园区</p>
                    <div class="detail">
                        <div v-for="(it,i) in displayList" :key="i">
                            <p>
                                <span v-if="it.requir" style="color:#ff9900;">*</span>
                                {{it.name}}
                                <span class="sub" v-if="it.sub">（{{it.sub}}）</span>
                            </p>
                            <p v-if="it.fx"><input type="text" v-model='it.value' :placeholder="`${it.name}（系统反显）`" disabled></p>
                            <p v-if="!it.fx && it.type == 'text'"><input type="text" disabled v-model='it.value' :placeholder="`请输入${it.name}`"></p>
                            <p v-else-if="!it.fx && it.type == 'textarea'">
                                <textarea v-model="it.value" disabled :placeholder="`请输入${it.name}`"></textarea>
                            </p>
                            <p v-if="',radioDown,checkboxDown,selectTS,'.indexOf(','+it.type+',')>-1" class="downSel">
                                <select>
                                    <option :value="it.name" disabled v-for="(is,j) in it.childrens" :key="j">{{is.name}}</option>
                                </select>
                            </p>
                            <p v-else-if="!it.fx && it.type == 'radio'" class="downSel">
                                <el-radio-group>
                                    <el-radio :label="is.name" disabled v-for="(is,j) in it.childrens.slice(0,2)" :key="j">{{is.name}}</el-radio>
                                </el-radio-group>
                            </p>
                            <p v-else-if="!it.fx && it.type == 'checkbox'" class="downSel">
                                <el-checkbox-group>
                                    <el-checkbox :label="is.name" disabled v-for="(is,j) in it.childrens" :key="j">{{is.name}}</el-checkbox>
                                </el-checkbox-group>
                            </p>
                            <p v-else-if="!it.fx && (it.type == 'dateTime' || it.type == 'dataTime')">
                                <span class="sub">{{it.sub}}</span>
                                <el-date-picker class="dataS" v-model="it.value" disabled type="date" :placeholder="`请选择${it.name}`"></el-date-picker>
                            </p>
                            <p v-else-if="!it.fx && it.type == 'numberBox'">
                                <span class="sub">{{it.sub}}</span>
                                <input type="text" v-model='it.value' disabled :placeholder="`请输入${it.name}`">
                            </p>

                        </div>
                        <span>查看企业橱窗</span>
                    </div>
                    <p>
                        <el-button type="primary" @click="addType = false">取消预览</el-button>
                    </p>
                </div>
            </div>
        </el-dialog>
        <!-- 设置说明 -->
        <el-dialog :visible.sync="settingDetail" width="800px" center id="settingDetail">
            <p class="title">
                <i></i>
                申请表设置说明
                <i></i>
            </p>
            <p class="oTitle">
                自定义申请表设置说明
            </p>
            <p class="titleC" style="text-indent:29px;">
                园区管理员可在“
                <span>新增报名项</span>”处，可添加常用栏位如：
                <span>实收资本</span>、
                <span>企业规模</span>、
                <span>成立日期</span>、
                <span>注册资本</span>、
                <span>联系电话</span>、
                <span>联系人姓名</span>等。自定义添加报名表信息项，支持类型包括：
                <span>单行文本框</span>、
                <span>多行文本框</span>、
                <span>单选下拉框</span>、
                <span>单选框</span>、
                <span>复选框</span>、
                <span>多选下拉框</span>、
                <span>日期选择框</span>和
                <span>数值输入框</span>。
            </p>
            <div class="select">
                <p>新增报名项</p>
                <ul>
                    <li v-if="commonList.length>0">
                        <span>常用栏位:</span>
                        <div>
                            <span v-for="(it,i) in commonList" :key='i'>
                                <i class="el-icon-plus"></i>{{it.name}}</span>
                        </div>
                    </li>
                    <li>
                        <span>自定义报名项:</span>
                        <div>
                            <span v-for="(it,i) in selfDefined" :key='i'>
                                <i class="el-icon-plus"></i>{{it.btn_name}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="titleC">添加自定义信息项后后，须对信息项进行编辑。须填写信息项
                <span>公司名称</span>、
                <span>公司地址</span>、
                <span>行业</span>，
                <span>申请说明</span>对申请人进行填写提示。</p>
            <ul class="ulModule">
                <li>
                    <span>名称</span>
                    <span>是否必填</span>
                    <span>提示信息</span>
                    <span>操作</span>
                </li>
                <li v-for="(it,i) in requireList" :key="i">
                    <span style="width:150px;margin:0 auto;text-align:center;">{{it.name}}</span>
                    <span>
                        <el-checkbox v-model="it.requir" :disabled="i<6">必填</el-checkbox>
                    </span>
                    <span v-if="it.fx" style="color:#999;">系统反显</span>
                    <span v-else>
                        <input v-if="it.type == 'text'" v-model="it.name" type="text" :placeholder="`请输入${it.name}`" disabled>
                        <textarea v-else-if="it.type == 'textarea'" v-model="it.name" :placeholder="`请输入${it.name}`" disabled></textarea>
                        <el-radio-group v-model="it.value" v-else-if="it.type == 'radio'">
                            <el-radio :label="is.name" v-for="(is,j) in it.childrens" :key="j">{{is.name}}</el-radio>
                        </el-radio-group>
                        <select v-else-if="it.type == 'checkbox'" v-model="it.name" :placeholder="`请输入${it.name}`" disabled></select>
                        <el-date-picker class="selectTime" v-else-if="it.type == 'dateTime'" v-model="it.value" type="date" placeholder="选择日期" disabled></el-date-picker>
                    </span>
                    <span>
                        <i v-if="i>5" class='el-icon-delete ableRemove'></i>
                        <i v-else class='el-icon-delete'></i>
                    </span>
                </li>
                <li>
                    <span style="width:150px;margin:0 auto;text-align:center;">
                        <input type="text" style="border:1px solid #00a0e9;width:120px;margin:0 auto;" placeholder="请输入多行文本标识" disabled>
                    </span>
                    <span>
                        <el-checkbox disabled>必填</el-checkbox>
                    </span>
                    <span>
                        <input type="text" :placeholder="`请输入提示性内容`" disabled></span>
                    <span>
                        <i class='el-icon-delete' style="color:#333;"></i>
                    </span>
                </li>
            </ul>
            <p class='titleE'>自定义保存成功后，可对自定义申请表进行预览，供企业申请入驻园区时填写该表进行申请。</p>
        </el-dialog>

        <!-- 申请表设置成功弹窗提示 -->
        <el-dialog :visible.sync="confirmSend" width='520px' height='280px' class='confirmRequest'>
            <p>
                <!-- <i class="el-icon-close" @click="confirmSend=false"></i> -->
            </p>
            <p><img src="../../../assets/sendConofirm.jpg" alt=""></p>
            <p>恭喜您的入驻申请表设置成功</p>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            startData: "",
            addType: false,
            settingDetail: false,
            requireList: [
                {
                    name: "公司名称",
                    type: "text", //输入框类型
                    requir: true, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入公司名称",
                    nickName: "company",
                    fx: true
                },
                {
                    name: "行业",
                    type: "text", //输入框类型
                    requir: true, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入行业",
                    nickName: "ind",
                    fx: true
                },
                {
                    name: "公司地址",
                    type: "text", //输入框类型
                    requir: true, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入公司地址",
                    fx: false
                },
                {
                    name: "申请说明",
                    type: "textarea", //输入框类型
                    requir: true, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入申请说明",
                    fx: false
                },
                {
                    name: "联系人姓名",
                    type: "text", //输入框类型
                    requir: true, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入联系人姓名",
                    fx: false
                },
                {
                    name: "联系电话",
                    type: "text", //输入框类型
                    requir: true, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入联系电话",
                    fx: false
                }
            ],
            commonList: [
                {
                    name: "注册资本",
                    type: "number", //输入框类型
                    requir: false, //是否必填
                    sub: "单位：万元", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入注册资本",
                    id: "0",
                    show: true,
                    fx: false,
                    own: "common"
                },
                {
                    name: "成立日期",
                    type: "dateTime", //输入框类型
                    requir: false, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入成立日期",
                    id: "1",
                    show: true,
                    fx: false,
                    own: "common"
                },
                {
                    name: "经营范围",
                    type: "text", //输入框类型
                    requir: false, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入经营范围",
                    id: "4",
                    show: true,
                    fx: false,
                    own: "common"
                },
                {
                    name: "企业规模",
                    type: "selectTS", //输入框类型  //text
                    requir: false, //是否必填
                    sub: "", //备注说明（如单位等）
                    value: [], //绑定值
                    holder: "请输入企业规模",
                    id: "5",
                    show: true,
                    fx: false,
                    own: "common",
                    childrens: [
                        {
                            name: "0-50人",
                            id: "0-50"
                        },
                        {
                            name: "50人-100人",
                            id: "50-100"
                        },
                        {
                            name: "100人-500人",
                            id: "100-500"
                        },
                        {
                            name: "500人-1000人",
                            id: "500-1000"
                        },
                        {
                            name: "1000人-2000人",
                            id: "1000-2000"
                        },
                        {
                            name: "2000人-5000人",
                            id: "2000-5000"
                        },
                        {
                            name: "5000人-10000人",
                            id: "5000-10000"
                        },
                        {
                            name: "10000人以上",
                            id: "10000+"
                        }
                    ]
                },
                {
                    name: "实收资本",
                    type: "text", //输入框类型
                    requir: false, //是否必填
                    sub: "单位：万元", //备注说明（如单位等）
                    value: "", //绑定值
                    holder: "请输入实收资本",
                    id: "6",
                    show: true,
                    fx: false,
                    own: "common"
                }
            ],
            selfDefined: [
                {
                    type: "text",
                    name: "",
                    btn_name: "单行文本",
                    requir: false,
                    tittext: "",
                    fx: false,
                    del: true
                },
                {
                    type: "textarea",
                    name: "",
                    btn_name: "多行文本框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    del: true
                },
                {
                    type: "radioDown",
                    name: "单选下拉框",
                    btn_name: "单选下拉框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    vaule: "",
                    del: true,
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选下拉框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选下拉框选项2"
                        }
                    ]
                },
                {
                    type: "checkboxDown",
                    name: "多选下拉框",
                    btn_name: "多选下拉框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    vaule: [],
                    del: true,
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "多选下拉框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "多选下拉框选项2"
                        }
                    ]
                },
                {
                    type: "radio",
                    name: "单选框",
                    btn_name: "单选框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    vaule: "",
                    del: true,
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选框选项2"
                        }
                    ]
                },
                {
                    type: "checkbox",
                    name: "复选框",
                    btn_name: "复选框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    vaule: [],
                    del: true,
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "复选框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "复选框选项2"
                        }
                    ]
                },
                {
                    type: "dataTime",
                    name: "日期选择框",
                    btn_name: "日期选择框",
                    requir: false,
                    tittext: "",
                    dayDate: new Date(),
                    fx: false,
                    del: true
                },
                {
                    type: "numberBox",
                    name: "数值输入框",
                    btn_name: "数值输入框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    del: true
                }
            ],
            addList: [],
            displayList: [],
            confirmSend: false,
            isBdPark: this.utils.isBdPark() //是否是保定园区
        };
    },
    computed: {},
    created() {
        this.getForm();
    },
    methods: {
        //获取初始模板
        getForm() {
            this.$post(this.$apiUrl.manage.applyParkForm, {
                parkId: window.sessionStorage.getItem("parkId")
            }).then(
                response => {
                    if (response.resultData && response.resultData.entryForm) {
                        if (response.resultData.entryForm.length > 6) {
                            this.displayList = JSON.parse(
                                response.resultData.entryForm
                            );
                            console.log(this.displayList);
                            let dl = this.displayList.length;
                            let cl = this.commonList.length;
                            for (let i = 0; i < dl; i++) {
                                for (let j = 0; j < cl; j++) {
                                    if (
                                        this.displayList[i].name ==
                                        this.commonList[j].name
                                    ) {
                                        this.commonList[j].show = false;
                                    }
                                }
                            }
                        } else {
                            this.displayList = this.requireList;
                        }
                    } else {
                        this.displayList = this.requireList;
                    }
                },
                err => {
                    this.$message({
                        type: "warn",
                        message: response.resultMsg
                    });
                }
            );
        },
        //常用栏位添加
        getAddCommonOne(item, id, show) {
            for (let i = 0; i < this.commonList.length; i++) {
                if (parseInt(this.commonList[i].id) == parseInt(id)) {
                    this.commonList[i].show = false;
                    this.displayList.push(item);
                }
            }
        },
        //自定义报名项添加
        getAddCommonTwo(content) {
            var obj = {};
            if (content.type == "text") {
                obj = {
                    type: "text",
                    name: "单行文本",
                    btn_name: "单行文本",
                    requir: false,
                    tittext: ""
                };
            }
            if (content.type == "textarea") {
                obj = {
                    type: "textarea",
                    name: "多行文本框",
                    btn_name: "多行文本框",
                    requir: false,
                    tittext: ""
                };
            }
            if (content.type == "radio") {
                obj = {
                    type: "radio",
                    name: "单选框",
                    btn_name: "单选框",
                    requir: false,
                    tittext: "",
                    value: "",
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选框选项2"
                        }
                    ]
                };
            }
            if (content.type == "checkbox") {
                obj = {
                    type: "checkbox",
                    name: "复选框",
                    btn_name: "复选框",
                    requir: false,
                    tittext: "",
                    value: [],
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "复选框框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "复选框框选项2"
                        }
                    ]
                };
            }

            if (content.type == "radioDown") {
                obj = {
                    type: "radioDown",
                    name: "单选下拉框",
                    btn_name: "单选下拉框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    vaule: "",
                    del: true,
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选下拉框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "单选下拉框选项2"
                        }
                    ]
                };
            }
            if (content.type == "checkboxDown") {
                obj = {
                    type: "checkboxDown",
                    name: "多选下拉框",
                    btn_name: "多选下拉框",
                    requir: false,
                    tittext: "",
                    fx: false,
                    vaule: [],
                    del: true,
                    childrens: [
                        {
                            name: "",
                            requir: false,
                            placeholder: "多选下拉框选项1"
                        },
                        {
                            name: "",
                            requir: false,
                            placeholder: "多选下拉框选项2"
                        }
                    ]
                };
            }
            if (content.type == "dateTime") {
                obj = {
                    type: "dataTime",
                    name: "日期选择框",
                    btn_name: "日期选择框",
                    requir: false,
                    tittext: "",
                    dayDate: new Date()
                };
            }
            if (content.type == "numberBox") {
                obj = {
                    type: "numberBox",
                    name: "数值输入框",
                    btn_name: "数值输入框",
                    requir: false,
                    tittext: ""
                };
            }
            this.displayList.push(obj);
        },
        //删除已添加的自定义栏位
        getIndex(it, index) {
            //如果该项是常用栏位
            if (it.own && it.own == "common") {
                let dl = this.displayList.length;
                let cl = this.commonList.length;
                for (let i = 0; i < cl; i++) {
                    if (it.id == this.commonList[i].id) {
                        this.commonList[i].show = true;
                        this.displayList.splice(index + 6, 1);
                    }
                }
            } else {
                this.displayList.splice(index + 6, 1);
            }
        },
        addChidrens(item) {
            console.log(item);
            var childrens = item.childrens || [];
            var i = childrens.length + 1;
            var type = item.btn_name;
            var placeholder = type + "选项" + i;
            var opts = {
                name: "",
                requir: false,
                placeholder: placeholder,
                id: i
            };
            childrens.push(opts);
        },
        delChidrens(it, index) {
            if (it.length > 2) {
                it.splice(index, 1);
            } else {
                this.$message({
                    message: "警告哦，至少保留两项",
                    type: "warning"
                });
            }
        },
        displayY() {
            this.addType = true;
        },
        //保存模板
        submitForm() {
            let _this = this;
            this.$post(this.$apiUrl.manage.updatePark, {
                parkId: window.sessionStorage.getItem("parkId"),
                entryForm: this.displayList
            }).then(response => {
                if (
                    response.resultCode == "CLT000000000" ||
                    response.resultCode == "0000000000"
                ) {
                    _this.confirmSend = true;
                }
                setTimeout(() => {
                    _this.confirmSend = false;
                    this.getForm();
                    // this.$router.push("/parkIndex/scanIndex");
                }, 2000);
            });
        }
    }
};
</script>
<style>
#wrap .selectTime {
    width: 243px !important;
}
#wrap .dataS {
    width: 680px !important;
}
#settingDetail .el-dialog--center .el-dialog__body {
    padding: 0 !important;
}
</style>

<style lang='less' scoped>
#wrap {
    background: #ffffff;
    width: 990px;
    margin: 0 auto;
    & > p {
        width: 910px;
        margin: 0 auto;
        padding-top: 25px;
        overflow: hidden;
        &:nth-of-type(1) {
            padding-top: 42px;
            & > span {
                padding-left: 24px;
                font-size: 24px;
                line-height: 30px;
                color: #333333;
                border-left: 10px solid #10b5ff;
                letter-spacing: 4.8px;
                &.differ {
                    font-size: 18px;
                    padding-left: 0;
                    line-height: 30px;
                    color: #333;
                    border-left: 8px solid #10b5ff;
                    text-indent: 22px;
                    letter-spacing: 3.6px;
                    display: block;
                }
            }
        }
        &:nth-of-type(2) {
            & > span {
                font-size: 14px;
                line-height: 30px;
                color: #00a0e9;
                &:nth-of-type(2) {
                    float: right;
                    cursor: pointer;
                }
            }
        }
    }
    .tableTitle {
        background-color: #f5f5f5;
        font-size: 16px;
        color: #333333;
    }
    .tableContent {
        width: 910px;
        margin: 0 auto;
        .require,
        .addItem,
        .tableTitle {
            border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;
            overflow: hidden;
            li {
                min-height: 60px;
                margin-top: 0;
                text-align: center;
                line-height: 60px;
                float: left;
                &:nth-of-type(1) {
                    width: 325px;
                    border-left: none;
                }
                &:nth-of-type(2) {
                    width: 128px;
                }
                &:nth-of-type(3) {
                    width: 325px;
                }
                &:nth-of-type(4) {
                    width: 129px;
                    border-right: 1px solid #ccc;
                }
                & > input[type="text"],
                & > select {
                    outline: none;
                    width: 230px;
                    padding: 0 5px;
                    height: 30px;
                    border: solid 1px #027edc;
                    opacity: 0.4;
                }
                & > textarea {
                    outline: none;
                    width: 230px;
                    min-width: 230px;
                    max-width: 230px;
                    padding: 0 5px;
                    position: relative;
                    top: 10px;
                    min-height: 30px;
                    max-height: 100px;
                    border: solid 1px #027edc;
                    opacity: 0.4;
                }
                & > select {
                    width: 240px;
                }
                &.title {
                    input {
                        width: 150px;
                        text-align: center;
                    }
                }
                .ableRemove {
                    color: #333;
                    cursor: pointer;
                }
                // &:not(:first-child) {
                //     color: #666666;
                //     span {
                //         &:nth-last-of-type(1) {
                //             color: #999;
                //         }
                //     }
                // }
            }
            &:nth-last-of-type(1) {
                border-bottom: 1px solid #ccc;
            }
            .personCursor {
                cursor: pointer;
            }
        }
        &.anAdd {
            border-top: none;
            li {
                span {
                    cursor: pointer;
                }
                &:nth-of-type(1) {
                    border-top: none;
                    background: #fff;
                    color: #666;
                }
            }
        }
        .downSel {
            border-right: 1px solid #ccc;
            li {
                &.downSelClass {
                    overflow: hidden;
                    line-height: 0;
                    width: 325px;
                    & > div {
                        &:nth-of-type(1) {
                            & > span {
                                display: inline-block;
                                text-align: center;

                                & > label > input[type="radio"] {
                                    position: relative;
                                    top: 3px;
                                }
                                & > input[type="text"] {
                                    outline: none;
                                    width: 230px;
                                    padding: 0 5px;
                                    height: 30px;
                                    border: solid 1px #027edc;
                                    opacity: 0.4;
                                }
                                &.title {
                                    input {
                                        width: 150px;
                                        text-align: center;
                                    }
                                }
                            }
                        }
                        &:nth-of-type(2) {
                            position: relative;
                            .ro_tiem {
                                text-indent: -31px;
                                .orderinput {
                                    width: 125px;
                                    height: 28px;
                                    padding: 0 5px;
                                    border: solid 1px #027edc;
                                    opacity: 0.4;
                                }
                                &:nth-last-of-type(1) {
                                    margin-bottom: 10px;
                                }
                                .tsb {
                                    display: inline-block;
                                    width: 10px;
                                    height: 10px;
                                    background: #dedede;
                                    border: 1px solid #acacac;
                                    border-radius: 6px;
                                    margin-left: 33px;
                                    margin-right: 9px;
                                }
                            }
                            & > i {
                                position: absolute;
                                bottom: 2px;
                                left: 252px;
                                font-size: 24px;
                            }
                        }
                    }
                }
                & > input[type="text"],
                & > select {
                    outline: none;
                    width: 230px;
                    padding: 0 5px;
                    height: 30px;
                    border: solid 1px #027edc;
                    opacity: 0.4;
                }
                & > textarea {
                    outline: none;
                    width: 230px;
                    min-width: 230px;
                    max-width: 230px;
                    padding: 0 5px;
                    position: relative;
                    top: 10px;
                    min-height: 30px;
                    max-height: 100px;
                    border: solid 1px #027edc;
                    opacity: 0.4;
                }
                & > select {
                    width: 240px;
                }
                .ableRemove {
                    color: #333;
                    cursor: pointer;
                }
                &.title {
                    input {
                        width: 150px;
                        text-align: center;
                    }
                }
                &:not(:first-child) {
                    color: #666666;
                    span {
                        &:nth-last-of-type(1) {
                            color: #999;
                        }
                    }
                }
            }
        }
    }
    .selectO {
        width: 880px;
        margin: 0 auto;
        background-color: #f5f5f5;
        border: solid 1px #cccccc;
        border-top: none;
        padding: 0 14px;
        & > p {
            padding-top: 16px;
            font-size: 16px;
            line-height: 30px;
            color: #333333;
            text-indent: 10px;
        }
        & > ul {
            padding-bottom: 20px;
            overflow: hidden;
            li {
                float: left;
                overflow: hidden;
                & > span {
                    display: inline-block;
                    width: 90px;
                    font-size: 14px;
                    line-height: 30px;
                    color: #666666;
                    text-align: right;
                    float: left;
                }
                & > div {
                    width: 740px;
                    float: left;
                    span {
                        padding: 2px 5px;
                        margin-bottom: 10px;
                        text-align: center;
                        margin-left: 20px;
                        height: 21px;
                        width: 100px;
                        display: inline-block;
                        line-height: 21px;
                        background-color: #ffffff;
                        color: #999;
                        cursor: pointer;
                        i {
                            font-size: 14px;
                            color: #0066b3;
                            margin-right: 4px;
                        }
                        &:hover {
                            background: #00a0e9;
                            color: #fff;
                            i {
                                color: #fff;
                            }
                        }
                    }
                }
                &:nth-of-type(2) {
                    & > div {
                        span {
                            display: inline-block;
                            min-width: 90px;
                            margin-bottom: 5px;
                        }
                    }
                }
            }
        }
    }
    .scan {
        width: 910px;
        margin: 10px auto 10px;
        position: relative;
        top: -25px;
        span {
            background: #e6f4ff;
            color: #00a0e9;
            font-size: 16x;
            text-align: center;
            display: inline-block;
            width: 100px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
        }
    }
    .submit {
        text-align: center;
        padding-bottom: 60px;
        position: relative;
        top: -10px;
        span {
            text-align: center;
            display: inline-block;
            width: 100px;
            height: 40px;
            background: linear-gradient(#22a2fa 0%, #10b5ff 100%);
            border-radius: 3px;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
        }
    }
}
.scanRequest {
    .wrap {
        width: 1000px;
        margin: 0 auto;
        background: #fff;
        .content {
            width: 680px;
            margin: 0 auto;
            & > p {
                width: 100%;
                text-align: center;
                &:nth-of-type(1) {
                    font-size: 24px;
                    line-height: 90px;
                    color: #333333;
                }
                &:nth-of-type(2) {
                    padding: 60px 0 60px;
                    & > button {
                        &:nth-of-type(2) {
                            margin-left: 129px;
                        }
                    }
                }
            }
            .detail {
                width: 100%;
                position: relative;
                & > div {
                    width: 100%;
                    margin-bottom: 10px;
                    & > p {
                        width: 100%;
                        font-size: 16px;
                        color: #666;
                        &:nth-of-type(1) {
                            line-height: 30px;
                            span {
                                &:nth-of-type(2) {
                                    color: #666;
                                }
                            }
                        }
                        &:nth-of-type(2) {
                            input {
                                width: 670px;
                                height: 35px;
                                padding: 0 5px;
                                background-color: #f6f9fb;
                                border: solid 1px #eaeff2;
                            }
                            textarea {
                                width: 660px;
                                min-width: 660px;
                                padding: 10px;
                                max-width: 660px;
                                line-height: 30px;
                                min-height: 100px;
                                border: solid 1px #eaeff2;
                                background-color: #f6f9fb;
                            }
                            select {
                                width: 680px;
                                height: 35px;
                                padding: 0 5px;
                                background-color: #f6f9fb;
                                border: solid 1px #eaeff2;
                            }
                        }
                    }
                }
                & > span {
                    position: absolute;
                    top: 40px;
                    right: -100px;
                    font-size: 14px;
                    color: #00a0e9;
                    // cursor: pointer;
                }
            }
        }
    }
}
#settingDetail {
    padding-bottom: 30px;
    .title {
        font-size: 24px;
        line-height: 36px;
        margin-bottom: 20px;
        color: #333333;
        text-align: center;
        i {
            display: inline-block;
            width: 80px;
            border: 1px solid #ddd;
            position: relative;
            top: -6px;
        }
    }
    .oTitle {
        font-size: 20px;
        line-height: 30px;
        margin: 42px 0 50px 40px;
        color: #333;
        border-left: 10px solid #10b5ff;
        text-indent: 22px;
    }
    .titleC {
        width: 86%;
        margin: 0 auto;
        font-size: 14px;
        color: #777777;
        span {
            font-weight: normal;
            letter-spacing: 0px;
            color: #00a0e9;
        }
    }
    .select {
        width: 82%;
        margin: 20px auto;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        padding: 6px;
        & > p {
            padding-top: 16px;
            font-size: 16px;
            line-height: 30px;
            color: #333333;
            text-indent: 10px;
        }
        & > ul {
            padding-bottom: 20px;
            overflow: hidden;
            li {
                float: left;
                overflow: hidden;
                & > span {
                    display: inline-block;
                    width: 90px;
                    font-size: 14px;
                    line-height: 30px;
                    color: #666666;
                    text-align: right;
                    float: left;
                }
                & > div {
                    width: 550px;
                    float: left;
                    span {
                        padding: 2px 5px;
                        margin-bottom: 10px;
                        text-align: center;
                        margin-left: 20px;
                        height: 25px;
                        width: 100px;
                        display: inline-block;
                        line-height: 25px;
                        background-color: #ffffff;
                        color: #999;
                        i {
                            font-size: 12px;
                            color: #0066b3;
                        }
                    }
                }
                &:nth-of-type(2) {
                    & > div {
                        span {
                            display: inline-block;
                            min-width: 90px;
                            margin-bottom: 5px;
                        }
                    }
                }
            }
        }
    }
    .ulModule {
        width: 84%;
        padding: 6px;
        margin: 20px auto;
        li {
            min-height: 50px;
            line-height: 50px;
            margin-top: 0;
            border: 1px solid #ccc;
            & > span {
                display: inline-block;
                text-align: center;
                &:nth-of-type(1) {
                    width: 130px;
                }
                &:nth-of-type(2) {
                    width: 150px;
                }
                &:nth-of-type(3) {
                    width: 220px;
                }
                &:nth-of-type(4) {
                    width: 120px;
                }
                // &>label>input[type="radio"]{
                //     position:relative;
                //     top:3px;
                // }
                & > input[type="text"],
                & > select {
                    outline: none;
                    width: 180px;
                    padding: 0 5px;
                    height: 30px;
                    border: solid 1px #027edc;
                    opacity: 0.4;
                }
                & > textarea {
                    outline: none;
                    width: 180px;
                    padding: 0 5px;
                    position: relative;
                    top: 10px;
                    min-height: 30px;
                    max-height: 100px;
                    border: solid 1px #027edc;
                    opacity: 0.4;
                }
                &.title {
                    input {
                        width: 150px;
                        text-align: center;
                    }
                }
                .ableRemove {
                    color: #333;
                    cursor: pointer;
                }
            }
            &:nth-of-type(2n) {
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                border-bottom: none;
                border-top: none;
            }
            &:nth-last-of-type(1) {
                border-bottom: 1px solid #ccc;
            }
            &:nth-of-type(1) {
                background-color: #f5f5f5;
                font-size: 16px;
                color: #333333;
            }
            &:not(:first-child) {
                color: #666666;
                span {
                    &:nth-last-of-type(1) {
                        color: #999;
                    }
                }
            }
        }
    }
    .titleE {
        width: 86%;
        margin: 20px auto;
        font-size: 14px;
        line-height: 16px;
        color: #777777;
        padding-bottom: 50px;
    }
}
.confirmRequest {
    .el-dialog__body {
        padding: 0 !important;
        & > p {
            &:not(:first-child) {
                margin: 0 auto;
                text-align: center;
                font-size: 18px;
                line-height: 72px;
                color: #c7c7c7;
            }
            &:nth-of-type(1) {
                height: 30px;
                margin-top: 30px;
                border-top: 5px solid #00a0e9;
            }
            &:nth-of-type(2) {
                margin-top: 30px;
                margin-bottom: 15px;
            }
            &:nth-of-type(3) {
                font-size: 20px;
                line-height: 30px;
                color: #333333;
                padding-bottom: 86px;
            }
        }
    }
}
</style>
