<template>
    <div id="platformAtivity">
        <p class="title">平台活动</p>
        <div class="policie-and-regulation-head">
            <div class="head-div head-left">
                <span :class="{'span-click': status=='0'}" @click="switchStatus(0)">已发布</span>
                <span :class="{'span-click': status=='1'}" @click="switchStatus(1)">草稿箱</span>
                <span :class="{'span-click': status=='2'}" @click="switchStatus(2)">已审核</span>
            </div>
            <div class="head-div head-right">
                <div class="right-div search-wrap">
                    <div class="searchBox">
                        <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
                        <i class="icon iconfont icon-sousuo" @click="search()"></i>
                    </div>
                </div>
                <div class="right-div publish-btn-wrap">
                    <p class="publish-btn"  @click="$router.push('/parkHall/manage/publishPlatformAtivity')">
                        <i class="el-icon-circle-plus"></i>
                        <span>立即发布</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="policie-and-regulation-main">
            <list-only-status :list="dataList" :type="type" v-if="status=='0' || status=='2'"/>
            <list-no-status-and-classify :list="dataList" v-if="status=='1'"/>
        </div>
        <div class="pageList" v-if="list.length>0">
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
    import listOnlyStatus from './common/listOnlyStatus';
    import listNoStatusAndClassify from './common/listNoStatusAndClassify';
    export default {
        components: {
            listOnlyStatus,
            listNoStatusAndClassify
        },
        data() {
            return {
                status: '0',                // 状态值
                searchContent: '',          // 查询字段
                type: '0',   //
                dataList: 2,
                totalCount:0,
                pageNum:1,
                pageSize:5
            }
        },
        created() {

        },
        computed: {

        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageNum = val;
            },
            
            // 状态切换
            switchStatus(status) {
                this.status = status;
                this.type = status;
            },

            // 查询事件
            search() {
                alert('查询事件');
            }
        },

    }
</script>

<style lang='less' scoped>
#platformAtivity{
    background: #fff;
    .title{
        width:910px;
        margin:0 auto;
        margin: 0 auto 27px;
        padding-top: 48px;
        font-size: 18px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #00a0e9;
    }
        .policie-and-regulation-head {
            margin-top: 22px;
            padding-left: 40px;
            padding-right: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid #ccc;
            .head-div {
                display: inline-block;
                vertical-align: top;
            }

            .head-left {
                padding-top: 3px;
                span {
                    display: inline-block;
                    margin-right: 15px;
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999;
                    border-radius: 3px;
                    border: solid 1px #ccc;
                    &:hover {
                        color: #fff;
                        border: solid 1px #00a0e9;
                        background-color: #00a0e9;
                        cursor: pointer;
                    }
                }

                .span-click {
                    color: #fff;
                    border: solid 1px #00a0e9;
                    background-color: #00a0e9;
                }
            }

            .head-right {
                float: right;
                .right-div {
                    display: inline-block;
                }

                .search-wrap {
                    .searchBox {
                        width: 198px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: 17.5px;
                        border: solid 1px #cccccc;
                        input {
                            margin-left: 18px;
                            width: 150px;
                            height: 35px;
                            line-height: 35px;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #ccc;
                            outline: none;
                            border: none;
                        }
                        input::-webkit-input-placeholder {
                            color: #ccc;
                        }
                        input::-moz-placeholder { /* Mozilla Firefox 19+ */
                            color: #ccc;
                        }
                        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                            color: #ccc;
                        }
                        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                            color: #ccc;
                        }

                        i {
                            width: 17px;
                            height: 17px;
                            color: #ccc;
                            cursor: pointer;
                        }
                    }
                }

                .publish-btn-wrap {
                    margin-top: 2px;
                    margin-left: 15px;
                    vertical-align: top;
                    .publish-btn {
                        width: 130px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #ffffff;
                        border-radius: 3px;
                        background-color: #00a0e9;
                        cursor: pointer;
                    }
                }

            }
        }

        .policie-and-regulation-main {

        }
}

</style>
