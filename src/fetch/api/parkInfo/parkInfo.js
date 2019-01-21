//园区资讯模块的接口文件
export const parkInfo = {
    allInfos: "/information/getAllInformation",//全部资讯
    lanchInfo: "/information/getMyPubInfo",//我发布的资讯列表0是草稿 1是发起列表
    addfollowInfo: "/information/addMyFocus",//我关注的资讯
    addInfo: "/information/saveInformation",//发布资讯
    delInfoes: "/information/delBatchInfo",//删除资讯草稿（批量和单条删除）
    followInfo: "/information/getMyFollowInfo",//我关注的资讯列表
    focusInfo: "/information/getApprovalList",//我关注的资讯
    auditDetail: "/information/approvalInfo",//发布资讯通过不通过
    infoById: "/information/getInfoById",//根据资讯id获取资讯详情
    updInfo: "/information/updInformallPolicyation",//草稿箱获取资讯详情
    addMyFocus: "/information/addMyFocus",//添加关注资讯
    delMyFocus: "/information/cancelFollInfo",//取消关注资讯
    hotListInfo: "/parkIndex/getdataList",//0:活动1:惠政:2:资讯
    getListTags: "/information/getTagUsg",//获取列表标签
    addComment: "/comment/addComment",//添加评论
    getComment: "/comment/getComments",//获取评论
    addReply: "/comment/addReply",//新增回复
    getReplys: "/comment/getReplys",//获取回复
    delComment: '/comment/delComment',  //删除评论
    delReply: '/comment/delReply'  //删除回复
}
