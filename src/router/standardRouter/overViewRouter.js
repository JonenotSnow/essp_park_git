
/* 
    园区概览路由
*/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/pages/index'],resolve);

// 园区预览
const scanIndex = resolve => require(['@/pages/overView/index.vue'],resolve);
//申请入驻园区
const requestAddPark = resolve => require(['@/pages/overView/requestAddPark.vue'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/parkIndex/scanIndex',
            name: "park-scanIndex",
            component: scanIndex,
        },
        {
            path: '/parkHall/manage/requestAddPark',
            name: 'park-requestAddPark',
            component: requestAddPark,

        }
    ]
 };