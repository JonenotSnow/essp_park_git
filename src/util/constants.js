import uploadType from './uploadType.js'
import {
    apiUrl
} from '../fetch/apiUrl'
const constants = {
    // 版本号
    version: '1224',
    // 允许授权访问的页面
    authName: [
        // 基础配置
        'homeIndex',
        'home', // 首页
        'login', // 登录页
        'forgetPwd', // 忘记密码
        'register', // 注册
        'help-topic', // 深圳专题
        'jzfp-home', // 精准扶贫首页
        'requ-display-other', // 展示他人详情
        'parkList',
        'park-home',
        'requ-requSearch', // 撮合平台搜索
        'park-requestPage' //  园区的邀请函列表  -  林河钦
        // '/',
        // '/home', // 首页
        // '/userIndex/login', // 登录页
        // '/userIndex/forgetPwd', // 忘记密码
        // '/userIndex/register', // 注册
        // '/helpCenter/topic', // 深圳专题
        // '/jzfpIndex/index',  // 精准扶贫首页
        // '/requIndex/display-other', // 展示他人详情
        //  本地临时配置(此处只用于本地临时测试，不可上传文件，
        // 当后端将数据插入数据库后，删除此处记录，正常调试
    ],
    // 从其他平台跳转过来设值
    srcCode: [
        'APP_001', // 政务云
        'JZFP', // 精准扶贫
        'GREEN', // 绿色信贷
        'PARK', // 园区
    ],
    // 冻结账户的url数组
    urlList: [
        '/commodity/submit', // 发布商品
        '/commodity/del', //商品删除
        '/commodity/sale', //商品上/下架
        '/requirement/requirement_send_intention', //发送意向
        '/requirement/pulish/addOrUpdate', //需求发布
        '/requirement/abate', //需求下架
        '/requirement/requirement_modify', //需求编辑
        '/requirement/updateRequire', //删除需求
        '/goods/goods_submit', //创建服务
        '/goods/goods_del', //服务删除
        '/goods/goods_sale', //服务上架下架
        '/goods/goods_edit', //编辑服务
        '/activity/addActivity', // 发布活动接口
        "/activity/delActivity", //删除活动
        "/attention/removeAttention", //取消关注
        "/enterinfo/addEnterinfo", // 添加报名活动
        "/information/delBatchInfo", //删除资讯草稿（批量和单条删除）
        "/information/saveInformation", //发布资讯
        "/information/addMyFocus", //添加关注资讯
        "/information/cancelFollInfo", //取消关注资讯
        "/comment/addComment", // 添加评论
        "/comment/addReply", // 添加回复
        "/comment/delReply", // 删除回复
        "/requirement/newPush", //订阅最新需求
    ],
    // 自定义请求axios配置（主要用于定期执行URL）
    urlCstCfg: [{
            // 系统通知 - 未读消息
            url: apiUrl.user.getUnreadMessageUrl,
            config: {
                process: false
            }
        },
        {
            // 企业认证
            url: apiUrl.user.submitCertUrl,
            config: {
                timeout: 50000
            }
        },
        {
            // 需求发布 - 保存图片、附件
            url: apiUrl.matchmak.saveRequAccessory,
            config: {
                timeout: 50000
            }
        },
        {
            // 静态资源上传
            url: apiUrl.dataAnalysis.attchUpload,
            config: {
                timeout: 600000
            }
        },
        {
            // 审核附件上传
            url: apiUrl.dataAnalysis.upldAtchs,
            config: {
                timeout: 600000
            }
        },
        {
            // 订阅最新需求加载条
            url: apiUrl.rqmList.newSbrRqmUrl,
            config: {
                process: true
            }
        }
    ],
    // 上传文件类型
    uploadType: uploadType,
    // 政府用户不可以访问的需求发布name值
    goverTypeName: [
        'requ-rzzl',
        'requ-gqhg',
        'requ-tzrz',
        'requ-jnjp',
        'requ-zczr'
    ],
    // 用户类型
    userType: {
        backgroundUser: '01', // 后台用户类型
        inlineUser: '02', // 行内用户类型
        getsUser: '03', // 行外用户类型
        goverUser: '04', // 云南政务云用户类型
    },
    // 用户角色
    userRole: {
        tourist: {
            key: '11',
            value: '游客'
        },
        inlineManager: {
            key: '21',
            value: '行内客户经理'
        },
        inlineAdmin: {
            key: '22',
            value: '行内管理者'
        },
        entOperator: {
            key: '31',
            value: '注册会员操作员'
        },
        entAdmin: {
            key: '32',
            value: '注册会员管理员'
        },
        parkPrimaryManager: {
            key: '33',
            value: '园区初级管理员'
        },
        parkAdvancedManager: {
            key: '34',
            value: '园区高级管理员'
        },
        platformPrimaryManager: {
            key: '41',
            value: '平台普通管理员'
        },
        platformAdvancedManager: {
            key: '42',
            value: '平台高级管理员'
        },
        primaryService: {
            key: '43',
            value: '普通客服'
        },
        advancedService: {
            key: '44',
            value: '高级客服'
        },
        contentOperation: {
            key: '45',
            value: '内容运营岗'
        },
        dataAnalysis: {
            key: '46',
            value: '数据分析岗'
        },
        developer: {
            key: '47',
            value: '开发操作员'
        },
        povertyReliefPrimaryManager: {
            key: '51',
            value: '扶贫高级管理员'
        },
        greenProjectManager: {
            key: '52',
            value: '绿色项目管理员'
        },
        reportDemo: {
            key: '97',
            value: '汇报演示岗'
        },
        branchOperationManager: {
            key: '98',
            value: '分行运营管理岗'
        },
        systemManager: {
            key: '99',
            value: '系统管理员'
        }
    },
    // 企业类型
    enterpriseType: {
        churchyardType: {
            key: '01',
            value: '境内企业客户'
        },
        goverType: {
            key: '02',
            value: '政府客户'
        },
        overseasType: {
            key: '03',
            value: '境外企业客户'
        },
        causeType: {
            key: '04',
            value: '事业单位客户'
        },
        peopleNonEntType: {
            key: '05',
            value: '其他民办非企业单位客户'
        },
        bankEntType: {
            key: '06',
            value: '银行类客户'
        }
    },
    // 园区保定数据
    bdParkData: {
        parkId: '20181220203833005',
        parkFlag: 'bdPark2018',
        bdUrl: 'bdppc',
        esspUrl: 'essp',
    },
    // 淮安保定数据
    haParkData: {
        parkId: '20181220204119007',
        parkFlag: 'haPark2018',
        parkName: '淮安高新技术产业开发区'
    },
    // 返回码定义
    RETURN_CODE: {
        //消息默认时间5s
        MSG_TIME: 5000,
        // 正确码
        SUCCESS_CODE: [
            'CLT000000000',
            '0000000000'
        ],
        ERROR_CODE: '1111111111',
        // 业务错误校验规则
        BUSINESS_RULE: /^Y.*$/,
        // 系统错误校验规则
        TECHNOLOGY_RULE: /^X.*$/,
        // 错误-业务类型
        ERROR_BUSINESS_TYPE: 'BUSINESS',
        // 错误-技术类型
        ERROR_SYSTEM_TYPE: 'SYSTEM',
        // 错误-被他人登录类型
        ERROR_OTHER_LOGIN_TYPE: 'OTHER_LOGIN',
        // 错误-未知错误类型
        ERROR_UNKNOWN_TYPE: 'UNKNOWN',
        // 错误-网络异常类型
        ERROR_NETWORK_TYPE: 'NETWORK',
        // 错误-非法token身份令牌失效类型
        ERROR_INVALID_TOKEN_TYPE: 'INVALID_TOKEN',
        // 错误-服务器异常（重启，服务器挂了）
        ERROR_SERVICE_TYPE: 'SERVICE'

    },
}


export default constants
