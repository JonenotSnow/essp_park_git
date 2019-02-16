<template>
<div class="tab-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="签订合同" name="first">
        </el-tab-pane>
        <el-tab-pane label="合同列表" name="second">
        </el-tab-pane>
    </el-tabs>

    <div class="tab-content" v-if="tabType == 0">
        <div class="basecon">
            <div class="base_tablecon">
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>合同名称：</span>
                    <el-input class="tdcon_input" v-model="newContract.contractName" placeholder="请输入名称" maxlength="16"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>合同金额：</span>
                    <el-input class="tdcon_input" type="number" v-model="newContract.contractAmount" min="0" placeholder="请输入金额"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>开始终止：</span>
                        <el-date-picker
                        class="tdcon_input"
                        v-model="newContract.startAndEndTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="终止日期">
                    </el-date-picker>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>客户编号：</span>
                    <el-input class="tdcon_input" v-model="newContract.customerNumber" placeholder="请输入客户编号" maxlength="16"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>客户名称：</span>
                    <el-input class="tdcon_input" v-model="newContract.customerName" placeholder="请输入客户名称" maxlength="16"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span"><em>*</em>办理人：</span>
                    <el-input class="tdcon_input" v-model="newContract.transactor" maxlength="16" placeholder="请输入办理人" ></el-input>
                </div>
            
                <div class="tdcon">
                    <span class="inline_span">上传附件：</span>
                    <div class="uploadcon">
                        <el-upload class="upload-demo" action="#" :before-upload="beforeAvatarUploadFile"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="tdcon">
                    <span class="inline_span">备注：</span>
                    <el-input class="tdcon_input" type="textarea" v-model="newContract.remark" maxlength="33"></el-input>
                </div>
            </div>
        </div>
        <div class="toolcon">
            <el-button v-if="renewFlag" type="primary" size="small" @click="signNewContract">续&nbsp;&nbsp;&nbsp;&nbsp;租</el-button>
            <el-button v-if="!updateFlag && !renewFlag" type="primary" size="small" @click="signNewContract">创&nbsp;&nbsp;&nbsp;&nbsp;建</el-button>
            <el-button v-if="updateFlag" type="primary" size="small" @click="updateContract">变&nbsp;&nbsp;&nbsp;&nbsp;更</el-button>
        </div>
    </div>
    <div class="tab-content" v-if="tabType == 1">
       <el-table
            :data="constractList"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="contractName"
                label="合同名称"
                width="150">
            </el-table-column>
            <el-table-column
                label="开始日期"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.startTime | timerFormat(scope.row.startTime)}}
                </template>
            </el-table-column>
            <el-table-column
                label="终止日期"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.endTime | timerFormat(scope.row.endTime)}}
                 </template>
            </el-table-column>
            <el-table-column
                label="合同状态"
                width="100">
                  <template slot-scope="scope">
                    {{  statusList[Number(scope.row.contractStatus)-1]}}
                 </template>
            </el-table-column>
            <el-table-column
                label="办理日期"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.dealTime  | timerFormat(scope.row.dealTime)}}
                 </template>
            </el-table-column>
            <el-table-column
                prop="transactor"
                label="办理人"
                width="150">
            </el-table-column>
            <el-table-column
                prop="contractAmount"
                label="合同金额"
                width="150">
            </el-table-column>
            <el-table-column
                prop="customerName"
                label="客户名称"
                width="150">
            </el-table-column>
            <el-table-column
                prop="customerNumber"
                label="客户编号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                width="150">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
            <template slot-scope="scope" v-if="scope.row.contractStatus!=4">
                <el-button @click="renewContractClick(scope.row)" type="text" size="small">续签</el-button>
                <el-button @click="updateContractClick(scope.row)" type="text" size="small">变更</el-button>
                <el-button @click="discardContractClick(scope.row)" type="text" size="small">退租</el-button>
                <el-button v-if="scope.row.attachment" @click="download(scope.row)" type="text" size="small">合同附件</el-button>
           
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
  name: "contracts-manager",
  components: {},
  data() {
    return {
      parkId: sessionStorage.getItem("parkId") || "",
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      activeName: "first",
      updateFlag: false,
      renewFlag: false,
      tabType: 0,
      newContract: {},
      fileList: [],
      attachment: "",
      page: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      constractList: [],
      pageRanges: [10, 20, 50],
      statusList: ["签订", "执行中", "终止","退租"]
    };
  },
  created() {
    this.newContract.customerNumber = this.$route.query.id;
    this.newContract.customerName = this.$route.query.name;
    this.newContract.transactor = this.userInfo.truename
  },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD");
    }
  },
  methods: {
    //合同附件下载
    download(row) {
      if (!row.attachment || row.attachment == "") {
        this.$message("没有附件");
        return false;
      }
      window.open(row.attachment);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getContractList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getContractList();
    },
    handleClick(tab, event) {
      this.tabType = tab.index;
      this.updateFlag = false;
      this.renewFlag = false;
      if (this.tabType == 0) {
        this.newContract = {};
        this.fileList = [];
      } else {
        this.getContractList();
      }
    },
    getContractList() {
      this.$post(this.$apiUrl.merchant.getContractList, {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        parkId: this.parkId
      }).then(response => {
        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
          this.constractList = response.resultData.list;
          this.total = response.resultData.total;
        }
      });
    },
    // 点击续租合同
    renewContractClick(row) {
      (this.activeName = "first"), (this.renewFlag = true);
      this.tabType = 0;
      this.newContract = row;
      
      this.$set(this.newContract, "startAndEndTime", [
        row.endTime,
        row.endTime
      ]);
      // this.pushFile(row);
    },
    // 点击续租或者变更添加文档到list中
    pushFile(row) {
      this.fileList = [];
      if (!row.attachment || row.attachment == "") {
        return false;
      }
      let obj = {
        name: row.attachment.match(/.*\/(.*)/)[1],
        attachment: row.attachment
      };
      this.fileList.push(obj);
    },
    validateContract() {
      if (!this.newContract.contractName) {
        this.$message("合同名称不能为空！");
        return false;
      }
      if (!this.newContract.contractAmount) {
        this.$message("合同金额不能为空！");
        return false;
      }

      if (this.newContract.contractAmount <= 0) {
        this.$message("合同金额不能小于零！");
        return false;
      }

      if (
        !this.newContract.startAndEndTime ||
        (Array.isArray(this.newContract.startAndEndTime) &&
          this.newContract.startAndEndTime.length == 0)
      ) {
        this.$message("合同开始终止时间不能为空！");
        return false;
      }
      if (!this.newContract.customerNumber) {
        this.$message("合同客户编号不能为空！");
        return false;
      }
      if (!this.newContract.transactor) {
        this.$message("合同办理人不能为空！");
        return false;
      }
      if (!this.newContract.customerName) {
        this.$message("合同客户名称不能为空！");
        return false;
      }

      return true;
    },
    // 点击退租合同 1024 决定增加一个状态，退租状态，只更新状态，不删除
    discardContractClick(row) {
      this.$confirm("确认退租", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "考虑一下",
        type: "warning"
      }).then(() => {
        this.$post(
          this.$apiUrl.merchant.updateContractInfo,
          Object.assign(row, {
            contractStatus: 4
          })
        ).then(response => {
          if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
            this.$message.success("退租成功！");
            this.getContractList();
          }
        });
      });
    },
    // 点击变更合同
    updateContractClick(row) {
      (this.activeName = "first"), (this.updateFlag = true);
      this.tabType = 0;
      this.newContract = row;
      this.pushFile(row); //添加到filelist中
      this.$set(this.newContract, "startAndEndTime", [
        row.startTime,
        row.endTime
      ]);
    },
    // 变更合同
    updateContract() {
      if (!this.validateContract()) {
        return;
      }
      let newContract = this.newContract;
      this.newContract.startTime = newContract.startAndEndTime[0];
      this.newContract.endTime = newContract.startAndEndTime[1];
      delete this.newContract.startAndEndTime;
      this.$post(
        this.$apiUrl.merchant.updateContractInfo,
        Object.assign({}, this.newContract, {
          attachment: this.attachment,
          parkId: this.parkId,
          transactor: this.userInfo.username,
          dealTime: new Date(),
          contractStatus: 1
        })
      ).then(response => {
        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
          this.$message.success("成功变更合同！");
          this.handleClick({ index: 1 });
          this.activeName = "second";
          this.updateFlag = false;
          this.renewFlag = false;
        }
      });
    },
    // 签订,续租合同
    signNewContract() {
      if (!this.validateContract()) {
        return;
      }
      let newContract = this.newContract;
      this.newContract.startTime = newContract.startAndEndTime[0];
      this.newContract.endTime = newContract.startAndEndTime[1];
      delete this.newContract.startAndEndTime;
      this.$post(
        this.$apiUrl.merchant.addContractInfo,
        Object.assign({}, this.newContract, {
          attachment: this.attachment,
          parkId: this.parkId,
          // transactor:this.userInfo.username,
          dealTime: new Date(),
          contractStatus: 1
        })
      ).then(response => {
        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
          this.$message.success("成功签订新合同！");
          this.handleClick({ index: 1 });
          this.activeName = "second";
          this.updateFlag = false;
          this.renewFlag = false;
        }
      });
    },
    // 上传文件
    beforeAvatarUploadFile(file) {
      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据
      param.append("type", "park"); // 通过append向form对象添加数据
      param.append("model", "attachment"); // 通过append向form对象添加数据
      this.$post(this.$apiUrl.upload.upload, param).then(response => {
        this.fileList = [];
        var obj = {
          name: file.name,
          url: response.resultData[0].url
        };
        this.attachment = response.resultData[0].url;
        this.fileList.push(obj);
      });
      return false; // 返回false不会自动上传
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.tab-container {
  padding: 8px;
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

.tab-content {
  min-height: 500px;
}
</style>
