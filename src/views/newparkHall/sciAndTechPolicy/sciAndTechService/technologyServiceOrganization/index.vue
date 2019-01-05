<template>
    <div class="technology-service-organization-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'technology-service-organization',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '科技服务机构',
                temeTitle: "科技服务机构",
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
    .technology-service-organization-wrap{}
</style>
