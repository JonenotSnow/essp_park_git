<template>

    <div>
        <!-- 我关注的惠政模块 -->
        <essp-main-center-t :pageType="aipstyle"></essp-main-center-t>
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
                msg: "我关注的惠政",
                aipstyle:"myFollPol"
            }
        },
        methods: {

        },
    }
</script>

<style>

</style>
