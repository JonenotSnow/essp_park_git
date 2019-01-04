<template> 
    <div class="el-main">
    
        <div class="baseInfo">
            <div class="searchAdd">
              <el-form :model="searchCondition" ref="searchCondition" label-width="120px"
                                 class="demo-ruleFormSearch">
                            <el-form-item label="设备编号：" prop="equipmentNumber">
                                <el-input v-model="searchCondition.equipmentNumber" placeholder="请输入设备编号"></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称：" prop="equipmentName">
                                <el-input v-model="searchCondition.equipmentName" placeholder="请输入设备名称"></el-input>
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
                          
                            <el-form-item style="width: 100%">
                                <el-button type="primary" @click="search">查询</el-button>
                                <el-button @click="reset">重置</el-button>
                            </el-form-item>
                        </el-form>
                <!-- <ul>
                    <li>
                        <div>
                    
                            <span>设备编号：</span>
                            <input type="text" v-model="searchCondition.equipmentNumber" placeholder="请输入设备编号">
                        </div>
                        <div>
                            <span>设备名称：</span>
                            <input type="text" v-model='searchCondition.equipmentName' placeholder="请输入设备名称">
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
            <!-- <p>
                <el-button type="primary" size='small' @click='search'>查询</el-button>
                <el-button type="info" size='small' @click='reset'>重置</el-button>
            </p> -->
            <!-- <p> 
                <el-button type="primary" size='small' class="addNew"   @click="add">新增</el-button>        
            </p>
           <p>采取先到先得的任务领取审核方式</p> -->
            <div class="tabList">
                <el-table
                    :data="list"
                    style="width: 100%">
                    <el-table-column align="center" type="index" label="编号" width="55" fixed></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="miId" label="维修记录编号" width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="maintainItem" label="维修项目" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="maintainPerson" label="维修人" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="maintainTime" label="维修时间" width="150"></el-table-column>
                    <el-table-column align="center" prop="customTime" label="制定日期" width="150">
                        <template slot-scope="scope">
                            {{scope.row.joinTime | timerFormat(scope.row.joinTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="maintainHours" label="维修工时" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="faultDesc" label="故障详情" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="maintainDesc" label="维修情况" width="150">
                      <template slot-scope="scope">
                            {{scope.row.maintainDesc == 1?'未维修':'已维修'}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="equipmentNumber" label="设备编号" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="equipmentName" label="设备名称" width="150"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建时间" width="150">
                        <template slot-scope="scope">
                            {{scope.row.createTime | timerFormat(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" width="150" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <template>
                                 <!-- <el-button type="text"  @click="changeDetail(scope.row)">领取</el-button> -->
                            <el-button  type="text" @click="deleteItem({miId:scope.row.miId})">删除</el-button>
                                </template>
                         </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pageList" v-if="totalCount>10">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
         
         <!-- <dialog-add :show.sync="showDialog"></dialog-add> -->
    </div>  
</template>

<script>
import Moment from "moment";
// import dialogAdd from "../tendingInfo/index";
export default {
  data() {
    return {
      totalCount: 0,
      pageNum: 1,
      pageSize: 10,
      count: {},
      showDialog: false,
      list: [],
      searchCondition: {
        startDate: "",
        endDate: "",
        equipmentNumber: "",
        equipmentName: ""
      },
      parkId: sessionStorage.getItem("parkId") || "123"
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
  components: {},
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD");
    }
  },
  methods: {
    isdisabledFn(status) {
      if (status == "1") {
        return "disabled";
      } else {
        return false;
      }
    },
    add() {
      this.showDialog = true;
    },
    changeDetail(params) {
    },
    changeType(data, index) {
      this.list.splice(index, 1);
      this.changeTypeWay(data);
    },
    deleteItem(data, index) {
      this.$confirm("是否删除?", "删除").then(() => {
        
        this.$post(this.$apiUrl.property.deleteMaintainInfo, {
          miId: data.miId,
          parkId: this.parkId
        }).then(
          res => {
            this.list.splice(index, 1);
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
      this.$post(this.$apiUrl.property.getMaintainInfoPage, {
        id: item.id,
        status: item.status
      }).then(
        res => {},
        err => {
          this.$message({
            type: "warn",
            message: err.data.resultMsg
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
      this.$post(this.$apiUrl.property.getMaintainInfoPage, {
        equipmentNumber: data.equipmentNumber
          ? data.equipmentNumber
          : undefined,
        equipmentName: data.equipmentName ? data.equipmentName : undefined,
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
          // this.pageNum = Number(res.resultData.pageNum)
          this.totalCount = Number(res.resultData.total);
          this.list.push(...res.resultData.list);
        },
        err => {
          this.$message({
            type: "warn",
            message: err.data.resultMsg
          });
        }
      );
    },
    reset() {
      this.searchCondition.startDate = "";
      this.searchCondition.endDate = "";
      this.searchCondition.equipmentNumber = "";
      this.searchCondition.equipmentName = "";
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
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
