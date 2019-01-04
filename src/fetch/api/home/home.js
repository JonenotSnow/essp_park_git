export const home = {
    homeInfo: '/parkIndex/getdataList', // 首页信息
    getParkList:'/parkManage/getParkList',
    // getSliders: '/homePage/pcBannerUrlList', // -获取首页轮播图
    getNums: "/requirement/indexTypeTotal", // -获取用户数，已完成撮合数，已发布需求数
    getHotRqm: "/requirement/hotRqm", // -获取最新需求
    getHotRecord:'/rcd/searchHotRecord',//获取热搜关键字
    getVideo:"http://128.196.235.131:8080/", //获取视频路径
    getSliders: '/advManage/advShows', // -获取首页轮播图
	getLoginUserRole: '/common/getLoginUserRole', //进入园区定位角色
    selectResMenu: '/userPostWeb/selectResMenu', //进入园区定位角色
    /* 新增新版园区的接口（专家，成果） */
    getExpertInfo:'/expert/getExpertInfo',// 获取专家列表
    saveExpert:"/expert/saveExpert",//增加专家
    delExpert:"/expert/delExpert",//删除专家
    getExpertById:'/expert/getExpertById',// 获取专家详情
    getAchievement:'/achiev/getAllAchiev',// 获取全部成果列表
    getAchievByKey:'/achiev/getAchievByKey',// 获取成果详情
    saveAchiev:"/achiev/saveAchiev",//新增成果
    delAchievByKey:"/achiev/delAchievByKey"//删除成果
}