<template>
    <div>
        <!-- 我报名的活动模版 -->
        <essp-main-center-t :pageType="aipStyle"></essp-main-center-t>
    </div>
</template>

<script>
    import EsspMainCenterT from '@/components/EsspMainCenterT';

    export default {
        name: "",
        components: {
            EsspMainCenterT,
        },
        data() {
            return {
                msg: "全部活动",
                aipStyle: "getMyApply",//传参数获取列表
            }
        },
        methods: {},
    }
</script>

<style>

</style>
