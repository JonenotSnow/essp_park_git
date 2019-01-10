<template>
    <div>
        <!-- 我关注的活动模块 -->
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
                aipStyle:"actFollow"
            }
        },
        methods: {
           
        },
    }
</script>

<style>

</style>
