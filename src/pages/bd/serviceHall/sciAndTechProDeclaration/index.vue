<template>
    <div class="sci-and-tech-pro-declaration-wrap">
        <div class="list-wrap">
            <div class="list__main">
                <ul>
                    <li :class="{'list__list--select' : type==0}" @click="switchDetail(0)">保定市科技项目申报</li>
                    <li :class="{'list__list--select' : type==1}" @click="switchDetail(1)">河北省科技项目申报</li>
                </ul>
            </div>
        </div>
        <div class="detail-wrap">
            <div class="detail__main">
                <div class="main__head">
                    <h3 v-if="type==0">保定市科技项目申报</h3>
                    <h3 v-if="type==1">河北省科技项目申报</h3>
                </div>
                <div class="main__body" v-if="type==0">
                    <p>
                        保定市市级科学技术研究与发展计划项目是根据经济、社会和科技发展需求，在市科技计划中安排的，由市级财政资金支持的科学技术研究开发活动。
                    </p>
                </div>
                <div class="main__body" v-if="type==1">
                    <p>
                        河北省省级科技计划项目是指河北省科技厅根据经济、社会和科技发展需求，在省科技计划中安排的，由省级财政资金支持的科学技术研究开发活动。
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
        name: 'sci-and-tech-pro-declaration',
        props: {},
        components: {},
        data() {
            return {
                msg: '科技计划项目申报',
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
                    url = 'http://121.18.64.248:81/bdkjjh/index/index!index.do';
                }
                if (this.type == '1') {
                    url = 'http://jhpt.hebstd.gov.cn:81/index/index!index.do';
                }
                window.open(url);
            },

            // 查看政策
            linkToPolicie() {
                this.$router.push({
                    path: '/sciIndex/sciAndTechService/technologyServiceOrganization'
                });
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
