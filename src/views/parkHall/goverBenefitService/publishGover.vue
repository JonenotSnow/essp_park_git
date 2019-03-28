<template>
    <div class="sponsorcon">
        <!-- 发布惠政模版  -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="titcon">
            <h2 class="tit_tips">发布园区惠政</h2>
        </div>
        <div class="basecon">
            <div class="common_titwrap esspclearfix">
                <div>
                    <h3 class="common_titdes" style="font-weight: normal;">基本信息</h3>
                </div>
            </div>
            <div class="base_tablecon">
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>惠政主题：</span>
                    <el-input class="tdcon_input" v-model="formBaseList.action_theme" placeholder="请输入内容"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>惠政类型：</span>
                    <el-select v-model="formBaseList.classtType" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in classtTypeList"
                            :label="item.name"
                            :value="item.id"
                            :key="index"
                        >
                        </el-option>
                    </el-select>
                </div>
                <ParkUpload :parkUploadData="parkUploadData" @changeImgUrl="showImgUrl"></ParkUpload>
                <!--<div class="tdcon">-->
                <!--<span class="inline_span"><em>*</em>惠政宣传图：</span>-->
                <!--<div class="inline-box">-->
                <!--<el-upload class="avatar-uploader" :action="uploads" :show-file-list="false"-->
                <!--:before-upload="beforeAvatarUpload">-->
                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
                <!--</div>-->
                <!--</div>-->
                <div class="esspclearfix" style="height: 500px;">
                    <span class="inline_span">
                    <em>*</em>惠政内容：</span>
                    <div class="inline-box wrap">
                        <!--<essp-editor :editorCont="this.content" @onEditorChange="onEditorChange"></essp-editor>-->
                        <vue-ueditor v-model="formBaseList.action_content" :ueditorConfig="editorOption"></vue-ueditor>
                    </div>
                </div>

                <div class="tdcon">
                    <span class="inline_span">发布机构 :</span>
                    <el-input class="tdcon_input" disabled v-model="formBaseList.fbjg" placeholder="请输入内容"
                              :readonly="true"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>惠政标签 :</span>
                    <div class="inline_div_tag">
                        <essp-add-tag ref="eat" :showtags="tags" @showTagWin="showTagWin" @delTag="delTag"
                                      @initTag="initTag" :tagprops="tagprops"></essp-add-tag>
                    </div>
                    <essp-tag @showtag="closetag" :centerDialogVisible="visible" :tagprops="tagprops"></essp-tag>
                </div>
                <div class="tdcon">
                    <span class="inline_span">上传附件 :</span>
                    <div class="uploadcon">
                        <el-upload class="upload-demo" action="#" :on-remove="removeList"
                                   :before-upload="beforeAvatarUploadFile"
                                   :file-list="fileList3">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <span>附件只能支持docx、doc、rar、zip、xls、xlsx格式文件</span>
                        </el-upload>
                    </div>
                </div>
                <div class="ticket-td">
                    <span class="inline_span">是否开放线上申请 :</span>
                    <div class="inline_div">
                        <el-radio v-model="formTicketList.t_isOnlineApply" label="1">是</el-radio>
                        <el-radio v-model="formTicketList.t_isOnlineApply" label="0">否</el-radio>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="formTicketList.t_isOnlineApply =='1'">
            <div class="common_titwrap esspclearfix">
                <div>
                    <h3 class="common_titdes" style="font-weight: normal;">报名表设置</h3>
                </div>
            </div>
            <div class="signup_tablecon">
                <div class="tdcon">
                    <!--<el-radio-group v-model="enterType" @change="getBaomingType">-->
                    <!--<el-radio label="0">个人实名分页申报</el-radio>-->
                    <!--<el-radio label="1">公司整体整合申报</el-radio>-->
                    <!--</el-radio-group>-->
                    <el-button type="text" class="tipdetail" @click="setInstruction">
                        <i class="blue el-icon-info">
                            <span class="tipdetail_text">设置说明</span>
                        </i>
                    </el-button>
                </div>
                <div class="tdcon">
                    <div class="forminfos">
                        <div class="fheadcon ">
                            <span class="category">名称</span>
                            <span class="importan">是否必填</span>
                            <span class="tipstext">提示信息</span>
                            <span class="handlecon">操作</span>
                        </div>
                        <!-- 必填项 -->
                        <div class="requiredcon" v-for="item in enterForm.formRqList" :key="item.id">
                            <div class="cistern requir_1 con_name">{{item.name}}</div>
                            <div class="cistern requir_2">
                                <el-checkbox v-model="item.requir" label="1" disabled>必填</el-checkbox>
                            </div>
                            <div class="cistern requir_3">
                                <el-input class="inputcon" v-model="item.tittext" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="cistern requir_4">
                                <el-button class="requreinput" icon="el-icon-delete" disabled></el-button>
                            </div>
                        </div>
                        <!-- 选填区 -->
                        <div class="formTypeList" v-for="(item,index) in enterForm.formTypeList" :key="index">
                            <!-- 单行文本框样式 -->
                            <div class="singleline" v-if="item.type=='text'">
                                <div class="cistern requir_1 con_name">
                                    <el-input class="inputcon" v-model="item.name"
                                              maxlength="6"
                                              :placeholder="'添加'+item.btn_name+'标题'"></el-input>
                                </div>
                                <div class="cistern requir_2">
                                    <el-checkbox v-model="item.requir">必填</el-checkbox>
                                </div>
                                <div class="cistern requir_3">
                                    <el-input class="inputcon" v-model="item.tittext" placeholder="请输入内容"></el-input>
                                </div>
                                <div class="cistern requir_4">
                                    <i class="handle_delicon el-icon-delete " @click="delTableItems(index,item)"></i>
                                </div>
                            </div>
                            <!-- 多行文本框 -->
                            <div class="multiline" v-if="item.type=='textarea'">
                                <div class="cistern requir_1 con_name">
                                    <el-input class="inputcon" v-model="item.name"
                                              maxlength="6"
                                              :placeholder="'添加'+item.btn_name+'标题'">
                                    </el-input>
                                </div>
                                <div class="cistern requir_2">
                                    <el-checkbox v-model="item.requir">必填</el-checkbox>
                                </div>
                                <div class="cistern requir_3">
                                    <el-input class="inputcon" v-model="item.tittext" placeholder="请输入内容"></el-input>
                                </div>
                                <div class="cistern requir_4">
                                    <i class="handle_delicon el-icon-delete" @click="delTableItems(index,item)"></i>
                                </div>
                            </div>
                            <!-- 单选框 -->
                            <div class="radiobuttonCon" v-if="item.type=='radio'">
                                <div class="main_con">
                                    <div class="cistern requir_1 con_name">
                                        <el-input class="inputcon" v-model="item.name"
                                                  maxlength="6"
                                                  :placeholder="'添加'+item.btn_name+'标题'"></el-input>
                                    </div>
                                    <div class="cistern requir_2">
                                        <el-checkbox v-model="item.requir">必填</el-checkbox>
                                    </div>
                                    <div class="cistern requir_3">
                                        <el-input class="inputcon" v-model="item.tittext"
                                                  placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="cistern requir_4">
                                        <i class="handle_delicon el-icon-delete" @click="delTableItems(index,item)"></i>
                                    </div>
                                </div>
                                <div class="padding_con">
                                    <!-- {{item.childrens}} -->
                                    <div class="ro_tiem" v-for="(it,index) in item.childrens" :key="index">
                                        <i class="el-icon-news"></i>
                                        <el-input class="orderinput" v-model="it.name" :requir="it.requir"
                                                  :placeholder="it.placeholder"></el-input>
                                        <i v-if="item.childrens.length>2" class="delitems el-icon-remove"
                                           @click="delChidrens(item.childrens,index)"></i>
                                    </div>
                                    <i class="additems el-icon-circle-plus" @click="addChidrens(item)"></i>

                                </div>
                            </div>
                            <!-- 多选框 -->
                            <div class="multibuttonCon" v-if="item.type=='checkbox'">
                                <div class="main_con">
                                    <div class="cistern requir_1 con_name">
                                        <el-input class="inputcon" v-model="item.name"
                                                  maxlength="6"
                                                  :placeholder="'添加'+item.btn_name+'标题'"></el-input>
                                    </div>
                                    <div class="cistern requir_2">
                                        <el-checkbox v-model="item.requir">必填</el-checkbox>
                                    </div>
                                    <div class="cistern requir_3">
                                        <el-input class="inputcon" v-model="item.tittext"
                                                  placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="cistern requir_4">
                                        <i class="handle_delicon el-icon-delete" @click="delTableItems(index,item)"></i>
                                    </div>
                                </div>
                                <div class="padding_con">
                                    <!-- {{item.childrens}} -->
                                    <div class="ro_tiem" v-for="(it,index) in item.childrens" :key="index">
                                        <i class="el-icon-news"></i>
                                        <el-input class="orderinput" v-model="it.name" :requir="it.requir"
                                                  :placeholder="it.placeholder"></el-input>
                                        <i v-if="item.childrens.length>2" class="delitems el-icon-remove"
                                           @click="delChidrens(item.childrens,index)"></i>
                                    </div>
                                    <i class="additems el-icon-circle-plus" @click="addChidrens(item)"></i>

                                </div>
                            </div>
                            <!-- 日期模版 -->
                            <div class="singleline" v-if="item.type=='dataTime'">
                                <div class="cistern requir_1 con_name">
                                    <el-input class="inputcon" v-model="item.name"
                                              maxlength="6"
                                              :placeholder="'添加'+item.btn_name+'标题'"></el-input>
                                </div>
                                <div class="cistern requir_2">
                                    <el-checkbox v-model="item.requir">必填</el-checkbox>
                                </div>
                                <div class="cistern requir_3">
                                    <el-input class="inputcon" v-model="item.tittext" placeholder="请输入内容"></el-input>
                                </div>
                                <div class="cistern requir_4">
                                    <i class="handle_delicon el-icon-delete" @click="delTableItems(index,item)"></i>
                                </div>
                            </div>
                            <!-- 数字模版 -->
                            <div class="singleline" v-if="item.type=='numberBox'">
                                <div class="cistern requir_1 con_name">
                                    <el-input class="inputcon" v-model="item.name"
                                              maxlength="6"
                                              :placeholder="'添加'+item.btn_name+'标题'"></el-input>
                                </div>
                                <div class="cistern requir_2">
                                    <el-checkbox v-model="item.requir">必填</el-checkbox>
                                </div>
                                <div class="cistern requir_3">
                                    <el-input class="inputcon" v-model="item.tittext" placeholder="请输入内容"></el-input>
                                </div>
                                <div class="cistern requir_4">
                                    <i class="handle_delicon el-icon-delete" @click="delTableItems(index,item)"></i>
                                </div>
                            </div>
                        </div>
                        <div class="extendtagcon">
                            <div class="extendtit">新增报名项</div>
                            <div class="extenditme">
                                <span class="inline_span">常用栏位 :</span>
                                <el-tag size="medium" v-for="(item,index) in commonItems" :key="index"
                                        @click.native="addTableItems(item)" class="tagitem">
                                    <i class="eleicon el-icon-circle-plus-outline"></i>{{item.btn_name}}
                                </el-tag>
                            </div>
                            <div class="extenditme">
                                <span class="inline_span">自定义报名项 :</span>
                                <el-tag size="medium" v-for="(item,index) in commonTag" :type="item.type" :key="index"
                                        class="tagitem" @click.native="addTableItems(item)">
                                    <i class="eleicon el-icon-circle-plus-outline"></i>
                                    {{item.btn_name}}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                    <div class="look">
                        <el-button type="primary" @click="lookformTypeList">预&nbsp;&nbsp;&nbsp;&nbsp;览</el-button>
                    </div>

                </div>
            </div>

        </div>
        <div class="123">
            <!-- <div> -->
            <div class="common_titwrap esspclearfix" v-show="formTicketList.t_isOnlineApply =='1'">
                <div>
                    <h3 class="common_titdes" style="font-weight: normal;">其他设置</h3>
                </div>
            </div>
            <div class="ticket_extend" v-show="formTicketList.t_isOnlineApply =='1'">
                <div class="ticket-td">
                    <span class="inline_span"><em>*</em>有效期 :</span>
                    <el-date-picker
                        v-model="formTicketList.t_validateDate"
                        class="inline-picker"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="ticket-td">
                    <span class="inline_span">特别提醒对象 :</span>
                    <span class="nametix">{{formTicketList.t_invitings}}</span>
                    <i class="el-icon-circle-plus addicon" @click="showContactbBook"></i>
                </div>

                <div class="ticket-td">
                    <span class="inline_span"><em>*</em>申请人数上限 :</span>
                    <el-input type="number" placeholder="请输入申请人数上限" v-model="formTicketList.t_upperlimit"
                              style="float: left;width: 304px;">
                    </el-input>
                </div>
            </div>
            <div class="final_tablecon" v-show="formTicketList.t_isOnlineApply =='1'">
                <div class="tditem">
                    <span class="inline_span">申报是否需审核 :</span>
                    <div class="inline_div">
                        <el-radio v-model="formTicketList.t_intercheck" label="1">是</el-radio>
                        <el-radio v-model="formTicketList.t_intercheck" label="0">否</el-radio>
                        <div class="tips_div" style="margin-right:78px;">提示：选择需要审核，惠政申报时则自动转入当前园区管理员进行审核！</div>
                    </div>
                </div>
            </div>
            <div class="final_tablecon" v-show="formTicketList.t_isOnlineApply =='0' && !LoginUserRol.includes('34')">
                <div class="tditem">
                    <span class="inline_span">是否高级管理员审核：</span>
                    <div class="inline_div">
                        <el-radio v-model="formTicketList.isReview" label="1">是</el-radio>
                        <el-radio v-model="formTicketList.isReview" label="0">否</el-radio>
                        <div class="tips_div">提示：选择需要审核，惠政发布时则自动转入当前园区高级管理员进行审核！</div>
                    </div>
                </div>
            </div>
            <div class="final_tablecon" v-show="formTicketList.t_isOnlineApply =='1' && !LoginUserRol.includes('34')">
                <div class="tditem">
                    <span class="inline_span">是否高级管理员审核 :</span>
                    <div class="inline_div">
                        <el-radio v-model="formTicketList.isReview" label="1">是</el-radio>
                        <el-radio v-model="formTicketList.isReview" label="0">否</el-radio>
                        <div class="tips_div">提示：选择需要审核，惠政发布时则自动转入当前园区高级管理员进行审核！</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="toolcon">
            <el-button type="primary" size="small" @click="gotoBox()">暂&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
            <el-button type="primary" size="small" @click="lookfinalData()">创&nbsp;&nbsp;&nbsp;&nbsp;建</el-button>
        </div>

        <el-dialog title="惠政预览（仅提供预览功能）" :visible.sync="previewbox">
            <el-form :model="enterForm">
                <el-form-item v-for="item in enterForm.formRqList" :key="item.id"
                              :label="item.requir?'*'+item.name:item.name" :label-width="formLabelWidth">
                    <el-input v-model="item.tittext" auto-complete="off" class="cpm" disabled></el-input>
                </el-form-item>
                <el-form-item v-for="(item,index) in enterForm.formTypeList" :key="index"
                              :label="item.requir?'*'+item.name:item.name" :label-width="formLabelWidth">
                    <el-input disabled v-if="item.type=='text'" v-model="item.tittext" auto-complete="off"
                              class="cpm"></el-input>
                    <el-date-picker v-if="item.type=='dataTime'" v-model="item.dayDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                    <el-input disabled v-if="item.type=='numberBox'" v-model="item.tittext" type="number"
                              auto-complete="off"
                              class="cpm"></el-input>
                    <el-input v-if="item.type=='textarea'" class="cpm" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                    </el-input>
                    <el-select disabled v-if="item.type=='radio'" v-model="p1" placeholder="请选择">
                        <el-option v-for="it in item.childrens" :key="it.placeholder" :label="it.name"
                                   :value="it.placeholder">
                        </el-option>
                    </el-select>
                    <el-select disabled v-if="item.type=='checkbox'" v-model="p2" multiple collapse-tags
                               placeholder="请选择">
                        <el-option v-for="it in item.childrens" :key="it.placeholder" :label="it.name"
                                   :value="it.placeholder"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="previewbox = false">取 消</el-button>
                <el-button type="primary" @click="previewbox = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="特别提醒对象" :visible.sync="contactbook" style="padding:5px">
            <el-transfer @change="handleChangeMoveKye" :titles="listname" v-model="formTicketList.t_concatvalue"
                         :data="databox"></el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="contactbook=false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import EsspTag from "@/components/EsspTag";
    import EsspAddTag from "@/components/EsspAddTag";
    import ParkUpload from "@/views/parkHall/parkUpload";
    import EsspEditor from "@/components/EsspEditor";
    import Moment from "moment";

    export default {
        name: "",
        data() {
            return {
                parkUploadData: {
                    title: '惠政主图：',
                    src: '',
                    isPic: '（该图片以惠政主图进行展示,每张最大2M，图片宽高比为7：4，建议分辨率建议为840*480，支持jpg/jpeg/gif/png格式。）',
                    imgItemType: 'gover'
                },
                databox: [],
                msg: "发布惠政",
                uploads: "",
                p1: "",
                p2: "",
                pick1: "",
                pick2: "",
                listname: ['园区企业', '已选企业'],
                fileList3: [],
                breadlist: [
                    {
                        path: "/parkIndex/goverBene/release",
                        name: "园区惠政"
                    },
                    {
                        path: "",
                        name: "发布园区惠政"
                    }
                ],
                content: "",//惠政详情
                // 编辑器配置
                editorOption: {
                    // initialFrameWidth:900,
                    initialFrameHeight: 340,
                    UEDITOR_HOME_URL: '/essp_park/static/UEditor/',     // 线上路径
//                     UEDITOR_HOME_URL: '/static/UEditor/',               // 本地测试
                },
                demoTags: [],

                //惠政类型选项
                classtTypeList: [
                    {id: '1', name: "科教文卫"},
                    {id: '2', name: "监管监督"},
                    {id: '3', name: "产业支持"},
                    {id: '4', name: "民政事务"},
                    {id: '5', name: "政务政策"},
                    {id: '6', name: "基建生产"},
                    {id: '7', name: "民族宗教"},
                    {id: '8', name: "对外事务"},
                    {id: '9', name: "财政金融"},
                    {id: '10', name: "司法安全"},
                ],

                action_isFree_items: [
                    {
                        id: true,
                        name: "免费"
                    },
                    {
                        id: false,
                        name: "收费"
                    }
                ],
                action_isNeedcheck: "", //选中审核结果
                action_isNeedcheck_items: [
                    {
                        id: true,
                        // name: "不用审核"
                        name: "否"
                    },
                    {
                        id: false,
                        // name: "需要审核"
                        name: "是"
                    }
                ],

                //海报上传
                imageUrl: "",
                rmdtagnum: "8",
                dialogImageUrl: "",
                dialogVisible: false,
                fileList: [],
                //报名表类别
                sheet_type: "个人",
                //必填项
                commonItems: [
                    {
                        type: "text",
                        name: "职业",
                        btn_name: "职业",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "text",
                        name: "年龄",
                        btn_name: "年龄",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "text",
                        name: "部门",
                        btn_name: "部门",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "text",
                        name: "邮箱",
                        btn_name: "邮箱",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "text",
                        name: "附件",
                        btn_name: "附件",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "text",
                        name: "毕业学校",
                        btn_name: "毕业学校",
                        requir: false,
                        tittext: ""
                    }
                ],
                commonTag: [
                    {
                        type: "text",
                        name: "",
                        btn_name: "单行文本",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "textarea",
                        name: "",
                        btn_name: "多行文本框",
                        requir: false,
                        tittext: "",
                        childrens: []
                    },
                    {
                        type: "radio",
                        name: "",
                        btn_name: "单选下拉框",
                        requir: false,
                        tittext: "",
                        childrens: []
                    },
                    {
                        type: "checkbox",
                        name: "",
                        btn_name: "多选下拉框",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "dataTime",
                        name: "",
                        btn_name: "日期选择框",
                        requir: false,
                        tittext: ""
                    },
                    {
                        type: "numberBox",
                        name: "",
                        btn_name: "数值输入框",
                        requir: false,
                        tittext: ""
                    }
                ],
                formTableData: [
                    {
                        ticketType: "免费票",
                        ticketPirce: "10.00",
                        ticketNum: 23
                    },
                    {
                        ticketType: "VIP票",
                        ticketPirce: "14.00",
                        ticketNum: 45
                    }
                ],
                //基本信息表
                formBaseList: {
                    action_theme: "",   //惠政主题
                    fbjg: "",
                    classtType: "",    //惠政类型
                    action_start_time: "", //活动报名开始时间
                    // action_end_time: "", //活动报名截止时间
                    action_totaldays: 30, //活动天数
                    action_addr: "", //活动地点
                    action_isFree: "", //选中活动是否收费
                    action_chargedes_area: "", //收费说明
                    action_cn: "", //发起单位
                    action_issue: "", //发布方
                    action_content: "" //活动详情页
                },
                //其他设置，增加票种后面的数据
                formTicketList: {
                    t_range: "", //活动范围
                    t_upperlimit: "", //人数上限
                    t_begintime: "", //报名开始时间
                    t_endtime: "", //报名截止时间
                    t_concatvalue: [], //邀请的对像
                    t_intercheck: "1", //是否需要内部审核
                    t_notes: "", //活动备注
                    t_isOnlineApply: "1", //是否开放网上申请
                    t_validateDate: "", //有效期
                    t_invitings: '',  //  邀请对象 - 企业id
                    isReview: '0' //是否高级审核  默认不需要
                },
                formTypeList: [], // 表单类型数组
                formRqList: [
                    {
                        id: "re_1",
                        name: "公司名称",
                        requir: true,
                        type: 'text',
                        tittext: ""
                    },
                    {
                        id: "re_2",
                        name: "名字",
                        requir: true,
                        type: 'text',
                        tittext: ""
                    },
                    {
                        id: "re_3",
                        name: "手机号",
                        requir: true,
                        type: 'number',
                        tittext: ""
                    }
                ],
                //设置表数据总和
                settingList: {
                    formRqList: [],
                    formTypeList: [],
                    formTicketList: {},
                    formTableData: []
                },
                //添加标签
                previewbox: false, //预览的框
                contactbook: false, //邀请人穿梭框
                formLabelWidth: "120px",
                tags: [], //标签
                visible: false,
                tagprops: {
                    lblTpCd: "3000004",
                    entId: ""
                },
                enterType: "1", //申报类型
                enterForm: {
                    formRqList: [],
                    formTypeList: []
                },
                vaildateDateTime: "",
                enrolTopNum: "",
                LoginUserRol: this.SSH.getItem("LoginUserRol").toString()
            };
        },
        components: {
            EsspBreadCrumb,
            EsspEditor,
            EsspTag,
            ParkUpload,
            EsspAddTag
        },
        created() {
            this.uploads = this.$apiUrl.upload.upload;
            // this.getTagList();
            // 判断是否编辑
            this.getGoverBenneDetail();

            this.objListName();             // 邀请对象
            this.getBaomingType("1");       //设置默认报名表样式
            if (this.SSH) {
                this.formBaseList.fbjg = this.SSH.getItem("userInfo").cstNm;
            }
        },
        methods: {
            // 编辑器的值获取
            onEditorChange(val) {
                this.content = val;
            },
            // 改变图片路径
            showImgUrl(url) {
                this.imageUrl = url;
                this.parkUploadData.src = url
            },
            // handleAvatarSuccess(res, file) {
            //     this.imageUrl = URL.createObjectURL(file.raw);
            // },
            getContent: function (text) {
                // this.fformBaseList.action_content = text;
                this.formBaseList.action_content = text;
            },
            removeList(file, fileList) {
                this.fileList3 = fileList;
            },
            handleChangeMoveKye(value, direction, movedKeys) {
                var name = [];
                this.formTicketList.t_concatvalue.forEach((item, index) => {
                    this.databox.forEach((itemChild, indexChild) => {
                        if (item == itemChild.key) {
                            name.push(itemChild.cstNm);
                        }
                    })
                });
                this.formTicketList.t_invitings = name.join(",");

            },
            handleSuccess(file, fileList) {
                this.$message({
                    title: "提示",
                    message: "上传成功",
                    type: "success"
                });
            },
            handleFall(res, file) {
                this.$message({
                    title: "提示",
                    message: "上传失败",
                    type: "error"
                });
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png";
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
                    return isJPG;
                }
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过 5MB!");
                    return isLt2M;
                }
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "hz"); // 通过append向form对象添加数据

                this.$post(this.$apiUrl.upload.upload, param).then(response => {
                    this.imageUrl = response.resultData[0].url;
                });
                return false; // 返回false不会自动上传
            },
            beforeAvatarUploadFile(file) {
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据

                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "fj"); // 通过append向form对象添加数据
                var flieName = file.name;
                var fileType = flieName.substring(flieName.lastIndexOf(".") + 1).toLowerCase();
                const isFile = fileType === "docx" || fileType === "doc" || fileType === "rar" || fileType === "zip" || fileType === "xls" || fileType === "xlsx";
                const isLt30M = file.size / 1024 / 1024 < 30;

                if (!isFile) {
                    this.$message.error('上传附件只能上传docx、doc、rar、zip、xls、xlsx格式文件');
                    return isFile;
                }

                if (!isLt30M) {
                    this.$message.error("附件总共不能超过30MB!");
                    return isLt30M;
                }
                this.$post(this.$apiUrl.upload.upload, param).then(response => {
                    var obj = {
                        name: file.name,
                        url: response.resultData[0].url
                    };
                    this.fileList3.push(obj);
                });
                return false; // 返回false不会自动上传
            },
            handleRemove(file, fileList) {
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //表头样式封装
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return "background:#f5f5f5;";
                }
            },

            //父级接收子集的数据
            addTags({name}) {
                this.demoTags = name;
            },
            //删除标签
            handleClose(tag) {
                this.demoTags.splice(this.demoTags.indexOf(tag), 1);
            },
            addTableItems(item) {
                if (item.type == "text") {
                    var obj = {
                        type: "text",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: ""
                    };
                }
                if (item.type == "textarea") {
                    var obj = {
                        type: "textarea",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: ""
                    };
                }
                if (item.type == "radio") {
                    var obj = {
                        type: "radio",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: "",
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
                if (item.type == "checkbox") {
                    var obj = {
                        type: "checkbox",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: "",
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
                if (item.type == "dataTime") {
                    var obj = {
                        type: "dataTime",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: "",
                        dayDate: new Date()
                    };
                }
                if (item.type == "numberBox") {
                    var obj = {
                        type: "numberBox",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: ""
                    };
                }
                this.enterForm.formTypeList.push(obj);
                this.commonItems.splice(this.commonItems.indexOf(item), 1);
            },
            delTableItems(index, item) {
                this.enterForm.formTypeList.splice(index, 1);
                this.commonItems.push(item);
            },
            lookformTypeList() {
                this.previewbox = true;
            },
            // 请求标签接口
            getTagList() {
                this.$post(this.$apiUrl.common.tag, {
                    rmdtagnum: this.rmdtagnum
                }).then(response => {
                    this.demoTags = response.resultData.recommendTags;
                });
            },
            gotoBox() {
                var type = 0;
                var msg = "<p><i class='icon iconfont icon-queren' style='font-size: 45px;color: #00a0e9;'></i></p><p style='padding: 25px 0 30px;'>您发布的惠政已保存至草稿箱</p>";
                var url = "/parkIndex/goverBene/release?type=1";
                let maskConfig = {
                    confirmButtonText: "返回草稿箱查看",
                    center: true,
                    showCancelButton: false,
                    dangerouslyUseHTMLString: true
                };
                if (!this.checkInfo()) {
                    return false
                }
                var tagIds = this.demoTags.join(',');
                var avaliableTime = '';
                var avaliableEndTime = '';
                var applyMaximum = '';
                var applyForm = {"formRqList": [], "formTypeList": []}
                var isNeedApprove = '';
                var t_isOnlineApply = this.formTicketList.t_isOnlineApply;

                this.$post(this.$apiUrl.goverBene.savePolicy, {
                    parkId: sessionStorage.getItem("parkId") || "",
                    policyTitle: this.formBaseList.action_theme,
                    classtType: this.formBaseList.classtType,
                    titleImg: this.imageUrl,
                    // infoDetail: this.content ? this.content.replace(/\s/g, "&nbsp") : "",
                    infoDetail: this.formBaseList.action_content,
                    pubCstName: this.formBaseList.fbjg,
                    tags: this.tags.join(","),
                    id: this.$route.query.draftId,
                    fileUrl: this.fileList3,
                    saveType: type === 1 ? 1 : 0, // 1,保存 0.暂存
                    isonlineApply: t_isOnlineApply, // 1. 开发  0.不开放
                    avaliableTime: avaliableTime,
                    isNeedApprove: isNeedApprove,
                    avaliableEndTime: avaliableEndTime,
                    applyMaximum: applyMaximum,
                    reminder: this.formTicketList.t_concatvalue.join(","),

                    isReview: this.formTicketList.isReview,
//                        invitings:this.formTicketList.t_concatvalue.join(","),
                    applyType: this.enterType, // 0. 个人  1.公司
                    applyForm: applyForm, // 需要时开放JSON.stringify(this.formRqList)
                    approveComment: this.formTicketList.t_notes  // 备注

                }).then(response => {
                    // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    this.$confirm(
                        msg,
                        maskConfig
                    ).then(() => {
                        this.$router.push(url);
                    })

                    // } else {
                    //     this.$message.error(response.resultMsg);
                    // }
                });

            },
            checkInfo() {
                var t_isOnlineApply = this.formTicketList.t_isOnlineApply;

                if (this.formBaseList.action_theme == "") {
                    this.$message.error("惠政主题不能为空");
                    return false;
                }
                if (this.formBaseList.action_theme.length > 40) {
                    this.$message.error("惠政主题长度不能大于40个字");
                    return false;
                }
                if (this.imageUrl == "") {
                    this.$message.error("惠政宣传图不能为空");
                    return false;
                }
                if (this.formBaseList.action_content == "") {
                    this.$message.error("惠政内容不能为空");
                    return false;
                }
                if(this.tags.length == 0) {
                    this.$message.error("标签必填！");
                    return;
                }
                if (t_isOnlineApply == "1") {
                    if (this.formTicketList.t_validateDate[0] == "" || this.formTicketList.t_validateDate[1] == "") {
                        this.$message.error("有效时间不能为空");
                        return false;
                    }
                    var upperLimit = this.formTicketList.t_upperlimit || 0;
                    if (upperLimit <= 0) {
                        this.$message.error("报名上限不能小于0");
                        this.formTicketList.t_upperlimit = '';
                        return false;
                    }
                }
                return true

            },
            // 保持发布
            lookfinalData(type) {
                if (!this.checkInfo()) {
                    return false
                }
                var type = 1;
                var msg = "您是否发布惠政？";
                var url = "/parkIndex/goverBene/release?type=0";
                var maskConfig = {
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    center: true,
                };
                var tagIds = this.demoTags.join(',');
                var t_isOnlineApply = this.formTicketList.t_isOnlineApply;

                this.$confirm(
                    msg,
                    maskConfig
                ).then(() => {
                    // if (!this.checkInfo()) {
                    //     return false
                    // }

                    var avaliableTime = t_isOnlineApply == "1" ? this.formTicketList.t_validateDate[0] : '';
                    var avaliableEndTime = t_isOnlineApply == "1" ? this.formTicketList.t_validateDate[1] : '';
                    var applyMaximum = t_isOnlineApply == "1" ? this.formTicketList.t_upperlimit : '';
                    var applyForm = t_isOnlineApply == "1" ? this.enterForm : {"formRqList": [], "formTypeList": []}
                    var isNeedApprove = t_isOnlineApply == "1" ? this.formTicketList.t_intercheck : '';
                    this.$post(this.$apiUrl.goverBene.savePolicy, {
                        parkId: sessionStorage.getItem("parkId") || "",
                        policyTitle: this.formBaseList.action_theme,
                        classtType: this.formBaseList.classtType,
                        titleImg: this.imageUrl,
                        infoDetail: this.formBaseList.action_content,
                        pubCstName: this.formBaseList.fbjg,
                        tags: this.tags.join(","),
                        id: this.$route.query.draftId,
                        fileUrl: this.fileList3,
                        saveType: type === 1 ? 1 : 0, // 1,保存 0.暂存
                        isonlineApply: t_isOnlineApply, // 1. 开发  0.不开放
                        avaliableTime: avaliableTime,
                        isNeedApprove: isNeedApprove,
                        avaliableEndTime: avaliableEndTime,
                        applyMaximum: applyMaximum,
                        reminder: this.formTicketList.t_concatvalue.join(","),
                        isReview: this.formTicketList.isReview,
//                        invitings:this.formTicketList.t_concatvalue.join(","),
                        applyType: this.enterType, // 0. 个人  1.公司
                        applyForm: applyForm, // 需要时开放JSON.stringify(this.formRqList)
                        approveComment: this.formTicketList.t_notes  // 备注

                    }).then(response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.$router.push(url);
                        // } else {
                        //     this.$message.error(response.resultMsg);
                        // }
                    });

                })

            },
            showContactbBook() {
                this.contactbook = true;
            },
            objListName() {
                this.$post("/activity/getInvitingCst", {
                    parkId: sessionStorage.getItem("parkId")
                }).then(response => {
                    var arr = response.resultData;
                    arr.forEach((item, index) => {
                        if (item.cstId || item.cstNm) {
                            item.key = item.cstId;
                            item.label = item.cstNm;
                            this.databox.push(item);
                        }
                    })

                })
            },

            addChidrens(item) {
                var childrens = item.childrens || [];
                var i = childrens.length + 1;
                var type = item.btn_name;
                var placeholder = type + "选项" + i;
                var opts = {
                    name: "",
                    requir: false,
                    placeholder: placeholder
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
            //添加票种
            addTicketItems() {
                var pop = {
                    ticketType: "",
                    ticketPirce: "",
                    ticketNum: ""
                };
                this.formTableData.push(pop);
            },
            //删除票种
            delTicketItems(scope) {
                this.formTableData.splice(scope.$index, 1);
            },
            fn(val) {
            },
            closetag({viewtags}) {
                this.visible = false;
                this.tags = viewtags;
            },
            showTagWin() {
                this.visible = true;
            },
            delTag(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            initTag(tmpTags) {
                this.tags = tmpTags;
            },
            getGoverBenneDetail() {
                var draftid = this.$route.query.draftId;
                if (draftid) {
                    this.tagprops.entId =
                        window.sessionStorage.getItem("parkId") + "_" + draftid; //获取标签

                    this.$post(this.$apiUrl.goverBene.getPolById, {id: draftid}).then(
                        response => {
                            // var codestatus = response.resultCode;
                            // if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                            let data = response.resultData;
                            this.formBaseList.action_theme = data.policyTitle;
                            this.formBaseList.classtType = data.classtType;
                            this.parkUploadData.src = data.titleImg;
                            this.imageUrl = data.titleImg;
                            // this.content = data.infoDetail;
                            this.formBaseList.action_content = data.infoDetail;

                            var fileList = JSON.parse(data.fileUrl);

                            fileList.forEach((item, index) => {
                                var obj = {
                                    name: item.name,
                                    url: item.url
                                };
                                this.fileList3.push(obj);
                            });

//                                this.parkUploadData.src =  data.activityPhoto;
                            this.formBaseList.fbjg = data.cstNm;
                            if (data.tagsTxt) {
                                this.tags = data.tagsTxt.split(",") || "";
                            }


                            // applyMaximum
                            this.formTicketList.t_upperlimit = data.applyMaximum;
                            this.formTicketList.t_intercheck = data.applyType
                            this.formTicketList.t_isOnlineApply = data.isonlineApply;
                            this.formTicketList.t_notes = data.approveComment;
                            this.formTicketList.t_validateDate = [Moment(data.avaliableTime), Moment(data.avaliableEndTime)];

                            // } else {
                            //     this.$message.info(response.resultMsg);
                            // }
                        },
                        response => {
                            this.$message.info(response.resultMsg);
                        }
                    );
                }
            },
            getBaomingType(value) {
                if (value == "0") {
                    this.enterForm.formRqList = [
                        {
                            id: "re_1",
                            name: "姓名",
                            requir: true,
                            tittext: "",
                            type: "text"
                        },
                        {
                            id: "re_2",
                            name: "手机",
                            requir: true,
                            tittext: "",
                            type: "text"
                        },
                        {
                            id: "re_3",
                            name: "职位",
                            requir: true,
                            tittext: "",
                            type: "text"
                        },
                        {
                            id: "re_4",
                            name: "公司",
                            requir: true,
                            tittext: "",
                            type: "text"
                        }
                    ];
                } else {
                    this.enterForm.formRqList = [
                        {
                            id: "ge_1",
                            name: "公司名称",
                            requir: true,
                            tittext: "",
                            type: "text"
                        },
                        {
                            id: "ge_2",
                            name: "联系人姓名",
                            requir: true,
                            tittext: "",
                            type: "text"
                        },

                        {
                            id: "ge_3",
                            name: "联系人手机",
                            requir: true,
                            tittext: "",
                            type: "text"
                        }, {
                            id: "ge_4",
                            name: "报名人数",
                            requir: true,
                            tittext: "",
                            type: "number"
                        }
                    ];
                }
            },
            setInstruction() {
                this.$router.push({
                    path: "/parkIndex/setInstruction",
                    query: {pagetype: "grov"}
                });
            },
        },
        //自定义过滤器
        filters: {
            //添加币种
            addCurrency: function (value) {
                return "￥" + value;
            }
        },
        computed: {
            action_tag: {
                get() {
                    return this.action_tagArry.join(",");
                },
                set(newValue) {
                    return "";
                }
            }
        }
    };
</script>
<style>
    .nametix {
        float: left;
        line-height: 40px;
        margin-right: 10px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .sponsorcon {
        .essp_width_auto();
        background-color: #fff;
    }

    //第一部分布局
    .titcon {
        margin: 0 auto;
        margin-top: 30px;
    }

    .tit_tips {
        font-weight: normal;
        font-size: 24px;
        text-align: center;
        color: #333333;
        line-height: 36px;
        margin-bottom: 20px;

    }

    .inline_span {
        float: left;
        width: 12%;
        margin-right: 15px;
        font-size: 14px;
        line-height: 40px;
        color: #666666;
        text-align: right;

        em {
            color: #ff9900;
            margin-right: 5px;
        }
    }

    //基本信息布局
    .tdcon {
        overflow: hidden;
        margin-bottom: 15px;
        .tdcon_input {
            float: left;
            width: 40%;
        }
        .inline_select {
            float: left;
            width: 250px;
            background-color: #fff !important;
            .el-input {
                float: left;
                width: 100%;
            }
        }
        .inline-picker {
            float: left;
            width: 250px;
        }
        .inline-textarea {
            float: left;
            width: 33%;
        }
        .inline-box {
            float: left;
        }
    }

    .base_tablecon {
        padding: 0 55px;
    }

    .signup_tablecon {
        padding: 0 55px;
    }

    .ticket_tablecon {
        padding: 0 55px;
    }

    //标签部分
    .tagsspanbox {
        float: left;
        .it_tag {
            float: left;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }

    .tagitem {
        margin: 0px 20px 10px 0px;
        color: #00a0e9;
        background-color: #fff;
        &:hover {
            cursor: pointer;
            color: #fff;
            background-color: #00a0e9;
        }
        .eleicon {
            margin-right: 2px;
        }
    }

    //发起单位
    .lanchinput {
        float: left;
    }

    .lanchtips {
        float: left;
        line-height: 30px;
        color: #ccc;
    }

    //海报上传
    .upload_tips {
        padding: 20px 130px;
    }

    //报名表设置
    .tipdetail {
        float: right;
        .tipdetail_text {
            color: #00a0e9;
        }
    }

    .forminfos {
        border: 1px solid #ccc;
        // border-bottom: none;
        margin-bottom: 20px;
    }

    .fheadcon {
        overflow: hidden;
        background-color: #f5f5f5;
        span {
            float: left;
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            color: #333;
        }
        .category {
            width: 30%;
        }
        .importan {
            width: 20%;
        }
        .tipstext {
            width: 35%;
        }
        .handlecon {
            width: 15%;
        }
    }

    //必填项,单行文本框区域 /多行文本框/单选框公共样式/多选框
    .requiredcon,
    .singleline,
    .multiline,
    .radiobuttonCon,
    .multibuttonCon {
        width: 100%;
        overflow: hidden;
        .requir_1 {
            width: 28%;
            padding-left: 2%;
        }
        .requir_2 {
            width: 20%;
            text-align: center;
        }
        .requir_3 {
            width: 35%;
        }
        .requir_4 {
            width: 15%;
            text-align: center;
            .requreinput {
                outline: none;
                border: none;
            }

            .handle_delicon:hover {
                cursor: pointer;
                color: #00a0e9;
            }
        }
        .cistern {
            float: left;
            line-height: 60px;
            height: 60px;
            border-bottom: 1px solid #ccc;
        }
        .con_name {
            font-size: 14px;
            color: #666666;
        }
    }

    .radiobuttonCon,
    .multibuttonCon {
        border-bottom: 1px solid #ccc;
        .main_con {
            width: 100%;
            overflow: hidden;
            margin-bottom: 10px;
            .cistern {
                border: none;
            }
        }
        .padding_con {
            position: relative;

            width: 100%;
            .ro_tiem {
                position: relative;
                padding-left: 10px;
                margin-bottom: 5px;
                .orderinput {
                    width: 20%;
                    margin-left: 10px;
                }
            }
            .delitems {
                position: absolute;
                top: 14px;
                left: 244px;
                font-size: 18px;
                &:hover {
                    cursor: pointer;
                }
            }
            .additems {
                position: absolute;
                bottom: 0px;
                left: 270px;
                font-size: 24px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    //新增报名项 样式
    .extendtagcon {
        background-color: #f5f5f5;
        // margin-bottom: 20px;
        line-height: 40px;
        padding: 20px 32px;
        .extendtit {
            overflow: hidden;
            font-size: 16px;
            line-height: 30px;
            color: #333;
        }
        .extenditme {
            overflow: hidden;
        }
    }

    //预览部分
    .look {
        text-align: center;
    }

    //其他设置
    .ticketinfo_tit {
        font-size: 14px;
        line-height: 40px;
        padding-left: 75px;
        color: #666;
    }

    .ticket_box {
        margin-bottom: 30px;
        .handleicon {
            &:hover {
                cursor: pointer;
            }
        }
    }

    .addticket {
        height: 50px;
        background-color: #f5f5f5;
        border: solid 1px #ebeef5;
        border-top: none;
        line-height: 50px;
        text-align: center;
    }

    //增加票种底部样式
    .ticket_extend {
        padding-left: 23px;
        margin-left: 32px;
    }

    .ticket-td {
        width: 100%;
        overflow: hidden;
        margin-bottom: 15px;
        .inline_span {
            float: left;
            width: 13%;
            text-align: right;
            line-height: 40px;
            margin-right: 15px;
            font-size: 14px;
            color: #666;

            .inline-picker {
                float: left;
                width: 150px;
            }
        }
        .tdcon_input {
            float: left;
            width: 30%;
        }
        .addicon {
            margin-top: 5px;
            font-size: 25px;
            color: #00a0e9;
            &:hover {
                cursor: pointer;
            }
        }
        .inline_div {
            margin-top: 10px;
        }
    }

    //最后部分的样式
    .final_tablecon, .final_tableconT {
        // padding: 0 55px;
        padding-left: 23px;
        margin-left: 32px;
        .tditem {
            width: 100%;
            overflow: hidden;
            margin-bottom: 15px;

            .inline_span {
                float: left;
                width: 13%;
                text-align: right;
                line-height: 40px;
                margin-right: 15px;
                font-size: 14px;
                color: #666;
            }

            .inline_div {
                margin-top: 10px;
            }
        }
    }

    .final_tableconA {
        float: left;
        width: 100%;
        .tditem {
            float: left;
            width: 100%;
            padding-left: 55px;
            margin-left: 32px;
            margin-bottom: 10px;
        }
        .inline_span {
            width: 152px !important;
            margin-left: 0px !important;
        }
        .inline_div {
            position: relative;
            top: 10px;
        }
    }

    .final_tablecon {
        border-top: 1px solid #ccc;
        .tditem {
            margin-top: 15px;
        }
    }

    .final_tableconT {
        .tditem {
            .inline_span {
                line-height: 1.5;
            }
            .inline_div {
                margin-top: 2px;
            }
        }
    }

    .tditem {
        .inline_span {
            float: left;
            width: 13%;
            margin-right: 15px;
            font-size: 14px;
            line-height: 40px;
            color: #666666;
            text-align: right;
        }
        .inline_div {
            .tips_div {
                float: right;
                font-size: 14px;
                color: #00a0e9;
                margin-right: 50px;
            }
        }
        .inline_textarea {
            float: left;
            width: 60%;
        }
    }

    .toolcon {
        text-align: center;
        padding: 30px 0;
        button {
            width: 100px;
            height: 40px;
            line-height: 40px;
            padding: 0;
            font-size: 16px;
        }
        button:nth-child(1) {
            margin-right: 120px;
        }
    }

    //编辑器样式
    .wrap {
        width: 810px;
        height: 400px;
        margin: 0 auto 20px;
        .quill-editor {
            height: 83%;
            .ql-container {
                // background:red;
            }
        }
    }

    //预览表
    .cpm {
        width: 230px;
    }

    .inline_div_tag {
        float: left;
        width: 40%;
        line-height: 40px;
    }
</style>
