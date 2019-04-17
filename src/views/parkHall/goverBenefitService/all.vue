<template>
    <div>
        <!-- 全部惠政模块 -->
        <!-- <essp-main-center-t :pageType="aipStyle"></essp-main-center-t> -->
        <essp-com-banner :url="url"></essp-com-banner>
        <essp-list-search 
            :hasTag="true"
            :hasType="true"
            :hasHot="true"

            :tag-model="tagModel"
            :hot-model="hotModel"
            :type-model="typeModel"
            :date-model="dateModel"
            :mark-model="markModel"

            :hot-list="hotList"
            
            @serTagClick="serTagClick"
            @serHotChange="serHotChange"
            @serTypeChange="serTypeChange"
            @serDateChange="serDateChange"
            @serEnter="serEnter"
            @serReset="serReset"
        ></essp-list-search>
        <div class="container">
            <div class="main esspclearfix">
                <div class="list-main">
                    <essp-list-item
                        v-for="(item, index) in listData"
                        :key="index"
                    ></essp-list-item>
                </div>
                <div class="right-side">

                    <essp-right-side-hot-msg 
                        :listData="sideListData"
                        @hotItemClick="hotItemClick"
                        ></essp-right-side-hot-msg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import esspComBanner from '@/modules/esspComBanner';
    import esspListSearch from '@/modules/esspListSearch';
    import esspRightSideHotMsg from '@/modules/esspRightSideHotMsg';
    import esspListItem from '@/modules/esspListItem';
    import listSearchMixins from "@/modules/mixins/listSearchMixins.js"
    // import EsspMainCenterT from '@/components/EsspMainCenterT';
    // export default {
    //     name: "",
    //     components: {
    //         EsspMainCenterT,
    //     },
    //     data() {
    //         return {
    //             msg: "全部惠政",
    //             aipStyle:"allPolicy"
    //         }
    //     },
    //     methods: {
            
    //     },
    // }
    export default {
        name: "惠政",
        components: {
            esspComBanner,
            esspListSearch,
            esspRightSideHotMsg,
            esspListItem
        },
        data() {
            return {
                url: './static/images/bannerLan.png',
                hotList: [],
                sideListData: [{
                        title: '活动标题',
                        date: 1234565434544
                    }, {
                        title: '活动标题活动活动标题活动活动标题活动活动标题活动活动标题活动',
                        date: 1234565434544
                    },
                ],
                listData: [
                    {
                        "access_token": null, 
                        "requester": null, 
                        "location": null, 
                        "id": "2019041117405935686", 
                        "policyTitle": "大师傅", 
                        "titleImg": "./static/img/kjww2.1f98017.jpg", 
                        "creator": 1000214033, 
                        "createTime": 1554975659000, 
                        "status": "02", 
                        "pubCstName": "91630103MA7578GT33", 
                        "avaliableTime": 1554912000000, 
                        "parkId": "20181220204119007", 
                        "viewTime": 6, 
                        "reminder": null, 
                        "isonlineApply": "1", 
                        "applyMaximum": 213, 
                        "applyType": "1", 
                        "infoDetail": "<p>发生</p>", 
                        "applyForm": null, 
                        "countFollower": "0", 
                        "followId": null, 
                        "applyId": null, 
                        "countApplyer": null, 
                        "saveType": null, 
                        "fileUrl": "[]", 
                        "userName": "鲁宝", 
                        "cstNm": "青海宇志建筑有限公司", 
                        "tagsTxt": "惠政,自由", 
                        "isNeedApprove": "1", 
                        "avaliableEndTime": 1557417600000, 
                        "approveComment": null, 
                        "approvedNum": 0, 
                        "approvingNum": 10, 
                        "applyFormUrl": null, 
                        "classtType": "1", 
                        "deleteFlag": "0", 
                        "applyStatus": null, 
                        "followStatus": "0", 
                        "parkCreateTime": null, 
                        "deleteReason": null, 
                        "parkName": null, 
                        "countApply": "1", 
                        "showType": null, 
                        "isReview": "0", 
                        "platShow": null, 
                        "applyTime": null, 
                        "applyNum": null, 
                        "auditTime": null
                    }, 
                    {
                        "access_token": null, 
                        "requester": null, 
                        "location": null, 
                        "id": "2019041114552641681", 
                        "policyTitle": "啦啦啦啦啦啦啦啦", 
                        "titleImg": "./static/img/dwsw3.cd03d6f.jpg", 
                        "creator": 1000214008, 
                        "createTime": 1554965775000, 
                        "status": "02", 
                        "pubCstName": "91630103MA7578GT33", 
                        "avaliableTime": 1554965820000, 
                        "parkId": "20181220204119007", 
                        "viewTime": 4, 
                        "reminder": null, 
                        "isonlineApply": "1", 
                        "applyMaximum": 10, 
                        "applyType": "1", 
                        "infoDetail": "蓝莲花v你", 
                        "applyForm": null, 
                        "countFollower": "0", 
                        "followId": null, 
                        "applyId": null, 
                        "countApplyer": null, 
                        "saveType": null, 
                        "fileUrl": null, 
                        "userName": "Mvmv", 
                        "cstNm": "青海宇志建筑有限公司", 
                        "tagsTxt": null, 
                        "isNeedApprove": "1", 
                        "avaliableEndTime": 1555228620000, 
                        "approveComment": null, 
                        "approvedNum": 0, 
                        "approvingNum": 0, 
                        "applyFormUrl": null, 
                        "classtType": "3", 
                        "deleteFlag": "0", 
                        "applyStatus": null, 
                        "followStatus": "0", 
                        "parkCreateTime": null, 
                        "deleteReason": null, 
                        "parkName": null, 
                        "countApply": "0", 
                        "showType": null, 
                        "isReview": "1", 
                        "platShow": null, 
                        "applyTime": null, 
                        "applyNum": null, 
                        "auditTime": null
                    }, 
                    {
                        "access_token": null, 
                        "requester": null, 
                        "location": null, 
                        "id": "20190411142432245634", 
                        "policyTitle": "热土", 
                        "titleImg": "./static/img/kjww2.1f98017.jpg", 
                        "creator": 1000214033, 
                        "createTime": 1554963872000, 
                        "status": "02", 
                        "pubCstName": "91630103MA7578GT33", 
                        "avaliableTime": 1554912000000, 
                        "parkId": "20181220204119007", 
                        "viewTime": 5, 
                        "reminder": null, 
                        "isonlineApply": "1", 
                        "applyMaximum": 324, 
                        "applyType": "1", 
                        "infoDetail": "<p>豆腐干</p>", 
                        "applyForm": null, 
                        "countFollower": "0", 
                        "followId": null, 
                        "applyId": null, 
                        "countApplyer": null, 
                        "saveType": null, 
                        "fileUrl": "[]", 
                        "userName": "鲁宝", 
                        "cstNm": "青海宇志建筑有限公司", 
                        "tagsTxt": "惠政,惠政标签", 
                        "isNeedApprove": "1", 
                        "avaliableEndTime": 1557331200000, 
                        "approveComment": null, 
                        "approvedNum": 1, 
                        "approvingNum": 0, 
                        "applyFormUrl": null, 
                        "classtType": "7", 
                        "deleteFlag": "0", 
                        "applyStatus": null, 
                        "followStatus": "0", 
                        "parkCreateTime": null, 
                        "deleteReason": null, 
                        "parkName": null, 
                        "countApply": "0", 
                        "showType": null, 
                        "isReview": "0", 
                        "platShow": null, 
                        "applyTime": null, 
                        "applyNum": null, 
                        "auditTime": null
                    }, 
                    {
                        "access_token": null, 
                        "requester": null, 
                        "location": null, 
                        "id": "20190411100230635306", 
                        "policyTitle": "app惠政发布验证1", 
                        "titleImg": "/essp/upload/active/jpeg/20190411/46d086cc-a481-451f-be5b-3f360bb5f22b.jpeg", 
                        "creator": 1000166003, 
                        "createTime": 1554948150000, 
                        "status": "02", 
                        "pubCstName": "91630103MA7578GT33", 
                        "avaliableTime": 1554948000000, 
                        "parkId": "20181220204119007", 
                        "viewTime": 11, 
                        "reminder": "91630103MA7578GT33", 
                        "isonlineApply": "1", 
                        "applyMaximum": 20, 
                        "applyType": "1", 
                        "infoDetail": "发布时间：2019-04-11 09:55  有效期：2019-04-11 10:00-2019-05-11 10:00", 
                        "applyForm": null, 
                        "countFollower": "0", 
                        "followId": null, 
                        "applyId": null, 
                        "countApplyer": null, 
                        "saveType": null, 
                        "fileUrl": null, 
                        "userName": "小四", 
                        "cstNm": "青海宇志建筑有限公司", 
                        "tagsTxt": "惠政,自由", 
                        "isNeedApprove": "1", 
                        "avaliableEndTime": 1557540000000, 
                        "approveComment": null, 
                        "approvedNum": 0, 
                        "approvingNum": 0, 
                        "applyFormUrl": null, 
                        "classtType": "1", 
                        "deleteFlag": "0", 
                        "applyStatus": null, 
                        "followStatus": "0", 
                        "parkCreateTime": null, 
                        "deleteReason": null, 
                        "parkName": null, 
                        "countApply": "0", 
                        "showType": null, 
                        "isReview": "0", 
                        "platShow": null, 
                        "applyTime": null, 
                        "applyNum": null, 
                        "auditTime": null
                    }, 
                    {
                        "access_token": null, 
                        "requester": null, 
                        "location": null, 
                        "id": "20190411095511161132", 
                        "policyTitle": "嘿嘿", 
                        "titleImg": "./static/img/zwzc2.771aa9e.jpg", 
                        "creator": 1000214008, 
                        "createTime": 1554947927000, 
                        "status": "02", 
                        "pubCstName": "91630103MA7578GT33", 
                        "avaliableTime": 1554951180000, 
                        "parkId": "20181220204119007", 
                        "viewTime": 18, 
                        "reminder": "91310120MA1HKL8CXC", 
                        "isonlineApply": "1", 
                        "applyMaximum": 10, 
                        "applyType": "1", 
                        "infoDetail": "开会回家", 
                        "applyForm": null, 
                        "countFollower": "0", 
                        "followId": null, 
                        "applyId": null, 
                        "countApplyer": null, 
                        "saveType": null, 
                        "fileUrl": null, 
                        "userName": "Mvmv", 
                        "cstNm": "青海宇志建筑有限公司", 
                        "tagsTxt": "OK", 
                        "isNeedApprove": "1", 
                        "avaliableEndTime": 1556592780000, 
                        "approveComment": null, 
                        "approvedNum": 0, 
                        "approvingNum": 4, 
                        "applyFormUrl": null, 
                        "classtType": "5", 
                        "deleteFlag": "0", 
                        "applyStatus": null, 
                        "followStatus": "0", 
                        "parkCreateTime": null, 
                        "deleteReason": null, 
                        "parkName": null, 
                        "countApply": "2", 
                        "showType": null, 
                        "isReview": "1", 
                        "platShow": null, 
                        "applyTime": null, 
                        "applyNum": null, 
                        "auditTime": null
                    }, 
                    {
                        "access_token": null, 
                        "requester": null, 
                        "location": null, 
                        "id": "20190411095108641809", 
                        "policyTitle": "app惠政发布验证2", 
                        "titleImg": "/essp/upload/active/park/20190411/fe27daef-ea3c-424c-8fb9-962e5f8bcc75.jpg", 
                        "creator": 1000166003, 
                        "createTime": 1554947468000, 
                        "status": "02", 
                        "pubCstName": "91630103MA7578GT33", 
                        "avaliableTime": 1554998400000, 
                        "parkId": "20181220204119007", 
                        "viewTime": 3, 
                        "reminder": null, 
                        "isonlineApply": "1", 
                        "applyMaximum": 25, 
                        "applyType": "1", 
                        "infoDetail": "<p>发布时间：2019-04-11 09:55</p><p>有效期：2019-04-12 00:00-2019-05-12 00:00</p>", 
                        "applyForm": null, 
                        "countFollower": "0", 
                        "followId": null, 
                        "applyId": null, 
                        "countApplyer": null, 
                        "saveType": null, 
                        "fileUrl": "[]", 
                        "userName": "小四", 
                        "cstNm": "青海宇志建筑有限公司", 
                        "tagsTxt": "惠政标签", 
                        "isNeedApprove": "1", 
                        "avaliableEndTime": 1557590400000, 
                        "approveComment": null, 
                        "approvedNum": 0, 
                        "approvingNum": 0, 
                        "applyFormUrl": null, 
                        "classtType": "0", 
                        "deleteFlag": "0", 
                        "applyStatus": null, 
                        "followStatus": "0", 
                        "parkCreateTime": null, 
                        "deleteReason": null, 
                        "parkName": null, 
                        "countApply": "0", 
                        "showType": null, 
                        "isReview": "0", 
                        "platShow": null, 
                        "applyTime": null, 
                        "applyNum": null, 
                        "auditTime": null
                    }, 
                    {
                        "access_token": null, 
                        "requester": null, 
                        "location": null, 
                        "id": "20190410161115747531", 
                        "policyTitle": "轻微", 
                        "titleImg": "./static/img/cyzc1.3cea1c8.jpg", 
                        "creator": 1000214383, 
                        "createTime": 1554883875000, 
                        "status": "02", 
                        "pubCstName": "91630103MA7578GT33", 
                        "avaliableTime": 1554884160000, 
                        "parkId": "20181220204119007", 
                        "viewTime": 47, 
                        "reminder": null, 
                        "isonlineApply": "1", 
                        "applyMaximum": 10, 
                        "applyType": "1", 
                        "infoDetail": "轻微", 
                        "applyForm": null, 
                        "countFollower": "1", 
                        "followId": null, 
                        "applyId": null, 
                        "countApplyer": null, 
                        "saveType": null, 
                        "fileUrl": null, 
                        "userName": "Mbmb", 
                        "cstNm": "青海宇志建筑有限公司", 
                        "tagsTxt": null, 
                        "isNeedApprove": "1", 
                        "avaliableEndTime": 1555056960000, 
                        "approveComment": null, 
                        "approvedNum": 3, 
                        "approvingNum": 11, 
                        "applyFormUrl": null, 
                        "classtType": "1", 
                        "deleteFlag": "0", 
                        "applyStatus": null, 
                        "followStatus": "0", 
                        "parkCreateTime": null, 
                        "deleteReason": null, 
                        "parkName": null, 
                        "countApply": "0", 
                        "showType": null, 
                        "isReview": "0", 
                        "platShow": null, 
                        "applyTime": null, 
                        "applyNum": null, 
                        "auditTime": null
                    }, 
                ],
            }
        },
        mixins: [listSearchMixins],
        methods: {
            getList() {

            },
            hotItemClick(item) {
                console.log(item)
            }
        }
    }
</script>

<style lang="less" scoped>
.main {
    padding: 30px 0;
    .list-main {
        width: 850px;
        float: left;
    }
    .right-side {
        width: 300px;
        float: right;
    }
}

</style>
