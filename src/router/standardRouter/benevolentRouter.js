
/* 
    园区惠政路由
*/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);

/**********菜单路由放置区***********/

// 全部惠证
const allGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/all'],resolve);
// 我发布的惠政
const releaseGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/release'],resolve);
// 我申请的惠政
const applyGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/apply'],resolve);
// 我关注的惠政
const followGoverBene = resolve => require(['@/views/parkHall/goverBenefitService/follow'],resolve);

/**********全页面路由放置区***********/

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
//惠政设置说明
const setInstruction = resolve => require(['@/views/parkHall/goverBenefitService/setInstruction'], resolve);


export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
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
        }
    ]
 };