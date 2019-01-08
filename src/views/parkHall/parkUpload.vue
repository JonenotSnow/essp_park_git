<template>
    <div class="tdcon uploadwraps" :class="parkUploadData.styleClass" >
        <span class="inline_span"><i class="imicon">*</i>{{parkUploadData.title}}</span>
        <div class="uploadcon">
            <div class="avatar-uploader" @click="isMaskShow = true">
                <img v-if="parkUploadData.src" :src="parkUploadData.src" class="avatar">
                <span v-else>
                <i class="icon iconfont icon-tianjia-" style="position: absolute;top: 65px;
                    left: 72px;font-size: 36px;color: #ccc"></i>
                <i style="font-style:normal;position: absolute;top:110px;left:65px;font-weight:normal;">上传图片</i>
                </span>
            </div>
            <div class="upload_tips" v-if="parkUploadData.isPic">{{parkUploadData.isPic}}</div>
        </div>
        <div class="park_upload_mask" v-show="isMaskShow">
            <div class="park_upload_mask_box" v-loading="duringloading"
                element-loading-text="图片正在上传中，请耐心等待"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <div class="park_upload_mask_head" >
                    <el-upload class="uploadbtn" :action="uploads" :show-file-list="false"
                               :before-upload="beforeAvatarUpload">
                        <span><i class="el-icon-circle-plus"></i>上传本地照片</span>
                    </el-upload>
                    <p>图片宽高比7:4，建议尺寸840*480，大小小于2M</p>
                </div>
                <div class="park_upload_mask_body" v-if="isUpload">
                    <img :src="activityPhoto" class="showUpload">
                </div>
                <div class="park_upload_mask_body" v-if="!isUpload">
                    <h3 >从模板中选择配图</h3>
                    <div class="park_uload_img_wrap">
                        <div class="park_uload_img_items esspclearfix" v-for="(item,index) in uploadImgItem[parkUploadData.imgItemType]" :key="index">
                            <h4>{{item.title}}</h4>
                            <div class="park_uload_img_item" :class="indexChild == 1? 'park_uload_img_item_sel':''" v-for="(itemChild,indexChild) in item.items"  @click="tabImgItem(itemChild,indexChild )"  :key="indexChild">
                                <img :src="itemChild.src">
                                <div class="checkdiv" v-show="itemChild.isShow"><i class="el-icon-circle-check"></i><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="park_upload_mask_footer">
                    <el-button style="margin-right: 110px;" type="primary" @click="sureSubmit" size="medium">确&nbsp;&nbsp;&nbsp;定</el-button>
                    <el-button type="primary"  @click="cancel" class="cancelbtns" size="medium">取&nbsp;&nbsp;&nbsp;消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "",
        props: {
            parkUploadData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                uploads: "",
                activityPhoto: "",
                isUpload: false, // 是否是上传的
                itemIndex:'',        // 判断是否和点击的相同
                isMaskShow: false,
                duringloading:false,//是否在上传过程中
                uploadImgItem: {
                    'active': [
                        {
                            title: '比赛',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/bs1.png'),
                                    isShow: false,
                                    index: 1
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/bs2.png'),
                                    isShow: false,
                                    index: 2
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/bs3.png'),
                                    isShow: false,
                                    index: 3
                                }
                            ]
                        },
                        {
                            title: '发布会',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/fb1.png'),
                                    isShow: false,
                                    index: 4
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/fb2.png'),
                                    isShow: false,
                                    index: 5
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/fb3.png'),
                                    isShow: false,
                                    index: 6
                                }
                            ]
                        },
                        {
                            title: '论坛',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/lt1.png'),
                                    isShow: false,
                                    index: 7
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/lt2.png'),
                                    isShow: false,
                                    index: 8
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/lt3.png'),
                                    isShow: false,
                                    index: 9
                                }
                            ]
                        },
                        {
                            title: '培训',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/px1.png'),
                                    isShow: false,
                                    index: 10
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/px2.png'),
                                    isShow: false,
                                    index: 11
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/px3.png'),
                                    isShow: false,
                                    index: 12
                                }
                            ]
                        },
                        {
                            title: '沙龙',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/sl1.png'),
                                    isShow: false,
                                    index: 13
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/sl2.png'),
                                    isShow: false,
                                    index: 14
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/sl3.png'),
                                    isShow: false,
                                    index: 15
                                }
                            ]
                        },
                        {
                            title: '研讨会',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/yth1.png'),
                                    isShow: false,
                                    index: 16
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/yth2.png'),
                                    isShow: false,
                                    index: 17
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/yth3.png'),
                                    isShow: false,
                                    index: 18
                                }
                            ]
                        },
                        {
                            title: '演出',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/yc1.png'),
                                    isShow: false,
                                    index: 19
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/yc2.png'),
                                    isShow: false,
                                    index: 20
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/yc3.png'),
                                    isShow: false,
                                    index: 21
                                }
                            ]
                        },
                        {
                            title: '其他',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/active/qt1.png'),
                                    isShow: false,
                                    index: 22
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/qt2.png'),
                                    isShow: false,
                                    index: 23
                                },
                                {
                                    src: require('@/assets/parkUploadImg/active/qt3.png'),
                                    isShow: false,
                                    index: 24
                                }
                            ]
                        }
                    ],
                    'gover':[
                        {
                            title: '科教文卫',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/kjww1.jpg'),
                                    isShow: false,
                                    index: 1
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/kjww2.jpg'),
                                    isShow: false,
                                    index: 2
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/kjww3.jpg'),
                                    isShow: false,
                                    index: 3
                                }
                            ]
                        },
                        {
                            title: '监管监督',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/jgjd1.jpg'),
                                    isShow: false,
                                    index: 4
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/jgjd2.jpg'),
                                    isShow: false,
                                    index: 5
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/jgjd3.jpg'),
                                    isShow: false,
                                    index: 6
                                }
                            ]
                        },
                        {
                            title: '产业支持',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/cyzc1.jpg'),
                                    isShow: false,
                                    index: 7
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/cyzc2.jpg'),
                                    isShow: false,
                                    index: 8
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/cyzc3.jpg'),
                                    isShow: false,
                                    index: 9
                                }
                            ]
                        },
                        {
                            title: '民政事务',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/mzsw1.jpg'),
                                    isShow: false,
                                    index: 10
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/mzsw2.jpg'),
                                    isShow: false,
                                    index: 11
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/mzsw3.jpg'),
                                    isShow: false,
                                    index: 12
                                }
                            ]
                        },
                        {
                            title: '政务政策',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/zwzc1.jpg'),
                                    isShow: false,
                                    index: 13
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/zwzc2.jpg'),
                                    isShow: false,
                                    index: 14
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/zwzc3.jpg'),
                                    isShow: false,
                                    index: 15
                                }
                            ]
                        },
                        {
                            title: '基建生产',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/jjsc1.jpg'),
                                    isShow: false,
                                    index: 16
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/jjsc2.jpg'),
                                    isShow: false,
                                    index: 17
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/jjsc3.jpg'),
                                    isShow: false,
                                    index: 18
                                }
                            ]
                        },
                        {
                            title: '民族宗教',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/mzzj1.jpg'),
                                    isShow: false,
                                    index: 19
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/mzzj2.jpg'),
                                    isShow: false,
                                    index: 20
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/mzzj3.jpg'),
                                    isShow: false,
                                    index: 21
                                }
                            ]
                        },
                        {
                            title: '对外事务',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/dwsw1.jpg'),
                                    isShow: false,
                                    index: 22
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/dwsw2.jpg'),
                                    isShow: false,
                                    index: 23
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/dwsw3.jpg'),
                                    isShow: false,
                                    index: 24
                                }
                            ]
                        },
                        {
                            title: '财政金融',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/czjr1.jpg'),
                                    isShow: false,
                                    index:25
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/czjr2.jpg'),
                                    isShow: false,
                                    index: 26
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/czjr3.jpg'),
                                    isShow: false,
                                    index: 27
                                }
                            ]
                        },
                        {
                            title: '司法安全',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/gover/sfaq1.jpg'),
                                    isShow: false,
                                    index: 28
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/sfaq2.jpg'),
                                    isShow: false,
                                    index: 29
                                },
                                {
                                    src: require('@/assets/parkUploadImg/gover/sfaq3.jpg'),
                                    isShow: false,
                                    index: 30
                                }
                            ]
                        }
                    ],
                    'information':[
                        {
                            title: '财经新闻',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/information/cjxw1.jpg'),
                                    isShow: false,
                                    index: 1
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/cjxw2.jpg'),
                                    isShow: false,
                                    index: 2
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/cjxw3.jpg'),
                                    isShow: false,
                                    index: 3
                                }
                            ]
                        },
                        {
                            title: '方针政策',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/information/fzzc1.jpg'),
                                    isShow: false,
                                    index: 4
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/fzzc2.jpg'),
                                    isShow: false,
                                    index: 5
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/fzzc3.jpg'),
                                    isShow: false,
                                    index: 6
                                }
                            ]
                        },
                        {
                            title: '行业动态',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/information/hydt1.jpg'),
                                    isShow: false,
                                    index: 7
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/hydt2.jpg'),
                                    isShow: false,
                                    index: 8
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/hydt3.jpg'),
                                    isShow: false,
                                    index: 9
                                }
                            ]
                        },
                        {
                            title: '通知通告',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/information/tztg1.jpg'),
                                    isShow: false,
                                    index: 10
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/tztg2.jpg'),
                                    isShow: false,
                                    index: 11
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/tztg3.jpg'),
                                    isShow: false,
                                    index: 12
                                }
                            ]
                        },
                        {
                            title: '政府公告',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/information/zfgg1.jpg'),
                                    isShow: false,
                                    index: 13
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/zfgg2.jpg'),
                                    isShow: false,
                                    index: 14
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/zfgg3.jpg'),
                                    isShow: false,
                                    index: 15
                                }
                            ]
                        },
                        {
                            title: '专家解读',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/information/zjjd1.jpg'),
                                    isShow: false,
                                    index: 16
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/zjjd2.jpg'),
                                    isShow: false,
                                    index: 17
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/zjjd3.jpg'),
                                    isShow: false,
                                    index: 18
                                }
                            ]
                        },
                        {
                            title: '专栏',
                            items:[
                                {
                                    src: require('@/assets/parkUploadImg/information/zl1.jpg'),
                                    isShow: false,
                                    index: 19
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/zl2.jpg'),
                                    isShow: false,
                                    index: 20
                                },
                                {
                                    src: require('@/assets/parkUploadImg/information/zl3.jpg'),
                                    isShow: false,
                                    index: 21
                                }
                            ]
                        }
                    ],
                }
            }
        },
        methods: {
            // 重置图片勾选清除
            resetItemIsShow(){
                this.uploadImgItem[this.parkUploadData.imgItemType].forEach((item,index) => {
                    item.items.forEach((itemChild,indexChild) => {
                        itemChild.isShow = false;
                    })
                })
            },
            // 切换图片勾选
            tabImgItem(item,index){
                if(this.itemIndex != item.index) {
                    this.resetItemIsShow();
                }

                item.isShow = !item.isShow;
                this.activityPhoto = item.src;
                this.itemIndex = item.index;
            },
            //  点击取消按钮
            cancel(){
                this.resetItemIsShow();
                this.activityPhoto = "";
                this.isMaskShow = false;
                this.isUpload =false
            },
            // 上传图片(只针对未被上传过的图的上传方式)
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
                this.duringloading = true;
                var _this = this;
                var fivemstime = setTimeout(function(){
                    //优化体验效果，前端设置一个20秒的响应时间，超出时间撤去遮罩；
                    _this.duringloading = false;
                    _this.$message.info("上传超时了，请稍后重试")
                },15000);
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "active"); // 通过append向form对象添加数据
                this.$post(this.$apiUrl.upload.upload, param).then(
                    response => {
                        clearTimeout(fivemstime);
                        this.duringloading = false;
                        if (response.resultCode == 'CLT000000000') {
                            this.activityPhoto = response.resultData[0].url;
                            this.isUpload = true;
                        } else {
                            this.$message.error(response.resultMsg);
                        }
                    },
                    err => {
                        clearTimeout(fivemstime);
                        this.duringloading = false;
                        this.$message.error(err.resultMsg);
                    }
                );
                return false; // 返回false不会自动上传
            },
            sureSubmit(){
                 if(this.activityPhoto  == "") {
                     this.$message.error("你还未选择或者上传图片！");
                     return;
                 }
                 var num = 0;
                 if(!this.isUpload) {
                     this.uploadImgItem[this.parkUploadData.imgItemType].forEach((item,index) => {
                         item.items.forEach((itemChild,indexChild) => {
                              if(itemChild.isShow) {
                                  num ++;
                              }
                         })
                     })
                 }
                if(num == 0 & !this.isUpload) {
                    this.$message.error("你还未选择或者上传图片！");
                    return;
                }

                this.isMaskShow = false;
                this.$emit("changeImgUrl",this.activityPhoto);
            }
        },
        created(){
            console.log(this.parkUploadData);
        }
    }
