
// 路由名称: 园区路由
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
// 园区首页
const parkHome = resolve => require(['@/views/parkHall/home/index'],resolve);

// 园区搜索页面
const parkSearch = resolve => require(['@/views/parkHall/home/parkSearch'],resolve);
// 园区侧边栏公共路口
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);
// 园区预览
const scanIndex = resolve => require(['@/views/parkHall/preview/scanIndex'],resolve);
// 园区活动
// const parkActivety = resolve => require(['@/views/parkHall/activity/index'],resolve);
// 园区我报名的活动
const enrollActive = resolve => require(['@/views/parkHall/activity/enrollActive'],resolve);
// 园区全部的活动
const allActive = resolve => require(['@/views/parkHall/activity/allActive'],resolve);
// 园区我发起的活动
const launchActive = resolve => require(['@/views/parkHall/activity/launchActive'],resolve);
// 园区我审核的发布活动
const auditingActive = resolve => require(['@/views/parkHall/activity/auditing'],resolve);
// 园区我审核的报名活动

const auditingBmActive = resolve => require(['@/views/parkHall/activity/auditingBm'],resolve);

// 园区我关注的活动
const followActive = resolve => require(['@/views/parkHall/activity/followActive'],resolve);
// 园区活动详情
const activityDetail = resolve => require(['@/views/parkHall/activity/activityDetail'],resolve);
// 园区活动报名审核
// const activityAudit = resolve => require(['@/views/parkHall/activity/activityAudit'],resolve);

const activityBmAuditDetail = resolve => require(['@/views/parkHall/activity/activityBmAuditDetail'],resolve);
//活动草稿页
const draftActivity = resolve => require(['@/views/parkHall/activity/draftActivity'],resolve);

// 活动报名
const enrollForm = resolve => require(['@/views/parkHall/activity/enrollForm'],resolve);
// 活动发起
const launchForm = resolve => require(['@/views/parkHall/activity/launchForm'],resolve);
// 我发布的惠政

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
const parkManage = resolve => require(['@/views/parkHall/manage/index'],resolve);
// //园区管理 概览设置
// const baseInfo = resolve => require(['@/views/parkHall/manage/baseInfo'],resolve);
// //园区管理 概览设置 模板选择
// const selectModule = resolve => require(['@/views/parkHall/manage/selectModule'],resolve);
// //园区管理 概览设置 模板1
// const scanModelOne = resolve => require(['@/views/parkHall/manage/scanModelOne'],resolve);
// //园区管理 概览设置 模板2
// const scanModelTwo = resolve => require(['@/views/parkHall/manage/scanModelTwo'],resolve);
//园区管理 申请入驻园区
const requestAddPark = resolve => require(['@/views/parkHall/manage/requestAddPark'],resolve);
// 园区通知公告
const noticeAndAD = resolve => require(['@/views/parkHall/manage/noticeAndAD'],resolve);
// 园区管理发布通知公告
const publishAD = resolve => require(['@/views/parkHall/manage/publishAD'],resolve);
// 通知公告详情
const noAndADDetail = resolve => require(['@/views/parkHall/manage/noAndADDetail'],resolve);
const auditSetting = resolve => require(['@/views/parkHall/manage/auditSetting'],resolve);
// 园区成員管理
const userManage = resolve => require(['@/views/parkHall/manage/userManage'],resolve);
// 园区管理入园审核
const activityPoolAddPark =resolve => require(['@/views/parkHall/manage/activityPoolAddPark'],resolve);
// 园区管理资讯审核
const activityPoolZX = resolve => require(['@/views/parkHall/manage/activityPoolZX'],resolve);
// 园区管理活动设置
const activityPoolActivityAditing = resolve => require(['@/views/parkHall/manage/activityPoolActivityAditing'],resolve);
// 园区管理入驻申请表
// const occupancyApplication = resolve => require(['@/views/parkHall/manage/occupancyApplication'],resolve);
// 园区管理 成员管理 邀请入园
// const sendRequest = resolve => require(['@/views/parkHall/manage/sendRequest'],resolve);
// 园区管理 成员管理 智能推荐
// const IntelligentInvestment = resolve => require(['@/views/parkHall/manage/IntelligentInvestment'],resolve);
// 园区管理 成员管理 邀请企业加入园区
// const requestEnterprice =  resolve => require(['@/views/parkHall/manage/requestEnterprice'],resolve);
// 园区管理 入园审核详情
const manageAuditing =  resolve => require(['@/views/parkHall/manage/manageAuditing'],resolve);
// 园区管理 咨询审核详情
const manageZXAuditing =  resolve => require(['@/views/parkHall/manage/manageZXAuditing'],resolve);
// 园区管理 活动审核详情
const manageActivityAudit =  resolve => require(['@/views/parkHall/manage/manageActivityAudit'],resolve);
//活动管理 --企业审核活动详情 xhj
const activityAuditDetail = resolve => require(['@/views/parkHall/activity/activityAuditDetail'],resolve);
//园区管理 入园状态审核详情
const manageParkAuditDetail =  resolve => require(['@/views/parkHall/manage/manageParkAuditDetail'],resolve);
//园区管理 活动状态审核详情
const manageActivityAuditDetail =  resolve => require(['@/views/parkHall/manage/manageActivityAuditDetail'],resolve);
//园区管理 活动状态审核详情
const manageZXAuditingDetail = resolve => require(['@/views/parkHall/manage/manageZXAuditingDetail'],resolve);
//园区管理 惠政审核列表
const activityPoolGover =  resolve => require(['@/views/parkHall/manage/activityPoolGover'],resolve);
//园区管理 活动状态审核详情
const manageGoverAuditing =  resolve => require(['@/views/parkHall/manage/manageGoverAuditing'],resolve);
//园区管理 活动状态审核详情
const manageGoverAuditingDetail = resolve => require(['@/views/parkHall/manage/manageGoverAuditingDetail'],resolve);


