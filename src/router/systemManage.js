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

//园区管理-发布成果
const publishAchievement = resolve => require(['@/views/newmanage/achievementSet/publishAchievement'], resolve);

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
    ]
};
