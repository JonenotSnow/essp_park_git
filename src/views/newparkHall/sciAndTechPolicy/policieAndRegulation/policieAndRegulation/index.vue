<template>
    <div class="policie-and-regulation-wrap">
        <essp-main-center-sci :temeTitle="temeTitle" :satpType="satpType"/>
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
                msg: '政策法规页面',
                temeTitle: "政策法规",
                satpType: '01'  // 政策法规01，或科技服务02
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
