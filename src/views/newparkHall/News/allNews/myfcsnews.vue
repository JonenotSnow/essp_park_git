<!--
 * @Author: Evan-lian
 * @Date: 2019-01-02 20:59:02
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-04 17:08:49
 * @Description: 我关注的新闻
 -->
<template>
 <div>
<EsspMainCenterNewsInfo :pageType="aipStyle" :temeTitle="temeTitle"></EsspMainCenterNewsInfo>
 </div>
</template>

<script>
import EsspMainCenterNewsInfo from '@/components/newsinfo/EsspMainCenterNewsInfo';
export default {
    name: "",
    components: {
        EsspMainCenterNewsInfo,
    },
    data() {
        return {
            temeTitle: "我关注的新闻",
            aipStyle:"actAll",//传参数获取列表
        }
    },
    methods: {
        
    },
}
 
</script>

<style lang='less' scoped>
</style>

