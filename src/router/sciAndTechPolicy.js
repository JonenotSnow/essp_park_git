/*
 * @Author: Evanlian
 * @Date: 20181204 08:50:37
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-03 10:10:39
 * @Description: 科技政策模块核心文件，请统一风格，谢谢！！！
 */
// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'], resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'], resolve);

// 科技政策模块首页
const sciAndTechPolicyIndex = () => import ('@/views/newparkHall/sciAndTechPolicy/index').then(m => m.default)


/**
 * 政策法规相关路由
 * @returns {Promise<T | never>}
 */
const policieAndRegulatio = () => import ('@/views/newparkHall/sciAndTechPolicy/policieAndRegulation/policieAndRegulation/index').then(m => m.default)


/**
 * 科技服务相关路由
 * @returns {Promise<T | never>}
 */
const sciAndTechService = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/index').then(m => m.default)
const technInnoCertificate = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/technInnoCertificate/index').then(m => m.default)
const techContractRegistration = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/techContractRegistration/index').then(m => m.default)
const seniorEnterpriseIdentify = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/seniorEnterpriseIdentify/index').then(m => m.default)
const familyJuniorIdentify = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/familyJuniorIdentify/index').then(m => m.default)
const intellectualProperty = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/intellectualProperty/index').then(m => m.default)
const technologyServiceOrganization = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/technologyServiceOrganization/index').then(m => m.default)
const riskInvestment = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/riskInvestment/index').then(m => m.default)
const angelInvestment = () => import ('@/views/newparkHall/sciAndTechPolicy/sciAndTechService/angelInvestment/index').then(m => m.default)

/**
 * 详情页面
 */
const detail = () => import ('@/views/newparkHall/sciAndTechPolicy/detail.vue').then(m => m.default)


export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children: [
        {
            path: "/sciIndex",
            name: "park-sciAndTechPolicyIndex",
            component: asideComRoot,
            redirect: '/sciIndex/policieAndRegulation/policieAndRegulatio',
            children: [
                /**
                 * 政策法规---路由开始
                 */
                {
                    path: "/sciIndex/policieAndRegulation/policieAndRegulatio",    // 政策法规
                    name: "park-policieAndRegulatio",
                    component: policieAndRegulatio
                },
                /**
                 * 政策法规---路由结束
                 */

                /**
                 * 科技服务---路由开始
                 */
                {
                    path: "/sciIndex/sciAndTechService/technInnoCertificate",   // 科技创新券
                    name: "park-technInnoCertificate",
                    component: technInnoCertificate,
                },
                {
                    path: "/sciIndex/sciAndTechService/techContractRegistration",   // 技术合同登记
                    name: "park-techContractRegistration",
                    component: techContractRegistration,
                },
                {
                    path: "/sciIndex/sciAndTechService/seniorEnterpriseIdentify",   // 高企认定
                    name: "park-seniorEnterpriseIdentify",
                    component: seniorEnterpriseIdentify,
                },
                {
                    path: "/sciIndex/sciAndTechService/familyJuniorIdentify",   // 科小认定
                    name: "park-familyJuniorIdentify",
                    component: familyJuniorIdentify,
                },
                {
                    path: "/sciIndex/sciAndTechService/intellectualProperty",   // 知识产权
                    name: "park-intellectualProperty",
                    component: intellectualProperty,
                },
                {
                    path: "/sciIndex/sciAndTechService/technologyServiceOrganization",   // 科技服务机构
                    name: "park-technologyServiceOrganization",
                    component: technologyServiceOrganization,
                },
                {
                    path: "/sciIndex/sciAndTechService/riskInvestment",   // 风险投资
                    name: "park-riskInvestment",
                    component: riskInvestment,
                },
                {
                    path: "/sciIndex/sciAndTechService/angelInvestment",   // 天使投资
                    name: "park-angelInvestment",
                    component: angelInvestment,
                }
                /**
                 * 科技服务---路由结束
                 */
            ]
        },
        {
            path: "/sciIndex/sciAndTechPolicyDetail",
            name: "park-sciAndTechPolicyDetail",
            component: detail,
        }
    ]
};
