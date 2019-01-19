import {common} from './api/common'
import {active} from './api/active/active'
import {achievement} from './api/achievement/achievement'  // 成果管理
import {goverBene} from './api/goverBene/goverBene'
import {index} from './api/index'
import {user} from './api/user/user'
import {companyCenter} from './api/companyCenter/companyCenter'
import {rqmList} from './api/rqmList'
import {upload} from './api/upload/upload'
import {service} from './api/service/service'
import {preview} from './api/preview/preview'
import {home} from './api/home/home'
import {manage} from './api/manage/manage'
import {parkInfo} from './api/parkInfo/parkInfo'
import {admin} from './api/admin/admin'
import {helpCenter} from './api/helpCenter/helpCenter'
import {dataAnalysis} from './api/dataAnalysis/dataAnalysis'
import {matchmak} from './api/matchmak/matchmak'
import {businessManager} from './api/businessManager/index'
import {loving} from './api/loving/loving'
import {auditinfo} from './api/auditinfo/auditinfo'
import {merchant} from './api/merchant/merchant'
import {chat} from './api/chat/chat'
import {property} from './api/parkProperty/index'
import {newsinfo} from './api/newsinfo/newsinfo'//新园区通知公告接口
/*import {allNeed} from './api/need/getAllNeed'//获取全部需求列表*/


import {building} from './api/building/index'

import {investment} from './api/investment/investment'
// 物业信息
import {sciAndTechPolicy} from './api/sciAndTechPolicy/index.js'

/**
 * 科技政策api
 */
import {processTrack} from './api/processTrack/processTrack'

export const apiUrl = {
    common,
    index,
    active,
    achievement,
    goverBene,
    user,
    rqmList,
    upload,
    service,
    preview,
    home,
    manage,
    admin,
    parkInfo,
    companyCenter,
    helpCenter,
    dataAnalysis,
    matchmak,
    businessManager,
    loving,
    auditinfo,
    chat,
    merchant,
    property,
    investment,
    processTrack,
    building,
    newsinfo,
    /*allNeed,*/
    sciAndTechPolicy

}

