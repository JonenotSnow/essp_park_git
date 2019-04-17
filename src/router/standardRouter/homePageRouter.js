
/* 
    园区首页路由
*/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
//首页暂时无菜单导航
// const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

/**********菜单路由放置区***********/


/**********全页面路由放置区***********/

// 园区首页
const parkHome = resolve => require(['@/views/parkHall/home/index'],resolve);
//园区列表
const parkList =  resolve => require(['@/views/parkHall/home/parkList.vue'],resolve);
// 普惠金融
const inclusiveFinance =  resolve => require(['@/views/parkHall/manage/inclusiveFinance'], resolve);
// 入驻企业
const allEnterpriseList =  resolve => require(['@/views/parkHall/manage/allEnterpriseList'], resolve);
//邀请函
const requestPage =  resolve => require(['@/views/commonComponents/commonManage/requestPage.vue'],resolve);
// 园区搜索页面
const parkSearch = resolve => require(['@/views/parkHall/home/parkSearch'],resolve);

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

        }
   ]
 };