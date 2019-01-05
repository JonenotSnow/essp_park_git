<template>
 <div class="achievementSetHead">
    <!--  成果管理已发布 -->
    <achievementSetHead></achievementSetHead>
    <achievementSetCondition v-if="list"></achievementSetCondition>
    <listOnlyStatus :list='list'></listOnlyStatus>
 </div>
</template>

<script>
// import outRoute from '../components/outRoute'

import achievementSetHead from './../../components/common/head'
import achievementSetCondition from './../../components/common/condition'
import listOnlyStatus from './../../components/listOwnImg'
 export default {
   components: {
    // outRoute,/
    achievementSetHead,
    achievementSetCondition,
    listOnlyStatus
   },
   data () {
     return {
      list:2,
      outsource: [
          {
              id:1,
              name:"新闻动态",
              path:'/parkHall/manage/publicNews'
          },
          {
              id:2,
              name:"通知通告",
              path:'/parkHall/manage/publicNotice'
          }
      ]
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
