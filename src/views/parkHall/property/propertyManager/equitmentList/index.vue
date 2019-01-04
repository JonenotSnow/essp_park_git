<template> 
    <div class="el-main">
        <div class="baseInfo">
            <div class="searchAdd">
              <el-form :model="searchCondition" ref="searchCondition" label-width="120px"
                                 class="demo-ruleFormSearch">
                            <el-form-item label="设备名称：" prop="customerName">
                                <el-input v-model="searchCondition.equipmentName" placeholder="请输入设备名称"></el-input>
                            </el-form-item>
                            <el-form-item label="设备编码：" prop="equipmentCode">
                                <el-input v-model="searchCondition.equipmentCode" placeholder="请输入设备编码"></el-input>
                            </el-form-item>
                            <el-form-item label="提交时间：">
                            <el-col :span="11">
                              <el-date-picker v-model="searchCondition.startDate" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
                           </el-col>
                            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                            <el-col :span="11">
                              <el-date-picker v-model="searchCondition.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                           </el-col>
                          </el-form-item>
                            <!-- <div style="padding-bottom:22px">
                            <span class="form-item-time">提交时间：</span>
                            <el-date-picker v-model="searchCondition.startDate" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
                            -
                            <el-date-picker v-model="searchCondition.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </div> -->
                            <el-form-item style="width: 100%">
                                <el-button type="primary" @click="search">查询</el-button>
                                <el-button @click="reset">重置</el-button>
                            </el-form-item>
                        </el-form>
                <!-- <ul>
                    <li>
                        <div>
                            <span>设备名称：</span>
                            <input type="text" v-model="searchCondition.equipmentName" placeholder="设备名称">
                        </div>
                        <div>
                            <span>设备编码：</span>
                            <input type="text" v-model='searchCondition.equipmentCode' placeholder="设备编码">
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
                </ul> -->
            </div>
            <!-- <p style="padding-bottom:15px">
                <el-button type="primary" size='small' @click='search'>查询</el-button>
                <el-button type="info" size='small' @click='reset'>重置</el-button>
            </p> -->
            <p> 
                <el-button type="primary" size='small' class="addNew"  @click="add">新增</el-button>        
            </p>
           <!-- <p>采取先到先得的任务领取审核方式</p> -->
            <div class="tabList">
                <el-table
                    :data="list"
                    style="width: 100%">
                    <el-table-column  align="center" type="index" label="编号" width="55" fixed></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="eiId" label="设备编号" width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="equipmentName" width="150" label="设备名称"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="equipmentCode" width="150" label="设备编码"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="equipmentType"  label="设备类型" width="150"></el-table-column>
                    <!-- <el-table-column show-overflow-tooltip align="center" prop="equipmentStatus" label="设备状态"></el-table-column> -->
                    <el-table-column align="center" prop="equipmentStatus" label="设备状态" width="150">
                        <template slot-scope="scope">
                            {{scope.row.equipmentStatus | statusFormat(scope.row.equipmentStatus)}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column show-overflow-tooltip align="center"  prop="equipmentStatus" width="100" label="设备状态">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.equipmentStatus"  @change="changeType(scope.row,scope.$index)"  >
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                
                         </template>
                    </el-table-column> -->
                    <el-table-column align="center" prop="createTime" label="登记日期" width="150">
                        <template slot-scope="scope">
                            {{scope.row.createTime | timerFormat(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="specifications" label="规格型号" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="installAddress" label="安装地点" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="meterial" label="设备材质" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="weight" label="设备重量" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="installTime" label="安装时间" width="150">
                      <template slot-scope="scope">
                            {{scope.row.installTime | timerFormat(scope.row.installTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="scrapTime" label="报废时间" width="150">
                      <template slot-scope="scope">
                            {{scope.row.scrapTime | timerFormat(scope.row.scrapTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="durableYears" label="使用年限" width="150"></el-table-column>
                    <!-- <el-table-column show-overflow-tooltip align="center" prop="registerTime" label="登记日期"></el-table-column> -->
                    <el-table-column show-overflow-tooltip align="center" prop="registrar" label="登记人" width="150"></el-table-column>
                    <!-- <el-table-column show-overflow-tooltip align="center" prop="parkId" label="所属园区"></el-table-column> -->

                    <el-table-column align="center" prop="joinTime" label="提交时间" width="150">
                        <template slot-scope="scope">
                            {{scope.row.joinTime | timerFormat(scope.row.joinTime)}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" prop="" width="150" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <template>
                            <el-button type="text"  @click="fnInfo(scope.row)">设备报修</el-button>
                            <el-button type="text"  @click="fnTending(scope.row)">维护计划</el-button>
                            <el-button type="text" @click="fnDeleteItem({eiId:scope.row.eiId,index:scope.$index})">删除</el-button>
                                </template>
                         </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pageList" v-if="totalCount>10" >
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
         
         <dialog-add :show.sync="showDialogAdd" :tip-event="tipDialogAdd"></dialog-add>
         <dialog-info :show.sync="showDialogInfo" :equipmentInfo.sync='equipmentInfo'></dialog-info>
         <dialog-tending :show.sync="showDialogTending" :equipmentTending.sync='equipmentTending' ></dialog-tending>
    </div>  
</template>

<script>
import Moment from "moment";
import dialogAdd from "../equitmentInput/index";
import dialogInfo from "../tendingInfo/index";
import dialogTending from "../equitmentTending/index";
export default {
  data() {
    return {
      totalCount: 0,
      options: [
        {
          label: "正常",
          value: "0"
        },
        {
          label: "保养",
          value: "1"
        },
        {
          label: "报废",
          value: "2"
        }
      ],
      pageNum: 1,
      pageSize: 10,
      count: {},
      showDialogAdd: false,
      showDialogInfo: false,
      showDialogTending: false,
      list: [],
      searchCondition: {
        startDate: "",
        endDate: "",
        equipmentName: "",
        equipmentType: ""
      },
      equipmentInfo: {},
      equipmentTending: {},
      parkId: sessionStorage.getItem("parkId") || "",
      flagSelect: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getList({});
    });
  },
  mounted() {
    //   await this.getCount()
    // this.getList({});
  },
  computed: {},
  components: { dialogAdd, dialogInfo, dialogTending },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD");
    },
    statusFormat(val) {
      return val == 0 ? "正常" : val == 1 ? "保养" : "报废";
    }
  },
  methods: {
    tipDialogAdd() {
      this.getList({});
    },
    // tipDialogInfo() {
    //   this.$message({
    //     type: "success",
    //     message: "新增成功！"
    //   });

    // },
    // tipDialogTending() {
    //   this.$message({
    //     type: "success",
    //     message: "新增成功！"
    //   });

    // },
    isdisabledFn(status) {
      // if (status == "1") {
      //   return true;
      // } else {
      //   return false;
      // }
      return false;
    },
    add() {
      this.showDialogAdd = true;
    },
    fnInfo(item) {
      this.showDialogInfo = true;

      this.equipmentInfo = Object.assign({}, item, {
        equipmentNumber: item.eiId
      });
    },
    fnTending(item) {
      this.showDialogTending = true;
      this.equipmentTending = Object.assign({}, item, {
        equipmentNumber: item.eiId
      });
    },
    changeDetail(params) {},
    changeType(data, index) {
      // this.changeTypeWay(data);
    },
    fnDeleteItem(item) {
      this.$confirm("是否删除?", "删除").then(() => {
        this.$post(this.$apiUrl.property.deleteEquipmentInfo, {
          eiId: item.eiId,
          parkId: this.parkId
        }).then(
          res => {
            this.list.splice(item.index, 1);
            this.$message({
              type: "success",
              message: res.resultMsg
            });
          },
          err => {
            this.$message({
              type: "warn",
              message: err.data.resultMsg
            });
          }
        );
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList({});
    },
    handleCurrentChange(val) {
      this.getList(Object.assign({}, { pageNum: val }));
    },
    changeTypeWay(item) {
      this.$post(this.$apiUrl.property.updateOpportunityCustomer, {
        id: item.id,
        status: item.status
      }).then(
        res => {},
        err => {
          this.$message({
            type: "warn",
            message: res.data.resultMsg
          });
        }
      );
    },
    search() {
      this.pageNum = 1;
      this.getList(this.searchCondition);
    },
    //list列表
    getList(data) {
      this.$post(this.$apiUrl.property.getEquipmentInfoPage, {
        equipmentName: data.equipmentName ? data.equipmentName : undefined,
        equipmentCode: data.equipmentCode ? data.equipmentCode : undefined,
        startDate: data.startDate
          ? new Date(data.startDate + " 00:00:00").getTime()
          : undefined,
        endDate: data.endDate
          ? new Date(data.endDate + " 23:59:59").getTime()
          : undefined,
        pageNum: data.pageNum || this.pageNum,
        pageSize: data.pageSize || this.pageSize,
        parkId: this.parkId
      }).then(
        res => {
          this.list = [];
          this.totalCount = Number(res.resultData.total);
          this.list.push(...res.resultData.list);
        },
        err => {
          this.$message({
            type: "warn",
            message: res.data.resultMsg
          });
        }
      );
    },
    reset() {
      this.searchCondition.startDate = "";
      this.searchCondition.endDate = "";
      this.searchCondition.equipmentName = "";
      this.searchCondition.equipmentCode = "";
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.typeIndex = to.meta.index;
      this.reset();
      this.getList({});
    }
  }
};
</script>

<style lang='less' scoped>
.demo-ruleFormSearch {
  .el-form-item {
    // display: inline-block;
    width: 600px;
  }
}
.el-main {
  margin-left: 10px;
  width: 990px;
  padding: 0;
  .notice {
    height: 50px;
    background: #f5f5f5;
    p {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #00a0e9;
      background-color: #e6f4ff;
      i {
        color: orange;
        margin-left: 34px;
      }
    }
  }
  .baseInfo {
    width: 990px;
    min-height: 570px;
    background-color: #ffffff;
    .searchAdd {
      // height: 140px;
      & > ul {
        width: 750px;
        margin: 0 auto;
        padding: 25px 0 10px;
        li {
          width: 100%;
          height: 30px;
          line-height: 50px;
          & > div {
            float: left;
            margin-right: 18px;
            & > span {
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 40px;
              letter-spacing: 0px;
              color: #666666;
            }
            & > input {
              width: 140px;
              padding: 0 5px;
              outline: none;
              height: 35px;
              background-color: #ffffff;
              border: solid 1px #cccccc;
              caret-color: #666;
            }
            & > select {
              width: 140px;
              padding: 0 5px;
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
    & > p {
      &:nth-of-type(1) {
        text-align: right;
        padding-bottom: 15px;
        & > button {
          &:nth-of-type(1) {
            margin-right: 79px;
          }
        }
      }
      &:nth-of-type(2) {
        width: 890px;
        margin: 0 auto;
        text-align: right;
        font-size: 14px;
        line-height: 40px;
        color: #00a0e9;
      }
      &:nth-of-type(3) {
        width: 890px;
        margin: 0 auto;
        text-align: right;
        font-size: 14px;
        line-height: 40px;
        color: #00a0e9;
      }
    }
    & > ul,
    .tabList {
      border: 1px solid #ebeef5;
      border-bottom: none;
      width: 880px;
      margin: 0 auto 20px;
      li {
        height: 50px;
        line-height: 50px;
        border: 1px solid #ccc;
        & > span {
          display: inline-block;
          text-align: center;
          &:nth-of-type(1) {
            width: 110px;
          }
          &:nth-of-type(2) {
            width: 240px;
          }
          &:nth-of-type(3) {
            width: 120px;
          }
          &:nth-of-type(4) {
            width: 120px;
          }
          &:nth-of-type(5) {
            width: 120px;
          }
          &:nth-of-type(6) {
            width: 140px;
          }
        }
        &:nth-of-type(2n) {
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-bottom: none;
          border-top: none;
        }
        &:nth-last-of-type(1) {
          border-bottom: 1px solid #ccc;
        }
        &:nth-of-type(1) {
          background-color: #f5f5f5;
          font-size: 16px;
          color: #333333;
        }
        &:not(:first-child) {
          font-size: 14px;
          color: #666666;
          & > span {
            &:nth-last-of-type(1) {
              i {
                color: #00a0e9;
                cursor: pointer;
              }
              .disabledClick {
                color: #999;
                cursor: not-allowed;
              }
            }
          }
        }
        &.noData {
          text-align: center;
        }
      }
    }
    .pageList {
      margin-top: 15px;
      width: 880px;
      margin: 0 auto;
      text-align: right;
    }
  }
}
</style>
