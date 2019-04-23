<!--
 * @Author: Evan-lian
 * @Date: 2018-12-05 10:09:55
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-03 17:45:26
 * @Description: 外层主体区域的顶部导航，路由切换。
 -->

<template>
    <div class="outroute">
        <div class="router__link">
            <router-link v-for="(item,index) in outsource" :key="index" :to="item.path">
                <span class="outlinkstyle">{{item.name}}</span>
                <span class="separator" v-if="index<outsource.length-1">|</span>
            </router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            outsource: {
                type: Array,
                default: []
            }
        },
        created() {

        },
        computed: {},
        components: {}
    }
</script>

<style lang='less' scoped>
    .outroute {
        background: #fff;

        .router__link {
            padding-top: 45px;
            padding-left: 40px;

            .outlinkstyle {
                display: inline-block;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
                cursor: pointer;
                &:hover {
                    color: #00a0e9;
                }
            }

            .separator {
                display: inline-block;
                margin-left: 25px;
                margin-right: 30px;
                vertical-align: top;
                font-size: 18px;
                color: #ccc;
            }

            .router-link-active .outlinkstyle {
                color: #409EFF;
            }
        }
    }

</style>
