<template>
    <div class="newpark_warp warp_result">
        <!-- 成果展示模块 -->
        <div class="main_inter">
            <div class="com-tit">成果展示</div>
            <div class="com-brf">已推广使用的科研成果，持续更新中</div>
            <div class="resultcon">
                <el-carousel indicator-position="none" height="280px" v-if="achievList.length" class="resultbox" :interval="50000" arrow="always">
                    <el-carousel-item v-for="(item,index) in achievList" :key="index">
                        <div class="father" @click="linkToDetail({item:item,opMark:'01'})">
                            <div class="boxitem" style="left: 355px">
                                <div class="boxitem_tit">{{item.name || "暂无"}}</div>
                                <div class="boxitem_brf">{{item.title||"暂无该成果简介"}}</div>
                                <!-- <div class="boxitem_detail">
                                    <div v-html="item.detail"></div>
                                </div> -->
                            </div>
                            <div class="boximg"><img :src="item.photo" @error="setDefaultImg($event)" alt="成果展示"></div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="nothing" v-show="achievList.length==0" v-cloak>
                    <img src="../../../assets/newparkimg/home/noting.png" alt="">
                    <span class="tipspan">{{lodingMsg}}</span>
                </div>
            </div>
            <div class="more_con esspclearfix">
                <div class="conmore" @click="linkToList">More></div>
            </div>
        </div>
    </div>
</template>

<script>
    import imgfault from "@/assets/error.png";//引入加载失败默认图
    export default {
        data() {
            return {
                lodingMsg: "数据正在加载中",
                msg: "成果展示",
                total: 0,
                parkId: this.SSH.getItem("parkId") || "",
                achievList: [
                    // {
                    //     createId: "1000180014",
                    //     createName: "陈703",
                    //     createTime: 1545113210000,
                    //     delFlag: "0",
                    //     detail: "新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情",//成果详情
                    //     field: "2",//领域
                    //     id: "20181215174453013",
                    //     inventor: "lfq01",//发明人
                    //     modifyId: "1000180014",
                    //     modifyName: "陈07",
                    //     modifyTime: 1545113210000,
                    //     name: "新一代PVL技术产品",//成果名称
                    //     photo: require('@/views/newparkHall/home/imgs/logo_b6.png'),//成果配图
                    //     status: "0",
                    //     title: "新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产品详情新一代PVL技术产",
                    //     unit: "lfq01单位",//单位
                    //     viewSum: 0,//浏览数量
                    // }
                ],

            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                await this.getArcList();
            },
            //获取成果列表
            getArcList() {
                var url = this.$apiUrl.home.getAchievement;
                var pop = {
                    parkId: this.parkId,//园区ID
                    pageNum: 1,//页码
                    pageSize: 6,//每页显示数量
                    name: "",//成果名称
                    field: "",//领域
                    inventor: "",//发明人
                    unit: "",//单位
                    userId: "",//当前用户Id（调用我发布的成果时候需要用到，当前登陆用户id）
                };
                this.$post(url, pop).then((response) => {
                    let res = response.resultData;
                    this.achievList = res.achievList;
                    this.total = res.total;
                    this.lodingMsg = "暂无数据";
                }, (err) => {
                    this.$message.error(err.resultMsg);
                })
            },
            //图片失败设置默认图
            setDefaultImg(event) {
                var ele = event.currentTarget;
                ele.src = imgfault;
                ele.title = "默认配图";
            },
            //跳转成果详情
            linkToDetail(options) {
                this.$router.push({
                    path: '/parkIndex/achievementDetail',
                    query: {id: options.item.id, opMark: options.opMark}
                })
            },
            //跳转成果列表
            linkToList() {
                this.$router.push({
                    path: '/parkIndex/achievement'
                })
            }
        }
    }
</script>


<style lang='less' scoped>
    @import "../../../assets/css/newpark/home.common.less";
    @import "../../../assets/css/mixin.less";

    .warp_result {
        height: 530px;
        background-color: #ffffff;
    }

    .resultcon {
        padding-top: 50px;
        margin-bottom: 20px;
        .resultbox {
            .father {
                position: relative;
                cursor: pointer;
                //承载标题+简介
                .boxitem {
                    position: absolute;
                    left: 335px;
                    width: 650px;
                    padding: 40px 60px 44px 70px;
                    height: 190px;
                    background-color: #f5f5f5;
                    border: solid 1px #cccccc;
                    //脑子有病的ui
                    box-shadow: 2.5px 4.3px 19.4px 0.6px rgba(0, 0, 0, 0.15);
                    .boxitem_tit {
                        width: 100%;
                        text-align: center;
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 1.8px;
                        color: #333333;
                        margin-bottom: 55px;
                        .esspellipsis();

                    }
                    .boxitem_brf {
                        height: 80px;
                        font-size: 16px;
                        padding-left: 15px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 28px;
                        letter-spacing: 0px;
                        color: #777777;
                        .esspellipsitwo(3);
                        overflow: hidden;
                    }
                    /*.boxitem_detail {*/
                        /*height: 80px;*/
                        /*font-size: 16px;*/
                        /*padding-left: 15px;*/
                        /*font-weight: normal;*/
                        /*font-stretch: normal;*/
                        /*line-height: 28px;*/
                        /*letter-spacing: 0px;*/
                        /*color: #777777;*/
                        /*overflow: hidden;*/
                    /*}*/

                }
                //承载图片的部分
                .boximg {
                    position: absolute;
                    width: 350px;
                    height: 200px;
                    left: 60px;
                    top: 40px;
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }

        }
        .nothing {
            position: relative;
            margin: 0 auto;
            width: 500px;
            height: 316px;
            .tipspan {
                position: absolute;
                bottom: 60%;
                left: 34%;
                font-size: 18px;
                color: #999;
            }
            img {
                display: block;
                outline: none;
                width: 418px;
                        height: 316px;
                        margin: 0 auto
            }
        }
    }

    .more_con {
        width: 100%;
        .conmore {
            float: right;
            width: 46px;
            cursor: pointer;
            margin-right: 30px;

            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;
        }
    }
</style>
