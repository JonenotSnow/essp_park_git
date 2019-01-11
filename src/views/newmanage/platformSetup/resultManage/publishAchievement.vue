<template>
    <div id="publishAchievement">
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <p class='Otitle'>
            <i></i>
            发布成果
            <i></i>
        </p>
        <ul class="content">
            <li>
                <span class="require">*</span>
                <span class="title">成果名称：</span>
                <el-input class="form_input_height" v-model="form.name" placeholder="请输入成果名称"></el-input>
            </li>
            <li>
                <span class="require">*</span>
                <span class="title">所属领域：</span>
                <el-select class="form_input_height" v-model="form.field" placeholder="请输入所属领域">
                    <el-option
                        v-for="(item,index) in searchList"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </li>
            <li class="pic">
                <span class="require">*</span>
                <span class="title pictitle">成果配图：</span>
                <el-upload
                    class="avatar-uploader avatar-uploader-chengguo esspclearfix"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.photo" :src="form.photo" class="avatar">
                    <div class="upload_pic_icon" v-else>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <span>上传图片</span>
                    </div>

                </el-upload>
                <span class="sub1">(图片高宽7:4，每张最大2M,建议分辨率为840*480像素，支持jpg/jpeg/png格式。)</span>
            </li>
            <li class="resume">
                <span class="require">*</span>
                <span class="title">成果简介：</span>
                <textarea placeholder="请输入成果简介" v-model="form.title"></textarea>
            </li>
            <li class="editor">
                <span class="require">*</span>
                <span class="title">成果详情：</span>
                <div class="editor_wrap esspclearfix">
                    <essp-editor :editorCont="form.detail" @onEditorChange="onEditorChange"></essp-editor>
                </div>
            </li>
            <li>
                <span class="title1">发明人：</span>
                <el-input class="form_input_height" v-model="form.inventor" placeholder="请输入发明人"></el-input>

            </li>
            <li>
                <span class="title1">所属单位：</span>
                <el-input class="form_input_height" v-model="form.unit" placeholder="请输入所属单位"></el-input>
                <span class="sub">（注：发明人与所属单位至少填一项）</span>
            </li>

            <li>
                <span class="scan" @click="showExpertInfo">预 览</span>
            </li>
        </ul>
        <p class="save" @click="uploadAchievement">
            <span>保存上传</span>
        </p>
        <div class="viewexpertinfo" v-if="isShowOverview">
            <div class="btn_close" @click="hideDetail"><i class="iconfont icon-butongguo"></i></div>
            <div class="pic">
                <img :src="form.photo" >
            </div>
            <ul class="infodetail">
                <li>
                    <span class="title">成果标题</span>
                    <span class="infocont">{{form.name}}</span>
                </li>
                <li>
                    <span class="title">所属领域</span>
                    <span class="infocont">{{form.field}}</span>
                </li>                
                <li>
                    <span class="title">简介</span>
                    <span class="infocont">{{form.title}}</span>
                </li>
                
                <li>
                    <span class="title">详情</span>
                    <span class="infocont" v-html="form.detail"></span>
                </li>
                <li class="resume">
                    <span class="title">发明人</span>
                    <span class="infocont">{{form.inventor}}</span>
                </li>
            </ul>
        </div>
        <!-- 遮罩层 -->
        <div class="img-layer" v-if="isShowOverview"></div>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import EsspEditor from "@/components/EsspEditor";

    export default {
        components: {
            EsspBreadCrumb,
            EsspEditor
        },
        data() {
            let _type = this.$route.query.type,
                _info = this.$route.query.achievInfo;
            return {
                isShowOverview:false,
                type:_type,
                info:_info,
                form: {
                    name: (_type === 1) ? _info.name : '', // 成果标题
                    field: (_type === 1) ? _info.field : '',  // 所属领域
                    photo: (_type === 1) ? _info.photo :'',   // 上传图片
                    title: (_type === 1) ? _info.title : '',  // 简介
                    detail: (_type === 1) ? _info.detail : '', //编辑器内容
                    inventor: (_type === 1) ? _info.inventor : '',   //发明人
                    unit: (_type === 1) ? _info.unit :''        // 所属单位
                },

                breadlist: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/resultManage",
                        name: "成果管理"
                    },
                    {
                        path: "",
                        name: "发布成果"
                    }
                ],
                searchList: [
                    {
                        id: '0',
                        name: '电子信息'
                    }, {
                        id: '1',
                        name: '生物与新医药'
                    }, {
                        id: '2',
                        name: '新材料'
                    }, {
                        id: '3',
                        name: '高新技术服务'
                    }, {
                        id: '4',
                        name: '新能源与节能'
                    }, {
                        id: '5',
                        name: '资源与环境'
                    }, {
                        id: '6',
                        name: '现代农业'
                    }, {
                        id: '7',
                        name: '高端装备制造'
                    }, {
                        id: '8',
                        name: '其他'
                    }
                ]
            }
                console.log(this.$route.query)
        },
        created() {

        },
        methods: {
            // 编辑器的值获取
            onEditorChange(val) {
                this.form.detail = val;
                console.log(this.form.detail);
            },
            //图片上传
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png";
                const isLt5M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
                    return isJPG;
                }
                if (!isLt5M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                    return isLt5M;
                }
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "active"); // 通过append向form对象添加数据
                var _this = this;
                this.$post(this.$apiUrl.upload.upload, param).then(
                    response => {
                        _this.form.photo = response.resultData[0].url;
                        this.$message.success(response.resultMsg);
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
                return false; // 返回false不会自动上传
            },
            // 提交数据验证
            ruleData() {
                if(this.form.name == "") {
                    this.$message.error("成果标题不能为空！");
                    return false;
                }
                if(this.form.field == "") {
                    this.$message.error("所属领域不能为空！");
                    return false;
                }
                if(this.form.photo == "") {
                    this.$message.error("图片不能为空！");
                    return false;
                }
                if(this.form.title == "") {
                    this.$message.error("简介不能为空！");
                    return false;
                }
                if(this.form.detail == "") {
                    this.$message.error("详情不能为空！");
                    return false;
                }
                return true;
            },
            // 提交数据
            uploadAchievement() {
                var isTrue = this.ruleData();// 提交表单规则校验
                console.log(isTrue);
                if(isTrue) {
                    this.$post(this.$apiUrl.achievement.addActivity, {
                        name: this.form.name, // 成果标题
                        field: this.form.field,  // 所属领域
                        photo: this.form.photo,   // 上传图片
                        title: this.form.title,  // 简介
                        detail: this.form.detail, //编辑器内容
                        inventor: this.form.inventor,   //发明人
                        unit:this.form.unit        // 所属单位
                    }).then(
                        response => {
                            console.log(response);
                            this.$router.push("/parkHall/manage/resultManage");
                        },
                        err => {
                            this.$message.error(err.resultMsg);
                        }
                    );
                }
            },
            showExpertInfo() {
                let that = this;
                if(!that.isShowOverview){   
                    that.isShowOverview = true;
                }
            },
            hideDetail(){
                let that = this;
                if(that.isShowOverview){   
                    that.isShowOverview = false;
                }
            }
        },
    }
