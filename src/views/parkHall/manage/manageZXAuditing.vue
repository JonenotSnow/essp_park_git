<template>
    <div class="sponsorcon" id="manageZXAuditing">
        <!-- 资讯审核查看详情页面 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <zx-auditing-base-info :titleText="titleText"></zx-auditing-base-info>
        <manage-audit-mark :config="auditConfig"></manage-audit-mark>
    </div>

</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import ManageAuditMark from "../../commonComponents/commonManage/common/manageAuditMark";
    import ZxAuditingBaseInfo from "../../commonComponents/commonManage/baseInfo/zxAuditingBaseInfo";
    export default {
        data() {
            return {
                breadlist: [
                    {
                        path: "/parkIndex/park/all",
                        name: this.utils.isBdPark()?"系统管理":"园区管理"
                    },
                    {
                        path: "/parkHall/manage/activityPoolAddPark",
                        name: "任务池"
                    },
                    {
                        path: "",
                        name: "资讯发布审核"
                    }
                ],
                titleText: "资讯发布审核",
                auditConfig: {
                    review: true,
                    manageText: '资讯',
                    backUrl: '/parkHall/manage/activityPoolZX',
                    auditApi: this.$apiUrl.manage.auditInformation
                }
            }
        },
        components: {
            EsspBreadCrumb,
            ManageAuditMark,
            ZxAuditingBaseInfo
        },
        created() {
        },
        methods: {
        }
    }
</script>
<style>
    #manageZXAuditing .access .el-dialog__header {
        display: none;
    }

    #manageZXAuditing .access .el-dialog__body {
        overflow: hidden;
        margin: 30px 20px;
    }

    #manageZXAuditing .access .el-dialog__body p:nth-of-type(1) {
        line-height: 55px;
    }
    #manageZXAuditing .line_area p {
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
