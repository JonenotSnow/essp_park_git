<template>
    <div class="actauditpage" id="manageParkAuditDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <activity-auditing-base-info :titleText="titleText"></activity-auditing-base-info>
        <manage-audit-info></manage-audit-info>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
import ManageAuditInfo from "../components/common/manageAuditInfo";
import ActivityAuditingBaseInfo from "../components/baseInfo/activityAuditingBaseInfo";
export default {
    components: {
        EsspBreadCrumb,
        ManageAuditInfo,
        ActivityAuditingBaseInfo
    },
    data() {
        return {
            titleText: '活动发布审核详情',
            breadlist: [
                {
                    path: "/parkHall/manage/baseInfo",
                    name: this.utils.isBdPark() ? "系统管理" : "园区管理"
                },
                {
                    path: this.utils.isBdPark()
                        ? `/parkHall/manage/activityPoolActivityAuditing`
                        : "/parkHall/manage/activityPoolActivityAditing",
                    name: this.utils.isBdPark() ? "审核管理" : "任务池"
                },
                {
                    path: "",
                    name: "活动发布审核详情"
                }
            ],
        };
    },
    created() {
    },
  
    methods: {
      
    }
};
</script>

<style scoped lang="less">
#manageParkAuditDetail {
    background: #fff;
    width: 1200px;
    margin: 0 auto 50px;
    padding-bottom: 50px;
}

</style>

