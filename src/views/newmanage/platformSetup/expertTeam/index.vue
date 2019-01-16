<template>
    <div class="achievementSetHead">
        <!--  成果管理已发布 -->
        <achievementSetHead :type=type :publishTitle='publishTitle'></achievementSetHead>
        <expertItemList :list='list' :type=type></expertItemList>
    </div>
</template>

<script>
    import achievementSetHead from './../../components/common/head'
    import achievementSetCondition from './../../components/common/condition'
    import expertItemList from './../../components/expertItemList'

    export default {
        components: {
            achievementSetHead,
            achievementSetCondition,
            expertItemList
        },
        data() {
            return {
                type: '专家团队',
                publishTitle: '发布专家',
                list: []
            }
        },
        created() {

        },
        computed: {}
    }
</script>

<style lang='less' scoped>
    .achievementSetHead {
        background: #fff;
    }
</style>
