// 路由名称: 园区路由
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
// 园区首页
const parkHome = resolve => require(['@/views/parkHall/home/index'],resolve);

// 园区搜索页面
const parkSearch = resolve => require(['@/views/parkHall/home/parkSearch'],resolve);
// 园区侧边栏公共路口
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);
// 园区预览
const scanIndex = resolve => require(['@/views/commonComponents/commonPreview/scanIndex'],resolve);

// 惠政服务
// 全部惠政
const allGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/all'],resolve);
// 我发布的惠政
const releaseGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/release'],resolve);
// 我申请的惠政
const applyGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/apply'],resolve);
// 我关注的惠政
const followGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/follow'],resolve);
// 政惠服务申请页
const goverApplication = resolve => require(['@/views/parkHall/goverBenefitService/goverApplication'],resolve);
// 惠政申报审核页
const goverReviewBm = resolve => require(['@/views/parkHall/goverBenefitService/goverReviewBm'],resolve);
// 惠政报名审核详情页
const goverBmAuditDetail = resolve => require(['@/views/parkHall/goverBenefitService/goverBmAuditDetail'],resolve);

// 惠政详情
const goverBeneDetail = resolve => require(['@/views/parkHall/goverBenefitService/goverBeneDetail'],resolve);
// 惠政报名
const goverEnrollForm = resolve => require(['@/views/parkHall/goverBenefitService/entryForm'],resolve);
// 发布慧政
const publishGover = resolve => require(['@/views/parkHall/goverBenefitService/publishGover'],resolve);
// 惠政草稿
const draftGover = resolve => require(['@/views/parkHall/goverBenefitService/draftGover'],resolve);


// 园区资讯

//园区资讯全部资讯
const allInfo = resolve => require(['@/views/parkHall/information/allInfo'],resolve);
//园区资讯我关注的资讯
const myFollowedInfo = resolve => require(['@/views/parkHall/information/myFollowedInfo'],resolve);
//园区资讯我发布的资讯
const myPublishedInfo = resolve => require(['@/views/parkHall/information/myPublishedInfo'],resolve);
//园区资讯发布新资讯
const publishNewInfo = resolve => require(['@/views/parkHall/information/publishNewInfo'],resolve);
//园区资讯草稿箱
const draftInfo =resolve => require(['@/views/parkHall/information/draftInfo'],resolve);
//园区资讯审核列表
const infoAuditing = resolve => require(['@/views/parkHall/information/auditing'],resolve);
//园区资讯审核详情
const infoAuditDetail = resolve => require(['@/views/parkHall/information/auditDetail'],resolve);
//资讯详情
const infoDetail = resolve => require(['@/views/parkHall/information/infoDetail'],resolve);


// 园区管理
// //园区管理 概览设置
const baseInfo= resolve => require(['@/views/parkHall/manage/baseInfo'],resolve);
//园区管理 概览设置 模板选择
const selectModule = resolve => require(['@/views/parkHall/manage/selectModule'],resolve);
// 园区通知公告
const noticeAndAD = resolve => require(['@/views/parkHall/manage/noticeAndAD'],resolve);
// 园区管理发布通知公告
const publishAD = resolve => require(['@/views/parkHall/manage/publishAD'],resolve);
// 通知公告详情
const noAndADDetail = resolve => require(['@/views/parkHall/manage/noAndADDetail'],resolve);
const auditSetting = resolve => require(['@/views/parkHall/manage/auditSetting'],resolve);
// 园区成員管理
const userManage = resolve => require(['@/views/commonComponents/commonManage/userManage'],resolve);
// 园区邀请函
const requestPage = resolve => require(['@/views/commonComponents/commonManage/requestPage'],resolve);
// 园区管理入园审核
const activityPoolAddPark =resolve => require(['@/views/parkHall/manage/activityPoolAddPark'],resolve);
// 园区管理资讯审核
const activityPoolZX = resolve => require(['@/views/parkHall/manage/activityPoolZX'],resolve);

