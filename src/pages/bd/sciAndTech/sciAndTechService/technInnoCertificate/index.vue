<template>
    <div class="techn-inno-certificate-wrap">
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
        name: 'techn-inno-certificate',
        props: {},
        components: {
            EsspMainCenterSci
        },
        data() {
            return {
                msg: '科技创新券',
                temeTitle: "科技创新券",
                satpType: '02',     // 政策法规01，科技服务02
                classtType: '01'    // 发布时对应的码值
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
