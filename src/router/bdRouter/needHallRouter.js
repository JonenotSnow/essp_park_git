/***********************需求大厅路由***************************/

// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);

// 需求大厅
const needHall =  resolve => require(['@/views/parkHall/needHall/index.vue'], resolve);// 园区-需求大厅
// 保定园区发布需求界面
const publishNeed =  resolve => require(['@/views/parkHall/needHall/publishNeed/index'], resolve);// 园区-需求大厅

export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
        {
            path: '/needHall',
            name: "park-needHall",
            component: needHall,
        },
        {

            path: '/publishNeed',
            name: "park-publishNeed",
            component: publishNeed,
        }
   ]
 };