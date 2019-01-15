<template>
    <div class="inno-and-entre-competition-wrap">
        <div class="list-wrap">
            <div class="list__main">
                <ul>
                    <li :class="{'list__list--select' : type==0}" @click="switchDetail(0)">创新创业大赛</li>
                </ul>
            </div>
        </div>
        <div class="detail-wrap">
            <div class="detail__main">
                <div class="main__head">
                    <h3>创新创业大赛</h3>
                </div>
                <div class="main__body">
                    <p>
                        河北省创新创业大赛是省科技厅推进大众创业、万众创新的一项重要赛事。大赛分为初赛、行业赛、全省总决赛三个阶段，涵盖电子信息、新材料、新能源及节能环保、生物医药、先进制造、互联网及军民融合项目比赛。其中全省行业赛、总决赛均采用现场答辩的评选模式，赛事全程公开和公示。创新创业大赛在缓解中小企业融资难、为创业团队提供多元化服务和营造创新创业氛围等方面取得了显著成效。
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
        name: 'inno-and-entre-competition',
        props: {},
        components: {},
        data() {
            return {
                msg: '创新创业大赛',
                type: 0,
            }
        },
        methods: {
            switchDetail(type) {
                this.type = type;
            },

            // 立即处理
            dealWith() {
                window.open("http://www.hbscxcyds.com/");
            },

            // 查看政策
            linkToPolicie() {
                this.$router.push({
                    path: '/sciIndex/policieAndRegulation/policieAndRegulation'
                });
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .inno-and-entre-competition-wrap {
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
