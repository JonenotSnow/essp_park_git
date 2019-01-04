<template>
<div class="tab-container"  :class="{'content-padding':notab}">
    <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发布招商" name="first" v-if="notab == false">
        </el-tab-pane>
        <el-tab-pane label="招商列表" name="second">
        </el-tab-pane>
    </el-tabs>

    <div class="tab-content" v-if="tabType == 0 && notab == false">
        <div class="basecon">
            <div class="base_tablecon">
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>招商标题：</span>
                    <el-input class="tdcon_input" v-model="newInnovation.atractInvestTitle" placeholder="请输入标题" maxlength="85"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                    <em>*</em>招商内容：</span>
                    <div class="inline-box wrap">
                        <essp-editor ref="childEditor"></essp-editor>
                    </div>
                </div>

                <div class="tdcon">
                    <span class="inline_span">发布人：</span>
                    <el-input class="tdcon_input" v-model="newInnovation.issuer" placeholder="请输入内容" :readonly="true"></el-input>
                </div>
            </div>
        </div>

        <div class="toolcon">
            <el-button v-if="!updateFlag" type="primary" size="small" @click="signNewInnovation(0)">暂&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
            <el-button v-if="!updateFlag || (updateFlag && newInnovation.status != 1)" type="primary" size="small" @click="publicInnovation()">发&nbsp;&nbsp;&nbsp;&nbsp;布</el-button>
            <el-button v-if="updateFlag" type="primary" size="small" @click="updateInnovation(newInnovation.status)">变&nbsp;&nbsp;&nbsp;&nbsp;更</el-button>
        </div>
    </div>
    <div class="tab-content" v-if="tabType == 1">
        <ul class="esspclearfix">
            <li class="itemli" v-for="(item, index) in innovationList" :key="index">
            <div class="infostit esspclearfix">
                <span class="spanfabu">发布人:
                    <em>{{item.issuer}}</em>
                </span>
                <span class="spantime">发布时间:
                <em>{{item.issueDate | timerFormat(item.issueDate)}}</em>
                </span>
                <span class="spanfabuzhong">
                     <em>{{ statusList[Number(item.status)]}}</em>
                </span>
                <div class="delete"  v-if="notab == false">
                   <i class="el-icon-delete" @click="discardInnovationClick(item.id)"></i>
                </div>
            </div>
            <div class="infocon esspclearfix">
                <div>
                   <h2 @click='previewInnovationDetail(item)'>{{item.atractInvestTitle}}</h2>
                </div>
                <div v-if="notab == false">
                     <el-button type="primary" @click='updateInnovationClick(item)'>修 改</el-button>
                </div>
            </div>
            </li>
        </ul>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pageNumber"
        
                :page-size="page.pageSize"
                layout="total,  prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>

    <el-dialog
        center
        :title="dataDetail.atractInvestTitle"
        :visible.sync="shouldShowPreview"
        width="50%">
        <div class="newscon">
            <div class="newstatus esspclearfix">
                <span class="statusitems">
                    <label>发布时间：</label>
                     <em>{{dataDetail.issueDate | timerFormat(dataDetail.issueDate)}} </em>
                </span>
                <span class="statusitems">
                    <label>发布人：</label>
                    <em>{{ dataDetail.issuer || '暂无发布人'}}</em>
                </span>
            </div>
        <div class="newscontain" v-html="dataDetail.atractInvestContent">
        </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="shouldShowPreview = false;dataDetail={}">确 定</el-button>
            <el-button type="primary" v-if="notab" @click="shouldShowInquery = true;">咨 询</el-button>
        </span>
    </el-dialog>


    <dialog-add :show.sync="shouldShowInquery"></dialog-add>
</div>
</template>

