<template>
    <div class="policie-and-regulation-wrap">
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
        <div class="policie-and-regulation-main">
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
        name: 'policie-and-regulation',
        props: {},
        components: {
            listOnlyStatus,
            listNoStatusAndClassify,
            listStatusAndClassify
        },
        data() {
            return {
                msg: '政策法规',
                status: '0',
                searchContent: '',
                type: 'sciAndTechPolicy',
                dataList: 2
            }
        },
        methods: {
            switchStatus(status) {
                this.status = status;
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .policie-and-regulation-wrap {
        .policie-and-regulation-head {
            margin-top: 22px;
            margin-left: 40px;
            margin-right: 40px;
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
                        float: right;
                        line-height: 30px;
                        .notice {
                            font-size: 14px;
                            font-weight: normal;
                            letter-spacing: 0px;
                            color: #999999;
                            margin-right: 20px;
                        }
                        input {
                            width: 158px;
                            height: 33px;
                            border-radius: 17.5px;
                            border: solid 1px #cccccc;
                            outline: none;
                            padding: 0 20px;
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
