<template>
    <div class="exam-and-approval-identified-wrap">
        <div class="list-wrap">
            <div class="list__main">
                <ul>
                    <li :class="{'list__list--select' : type==0}" @click="switchDetail(0)">科技型小企业认定</li>
                    <li :class="{'list__list--select' : type==1}" @click="switchDetail(1)">高新技术企业认定</li>
                </ul>
            </div>
        </div>
        <div class="detail-wrap">
            <div class="detail__main">
                <div class="main__head">
                    <h3 v-if="type==0">科技型小企业认定</h3>
                    <h3 v-if="type==1">高新技术企业认定</h3>
                </div>
                <div class="main__body" v-if="type==0">
                    <p>
                        科技型中小企业是指有一定比例的科技人员和一定规模的研发经费投入，拥有自主知识产权或专有技术，通过开展创新活动提供产品或服务的中小企业。
                    </p>
                </div>
                <div class="main__body" v-if="type==1">
                    <p>
                        高新技术企业是指在持续进行研究开发与技术成果转化，形成企业核心自主知识产权，并以此为基础开展经营活动，在中国境内注册的居民企业。
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
        name: 'exam-and-approval-identified',
        props: {},
        components: {},
        data() {
            return {
                msg: '审批认定',
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
                    url = 'http://rd.hebtsn.gov.cn:8080/';
                }
                if (this.type == '1') {
                    url = 'http://gqrd.hebstd.gov.cn:81/';
                }
                window.open(url);
            },

            // 查看政策
            linkToPolicie() {
                let path;
                if (this.type == '0') {
                    path = '/sciIndex/sciAndTechService/familyJuniorIdentify';
                }
                if (this.type == '1') {
                    path = '/sciIndex/sciAndTechService/seniorEnterpriseIdentify';
                }
                this.$router.push({
                    path: path
                });
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .exam-and-approval-identified-wrap {
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