<script>
import Moment from "moment";
import dialogAdd from "../enterprise/changeCustManagement/index";
import EsspEditor from "@/components/EsspEditor";
export default {
  name: "park-innovation",
  components: { EsspEditor, dialogAdd },
  data() {
    return {
      parkId: sessionStorage.getItem("parkId") || "",
      userInfo: localStorage.getItem("userInfo") || {},
      notab: this.$route.name == "park-view-innovation" ? true : false,
      activeName: "first",
      updateFlag: false,
      tabType: 0,
      newInnovation: {},
      renewingInnovation: {},
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      innovationList: [],
      pageRanges: [10, 20, 50],
      shouldShowPreview: false,
      shouldShowInquery: false,
      dataDetail: {},
      total: 0,
      statusList: ["待发布", "已发布"]
    };
  },
  created() {
    if (this.notab == false) {
      this.handleClick({ index: 0 });
    } else {
      this.tabType = 1;
      this.$post(this.$apiUrl.merchant.getAttractInvestInfoList, {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize,
        status: 1,
        parkId: this.parkId
      }).then(response => {
        if (response.resultCode == "CLT000000000") {
          this.innovationList = response.resultData.listData;
          this.total = response.resultData.totalNumber;
        }
      });
    }
  },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD");
    }
  },
  watch: {
    $route() {
      this.page.pageNumber = 1;
      this.notab = this.$route.name == "park-view-innovation" ? true : false;
      if (this.notab == false) {
        this.handleClick({ index: 0 });
        this.activeName = "first";
      } else {
        this.tabType = 1;
        this.$post(this.$apiUrl.merchant.getAttractInvestInfoList, {
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize,
          status: 1,
          parkId: this.parkId
        }).then(response => {
          if (response.resultCode == "CLT000000000") {
            this.innovationList = response.resultData.listData;
            this.total = response.resultData.totalNumber;
          }
        });
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getInnovationList();
    },
    handleCurrentChange(val) {
      this.page.pageNumber = val;
      this.getInnovationList();
    },
    handleClick(tab, event) {
      if (this.notab) {
        event.preventDefault();
      } else {
        this.tabType = tab.index;
        if (this.tabType == 0) {
          this.updateFlag = false;
          this.newInnovation = {};
          this.initIssuerName();
        } else {
          this.getInnovationList();
        }
      }
    },
    initIssuerName() {
      if (this.SSH.getItem("userInfo").cstNm) {
        this.newInnovation.issuer = this.SSH.getItem("userInfo").cstNm;
      } else if (this.SSH.getItem("userInfo").username) {
        this.newInnovation.issuer = this.SSH.getItem("userInfo").username;
      }
    },
    validateInput() {
      this.editorCon = this.$refs.childEditor.editorCon;
      if (!this.newInnovation.atractInvestTitle) {
        this.$message("招商标题不能为空！");
        return false;
      }
      if (!this.editorCon) {
        this.$message("招商内容不能为空！");
        return false;
      } 
      let editorConLength = this.editorCon.length
      if (editorConLength > 341) {
        this.$message(
          "招商内容过长:需要减少 " + (editorConLength - 341) + " 位字符！"
        );
        return false;
      }
      return true;
    },
    getInnovationList() {
      this.$post(this.$apiUrl.merchant.getAttractInvestInfoList, {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize,
        parkId: this.parkId
      }).then(response => {
        if (response.resultCode == "CLT000000000") {
          this.innovationList = response.resultData.listData;
          this.total = response.resultData.totalNumber;
        }
      });
    },
    // 点击删除招商
    discardInnovationClick(id) {
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "考虑一下",
        type: "warning"
      }).then(() => {
        this.$post(this.$apiUrl.merchant.discardInnovationInfo, {
          id: id,
          parkId: this.parkId
        }).then(response => {
          if (response.resultCode == "CLT000000000") {
            this.$message("删除成功！");
            this.getInnovationList();
          }
        });
      });
    },
    // 点击变更招商
    updateInnovationClick(row) {
      (this.activeName = "first"), (this.updateFlag = true);
      this.tabType = 0;
      this.newInnovation = row;
      this.initIssuerName();
      this.$nextTick(_ => {
        this.$refs.childEditor.editorCon = row.atractInvestContent;
      });
    },
    // 变更招商信息
    updateInnovation(status) {
      let result = this.validateInput();
      if (!result) {
        return;
      }
      let newInnovation = this.newInnovation;
      this.$post(
        this.$apiUrl.merchant.updateAttractInvestInfo,
        Object.assign({}, this.newInnovation, {
          atractInvestContent: this.editorCon?this.editorCon.replace(/\s/g,'&nbsp'):'',
          status: status,
          parkId: this.parkId
        })
      ).then(response => {
        if (response.resultCode == "CLT000000000") {
          this.$message("成功变更招商信息！");
          this.newInnovation = {};
          this.activeName = "second";
          this.innovationList = [];
          this.handleClick({ index: 1 });
        }
      });
    },
    publicInnovation() {
      if (this.updateFlag) {
        this.updateInnovation(1);
      } else {
        this.signNewInnovation(1);
      }
    },
    // 发布，暂存新招商信息
    signNewInnovation(status) {
      let result = this.validateInput();
      if (!result) {
        return;
      }
      let newInnovation = this.newInnovation;
      this.$post(
        this.$apiUrl.merchant.updateAttractInvestInfo,
        Object.assign({}, this.newInnovation, {
          atractInvestContent: this.editorCon,
          status: status,
          parkId: this.parkId
        })
      ).then(response => {
        if (response.resultCode == "CLT000000000") {
          this.$message.success("成功发布新招商！");
          this.newInnovation = {};
          this.activeName = "second";
          this.innovationList = [];
          this.handleClick({ index: 1 });
        }
      });
    },
    previewInnovationDetail(item) {
      this.shouldShowPreview = true;
      this.dataDetail = item;
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
.tab-container.content-padding {
  width: 1200px;
  height: 100%;
  margin: 0px auto;
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

.dialog-footer {
  display: flex;
  justify-content: center;
}

.newscon {
  padding: 32px;
}

.newscontain {
  padding-top: 16px;
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

.infostit {
  background-color: #f1f1f1;
  height: 30px;
  line-height: 30px;
  span {
    float: left;
    // width: 30%;
    padding-left: 1%;
    text-align: left;
    color: #666666;
    em {
      margin-left: 4px;
      font-style: normal;
      /*color: #00a0e9;*/
    }
  }

  .spanfabu {
    width: 50%;
  }

  .spantime {
    width: 30%;
  }

  .spanfabuzhong {
    width: 10%;
  }

  .delete {
    float: right;

    i {
      cursor: pointer;
    }
  }
}
.infocon {
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: all 1s;
  h2 {
    margin-top: 5px;
  }
  .funitems {
    margin-right: 15px;
  }
  div:first-child {
    width: 85%;
  }
}
.logocon {
  width: 25.6%;
  height: 140px;
  float: left;
  margin-right: 2%;
  position: relative;
  transition: all 1s;
  &:hover .img_tips {
    display: block;
    transform: scale(1.02);
  }
  //显示hover效果的遮盖层
  .img_tips {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: #000000;
    p {
      position: absolute;
      top: 0;
      color: #fff;
    }
    .enrolled {
      left: 10px;
    }
    .cost {
      right: 10px;
    }
  }
  .detaillogo {
    display: block;
    width: 100%;
    height: 100%;
    transition: all 1s;
    &:hover {
      transform: scale(1.02);
    }
  }
}

.detailcon {
  float: left;
  h2 {
    font-size: 18px;
    line-height: 24px;
    color: #444;
    margin-bottom: 30px;
    &:hover {
      cursor: pointer;
    }
  }
}

//编辑器样式
.wrap {
  width: 522px;
  height: 400px;
  margin: 0 auto;
  .quill-editor {
    height: 83%;
    .ql-container {
      // background:red;
    }
  }
}
</style>
