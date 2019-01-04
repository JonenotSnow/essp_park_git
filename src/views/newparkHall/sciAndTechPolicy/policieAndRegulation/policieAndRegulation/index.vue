<template>
    <div class="policie-and-regulation-wrap">
        <essp-main-center-sci :pageType="aipStyle" :temeTitle="temeTitle"/>
    </div>
</template>

<script>
    import EsspMainCenterSci from '@/components/sciAndTechPolicy/EsspMainCenterSci';

    export default {
        name: 'policie-and-regulation',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '政策法规',
                temeTitle: "政策法规",
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
    .policie-and-regulation-wrap {
    }
</style>
