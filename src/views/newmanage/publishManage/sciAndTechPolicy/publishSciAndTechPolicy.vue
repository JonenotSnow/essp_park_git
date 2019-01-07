<template>
    <div id="publishAchievement">
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <p class='Otitle'>
            <i></i>
            科技政策
            <i></i>
        </p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="科技服务标题：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="科技服务类型：" prop="type">
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
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="科技服务详情：" prop="detail">
                等编辑器
            </el-form-item>
            <el-form-item label="科技服务标签：" prop="tags">
                标签组件
            </el-form-item>
            <el-form-item label="发布人：" prop="issuer">
                <el-input v-model="ruleForm.issuer"></el-input>
            </el-form-item>
            <el-form-item>
                <p class="scan">预览</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";

    export default {
        components: {
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
        },
    }
</script>

<style lang='less' scoped>
    #publishAchievement {
        width: 1200px;
        background: #fff;
        margin: 0 auto;
        .Otitle {
            font-size: 24px;
            line-height: 36px;
            margin-bottom: 20px;
            margin-top: 60px;
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
    }
</style>
