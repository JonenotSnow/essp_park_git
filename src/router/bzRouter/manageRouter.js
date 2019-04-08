/***********************园区管理路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

/***********园区设置************/

//园区管理 概览设置
const baseInfo= resolve => require(['@/views/parkHall/manage/baseInfo'],resolve);
//园区管理 概览设置 模板选择
const selectModule = resolve => require(['@/views/parkHall/manage/selectModule'],resolve);
//园区管理 概览设置 模板1
const scanModelOne = resolve => require(['@/views/commonComponents/commonManage/scanModelOne'],resolve);
//园区管理 概览设置 模板2
const scanModelTwo = resolve => require(['@/views/commonComponents/commonManage/scanModelTwo'],resolve);
// 园区成員管理
const userManage = resolve => require(['@/views/commonComponents/commonManage/userManage'],resolve);
// 园区管理 成员管理 智能推荐
const IntelligentInvestment = resolve => require(['@/views/commonComponents/commonManage/IntelligentInvestment'],resolve);
// 园区管理 成员管理 邀请企业加入园区
const requestEnterprice =  resolve => require(['@/views/commonComponents/commonManage/requestEnterprice'],resolve);
// 园区管理入驻申请表
const occupancyApplication = resolve => require(['@/views/commonComponents/commonManage/occupancyApplication'],resolve);

/***********任务池************/

/*****入园审核******/
// 园区管理入园审核
const activityPoolAddPark =resolve => require(['@/views/parkHall/manage/activityPoolAddPark'],resolve);
// 园区管理 入园审核详情
const manageAuditing =  resolve => require(['@/views/commonComponents/commonManage/manageAuditing'],resolve);
//园区管理 入园状态审核详情
const manageParkAuditDetail =  resolve => require(['@/views/commonComponents/commonManage/manageParkAuditDetail'],resolve);

/*****活动审核******/
const activityPoolActivityAuditing = resolve => require(['@/views/parkHall/manage/activityPoolActivityAuditing'],resolve);
const activityPoolActivityAditing = resolve => require(['@/views/parkHall/manage/activityPoolActivityAuditing'],resolve);
//园区管理 活动状态审核详情
const manageActivityAuditDetail =  resolve => require(['@/views/commonComponents/commonManage/manageActivityAuditDetail'],resolve);
// 园区管理 活动审核详情
const manageActivityAudit =  resolve => require(['@/views/commonComponents/commonManage/manageActivityAudit'],resolve);

/*****资讯审核******/
// 园区管理资讯审核
const activityPoolZX = resolve => require(['@/views/parkHall/manage/activityPoolZX'],resolve);
// 园区管理 咨询审核详情
const manageZXAuditing =  resolve => require(['@/views/parkHall/manage/manageZXAuditing'],resolve);
//园区管理 活动状态审核详情
const manageZXAuditingDetail = resolve => require(['@/views/parkHall/manage/manageZXAuditingDetail'],resolve);

/*****惠政审核******/
//园区管理 惠政审核列表
const activityPoolGover =  resolve => require(['@/views/parkHall/manage/activityPoolGover'],resolve);
// //园区管理 活动状态审核详情
const manageGoverAuditing =  resolve => require(['@/views/parkHall/manage/manageGoverAuditing'],resolve);
// //园区管理 活动状态审核详情
const manageGoverAuditingDetail = resolve => require(['@/views/parkHall/manage/manageGoverAuditingDetail'],resolve);


/***********其他设置************/
// 园区通知公告
const noticeAndAD = resolve => require(['@/views/parkHall/manage/noticeAndAD'],resolve);
// 园区管理发布通知公告
const publishAD = resolve => require(['@/views/parkHall/manage/publishAD'],resolve);
// 通知公告详情
const noAndADDetail = resolve => require(['@/views/parkHall/manage/noAndADDetail'],resolve);
//bannert设置
const bannerSet= resolve => require(['@/views/commonComponents/commonManage/bannerSet'], resolve);





