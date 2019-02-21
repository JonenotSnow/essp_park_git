<template>
    <div class="el-main">
        <div class='notice'>
            <p><i class="icon iconfont icon-guangbo" style="color: orange;"></i>【小秘书】您有
                <span>{{count.infoCount?count.infoCount:0}}</span>
                条未被领取的资讯发布申请，快来处理吧~</p>
        </div>
        <div class="baseInfo">
            <div class="searchAdd">
                <ul>
                    <li>
                        <div>
                            <span>资讯标题：</span>
                            <input type="text" v-model="searchCondition.title" placeholder="请输入资讯标题">
                        </div>
                        <div>
                            <span>发布公司：</span>
                            <input type="text" v-model='searchCondition.companyName' placeholder="请输入发布公司">
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
            <p class="saveBtn">
                <el-button type="primary" size='small' @click='getList'>查询</el-button>
                <el-button type="info" size='small' @click='reset'>重置</el-button>
            </p>
            <p>采取先到先得的任务领取审核方式</p>
            <div class="tabList">
                <el-table
                    :data="list"
                    @row-click="getDetail"
                    style="width: 100%">
                    <el-table-column align="center" type="index" label="全部" width="85"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="informationTitle" label="资讯标题" width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="cstNm" label="发布公司"></el-table-column>
                    <el-table-column align="center" prop="joinTime" label="提交时间" width="140">
                        <template slot-scope="scope">
                            {{scope.row.createTime | timerFormat(scope.row.createTime)}}
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
                            <el-button type="text" v-else @click.stop="cancelAudit(scope.row.informationId)">领取并审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pageList" v-if="totalCount>5">
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
import Moment from 'moment'
export default {
    data () {
        return {
            totalCount:0,
            pageNum:1,
            pageSize:5,
            count:{},
            list:[],
            statusList:[
                {
                    id: "",
                    name: "全部",
                },
                {
                    id: "02",
                    name: "发布中"
                },
                {
                    id: "12",
                    name: "园区审核未通过"
                }
            ],
            searchCondition:{
                parkId : sessionStorage.getItem("parkId"),
                type : '03',
                startDate :'',
                endDate : '',
                status : '',
                companyName : '',
                title:''
            }
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
    },
    filters: {
        timerFormat(vaule){
           return Moment(vaule).format("YYYY-MM-DD HH:mm")
        },
        statusFormat(value){
            let statusList={
                "10": "审核中",
                "02": "发布中",
                "12": "园区审核未通过",
                "13": "审核中"
            }
            return statusList[value]?statusList[value]:''
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
        //list列表
        getList(){
            var pop = {
                parkId : this.searchCondition.parkId,
                type : this.searchCondition.type,
                startDate :this.searchCondition.startDate,
                endDate : this.searchCondition.endDate,
                status : this.searchCondition.status,
                companyName : this.searchCondition.companyName,
                title:this.searchCondition.title,
                pageNum : this.pageNum,
                pageSize : this.pageSize
            }
            this.$post(this.$apiUrl.manage.getAuditList,pop).then((response) => {
                this.list = response.resultData.infomationList;
                this.totalCount = response.resultData.infomationCount;
            },(response)=>{
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
            this.searchCondition.companyName =
            this.searchCondition.title = '';
            this.getList()
        },
        //校验审核状态
        cancelAudit(id){
            this.$router.push({path:'/parkHall/manage/manageZXAuditing',query:{id:id}})
        },
        getDetail(rows){

            if (!rows.informationId) {
                this.$message({
                    type: 'warn',
                    message: '资讯id不能为空'
                });
                return;
            }
            this.$router.push({path:'/parkHall/manage/manageZXAuditingDetail',query:{entityId:rows.informationId}});
        }
    }
};
</script>

<style lang='less' scoped>
    .el-main{
        /*margin-left: 10px;*/
        width:1010px;
        padding:0;
        .notice{
            height:50px;
            width: 990px;
            // background: #f5f5f5;
            p{
                height:50px;
                line-height:50px;
                font-size: 16px;
                color: #00a0e9;
                background-color: #e6f4ff;
                i{
                    color: orange;
                    margin-left:34px;
                }
            }
        }
        .baseInfo{
            width: 990px;
            margin-bottom:50px;
            // min-height: 570px;
            padding-bottom:20px;
            background-color: #ffffff;
            .searchAdd{
                height:150px;
                &>ul{
                    width:885px;
                    margin: 0 auto;
                    padding:25px 0 10px;
                    li{
                        width:100%;
                        height:30px;
                        line-height:50px;
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
                                height: 35px;
                                background-color: #ffffff;
                                border: solid 1px #cccccc;
                                caret-color: #666;
                                color: #606266;
                                border: 1px solid #e4e7ed;
                                background: #fff;
                                border-radius: 4px;
                            }
                            &>select{
                                width: 164px;
                                padding:0 5px;
                                outline: none;
                                height: 35px;
                                background-color: #ffffff;
                                border: solid 1px #cccccc;
                                caret-color: #666;
                                color: #606266;
                                border: 1px solid #e4e7ed;
                                background: #fff;
                                border-radius: 4px;
                            }
                        }
                    }
                }
            }
            &>p{
                &:nth-of-type(1){
                    text-align: center;
                    margin-bottom:25px;
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

            .saveBtn{
                button{
                    font-size:16px;
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
                margin:30px auto;
                text-align: right;
            }
        }
    }

</style>
