<template> 
    <div class="el-main">
    
        <div class="baseInfo">
            <div class="searchAdd">
                <ul>
                    <li>
                        <div>
                            <span>企业名称：</span>
                            <input type="text" v-model="searchCondition.title" placeholder="请输入资讯标题">
                        </div>
                        <div>
                            <span>联系人：</span>
                            <input type="text" v-model='searchCondition.companyName' placeholder="请输入发布公司">
                        </div>
                        <!-- <div>
                            <span>状态：</span>
                            <select v-model="searchCondition.status">
                                <option :value="it.id" v-for="(it,i) in statusList" :key="i">{{it.name}}</option>
                            </select>
                        </div> -->
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
            <p>
                <el-button type="primary" size='small' @click='getList'>查询</el-button>
                <el-button type="info" size='small' @click='reset'>重置</el-button>
            </p>
            <p>采取先到先得的任务领取审核方式</p>
            <div class="tabList">
                <el-table
                    :data="list"
                    style="width: 100%">
                    <el-table-column align="center" type="index" label="编号" width="55"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="informationTitle" label="企业名称"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="cstNm" label="联系人"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="phoneNum" label="联系方式"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="belongPark" label="规模"></el-table-column>
                    <el-table-column align="center" prop="joinTime" label="提交时间" >
                        <template slot-scope="scope">
                            {{scope.row.joinTime | timerFormat(scope.row.joinTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="state" width="200" label="状态">
                            <template slot-scope="scope">
                            <!-- <el-button type="text"  @click="changeDetail(scope.row)">修改</el-button> -->
                           
                                <el-select v-model="scope.row.selects" placeholder="请选择" @change="changeType(scope.row,scope.$index)">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                
                         </template>
                    </el-table-column>
                    
                    <!-- <el-table-column align="center" prop="status" label="状态" width="115">
                        <template slot-scope="scope">
                            {{scope.row.status | statusFormat(scope.row.status)}}
                        </template>
                    </el-table-column> -->
                    <el-table-column align="center" prop="" width="150" label="操作">
                        <template slot-scope="scope">
                            <template>
                                 <!-- <el-button type="text"  @click="changeDetail(scope.row)">领取</el-button> -->
                                <el-button type="text" @click="deleteItem(scope.row,scope.$index)">领取</el-button>
                                </template>
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
                    :page-size="5"
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

            options:[{
                label:'跟进',
                value:0
            },{
                label:'认租',
                value:1
            }],
            list:[{
                informationTitle:'信息tietle',
                cstNm:'我',
                phoneNum:12312321,
                selects:0
                }],
            statusList:[
                {
                    id:'',
                    name:'全部'
                },
                {
                    id:'10',
                    name:'园区待审核'
                },
                {
                    id:'01',
                    name:'园区审核中'
                },
                {
                    id:'02',
                    name:'发布中'
                },
                {
                    id:'12',
                    name:'园区审核未通过'
                },
                {
                    id:'21',
                    name:'企业待审核'
                },
                {
                    id:'05',
                    name:'企业审核中'
                },
                {
                    id:'03',
                    name:'企业审核未通过'
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
    // async created(){
    //     await this.getCount()
    //     await this.getList()
    // },
    computed: {
    },
    filters: {
        timerFormat(vaule){
           return Moment(vaule).format("YYYY-MM-DD")
        }
    },
    methods:{
        changeDetail (params) {
        },
        changeType (data,index){
            this.list.splice(index,1)
        },
        deleteItem (data,index){
            this.list.splice(index,1)
        },
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
            },(err)=>{
                this.$message({
                    type: 'warn',
                    message: err.returnMsg
                })
            })
        },
        //list列表
        getList(){
            this.$post(this.$apiUrl.manage.getAuditList,{
        
            })
            .then((response) => {
               
            },(err)=>{
                this.$message({
                    type: 'warn',
                    message: err.returnMsg
                })
            })
        },
        reset(){
           
        }
    }
};
</script>

<style lang='less' scoped>
    .el-main{
        margin-left: 10px;
        width:990px;
        padding:0;
        .notice{
            height:50px;
            background: #f5f5f5;
            p{
                height:40px;
                line-height:40px;
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
            min-height: 570px;
            background-color: #ffffff;
            .searchAdd{
                height:140px;
                &>ul{
                    width:750px;
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
                                width: 140px;
                                padding:0 5px;
                                outline: none;
                                height: 35px;
                                background-color: #ffffff;
                                border: solid 1px #cccccc;
                                caret-color: #666;
                            }
                            &>select{
                                width: 140px;
                                padding:0 5px;
                                outline: none;
                                height: 35px;
                                background-color: #ffffff;
                                border: solid 1px #cccccc;
                                caret-color: #666;
                            }
                        }
                    }
                }
            }
            &>p{
                &:nth-of-type(1){
                    text-align: center;
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
            &>ul,.tabList{
                border:1px solid #ebeef5;
                border-bottom:none;
                width:880px;
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
                margin-top:15px;
                width:880px;
                margin:0 auto;
                text-align: right;
            }
        }
    }

</style>
