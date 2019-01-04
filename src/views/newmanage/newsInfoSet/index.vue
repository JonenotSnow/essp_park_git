<!--
 * @Author: Evan-lian
 * @Date: 2018-12-05 09:20:36
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-04 16:50:28
 * @Description: 新闻资讯发布管理页
 -->

<template>
  <div>
    <outRoute :outsource="outsource"></outRoute>
 </div>
</template>

<script>
import outRoute from "../components/outRoute.vue";
 export default {
   data () {
     return {
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

   },
   components: {
       outRoute
   }
 }
</script>

<style lang='less' scoped >

 
</style>