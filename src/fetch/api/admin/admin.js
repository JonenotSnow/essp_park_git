export const admin = {
    addParkInfo: 'parkManage/addPark',// 新建园区
    parkInfoList: 'parkManage/getManageParkList', //获取园区信息
    parkInfo:'parkManage/getParkById', //获取园区详情
    userAuditList: 'usr/auth/audit/list',//加载企业认证审核列表 客户审核用
    userAuditList2: 'usr/auth/audit/list2',//加载企业认证审核列表 会员管理用
    userAuditICview:'usr/auth/audit/ICview',//加载企业工商注册信息
    checkAduit:'usr/auth/aduit/check',//企业认证审核前校验个人认证情况
    submitAudit:'usr/auth/audit/submit',//企业认证审核提交
    userfeedInfoList:'userFeedBack/userfeedbackFind',//获取用户反馈信息列表
    tagInfoList:'tag/selectLblInfo',//获取标签列表
    addLable:'tag/insetLable',//新增标签
    labelInOrOut:'tag/lblState',//标签出入库
    informationList:'information/getAllInformation',//获取资讯列表
    delInfo:'information/delInformation',//删除资讯
    undoDelInfo:'information/undoDelInfo',//恢复已删除资讯,
	executeProcs:'srch/execute_procs',//存储过程管理
	updateSearch:'srch/updateSearch' ,//搜索管理
	storedProcedure:'srch/stored_procedure', //需求管理
    userList:'usr/userInfo/list', //用户权限管理
    getPermission:'usr/userInfo/topost', //查询用户权限
    saveInfo:'usr/userInfo/post/save', //用户权限管理
    delPark:'parkManage/delPark',//删除园区
    subaccList:'usr/userInfo/subacc/list', //用户子账号管理
	windowDetail:'/store/external/get_store_view',//橱窗基本详情接口
    windowService:'/store/external/get_goods_view',//橱窗服务列表接口
    updpwd:'usr/userInfo/modifyPassword', //修改密码接口
    operate:'store/external/goods_sale',  //上下架接口
    requirement:'requirement/enqrCstRqm',//客户需求接口
    syncGoodsSearchInfo:'store/external/sync_goods_search_info',
    updateStoreSearch:'store/external/update_store_search',
    goodsCommodity:'srch/goods_commodity',//商品搜索管理
    reFreshUser:'usr/userInfo/refresh/user', //同步用户认证信息
    reFreshEnt:'usr/userInfo/refresh/ent', //同步企业认证信息
    claimUpdate:'usr/cst/claim/update', //
	clsRqm:'requirement/clsRqm',//需求关闭
    findAllInform:'inform/findAllInform',//查询举报简略记录
	selectAllAppeal:'complain/selectAllAppeal',//申诉列表
    findDetail:'inform/findDetail',//查询举报明细
    informPrompt:'inform/informPrompt',//举报提示开关
    contentClose:'inform/contentClose',//内容关闭开关
    requirementDelIntention:'requirement/requirement_del_intention',//删除意向
    //银行同业参数设置
    bankParamSetList:'usr/ibank/list',//列表
    bankParamSetDel:'usr/ibank/del',//删除
    bankParamSetSave:'usr/ibank/save',//保存

    informFreeze:'inform/informFreeze',//功能权限开关
    selectUserComplain:'complain/selectUserComplain',//申诉详情
    findParam:'paramSet/findParam',//举报参数设置
    updateParam:'paramSet/updateParam',//更新举报参数设置
    uploadXls: 'usr/whlst/uploadXls', // 白名单上传
    batchlist: 'usr/whlst/batch/list', // 批次查询
    bthDetaillist: 'usr/whlst/bthDetail/list', // 查看结果
    detailDelete: 'usr/whlst/detail/delete', // 删除
    downloadwhlst: 'usr/whlst/download/whlst', // 模板下载
    batchadd: 'usr/whlst/batch/add', // 提交
    senstv: 'usr/refresh/senstv', // 企业敏感数据同步
    getsentv: 'usr/whlst/getsentv', // 企业铭感信息查看
    coopUpdate:'usr/cst/coop/update',//设置合作伙伴
    saveUserPostList:'userPostWeb/saveUserPostList',//保存用户角色
    selectUserPostList:'userPostWeb/selectUserPostList',//查找用户角色
    getCodeInfoByType:'codetable/getcodeinfobytype',//根据字典类型获取字典表

    findAllPost:'rolePost/findAllPost ',//查询所有角色
    findAllRole:'rolePost/findAllRole ',//查询所有权限
    selectByPostId:'rolePost/selectByPostId',//查询角色权限
    updateRolePost:'rolePost/updateRolePost',//查询角色权限

    findAllRolePage:'rolePost/findAllRolePage',//获取权限
    selectByRoleId:'roleRes/selectByRoleId',//获取权限下有的子权限
    selectAppRes:'roleRes/selectAppRes',//获取App所有子权限
    selectPcRes:'roleRes/selectPcRes',//获取pc所有子权限
    updateRoleRes:'roleRes/updateRoleRes',//更新权限
    showStdCode:'tag/showStdCode',//标签option
    chatbot_download:'chatterbot/download/',//智能后台管理_下载
    chatbot_upload:'chatterbot/upload/',//智能后台管理_上传
    chatbot_train:'chatterbot/train/',//智能后台管理_训练

    selectuserinfcheck:'usr/auth/selectuserinfcheck',//userId  根据用户id获取证件号及类型

    getStdCode:'code/getStdCode',//全领域，获取代码值  服务名称  传：attrId,
    getAllStdCode:'code/getAllStdCode',//全领域,获取树
    delStdCode:'code/delStdCode',//删除
    saveStdCode:'code/saveStdCode',//添加或修改
    getCodeUseDetails:'code/getCodeUseDetails',//查询代码值引用详情


    adminAdd:'usr/userInfo/admin/add',//admin管理员帐号添加
    adminQuery:'usr/userInfo/admin/query',//admin管理员帐号查询
    adminModify:'usr/userInfo/admin/modify',//admin管理员帐号修改
    adminDelete:'usr/userInfo/admin/delete',//admin管理员帐号删除

    userFunFreeze:'usr/userInfo/updateUserFunFreeze',//用户冻结   参数 username functionFreeezeFlag 冻结 1 解冻 0 freezeStatus 0固定值



    getParkCode:'/common/getCode',
    getInfoByAdmin:'/information/getInfoByAdmin ',//获取全部资讯
    getPolicyByAdmin:'/policy/getPolicyByAdmin',//获取惠政信息
    getAllActivity:'/activityBs/getAllActivity',//获取活动信息
    getAdminMemInfo:'/memberManage/getAdminMemInfo',//获取园区成员
    delBatchInfo:'/information/delBatchInfo',//下架资讯
    delBatchPol:'/policy/delBatchPol',//下架惠政
    // delActivity:'/activity/delActivity',//下架活动
    delActivity:'/activityBs/delActivity',
    delMemInfo:'/memberManage/delMemInfo',//园区移除成员
    getEnterinfoListPage:'/enterinfo/getEnterinfoListPage',//活动报名详情
    getApplyByPolicyId:'/policy/getApplyByPolicyId',//惠政报名详情

    deleteAuthAplyByCstId:'usr/auth/deleteAuthAplyByCstId',//认证审核，拒绝并删除  cstId、

    updatePark:'/parkManage/updatePark',//园区编辑
    getChildRoles:'/common/getChildRoles',//获取园区管理企业子账户

    deletePostUserBatch:'userPostWeb/deletePostUserBatch',//移除子帐号园区管理员
    insertPostUserBatch:'userPostWeb/insertPostUserBatch',//配置子帐号园区管理员

    addVo:'green/cstSystemRel/addVo',//配置子平台权限
    delVo:'green/cstSystemRel/delVo',//配置子平台权限
    updateVo:'green/cstSystemRel/updateVo',//配置子平台权限
    queryVo:'green/cstSystemRel/queryVo',//配置子平台权限

    importCustomer:'usr/auth/importCompany' ,     //客户批量导入
    getResult:'usr/import/resultFile',            //刷新客户批量导入，获取结果文件

    doubtRqmUserSearch: 'doubtRqm/doubtRqmUserSearch', //可疑客户查询
    doubtRqmProvinceSearch: 'doubtRqm/doubtRqmProvinceSearch' //可疑客户查询
}
