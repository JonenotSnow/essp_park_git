<template>
    <div class="essp-card-cont-outer-news esspclearfix">
        <!-- 新闻模块---模版-->
        <div class="descontool">
            <p>
                <span class="descontool__tag"></span>
                <span class="descontool__title">{{temeTitle}}</span>
            </p>
        </div>
        <div class="essp-card-cont-inner-news"  v-if="mcCardList && mcCardList.length>0">>
            <div class="essp-card" v-for="(item, mcCardIndex) in mcCardList" :key="mcCardIndex">
                <div class="cont-img" @click="toLink(item)">
                    <img class="detaillogo" :src="item.titleImg">
                    <div class="img-detail">
                        <p class="enrolled">{{item.createTime | timerFormat}}</p>
                    </div>
                </div>
                <div class="cont-detail">
                    <h5 @click="toLink(item)">
                        {{item.informationTitle}}
                    </h5>
                    <div class="cont-detail-l">
                        <div class="cont-detail-l-content" v-html="item.infoDetail"></div>
                        <p class="icon_p_font">
                            <span class=""><i :class="icons[0]" style="color: #ccc"></i>{{item.viewTime}}</span>
                            <span><i :class="icons[1]" style="color: #ccc"></i>{{item.countFollower}}</span>
                            <span><i :class="icons[3]" style="color: #ccc"></i>{{item.countComment}}</span>
                        </p>
                    </div>
                    <div class="cont-detail-r">
                        <div class="btncon" v-if="chilrPageType=='getAllInformation'">
                            <el-button type="primary" size="mini" round  @click="goInfoDetail(item)">查看详情</el-button>
                        </div>
                        <div class="btncon" v-if="chilrPageType=='actAll'">
                            <el-button type="info"  size="mini" round  @click="showDialog(item)">取消关注</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="noDataInfo">
            <div class="no-list-pic">
                <img src="@/assets/newparkimg/no-list-img.png" alt="">
                <div class="no-list-desc">
                    暂无数据
                </div>
            </div>
        </div>
        <!-- 关注事件对话框start -->
        <el-dialog class="quguanbox"
                   title="提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :before-close="handleClose">
            <!-- <span style="display: inline-block; width: 100%; text-align: center;font-size: 16px">确定取消该关注？</span> -->
            <div>
                <i class="icon iconfont icon-tishi"></i><span class="quguan">是否取消该关注</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancleFocus()">确 认</el-button>
            </span>
        </el-dialog>
        <!-- 关注事件对话框end -->
    </div>
</template>

