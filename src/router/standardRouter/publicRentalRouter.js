
/* 
    公开招租路由
*/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/pages/index'],resolve);

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        // {
        //     path: '/parkHall/manage/baseInfo',
        //     name: "park-manage",
        //     component: asideComRoot,
        //     redirect: '/parkHall/manage/baseInfo',
        //     children: [
        //         {
        //             path: "/parkHall/manage/baseInfo",
        //             name: "park-baseInfo",
        //             component: baseInfo
        //         }
        //     ]
        // }
   ]
 };