export const dataAnalysis = {
    searchRqmGetSrvTpcd: 'rqmStatistics/searchRqmGetSrvTpcd',// 数据统计  三大类
    searchRqmTpcd: 'rqmStatistics/searchRqmTpcd',// 数据统计 子类 传入大类id
    rqmTopNumberByRqmTpcd:'requirementInfo/rqmTopNumberByRqmTpcd',   //热门需求top，发布量前五的类型
    //首页用户
    statRequirementParameter:'requirementInfo/statRequirementParameter',   //xuqiu 累计数量
    //首页企业
    statUserParameter:'userAnalysis/statUserParameter',//用户累计数量
    //首页需求
    statOrgaParameter:'organizationInfo/statOrgaParameter',//企业累计数量
    // rqmFirstTypeByYearStat:'requirementInfo/rqmFirstTypeByYearStat',//近几年需求发布数量 按第一大类
    rqmFirstTypeByMonthStat:'requirementInfo/rqmFirstTypeByMonthStat',//近12月需求发布数量 按第一大类
    rqmAbcd:'requirementInfo/rqmAbcd',//撮合成功交易笔数
    rqmPublishPublisherStat:'requirementInfo/rqmPublishPublisherStat',//发布需求客户数发布需求数量
    rqmIntensionSuccessStat:'requirementInfo/rqmIntensionSuccessStat',//收发意向数，撮合成功数量
    statProvinceNumberRatio:'enterpriseInfo/statProvinceNumberRatioChart',//省份企业注册数
    //查询白名单
    searchWhiteList:'usr/whlst/list',
    //删除白名单
    delWhiteList:'usr/whlst/del',
    //新增白名单
    saveWhiteList:'usr/whlst/save',
    //批量上传白名单
    uploadWhiteList:'usr/whlst/upload',
    //附件管理上传
    attchUpload:'usr/ad/upload',
    //审核图片上传
    upldAtchs:'usr/import/upldAtchs',
    //广告图片上传
    advUpload:'advManage/advUpload',
    //广告图片、信息新增
    //advSave:'usr/ad/save',
    advSave:'advManage/advInsert',
    //广告列表
    advList:'advManage/advList',
    //广告删除
    advDelete:'advManage/advDelete',
    //广告详情
    advInfo:'advManage/advInfo',
    //广告编辑
    advEdit:'advManage/advEdit',
    //需求点击量top
    rqmClckStat:'requirementInfo/rqmClckStat',
    //橱窗点击量top
    storeClckStat:'storeInfo/storeClckStat',
    //需求关注量top
    rqmFcsStat:'requirementInfo/rqmFcsStat',
    //热门需求top，发布量前五的类型
    rqmTopNumberByRqmTpcd:'requirementInfo/rqmTopNumberByRqmTpcd',
    //任务池
    taskpools:'usr/auth/audit/list',
    statProvinceNumberRatioTable:'enterpriseInfo/statProvinceNumberRatioTable',//省份企业注册排名
    enterpriseByProvince:'enterpriseInfo/enterpriseByProvince',//省份企业查询
    statrqmByProvinceTable:'rqmAreaInfo/statrqmByProvinceTable',//各省市需求排行
    getIntermediaryStateOptions:'dictionaryInfo/getIntermediaryStatePPP_12639',//需求表下啦options
    statrqmByProvinceChart:'rqmAreaInfo/statrqmByProvinceChart',//各省市需求排行(地图)
    rqmByProvinceCode:'rqmAreaInfo/rqmByProvinceCode',//省需求列表
    getMatchSuccessList:'matchSuccessInfo/getMatchSuccessList',//撮合成功信息表
    behaviorQuery:'behavior/query',//企业用户行为分析

    rqmServer:'rqmServerInfo/rqmServer',//各省市服务数据table
    statUserByTime:'userAnalysis/statUserByTime',//用户数量
    matchSuccessAmount:'matchSuccessAmountInfo/matchSuccessAmount',//撮合成功交易金额
    matchSuccessAmountSecond:'matchSuccessAmountInfo/matchSuccessAmountSecond',//撮合成功交易金额 新规则接口

    infoStatParameter:'infoInfo/infoStatParameter',//资讯首页统计
}
