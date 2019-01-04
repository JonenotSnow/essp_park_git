export const active = {
    addActivity:"/activity/addActivity",//发布活动接口
    delActivity:"/activity/delActivity",//删除活动
    actDraftList:"/activity/getDraftsActivity",//获取活动草稿列表
    actEdit:"/activity/getByActivityId",    //获取活动详情，或者通过草稿箱进入编辑活动界面
    actAll:"/activity/getAllActivity",  //全部活动
    actFollow:"/activity/getMyAttentionActivity",//我关注的活动
    actEnroll:"/activity/getMyEnterActivity",//我报名的活动
    actLanch:"/activity/getMyInitiateActivity",//我发起的活动
    getByKeyId:"/enterinfo/getByKeyId",//活动报名详情
    auditOption:'/enterinfo/auditOption', // 报名审核通过或者不通过  02 通过  03 拒绝
    cancelOption: '/enterinfo/cancelOption',// 报名审核取消
    actupLoadImg:"/activity/upLoadImg",     //上传海报接口
    auditList:"/activity/auditList",        //企业发布活动审核列表
    enterinforList:"/enterinfo/auditList",//企业报名活动审核列表
    activityAudit:"/activity/activityAudit",//企业审核操作
    actupLoadImg:"/activity/upLoadImg",//上传海报接口
    addEnterinfo: "/enterinfo/addEnterinfo",  // 添加报名活动
    addAttention: "/attention/addAttention",//关注
    removeAttention: "/attention/removeAttention",//取消关注
    activeDetail: '/activity/getByActivityId',   //活动详情
    getEnterSum:'/enterinfo/getEnterSum',    // 获取报名情况
    getHotActivity:'/parkIndex/getdataList',  // 获取热门活动
    download:'/enterinfo/download',  // 下载模板
    importData:'/enterinfo/importData',  // 上传模板
    getLogo:'/store/index'//获取企业的logo
}
