<template>
    <div class="publish-sciAnd-tech-policy-wrap" id="publishAchievement">
        <essp-bread-crumb :breadList="breadlist_01" v-if="applyType === '01'"/>
        <essp-bread-crumb :breadList="breadlist_02" v-if="applyType === '02'"/>
        <div class="publish-title" v-if="applyType === '01'">
            <i></i>发布政策法规<i></i>
        </div>
        <div class="publish-title" v-if="applyType === '02'">
            <i></i>发布科技服务<i></i>
        </div>

        <!--！！！！！！政策法规表格！！！！！！-->
        <div class="publist-form" v-if="applyType === '01'">
            <el-form :model="ruleForm" :rules="rules_01" ref="ruleForm" label-width="125px" class="demo-ruleForm">
                <el-form-item label="政策法规标题：" prop="policyTitle">
                    <el-input v-model="ruleForm.policyTitle"
                              placeholder="请输入政策法规标题"
                              style="width: 500px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="政策法规简介：" prop="desc">
                    <!--<el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
                    <textarea
                        placeholder="请输入政策法规简介"
                        style="padding: 10px; width: 720px; height: 140px; font-size: 14px; color: #999; border-radius: 3px; border: solid 1px #cccccc;"/>
                </el-form-item>
                <el-form-item label="政策法规详情：" prop="infoDetail">
                    <textarea
                        v-model="infoDetail"
                        placeholder="请输入政策法规详情"
                        style="padding: 10px; width: 720px; height: 140px; font-size: 14px; color: #999; border-radius: 3px; border: solid 1px #cccccc;"/>

                </el-form-item>
                <el-form-item label="政策法规标签：" prop="tags">
                    标签组件
                </el-form-item>
                <el-form-item label="发布人：">
                    发布人
                </el-form-item>
                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <button class="btn-upload">附件上传</button>
                        <div slot="tip" class="el-upload__tip">（政策法规支持pdf/word/excel等类型文件，大小10M内）</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <p class="scan"><span class="scan-1">预</span><span>览</span></p>
                </el-form-item>
                <el-form-item>
                    <div class="btn-group">
                        <button class="my-btn btn_zc" @click="temporaryStorage('ruleForm')">暂存</button>
                        <button class="my-btn btn_cj" @click="submitForm('ruleForm')">创建</button>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!--！！！！！！科技服务表格！！！！！！-->
        <div class="publist-form" v-if="applyType === '02'">
            <el-form :model="ruleForm" :rules="rules_02" ref="ruleForm" label-width="125px" class="demo-ruleForm">
                <el-form-item label="科技服务标题：" prop="policyTitle">
                    <el-input v-model="ruleForm.policyTitle"
                              placeholder="请输入科技服务标题"
                              style="width: 500px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label=" 科技服务类型：
                    " prop="classtType">
                    <el-select v-model="ruleForm.classtType" placeholder="请选择科技服务类型">
                        <el-option label="科技创新" value="01"></el-option>
                        <el-option label="技术合同登记" value="02"></el-option>
                        <el-option label="高企认定" value="03"></el-option>
                        <el-option label="科小认定" value="04"></el-option>
                        <el-option label="知识产权" value="05"></el-option>
                        <el-option label="科技服务机构" value="06"></el-option>
                        <el-option label="风险投资" value="07"></el-option>
                        <el-option label="天使投资" value="08"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科技服务简介：" prop="desc">
                    <!--<el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
                    <textarea
                        placeholder="请输入科技服务简介"
                        style="padding: 10px; width: 720px; height: 140px; font-size: 14px; color: #999; border-radius: 3px; border: solid 1px #cccccc;"/>
                </el-form-item>
                <el-form-item label="科技服务详情：" prop="infoDetail">
                    <textarea
                        v-model="infoDetail"
                        placeholder="请输入科技服务详情"
                        style="padding: 10px; width: 720px; height: 140px; font-size: 14px; color: #999; border-radius: 3px; border: solid 1px #cccccc;"/>

                </el-form-item>
                <el-form-item label="科技服务标签：" prop="tags">
                    标签组件
                </el-form-item>
                <el-form-item label="发布人：">
                    发布人
                </el-form-item>

                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        action="uploadUrl"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <button class="btn-upload">附件上传</button>
                        <div slot="tip" class="el-upload__tip">（科技服务支持pdf/word/excel等类型文件，大小10M内）</div>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <p class="scan"><span class="scan-1">预</span><span>览</span></p>
                </el-form-item>
                <el-form-item>
                    <div class="btn-group">
                        <button class="my-btn btn_zc" @click="temporaryStorage('ruleForm')">暂存</button>
                        <button class="my-btn btn_cj" @click="submitForm('ruleForm')">创建</button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import Index from "../../../parkHall/property/propertyManager/equitmentInput/index";

    export default {
        components: {
            Index,
            EsspBreadCrumb
        },
        data() {
            return {
                applyType: this.$route.query.applyType,
                breadlist_01: [
                    {
                        path: "/parkHome",
                        name: "系统管理"
                    },
                    {
                        path: "",
                        name: "发布管理"
                    },
                    {
                        path: "",
                        name: "发布政策法规"
                    }
                ],
                breadlist_02: [
                    {
                        path: "/parkHome",
                        name: "系统管理"
                    },
                    {
                        path: "",
                        name: "发布管理"
                    },
                    {
                        path: "",
                        name: "发布科技服务"
                    }
                ],
                parkId: sessionStorage.getItem("parkId") || "",
                id: this.$route.query.id || "",
                ruleForm: {
                    policyTitle: '',
                    classtType: '',
                    desc: '',
                    infoDetail: '',
                    tags: []
                },
                rules_01: {
                    policyTitle: [
                        {required: true, message: '请输入政策法规标题', trigger: 'blur'},
                        // {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请填政策法规简介', trigger: 'blur'}
                    ],
                    infoDetail: [
                        {required: true, message: '请填写政策法规详情', trigger: 'blur'}
                    ],
                    tags: [
                        {required: true, message: '请填写政策法规标签', trigger: 'blur'}
                    ]
                },
                rules_02: {
                    policyTitle: [
                        {required: true, message: '请输入科技服务标题', trigger: 'blur'},
                        // {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    classtType: [
                        {required: true, message: '请选择科技服务类型', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填科技服务简介', trigger: 'blur'}
                    ],
                    infoDetail: [
                        {required: true, message: '请填写科技服务详情', trigger: 'blur'}
                    ],
                    tags: [
                        {required: true, message: '请填写科技服务标签', trigger: 'blur'}
                    ]
                },

                // 附件上传路由
                fileList: [],
                uploadUrl: this.$apiUrl.upload.upload
            }
        },
        methods: {

            // 创建事件
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        // 处理附件上传
                        let fileUrl = '';
                        for (let i = 0; i < this.fileList.length; i++) {
                            fileUrl += this.fileList[i].url;
                            if (i !== this.fileList.length - 1) {
                                fileUrl += ',';
                            }
                        }
                        this.ruleForm.fileUrl = fileUrl;

                        // 政策法规不需要服务类型这个字段
                        if (this.applyType === '01') {
                            delete this.ruleForm.classtType;
                        }

                        this.$post("/policy/savePolicyTech", this.ruleForm).then(response => {
                            let codestatus = response.resultCode;
                            if (codestatus == "CLT000000000") {
                                if (this.applyType === '01') {
                                    this.$message.success("创建政策法规成功！");
                                }
                                if (this.applyType === '02') {
                                    this.$message.success("创建科技服务成功！");
                                }
                            } else {
                                this.$message.info(response.resultMsg);
                            }
                        }, err => {
                            this.$message.error("接口异常");
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 暂存事件
            temporaryStorage(formName) {
                // this.$refs[formName].resetFields();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('暂存事件');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             * 附件上传事件---开始
             */
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
            /**
             * 附件上传事件---结束
             */
        },
        created() {
        },
    }
</script>

<style lang='less' scoped>
    .publish-sciAnd-tech-policy-wrap {
        width: 1200px;
        background: #fff;
        margin: 0 auto 20px;
        .publish-title {
            margin-top: 66px;
            margin-bottom: 95px;
            font-size: 24px;
            color: #333333;
            text-align: center;
            i {
                display: inline-block;
                width: 70px;
                border: 1px solid #ddd;
                position: relative;
                top: -6px;
            }
        }

        .publist-form {
            padding: 0 125px 60px;
            .upload-demo {
                .btn-upload {
                    display: inline-block;
                    width: 100px;
                    height: 35px;
                    line-height: 35px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999;
                    border-radius: 5px;
                    border: solid 1px #cccccc;
                    background-color: #fff;
                    outline: none;
                    cursor: pointer;
                }
                .el-upload__tip {
                    display: inline-block;
                    margin-left: 15px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 40px;
                    letter-spacing: 0.4px;
                    color: #999999;
                }
            }
            .scan {
                width: 100px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #00a0e9;
                border-radius: 3px;
                background-color: #e6f4ff;
                cursor: pointer;
                span {
                    display: inline-block;
                }
                .scan-1 {
                    margin-right: 5px;
                }
            }
            .btn-group {
                text-align: center;
                .my-btn {
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    background-color: #00a0e9;
                    cursor: pointer;
                }
                .btn_zc {
                    margin-right: 125px;
                }
            }
        }
    }
</style>
