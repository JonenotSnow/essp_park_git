
/* 
    园区惠政路由
*/

// 园区入口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);

//全部惠政
const allBenevolent = resolve => require(['@/pages/benevolent/allBenevolent.vue'],resolve);
//惠政详情
const benevolentDetail = resolve => require(['@/pages/benevolent/benevolentDetail/benevolentDetail.vue'],resolve);
//惠政报名详情
const benevolentErollDetail = resolve => require(['@/pages/benevolent/benevolentDetail/benevolentErollDetail.vue'],resolve);
//惠政设置说明
const benevolentSetDetail = resolve => require(['@/pages/benevolent/benevolentSetDetail.vue'],resolve);


export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/pages/benevolent/allBenevolent',
            name: "park-allBenevolent",
            component: allBenevolent,
            
        },
        {
            path: '/pages/benevolent/benevolentDetail',
            name: "park-benevolentDetail",
            component: benevolentDetail,
            
        },
        {
            path: '/pages/benevolent/benevolentErollDetail',
            name: "park-benevolentErollDetail",
            component: benevolentErollDetail
        },
        {
            path: '/pages/benevolent/benevolentSetDetail',
            name: "park-benevolentSetDetail",
            component: benevolentSetDetail
        }
   ]
 };