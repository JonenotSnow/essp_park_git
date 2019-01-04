<template>
    <div class="angel-investment-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'angel-investment',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '天使投资',
                temeTitle: "天使投资",
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
    .angel-investment-wrap{

    }
</style>
