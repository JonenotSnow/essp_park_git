/***********************科技政策路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/pages/index.vue'],resolve);
const asideComRoot = resolve => require(['@/pages/asideComRoot/index'],resolve);

/**
 * 政策法规相关路由
 * @returns {Promise<T | never>}
 */
const policieAndRegulatio = () => import ('@/pages/bd/sciAndTech/policieAndRegulation/policieAndRegulation/index').then(m => m.default)

/**
 * 科技服务相关路由
 * @returns {Promise<T | never>}
 */
const technInnoCertificate = () => import ('@/pages/bd/sciAndTech/sciAndTechService/technInnoCertificate/index').then(m => m.default)
const techContractRegistration = () => import ('@/pages/bd/sciAndTech/sciAndTechService/techContractRegistration/index').then(m => m.default)
const seniorEnterpriseIdentify = () => import ('@/pages/bd/sciAndTech/sciAndTechService/seniorEnterpriseIdentify/index').then(m => m.default)
const familyJuniorIdentify = () => import ('@/pages/bd/sciAndTech/sciAndTechService/familyJuniorIdentify/index').then(m => m.default)
const intellectualProperty = () => import ('@/pages/bd/sciAndTech/sciAndTechService/intellectualProperty/index').then(m => m.default)
const technologyServiceOrganization = () => import ('@/pages/bd/sciAndTech/sciAndTechService/technologyServiceOrganization/index').then(m => m.default)
const riskInvestment = () => import ('@/pages/bd/sciAndTech/sciAndTechService/riskInvestment/index').then(m => m.default)
const angelInvestment = () => import ('@/pages/bd/sciAndTech/sciAndTechService/angelInvestment/index').then(m => m.default)

/**
 * 详情页面
 */
const detail = () => import ('@/pages/bd/sciAndTech/detail.vue').then(m => m.default)

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
                    name: "park-techContractRegistrationSci",
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