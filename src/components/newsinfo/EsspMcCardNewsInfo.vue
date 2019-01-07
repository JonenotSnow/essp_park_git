<template>
    <div class="essp-card-cont-inner esspclearfix">
        <!-- 科技政策模块---模版-->
        <div class="descontool">
            <p>
                <span class="descontool__tag"></span>
                <span class="descontool__title">{{temeTitle}}</span>
            </p>
        </div>
        <!--<div v-if="mcCardList && mcCardList.length>0">-->
        <div>
            <!--<div class="essp-card" v-for="(item, mcCardIndex) in mcCardList" :key="mcCardIndex">-->
            <div class="essp-card" v-for="(item, index) in 5" :key="index">
                <div class="imgcon" @click="goToDetail(item)">
                    <img :src="defaultimg" alt="">
                    <div class="tiptext">
                        <span>2019-01-01</span>
                    </div>
                </div>
                <div class="textcon">
                    <div class="destit" @click="goToDetail(item)">全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题全部新闻的标题</div>
                    <div class="desbrf">简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容</div>
                    <div class="descion">
                        <span><i :class="icons[0]"></i>222</span>
                        <span><i :class="icons[1]"></i>333</span>
                        <span><i :class="icons[2]"></i>444</span>
                    </div>
                    <div class="btntool">
                        <a class="mycusbtn" @click="goToDetail(item)">查看详情</a>
                    </div>
                </div>
            </div>
        </div>
        <!--<div v-else>-->
        <!--<div style="text-align: center">暂无数据</div>-->
        <!--</div>-->
    </div>
</template>

<script>
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
                defaultimg:require("@assets/newparkimg/newmanage/newsInfoSet/hydt2.jpg"),
                icons: [
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2",
                    'icon iconfont icon-pinglun'
                ],
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        methods: {
            goToDetail(item){
                this.$router.push({path: "/news/newsdetail",query: {id: item}});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../../assets/css/mixin";

    button:focus {
        outline: 0;
    }

    .essp-card-cont-inner {
        float: left;
        width: 770px;
        /*padding: 20px 20px 0;*/
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
        .essp-card {
            margin-top: 25px;
            margin-left: 40px;
            width: 690px;
            height: 172px;
            &:hover{
                 box-shadow: 0px 0px 14.2px 0.8px 
		rgba(0, 0, 0, 0.08);
            }
            display: flex;
            .imgcon{
                width: 288px;
                height: 172px;
                position: relative;
                cursor: pointer;
                img{
                    display: block;
                    width: 288px;
                    height: 172px;
                }
                .tiptext{
                    position:absolute;
                    bottom: 0;
                    padding:0 5px;
                    width: 278px;
                    height: 20px;
                    line-height: 20px;
                    color:#fff;
                    background-color: #000000;
                    .esspopacity(0.7);
                }
            }
            .textcon{
                position: relative;
                margin-left:10px;
                padding:20px 5px 10px;
                .destit{
                    cursor: pointer;
                    width:100%;
                    height:50px;
                    font-family: "MicrosoftYaHei";
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #444444;
                    .esspellipsitwo(@value:2);
                    margin-bottom: 15px;
                }
                .desbrf{
                    width: 318px;
                    height: 39px;
                    font-family: "MicrosoftYaHei";
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999999;
                    .esspellipsitwo(@value:2);
                    margin-bottom: 15px;
                }
                .descion{
                     width: 318px;
                     span{
                         margin-left:20px;
                         i{
                             margin-right:5px;
                         }
                     }
                }
                .btntool{
                    position:absolute;
                    right:5px;
                    bottom: 20px;
                    .mycusbtn{
                        cursor: pointer;
                        display: block;
                        outline: none;
                        width: 80px;
                        height: 28px;
                        line-height: 28px;
                        text-align: center;
                        color:#fff;
                        background-image: linear-gradient(21deg, 
                            #22a2fa 0%, 
                            #10b5ff 100%), 
                        linear-gradient(
                            #00a0e9, 
                            #00a0e9);
                        background-blend-mode: normal, 
                            normal;
                        border-radius: 14px;
                    }

                }

            }

        }
    }
</style>
