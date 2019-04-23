/***********************园区首页路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/pages/index'],resolve);
//首页暂时无菜单导航
// const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

/**********菜单路由放置区***********/


/**********全页面路由放置区***********/

// 园区首页
const parkHome = resolve => require(['@/pages/bd/homePage/index'],resolve);
// 园区列表
const parkList =  resolve => require(['@/pages/bd/homePage/parkList.vue'],resolve);
// 普惠金融
const inclusiveFinance =  resolve => require(['@/pages/bd/homePage/inclusiveFinance'], resolve);
// 入驻企业
const allEnterpriseList =  resolve => require(['@/pages/bd/homePage/allEnterpriseList'], resolve);
//邀请函
const requestPage =  resolve => require(['@/pages/bd/homePage/requestPage.vue'],resolve);
// 园区搜索页面
const parkSearch = resolve => require(['@/pages/bd/homePage/parkSearch'],resolve);
//园区管理 申请入驻园区
const requestAddPark = resolve => require(['@/pages/bd/homePage/requestAddPark'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/parkHome',
            name: "park-home",
            component: parkHome,

        },
        {
            path: '/parkHall/manage/inclusiveFinance',
            name: "park-inclusiveFinance",
            component: inclusiveFinance,

        },
        {
            path: '/parkHall/manage/allEnterpriseList',
            name: "park-allEnterpriseList",
            component: allEnterpriseList,

        },
        {
            path: '/requestPage',
            name: 'park-requestPage',
            component: requestPage
        },
        {
            path: '/parkSearch',
            name: 'park-search',
            component: parkSearch,

        },
        {
            path: '/parkList',
            name: 'parkList',
            component: parkList,

        },
        {
            path: '/parkHall/manage/requestAddPark',
            name: 'park-requestAddPark',
            component: requestAddPark,

        }
   ]
 };