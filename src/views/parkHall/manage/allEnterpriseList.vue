<template>
    <div class="allenterprise">
        <!-- 加入的企业模块 -->
        <!-- <div class="breadcrumbtrail">首页>入驻企业</div> -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="main_inter">
            <div class="com-tit">入驻企业</div>
            <div class="com-brf">入驻企业400+家，在职人员10000+人</div>
            <div class="enterlist">
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
            </div>
            <!-- 分页部分 -->
            <div class="pageList">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[25]"
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
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    export default {
        mixins:[mixins_windowOpen],
        components: {
            EsspBreadCrumb
        },
        data () {
            return {
                breadlist: [
                    {
                        path: '/',
                        name: "首页",
                    },
                    {
                        path: "",
                        name: "入驻企业"
                    }
                ],
                totalCount: 0,
                pageNum: 1,
                pageSize: 25,
                en_title:this.utils.isBdPark() ? 'Entered enterprises' : '入驻企业400+家，在职人员10000+人',
                enterprises:[],
                rzzMap:new Map()
            }

        },
        async created(){
            this.queryEnterpriseList(1,25)
        },
        computed: {
            curId(){
                return this.$route.params.id
            }
        },
        filters: {

        },
        methods:{
            queryEnterpriseList(pageNum,pageSize){
                this.$post('/memberManage/getMemInfo', {
                    parkId: this.SSH.getItem('parkId'),
                    pageSize:pageSize,
                    pageNum:pageNum
                }).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
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
                        // }
                    },
                    response => {
                        this.$message.error(response.resultMsg);
                    }
                );
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryEnterpriseList(this.pageNum,val)
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.queryEnterpriseList(val,this.pageSize)
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
    @import "../../../assets/css/mixin";
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
                    padding-bottom:2px;
                    padding-left:2px;
                    overflow: hidden;
                    .listitem{
                        float: left;
                        cursor: pointer;
                        width: 200px;
                        height: 150px;
                        //background-color: #00a0e9;
                        opacity: 0.8;
                        /*border: 1px solid #ccc;
                        border-left: 0;
                        border-right: 0;
                        border-bottom: 0;*/
                        margin-left: -1px;
                        margin-bottom: -1px;
                        position:relative;
                        overflow: hidden;
                        .enter_child{
                            width:100%;
                            height:100%;
                        }
                        .detailinfo{
                            background-color:#fff;
                            opacity: 0;
                            overflow: hidden;
                            .enterprisename{
                                margin:-60px auto 10px;
                                height: 20px;
                                padding:0 15px;
                                .esspellipsis();
                                text-align: center;
                                transition: all ease .8s ;
                            }
                            .enterprisetype{
                                width:100%;
                                text-align: center;
                                margin:-60px auto 5px;
                                transition: all ease .8s ;
                            }
                            p{
                                font-size: 14px;
                                color: #ffffff;
                            }
                            .checkenterprise{
                                margin:260px auto 0;
                                border:1px solid #fff;
                                width: 120px;
                                height: 30px;
                                line-height:30px;
                                transition: all ease .8s ;
                            }
                        }
                        .detailinfo.cur{
                            position:absolute;
                            left:0;
                            top:0;
                            background-color:rgba(0,160,233,0.8);
                            color:#fff;
                            text-align: center;
                            font-size: 16px;
                            width:100%;
                            height: 100%;
                            opacity: 1;
                            .enterprisename{
                                margin:36px auto 10px;
                                .esspellipsis();
                            }
                            .enterprisetype{
                                margin:0 auto 5px;
                            }
                            .checkenterprise{
                                margin:10px auto 0;
                            }
                        }
                    }
                }
            }
            .pageList{
                text-align: right;
                padding-right:40px;
                padding-bottom:40px;
            }
        }
    }
</style>
