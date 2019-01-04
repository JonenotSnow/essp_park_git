<template>
    <div class="banner-set-up-wrap">
        <div class="main">
            <div class="main-head">
                <span class="head__tag"></span>
                <h3 class="head__title">首页模块配置</h3>
                <p class="head__tip">注：所上传图片为首页捷模块</p>
            </div>
            <div class="main-body">
                <div class="body-form">
                    <div>
                        <el-transfer v-model="checkModules" :titles="titileList" :data="modulesList" @right-check-change="changeChexk"></el-transfer>
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
                checkModules: [1,2,11,12,13],
                titileList: ['所有首页模块','已选模块'], // 框标题
                modulesList:[
                    {
                        label: "banner模块",
                        key: 1
                    },
                    {
                        label: "快捷菜单",
                        key: 2
                    },
                    {
                        label:"办事大厅",
                        key: 3
                    },
                    {
                        label:"中心热门需求",
                        key: 4
                    },
                    {
                        label:"资讯公告",
                        key: 5
                    },
                    {
                        label:"平台活动",
                        key: 6
                    },
                    {
                        label:"数据监测",
                        key: 7
                    },
                    {
                        label:"专家服务团队",
                        key: 8
                    },
                    {
                        label:"成功展示",
                        key: 9
                    },
                    {
                        label:"入驻企业",
                        key: 10
                    },
                    {
                        label:"园区活动",
                        key: 11
                    },
                    {
                        label:"园区惠政",
                        key: 12
                    },
                    {
                        label:"最新资讯",
                        key: 13
                    }

                ]
            }
        },
        created(){
            this.getParkById();
        },
        methods: {
            changeChexk(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            },
            saveUploadData(){
                if(this.checkModules.length <= 0) {
                    this.$message.error("首页配置模块至少留一个")
                    return;
                }
                var selectArr = [];
                this.modulesList.forEach((item,index) => {

                    this.checkModules.forEach((itemChild,indexChild) => {

                        if(item.key == itemChild){
                            selectArr.push(item)
                        }
                    })

                })

                var parkId = sessionStorage.getItem("parkId") || "";

                console.log(selectArr);
                this.$post("/parkManage/updatePark", {
                    parkId: parkId,
                    moduleSet: JSON.stringify(selectArr)
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
                var parkId = sessionStorage.getItem("parkId") || "";
                this.$post("/parkManage/getParkById", {
                    parkId: parkId
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
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
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
                    height: 215px;
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
                        height: 90px;
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
