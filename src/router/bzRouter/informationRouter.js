/***********************园区资讯路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

/**********菜单路由放置区***********/

//园区资讯全部资讯
const allInfo = resolve => require(['@/views/parkHall/information/allInfo'],resolve);
//园区资讯我关注的资讯
const myFollowedInfo = resolve => require(['@/views/parkHall/information/myFollowedInfo'],resolve);
//园区资讯我发布的资讯
const myPublishedInfo = resolve => require(['@/views/parkHall/information/myPublishedInfo'],resolve);
//园区资讯审核列表
const infoAuditing = resolve => require(['@/views/parkHall/information/auditing'],resolve);


/**********全页面路由放置区***********/

//园区资讯发布新资讯
const publishNewInfo = resolve => require(['@/views/parkHall/information/publishNewInfo'],resolve);
//园区资讯审核详情
const infoAuditDetail = resolve => require(['@/views/parkHall/information/auditDetail'],resolve);
//资讯详情
const infoDetail = resolve => require(['@/views/parkHall/information/infoDetail'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/parkIndex/parkInformation',
            name: "park-parkInformation",
            component: asideComRoot,
            redirect: '/parkIndex/parkInformation/all',
            children: [
                {
                    path: '/parkIndex/parkInformation/all',
                    name: 'park-allInfo',
                    component: allInfo,

                },
                {
                    path: '/parkIndex/parkInformation/myFollowedInfo',
                    name: 'park-myFollowedInfo',
                    component: myFollowedInfo,

                },
                {
                    path: '/parkIndex/parkInformation/myPublishedInfo',
                    name: 'park-myPublishedInfo',
                    component: myPublishedInfo,

                },
                {
                    path: '/parkIndex/parkInformation/auditing',
                    name: 'park-infoAuditing',
                    component: infoAuditing,

                }

            ]
        },
        {
            path: '/parkIndex/infoAuditDetail',
            name: "park-infoAuditDetail",
            component: infoAuditDetail,

        },
        {
            path: '/parkIndex/publishNewInfo',
            name: "park-publishNewInfo",
            component: publishNewInfo,

        },
        {
            path: '/parkIndex/infoDetail',
            name: "park-infoDetail",
            component: infoDetail,

        }
    ]
 };