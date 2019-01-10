<template>
    <div class="tech-contract-registration-wrap">
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
        name: 'tech-contract-registration',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '技术合同登记',
                temeTitle: "技术合同登记",
                satpType: '02',     // 政策法规01，科技服务02
                classtType: '02'    // 发布时对应的码值
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .tech-contract-registration-wrap{}
</style>