export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/parkHall/manage/baseInfo',
            name: "park-manage",
            component: asideComRoot,
            redirect: '/parkHall/manage/baseInfo',
            children: [
                {
                    path: "/parkHall/manage/baseInfo",
                    name: "park-baseInfo",
                    component: baseInfo
                },
                {
                    path: '/parkHall/manage/selectModule',
                    name: "park-selectModule",
                    component: selectModule,

                },
                {
                    path: '/parkHall/manage/userManage',
                    name: "park-userManage",
                    component: userManage,

                },
                {
                    path: '/parkHall/manage/occupancyApplication',
                    name: "park-occupancyApplication",
                    component: occupancyApplication,

                },
                {
                    path: '/parkHall/manage/activityPoolAddPark',
                    name: "park-activityPoolAddPark",
                    component: activityPoolAddPark,

                },
                {
                    path: '/parkHall/manage/activityPoolZX',
                    name: "park-activityPoolZX",
                    component: activityPoolZX,

                },
                {
                    path: '/parkHall/manage/activityPoolGover',
                    name: "park-activityPoolGover",
                    component: activityPoolGover,

                },
                {
                    path: '/parkHall/manage/activityPoolActivityAuditing',
                    name: "park-activityPoolActivityAuditing",
                    component: activityPoolActivityAuditing,

                },
                {
                    path: '/parkHall/manage/activityPoolActivityAditing',
                    name: "park-activityPoolActivityAditing",
                    component: activityPoolActivityAditing,

                },
                {
                    path: '/parkHall/manage/noticeAndAD',
                    name: "park-noticeAndAD",
                    component: noticeAndAD,

                },
                {
                    path: '/parkHall/manage/publishAD',
                    name: "park-publishAD",
                    component: publishAD,

                },
                {
                    path: '/parkHall/manage/bannerSet',
                    name: "park-bannerSet",
                    component: bannerSet,

                }
            ]
        },
        {
            path: '/parkHall/manage/scanModelOne',
            name: "park-scanModelOne",
            component: scanModelOne,
        },
        {
            path: '/parkHall/manage/scanModelTwo',
            name: "park-scanModelTwo",
            component: scanModelTwo,
            
        },
        {
            path: '/parkHall/manage/IntelligentInvestment',
            name: "park-IntelligentInvestment",
            component: IntelligentInvestment,
            
        },
        {
            path: '/parkHall/manage/requestEnterprice',
            name: "park-requestEnterprice",
            component: requestEnterprice,
            
        },
        {
            path: '/parkHall/manage/manageGoverAuditing',
            name: "park-manageGoverAuditing",
            component: manageGoverAuditing,

        },
        {
            path: '/parkHall/manage/manageGoverAuditingDetail',
            name: "park-manageGoverAuditingDetail",
            component: manageGoverAuditingDetail,

        },
        {
            path: '/parkHall/manage/manageZXAuditing',
            name: "park-manageZXAuditing",
            component: manageZXAuditing,

        },
        {
            path: '/parkHall/manage/manageZXAuditingDetail',
            name: "park-manageZXAuditingDetail",
            component: manageZXAuditingDetail,

        },
        {
            path: '/parkHall/manage/manageAuditing',
            name: "park-manageAuditing",
            component: manageAuditing,
            
        },
        {
            path: '/parkHall/manage/manageParkAuditDetail',
            name: "park-manageParkAuditDetail",
            component: manageParkAuditDetail,
            
        },
        {
            path: '/parkHall/manage/manageActivityAuditDetail',
            name: "park-manageActivityAuditDetail",
            component: manageActivityAuditDetail,
            
        },
        {
            path: '/parkHall/manage/manageActivityAudit',
            name: "park-manageActivityAudit",
            component: manageActivityAudit,
            
        },
        {
            path: '/parkHall/manage/noAndADDetail',
            name: "park-noAndADDetail",
            component: noAndADDetail,

        },
   ]
 };