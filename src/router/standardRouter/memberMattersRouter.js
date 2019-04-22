
/* 
    成员事物路由
*/

// 园区入口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);
const asideComRoot = resolve => require(['@/pages/standard/asideComRoot/index'],resolve);

//园区管理主页
const memberMain = resolve => require(['@/pages/standard/memberMatters/memberMain/index.vue'],resolve);

//成员事物--内容管理--活动管理
const activityPublish = resolve => require(['@/pages/standard/memberMatters/memberContent/activityManage/activityPublish.vue'],resolve);
const activityDraft = resolve => require(['@/pages/standard/memberMatters/memberContent/activityManage/activityDraft.vue'],resolve);
const activityPublished = resolve => require(['@/pages/standard/memberMatters/memberContent/activityManage/activityPublished.vue'],resolve);
//成员事物--内容管理--资讯管理
const informationPublish = resolve => require(['@/pages/standard/memberMatters/memberContent/informationManage/informationPublish.vue'],resolve);
const informationDraft = resolve => require(['@/pages/standard/memberMatters/memberContent/informationManage/informationDraft.vue'],resolve);
const informationPublished = resolve => require(['@/pages/standard/memberMatters/memberContent/informationManage/informationPublished.vue'],resolve);

//成员事物--任务池--活动报名审核
const activityEnrollAudit = resolve => require(['@/pages/standard//memberMatters//memberTaskPool//enrollAudit/activityEnrolllAudit.vue'],resolve);
const activityEnrollAuditDetail = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/enrollAudit/activityEnrollAuditDetail.vue'],resolve);
const activityEnrollList = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/enrollAudit/activityEnrollList.vue'],resolve);

//成员事物--任务池--发布审核--活动发布审核
const activityPublishAudit = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/publishAudit/activityPublish/activityPublishAudit.vue'],resolve);
const activityPublishAuditDetail = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/publishAudit/activityPublish/activityPublishAuditDetail.vue'],resolve);
const activityPublishList = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/publishAudit/activityPublish/activityPublishList.vue'],resolve);

//成员事物--任务池--发布审核--资讯发布审核
const informationPublishAudit = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/publishAudit/informationPublish/informationPublishAudit.vue'],resolve);
const informationPublishAuditDetail = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/publishAudit/informationPublish/informationPublishAuditDetail.vue'],resolve);
const informationPublishList = resolve => require(['@/pages/standard/memberMatters/memberTaskPool/publishAudit/informationPublish/informationPublishList.vue'],resolve);

//成员事物--我的事项--我的报名
const myEnrollActivty = resolve => require(['@/pages/standard/memberMatters/memberMyBusiness/myEnroll/myEnrollActivty.vue'],resolve);
const myEnrollbenevolent = resolve => require(['@/pages/standard/memberMatters/memberMyBusiness/myEnroll/myEnrollbenevolent.vue'],resolve);

