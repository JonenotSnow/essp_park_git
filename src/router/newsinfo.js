/*
 * @Author: Evanlian
 * @Date: 20181204 08:50:37
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-07 12:26:21
 * @Description: 新闻公告模块核心文件，请统一风格，谢谢！！！
 */
// 园区侧边栏公共路口
const parkIndex = resolve => require(['@/views/parkHall/index'],resolve);
const asideComRoot = resolve => require(['@/views/parkHall/asideComRoot/index'],resolve);
const newsInfoSet = resolve => require(['@/views/newmanage/publishManage/newsInfoSet'], resolve);// 新园区-资讯公告管理
const publicNews = resolve => require(['@/views/newmanage/publishManage/newsInfoSet/publicNews'], resolve);// 新园区-新闻管理页
const publicNotice = resolve => require(['@/views/newmanage/publishManage/newsInfoSet/publicNotice'], resolve);// 新园区-新闻管理页
const newsIndex = resolve => require(['@/views/newparkHall/News/index'],resolve);//新闻公告模块首页
const alllistnews = resolve => require(['@/views/newparkHall/News/allNews/alllistnews'],resolve);//全部新闻
const myfcsnews = resolve => require(['@/views/newparkHall/News/allNews/myfcsnews'],resolve);//我关注的新闻
const allnotice = resolve => require(['@/views/newparkHall/News/notice/allnotice'],resolve);//全部通告
const newsdetail = resolve => require(['@/views/newparkHall/News/allNews/newsdetail'],resolve);//新闻详情页
const noticedetail = resolve => require(['@/views/newparkHall/News/notice/noticedetail'],resolve);//通知公告详情页
export default {
    path: '/',
    name: "parkHome",
    component: parkIndex,
    redirect: '/parkHome',
    children:[
       {
        path: "/newsinfo",
        name: "park-newsinfo",
        component: asideComRoot,
        redirect: '/news/alllistnews',
        children: [
             {
                path: "/news/alllistnews",
                name: "park-alllistnews",
                component: alllistnews
             },
             {
                path: "/news/myfcsnews",
                name: "park-myfcsnews",
                component: myfcsnews
             },
             {
                 path: "/news/notice",
                 name: "park-allnotice",
                 component: allnotice
             },
             {
               path: '/parkHall/manage/newsInfoSet',
               name: "park-newsInfoSet",
               component: newsInfoSet,
               redirect: "/parkHall/manage/publicNews",
               children:[
                  {
                  path: '/parkHall/manage/publicNews',
                  name: "park-publicNews",
                  component: publicNews
                  },
                  {
                     path: '/parkHall/manage/publicNotice',
                     name: "park-publicNotice",
                     component: publicNotice
                  }
               ]    
            },
         ]
      },
      {
         path: "/news/newsdetail",
         name: "park-newsdetail",
         component: newsdetail,
      },{
      
         path: "/news/noticedetail",
         name: "park-noticedetail",
         component: noticedetail,
          
       
      }
   ]
 };