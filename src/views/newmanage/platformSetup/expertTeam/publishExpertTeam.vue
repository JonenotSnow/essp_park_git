<template>
    <div id="publishExpertTeams">
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <p class='Otitle'>
            <i></i>
            发布专家团队
            <i></i>
        </p>
        <ul class="content">
            <li>
                <span class="require">*</span>
                <span class="title">专家姓名：</span>
                <input type="text" placeholder="请输入专家姓名" v-model="submitUploadInfo.name">
            </li>
            <li>
                <span class="require">*</span>
                <span class="title">专家职称：</span>
                <!-- <select placeholder="请输入专家职称">
                    <option :value="item.id" :label="item.name" v-for="(item,index) in searchList" :key="index">{{item.name}}</option>
                </select> -->
                <input type="text" placeholder="请输入专家职称" v-model="submitUploadInfo.title">
            </li>
            <li class="pic">
                <span class="require">*</span>
                <span class="title">专家头像：</span>
                <el-upload
                    class="avatar-uploader avatar-uploader-chengguo esspclearfix"
                    action="#"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="submitUploadInfo.photo" :src="submitUploadInfo.photo" class="avatar">
                    <div class="upload_pic_icon" v-else>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <em>上传图片</em>
                    </div>
                </el-upload>
                <span class="sub1">（图片高宽1：1，每张最大2M,建议分辨率为840*480像素，支持jpg/jpeg/png格式。）</span>
            </li>

            <li>
                <span class="require">*</span>
                <span class="title">联系电话：</span>
                <input type="text" placeholder="请输入联系电话" v-model="submitUploadInfo.phone">
            </li>

            <li>
                <span class="require">*</span>
                <span class="title">联系邮箱：</span>
                <input type="text" placeholder="请输入联系邮箱" v-model="submitUploadInfo.email">
            </li>
            <li class="resume">
                <span class="require">*</span>
                <span class="title">专家简介：</span>
                <textarea placeholder="请输入专家简介" v-model="submitUploadInfo.introduction"></textarea>
                <div class="moduleContent" v-for="(item,index) in moduleList"
                     :key="index">
                    <div class="title esspclearfix">
                        <input type="text" :placeholder="`请输入模块${index+1}标题`" v-model="item.title">
                        <div class="titleRight">
                            <span>选择模块类型：</span>
                            <select v-model="item.isPic">
                                <option label="无配图" value="0"></option>
                                <option label="可配图" value="1"></option>
                            </select>
                        </div>
                    </div>
                    <div class="noPic esspclearfix">
                        <textarea placeholder="请输入专家简介" v-model="item.info"></textarea>
                    </div>
                    <div class="pic pic_list esspclearfix" v-if="item.isPic == '1'">
                        <div class="pic_list_item" v-for="(imgItem,imgIndex) in item.photoList"
                             :key="index" @click="selectUploadIndex(index,imgIndex)">
                            <el-upload
                                class="avatar-uploader avatar-uploader-chengguo esspclearfix"
                                action="#"
                                :show-file-list="false"
                                :before-upload="moduleUpload">
                                <img v-if="imgItem.src" :src="imgItem.src" class="avatar">
                                <div class="upload_pic_icon" v-else>
                                    <i class="el-icon-plus avatar-uploader-icon"></i>
                                    <em>模块配图</em>
                                </div>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </li>
            <li class="saveBtn">
                <span class="add" @click="addModule">添加新模块</span>
                <span class="scan" @click="dialogVisible =true">预 览</span>
            </li>
        </ul>
        <p class="save">
            <span @click="saveExpertInfo">保存上传</span>
        </p>
        <!-- 遮罩层 -->
        <el-dialog
            title="预览详情"
            :visible.sync="dialogVisible"
            width="1000px"
            :before-close="handleClose">
            <div class="expertcontainers">
                <div class="experinfo">
                    <div class="brief_info">
                        <div class="expertimg">
                            <img :src="submitUploadInfo.photo" alt="专家头像">
                        </div>
                        <div class="contact_info">
                            <div class="contact_tel">
                                <span>联系电话：</span>
                                <div class="tel_num">{{submitUploadInfo.phone || '暂无'}}</div>
                            </div>
                            <div class="contact_mail">
                                <span>联系邮箱：</span>
                                <div class="mail_num">{{submitUploadInfo.email || '暂无'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="detail_info">
                        <div class="detail_item basic_info">
                            <div class="expertname">{{submitUploadInfo.name || "建信金融"}}</div>
                            <div class="expertlevel">{{submitUploadInfo.title || "平台"}}</div>
                            <div class="basic_des detail_item_content">
                                {{submitUploadInfo.introduction || "暂无"}}
                            </div>
                        </div>
                        <div class="other_info second_title" v-for="(item,index) in moduleList" :key="index">
                            <span class="second_title_name">{{item.title}}</span>
                            <div class="detail_item_content">
                                <div v-html="submitUploadInfo.introduction ||'暂无'"></div>
                            </div>
                            <div class="detail_item_imglist esspclearfix" v-if="item.isPic == '1'">
                                <div class="img_items" v-for="(itemChild, indexChild) in item.photoList" :key="indexChild">
                                    <img :src="itemChild.src" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear-both" style="clear: both"></div>
                </div>
            </div>
        </el-dialog>
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
                dialogVisible: false,
                id: this.$route.query.id, // 专家id
                submitUploadInfo: {
                    id: '',
                    name: '',
                    title: '',
                    photo: '',
                    phone: '',
                    email: '',
                    introduction: '',
                    parkId: this.SSH.getItem("parkId")
                },
                parentIndex: 0,
                childIndex: 0,
                breadlist: [
                    {
                        path: "/parkHall/manage/baseInfo2",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/expertTeam",
                        name: "专家团队"
                    },
                    {
                        path: "",
                        name: "发布专家团队"
                    }
                ],
                // 模块的初始数据
                moduleList: [
                    {
                        title: '',
                        isPic:'0',
                        info: '',
                        photoList:[
                            {
                                src: ''
                            },
                            {
                                src: ''
                            },
                            {
                                src: ''
                            }

                        ]
                    }
                ],
                moudelIndex: 0
            }
        },
        created() {
            if(this.id) {
                this.getExpertById();
            }
        },
        methods: {
            // 获取专家详情情
            getExpertById(){
                let url = this.$apiUrl.home.getExpertById;
                let pop = {
                    id: this.id
                };
                this.$post(url, pop).then(
                    response => {
                        this.submitUploadInfo = response.resultData.expert;
                        this.moduleList = JSON.parse(this.submitUploadInfo.moduleData);
                    },
                    err => {
                        this.$message.error(response.resultMsg);
                    }
                );
            },
            isTrueModule(){
                var flag = true;
                for(var i = 0 ; i < this.moduleList.length; i++) {
                    if(this.moduleList[i].title == "") {
                        this.$message.error("您的标题还有未填，请您填写！");
                        flag = false;
                        break;
                    }
                    if(this.moduleList[i].title.length > 50) {
                        this.$message.error("您的标题不能大于50个字！");
                        flag = false;
                        break;
                    }
                    if(this.moduleList[i].info == "") {
                        this.$message.error("您的专家还有未填，请您填写！");
                        flag = false;
                        break;
                    }
                    if(this.moduleList[i].info.length > 200) {
                        this.$message.error("您的专家详情不能大于200个字！");
                        flag = false;
                        break;
                    }
                }
                return flag;
            },
            beforeSaveExpertInfo() {
                let flag = true;
                if (this.submitUploadInfo.name.length === 0) {
                    this.$message.error("请填写姓名！");
                    return flag = false;
                }
                if (this.submitUploadInfo.name.length > 5) {
                    this.$message.error("您的姓名不能超过4个字！");
                    return flag = false;
                }
                if (this.submitUploadInfo.title.length === 0) {
                    this.$message.error("请填写职称！");
                    return flag = false;
                }
                if (this.submitUploadInfo.title.length > 20) {
                    this.$message.error("您的姓名不能超过20个字！");
                    return flag = false;
                }
                if(this.submitUploadInfo.photo == ""){
                    this.$message.error("请上传头像！");
                    return flag = false;
                }
                if(this.submitUploadInfo.phone == ""){
                    this.$message.error("请填写手机号！");
                    return flag = false;
                }
                if (!/^1[345678]\d{9}$/.test(this.submitUploadInfo.phone)) {
                    this.$message.error("请正确填写手机号！");
                    return flag = false;
                }
                if(this.submitUploadInfo.email == ""){
                    this.$message.error("请填写邮箱");
                    return flag = false;
                }
                if (this.submitUploadInfo.introduction.length === 0) {
                    this.$message.error("请正确填写简介！");
                    return flag = false;
                }
                if (this.submitUploadInfo.introduction.length > 200) {
                    this.$message.error("您的简介不能大于200个字！");
                    return flag = false;
                }
                if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.submitUploadInfo.email)) {
                    this.$message.error("请正确填写邮箱！");
                    return flag = false;
                }

                if(!this.isTrueModule()) {
                    return flag = false;
                }else {
                    return flag = true
                }
            },
            // 点击上传图片时定位当前是第几个上传框
            selectUploadIndex(parentIndex,childIndex){
                this.parentIndex = parentIndex;
                this.childIndex = childIndex;
            },
            // 点击增加模块
            addModule(){
                var obj = {
                    title: '',
                    isPic:'0',
                    info: '',
                    photoList:[{
                        src: ''
                    },{
                        src: ''
                    },{
                        src: ''
                    }]
                }
                this.moduleList.push(obj);
            },
            saveExpertInfo() {
                if (this.beforeSaveExpertInfo()) {
                    this.$post('/expert/saveExpert ', {
                        id: this.submitUploadInfo.id,
                        name: this.submitUploadInfo.name,
                        title: this.submitUploadInfo.title,
                        photo: this.submitUploadInfo.photo,
                        phone: this.submitUploadInfo.phone,
                        email: this.submitUploadInfo.email,
                        introduction: this.submitUploadInfo.introduction,
                        moduleData: this.moduleList,
                        parkId: this.submitUploadInfo.parkId
                    }).then(
                        response => {
                            if (response.resultCode == "CLT000000000") {
                                this.$message.success("保存成功");
                                this.$router.push("/parkHall/manage/expertTeam");
                            }
                        },
                        response => {
                            this.$message.error(response.resultMsg);
                        }
                    );
                } else {
                    //this.$message.error("请正确填写信息！");
                }
            },
            //头像上传
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
                        _this.submitUploadInfo.photo = response.resultData[0].url;
                        this.$message.success(response.resultMsg);
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
                return false; // 返回false不会自动上传
            },
            //模块图片上传
            moduleUpload(file) {
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
                        // 选择当前上传之后是哪个模块就上传哪个模块的图片地址
                        console.log(this.parentIndex,this.childIndex);
                        this.moduleList[this.parentIndex].photoList[this.childIndex].src= response.resultData[0].url;
                        console.log(this.moduleList);
                        this.$message.success(response.resultMsg);
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
                return false; // 返回false不会自动上传
            },
            showExpertInfo() {
                let that = this;
                if (!that.isShowOverview) {
                    that.isShowOverview = true;
                }
            },
            hideDetail() {
                let that = this;
                if (that.isShowOverview) {
                    that.isShowOverview = false;
                }
            }
        },
    }
