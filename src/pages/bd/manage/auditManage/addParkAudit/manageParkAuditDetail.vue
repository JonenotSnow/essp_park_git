<template>
    <div class="actauditpage" id="manageParkAuditDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <park-auditing-base-info :titleText="titleText"></park-auditing-base-info>
        <manage-audit-info :parkType="true"></manage-audit-info>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb"
import ManageAuditInfo from "../components/common/manageAuditInfo";
import ParkAuditingBaseInfo from "../components/baseInfo/parkAuditingBaseInfo";
export default {
    components:{
        EsspBreadCrumb,
        ManageAuditInfo,
        ParkAuditingBaseInfo
    },
    data () {
        return {
            titleText: '入园审核详情',
            breadlist:[
                {
                    path: '/parkHall/manage/baseInfo',
                    name: this.utils.isBdPark()?"系统管理":"园区管理"
                },
                {
                    path:`/parkHall/manage/activityPoolAddPark`,
                    name: this.utils.isBdPark() ? "审核管理" : "任务池"
                },
                {
                    path:'',
                    name: "",
                    name: this.utils.isBdPark() ? "入驻审核详情" : "入园审核详情"
                }
            ],
        }
    },
    created () {
    },
    methods: {
    }
}
</script>

<style scoped lang="less">
#manageParkAuditDetail{
    width: 1200px;
    background-color: #fff;
    margin: 0 auto 50px;
    padding-bottom: 50px;
}
</style>

