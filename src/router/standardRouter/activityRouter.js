
/* 
    园区活动路由
*/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

/**********菜单路由放置区***********/

// 园区我报名的活动
const enrollActive = resolve => require(['@/views/commonComponents/commonActivity/enrollActive'],resolve);
// 园区全部的活动
const allActive = resolve => require(['@/views/commonComponents/commonActivity/allActive'],resolve);
// // 园区我发起的活动
const launchActive = resolve => require(['@/views/commonComponents/commonActivity/launchActive'],resolve);
// 园区我审核的发布活动
const auditingActive = resolve => require(['@/views/commonComponents/commonActivity/auditing'],resolve);
// 园区我审核的报名活动
const auditingBmActive = resolve => require(['@/views/commonComponents/commonActivity/auditingBm'],resolve);
// 园区我关注的活动
const followActive = resolve => require(['@/views/commonComponents/commonActivity/followActive'],resolve);


/**********全页面路由放置区***********/

//活动管理--企业审核活动详情
const activityAuditDetail = resolve => require(['@/views/commonComponents/commonActivity/activityAuditDetail'],resolve);
// 园区活动详情
const activityDetail = resolve => require(['@/views/commonComponents/commonActivity/activityDetail'],resolve);
//活动报名审核详情
const activityBmAuditDetail = resolve => require(['@/views/commonComponents/commonActivity/activityBmAuditDetail'],resolve);
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