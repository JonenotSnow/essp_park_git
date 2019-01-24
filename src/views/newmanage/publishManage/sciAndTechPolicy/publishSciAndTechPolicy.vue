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
                <el-form-item label="政策法规简介：" prop="approveComment">
                    <!--<el-input type="textarea" v-model="ruleForm.approveComment"/>-->
                    <textarea
                        maxlength="300"
                        class="my-approve-comment"
                        v-model="ruleForm.approveComment"
                        placeholder="请输入政策法规简介"
                    />
                </el-form-item>
                <el-form-item label="政策法规详情：" prop="infoDetail" class="my-detail-edit">
                    <div class="my-quill-edit-wrap-ss">
                        <quill-editor
                            ref="myTextEditor"
                            :options="editorOption"
                            v-model="ruleForm.infoDetail"
                        >
                            <div id="toolbar" slot="toolbar"></div>
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item label="政策法规标签：" class="labelxing">
                    <div class="inline_div_tag">
                        <essp-add-tag
                            ref="eat"
                            :showtags="this.showTags"
                            @showTagWin="showTagWin"
                            @delTag="delTag"
                            @initTag="initTag"
                            :tagprops="tagprops"
                        ></essp-add-tag>
                    </div>
                    <essp-tag @showtag="closetag" :centerDialogVisible="visible" :tagprops="tagprops"></essp-tag>
                    <div class="el-form-item__error" v-show="isShowTag">请选择标签</div>
                </el-form-item>
                <el-form-item label="发布人：" v-if="userInfo">
                    {{userInfo.truename}}
                </el-form-item>
                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        action="#"
                        :limit="4"
                        :on-remove="removeList"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList">
                        <span class="btn-upload">附件上传</span>
                        <div slot="tip" class="el-upload__tip">（政策法规支持pdf/word/excel等类型文件，大小10M内）</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <p class="scan" @click="handleScan()"><span class="scan-1">预</span><span>览</span></p>
                </el-form-item>
                <el-form-item>
                    <div class="btn-group">
                        <span class="my-btn btn_zc" @click="temporaryStorage('ruleForm', '0')">暂存</span>
                        <span class="my-btn btn_cj" @click="submitForm('ruleForm', '1')">创建</span>
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
                <el-form-item label="科技服务简介：" prop="approveComment">
                    <!--<el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
                    <textarea
                        maxlength="300"
                        class="my-approve-comment"
                        v-model="ruleForm.approveComment"
                        placeholder="请输入科技服务简介"
                    />
                </el-form-item>
                <el-form-item label="科技服务详情：" prop="infoDetail" class="my-detail-edit">
                    <div class="my-quill-edit-wrap-ss">
                        <quill-editor
                            ref="myTextEditor"
                            :options="editorOption"
                            v-model="ruleForm.infoDetail"
                        >
                            <div id="toolbar" slot="toolbar"></div>
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item label="科技服务标签：" class="labelxing">
                    <div class="inline_div_tag">
                        <essp-add-tag
                            ref="eat"
                            :showtags="this.showTags"
                            @showTagWin="showTagWin"
                            @delTag="delTag"
                            @initTag="initTag"
                            :tagprops="tagprops"
                        ></essp-add-tag>
                    </div>
                    <essp-tag @showtag="closetag" :centerDialogVisible="visible" :tagprops="tagprops"></essp-tag>
                    <div class="el-form-item__error" v-show="isShowTag">请选择标签</div>
                </el-form-item>
                <el-form-item label="发布人：">
                    {{userInfo.truename}}
                </el-form-item>

                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        action="#"
                        :limit="4"
                        :on-remove="removeList"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList">
                        <span class="btn-upload">附件上传</span>
                        <div slot="tip" class="el-upload__tip">（政策法规支持pdf/word/excel等类型文件，大小10M内）</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <p class="scan" @click="handleScan()"><span class="scan-1">预</span><span>览</span></p>
                </el-form-item>
                <el-form-item>
                    <div class="btn-group">
                        <span class="my-btn btn_zc" @click="temporaryStorage('ruleForm', '0')">暂存</span>
                        <span class="my-btn btn_cj" @click="submitForm('ruleForm', '1')">创建</span>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!-- 预览弹窗start -->
        <el-dialog
            class="my-scan-dialog"
            :visible.sync="dialogVisible"
            width="1200px"
            :before-close="handleClose"
        >
            <div class="my-scan-main">
                <div class="main-head">
                    <div class="head-title" v-if="this.ruleForm.policyTitle">{{this.ruleForm.policyTitle}}</div>
                    <div class="head-tag" v-if="this.showTags && this.showTags.length > 0">
                        <!--<span v-for="(item, index) in this.ruleForm.tags" :key="index">{{item}}</span>-->
                        <essp-park-tag
                            v-for="(item, index) in this.showTags"
                            :key="index"
                            :value="item"
                        />
                    </div>
                </div>
                <div class="main-body">
                    <!--<div v-html="this.ruleForm.infoDetail"></div>-->
                    <div class="ql-container ql-snow bord-none">
                        <div class="ql-editor" v-html="this.ruleForm.infoDetail"></div>
                    </div>
                </div>
                <div class="main-foot" v-if="this.fileList && this.fileList.length > 0">
                    <p class="attachment-p attachment-title">附件下载：</p>
                    <p class="attachment-p attachment-main"
                       v-for="(item, index) in this.fileList"
                       :key="index"
                    >
                        <a :href="item.url" :download="item.name">·附件{{index+1}}：{{item.name}}</a>
                    </p>
                </div>
            </div>
        </el-dialog>
        <!-- 预览弹窗end -->

    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import EsspTag from "@/components/EsspTag";
    import EsspAddTag from "@/components/EsspAddTag";
    import EsspEditor from "@/components/EsspEditor";

    import EsspParkTag from "@/components/EsspParkTag";


    export default {
        components: {
            EsspBreadCrumb,
            EsspTag,
            EsspAddTag,
            EsspEditor,
            EsspParkTag
        },
        data() {
            return {
                breadlist_01: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicy/policieAndRegulation",
                        name: "发布管理"
                    },
                    {
                        path: "",
                        name: "政策法规"
                    }
                ],
                breadlist_02: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicy/policieAndRegulation",
                        name: "发布管理"
                    },
                    {
                        path: "",
                        name: "科技服务"
                    }
                ],

                parkId: sessionStorage.getItem("parkId") || "20181217093701001",
                applyType: this.$route.query.applyType,
                id: this.$route.query.id || "",
                nuType: this.$route.query.nuType || "",
                userInfo: this.SSH.getItem("userInfo"), // 获取用户信息

                showTags: [], // 细节处理，
                isShowTag: false,
                ruleForm: {
                    policyTitle: '',
                    classtType: '',
                    approveComment: '',
                    infoDetail: '',
                    tags: []
                },

                // 编辑器提示语
                // editorOption: {
                //     placeholder: "请输入模板内容",
                //     theme: "snow"
                // },

                rules_01: {
                    policyTitle: [
                        {required: true, message: '请输入政策法规标题', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ],
                    approveComment: [
                        {required: true, message: '请填政策法规简介', trigger: 'blur'},
                        {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
                    ],
                    infoDetail: [
                        {required: true, message: '请填写政策法规详情', trigger: 'blur'}
                    ],
                    // tags: [
                    //     {required: true, message: '请填写政策法规标签', trigger: 'blur'}
                    // ]
                },
                rules_02: {
                    policyTitle: [
                        {required: true, message: '请输入科技服务标题', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ],
                    classtType: [
                        {required: true, message: '请选择科技服务类型', trigger: 'change'}
                    ],
                    approveComment: [
                        {required: true, message: '请填科技服务简介', trigger: 'blur'},
                        {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
                    ],
                    infoDetail: [
                        {required: true, message: '请填写科技服务详情', trigger: 'blur'}
                    ],
                    // tags: [
                    //     {required: true, message: '请填写科技服务标签', trigger: 'blur'}
                    // ]
                },

                // 标签相关字段
                visible: false,
                tagprops: {
                    lblTpCd: "3000004",
                    entId: ""
                },

                // 附件上传字段
                fileList: [],

                // 预览事件相关字段
                dialogVisible: false,
            }
        },
        methods: {
            // 编辑器的值获取
            onEditorChange(val) {
                this.ruleForm.infoDetail = val;
            },
            /**
             * 标签相关字段---开始
             *  */
            closetag({viewtags}) {
                this.visible = false;
                this.showTags = viewtags;
            },
            showTagWin() {
                this.visible = true;
            },
            delTag(tag) {
                this.showTags.splice(this.showTags.indexOf(tag), 1);
            },
            initTag(tmpTags) {
                this.showTags = tmpTags;
            },
            /**
             * 标签相关字段---结束
             *  */

            // 创建事件
            submitForm(formName, saveType) {

                // 处理标签---先处理，再验证
                let _this = this;
                _this.isShowTag = false;
                if (this.showTags.length <= 0) {
                    _this.isShowTag = true;
                    clearTimeout(this.timer);
                    _this.timer = setTimeout(function () {
                        _this.isShowTag = false;
                    }, 2000)

                    return;
                }

                if (this.showTags && this.showTags.length > 0) {
                    let tags = this.showTags.join(',');
                    this.ruleForm.tags = tags;
                }

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        this.ruleForm.parkId = this.parkId;

                        this.ruleForm.saveType = saveType;

                        // 区分政策或者法规
                        this.ruleForm.applyType = this.applyType;

                        // 处理附件上传
                        this.ruleForm.fileUrl = this.fileList;

                        // 政策法规不需要服务类型这个字段
                        if (this.applyType === '01') {
                            delete this.ruleForm.classtType;
                        }

                        this.$post("/policy/savePolicyTech", this.ruleForm).then(response => {
                            let codestatus = response.resultCode;
                            if (codestatus == "CLT000000000") {
                                if (this.applyType === '01') {
                                    if (this.id) {
                                        if (this.nuType === '0') {
                                            this.$message.success("政策法规创建成功！");
                                        } else {
                                            this.$message.success("政策法规修改成功！");
                                        }
                                    } else {
                                        this.$message.success("政策法规创建成功！");
                                    }
                                    this.$router.push({
                                        path: '/parkHall/manage/sciAndTechPolicy/policieAndRegulation'
                                    });
                                }
                                if (this.applyType === '02') {
                                    if (this.id) {
                                        if (this.nuType === '0') {
                                            this.$message.success("科技服务创建成功！");
                                        } else {
                                            this.$message.success("科技服务修改成功！");
                                        }
                                    } else {
                                        this.$message.success("科技服务创建成功！");
                                    }
                                    this.$router.push({
                                        path: '/parkHall/manage/sciAndTechPolicy/sciAndTechService'
                                    });
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
            temporaryStorage(formName, saveType) {
                // this.$refs[formName].resetFields();

                // 处理标签---先处理，再验证
                let _this = this;
                _this.isShowTag = false;
                if (this.showTags.length <= 0) {
                    _this.isShowTag = true;
                    clearTimeout(this.timer);
                    _this.timer = setTimeout(function () {
                        _this.isShowTag = false;
                    }, 2000)

                    return;
                }

                if (this.showTags && this.showTags.length > 0) {
                    let tags = this.showTags.join(',');
                    this.ruleForm.tags = tags;
                }

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        this.ruleForm.parkId = this.parkId;

                        this.ruleForm.saveType = saveType;

                        // 区分政策或者法规
                        this.ruleForm.applyType = this.applyType;


                        // 处理附件上传
                        this.ruleForm.fileUrl = this.fileList;

                        // 政策法规不需要服务类型这个字段
                        if (this.applyType === '01') {
                            delete this.ruleForm.classtType;
                        }

                        this.$post("/policy/savePolicyTech", this.ruleForm).then(response => {
                            let codestatus = response.resultCode;
                            if (codestatus == "CLT000000000") {
                                if (this.applyType === '01') {
                                    this.$message.success("政策法规暂存成功！");
                                    this.$router.push({
                                        path: '/parkHall/manage/sciAndTechPolicy/policieAndRegulation',
                                        query: {
                                            status: '0'
                                        }
                                    });
                                }
                                if (this.applyType === '02') {
                                    this.$message.success("科技服务暂存成功！");
                                    this.$router.push({
                                        path: '/parkHall/manage/sciAndTechPolicy/sciAndTechService',
                                        query: {
                                            status: '0'
                                        }
                                    });
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

            // 获取详情，编辑页面使用
            getDateForEdit() {
                let params = {
                    id: this.id
                };
                this.$post("/policy/getPolById", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {

                        this.ruleForm = response.resultData;

                        // 删除时间“createTime”这个字段
                        delete this.ruleForm.createTime;

                        // 处理标签
                        if (response.resultData.tagsTxt) {
                            this.showTags = response.resultData.tagsTxt.split(",");
                        } else {
                            this.showTags = [];
                        }
                        this.tagprops.entId = window.sessionStorage.getItem("parkId") + "_" + response.resultData.id; //获取标签
                        // 处理附件
                        if (this.ruleForm.fileUrl) {
                            let fileList = JSON.parse(this.ruleForm.fileUrl);

                            fileList.forEach((item, index) => {
                                var obj = {
                                    name: item.name,
                                    url: item.url
                                };
                                this.fileList.push(obj);
                            })
                        }


                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            },

            /**
             * 标签相关方法---开始
             */

            /**
             * 标签相关方法---结束
             */

            /**
             * 附件上传事件---开始
             */
            beforeAvatarUpload(file) {

                let flieName = file.name;
                let fileType = flieName.substring(flieName.lastIndexOf(".") + 1).toLowerCase();

                // fileType === "zip" 格式不支持
                const isFile = fileType === "docx" || fileType === "doc" || fileType === "xls" || fileType === "xlsx" || fileType === "pdf";
                const isLt5M = file.size / 1024 / 1024 < 2;

                if (!isFile) {
                    this.$message.error("上传的附件只能是docx、doc、xls、xlsx、pdf格式！");
                    return isFile;
                }
                if (!isLt5M) {
                    this.$message.error("上传文件大小不能超过5MB!");
                    return isLt5M;
                }

                if (this.fileList && this.fileList.length == 3) {
                    this.$message.warning('附件只能上传的上限为3个');
                    return false;
                }

                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "sciAndTechPolicy"); // 通过append向form对象添加数据

                this.$post(this.$apiUrl.upload.upload, param).then(
                    response => {
                        var obj = {
                            name: file.name,
                            url: response.resultData[0].url
                        };
                        this.fileList.push(obj);
                    },
                    err => {
                        this.$message.error("接口异常");
                    }
                );
                return false; // 返回false不会自动上传
            },
            removeList(file, fileList) {
                console.log(fileList);
                this.fileList = fileList;
            },
            /**
             * 附件上传事件---结束
             */

            // 预览事件---开始
            handleScan() {
                this.dialogVisible = true;
            }
        },
        created() {
            if (this.id) {
                this.getDateForEdit();
            }
        },
    }
</script>
<style>
    .labelxing {
        position: relative;
    }

    .labelxing .el-form-item__label:before {
        content: "*";
        margin-right: 4px;
        color: #f56c6c;
    }
</style>
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

            .my-approve-comment {
                margin: 0;
                padding: 10px;
                width: 720px;
                /*height: 140px;*/
                height: 155px;
                font-size: 14px;
                color: #606266;
                border-radius: 3px;
                border: solid 1px #cccccc;
                resize: none;
                outline: none;
                &::-webkit-input-placeholder {
                    color: #ccc;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #ccc;
                }
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #ccc;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    color: #ccc;
                }
            }

            .my-detail-edit {
                /*.ql-container {*/
                /*height: 170px;*/
                /*}*/
                /*.el-form-item__content {*/
                /*line-height: normal;*/
                /*}*/
            }

            .inline_div_tag {
                /*border: 1px solid red;*/
                float: left;
                /*width: 40%;*/
                line-height: 40px;
            }
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
                    display: inline-block;
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

        /*预览样式*/
        .my-scan-dialog {
            .my-scan-main {
                .main-head {
                    .head-title {
                        height: 25px;
                        line-height: 25px;
                        text-align: center;
                        font-size: 24px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #333;
                    }
                    .head-info {
                        margin-top: 35px;
                        text-align: center;
                        .info-p {
                            display: inline-block;
                            font-size: 12px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #999;
                        }
                        .release-time {
                            margin-right: 38px;
                        }
                    }

                    .head-tag {
                        margin-top: 30px;
                        text-align: center;
                        span {
                            margin-right: 20px;
                            padding: 5px 8px;
                            width: 40px;
                            color: #fff;
                            background-color: #cccccc;
                        }
                    }
                }
                .main-body {
                    padding: 40px 50px 0;
                    .ql-snow {
                        padding: 0 110px;
                        .ql-editor {
                            border: none;
                        }
                    }
                }
                .main-foot {
                    padding: 60px 50px 0;
                    .attachment-p {
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 30px;
                        letter-spacing: 0px;
                        color: #666666;
                    }
                    .attachment-title {

                    }
                    .attachment-main {
                        text-indent: 1rem;
                        a {
                            &:hover {
                                color: #00a0e9;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }

    }
</style>
