<template>
    <div class="sci-and-tech-policy-audit-wrap">
        <div class="policie-and-regulation-head">
            <div class="head-switch">
                <span :class="{'span-click': status=='0'}" @click="switchStatus('0')">政策法规</span>
                <span :class="{'span-click': status=='1'}" @click="switchStatus('1')">科技服务</span>
            </div>
        </div>
        <div class="policie-and-regulation-main">
            <policies-and-regulations v-if="status=='0'"/>
            <sci-and-tech-service v-if="status=='1'"/>
        </div>
    </div>
</template>

<script>
    import policiesAndRegulations from "./policieAndRegulation.vue";
    import sciAndTechService from "./sciAndTechService.vue";

    export default {
        name: 'vue-temp',
        props: {},
        components: {
            policiesAndRegulations,
            sciAndTechService
        },
        data() {
            return {
                msg: 'vue-temp',
                status: '0'
            }
        },
        methods: {
            switchStatus(status) {
                this.status = status;
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
    .sci-and-tech-policy-audit-wrap {
        background-color: #fff;
        .policie-and-regulation-head {
            margin-top: 22px;
            padding: 0px 40px 30px 40px;
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
