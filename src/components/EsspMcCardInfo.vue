<template>
    <div class="essp-card-cont-inner esspclearfix">
        <!-- 全部资讯/关注资讯/审核资讯页 模版-->
        <div v-if="mcCardList && mcCardList.length>0">
            <div class="essp-card" v-for="(item, mcCardIndex) in mcCardList" :key="mcCardIndex">
                <div class="cont-img" @click="goinfoDetail(item)">
                    <img class="detaillogo" :src="item.titleImg" alt="" @error="setDefaultImg($event)">
                    <div class="img-detail">
                        <p class="cost">{{item.createTime|timerFormat(item.createTime)}}</p>
                    </div>
                </div>
                <div class="cont-detail">
                    <h5 @click="goinfoDetail(item)">{{item.informationTitle}}</h5>
                    <div class="esspclearfix">
                        <div class="cont-detail-l">
                            <p class="introduction">
                                {{item.content}}
                            </p>
                            <p class="icon_p_font">
                                <span><i :class="icons[0]"></i>{{item.viewTime}}</span>
                                <span><i :class="icons[1]"></i>{{item.countFollower}}</span>
                                <span><i :class="icons[2]"></i>{{item.countComment}}</span>
                            </p>

                        </div>
                        <div class="cont-detail-r">
                            <div class="btncon" v-if="chilrPageType=='allInfos'">
                                <el-button type="primary" size="mini" round  @click="goinfoDetail(item)">查看详情</el-button>
                            </div>
                            <div class="btncon" v-if="chilrPageType=='followInfo'">
                                <el-button type="info"  size="mini" round  @click="showDialog(item)">取消关注</el-button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div v-else>
            <div style="text-align: center">暂无数据</div>
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
            chilrPageType:{
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

            // upDatefollowStatus(item){
            //     var pop ={followId:item.followId}
            //     var url =this.$apiUrl.parkInfo.delMyFocus;
            //     var successMsg ="取消关注成功";
            //     var failMsg = "取消关注失败";
            //     var tpl = "此操作取消关注该资讯, 是否继续?";
            //     var tplTitle = "温馨提示"
            //     this.$confirm(tpl, tplTitle, {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         this.$post(url,pop)
            //         .then((response) => {
            //              var codestatus = response.resultCode;
            //              if(codestatus=="CLT000000000"){
            //                 this.$message.success(successMsg);
            //                 this.$router.go(0);
            //              }else{
            //                 this.$message.error(failMsg+response.resultMsg);
            //              }
            //         },(err)=>{
            //            this.$message.error("接口异常");
            //         })
            //     }).catch(() => {
            //         this.$message.info("已取消操作")
            //     });
            //
            // },

            goinfoDetail(item){
                var informationId = item.informationId;
                this.$router.push({path:'/parkIndex/infoDetail',query: {informationId: informationId}})
            },
              //图片失败设置默认图
            setDefaultImg (event){
                var ele = event.currentTarget;
                ele.src = imgfault;
                ele.title = "默认配图";
            },
            toLink() {
                var type = this.types;
                var url = '/parkIndex/parkInformation/infoDetail';
                this.$router.push(url)
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../assets/css/mixin";
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
        padding: 20px 20px 0;
        background: #fff;
        .cont-detail-l {
            float:left;
            width:80%;
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
                    color: #ccc;
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
            background-color: #ffffff;
            padding: 20px 0;
            width: 730px;
            height: 140px;
            border-bottom: 1px solid #eee;
            transition: all 1s;
            &:hover{
                zoom:1;
                box-shadow: 0px 0px 14.2px 0.8px rgba(0, 0, 0, 0.08);
                position: relative;
                .cont-img{
                    margin-left: 20px;
                }
                .cont-detail{
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
                /*&:hover .img-detail{*/
                /*// display: block;*/
                /*transform: scale(1.02);*/
                /*}*/
                .detaillogo {
                    display: block;
                    width: 100%;
                    height: 100%;
                    transition: all 1s;
                    /*&:hover{*/
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
                    .esspopacity(@value:0.7);//调节透明度
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
                    //.esspellipsis();
                    cursor: pointer;
                    //margin-top: 10px;
                    margin-bottom: 8px;
                    width: 100%;
                    height: 45px;
                    line-height: 24px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0;
                    color: #444;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

            }
        }
    }
</style>
