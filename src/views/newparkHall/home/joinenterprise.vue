<template>
 <div class="newpark_warp warp_join">
     <!-- 加入的企业模块 -->
     <div class="main_inter">
        <div class="com-tit">入驻企业</div>
        <div class="com-brf">入驻企业400+，在职人员10000+</div>
        <div class="entercons">
            <!-- 逻辑是 一行最多显示5个，超过5个显示more 否则不必要
            
            现在固定显示6个
             -->
            <div class="hasenters" v-if="enterprises.length">
                <img class="enter_child" v-for="(item,index) in enterprises.slice(0,5)" :key="index" :src="item.src" >
                <span class="enter_child entermore" v-if="enterprises.length>5">View More ></span>
            </div>
               <div v-else class="nobox"><i class="myicon"></i><span class="tipspan">暂无数据</span></div>
        </div>
    </div> 
 </div>
</template>

<script>
 export default {
   data () {
     return {
         msg:"入驻企业",
         enterprises:[
             {
                 src: require('@/views/newparkHall/home/imgs/logo_b1.png'),

             },
             {
                 src: require('@/views/newparkHall/home/imgs/logo_b2.png'),
             },
             {
                src: require('@/views/newparkHall/home/imgs/logo_b3.png'),
             },
             {
                 src: require('@/views/newparkHall/home/imgs/logo_b4.png'),
             },
             {
                src: require('@/views/newparkHall/home/imgs/logo_b5.png'),
             },
             {
                src: require('@/views/newparkHall/home/imgs/logo_b6.png'),
             },
         ]
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
 @import "../../../assets/css/newpark/home.common.less";
 .warp_join{
     height: 260px;
     background: #ffff;
 }
 .entercons{
     overflow: hidden;
     padding:30px 0px;
     .enter_child{
        float: left;
        width: 150px;
        height: 50px;
        background-color: #ffffff;
        cursor: pointer;
        box-shadow: 1.5px 2.6px 7.8px 0.2px 
            rgba(0, 0, 0, 0.1);
        margin-right:50px;
        &:last-child{
            margin-right: 0px;
        }
     }
     //更多的样式
     .entermore{
        text-align: center;
        line-height: 50px;
        font-family: ArialMT;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
     }
    .nobox{
        height:40px;
        text-align: center;
        .tipspan{
                display: inline-block;
                
                font-size: 28px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 8.4px;
                height:40px;
                line-height: 40px;
                color: #999999;
            }
        .myicon{
            display: inline-block;
            width:40px;
            height:40px;
            line-height: 40px;
            background: url("../../../assets/newparkimg/home/noresult.png")  no-repeat center center;    
            margin-right:10px;
        }
    }
    

 }
 
</style>
