<template>
    <div id="publishExpertTeam">
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
                <!-- <el-upload
                    class="avatar-uploader avatar-uploader-chengguo esspclearfix"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="submitUploadInfo.photo" :src="submitUploadInfo.photo" class="avatar">
                    <div class="upload_pic_icon" v-else>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <span>上传图片</span>
                    </div>
                </el-upload> -->
                <el-upload
                    class="avatar-uploader avatar-uploader-chengguo esspclearfix"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="submitUploadInfo.photo" :src="submitUploadInfo.photo" class="avatar">
                    <div class="upload_pic_icon" v-else>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <span>上传图片</span>
                    </div>
                </el-upload>
                <span class="sub1">（图片高宽7：4，每张最大2M,建议分辨率为840*480像素，支持jpg/jpeg/png格式。）</span>
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
                <div class="moduleContent"  @click="getCurType('content')" v-for="(it,moudelIndex) in 2" :key="moudelIndex">
                    <div class="title">
                        <input type="text" :placeholder="`请输入模块${moudelIndex+1}标题`" v-model="it.title">
                        <div class="titleRight">
                            <span>选择模块类型：</span>
                            <select v-model="it.isPic">
                                <option label="无配图" value="0"></option>
                                <option label="可配图" value="1"></option>
                            </select>
                        </div>
                    </div>
                    <div class="noPic">
                        <quillEditor :options="editorOption" v-model="it.content"></quillEditor>
                    </div>
                    <div class="picList" v-if="it.isPic == '1'">
                        <div v-for="(is,itemindex) in imgBoxA[moudelIndex]" :key="itemindex" @click="getCurPicOrder(itemindex,moudelIndex)"
                        v-loading='loading' element-loading-text="正在上传图片..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                            <el-upload v-if="is.length==0"
                                class="avater-uploader"
                                :before-upload="beforeUpload"
                                :action='uploads'>
                                <i class="icon iconfont icon-tianjia-" style="font-size:30px;display:block;margin-top:35px;"></i>
                                <p style="font-size:18px;color:#4d4d4d;margin-top: 9px;">模块配图</p>
                                <!-- <p style="font-size:12px;color:#999;">建议尺寸500*250像素/不大于5M</p> -->
                            </el-upload>
                            <div class="alterPic" v-if="is" @click="delitemClick(it,itemindex)">
                                <img :src="is" alt="">
                            </div>
                        </div>
                    </div>
                    <p class="picDetail">注：可上传1-3张图片，支持jpg/jpeg/gif/png等格式上传，图片尺寸宽：高为2：1，建议尺寸800*400像素、大小2M内、尺寸一致。</p>
                </div>
            </li>
            <li class="saveBtn">
                <span class="add">添加新模块</span>
                <span class="scan" @click="showExpertInfo">预 览</span>
            </li>
        </ul>
        <p class="save">
            <span @click="saveExpertInfo">保存上传</span>
        </p>
        <div class="viewexpertinfo" v-if="isShowOverview">
            <div class="btn_close" @click="hideDetail"><i class="iconfont icon-butongguo"></i></div>
            <div class="pic">
                <img :src="submitUploadInfo.photo" >
            </div>
            <ul class="infodetail">
                <li>
                    <span class="title">专家姓名：</span>
                    <span class="infocont">{{submitUploadInfo.name}}</span>
                </li>
                <li>
                    <span class="title">专家职称：</span>
                    <span class="infocont">{{submitUploadInfo.title}}</span>
                </li>                
                <li>
                    <span class="title">联系电话：</span>
                    <span class="infocont">{{submitUploadInfo.phone}}</span>
                </li>
                
                <li>
                    <span class="title">联系邮箱：</span>
                    <span class="infocont">{{submitUploadInfo.email}}</span>
                </li>
                <li class="resume">
                    <span class="title">专家简介：</span>
                    <span class="infocont">{{submitUploadInfo.introduction}}</span>
                </li>
            </ul>
        </div>
        <!-- 遮罩层 -->
        <div class="img-layer" v-if="isShowOverview"></div>
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
        isShowOverview:false,
        submitUploadInfo: {
          id:'' ,
          name: '',
          title: '',
          photo:'',
          phone:'',
          email:'',
          introduction:'',
          moduleData:'',
          parkId: this.SSH.getItem("parkId")
        },
        breadlist: [
          {
            path: "/parkHome",
            name: "系统管理"
          },
          {
            path: "",
            name: "专家团队"
          },
          {
            path: "",
            name: "发布专家团队"
          }
        ],
        moduleList:[],
        moudelIndex:0
      }
    },
    created() {
        
    },
    methods: {
        beforeSaveExpertInfo(){
            let flag = true;
            if(!/^1[345678]\d{9}$/.test(this.submitUploadInfo.phone)){
                this.$message.error("请正确填写手机号！");
                return flag = false;
            }
            if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.submitUploadInfo.email)){
                this.$message.error("请正确填写邮箱！");
                return flag = false;
            }
            if(this.submitUploadInfo.name.length === 0){
                this.$message.error("请正确填写姓名！");
                return flag = false;
            }
            if(this.submitUploadInfo.title.length === 0 ){
                this.$message.error("请正确填写职称！");
                return flag = false;
            }
            if(this.submitUploadInfo.introduction.length === 0){
                this.$message.error("请正确填写简介！");
                return flag = false;
            }
            /*if(this.submitUploadInfo.photo.length === 0){
                this.$message.error("请正确上传头像！");
                return flag = false;
            }*/else{
                return flag = true
            }
        },
        saveExpertInfo(){
            if(this.beforeSaveExpertInfo()){debugger
                this.$post('/expert/saveExpert ', {
                    id:this.submitUploadInfo.id,
                    name: this.submitUploadInfo.name,
                    title:this.submitUploadInfo.title ,
                    photo:this.submitUploadInfo.photo,
                    phone:this.submitUploadInfo.phone,
                    email:this.submitUploadInfo.email,
                    introduction:this.submitUploadInfo.introduction,
                    moduleData:this.submitUploadInfo.moduleData,
                    parkId:this.submitUploadInfo.parkId
                }).then(      
                    response => {
                      if (response.resultCode == "CLT000000000") {
                          this.$message.success("保存成功")      
                      }
                    },
                    response => {
                      this.$message.error(response.resultMsg);
                    }
                );
            }else{
                //this.$message.error("请正确填写信息！");
            }
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
                    _this.submitUploadInfo.photo = response.resultData[0].url;
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

<style lang='less' scoped>
#publishExpertTeam{
    width:1200px;
    background:#fff;
    margin: 0 auto;
    .Otitle{
        font-size: 24px;
        line-height: 36px;
        margin-bottom:20px;
        margin-top:60px;
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
    .content{
        width:884px;
        margin: 76px auto 0;
        li{
            margin-bottom:20px;
            .require{
                color:#ff9900;
            }
            &>.title,&>.title1{
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0.4px;
                color: #666666;
                display: inline-block;
                text-align: right;
                margin-right:10px;
            }
            input,select{
                width: 198px;
                height: 35px;
                padding: 0 5px;
                border-radius: 3px;
                border: solid 1px #cccccc;
            }
            select{
                width: 210px;
            }
            textarea{
                width: 700px;
                height: 120px;
                max-width: 700px;
                max-height:120px;
                min-width: 700px;
                min-height:120px;
                border-radius: 3px;
                border: solid 1px #cccccc;
            }
            .sub,.sub1{
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.1px;
                color: #999999
            }
            .sub1{
                margin-top:100px;
                margin-left:14px;
            }
            .title1{
                margin-left:10px;
            }
            .scan{
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
                margin-left:95px;
                cursor: pointer;
            }
            &.pic{
                /*overflow: hidden;*/
                position:relative;
                height: 140px;
                &>span{
                    float: left;
                }
                .avater-uploader{
                    float: left;
                    width: 210px;
                    height: 120px;
                    border-radius: 3px;
                    border: dashed 1px #cccccc;
                    margin-left:8px;
                    .tianjia{
                        display:block;
                        font-size: 40px;
                        margin-left:80px;
                        margin-top:36px;
                    }
                    .detil{
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 30px;
                        letter-spacing: 0px;
                        color: #cccccc;
                        margin-left:80px;
                    }
                }
                /*图片样式*/
                .avatar-uploader-chengguo{
                    position: absolute;
                    left: 98px;
                    top: 0;
                    width: 198px;
                    padding: 0 5px;
                    border-radius: 3px;
                    border: 1px solid #ccc;
                    height: 140px;
                    text-align: center;
                    line-height: 140px;
                    overflow: hidden;
                    .upload_pic_icon{
                        position: absolute;
                        left: 0px;
                        top: 0;
                        width: 198px;
                        height: 140px;
                        padding: 0 5px;
                        border-radius: 3px;
                        i{
                            display: block;
                            margin: 40px auto -48px;
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
            &.resume{
                overflow: hidden;
                span{
                    float: left;
                }
                textarea{
                    float: left;
                    margin-left:8px;
                    padding:10px;
                }
                .moduleContent{
                    width:720px;
                    float: left;
                    margin-left: 96px;
                    min-height: 305px;
                    margin-top:15px;
                    &>.title{
                        font-size: 16px;
                        color: #444444;
                        overflow: hidden;
                        input{
                            float:left;
                            width: 380px;
                            height: 35px;
                            border-radius: 3px;
                            border: solid 1px #cccccc;
                        }
                        .titleRight{
                            float:right;
                            overflow: hidden;
                            span{
                                float: left;
                                line-height: 35px;
                            }
                            select{
                                float: right;
                                width: 100px;
                                height: 35px;
                                border-radius: 3px;
                                border: solid 1px #cccccc
                            }
                        }
                    }
                    .noPic{
                        width: 720px;
                        height: 240px;
                        border-radius: 3px;
                        border: solid 1px #cccccc;
                        margin-top:14px;
                    }
                    .picList{
                        width:780px;
                        margin-bottom:40px;
                        // background: red;
                        .one{
                            width:100%;
                            text-align: center;
                            margin-top:20px;
                            img{
                                width: 520px;
                                height:250px;
                                text-align: center;
                            }
                        }
                        .two{
                            width:100%;
                            margin-top:20px;
                            text-align: center;
                            overflow: hidden;
                            img{
                                width: 320px;
                                margin-left:45px;
                                height:160px;
                                float:left;
                            }
                        }
                        .three{
                            width:100%;
                            margin-top:20px;
                            text-align: center;
                            overflow: hidden;
                            img{
                                width: 240px;
                                margin-left:15px;
                                float:left;
                                height:120px;
                            }
                        }
                    }
                    .picDetail{
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 30px;
                        letter-spacing: 0px;
                        color: #999999;
                    }
                }
            }
            &.saveBtn{
                width:720px;
                float: left;
                margin-left: 96px;   
                margin-top: -12px;
                overflow:hidden;
                .add{
                    display: inline-block;
                    text-align: center;
                    line-height:35px;
                    float:left;
                    width: 100px;
                    height: 35px;
                    border-radius: 3px;
                    border: solid 1px #cccccc;
                    cursor: pointer;
                }
                .scan{
                    float: right;
                    cursor: pointer;
                }
            }
            &.editor{
                overflow: hidden;
                span{
                    float: left;
                }
                div{
                    float: left;
                    margin-left:8px;
                    width: 700px;
                    height: 400px;
                    max-width: 700px;
                    max-height:400px;
                    min-width: 700px;
                    min-height:400px;
                    border-radius: 3px;
                    border: solid 1px #cccccc;
                    padding:10px;
                }
            }
        }
    }
    .save{
        padding-bottom: 60px;
        text-align: center;
        width: 884px;
        margin: 65px auto 20px;
        span{
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
            line-height:100px;
            margin:30px 0 30px 30px;
            border:1px solid #ccc;
            text-align: center;
            border-radius:3px;
            img{
                max-width: 100%;
                max-height: 100%;
                vertical-align: middle;
            }
        }
    }
}
</style>
