<template>
    <div class="sponsorcon" id="manageGoverAuditing">
        <!-- 资讯审核查看详情页面 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <gover-auditing-base-info :titleText="titleText"></gover-auditing-base-info>
        <manage-audit-mark :config="auditConfig"></manage-audit-mark>
    </div>

</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import GoverAuditingBaseInfo from "../../commonComponents/commonManage/baseInfo/goverAuditingBaseInfo";
    import ManageAuditMark from "../../commonComponents/commonManage/common/manageAuditMark";

    export default {
        data() {
            return {
                breadlist: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "园区管理"
                    },
                    {
                        path: "/parkHall/manage/activityPoolAddPark",
                        name: "任务池"
                    },
                    {
                        path: "",
                        name: "惠政发布审核"
                    }
                ],
                infoList: {},
                titleText: "惠政发布审核",
                auditConfig: {
                    review: false,
                    manageText: '惠政',
                    backUrl: '/parkHall/manage/activityPoolGover',
                    auditApi: this.$apiUrl.manage.auditPolicy
                }
            }
        },
        computed: {},
        components: {
            EsspBreadCrumb,
            GoverAuditingBaseInfo,
            ManageAuditMark
        },
        created() {
        },
        methods: {
            
        }
    }
</script>
<style>
#manageGoverAuditing .access .el-dialog__header {
    display: none;
}

#manageGoverAuditing .access .el-dialog__body {
    overflow: hidden;
    margin: 30px 20px;
}

#manageGoverAuditing .access .el-dialog__body p:nth-of-type(1) {
    line-height: 55px;
}
#manageGoverAuditing .line_area p {
    word-break: break-all;
}
</style>
<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .sponsorcon {
        .essp_width_auto();
        padding-bottom: 50px;
        background-color: #fff;
    }

    

</style>