//成员事物--我的事项--我的关注
const myFollowActivty = resolve => require(['@/pages/standard/memberMatters/memberMyBusiness/myFollow/myFollowActivty.vue'],resolve);
const myFollowbenevolent = resolve => require(['@/pages/standard/memberMatters/memberMyBusiness/myFollow/myFollowbenevolent.vue'],resolve);
const myFollowInformation = resolve => require(['@/pages/standard/memberMatters/memberMyBusiness/myFollow/myFollowInformation.vue'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        
        {
            path: '/pages/memberMatters/memberMain',
            name: "park-memberMain",
            component: asideComRoot,
            children: [
                //主页
                {
                    path: "/pages/memberMatters/memberMain",
                    name: "park-memberMain",
                    component: memberMain
                },
                //内容管理
                {
                    path: "/pages/memberMatters/contentManage",
                    name: "park-activityDraft",
                    component: activityDraft,
                    redirect: '/pages/memberMatters/contentManage/activityDraft',
                    children:[
                        //内容管理--活动管理
                        {
                            path: "/pages/memberMatters/contentManage/activityDraft",
                            name: "park-activityDraft",
                            component: activityDraft,
                            children:[
                                {
                                    path: "/pages/memberMatters/contentManage/activityDraft",
                                    name: "park-activityDraft",
                                    component: activityDraft
                                },
                                {
                                    path: "/pages/memberMatters/contentManage/activityPublished",
                                    name: "park-activityPublished",
                                    component: activityPublished
                                },
                            ]
                        },
                        //内容管理--资讯管理
                        {
                            path: "/pages/memberMatters/contentManage/informationDraft",
                            name: "park-informationDraft",
                            component: informationDraft,
                            children:[
                                {
                                    path: "/pages/memberMatters/contentManage/informationDraft",
                                    name: "park-informationDraft",
                                    component: informationDraft
                                },
                                {
                                    path: "/pages/memberMatters/contentManage/informationPublished",
                                    name: "park-informationPublished",
                                    component: informationPublished
                                },
                            ]
                        },
                    ]
                },
                //任务池
                {
                    path: "/pages/memberMatters/memberTaskPool/activityPublishList",
                    name: "park-activityPublishList",
                    component: activityPublishList,
                    children:[
                        //任务池--发布审核
                        {
                            path: "/pages/memberMatters/memberTaskPool/activityPublishList",
                            name: "park-activityPublishList",
                            component: activityPublishList,
                            children:[
                                {
                                    path: "/pages/memberMatters/memberTaskPool/activityPublishList",
                                    name: "park-activityPublishList",
                                    component: activityPublishList
                                },
                                {
                                    path: "/pages/memberMatters/memberTaskPool/informationPublishList",
                                    name: "park-informationPublishList",
                                    component: informationPublishList
                                },
                            ]
                        },
                        //任务池--报名审核
                        {
                            path: "/pages/memberMatters/memberTaskPool/activityEnrollList",
                            name: "park-activityEnrollList",
                            component: activityEnrollList,
                            children:[
                                {
                                    path: "/pages/memberMatters/memberTaskPool/activityEnrollList",
                                    name: "park-activityEnrollList",
                                    component: activityEnrollList
                                }
                            ]
                        }
                    ]
                },
                //我的事项
                {
                    path: "/pages/memberMatters/myBusiness/myEnroll",
                    name: "park-myEnrollActivty",
                    component: myEnrollActivty,
                    children:[
                        //我的报名
                        {
                            path: "/pages/memberMatters/myBusiness/myEnrollActivty",
                            name: "park-myEnrollActivty",
                            component: myEnrollActivty,
                            children:[
                                {
                                    path: "/pages/memberMatters/myBusiness/myEnrollActivty",
                                    name: "park-myEnrollActivty",
                                    component: myEnrollActivty
                                },
                                {
                                    path: "/pages/memberMatters/myBusiness/myEnrollbenevolent",
                                    name: "park-myEnrollbenevolent",
                                    component: myEnrollbenevolent
                                }
                            ]
                        },
                        //我的关注
                        {
                            path: "/pages/memberMatters/myBusiness/myFollowActivty",
                            name: "park-myFollowActivty",
                            component: myFollowActivty,
                            children:[
                                {
                                    path: "/pages/memberMatters/myBusiness/myFollowActivty",
                                    name: "park-myFollowActivty",
                                    component: myFollowActivty
                                },
                                {
                                    path: "/pages/memberMatters/myBusiness/myFollowbenevolent",
                                    name: "park-myFollowbenevolent",
                                    component: myFollowbenevolent
                                },
                                {
                                    path: "/pages/memberMatters/myBusiness/myFollowInformation",
                                    name: "park-myFollowInformation",
                                    component: myFollowInformation
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: "/pages/memberMatters/memberTaskPool/activityEnrollAudit",
            name: "park-activityEnrollAudit",
            component: activityEnrollAudit
        },
        {
            path: "/pages/memberMatters/memberTaskPool/activityEnrollAuditDetail",
            name: "park-activityEnrollAuditDetail",
            component: activityEnrollAuditDetail
        },
        {
            path: "/pages/memberMatters/memberTaskPool/activityPublishAudit",
            name: "park-activityPublishAudit",
            component: activityPublishAudit
        },
        {
            path: "/pages/memberMatters/memberTaskPool/activityPublishAuditDetail",
            name: "park-activityPublishAuditDetail",
            component: activityPublishAuditDetail
        },
        {
            path: "/pages/memberMatters/memberTaskPool/informationPublishAudit",
            name: "park-informationPublishAudit",
            component: informationPublishAudit
        },
        {
            path: "/pages/memberMatters/memberTaskPool/informationPublishAuditDetail",
            name: "park-informationPublishAuditDetail",
            component: informationPublishAuditDetail
        },
        {
            path: "/pages/manage/activityManage/activityPublish",
            name: "park-activityPublish",
            component: activityPublish
        },
        {
            path: "/pages/manage/informationManage/informationPublish",
            name: "park-informationPublish",
            component: informationPublish
        }
   ]
 };