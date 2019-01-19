<template>
    <div class="essp-card-cont-inner esspclearfix">
        <!-- 科技政策模块---模版-->
        <div class="descontool">
            <p>
                <span class="descontool__tag"></span>
                <span class="descontool__title">{{temeTitle}}</span>
            </p>
        </div>
        <div class="has_list" v-if="mcCardList && mcCardList.length>0">
            <div class="essp-card" v-for="(item, mcCardIndex) in mcCardList" :key="mcCardIndex">
            <!-- <div class="essp-card" v-for="(item, index) in 5" :key="index"> -->
                <div class="card__head">
                    <p class="head__title" @click="goToDetail(item)">{{item.informationTitle}}</p>
                    <p class="head__time">{{item.createTime | timerFormat(item.createTime)}}</p>
                </div>
                <div class="card__dest">
                    <p v-html="item.infoDetail"></p>
                </div>
            <!-- </div>  -->
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
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        methods: {
            goToDetail(item){
                this.$router.push({path: "/news/noticedetail",query: {info: item}});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../../assets/css/mixin";
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
            height: 110px;
            .card__head {
                position: relative;
                height: 49px;
                line-height: 50px;
                border-bottom: 1px solid #ccc;
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
            }

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
            img{
                margin-bottom: 38px;
            }
        }
    }
</style>
