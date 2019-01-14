/*
 * @Author: Evanlian
 * @Date: 20181204 08:50:37
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-10 18:59:20
 * @Description: 公用路由
 */
// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

//园区管理 概览设置 模板1
const scanModelOne = resolve => require(['@/views/commonComponents/commonManage/scanModelOne'],resolve);
//园区管理 概览设置 模板2
const scanModelTwo = resolve => require(['@/views/commonComponents/commonManage/scanModelTwo'],resolve);
//园区管理 申请入驻园区
const requestAddPark = resolve => require(['@/views/commonComponents/commonManage/requestAddPark'],resolve);
// 园区管理 成员管理 邀请入园
const sendRequest = resolve => require(['@/views/commonComponents/commonManage/sendRequest'],resolve);
// 园区管理 成员管理 智能推荐
const IntelligentInvestment = resolve => require(['@/views/commonComponents/commonManage/IntelligentInvestment'],resolve);
// 园区管理 成员管理 邀请企业加入园区
const requestEnterprice =  resolve => require(['@/views/commonComponents/commonManage/requestEnterprice'],resolve);
// 园区管理 入园审核详情
const manageAuditing =  resolve => require(['@/views/commonComponents/commonManage/manageAuditing'],resolve);
// //园区管理 入园状态审核详情
const manageParkAuditDetail =  resolve => require(['@/views/commonComponents/commonManage/manageParkAuditDetail'],resolve);
// //园区管理 活动状态审核详情
const manageActivityAuditDetail =  resolve => require(['@/views/commonComponents/commonManage/manageActivityAuditDetail'],resolve);
// 园区管理 活动审核详情
const manageActivityAudit =  resolve => require(['@/views/commonComponents/commonManage/manageActivityAudit'],resolve);
//邀请函
const requestPage =  resolve => require(['@/views/commonComponents/commonManage/requestPage.vue'],resolve);
// 园区活动
// //活动管理 --企业审核活动详情 xhj
const activityAuditDetail = resolve => require(['@/views/commonComponents/commonActivity/activityAuditDetail'],resolve);
// 园区我报名的活动
const enrollActive = resolve => require(['@/views/commonComponents/commonActivity/enrollActive'],resolve);
// 园区全部的活动
const allActive = resolve => require(['@/views/commonComponents/commonActivity/allActive'],resolve);
// 园区我发起的活动
const launchActive = resolve => require(['@/views/commonComponents/commonActivity/launchActive'],resolve);
// 园区我审核的发布活动
const auditingActive = resolve => require(['@/views/commonComponents/commonActivity/auditing'],resolve);
// 园区我审核的报名活动

const auditingBmActive = resolve => require(['@/views/commonComponents/commonActivity/auditingBm'],resolve);

// 园区我关注的活动
const followActive = resolve => require(['@/views/commonComponents/commonActivity/followActive'],resolve);
// 园区活动详情
const activityDetail = resolve => require(['@/views/commonComponents/commonActivity/activityDetail'],resolve);

const activityBmAuditDetail = resolve => require(['@/views/commonComponents/commonActivity/activityBmAuditDetail'],resolve);
//活动草稿页
// const draftActivity = resolve => require(['@/views/commonComponents/commonActivity/draftActivity'],resolve);

// 活动报名
const enrollForm = resolve => require(['@/views/commonComponents/commonActivity/enrollForm'],resolve);
// 活动发起
const launchForm = resolve => require(['@/views/commonComponents/commonActivity/launchForm'],resolve);


export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/parkIndex/park',
            name: "park-active",
            component: asideComRoot,
            redirect: '/parkIndex/park/all',
            children: [
                {
                    path: '/parkIndex/park/all',
                    name: 'park-allActive',
                    component: allActive,
                    
                },
                {
                    path: '/parkIndex/park/enroll',
                    name: 'park-enrollActive',
                    component: enrollActive,
                    
                },
                {
                    path: '/parkIndex/park/launch',
                    name: 'park-launchActive',
                    component: launchActive,
                    
                },
                {
                    path: '/parkIndex/park/follow',
                    name: 'park-followActive',
                    component: followActive,
                    
                },
                {
                    path: '/parkIndex/park/auditing',
                    name: 'park-auditingActive',
                    component: auditingActive,
                    
                },
                {
                    path: '/parkIndex/park/auditingBm',
                    name: 'park-auditingBmActive',
                    component: auditingBmActive,
                    
                }

            ]
        },
        {
            path: '/parkHall/manage/scanModelOne',
            name: "park-scanModelOne",
            component: scanModelOne,
        },
        {
            path: '/parkHall/manage/requestAddPark',
            name: "park-requestAddPark",
            component: requestAddPark,
        },
        {
            path: '/parkHall/manage/scanModelTwo',
            name: "park-scanModelTwo",
            component: scanModelTwo,
            
        },
        {
            path: '/parkHall/manage/sendRequest',
            name: "park-sendRequest",
            component: sendRequest,
            
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
            path: '/requestPage',
            name: 'park-requestPage',
            component: requestPage
        },
        {
            path: '/parkHall/activity/activityAuditDetail',
            name: "park-activityAuditDetail",
            component: activityAuditDetail,
            
        },
        {
            path: '/parkIndex/activityDetail',
            name: "park-activityDetail",
            component: activityDetail
        },
        {
            path: '/parkIndex/activityBmAuditDetail',
            name: "park-activityBmAuditDetail",
            component: activityBmAuditDetail,
           
        },
        {
            path: '/parkIndex/enrollForm',
            name: "park-enrollForm",
            component: enrollForm,
            
        },
        {
            path: '/parkIndex/launchForm',
            name: "park-launchForm",
            component: launchForm,
           
        },
   ]
 };