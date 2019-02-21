var Mock = require('mockjs')
import res from './main'
Mock.mock('/api/parkManage/getParkByRealmName','post',() => {
    return res.parkHome.getParkByRealmName
})
