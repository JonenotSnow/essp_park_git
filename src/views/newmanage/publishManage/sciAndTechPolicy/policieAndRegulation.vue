<template>
    <div>
        {{msg}}
        <p>sciAndTechPolicy</p>
        <span @click="$router.push('/parkHall/manage/publishSciAndTechPolicy')">去发布</span>
        <span @click="$router.push('/parkHall/manage/sciAndTechPolicyAuditDetail')">审核详情</span>
        <hr>
        <list-only-status :list="dataList" :type="type"/>
    </div>
</template>

<script>

    import listOnlyStatus from './../../components/listOnlyStatus.vue';

    export default {
        name: 'policie-and-regulation',
        props: {},
        components: {
            listOnlyStatus
        },
        data() {
            return {
                msg: '政策法规',
                type: 'sciAndTechPolicy',
                dataList: 2
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
