<template>
 <div class="activemain esspclearfix">
<!-- 活动介绍模块 -->
    <div class="actleft">
        <div>
            <div class="acttit">主办方</div>
            <div>
                <img class="actlogo" src="../../../assets/actlogo.png" alt="活动logo">
                <p class="actcpname">xxxxxxxxx公司</p>
            </div>
        </div>
    </div>
    <div class="actright">
        <div class="maininfo esspclearfix">
           <div class="logocon"><img class="detaillogo" src="../../../assets/actdetaillogo.png" alt="详细活动报名logo"></div>
           <div class="detailcon">
               <h2>十城超前！上户彩主演现象级话题之作,《昼夜》全国免费观影</h2>
               <div class="tagcon esspclearfix">
                   <span>美食</span>
                   <span>交流</span>
                   <span>创业</span>
                </div>
               <div class="infos">
                   <div><i class="iconcoom el-icon-goods"></i><b>时间：</b><em>2018-05-23  10:00</em></div>
                   <div><i class="iconcoom el-icon-news"></i><b>地点：</b><em>软件园二期观日路56号一楼活动厅</em></div>
                   <div><i class="iconcoom el-icon-zoom-in"></i><b>发起人：</b><em>xxxxxxxxxx公司</em></div>
                   <div><i class="iconcoom el-icon-tickets"></i><b>票种：</b><em>印花</em></div>
               </div>
               <div class="infobtn esspclearfix">
                   <div class="btnitem">￥100 早鸟票</div>
                   <div class="btnitem selecrborder">￥0.00免费票</div>
               </div>
               <div class="">
                    <el-button round>立即报名</el-button>
                    <el-button type="primary" round>收藏</el-button>
               </div>
           </div>
        </div>

    </div>
 </div>
</template>

<script>
 export default {
   data () {
       return {

       }

   },
   computed: {

   },
   components: {

   }
 }
</script>

<style lang='less' scoped >
@import "../../../assets/css/mixin";
.activemain {
    width:1200px;
    margin:0 auto;
    overflow: auto;
}
// 左侧部分
.actleft{
    float: left;
    padding:10px;
    margin-right: 25px;
    border: 1px solid #ccc;
    .acttit{
        width: 180px;
        height: 40px;
        background-color: #0066b3;
        color:#fff;
        text-align: center;
        line-height: 40px;
        margin-bottom:10px;
    }
    .actlogo {
        display: block;
        width: 180px;
        height: 180px;
    }
    .actcpname{
        font-size: 18px;
        line-height: 30px;
        color: #333333;
    }
}

// 右侧部分
.actright{
    float: left;
}

.logocon{
    width: 420px;
    height: 240px;
    float: left;
    margin-right: 10px;
    .detaillogo{
    display: block;
    width:100%;
    height:100%
    }
}
.detailcon{
    float: left;
    h2 {
        width: 460px;
        font-size: 20px;
        line-height: 36px;
        color: #333333;
        margin-bottom: 5px;
    }
}
//标签模块
.tagcon{
    margin-bottom: 5px;
    span{
        float: left;
        margin:0 10px;
        height: 20px;
        padding:5px 10px;
        background-color: #cccccc;
        text-align: center;
        color: #fff;
    }
}
.infos{
    margin-bottom: 5px;
    .iconcoom{
        margin-right:4px;
    }
    b,em{
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;

    }
}
.infobtn {
    margin-bottom: 20px;
    .btnitem {
        float: left;
        width:110px;
        height:30px;
        line-height: 30px;
        margin-left: 15px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #ccc;
        &:hover{
            cursor: pointer
        }
    }
    .selecrborder{
        border:1px solid #ff9900;
    }



}


</style>
