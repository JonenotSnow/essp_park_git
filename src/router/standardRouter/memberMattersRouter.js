
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
const activityAudit = resolve => require(['@/pages/memberMatters/memberTaskPool/enrollAudit/activityAudit.vue'],resolve);
const activityAuditDetail = resolve => require(['@/pages/memberMatters/memberTaskPool/enrollAudit/activityAuditDetail.vue'],resolve);
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
        // {
        //     path: '/parkHall/memberMatters/baseInfo',
        //     name: "park-memberMatters",
        //     component: asideComRoot,
        //     redirect: '/parkHall/memberMatters/baseInfo',
        //     children: [
        //         {
        //             path: "/parkHall/memberMatters/baseInfo",
        //             name: "park-baseInfo",
        //             component: baseInfo
        //         }
        //     ]
        // }
   ]
 };