<template>
    <div class="park_home_active">
        <div class="home_active_head">
            <h3>园区活动</h3>
            <p>Campus activities</p>
            <div class="home_active_tag_hot esspclearfix" v-if="activity_hot.length != 0 || activity_newest.length != 0">
                <span :class="activeTabIndex==0?'sel':''" @click="activeTab(0)">最新</span>
                <span :class="activeTabIndex==1?'sel':''" @click="activeTab(1)">热门</span>
        </div>
    </div>
        <div class="home_active_items_wrap">
            <div class="home_active_items_inner esspclearfix" v-if="activityList.length > 0">
                <div class="home_active_item" v-for="(item,index) in activityList" v-if="index < maxListLength">
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
                                <i :class="icons[2]" style="color: #ccc"></i>{{item.viewSum || '0'}}</span>
                                    <span>
                                <i :class="icons[3]" style="color: #ccc"></i>{{item.attentionSum || '0'}}
                            </span>
                            <span>
                                 <i :class="icons[5]" style="color: #ccc"></i>{{item.commentSum || '0'}}
                             </span>
                        </div>
                    </div>

                    <div class="home_active_footer esspclearfix">
                        <span class="home_avtive_f home_avtive_f_w1">活动时间 {{item.activityStarttime}}</span>
                        <span class="home_avtive_f home_avtive_f_w2" :style="{color: item.timeStatus.color}">{{item.timeStatus.msg}}</span>
                    </div>
                </div>
            </div>
            <essp-loading :loading="isLoding" :nodata="!isLoding && activityList.length == 0"></essp-loading>
        </div>

        <div class="home_avtive_more"><span @click="goActivityList()">More <i class="el-icon-arrow-right"></i></span></div>
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
                isLoding: true,         // 是显示数据加载中
                maxListLength: 4, // 默认最多
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
                if(this.activityList.length < 8){
                    this.maxListLength = 4;
                } else {
                    this.maxListLength = 8;
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
                this.isLoding = true;
                this.$post(this.$apiUrl.home.homeInfo, {
                    pageNum: 0,
                    pageSize: 8,
                    type: 0,
                    parkId: window.sessionStorage.getItem("parkId")
                }).then(response => {
                    var arr = response.resultData.hot;
                    var arr1 = response.resultData.newest;

                    var thisTime = this.getMillisecond(new Date());
                    if(response.resultData.hot && arr.length > 0) {
                        arr.forEach((item,index) => {
                            var activityStarttime = this.getMillisecond(item.activityStarttime || 0);  // 活动开始时间
                            var enterEndtime = this.getMillisecond(item.enterEndtime || 0);           // 活动报名截止时间
                            var enterStarttime = this.getMillisecond(item.enterStarttime || 0);      // 活动报名开始时间
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
                margin: 0;
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

