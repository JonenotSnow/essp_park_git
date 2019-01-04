<template>
    <div class="banner-set-up-wrap">
        <div class="main">
            <div class="main-head">
                <span class="head__tag"></span>
                <h3 class="head__title">首页快捷菜单</h3>
                <p class="head__tip">注：所上传图片为首页捷菜单icon</p>
            </div>

            <div class="main-body">
                <div class="body-form">
                    <div class="pt_type">
                        <span style="margin-right: 20px;font-size: 16px;">菜单列数:</span><el-input-number v-model="num1" @change="handleChange" :min="3" :max="5" label=""></el-input-number>
                    </div>
                    <div class="body-card" v-for="(item,index) in bannerSetList" :key="index" @click="getBannerSetIndex(item,index)">
                        <div class="card__title">
                            <p class="card__title-desc">第{{index+1}}个菜单</p>
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
                                    <img v-if="item.src" :src="item.src" class="avatar">
                                    <div class="el-upload__text">
                                        <p class="my-icon"><i class="iconfont icon-tianjia-"></i></p>
                                        <p class="my-upload__text">上传图片</p>
                                    </div>
                                    <div class="change_pic_mask" v-if="item.src">
                                        <span>更改图片</span>
                                    </div>
                                </el-upload>
                                <i class="el-close-btn el-icon-close" @click="deletePic(item,index)" v-if="item.src"></i>
                            </div>
                        </div>
                        <div class="card__link">
                            <p class="card__link-desc"><span>*</span>跳转链接：</p>
                            <div class="card__link-content">
                                <input type="text" class="" v-model="item.path" placeholder="必填">
                            </div>
                        </div>
                        <div class="card__link">
                            <p class="card__link-desc"><span>*</span>菜单名称：</p>
                            <div class="card__link-content">
                                <input type="text" class="" v-model="item.name" placeholder="必填">
                            </div>
                        </div>
                    </div>

                    <div class="body-add">
                        <button @click="addImg()"><span>+</span>新增菜单</button>
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
                getBannerSetIndexNum: 0,  // 当前操作模块索引
                num1: 3,// 当前菜单列数
                parkId: sessionStorage.getItem("parkId") || "",
                bannerSetList:[
                    {
                        name: "发布活动",
                        path: '/parkIndex/launchForm',
                        src: require('@/assets/imgs/icon1.png'),
                        isShow: true,
                    },
                    {
                        name: "发布惠政",
                        path: 'parkIndex/publishGover',
                        src: require('@/assets/imgs/icon2.png'),
                        isShow: true,
                        query: {}
                    },
                    {
                        name: "发布资讯",
                        path: '/parkIndex/publishNewInfo',
                        src: require('@/assets/imgs/icon3.png'),
                        isShow: true,
                        query: {}
                    },
                    {
                        name: "任务池",
                        path: '/parkHall/manage/activityPoolAddPark',
                        src: require('@/assets/imgs/icon4.png'),
                        isShow: false,
                        query: {
                            type: 1
                        }
                    },
                    {
                        name: "惠政管理",
                        path: '/parkIndex/goverBene/all',
                        src: require('@/assets/imgs/icon5.png'),
                        isShow: false,
                        query: {}
                    },
                    {
                        name: "成员管理",
                        path: '/parkHall/manage/userManage',
                        src: require('@/assets/imgs/icon6.png'),
                        isShow: false,
                        query: {}
                    }
                ],

            }
        },
        methods: {
            // 当前数值改变
            handleChange(value) {
                console.log(value);
                this.num1 = value;
            },
            // 上传图片时需要先获取当前操作的第几个模块
            getBannerSetIndex(item,index){
//                console.log(item,index);
                this.getBannerSetIndexNum = index;
            },
            // 添加列表
            addImg(){
                var obj = {
                    img_url: '',
                    link_url:'',
                    title:''
                }
                this.bannerSetList.push(obj);

            },
            // 删除图片
            deletePic(){
                this.bannerSetList[this.getBannerSetIndexNum].img_url = "";
            },
            // 删除轮播列表
            deleteBannerList(item,index){
                this.getBannerSetIndexNum = index;
                console.log(this.bannerSetList);
                if(this.bannerSetList.length <= 0) {
                    this.$message.error("banner图至少保留一张");
                    return;
                }
                this.bannerSetList.splice(index,1)
            },
            saveUploadData(){
//                if(this.bannerSetList.length > 6) {
//                    this.$message.error("banner图至多上传五张");
//                    return;
//                }
                if(this.bannerSetList.length < 0 ) {
                    this.$message.error("banner图至少上传一张");
                    return;
                }
                var num = 0;
                this.bannerSetList.forEach((item,index) => {
                    if(item.img_url == "") {
                        num ++;
                    }
                })
                var len = this.bannerSetList.length - num;
                if(len == 0 ) {
                    this.$message.error("banner图至少上传一张");
                    return;
                }

            },
            // 上传图片(只针对未被上传过的图的上传方式)---60%
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp";
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG或者PNG 或者gif或者bmp格式!');
                    return isJPG;
                }
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过2MB!");
                    return isLt2M;
                }
                //如果是通过新图片上传方式添加的图加一个loding的效果
                var _this = this;
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "active"); // 通过append向form对象添加数据

                this.$post(this.$apiUrl.upload.upload, param).then(
                    response => {

                        this.duringloading = false;
                        if (response.resultCode == 'CLT000000000') {
                            this.bannerSetList[this.getBannerSetIndexNum].img_url = response.resultData[0].url;
                        } else {
                            this.$message.error(response.resultMsg);
                        }
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
                return false; // 返回false不会自动上传
            },
            saveUploadData(){
                if(this.bannerSetList.length <= 0) {
                    this.$message.error("首页配置菜单至少留一个")
                    return;
                }

                this.$post("/parkManage/updatePark", {
                    parkId: this.parkId,
                    quickMenu: JSON.stringify(this.bannerSetList)
                }).then((response) => {
                    if (response.resultCode == "CLT000000000") {

                    } else {
                        this.$message.error(response.resultMsg);
                    }
                }).catch((response) => {
                    this.$message.error(response.resultMsg);
                })
            },
            getParkById() {
                this.$post("/parkManage/getParkById", {
                    parkId: this.parkId
                }).then((response) => {
                    if (response.resultCode == "CLT000000000") {
                        this.$message.error(response.resultMsg);
                    } else {
                        this.$message.error(response.resultMsg);
                    }
                }).catch((response) => {
                    this.$message.error(response.resultMsg);
                })
            }
        },
        mounted() {
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
    .change_pic_mask {
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        color: #fff;
        line-height: 135px;
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
                    padding-bottom: 20px;
                    width: 820px;
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
                        /*height: 90px;*/
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
                            width: 130px;
                            height: 130px;
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
                                width: 100%;

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
    .pt_type {
        font-size: 18px;
        padding-left: 30px;
        padding-bottom: 30px;
        .el-radio__label {
            font-size: 18px;
        }
    }
</style>
