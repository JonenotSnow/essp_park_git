<template>
    <div>
        <!-- 我关注的资讯 -->
        <essp-main-center-info :pageType="aipStyle"></essp-main-center-info>
        
    </div>
</template>
<script>
    import EsspMainCenterInfo from '@/components/EsspMainCenterInfo';
    import EsspAsideRight from '@/components/EsspAsideRight';
    export default {
        name: "",
        components: {
            EsspMainCenterInfo,
            EsspAsideRight
        },
        data() {
            return {
                msg: "我关注的资讯",
                aipStyle:"followInfo"
            }
        }
    }
</script>

