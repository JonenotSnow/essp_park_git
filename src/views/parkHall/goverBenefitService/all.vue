<template>
    <div>
        <!-- 全部惠政模块 -->
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
                msg: "全部惠政",
                aipStyle:"allPolicy"
            }
        },
        methods: {
            
        },
    }
</script>

<style>

</style>
