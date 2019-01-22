<template>
    <div class="essp-card-cont-inner esspclearfix">
        <!-- 新闻模块---模版-->
        <div class="descontool">
            <p>
                <span class="descontool__tag"></span>
                <span class="descontool__title">{{temeTitle}}</span>
            </p>
        </div>
        <div v-if="mcCardList && mcCardList.length>0">
            <div class="essp-card" v-for="(item, mcCardIndex) in mcCardList" :key="mcCardIndex">
                <div class="card_left">
                    <img :src="item.titleImg">
                </div>
                <div class="card_cont">
                    <div class="card__head">
                        <p class="head__title" @click="goToDetail(item)">{{item.informationTitle}}</p>
                    </div>
                    <div class="card__dest">
                        <p v-html="item.infoDetail"></p>
                        <div class="fundiv">
                            <span class="funitems">
                                <i class="icon iconfont icon-liulan"></i>
                                <em>{{item.viewTime}}</em>
                            </span>
                                <span class="funitems">
                                <i class="icon iconfont icon-collect2"></i>
                                <em>{{item.countFollower}}</em>
                            </span>
                                <span class="funitems">
                                <i class="icon iconfont icon-pinglun"></i>
                                <em>{{item.countComment}}</em>
                            </span>
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
                    'icon iconfont icon-pinglun'

                ],

                // 关注
                dialogVisible: false,
                followId: ''
            }
        },
        filters:{
            timerFormat(vaule){
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        computed: {
            activityLabelList(){
                let arr = [];
                let brr = [];
                let len = this.mcCardList.length;
                for (let i = 0; i < len; i++) {
                    if (this.mcCardList[i].tagsTxt != undefined) {
                        arr = this.mcCardList[i].tagsTxt.split(',')
                    }else{
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
                if(!this.utils.isLoginMode()){
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function(){
                        _this.windowHrefUrl('/userIndex/login')
                    },2000);
                    return
                }
                if(this.utils.isVisitorMode()){
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
                var url =this.$apiUrl.parkInfo.delMyFocus;
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
            goToDetail(item){
                var informationId = item.informationId;
                this.$router.push({
                    path:'/news/newsdetail',
                    query: {informationId: informationId}
                })
            },
            //图片失败设置默认图
            setDefaultImg (event){
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
    button:focus{outline:0;}
    .essp-card-cont-inner {
        float: left;
        width: 726px;
        /*padding: 20px 20px 0;*/
        background-color: #fff;
        .descontool {
            height: 59px;
            line-height: 100px;
            border-bottom: 1px solid #eee;
            p {
                margin-bottom: 10px;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0;
                color: #999999;
                i {
                    margin-right: 10px;
                    color: #ff9900;
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

            .introduction{
                width:90%;
                color:#999;
                font-size: 14px;
                margin-bottom: 15px;
                height: 40px;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .detail-tag {
                margin-bottom: 10px;
                .it_tag {
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
            }
        }
        .cont-detail-r {
            float:left;
            width:20%;
            .btncon{
                float: left;
                width:80px;
                margin-top:40px;
            }
        }
        .essp-card {
            width: 730px;
            height: 160px;
            margin: 20px auto 0;
            .card_left{
                float: left;
                width:280px;
                height: 160px;
                margin-right: 20px;
                img{
                    width:100%;
                    height: 100%;
                    border:none;
                }
            }
            .card_cont{
                float:left;
                width:430px;
                .card__head {
                    position: relative;
                    height: 60px;
                    p {
                        display: inline-block;
                        font-family: MicrosoftYaHei;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                    }
                    .head__title {
                        font-size: 16px;
                        color: #222222;
                        height: 40px;
                        margin:20px 0 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        &:hover {
                            color: #00a0e9;
                            cursor: pointer;
                        }
                    }
                    .head__time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                .card__dest {
                    margin-top: 10px;
                    p {
                        height: 40px;
                        line-height: 20px;
                        font-family: MicrosoftYaHei;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #999999;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .fundiv {
                        margin: 10px 0;
                        color:#ccc;
                        .funitems {
                            font-size: 12px;
                            i {
                                color: #ccc;
                                font-size: 14px;
                                margin-right: 5px;
                            }
                            .icon-collect2, .icon-pinglun {
                                font-size: 12px;
                            }
                        }
                        em{
                            font-style: normal;
                            margin-right: 20px;
                        }
                    }
                }

            }
        }
        .essp-card:hover{
            box-shadow: 0px 0px 14.2px 0.8px
        rgba(0, 0, 0, 0.08);
        }
        .no_list{
            text-align: center;
            .tipspan{
                display: block;
                font-family: MicrosoftYaHei;
                color: #666666;
                margin-top: 85px;
                font-size: 18px;
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
</style>
