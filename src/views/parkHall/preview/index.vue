<template>
    <div class="parkHallScan">
        <p>园区概览</p>
        <el-carousel indicator-position="outside" height="450px">
            <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="listContent">
            <div class="aside">
                <p>厦门软件园二期</p>
                <p><img src="../../../assets/actdetaillogo.png" alt="" @click="$router.push('/parkIndex/scanIndex')"></p>
                <p>电话：0582-XXXXXXX</p>
                <p>地址：厦门市思明区观日路38号</p>
                <p>
                    <span @click="$router.push('/parkHall/manage/requestAddPark')">申请加入园区</span>
                </p>
            </div>
            <div class="main">
                <div>
                    <p class="title">
                        园区简介
                    </p>
                    <div>
                        <p>
                            "厦门软件园包括软件园孵化基地(一期)、软件园产业基地(二期)、软件园(三期)。
                            厦门软件园产业基地按照国家级软件园规模设计，总用地1.063平方公里，总建筑
                            面积163.64万平方米，容积率1.367，建筑密度21.5%，绿地率55%，停车位7116
                            个，将成为全国最大的软件园之一。
                        </p>
                        <p>
                            厦门软件园已获得国家火炬计划软件产业基地、软件开发国家引进外国智力示范基
                            地、中国高新区人才厦门国家高新区实训基地、大学生科技创业见习基地和高校学
                            生科技创业实习基地等多个国家级荣誉。厦门软件园一直把促进软件科技成果转化
                            、培养软件企业和企业家作为园区发展宗旨。在发展模式上，以结合厦门的区位优
                            势、城市功能定位以及产业发展现状和目标为基础，立足海西对台湾省的各方优势
                            ，突出自身特色，以建设"国内一流的、海峡西岸经济区最具有影响力软件产业园区
                            "为发展目标。"
                        </p>
                    </div>
                </div>
                <div>
                    <p class="title">地理位置</p>
                    <div>
                        <p>
                            "软件园产业基地位于厦门本岛东北地区，依山傍海，环境优美 ，背靠虎仔山城市
                            生态公园，与厦门翔安海港新城和大小金门岛隔海相望;园区紧邻国际会展中心、国
                            际网球中心、国际五星级酒店、国际会议中心、观音山国际商务营运中心、香山国
                            际游艇俱乐部码头等标志性建筑，与厦门大学、集美大学、厦门理工学院、福州大
                            学厦门工艺美术学院以及厦门新大学城咫尺之遥。厦门软件园功能配置合理、服务
                            完善、机制先进，有良好的人文环境和创业环境。"
                        </p>
                        <el-row :gutter="20">
                            <el-col :span="8" v-for="it in 3" :key="it">
                                <div class="grid-content">
                                    <img src="../../../assets/actdetaillogo.png" alt="">
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div>
                    <p class="title">服务体系</p>
                    <div>
                        <p>
                            "技术服务体系：园区公共技术服务平台将为入园企业提供低使用成本的大型硬件平
                            台、综合开发环境、测试环境及培训环境包括软件研究、开发、移植、测试、培训
                            、认证于一体的最为完善的公共技术服务平台。并将联合高等院校、科研院所创建
                            园区虚拟大学，集中优势资源，为园区提供研发、技术服务、人才培养平台。
                        </p>
                        <p>
                            公共服务体系：园区内将设立工商、税务、法律、会计、知识产权、投资、企管、综
                            合服务等部门，为入园企业提供工商注册、税务登记、法律支持、会计事务、专利
                            申办、资金筹措等一站式服务。
                        </p>
                        <p>
                            市场服务体系:为入园企业提供产品展示、市场推介、成果转化、海外交流与合作等
                            ，形成软件生产销售一条龙服务。
                        </p>
                        <p>
                            人才服务体系：提供人才引进、人才交流和人才培训等服务，为软件企业创造了良好的人才环境。
                        </p>
                        <p>
                            四个体系的建立，软件园将逐步打造成为国家级软件生产基地、软件出口基地、
                            软件专业产学研基地。它将以一流的硬件设施，优惠政策和优质、周到、热情
                            的服务为入园企业提供创业的沃土，成为海峡西岸较具规模的软件产业园。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
            }
        },
        created() {
            this.getInfo()
        },
        methods: {
            getInfo(){
                this.$post(this.$apiUrl.preview.previewModuleOne,{
                    parkId : window.sessionStorage.getItem("parkId")
                })
                .then((response) => {
                })
            }
        }
    }
</script>

<style scoped lang='less'>
.parkHallScan{
    width:1200px;
    margin:0 auto;
    &>p{
        &:nth-of-type(1){
            margin:15px 0 9px;
            font-size: 16px;
	        color: #666666;
        }
    }
    .listContent{
        margin-top:37px;
        overflow: hidden;
        .aside{
            width:270px;
            float:left;
            &>p{
                width:100%;
                margin-left:45px;
                &:nth-of-type(1){
                    line-height: 30px;
                    font-size: 16px;
                    color: #333333;
                }
                &:nth-of-type(2){
                    height:150px;
                    margin-top:18px;
                    img{
                        width:150px;
                        height:150px;
                    }
                }
                &:nth-of-type(3),
                &:nth-of-type(4){
                    font-size: 14px;
                    line-height: 20px;
                    color: #999999;
                }
                &:nth-of-type(3){
                    margin-top:20px;
                }
                &:nth-of-type(5){
                    display:inline-block;
                    width: 149px;
                    height: 40px;
                    background-image: linear-gradient(0deg, #f5f5f5 0%,  #ffffff 100%);
                    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                    border-radius: 20px;
                    border: solid 1px #cccccc;
                    font-size: 16px;
                    line-height:40px;
                    color: #666666;
                    text-align: center;
                    margin-top:33px;
                    cursor: pointer;
                    &:hover{
                        background:#eee;
                    }
                }
            }
        }
        .main{
            width:780px;
            float:right;
            &>div{
                width:100%;
                margin-bottom:40px;
                &>.title{
                    font-size: 16px;
                    color: #444444;
                }
                &>div{
                    padding-bottom:40px;
                    border-bottom: solid 1px #cccccc;
                    &>p{
                        font-size: 14px;
                        line-height: 30px;
                        color: #777777;
                        margin-top:30px;
                    }
                    .grid-content{
                        margin-top:30px;
                        img{
                            width:240px;
                            height:115px;
                        }
                    }
                }
                &:nth-last-of-type(1){
                    &>div{
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 450px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
