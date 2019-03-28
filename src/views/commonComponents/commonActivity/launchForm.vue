<template>
    <div class="sponsorcon">
        <!-- 发起活动报名页 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="titcon">
            <h2 class="tit_tips">发起园区活动</h2>
            <div class="tit_con">
                <p>相关法律规定，营业性演出活动需取得国家行政部门审批。请确保你的活动已获得相关资质及许可。未获上述批准的活动将被依法删除， 且由此造成的后果需由活动举办方自行承担。</p>
            </div>
        </div>
        <div class="basecon">
            <div class="common_titwrap1 esspclearfix">
                <div>
                    <h3 class="common_tit">基本信息</h3>
                </div>
            </div>
            <div class="base_tablecon">
                <div class="tdcon">
          <span class="inline_span">
            <i class="imicon">*</i>活动主题 :
          </span>
                    <el-input class="tdcon_input" v-model="activityTheme" placeholder="请输入内容"></el-input>
                </div>
                <div class="tdcon">
          <span class="inline_span">
            <i class="imicon">*</i>活动类别 :
          </span>
                    <el-select v-model="activityType" placeholder="请选择" class="inline_select">
                        <el-option
                            v-for="(item,index) in action_type_items"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="tdcon">
          <span class="inline_span">
            <i class="imicon">*</i>活动开始时间 :
          </span>
                    <el-date-picker
                        class="inline-picker"
                        v-model="activityStarttime"
                        @change="dateFn(activityStarttime,1)"
                        :minTime="thisDate"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                    ></el-date-picker>
                </div>
                <div class="tdcon">
          <span class="inline_span">
            <i class="imicon">*</i>活动天数 :
          </span>
                    <el-input-number
                        v-model="activityDays"
                        type="number"
                        placeholder="请输入内容"
                        :min="1"
                        :max="999"
                    ></el-input-number>
                </div>
                <div class="tdcon">
          <span class="inline_span">
            <i class="imicon">*</i>活动地点 :
          </span>
                    <el-input class="tdcon_input" v-model="activityPlace" placeholder="请输入内容"></el-input>
                </div>
                <div class="tdcon">
          <span class="inline_span">
            <i class="imicon">*</i>是否收费 :
          </span>
                    <el-select v-model="isCharge" placeholder="请选择" class="inline_select">
                        <el-option
                            v-for="(item,index) in action_isFree_items"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="tdcon" v-if="isCharge == '1'">
          <span class="inline_span">
            <i class="imicon">*</i>收费说明 :
          </span>
                    <el-input
                        class="inline-textarea"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入收费说明"
                        v-model="chargeInfo"
                    ></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">报名是否需审核 :</span>
                    <el-select v-model="enterNeedAudit" placeholder="请选择" class="inline_select">
                        <el-option
                            v-for="(item,index) in action_isNeedcheck_items"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="tabcons esspclearfix">
          <span class="inline_span">
            <i class="imicon">*</i>活动详情：
          </span>
                    <div class="inline-box wraps">
                        <!-- <quill-editor
                            ref="myTextEditor"
                            :options="editorOption"
                            v-model="editorOption.editorCon"
                        >
                            <div id="toolbar" slot="toolbar"></div>
                        </quill-editor> -->
                        <vue-ueditor v-model="editorOption.editorCon" :ueditorConfig="editorOptions"></vue-ueditor>
                    </div>
                </div>
                <ParkUpload :parkUploadData="parkUploadData" @changeImgUrl="showImgUrl"></ParkUpload>
                <div class="tdcon">
                    <span class="inline_span"><i class="imicon">*</i>活动标签 :</span>
                    <div class="inline_div_tag">
                        <essp-add-tag
                            ref="eat"
                            :showtags="tags"
                            @showTagWin="showTagWin"
                            @delTag="delTag"
                            @initTag="initTag"
                            :tagprops="tagprops"
                        ></essp-add-tag>
                    </div>
                    <essp-tag @showtag="closetag" :centerDialogVisible="visible" :tagprops="tagprops"></essp-tag>
                </div>
                <div class="tdcon">
          <span class="inline_span">
            <i class="imicon">*</i>发起单位 :
          </span>
                    <el-input class="lanchinput tdcon_input" v-model="initiateUnits" placeholder="必填"></el-input>
                    <div class="lanchtips">（用多个“，”逗号隔开）</div>
                </div>
                <div class="tdcon">
                    <span class="inline_span">发布方 :</span>
                    <el-input
                        class="pulishinput tdcon_input"
                        v-model="cstNm"
                        placeholder="反显用户关联名称，不可更改"
                        :readonly="true"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="signup_tablecon">
            <div class="common_titwrap1 esspclearfix">
                <div>
                    <h3 class="common_tit">报名表设置</h3>
                </div>
            </div>
            <div class="tdcon">
                <el-radio-group v-model="enterType" @change="getBaomingType" :disabled="!parkFlag" v-if="parkFlag">
                    <el-radio label="0">个人实名分页申报</el-radio>
                    <el-radio label="1">公司整体整合申报</el-radio>
                </el-radio-group>
                <el-button type="text" class="tipdetail" @click="setInstruction" >
                    <i class="blue el-icon-info">
                        <span class="tipdetail_text">设置说明</span>
                    </i>
                </el-button>
            </div>
            <div class="tdcon">
                <div class="forminfos">
                    <div class="fheadcon">
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
                                <el-input
                                    class="inputcon"
                                    v-model="item.name"
                                    maxlength="6"
                                    :placeholder="'添加'+item.btn_name+'标题'"
                                ></el-input>
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
                        <!-- 多行文本框 -->
                        <div class="multiline" v-if="item.type=='textarea'">
                            <div class="cistern requir_1 con_name">
                                <el-input
                                    class="inputcon"
                                    v-model="item.name"
                                    maxlength="6"
                                    :placeholder="'添加'+item.btn_name+'标题'"
                                ></el-input>
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
                                    <el-input
                                        class="inputcon"
                                        v-model="item.name"
                                        maxlength="6"
                                        :placeholder="'添加'+item.btn_name+'标题'"
                                    ></el-input>
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
                            <div class="padding_con">
                                <!-- {{item.childrens}} -->
                                <div class="ro_tiem" v-for="(it,index) in item.childrens" :key="index">
                                    <i class="el-icon-news"></i>
                                    <el-input
                                        class="orderinput"
                                        v-model="it.name"
                                        :requir="it.requir"
                                        :placeholder="it.placeholder"
                                    ></el-input>
                                    <i
                                        v-if="item.childrens.length>2"
                                        class="delitems el-icon-remove"
                                        @click="delChidrens(item.childrens,index)"
                                    ></i>
                                </div>
                                <i class="additems el-icon-circle-plus" @click="addChidrens(item)"></i>
                            </div>
                        </div>
                        <!-- 多选框 -->
                        <div class="multibuttonCon" v-if="item.type=='checkbox'">
                            <div class="main_con">
                                <div class="cistern requir_1 con_name">
                                    <el-input
                                        class="inputcon"
                                        v-model="item.name"
                                        maxlength="6"
                                        :placeholder="'添加'+item.btn_name+'标题'"
                                    ></el-input>
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
                            <div class="padding_con">
                                <!-- {{item.childrens}} -->
                                <div class="ro_tiem" v-for="(it,index) in item.childrens" :key="index">
                                    <i class="el-icon-news"></i>
                                    <el-input
                                        class="orderinput"
                                        v-model="it.name"
                                        :requir="it.requir"
                                        :placeholder="it.placeholder"
                                    ></el-input>
                                    <i
                                        v-if="item.childrens.length>2"
                                        class="delitems el-icon-remove"
                                        @click="delChidrens(item.childrens,index)"
                                    ></i>
                                </div>
                                <i class="additems el-icon-circle-plus" @click="addChidrens(item)"></i>
                            </div>
                        </div>
                        <!-- 日期模版 -->
                        <div class="singleline" v-if="item.type=='dataTime'">
                            <div class="cistern requir_1 con_name">
                                <el-input
                                    class="inputcon"
                                    v-model="item.name"
                                    maxlength="6"
                                    :placeholder="'添加'+item.btn_name+'标题'"
                                ></el-input>
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
                                <el-input
                                    class="inputcon"
                                    v-model="item.name"
                                    maxlength="6"
                                    :placeholder="'添加'+item.btn_name+'标题'"
                                ></el-input>
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
                            <el-tag
                                size="medium"
                                v-for="(item,index) in commonItems"
                                :key="index"
                                @click.native="addTableItems(item,'must')"
                                class="tagitem"
                            >
                                <i class="eleicon el-icon-circle-plus-outline"></i>
                                {{item.btn_name}}
                            </el-tag>
                        </div>
                        <div class="extenditme">
                            <span class="inline_span">自定义报名项 :</span>
                            <el-tag
                                size="medium"
                                v-for="(item,index) in commonTag"
                                :type="item.type"
                                :key="index"
                                class="tagitem"
                                @click.native="addTableItems(item,'no_must')"
                            >
                                <i class="eleicon el-icon-circle-plus-outline"></i>
                                {{item.btn_name}}
                            </el-tag>
                        </div>
                    </div>
                </div>
                <div class="look">
                    <span @click="lookformTypeList">预&nbsp;&nbsp;&nbsp;&nbsp;览</span>
                </div>
            </div>
        </div>
        <div class="ticket_tablecon">
            <div class="common_titwrap1 esspclearfix">
                <div>
                    <h3 class="common_tit">其他设置</h3>
                </div>
            </div>
            <div>
                <div class="ticketinfo_tit">票务信息</div>
                <div class="ticket_box">
                    <div class="tickettabcon">
                        <el-table :border="true" :data="ticketForm" :header-cell-style="getRowClass">
                            <el-table-column align="center" prop="ticketType" label="票种名称" width="200">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.ticketType" placeholder="请输入票种"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="ticketPirce" label="价格(元)" width="200">
                                <template slot-scope="scope">
                                    <el-input-number
                                        v-model="scope.row.ticketPirce"
                                        type="number"
                                        :min="0.00"
                                        :disabled="isCharge == '0'"
                                        placeholder="请输入票价"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="ticketNum" type="number" label="数量" width="350">
                                <template slot-scope="scope">
                                    <div>
                                        <el-input-number
                                            v-model="scope.row.ticketNum"
                                            :min="1"
                                            @change="handleChange"
                                            label="描述文字"
                                        ></el-input-number>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="address" label="操作">
                                <template slot-scope="scope">
                                    <i class="el-icon-delete" @click="delTicketItems(scope)" style="color:#999;"></i>
                                    <!-- <el-button type="info" size="small" style="border:none;" plain :disabled="scope.row.del" @click='delTicketItems(scope)'><i class="el-icon-delete  handleicon"></i></el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="addticket">
                        <span @click="addTicketItems">新增票种</span>
                    </div>
                </div>
                <div class="ticket_extend">
                    <div class="ticket-td">
            <span class="inline_span">
              <i class="imicon">*</i>活动开放范围 :
            </span>
                        <el-select v-model="openScope" placeholder="请选择" class="inline_select">
                            <el-option
                                v-for="(item,index) in action_open_range"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="ticket-td">
            <span class="inline_span">
              <i class="imicon">*</i>报名人数上限 :
            </span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="enrolTopNum"
                            style="float: left;width: 304px;"
                            :disabled="true"
                        ></el-input>
                    </div>
                    <!-- enrolTopNum-->
                    <div class="ticket-td">
            <span class="inline_span">
              <i class="imicon">*</i>报名开始时间 :
            </span>
                        <el-date-picker
                            class="inline-picker"
                            v-model="enterStarttime"
                            @change="dateFn(enterStarttime,2)"
                            type="datetime"
                            placeholder="报名开始时间"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                        ></el-date-picker>
                    </div>
                    <div class="ticket-td">
            <span class="inline_span">
              <i class="imicon">*</i>报名截止时间 :
            </span>
                        <el-date-picker
                            class="inline-picker"
                            v-model="enterEndtime"
                            type="datetime"
                            @change="dateFn(enterEndtime,3)"
                            placeholder="报名截止时间"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                        ></el-date-picker>
                    </div>
                    <div class="ticket-td" v-if="databox.length > 0">
                        <span class="inline_span">邀请对象 :</span>
                        <span class="nametix">{{t_invitings}}</span>
                        <i class="el-icon-circle-plus addicon" @click="showContactbBook"></i>
                    </div>
                    <!--<div class="ticket-td">
                                            <span class="inline_span">
                                                邀请对象 :</span>
                                            <el-input class="tdcon_input" v-model="invitingObject" placeholder="请输入内容" :readonly="true"></el-input>
                    </div>-->
                    <!-- 暂时注释，功能待开发 -->
                    <!-- <div class="ticket-td"><span class="inline_span">邀请对象 :</span>
                                            <i class="el-icon-circle-plus addicon" @click="showContactbBook"></i>
                    </div>-->
                </div>
            </div>
            <div class="final_tablecon borderTop">
                <div class="tditem">
          <span class="inlne_span">
            <i class="imicon">*</i>是否需要单位内部审核：
          </span>
                    <div class="inline_div">
                        <el-radio v-model="needCompanyAudit" label="1">是</el-radio>
                        <el-radio v-model="needCompanyAudit" label="0">否</el-radio>
                        <div class="tips_div">提示：选择单位内部审核，则需经过企业管理员先行审核。</div>
                    </div>
                </div>
                <div class="tditem">
                    <span class="inlne_span">备注：</span>
                    <el-input
                        class="inline_textarea"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 2}"
                        placeholder="请输入内容"
                        v-model="activityRemarks"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="toolcon">
            <span @click="goToBox()">暂&nbsp;&nbsp;&nbsp;&nbsp;存</span>
            <span @click="lookfinalData()">创&nbsp;&nbsp;&nbsp;&nbsp;建</span>
            <!--<el-button type="primary" size="small" ></el-button>-->
            <!--<el-button type="primary" size="small"></el-button>-->
        </div>
        <!-- 预览模块模版 -->
        <el-dialog title="活动预览（仅提供预览功能）" :visible.sync="previewbox" width="1000px" class="pre-model-template__dialog">
            <el-form :model="enterForm">

                <div v-for="(item, index) in enterForm.formRqList" :key="index">
                    <div class="pre-model-template__wrap">
                        <p class="pre-model-template__label">{{item.requir ? '*' + item.name : item.name}}
                            <span v-if="item.tittext !== ''">({{item.tittext}})</span>
                        </p>
                        <p class="pre-model-template__content">
                            <input class="pre-model-template__frame pre-model-template__frame-input" readonly>
                        </p>
                    </div>
                </div>

                <div v-for="(item, index) in enterForm.formTypeList" :key="index">
                    <div v-if="item.type=='text'">
                        <div class="pre-model-template__wrap">
                            <p class="pre-model-template__label">{{item.requir ? '*' + item.name : item.name}}
                                <span v-if="item.tittext !== ''">({{item.tittext}})</span>
                            </p>
                            <p class="pre-model-template__content">
                                <input class="pre-model-template__frame pre-model-template__frame-text" readonly>
                            </p>
                        </div>
                    </div>
                    <div v-if="item.type=='dataTime'">
                        <div class="pre-model-template__wrap">
                            <p class="pre-model-template__label">{{item.requir ? '*' + item.name : item.name}}
                                <span v-if="item.tittext !== ''">({{item.tittext}})</span>
                            </p>
                            <p class="pre-model-template__content">
                                <input class="pre-model-template__frame pre-model-template__frame-dataTime" readonly>
                            </p>
                        </div>
                    </div>
                    <div v-if="item.type=='numberBox'">
                        <div class="pre-model-template__wrap">
                            <p class="pre-model-template__label">{{item.requir ? '*' + item.name : item.name}}
                                <span v-if="item.tittext !== ''">({{item.tittext}})</span>
                            </p>
                            <p class="pre-model-template__content">
                                <input class="pre-model-template__frame pre-model-template__frame-numberBox" readonly>
                            </p>
                        </div>
                    </div>
                    <div v-if="item.type=='textarea'">
                        <div class="pre-model-template__wrap">
                            <p class="pre-model-template__label">{{item.requir ? '*' + item.name : item.name}}
                                <span v-if="item.tittext !== ''">({{item.tittext}})</span>
                            </p>
                            <p class="pre-model-template__content">
                        <textarea class="pre-model-template__frame pre-model-template__frame-textarea"
                                  readonly></textarea>
                            </p>
                        </div>
                    </div>
                    <div v-if="item.type=='radio'">
                        <div class="pre-model-template__wrap">
                            <p class="pre-model-template__label">{{item.requir ? '*' + item.name : item.name}}
                                <span v-if="item.tittext !== ''">({{item.tittext}})</span>
                            </p>
                            <p class="pre-model-template__content">
                            <span v-for="(radioItem, radioIndex) in item.childrens"
                                  :key="radioIndex">
                                <input type="radio" disabled><laber style="margin-left: 10px">{{radioItem.name}}</laber>
                            </span>
                            </p>
                        </div>
                    </div>
                    <div v-if="item.type=='checkbox'">
                        <div class="pre-model-template__wrap">
                            <p class="pre-model-template__label">{{item.requir ? '*' + item.name : item.name}}
                                <span v-if="item.tittext !== ''">({{item.tittext}})</span>
                            </p>
                            <p class="pre-model-template__content">
                                <span v-for="(checkboxItem, checkboxIndex) in item.childrens"
                                      :key="checkboxIndex">
                                <input type="checkbox" disabled><laber
                                    style="margin-left: 10px">{{checkboxItem.name}}</laber>
                            </span>
                            </p>
                        </div>
                    </div>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="previewbox = false">取 消</el-button>
                <el-button type="primary" @click="previewbox = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 穿梭框预览 -->
        <el-dialog title="请添加您想要邀请的企业" :visible.sync="contactbook" center width="840px" class="csk-yl">
            <div style="display: flex;justify-content: center;">
                <el-transfer
                    @change="handleChangeMoveKye"
                    :titles="listname"
                    v-model="t_concatvalue"
                    :data="databox"
                ></el-transfer>
            </div>
            <div slot="footer" class="dialog-footer">
                <p class="csk-desc">注：活动发布成功后系统将会给您邀请的企业发送活动邀请函</p>
                <button @click="contactbook=false" class="csk-confirm-invote__btn">确认邀请</button>
            </div>
        </el-dialog>

        <!--创建成功弹窗-->
        <el-dialog
            :visible.sync="dialogVisible__SUCCESS"
            width="30%"
            :before-close="handleClose">
            <p style="text-align: center; height: 19px; line-height: 19px; font-size: 20px; font-weight: normal; font-stretch: normal; letter-spacing: 0px; color: #333333;">
                活动发布成功</p>
            <span slot="footer" class="dialog-footer">
    <el-button @click="activeTrue()">是</el-button>
    <el-button type="primary" @click="dialogVisible__SUCCESS = false">否</el-button>
  </span>
        </el-dialog>
        <!--创建成功弹窗-->
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import addTag from "@/views/commonComponents/commonActivity/addTag";
    import EsspTag from "@/components/EsspTag";
    import EsspAddTag from "@/components/EsspAddTag";
    import ParkUpload from "@/views/parkHall/parkUpload"; // 上传图片控件

    import Moment from "moment";

    export default {
        name: "",
        data() {
            return {
                isBdPark: this.utils.isBdPark(),
                databox: [],
                parkUploadData: {
                    title: "活动宣传图/海报:",
                    src: "",
                    isPic:
                        "（该图片以活动主图进行展示,每张最大2M，图片宽高比为7：4，建议分辨率建议为840*480，支持jpg/jpeg/gif/png格式。）",
                    imgItemType: "active"
                },
                listname: ["园区企业", "已选企业"],
                msg: "发起活动",
                p1: "",
                p2: "",
                toLimit: 0,
                editorOptions: {
                    initialFrameHeight: 290,
                    UEDITOR_HOME_URL: this.$urlUEditor,
                },
                editorOption: {
                    editorCon: "",
                },
                thisDate: new Date(),
                breadlist: [
                    {
                        path: "/parkIndex/park/launch",
                        name: this.utils.isBdPark()?'平台活动':"园区活动"
                    },
                    {
                        path: "/parkIndex/launchForm",
                        name: "发起园区活动"
                    }
                ],
                action_type_items: [
                    //1培训 2论坛 3比赛 4聚会 5研讨会 6发布会 7分享会 8沙龙
                    {
                        id: "1",
                        name: "培训",
                        value: 1
                    },
                    {
                        id: "2",
                        name: "论坛",
                        value: 2
                    },
                    {
                        id: "3",
                        name: "比赛",
                        value: 3
                    },
                    {
                        id: "4",
                        name: "聚会",
                        value: 4
                    },
                    {
                        id: "5",
                        name: "研讨会",
                        value: 5
                    },
                    {
                        id: "6",
                        name: "发布会",
                        value: 6
                    },
                    {
                        id: "7",
                        name: "分享会",
                        value: 7
                    },
                    {
                        id: "8",
                        name: "沙龙",
                        value: 8
                    },
                    {
                        id: "9",
                        name: "其他",
                        value: 9
                    }
                ], //活动类型
                action_isFree_items: [
                    {
                        id: "0",
                        name: "否",
                        value: "0"
                    },
                    {
                        id: "1",
                        name: "是",
                        value: "1"
                    }
                ],
                action_isNeedcheck_items: [
                    {
                        id: "0",
                        name: "否"
                    },
                    {
                        id: "1",
                        name: "是"
                    }
                ],
                action_open_range: [
                    {
                        id: "0",
                        name: "仅对本园区开放"
                    }
//                    ,{
//                        id: "1",
//                        name: "全开放"
//                    }
                ],

                dialogVisible: false,
                //必填项
                commonItems: [
                    {
                        type: "text",
                        name: "职业",
                        btn_name: "职业",
                        requir: false,
                        tittext: "",
                        option_type: 'must'
                    },
                    {
                        type: "text",
                        name: "年龄",
                        btn_name: "年龄",
                        requir: false,
                        tittext: "",
                        option_type: 'must'
                    },
                    {
                        type: "text",
                        name: "部门",
                        btn_name: "部门",
                        requir: false,
                        tittext: "",
                        option_type: 'must'
                    },
                    {
                        type: "text",
                        name: "邮箱",
                        btn_name: "邮箱",
                        requir: false,
                        tittext: "",
                        option_type: 'must'
                    },
                    {
                        type: "text",
                        name: "附件",
                        btn_name: "附件",
                        requir: false,
                        tittext: "",
                        option_type: 'must'
                    },
                    {
                        type: "text",
                        name: "毕业学校",
                        btn_name: "毕业学校",
                        requir: false,
                        tittext: "",
                        option_type: 'must'
                    }
                ],
                // 标签
                commonTag: [
                    {
                        type: "text",
                        name: "",
                        btn_name: "单行文本",
                        requir: false,
                        tittext: "",
                        option_type: 'no_must'
                    },
                    {
                        type: "textarea",
                        name: "",
                        btn_name: "多行文本框",
                        requir: false,
                        tittext: "",
                        childrens: [],
                        option_type: 'no_must'
                    },
                    {
                        type: "radio",
                        name: "",
                        btn_name: "单选下拉框",
                        requir: false,
                        tittext: "",
                        childrens: [],
                        option_type: 'no_must'
                    },
                    {
                        type: "checkbox",
                        name: "",
                        btn_name: "多选下拉框",
                        requir: false,
                        tittext: "",
                        option_type: 'no_must'
                    },
                    {
                        type: "dataTime",
                        name: "",
                        btn_name: "日期选择框",
                        requir: false,
                        tittext: "",
                        option_type: 'no_must'
                    },
                    {
                        type: "numberBox",
                        name: "",
                        btn_name: "数值输入框",
                        requir: false,
                        tittext: "",
                        option_type: 'no_must'
                    }
                ],

                //传给后台的字段
                invitingObject: "", //邀请对象
                parkId: window.sessionStorage.getItem("parkId"),
                activityTheme: "",
                activityType: "",
                activityStarttime: "",
                activityDays: 1,
                activityPlace: "",
                ticketLen: 0,  // 初始化票的长度
                t_invitings: "", // 邀请对象名称
                // t_concatvalue:'',  // 邀请对象id
                isCharge: "0",
                chargeInfo: "",
                enterNeedAudit: "0", //报名是否需审核
                activityDetails: "",
                activityPhoto: "",
                activityLabel: [],
                initiateUnits: "", //发起单位
                initiatorWay: "1", //活动发起的渠道，pc端取:""
                cstNm:this.SSH.getItem("userInfo").cstNm || "暂无",//发布方反显
                enterType: this.utils.isBdPark()?"1":'0', //申报类型
                enterForm: {
                    formRqList: [],
                    formTypeList: []
                },
                ticketForm: [
                    {
                        ticketType: "免费票",
                        ticketPirce: "0.00",
                        ticketNum: 0,
                        del: true
                    }
                    // {
                    //   ticketType: "VIP票",
                    //   ticketPirce: "0.00",
                    //   ticketNum: 0
                    // }
                ],
                openScope: "0", //活动范围
                enterStarttime: "", //报名开始时间
                enterEndtime: "", //报名截止时间
                enrolTopNum: 1, //报名上限人数
                needCompanyAudit: "0",
                activityRemarks: "",
                status: "0",
                t_concatvalue: [], //邀请的对像,后台暂时不需要这个字段
                //添加标签
                previewbox: false, //预览的框
                contactbook: false, //邀请人穿梭框
                formLabelWidth: "120px",
                visible: false,
                tags: [],
                tagprops: {
                    lblTpCd: "3000002",
                    entId: ""
                },
                uploads: "",
                invitList: [],

                // 创建成功弹窗
                dialogVisible__SUCCESS: false,
                parkFlag:true,//区分报名是否只有公司 true 默认开启选项
            };
        },
        components: {
            EsspBreadCrumb,
            addTag,
            EsspTag,
            EsspAddTag,
            ParkUpload,
        },
        created() {
            this.uploads = this.$apiUrl.upload.upload;
            this.getDraftResource();
            // this.getAllNum(); // 获取总票数
            if (this.SSH.getItem("userInfo").cstNm) {
                this.cstNm = this.SSH.getItem("userInfo").cstNm;
            }
            this.objListName(); // 邀请对象
            this.getBaomingType(this.enterType); //设置默认报名表样式

            if(this.isBdPark){
                this.parkFlag = false;

            }

        },

        methods: {
            // 改变图片路径
            showImgUrl(url) {
                this.activityPhoto = url;
                this.parkUploadData.src = url;
            },
            // 修改日期的判断  type: 1, 活动开始时间  2.报名开始时间   3. 报名截止时间
            // enterStarttime:"",    //报名开始时间
            // enterEndtime:"",     //报名截止时间
            // activityStarttime    // 活动开始时间
            retrunTimeTit(type) {
                var msg = "";
                switch (type) {
                    case 1:
                        msg = "活动开始时间";
                        break;
                    case 2:
                        msg = "报名开始时间";
                        break;
                    case 1:
                        msg = "报名截止时间";
                        break;
                }
                return msg;
            },
            handleChangeMoveKye(value, direction, movedKeys) {
                var name = [];
                this.t_concatvalue.forEach((item, index) => {
                    this.databox.forEach((itemChild, indexChild) => {
                        if (item == itemChild.key) {
                            name.push(itemChild.cstNm);
                        }
                    });
                });
                this.t_invitings = name.join(",");
            },
            getAllNum() {
                var num = 0;
                if (this.ticketForm.length > 0) {
                    this.ticketForm.forEach((item, index) => {
                        num += parseInt(item.ticketNum == "" ? 1 : item.ticketNum);
                    });
                }
                this.enrolTopNum = num;
            },
            objListName() {
                this.$post("/activity/getInvitingCst", {
                    parkId: sessionStorage.getItem("parkId")
                }).then(response => {
                    var arr = response.resultData;

                    arr.forEach((item, index) => {
                        if(item.cstId && item.cstNm) {
                            item.key = item.cstId || '';
                            item.label = item.cstNm || '';
                            this.databox.push(item);
                        }
                    });
                });
            },
            dateFn(changeTime, type) {
                //  设置 当前的值不能小于当前时间
                var changeTimeMi = this.getMillisecond(changeTime); // 当前选择的时间
                var thisTime = this.getMillisecond(this.thisDate); // 当前的时间
                var msg = this.retrunTimeTit(type);
                // 如果当前选择的时间 小于 当前的时间
                if (changeTimeMi < thisTime) {
                    this.$message(msg + "不能小于当前时间");
                    switch (type) {
                        case 1:
                            this.activityStarttime = "";
                            break;
                        case 2:
                            this.enterStarttime = "";
                            break;
                        case 1:
                            this.enterEndtime = "";
                            break;
                    }
                    return;
                }
                // 根据选择来判断时间的大小
                if (type === 1) {
                    if (this.enterStarttime != "") {
                        var diff1 = this.getMillisecond(this.enterStarttime) - changeTimeMi;
                        if (diff1 > 0) {
                            this.$message("活动开始时间不能小于报名开始时间");
                            this.activityStarttime = "";
                            return;
                        }
                    }
                    if (this.enterEndtime != "") {
                        var diff1 = this.getMillisecond(this.enterEndtime) - changeTimeMi;
                        if (diff1 > 0) {
                            this.$message("活动开始时间不能小于报名结束时间");
                            this.activityStarttime = "";
                            return;
                        }
                    }
                }
                if (type === 2) {
                    if (this.activityStarttime != "") {
                        var diff1 =
                            changeTimeMi - this.getMillisecond(this.activityStarttime);
                        if (diff1 > 0) {
                            this.$message("活动开始时间不能小于报名开始时间");
                            this.enterStarttime = "";
                            return;
                        }
                    }
                    if (this.enterEndtime != "") {
                        var diff1 =
                            changeTimeMi - this.getMillisecond(this.activityStarttime);
                        if (diff1 > 0) {
                            this.$message("活动开始时间不能小于报名开始时间");
                            this.enterStarttime = "";
                            return;
                        }
                        var diff3 = changeTimeMi - this.getMillisecond(this.enterEndtime);
                        if (diff3 > 0) {
                            this.$message("活动开始时间不能大于活动结束时间");
                            this.enterStarttime = "";
                            return;
                        }
                    }
                }
                if (type === 3) {
                    if (this.activityStarttime != "") {
                        var diff1 =
                            changeTimeMi - this.getMillisecond(this.activityStarttime);
                        if (diff1 > 0) {
                            this.$message("活动开始时间不能小于报名结束时间");
                            this.enterEndtime = "";
                            return;
                        }
                    }
                    if (this.enterStarttime != "") {
                        var diff1 =
                            changeTimeMi - this.getMillisecond(this.activityStarttime);
                        if (diff1 > 0) {
                            this.$message("活动开始时间不能小于报名开始时间");
                            this.enterEndtime = "";
                            return;
                        }
                        var diff3 = changeTimeMi - this.getMillisecond(this.enterStarttime);
                        if (diff3 < 0) {
                            this.$message("活动开始时间不能大于活动结束时间");
                            this.enterEndtime = "";
                            return;
                        }
                    }
                }
            },
            getMillisecond(vaule) {
                // 获取秒数
                return Moment(vaule).unix();
            },
            getMaxNum() {
            },
            getDraftResource() {
                var activityId = this.$route.query.activityId; //parkIndex/launchForm?draftId=1
                var opMark = this.$route.query.opMark;
                if (activityId) {
                    // this.$message(`来自于草稿箱页面，需要请求${activityId}对应的数据接口`);
                    this.tagprops.entId =
                        window.sessionStorage.getItem("parkId") + "_" + activityId; //获取标签

                    var pop = {
                        activityId: activityId,
                        parkId: sessionStorage.getItem("parkId"),
                        opMark: opMark
                    };
                    this.$post(this.$apiUrl.active.actEdit, pop).then(
                        response => {
                            var codestatus = response.resultCode;
                            // if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                                let data = response.resultData;
                                this.activityTheme = data.activityTheme || '';
                                this.activityType = data.activityType;
                                this.activityStarttime = data.activityStarttime || '';
                                this.activityDays = data.activityDays || '';
                                this.activityPlace = data.activityPlace || '';
                                this.isCharge = data.isCharge || '';
                                this.chargeInfo = data.chargeInfo || '';
                                this.editorOption.editorCon = data.activityDetails || '';
                                this.enterNeedAudit = data.enterNeedAudit|| '';
                                this.activityPhoto = data.activityPhoto || '';
                                this.parkUploadData.src = data.activityPhoto || '';
                                this.initiateUnits = data.initiateUnits || '';
                                this.initiatorWay = data.initiatorWay || '';
                                this.enterType = data.enterType || '';
                                this.enterForm = JSON.parse(data.enterForm);
                                let that = this;
                                let enterFoArr = [];  // 默认设置数组 commonItems
                                for(var i = 0; i < this.enterForm.formTypeList.length; i ++) {
                                    var formTypeLists = this.enterForm.formTypeList[i];

                                    for(var j = 0; j < this.commonItems.length; j++) {
                                        var commonItemsss = this.commonItems[j];

                                        if(commonItemsss.name == formTypeLists.name && formTypeLists.option_type == "must") {
//                                            console.log(formTypeLists);
                                            this.commonItems.splice(j,1)
                                        }
                                    }
                                }
                                console.log("两个数组去重===",this.commonItems);


                                this.ticketForm = JSON.parse(data.ticketForm);
                                this.ticketLen = this.ticketForm.length;
                                this.openScope = data.openScope;
                                this.enterStarttime = data.enterStarttime;
                                this.enterEndtime = data.enterEndtime;
                                this.needCompanyAudit = data.needCompanyAudit;
                                this.activityRemarks = data.activityRemarks;
                                console.log( );
                                var tickNums = 0 ;
                                this.ticketForm.forEach((item,index) => {
                                    tickNums += item.ticketNum
                                })
                                console.log(tickNums);
                                this.enrolTopNum = tickNums;

                            // } else {
                            //     this.$message.error(response.resultMsg);
                            // }
                        },
                        err => {
                            this.$message.error(err.resultMsg);
                        }
                    );
                }
            },

            handleSuccess(file, activityPhoto) {
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
                const isLt5M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
                    return isJPG;
                }
                if (!isLt5M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                    return isLt5M;
                }
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "active"); // 通过append向form对象添加数据
                this.$post(this.$apiUrl.upload.upload, param).then(
                    response => {
                        this.activityPhoto = response.resultData[0].url;
                    },
                    err => {
                        this.$message.error("接口异常");
                    }
                );
                return false; // 返回false不会自动上传
            },

            handleRemove(file, activityPhoto) {
            },
            handlePictureCardPreview(file) {
                this.activityPhoto = file.url;
            },
            //表头样式封装
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return "background:#f5f5f5;";
                }
            },
            // 改变票种数量的值
            handleChange(value) {
                this.getAllNum();
            },
            //父级接收子集的数据
            addTags({name}) {
                this.setActObj.activityLabel = name;
            },
            //删除标签
            handleClose(tag) {
                this.setActObj.activityLabel.splice(
                    this.setActObj.activityLabel.indexOf(tag),
                    1
                );
            },
            addTableItems(item,option_type) {
                if (item.type == "text") {
                    var obj = {
                        type: "text",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: "",
                        option_type: option_type
                    };
                }
                if (item.type == "textarea") {
                    var obj = {
                        type: "textarea",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: "",
                        option_type: option_type
                    };
                }
                if (item.type == "radio") {
                    var obj = {
                        type: "radio",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: "",
                        option_type: option_type,
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
                        option_type: option_type,
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
                        dayDate: new Date(),
                        option_type: option_type
                    };
                }
                if (item.type == "numberBox") {
                    var obj = {
                        type: "numberBox",
                        name: item.name,
                        btn_name: item.btn_name,
                        requir: false,
                        tittext: "",
                        option_type: option_type
                    };
                }
                this.enterForm.formTypeList.push(obj);
                if(option_type == 'must') {
                    this.commonItems.splice(this.commonItems.indexOf(item), 1);
                }

            },
            delTableItems(index, item) {
                this.enterForm.formTypeList.splice(index, 1);
                if(item.option_type === "must") {
                    this.commonItems.push(item);
                }

            },
            lookformTypeList() {
                this.previewbox = true;
            },
            showContactbBook() {
                this.contactbook = true;
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
                    ticketType: "免费票",
                    ticketPirce: "0.00",
                    ticketNum: "1",
                    del: false
                };
                this.ticketForm.push(pop);
                this.getAllNum();
            },
            checkInfo() {
                if (this.ticketForm.length == 0) {
                    this.$message.error("票种不能为空！");
                    return;
                } else {
                    var arr = [];
                    var brr;
                    var ticketsLen = this.ticketForm.length;
                    for (var i = 0; i < ticketsLen; i++) {
                        var item = this.ticketForm[i];
                        arr.push(item.ticketType);
                        if (item.ticketType == "") {
                            this.$message.error("请完善票种信息！");
                            return;
                        }
                        brr = Array.from(new Set(arr));
                        if(arr.length > brr.length){
                            this.$message.error("不能有相同的票种名称");
                            return;
                        }
                    }
                }
                console.log("this.activityTheme",this.activityTheme);
                if (this.activityTheme == "") {
                    this.$message.error("活动主题不能为空！");
                    return;
                }
               if (this.activityTheme.length > 40) {
                    this.$message.error("活动主题长度不能大于40个字！");
                    return;
                }
                if (this.activityPlace == "") {
                    this.$message.error("活动地点不能为空！");
                    return;
                }
                if (this.activityType == "" || this.activityType == null) {
                    this.$message.error("活动类别必选！");
                    return;
                }
                if (this.activityStarttime == "") {
                    this.$message.error("活动开始时间类型必填！");
                    return;
                }
                if (this.isCharge == "1") {
                    if (this.chargeInfo == "") {
                        this.$message.error("收费说明必填！");
                        return;
                    }
                }
                if (this.editorOption.editorCon == "") {
                    this.$message.error("活动详情必填！");
                    return;
                }
                if (this.activityPhoto == "") {
                    this.$message.error("图片必传！");
                    return;
                }
                if(this.tags.length == 0) {
                    this.$message.error("标签必填！");
                    return;
                }
                if (this.initiateUnits == "") {
                    this.$message.error("发布单位必填！");
                    return;
                }
                if (this.enterStarttime == "") {
                    this.$message.error("报名开始时间必填！");
                    return;
                }
                if (this.enterEndtime == "") {
                    this.$message.error("报名截止时间必填！");
                    return;
                }
                return true;
            },
            //删除票种
            delTicketItems(scope) {
                this.ticketForm.splice(scope.$index, 1);
                this.getAllNum();
            },
            //暂存
            goToBox() {
                if(!this.checkInfo()){
                    return
                }
                var type = 0;
                var msg =
                    "<p><i class='icon iconfont icon-queren' style='font-size: 45px;color: #00a0e9;'></i></p><p style='padding: 25px 0 30px;'>您发布的活动已保存至草稿箱</p>";
                var url = "/parkIndex/park/launch?type=1";
                var maskConfig = {
                    confirmButtonText: "返回草稿箱查看",
                    center: true,
                    showCancelButton: false,
                    dangerouslyUseHTMLString: true
                };

                var activeId = this.$route.query.activityId || "";

                this.$post(this.$apiUrl.active.addActivity, {
                    parkId: window.sessionStorage.getItem("parkId"), //'20180816101609002'
                    activityId: activeId,
                    activityTheme: this.activityTheme,
                    activityType: this.activityType,
                    topLimit: this.enrolTopNum,
                    activityStarttime: this.activityStarttime,
                    activityDays: this.activityDays,
                    isPlatform: 0, //在园区内的传0，平台传1
                    activityPlace: this.activityPlace,
                    isCharge: this.isCharge,
                    chargeInfo: this.chargeInfo,
                    activityDetails: this.editorOption.editorCon
                        ? this.editorOption.editorCon : "",
                    enterNeedAudit: this.enterNeedAudit,
                    activityPhoto: this.activityPhoto,
                    activityLabel: this.tags.join(","),
                    initiateUnits: this.initiateUnits, //发布方
                    initiatorWay: this.initiatorWay, //发布方
                    enterType: this.enterType, //个人与公司
                    enterForm: this.enterForm, //大表
                    ticketForm: this.ticketForm, //票务表
                    openScope: this.openScope, //活动开放范围
                    enterStarttime: this.enterStarttime,
                    enterEndtime: this.enterEndtime,
                    invitings: this.t_concatvalue.join(","),
                    needCompanyAudit: this.needCompanyAudit,
                    activityRemarks: this.activityRemarks, //活动备注
                    status: type
                }).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.$confirm(msg, maskConfig).then(() => {
                                this.$router.push(url);
                            });
                        // } else {
                        //     this.$message.error(response.resultMsg);
                        // }
                    },
                    response => {
                        this.$message.error(response.resultMsg);
                    }
                );
            },

            // 活动发布提交
            lookfinalData() {
                if (this.checkInfo()) {
                    if (this.ticketForm.length > 1) {
                        var arr = [];
                        for (let i = 0; i < this.ticketForm.length; i++) {
                            arr.push(this.ticketForm[i].ticketType);
                        }
                        var brr = Array.from(new Set(arr));
                        if (arr.length > brr.length) {
                            this.$message.error("不能有相同的票种名称");
                            return;
                        }
                    }
                    var type = 1;
                    var msg = "您是否发布活动？";
                    var url = "/parkIndex/park/launch?type=0";

                    var maskConfig = {
                        confirmButtonText: "是",
                        cancelButtonText: "否",
                        center: true
                    };

                    this.$confirm(msg, maskConfig).then(() => {
                        var activeId = this.$route.query.activityId || "";
                        this.$post(this.$apiUrl.active.addActivity, {
                            parkId: window.sessionStorage.getItem("parkId"), //'20180816101609002'
                            activityId: activeId,
                            activityTheme: this.activityTheme,
                            activityType: this.activityType,
                            topLimit: this.enrolTopNum,
                            activityStarttime: this.activityStarttime,
                            activityDays: this.activityDays,
                            isPlatform: 0, //在园区内的传0，平台传1
                            activityPlace: this.activityPlace,
                            isCharge: this.isCharge,
                            chargeInfo: this.chargeInfo,
                            activityDetails: this.editorOption.editorCon ? this.editorOption.editorCon : "",
                            enterNeedAudit: this.enterNeedAudit,
                            activityPhoto: this.activityPhoto,
                            activityLabel: this.tags.join(","),
                            initiateUnits: this.initiateUnits, //发布方
                            initiatorWay: this.initiatorWay, //活动发起的渠道
                            enterType: this.enterType, //个人与公司
                            enterForm: this.enterForm, //大表
                            ticketForm: this.ticketForm, //票务表
                            openScope: this.openScope, //活动开放范围
                            enterStarttime: this.enterStarttime,
                            enterEndtime: this.enterEndtime,
                            invitings: this.t_concatvalue.join(","),
                            needCompanyAudit: this.needCompanyAudit,
                            activityRemarks: this.activityRemarks, //活动备注
                            status: type
                        }).then(
                            response => {
                                // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                                    this.$alert(response.resultMsg, {
                                        confirmButtonText: "确定",
                                        callback: action => {
                                            this.$router.push(url);
                                        }
                                    });
                                // } else {
                                //     this.$message.error(response.resultMsg);
                                // }
                            },
                            response => {
                                this.$message.error(response.resultMsg);
                            }
                        );
                    });
                }
            },
            showTagWin() {
                this.visible = true;
            },
            closetag({viewtags}) {
                this.visible = false;
                this.tags = viewtags;
            },
            delTag(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            initTag(tmpTags) {
                this.tags = tmpTags;
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
                            name: "公司",
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
                        }
                    ];
                }
            },

            setInstruction() {
                this.$router.push({
                    path: "/parkIndex/setInstruction",
                    query: {pagetype:"active"}
                });
            },

            // 成功弹窗
            activeTrue() {
                this.dialogVisible__SUCCESS = false;
                // var url = type === 1 ? "/parkIndex/park/launch?type=0" : "/parkIndex/park/launch?type=1";
                this.$router.push('/parkIndex/park/launch?type=0');
            }
            // 成功弹窗
        },
        //自定义过滤器
        filters: {
            //添加币种
            addCurrency: function (value) {
                return "￥" + value;
            },
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
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
        },
        watch: {
            isCharge(newval, oldval) {
                if (newval == "0") {
                    this.ticketForm.forEach(el => {
                        el.ticketPirce = "0.00";
                    });
                }
            }
        }
    };
