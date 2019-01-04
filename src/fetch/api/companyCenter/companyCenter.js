export const companyCenter = {
    getShowcase: `/store/index`, // 获取橱窗首页

    getServiceTypes: '/goods/goods_class_load', //加载服务分类
    getServiceList: '/goods/goods_info', //加载服务列表
    getServiceInfo: '/store/store_goods', //服务详情

    delGoods: `/goods/goods_del`, //服务删除
    saleGoods: `/goods/goods_sale`, //服务上架下架

    focusBusWindow: `/myfocus/focusClick`, //关注、取消关注橱窗/商品
    findFcsTp: `/myfocus/findFcsTp`, //查询是否关注
    getFocusNum: `/myfocus/queryFocusNumByFcstp`, // 查询关注数
    findPrompt: `/inform/findPrompt`, //需求/服务是否被举报
    findRequirement: `/requirement/requirement_exist_intention`, //查询是否意向发送
    sendRequirement: `/requirement/requirement_send_intention`, //发送意向

    getCstMsg: `/requirement/getCstMsg`, //获取对应的企业意向信息
    getHotMatchType: `/behavior/query`,
    getHellHotMatchType: `/behavior/getHotList`, //获取需求大厅常用撮合类型
    getHotMatchTypeUrl: `/requirement/hotRqmTpcd`, //获取未登录下需求大厅常用撮合类型

    getCommodityTypes: '/commodity/commodity_class_load', //加载商品分类
    getCommodityAddress: '/commodity/supply_address_load', // 获取商品供货地地址
    getGoodsUnit: '/commodity/unit_load', // 加载商品单位
    getParentSupplyAddressCode: '/commodity/parent_supply_address', // 获取上一次地址的code
    submitCommodity: '/commodity/submit', // 发布商品
    // 获取商品列表
    getCommodityList: '/commodity/commodity_info',
    // 商品详情
    getCommodityDetail: '/commodity/store_commodity',
    // 商品上/下架
    saleCommodity: '/commodity/sale',
    // 商品删除
    delCommodity: '/commodity/del',
    // 获取价格单位
    getPriceType: '/store/external/getPriceTypeList',

    releaseRecruitment: '/recruitment/releaseRecruitment', //职位发布
    getRecruitmentOpen: '/recruitment/getRecruitmentOpen', //企业职位列表发布中
    getRecruitmentClose: '/recruitment/getRecruitmentClose', //企业职位列表发布关闭
    openOrCloseRecruitment: '/recruitment/openOrCloseRecruitment', //职位关闭
    getAllRecruitment: '/recruitment/getAllRecruitment', //职位列表
    editRecruitment: '/recruitment/editRecruitment', //职位编辑

    claimRecruitment: '/recruitment/claimRecruitment', //职位认领与取消
    getClaimRecruitment: '/recruitment/getClaimRecruitment', //职位认领列表

    recruitmentInfo: '/recruitment/recruitmentInfo', // 查看详情
    sclAuthAplyInfoByCondtion: '/usr/auth/sclAuthAplyInfoByCondtion', // 信息维护
    selectCstMgrAndName: '/usr/auth/selectCstMgrAndName', // 经理名字查询
    aplyupdate: '/usr/auth/aplyupdate', // 信息维护修改
    selectIndustryInfo: '/usr/auth/selectIndustryInfo', // 法定代码名称 校验

    // 获取需求分类
    getReqTypes: '/requirement/indexBrngtgthr',
    // 获取需求列表
    getReqList: '/requirement/cstRqm',
}
