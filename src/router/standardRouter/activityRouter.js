
/* 
    园区活动路由
*/

// 园区入口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);

//全部活动
const allActivity = resolve => require(['@/pages/activity/allActivity.vue'],resolve);
//活动详情
const activityDetail = resolve => require(['@/pages/activity/activityDetail/activityDetail.vue'],resolve);
//活动报名详情
const activityErollDetail = resolve => require(['@/pages/activity/activityDetail/activityErollDetail.vue'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/pages/activity/allActivity',
            name: "park-allActivity",
            component: allActivity,
            
        },
        {
            path: '/pages/activity/activityDetail',
            name: "park-activityDetail",
            component: activityDetail,
            
        },
        {
            path: '/pages/activity/activityErollDetail',
            name: "park-activityErollDetail",
            component: activityErollDetail
        }
   ]
 };