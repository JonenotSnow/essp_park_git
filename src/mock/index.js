var Mock = require('mockjs')
import res from './main'
Mock.mock('/api/parkManage/getParkByRealmName','post',() => {
    return res.parkHome.getParkByRealmName
})

Mock.mock('/api/common/getLoginUserRole','post',() => {
    return res.parkHome.getLoginUserRole
})

Mock.mock('/api/userPostWeb/selectResMenu','post',() => {
    return res.parkHome.selectResMenu
})

Mock.mock('/api/parkManage/getParkById','post',() => {
    return res.parkHome.getParkById
})

Mock.mock('/api/information/getTagUsg','post',() => {
    return res.parkInfo.getTagUsg
})

Mock.mock('/api/information/getAllInformation','post',() => {
    return res.parkInfo.getAllInformation
})

Mock.mock('/api/information/getNoticeList','post',() => {
    return res.parkNotice.getNoticeList
})

Mock.mock('/api/parkIndex/getdataList','post',() => {
    return res.parkNews.getdataList
})

Mock.mock('/api/memberManage/getMemInfo','post',() => {
    return res.parkHome.getMemInfo
})

Mock.mock('/api/expert/getExpertInfo','post',() => {
    return res.parkExpert.getExpertInfo
})

Mock.mock('/api/information/getInfoById','post',() => {
    return res.parkInfo.getInfoById
})

Mock.mock('/api/inform/findPrompt','post',() => {
    return res.parkInfo.findPrompt
})

Mock.mock('/api/comment/getComments','post',() => {
    return res.parkComment.getComments
})

Mock.mock('/api/activity/getAllActivity','post',() => {
    return res.parkActivity.getAllActivity
})

Mock.mock('/api/activity/getByActivityId','post',() => {
    return res.parkActivity.getByActivityId
})

Mock.mock('/api/policy/getAllPolicy','post',() => {
    return res.parkPolicy.getAllPolicy
})

Mock.mock('/api/policy/getPolById','post',() => {
    return res.parkPolicy.getPolById
})

Mock.mock('/api/information/getTagUsg','post',() => {
    return res.parkPolicy.getTagUsg
})


