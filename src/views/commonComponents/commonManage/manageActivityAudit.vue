<template>
    <div class="actauditpage" id="manageActivityAudit">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <activity-auditing-base-info :titleText="titleText" :isStatus="true"></activity-auditing-base-info>
        <manage-audit-mark :config="auditConfig"></manage-audit-mark>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"
    import ManageAuditMark from "./common/manageAuditMark";
    import ActivityAuditingBaseInfo from "./baseInfo/activityAuditingBaseInfo";
    export default {
        data() {
            return {
                titleText: '活动发布审核',
                breadlist: [
                    {
                        path: '/parkHall/manage/baseInfo',
                        name: this.utils.isBdPark() ? "系统管理" : "园区管理"
                    },
                    {
                        path: this.utils.isBdPark() ?'/parkHall/manage/activityPoolActivityAuditing':'/parkHall/manage/activityPoolActivityAditing',
                        name: this.utils.isBdPark() ? "审核管理" : "任务池"
                    },
                    {
                        path: '',
                        name: "活动发布审核"
                    }
                ],
                auditConfig: {
                    review: true,
                    manageText: '活动',
                    backUrl: this.utils.isBdPark() ?'/parkHall/manage/activityPoolActivityAuditing' : '/parkHall/manage/activityPoolActivityAditing',
                    auditApi: this.$apiUrl.manage.auditActivity
                },
            }
        },
        components: {
            EsspBreadCrumb,
            ManageAuditMark,
            ActivityAuditingBaseInfo
        },
        created() {
        },
        methods: {
        },
       
    }
</script>
<style scoped lang="less">

    #manageActivityAudit .access .el-dialog__header {
        display: none;
    }

    #manageActivityAudit .access .el-dialog__body {
        overflow: hidden;
        margin: 30px 20px;
    }

    #manageActivityAudit .access .el-dialog__body p:nth-of-type(1) {
        line-height: 55px;
    }
</style>

<style scoped lang="less">
    #manageActivityAudit{
        background: #fff;
        width: 1200px;
        margin: 0 auto 50px;
        padding-bottom: 50px;
        .bord-none{
            border:none;
        }
    }
    

</style>

