<template>
    <div class="banner-set-up-wrap">
        <div class="main">
            <div class="main-head">
                <span class="head__tag"></span>
                <h3 class="head__title">首页轮播图</h3>
                <p class="head__tip">注：所上传图片为首页轮播图，每张最大{{tipTit[radio].size}}M，建议分辨率为{{ tipTit[radio].power}}像素。</p>
            </div>

            <div class="main-body">
                <div class="body-form">
                    <div class="pt_type">
                        <el-radio-group v-model="radio" @change="changeRadio">
                            <el-radio  label="0">PC首页轮播图</el-radio>
                            <el-radio  label="1">手机首页轮播图</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="body-card" v-for="(item,index) in bannerSetList":key="index" @click="getBannerSetIndex(item,index)">
                        <div class="card__title">
                            <p class="card__title-desc">第{{index+1}}张banner</p>
                            <p class="card__title-operation"><i class="el-icon-delete" @click="deleteBannerList(item,index)"></i></p>
                        </div>
                        <div class="card__img esspclearfix">
                            <p class="card__img-desc"><span>*</span>上传图片：</p>
                            <div class="card__img-content">
                                <el-upload
                                    class="uploadbtn uploadbtnss"
                                    :show-file-list="false"
                                    :attr_index="index"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img v-if="item.img_url" :src="item.img_url" class="avatar">
                                    <div class="el-upload__text">
                                        <p class="my-icon"><i class="iconfont icon-tianjia-"></i></p>
                                        <p class="my-upload__text">上传图片</p>
                                    </div>
                                    <div class="change_pic_mask" v-if="item.img_url">
                                        <span>更改图片</span>
                                    </div>
                                </el-upload>
                                <i class="el-close-btn el-icon-close" @click="deletePic(item,index)" v-if="item.img_url"></i>
                            </div>
                        </div>
                        <div class="card__link">
                            <p class="card__link-desc">跳转链接：</p>
                            <div class="card__link-content">
                                <input type="text" class="" v-model="item.link_url" placeholder="选填">
                            </div>
                        </div>
                    </div>

                    <div class="body-add">
                        <button @click="addImg()"><span>+</span>新增图片</button>
                    </div>
                    <div class="save_upload_btn" @click="saveUploadData">保存上传</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'banner-set-up',
        props: {},
        components: {},
        data() {
            return {
                msg: 'banner-set-up',
                radio: "0", // 上传图片是否是PC端
                getBannerSetIndexNum: 0,  // 当前操作模块索引
                isClick: true,
                tipTit:[
                    {
                        size: 2,  // 2M
                        power: "1920 * 540"
                    },
                    {
                        size: 1,  // 1M
                        power: " 726 * 300"
                    }
                ],
                bannerSetList: [],
                parkId : sessionStorage.getItem("parkId") || ""

            }
        },
        created(){
            this.getParkById()
        },
        methods: {
            // 上传图片时需要先获取当前操作的第几个模块
            getBannerSetIndex(item,index){
                console.log(item,index);
                if(this.isClick) {
                    this.getBannerSetIndexNum = index;
                }

            },
            // 添加列表
            addImg(){
                console.log(this.bannerSetList);
                var obj = {
                    img_url: '',
                    link_url:''
                }
                this.bannerSetList.push(obj);


            },
            // 删除图片
            deletePic(item,index){
                this.bannerSetList.splice(index,1)
            },
            // 删除轮播列表
            deleteBannerList(item,index){
                if(this.bannerSetList.length <= 0) {
                    this.$message.error("banner图至少保留一张");
                    return;
                }
                this.bannerSetList.splice(index,1)
            },
            saveUploadData(){
                if(this.bannerSetList.length > 5) {
                    this.$message.error("banner图至多上传五张");
                    return;
                }
                if(this.bannerSetList.length < 0 ) {
                    this.$message.error("banner图至少上传一张");
                    return;
                }
                var num = 0;
                this.bannerSetList.map((item,index) => {
                    if(item.img_url == "") {
                        num ++;
                    }
                })


                var len = this.bannerSetList.length - num;
                // var lenUrl = this.bannerSetList.length - urlNum;
                if(len == 0 ) {
                    this.$message.error("banner图至少上传一张");
                    return;
                }


                let urlList =[]; // 图片路径
//                urlList= JSON.stringify(this.bannerSetList)
                urlList= this.bannerSetList;
                let paramsObj = this.radio ==="0"?{slidesImage:urlList,parkId: this.parkId}:{appBanner:urlList,parkId: this.parkId}

                this.$post("/parkManage/updatePark", paramsObj).then((response) => {
                    if (response.resultCode == "CLT000000000") {
                        this.$message.success(response.resultMsg);
                    } else {
                        this.$message.error(response.resultMsg);
                    }
                }).catch((response) => {
                    this.$message.error(response.resultMsg);
                })

            },
            // 上传图片(只针对未被上传过的图的上传方式)---60%
            beforeAvatarUpload(file,index) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp";
                var maxSize = this.tipTit[this.radio].size;   // 最大上传大小
                const isLt2M = file.size / 1024 / 1024 < maxSize;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG或者PNG 或者gif或者bmp格式!');
                    return isJPG;
                }
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过"+maxSize+"MB!");
                    return isLt2M;
                }
                //如果是通过新图片上传方式添加的图加一个loding的效果
                var _this = this;
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "active"); // 通过append向form对象添加数据
                this.isClick = false;
                this.$post(this.$apiUrl.upload.upload, param).then(
                    response => {
                        this.isClick = true;
                        if (response.resultCode == 'CLT000000000') {
                            console.log(this.getBannerSetIndexNum)
                            this.bannerSetList[this.getBannerSetIndexNum].img_url = response.resultData[0].url;
                        } else {
                            this.$message.error(response.resultMsg);
                        }
                    },
                    err => {
                        this.isClick = true;
                        this.$message.error(err.resultMsg);
                    }
                );
                return false; // 返回false不会自动上传
            },
            // 获取当前banner图数据
            getParkById(){
                this.$post("/parkManage/getParkById", {
                    parkId: this.parkId
                }).then(res => {
                    if (res.resultCode == "CLT000000000") {
                        this.bannerSetList = JSON.parse(res.resultData.slidesImage);
                        console.log(this.bannerSetList);
                    }
                });
            }

        }
    }
