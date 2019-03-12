<template>
    <div class="park_home_policy_wrap">
        <div class="park_home_policy">
            <div class="home_active_head">
                <h3>园区惠政</h3>
                <p>Campus preferential policies</p>
                <div class="home_active_tag_hot esspclearfix" v-if="huizheng_hot.length != 0 || huizheng_newest.length != 0">
                    <span :class="huizhengTabIndex==0?'sel':''" @click="huizhengTab(0)">最新</span>
                    <span :class="huizhengTabIndex==1?'sel':''" @click="huizhengTab(1)">热门</span>

                </div>
            </div>
            <div class="home_active_items_wrap">
                <div class="home_active_items_inner esspclearfix"  v-if="huizhengList.length > 0">
                    <div class="home_active_item" v-for="(item,index) in huizhengList" v-if="index < maxListLength">
                        <div class="home_active_img" @click="toDetail(1,item.id)">
                            <img :src="item.titleImg" alt="惠政图片">
                            <div class="home_active_mask esspclearfix">
                                <span
                                    class="home_avtive_f home_avtive_f_w1 index_place_icons">发布方:{{item.pubCstName}}</span>
                            </div>
                        </div>
                        <div class="home_avtive_con">
                            <div class="home_active_name" @click="toDetail(0,item.id)">{{item.policyTitle}}
                            </div>
                            <div class="home_active_icon esspclearfix">
                                <span><i :class="icons[2]"></i>{{item.viewTime || 0}}</span>
                                <span><i :class="icons[3]"></i>{{item.countFollower || 0}}</span>
                            </div>
                        </div>

                        <div class="home_active_footer esspclearfix">
                            <span class="home_avtive_f home_avtive_f_w1">发布日期 {{item.createTime | timerFormat(item.createTime)}}</span>
                            <span class="home_avtive_f home_avtive_f_w2" v-if="item.timeStatus"
                                  :style="{color: item.timeStatus.color}">{{item.timeStatus.msg}}</span>
                        </div>
                    </div>
                </div>
                <essp-loading :loading="isLoding" :nodata="!isLoding && huizhengList.length == 0"></essp-loading>
            </div>
            <div class="home_avtive_more"><span @click="getHuiZhengList()">More <i
                class="el-icon-arrow-right"></i></span></div>
        </div>
    </div>
</template>
<script>
    import Moment from "moment";
    export default {
        data: () => ({
            huizheng_hot: [],
            huizheng_newest: [],
            huizhengList: [],
            huizhengTabIndex: 0,
            maxListLength: 4, // 默认最多
            isLoding: true,
            icons: [
                "icon iconfont icon-riqi1",
                "icon iconfont icon-dizhi",
                "icon iconfont icon-liulan",
                "icon iconfont icon-collect2"
            ],
        }),
        watch: {
            huizheng_newest: function (val) {
                this.huizhengTab(0);
            }
        },
        created() {
            this.getInfo()
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        },
        methods: {
            /* 更多园区惠政 */
            getHuiZhengList() {
                this.$router.push({
                    path: "/parkIndex/goverBene/all"
                });
            },
            /* 跳转到详情  0:活动 1:惠政 2:资讯*/
            toDetail(type, id) {
                //惠政详情
                this.$router.push({
                    path: "/parkIndex/goverBeneDetail",
                    query: {id: id}
                });
                //alert("惠政详情");
            },

            huizhengTab(type) {
                this.huizhengTabIndex = type;
                if (type == 0) {
                    this.huizhengList = this.huizheng_newest;
                } else {
                    this.huizhengList = this.huizheng_hot;
                }
                if(this.huizhengList.length < 8){
                    this.maxListLength = 4;
                } else {
                    this.maxListLength = 8;
                }
            },
            getInfo() {
                //0:表示活动1:表示惠政2:表示资讯 this.$post(url,param)
                this.isLoding = true;
                this.$post(this.$apiUrl.home.homeInfo, {
                    pageNum: 0,
                    pageSize: 8,
                    type: 1,
                    parkId: window.sessionStorage.getItem("parkId")
                })
                //activity_hot   activity_newest  huizheng_hot huizheng_newest information_newest
                .then(response => {
                    console.log(response)
                    var arr = response.resultData.hot;
                    var arr1 = response.resultData.newest;
                    var thisTime = this.getMillisecond(new Date());
                    if(response.resultData.hot && arr.length > 0) {
                        arr.forEach((item,index) => {
                            var enterEndtime = this.getMillisecond(item.avaliableEndTime || 0);     // 惠政有效结束时间
                            var enterStarttime = this.getMillisecond(item.avaliableTime || 0);      // 惠政有效开始时间
                            if(thisTime < enterStarttime) {
                                this.$set(item,"timeStatus",this.timerStatus(1));
                            }
                            if(thisTime >= enterStarttime && thisTime <= enterEndtime) {
                                this.$set(item,"timeStatus",this.timerStatus(2));
                            }
                            if(thisTime > enterEndtime) {
                                this.$set(item,"timeStatus",this.timerStatus(3));
                            }
                        })
                    }
                    if(response.resultData.newest && arr1.length > 0) {
                        arr1.forEach((item,index) => {
                            var enterEndtime = this.getMillisecond(item.avaliableEndTime || 0);     // 惠政有效结束时间
                            var enterStarttime = this.getMillisecond(item.avaliableTime || 0);      // 惠政有效开始时间
                            if(thisTime < enterStarttime) {
                                this.$set(item,"timeStatus",this.timerStatus(1));
                            }
                            if(thisTime >= enterStarttime && thisTime <= enterEndtime) {
                                this.$set(item,"timeStatus",this.timerStatus(2));
                            }
                            if(thisTime > enterEndtime) {
                                this.$set(item,"timeStatus",this.timerStatus(3));
                            }
                        })
                    }
                    this.huizheng_hot = arr; //热门惠政
                    this.huizheng_newest = arr1; //最新惠政

                    // 加载完毕
                    this.isLoding = false;
                });
            },
            timerStatus(value) {
                // 1. 预告中  2. 报名中  3. 已结束
                var obj = {}
                if(value == 1) {
                    obj = {
                        color: "#ff9900",
                        msg: "预告中"
                    }
                }
                if(value == 2) {
                    obj = {
                        color: "#00a0e9",
                        msg: "开放申请"
                    }
                }
                if(value == 3) {
                    obj = {
                        color: "#999",
                        msg: "已结束"
                    }
                }
                return obj;
            },
            getMillisecond(vaule){
                // 获取秒数
                return Moment(vaule).unix();
            }
        }
    };
