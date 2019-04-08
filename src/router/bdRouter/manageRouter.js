/***********************园区管理路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

/***********平台设置************/

/*****关于我们******/
const baseInfo= resolve => require(['@/views/parkHall/manage/baseInfo'],resolve);
//园区管理 概览设置 模板选择
const selectModule = resolve => require(['@/views/parkHall/manage/selectModule'],resolve);
//园区管理 概览设置 模板1
const scanModelOne = resolve => require(['@/views/commonComponents/commonManage/scanModelOne'],resolve);
//园区管理 概览设置 模板2
const scanModelTwo = resolve => require(['@/views/commonComponents/commonManage/scanModelTwo'],resolve);

/*****入驻申请表******/
const occupancyApplication = resolve => require(['@/views/commonComponents/commonManage/occupancyApplication'],resolve);

/*****bannert设置******/
const bannerSet= resolve => require(['@/views/commonComponents/commonManage/bannerSet'], resolve);

/*****数据管理******/
const dataManage = resolve => require(['@/views/newmanage/platformSetup/dataManage/dataManage'], resolve);

/*****专家团队******/
const expertTeam = resolve => require(['@/views/newmanage/platformSetup/expertTeam'], resolve);
//发布专家团队
const publishExpertTeam = resolve => require(['@/views/newmanage/platformSetup/expertTeam/publishExpertTeam'], resolve);

/*****发布成果******/
const resultManage = resolve => require(['@/views/newmanage/platformSetup/resultManage'], resolve);
//发布成果
const publishAchievement = resolve => require(['@/views/newmanage/platformSetup/resultManage/publishAchievement'], resolve);


/***********发布管理************/

/*****科技政策******/
const sciAndTechPolicy = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy'], resolve);
//科技政策列表---政策法规
const policieAndRegulation = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/policieAndRegulation'], resolve);
//科技政策列表---科技服务
const sciAndTechService = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/sciAndTechService'], resolve);
//发布科技政策
const publishSciAndTechPolicy = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/publishSciAndTechPolicy'], resolve);
//科技政策审核
const sciAndTechPolicyAuditDetail = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/sciAndTechPolicyAuditDetail'], resolve);

/*****咨询公告******/

/***********成员管理************/
const userManage = resolve => require(['@/views/commonComponents/commonManage/userManage'],resolve);
// 园区管理 成员管理 智能推荐
const IntelligentInvestment = resolve => require(['@/views/commonComponents/commonManage/IntelligentInvestment'],resolve);
// 园区管理 成员管理 邀请企业加入园区
const requestEnterprice =  resolve => require(['@/views/commonComponents/commonManage/requestEnterprice'],resolve);


/***********审核管理************/

const publishAudit = resolve => require(['@/views/newmanage/auditManage/publishAudit'], resolve);
//科技政策审核列表
const sciAndTechPolicyAudit = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/index.vue'], resolve);
//发布审核详情
const audit = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/audit'], resolve);
//发布审核历史详情
const auditDetail = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/auditDetail'], resolve);
//资讯新闻审核列表
const newsNoticeAudit = resolve => require(['@/views/newmanage/auditManage/publishAudit/newsNoticeAudit/index.vue'], resolve);

/*****入园审核******/
// 园区管理入园审核
const activityPoolAddPark =resolve => require(['@/views/parkHall/manage/activityPoolAddPark'],resolve);
// 园区管理 入园审核详情
const manageAuditing =  resolve => require(['@/views/commonComponents/commonManage/manageAuditing'],resolve);
//园区管理 入园状态审核详情
const manageParkAuditDetail =  resolve => require(['@/views/commonComponents/commonManage/manageParkAuditDetail'],resolve);

/*****活动审核******/
const activityPoolActivityAuditing = resolve => require(['@/views/parkHall/manage/activityPoolActivityAuditing'],resolve);
const activityPoolActivityAditing = resolve => require(['@/views/parkHall/manage/activityPoolActivityAuditing'],resolve);
//园区管理 活动状态审核详情
const manageActivityAuditDetail =  resolve => require(['@/views/commonComponents/commonManage/manageActivityAuditDetail'],resolve);
// 园区管理 活动审核详情
const manageActivityAudit =  resolve => require(['@/views/commonComponents/commonManage/manageActivityAudit'],resolve);

