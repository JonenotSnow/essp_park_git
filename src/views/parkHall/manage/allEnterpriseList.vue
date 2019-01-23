<template>
    <div class="allenterprise">
        <!-- 加入的企业模块 -->
        <div class="breadcrumbtrail">首页>入驻企业</div>
        <div class="main_inter">
            <div class="com-tit">入驻企业</div>
            <div class="com-brf">入驻企业400+家，在职人员10000+人</div>
            <div class="enterlist">
                <div class="listcon">
                    <div class="listitem" v-for="(item,index) in enterprises" :key="index" @mouseenter="showDetail(item.isShowDetail,index)" @mouseleave="showDetail(item.isShowDetail,index)">
                        <img class="enter_child" :src="item.cstLogo">
                        <div class="detailinfo" v-if="item.isShowDetail" >
                            <p>{{item.cstNm}}</p>
                            <p>{{item.idyTpcd}}</p>
                            <div class="checkenterprise" @click="enterBusiness(item)">进入企业橱窗</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分页部分 -->
            <div class="pageList">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
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
                totalCount: 0,
                pageNum: 1,
                pageSize: 5,
                enterprises:[
                    /*{
                        cstLogo: require('@/views/newparkHall/home/imgs/logo_b1.png'),
                        cstNm:'德意志银行',
                        isShowDetail:false,
                        idyTpcd:'金融/IT'
                    },
                    {
                        cstLogo: require('@/views/newparkHall/home/imgs/logo_b2.png'),
                        cstNm:'德意志银行',
                        isShowDetail:false,
                        idyTpcd:'金融/IT'
                    },
                    {
                      cstLogo: require('@/views/newparkHall/home/imgs/logo_b3.png'),
                      cstNm:'德意志银行',
                      isShowDetail:false,
                        idyTpcd:'金融/IT'
                    },
                    {
                        cstLogo: require('@/views/newparkHall/home/imgs/logo_b4.png'),
                        cstNm:'德意志银行',
                        isShowDetail:false,
                        idyTpcd:'金融/IT'
                    },
                    {
                      cstLogo: require('@/views/newparkHall/home/imgs/logo_b5.png'),
                      cstNm:'德意志银行',
                      isShowDetail:false,
                        idyTpcd:'金融/IT'
                    },
                    {
                      cstLogo: require('@/views/newparkHall/home/imgs/logo_b6.png'),
                      cstNm:'德意志银行',
                      isShowDetail:false,
                        idyTpcd:'金融/IT'
                    }*/
                ]      ,
                rzzMap:new Map()
            }

        },
        async created(){
            this.queryEnterpriseList(1)
        },
        computed: {
            curId(){
                return this.$route.params.id
            }
        },
        filters: {

        },
        methods:{
            queryEnterpriseList(pageNum){
                this.$post('/memberManage/getMemInfo', {
                    parkId: this.SSH.getItem('parkId'),
                    pageSize:this.pageSize,
                    pageNum:pageNum
                }).then(
                    response => {
                        if (response.resultCode == "CLT000000000") {
                            if(response.resultData.memInfoCount > 0){
                                this.totalCount =response.resultData.memInfoCount
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
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.queryEnterpriseList(val)
            },
            showDetail(isTrue,index){
                let that = this;
                that.enterprises[index].isShowDetail = !isTrue;
            },
            enterBusiness(item){
                this.windowOpenUrl('/centerIndex/showHome',{cstId:item.cstId})
            }
        }
    };
</script>

<style lang='less' scoped>
    .allenterprise{
        .breadcrumbtrail{
            margin:44px auto 0;
            width:1200px;
            font-size:14px;
            line-height: 24px;
        }
        .main_inter{
            width: 1200px;
            height: 1050px;
            background-color:#fff;
            margin:0 auto 20px;
            text-align: center;
            .com-tit{
                margin-bottom: 20px;
                padding-top: 60px;
                font-size: 24px;
            }
            .com-brf{
                font-size: 16px;
            }
            .enterlist{
                .listcon{
                    width: 1005px;
                    margin:50px auto;
                    /*margin-left: 100px;
                    margin-top: 50px;*/
                    border-left:1px solid #ccc;
                    overflow: hidden;
                    .listitem{
                        border-top:1px solid #ccc;
                        float: left;
                        cursor: pointer;
                        width: 200px;
                        height: 150px;
                        //background-color: #00a0e9;
                        opacity: 0.8;
                        border-right: 1px solid #ccc;
                        border-bottom:1px solid #ccc;
                        position:relative;
                        .enter_child{
                            width:100%;
                            height:100%;
                        }
                        .detailinfo{
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
                            p{
                                margin: 14px 0;
                            }
                            .checkenterprise{
                                border:1px solid #fff;
                                width: 120px;
                                height: 30px;
                                line-height:30px;
                                margin: 0 auto;
                            }
                        }
                        .detailinfo.cur{
                            display: block;
                        }
                    }
                }
            }
            .pageList{
                text-align: right;
                padding-right:40px;
            }
        }
    }
</style>
