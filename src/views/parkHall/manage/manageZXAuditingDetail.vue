<template>
    <div class="actauditpage" id="manageParkAuditDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <zx-auditing-base-info :titleText="titleText" :isStatus="true"></zx-auditing-base-info>
        <manage-audit-info></manage-audit-info>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"
    import ManageAuditInfo from "../../commonComponents/commonManage/common/manageAuditInfo";
    import ZxAuditingBaseInfo from "../../commonComponents/commonManage/baseInfo/zxAuditingBaseInfo";
    import Moment from 'moment'

    export default {
        components: {
            EsspBreadCrumb,
            ManageAuditInfo,
            ZxAuditingBaseInfo
        },
        data() {
            return {
                breadlist: [
                    {
                        path: '/parkHall/manage/baseInfo',
                        name: this.utils.isBdPark() ? "系统管理" : "园区管理"
                    },
                    {
                        path: `/parkHall/manage/activityPoolAddPark`,
                        name: "任务池"
                    },
                    {
                        path: '',
                        name: "资讯审核详情"
                    }
                ],
                isStatus: true,
                titleText: "资讯发布审核详情"
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>

<style scoped lang="less">
    #manageParkAuditDetail {
        background: #fff;
        width: 1200px;
        margin: 0 auto 50px;
    }
</style>

