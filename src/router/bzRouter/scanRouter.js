/***********************园区概览路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
 //概览暂无右侧菜单
// const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

// 园区预览
const scanIndex = resolve => require(['@/views/commonComponents/commonPreview/scanIndex'],resolve);
//申请入驻园区
const requestAddPark = resolve => require(['@/views/commonComponents/commonManage/requestAddPark'],resolve);

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