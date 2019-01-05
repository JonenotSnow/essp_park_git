<template>
    <div class="sci-and-tech-pro-declaration-wrap">
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
                    <h3>科技型小企业认定</h3>
                </div>
                <div class="main__body">
                    <p>
                        关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。
                    </p>
                    <p>
                        关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。关于科技型小企业认定的流程介绍字段。
                    </p>
                </div>
                <div class="main__foot">
                    <button class="btn__deal-with">立即办理</button>
                    <button class="btn__see-policy">查看政策</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sci-and-tech-pro-declaration',
        props: {},
        components: {},
        data() {
            return {
                msg: '科技计划项目申报',
                type: 0,
                isSelect: false
            }
        },
        methods: {
            switchDetail(type) {
                this.type = type;
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .sci-and-tech-pro-declaration-wrap {
        .list-wrap {
            display: inline-block;
            /*float: left;*/
            width: 300px;
            vertical-align: top;
            .list__main {
                margin-top: 50px;
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
                    margin-top: 50px;
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
                    }
                    .btn__see-policy{
                        margin-left: 140px;
                    }
                }

            }
        }

        // 清除浮动
        clear: both;
    }
</style>