</script>
<style scoped>
    .uploadcon{
        display: flex;
    }
    .showUpload {
        display: block;
        width: 50%;
        margin: 2px auto 15px;
    }
    .park_upload_mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 1500;
        background: rgba(0,0,0,0.5);
    }
    .inline_span_my .inline_span {
        width: 20% !important;
    }
    .uploadwraps .inline_span {
        float: left;
        width: 12%;
        margin-right: 15px;
        font-size: 14px;
        line-height: 40px;
        color: #666666;
        text-align: right;
    }
    .inline_span .imicon {
        color: #ff9900;
        margin-right: 5px;
    }
    .park_upload_mask_footer {
        text-align: center;
        padding:20px 0;
    }
    .park_upload_mask_footer .cancelbtns {
        background: #999;
        border-color:#999;
    }
    .park_upload_mask:after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }
    .park_upload_mask_box {
        display: inline-block;
        width: 50%;
        height: 75%;
        min-height:350px;
        overflow: auto;
        min-width: 500px;
        max-width: 660px;
        padding-bottom: 10px;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        font-size: 18px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        text-align: left;
        overflow: hidden;
        backface-visibility: hidden;
    }
    .checkdiv {
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 24px;
    }
    .checkdiv span {
        position: absolute;
        left: 2px;
        top: 2px;
        background: #fff;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        z-index: 1;
    }
    .checkdiv i {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        font-size: 24px;
        color: #00a0e9;

    }

    .uploadwraps .avatar-uploader{
        /* float: left; */

        display: inline-block;
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .park_uload_img_wrap {
        height: 87%;
        overflow: auto;
    }
    .park_uload_img_items h4 {
        font-size: 18px;
        font-weight: normal;
        padding: 5px 0;
    }
    .park_uload_img_item {
        position: relative;
        float: left;
        width: 32%;
        height: 124px;
        overflow: hidden;
    }
    .park_uload_img_item_sel {
        margin-left: 2%;
        margin-right: 2%;
    }
    .park_uload_img_item img {
        display: block;
        width: 100%;
        min-height: 100%;
    }
    .nametix {
        float: left;
        line-height: 40px;
        margin-right: 10px;
    }
    .uploadwraps .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .park_upload_mask_head {
        padding: 35px 20px 0;
    }
    .park_upload_mask_head span {
        padding-left: 30px;
    }
    .park_upload_mask_head p {
        font-size: 14px;
        text-align: center;
        padding: 10px;
        color: #d3d3d3;

    }
    .park_upload_mask_body {
        padding: 0 20px;
        height: 58%;
    }
    .park_upload_mask_body h3 {
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 20px;
    }
    .uploadwraps .uploadbtn {
        width: 320px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #ccc;
        margin: 0 auto;
    }
    .uploadwraps .uploadbtn .el-icon-circle-plus {
        font-size: 26px;
        color: #00a0e9;
        position: relative;
    }
    .uploadwraps .uploadbtn .el-icon-circle-plus:before {
        position: absolute;
        left: -29px;
        top: -20px;
    }
    .uploadwraps .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style lang='less' scoped>
    //基本信息布局
    .upload_tips {
        width: 650px;
        // padding: 20px 130px;
        // float: left;
        padding-left: 20px;
        display: inline-block;
        height: 14px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #cccccc;
    }
    .tdcon {
        overflow: hidden;
        margin-bottom: 15px;
        .inline_span {
            // float: left;
            width: 12%;
            margin-right: 15px;
            font-size: 14px;
            line-height: 40px;
            color: #666666;
            text-align: right;
        }
        .tdcon_input {
            float: left;
            width: 40%;
        }
        .inline_select {
            float: left;
            width: 250px;
            background-color: #fff !important;
            .el-input {
                float: left;
                width: 100%;
            }
        }
        .inline-picker {
            float: left;
            width: 250px;
        }
        .inline-textarea {
            float: left;
            width: 33%;
        }
        .inline-box {
            float: left;
        }

        .inline_div_tag {
            float: left;
            width: 40%;
            line-height: 40px;
        }
    }
</style>