</script>
<style lang="less" scoped>
    @import "../../../assets/css/mixin";

    .park_home_policy_wrap {
        background-color: #fff;
    }

    .park_home_policy {
        .essp_width_auto();

        // 大标题
        .home_active_head {
            position: relative;
            padding: 55px 0 40px;
            text-align: center;
            h3 {
                font-size: 28px;
                color: #333;
                letter-spacing: 2.8px;
                font-weight: normal;
            }
            p {
                font-size: 16px;
                color: #999;
                letter-spacing: 1.6px;
                padding-top: 15px;
            }
            .home_active_tag_hot {
                position: absolute;
                right: 0;
                bottom: 20px;
                border: 1px solid #e1e1e1;
                -webkit-border-radius: 3px;
                -moz-border-radius: 3px;
                border-radius: 3px;
                overflow: hidden;
                span {
                    float: left;
                    width: 55px;
                    height: 35px;
                    line-height: 35px;
                    background-color: #e1e1e1;
                    color: #aaa;
                    cursor: pointer;
                    font-size: 16px;
                }
                .sel {
                    background-color: #f3f3f3;
                    color: #00a0e9;
                }
            }
        }
        //  活动列表
        .home_active_items_wrap {
            width: 1200px;
            .home_active_items_inner {
                overflow: hidden;
                margin-right: -20px;
                .home_active_item {
                    float: left;
                    width: 284px;
                    margin-right: 20px;
                    .esspborder-radius(6px);
                    overflow: hidden;
                    background-color: #fff;
                    -webkit-box-shadow: 0 0 14.2px 0.8px rgba(0, 0, 0, 0.08);
                    -moz-box-shadow: 0 0 14.2px 0.8px rgba(0, 0, 0, 0.08);
                    box-shadow: 0 0 14.2px 0.8px rgba(0, 0, 0, 0.08);
                    margin-bottom: 20px;
                    .home_active_img {
                        height: 160px;
                        overflow: hidden;
                        position: relative;
                        cursor: pointer;
                        img {
                            display: block;
                            width: 100%;
                            min-height: 100%;
                        }
                        .home_active_mask {
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 93%;
                            background-color: rgba(0, 0, 0, .7);
                            color: #fff;
                            line-height: 26px;
                            font-size: 12px;
                            padding: 0 3.5%;
                            i {
                                margin-right: 5px;
                            }
                            .index_place_icons {
                                width: 72%;
                                padding-left: 5%;
                                background: url("./imgs/peo.png") no-repeat left center;
                            }
                        }
                    }
                    // 活动列表内容
                    .home_avtive_con {
                        padding: 18px 10px;
                        .home_active_name {
                            cursor: pointer;
                            .esspellipsis();
                            font-size: 16px;
                            letter-spacing: 1.6px;
                            color: #333;
                        }
                        .home_active_icon {
                            margin-top: 18px;
                            span {
                                font-size: 12px;
                                margin-right: 5px;
                                color: #999;
                            }
                            i {
                                font-size: 14px;
                                margin-right: 3px;
                                color: #ccc;
                            }
                            .icon-collect2:before {
                                font-size: 12px;
                            }
                            .icon-pinglun {
                                font-size: 12px;
                            }
                        }

                    }
                    .home_active_footer {
                        padding: 18px 9px;
                        border-top: 1px solid #e5e5e5;
                        .home_avtive_f_w1 {
                            color: #999;
                            font-size: 12px;
                            letter-spacing: 1.2px;
                        }
                        .home_avtive_f_w2 {
                            color: #00a0e9;
                            font-size: 12px;
                            letter-spacing: 1.2px;
                        }
                    }
                    // 浮动
                    .home_avtive_f {
                        float: left;
                    }
                    .home_avtive_f_w1 {
                        width: 80%;
                        .esspellipsis();
                    }
                    .home_avtive_f_w2 {
                        width: 20%;
                        text-align: right;
                    }
                }

                // 鼠标以上显示
                .home_active_mask {
                    display: none;
                }
                .home_active_item:hover .home_active_mask {
                    display: block;
                }
            }
        }
        .home_avtive_more {
            padding-bottom: 24px;
            text-align: right;
            font-size: 16px;
            color: #999;
            span {
                cursor: pointer;
            }
        }

    }
</style>


