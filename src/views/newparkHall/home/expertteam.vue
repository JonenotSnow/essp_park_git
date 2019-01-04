<template>
 <div class="newpark_warp warp_team">
     <!-- 专家团队模块 -->
     <div class="main_inter">
         <div class="com-tit expert-tit">专家服务团队</div>
         <div class="com-brf">特聘高校专家、重点实验室、技术专家，为企业提供专业服务</div>
         <div class="resultbox">
             <div class="hasbox" v-if="expertList.length">
                <div class="scroll">
                    <swiper :options="swiperOption" ref="mySwiper" id="myexpertbox">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in expertList" :key="index" >
                        <div class="eachexpert">
                            <div class="expertimgcon"><img :src="item.photo" @error="setDefaultImg($event)" alt="专家头像"></div>
                            <div class="expertdes">
                                <div class="experbasic">
                                    <div class="basic">
                                        <span class="basic_name">{{item.name || "暂无"}}</span>
                                        <span class="morebtn" @click="linkToDetail(item)">>></span>
                                    </div>
                                    <div class="joblevel">专家职称: {{item.title || "教授"}}</div>
                                </div>
                                <div class="expertbrf">{{item.introduction || "暂无该教授简介"}}</div>
                                <div class="expertinfo">
                                    <div>联系电话：{{item.phone || "暂无"}}</div>
                                    <div>联系邮箱：{{item.email || "暂无"}}</div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>

                    <!-- Optional controls -->
                    <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
             </div>
             <div v-show="expertList.length==0" class="nobox" v-cloak><i class="myicon"></i><span class="tipspan">{{lodingMsg}}</span></div>
         </div>
         <div class="more_con esspclearfix">
             <div class="conmore" @click="linkToList">More></div>
        </div>

     </div>
 </div>
</template>

