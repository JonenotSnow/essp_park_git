<template>
    <div>
        <out-route :outsource="outsource"></out-route>
    </div>
</template>

<script>

    import outRoute from './../../components/outRoute.vue';

    export default {
        components: {
            outRoute
        },
        data() {
            return {
                msg: "数据管理",
                outsource: [
                    {
                        name: '政策法规',
                        path: '/parkHall/manage/sciAndTechPolicy/policieAndRegulation'
                    },
                    {
                        name: '科技服务',
                        path: '/parkHall/manage/sciAndTechPolicy/sciAndTechService'
                    }
                ]
            }
        },
        created() {

        },
        computed: {},

    }
</script>

<style lang='less' scoped>


</style>
