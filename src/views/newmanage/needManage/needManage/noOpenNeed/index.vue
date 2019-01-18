<template>
    <div id="noOpenNeed">
        <div class="baseInfo">
            <div class="searchAdd">
                <ul>
                    <li>
                        <div>
                            <span>公司名称：</span>
                            <input type="text" v-model="searchCondition.cstName" placeholder="请输入公司名称">
                        </div>
                        <div>
                            <span>发布人：</span>
                            <input type="text" v-model="searchCondition.createName" placeholder="请输入公司名称">
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>发布时间：</span>
                            <el-date-picker v-model="searchCondition.startDate" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
                            -
                            <el-date-picker v-model="searchCondition.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="saveBtn">
                <button class="my-btn btn-search" @click='getAllNeed'>查询</button>
                <button class="my-btn btn-reset" @click='reset'>重置</button>
            </div>
            <div class="selectTitle">
                <el-checkbox class="maincheck" :indeterminate="isIndeterminate" v-model="checkAll" @change="AllChange" >全选</el-checkbox>
                共
                <span class="total">{{totalCount}}</span>
                条，已选
                <span class="total">{{hascheckedNum}}</span>
                条
                <span class="removeBtn" @click="openDialog">需求导出</span>
            </div>
            <div class="tabList">
                <el-table :data="list" style="width: 100%">
                    <el-table-column align="center" label="全部" width="85">
                        <template slot-scope="scope">
                            <el-checkbox-group v-model="checkedIds" class="checktop" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="scope.row.id"></el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="title" label="需求标题" width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="cstName" label="公司名称"></el-table-column>
                    <el-table-column align="center" prop="status" label="发布时间" width="140">
                        <template slot-scope="scope">
                            {{scope.row.createTime | timerFormat(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" width="100" label="操作">
                        <template slot-scope="scope">
                            <span class="look" @click="$router.push({path:'/parkHall/manage/needManageDetail',query:{'id':scope.row.id}})">查看</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pageList">
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
        <downLoadExcel :show = 'show' @showDialog='showDialog' :checkedIds='checkedIds' :pageType="pageType"></downLoadExcel>
    </div>
</template>

<script>
import downLoadExcel from "../../../components/downLoadExcel";
 export default {
   components:{
       downLoadExcel
   },
    data () {
        return {
            checkAll: false,
            checkedIds: [],//选择的资源
            isIndeterminate: false,
            totalCount:0,
            pageNum:1,
            pageSize:5,
            list:[],
            rzz:JSON.parse(window.localStorage.getItem('rzz')),
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
                    name:'审核通过'
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
                },
                {
                    id:'13',
                    name:'高级管理员待审核'
                },
                {
                    id:'14',
                    name:'高级管理员审核中'
                }
            ],
            searchCondition:{   //查询条件
                startDate :'',  //开始时间
                endDate : '',   //结束时间
                cstName : '',    //发布人
                createName : '',//公司名称
            },
            show:false,
            pageType:'noOpenNeed'
        }
    },
    created () {
        this.getAllNeed();
    },
    computed:{
        //可以选择的id
        allListIds(){
            var ids = this.list.map(item=>{
                return item.id
            })
            return ids
        },
        //已选数量
        hascheckedNum(){
            return this.checkedIds.length;
        }
    },
   methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllNeed();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getAllNeed();
        },
        // 获取非公开需求列表
        getAllNeed(){
            if (!this.SSH.getItem('parkId')) {
                this.$message.error('园区id不能为空');
                return;
            }
            this.$post(this.$apiUrl.manageNeed.getAllNeed, {
                parkId:this.SSH.getItem('parkId'),
                pageNum:this.pageNum, 
                pageSize: this.pageSize, 
                cstName: this.searchCondition.cstName,
                createName: this.searchCondition.createName,  
                startTime : this.searchCondition.startTime,  
                endTime : this.searchCondition.endTime     
            }).then(
                response => {
                    if (response.resultData && response.resultData.list) {
                        this.list = response.resultData.list;
                        this.totalCount = response.resultData.total;
                    }
                },
                err => {
                    this.$message.error(err.resultMsg);
                }
            );
        },
        //全选
        AllChange(val) {
            this.checkedIds = val ? this.allListIds : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.allListIds.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.allListIds.length;//有选择但不是全部
        },
        //查询条件重置
        reset(){
            this.searchCondition = { 
                startDate :'',  //开始时间
                endDate : '',   //结束时间
                cstName : '',    //发布人
                createName : '',//公司名称
            }
            this.getAllNeed();
        },
        openDialog(){
            if (this.checkedIds.length == 0) {
                this.$message.error('请先选择要导出的内容');
                return;
            }
            this.show = true;
        },
        //导出弹窗
        showDialog(value){
            this.show = value.show;
        }
   }
 }
</script>
<style>
#noOpenNeed .checktop .el-checkbox__label{
    display: none;
}
</style>

<style lang='less' scoped >
#noOpenNeed{
    .baseInfo{
        width: 1000px;
        margin-bottom:50px;
        // min-height: 570px;
        padding-bottom: 20px;
        background-color: #ffffff;
        .searchAdd{
            height:135px;
            &>ul{
                width:885px;
                margin: 40px auto 0;
                padding:0 0 10px;
                li{
                    width:100%;
                    height:30px;
                    // line-height:50px;
                    margin-top:20px;
                    &>div{
                        float:left;    
                        margin-right: 35px;
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
                            caret-color: #666;
                            color: #606266;
                            border: 1px solid #e4e7ed;
                            background: #fff;
                            border-radius: 4px;
                        }
                        &>select{
                            width: 138px;
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
                    &:nth-of-type(1){
                        div:nth-of-type(2){
                            input{
                                width:119px;
                            }
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
        }
        .saveBtn {
            margin-top: 50px;
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
            .look{
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0.4px;
                color: #00a0e9;
                cursor: pointer;
            }
        }
        .pageList{
            width:880px;    
            margin: 38px auto 53px;
            text-align: right;
        }
    }
    .selectTitle{    
        margin: 59px auto 19px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0px;
        color: #666666;
        width:890px;
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
            width: 100px;
            height: 35px;
            background-image: linear-gradient(0deg, 
                #f5f5f5 0%, 
                #ffffff 100%);
            border-radius: 5px;
            border: solid 1px #cccccc;
            text-align: center;
            cursor: pointer;
            margin-left:14px;
            line-height: 35px;
        }
    }
}
</style>