//园区管理 快捷菜单
const quickMenu = resolve => require(['@/views/parkHall/manage/firstPageSet/quickMenu.vue'],resolve);
//园区管理 模板设置
const modulesSet = resolve => require(['@/views/parkHall/manage/firstPageSet/modulesSet.vue'],resolve);

//邀请函
const requestPage =  resolve => require(['@/views/parkHall/manage/requestPage.vue'],resolve);
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
//惠政设置说明
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
// 需求大厅
const newIndex =  resolve => require(['@/views/parkHall/needHall/newIndex.vue'], resolve);// 园区-需求大厅

//新的管理模块
//园区管理 banner设置
// const bannerSet = resolve => require(['@/views/parkHall/manage/firstPageSet/bannerSet.vue'],resolve);
// const achievementSet = resolve => require(['@/views/newmanage/platformSetup/resultManage'], resolve);// 新园区-成果管理
// const experteamSet = resolve => require(['@/views/newmanage/experteamSet'], resolve);// 新园区-专家团队管理
// const sciGraphicaSet = resolve => require(['@/views/newmanage/sciGraphicaSet'], resolve);// 新园区-数据管理
// const technologyPolicySet = resolve => require(['@/views/newmanage/technologyPolicySet'], resolve);// 新园区-科技政策
// const activeSet = resolve => require(['@/views/newmanage/activeSet'], resolve);// 新园区-平台活动

