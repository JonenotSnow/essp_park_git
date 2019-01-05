<template>
    <div class="family-junior-identify-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'family-junior-identify',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '科小认定',
                temeTitle: "科小认定",
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
    .family-junior-identify-wrap{

    }
</style>
