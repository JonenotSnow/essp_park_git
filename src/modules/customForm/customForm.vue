<template>
    <div class="essp-forminfos">
        <div class="fheadcon">
            <span class="category">名称</span>
            <span class="importan">是否必填</span>
            <span class="tipstext">提示信息</span>
            <span class="handlecon">操作</span>
        </div>

        <!-- 必填项 -->
        <div class="requiredcon" v-for="item in formRqList" :key="item.id">
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
        <div class="formTypeList" v-for="(item,index) in formTypeList" :key="index">
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
            <div class="extendtit"><span  class="inline_span">新增报名项</span></div>
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
</template>

<script>
    /*
     * @自定义表单组件                  （组件中文名称）
     * @param {Number} [i=0]     （{组件参数类型} 参组件数名 组件参数说明） {Number} 位置下标。如果为负数，则从集合的最后一个元素开始倒数
     * @return {Element} 组件指定元素  （{组件返回值类型} 组件返回值说明）
     * @author  组件作者
     * @editUser   组件修改描述+组件修改者
     */
    export default {
        name: "",
        components: {},
        data() {
            return {
                // 必填表单
                formRqList:[
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
                ],
                // 自定义表单
                formTypeList:[
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
                        name: "职业",
                        btn_name: "职业",
                        requir: false,
                        tittext: "",
                        option_type: 'must'
                    }
                ], // 自定义表单数据
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
            }
        },
        mounted() {
        },
        created() {

        },
        methods: {
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
        },
        computed: {}
    };
</script>

<style lang="less" scoped>
    @import './style.less';
</style>
