<template>
    <div class="el-main" id="publishAD">
        <div class="baseInfos">
            <p>发布通知公告</p>
            <div class="noticeContent">
                <p class='line'>
          <span>
            <i>*</i>标题：</span>
                    <input type="text" v-model="params.title" placeholder="请输入标题">
                </p>
                <p class='line'>
          <span>
            <i>*</i>发布人：</span>
                    <input class="fx" type="text" v-model="params.userName" disabled>
                </p>
                <!-- <p class='line'>
                  <span>
                    <i>*</i>发布时间：</span>
                  <el-date-picker type="date" v-model="params.startDate" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </p> -->
                <div class='lineContent'>
          <span><i>*</i>内容详情：</span>
                    <div class="editorContent">
                        <quill-editor  v-model='params.content' :options="editorOption"></quill-editor>
                        <span v-if="!params.content" class='control'>100字</span>
                    </div>
                </div>
            </div>
        </div>
        <p class="scan2">
            <el-button type="primary" plain size="small" @click="scan=true">预览</el-button>
        </p>
        <p class="save">
            <el-button type="primary" size="small" @click="access = true">保存发布</el-button>
            <el-button type="primary" size="small" @click="$router.go(-1)">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
        </p>
        <!-- 预览通知公告 -->
        <el-dialog :visible.sync="scan" width="1050px" center class="reTag">
            <div class="noticeContent scanContent">
                <div class="sendRequest_content">
                    <p class="title">{{params.title}}</p>
                    <p class="sub">
                        <span>发布人：{{params.userName}}</span>
                    </p>
                    <div class="send_main" v-html="params.content">
                    </div>
                </div>
            </div>
        </el-dialog>
        <!-- 确认是否发送 -->
        <el-dialog :visible.sync="access" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP"><i class="el-icon-warning"></i>&nbsp;&nbsp;确认发布该通知公告？</p>
            <p class="btn">
                <span @click="access =false">取消</span>
                <span @click="addNotice">确认</span>
            </p>
        </el-dialog>
        <!-- 发布成功提示 -->
        <el-dialog :visible.sync="confirmSend" width='520px' height='280px' class='confirmRequest'>
            <p>
                <!-- <i class="el-icon-close" @click="confirmSend=false"></i> -->
            </p>
            <p><img src="../../../assets/sendConofirm.jpg" alt=""></p>
            <p>您的通知公告已发布成功</p>
            <p>
                <el-button type="primary" size='middle' @click="goToParkIndex()">去首页查看</el-button>
                <el-button type="primary" size='middle' plain @click="$router.push('/parkHall/manage/noticeAndAD')">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        components: {

        },
        data() {
            return {
                totalCount: 0,
                pageNum: 1,
                pageSize: 5,
                scan: false,
                params: {
                    title: '',
                    content: '',
                    userName: this.SSH.getItem('userName')
                },
                editorOption: {
                    readOnly: true,
                    placeholder: '',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline'],        // toggled buttons
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'color': []}, {'background': []}],
                            [{'font': []}],
                            [{'align': []}]
                        ]
                    },
                    theme: 'snow'
                },
                confirmSend: false,
                access:false

            };
        },
        created() {
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getList();
            },
            addNotice() {
                let that = this;
                if (!this.params.title) {
                    this.$message({
                        type: "error",
                        message: '通知公告标题不能为空'
                    });
                    return;
                }
                if (this.params.title.length > 20) {
                    this.$message({
                        type: "error",
                        message: '通知公告标题不能大于20个字符'
                    });
                    return;
                }
                if (!this.params.content) {
                    this.$message({
                        type: "error",
                        message: '通知公告内容不能为空'
                    });
                    return;
                }
                if (this.params.content.length > 100) {
                    this.$message({
                        type: "error",
                        message: '通知公告内容不能大于100个字符'
                    });
                    return;
                }
                this.$post(this.$apiUrl.manage.addNotice, {
                    parkId: window.sessionStorage.getItem("parkId"),
                    title: this.params.title,
                    content: this.params.content
                })
                    .then((response) => {
                        this.params = {
                            title: '',
                            content: '',
                            aduit: '',
                            startDate: '',
                        };
                        this.confirmSend = true;

                        // 先注释
                        // setTimeout(() => {
                        //     this.$router.push('/parkHall/manage/noticeAndAD');
                        // }, 2000);
                    }, (error) => {
                        this.$message({
                            type: "error",
                            message: response.resultMsg
                        });
                    })
            },

            goToParkIndex() {
                let _this = this;
                _this.$router.push({
                    path: '/parkHome'
                });
            }

        }
    };
</script>

<style>
#publishAD .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 240px;
}
#publishAD .access .el-dialog__header {
    display: none;
}

