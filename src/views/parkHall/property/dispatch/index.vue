<template>
    <div class="tab-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="新增报修" name="first">
            </el-tab-pane>
            <el-tab-pane label="报修列表" name="second">
            </el-tab-pane>

        </el-tabs>

        <div class="tab-content" v-if="tabType == 0">
            <div class="basecon">
                <div class="base_tablecon">
                    <!-- <div class="tdcon">
                        <span class="inline_span">
                        <em>*</em>单号：</span>
                        <el-input class="tdcon_input" v-model="newCompaint.repairNumber" placeholder="请输入报修单号"></el-input>
                    </div> -->
                    <div class="tdcon">
                        <span class="inline_span">
                        <em>*</em>建筑名称：</span>
                        <el-input class="tdcon_input"  v-model="newCompaint.buildingName" placeholder="请输入建筑名称" maxlength="16"></el-input>
                    </div>
                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>房间号：</span>
                        <el-input class="tdcon_input" v-model="newCompaint.roomcode" placeholder="请输入房间号" maxlength="16"></el-input>
                    </div>
                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>客户编号：</span>
                        <el-input class="tdcon_input" v-model="newCompaint.customerNumber" placeholder="请输入客户编号" maxlength="16"></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>客户名称：</span>
                        <el-input class="tdcon_input" v-model="newCompaint.customerName" placeholder="请输入客户名称" maxlength="16"></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>联系人：</span>
                        <el-input class="tdcon_input" v-model="newCompaint.contactName" placeholder="请输入联系人" maxlength="11"></el-input>
                    </div>


                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>联系电话：</span>
                        <el-input class="tdcon_input" v-model="newCompaint.contactPhone" placeholder="请输入联系电话" maxlength="11"></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">类型：</span>
                        <el-input class="tdcon_input" v-model="newCompaint.repairType" placeholder="类型" maxlength="3"></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">来源：</span>
                        <el-select class="tdcon_input" v-model="newCompaint.repairSource"  placeholder="来源">
                            <el-option label="现场申报" value="1"></el-option>
                            <el-option label="电话申报" value="2"></el-option>
                            <el-option label="网上申报" value="3"></el-option>
                        </el-select>
                    </div>

                      <div class="tdcon">
                        <span class="inline_span">状态：</span>
                        <el-select class="tdcon_input" v-model="newCompaint.repairStatus"  placeholder="状态">
                            <el-option label="待确认" value="1"></el-option>
                            <el-option label="待分派" value="2"></el-option>
                            <el-option label="处理中" value="3"></el-option>
                            <el-option label="已关闭" value="4"></el-option>
                            <el-option label="已撤销" value="5"></el-option>
                        </el-select>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">紧急程度：</span>
                        <el-select class="tdcon_input" v-model="newCompaint.priority"  placeholder="紧急程度">
                            <el-option label="紧急" value="1"></el-option>
                            <el-option label="一般" value="2"></el-option>
                        </el-select>
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
                        <span class="inline_span">
                            <em>*</em>受理时间：</span>
                        <el-date-picker
                            class="tdcon_input"
                            v-model="newCompaint.acceptTime"
                            >
                        </el-date-picker>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">
                           <em>*</em> 要求完成时间：</span>
                            <el-date-picker
                            class="tdcon_input"
                            v-model="newCompaint.requireTime"
                            >
                        </el-date-picker>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">
                            预约时间：</span>
                            <el-date-picker
                            class="tdcon_input"
                            v-model="newCompaint.makeTime"
                            >
                        </el-date-picker>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">
                            <em>*</em>维修地址：</span>
                             <el-input class="tdcon_input" v-model="newCompaint.address" placeholder="请输入维修地址" maxlength="85"></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">详细信息：</span>
                        <el-input class="tdcon_input" type="textarea" v-model="newCompaint.details" maxlength="85"></el-input>
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
                        <el-input class="tdcon_input" type="textarea" v-model="newCompaint.performance" maxlength="85"></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">受理人：</span>
                        <el-select class="tdcon_input" value-key="cstId" v-model="acceptPerson"  placeholder="受理人">
                            <el-option v-for="(item,index) in maintainerList" :key="index" :label="item.cstNm" :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="toolcon">
                <el-button v-if="!updateFlag" type="primary" size="small" @click="addCompaint">创&nbsp;&nbsp;&nbsp;&nbsp;建</el-button>
                <el-button v-if="updateFlag" type="primary" size="small" @click="updateCompaint">变&nbsp;&nbsp;&nbsp;&nbsp;更</el-button>
            </div>
        </div>
        <div class="tab-content" v-if="tabType == 1">
            <el-table
                :data="dispatchList"
                border
                style="width: 100%">
                <el-table-column
                    prop="triId"
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
                    <el-button @click="previewCompaintClick(scope.row)" type="text" size="small">查 看</el-button>
                     <el-button v-if="scope.row.attachment" @click="download(scope.row)" type="text" size="small">下载附件</el-button>
              
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

         <el-dialog :visible.sync="previewFlag"
               title="预览"
               width="650px"
               center>
              <div class="basecon">
                <div class="base_tablecon">
                    <div class="tdcon">
                        <span class="inline_span">
                        <em>*</em>单号：</span>
                        <el-input class="tdcon_input" v-model="previewCompaint.triId" placeholder="请输入报修单号" readonly></el-input>
                    </div>
                    <div class="tdcon">
                        <span class="inline_span">
                        <em>*</em>建筑名称：</span>
                        <el-input class="tdcon_input"  v-model="previewCompaint.buildingName" placeholder="请输入建筑名称" readonly></el-input>
                    </div>
                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>房间号：</span>
                        <el-input class="tdcon_input" v-model="previewCompaint.roomcode" placeholder="请输入房间号" readonly></el-input>
                    </div>
                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>客户编号：</span>
                        <el-input class="tdcon_input" v-model="previewCompaint.customerNumber" placeholder="请输入客户编号" readonly></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>客户名称：</span>
                        <el-input class="tdcon_input" v-model="previewCompaint.customerName" placeholder="请输入客户名称" readonly></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>联系人：</span>
                        <el-input class="tdcon_input" v-model="previewCompaint.contactName" placeholder="请输入联系人" readonly></el-input>
                    </div>


                    <div class="tdcon">
                        <span class="inline_span"><em>*</em>联系电话：</span>
                        <el-input class="tdcon_input" v-model="previewCompaint.contactPhone" placeholder="请输入联系电话" readonly></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">类型：</span>
                        <el-input class="tdcon_input" v-model="previewCompaint.repairType" placeholder="类型" readonly></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">来源：</span>
                        <el-select class="tdcon_input" v-model="previewCompaint.repairSource"  placeholder="来源" disabled>
                            <el-option label="现场申报" value="1"></el-option>
                            <el-option label="电话申报" value="2"></el-option>
                            <el-option label="网上申报" value="3"></el-option>
                        </el-select>
                    </div>

                      <div class="tdcon">
                        <span class="inline_span">状态：</span>
                        <el-select class="tdcon_input" v-model="previewCompaint.repairStatus"  placeholder="状态" disabled>
                            <el-option label="待确认" value="1"></el-option>
                            <el-option label="待分派" value="2"></el-option>
                            <el-option label="处理中" value="3"></el-option>
                            <el-option label="已关闭" value="4"></el-option>
                            <el-option label="已撤销" value="5"></el-option>
                        </el-select>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">紧急程度：</span>
                        <el-select class="tdcon_input" v-model="previewCompaint.priority"  placeholder="紧急程度" disabled>
                            <el-option label="紧急" value="1"></el-option>
                            <el-option label="一般" value="2"></el-option>
                        </el-select>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">上传附件：</span>
                        <div class="uploadcon">
                            <el-upload class="upload-demo" action="#" :before-upload="beforeAvatarUploadFile"
                                :file-list="fileList" readonly>
                                <el-button size="small" type="primary" disabled>点击上传</el-button>
                            </el-upload>
                        </div>
                    </div>

                     <div class="tdcon">
                        <span class="inline_span">
                            <em>*</em>受理时间：</span>
                        <el-date-picker
                            class="tdcon_input"
                            v-model="previewCompaint.acceptTime"
                            readonly
                            >
                        </el-date-picker>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">
                           <em>*</em> 要求完成时间：</span>
                            <el-date-picker
                            class="tdcon_input"
                            v-model="previewCompaint.requireTime"
                            readonly
                            >
                        </el-date-picker>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">
                            预约时间：</span>
                            <el-date-picker
                            class="tdcon_input"
                            v-model="previewCompaint.makeTime"
                            readonly
                            >
                        </el-date-picker>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">
                            <em>*</em>维修地址：</span>
                             <el-input class="tdcon_input" v-model="previewCompaint.address" placeholder="请输入维修地址" readonly></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">详细信息：</span>
                        <el-input class="tdcon_input" type="textarea" v-model="previewCompaint.details" readonly></el-input>
                    </div>


                    <div class="tdcon">
                        <span class="inline_span">
                            实际完成时间：</span>
                            <el-date-picker
                            class="tdcon_input"
                            v-model="previewCompaint.actualTime"
                            readonly
                            >
                        </el-date-picker>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">完成情况：</span>
                        <el-input class="tdcon_input" type="textarea" v-model="previewCompaint.performance" readonly></el-input>
                    </div>

                    <div class="tdcon">
                        <span class="inline_span">受理人：</span>
                        <el-select class="tdcon_input" value-key="cstId" v-model="acceptPerson"  placeholder="受理人" readonly disabled="">
                            <el-option v-for="(item,index) in maintainerList" :key="index" :label="item.cstNm" :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                </div>
                <span slot="footer"
                        class="dialog-footer">
                    <el-button type="primary"
                            @click="previewFlag = false">确 定</el-button>
                </span>
    </el-dialog>
    </div>
