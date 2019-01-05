<template>
    <div class="risk-investment-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
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
                aipStyle: "getAllInformation",//获取政策法规接口
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
