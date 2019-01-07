<template>
 <div>
  
    <outRoute :outsource='outsource'></outRoute>
 </div>
</template>

<script>
import outRoute from '../../components/outRoute';
 export default {
   components:{
     outRoute
   },
   data () {
     return {
        outsource: [
            {
                id:1,
                name:"ugygvjgh",
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

 
</style>