// 园区管理活动设置
const activityPoolActivityAditing = resolve => require(['@/views/parkHall/manage/activityPoolActivityAditing'],resolve);
// 园区管理活动设置
const activityPoolActivityAuditing = resolve => require(['@/views/parkHall/manage/activityPoolActivityAditing'],resolve);
// 园区管理入驻申请表
const occupancyApplication = resolve => require(['@/views/commonComponents/commonManage/occupancyApplication'],resolve);
// 园区管理 咨询审核详情
const manageZXAuditing =  resolve => require(['@/views/parkHall/manage/manageZXAuditing'],resolve);
//园区管理 活动状态审核详情
const manageZXAuditingDetail = resolve => require(['@/views/parkHall/manage/manageZXAuditingDetail'],resolve);
//园区管理 惠政审核列表
const activityPoolGover =  resolve => require(['@/views/parkHall/manage/activityPoolGover'],resolve);
// //园区管理 活动状态审核详情
const manageGoverAuditing =  resolve => require(['@/views/parkHall/manage/manageGoverAuditing'],resolve);
// //园区管理 活动状态审核详情
const manageGoverAuditingDetail = resolve => require(['@/views/parkHall/manage/manageGoverAuditingDetail'],resolve);

//园区列表
const parkList =  resolve => require(['@/views/parkHall/home/parkList.vue'],resolve);
//iconfont demo
const iconfontDemo = resolve => require(['@/views/parkHall/parkTestDemo/iconfontDemo.vue'],resolve);

//招商管理模块
//我的招商
const myInvestment = resolve => require(['@/views/parkHall/attrForeInve/investmentManagement/myInvestment.vue'],resolve);
//储备招商
const reserveInvestment = resolve => require(['@/views/parkHall/attrForeInve/investmentManagement/reserveInvestment.vue'],resolve);
//在谈招商
const followupInvestment = resolve => require(['@/views/parkHall/attrForeInve/investmentManagement/followupInvestment.vue'],resolve);
//已成交招商
const finishedInvestment = resolve => require(['@/views/parkHall/attrForeInve/investmentManagement/finishedInvestment.vue'],resolve);
//搁置招商
const shelveInvestment = resolve => require(['@/views/parkHall/attrForeInve/investmentManagement/shelveInvestment.vue'],resolve);
//招商报备
const promotionInvest = resolve => require(['@/views/parkHall/attrForeInve/investmentManagement/promotionInvest.vue'],resolve);
// //惠政设置说明
const setInstruction = resolve => require(['@/views/parkHall/goverBenefitService/setInstruction'], resolve);
// 成果
const achievement =  resolve => require(['@/views/newparkHall/achievementsDisplay/index.vue'], resolve);// 成果展示
// 成果详情
const achievementDetail =  resolve => require(['@/views/newparkHall/achievementsDisplay/achievementDetail.vue'], resolve);// 成果详情页
// 专家列表
const expertList = resolve => require(['@/views/newparkHall/experteam/index.vue'], resolve);// 专家列表
// 专家详情
const expertDetail = resolve => require(['@/views/newparkHall/experteam/expertTeamDetail.vue'], resolve);// 专家详情
// 需求大厅
const needHall =  resolve => require(['@/views/parkHall/needHall/index.vue'], resolve);// 园区-需求大厅
// 普惠金融
const inclusiveFinance =  resolve => require(['@/views/parkHall/manage/inclusiveFinance'], resolve);// 普惠金融
// 入驻企业
const allEnterpriseList =  resolve => require(['@/views/parkHall/manage/allEnterpriseList'], resolve);// 入驻企业
// 需求大厅
const newIndex =  resolve => require(['@/views/parkHall/needHall/newIndex.vue'], resolve);// 园区-需求大厅
// 保定园区发布需求界面
const publishNeed =  resolve => require(['@/views/parkHall/needHall/publishNeed/index'], resolve);// 园区-需求大厅

const bannerSet= resolve => require(['@/views/commonComponents/commonManage/bannerSet'], resolve);

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
const policieAndRegulation = resolve => require(['@/views/newmanage/publishManage/sciAndTechPolicy/policieAndRegulation'], resolve);
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
//发布审核详情
const audit = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/audit'], resolve);

//发布审核历史详情
const auditDetail = resolve => require(['@/views/newmanage/auditManage/publishAudit/sciAndTechPolicyAudit/auditDetail'], resolve);
//资讯新闻审核列表
const newsNoticeAudit = resolve => require(['@/views/newmanage/auditManage/publishAudit/newsNoticeAudit/index.vue'], resolve);

