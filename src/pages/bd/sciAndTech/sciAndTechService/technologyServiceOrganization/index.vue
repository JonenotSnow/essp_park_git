<template>
    <div class="technology-service-organization-wrap">
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
        name: 'technology-service-organization',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '科技服务机构',
                temeTitle: "科技服务机构",
                satpType: '02',     // 政策法规01，科技服务02
                classtType: '06'    // 发布时对应的码值
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .technology-service-organization-wrap {
    }
</style>
