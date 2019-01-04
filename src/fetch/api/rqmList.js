export const rqmList = {
    // 获取需求总条数
    getTotalUrl: '/requirement/total',
    getRequirementHallUrl: '/requirement/index',

    // 获取需求大厅-展示数据
    getRqmHallUrl: '/rec/selItemId',

    // 获取需求大厅-热门需求展示数据
    getHotRqmHallUrl: '/rec/selItemIdBottom',


    // 获取需求大厅初始化接口-展示数据
    getRqmHallFirstUrl: '/rec/selItemIdFirst',

    // 获取我的需求-已完成撮合-展示数据
    getFinishedListUrl: '/requirement/mysucss',

    // 获取我的需求-草稿箱-展示数据
    getDraftListUrl: '/requirement/draftsRqm',

    // 获取我的需求-我的关注-展示数据
    getFocusListUrl: '/requirement/getMyFocus',

    // 获取我的需求-我的足迹-展示数据
    getFootPrintListUrl: '/requirement/myclck',

    // 删除我的足迹
    getdelFootPrintUrl: '/requirement/delClick',

    // 获取我的需求-已失效-展示数据
    getFailureListUrl: '/requirement/abated',

    // 获取我的需求-我收到的意向-展示数据
    getReceiveListUrl: '/requirement/requirement_my_recv',

    // 获取我的需求-我发出的意向-展示数据
    getSendListUrl: '/requirement/requirement_my_send',

    // 获取我的需求-发送意向-展示数据
    getsendIntentionUrl: '/requirement/requirement_send_intention',

    // 获取我的需求-意向处理-展示数据
    getdealInfoUrl: '/requirement/requirement_my_recv_inf',

    // 获取我的需求-意向处理-展示数据
    getdealIntentionUrl: '/requirement/requirement_deal_intention',

    // 获取我的需求-意向删除-展示数据
    getdelIntentionUrl: '/requirement/requirement_del_intention',

    // 获取我的需求-发布中-展示数据
    getAllRqmUrl: '/requirement/abatedAndrqm',

    // 获取我的需求-发布中-展示数据
    getReleaseListUrl: '/requirement/myrqm',

    // 获取我的需求-删除需求-展示数据
    delRqmUrl: '/requirement/updateRequire',

    // 获取我的需求-需求下架-展示数据
    shelvesRqmUrl: '/requirement/abate',

    // 获取我的需求-需求编辑-展示数据
    editRqmUrl: '/requirement/requirement_modify',

    // 获取我的需求-全部取消关注-展示数据
    minusFocusAllUrl: '/requirement/batchCancelFocus',

    // 获取我的需求-全部取消关注-展示数据
    minusFocusUrl: '/myfocus/focusClick',

    // 获取我的需求-关注
    doFocusUrl: '/myfocus/focusClick',

    // 获取我的需求-认领已失效-展示数据
    claimabatedUrl: '/requirement/claimabated',

    // 获取我的需求-认领已发布中-展示数据
    myclaimUrl: '/requirement/myclaim',
    // 获取资源池客户列表
    getPoolUrl: '/requirement/rqmPool',
    // 获取资源池需求列表
    getRqmUrl: '/requirement/cstRqm',
    // 认领资源池需求-行内经理
    claimRqmUrl: '/requirement/toClaim',

    // 获取筛选后的公司结果
    searchForResultUrls: ['/cpy/searchcpylist', 'pdt/searchpdtlist', 'rqm/searchrqmslist', '', 'prd/searchPrdList'],

    // 获取选项的结果
    getcasListUrl: 'codetable/getcodeinfobytype',

    // 加载服务分类
    loadGoodClassUrl: 'goods/goods_class_load',

    // 加载商品分类
    loadProductClassUrl: 'requirement/indexBrngtgthr',

    // 获取行外需求转移列表
    getEntpsubAccList: 'requirement/getEntpSubAcc',

    // 获取行内需求转移列表
    getBnkInsidUsrList: 'requirement/getBnkInsidUsr',
    // 需求大厅首页轮播
    rqmIndexImgsUrl: 'homePage/bannerUrlList',
    // 获取全部资讯
    getAllInfoUrl: 'information/getAllInformation',
    // 获取资讯详情
    getInfoDetailUrl: 'information/getInfoById',
    // 需求移交
    handOverUrl: 'requirement/handOver',
    // 获取区域需求数量
    getEachAreaRqmUrl: 'rqm/rqmTermsQuery',
    // 需求详情举报
    insertInformUrl: '/inform/insertInform',
    // 申诉
    insertUserComplainUrl: '/complain/insertUserComplain',
}
