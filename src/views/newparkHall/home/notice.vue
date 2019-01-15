<template>
    <div class="wrapper">
        <!-- 资讯公告模块 -->
        <div class="content">
            <div class="title">资讯公告</div>
            <div class="introduce">随时随地，一键了解中心动态</div>
            <div class="content">
                <div class="left-aside">
                    <div class="title-s">新闻动态</div>
                    <ul>
                        <li class="item" v-for="(item,index) in 2" :key="index">
                            <div class="word-part">
                                <div class="title-ss">2018年度河北省技术创新引导计划技中···~~``···小···企业技术创新和科技小巨人企业发展专项项目申报指南</div>
                                <div class="detail">2018年度河北省技术创新引导计划技中···~~``···小···企业技术创新和科技小巨人企业发展专项项目申报指南</div>
                                <div class="part-b">
                                    <div class="label"></div>
                                    <div class="time">2018-09-22</div>
                                </div>
                            </div>
                            <div class="img" :style="'background-image:url('+imgUrl+')'"></div>
                        </li>
                    </ul>
                    <div class="more">More ></div>
                </div>
                <div class="right-aside">
                    <div class="title-s">通知公告</div>

                    <ul>
                        <li v-for="(item,index) in 8" :key="index">
                            <div class="left-p">我省今天将建设“24”个示范基地</div>
                            <div class="time">2018-09-22</div>
                        </li>
                    </ul>
                    <div class="more">More ></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: () => ({
            list: [{title: "标题"}],
            imgUrl: require('../../../assets/actlogo.png')
        })
    };
</script>
<style lang="less" scoped>
    .wrapper {
        width: 100%;
        height: 570px;
        background-color: #f5f5f5;
        .content {
            width: 1200px;
            margin: 0 auto;
            .title {
                font-size: 28px;
                letter-spacing: 2px;
                color: #333333;
                margin-bottom: 20px;
                padding-top: 44px;
                text-align: center;
            }
            .introduce {
                font-size: 16px;
                text-align: center;
                color: #999999;
            }
            .more {
                font-size: 14px;
                color: #999999;
                justify-items: right;
                float: right;
                padding: 16px 0 0;
                cursor: pointer;
                &:hover {
                    color: #00a0e9;
                }
            }
            .content {
                margin-top: 32px;
                height: 420px;
                display: flex;
                justify-content: space-between;
                .title-s {
                    font-size: 20px;
                    text-align: left;
                    color: #474747;
                    padding-bottom: 18px;
                }
                .left-aside {
                    width: 570px;
                    ul{
                        border-bottom: solid 1px #cccccc;
                    }
                    .item {
                        height: 160px;
                        display: flex;
                        justify-content: space-around;
                        border-top: solid 1px #cccccc;
                        box-sizing: border-box;
                        align-items: center;
                        &:hover {
                            cursor: pointer;
                        }
                        .word-part {
                            width: 340px;
                            .title-ss {
                                font-size: 16px;
                                letter-spacing: 1px;
                                color: #333333;
                                width: 320px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .detail {
                                display: -webkit-box;
                                font-size: 14px;
                                width: 320px;
                                line-clamp: 2;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                letter-spacing: 1px;
                                color: #777777;
                                margin-top: 17px;
                            }
                            .part-b {
                                display: flex;
                                justify-content: space-between;
                                margin-top: 21px;
                                vertical-align: bottom;
                                width: 320px;
                                .lable {
                                }
                                .time {
                                    font-size: 14px;
                                    color: #777777;
                                }
                            }
                        }
                        .img {
                            width: 210px;
                            height: 120px;
                            vertical-align: middle;
                            background-position: center;
                            background-size: cover;
                            background-repeat: no-repeat;
                        }
                        &:hover {
                            background-color: #fff;
                        }
                    }
                }
                .right-aside {
                    width: 570px;
                    ul {
                        height: 320px;
                        border-bottom: solid 1px #cccccc;
                        li {
                            display: flex;
                            justify-content: space-between;
                            border-top: solid 1px #cccccc;
                            line-height: 39px;
                            vertical-align: middle;
                            &:hover {
                                cursor: pointer;
                            }
                            .left-p {
                                padding-left: 35px;
                                position: relative;
                                width: 335px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: 16px;
                                color: #333;
                                &::before {
                                    content: " ";
                                    position: absolute;
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 50%;
                                    left: 10px;
                                    top: 16px;
                                    background-color: #cccccc;
                                }
                            }
                            &:hover {
                                background-color: #fff;
                            }
                            .time {
                                padding: 0 5px;
                                font-size: 14px;
                                color: #777;
                            }
                        }

                    }
                }
            }
        }
    }
</style>
