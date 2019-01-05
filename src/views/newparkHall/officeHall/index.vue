<template>
    <div class="office-hall-wrap">
        <div class="carousel-wrap">
            <div class="carousel">
                <el-carousel height="400px">
                    <el-carousel-item v-for="(item,index) in carouselImg" :key="index">
                        <img :src="item.img" alt="轮播图">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="main-wrap">
            <ul class="link">
                <li class="link__li link__li--01">
                    <p @click="linkTo01()">科技计划项目申报111</p>
                </li>
                <li class="link__li link__li--02">
                    <p @click="linkTo02()">技术合同登记</p>
                </li>
                <li class="link__li link__li--03">
                    <p @click="linkTo03()">审批认定</p>
                </li>
                <li class="link__li link__li--04">
                    <p @click="linkTo04()">知识产权申报</p>
                </li>
                <li class="link__li link__li--05">
                    <p @click="linkTo05()">创新劵管理</p>
                </li>
                <li class="link__li link__li--06">
                    <p @click="linkTo06()">创新创业大赛</p>
                </li>
                <li class="link__li link__li--07">
                    <p @click="linkTo07()">高新科技企业统计管理系统</p>
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
            linkTo01() {
                let path = '/officeHall/sciAndTechProDeclaration';
                this.linkTo(path);
            },
            linkTo02() {
                let path = '/officeHall/techContractRegistration';
                this.linkTo(path);
            },
            linkTo03() {
                let path = '/officeHall/examAndApprovalIdentified';
                this.linkTo(path);
            },
            linkTo04() {
                let path = '/officeHall/intellectualPropertyDeclaration';
                this.linkTo(path);
            },
            linkTo05() {
                let path = '/officeHall/innovativeSecuritiesManagement';
                this.linkTo(path);
            },
            linkTo06() {
                let path = '/officeHall/innoAndEntreCompetition';
                this.linkTo(path);
            },
            linkTo07() {
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
            .carousel {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
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
                    height: 80px;
                    text-align: justify;
                    vertical-align: top;
                    p {
                        margin-top: 29px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #ffffff;
                        cursor: pointer;
                    }
                }

                .link__li--01 {
                    background: url("./../../../assets/newparkimg/officeHall/01.png");
                }
                .link__li--02 {
                    margin-left: 9px;
                    background: url("./../../../assets/newparkimg/officeHall/02.png");
                }
                .link__li--03 {
                    margin-left: 9px;
                    background: url("./../../../assets/newparkimg/officeHall/03.png");
                }
                .link__li--04 {
                    margin-left: 9px;
                    background: url("./../../../assets/newparkimg/officeHall/04.png");
                }
                .link__li--05 {
                    margin-left: 9px;
                    background: url("./../../../assets/newparkimg/officeHall/05.png");
                }
                .link__li--06 {
                    margin-left: 9px;
                    background: url("./../../../assets/newparkimg/officeHall/06.png");
                }
                .link__li--07 {
                    margin-left: 9px;
                    background: url("./../../../assets/newparkimg/officeHall/07.png");
                    p {
                        margin-top: 19px;
                        padding: 0 15px;
                    }
                }
            }
        }

    }
</style>
