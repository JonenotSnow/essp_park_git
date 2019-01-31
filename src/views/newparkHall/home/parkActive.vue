<template>
    <div class="park_home_active">
        <div class="home_active_head">
            <h3>园区活动</h3>
            <p>Campus Activities</p>
            <div class="home_active_tag_hot esspclearfix">
                <span :class="activeTabIndex==0?'sel':''" @click="activeTab(0)">最新</span>
                <span :class="activeTabIndex==1?'sel':''" @click="activeTab(1)">热门</span>

        </div>
    </div>
    <div class="home_active_items_wrap">
        <div class="home_active_items_inner esspclearfix">
            <div class="home_active_item" v-for="(item,index) in activityList" v-if="index < 8">
                <div class="home_active_img" @click="toDetail(0,item.activityId)">
                    <img :src="item.activityPhoto" alt="活动图片">
                    <div class="home_active_mask esspclearfix">
                        <span class="home_avtive_f home_avtive_f_w1"><i class="el-icon-location"></i>{{item.activityPlace}}</span>
                        <span class="home_avtive_f home_avtive_f_w2">{{item.isCharge === '0' ? '免费':'收费'}}</span>
                    </div>
                </div>
                <div class="home_avtive_con">
                    <div class="home_active_name" @click="toDetail(0,item.activityId)">{{item.activityTheme}}</div>
                    <div class="home_active_icon esspclearfix">
                        <span >
                            <i :class="icons[2]" style="color: #ccc"></i>{{item.viewSum}}</span>
                                <span>
                            <i :class="icons[3]" style="color: #ccc"></i>{{item.attentionSum}}
                        </span>
                        <span>
                             <i :class="icons[5]" style="color: #ccc"></i>{{item.commentSum}}
                         </span>
                    </div>
                </div>

                <div class="home_active_footer esspclearfix">
                    <span class="home_avtive_f home_avtive_f_w1">活动时间 {{item.activityStarttime}}</span>
                    <span class="home_avtive_f home_avtive_f_w2" :style="{color: item.timeStatus.color}">{{item.timeStatus.msg}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="home_avtive_more"><span @click="goActivityList()">More <i class="el-icon-arrow-right"></i></span></div>
    <!--&lt;!&ndash; 淮安活动，旧园区样式 &ndash;&gt;-->
        <!--<div class="title_home esspclearfix">-->
            <!--<div>-->
                <!--<h3>园区活动</h3>-->
                <!--<p>Campus Activities</p>-->
            <!--</div>-->
            <!--<div>-->
                <!--<a href="javascript:void(0);" :class="activeTabIndex==0?'sel':''" @click="activeTab(0)">最新活动</a>-->
                <!--丨-->
                <!--<a-->
                    <!--href="javascript:void(0);"-->
                    <!--:class="activeTabIndex==1?'sel':''"-->
                    <!--@click="activeTab(1)"-->
                <!--&gt;热门活动</a>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="swiperwrap">-->
            <!--<div class="swipercon esspclearfix">-->
                <!--<swiper :options="swiperOption" ref="mySwiper">-->
                    <!--<swiper-slide v-for="(item,index) in activityList" :key="index" style="float:left">-->
                        <!--<div class="swiper_item" @click="toDetail(0,item.activityId)">-->
                            <!--&lt;!&ndash; 跳转到活动详情 &ndash;&gt;-->
                            <!--<div class="itempic">-->
                                <!--<img :src="item.activityPhoto" alt>-->
                                <!--<div class="index_mask_item">-->
                                    <!--<div class="index_l">-->
                                        <!--<i class="el-icon-location"></i>-->
                                        <!--{{item.activityPlace}}-->
                                    <!--</div>-->
                                    <!--<div class="index_r">{{item.activityStarttime}}</div>-->
                                <!--</div>-->
                                <!--<span v-if="activeTabIndex==0" class="index_item_tag index_item_tag1">最新</span>-->
                                <!--<span v-else class="index_item_tag">热门</span>-->
                            <!--</div>-->
                            <!--<h3>{{item.activityTheme}}</h3>-->
                            <!--<p>-->
                                <!--<span v-html="item.activityDetails"></span>-->
                                <!--&lt;!&ndash;  为进一步加强安全生产宣传工作，普及安全生产常识，强化安全生产意识，软件园一期深入开展2018年“安全···产月”活动。6月11日，软投公司邀请市安全生产协会技术专家到园区为大家开设“生命至上、安全发展”主题讲座。 &ndash;&gt;-->
                            <!--</p>-->
                            <!--<div class="gn">-->
                                <!--<el-button-->
                                    <!--type="primary"-->
                                    <!--size="small"-->
                                    <!--v-if="nowTime < getTime(item.enterStarttime)"-->
                                    <!--disabled-->
                                <!--&gt;预告中-->
                                <!--</el-button>-->
                                <!--<el-button-->
                                    <!--type="primary"-->
                                    <!--size="small"-->
                                    <!--class="ljbm_btn"-->
                                    <!--:disabled="item.enterSum == item.topLimit"-->
                                    <!--v-else-if="nowTime >= getTime(item.enterStarttime) && nowTime <= getTime(item.enterEndtime)"-->
                                <!--&gt;-->
                                    <!--<span v-if="item.enterSum < item.topLimit"-->
                                          <!--@click.stop="signUp(item)">立即报名</span>-->
                                    <!--<span v-else>人数已满</span>-->
                                <!--</el-button>-->
                                <!--<el-button-->
                                    <!--type="primary"-->
                                    <!--size="small"-->
                                    <!--v-else-if="nowTime > getTime(item.enterEndtime)"-->
                                    <!--disabled-->
                                <!--&gt;已结束-->
                                <!--</el-button>-->
                                <!--&lt;!&ndash; <el-button type="primary" size="small" @click="signUp(item.activityId)">立即报名</el-button> &ndash;&gt;-->
                                <!--&lt;!&ndash; <span class="bm">已报名: <strong>{{item.enterNumber}}</strong>人</span> &ndash;&gt;-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</swiper-slide>-->
                <!--</swiper>-->
                <!--<div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>-->
                <!--<div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>-->
                <!--&lt;!&ndash; <div class="swiper-button-next" v-if="activityList.length > 3"></div>-->
                <!--<div class="swiper-button-prev" v-if="activityList.length > 3"></div>&ndash;&gt;-->
                <!--<div class="view_more">-->
                    <!--<el-button-->
                        <!--type="primary"-->
                        <!--plain-->
                        <!--size="small"-->
                        <!--style="font-size:14px;"-->
                        <!--@click="goActivityList()"-->
                    <!--&gt;查看更多园区活动-->
                    <!--</el-button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    import mixin from '@/components/mixins/mixins_windowOpen.js'
    import Moment from "moment";

    export default {
        components: {
        },
        mixins:[mixin],
        data() {
            return {
                activityList: [],
                activeTabIndex: 0,
                nowTime: new Date().getTime(),
                active: 0,
                list: [],
                activity_hot: [],
                activity_newest: [],
                icons: [
                    "icon iconfont icon-riqi1",
                    "icon iconfont icon-dizhi",
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2",
                    "icon iconfont icon-faburen",
                    "icon iconfont icon-pinglun"
                ]
            };
        },
        methods: {
            getTime(timeValue) {
                let nowTime = timeValue.replace(/-/g, "/");
                let time = new Date(nowTime);
                return time.getTime();
            },
            signUp(item) {
                //未登录跳登录
                if (!this.SSH.getItem('loginFlag')) {
                    this.windowHrefUrl('/userIndex/login')
                }
                this.$router.push({
                    path: "/parkIndex/enrollForm",
                    query: {activeId: item.activityId,enrollType:item.enterType}
                });
            },
            /* 活动  */
            activeTab(type) {
                this.activeTabIndex = type;
                if (type == 0) {
                    this.activityList = this.activity_newest;
                } else {
                    this.activityList = this.activity_hot;
                }
            },
            keyWordSeach(index) {
                this.active = index;
            },
            /* 更多园区活动 */
            goActivityList() {
                this.$router.push({
                    path: "/parkIndex/park/all"
                });
            },
            /* 跳转到详情  0:活动 1:惠政 2:资讯*/
            toDetail(type, id) {
                if (type == 0) {
                    this.$router.push({
                        path: "/parkIndex/activityDetail",
                        query: {activityId: id}
                    });
                }
            },

            getInfo() {
                //0:表示活动1:表示惠政2:表示资讯 this.$post(url,param)
                this.$post(this.$apiUrl.home.homeInfo, {
                    pageNum: 0,
                    pageSize: 10,
                    type: 0,
                    parkId: window.sessionStorage.getItem("parkId")
                }).then(response => {
                    var arr = response.resultData.hot;
                    var arr1 = response.resultData.newest;
                    var thisTime = this.getMillisecond(new Date());
                    if(response.resultData.hot && arr.length > 0) {
                        arr.forEach((item,index) => {
                            var activityStarttime = this.getMillisecond(item.activityStarttime);  // 活动开始时间
                            var enterEndtime = this.getMillisecond(item.enterEndtime);           // 活动报名截止时间
                            var enterStarttime = this.getMillisecond(item.enterStarttime);      // 活动报名开始时间
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
                            var activityStarttime = this.getMillisecond(item.activityStarttime);  // 活动开始时间
                            var enterEndtime = this.getMillisecond(item.enterEndtime);           // 活动报名截止时间
                            var enterStarttime = this.getMillisecond(item.enterStarttime);      // 活动报名开始时间
                            // 判断时间状态
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
                    this.activity_hot = arr; //热门活动
                    this.activity_newest = arr1; //最新活动
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
                        msg: "报名中"
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
            },
        },
        async created() {
            await this.getInfo()
        },
        watch: {
            activity_hot: function () {
                this.activeTab(0);
            }
        }
    };
</script>
<style lang="less" scoped>
    @import "../../../assets/css/mixin";
    .park_home_active {
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
                    width: 280px;
                    margin-right: 20px;
                    .esspborder-radius(6px);
                    overflow: hidden;
                    background-color: #fff;
                    -webkit-box-shadow: 0 0 14.2px 0.8px rgba(0,0,0,0.08);
                    -moz-box-shadow: 0 0 14.2px 0.8px rgba(0,0,0,0.08);
                    box-shadow: 0 0 14.2px 0.8px rgba(0,0,0,0.08);
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
                            background-color: rgba(0,0,0,.7);
                            color: #fff;
                            line-height: 26px;
                            font-size: 12px;
                            padding: 0 3.5%;
                            i {
                                margin-right: 5px;
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

