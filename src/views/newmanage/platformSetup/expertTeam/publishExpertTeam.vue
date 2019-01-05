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
                <input type="text" placeholder="请输入专家姓名">
            </li>
            <li>
                <span class="require">*</span>
                <span class="title">专家职称：</span>
                <select placeholder="请输入专家职称">
                    <option :value="item.id" :label="item.name" v-for="(item,index) in searchList" :key="index">{{item.name}}</option>
                </select>
            </li>
            <li class="pic">
                <span class="require">*</span>
                <span class="title">专家头像：</span>
                <el-upload
                    class="avater-uploader"
                    :before-upload="beforeUpload"
                    :action='uploads'>
                    <i class="icon iconfont icon-tianjia- tianjia"></i>
                    <p class="detil">上传图片</p>
                </el-upload>
                <span class="sub1">（图片高宽7：4，每张最大2M,建议分辨率为840*480像素，支持jpg/jpeg/png格式。）</span>
            </li>
            
            <li>
                <span class="require">*</span>
                <span class="title">联系电话：</span>
                <input type="text" placeholder="请输入联系电话">
            </li>
            
            <li>
                <span class="require">*</span>
                <span class="title">联系邮箱：</span>
                <input type="text" placeholder="请输入联系邮箱">
            </li>
            <li class="resume">
                <span class="require">*</span>
                <span class="title">专家简介：</span>
                <textarea placeholder="请输入专家简介"></textarea>
                <div class="moduleContent"  @click="getCurType('content')" v-for="(it,moudelIndex) in moduleList" :key="moudelIndex">
                    <div class="title">
                        <el-input type="text" :placeholder="`请输入模块${moudelIndex+1}标题`" v-model="it.title"></el-input>
                        <div class="titleRight">
                            <span>选择模块类型：</span>
                            <el-select v-model="it.isPic">
                                <el-option label="无配图" value="0"></el-option>
                                <el-option label="可配图" value="1"></el-option>
                            </el-select>
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
                    <p class="picDetail" v-if="it.isPic == '1'">注：可上传1-3张图片，支持jpg/jpeg/gif/png等格式上传，图片尺寸宽：高为2：1，建议尺寸800*400像素、大小2M内、尺寸一致。</p>
                    <hr class="divider">
                </div>
            </li>
            
            <li>
                <span class="add">添加新模块</span>
                <span class="scan">预 览</span>
            </li>
        </ul>
        <p class="save">
            <span>保存上传</span>
        </p>
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
                    name: "专家团队"
                },
                {
                    path: "",
                    name: "发布专家团队"
                }
            ],
            moduleList:[]
        }
    },
    created() {
        
    },
    methods: {
        //图片上传
        beforeUpload(file) {
            const isJPG = file.type === "image/jpeg" || file.type === "image/png"  || file.type === "image/gif";
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
            this.$post(this.$apiUrl.upload.upload,param).then(response => {
                
            },err=>{
                this.$message.error("接口异常")
            })
            return false // 返回false不会自动上传
        },
    },
}
</script>

<style lang='less' scoped>
#publishAchievement{
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
            .title,.title1{
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0.4px;
                color: #666666;
                display: inline-block;
                width:72px;
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
                overflow: hidden;
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
                    width:100%;
                    margin-bottom:40px;
                    &>.title{
                        font-size: 16px;
                        color: #444444;

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
                    &:nth-last-of-type(1){
                        &>div{
                            border-bottom: none;
                        }
                    }
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
        margin: 40px auto 20px;
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
}
</style>
