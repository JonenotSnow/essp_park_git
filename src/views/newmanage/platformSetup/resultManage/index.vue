<template>
    <div class="achievementSetHead">
        <!--  成果管理已发布 -->
        <achievementSetHead :type=type :publishTitle="publishTitle"></achievementSetHead>
        <achievementSetCondition v-if="list.length>0"></achievementSetCondition>
        <listOwnImg :list='list' :type=type></listOwnImg>
        <div class="pageList">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import achievementSetHead from '@/views/newmanage/components/common/head'
    import achievementSetCondition from '@/views/newmanage/components/common/condition'
    import listOwnImg from '@/views/newmanage/components/listOwnImg'

    export default {
        components: {
            achievementSetHead,
            achievementSetCondition,
            listOwnImg
        },
        data() {
            return {
                publishTitle: '立即发布',
                type: '成果管理',
                list: 5,
                totalCount: 0,
                pageNum: 1,
                pageSize: 5
            }
        },
        created() {

        },
        computed: {},
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageNum = val;
            }
        },
    }
</script>

<style lang='less' scoped>
    .achievementSetHead {
        background: #fff;
        .pageList {
            width: 910px;
            margin: 45px auto 57px;
            text-align: right;
            padding-bottom: 57px;
        }
    }
</style>
