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
                            <span class='span-label'></span>
                            </div>
                    </div>
                    <div>
                        <div class="right-aside">
                            <div class="title-s">
                                <span :class="tmpcontent.title===cItem.title?'active':''" v-for="cItem in tmp.child" @click="changeDetail(cItem)">{{cItem.title}}</span>
                            </div>
                            <div class="word" v-html="tmpcontent.detail"></div>
                        </div>
                        <div class="btn-group">
                            <div class="btn" @click="nowMake">立即办理</div>
                            <div class="btn"  @click="seePolicy">查看政策</div>
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
                {
                title:'创新券管理',
                child:[
                   {
                    title:'创新券管理',
                    detail:'河北省创新券是由政府向科技型中小企业和创新创业团队免费发放的权益凭证，主要用于鼓励科技型中小企业和创新创业团队充分利用高等院校、科研院所等创新服务提供机构的资源开展研发活动和科技创新。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://cxq.kjfw.org.cn/'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/sciAndTechService/technInnoCertificate'
                    }
                   }
                ]
                },
                {
                title:'技术合同登记',
                child:[
                   {
                    title:'技术合同登记',
                    detail:'技术合同认定登记制度是我国促进产学研合作、推动企业技术创新和促进科技进步的重要举措，国家出台了一系列优惠政策，鼓励技术创新、技术交易，加速技术商品化、市场化、产业化，促进技术转移和科技成果转化。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://www.ctmht.net.cn'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/officeHall/techContractRegistration'
                    }
                   }
                ]
                },
                {
                title:'审批认定',
                child:[
                   {
                    title:'科技型小企业认定',
                    detail:'科技型中小企业是指有一定比例的科技人员和一定规模的研发经费投入，拥有自主知识产权或专有技术，通过开展创新活动提供产品或服务的中小企业。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://www.ctmht.net.cn'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/sciAndTechService/familyJuniorIdentify'
                    }
                   },
                   {
                    title:'高新技术企业认定',
                    detail:'高新技术企业是指在持续进行研究开发与技术成果转化，形成企业核心自主知识产权，并以此为基础开展经营活动，在中国境内注册的居民企业。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://www.ctmht.net.cn'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/sciAndTechService/seniorEnterpriseIdentify'
                    }
                   }
                ]
                },
                {
                title:'知识产权申报',
                child:[
                   {
                    title:'知识产权申报',
                    detail:'提供专利申请、专利检索、专利审查信息查询、专利公布公告查询、投诉及专利相关咨询服务。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://www.sipo.gov.cn/zhfwpt/zlsqzn/'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/sciAndTechService/intellectualProperty'
                    }
                   }
                ]
                },
                {
                title:'科技计划项目申报',
                child:[
                   {
                    title:'保定市科技项目申报',
                    detail:'保定市市级科学技术研究与发展计划项目是根据经济、社会和科技发展需求，在市科技计划中安排的，由市级财政资金支持的科学技术研究开发活动。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://121.18.64.248:81/bdkjjh/index/index!index.do'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/sciAndTechService/technologyServiceOrganization'
                    }
                   },
                   {
                    title:'河北省科技项目申报',
                    detail:'河北省省级科技计划项目是指河北省科技厅根据经济、社会和科技发展需求，在省科技计划中安排的，由省级财政资金支持的科学技术研究开发活动。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://jhpt.hebstd.gov.cn:81/index/index!index.do'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/sciAndTechService/technologyServiceOrganization'
                    }
                   }
                ]
                },
                {
                title:'创新创业大赛',
                child:[
                   {
                    title:'创新创业大赛',
                    detail:'河北省创新创业大赛是省科技厅推进大众创业、万众创新的一项重要赛事。大赛分为初赛、行业赛、全省总决赛三个阶段，涵盖电子信息、新材料、新能源及节能环保、生物医药、先进制造、互联网及军民融合项目比赛。其中全省行业赛、总决赛均采用现场答辩的评选模式，赛事全程公开和公示。创新创业大赛在缓解中小企业融资难、为创业团队提供多元化服务和营造创新创业氛围等方面取得了显著成效。',
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://www.sipo.gov.cn/zhfwpt/zlsqzn/'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/policieAndRegulation/policieAndRegulatio'
                    }
                   }
                ]
                },
                {
                title:'高新技术企业统计管理系统',
                child:[
                   {
                    title:'科技部火炬计划调查信息系统',
                    detail:`火炬统计调查制度是经国家统计局审批备案的科技部门专项统计调查项目之一，
                    是一项重要的基础性统计工作。填报时间：每年3月份前。`,
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://tj.ctp.gov.cn/tl/login.aspx'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/policieAndRegulation/policieAndRegulatio'
                    }
                   },
                   {
                    title:'河北省高新技术企业认定管理系统',
                    detail:`<p>为全面掌握高新技术企业发展情况，进一步做好高新技术企业认定管理工作。
                    省科技厅决定开展全省高新技术企业统计、分析工作。填报时间：季报为每年1月、4月、7月、10月的1号到10号。年报为每年3月份前。</p>
                            `,
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://gqrd.hebstd.gov.cn:81'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/policieAndRegulation/policieAndRegulatio'
                    }
                   },
                   {
                    title:'河北省高新技术统计信息网',
                    detail:`<p>为及时掌握全省高新技术企业经营情况，省科技厅决定开展季度统计调查工作。
                            填报时间：每年1月、4月、7月、10月的1号到15号。</p>`,
                    btn_l:{
                        showFlag:true,
                        isRouerPush:false,
                        path:'http://gxtj.heinfo.gov.cn/Index/Main.asp'
                    },
                    btn_r:{
                        showFlag:true,
                        isRouerPush:true,
                        path:'/sciIndex/policieAndRegulation/policieAndRegulatio'
                    }
                   }
                ]
                }
            ],
            currentIndex:0,
            tmp:{},
            tmpcontent:{}
            }
    },
    methods:{
        changeTab(index){
            this.currentIndex = index
            this.tmp = this.list[index]
            this.tmpcontent = this.tmp.child[0]
        },
        changeDetail(item){
            this.tmpcontent = item
        },
        nowMake(){
            window.open(this.tmpcontent.btn_l.path)
        },
        seePolicy(){
            this.$router.push({path:this.tmpcontent.btn_r.path})
        }
    },
    created() {
        this.changeTab(0)
    },

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
                                .span-label{
                                    position: relative;
                                    content: ' ';
                                    width: 30px;
                                    height: 3px;
                                    background-color: #10b5ff;
                                    margin: 10px auto 0;

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
                            padding: 73px 0 50px;
                            span{
                                margin:0 26px 0 0;
                                line-height: 50px;
                                cursor:pointer;
                                &.active{

                                    color:#10b5ff;
                                }
                            }
                        }
                        .word{
                            font-size: 16px;
                            letter-spacing: 1.6px;
                            color: #666;
                            line-height: 30px;
                            &>p{
                                text-indent: 30px;
                            }
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
                        cursor:pointer;
                    }
                }
            }
        }
    }
</style>

