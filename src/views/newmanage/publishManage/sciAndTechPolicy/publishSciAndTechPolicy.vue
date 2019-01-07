<template>
    <div class="publish-sciAnd-tech-policy-wrap" id="publishAchievement">
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="publish-title">
            <i></i>发布科技服务<i></i>
        </div>
        <div class="publist-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
                <el-form-item label="科技服务标题：" prop="name">
                    <el-input v-model="ruleForm.name"
                              placeholder="请输入科技服务标题"
                              style="width: 500px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label=" 科技服务类型：
                    " prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择科技服务类型">
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
                <el-form-item label="科技服务详情：" prop="detail">
                    等编辑器
                </el-form-item>
                <el-form-item label="科技服务标签：" prop="tags">
                    标签组件
                </el-form-item>
                <el-form-item label="发布人：" prop="issuer">
                    <el-input v-model="ruleForm.issuer" placeholder="请输入发布人" style="width: 210px"></el-input>
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
                breadlist: [
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
                ruleForm: {
                    name: '',
                    type: '',
                    desc: '',
                    detail: {},
                    tags: [],
                    issuer: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入科技服务标题', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择科技服务类型', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填科技服务简介', trigger: 'blur'}
                    ],
                    detail: [
                        {required: true, message: '请填写科技服务详情', trigger: 'blur'}
                    ],
                    tags: [
                        {required: true, message: '请填写科技服务标签', trigger: 'blur'}
                    ],
                    issuer: [
                        {required: true, message: '请填写发明人', trigger: 'blur'}
                    ]

                }
            }
        },
        created() {

        },
        methods: {
            //图片上传
            beforeUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isJPG) {
                    this.$message.error("图片只支持jpg、png、gif等格式上传");
                    return isJPG;
                }
                if (!isLt5M) {
                    this.$message.error("上传图片大小不能超过 5MB!");
                    return isLt5M;
                }
                let param = new FormData();  // 创建form对象
                param.append('file', file);
                param.append('type', 'park');
                param.append('model', 'manageModuleOne');
                var _this = this;
                this.$post(this.$apiUrl.upload.upload, param).then(response => {

                }, err => {
                    this.$message.error("接口异常")
                })
                return false // 返回false不会自动上传
            },

            // 创建事件
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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
            }
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
            .el-input__inner {
                height: 35px;
                line-height: 35px;
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
                }
                .btn_zc {
                    margin-right: 125px;
                }
            }
        }
    }
</style>
