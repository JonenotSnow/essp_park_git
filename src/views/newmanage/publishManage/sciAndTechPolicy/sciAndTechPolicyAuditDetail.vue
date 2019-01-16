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
                        <div v-html="satpDate.infoDetail"></div>
                    </div>
                </el-form-item>
                <el-form-item label="政策法规标签：" prop="tags">
                    <div class="my-style">
                        <span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <!--<div class="my-style">{{userInfo.truename}}</div>-->
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：">
                    <div class="my-style" v-for="(item, index) in satpDate.fileUrl" :key="index">{{item.name}}</div>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
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
                    <div class="my-style audit-opinion">同意发布</div>
                </el-form-item>
            </el-form>


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
                        <div v-html="satpDate.infoDetail"></div>
                    </div>
                </el-form-item>
                <el-form-item label="科技服务标签：" prop="tags">
                    <div class="my-style">
                        <span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <!--<div class="my-style">{{userInfo.truename}}</div>-->
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：">
                    <div class="my-style" v-for="(item, index) in satpDate.fileUrl" :key="index">{{item.name}}</div>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
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
                    <div class="my-style audit-opinion">同意发布</div>
                </el-form-item>
            </el-form>
        </div>
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
                userInfo: this.SSH.getItem("userInfo"), // 获取用户信息

                breadlist_01: [
                    {
                        path: "/parkHall/manage/baseInfo1",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicy/policieAndRegulation",
                        name: "发布管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicy/policieAndRegulation",
                        name: "发布政策法规"
                    },
                    {
                        path: "",
                        name: "审核详情"
                    }
                ],
                breadlist_02: [
                    {
                        path: "/parkHall/manage/baseInfo1",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicy/policieAndRegulation",
                        name: "发布管理"
                    },
                    {
                        path: "/parkHall/manage/sciAndTechPolicy/sciAndTechService",
                        name: "发布科技服务"
                    },
                    {
                        path: "",
                        name: "审核详情"
                    }
                ],


                satpDate: {},
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
            }
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
            .demo-ruleForm-Next {
                padding-bottom: 60px;
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
                padding: 0px 15px;
                width: 570px;
                height: 180px;
                border-radius: 3px;
                border: solid 1px #00a0e9;
                background-color: #ffffff;
            }
        }
    }
</style>