</script>
<style>
    .base_tablecon .tdcon .el-input__inner,
    .ticket-td .el-input__inner {
        font-size: 14px;
        padding: 4px 15px;
        line-height: normal;
    }

    .base_tablecon .tdcon .el-input--prefix .el-input__inner,
    .ticket-td .el-input--prefix .el-input__inner {
        padding-left: 30px;
    }
</style>
<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .nametix {
        float: left;
        line-height: 40px;
        margin-right: 10px;
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

    .imicon {
        color: #ff9900;
        font-size: 16px;
        margin-right: 5px;
    }

    .common_tit {
        font-size: 24px;
        border-left: 10px solid #00a0e9;
        padding-left: 21px;
        font-weight: normal;
    }

    .sponsorcon {
        .essp_width_auto();
        background-color: #fff;
        .pre-model-template__dialog {
            .el-dialog__body {
                .el-form {
                    padding-left: 140px;
                    width: 680px;
                    .pre-model-template__wrap {
                        margin-bottom: 10px;
                        .pre-model-template__label {
                            margin-bottom: 10px;
                            height: 16px;
                            line-height: 16px;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #666666;
                            span {
                                height: 13px;
                                line-height: 13px;
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #cccccc;
                            }
                        }
                        .pre-model-template__content {
                            span {
                                display: inline-block;
                                margin-left: 20px;
                                height: 12px;
                                line-height: 12px;
                                input {
                                    float: left;
                                }
                                label {
                                    float: left;
                                    font-size: 14px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    letter-spacing: 0px;
                                    color: #333333;
                                }
                                clear: both;
                            }
                            .pre-model-template__frame-input,
                            .pre-model-template__frame-dataTime,
                            .pre-model-template__frame-numberBox {
                                width: 100%;
                                height: 33px;
                                border: solid 1px #cccccc;
                            }
                            .pre-model-template__frame-textarea {
                                width: 100%;
                                height: 113px;
                                border: solid 1px #cccccc;
                            }
                        }
                    }

                }
            }

        }
        .csk-yl {
            .csk-desc {
                margin-bottom: 28px;
                height: 12px;
                line-height: 12px;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #999;
            }
            .csk-confirm-invote__btn {
                margin-bottom: 30px;
                width: 277px;
                height: 50px;
                line-height: 50px;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.2px;
                color: #fff;
                border: none;
                background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%),
                linear-gradient(#00a0e9, #00a0e9);
                background-blend-mode: normal, normal;
                border-radius: 3px;
            }
        }
    }

    .common_titwrap1 {
        padding: 53px 0;
    }

    //第一部分布局
    .titcon {
        margin: 0 auto;
        padding: 0 100px;
        margin-top: 30px;
    }

    .tit_tips {
        /*height: 24px;*/
        font-size: 24px;
        text-align: center;
        color: #333333;
        font-weight: normal;
        margin-bottom: 20px;
    }

    .tit_con {
        margin: 0 auto 20px;
        background-color: #fef9f0;
        border: solid 1px #ff9900;
        padding: 18px;
        p {
            text-align: left;
            font-size: 16px;
            line-height: 24px;
            color: #666666;
        }
    }

    .tabcons .inline_span {
        float: left;
        width: 12%;
        margin-right: 15px;
        font-size: 14px;
        line-height: 40px;
        color: #666666;
        text-align: right;
    }

    //基本信息布局
    .tdcon {
        overflow: hidden;
        margin-bottom: 15px;
        .inline_span {
            float: left;
            width: 12%;
            margin-right: 15px;
            font-size: 14px;
            line-height: 40px;
            color: #666666;
            text-align: right;
        }
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

        .inline_div_tag {
            float: left;
            width: 40%;
            line-height: 40px;
        }
    }

    .signup_tablecon {
        padding: 0 100px;
    }

    .ticket_tablecon {
        padding: 0 100px;
    }

    //标签部分
    .tagsspanbox {
        float: left;
        .it_tag {
            float: left;
            margin-right: 5px;
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

    .basecon {
        padding: 0 100px;
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
        margin-bottom: 20px;
        /*border-bottom: none;*/
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
        /*margin-bottom: 20px;*/
        line-height: 40px;
        padding: 20px 50px;
        .extendtit {
            overflow: hidden;

            font-size: 20px;
            line-height: 30px;
            color: #333;
        }
        .extenditme {
            overflow: hidden;
        }
    }

    //预览部分
    .look {
        text-align: left;
        span {
            display: inline-block;
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #e6f4ff;
            color: #00a0e9;
            cursor: pointer;
        }
    }

    .borderTop {
        position: relative;
        &:before {
            content: "";
            left: -8.5%;
            top: 0;
            position: absolute;
            width: 117%;
            height: 1px;
            background: #ccc;
        }
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
        text-align: left;
        span {
            display: inline-block;
            text-align: center;
            width: 98px;
            height: 28px;
            border-radius: 5px;
            line-height: 30px;
            border: 1px solid #999;
            color: #666;
            margin-left: 60px;
        }
    }

    //增加票种底部样式
    .ticket_extend {
        padding-left: 45px;
    }

    .ticket-td {
        width: 100%;
        overflow: hidden;
        margin-bottom: 15px;
        .inline_span {
            float: left;
            width: 120px;
            text-align: right;
            line-height: 40px;
            margin-right: 15px;
            font-size: 14px;
            color: #666;
        }
        .tdcon_input {
            float: left;
            width: 30%;
        }
        .inline-picker {
            float: left;
            width: 30%;
        }
        .addicon {
            font-size: 30px;
            color: #00a0e9;
            &:hover {
                cursor: pointer;
            }
        }
    }

    //最后部分的样式
    .final_tablecon {
        /*border-top: 1px solid #ccc;*/
        .tditem {
            width: 100%;
            padding: 20px 0px;
            overflow: hidden;
        }
    }

    .tditem {
        .inlne_span {
            float: left;
            width: 200px;
            text-align: right;
        }
        .inline_div {
            .tips_div {
                float: right;
                font-size: 14px;
                color: #00a0e9;
            }
        }
        .inline_textarea {
            float: left;
            width: 60%;
        }
    }

    .toolcon {
        text-align: center;
        padding: 30px 0 58px;
        margin-bottom: 20px;
        span {
            display: inline-block;
            width: 100px;
            line-height: 40px;
            line-height: 40px;
            text-align: center;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            background: #00a0e9;
            color: #fff;
            cursor: pointer;
            margin-right: 130px;
        }
        span:nth-child(2) {
            margin-right: 0;
        }
    }

    //编辑器样式
    .wraps {
        float: left;
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

    .ql-container {
        background: #fff;
    }

</style>

