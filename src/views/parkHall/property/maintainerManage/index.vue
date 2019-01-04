<template>
<div class="tab-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新增员工" name="first">
        </el-tab-pane>
        <el-tab-pane label="员工列表" name="second">
        </el-tab-pane>
    </el-tabs>

    <div class="tab-content" v-if="tabType == 0">
        <div class="basecon">
            <div class="base_tablecon">
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>员工号：</span>
                    <el-input class="tdcon_input" v-model="newMaintainer.no" placeholder="请输入员工号"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>姓名：</span>
                    <el-input class="tdcon_input"  v-model="newMaintainer.name" placeholder="请输入人员名称"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>物业公司：</span>
                    <el-input class="tdcon_input" v-model="newMaintainer.companyName" placeholder="请输入物业公司名称"></el-input>
                </div>

                   <div class="tdcon">
                    <span class="inline_span"><em>*</em>物业编号：</span>
                    <el-input class="tdcon_input" v-model="newMaintainer.companyNo" placeholder="请输入物业公司编号"></el-input>
                </div>

                <div class="tdcon">
                    <span class="inline_span"><em>*</em>人员类型：</span>
                    <el-input class="tdcon_input" v-model="newMaintainer.type" placeholder="请输入人员类型"></el-input>
                </div>

                <div class="tdcon">
                    <span class="inline_span"><em>*</em>联系电话：</span>
                    <el-input class="tdcon_input" v-model="newMaintainer.phoneNumber" placeholder="请输入联系电话"></el-input>
                </div>
            </div>
        </div>
        <div class="toolcon">
            <el-button v-if="!updateFlag" type="primary" size="small" @click="addMaintainer">创&nbsp;&nbsp;&nbsp;&nbsp;建</el-button>
            <el-button v-if="updateFlag" type="primary" size="small" @click="updateMaintainer">变&nbsp;&nbsp;&nbsp;&nbsp;更</el-button>
        </div>
    </div>
    <div class="tab-content" v-if="tabType == 1">
       <el-table
            :data="maintainerList"
            border
            style="width: 100%">
            <el-table-column
                prop="no"
                label="员工号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="150">
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="物业公司名称"
                width="150">
            </el-table-column>
            <el-table-column
                prop="companyNo"
                label="物业公司编号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="type"
                label="人员类型"
                width="150">
            </el-table-column>
            <el-table-column
                prop="phoneNumber"
                label="联系电话"
                width="150">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
            <template slot-scope="scope">
                <el-button @click="updateMaintainerClick(scope.row)" type="text" size="small">变 更</el-button>
                <el-button @click="discardMaintainerClick(scope.row)" type="text" size="small">删  除</el-button>
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
</div>
</template>

<script>
import Moment from "moment";
export default {
  name: "maintainer-manager",
  components: {},
  data() {
    return {
      parkId: sessionStorage.getItem("parkId") || "",
      userInfo: JSON.parse(localStorage.getItem("userInfo") || '{}'),
      activeName: "first",
      tabType:0,
      updateFlag:false,
      newMaintainer: {},
      page:{
          pageNum:1,
          pageSize:10,
      },
      total:0,
      maintainerList: [],
      pageRanges:[10,20,50],
    };
  },
  created(){

  },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD");
    },
  },
  methods: {
    handleSizeChange(val) {
        this.page.pageSize=val;
        this.getMaintainerList();
    },
    handleCurrentChange(val) {
        this.page.pageNum=val;
        this.getMaintainerList();
    },
    handleClick(tab, event) {
        this.tabType = tab.index;
        this.updateFlag = false;
       if(this.tabType == 0)
       {
            this.newMaintainer = {};
       }else{
            this.getMaintainerList();
       }
    },
    getMaintainerList(){
        this.$post(this.$apiUrl.merchant.getMaintenanceManInfoPage,{
            pageNum:this.page.pageNum,
            pageSize:this.page.pageSize,
            parkId:this.parkId
        }).then(response =>{
            if(response.resultCode == 'CLT000000000')
            {
                this.maintainerList = response.resultData.list;
                this.total = response.resultData.total;
            }
        });
    },
    validateMaintainer(){
        if (!this.newMaintainer.no) {
          this.$message("人员编号不能为空！");
          return false;
        }
         if (!this.newMaintainer.name) {
          this.$message("人员姓名不能为空！");
          return false;
        }
         if (!this.newMaintainer.companyName) {
          this.$message("所属公司名称不能为空！");
          return false;
        }
        if (!this.newMaintainer.companyNo) {
          this.$message("所属公司编号不能为空！");
          return false;
        }
        if (!this.newMaintainer.phoneNumber) {
          this.$message("人员手机号码不能为空！");
          return false;
        }
        if (!this.newMaintainer.type) {
          this.$message("人员类型不能为空！");
          return false;
        }

        return true;
    },
    // 点击删除维修人员信息
    discardMaintainerClick(row) {
        this.$confirm('确认删除', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '考虑一下',
            type: 'warning'
        }).then(() =>{
            this.$post(this.$apiUrl.merchant.deleteMaintenanceManInfo, {
                mmiId: row.mmiId,
            }).then(response =>{
                if(response.resultCode == 'CLT000000000')
                {
                    this.$message('删除成功！');
                    this.getMaintainerList();
                }
            });
        })
    },
    // 点击变更维修人员信息
    updateMaintainerClick(row){
        this.activeName = "first",
        this.updateFlag = true;
        this.tabType = 0;
        this.newMaintainer = row;
    },
    // 变更维修人员信息
    updateMaintainer(){
        if(!this.validateMaintainer())
        {
            return;
        }
        let newMaintainer = this.newMaintainer;
        this.$post(this.$apiUrl.merchant.updateMaintenanceManInfo,  newMaintainer
         ).then(response =>{
            if(response.resultCode == 'CLT000000000')
            {
                this.$message('成功变更维修人员信息！');
                this.handleClick({index:1});
                this.updateFlag = false;
                this.activeName = 'second';
            }
        });
    },
    // 新增维修人员信息
    addMaintainer(){
        if(!this.validateMaintainer())
        {
            return;
        }
        let newMaintainer = this.newMaintainer;
        this.$post(this.$apiUrl.merchant.addMaintenanceManInfo,Object.assign({}, newMaintainer,{
            parkId:this.parkId
        })).then(response =>{
            if(response.resultCode == 'CLT000000000')
            {
                this.$message('成功新增维修人员信息！');
                this.handleClick({index:1});
                this.updateFlag = false;
                this.activeName = 'second';
            }
        });
    },
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
  padding: 0 55px;
}

.signup_tablecon {
  padding: 0 55px;
}

.ticket_tablecon {
  padding: 0 55px;
}

.toolcon {
  text-align: center;
  padding: 30px 0;
}

.tab-content{
    min-height: 500px;
}
</style>
