<template>
    <div class="intellectual-property-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'intellectual-property',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '知识产权',
                temeTitle: "知识产权",
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
    .intellectual-property-wrap{

    }
</style>
