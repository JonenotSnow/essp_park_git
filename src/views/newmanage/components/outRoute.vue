<!--
 * @Author: Evan-lian
 * @Date: 2018-12-05 10:09:55
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-03 17:45:26
 * @Description: 外层主体区域的顶部导航，路由切换。
 -->

<template>
    <div class="outroute">
        <router-link v-for="(item,index) in outsource" :key="index" :to="item.path">
            <span class="outlinkstyle">{{item.name}}</span>
            <span v-if="index<outsource.length-1">|</span>
        </router-link>
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
    }

    .outlinkstyle {
        display: inline-block;
        padding: 10px;
        margin: 0px 2px;
        font-family: "MicrosoftYaHei";
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
    }

    .router-link-active .outlinkstyle {
        color: #409EFF;
    }

</style>