// const releaseAuditSet = resolve => require(['@/views/newmanage/releaseAuditSet'], resolve);// 新园区-发布审核
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
            path: '/requestPage',
            name: 'park-requestPage',
            component: requestPage
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
            path: '/parkIndex/park',
            name: "park-active",
            component: asideComRoot,
            redirect: '/parkIndex/park/all',
            children: [
                {
                    path: '/parkIndex/park/all',
                    name: 'park-allActive',
                    component: allActive,
                    
                },
                {
                    path: '/parkIndex/park/enroll',
                    name: 'park-enrollActive',
                    component: enrollActive,
                    
                },
                {
                    path: '/parkIndex/park/launch',
                    name: 'park-launchActive',
                    component: launchActive,
                    
                },
                {
                    path: '/parkIndex/park/follow',
                    name: 'park-followActive',
                    component: followActive,
                    
                },
                {
                    path: '/parkIndex/park/auditing',
                    name: 'park-auditingActive',
                    component: auditingActive,
                    
                },
                {

                    path: '/parkIndex/park/draft',
                    name: 'park-draftActivity',
                    component: draftActivity,
                    
                },
                {
                    path: '/parkIndex/park/auditingBm',
                    name: 'park-auditingBmActive',
                    component: auditingBmActive,
                    
                }

            ]
        },
        {
            path: '/parkIndex/activityDetail',
            name: "park-activityDetail",
            component: activityDetail
        },
        {
            path: '/parkIndex/activityBmAuditDetail',
            name: "park-activityBmAuditDetail",
            component: activityBmAuditDetail,
           
        },
        {
            path: '/parkIndex/enrollForm',
            name: "park-enrollForm",
            component: enrollForm,
            
        },
        {
            path: '/parkIndex/launchForm',
            name: "park-launchForm",
            component: launchForm,
           
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
        // {
        //     path: '/parkHall/manage/baseInfo',
        //     name: "park-manage",
        //     component: asideComRoot,
        //     redirect: '/parkHall/manage/baseInfo',
        //     children: [
        //         {
        //             path: '/parkHall/manage/baseInfo',
        //             name: "park-baseInfo",
        //             component: baseInfo,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/selectModule',
        //             name: "park-selectModule",
        //             component: selectModule,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/auditSetting',
        //             name: "park-auditSetting",
        //             component: auditSetting,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/noticeAndAD',
        //             name: "park-noticeAndAD",
        //             component: noticeAndAD,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/publishAD',
        //             name: "park-publishAD",
        //             component: publishAD,
                   
        //         },
        //         {
        //             path: '/parkHall/manage/userManage',
        //             name: "park-userManage",
        //             component: userManage,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/activityPoolAddPark',
        //             name: "park-activityPoolAddPark",
        //             component: activityPoolAddPark,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/activityPoolZX',
        //             name: "park-activityPoolZX",
        //             component: activityPoolZX,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/activityPoolGover',
        //             name: "park-activityPoolGover",
        //             component: activityPoolGover,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/manageGoverAuditing',
        //             name: "park-manageGoverAuditing",
        //             component: manageGoverAuditing,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/manageGoverAuditingDetail',
        //             name: "park-manageGoverAuditingDetail",
        //             component: manageGoverAuditingDetail,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/activityPoolActivityAditing',
        //             name: "park-activityPoolActivityAditing",
        //             component: activityPoolActivityAditing,
                    
        //         },
        //         {
        //             path: '/parkHall/manage/occupancyApplication',
        //             name: "park-occupancyApplication",
        //             component: occupancyApplication,
                  
        //         },
        //         //招商管理（新版）
        //         {
        //             path: '/parkHall/manage/myInvestment',
        //             name: "park-myInvestment",
        //             component: myInvestment,
        //             redirect: '/parkHall/manage/myInvestment/reserveInvestment',
        //             children: [
        //                 {
        //                     path: '/parkHall/manage/myInvestment/reserveInvestment',
        //                     name: "park-reserveInvestment",
        //                     component: reserveInvestment
        //                 },
        //                 {
        //                     path: '/parkHall/manage/myInvestment/followupInvestment',
        //                     name: "park-followupInvestment",
        //                     component: followupInvestment
        //                 },
        //                 {
        //                     path: '/parkHall/manage/myInvestment/finishedInvestment',
        //                     name: "park-finishedInvestment",
        //                     component: finishedInvestment
        //                 },
        //                 {
        //                     path: '/parkHall/manage/myInvestment/shelveInvestment',
        //                     name: "park-shelveInvestment",
        //                     component: shelveInvestment
        //                 },

        //             ]
        //         },
        //         {
        //             path: '/parkHall/manage/myInvestment/promotionInvest.vue',
        //             name: "park-promotionInvest",
        //             component: promotionInvest
        //         },
        //         {
        //             path: '/parkHall/manage/taskLose',
        //             name: "park-taskLose",
        //             component: resolve => require(['@/views/parkHall/attrForeInve/enterprise/businessManager/index'], resolve),
                    
        //         },
        //     ]
        // },

        {
            path: '/parkHall/manage/noAndADDetail',
            name: "park-noAndADDetail",
            component: noAndADDetail,
            
        },
        // {
        //     path: '/parkHall/manage/scanModelTwo',
        //     name: "park-scanModelTwo",
        //     component: scanModelTwo,
            
        // },
        // {
        //     path: '/parkHall/manage/sendRequest',
        //     name: "park-sendRequest",
        //     component: sendRequest,
            
        // },
        // {
        //     path: '/parkHall/manage/IntelligentInvestment',
        //     name: "park-IntelligentInvestment",
        //     component: IntelligentInvestment,
            
        // },
        // {
        //     path: '/parkHall/manage/requestEnterprice',
        //     name: "park-requestEnterprice",
        //     component: requestEnterprice,
            
        // },
        {
            path: '/parkHall/manage/manageAuditing',
            name: "park-manageAuditing",
            component: manageAuditing,
            
        },
        {
            path: '/parkHall/manage/manageZXAuditing',
            name: "park-manageZXAuditing",
            component: manageZXAuditing,
            
        },
        {
            path: '/parkHall/manage/manageActivityAudit',
            name: "park-manageActivityAudit",
            component: manageActivityAudit,
            
        },
        {
            path: '/parkHall/activity/activityAuditDetail',
            name: "park-activityAuditDetail",
            component: activityAuditDetail,
            
        },
        // {
        //     path: '/parkHall/manage/scanModelOne',
        //     name: "park-scanModelOne",
        //     component: scanModelOne,
            
        // },
        {
            path: '/parkHall/manage/requestAddPark',
            name: "park-requestAddPark",
            component: requestAddPark,
            
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
                    
                },

                
                // {
                //     path: '/parkHall/manage/bannerSet',
                //     name: "park-bannerSet",
                //     component: bannerSet,
                   
                // },
                // {
                //     path: '/parkHall/manage/achievementSet',
                //     name: "park-achievementSet",
                //     component: achievementSet,
                   
                // },
                // {
                //     path: '/parkHall/manage/experteamSet',
                //     name: "park-experteamSet",
                //     component: experteamSet,
                   
                // },
                // {
                //     path: '/parkHall/manage/sciGraphicaSet',
                //     name: "park-sciGraphicaSet",
                //     component: sciGraphicaSet,
                   
                // },
                // {
                //     path: '/parkHall/manage/activeSet',
                //     name: "park-activeSet",
                //     component: activeSet,
                   
                // },
                // {
                //     path: '/parkHall/manage/releaseAuditSet',
                //     name: "park-releaseAuditSet",
                //     component: releaseAuditSet,
                   
                // },
                // {
                //     path: '/parkHall/manage/technologyPolicySet',
                //     name: "park-technologyPolicySet",
                //     component: technologyPolicySet,
                   
                // },
               
                {
                    path: '/parkHall/manage/modulesSet',
                    name: "park-modulesSet",
                    component: modulesSet,
                   
                },
                {
                    path: '/parkHall/manage/quickMenu',
                    name: "park-quickMenu",
                    component: quickMenu,
                    
                },

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



