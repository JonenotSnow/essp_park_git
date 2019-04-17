
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
const activityDraft = resolve => require(['@/pages/manage/contentManage/activityManage/activityDraft.vue'],resolve);
const activityPublished = resolve => require(['@/pages/manage/contentManage/activityManage/activityPublished.vue'],resolve);
//园区管理--内容管理--惠政管理
const benevolentDraft = resolve => require(['@/pages/manage/contentManage/benevolentManage/benevolentDraft.vue'],resolve);
const benevolentPublished = resolve => require(['@/pages/manage/contentManage/benevolentManage/benevolentPublished.vue'],resolve);
//园区管理--内容管理--资讯管理
const informationDraft = resolve => require(['@/pages/manage/contentManage/informationManage/informationDraft.vue'],resolve);
const informationPublished = resolve => require(['@/pages/manage/contentManage/informationManage/informationPublished.vue'],resolve);
//园区管理--内容管理--通知公告管理
const noticeDraft = resolve => require(['@/pages/manage/contentManage/noticeManage/noticeDraft.vue'],resolve);
const noticePublished = resolve => require(['@/pages/manage/contentManage/noticeManage/noticePublished.vue'],resolve);

//园区管理--任务池--入园审核
const addParkAudit = resolve => require(['@/pages/manage/taskPool/addParkAudit/addParkAudit.vue'],resolve);
const addParkAuditDetail = resolve => require(['@/pages/manage/taskPool/addParkAudit/addParkAuditDetail.vue'],resolve);
const addParkAuditList = resolve => require(['@/pages/manage/taskPool/addParkAudit/addParkAuditList.vue'],resolve);
//园区管理--任务池--报名审核--活动报名审核
const activityAudit = resolve => require(['@/pages/manage/taskPool/enrollAudit/ActivityErollAudit/activityAudit.vue'],resolve);
const activityAuditDetail = resolve => require(['@/pages/manage/taskPool/enrollAudit/ActivityErollAudit/activityAuditDetail.vue'],resolve);
const activityEnrollList = resolve => require(['@/pages/manage/taskPool/enrollAudit/ActivityErollAudit/activityEnrollList.vue'],resolve);
//园区管理--任务池--报名审核--惠政申报审核
const benevolentAudit = resolve => require(['@/pages/manage/taskPool/enrollAudit/benevolentErollAudit/benevolentAudit.vue'],resolve);
const benevolentAuditDetail = resolve => require(['@/pages/manage/taskPool/enrollAudit/benevolentErollAudit/benevolentAuditDetail.vue'],resolve);
const benevolentEnrollList = resolve => require(['@/pages/manage/taskPool/enrollAudit/benevolentErollAudit/benevolentEnrollList.vue'],resolve);
//成员事物--任务池--发布审核--活动发布审核
const activityPublishAudit = resolve => require(['@/pages/manage/taskPool/publishAudit/activityPublish/activityPublishAudit.vue'],resolve);
const activityPublishAuditDetail = resolve => require(['@/pages/manage/taskPool/publishAudit/activityPublish/activityPublishAuditDetail.vue'],resolve);
const activityPublishList = resolve => require(['@/pages/manage/taskPool/publishAudit/activityPublish/activityPublishList.vue'],resolve);
//成员事物--任务池--发布审核--惠政发布审核
const benevolentPublishAuditDetail = resolve => require(['@/pages/manage/taskPool/publishAudit/benevolentPublish/benevolentPublishAuditDetail.vue'],resolve);
const benevolentPublishList = resolve => require(['@/pages/manage/taskPool/publishAudit/benevolentPublish/benevolentPublishList.vue'],resolve);
const benevolentPublishPublishAudit = resolve => require(['@/pages/manage/taskPool/publishAudit/benevolentPublish/benevolentPublishPublishAudit.vue'],resolve);
//成员事物--任务池--发布审核--资讯发布审核
const informationPublishAudit = resolve => require(['@/pages/manage/taskPool/publishAudit/informationPublish/informationPublishAudit.vue'],resolve);
const informationPublishAuditDetail = resolve => require(['@/pages/manage/taskPool/publishAudit/informationPublish/informationPublishAuditDetail.vue'],resolve);
const informationPublishList = resolve => require(['@/pages/manage/taskPool/publishAudit/informationPublish/informationPublishList.vue'],resolve);

//园区管理--园区设置--入驻申请表
const applicationForAdmission = resolve => require(['@/pages/manage/parkStup/applicationForAdmission/applicationForAdmission.vue'],resolve);
//园区管理--园区设置--banner设置
const bannerSet = resolve => require(['@/pages/manage/parkStup/bannerSettings/bannerSet.vue'],resolve);
//园区管理--园区设置--基本信息及模板设置
const baseInfoSettings = resolve => require(['@/pages/manage/parkStup/overviewSettings/baseInfoSettings.vue'],resolve);
const moduleSelect = resolve => require(['@/pages/manage/parkStup/overviewSettings/moduleSelect.vue'],resolve);
const setModuleOne = resolve => require(['@/pages/manage/parkStup/overviewSettings/setModuleOne.vue'],resolve);

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
            path: '/parkHall/manage/manageMain',
            name: "park-manageMain",
            component: asideComRoot,
            children: [
                {
                    path: "/parkHall/manage/manageMain",
                    name: "park-manageMain",
                    component: manageMain
                }
            ]
        }
   ]
 };