<script>
    import imgfault from "@/assets/error.png";//引入加载失败默认图
    import Moment from "moment";

    export default {
        name: 'EsspMcCard',
        props: {
            mcCardList: {
                type: Array,
                default: []
            },
            chilrPageType: {
                type: String
            },
            temeTitle: {
                type: String
            }
        },
        data() {
            return {
                msg: 'EsspMcCard',
                icons: [
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2",
                    'icon iconfont icon-pinglun',
                    "icon iconfont icon-info"
                ],

                // 关注
                dialogVisible: false,
                followId: ''
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        computed: {
            activityLabelList() {
                let arr = [];
                let brr = [];
                let len = this.mcCardList.length;
                for (let i = 0; i < len; i++) {
                    if (this.mcCardList[i].tagsTxt != undefined) {
                        arr = this.mcCardList[i].tagsTxt.split(',')
                    } else {
                        arr = [];
                    }
                    brr.push(arr)
                }
                return brr
            }
        },
        methods: {
            /**
             * 发送意向相关事件
             */
            // 弹窗
            showDialog(item) {
                if (!this.utils.isLoginMode()) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function () {
                        _this.windowHrefUrl('/userIndex/login')
                    }, 2000);
                    return
                }
                if (this.utils.isVisitorMode()) {
                    this.$message.warning("您暂无权限进行关注/取消关注");
                    return;
                }
                this.dialogVisible = true;
                this.followId = item.informationId;
            },
            cancleFocus() {
                this.cancelMyFocus(this.followId);
            },
            cancelMyFocus(followId) {
                var url = this.$apiUrl.parkInfo.delMyFocus;
                this.$post(url, {
                    followId: followId,
                    parkId: window.sessionStorage.getItem("parkId")
                }).then(
                    response => {
                        if (response.resultCode == "CLT000000000") {
                            this.dialogVisible = false;
                            this.$message.success(response.resultMsg);
                            this.$router.go(0);
                        } else {
                            this.$message({
                                type: "info",
                                message: response.resultMsg
                            });
                        }
                    },
                    err => {
                        this.$message({
                            type: "info",
                            message: response.resultMsg
                        });
                    }
                );
            },
            goInfoDetail(item){
                var informationId = item.informationId;
                this.$router.push({
                    path: '/news/newsdetail',
                    query: {informationId: informationId}
                })
            },
            //图片失败设置默认图
            setDefaultImg(event) {
                var ele = event.currentTarget;
                ele.src = imgfault;
                ele.title = "默认配图";
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

    .noDataInfo {
        margin-top: 100px;
        margin-bottom: 50px;
        text-align: center;
        .no-list-pic {
            padding-left: 262px;
            width: 245px;
            height: 189px;
        }
    }

    .address_p {
        width: 94%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    button:focus {
        outline: 0;
    }

    .essp-card-cont-outer-news {
        float: left;
        width: 755px;
        background-color: #fff;
        .descontool {
            height: 59px;
            line-height: 100px;
            border-bottom: 1px solid #ccc;
            p {
                margin-top: 40px;
                margin-left: 40px;
                height: 30px;
                line-height: 30px;
                span {
                    display: inline-block;
                }
                .descontool__tag {
                    width: 8px;
                    height: 30px;
                    background-color: #10b5ff;
                }
                .descontool__title {
                    margin-left: 22px;
                    height: 30px;
                    line-height: 30px;
                    vertical-align: top;
                    font-size: 18px;
                    font-weight: 500;
                    font-stretch: normal;
                    letter-spacing: 3.6px;
                    color: #333;
                }
            }
        }
    }

    .essp-card-cont-inner-news .essp-card .it_tag {
        background: #fff;
        color: #999;
        border-radius: 10px;
        min-width: 20px;
        // max-width: 80px;
        font-size: 12px;
        height: 22px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #999;
        overflow: hidden;
    }

    .essp-card-cont-inner-news {
        float: left;
        width: 715px;
        padding: 20px 20px 0;
        background: #fff;

        .cont-detail-l {
            float: left;
            width: 76%;
            .tag_btn_p {
                height: 18px;
            }
        }
        .cont-detail-r {
            float: right;
            width: 22%;
            margin-top: 54px;
            text-align: right;
        }
        .essp-card {
            background-color: #ffffff;
            padding: 20px 0;
            width: 730px;
            height: 140px;
            border-bottom: 1px solid #eee;
            transition: all 1s;
            &:hover {
                zoom: 1;
                box-shadow: 0px 0px 14.2px 0.8px rgba(0, 0, 0, 0.08);
                position: relative;
                .cont-img {
                    margin-left: 20px;
                }
                .cont-detail {
                    margin-left: 15px;
                }
            }
            .cont-img {
                position: relative;
                float: left;
                width: 245px;
                height: 100%;
                cursor: pointer;
                transition: all 1s;
                /*&:hover{*/
                /*.img-detail {*/
                /*display: block;*/
                /*transform: scale(1.02);*/
                /*}*/
                /*}*/
                .detaillogo {
                    display: block;
                    width: 100%;
                    height: 100%;
                    transition: all 1s;
                    /*&:hover {*/
                    /*transform: scale(1.02);*/
                    /*}*/
                }

                .img-detail {
                    // display: none;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    background-color: #000000;
                    opacity: 0.8;
                    transition: all 1s;
                    p {
                        position: absolute;
                        top: 0;
                        color: #fff;
                        font-size: 12px;
                        line-height: 20px;
                    }
                    .enrolled {
                        left: 10px;

                    }
                    .cost {
                        right: 10px;
                    }
                }
            }
            .cont-detail {
                position: relative;
                float: left;
                margin-left: 35px;
                width: 430px;
                height: 100%;
                transition: all 1s;
                h5 {
                    cursor: pointer;
                    //margin-top: 10px;
                    margin-bottom: 34px;
                    width: 100%;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    color: #444;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: -o-ellipsis-lastline;
                    text-overflow: ellipsis;
                }
                .cont-detail-l-content {
                    height: 42px;
                    line-height: 24px;
                    overflow: hidden;
                }
                p {
                    font-size: 12px;
                    margin-top: 23px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0;
                    color: #999999;
                    i {
                        margin-right: 10px;
                        color: #ff9900;
                        font-size: 12px;
                    }
                    span {
                        margin-right: 20px;
                    }
                }
                .icon_p_font {
                    i {
                        font-size: 14px;
                    }
                    .icon-collect2:before {
                        font-size: 12px;
                    }
                    .icon-pinglun {
                        font-size: 12px;
                    }
                }
                p.detail-tag {
                    span {
                        margin-right: 10px;
                        min-width: 50px;
                        max-width: 90px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: -o-ellipsis-lastline;
                        text-overflow: ellipsis;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        color: #999999;
                        border-radius: 10px;
                        border: solid 1px #999999;
                        background-color: #fff;
                    }
                    .tag-enroll {
                        margin-left: 25px;
                        margin-right: 25px;
                        background-color: #ff7210;
                    }
                }
                .essp-btn {
                    min-width: 80px;
                    padding: 0 10px;
                    height: 28px;
                    font-size: 14px;
                    color: #fff;
                    border-radius: 14px;
                    margin-bottom: 10px;
                    border: 1px solid #fff;
                    outline: none;
                }

                .btn-enroll {
                    background-color: #00a0e9;
                    cursor: pointer;
                }
                .btn-cancle {
                    background-color: #ccc;
                }
            }
        }
    }
</style>
