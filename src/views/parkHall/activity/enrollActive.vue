<template>
    <div>
        <!-- 我报名的活动模版 -->
        <essp-main-center :pageType="aipStyle"></essp-main-center>
    </div>
</template>

<script>
    import EsspMainCenter from '@/components/EsspMainCenter';

    export default {
        name: "",
        components: {
            EsspMainCenter,
        },
        data() {
            return {
                msg: "全部活动",
                aipStyle: "actEnroll",//传参数获取列表
            }
        },
        methods: {},
    }
</script>

<style>

</style>
