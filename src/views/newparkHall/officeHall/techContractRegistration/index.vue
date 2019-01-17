<template>
    <div class="tech-contract-registration-wrap">
        <div class="list-wrap">
            <div class="list__main">
                <ul>
                    <li :class="{'list__list--select' : type==0}" @click="switchDetail(0)">技术合同登记</li>
                </ul>
            </div>
        </div>
        <div class="detail-wrap">
            <div class="detail__main">
                <div class="main__head">
                    <h3>技术合同登记</h3>
                </div>
                <div class="main__body">
                    <p>
                        技术合同认定登记制度是我国促进产学研合作、推动企业技术创新和促进科技进步的重要举措，国家出台了一系列优惠政策，鼓励技术创新、技术交易，加速技术商品化、市场化、产业化，促进技术转移和科技成果转化。
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
        name: 'tech-contract-registration',
        props: {},
        components: {},
        data() {
            return {
                msg: '技术合同登记',
                type: 0,
            }
        },
        methods: {
            switchDetail(type) {
                this.type = type;
            },

            // 立即处理
            dealWith() {
                window.open("http://www.ctmht.net.cn");
            },

            // 查看政策
            linkToPolicie() {
                sessionStorage.setItem('navIndex','1')
                this.$router.push({
                    path: '/sciIndex/sciAndTechService/techContractRegistration',
                    query:{
                        'navIndex':'1'
                    }
                });
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .tech-contract-registration-wrap {
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
