
/* 
    成员事物路由
*/

// 园区入口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);
const asideComRoot = resolve => require(['@/pages/asideComRoot/index'],resolve);

//园区管理主页
const memberMain = resolve => require(['@/pages/memberMatters/memberMain/index.vue'],resolve);

//成员事物--内容管理--活动管理
const activityDraft = resolve => require(['@/pages/memberMatters/memberContent/activityManage/activityDraft.vue'],resolve);
const activityPublished = resolve => require(['@/pages/memberMatters/memberContent/activityManage/activityPublished.vue'],resolve);
//成员事物--内容管理--资讯管理
const informationDraft = resolve => require(['@/pages/memberMatters/memberContent/informationManage/informationDraft.vue'],resolve);
const informationPublished = resolve => require(['@/pages/memberMatters/memberContent/informationManage/informationPublished.vue'],resolve);

//成员事物--任务池--活动报名审核
const activityEnrollAudit = resolve => require(['@/pages//memberMatters//memberTaskPool//enrollAudit/activityEnrolllAudit.vue'],resolve);
const activityEnrollAuditDetail = resolve => require(['@/pages/memberMatters/memberTaskPool/enrollAudit/activityEnrollAuditDetail.vue'],resolve);
const activityEnrollList = resolve => require(['@/pages/memberMatters/memberTaskPool/enrollAudit/activityEnrollList.vue'],resolve);

//成员事物--任务池--发布审核--活动发布审核
const activityPublishAudit = resolve => require(['@/pages/memberMatters/memberTaskPool/publishAudit/activityPublish/activityPublishAudit.vue'],resolve);
const activityPublishAuditDetail = resolve => require(['@/pages/memberMatters/memberTaskPool/publishAudit/activityPublish/activityPublishAuditDetail.vue'],resolve);
const activityPublishList = resolve => require(['@/pages/memberMatters/memberTaskPool/publishAudit/activityPublish/activityPublishList.vue'],resolve);

//成员事物--任务池--发布审核--资讯发布审核
const informationPublishAudit = resolve => require(['@/pages/memberMatters/memberTaskPool/publishAudit/informationPublish/informationPublishAudit.vue'],resolve);
const informationPublishAuditDetail = resolve => require(['@/pages/memberMatters/memberTaskPool/publishAudit/informationPublish/informationPublishAuditDetail.vue'],resolve);
const informationPublishList = resolve => require(['@/pages/memberMatters/memberTaskPool/publishAudit/informationPublish/informationPublishList.vue'],resolve);

//成员事物--我的事项--我的报名
const myEnrollActivty = resolve => require(['@/pages/memberMatters/memberMyBusiness/myEnroll/myEnrollActivty.vue'],resolve);
const myEnrollbenevolent = resolve => require(['@/pages/memberMatters/memberMyBusiness/myEnroll/myEnrollbenevolent.vue'],resolve);

