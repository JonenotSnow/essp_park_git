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
                <el-form-item label="政策法规简介：" prop="desc">
                    <div class="my-style">{{satpDate.desc}}</div>
                </el-form-item>
                <el-form-item label="政策法规详情：" prop="infoDetail">
                    <div class="my-style">
                        <div v-html="satpDate.infoDetail"></div>
                    </div>
                </el-form-item>
                <el-form-item label="政策法规标签：" prop="tags">
                    <div class="my-style">
                        <span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：">
                    <div class="my-style" v-for="(item, index) in satpDate.fileUrl" :key="index">{{item.name}}</div>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
            <div class="audit-opinion">
                <button class="audit-btn audit-success" @click="showDialog('02')">通过</button>
                <button class="audit-btn audit-reject" @click="showDialog('12')">不通过</button>
            </div>
        </div>

        <!--！！！！！！科技服务表格！！！！！！-->
        <div class="publist-form" v-if="applyType === '02'">
            <el-form :rules="rules_02" label-width="125px" class="demo-ruleForm">
                <el-form-item label="科技服务标题：" prop="policyTitle">
                    <div class="my-style">{{satpDate.policyTitle}}</div>
                </el-form-item>
                <el-form-item label=" 科技服务类型：" prop="classtType">
                    <div class="my-style">{{satpDate.classtType}}</div>
                </el-form-item>
                <el-form-item label="科技服务简介：" prop="desc">
                    <div class="my-style">{{satpDate.desc}}</div>
                </el-form-item>
                <el-form-item label="科技服务详情：" prop="infoDetail">
                    <div class="my-style">
                        <div v-html="satpDate.infoDetail"></div>
                    </div>
                </el-form-item>
                <el-form-item label="科技服务标签：" prop="tags">
                    <div class="my-style">
                        <span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：">
                    <div class="my-style" v-for="(item, index) in satpDate.fileUrl" :key="index">{{item.name}}</div>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
            <div class="audit-opinion">
                <button class="audit-btn audit-success" @click="showDialog('02')">通过</button>
                <button class="audit-btn audit-reject" @click="showDialog('12')">不通过</button>
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

    export default {
        components: {
            EsspBreadCrumb
        },
        data() {
            return {
                parkId: sessionStorage.getItem("parkId") || "",
                applyType: this.$route.query.applyType,
                id: this.$route.query.id || "",

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
                    },
                    {
                        path: "",
                        name: "审核详情"
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
                    },
                    {
                        path: "",
                        name: "审核详情"
                    }
                ],


                // 详情数据
                satpDate: {},
                rules_01: {
                    policyTitle: [
                        {required: true, message: '请输入政策法规标题', trigger: 'blur'},
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
                        this.satpDate.tagsTxt = this.satpDate.tagsTxt.split(',');

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
                            path: '/sciIndex/policieAndRegulation/policieAndRegulation'
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
        created() {
            this.getSatpDate();
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
            .demo-ruleForm {
                padding: 0 125px;
            }

            .my-style {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.1px;
                color: #999;
                .my-tag {
                    margin-right: 20px;
                    padding: 7px 16px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #fff;
                    border-radius: 3px;
                    background-color: #cccccc;
                }
            }
            .audit-line {
                margin-bottom: 20px;
                border-bottom: 1px solid #ccc;
            }
            .audit-opinion {
                margin: 60px auto 0;
                padding-bottom: 60px;
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
                    color: #ccc;
                    border-radius: 3px;
                    border: solid 1px #00a0e9;
                    background-color: #ffffff;
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
