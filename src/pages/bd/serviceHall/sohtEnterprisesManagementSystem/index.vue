<template>
    <div class="soht-enterprises-management-system-wrap">
        <div class="list-wrap">
            <div class="list__main">
                <ul>
                    <li :class="{'list__list--select' : type==0}" @click="switchDetail(0)">科技部火炬计划调查信息系统</li>
                    <li :class="{'list__list--select' : type==1}" @click="switchDetail(1)">河北省高新技术统计信息网</li>
                    <li :class="{'list__list--select' : type==2}" @click="switchDetail(2)">河北省高新技术企业认定管理系统</li>
                </ul>
            </div>
        </div>
        <div class="detail-wrap">
            <div class="detail__main">
                <div class="main__head">
                    <h3 v-if="type==0">科技部火炬计划调查信息系统</h3>
                    <h3 v-if="type==1">河北省高新技术统计信息网</h3>
                    <h3 v-if="type==2">河北省高新技术企业认定管理系统</h3>
                </div>
                <div class="main__body" v-if="type==0">
                    <p>
                        火炬统计调查制度是经国家统计局审批备案的科技部门专项统计调查项目之一，是一项重要的基础性统计工作。填报时间：每年3月份前。
                    </p>
                </div>
                <div class="main__body" v-if="type==1">
                    <p>
                        为及时掌握全省高新技术企业经营情况，省科技厅决定开展季度统计调查工作。
                        填报时间：每年1月、4月、7月、10月的1号到15号。

                    </p>
                </div>
                <div class="main__body" v-if="type==2">
                    <p>
                        为全面掌握高新技术企业发展情况，进一步做好高新技术企业认定管理工作。省科技厅决定开展全省高新技术企业统计、分析工作。填报时间：季报为每年1月、4月、7月、10月的1号到10号。年报为每年3月份前。
                    </p>
                </div>
                <div class="main__foot">
                    <button class="btn__deal-with" @click.stop="dealWith()">立即办理</button>
                    <button class="btn__see-policy" @click.stop="linkToPolicie()">查看政策</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'soht-enterprises-management-system',
        props: {},
        components: {},
        data() {
            return {
                msg: '高新科技企业统计管理系统',
                type: 0,
            }
        },
        methods: {
            switchDetail(type) {
                this.type = type;
            },

            // 立即处理
            dealWith() {
                let url;
                if (this.type == '0') {
                    url = 'https://tyrz.chinatorch.gov.cn/hjismp/a/login#tj';
                }
                if (this.type == '1') {
                    url = 'http://gxtj.heinfo.gov.cn/Index/Main.asp';
                }
                if (this.type == '2') {
                    url = 'http://gqrd.hebstd.gov.cn:81/';
                }
                window.open(url);
            },

            // 查看政策
            linkToPolicie() {
                this.$router.push({
                    path: '/sciIndex/policieAndRegulation/policieAndRegulatio'
                });
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .soht-enterprises-management-system-wrap {
        .list-wrap {
            display: inline-block;
            /*float: left;*/
            width: 300px;
            vertical-align: top;
            .list__main {
                /*margin-top: 50px;*/
                background-color: #f8f8f8;
                ul {
                    padding: 5px 10px 30px 10px;
                    li {
                        margin-top: 25px;
                        width: 280px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #666;
                        border-radius: 3px;
                        &:hover {
                            color: #fff;
                            background-color: #00a0e9;
                            cursor: pointer;
                        }
                    }
                    .list__list--select {
                        color: #fff;
                        background-color: #00a0e9;
                    }
                }
            }
        }

        .detail-wrap {
            display: inline-block;
            /*float: left;*/
            // 理应40个像素，但是父层用了display: inline-block会自带5像素的偏移，所以这个用35像素
            margin-left: 35px;
            padding-bottom: 60px;
            width: 860px;
            .detail__main {
                .main__head {
                    height: 50px;
                    line-height: 40px;
                    text-align: center;
                    h3 {
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0.9px;
                        color: #333333;
                    }
                }

                .main__body {
                    margin: 20px auto 0;
                    width: 800px;
                    p {
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 24px;
                        text-indent: 2em;
                        letter-spacing: 0.7px;
                        color: #999999;
                    }
                }

                .main__foot {
                    margin-top: 100px;
                    text-align: center;
                    button {
                        width: 145px;
                        height: 40px;
                        line-height: 40px;
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0.5px;
                        color: #fefefe;
                        border-radius: 5px;
                        border: none;
                        background-color: #00a0e9;
                        cursor: pointer;
                    }
                    .btn__see-policy {
                        margin-left: 140px;
                    }
                }

            }
        }

        // 清除浮动
        clear: both;
    }
</style>
