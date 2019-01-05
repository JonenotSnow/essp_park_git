<template>
    <div class="techn-inno-certificate-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'techn-inno-certificate',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '科技创新券',
                temeTitle: "科技创新券",
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
    .techn-inno-certificate-wrap{}
</style>
