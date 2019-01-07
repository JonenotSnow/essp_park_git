<template>
 <div class="achievementSetHead">
    <!--  成果管理已发布 -->
    <achievementSetHead :type=type :publishTitle='publishTitle'></achievementSetHead>
    <listOnlyStatus :list='list' :type=type></listOnlyStatus>
 </div>
</template>

<script>
import achievementSetHead from './../../components/common/head'
import achievementSetCondition from './../../components/common/condition'
import listOnlyStatus from './../../components/listOwnImg'
 export default {
   components: {
    achievementSetHead,
    achievementSetCondition,
    listOnlyStatus
   },
   data () {
     return {
      type:'专家团队',
      publishTitle:'发布专家',
      list:[]
     }
   },
   created () {

   },
   computed: {

   }
 }
</script>

<style lang='less' scoped >
.achievementSetHead{
  background: #fff;
}
</style>
