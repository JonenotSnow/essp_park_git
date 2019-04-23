/***********************园区管理路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);
const asideComRoot = resolve => require(['@/pages/asideComRoot/index'],resolve);

/***********平台设置************/

/*****关于我们******/
const baseInfo= resolve => require(['@/pages/bd/manage/platformSetup/aboutWe/baseInfo'],resolve);
//园区管理 概览设置 模板1
const scanModelOne = resolve => require(['@/pages/bd/manage/platformSetup/aboutWe/scanModelOne'],resolve);
//园区管理 概览设置 模板2
const scanModelTwo = resolve => require(['@/pages/bd/manage/platformSetup/aboutWe/scanModelTwo'],resolve);

/*****入驻申请表******/
const occupancyApplication = resolve => require(['@/pages/bd/manage/platformSetup/addParkRequestForm/occupancyApplication'],resolve);

/*****bannert设置******/
const bannerSet= resolve => require(['@/pages/bd/manage/platformSetup/bannerSet/bannerSet'], resolve);

/*****数据管理******/
const dataManage = resolve => require(['@/pages/bd/manage/platformSetup/dataManage/dataManage'], resolve);

/*****专家团队******/
const expertTeam = resolve => require(['@/pages/bd/manage/platformSetup/expertTeam'], resolve);
//发布专家团队
const publishExpertTeam = resolve => require(['@/pages/bd/manage/platformSetup/expertTeam/publishExpertTeam'], resolve);

/*****发布成果******/
const resultManage = resolve => require(['@/pages/bd/manage/platformSetup/resultManage'], resolve);
//发布成果
const publishAchievement = resolve => require(['@/pages/bd/manage/platformSetup/resultManage/publishAchievement'], resolve);


/***********发布管理************/

/*****科技政策******/
const sciAndTechPolicy = resolve => require(['@/pages/bd/manage/publishManage/sciAndTechPolicy'], resolve);
//科技政策列表---政策法规
const policieAndRegulation = resolve => require(['@/pages/bd/manage/publishManage/sciAndTechPolicy/policieAndRegulation'], resolve);
//科技政策列表---科技服务
const sciAndTechService = resolve => require(['@/pages/bd/manage/publishManage/sciAndTechPolicy/sciAndTechService'], resolve);
//发布科技政策
const publishSciAndTechPolicy = resolve => require(['@/pages/bd/manage/publishManage/sciAndTechPolicy/publishSciAndTechPolicy'], resolve);
//科技政策审核
const sciAndTechPolicyAuditDetail = resolve => require(['@/pages/bd/manage/publishManage/sciAndTechPolicy/sciAndTechPolicyAuditDetail'], resolve);

/*****咨询公告******/

/***********成员管理************/
const userManage = resolve => require(['@/pages/bd/manage/userManage/userManage/userManage'],resolve);
// 园区管理 成员管理 智能推荐
const IntelligentInvestment = resolve => require(['@/pages/bd/manage/userManage/userManage/IntelligentInvestment'],resolve);
// 园区管理 成员管理 邀请企业加入园区
const requestEnterprice =  resolve => require(['@/pages/bd/manage/userManage/userManage/requestEnterprice'],resolve);


/***********审核管理************/

const publishAudit = resolve => require(['@/pages/bd/manage/auditManage/publishAudit'], resolve);
//科技政策审核列表
const sciAndTechPolicyAudit = resolve => require(['@/pages/bd/manage/auditManage/publishAudit/sciAndTechPolicyAudit/index.vue'], resolve);
//发布审核详情
const audit = resolve => require(['@/pages/bd/manage/auditManage/publishAudit/sciAndTechPolicyAudit/audit'], resolve);
//发布审核历史详情
const auditDetail = resolve => require(['@/pages/bd/manage/auditManage/publishAudit/sciAndTechPolicyAudit/auditDetail'], resolve);
//资讯新闻审核列表
const newsNoticeAudit = resolve => require(['@/pages/bd/manage/auditManage/publishAudit/newsNoticeAudit/index.vue'], resolve);

/*****入园审核******/
/*****入园审核--列表******/
const activityPoolAddPark =resolve => require(['@/pages/bd/manage/auditManage/addParkAudit/activityPoolAddPark'],resolve);
/*****入园审核--待审核******/
const manageAuditing =  resolve => require(['@/pages/bd/manage/auditManage/addParkAudit/manageAuditing'],resolve);
/*****入园审核--已审核******/
const manageParkAuditDetail =  resolve => require(['@/pages/bd/manage/auditManage/addParkAudit/manageParkAuditDetail'],resolve);

/*****活动审核******/
const activityPoolActivityAuditing = resolve => require(['@/pages/bd/manage/auditManage/activityPublishAudit/activityPublishAudit'],resolve);
const activityPoolActivityAditing = resolve => require(['@/pages/bd/manage/auditManage/activityPublishAudit/activityPublishAudit'],resolve);
/*****活动审核--已审核******/
const manageActivityAuditDetail =  resolve => require(['@/pages/bd/manage/auditManage/activityPublishAudit/manageActivityAuditDetail'],resolve);
/*****活动审核--待审核******/
const manageActivityAudit =  resolve => require(['@/pages/bd/manage/auditManage/activityPublishAudit/manageActivityAudit'],resolve);

/***********需求管理************/
//园区管理-需求管理
const needManage = resolve => require(['@/pages/bd/manage/needManage/needManage'], resolve);
//园区管理-需求管理详情
const needManageDetail = resolve => require(['@/pages/bd/manage/needManage/needManage/needManageDetail'], resolve);






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