/*
 * @Author: Evanlian
 * @Date: 20181204 08:50:37
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-03 10:10:39
 * @Description: 系统模块核心文件，请统一风格，谢谢！！！
 */
// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'], resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'], resolve);

//园区管理-关于我们
//园区信息设置
const baseInfo = resolve => require(['@/views/newmanage/platformSetup/aboutWe/baseInfo'], resolve);
//模板选择
const selectModule = resolve => require(['@/views/newmanage/platformSetup/aboutWe/selectModule'], resolve);
//模板一
const scanModelOne = resolve => require(['@/views/newmanage/platformSetup/aboutWe/scanModelOne'], resolve);
//模板二
const scanModelTwo = resolve => require(['@/views/newmanage/platformSetup/aboutWe/scanModelTwo'], resolve);
//入驻申请表
const occupancyApplication = resolve => require(['@/views/newmanage/platformSetup/addParkRequestForm/occupancyApplication'], resolve);
//banner设置
const bannerSet = resolve => require(['@/views/newmanage/platformSetup/bannerSet/bannerSet'], resolve);
//数据管理
const dataManage = resolve => require(['@/views/newmanage/platformSetup/dataManage/dataManage'], resolve);
//发布成果
const publishAchievement = resolve => require(['@/views/newmanage/platformSetup/resultManage/publishAchievement'], resolve);

//园区管理-成员管理
//成员管理
const userManage = resolve => require(['@/views/newmanage/userManage/userManage/userManage'], resolve);
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
            path: "/parkHall/manage/baseInfo",
            name: "park-park-manage",
            component: asideComRoot,
            redirect: '/parkHall/manage/baseInfo',
            children: [
                //平台设置
                {
                    path: "/parkHall/manage/baseInfo",
                    name: "park-baseInfo",
                    component: baseInfo
                },
                {
                    path: "/parkHall/manage/selectModule",
                    name: "park-selectModule",
                    component: selectModule
                },
                {
                    path: "/parkHall/manage/occupancyApplication",
                    name: "park-occupancyApplication",
                    component: occupancyApplication
                },
                {
                    path: "/parkHall/manage/bannerSet",
                    name: "park-bannerSet",
                    component: bannerSet
                },
                {
                    path: "/parkHall/manage/dataManage",
                    name: "park-dataManage",
                    component: dataManage
                },
                //成员管理
                {
                    path: "/parkHall/manage/userManage",
                    name: "park-userManage",
                    component: userManage
                },
            ]
        }
    ]
};
