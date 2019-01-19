<template>
 <div>
    <div class="outroute">
        <div class="router__link">
          <!-- <span class="Inlinkstyle" :class="{'outlinkstyle': type == 0 }" @click="getType(0)">公开需求</span>
          <span class="separator">|</span> -->
          <span class="Inlinkstyle outlinkstyle" :class="{'outlinkstyle': type == 1 }" @click="getType(1)">非公开需求</span>
        </div>
        <!-- <openNeed v-show="type == 0"></openNeed> -->
        <noOpenNeed v-show="type == 1"></noOpenNeed>
    </div>
 </div>
</template>

<script>
import openNeed from './openNeed/index'
import noOpenNeed from './noOpenNeed/index'
 export default {
   components:{
     openNeed,
     noOpenNeed
   },
   data () {
     return {
        type:1
     }
   },
   created () {
     
   },
   methods: {
    getType(type){
      this.type = type;
    }
   },
 }
</script>

<style lang='less' scoped >
.outroute {
    background: #fff;
    .router__link {
        padding-top: 45px;
        padding-left: 40px;

        .Inlinkstyle {
            display: inline-block;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            cursor: pointer;
            &:hover {
                color: #00a0e9;
            }
        }
        .separator {
            display: inline-block;
            margin-left: 25px;
            margin-right: 30px;
            vertical-align: top;
            font-size: 18px;
            color: #ccc;
        }
        .outlinkstyle {
            color: #409EFF;
        }
    }
}
 
</style>
