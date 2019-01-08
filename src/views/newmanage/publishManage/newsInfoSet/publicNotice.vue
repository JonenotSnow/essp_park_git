<template>
    <div class="policie-and-regulation-wrap">
        <div class="policie-and-regulation-head">
            <div class="head-div head-left">
                <span v-for="(item,index) in itemsouces" :key="index" :class="{'span-click': status==index}" @click="switchStatus(index)">{{item.fnName}}</span>
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
                        <span @click="goToPublish()">立即发布</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="policie-and-regulation-main">
            <list-only-status :list="dataList" :type="type" v-if="status=='0' || status=='2'"/>
            <list-no-status-and-classify :list="dataList" v-if="status=='1'"/>
        </div>
    </div>
</template>

<script>

    import listOnlyStatus from './common/listOnlyStatus';
    import listNoStatusAndClassify from './common/listNoStatusAndClassify';

    export default {
        name: 'policie-and-regulation',
        props: {},
        components: {
            listOnlyStatus,
            listNoStatusAndClassify
        },
        data() {
            return {
                msg: '政策法规',
                
                status: '0',                // 状态值
                searchContent: '',          // 查询字段
                type: '0',   //
                dataList: 2,
                itemsouces:[
                    {
                      fnName:"已发布",
                      status:0
                    },
                    {
                      fnName:"草稿箱",
                      status:1

                    },
                    {
                      fnName:"已审核",
                      status:2

                    }
                ]
            }
        },
        methods: {
            // 状态切换
            switchStatus(status) {
                this.status = status;
                this.type = status;
            },

            // 查询事件
            search() {
                alert('查询事件');
            },
            goToPublish(){
              this.$router.push('/news/addNotice')
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
                            height: 33px;
                            line-height: 33px;
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
