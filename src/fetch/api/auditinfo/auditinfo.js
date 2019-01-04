export const auditinfo = {
//auditinfolist: 'news/info/getInfoList',// 资讯列表
    auditinfolist: 'news/processInfo/list',// 资讯列表
    auditinfo: 'news/processInfo/updateProcess',// 资讯审核
    getInfClassName: 'news/classify/list',// 获取二级分类
    auditinfoDetail:'news/info/selectInfoByInfoId',// 获取审核详情
    auditinfoInsert:'news/info/infoInsert',// 资讯发布
    imgUpload:'news/info/upload',// 图片上传
    imgDelete:'news/info/deleteImg',// 图片删除
    myAuditinfoList:'news/info/getInfoAncList',// 资讯发布列表
    myAuditinfoListMarks:'news/info/updateToMarks',// 资讯发布列表置顶
    myAuditinfoListCarouselFlag:'news/info/updateCarouselFlag',// 资讯发布列表轮播
    deleteAuditinfoList:'news/info/deleteBySelect',// 资讯发布列表删除
    infoUpdate:'news/info/infoUpdate',//修改
    readCsv:'news/file/readCsv',
    showInfoByInfoId:'news/info/showInfoByInfoId',//详情展示回显
    getInfNums:'news/info/selectCountByParameter',//获取资讯条数信息
    getInfSourceName: 'news/info/selectSourceList',// 获取资讯来源

    //图片审核列表
    photoCheckList:"/photoCheck/selectMainPhoto",
    //图片审核
    photoCheck:"/photoCheck/updateAuditstatus",
    //图片屏蔽
    shieldPhoto:"/photoCheck/shieldPhoto",
    //图片详情
    pictureDetails:"/photoCheck/pictureDetails"
}

