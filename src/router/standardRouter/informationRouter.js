
/* 
    园区资讯路由
*/


// 园区入口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);

//全部资讯
const allInformation = resolve => require(['@/pages/standard/information/allInformation.vue'],resolve);
//资讯详情
const informationDetail = resolve => require(['@/pages/standard/information/informationDetail.vue'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/pages/information/allInformation',
            name: 'park-allInformation',
            component: allInformation,
        },
        {
            path: '/pages/information/informationDetail',
            name: 'park-informationDetail',
            component: informationDetail,
        },
    ]
 };