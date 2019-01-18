<template>
    <div class="achievementSetHead">
        <!--  成果管理已发布 -->
        <!--头部-->
        <achievementSetHead :type="componentTit" :isSeachInput="isSeachInput" :publishTitle="publishTitle"></achievementSetHead>
        <!--列表-->
        <!--<achievementSetCondition v-if="list.length>0" :componentTit="componentTit"></achievementSetCondition>-->
        <div class="seach_items esspclearfix">
            <div class="seach_item">
                <span>成果名称:</span>
                <el-input
                    class="seach_item_input"
                    placeholder="输入成果名称"
                    v-model="form.name">
                </el-input>
            </div>
            <div class="seach_item">
                <span>所属领域:</span>
                <el-select class="seach_item_input" v-model="form.field" placeholder="请输入所属领域">
                    <el-option
                        v-for="(item,index) in searchList"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="seach_item">
                <span>发明人:</span>
                <el-input
                    class="seach_item_input"
                    placeholder="输入发明人"
                    v-model="form.inventor">
                </el-input>
            </div>
            <div class="seach_item">
                <span>所属单位:</span>
                <el-input
                    class="seach_item_input"
                    placeholder="输入所属单位"
                    v-model="form.unit">
                </el-input>
            </div>
            <div class="searchinfo" @click="getAllAchiev">查询</div>
        </div>
        <listOwnImg :list='list' :allCheck="isAllChecked"  @delectList="getAllAchiev" :ajaxTit="ajaxTit" :totalCount='totalCount' :type="componentTit" :componentType="componentType"></listOwnImg>
        <div class="pageList"  v-if="list.length > 0">
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
//    import achievementSetCondition from '@/views/newmanage/components/common/condition'
    import listOwnImg from '@/views/newmanage/components/listOwnImg'

    export default {
        components: {
            achievementSetHead,
//            achievementSetCondition,
            listOwnImg
        },
        data() {
            return {
                form: {
                    name: '', // 成果标题
                    field: '',  // 所属领域
                    photo:'',   // 上传图片
                    title: '',  // 简介
                    detail: '', //编辑器内容
                    inventor: '',   //发明人
                    unit:'',        // 所属单位
                },
                isSeachInput: false,  // 当前是否需要显示搜索框
                ajaxTit:'数据加载中……',
                publishTitle: '立即发布',
                componentTit: '成果管理',
                componentType: 'achievement',
                isAllChecked: false,  // 是否全选
                list: [],
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,
                selectListNum: 0,
                parkId: sessionStorage.getItem("parkId"),
                searchList: [
                    {
                        id: '0',
                        name: '电子信息'
                    }, {
                        id: '1',
                        name: '生物与新医药'
                    }, {
                        id: '2',
                        name: '新材料'
                    }, {
                        id: '3',
                        name: '高新技术服务'
                    }, {
                        id: '4',
                        name: '新能源与节能'
                    }, {
                        id: '5',
                        name: '资源与环境'
                    }, {
                        id: '6',
                        name: '现代农业'
                    }, {
                        id: '7',
                        name: '高端装备制造'
                    }, {
                        id: '8',
                        name: '其他'
                    }
                ]
            }
        },
        created() {
            this.getAllAchiev();
        },
        computed: {},
        methods: {
            // 获取成果列表
            getAllAchiev(){
                this.ajaxTit = "数据加载中……"
                this.$post(this.$apiUrl.achievement.getAllAchiev, {
                    parkId:  this.parkId,
                    pageNum:this.pageNum,   // 页码
                    pageSize: this.pageSize,    // 每页显示数量
                    name: this.form.name, // 成果标题
                    field: this.form.field,  // 所属领域
                    photo: this.form.photo,   // 上传图片
                    title: this.form.title,  // 简介
                    detail: this.form.detail, //编辑器内容
                    inventor: this.form.inventor,   //发明人
                    unit:this.form.unit        // 所属单位
                }).then(
                    response => {
                        var arr = response.resultData.achievList;
                        arr.forEach((item,index) => {
                            if(!item.isChecked) {
                                this.$set(item,"isChecked", false);
                            } else {
                                item.isChecked = false;
                            }
                        })
                        this.list = arr;
                        console.log("this.list ",this.list );
                        this.totalCount = response.resultData.total;
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
                this.isAllChecked = false;
                this.getAllAchiev();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.isAllChecked = false;
                this.getAllAchiev();
            }
        },
    }
</script>
<style>
    .seach_item .seach_item_input input,
    .seach_item  .el-input__icon {
        height: 30px;
        line-height: 30px;
    }

</style>
<style lang='less' scoped>
    .achievementSetHead {
        background: #fff;
        .pageList {
            width: 910px;
            margin: 45px auto 57px;
            text-align: right;
            padding-bottom: 57px;
        }
        .seach_items {
            padding: 23px 42px 0;
            .seach_item {
                float: left;
                width: 271px;
                margin-right: 20px;
                margin-bottom: 20px;
            }
            .seach_item span,
            .seach_item .seach_item_input {
                float: left;
                line-height: 30px;
                height: 30px;
            }
            .seach_item span {
                width: 65px;
                text-align: right;
                padding-right: 5px;
            }
            .seach_item .seach_item_input {
                width: 200px;
            }
            .searchinfo{
                float: left;
                display: inline-block;
                width: 90px;
                height: 30px;
                background-image: linear-gradient(21deg,
                #22a2fa 0%,
                #10b5ff 100%),
                linear-gradient(
                    #00a0e9,
                    #00a0e9);
                background-blend-mode: normal,
                normal;
                border-radius: 3px;
                font-size: 12px;
                line-height: 30px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #ffffff;
                text-align: center;
                cursor: pointer;
            }
        }


    }
</style>