</script>
<style>
    #publishExpertTeams .avatar-uploader-chengguo .el-upload {
        width: 100%;
        height: 100%;
    }
</style>
<style lang='less' scoped>
    #publishExpertTeams {
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
        .content {
            width: 884px;
            margin: 76px auto 0;
            em {
                font-style: normal;
            }
            li {
                margin-bottom: 20px;
                .require {
                    color: #ff9900;
                }
                & > .title, & > .title1 {
                    font-size: 14px;
                    font-weight: normal;
                    letter-spacing: 0.4px;
                    color: #666666;
                    display: inline-block;
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
                    min-width: 700px;
                    min-height: 120px;
                    border-radius: 3px;
                    border: solid 1px #cccccc;
                    resize: none;
                }
                .sub, .sub1 {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0.1px;
                    color: #999999
                }
                .sub1 {
                    margin-top: 100px;
                    margin-left: 14px;
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
                    .moduleContent {
                        width: 720px;
                        float: left;
                        margin-left: 96px;
                        min-height: 305px;
                        margin-top: 15px;
                        & > .title {
                            font-size: 16px;
                            color: #444444;
                            overflow: hidden;
                            input {
                                float: left;
                                width: 380px;
                                height: 35px;
                                border-radius: 3px;
                                border: solid 1px #cccccc;
                            }
                            .titleRight {
                                float: right;
                                overflow: hidden;
                                span {
                                    float: left;
                                    line-height: 35px;
                                }
                                select {
                                    float: right;
                                    width: 100px;
                                    height: 35px;
                                    border-radius: 3px;
                                    border: solid 1px #cccccc
                                }
                            }
                        }
                        .noPic textarea {
                            width: 720px;
                            height: 240px;
                            border-radius: 3px;
                            border: solid 1px #cccccc;
                            margin: 0;
                            margin-top: 14px;
                        }
                        .picDetail {
                            font-size: 12px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 30px;
                            letter-spacing: 0px;
                            color: #999999;
                        }
                    }
                }
                &.saveBtn {
                    width: 720px;
                    float: left;
                    margin-left: 96px;
                    margin-top: -12px;
                    overflow: hidden;
                    .add {
                        display: inline-block;
                        text-align: center;
                        line-height: 35px;
                        float: left;
                        width: 100px;
                        height: 35px;
                        border-radius: 3px;
                        border: solid 1px #cccccc;
                        cursor: pointer;
                    }
                    .scan {
                        float: right;
                        cursor: pointer;
                    }
                }
                &.editor {
                    overflow: hidden;
                    span {
                        float: left;
                    }
                    div {
                        float: left;
                        margin-left: 8px;
                        width: 700px;
                        height: 400px;
                        max-width: 700px;
                        max-height: 400px;
                        min-width: 700px;
                        min-height: 400px;
                        border-radius: 3px;
                        border: solid 1px #cccccc;
                        padding: 10px;
                    }
                }
            }
        }
        .pic {
            /*overflow: hidden;*/
            position: relative;
            height: 140px;
            & > span {
                float: left;
            }
            .avater-uploader {
                float: left;
                width: 210px;
                height: 120px;
                border-radius: 3px;
                border: dashed 1px #cccccc;
                margin-left: 8px;
                .tianjia {
                    display: block;
                    font-size: 40px;
                    margin-left: 80px;
                    margin-top: 36px;
                }
                .detil {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #cccccc;
                    margin-left: 80px;
                }
            }
            /*图片样式*/
            .avatar-uploader-chengguo {
                position: absolute;
                left: 98px;
                top: 0;
                width: 198px;
                padding: 0;
                border-radius: 3px;
                border: 1px solid #ccc;
                height: 140px;
                text-align: center;
                line-height: 140px;
                overflow: hidden;
                .upload_pic_icon {
                    position: absolute;
                    left: 0px;
                    top: 0;
                    width: 198px;
                    height: 140px;
                    padding: 0 5px;
                    border-radius: 3px;
                    i {
                        display: block;
                        margin: 40px auto -57px;
                    }
                }
            }
            .sub1 {
                position: absolute;
                left: 33%;
                top: 17%;
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
        }
        .pic_list_item {
            position: relative;
            width: 220px;
            height: 110px;
            margin-right: 20px;
            .avatar-uploader-chengguo {
                left: 0;
                width: 210px;
                height: 110px;
                padding: 0;
                .upload_pic_icon {
                    width: 210px;
                    height: 110px;
                    .avatar-uploader-icon {
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 18px;
                        background: #10b5ff;
                    }
                }
            }
        }
        .pic_list_item {
            float: left;
        }
        .pic_list {
            margin: 15px 0;
        }
        .save {
            padding-bottom: 60px;
            text-align: center;
            width: 884px;
            margin: 65px auto 20px;
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
    /*专家详情start*/
    .expertcontainers {
        background-color: #fff !important;

    }
    .expertcontainers .experinfo {
        margin-bottom: 20px;
    }
    .expertcontainers .experinfo .brief_info {
        float: left;
        width: 240px;
    }

    .expertcontainers .experinfo .brief_info .expertimg {
        img {
            width: 100%;
            height: 100%;
        }
    }

    .expertcontainers .experinfo .brief_info .contact_info {
        margin-top: 20px;
        font-size: 14px;
        line-height: 32px;
        color: #999999;
        text-align: left;
    }
    .expertcontainers .detail_item_imglist .img_items{
        float: left;
        width: 31%;
        margin-right: 2%;
        height: 130px;
        overflow: hidden;
        img {
            display: block;
            width: 100%;
            min-height: 100%;
        }
    }
    .expertcontainers .experinfo .brief_info .contact_info .tel_num {
        display: inline;
        color: #000;
    }

    .expertcontainers .experinfo .brief_info .contact_info .mail_num {
        display: inline;
        color: #000;
    }

    .expertcontainers .experinfo .detail_info {
        float: left;
        margin-left: 20px;
        color: #999;
        text-align: left;
        width: 700px;
    }

    .expertcontainers .experinfo .basic_info .basic_des {
        margin-top: 30px;
        margin-bottom: 40px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
    }

    .expertcontainers .experinfo .basic_info .expertname {
        margin-top: 14px;
        height: 19px;
        line-height: 19px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
    }

    .expertcontainers .experinfo .basic_info .expertlevel {
        margin-top: 20px;
        height: 12px;
        line-height: 12px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #777777;
    }

    .expertcontainers .experinfo .detail_info .second_title {
        font-size: 16px;
        border-top: 1px dashed #ccc;
    }

    .expertcontainers .experinfo .second_title_name {
        font-size: 16px;
        display: block;
        padding-top: 39px;
        color: #666;
    }

    .expertcontainers .experinfo .detail_item_content {
        margin-top: 30px;
        margin-bottom: 40px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #999999;
        div {
            word-break: break-all;
        }
    }

    .expertcontainers .experinfo .program_experience {
        margin-top: 40px;
    }
</style>
