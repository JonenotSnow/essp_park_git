<template>
    <div class="publish-sciAnd-tech-policy-wrap" id="publishAchievement">
        <essp-bread-crumb :breadList="breadlist_01" v-if="applyType === '01'"/>
        <essp-bread-crumb :breadList="breadlist_02" v-if="applyType === '02'"/>
        <div class="publish-title">
            <i></i>审核详情<i></i>
        </div>
        <!--！！！！！！政策法规表格！！！！！！-->
        <div class="publist-form" v-if="applyType === '01'">
            <el-form :rules="rules_01" label-width="125px" class="demo-ruleForm">
                <el-form-item label="政策法规标题：" prop="policyTitle">
                    <div class="my-style">{{satpDate.policyTitle}}</div>
                </el-form-item>
                <el-form-item label="政策法规简介：" prop="approveComment">
                    <div class="my-style">{{satpDate.approveComment}}</div>
                </el-form-item>
                <el-form-item label="政策法规详情：" prop="infoDetail">
                    <div class="my-style">
                        <div class="ql-container ql-snow bord-none">
                            <div class="ql-editor" v-html="satpDate.infoDetail"></div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="政策法规标签：" prop="tags">
                    <div class="my-style" v-if="satpDate.tagsTxt && satpDate.tagsTxt.length > 0">
                        <!--<span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>-->
                        <essp-park-tag
                            v-for="(item, index) in satpDate.tagsTxt"
                            :key="index"
                            :value="item"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：" v-if="fileList && fileList.length > 0">
                    <!--v-if="fileList && fileList.length > 0"-->
                    <a class="my-style my-file-list"
                       :href="item.url"
                       :download="item.name"
                       v-for="(item, index) in fileList" :key="index"
                    >{{item.name}}</a>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
            <div class="audit-opinion" v-if="(userType == '34') && auditStatus== '13'">
                <button class="audit-btn audit-success" @click="showDialog('02')">通过</button>
                <button class="audit-btn audit-reject" @click="showDialog('12')">不通过</button>
            </div>
            <div v-else>
                <el-form :rules="rules_01" label-width="125px" class="demo-ruleForm demo-ruleForm-Next">
                    <el-form-item label="审核结果：">
                        <p v-if="satpDate.status == '12'">
                            <i class="icon iconfont icon-butongguo"
                               style="margin-right:10px; color: #fe696c;"></i><span>不通过</span>
                        </p>
                        <p v-if="satpDate.status== '02'">
                            <i class="icon iconfont icon-zhengque"
                               style="margin-right:10px; color: #6bde73"></i><span>通过</span>
                        </p>
                    </el-form-item>
                    <el-form-item label="审核意见：">
                        <div class="my-style audit-opinion-show">{{lastComment.mark || '暂无'}}</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!--！！！！！！科技服务表格！！！！！！-->
        <div class="publist-form" v-if="applyType === '02'">
            <el-form :rules="rules_02" label-width="125px" class="demo-ruleForm">
                <el-form-item label="科技服务标题：" prop="policyTitle">
                    <div class="my-style">{{satpDate.policyTitle}}</div>
                </el-form-item>
                <el-form-item label=" 科技服务类型：" prop="classtType">
                    <div class="my-style" v-if="satpDate.classtType == '01'">科技创新</div>
                    <div class="my-style" v-if="satpDate.classtType == '02'">技术合同登记</div>
                    <div class="my-style" v-if="satpDate.classtType == '03'">高企认定</div>
                    <div class="my-style" v-if="satpDate.classtType == '04'">科小认定</div>
                    <div class="my-style" v-if="satpDate.classtType == '05'">知识产权</div>
                    <div class="my-style" v-if="satpDate.classtType == '06'">科技服务机构</div>
                    <div class="my-style" v-if="satpDate.classtType == '07'">风险投资</div>
                    <div class="my-style" v-if="satpDate.classtType == '08'">天使投资</div>
                </el-form-item>
                <el-form-item label="科技服务简介：" prop="approveComment">
                    <div class="my-style">{{satpDate.approveComment}}</div>
                </el-form-item>
                <el-form-item label="科技服务详情：" prop="infoDetail">
                    <div class="my-style">
                        <div class="ql-container ql-snow bord-none">
                            <div class="ql-editor  " v-html="satpDate.infoDetail"></div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="科技服务标签：" prop="tags">
                    <div class="my-style" v-if="satpDate.tagsTxt && satpDate.tagsTxt.length > 0">
                        <!--<span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>-->
                        <essp-park-tag
                            v-for="(item, index) in satpDate.tagsTxt"
                            :key="index"
                            :value="item"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：" v-if="fileList && fileList.length > 0">
                    <!--v-if="fileList && fileList.length > 0"-->
                    <a class="my-style my-file-list"
                       :href="item.url"
                       :download="item.name"
                       v-for="(item, index) in fileList" :key="index"
                    >{{item.name}}</a>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
            <div class="audit-opinion" v-if="(userType == '34') && auditStatus== '13'">
                <button class="audit-btn audit-success" @click="showDialog('02')">通过</button>
                <button class="audit-btn audit-reject" @click="showDialog('12')">不通过</button>
            </div>
            <div v-else>
                <el-form :rules="rules_02" label-width="125px" class="demo-ruleForm demo-ruleForm-Next">
                    <el-form-item label="审核结果：">
                        <p v-if="satpDate.status == '12'">
                            <i class="icon iconfont icon-butongguo"
                               style="margin-right:10px; color: #fe696c;"></i><span>不通过</span>
                        </p>
                        <p v-if="satpDate.status== '02'">
                            <i class="icon iconfont icon-zhengque"
                               style="margin-right:10px; color: #6bde73"></i><span>通过</span>
                        </p>
                    </el-form-item>
                    <el-form-item label="审核意见：">
                        <div class="my-style audit-opinion-show">{{lastComment.mark || '暂无'}}</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!--填写审核意见对话框---开始-->
        <el-dialog
            class="my-audit-opinion-dialog"
            :visible.sync="dialogVisible"
            width="670px"
            height="350px"
            :before-close="handleClose"
        >
            <div slot="title">
                <h3 class="my-audit-title">填写审核意见</h3>
            </div>
            <div class="my-audit-opinion">
                <textarea placeholder="请输入审核意见" v-model="mark">
                </textarea>
            </div>
            <div class="btn-submit-wrap">
                <button class="btn-submit" @click="submit()">提&nbsp;&nbsp;&nbsp;交</button>
            </div>
        </el-dialog>
        <!--填写审核意见对话框---开始-->

    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import EsspParkTag from "@/components/EsspParkTag";


    export default {
        components: {
            EsspBreadCrumb,
            EsspParkTag
        },
        data() {
            return {
                // 获取用户权限信息
                LoginUserRol: "",
                userType: '',
                parkId: sessionStorage.getItem("parkId") || "",
                applyType: this.$route.query.applyType,
                id: this.$route.query.id || "",
                auditStatus: this.$route.query.status || "",    // 02 已通过，12 拒绝，13 待审核

                breadlist_01: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicyAudit",
                        name: "审核管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicyAudit",
                        name: "发布审核"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicyAudit",
                        name: "政策法规"
                    },
                    {
                        path: "",
                        name: "审核详情"
                    }
                ],
                breadlist_02: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicyAudit",
                        name: "审核管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicyAudit",
                        name: "发布审核"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicyAudit",
                        name: "科技服务"
                    },
                    {
                        path: "",
                        name: "审核详情"
                    }
                ],

                // 审核详情列表
                commentList: [],    // 审核详情列表
                lastComment: {},    // 最新审核意见


                // 详情数据
                satpDate: {},
                fileList: [],   // 附件字段
                rules_01: {
                    policyTitle: [
                        {required: true, message: '请输入政策法规标题', trigger: 'blur'},
                    ],
                    approveComment: [
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
                    ],
                    classtType: [
                        {required: true, message: '请选择科技服务类型', trigger: 'change'}
                    ],
                    approveComment: [
                        {required: true, message: '请填科技服务简介', trigger: 'blur'}
                    ],
                    infoDetail: [
                        {required: true, message: '请填写科技服务详情', trigger: 'blur'}
                    ],
                    tags: [
                        {required: true, message: '请填写科技服务标签', trigger: 'blur'}
                    ]
                },

                // 填写审核意见事件相关字段
                dialogVisible: false,
                status: '',
                mark: '',


            }
        },
        methods: {
            // 获取详情事件--- /policy/getPolById
            /**
             * 获取“科技政策”的详情数据
             */
            getSatpDate() {
                let params = {
                    id: this.id
                };
                this.$post("/policy/getPolById", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.satpDate = response.resultData;

                        // 对标签进行处理
                        if (this.satpDate.tagsTxt) {
                            this.satpDate.tagsTxt = this.satpDate.tagsTxt.split(',');
                        }

                        // 对附件进行处理
                        if (this.satpDate.fileUrl) {
                            let fileList = JSON.parse(this.satpDate.fileUrl);

                            fileList.forEach((item, index) => {
                                var obj = {
                                    name: item.name,
                                    url: item.url
                                };
                                this.fileList.push(obj);
                            })
                        }
                    }
                    else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            },

            /**
             * 获取“科技政策”的审核详情
             */
            getCommentList() {
                let params = {
                    parkId: this.parkId,
                    entityId: this.id
                };
                this.$post("/audit/getCommentList", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.commentList = response.resultData;

                        if (this.commentList.length > 0) {
                            this.lastComment = this.commentList[0];
                        }

                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            },

            /**
             * 填写审核意见操作相关事件---开始
             */
            // 弹窗
            showDialog(status) {
                this.dialogVisible = true;
                this.status = status
            },
            // 提交事件
            submit() {

                if (this.mark == '') {
                    this.$message.warning('审核意见不能为空，请输入您的审核意见');
                    return;
                }

                let params = {
                    parkId: this.parkId,
                    entityId: this.id,
                    status: this.status,
                    mark: this.mark,
                };
                this.$post("/audit/policy", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.satpDate = response.resultData;
                        this.$router.push({
                            path: '/parkHall/manage/sciAndTechPolicyAudit'
                        });
                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            }
            /**
             * 填写审核意见操作相关事件---结束
             */

        },
        mounted() {
            this.LoginUserRol = this.SSH.getItem("LoginUserRol") || ''; // 获取用户权限
            this.userType = this.LoginUserRol[0];

        },
        created() {
            this.getSatpDate();
            this.getCommentList();
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
            padding-bottom: 60px;
            .demo-ruleForm {
                padding: 0 125px;
            }

            .my-style {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.1px;
                color: #999;
                .ql-snow {
                    border: none;
                }
                .my-tag {
                    /*display: inline-block;*/
                    /*margin-right: 20px;*/
                    /*!*padding: 7px 16px;*!*/
                    /*padding: 6px 16px;*/
                    /*height: 20px;*/
                    /*line-height: 20px;*/
                    /*font-size: 14px;*/
                    /*font-weight: normal;*/
                    /*font-stretch: normal;*/
                    /*letter-spacing: 0px;*/
                    /*color: #fff;*/
                    /*border-radius: 3px;*/
                    /*background-color: #cccccc;*/
                }
            }
            .my-file-list {
                display: inline-block;
                width: 100%;
            }

            .audit-line {
                margin-bottom: 20px;
                border-bottom: 1px solid #ccc;
            }
            .audit-opinion {
                margin: 60px auto 0;
                text-align: center;
                .audit-btn {
                    padding: 10px 30px;
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
                .audit-success {
                    margin-right: 125px;
                }
            }

            .audit-opinion-show {
                padding: 0px 15px;
                width: 570px;
                height: 180px;
                border-radius: 3px;
                border: solid 1px #00a0e9;
                background-color: #ffffff;
            }
        }

        .my-audit-opinion-dialog {
            .my-audit-title {
                margin-left: 13px;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333;
            }
            .my-audit-opinion {
                margin-top: -30px;
                margin-left: 15px;
                textarea {
                    padding: 10px 15px;
                    width: 570px;
                    height: 180px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #606266;
                    border-radius: 3px;
                    border: solid 1px #00a0e9;
                    background-color: #ffffff;
                    resize: none;
                    outline: none;
                    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                        color: #ccc;
                    }
                    &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                        color: #ccc;
                    }
                    &::-moz-placeholder { /* Mozilla Firefox 19+ */
                        color: #ccc;
                    }
                    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                        color: #ccc;
                    }
                }
            }

            .btn-submit-wrap {
                margin-top: 20px;
                margin-right: 13px;
                text-align: right;
                .btn-submit {
                    width: 100px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    border: none;
                    background-color: #00a0e9;
                    cursor: pointer;
                }
            }

        }

    }
</style>
