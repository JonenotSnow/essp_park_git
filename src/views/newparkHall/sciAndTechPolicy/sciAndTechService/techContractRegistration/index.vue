<template>
    <div class="tech-contract-registration-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'tech-contract-registration',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '技术合同登记',
                temeTitle: "技术合同登记",
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
    .tech-contract-registration-wrap{}
</style>