</template>

<script>
import Moment from "moment";
export default {
  name: "dispatch",
  components: {},
  data() {
    return {
      parkId: sessionStorage.getItem("parkId") || "",
      userInfo: this.SSH.getItem("userInfo") || "{}",
      activeName: "first",
      tabType: 0,
      updateFlag: false,
      previewFlag: false,
      newCompaint: {},
      previewCompaint: {},
      fileList: [],
      attachment: "",
      page: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      maintainerList: [],
      dispatchList: [],
      acceptPerson: {},
      pageRanges: [10, 20, 50],
      statusList: [
        { id: 1, name: "待确认" },
        { id: 2, name: "待分派" },
        { id: 3, name: "处理中" },
        { id: 4, name: "已关闭" },
        { id: 5, name: "已撤销" }
      ]
    };
  },
  created() {
    this.getMaintainerList();
  },
  filters: {
    timerFormat(vaule) {
      if (vaule) {
        return Moment(vaule).format("YYYY-MM-DD");
      }
    }
  },
  methods: {
    // 下载附件
    download(row) {
      if (!row.attachment || row.attachment == "") {
        return this.$message("没有附件");
      }
      window.open(row.attachment);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getCompaintList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getCompaintList();
    },
    handleClick(tab, event) {
      this.tabType = tab.index;
      this.updateFlag = false;
      if (this.tabType == 1) {
        this.getCompaintList();
      } else {
        this.newCompaint = {};
        this.fileList = [];
      }
    },
    getCompaintList() {
      this.$post(this.$apiUrl.merchant.getTenementRepairInfoPage, {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        parkId: this.parkId
      }).then(response => {
        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
          this.dispatchList = response.resultData.list;
          this.total = response.resultData.total;
        }
      });
    },
    validateCompaint() {
      // if (!this.newCompaint.repairNumber) {
      //   this.$message("报修单号名称不能为空！");
      //   return false;
      // }
      if (!this.newCompaint.buildingName) {
        this.$message("建筑名称不能为空！");
        return false;
      }
      if (!this.newCompaint.roomcode) {
        this.$message("房间号不能为空！");
        return false;
      }

      if (!this.newCompaint.customerNumber) {
        this.$message("客户名称不能为空！");
        return false;
      }
      if (!this.newCompaint.customerName) {
        this.$message("客户编号不能为空！");
        return false;
      }

      if (!this.newCompaint.contactName) {
        this.$message("联系人不能为空！");
        return false;
      }
      if (!this.newCompaint.contactPhone) {
        this.$message("联系电话不能为空！");
        return false;
      }

      if (!this.newCompaint.acceptTime) {
        this.$message("受理时间不能为空！");
        return false;
      }
      if (!this.newCompaint.requireTime) {
        this.$message("要求完成时间不能为空！");
        return false;
      }
      if (!this.newCompaint.address) {
        this.$message("维修地址不能为空！");
        return false;
      }
      return true;
    },
    // 点击预览报修表
    previewCompaintClick(row) {
      // console.log(row)
      this.previewCompaint = row;
      this.previewFlag = true;
      let acceptPerson = this.maintainerList.find(e => {
        return e.cstId === row.dealPersonNumber;
      });
      if (acceptPerson) this.acceptPerson = acceptPerson;
    },
    //添加上传文件
    pushFile(row) {
      this.fileList = [];
      if (!row.attachment || row.attachment == "") {
        return false;
      }
      let obj = {
        name: row.attachment.match(/.*\/(.*)/)[1],
        attachment: row.attachment
      };
      this.attachment = row.attachment;
      this.fileList.push(obj);
    },
    // 点击变更报修表
    updateCompaintClick(row) {
      (this.activeName = "first"), (this.updateFlag = true);
      this.tabType = 0;
      this.newCompaint = row;
      let acceptPerson = this.maintainerList.find(e => {
        return e.cstId === row.dealPersonNumber;
      });
      if (acceptPerson) {
        this.acceptPerson = acceptPerson;
        this.pushFile(row);
      }
    },
    // 变更报修表
    updateCompaint() {
      if (!this.validateCompaint()) {
        return;
      }
      let newCompaint = this.newCompaint;
      let acceptPerson = this.acceptPerson;
      let assignObject = {};
      if (acceptPerson.cstId) {
        assignObject = {
          dealPersonNumber: this.acceptPerson.cstId,
          personName: this.acceptPerson.cstNm,
          parkId: this.parkId,
          repairStatus: 3
        };
      } else {
        assignObject = {
          parkId: this.parkId,
          repairStatus: 1
        };
      }
      assignObject.attachment = this.attachment;
      this.$post(
        this.$apiUrl.merchant.updateTenementRepairInfo,
        Object.assign({}, this.newCompaint, assignObject)
      ).then(response => {
        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
          this.$message.success("成功变更报修表！");
          this.handleClick({ index: 1 });
          this.activeName = "second";
          this.updateFlag = false;
        }
      });
    },
    // 新增报修表
    addCompaint() {
      if (!this.validateCompaint()) {
        return;
      }
      let acceptPerson = this.acceptPerson;
      let assignObject = {};
      if (acceptPerson.cstId) {
        assignObject = {
          dealPersonNumber: this.acceptPerson.cstId,
          personName: this.acceptPerson.cstNm,
          parkId: this.parkId,
          repairStatus: 3
        };
      } else {
        assignObject = {
          parkId: this.parkId,
          repairStatus: 1
        };
      }
      assignObject.attachment = this.attachment;
      this.$post(
        this.$apiUrl.merchant.addTenementRepairInfo,
        Object.assign({}, this.newCompaint, assignObject)
      ).then(response => {
        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
          this.$message.success("成功添加新报修表！");
          this.handleClick({ index: 1 });
          this.activeName = "second";
          this.updateFlag = false;
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
    },
    // 获取维修人员信息
    getMaintainerList() {
      this.$post(this.$apiUrl.manage.getMemInfo, {
        pageNum: 1,
        pageSize: 100,
        parkId: this.parkId
      }).then(response => {
        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
          if (response.resultData.memberList.length > 0) {
            this.maintainerList = response.resultData.memberList;
            this.total = response.resultData.total;
          } else {
            this.$message("暂无维护人员信息！");
          }
        }
      });
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
    width: 15%;
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

.tab-content {
  min-height: 500px;
}
</style>
