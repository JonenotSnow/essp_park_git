<template>
    <div class="inclusivefinance">
        <div class="main_banner"></div>
        <div class="inclusive_menu">
          <div class="menulist">
            <div class="listitem" v-for="(item,index) in menuList" :key="index" :class="{cur:item.isCur}" @click="showInclusiveDetail(item,index)">{{item.name}}</div>
          </div>
          <div class="inclusive_cont">
            <div class="inclusive_cont_list cci_info" :class="{cur:detailShow[0]}"><!--建融智合-->
              <div class="cci_info_list" v-for="(item,index) in cciInfo">
                <p class="cci_info_intro">{{item.content}}</p>
                <div class="list_bg">
                  <img :src="item.img" alt="">
                </div>
              </div>       
            </div>
            <div class="inclusive_cont_list sm_loan" :class="{cur:detailShow[1]}"><!--小微快贷-->
              <div class="sm_loan_list" v-for="(item,index) in smLoan" :key="index">
                <div class="detail_img"><img :src="item.img"></div>
                <div class="detail_right">
                  <div class="detail_checkin">
                    <span >办理条件</span><div class="seperate">|</div>
                    <span>产品特点</span>
                  </div>
                  <div class="detail_checkin_info">
                    <div class="check_condition">
                      <p>{{item.condition}}</p>
                    </div>
                    <div class="check_characteristic">
                      <p>{{item.feature}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="inclusive_cont_list industry_solutions" :class="{cur:detailShow[2]}"><!--行业解决方案-->
              <div class="iscase_f">
                <div class="iscase_fir" v-for="(item,index) in industrySolutions" v-if="index< 5">
                  <div class="iscase_fir_box">
                    <i class="iconfont icon-fuwu" :class="item.icon"></i>
                    <div class="casename">{{item.name}}</div>
                    <b>——</b>
                    <p class="case_secdec">{{item.secDec}}</p>
                  </div>
                </div>
                <div class="iscase_fir_des">
                  
                </div>
              </div>
              <div class="iscase_s">
                <div class="iscase_sec"></div>
                <div class="iscase_sec_des"></div>
              </div>       
            </div>
          </div>
        </div>
        <div class="bankpoint">
          <div class="checktowebsite">
            <a href="">点击进入建行官网办理>></a>
          </div>
          <div class="pointphoneinfo">
            <div class="pointhead"><< 详询中国建设银行保定分行各网点 >></div>
            <div class="pointtype">
              <div class="typelist" v-for="(item,index) in pointType" :class="{cur:item.isCur}" @click="showPointPhoneDetail(item,index)">{{item.name}}</div>
            </div>
            <div class="pointphone">
              <div class="typeinfo" v-for="(pointTypeItem,index) in pointPhone" :class="{cur:phoneShow[index]}">
                <div class="phonelist">
                  <div class="phoneitem" v-for="(telPhone,idx) in pointTypeItem" :key="idx" v-if="idx<5">{{telPhone}}</div>
                </div>
                <div class="phonelist">
                  <div class="phoneitem" v-for="(telPhone,idx) in pointTypeItem" :key="idx" v-if="idx<10&&idx>=5">{{telPhone}}</div>
                </div>
                <div class="phonelist">
                  <div class="phoneitem" v-for="(telPhone,idx) in pointTypeItem" :key="idx" v-if="idx<15&&idx>=10">{{telPhone}}</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Moment from 'moment'
export default {
    data () {
        let curIndex = 1;
        return {
            detailShow :[true,false,false],
            phoneShow:[true,false],
            menuList:[//类别
              {
                name:'建融智合',
                isCur:true
              },{
                name:'小微快贷',
                isCur:false
              },{
                name:'行业解决方案',
                isCur:false
              }
            ],
            cciInfo:[
              {
                name:'平台简介',
                content:'“建融智合”企业智能撮合综合服务平台以中国建设银行作为服务第三方，打通线上与线下、境内与境外、系统内与外的对接渠道，为资金与资源需求双方提供智能撮合方案。',
                img:require('../../../assets/newparkimg/inclusivefinance/platform_introduce.png')
              },{
                name:'全领域撮合',
                content:'企业智能撮合综合服务平台目前已提供覆盖全行业全领域项目撮合，服务撮合、商品撮合，为公司客户提供贯穿企业生命周期各类产品、服务、项目等需求的一站式智能撮合服务，以打造建设银行服务下的企业需求智能撮合共享平台',
                img:require('../../../assets/newparkimg/inclusivefinance/field_match.png')
              },{
                name:'智慧园区',
                content:'园区模块目前的采用标准化+定制的模式，现在已有的园区大厅通用模板包括“园区概览”，“园区活动”，“园区惠政”，“园区资讯”，“园区管理”五个栏目，园区客户也可以根据自身情况，加入新的栏目。',
                img:require('../../../assets/newparkimg/inclusivefinance/smart_park.png')
              },{
                name:'平台技术',
                content:'知识图谱技术，整合企业需求服务、用户行为、企业信用评价等多维度信息，自然语言处理技术将多维度、多渠道的信息资源转化成结构化数据，并进行分析与预测客户画像技术与人工智能算法技术为企业客户进行智能撮合与商机推介，使企业客户跨越时间与空间的障碍，交换资源、拓展渠道。以信息共享为线索',
                img:require('../../../assets/newparkimg/inclusivefinance/platform_tec.png')
              }
            ],
            smLoan:[
              {
                name:'',
                img:require('../../../assets/newparkimg/inclusivefinance/creditQuick Loan.png'),
                condition:'小微企业主:信用状况良好；中国内地居民（不含港澳台）；个人网银网银盾客户；持有建行个人金融资产（包括存款、理财等）或诚信纳税企业。',
                feature:'信用贷款，免抵押、免担保；全流程线上办理；自主支用，随借随还，按实际使用金额及天数计息。'
              },{
                name:'',
                img:require('../../../assets/newparkimg/inclusivefinance/mortgageQuickLoan.png'),
                condition:'小微企业主:信用状况良好；中国内地居民（不含港澳台）；个人网银网银盾客户；拥有优质房产或者在建设银行尚有个人住房贷款。',
                feature:'线上审批，线下签约；房产抵押或存量按揭贷款住房二次顺位抵押；自主支用，随借随还，按实际使用金额及天数计息。'
              },{
                name:'',
                img:require('../../../assets/newparkimg/inclusivefinance/hypothecation QuickLoan.png'),
                condition:'小微企业主；信用状况良好；中国内地居民（不含港澳台）；个人网银网银盾客户；持有建行个人或企业金融资产（包括存款、理财等）。',
                feature:'质押贷款；全流程线上办理；自主支用，随借随还，按实际使用金额及天数计息。'
              },{
                name:'',
                img:require('../../../assets/newparkimg/inclusivefinance/platformQuick Loan.png'),
                condition:'小微企业主；信用状况良好；中国内地居民（不含港澳台）；个人网银网银盾客户；电商、政府、供应链等合作平台上小微企业。',
                feature:'特定客户群；全流程线上办理；自主支用，随借随还，按实际使用金额及天数计息。'
              }
            ],
            industrySolutions:[
              {
                name:'传统服务行业',
                icon:'icon-fuwu',
                secDec:'有在线支付及收款需求的传统行业商户',
                resolveCase:'传统服务行业解决方案',
                caseDec:'为传统行业商户提供全面的综合金融服务方案'
              },{
                name:'收银及商场',
                icon:'icon-mall',
                secDec:'有收银、受理银行卡支付、实时结算需求商户',
                resolveCase:['收银通','商场通','自付通','全币通'],
                caseDec:['提供受理卡片类支付的通用型产品','提供收单系统嵌入商场收银系统的产品','提供持卡人用自助设备完成银行卡支付的产品','持卡人可选择本国货币为实时结算币种的产品']
              },{
                name:'缴费业务商户',
                icon:'icon-jiaofei',
                secDec:'借助银行系统完成缴费业务的商户',
                resolveCase:['网络缴费解决方案','缴费通'],
                caseDec:['为网络缴费商户提供综合服务方案','为缴费商户提供“查询-代缴”等综合服务']
              },{
                name:'慧兜圈及O2O行业',
                icon:'icon-xianshang',
                secDec:'具有应用场景和移动支付需求的商户',
                resolveCase:['慧兜圈','O2O行业解决方案','桌边通'],
                caseDec:['提供受理刷卡、扫码支付、优惠推送等服务','提供二维码收款、优惠促销、贷款理财等服务','实现收银、消费清单打印、结账支付等服务']
              },{
                name:'第三方支付机构',
                icon:'icon-disanfangzhifu',
                secDec:'与银行有业务合作需求的第三方支付机构',
                resolveCase:['第三方支付机构解决方案'],
                caseDec:['网络支付与结算、备付金存管等业务合作方案']
              },{
                name:'新兴行业',
                icon:'icon-kejichuangxin',
                secDec:'共享经济等新兴行业',
                resolveCase:['新兴行业解决方案'],
                caseDec:['为出行、外卖、视频付费等行业提供综合服务']
              },{
                name:'酒店及连锁行业',
                icon:'icon-jiudian',
                secDec:'有收银、受理银行卡支付、实时结算需求商户',
                resolveCase:['酒店行业解决方案','连锁行业解决方案'],
                caseDec:['提供与酒店订房管理系统直接对接的产品','满足总分店模式分别收银、集中管理的产品']
              },{
                name:'物流行业',
                icon:'icon-wuliu',
                secDec:'有整合物流和支付全流程需求的商户',
                resolveCase:['物流通'],
                caseDec:['为出行、外卖、视频付费等行业提供综合服务']
              },{
                name:'医疗行业',
                icon:'icon-yiliaojiankang',
                secDec:'提供“挂号-就诊-付费”一体化支付产品',
                resolveCase:['就医通'],
                caseDec:['提供“挂号-就诊-付费-查询”一体化服务']
              },,{
                name:'B2B行业',
                icon:'icon-xiazai49',
                secDec:'有资金结算、融资等需求的平台型客户',
                resolveCase:['B2B行业解决方案'],
                caseDec:['提供资金结算、现金管理、融资等综合服务']
              }
            ],
            pointPhone:[//网点电话
              [
                "东风中路支行：3312592",
                "七一中路支行 ：5019488",
                "五四东路支行 ：5077655",
                "融汇支行 ：2273709",
                "裕华西路支行 ：2059250",

                "城建支行 ：3025339",
                "恒祥南大街支行 ：2016042",
                "五四西路支行 ：3012303",
                "农大支行 ：2177256",
                "农大支行 ：2177256",

                "高开区支行 ：3329353",
                "阳光大街支行 ：3270762",
                "天威西路支行 ：3211771",
                "隆昌路支行 ：3375112",
                "京南一品小区支行 ：3373287"
              ],[
                "定州支行 ：2331253",
                "白沟新城支行 ：2886881",
                "蠡县支行 ：6213011",
                "高阳支行 ：6625726",
                "望都支行： 7722253",

                "涿州支行 ：3865663",
                "安国支行 ：3551751",
                "唐县支行： 6420679",
                "定兴支行 ：6826626",
                "易县支行 ：8275096",

                "高碑店支行 ：2907161",
                "满城支行 ：7077372",
                "徐水支行 ：8676900",
                "清苑支行 ：8016171",
                "涞水支行 ：4517812"
              ]
            ],
            pointType:[{name:'市区',isCur:true},{name:'县城',isCur:false}]       
        }
        console.log(this.menuList)
    },
    async created(){
        /*await this.getCount()
        await this.getList()*/
    },
    computed: {
        curId(){
            return this.$route.params.id
        }
    },
    filters: {
        timerFormat(vaule){
           return Moment(vaule).format("YYYY-MM-DD HH:mm")
        },
        statusFormat(value){
            let statusList={
                "10":"园区待审核",
                "01":"园区审核中",
                "02":"审核通过",
                "11":"邀请待回复",
                "12":"园区审核未通过",
                "21":"企业待审核",
                "05":"企业审核中",
                "03":"企业审核未通过",
                "13": "高级管理员待审核",
                "14": "高级管理员审核中"
            }
            return statusList[value]?statusList[value]:''
        },
        idType(value){
            let flag = false;
            let rzz = JSON.parse(window.localStorage.getItem('rzz'));
            for (let i = 0; i < rzz.length; i++) {
              if (rzz[i].code == value) {
                flag = true;
                return rzz[i].name;
              }
            }
            if(!flag){
                return '其他行业';
            }
        }
    },
    methods:{
      showInclusiveDetail(item,index){
        let that = this;
        that.curIndex = index;
        for (let i = 0; i < that.detailShow.length; i++) {
          that.detailShow[i] = false;
        }
        that.detailShow[index] = true;
        for (let j = 0; j < that.menuList.length; j++) {
          that.menuList[j].isCur = false;
        }
        if(that.detailShow[index]){
          that.menuList[index].isCur = true;
        }
      },
      showPointPhoneDetail(item,index){
        let that = this;
        for (let i = 0; i < that.phoneShow.length; i++) {
          that.phoneShow[i] = false;
          that.pointType[i].isCur = false
        }
        that.phoneShow[index] = true; 
        that.pointType[index].isCur = true;         
        console.log(that.phoneShow)     
      }
    }
};
</script>

<style lang='less' scoped>
    .inclusivefinance{
      background:#fff;
      .main_banner{
        height: 500px;
        background: url(../../../assets/newparkimg/inclusivefinance/inclusiveFinance_banner.png) center no-repeat;
      }
      .inclusive_menu{
        width:1200px;
        margin:0 auto;
        .menulist{
          height: 34px;
          width:520px;
          margin:54px auto 0;
          .listitem{
            font-size: 20px;
            padding-bottom: 14px;
            float: left;
            width:120px;
            margin-right: 80px;
            text-align: center;
            cursor: pointer;
          }
          .listitem:last-child{
            margin-right: 0;
          }
          .listitem.cur{
            border-bottom: 1px solid #00a0e9;
          }
        }
        .inclusive_cont{
          .cci_info{
            .cci_info_list{
              position:relative;
              font-size: 18px;
              .cci_info_intro{
                position: absolute;
                top: 152px;
                left: 41px;
                width: 414px;
              }
              .list_bg{
                img{
                  width: 1200px;
                  height: 440px;
                }
              }
            }
            .cci_info_list:nth-child(2){
              .cci_info_intro{
                top: 152px;
                left: 690px;
                width: 454px;
              }
            }
            .cci_info_list:nth-child(3){
              .cci_info_intro{
                top: 153px;
                left: 60px;
                width: 375px;
              }
            }
            .cci_info_list:nth-child(4){
              .cci_info_intro{
                top: 152px;
                left: 683px;
                width: 474px;
              }
            }
          }
          .inclusive_cont_list{
            display: none;
          }
          .inclusive_cont_list.cur{
            display: block;
          }
          .sm_loan{
            width: 962px;
            margin:62px auto 0;
            .sm_loan_list{
              overflow: hidden;
              margin-top: 40px;
              .detail_img{
                float: left;
                margin-right: 106px;
                width:500px;
                height: 270px;
                img{
                  width:100%;
                  height: 100%;
                }
              }
              .detail_right{
                float: left;
                width:356px;
                .detail_checkin{
                  margin:48px 0 31px;
                  span{
                    font-size: 20px;
                    cursor: pointer;
                  }
                  span.cur{
                    color:#00a0e9;
                  }
                  .seperate{
                    display: inline-block;
                    margin:0 40px;
                  }
                }
                .detail_checkin_info{
                  .check_condition{}
                  .check_characteristic{
                    font-size: 16px;
                    line-height: 18px;
                  }
                }
              }
            }
          }
        }
      }
      .bankpoint{
        padding-bottom: 69px;
        width:1200px;
        .checktowebsite{
          text-align: right;
          a{
            color:#00a0e9;
            font-size:16px;
          }
        }
        .pointphoneinfo{
          .pointhead{
            text-align: center;
            font-size: 24px;
            margin-top: 64px; 
          }
          .pointtype{
            overflow: hidden;
            width: 300px;
            margin:35px auto 65px;
            .typelist{
              float: left;
              width:120px;
              padding-bottom:15px;
              text-align: center;
              font-size: 20px;
              line-height: 24px;
              cursor: pointer;
              margin:0 15px;
            }
            .typelist.cur{
              border-bottom:solid 3px #00a0e9;
            }
          }
          .pointphone{
            .typeinfo{
              display: none;
              overflow: hidden;
              .phonelist{
                float: left;
                width:400px;
                margin-left: -1px;
                text-indent:100px;
                border-right:solid 1px #c6c6c6;
                font-size: 18px;
                line-height: 24px;
                .phoneitem{
                  margin-bottom: 42px;
                }
                .phoneitem:nth-child(5n){
                  margin-bottom: 0  !important;
                }
              }
              .phonelist:last-child{
                border-right:none;
              }
            }
            .typeinfo.cur{
              display: block;
            }
          }
        }
      }
    }

</style>
