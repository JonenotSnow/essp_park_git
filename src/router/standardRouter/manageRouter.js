
/* 
    园区管理路由
*/

// 园区入口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);
const asideComRoot = resolve => require(['@/pages/asideComRoot/index'],resolve);

//园区管理--主页
const manageMain = resolve => require(['@/pages/manage/manageMain/index.vue'],resolve);

//园区管理--成员管理
const memberList = resolve => require(['@/pages/manage/userManage/memberList.vue'],resolve);
const immediate = resolve => require(['@/pages/manage/userManage/immediate.vue'],resolve);
const intelligent = resolve => require(['@/pages/manage/userManage/intelligent.vue'],resolve);

//园区管理--内容管理--活动管理
const activityPublish = resolve => require(['@/pages/manage/contentManage/activityManage/activityPublish.vue'],resolve);
const activityDraft = resolve => require(['@/pages/manage/contentManage/activityManage/activityDraft.vue'],resolve);
const activityPublished = resolve => require(['@/pages/manage/contentManage/activityManage/activityPublished.vue'],resolve);
//园区管理--内容管理--惠政管理
const benevolentPublish = resolve => require(['@/pages/manage/contentManage/benevolentManage/benevolentPublish.vue'],resolve);
const benevolentDraft = resolve => require(['@/pages/manage/contentManage/benevolentManage/benevolentDraft.vue'],resolve);
const benevolentPublished = resolve => require(['@/pages/manage/contentManage/benevolentManage/benevolentPublished.vue'],resolve);
//园区管理--内容管理--资讯管理
const informationPublish = resolve => require(['@/pages/manage/contentManage/informationManage/informationPublish.vue'],resolve);
const informationDraft = resolve => require(['@/pages/manage/contentManage/informationManage/informationDraft.vue'],resolve);
const informationPublished = resolve => require(['@/pages/manage/contentManage/informationManage/informationPublished.vue'],resolve);
//园区管理--内容管理--通知公告管理
const noticePublish = resolve => require(['@/pages/manage/contentManage/noticeManage/noticePublish.vue'],resolve);
const noticeDraft = resolve => require(['@/pages/manage/contentManage/noticeManage/noticeDraft.vue'],resolve);
const noticePublished = resolve => require(['@/pages/manage/contentManage/noticeManage/noticePublished.vue'],resolve);

//园区管理--任务池--入园审核
const addParkAudit = resolve => require(['@/pages/manage/taskPool/addParkAudit/addParkAudit.vue'],resolve);
const addParkAuditDetail = resolve => require(['@/pages/manage/taskPool/addParkAudit/addParkAuditDetail.vue'],resolve);
const addParkAuditList = resolve => require(['@/pages/manage/taskPool/addParkAudit/addParkAuditList.vue'],resolve);
//园区管理--任务池--报名审核--活动报名审核
const activityEnrollAudit = resolve => require(['@/pages/manage/taskPool/enrollAudit/ActivityEnrollAudit/activityEnrollAudit.vue'],resolve);
const activityEnrollAuditDetail = resolve => require(['@/pages/manage/taskPool/enrollAudit/ActivityEnrollAudit/activityEnrollAuditDetail.vue'],resolve);
const activityEnrollList = resolve => require(['@/pages/manage/taskPool/enrollAudit/ActivityEnrollAudit/activityEnrollList.vue'],resolve);
//园区管理--任务池--报名审核--惠政申报审核
const benevolentEnrollAudit = resolve => require(['@/pages/manage/taskPool/enrollAudit/benevolentEnrollAudit/benevolentEnrollAudit.vue'],resolve);
const benevolentEnrollAuditDetail = resolve => require(['@/pages/manage/taskPool/enrollAudit/benevolentEnrollAudit/benevolentEnrollAuditDetail.vue'],resolve);
const benevolentEnrollList = resolve => require(['@/pages/manage/taskPool/enrollAudit/benevolentEnrollAudit/benevolentEnrollList.vue'],resolve);
//园区管理--任务池--发布审核--活动发布审核
const activityPublishAudit = resolve => require(['@/pages/manage/taskPool/publishAudit/activityPublish/activityPublishAudit.vue'],resolve);
const activityPublishAuditDetail = resolve => require(['@/pages/manage/taskPool/publishAudit/activityPublish/activityPublishAuditDetail.vue'],resolve);
const activityPublishList = resolve => require(['@/pages/manage/taskPool/publishAudit/activityPublish/activityPublishList.vue'],resolve);
//园区管理--任务池--发布审核--惠政发布审核
const benevolentPublishAuditDetail = resolve => require(['@/pages/manage/taskPool/publishAudit/benevolentPublish/benevolentPublishAuditDetail.vue'],resolve);
const benevolentPublishList = resolve => require(['@/pages/manage/taskPool/publishAudit/benevolentPublish/benevolentPublishList.vue'],resolve);
const benevolentPublishAudit = resolve => require(['@/pages/manage/taskPool/publishAudit/benevolentPublish/benevolentPublishAudit.vue'],resolve);
//园区管理--任务池--发布审核--资讯发布审核
const informationPublishAudit = resolve => require(['@/pages/manage/taskPool/publishAudit/informationPublish/informationPublishAudit.vue'],resolve);
const informationPublishAuditDetail = resolve => require(['@/pages/manage/taskPool/publishAudit/informationPublish/informationPublishAuditDetail.vue'],resolve);
const informationPublishList = resolve => require(['@/pages/manage/taskPool/publishAudit/informationPublish/informationPublishList.vue'],resolve);

