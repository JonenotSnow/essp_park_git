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
            <div class="hasenters" v-if="enterprises.length>0">
                <div class="listcon">
                    <div class="listitem" v-for="(item,index) in enterprises" :key="index" @mouseenter="showDetail(item.isShowDetail,index)" @mouseleave="showDetail(item.isShowDetail,index)">
                        <img class="enter_child" :src="item.cstLogo">
                        <div class="detailinfo" :class="{cur:item.isShowDetail}">
                            <p class="enterprisename">{{item.cstNm}}</p>
                            <p class="enterprisetype">{{item.idyTpcd}}</p>
                            <div class="checkenterprise" @click="enterBusiness(item)">进入企业橱窗</div>
                        </div>
                    </div>
                </div>
                <div class="entermore" @click="linkToPage"><span>More > </span></div>
            </div>
            <div v-else class="nobox"><i class="myicon"></i><span class="tipspan">暂无数据</span></div>
        </div>
    </div>
 </div>
</template>

<script>
import mixins_windowOpen from '@/components/mixins/mixins_windowOpen.js'
 export default {
    mixins:[mixins_windowOpen],
   data () {
     return {
         msg:"入驻企业",
         enterprises:[],
         pageNum: 1,
         pageSize: 5,
         rzzMap:new Map()
     }
   },
   created () {
    this.queryEnterpriseList()
   },
   computed: {

   },
   components: {

   },
   methods:{
    linkToPage() {
      this.$router.push("/parkHall/manage/allEnterpriseList");
    },
    queryEnterpriseList(){
        this.$post('/memberManage/getMemInfo', {
        parkId: this.SSH.getItem('parkId'),
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(
        response => {
          if (response.resultCode == "CLT000000000") {
            /*if(response.resultData.memInfoCount > 0){
              this.enterprises = response.resultData.memberList
            }else{

            }*/
            if(response.resultData.memInfoCount > 0){
                //this.totalCount =response.resultData.memInfoCount
                this.enterprises = response.resultData.memberList
                let rzz = JSON.parse(localStorage.rzz);
                this.rzzMap = new Map()
                for (let i = 0; i < rzz.length; i++) {
                    this.rzzMap.set(rzz[i].code,rzz[i].name)
                }
                for (let i = 0; i < this.enterprises.length; i++) {
                    this.$set(this.enterprises[i],'isShowDetail',false)
                    let type = this.rzzMap.get(this.enterprises[i].idyTpcd)
                    this.enterprises[i].idyTpcd = type ? type : '其他行业'
                }
            }else{

            }
          }
        },
        response => {
          this.$message.error(response.resultMsg);
        }
      );
    },
    showDetail(isTrue,index){
        let that = this;
        that.enterprises[index].isShowDetail = !isTrue;
    },
    enterBusiness(item){
        var prams = "?cstId="+item.cstId;
        this.windowOpenUrlNoToken('/centerIndex/showHome',prams)
    }
   }
 }
</script>

<style lang='less' scoped >
 @import "../../../assets/css/newpark/home.common.less";
 .warp_join{
     //height: 260px;
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
        cursor: pointer;
        &:last-child{
            margin-right: 0px;
        }
     }
     //更多的样式
     .entermore{
        width: 976px;
        margin:0 auto;
        text-align: right;
        line-height: 50px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        span{
            cursor:pointer;
        }
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
    .hasenters{
        .listcon{
            width: 976px;
            height: 120px;
            margin:0 auto;
            .listitem{
                float: left;
                cursor: pointer;
                width: 160px;
                height: 120px;
                overflow: hidden;
                background-color: #ffffff;
                box-shadow: 1.5px 2.6px 8.7px 0.3px 
                    rgba(0, 0, 0, 0.1);
                position:relative;
                margin-right: 44px;
                .enter_child{
                    width:100%;
                    height:100%;
                }
                .detailinfo{   
                    opacity: 0;                 
                    .enterprisename{
                        margin:20px auto 10px;
                        height: 20px;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        //white-space: nowrap;
                        -webkit-line-clamp:1;
                        -webkit-box-orient:vertical;
                        width:100%;
                        text-align: center;
                        position:absolute;
                        left:0;
                        top:-60px;
                        transition: all ease .8s ;
                    }
                    .enterprisetype{
                        margin-bottom: 5px;
                        width:100%;
                        text-align: center;
                        position:absolute;
                        left:0;
                        top:-60px;
                        transition: all ease .8s ;
                    }
                    p{
                        font-size: 14px;
                        color: #ffffff;
                    }
                    .checkenterprise{
                        position:absolute;
                        left:20px;
                        top:120px;
                        border:1px solid #fff;
                        width: 120px;
                        height: 30px;
                        line-height:30px;
                        margin: 0 auto;
                        transition: all ease .8s ;
                    }
                }
                .detailinfo.cur{
                    position:absolute;
                    left:0;
                    top:0;
                    background-color: #00a0e9;
                    opacity: 0.8;
                    color:#fff;
                    text-align: center;
                    font-size: 16px;
                    width:100%;
                    height: 100%;
                    .enterprisename{
                        top:0px;
                    }
                    .enterprisetype{
                        top:50px;
                    }
                    .checkenterprise{
                        top:80px;
                    }
                }
            }
            .listitem:last-child{
                margin-right: 0;
            }
        }
    }

 }

</style>
