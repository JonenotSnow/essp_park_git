//园区新闻公告模块的接口文件
export const newsinfo = {
    saveNews:"/information/saveNews",//新增新闻接口
    getAllInformation:"/information/getAllInformation",//获取全部新闻
    getInfoById:"/information/getInfoById",//获取新闻详情
    getMyPubInfo:"/information/getMyPubInfo",//已发布，草稿箱,已审核
    followInfo: "/information/getMyFollowInfo",//我关注的新闻列表
}