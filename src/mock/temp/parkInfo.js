const getTagUsg = {
	"resultCode": "0000000000",
	"resultMsg": "获取标签成功！",
	"resultData": [{
		"tagTxt": "软件行业",
		"tagCount": "26",
		"tagTp": "3000002",
		"tagId": "7328"
	}, {
		"tagTxt": "活动标签",
		"tagCount": "10",
		"tagTp": "3000002",
		"tagId": "4170"
	}, {
		"tagTxt": "比赛",
		"tagCount": "10",
		"tagTp": "3000002",
		"tagId": "8946"
	}, {
		"tagTxt": "111",
		"tagCount": "4",
		"tagTp": "3000002",
		"tagId": "8449"
	}, {
		"tagTxt": "222",
		"tagCount": "1",
		"tagTp": "3000002",
		"tagId": "8450"
	}]
}

const getAllInformation = {
	"resultCode":"0000000000",
	"resultMsg":"查询成功！",
	"resultData":{
		"total":0,
		"informationList":[]
	}
}

const getInfoById = {
	"resultCode": "0000000000",
	"resultMsg": "查询成功！",
	"resultData": {
		"access_token": null,
		"requester": null,
		"location": null,
		"informationId": "20190225172824580143",
		"informationTitle": "app园区初级发布资讯5",
		"content": "简介1",
		"infoDetail": "app园区初级发布资讯app园区初级发布资讯",
		"creator": 1000166001,
		"createTime": 1551165606000,
		"status": "02",
		"approver": null,
		"approveType": "1",
		"parkId": "20181220204119007",
		"viewTime": 1,
		"followId": null,
		"approveComment": null,
		"titleImg": "/essp/upload/active/jpeg/20190225/98f84c70-9f08-4780-9b3c-9f7f37e990f0.jpeg",
		"countFollower": "0",
		"pubComment": "需高级管理员审核",
		"countComment": "0",
		"followStatus": "0",
		"userName": "小二",
		"deleteFlag": "0",
		"cstNm": "青海宇志建筑有限公司",
		"phone": "15799000002",
		"tagsTxt": "动态",
		"pubUserType": "0",
		"showType": null,
		"lockApprove": null,
		"parkName": null,
		"classtType": "6",
		"usrNm": "15799000002",
		"auditList": null,
		"deleteReason": null,
		"parkCreateTime": null,
		"platShow": null,
		"fileUrl": null,
		"creatorPhoto": null,
		"auditTime": null,
		"pubCstName": "91630103MA7578GT33"
	}
}

const findPrompt = {
	"resultCode": "0000000000",
	"resultMsg": "0000000000",
	"resultData": {
		"prompt": "0"
	}
}

const res = {
	getTagUsg,
	getAllInformation,
	getInfoById,
	findPrompt
}

export default res