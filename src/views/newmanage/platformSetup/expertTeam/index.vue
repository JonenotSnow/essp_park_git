<template>
 <div class="achievementSetHead">
    <!--  成果管理已发布 -->
    <achievementSetHead :type='专家团队'></achievementSetHead>
    <listOnlyStatus :list='list'></listOnlyStatus>
 </div>
</template>

<script>
import achievementSetHead from './../../components/common/head'
import listOnlyStatus from './../../components/listOwnImg'
 export default {
   components: {
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
