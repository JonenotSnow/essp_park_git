<script src="../../../../config/index.js"></script>
<template>
    <div>
        <fix-part :userDetail="userDetail"></fix-part>

        <component :is="item" v-for="item in modulesList" :key="item.id" :bannerDisList="bannerDisList"></component>
        <!-- <banner :bannerDisList="bannerDisList"></banner>

        <order-menu></order-menu>
         <service-hall></service-hall>
         <hot-center></hot-center>
         <notice></notice>

        <parkActive :activity_hot="activity_hot" :activity_newest="activity_newest"></parkActive>
         <park-policy :huizheng_hot="huizheng_hot" :huizheng_newest="huizheng_newest"></park-policy>
         <datamonitor></datamonitor>
         <expertteam></expertteam>
         <resultsdisplay></resultsdisplay>
         <joinenterprise></joinenterprise>
         <more-news></more-news>-->
        <!-- 发布区快速通道权限弹窗 -->

    </div>
</template>

<script>

    import BreadCrumb from "@/components/EsspBreadCrumb";
    import MoreNews from "@/views/newparkHall/home/moreNews"; //更多资讯
    import hotCenter from '@/views/newparkHall/home/hotCenter.vue'; // 热门中心
    import notice from '@/views/newparkHall/home/notice.vue'; //公告咨询
    import fixPart from '@/views/newparkHall/home/fixPart.vue'; // 右侧固定栏
    import datamonitor from '@/views/newparkHall/home/datamonitor';//数据监测模块
    import expertteam from '@/views/newparkHall/home/expertteam';//专家团队
    import resultsdisplay from '@/views/newparkHall/home/resultsdisplay';//成果展示
    import joinenterprise from '@/views/newparkHall/home/joinenterprise';//加入团队
    import banner from "@/views/newparkHall/home/banner.vue";

    import orderMenu from "@/views/newparkHall/home/menu.vue"; //菜单
    import serviceHall from '@/views/newparkHall/home/serviceHall.vue'; //大厅服务
    import parkActive from '@/views/newparkHall/home/parkActive.vue'; //园区活动（旧园区，淮安）
    import newparkActive from '@/views/newparkHall/home/newparkActive.vue'; //园区活动（新园区，保定）
    import parkPolicy from '@/views/newparkHall/home/parkPolicy.vue'; //园区惠政(旧园区，淮安)
    export default {
        name: "",
        components: {
            BreadCrumb,
            MoreNews,
            hotCenter,
            notice,
            fixPart,
            datamonitor,//数据监测
            expertteam,//专家团队
            resultsdisplay,//成果展示
            joinenterprise,//入驻企业
            banner,//新旧园区的banner合并
            orderMenu,
            serviceHall,//   fd
            parkActive,
            newparkActive,
            parkPolicy
        },
        data() {
            return {
                typeselect: "park_activity",
                currentIndex: "",
                //activity_hot   activity_newest  huizheng_hot huizheng_newest information_newest
                isBdPark: this.utils.isBdPark(),
                huizhengList: [],
                activity_hot: [],
                activity_newest: [],
                huizheng_hot: [],
                huizheng_newest: [],
                information_newest: [],
                huizhengTabIndex: 0,
                animate: false,
                bannerDisList: [],
                moreNewDates: [],
                // // keyWord: ["PPP", "园区招商", "技术孵化", "并购重组"],
                timer: null,
                userrole: "",
                btnText: 0,
                userDetail: {
                    email: ''
                },
                modulesList: [],
                modulesAllList: [
                    {
                        label: "banner模块",
                        key: 1,
                        name: 'banner'
                    },
                    {
                        label: "快捷菜单",
                        key: 2,
                        name: 'orderMenu'
                    },
                    {
                        label: "办事大厅",
                        key: 3,
                        name: 'serviceHall'
                    },
                    {
                        label: "中心热门需求",
                        key: 4,
                        name: 'hotCenter'
                    },
                    {
                        label: "资讯公告",
                        key: 5,
                        name: 'notice'
                    },
                    {
                        label: "旧园区活动",
                        key: 6,
                        name: 'parkActive'
                    },
                    {
                        label: "数据监测",
                        key: 7,
                        name: 'datamonitor'
                    },
                    {
                        label: "专家服务团队",
                        key: 8,
                        name: 'expertteam'
                    },
                    {
                        label: "成果展示",
                        key: 9,
                        name: 'resultsdisplay'
                    },
                    {
                        label: "入驻企业",
                        key: 10,
                        name: 'joinenterprise'
                    },
                    {
                        label: "新版园区活动",
                        key: 11,
                        name: 'newparkActive'
                    },
                    {
                        label: "园区惠政",
                        key: 12,
                        name: 'parkPolicy'
                    },
                    {
                        label: "最新资讯",
                        key: 13,
                        name: 'MoreNews'
                    }

                ],
                defaultModules: [
                    1, 2, 6, 12, 13, 10
                ],
                bdModules: [
                    1, 2, 3, 4, 5, 11, 7, 8, 9, 10
                ]
            };
        },
        mounted() {
        },
        created() {
            this.getAllData();
            // this.getInfo();
            if (this.isBdPark) {
                this.bdModules.forEach(item => {
                    this.modulesList.push(this.modulesAllList[item - 1].name)
                })
            } else {
                this.defaultModules.forEach(item => {
                    this.modulesList.push(this.modulesAllList[item - 1].name)
                })
            }


        },
        destroyed() {
            clearInterval(this.timer);
        },
        methods: {
            // getInfo() {
            //     //0:表示活动1:表示惠政2:表示资讯 this.$post(url,param)
            //     this.$post(this.$apiUrl.home.homeInfo, {
            //         pageNum: 0,
            //         pageSize: 10,
            //         parkId: window.sessionStorage.getItem("parkId")
            //     })
            //     //activity_hot   activity_newest  huizheng_hot huizheng_newest information_newest
            //         .then(response => {
            //             this.activity_hot = response.resultData.activity.hot; //热门活动
            //             this.activity_newest = response.resultData.activity.newest; //最新活动
            //             this.huizheng_hot = response.resultData.huizheng.hot; //热门惠政
            //             this.huizheng_newest = response.resultData.huizheng.newest; //最新惠政
            //             this.information_newest = response.resultData.information.newest; //最新资讯
            //             this.activityList = this.activity_newest;
            //             this.huizhengList = this.huizheng_newest;
            //         });

            // },
            getAllData() {
                this.$post("/parkManage/getParkById", {
                    parkId: window.sessionStorage.getItem("parkId")

                }).then(res => {
                    if (res.resultCode == "CLT000000000") {
                        if (res.resultData.slidesImage) {
                            let list = JSON.parse(res.resultData.slidesImage)
                            this.bannerDisList = list;
                            console.log( this.bannerDisList);
                        }
                        if (res.resultData) {
                            this.userDetail.email = res.resultData.email
                            this.userDetail.parkPosition = res.resultData.parkPosition
                            this.userDetail.parkAdminTel = res.resultData.parkAdminTel
                        }
                    }
                });
            }
        },
        computed: {}
    };
</script>

<style lang="less" scoped>
    @import "../../../assets/css/mixin";

    .anim {
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
    }


</style>
