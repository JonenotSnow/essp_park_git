/*
 * @Author: Evanlian
 * @Date: 20181204 08:50:37
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-03 17:38:12
 * @Description: 新闻公告模块核心文件，请统一风格，谢谢！！！
 */
// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'], resolve);

// 办事大厅模块入口
const officeHall = resolve => require(['@/views/newparkHall/officeHall'], resolve);

// 科技计划项目申报---页面
const sciAndTechProDeclaration = resolve => require(['@/views/newparkHall/officeHall/sciAndTechProDeclaration'], resolve);

// 技术合同登记---页面
const techContractRegistration = resolve => require(['@/views/newparkHall/officeHall/techContractRegistration'], resolve);

// 审批认定---页面
const examAndApprovalIdentified = resolve => require(['@/views/newparkHall/officeHall/examAndApprovalIdentified'], resolve);

// 知识产权申报---页面
const intellectualPropertyDeclaration = resolve => require(['@/views/newparkHall/officeHall/intellectualPropertyDeclaration'], resolve);

// 创新劵管理---页面
const innovativeSecuritiesManagement = resolve => require(['@/views/newparkHall/officeHall/innovativeSecuritiesManagement'], resolve);

// 创新创业大赛---页面
const innoAndEntreCompetition = resolve => require(['@/views/newparkHall/officeHall/innoAndEntreCompetition'], resolve);

// 高新科技企业统计管理系统---页面
const sohtEnterprisesManagementSystem = resolve => require(['@/views/newparkHall/officeHall/sohtEnterprisesManagementSystem'], resolve);


export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children: [
        {
            path: "/officeHall",
            name: "park-officeHall",
            component: officeHall,
            // redirect: '/officeHall/sciAndTechProDeclaration',
            children: [
                {
                    path: "/officeHall/sciAndTechProDeclaration",    // 科技计划项目申报
                    name: "park-sciAndTechProDeclaration",
                    component: sciAndTechProDeclaration
                },
                {
                    path: "/officeHall/techContractRegistration",    // 技术合同登记
                    name: "park-techContractRegistration",
                    component: techContractRegistration
                },
                {
                    path: "/officeHall/examAndApprovalIdentified",    // 审批认定
                    name: "park-examAndApprovalIdentified",
                    component: examAndApprovalIdentified
                },
                {
                    path: "/officeHall/intellectualPropertyDeclaration",    // 知识产权申报
                    name: "park-intellectualPropertyDeclaration",
                    component: intellectualPropertyDeclaration
                },
                {
                    path: "/officeHall/innovativeSecuritiesManagement",    // 创新劵管理
                    name: "park-innovativeSecuritiesManagement",
                    component: innovativeSecuritiesManagement
                },
                {
                    path: "/officeHall/innoAndEntreCompetition",    // 创新创业大赛
                    name: "park-innoAndEntreCompetition",
                    component: innoAndEntreCompetition
                },
                {
                    path: "/officeHall/sohtEnterprisesManagementSystem",    // 高新科技企业统计管理系统
                    name: "park-sohtEnterprisesManagementSystem",
                    component: sohtEnterprisesManagementSystem
                }
            ]
        }
    ]
};
