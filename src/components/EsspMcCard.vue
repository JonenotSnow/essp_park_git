<template>
    <div class="essp-card-cont-inner esspclearfix">
        <!-- 全部活动/关注活动/审核活动页 模版-->
        <div class="essp-card" v-for="(item, mcCardIndex) in mcCardList" :key="mcCardIndex">
            <div class="cont-img" @click="toLink(item)">
                <img class="detaillogo" :src="item.activityPhoto">
                <div class="img-detail">
                    <p class="enrolled">已报名：{{item.enterSum}}人</p>
                    <p class="cost">{{item.isCharge == '1' ? "收费" : "免费"}}</p>
                </div>
            </div>
            <div class="cont-detail">
                <h5 @click="toLink(item)">{{item.activityTheme}}</h5>
                <div class="cont-detail-l">
                    <p class="tag_btn_p">
                        <essp-park-tag
                            v-for="(item, eptIndex) in activityLabelList[mcCardIndex]"
                            :value="item"
                            v-if="eptIndex<3 && chilrPageType!='followInfo'"
                            :key="eptIndex"
                        />
                    </p>
                    <p>
                        <i :class="icons[0]" style="color: #ccc"></i>时间：{{item.activityStarttime |
                        timerFormat(item.activityStarttime)}}</p>
                    <p class="address_p">
                        <i :class="icons[1]" style="color: #ccc"></i>{{item.activityPlace}}
                    </p>
                    <p><i :class="icons[4]" style="color: #ccc"></i>发布单位:{{item.cstName || '暂无发布单位'}}</p>
                    <p class="icon_p_font">
                        <span class="">
                            <i :class="icons[2]" style="color: #ccc"></i>{{item.viewSum}}</span>
                        <span>
                            <i :class="icons[3]" style="color: #ccc"></i>{{item.attentionSum}}
                        </span>
                        <span>
                             <i :class="icons[5]" style="color: #ccc"></i>{{item.commentSum}}
                         </span>
                    </p>
                </div>
                <div class="cont-detail-r" v-if="LoginUserRol == '11'">

                    <button type="primary" v-for="(itemChild,index) in item.btn" :key="index"
                            class="essp-btn btn-cancle">
                        {{itemChild.name}}
                    </button>
                </div>
                <div class="cont-detail-r" v-else>

                    <button
                        type="primary"
                        v-for="(itemChild,index) in item.btn" :key="index"
                        class="essp-btn" :class="itemChild.clicked?'btn-enroll':'btn-cancle'"
                        @click="enrollToPage(item,itemChild,item.activityId,item.enterType,mcCardIndex)"
                    >
                        <span>{{itemChild.name}}</span>
                    </button>

                </div>
            </div>
        </div>
        <div v-show="mcCardList.length==0" v-cloak>
            <!-- <div style="text-align: center">{{lodingMsg}}</div> -->
            <essp-loading :loading="lodingMsg == '数据加载中~'" :nodata="lodingMsg == '数据加载完毕！'"></essp-loading>
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
                <el-button type="primary" @click="cancleFocus()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 关注事件对话框end -->
    </div>
</template>

<script>
    import Moment from "moment";
    import EsspParkTag from "@/components/EsspParkTag";
    import mixin from '@/components/mixins/mixins_windowOpen.js'

    export default {
        name: "EsspMcCard",
        mixins:[mixin],
        props: {
            mcCardList: {
                type: Array,
                default: []
            },
            chilrPageType: {
                type: String
            },
            lodingMsg: {
                type: String
            }
        },
        components: {
            EsspParkTag
        },
        data() {
            return {
                msg: "EsspMcCard",
                icons: [
                    "icon iconfont icon-riqi1",
                    "icon iconfont icon-dizhi",
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2",
                    "icon iconfont icon-faburen",
                    "icon iconfont icon-pinglun"
                ],
                thisShowBtn: [],
                tagMaxLenth: 3, // 最大的标签长度，  lenth 为 maxLenth -1;
                btn: [],

                // 关注
                dialogVisible: false,
                activeId: '',
                index: 0,
                LoginUserRol: JSON.parse(sessionStorage.getItem("LoginUserRol")).join(''),
                loginFlag: this.SSH.getItem("loginFlag") ? this.SSH.getItem("loginFlag") : false
            };
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        },
        computed: {
            activityLabelList() {
                let arr = [];
                let brr = [];
                let len = this.mcCardList.length;
                for (let i = 0; i < len; i++) {
                    if (this.mcCardList[i].activityLabel != undefined) {
                        arr = this.mcCardList[i].activityLabel.split(",");
                    } else {
                        arr = [];
                    }
                    brr.push(arr);
                }

                return brr;
            }
        },
        methods: {
            toLink(item) {
                var type = this.types;
                var url = "/parkIndex/activityDetail";
                this.$router.push({
                    path: url,
                    query: {
                        activityId: item.activityId,
                        opMark: "01"
                    }
                });
            },
            enrollToPage(itemData, item, activeId, enterType, index) {
                var enterType = enterType || "0";
                // 活动申请
                let user
                let flag = this.LoginUserRol.indexOf('32')>-1 || this.LoginUserRol.indexOf('31')>-1 || this.LoginUserRol.indexOf('33')>-1||this.LoginUserRol.indexOf('34')>-1
                if (item.type == 1) {
                    if (!flag && itemData.openScope == '0') {
                        this.$message.warning('本活动仅对本园区开放');
                        return;
                    }
                    var url = "/parkIndex/activityDetail";
                    //onsole.log(item);
                    this.$router.push({
                        path: url,
                        query: {
                            activityId: activeId,
                            opMark: "01s"
                        }
                    });
                }
                // 我报名的活动
                if (item.type == 2) {
                    //conding
                }
                // 活动关注
                if (item.type == 3) {
                    this.showDialog(activeId, index);
                    // return;
                }
                // 活动审核
                if (item.type == 4) {
                    var url = "/demoEditor";
                    this.$router.push(url);
                    return;
                }
            },

            /**
             * 发送意向相关事件
             */
            // 弹窗
            showDialog(activeId, index) {
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
                this.activeId = activeId;
                this.index = index;
            },
            cancleFocus() {
                this.cancelMyFocus(this.activeId, this.index);
            },
            cancelMyFocus(activeId, index) {
                this.$post("/attention/removeAttention", {
                    activityId: activeId,
                    parkId: window.sessionStorage.getItem("parkId")
                }).then(
                    response => {
                        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.dialogVisible = false;
                            this.$message.success(response.resultMsg);
                            this.$router.go(0);
                            // this.mcCardList.splice(index, 1);
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
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../assets/css/mixin";
    //  @import "../assets/css/icon_style";
    [v-cloak] {
        display: none;
    }

    .address_p {
        width: 94%;
        .esspellipsis();
    }

    button:focus {
        outline: 0;
    }

    .essp-card-cont-inner .essp-card .it_tag {
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

    .essp-card-cont-inner {
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
            margin-top: 85px;
            padding-right: 2%;
            text-align: right;
        }
        .essp-card {
            background-color: #ffffff;
            padding: 20px 0;
            height: 140px;
            border-bottom: 1px solid #eee;
            transition: all 1s;
            &:hover {
                zoom: 1;
                box-shadow: 0px 0px 14.2px 0.8px
                rgba(0, 0, 0, 0.08);
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
                    .esspopacity(@value:0.8); //调节透明度
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
                    margin-bottom: 8px;
                    width: 100%;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0;
                    color: #666;
                    .esspellipsis();
                }
                p {
                    margin-bottom: 8px;
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
                        .esspellipsis();
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