//成员事物--我的事项--我的关注
const myFollowActivty = resolve => require(['@/pages/memberMatters/memberMyBusiness/myFollow/myFollowActivty.vue'],resolve);
const myFollowbenevolent = resolve => require(['@/pages/memberMatters/memberMyBusiness/myFollow/myFollowbenevolent.vue'],resolve);
const myFollowInformation = resolve => require(['@/pages/memberMatters/memberMyBusiness/myFollow/myFollowInformation.vue'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        
        {
            path: '/pages/manage/memberMain',
            name: "park-memberMain",
            component: asideComRoot,
            children: [
                //主页
                {
                    path: "/pages/manage/memberMain",
                    name: "park-memberMain",
                    component: memberMain
                },
                //内容管理
                {
                    path: "/pages/manage/contentManage",
                    name: "park-activityDraft",
                    component: activityDraft,
                    redirect: '/pages/manage/contentManage/activityDraft',
                    children:[
                        //内容管理--活动管理
                        {
                            path: "/pages/manage/contentManage/activityDraft",
                            name: "park-activityDraft",
                            component: activityDraft,
                            children:[
                                {
                                    path: "/pages/manage/contentManage/activityDraft",
                                    name: "park-activityDraft",
                                    component: activityDraft
                                },
                                {
                                    path: "/pages/manage/contentManage/activityPublished",
                                    name: "park-activityPublished",
                                    component: activityPublished
                                },
                            ]
                        },
                        //内容管理--资讯管理
                        {
                            path: "/pages/manage/contentManage/informationDraft",
                            name: "park-informationDraft",
                            component: informationDraft,
                            children:[
                                {
                                    path: "/pages/manage/contentManage/informationDraft",
                                    name: "park-informationDraft",
                                    component: informationDraft
                                },
                                {
                                    path: "/pages/manage/contentManage/informationPublished",
                                    name: "park-informationPublished",
                                    component: informationPublished
                                },
                            ]
                        },
                    ]
                },
                //任务池
                {
                    path: "/pages/manage/taskPool/activityPublishList",
                    name: "park-activityPublishList",
                    component: activityPublishList,
                    children:[
                        //任务池--发布审核
                        {
                            path: "/pages/manage/taskPool/activityPublishList",
                            name: "park-activityPublishList",
                            component: activityPublishList,
                            children:[
                                {
                                    path: "/pages/manage/taskPool/activityPublishList",
                                    name: "park-activityPublishList",
                                    component: activityPublishList
                                },
                                {
                                    path: "/pages/manage/taskPool/informationPublishList",
                                    name: "park-informationPublishList",
                                    component: informationPublishList
                                },
                            ]
                        },
                        //任务池--报名审核
                        {
                            path: "/pages/manage/taskPool/activityEnrollList",
                            name: "park-activityEnrollList",
                            component: activityEnrollList,
                            children:[
                                {
                                    path: "/pages/manage/taskPool/activityEnrollList",
                                    name: "park-activityEnrollList",
                                    component: activityEnrollList
                                }
                            ]
                        }
                    ]
                },
                //我的事项
                {
                    path: "/pages/manage/myBusiness/myEnroll",
                    name: "park-myEnrollActivty",
                    component: myEnrollActivty,
                    children:[
                        //我的报名
                        {
                            path: "/pages/manage/myBusiness/myEnrollActivty",
                            name: "park-myEnrollActivty",
                            component: myEnrollActivty,
                            children:[
                                {
                                    path: "/pages/manage/myBusiness/myEnrollActivty",
                                    name: "park-myEnrollActivty",
                                    component: myEnrollActivty
                                },
                                {
                                    path: "/pages/manage/myBusiness/myEnrollbenevolent",
                                    name: "park-myEnrollbenevolent",
                                    component: myEnrollbenevolent
                                }
                            ]
                        },
                        //我的关注
                        {
                            path: "/pages/manage/myBusiness/myFollowActivty",
                            name: "park-myFollowActivty",
                            component: myFollowActivty,
                            children:[
                                {
                                    path: "/pages/manage/myBusiness/myFollowActivty",
                                    name: "park-myFollowActivty",
                                    component: myFollowActivty
                                },
                                {
                                    path: "/pages/manage/myBusiness/myFollowbenevolent",
                                    name: "park-myFollowbenevolent",
                                    component: myFollowbenevolent
                                },
                                {
                                    path: "/pages/manage/myBusiness/myFollowInformation",
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
            path: "/pages/manage/taskPool/activityEnrollAudit",
            name: "park-activityEnrollAudit",
            component: activityEnrollAudit
        },
        {
            path: "/pages/manage/taskPool/activityEnrollAuditDetail",
            name: "park-activityEnrollAuditDetail",
            component: activityEnrollAuditDetail
        },
        {
            path: "/pages/manage/taskPool/activityPublishAudit",
            name: "park-activityPublishAudit",
            component: activityPublishAudit
        },
        {
            path: "/pages/manage/taskPool/activityPublishAuditDetail",
            name: "park-activityPublishAuditDetail",
            component: activityPublishAuditDetail
        },
        {
            path: "/pages/manage/taskPool/informationPublishAudit",
            name: "park-informationPublishAudit",
            component: informationPublishAudit
        },
        {
            path: "/pages/manage/taskPool/informationPublishAuditDetail",
            name: "park-informationPublishAuditDetail",
            component: informationPublishAuditDetail
        }
   ]
 };