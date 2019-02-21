<template>
    <div class="essp-card-cont-inner esspclearfix">
        <div class="essp-card" v-for="(item, mcCardIndex) in mcCardList" v-if="mcCardList.length>0" :key="mcCardIndex">
            <div class="cont-img" @click="toLink(item)">
                <img class="detaillogo" :src="item.titleImg" @error="setDefaultImg($event)">
                <p class="applied-people applied-people__bg"></p>
                <span class="applied-people applied-people__desc">已申请：{{item.approvedNum || "0"}}人</span>
            </div>
            <div class="cont-detail">
                <h5 @click="toLink(item)">
                    {{item.policyTitle}}
                </h5>
                <div class="cont-detail-l">
                    <p class="tag_btn_p">
                        <essp-park-tag v-for="(item, eptIndex) in activityLabelList[mcCardIndex]" :value="item"
                                       v-if="eptIndex<3" :key="eptIndex"/>
                    </p>
                    <p>
                        <i :class="icons[0]"
                           style="color:#ccc;"></i>发布时间：{{item.createTime | timerFormat(item.createTime)}}</p>
                    <p>
                        <i :class="icons[1]" style="color:#ccc;"></i>发起方：{{item.cstNm}}</p>
                    <p class="icon_p_font">
            <span>
              <i :class="icons[2]"></i>{{item.viewTime || 0}}</span>
                        <span>
              <i :class="icons[3]"></i>{{item.countFollower || 0}}</span>
                    </p>
                </div>
                <div class="cont-detail-r 123" v-if="LoginUserRol == '11'">
                    <button type="primary" v-if="item.btn.length>0" class="essp-btn btn-cancle"
                            v-for="(itemChild,index) in item.btn" :key="index">{{itemChild.name}}
                    </button>
                </div>
                <div class="cont-detail-r  456" v-else>
                    <button type="primary" class="essp-btn" :class="itemChild.clicked?'btn-enroll':'btn-cancle'"
                            v-for="(itemChild,index) in item.btn" :key="index"
                            @click="enrollToPage(itemChild,item,mcCardIndex)">{{itemChild.name}}
                    </button>
                </div>

                <!--class: btn-enroll btn-cancle-->

                <!--v-if="mcCardData.enrollStatus === 'enrollSuccess'"-->
                <!--v-if="mcCardData.enrollStatus === 'enrollAuditing'"-->
                <!--<span class="tag-enroll">已报名</span>{{mcCardData.peopleNum}}人-->
                <!--<p><i :class="mcCardData.cost.icon"></i>费用：{{mcCardData.cost.detail}}</p>-->
            </div>
        </div>
        <div v-show="mcCardList.length==0" v-cloak>
            <!-- <div style="text-align: center">{{lodingMsg}}</div> -->
            <essp-loading :loading="isLodingTxt == '数据加载中'" :nodata="isLodingTxt == '数据完毕!'"></essp-loading>
        </div>
        <!-- 关注事件对话框start -->
        <el-dialog class="quguanbox" title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <!-- <span style="display: inline-block; width: 100%; text-align: center;font-size: 16px">确定取消该关注？</span> -->
            <div>
                <i class="icon iconfont icon-tishi"></i>
                <span class="quguan">是否取消该关注</span>
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
    import Moment from "moment";
    import imgfault from "@/assets/error.png"; //引入加载失败默认图
    import EsspParkTag from "@/components/EsspParkTag";
    import mixin from "@/components/mixins/mixins_windowOpen.js";

    export default {
        name: "EsspMcCard",
        mixins: [mixin],
        props: {
            mcCardList: {
                type: Array,
                default: [1, 2, 3, 4, 5]
            },
            chilrPageType: {
                type: String
            },
            isLodingTxt: {
                type: String
            }
        },
        components: {
            EsspParkTag
        },
        data() {
            return {
                msg: "EsspMcCard",
                tag: ["美食", "创业", "交流"],
                dateType: "yyyy-MM-dd hh:mm",
                icons: [
                    "icon iconfont icon-riqi1",
                    "icon iconfont icon-dizhi",
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2"
                ],
                thisShowBtn: [],
                btn: [],

                // 关注
                dialogVisible: false,
                followId: "",
                index: "",
                LoginUserRol: sessionStorage.getItem("LoginUserRol").toString()
            };
        },
        methods: {
            toLink(item) {
                var type = this.types;
                var url = "/parkIndex/goverBeneDetail";
                this.$router.push({
                    path: url,
                    query: {
                        id: item.id
                    }
                });
            },
            //图片失败设置默认图
            setDefaultImg(event) {
                var ele = event.currentTarget;
                ele.src = imgfault;
                ele.title = "默认配图";
            },

            enrollToPage(childItem, item, index) {
                if (childItem.type == 1) {
                    //onsole.log(item);
                    var url = "/parkIndex/goverEnrollForm?id=" + item.id;
                }
                // 取消关注
                if (childItem.type == 3) {
                    console.log();
                    this.showDialog(item.followId, index);
                    // this.cancelMyFocus(item.followId, index);
                }

                this.$router.push(url);
            },

            /**
             * 发送意向相关事件
             */
            // 弹窗
            showDialog(followId, index) {
                if (!this.utils.isLoginMode()) {
                    var _this = this;
                    this.$message.warning("您尚未登陆，请您先登陆");
                    setTimeout(function () {
                        _this.windowHrefUrl("/userIndex/login");
                    }, 2000);
                    return;
                }
                if (this.utils.isVisitorMode()) {
                    this.$message.warning("您暂无权限进行关注/取消关注");
                    return;
                }
                this.dialogVisible = true;
                this.followId = followId;
            },
            cancleFocus() {
                this.cancelMyFocus(this.followId, this.index);
            },
            cancelMyFocus(followId, index) {
                this.$post(this.$apiUrl.goverBene.cancelMyFocus, {
                    followId: followId
                }).then(
                    response => {
                        // var codestatus = response.resultCode;
                        // if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                        this.dialogVisible = false;
                        this.$message.success(response.resultMsg);
                        // this.mcCardList.splice(index, 1);
                        this.$emit("deleteCardList", {});
                        // alert("后台待优化中,需要返回更新的关注成功后，需要followId+followStatus非0，取消关注成功后需要followId 重置，followStatus为0")
                        // } else {
                        //     this.$message.error(response.resultMsg);
                        // }
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },

            stringToArray(value) {
                return JSON.parse(value).split(",");
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        },
        watch: {
            isLodingTxt: {
                handler(newValue, oldValue) {
                    console.log(newValue, oldValue);
                    this.isLodingTxt = newValue;
                    console.log(this.isLodingTxt);
                }
            }
        },
        computed: {
            activityLabelList() {
                let arr = [];
                let brr = [];
                let len = this.mcCardList.length;
                for (let i = 0; i < len; i++) {
                    if (this.mcCardList[i].tagsTxt != undefined) {
                        arr = this.mcCardList[i].tagsTxt.split(",");
                    } else {
                        arr = [];
                    }
                    brr.push(arr);
                }
                return brr;
            }
        }
    };
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

    button:focus {
        outline: 0;
    }

    .essp-card-cont-inner {
        float: left;
        width: 726px;
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
            padding-right: 2%;
            padding-top: 65px;
            width: 22%;
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
                /*&:hover .img-detail {*/
                /*display: block;*/
                /*transform: scale(1.02);*/
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
                    display: none;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    background-color: #000000;
                    .esspopacity(@value:0.8); //调节透明度
                    p {
                        position: absolute;
                        top: 0;
                        color: #fff;
                    }
                    .enrolled {
                        left: 10px;
                    }
                    .cost {
                        right: 10px;
                    }
                }

                .applied-people {
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }

                .applied-people__bg {
                    width: 100%;
                    height: 25px;
                    line-height: 25px;
                    background-color: #000;
                    opacity: 0.7;
                }
                .applied-people__desc {
                    display: block;
                    padding-left: 10px;
                    height: 25px;
                    line-height: 25px;
                    color: #fff;
                }
            }
            .cont-detail {
                position: relative;
                float: left;
                margin-left: 35px;
                width: 430px;
                height: 100%;
                transition: all 1s;
                .cont-detail-l {
                    float: left;
                    width: 76%;
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
                h5 {
                    cursor: pointer;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    width: 100%;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0;
                    color: #666;
                    .esspellipsis();
                }
                p {
                    margin-bottom: 12px;
                    font-size: 12px;
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
                        margin-right: 10px;
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
                p.detail-tag {
                    span {
                        margin-right: 25px;
                        width: 50px;
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