//园区管理-需求管理
const needManage = resolve => require(['@/views/newmanage/needManage/needManage'], resolve);
//园区管理-需求管理详情
const needManageDetail = resolve => require(['@/views/newmanage/needManage/needManage/needManageDetail'], resolve);

export const parkRouter1 = {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children: [
        {
            path: '/parkHome',
            name: "park-home",
            component: parkHome,

        },
        {

            path: '/requestPage',
            name: "park-requestPage",
            component: requestPage,
        },
        {

            path: '/publishNeed',
            name: "park-publishNeed",
            component: publishNeed,
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
            path: '/needHall',
            name: "park-needHall",
            component: needHall,
        },
        // iconfont
        {
            path: '/parkTestDemo/iconfontDemo',
            name: 'park-iconfontDemo',
            component: iconfontDemo,

        },

        {
            path: '/parkIndex/achievement',
            name: "park-achievement",
            component: achievement,
        },
        {
            path: '/parkIndex/achievementDetail',
            name: "park-achievementDetail",
            component: achievementDetail,

        },
        {
            path: '/parkIndex/experteam',
            name: "park-experteam",
            component: expertList,

        },
        {
            path: '/parkIndex/expertDetail',
            name: "park-expertDetail",
            component: expertDetail,

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
            path: '/parkIndex/scanIndex',
            name: "park-scanIndex",
            component: scanIndex,

        },

        {
            path: '/parkIndex/goverBeneSer',
            name: "park-goverBeneSer",
            component: asideComRoot,
            redirect: '/parkIndex/goverBene/all',
            children: [
                {
                    path: '/parkIndex/goverBene/all',
                    name: 'park-allGoverBene',
                    component: allGoverBene,

                },
                {
                    path: '/parkIndex/goverBene/release',
                    name: 'park-releaseGoverBene',
                    component: releaseGoverBene,

                },
                {
                    path: '/parkIndex/goverBene/apply',
                    name: 'park-applyGoverBene',
                    component: applyGoverBene,

                },
                {
                    path: '/parkIndex/goverBene/follow',
                    name: 'park-followGoverBene',
                    component: followGoverBene,

                },
                {
                    path: '/parkIndex/goverBene/draft',
                    name: 'park-draftGover',
                    component: draftGover,
                },
                {
                    path: '/parkIndex/goverReviewBm',
                    name: "park-goverReviewBm",
                    component: goverReviewBm,

                }
            ]
        },
        {
            path: '/parkIndex/publishGover',
            name: "park-publishGover",
            component: publishGover,

        },
        {
            path: '/parkIndex/setInstruction',
            name: "park-setInstruction",
            component: setInstruction
        },
        {
            path: '/parkIndex/goverBeneDetail',
            name: 'park-goverBeneDetail',
            component: goverBeneDetail,

        },
        {
            path: '/parkIndex/goverEnrollForm',
            name: 'park-goverEnrollForm',
            component: goverEnrollForm,

        },
        {
            path: '/parkIndex/goverBmAuditDetail',
            name: 'park-goverBmAuditDetail',
            component: goverBmAuditDetail,

        },
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

                },

                {
                    path: '/parkIndex/parkInformation/draftInfo',
                    name: 'park-draftInfo',
                    component: draftInfo,

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

        },
        
        //园区管理
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
                    path: '/parkHall/manage/bannerSet',
                    name: "park-bannerSet",
                    component: bannerSet,

                },
                {
                    path: '/parkHall/manage/auditSetting',
                    name: "park-auditSetting",
                    component: auditSetting,

                },
                {
                    path: '/parkHall/manage/noticeAndAD',
                    name: "park-noticeAndAD",
                    component: noticeAndAD,

                },
                {
                    path: '/parkHall/manage/publishAD',
                    name: "park-publishAD",
                    component: publishAD,

                },
                {
                    path: '/parkHall/manage/userManage',
                    name: "park-userManage",
                    component: userManage,

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
                    path: '/parkHall/manage/activityPoolGover',
                    name: "park-activityPoolGover",
                    component: activityPoolGover,

                },
                {
                    path: '/parkHall/manage/manageGoverAuditing',
                    name: "park-manageGoverAuditing",
                    component: manageGoverAuditing,

                },
                {
                    path: '/parkHall/manage/manageGoverAuditingDetail',
                    name: "park-manageGoverAuditingDetail",
                    component: manageGoverAuditingDetail,

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
                    path: '/parkHall/manage/occupancyApplication',
                    name: "park-occupancyApplication",
                    component: occupancyApplication,

                },
                //需求管理
                {
                    path: "/parkHall/manage/needManage",
                    name: "park-needManage",
                    component: needManage

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
                //发布管理
                //科技政策
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
                //招商管理（新版）
                {
                    path: '/parkHall/manage/myInvestment',
                    name: "park-myInvestment",
                    component: myInvestment,
                    redirect: '/parkHall/manage/myInvestment/reserveInvestment',
                    children: [
                        {
                            path: '/parkHall/manage/myInvestment/reserveInvestment',
                            name: "park-reserveInvestment",
                            component: reserveInvestment
                        },
                        {
                            path: '/parkHall/manage/myInvestment/followupInvestment',
                            name: "park-followupInvestment",
                            component: followupInvestment
                        },
                        {
                            path: '/parkHall/manage/myInvestment/finishedInvestment',
                            name: "park-finishedInvestment",
                            component: finishedInvestment
                        },
                        {
                            path: '/parkHall/manage/myInvestment/shelveInvestment',
                            name: "park-shelveInvestment",
                            component: shelveInvestment
                        },

                    ]
                },
                {
                    path: '/parkHall/manage/myInvestment/promotionInvest.vue',
                    name: "park-promotionInvest",
                    component: promotionInvest
                },
                {
                    path: '/parkHall/manage/taskLose',
                    name: "park-taskLose",
                    component: resolve => require(['@/views/parkHall/attrForeInve/enterprise/businessManager/index'], resolve),

                },
            ]
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

        },
        {
            path: '/parkHall/manage/noAndADDetail',
            name: "park-noAndADDetail",
            component: noAndADDetail,

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
            path: '/parkHall/merchants/baseInfo',
            name: "park-merchantsBaseInfo",
            component: asideComRoot,
            redirect: '/parkHall/merchants/contractsManager',
            children: [
                {
                    path: '/parkHall/merchants/contractsManager',
                    name: "park-contractsManager",
                    component: resolve => require(['@/views/parkHall/attrForeInve/contractsManager/index'], resolve),

                },
                {
                    path: '/parkHall/merchants/parkInnovation',
                    name: "park-parkInnovation",
                    component: resolve => require(['@/views/parkHall/attrForeInve/parkInnovation/parkInnovation'], resolve),

                },
                {
                    path: '/parkHall/merchants/viewParkInnovation',
                    name: "park-view-innovation",
                    component: resolve => require(['@/views/parkHall/attrForeInve/parkInnovation/parkInnovation'], resolve),

                },
                {
                    path: '/parkHall/attrForeInve/departmentInvestment',
                    name: "park-departmentInvestment",
                    component: resolve => require(['@/views/parkHall/attrForeInve/departmentInvestment/index'], resolve),

                }
            ]
        },
        //招商详情
        {
            path: '/parkHall/attrForeInve/zhaoshangDetail',
            name: "park-zhaoshangDetail",
            component: resolve => require(['@/views/parkHall/attrForeInve/investmentManagement/zhaoshangDetail'], resolve),

        },
        {
            path: '/parkHall/merchants/parkIndex/goverBene/all',
            name: "park-processTracking",
            component: resolve => require(['@/views/parkHall/attrForeInve/processTracking/index'], resolve),

        },
        {
            path: '/parkHall/merchants/assetManag/projects',
            name: "park-fangChans",
            component: asideComRoot,
            redirect: '/parkHall/merchants/assetManag/projects',
            children: [
                {
                    path: '/parkHall/merchants/assetManag/projects',
                    name: "park-projects",
                    component: resolve => require(['@/views/parkHall/property/assetManag/projects'], resolve),

                }
            ]
        },
        {
            path: '/parkHall/merchants/assetManag/fangJian',
            name: "park-fangJian",
            component: resolve => require(['@/views/parkHall/property/assetManag/fangJian/index'], resolve),

        },
        {
            path: '/parkHall/merchants/assetManag/louDong',
            name: "park-louDong",
            component: resolve => require(['@/views/parkHall/property/assetManag/louDong/index'], resolve),

        }
    ]

};



