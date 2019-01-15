/*
 * @Author: Evanlian
 * @Date: 20181204 08:50:37
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-08 11:15:55
 * @Description: 系统模块核心文件，请统一风格，谢谢！！！
 */
// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'], resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'], resolve);

const baseInfo2 = resolve => require(['@/views/newmanage/platformSetup/aboutWe/baseInfo'], resolve);
const occupancyApplication2 = resolve => require(['@/views/newmanage/platformSetup/addParkRequestForm/occupancyApplication'],resolve);
const activityPoolAddPark2 = resolve => require(['@/views/newmanage/auditManage/addParkAudit/activityPoolAddPark'], resolve);
const activityPoolActivityAditing2 = resolve => require(['@/views/newmanage/auditManage/activityPublishAudit/activityPublishAudit'], resolve);
const userManage2 = resolve => require(['@/views/newmanage/userManage/userManage/userManage'], resolve);
const bannerSet2= resolve => require(['@/views/newmanage/platformSetup/bannerSet/bannerSet'], resolve);

//园区管理-关于我们
const dataManage = resolve => require(['@/views/newmanage/platformSetup/dataManage/dataManage'], resolve);
//成果管理
const resultManage = resolve => require(['@/views/newmanage/platformSetup/resultManage'], resolve);
//专家团队
const expertTeam = resolve => require(['@/views/newmanage/platformSetup/expertTeam'], resolve);
//发布专家团队
const publishExpertTeam = resolve => require(['@/views/newmanage/platformSetup/expertTeam/publishExpertTeam'], resolve);
//发布成果
const publishAchievement = resolve => require(['@/views/newmanage/platformSetup/resultManage/publishAchievement'], resolve);


//园区管理-发布管理
//科技政策列表
const sciAndTechPolicy = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy'], resolve);

//科技政策列表---政策法规
const policieAndRegulatio = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/policieAndRegulation'], resolve);
//科技政策列表---科技服务
const sciAndTechService = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/sciAndTechService'], resolve);
//发布科技政策
const publishSciAndTechPolicy = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/publishSciAndTechPolicy'], resolve);
//科技政策审核
const sciAndTechPolicyAuditDetail = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/sciAndTechPolicyAuditDetail'], resolve);

//园区管理-审核管
// 发布审核------
const publishAudit = resolve => require(['@/views/newmanage/auditManage/publishAudit'], resolve);

//科技政策审核列表
const sciAndTechPolicyAudit = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/index.vue'], resolve);
//资讯新闻审核列表
const newsNoticeAudit = resolve => require(['@/views/newmanage/auditManage/publishAudit/newsNoticeAudit/index.vue'], resolve);
//发布审核详情
const audit = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/audit'], resolve);

//发布审核历史详情
const auditDetail = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/auditDetail'], resolve);

//园区管理-需求管理
const needManage = resolve => require(['@/views/newmanage/needManage/needManage'], resolve);
//园区管理-需求管理详情
const needManageDetail = resolve => require(['@/views/newmanage/needManage/needManage/needManageDetail'], resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children: [
        {
            path: '/parkHall/manage/publishAchievement',
            name: "park-publishAchievement",
            component: publishAchievement,

        },
        {
            path: '/parkHall/manage/publishExpertTeam',
            name: "park-publishExpertTeam",
            component: publishExpertTeam,

        },
        {
            path: '/parkHall/manage/publishSciAndTechPolicy',
            name: "park-publishSciAndTechPolicy",
            component: publishSciAndTechPolicy,

        },
        {
            path: '/parkHall/manage/sciAndTechPolicyAuditDetail',
            name: "park-sciAndTechPolicyAuditDetail",
            component: sciAndTechPolicyAuditDetail,
        },
        {
            path: "/parkHall/manage/auditDetail",
            name: "park-auditDetail",
            component: auditDetail
        },
        {
            path: "/parkHall/manage/audit",
            name: "park-audit",
            component: audit
        },
        {
            path: "/parkHall/manage/needManageDetail",
            name: "park-needManageDetail",
            component: needManageDetail

        },
        //园区管理---保定园区
        {
            path: "/parkHall/manage/baseInfo2",
            name: "park-manage",
            component: asideComRoot,
            redirect: '/parkHall/manage/baseInfo2',
            children: [
                //平台设置
                {
                    path: "/parkHall/manage/baseInfo2",
                    name: "park-baseInfo2",
                    component: baseInfo2
                },
                {
                    path: "/parkHall/manage/dataManage",
                    name: "park-dataManage",
                    component: dataManage
                },
                {
                    path: "/parkHall/manage/resultManage",
                    name: "park-resultManage",
                    component: resultManage
                },
                {
                    path: "/parkHall/manage/expertTeam",
                    name: "park-expertTeam",
                    component: expertTeam
                },
                {
                    path: '/parkHall/manage/occupancyApplication2',
                    name: "park-occupancyApplication2",
                    component: occupancyApplication2,
                  
                },
                {
                    path: "/parkHall/manage/bannerSet2",
                    name: "park-bannerSet2",
                    component: bannerSet2
                },
                //发布管理
                //科技政策
                {
                    path: "/parkHall/manage/sciAndTechPolicy",
                    name: "park-sciAndTechPolicy",
                    component: sciAndTechPolicy,
                    redirect: '/parkHall/manage/sciAndTechPolicy/policieAndRegulatio',
                    children: [
                        {
                            path: "/parkHall/manage/sciAndTechPolicy/policieAndRegulatio",
                            name: "park-policieAndRegulatio",
                            component: policieAndRegulatio
                        },
                        {
                            path: "/parkHall/manage/sciAndTechPolicy/sciAndTechService",
                            name: "park-sciAndTechService",
                            component: sciAndTechService
                        }
                    ]
                },
                //审核管理
                {
                    path: "/parkHall/manage/activityPoolAddPark2",
                    name: "park-activityPoolAddPark2",
                    component: activityPoolAddPark2
                },
                {
                    path: "/parkHall/manage/activityPoolActivityAditing2",
                    name: "park-activityPoolActivityAditing2",
                    component: activityPoolActivityAditing2
                },
                {
                    path: "/parkHall/manage/publishAudit",
                    name: "park-publishAudit",
                    component: publishAudit,
                    redirect: '/parkHall/manage/sciAndTechPolicyAudit',
                    children: [
                        {
                            path: "/parkHall/manage/sciAndTechPolicyAudit",
                            name: "park-policieAndRegulationAudit",
                            component: sciAndTechPolicyAudit

                        },
                        {
                            path: "/parkHall/manage/newsNoticeAudit",
                            name: "park-newsNoticeAudit",
                            component: newsNoticeAudit
                        }
                    ]
                },

                //成员管理
                {
                    path: "/parkHall/manage/userManage2",
                    name: "park-userManage2",
                    component: userManage2
                },
                //需求管理
                {
                    path: "/parkHall/manage/needManage",
                    name: "park-needManage",
                    component: needManage

                }
            ]
        },
    ]
};
