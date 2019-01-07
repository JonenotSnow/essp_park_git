<template>
 <div class="achievementSetHead">
    <!--  成果管理已发布 -->
    <achievementSetHead :type=type :publishTitle="publishTitle"></achievementSetHead>
    <achievementSetCondition v-if="list.length>0"></achievementSetCondition>
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
      publishTitle:'立即发布',
      type:'成果管理',
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
