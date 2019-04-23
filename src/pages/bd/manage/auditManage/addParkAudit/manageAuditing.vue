<template>
    <div class="actauditpage" id="manageAuditing">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <park-auditing-base-info :titleText="titleText"></park-auditing-base-info>
        <manage-audit-mark :config="auditConfig"></manage-audit-mark>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"
    import ManageAuditMark from "../components/common/manageAuditMark";
    import ParkAuditingBaseInfo from "../components/baseInfo/parkAuditingBaseInfo";
    export default {
        data() {
            return {
                titleText: '入园申请审核',
                breadlist: [
                    {
                        path: '/parkHall/manage/baseInfo',
                        name: this.utils.isBdPark()?"系统管理":"园区管理"
                    },
                    {
                        path: `/parkHall/manage/activityPoolAddPark`,
                        name: this.utils.isBdPark() ? "审核管理" : "任务池"
                    },
                    {
                        path: '',
                        name: this.utils.isBdPark() ? "入驻申请审核" : "入园申请审核"
                    }
                ],
                infoList: [],
                auditConfig: {
                    review: true,
                    manageText: '入园',
                    backUrl: '/parkHall/manage/activityPoolAddPark',
                    auditApi: this.$apiUrl.manage.auditApplyPark
                },
            }
        },
        components: {
            EsspBreadCrumb,
            ManageAuditMark,
            ParkAuditingBaseInfo
        },
        created() {
            this.getInfo()
        },
        methods: {
            getInfo() {
                this.$post(this.$apiUrl.manage.getCstForm, {
                    id: this.$route.query.entityId,
                    cstId: this.$route.query.cstId,
                })
                .then((response) => {
                    this.infoList = JSON.parse(response.resultData || '[]')
                }, (err) => {
                })
            },
        }

    }
</script>
<style>
    #manageAuditing .access .el-dialog__header {
        display: none;
    }

    #manageAuditing .access .el-dialog__body {
        overflow: hidden;
        margin: 30px 20px;
    }

    #manageAuditing .access .el-dialog__body p:nth-of-type(1) {
        line-height: 55px;
    }
</style>

<style scoped lang="less">
    #manageAuditing{
        width: 1200px;
        margin: 0 auto 50px;
        padding-bottom: 50px;
        background-color: #fff;
    }
    
</style>

