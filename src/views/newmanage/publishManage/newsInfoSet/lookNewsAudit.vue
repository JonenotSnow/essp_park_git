<template>
    <div class="publish-sciAnd-tech-policy-wrap" id="publishAchievement">
        <essp-bread-crumb :breadList="breadlist_01" v-if="applyType === '01'"/>
        <essp-bread-crumb :breadList="breadlist_02" v-if="applyType === '02'"/>
        <div class="publish-title">
            <i></i>审核详情<i></i>
        </div>

        <!--！！！！！！新闻动态表格！！！！！！-->
        <div class="publist-form" v-if="applyType === '01'">
            <el-form :rules="rules_01" label-width="125px" class="demo-ruleForm">
                <el-form-item label="新闻动态标题：" prop="informationTitle">
                    <div class="my-style">{{satpDate.informationTitle}}</div>
                </el-form-item>
                <el-form-item label="新闻简介：" prop="content">
                    <div class="my-style">{{satpDate.content}}</div>
                </el-form-item>
                <el-form-item label="新闻动态详情：" prop="infoDetail">
                    <div class="my-style ql-container ql-snow">
                        <div class="ql-editor" v-html="satpDate.infoDetail"></div>
                    </div>
                </el-form-item>
                <el-form-item label="新闻动态标签：" prop="tags">
                    <div class="my-style">
                        <span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <!--<div class="my-style">{{userInfo.truename}}</div>-->
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：">
                    <div class="my-style" v-for="(item, index) in fileList" :key="index">{{item.name}}</div>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
            <el-form :rules="rules_01" label-width="125px" class="demo-ruleForm demo-ruleForm-Next">
                <el-form-item label="审核结果：" v-if="satpDate.status !== '13'">
                    <p v-if="satpDate.status == '12'">
                        <i class="icon iconfont icon-butongguo"
                           style="margin-right:10px; color: #fe696c;"></i><span>不通过</span>
                    </p>
                    <p v-if="satpDate.status== '02'">
                        <i class="icon iconfont icon-zhengque"
                           style="margin-right:10px; color: #6bde73"></i><span>通过</span>
                    </p>
                </el-form-item>
                <el-form-item label="审核意见：" prop="mark">
                    <div><textarea class="my-style audit-opinion" name="" placeholder="暂无" v-model="lastComment.mark" v-bind:disabled="satpDate.status!== '13'"></textarea></div>
                </el-form-item>
            </el-form>
            <div class="audit-line" v-if="userInfo.userPostList.includes('34') && (satpDate.status== '13')"></div>
            <div class="audit-button" v-if="userInfo.userPostList.includes('34') && (satpDate.status== '13')">
                <span class="audit-btn audit-success" @click="submit('02')">通过</span><span class="audit-btn audit-reject" @click="submit('12')">不通过</span>
            </div>
        </div>

        <!--！！！！！！通知公告表格！！！！！！-->
        <div class="publist-form" v-if="applyType === '02'">
            <el-form :rules="rules_02" label-width="125px" class="demo-ruleForm">
                <el-form-item label="通知公告标题：" prop="informationTitle">
                    <div class="my-style">{{satpDate.informationTitle}}</div>
                </el-form-item>
                <el-form-item label="通知公告简介：" prop="content">
                    <div class="my-style">{{satpDate.content}}</div>
                </el-form-item>
                <el-form-item label="通知公告详情：" prop="infoDetail">
                    <div class="my-style ql-container ql-snow">
                        <div class="ql-editor" v-html="satpDate.infoDetail"></div>
                    </div>
                </el-form-item>
                <el-form-item label="通知公告标签：" prop="tags">
                    <div class="my-style">
                        <span class="my-tag" v-for="(item, index) in satpDate.tagsTxt" :key="index">{{item}}</span>
                    </div>
                </el-form-item>
                <el-form-item label="发布人：">
                    <!--<div class="my-style">{{userInfo.truename}}</div>-->
                    <div class="my-style">{{satpDate.userName}}</div>
                </el-form-item>
                <el-form-item label="附件：">
                    <div class="my-style" v-for="(item, index) in fileList" :key="index"><a :href="item.url" :download="item.name">{{item.name}}</a></div>
                </el-form-item>
            </el-form>
            <div class="audit-line"></div>
            <el-form :rules="rules_02" label-width="125px" class="demo-ruleForm demo-ruleForm-Next">
                <el-form-item label="审核结果：" v-if="satpDate.status !== '13'">
                    <p v-if="satpDate.status == '12'">
                        <i class="icon iconfont icon-butongguo"
                           style="margin-right:10px; color: #fe696c;"></i><span>不通过</span>
                    </p>
                    <p v-if="satpDate.status== '02'">
                        <i class="icon iconfont icon-zhengque"
                           style="margin-right:10px; color: #6bde73"></i><span>通过</span>
                    </p>
                </el-form-item>
                <el-form-item label="审核意见：" prop="mark">
                    <div><textarea class="my-style audit-opinion" name="" placeholder="暂无" v-model="lastComment.mark" v-bind:disabled="satpDate.status!== '13'"></textarea></div>
                </el-form-item>
            </el-form>
            <div class="audit-line" v-if="userInfo.userPostList.includes('34') && (satpDate.status== '13')"></div>
            <div class="audit-button" v-if="userInfo.userPostList.includes('34') && (satpDate.status== '13')">
                <span class="audit-btn audit-success" @click="submit('02')">通过</span><span class="audit-btn audit-reject" @click="submit('12')">不通过</span>
            </div>
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
                applyType: this.$route.query.applyType || '01',
                id: this.$route.query.id || "",
                userInfo: this.SSH.getItem("userInfo"), // 获取用户信息
                userType: '',
                breadlist_01: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/publicNews",
                        name: "新闻动态"
                    },
                    {
                        path: "",
                        name: "新闻动态审核详情"
                    }
                ],
                breadlist_02: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/publicNotice",
                        name: "通知公告"
                    },
                    {
                        path: "",
                        name: "通知公告审核详情"
                    }
                ],

                satpDate: {},
                fileList: [],   // 附件字段


                commentList: [],    // 审核详情列表
                lastComment: {},    // 最新审核意见

                rules_01: {
                    informationTitle: [
                        {required: true, message: '请输入新闻动态标题', trigger: 'blur'},
                        // {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入新闻动态简介', trigger: 'blur'}
                    ],
                    infoDetail: [
                        {required: true, message: '请输入新闻动态详情', trigger: 'blur'}
                    ],
                    tags: [
                        {required: true, message: '请输入新闻动态标签', trigger: 'blur'}
                    ],
                    mark: [
                        {required: true, message: '请输入审核意见', trigger: 'blur'}
                    ]
                },
                rules_02: {
                    informationTitle: [
                        {required: true, message: '请输入通知公告标题', trigger: 'blur'},
                        // {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入通知公告简介', trigger: 'blur'}
                    ],
                    infoDetail: [
                        {required: true, message: '请输入通知公告详情', trigger: 'blur'}
                    ],
                    tags: [
                        {required: true, message: '请输入通知公告标签', trigger: 'blur'}
                    ],
                    mark: [
                        {required: true, message: '请输入审核意见', trigger: 'blur'}
                    ]
                },
                dialogVisible: false,
                status: '',
            }
        },
        methods: {
            // 获取详情事件--- /policy/getPolById
            /**
             * 获取“科技政策”的详情数据
             */
            getSatpDate() {
                let params = {
                    informationId: this.id
                };
                this.$post("/information/getInfoById", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.satpDate = response.resultData;
                        console.log(this.satpDate.status)
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

                    } else {
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
            //审核按钮
            submit(status){
                if(!this.lastComment.mark){
                    this.$message.error("请填写审核意见");
                    return
                }
                let params = {
                    parkId: this.parkId,
                    entityId: this.id,
                    status: status,
                    mark: this.lastComment.mark
                }
                this.$post("/audit/infomation", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.$message.info(response.resultMsg);
                        this.$router.push({
                            path: '/parkHall/manage/newsNoticeAudit'
                        });

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
            .audit-button{
                padding: 60px 0;
                text-align: center;
                .audit-btn{
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    border-radius: 3px;
                    background-color: #00a0e9;
                    cursor: pointer;
                    display: inline-block;
                    margin: 0 65px;
                }
            }
        }
    }
</style>
