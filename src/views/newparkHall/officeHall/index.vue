<template>
    <div class="office-hall-wrap">
        <div class="carousel-wrap">
            <img :src="bgImg" alt="bgImg">
            <!--<div class="carousel">-->
            <!--<el-carousel height="400px">-->
            <!--<el-carousel-item v-for="(item,index) in carouselImg" :key="index">-->
            <!--<img :src="item.img" alt="轮播图">-->
            <!--</el-carousel-item>-->
            <!--</el-carousel>-->
            <!--</div>-->
        </div>
        <div class="main-wrap">
            <ul class="link">
                <li class="link__li link__li--01">
                    <div class="link__li--word">
                        <p @click="linkTo01('01')">科技计划项目申报</p>
                    </div>
                    <div :class="{'link__li--tag': active === '01'}"></div>
                </li>
                <li class="link__li link__li--02">
                    <div class="link__li--word">
                        <p @click="linkTo02('02')">技术合同登记</p>
                    </div>
                    <div :class="{'link__li--tag': active === '02'}"></div>
                </li>
                <li class="link__li link__li--03">
                    <div class="link__li--word">
                        <p @click="linkTo03('03')">审批认定</p>
                    </div>
                    <div :class="{'link__li--tag': active === '03'}"></div>
                </li>
                <li class="link__li link__li--04">
                    <div class="link__li--word">
                        <p @click="linkTo04('04')">知识产权申报</p>
                    </div>
                    <div :class="{'link__li--tag': active === '04'}"></div>
                </li>
                <li class="link__li link__li--05">
                    <div class="link__li--word">
                        <p @click="linkTo05('05')">创新劵管理</p>
                    </div>
                    <div :class="{'link__li--tag': active === '05'}"></div>
                </li>
                <li class="link__li link__li--06">
                    <div class="link__li--word">
                        <p @click="linkTo06('06')">创新创业大赛</p>
                    </div>
                    <div :class="{'link__li--tag': active === '06'}"></div>
                </li>
                <li class="link__li link__li--07">
                    <div class="link__li--word">
                        <p @click="linkTo07('07')">高新科技企业统计管理系统</p>
                    </div>
                    <div :class="{'link__li--tag': active === '07'}"></div>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import EsspSelectTag from '@/components/officeHall/EsspSelectTag';

    export default {
        name: 'office-hall',
        props: {},
        components: {
            EsspSelectTag
        },
        data() {
            return {
                msg: '办事大厅',
                bgImg: require('@/assets/newparkimg/officeHall/office-hall-bg.jpg'),
                active: '01',
                carouselImg: [
                    {img: require('@/assets/newparkimg/officeHall/01.png')},
                    {img: require('@/assets/newparkimg/officeHall/02.png')},
                    {img: require('@/assets/newparkimg/officeHall/03.png')},
                    {img: require('@/assets/newparkimg/officeHall/04.png')},
                    {img: require('@/assets/newparkimg/officeHall/05.png')},
                    {img: require('@/assets/newparkimg/officeHall/06.png')},
                    {img: require('@/assets/newparkimg/officeHall/07.png')}
                ]
            }
        },
        methods: {
            linkTo(path) {
                this.$router.push({
                    path: path
                });
            },
            linkTo01(activeValue) {
                this.active = activeValue;
                let path = '/officeHall/sciAndTechProDeclaration';
                this.linkTo(path);
            },
            linkTo02(activeValue) {
                this.active = activeValue;
                let path = '/officeHall/techContractRegistration';
                this.linkTo(path);
            },
            linkTo03(activeValue) {
                this.active = activeValue;
                let path = '/officeHall/examAndApprovalIdentified';
                this.linkTo(path);
            },
            linkTo04(activeValue) {
                this.active = activeValue;
                let path = '/officeHall/intellectualPropertyDeclaration';
                this.linkTo(path);
            },
            linkTo05(activeValue) {
                this.active = activeValue;
                let path = '/officeHall/innovativeSecuritiesManagement';
                this.linkTo(path);
            },
            linkTo06(activeValue) {
                this.active = activeValue;
                let path = '/officeHall/innoAndEntreCompetition';
                this.linkTo(path);
            },
            linkTo07(activeValue) {
                this.active = activeValue;
                let path = '/officeHall/sohtEnterprisesManagementSystem';
                this.linkTo(path);
            },
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .office-hall-wrap {
        background-color: #fff;
        .carousel-wrap {
            width: 100%;
            height: 400px;
            img {
                width: 100%;
                height: 100%;
            }
            /*.carousel {*/
            /*img {*/
            /*width: 100%;*/
            /*height: 100%;*/
            /*}*/
            /*}*/
        }

        .main-wrap {
            margin: 0 auto;
            width: 1200px;
            background-color: #fff;
            .link {
                margin-top: 20px;
                margin-bottom: 60px;
                .link__li {
                    display: inline-block;
                    width: 160px;
                    height: 90px;
                    text-align: justify;
                    vertical-align: top;
                    .link__li--word {
                        height: 80px;
                        p {
                            padding-top: 29px;
                            text-align: center;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #ffffff;
                            cursor: pointer;
                        }
                    }
                    .link__li--tag {
                        height: 10px;
                        background: url("./../../../assets/newparkimg/officeHall/office-hall-tag.png") no-repeat center;
                    }
                }

                .link__li--01 {
                    .link__li--word {
                        background: url("./../../../assets/newparkimg/officeHall/01.png");
                    }
                }
                .link__li--02 {
                    margin-left: 9px;
                    .link__li--word {
                        background: url("./../../../assets/newparkimg/officeHall/02.png");
                    }
                }
                .link__li--03 {
                    margin-left: 9px;
                    .link__li--word {
                        background: url("./../../../assets/newparkimg/officeHall/03.png");
                    }
                }
                .link__li--04 {
                    margin-left: 9px;
                    .link__li--word {
                        background: url("./../../../assets/newparkimg/officeHall/04.png");
                    }
                }
                .link__li--05 {
                    margin-left: 9px;
                    .link__li--word {
                        background: url("./../../../assets/newparkimg/officeHall/05.png");
                    }
                }
                .link__li--06 {
                    margin-left: 9px;
                    .link__li--word {
                        background: url("./../../../assets/newparkimg/officeHall/06.png");
                    }
                }
                .link__li--07 {
                    margin-left: 9px;
                    .link__li--word {
                        background: url("./../../../assets/newparkimg/officeHall/07.png");
                        p {
                            padding: 19px 15px 0;
                        }
                    }

                }
            }
        }

    }
</style>