/*****资讯审核******/
// 园区管理资讯审核
const activityPoolZX = resolve => require(['@/views/parkHall/manage/activityPoolZX'],resolve);
// 园区管理 咨询审核详情
const manageZXAuditing =  resolve => require(['@/views/parkHall/manage/manageZXAuditing'],resolve);
//园区管理 活动状态审核详情
const manageZXAuditingDetail = resolve => require(['@/views/parkHall/manage/manageZXAuditingDetail'],resolve);

/***********需求管理************/
//园区管理-需求管理
const needManage = resolve => require(['@/views/newmanage/needManage/needManage'], resolve);
//园区管理-需求管理详情
const needManageDetail = resolve => require(['@/views/newmanage/needManage/needManage/needManageDetail'], resolve);






export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/parkHall/manage/baseInfo',
            name: "park-manage",
            component: asideComRoot,
            redirect: '/parkHall/manage/baseInfo',
            children: [
                {
                    path: "/parkHall/manage/baseInfo",
                    name: "park-baseInfo",
                    component: baseInfo
                },
                {
                    path: '/parkHall/manage/selectModule',
                    name: "park-selectModule",
                    component: selectModule,

                },
                {
                    path: '/parkHall/manage/userManage',
                    name: "park-userManage",
                    component: userManage,

                },
                {
                    path: '/parkHall/manage/occupancyApplication',
                    name: "park-occupancyApplication",
                    component: occupancyApplication,

                },
                {
                    path: '/parkHall/manage/activityPoolAddPark',
                    name: "park-activityPoolAddPark",
                    component: activityPoolAddPark,

                },
                {
                    path: '/parkHall/manage/activityPoolZX',
                    name: "park-activityPoolZX",
                    component: activityPoolZX,

                },
                {
                    path: '/parkHall/manage/activityPoolActivityAuditing',
                    name: "park-activityPoolActivityAuditing",
                    component: activityPoolActivityAuditing,

                },
                {
                    path: '/parkHall/manage/activityPoolActivityAditing',
                    name: "park-activityPoolActivityAditing",
                    component: activityPoolActivityAditing,

                },
                {
                    path: '/parkHall/manage/bannerSet',
                    name: "park-bannerSet",
                    component: bannerSet,

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
                    path: "/parkHall/manage/needManage",
                    name: "park-needManage",
                    component: needManage

                },
                {
                    path: "/parkHall/manage/sciAndTechPolicy",
                    name: "park-sciAndTechPolicy",
                    component: sciAndTechPolicy,
                    redirect: '/parkHall/manage/sciAndTechPolicy/policieAndRegulation',
                    children: [
                        {
                            path: "/parkHall/manage/sciAndTechPolicy/policieAndRegulation",
                            name: "park-policieAndRegulation",
                            component: policieAndRegulation
                        },
                        {
                            path: "/parkHall/manage/sciAndTechPolicy/sciAndTechService",
                            name: "park-sciAndTechService",
                            component: sciAndTechService
                        }
                    ]
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
            ]
        },
        {
            path: '/parkHall/manage/scanModelOne',
            name: "park-scanModelOne",
            component: scanModelOne,
        },
        {
            path: '/parkHall/manage/scanModelTwo',
            name: "park-scanModelTwo",
            component: scanModelTwo,
            
        },
        {
            path: '/parkHall/manage/IntelligentInvestment',
            name: "park-IntelligentInvestment",
            component: IntelligentInvestment,
            
        },
        {
            path: '/parkHall/manage/requestEnterprice',
            name: "park-requestEnterprice",
            component: requestEnterprice,
            
        },
        {
            path: '/parkHall/manage/manageZXAuditing',
            name: "park-manageZXAuditing",
            component: manageZXAuditing,

        },
        {
            path: '/parkHall/manage/manageZXAuditingDetail',
            name: "park-manageZXAuditingDetail",
            component: manageZXAuditingDetail,

        },
        {
            path: '/parkHall/manage/manageAuditing',
            name: "park-manageAuditing",
            component: manageAuditing,
            
        },
        {
            path: '/parkHall/manage/manageParkAuditDetail',
            name: "park-manageParkAuditDetail",
            component: manageParkAuditDetail,
            
        },
        {
            path: '/parkHall/manage/manageActivityAuditDetail',
            name: "park-manageActivityAuditDetail",
            component: manageActivityAuditDetail,
            
        },
        {
            path: '/parkHall/manage/manageActivityAudit',
            name: "park-manageActivityAudit",
            component: manageActivityAudit,
            
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
            path: "/parkHall/manage/needManageDetail",
            name: "park-needManageDetail",
            component: needManageDetail

        }
   ]
 };