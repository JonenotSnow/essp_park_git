<template>
    <div class="intellectual-property-wrap">
        <essp-main-center-sci
            :temeTitle="temeTitle"
            :satpType="satpType"
            :classtType="classtType"
        />
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
                satpType: '02',     // 政策法规01，科技服务02
                classtType: '05'    // 发布时对应的码值
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
