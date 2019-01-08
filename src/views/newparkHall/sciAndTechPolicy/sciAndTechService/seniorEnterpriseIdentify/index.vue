<template>
    <div class="senior-enterprise-identify-wrap">
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
        name: 'senior-enterprise-identify',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '高企认定',
                temeTitle: "高企认定",
                satpType: '02',     // 政策法规01，科技服务02
                classtType: '03'    // 发布时对应的码值
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
