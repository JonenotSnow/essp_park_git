<template>
    <div class="risk-investment-wrap">
        <essp-main-center-sci
            :temeTitle="temeTitle"
            :satpType="satpType"
            :classtType="classtType"
        />
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'risk-investment',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '风险投资',
                temeTitle: "风险投资",
                satpType: '02',     // 政策法规01，科技服务02
                classtType: '07'    // 发布时对应的码值
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .risk-investment-wrap{

    }
</style>
