<template>
    <div class="achievementSetHead">
        <!--  成果管理已发布 -->
        <achievementSetHead :type="componentTit" :isSeachInput="isSeachInput" :publishTitle='publishTitle' @seachConFn="seachConFn"></achievementSetHead>
        <listOwnImg ref="listModule" :list='list' :allChecks="isAllChecked" @delectList="getAllAchiev" :ajaxTit="ajaxTit" :totalCount='totalCount' :type="componentTit" :componentType="componentType"></listOwnImg>
        <div class="pageList" v-if="list.length > 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import achievementSetHead from './../../components/common/head'
    import achievementSetCondition from './../../components/common/condition'
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
                componentTit: '专家团队',
                title: '',  // 搜索关键词
                componentType: 'expertItem',
                list: [],
                isSeachInput: true,
                isAllChecked: false, // 是否全选
                ajaxTit: '数据加载中……',
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,
                selectListNum: 0,
                parkId: sessionStorage.getItem("parkId")
            }
        },
        created() {
            this.getAllAchiev();
        },
        methods: {
            // 子组件返回的搜索关键字
            seachConFn(val){
                this.title = val;
                this.getAllAchiev();
                console.log(val);
            },
            // 获取专家团队列表
            getAllAchiev(){
                this.ajaxTit = "数据加载中……"
                this.list = []
                this.$post(this.$apiUrl.achievement.getExpertInfo, {
                    parkId:  this.parkId,
                    pageNum:this.pageNum,        // 页码
                    pageSize: this.pageSize,    // 每页显示数量
                    title: this.title,          // 搜索关键词
                }).then(
                    response => {
                        var arr = response.resultData.expertList;
                        arr.forEach((item,index) => {
                            if(!item.isChecked) {
                                this.$set(item,"isChecked", false);
                            } else {
                                item.isChecked = false;
                            }
                        })
//
                        this.list = arr;
                        console.log("this.list ",this.list );
                        this.totalCount = response.resultData.total;
                        this.$refs.listModule.changeAllCheck(false);
                        console.log(this.totalCount);
                        this.ajaxTit = "数据加载完毕"

                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getAllAchiev();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getAllAchiev();
            }
        }
    }
</script>

<style lang='less' scoped>
    .achievementSetHead {
        background: #fff;
    }
    .pageList {
        width: 910px;
        margin: 45px auto 57px;
        text-align: right;
        padding-bottom: 57px;
    }
</style>