</script>
<style>
    .form_input_height input {
        height: 35px !important;
        line-height: 35px !important;
        border: 1px solid #ccc;
    }
    .form_input_height .el-input__icon {
        line-height: 35px !important;
    }
    /*图片样式*/
    .avatar-uploader-chengguo{
        position: absolute;
        left: 95px;
        top: 0;
    }
    .sub1 {
        position: absolute;
        left: 44%;
        top: 73%;
        color: #999;
        width: 63%;
    }
    .avatar-uploader-chengguo .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
         width: 285px;
         height: 120px;
        line-height: 120px;
    }
    .avatar-uploader-chengguo.el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-chengguo .avatar-uploader-icon {
        font-size: 28px;
        color: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #ccc;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;

    }
    .avatar-uploader-chengguo .avatar {
        width: 100%;
        min-height: 100%;
        display: block;
    }
</style>
<style lang='less' scoped>
    #publishAchievement {
        width: 1200px;
        background: #fff;
        margin: 0 auto;
        .form_input_height {
            width: 210px;
        }
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
        .content {
            width: 884px;
            margin: 76px auto 0;
            li {
                margin-bottom: 20px;
                .require {
                    color: #ff9900;
                }
                .title, .title1 {
                    font-size: 14px;
                    font-weight: normal;
                    letter-spacing: 0.4px;
                    color: #666666;
                    display: inline-block;
                    width: 72px;
                    text-align: right;
                    margin-right: 10px;
                }
                input, select {
                    width: 198px;
                    height: 35px;
                    padding: 0 5px;
                    border-radius: 3px;
                    border: solid 1px #cccccc;
                }
                select {
                    width: 210px;
                }
                textarea {
                    width: 700px;
                    height: 120px;
                    max-width: 700px;
                    max-height: 120px;
                    min-width: 700px;
                    min-height: 120px;
                    border-radius: 3px;
                    border: solid 1px #cccccc;
                }
                .sub{
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0.1px;
                    color: #999999
                }
                .title1 {
                    margin-left: 10px;
                }
                .scan {
                    display: inline-block;
                    width: 100px;
                    height: 35px;
                    background-color: #e6f4ff;
                    border-radius: 3px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 35px;
                    letter-spacing: 0px;
                    color: #00a0e9;
                    text-align: center;
                    margin-left: 95px;
                    cursor: pointer;
                }
                &.resume {
                    overflow: hidden;
                    span {
                        float: left;
                    }
                    textarea {
                        float: left;
                        margin-left: 8px;
                        padding: 10px;
                    }
                }
                &.editor {
                    overflow: hidden;
                    span {
                        float: left;
                    }
                    .editor_wrap {
                        float: left;
                        margin-left: 8px;
                        width: 720px;
                        min-height: 400px;
                        border-radius: 3px;
                    }
                }
            }
            .pic {
                position: relative;
                height: 140px;
            }
            .upload_pic_icon {
                span {
                    position: absolute;
                    left: 0;
                    top: 70%;
                    width: 100%;
                    text-align: center;
                    font-size: 14px;
                    color: #ccc;
                    line-height: 12px;
                }
            }
        }
        .save {
            padding-bottom: 60px;
            text-align: center;
            width: 884px;
            margin: 40px auto 20px;
            span {
                display: inline-block;
                width: 180px;
                height: 40px;
                background-image: linear-gradient(31deg,
                #22a2fa 0%,
                #10b5ff 100%);
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0px;
                color: #ffffff;
                text-align: center;
            }
        }
        .viewexpertinfo{
            z-index: 1000;
            width:750px;
            background:#fff;
            font-size: 16px;
            position: fixed;
            left: 50%;
            top: 100px;
            margin-left: -25%;
            border-radius:3px;
            font-size: 14px;
            .btn_close{
                float:right;
                margin: 10px;
                cursor: pointer;
            }
            .infodetail{
                padding:30px;
                float: left;
                .infocont{
                    max-width: 400px;
                    display: inline-block;
                    vertical-align: top;
                }
            }
            .pic{
                float:left;
                width:100px;
                height: 100px;
                margin:30px 0 30px 30px;
                border:1px solid #ccc;
                border-radius:3px;
            }
        }
        .img-layer {
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.7);
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
</style>
