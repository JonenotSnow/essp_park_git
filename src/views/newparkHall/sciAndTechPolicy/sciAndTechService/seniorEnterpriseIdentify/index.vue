<template>
    <div class="senior-enterprise-identify-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'senior-enterprise-identify',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '高企认定',
                temeTitle: "高企认定",
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
    .senior-enterprise-identify-wrap {
    }
</style>
