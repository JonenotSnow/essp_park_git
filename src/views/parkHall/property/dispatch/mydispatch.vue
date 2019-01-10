<template>
    <div class="tab-container">
        <div class="tab-content">
               <el-table
                :data="dispatchList"
                border
                style="width: 100%">
                <el-table-column
                    prop="ciId"
                    label="报修单号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="customerNumber"
                    label="客户编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="customerName"
                    label="客户名称"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="buildingName"
                    label="楼宇"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="roomcode"
                    label="房间号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="contactName"
                    label="联系人"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="contactPhone"
                    label="联系号码"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="repairType"
                    label="类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="受理时间"
                    width="120">
                    <template slot-scope="scope">
                        {{scope.row.acceptTime | timerFormat(scope.row.acceptTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="requireTime"
                    label="要求完成时间"
                    width="100">
                    <template slot-scope="scope">
                        {{scope.row.requireTime | timerFormat(scope.row.requireTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="makeTime"
                    label="预约时间"
                    width="100">
                    <template slot-scope="scope">
                        {{scope.row.makeTime | timerFormat(scope.row.makeTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="personName"
                    label="维修人员"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="details"
                    label="详细信息"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="报修状态"
                    width="100">
                    <template slot-scope="scope">
                    {{  statusList[Number(scope.row.repairStatus)-1].name}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="performance"
                    label="完成情况描述"
                    width="100">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="updateCompaintClick(scope.row)" type="text" size="small">变 更</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.pageNum"
                    :page-sizes="pageRanges"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>


    <el-dialog :visible.sync="updateFlag"
               width="720px"
               center>
            <div class="base_tablecon">
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>单号：</span>
                    <el-input class="tdcon_input" v-model="newCompaint.repairNumber" placeholder="请输入报修单号" readonly disabled></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>建筑名称：</span>
                    <el-input class="tdcon_input"  v-model="newCompaint.buildingName" placeholder="请输入建筑名称" readonly disabled></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>房间号：</span>
                    <el-input class="tdcon_input" v-model="newCompaint.roomcode" placeholder="请输入房间号" readonly disabled></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>客户编号：</span>
                    <el-input class="tdcon_input" v-model="newCompaint.customerNumber" placeholder="请输入客户编号" readonly disabled></el-input>
                </div>

                <div class="tdcon">
                    <span class="inline_span"><em>*</em>客户名称：</span>
                    <el-input class="tdcon_input" v-model="newCompaint.customerName" placeholder="请输入客户名称" readonly disabled></el-input>
                </div>

                <div class="tdcon">
                    <span class="inline_span">
                        实际完成时间：</span>
                        <el-date-picker
                        class="tdcon_input"
                        v-model="newCompaint.actualTime"
                        >
                    </el-date-picker>
                </div>

                <div class="tdcon">
                    <span class="inline_span">完成情况：</span>
                    <el-input class="tdcon_input" type="textarea" v-model="newCompaint.performance"></el-input>
                </div>
            </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="updateFlag = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateCompaint()">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import Moment from "moment";
export default {
  name: "my-dispatch",
  components: {},
  data() {
    return {
      parkId: sessionStorage.getItem("parkId") || "",
      userInfo: this.SSH.getItem("userInfo") || '{}',
      updateFlag:false,
      newCompaint: {},
      fileList: [],
      attachment:'',
      page:{
          pageNum:1,
          pageSize:10,
      },
      total:0,
      maintainerList:[],
      dispatchList: [],
      acceptPerson:{},
      pageRanges:[10,20,50],
      statusList:[ {id:1,name:'待确认'},
      {id:2,name:'待分派'}, {id:3,name:'处理中'},{id:4,name:'已关闭'},{id:5,name:'已撤销'}]
    };
  },
  created(){
      this.getCompaintList();
  },
  filters: {
    timerFormat(vaule) {
       if(vaule)
       {
            return Moment(vaule).format("YYYY-MM-DD");
       }
    },
  },
  methods: {
    handleSizeChange(val) {
        this.page.pageSize=val;
        this.getCompaintList();
    },
    handleCurrentChange(val) {
        this.page.pageNum=val;
        this.getCompaintList();
    },
    getCompaintList(){
        this.$post(this.$apiUrl.merchant.getTenementRepairInfoPage,{
            pageNum:this.page.pageNum,
            pageSize:this.page.pageSize,
            parkId:this.parkId,
            dealPersonNumber: this.userInfo.cstId
        }).then(response =>{
            if(response.resultCode == 'CLT000000000')
            {
                this.dispatchList = response.resultData.list;
                this.total = response.resultData.total;
            }
        });
    },
    updateCompaintClick(row){
        this.updateFlag = true;
        this.newCompaint = row;
    },
    // 变更报修表
    updateCompaint(){
        let newCompaint = this.newCompaint;
        this.newCompaint.repairStatus = 4
        this.$post(this.$apiUrl.merchant.updateTenementRepairInfo,this.newCompaint).then(response =>{
            if(response.resultCode == 'CLT000000000')
            {
                this.$message('成功变更报修表！');
                this.updateFlag = false;
            }
        });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.tab-container{
    padding:8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}


//基本信息布局
.tdcon {
  overflow: hidden;
  margin-bottom: 15px;
  .inline_span {
    float: left;
    width: 12%;
    margin-right: 15px;
    font-size: 14px;
    line-height: 40px;
    color: #666666;
    text-align: right;

    em {
      color: #ff9900;
      margin-right: 5px;
    }
  }
  .tdcon_input {
    float: left;
    width: 60%;
  }
  .inline_select {
    float: left;
    width: 250px;
    background-color: #fff !important;
    .el-input {
      float: left;
      width: 100%;
    }
  }
  .inline-picker {
    float: left;
    width: 250px;
  }
  .inline-textarea {
    float: left;
    width: 33%;
  }
  .inline-box {
    float: left;
  }
}

.base_tablecon {
  padding: 0 20px;
}

.signup_tablecon {
  padding: 0 20px;
}

.ticket_tablecon {
  padding: 0 20px;
}

.toolcon {
  text-align: center;
  padding: 30px 0;
}

.tab-content{
    min-height: 500px;
}
</style>