</script>
<style>
    .uploadbtnss .el-upload--text {
        padding-top: 20px;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

    .save_upload_btn {
        width: 180px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        color: #fff;
        margin: 0 auto;
        margin-top: 40px;
        text-align: center;
        background: #1598ff;
        background: -webkit-gradient(linear, left top, right top, from(#1598ff), to(#36bffd));
        background: linear-gradient(to right, #1598ff 0%, #36bffd 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1598ff', endColorstr='#36bffd', GradientType=0);
    }
    .el-close-btn {
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 14px;
        z-index: 1;
        color: #fff;
        cursor: pointer;
    }
    .pt_type {
        font-size: 18px;
        padding-left: 30px;
        padding-bottom: 30px;
        .el-radio__label {
            font-size: 18px;
        }
    }
    .change_pic_mask {
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        color: #fff;
        line-height: 90px;
        font-size: 16px;
        text-align: center;
    }
    .uploadbtn {
        position: relative;
        text-align: center;
        height: 100%;
        /*padding-top: 18px;*/
        .avatar {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            min-width: 100%;
        }
        .my-icon {
            margin-left: 14px;
            width: 28px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            vertical-align: middle;
            i {
                font-size: 28px;
                color: #ccc;
            }
        }

        .my-upload__text {
            margin-top: 5px;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #cccccc;
        }
    }
    .banner-set-up-wrap {
        background-color: #fff;
        .main {
            margin-left: 40px;
            width: 930px;
            margin-bottom: 50px;
            padding-bottom: 50px;
            .main-head {
                width: 100%;
                height: 30px;
                line-height: 30px;
                margin-bottom: 50px;
                padding-top: 50px;
                .head__tag {
                    float: left;
                    margin-right: 20px;
                    width: 8px;
                    height: 30px;
                    background-color: #10b5ff;
                }
                .head__title {
                    float: left;
                    width: 160px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 3.6px;
                    color: #333333;
                }
                .head__tip {
                    float: right;
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #00a0e9;
                }
            }
            .main-body {
                .body-card {
                    margin-left: 20px;
                    width: 820px;
                    padding-bottom: 20px;
                    .card__title {
                        height: 35px;
                        line-height: 35px;
                        background-color: #e6f4ff;
                        .card__title-desc {
                            float: left;
                            margin-left: 10px;
                            width: 95px;
                            height: 35px;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 35px;
                            letter-spacing: 0.4px;
                            color: #00a0e9;
                        }
                        .card__title-operation {
                            float: right;
                            margin-right: 10px;
                            color: #999;
                        }
                    }
                    .card__img {
                        margin-top: 20px;
                        .card__img-desc {
                            float: left;
                            padding-right: 10px;
                            width: 90px;
                            text-align: right;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 40px;
                            letter-spacing: 0.4px;
                            color: #666666;
                            span {
                                color: #ff0000;
                            }
                        }
                        .card__img-content {
                            position: relative;
                            float: left;
                            width: 198px;
                            height: 88px;
                            -webkit-border-radius: 3px;
                            -moz-border-radius: 3px;
                            border-radius: 3px;
                            border: dashed 1px #cccccc;
                            overflow: hidden;
                            .avatar-uploader {
                                position: relative;
                                width: 200px;
                                height: 90px;
                                line-height: 90px;
                                text-align: center;
                                i {
                                    font-size: 28px;
                                    color: #ccc;
                                }
                                p {
                                    color: #ccc;
                                    font-size: 14px;
                                }


                            }

                            .avatar {
                                display: block;
                                width: 200px;
                                height: 90px;
                            }

                        }
                        clear: both;
                    }

                    .card__link {
                        margin-top: 15px;
                        height: 35px;
                        line-height: 35px;
                        .card__link-desc {
                            float: left;
                            padding-right: 10px;
                            width: 90px;
                            text-align: right;
                            span {
                                color: #ff0000;
                            }
                        }
                        .card__link-content {
                            float: left;
                            input {
                                padding-left: 10px;
                                width: 417px;
                                height: 33px;
                                line-height: 35px;
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0.1px;
                                color: #999999;
                                border-radius: 3px;
                                border: solid 1px #cccccc;
                            }
                        }

                    }
                }

                .body-add {
                    margin-left: 120px;
                    button {
                        display: block;
                        width: 100px;
                        height: 35px;
                        line-height: 35px;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0.1px;
                        color: #666666;
                        border-radius: 3px;
                        border: solid 1px #cccccc;
                        background-color: #fff;
                        cursor: pointer;
                        span {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
