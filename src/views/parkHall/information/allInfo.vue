<template>
    <div>
        <!-- 全部资讯模版 -->
        <essp-main-center-info :pageType="aipStyle"></essp-main-center-info>
    </div>
</template>

<script>
    import EsspMainCenterInfo from '@/components/EsspMainCenterInfo';
    import EsspAsideRight from '@/components/EsspAsideRight';
    export default {
        name: "allInfos",
        components: {
            EsspMainCenterInfo,
            EsspAsideRight
        },
        data() {
            return {
                msg: "全部资讯",
                aipStyle:"allInfos",
                
            }
        }
    }
</script>
