<template>
  <div>
    <!-- 抽离的时候用，暂时用不到 -->
    <banner></banner>
    <newparkActive></newparkActive>
    <hotcenter></hotcenter>
    <datamonitor></datamonitor>
    <expertteam></expertteam>
    <resultsdisplay></resultsdisplay>
    <joinenterprise></joinenterprise>
  </div>
</template>

<script>
import newparkActive from "./newparkActive";
import banner from "./banner";
import hotcenter from "./hotCenter";
import notice from './notice'
import datamonitor from './datamonitor'
import expertteam from './expertteam'
import resultsdisplay from './resultsdisplay'
import joinenterprise from './joinenterprise'
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  components: {
    newparkActive,//热门活动列表
    banner,//导航搜索框
    hotcenter,//热门需求
    notice,//通知公告
    datamonitor,//数据监测
    expertteam,//专家团队
    resultsdisplay,//成果展示
    joinenterprise,//入驻企业

  }
};
</script>

<style lang='less' scoped >
</style>
