<template>
    <div class="sci-a1nd-tech-service-wrap">
        <div class="sci-a1nd-tech-service-head">
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
                    <p class="publish-btn">
                        <i class="el-icon-circle-plus"></i>
                        <span @click="$router.push('/parkHall/manage/publishSciAndTechPolicy')">立即发布</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="sci-a1nd-tech-service-main">
            <list-only-status :list="dataList" :type="type" v-if="status=='0'"/>
            <list-no-status-and-classify :list="dataList" :type="type" v-if="status=='1'"/>
            <list-status-and-classify :list="dataList" :type="type" v-if="status=='2'"/>
        </div>
    </div>
</template>

<script>
    import listOnlyStatus from './../../components/listOnlyStatus.vue';
    import listNoStatusAndClassify from './../../components/listNoStatusAndClassify.vue';
    import listStatusAndClassify from './../../components/listStatusAndClassify.vue';

    export default {
        name: 'sci-and-tech-service',
        props: {},
        components: {
            listOnlyStatus,
            listNoStatusAndClassify,
            listStatusAndClassify
        },
        data() {
            return {
                msg: '科技服务',
                status: '0',                // 状态值
                searchContent: '',          // 查询字段
                type: 'sciAndTechPolicy',   //
                dataList: 2
            }
        },
        methods: {
            // 状态切换
            switchStatus(status) {
                this.status = status;
            },

            // 查询事件
            search() {
                alert('查询事件');
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .sci-a1nd-tech-service-wrap {
        .sci-a1nd-tech-service-head {
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

        .sci-a1nd-tech-service-main {

        }
    }
</style>
