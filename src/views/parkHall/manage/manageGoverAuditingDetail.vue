<template>
    <div class="actauditpage" id="manageParkAuditDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <gover-auditing-base-info :isStatus="true" :titleText="titleText"></gover-auditing-base-info>
        <manage-audit-info :type="6"></manage-audit-info>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"
    import GoverAuditingBaseInfo from "../../commonComponents/commonManage/baseInfo/goverAuditingBaseInfo";
    import ManageAuditInfo from "../../commonComponents/commonManage/common/manageAuditInfo";
    import Moment from 'moment'

    export default {
        components: {
            EsspBreadCrumb,
            GoverAuditingBaseInfo,
            ManageAuditInfo
        },
        data() {
            return {
                breadlist: [
                    {
                        path: '/parkHall/manage/baseInfo',
                        name: "园区管理"
                    },
                    {
                        path: `/parkHall/manage/activityPoolAddPark`,
                        name: "任务池"
                    },
                    {
                        path: '',
                        name: "惠政审核详情"
                    }
                ],
                infoList: {},
                titleText: "惠政发布审核详情"
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

