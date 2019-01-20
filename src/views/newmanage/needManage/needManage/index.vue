<template>
 <div>
    <div class="outroute">
        <div class="router__link">
          <span class="Inlinkstyle outlinkstyle">非公开需求</span>
        </div>
        <noOpenNeed></noOpenNeed>
    </div>
 </div>
</template>

<script>
import noOpenNeed from './noOpenNeed/index'
 export default {
   components:{
     noOpenNeed
   },
   data () {
     return {
     }
   },
   created () {
     
   },
   methods: {
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