<script>
 import imgfault from "@/assets/error.png";//引入加载失败默认图
 import 'swiper/dist/css/swiper.css'////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
 import {swiper, swiperSlide} from 'vue-awesome-swiper'
 export default {
   data () {
     return {
        lodingMsg:"数据正在加载中",
        msg:"专家服务团队",
        total:0,//总条数
        expertList:[
        //   {
        //     id:"",//id
        //     name:"",//专家姓名,
        //     title:"",//专家职称,
        //     photo:"",//专家头像,
        //     phone:"",//电话,
        //     email:"",//邮件,
        //     introduction:"",//简介,
        //     createTime:"",//创建时间,
        //     createName:"",//创建人,
        //     moduleData:"",//自定义模板数据,
        //     parkId:"",//parkId,
        //     }
        ],
        expertteam:[
            {
                src: require('@assets/newparkimg/home/zhuanjiabg.png'),
                brf:`5年设计经验，层服务于北京建筑设计研究院（BIAD）、日本电通、
                    联想集团、凤凰传媒、海尔商城、中美设计顾问、佰行尚···雯婕工作室、黑金时尚、金银岛、德雅视界、汇爱、汀美吉、
                    崔友光律师事务所、鲸鲨软件、节点通、中天龙影视等`,
                expertname:"张晓冲",
                joblevel:"初级助理",
                tel:"0563-7491552",
                email:"xxxxxxxxxx@163.com"
            }

        ],
        swiperOption: {
            notNextTick: true,
            slidesPerView: 2,
            slidesPerGroup: 2,
            //循环
            loop:true,
            //设定初始化时slide的索引
            initialSlide:0,
            speed:1800,
            //滑动方向
            direction : 'horizontal',
            //小手掌抓取滑动
            // grabCursor : true,
            //滑动之后回调函数
            on: {
                slideChangeTransitionEnd: function(){
                    // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                },
            },
            //左右点击
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            //分页器设置
            pagination: {
                el: '.swiper-pagination',
                clickable :true
            }
            },
            swiperSlides: [1, 2, 3, 4]

     }
   },
   created () {
       this.initData();

   },

   methods:{
        async initData(){
           await this.getExpertList();
       },
       //获取专家列表
       getExpertList(){
        var url = this.$apiUrl.home.getExpertInfo;
        var pop = {
            pageNum:1,
            pageSize:6,
            title:""
        };
        this.$post(url,pop).then((response) => {
            let res = response.resultData;
            this.expertList = res.expertList;
            this.total= res.total;
            this.lodingMsg = "暂无数据";

        },(err)=>{
            this.$message.error(err.resultMsg);
        })
       },
        //图片失败设置默认图
        setDefaultImg (event){
            var ele = event.currentTarget;
            ele.src = imgfault;
            ele.title = "默认";
        },
       //跳转专家详情
       linkToDetail(item){
            this.$router.push({
                path: '/parkIndex/expertDetail',
                query: {id: item.id}
            })
       },
       //跳转专家列表
       linkToList(){
            this.$router.push({
                path: '/parkIndex/experteam'
            })
       }
   },

    filters:{
        foramtImg(url){
            let defaultimg =  require('@assets/newparkimg/home/zhuanjiabg.png');
            if(url==null){
                return defaultimg;
            }
            var isimg = url.endsWith(".png")||url.endsWith(".jpg")||url.endsWith(".jpeg")||url.endsWith(".gif")
            if(isimg){
              return url;
            }
            return defaultimg

        }
    },
   components: {
        swiper,
        swiperSlide,
   }
 }
</script>
<style lang='less' scoped >
 @import "../../../assets/css/newpark/home.common.less";
 @import "../../../assets/css/mixin.less";
 .warp_team{
    height: 500px;
    background-image: url('../../../assets/newparkimg/home/experteam_bg.png');
    background-repeat: no-repeat;
    .expert-tit{
        color:#fff;
    }
 }
 .resultbox{
     padding-top:50px;
     height: 260px;
     margin-bottom: 20px;
     .hasbox {
         .eachexpert{
            display: flex;
            width: 450px;
            height: 180px;
            padding:40px 70px;
            background-color: #ffffff;
            box-shadow: 2.2px 2px 3px 0px
                rgba(140, 140, 140, 0.15);
            border-radius: 12px;
            margin:0px 5px;
            transition: all 2s;
            &:hover{
                .expertbrf{
                    display: none;
                }
                .expertinfo,.morebtn{
                    display: block;
                }
            }
         }
     }
     .nobox{
        height:40px;
        text-align: center;
        display: flex;
        justify-content: center;
        padding-top:60px; 
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
 .expertimgcon{
     width: 150px;
     height: 150px;
     margin-right:15px;

     img{
         display: block;
         width:100%;
         height:100%;
         border-radius: 50%;
     }
 }
 .expertdes{
     width:260px;
     .expertbrf{

         height: 70px;//直接限定div的高度，配合文本折行省略用，解决不同的环境，折行省略无效的问题，author：miguel
         //简介---三行省略
        width:260px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #999999;
         .esspellipsitwo(3);
     }
     .expertinfo{
         //信息
        display: none;
        width:260px;

        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #999999;
     }

 }
 .experbasic{
     width:260px;

     .basic{
         width:100%;
         overflow: hidden;
         margin-bottom: 10px;
         .basic_name{
            float: left;

            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
         }
         .morebtn{
             display: none;
             float: right;
             font-size:18px;
             color:#ccc;
             cursor: pointer;
         }

     }
     .joblevel{

        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #777777;
        margin-bottom: 25px;
     }
 }
 .more_con{
     width:100%;
     .conmore{
        float: right;
        width: 46px;
        cursor: pointer;

        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fefefe;
     }
 }

#myexpertbox .swiper-button-prev{
    width: 5%;
    height: 15%;
    background-image: url("../../../assets/newparkimg/home/experthomeprev.jpg")
}
#myexpertbox .swiper-button-next{
    width: 5%;
    height: 15%;
    background-image: url("../../../assets/newparkimg/home/experthomenext.jpg")
}
.main_inter .com-brf{
    color:#ccc;
}

</style>
