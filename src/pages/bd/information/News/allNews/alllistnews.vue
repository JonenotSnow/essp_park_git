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
            temeTitle: "全部新闻",
            aipStyle:"getAllInformation",//获取全部新闻接口
        }
    },
    methods: {
        
    },
}
</script>
<style lang='less' scoped>
</style>
