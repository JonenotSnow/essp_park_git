<template>
    <div class="activemain">
        <div class="activemain_con esspclearfix">
            <!-- 活动介绍模块 -->
            <div class="actleft">
                <div>
                    <div class="acttit">主办方</div>
                    <div>
                        <img class="actlogo" src="@/assets/actlogo.png" alt="活动logo">
                        <p class="actcpname">{{companyName}}</p>
                        <a href="javascript:void(0)" class="login_con_a">进入企业橱窗 <i class="el-icon-d-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="actright">
                <div class="maininfo esspclearfix">
                    <div class="logocon" @click="toLink">
                        <img class="detaillogo" src="@/assets/actdetaillogo.png" alt="详细活动报名logo">
                    </div>
                    <div class="detailcon">
                        <h2 @click="toLink">{{item.activityTheme}}</h2>
                        <div class="tagcon esspclearfix">
                            <span>美食</span>
                            <span>交流</span>
                            <span>创业</span>
                        </div>
                        <div class="infos">
                            <div><i class="iconcoom el-icon-goods"></i><b>时间：</b><em>{{item.activityStarttime|timerFormat(item.activityStarttime)}}</em></div>
                            <div><i class="iconcoom el-icon-news"></i><b>地点：</b><em>{{item.activityPlace}}</em></div>
                            <div><i class="iconcoom el-icon-zoom-in"></i><b>发起人：</b><em>{{item.initiateUnits}}</em></div>
                            <div><i class="iconcoom el-icon-tickets"></i><b>票种：</b><em></em></div>
                        </div>
                        <div class="infobtn esspclearfix">
                            <div class="btnitem" v-for="(item,index) in plist" :key="index" :class="active == index?'selecrborder':'' " @click="changeActive(index)" >￥{{item.ticketPirce}}  {{item.ticketType}}</div><!-- {{vo.}} -->
                            <!--<div class="btnitem selecrborder" click="changeChange(1)">￥0.00免费票</div>-->
                        </div>
                        <div class="bmbtn" v-if="showBtnVal?false: true">
                            <el-button type="primary" @click="toLink(1)" round size="mini">立即报名</el-button>
                            <el-button size="mini" @click="addAttention(item)" round icon="el-icon-star-off"><em>收藏</em></el-button>
                            <!--<el-button round>立即报名</el-button>-->
                            <!--<el-button type="primary" round>收藏</el-button>-->
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
   import Moment from "moment";

    export default {
        data() {
            return {
                item:{},
                active: 0,
                companyName: this.$route.query.cstName,
                showBtnV: true,
                plist:[

                ]
            }

        },
        created(){

           this.init();

        },
        filters:{
            timerFormat(vaule){
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        props: ["showBtnVal"],
        methods:{
             changeActive(index){
                 this.active = index;
             },
             init(){
                 this.item=this.$route.query.item;
                 this.plist=JSON.parse(this.item.ticketForm);
                this.$post('/activity/getByActivityId',{
                   activityId:this.item.activityId
                })
                .then((response) => {
                    var  dataModel= response.resultData;

                })

                // alert(this.plist);

             },
            toLink(type){
                 if(type == 1) {
                     this.$router.push("/parkIndex/enrollForm");
                 } else {
                     this.$router.push("/parkIndex/activityDetail");
                 }
            },
            addAttention(item) {
                 this.$post('/attention/addAttention',{
                    activityId: item.activityId,
                    parkId: window.sessionStorage.getItem('parkId')
                }).then((response) => {

                    if(response.resultCode == "CLT000000000"){
                    }else{
                        this.$message({
                        type: 'info',
                        message: '接口异常'
                    });
                    }
                },err=>{
                    this.$message({
                        type: 'info',
                        message: '接口异常'
                    });
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .activemain {
        .essp_width_auto();
    }

    .activemain_con {
        padding: 20px;
        background: #fff;
    }
    .login_con_a {
        .esspsc(16px)
    }
    .bmbtn {
        margin-left: 20px;
        em {
            padding-right: 5px;
        }
    }

    // 左侧部分
    .actleft {
        float: left;
        padding: 0 0 10px;
        margin-right: 25px;
        /*border: 1px solid #ccc;*/

        .acttit {
            width: 180px;
            height: 40px;
            background-color: @essp_nav_bg;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin-bottom: 10px;
        }
        .actlogo {
            display: block;
            width: 180px;
            height: 180px;
        }
        .actcpname {
            font-size: 12px;
            width: 180px;
            overflow: hidden;
            line-height: 30px;
            color: #333333;
        }
    }

    // 右侧部分
    .actright {
        float: left;
    }

    .logocon {
        width: 420px;
        height: 240px;
        float: left;
        margin-right: 10px;
        cursor: pointer;
        .detaillogo {
            display: block;
            width: 100%;
            height: 100%
        }
    }

    .detailcon {
        float: left;
        width: 522px;
        h2 {
            height: 72px;
            font-size: 20px;
            font-weight: bolder;
            line-height: 36px;
            color: #333333;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            -moz-line-clamp: 2;
            -moz-box-orient: vertical;
            -ms-line-clamp: 2;
            -ms-box-orient: vertical;
            cursor: pointer;
        }
    }

    //标签模块
    .tagcon {
        margin-bottom: 5px;
        padding-left: 20px;
        span {
            float: left;
            margin-right: 20px;
            padding: 4px 10px;
            font-size: 12px;

            background-color: #cccccc;
            text-align: center;
            color: #fff;
        }
    }

    .infos {
        margin-bottom: 5px;
        .iconcoom {
            margin-right: 4px;
        }
        b, em {
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;

        }
    }

    .infobtn {
        margin-bottom: 20px;
        .btnitem {
            float: left;
            width: 110px;
            height: 30px;
            line-height: 30px;
            margin-left: 15px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #ccc;
            &:hover {
                cursor: pointer
            }
        }
        .selecrborder {
            position: relative;
            color: #ff9900;
            border: 1px solid #ff9900;
        }
        .selecrborder:before {
            position: absolute;
            content: ' ';
            bottom: 0px;
            right: 0px;
            width: 0;
            height: 0;
            border-width: 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent transparent #fc0; /*透明 透明 透明 黄*/
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
        }

    }


</style>