#publishAD .access .el-dialog__body {
    overflow: hidden;
    margin: 30px 20px;
}

#publishAD .access .el-dialog__body p:nth-of-type(1) {
    line-height: 55px;
}
#publishAD .line_area p {
    word-break: break-all;
}
</style>

<style lang='less' scoped>
    .el-main {
        /*margin-left: 10px;*/
        width: 990px;
        background: #fff;
        min-height: 455px;
        padding: 0;
        .baseInfos {
            & > p:nth-of-type(1) {
                font-size: 20px;
                line-height: 30px;
                margin: 30px 0 40px 40px;
                letter-spacing: 4px;
                color: #333;
                border-left: 10px solid #10b5ff;
                text-indent: 22px;
                button {
                    float: right;
                    font-size: 14px;
                    color: #ffffff;
                    margin-right: 35px;
                    text-indent: 0;
                }
            }
        }
        .scan1,
        .scan2,
        .save {
            width: 915px;
            height: auto;
            margin: 0 auto;
            button {
                font-size: 16px;
            }
        }
        .scan2 {
            width: 640px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .scan1 {
            color: #00a0e9;
            text-align: left;
            margin: 20px 0 20px 175px;
        }
        .save {
            text-align: center;
            margin-bottom: 40px;
        }

        .noticeContent {
            width: 915px;
            height: auto;
            margin: 0 auto;
            .line,
            .lineContent {
                overflow: hidden;
                i {
                    color: #ff9900;
                    margin-right: 3px;
                }
                & > span {
                    display: inline-block;
                    color: #777;
                    text-align: right;
                    float: left;
                    &:nth-of-type(1) {
                        width: 15%;
                    }
                    &:nth-of-type(2) {
                        width: 85%;
                    }
                }
                & > input {
                    width: 207px;
                    padding: 0 5px;
                    outline: none;
                    height: 35px;
                    background-color: #ffffff;
                    border: solid 1px #cccccc;
                    caret-color: #666;
                    border-radius: 4px;
                    &.fx {
                        background: #f2f2f2;
                        color: #000;
                    }
                }
            }
            .line {
                line-height: 50px;
            }
            .lineContent {
                margin-top: 10px;
                .editorContent {
                    width: 700px;
                    border-radius: 4px;
                    position: relative;
                    float: left;
                    .ql-container {
                        min-height: 240px;
                    }
                    .control{
                        position: absolute;
                        right:10px;
                        bottom:10px;
                    }
                }
            }
        }
        .scanContent {
            .sendRequest_content {
                margin: 0 auto;
                padding: 44px 76px;
                margin-bottom: 30px;
                background: #fff;
                .title {
                    font-size: 20px;
                    color: #333333;
                    text-align: center;
                }
                .sub {
                    font-size: 14px;
                    text-align: center;
                    margin-top: 31px;
                    color: #999999;
                }
                .send_main {
                    margin-top: 45px;
                }
            }
        }

        .confirmRequest {
            .el-dialog__body {
                padding: 0 !important;
                & > p {
                    text-align: right;
                    & > i {
                        cursor: pointer;
                        margin-right: 10px;
                        margin-top: 10px;
                    }
                    &:not(:first-child) {
                        margin: 0 auto;
                        text-align: center;
                        font-size: 18px;
                        line-height: 72px;
                        color: #c7c7c7;
                    }
                    &:nth-of-type(1) {
                        height: 30px;
                        border-top: 5px solid #00a0e9;
                    }
                    &:nth-of-type(3) {
                        font-size: 20px;
                        line-height: 30px;
                        color: #333333;
                    }
                    &:nth-of-type(4) {
                        padding-bottom: 20px;
                        button {
                            font-size: 18px;
                        }
                    }
                }
            }
        }
    }
    .access {
        .titleTips {
            text-indent: 36px;
            font-size: 24px;
            color: #555;
            position: relative;
            font-weight: normal;
            top: -30px;
            margin-top: 20px;
        }
        .accessP {
            text-indent: 20px;
            font-size: 20px;
            color: #333;
            line-height: 30px;
            i {
                font-size: 28px;
                color: #00a0e9;
            }
        }
        .btn {
            text-align:right;
            margin-top: 35px;
            span {
                text-align: center;
                display: inline-block;
                width: 100px;
                height: 35px;
                border-radius: 2px;
                line-height: 35px;
                font-size: 18x;
                cursor: pointer;
                color: #fff;
                letter-spacing: 4.8px;
                &:nth-of-type(1) {
                    letter-spacing: 4.8px;
                    background: #e6f4ff;
                    color: #00a0e9;
                }
                &:nth-of-type(2) {
                    margin-left: 55px;
                    background: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                    color: #fff;
                }
            }
        }
    }

</style>
