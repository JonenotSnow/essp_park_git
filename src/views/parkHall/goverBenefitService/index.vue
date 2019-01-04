<template>
    <div>
        {{msg}}
        <!-- 活动介绍模块 -->
        <activity-brief></activity-brief>
        <essp-published-card></essp-published-card>
    </div>
</template>

<script>
    import EsspPublishedCard from '@/components/EsspPublishedCard';
    import ActivityBrief from '@/views/parkHall/goverBenefitService/ActivityBrief';

    export default {
        name: "",
        components:{
            EsspPublishedCard,
            ActivityBrief
        },
        data() {
            return {
                msg: "政惠服务"
            }
        }
    }
</script>

<style scoped>

</style>
