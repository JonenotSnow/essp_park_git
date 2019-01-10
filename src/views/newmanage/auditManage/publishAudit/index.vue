<template>
    <div>
        <out-route :outsource="outsource"/>
    </div>
</template>

<script>
    import outRoute from './../../components/outRoute.vue';

    export default {
        components: {
            outRoute,
        },
        data() {
            return {
                msg: '审核页面',
                outsource: [
                    {
                        name: '科技政策',
                        path: '/parkHall/manage/sciAndTechPolicyAudit'
                    },
                    {
                        name: '资讯公告',
                        path: '/parkHall/manage/newsNoticeAudit'
                    }
                ],
                status: '0'
            }
        },
        methods: {
            switchStatus(status) {
                this.status = status;
            }
        },
        created() {

        }
    }
</script>

<style scoped lang='less'>
    .sci-and-tech-policy-audit-wrap {
        background-color: #fff;
        .policie-and-regulation-head {
            padding: 48px 40px 30px 40px;
            border-bottom: 1px solid #ccc;
            .head-switch {
                span {
                    display: inline-block;
                    margin-right: 15px;
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999;
                    border-radius: 3px;
                    border: solid 1px #ccc;
                    &:hover {
                        color: #fff;
                        border: solid 1px #00a0e9;
                        background-color: #00a0e9;
                        cursor: pointer;
                    }
                }

                .span-click {
                    color: #fff;
                    border: solid 1px #00a0e9;
                    background-color: #00a0e9;
                }
            }

        }

        .policie-and-regulation-main {

        }
    }
</style>
