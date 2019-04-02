export const manage = {
    getCount: '/task/getCount', // 任务池待审核数量
    getAuditList: '/audit/getAuditList', // 任务池待审核列表 惠政04
    getLastApplyPark:"/memberManage/getLastApplyPark", //获取园区任务池通知
    auditApplyPark: '/audit/applyPark  ', // 入园审核详情
    auditInformation: '/audit/infomation', // 资讯审核详情
    auditActivity: '/audit/activity  ', // 活动审核详情
    auditPolicy: '/audit/policy  ', // 惠政审核详情


    getMemInfo: '/memberManage/getMemInfo', // 查询成员列表
    delPark: '/memberManage/delMemInfo', // 移除园区

    downLoad: '/excel/downLoad', // 下载模板
    exceclImport:'/excel/excelImport',

    updatePark: '/parkManage/updatePark', // 申请表设置
    applyParkForm: '/parkManage/applyParkForm', // 获取申请表
    
    applyPark: '/parkManage/applyPark', // 提交入园申请表

    getIdyInfo: '/common/getIdyInfo', // 行业字典
    getCstIdByUserId: '/memberManage/getCstIdByUserId', // 行业,公司名称反显

    getCstForm: '/memberManage/getCstForm', // 入园审核信息
    activityAduit: '/activity/getByActivityId', // 活动审核信息

    getTagUsg: '/information/getTagUsg', // 全局热门标签
    findEntityTags: '/tag/findEntityTags', // 企业已有标签
    selectLblInfo: '/tag/selectLblInfo', // 企业推荐标签
    saveEntityTags: '/tag/saveEntityTags', // 保存企业标签
    
    getMemByTblTxt: '/memberManage/getMemByTblTxt', //成员管理全局标签查询 lblTxt address parkId

    auditCancer: '/audit/auditerCancer', // 取消审核
    getParkById: '/parkManage/getParkById', // 取消审核

    getAuthParam: '/audit/getAuthParam', // 获取参数审核配置
    updateAuthParam: '/audit/updateAuthParam', // 设置参数审核配置

    getCommentList: '/audit/getCommentList', //审核列表详情  entityId parkId

    addNotice: '/notice/addNotice', //新增公告  parkId content
    delNotice: '/notice/delNotice', //删除公告  id
    getNoticeById: '/notice/getNoticeById', //公告详情  id
    getNoticeList: '/notice/getNoticeList', //列表  parkId

    getCstInfo: '/memberManage/getCstInfo', //邀请列表  
    inviteMember: '/memberManage/inviteMember', //邀请单个   parkId cstId

    getInviteByKey: '/memberManage/getInviteByKey', //拒绝邀请  
    agreeInvite: '/memberManage/agreeInvite', //同意邀请  
    disagreeInvite: '/memberManage/disAgreeInvite', //拒绝邀请  

    queryBriefEntInfos: '/usr/entq/brief/infos', // idyCode address parkId   
    getInviteByInfo: '/memberManage/getInviteInfo', //智能推荐邀请
    getInfoByEntityId: '/audit/getInfoByEntityId', //资讯审核信息 idyCode address parkId


    checkAuth:'commom/checkAuth',  //flag:(1,0)
    getByActivityId:'activity/getByActivityId',  //flag:(1,0)
    applyFormExport:'/memberManage/applyFormExport', //入驻申请表到导出

    
    deleteTag:'/tag/deleteByParkId' //成员管理全局标签删除
}