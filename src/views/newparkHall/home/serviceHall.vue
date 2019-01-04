<template>
    <div class="content">
        <!-- 办事大厅 -->
        <div class="center">
            <div class="title">
                 办事大厅
            </div>
            <div class="introduce">
                    快速高效、自助公开、线上办理
            </div>
            <div class="box" >
                <div class="wrapper">
                    <div class="left-aside">
                        <div class="item" v-for="(item,index) in list" :key='index' :class='currentIndex == index?"active":""' @click="changeTab(index)">
                            <span>{{item.title}}</span>
                            </div>
                    </div>
                    <div>
                        <div class="right-aside">
                            <div class="title-s">科技计划项目申报</div>
                            <div class="word">河北省创新券是由政府向科技型中小企业和创新创业团队免费发放的权益凭证，主要用于鼓励科技型中小企业和创新创业团队充分利用高等院校、科研院所等创新服务提供机构的资源开展研发活动和科技创新</div> 
                        </div>
                        <div class="btn-group">
                            <div class="btn">立即办理</div>
                            <div class="btn">查看政策</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return{
                list:[
                {title:'创新券管理',path:'',},
                {title:'技术合同登记',path:'',},
                {title:'审批认定',path:'',},
                {title:'知识产权申报',path:'',},
                {title:'科技计划项目申报',path:'',},
                {title:'创新创业大赛',path:'',},
                {title:'高新技术企业统计管理系统',path:'',},
            ],
            currentIndex:0,
            }
    },
    methods:{
        changeTab(index){
            this.currentIndex = index
        }
    }
        
}
</script>
<style lang="less" scoped>
 @import "../../../assets/css/mixin.less";
.content{
    width: 100%;
    height: 720px;
    background: url('../../../assets/newparkimg/home/homebg2.png') no-repeat center center;
        .center{
            width: 1200px;
            margin: 0 auto;
            .title{
                text-align: center;
                font-size: 28px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.7px;
                color: #333333;
                padding: 40px 0 10px;
            }
            .introduce{
                text-align: center;
                font-size: 16px;
            }
            .box{
            width: 1200px;
            height: 540px;
            margin-top:22px;
            background-image: linear-gradient(
                #ffffff, 
                #ffffff), 
            linear-gradient(
                #f5f5f5, 
                #f5f5f5);
            background-blend-mode: normal, 
                normal;
            box-shadow: 2.5px 4.3px 19.4px 0.6px 
                rgba(0, 0, 0, 0.15);
            border-radius: 12px;
            opacity: 0.9;
                .wrapper{
                    display: flex;
                    padding: 12px 0;
                    .left-aside{
                        border-right: solid 2px #cccccc;
                        height: 517px;
                        width: 246px;
                        .item{
                            display: block;
                            cursor: pointer;
                            height: 62px;
                            padding:8px 0px 0px;
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0.5px;
                            color: #333333;
                            position: relative;
                            vertical-align: middle;
                            text-align: center;
                            width: 150px;
                            margin: 0 auto;
                            -webkit-line-clamp: 2;                         
                            span{
                                margin-top: 10px;
                                display: block;
                            }
                            &.active{
                                color:#10b5ff;
                                &::before{
                                position: absolute;
                                content: ' ';
                                width: 30px;
                                height: 3px;
                                background-color: #10b5ff;
                                bottom: 0px;
                                left: 58px;
                                }
                            }
                            
                        }
                    }
                    .right-aside{
                            padding: 0px 77px 0 107px;
                            height: 440px;
                            width: 746px;
                         .title-s {
                            font-size: 24px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0.6px;
                            color: #444444;
                            padding: 83px 0 75px;
                        }
                        .word{
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 1.6px;
                            color: #666666;
                        }
                    }
                }
                .btn-group{
                    display: flex;
                    justify-content: space-around;
                    .btn{
                        width: 145px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        vertical-align: middle;
                        background-image: linear-gradient(21deg, 
                            #22a2fa 0%, 
                            #10b5ff 100%);
                        border-radius: 5px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>