//园区管理--园区设置--入驻申请表
const application = resolve => require(['@/pages/manage/parkStup/application/application.vue'],resolve);
//园区管理--园区设置--banner设置
const bannerSet = resolve => require(['@/pages/manage/parkStup/bannerSettings/bannerSet.vue'],resolve);
//园区管理--园区设置--基本信息及模板设置
const baseInfoSettings = resolve => require(['@/pages/manage/parkStup/overviewSettings/baseInfoSettings.vue'],resolve);
const moduleSelect = resolve => require(['@/pages/manage/parkStup/overviewSettings/moduleSelect.vue'],resolve);
const setModuleOne = resolve => require(['@/pages/manage/parkStup/overviewSettings/setModuleOne.vue'],resolve);
const setModuleTwo = resolve => require(['@/pages/manage/parkStup/overviewSettings/setModuleTwo.vue'],resolve);

//园区管理--我的事项--我的报名
const myEnrollActivty = resolve => require(['@/pages/manage/myBusiness/myEnroll/myEnrollActivty.vue'],resolve);
const myEnrollbenevolent = resolve => require(['@/pages/manage/myBusiness/myEnroll/myEnrollbenevolent.vue'],resolve);

//园区管理--我的事项--我的关注
const myFollowActivty = resolve => require(['@/pages/manage/myBusiness/myFollow/myFollowActivty.vue'],resolve);
const myFollowbenevolent = resolve => require(['@/pages/manage/myBusiness/myFollow/myFollowbenevolent.vue'],resolve);
const myFollowInformation = resolve => require(['@/pages/manage/myBusiness/myFollow/myFollowInformation.vue'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/pages/manage/manageMain',
            name: "park-manageMain",
            component: asideComRoot,
            children: [
                //主页
                {
                    path: "/pages/manage/manageMain",
                    name: "park-manageMain",
                    component: manageMain
                },
                //成员管理
                {
                    path: "/pages/manage/userManage/memberList",
                    name: "park-memberList",
                    component: memberList
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
                                    component: benevolentDraft
                                },
                                {
                                    path: "/pages/manage/contentManage/activityPublished",
                                    name: "park-activityPublished",
                                    component: activityPublished
                                },
                            ]
                        },
                        //内容管理--惠政管理
                        {
                            path: "/pages/manage/contentManage/benevolentDraft",
                            name: "park-benevolentDraft",
                            component: benevolentDraft,
                            children:[
                                {
                                    path: "/pages/manage/contentManage/benevolentDraft",
                                    name: "park-benevolentDraft",
                                    component: benevolentDraft
                                },
                                {
                                    path: "/pages/manage/contentManage/benevolentPublished",
                                    name: "park-benevolentPublished",
                                    component: benevolentPublished
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
                        //内容管理--通知公告管理
                        {
                            path: "/pages/manage/contentManage/noticeDraft",
                            name: "park-noticeDraft",
                            component: noticeDraft,
                            children:[
                                {
                                    path: "/pages/manage/contentManage/noticeDraft",
                                    name: "park-noticeDraft",
                                    component: noticeDraft
                                },
                                {
                                    path: "/pages/manage/contentManage/noticePublished",
                                    name: "park-noticePublished",
                                    component: noticePublished
                                },
                            ]
                        }
                    ]
                },
                //任务池
                {
                    path: "/pages/manage/taskPool/addParkAuditList",
                    name: "park-addParkAuditList",
                    component: addParkAuditList,
                    children:[
                        //任务池--入园审核
                        {
                            path: "/pages/manage/taskPool/addParkAuditList",
                            name: "park-addParkAuditList",
                            component: addParkAuditList
                        },
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
                                    path: "/pages/manage/taskPool/benevolentPublishList",
                                    name: "park-benevolentPublishList",
                                    component: benevolentPublishList
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
                                },
                                {
                                    path: "/pages/manage/taskPool/benevolentEnrollList",
                                    name: "park-benevolentEnrollList",
                                    component: benevolentEnrollList
                                },
                            ]
                        }
                    ]
                },
                //园区设置
                {
                    path: "/pages/manage/parkStup/application",
                    name: "park-application",
                    component: application,
                    children:[
                        {
                            path: "/pages/manage/parkStup/application",
                            name: "park-application",
                            component: application
                        },
                        {
                            path: "/pages/manage/parkStup/bannerSet",
                            name: "park-bannerSet",
                            component: bannerSet
                        },
                        {
                            path: "/pages/manage/parkStup/baseInfoSettings",
                            name: "park-baseInfoSettings",
                            component: baseInfoSettings
                        },
                        {
                            path: "/pages/manage/parkStup/moduleSelect",
                            name: "park-moduleSelect",
                            component: moduleSelect
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
            path: "/pages/manage/userManage/immediate",
            name: "park-immediate",
            component: immediate
        },
        {
            path: "/pages/manage/userManage/intelligent",
            name: "park-intelligent",
            component: intelligent
        },
        {
            path: "/pages/manage/taskPool/addParkAudit",
            name: "park-addParkAudit",
            component: addParkAudit
        },
        {
            path: "/pages/manage/taskPool/addParkAuditDetail",
            name: "park-addParkAuditDetail",
            component: addParkAuditDetail
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
            path: "/pages/manage/taskPool/benevolentEnrollAudit",
            name: "park-benevolentEnrollAudit",
            component: benevolentEnrollAudit
        },
        {
            path: "/pages/manage/taskPool/benevolentEnrollAuditDetail",
            name: "park-benevolentEnrollAuditDetail",
            component: benevolentEnrollAuditDetail
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
            path: "/pages/manage/taskPool/benevolentPublishAudit",
            name: "park-benevolentPublishAudit",
            component: benevolentPublishAudit
        },
        {
            path: "/pages/manage/taskPool/benevolentPublishAuditDetail",
            name: "park-benevolentPublishAuditDetail",
            component: benevolentPublishAuditDetail
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
        },
        {
            path: "/pages/manage/taskPool/setModuleOne",
            name: "park-setModuleOne",
            component: setModuleOne
        },
        {
            path: "/pages/manage/taskPool/setModuleTwo",
            name: "park-setModuleTwo",
            component: setModuleTwo
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
        },
        {
            path: "/pages/manage/noticeManage/noticePublish",
            name: "park-noticePublish",
            component: noticePublish
        },
        {
            path: "/pages/manage/benevolentManage/benevolentPublish",
            name: "park-benevolentPublish",
            component: benevolentPublish
        }
   ]
 };