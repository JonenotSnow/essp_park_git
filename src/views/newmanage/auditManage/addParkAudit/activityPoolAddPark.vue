<template>
    <div class="el-main" id="activityPoolAddPark">
        <div class='notice'>
            <p><i class="icon iconfont icon-guangbo" style="color: orange;"></i>【小秘书】您有
                <span>{{count.parkCount?count.parkCount:0}}</span>
                条未被领取的入园申请，快来处理吧~</p>
        </div>
        <div class="baseInfo">
            <div class="searchAdd">
                <ul>
                    <li>
                        <div>
                            <span>公司名称：</span>
                            <input type="text" v-model="searchCondition.companyName" placeholder="请输入公司名称">
                        </div>
                        <div>
                            <span>状态：</span>
                            <select v-model="searchCondition.status">
                                <option :value="it.id" v-for="(it,i) in statusList" :key="i">{{it.name}}</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>提交时间：</span>
                            <el-date-picker v-model="searchCondition.startDate" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
                            -
                            <el-date-picker v-model="searchCondition.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="saveBtn">
                <button class="my-btn btn-search" @click='checkList'>查询</button>
                <button class="my-btn btn-reset" @click='reset'>重置</button>
            </div>
            <div class="select">
                <div class="selectTitle">
                    <span class="removeBtn" @click="getList(0)" :class="{'active':touch}">申请表导出</span>
                </div>
                <div class="text">采取先到先得的任务领取审核方式</div>
            </div>
            <div class="tabList">
                <el-table :data="list" @row-click="getDetail" style="width: 100%">
                    <el-table-column align="center" type="index" label="全部" width="85"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="cstNm" label="公司名称" width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="idyTpcd" label="行业">
                        <template slot-scope="scope">
                            {{scope.row.idyTpcd | idType(scope.row.idyTpcd)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="joinTime" label="提交时间" width="140">
                        <template slot-scope="scope">
                            {{scope.row.parkCreateTime | timerFormat(scope.row.parkCreateTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="状态" width="130">
                        <template slot-scope="scope">
                            {{scope.row.status | statusFormat(scope.row.status)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" width="100" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="',10,13,'.indexOf(`,${scope.row.status},`) == -1" disabled>领取并审核</el-button>
                            <el-button type="text" v-else @click.stop="cancelAudit(scope.row)">领取并审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pageList" v-if="totalCount>5">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20,1000,2000]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Moment from 'moment'
export default {
    data () {
        return {
            startDate:'',
            endDate:'',
            totalCount:0,
            pageNum:1,
            pageSize:5,
            count:{},
            list:[],
            state:'',
            rzz:JSON.parse(window.localStorage.getItem('rzz')),
            statusList:[
                {
                    id: "",
                    name: "全部",
                },
                {
                    id: "02",
                    name: "园区审核通过"
                },
                {
                    id: "12",
                    name: "园区审核未通过"
                }
            ],
            searchCondition:{
                parkId : sessionStorage.getItem("parkId"),
                type : '01',
                startDate :'',
                endDate : '',
                status : '',
                companyName : ''
            },
            selectList:[],
            touch:false
        }
    },
    async created(){
        if (sessionStorage.getItem('LoginUserRol').includes('33')) {
            this.statusList.push(
                {
                    id: "10",
                    name: "审核中" //初级管理员
                }
            )
        }
        if (sessionStorage.getItem('LoginUserRol').includes('34')) {
            this.statusList.push(
                {
                    id:'13',
                    name:'审核中' //高级管理员
                }
            )
        }
        await this.getCount()
        await this.getList()
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
                "10": "审核中",
                "02": "园区审核通过",
                "12": "园区审核未通过",
                "13": "审核中"
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
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        //条数
        getCount(){
            this.$post(this.$apiUrl.manage.getCount,{
                parkId : sessionStorage.getItem("parkId")
            })
            .then((response) => {
                this.count = response.resultData
            })
        },
        checkList(){
            this.pageNum = 1;
            this.getList();
        },
        //list列表
        getList(type){
            //用于申请表导出查询
            let pageSize = this.pageSize;
            if (type == 0) {
                this.pageNum = 1;
                pageSize = 9999;
            }

            this.$post(this.$apiUrl.manage.getAuditList,{
                parkId : this.searchCondition.parkId,
                type : this.searchCondition.type,
                startDate :this.searchCondition.startDate,
                endDate : this.searchCondition.endDate,
                status : this.searchCondition.status,
                companyName : this.searchCondition.companyName,
                pageNum : this.pageNum,
                pageSize : pageSize
            })
            .then((response) => {
                this.list = response.resultData.applyParkList;
                this.totalCount = response.resultData.apParkCount;
                
                //用于申请表导出查询
                if (type == 0 && this.list.length>0) {
                    this.selectList = this.list.map((el)=>{
                        return el.id;
                    })
                    this.exportData()
                }
            },(err)=>{
                this.$message({
                    type: 'warn',
                    message: response.returnMsg
                })
            })
        },
        reset(){
            this.searchCondition.startDate =
            this.searchCondition.endDate =
            this.searchCondition.status =
            this.searchCondition.companyName = '';
            this.getList()
        },
        //校验审核状态
        cancelAudit(rows){
            this.$router.push({path:'/parkHall/manage/manageAuditing',query:{entityId:rows.id,cstId:rows.cstId}});
        },
        getDetail(rows){
            if (!rows.id) {
                this.$message({
                    type: 'warn',
                    message: 'id不能为空'
                });
                return;
            }
            this.$router.push({path:'/parkHall/manage/manageParkAuditDetail',query:{entityId:rows.id}});
        },
        //批量导出
        exportData () {
            this.touch = true;
            // window.location.href = "http://128.196.235.129:1345/"+ this.$apiUrl.manage.applyFormExport+'?id='+this.selectList.toString();
            window.location.href = window.location.origin + this.$apiUrl.manage.applyFormExport+'?id='+this.selectList.toString();
            setTimeout(function(){
                this.touch = false;
            },1000)
        }
    }
};
</script>
<style>
#activityPoolAddPark .el-input__inner{
    border-radius:0;
    height:35px;
}
</style>

<style lang='less' scoped>
    #activityPoolAddPark{
        width:990px;
        padding:0;
        .notice{
            height:50px;
            width: 100%;
            p{
                height:50px;
                line-height:50px;
                font-size: 16px;
                color: #00a0e9;
                background-color: #e6f4ff;
                i{
                    color: orange;
                    margin-left:34px;
                    margin-right:9px;
                }
            }
        }
        .baseInfo{
            width: 100%;
            margin-bottom:50px;
            padding-bottom: 20px;
            background-color: #ffffff;
            .searchAdd{
                height:150px;
                &>ul{
                    width:890px;
                    margin: 0 auto;
                    padding:65px 0 10px;
                    li{
                        width:100%;
                        height:60px;
                        &>div{
                            float:left;
                            margin-right:18px;
                            &>span{
                                font-size: 16px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 40px;
                                letter-spacing: 0px;
                                color: #666666;
                            }
                            &>input{
                                width: 208px;
                                padding:0 5px;
                                outline: none;
                                height: 33px;
                                caret-color: #666;
                                color: #606266;
                                border: 1px solid #e4e7ed;
                                background: #fff;
                                // border-radius: 4px;
                            }
                            &>select{
                                width: 144px;
                                padding:0 5px;
                                outline: none;
                                height: 35px;
                                background-color: #ffffff;
                                border: solid 1px #cccccc;
                                caret-color: #666;
                                color: #606266;
                                border: 1px solid #e4e7ed;
                                background: #fff;
                                // border-radius: 4px;
                            }
                        }
                        &:nth-of-type(1){
                            &>div:nth-of-type(2){
                                span{
                                    margin-left:20px;
                                }
                            }
                        }
                    }
                }
            }
            &>p{
                &:nth-of-type(1){
                    text-align: center;
                    margin-bottom:15px;
                    margin-top:59px;
                    &>button{
                        &:nth-of-type(1){
                            margin-right:79px;
                        }
                    }
                }
                &:nth-of-type(2){
                    width:890px;
                    margin:0 auto;
                    text-align: right;
                    font-size: 14px;
                    line-height: 40px;
                    color: #00a0e9;
                }
            }
            .saveBtn {
                margin-top: 55px;
                text-align: center;
                .my-btn {
                    outline: none;
                    cursor: pointer;
                    width: 60px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                }
                .btn-search {
                    margin-right: 80px;
                    background-color: #00a0e9;
                }
                .btn-reset {
                    background-color: #999;
                }
            }
            .select{
                width:890px;
                overflow: hidden;
                margin: 59px auto 15px;
                .selectTitle{    
                    width:670px;
                    float: left;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #666666;
                    .all{
                        margin-left: 10px;
                        i{
                            margin-right:6px;
                        }
                    }
                    .total{
                        font-size: 14px;
                        font-weight: normal;
                        letter-spacing: 0px;
                        color: #00a0e9;
                    }
                    .removeBtn{
                        display:inline-block;
                        width: 98px;
                        height: 33px;
                        background-image: linear-gradient(0deg, 
                            #f5f5f5 0%, 
                            #ffffff 100%);
                        border-radius: 5px;
                        border: solid 1px #cccccc;
                        text-align: center;
                        cursor: pointer;
                        line-height: 33px;
                    }
                    .active{
                        color:#00a0e9;
                        background-image: linear-gradient(0deg, 
                        #f5f5f5 0%, 
                        #ffffff 100%);
                        border: solid 1px #10b5ff;
                    }
                }
                .text{
                    float:right;
                    line-height: 35px;
                    color: #00a0e9;
                }
            }
            &>ul,.tabList{
                border:1px solid #ebeef5;
                border-bottom:none;
                width:890px;
                margin: 0 auto 20px;
                li{
                    height: 50px;
                    line-height:50px;
                    border:1px solid #ccc;
                    &>span{
                        display:inline-block;
                        text-align: center;
                        &:nth-of-type(1){
                            width:110px;
                        }
                        &:nth-of-type(2){
                            width:240px;
                        }
                        &:nth-of-type(3){
                            width:120px;
                        }
                        &:nth-of-type(4){
                            width:120px;
                        }
                        &:nth-of-type(5){
                            width:120px;
                        }
                        &:nth-of-type(6){
                            width:140px;
                        }
                    }
                    &:nth-of-type(2n){
                        border-left:1px solid #ccc;
                        border-right:1px solid #ccc;
                        border-bottom:none;
                        border-top:none;
                    }
                    &:nth-last-of-type(1){
                        border-bottom:1px solid #ccc;
                    }
                    &:nth-of-type(1){
                        background-color: #f5f5f5;
                        font-size: 16px;
                        color: #333333;
                    }
                    &:not(:first-child){
                        	font-size: 14px;
                            color: #666666;
                            &>span{
                                &:nth-last-of-type(1){
                                    i{
                                        color:#00a0e9;
                                        cursor: pointer;
                                    }
                                    .disabledClick{
                                        color:#999;
                                        cursor: not-allowed;
                                    }
                                }
                            }
                    }
                    &.noData{
                        text-align: center;
                    }
                }
            }
            .pageList{
                width:880px;
                margin:30 auto;
                text-align: right;
            }
        }
    }

</style>
