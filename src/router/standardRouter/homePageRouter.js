
/* 
    园区首页路由
*/

// 园区入口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);
// 园区首页
const parkHome = resolve => require(['@/pages/homePage/index.vue'],resolve);
//园区列表
const parkList =  resolve => require(['@/pages/homePage/parkList.vue'],resolve);
// 普惠金融
const inclusiveFinance =  resolve => require(['@/pages/homePage/inclusiveFinance.vue'], resolve);
// 入驻企业
const allEnterpriseList =  resolve => require(['@/pages/homePage/allEnterpriseList.vue'], resolve);
//邀请函
const requestPage =  resolve => require(['@/pages/homePage/requestPage.vue'],resolve);
// 园区搜索页面
const parkSearch = resolve => require(['@/pages/homePage/parkSearch.vue'],resolve);
// 通知公告详情
const noticeDetail = resolve => require(['@/pages/homePage/noticeDetail.vue'],resolve);

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
            path: '/noticeDetail',
            name: 'park-noticeDetail',
            component: noticeDetail,

        }
   ]
 };