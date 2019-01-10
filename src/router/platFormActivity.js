/*
 * @Author: Evanlian
 * @Date: 20181204 08:50:37
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-07 16:20:14
 * @Description: 新闻公告模块核心文件，请统一风格，谢谢！！！
 */
// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);
//设置说明
const setInstruction = resolve => require(['@/views/newparkHall/platFormActivity/setInstruction'],resolve);
// 园区我报名的活动
const enrollActive = resolve => require(['@/views/newparkHall/platFormActivity/enrollActive'],resolve);
// 园区全部的活动
const allActive = resolve => require(['@/views/newparkHall/platFormActivity/allActive'],resolve);
// 园区我发起的活动
const launchActive = resolve => require(['@/views/newparkHall/platFormActivity/launchActive'],resolve);
// 园区活动发布审核
const auditingActive = resolve => require(['@/views/newparkHall/platFormActivity/auditing'],resolve);
// 园区我审核的报名活动

const auditingBmActive = resolve => require(['@/views/newparkHall/platFormActivity/auditingBm'],resolve);

// 园区我关注的活动
const followActive = resolve => require(['@/views/newparkHall/platFormActivity/followActive'],resolve);
// 园区活动详情
const activityDetail = resolve => require(['@/views/newparkHall/platFormActivity/activityDetail'],resolve);
// 园区活动报名审核
const activityAudit = resolve => require(['@/views/newparkHall/platFormActivity/activityAudit'],resolve);
//活动管理 --企业审核活动详情 xhj
const activityAuditDetail = resolve => require(['@/views/parkHall/activity/activityAuditDetail'],resolve);

const activityBmAuditDetail = resolve => require(['@/views/newparkHall/platFormActivity/activityBmAuditDetail'],resolve);
//活动草稿页
const draftActivity = resolve => require(['@/views/newparkHall/platFormActivity/draftActivity'],resolve);

// 活动报名
const enrollForm = resolve => require(['@/views/newparkHall/platFormActivity/enrollForm'],resolve);
// 活动发起
const launchForm = resolve => require(['@/views/newparkHall/platFormActivity/launchForm'],resolve);
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
                    
                },
                {
                    path: '/parkIndex/park/auditing',
                    name: 'park-auditingActive',
                    component: auditingActive,
                    
                }

            ]
        },
        {
            path: '/parkHall/activity/activityAuditDetail',
            name: "park-activityAuditDetail",
            component: activityAuditDetail,
            
        },
        {
            path: "/newparkHall/platActivity/setInstruction",
            name: "park-setInstruction",
            component: setInstruction,
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