<template>
 <div>
     <!-- 数据管理 -->
 {{msg}}
 <span @click="$router.push('/parkHall/manage/publishSciAndTechPolicy')">去发布</span>
 <span @click="$router.push('/parkHall/manage/sciAndTechPolicyAuditDetail')">审核详情</span>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         msg:"数据管理"
     }
   },
   created () {
     
   },
   computed: {

   },
   components: {

   }
 }
</script>

<style lang='less' scoped >

 
</style>
