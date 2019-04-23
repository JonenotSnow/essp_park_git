<!--
 * @Author: Evan-lian
 * @Date: 2019-01-02 20:59:39
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-03 15:05:07
 * @Description: 全部通知公告
 -->
<template>
 <div>
<EsspMainCenterNotice :pageType="aipStyle" :temeTitle="temeTitle"></EsspMainCenterNotice>
 </div>
</template>

<script>
import EsspMainCenterNotice from '@/components/newsinfo/EsspMainCenterNotice';
export default {
    name: "",
    components: {
        EsspMainCenterNotice,
    },
    data() {
        return {
            temeTitle: "通知公告",
            aipStyle:"getAllInformation",//获取全部新闻接口
        }
    },
    methods: {
        
    },
}
 
</script>

<style lang='less' scoped >

 
</style>

