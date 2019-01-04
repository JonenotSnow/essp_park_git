<template> 
    <div class="el-main">
    
        <div class="baseInfo">
            <div class="searchAdd">
              <el-form :model="searchCondition" ref="searchCondition" label-width="120px"
                                 class="demo-ruleFormSearch">
                            <el-form-item label="企业名称：" prop="customerName">
                                <el-input v-model="searchCondition.customerName" placeholder="请输入企业名称"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人：" prop="contactName">
                                <el-input v-model="searchCondition.contactName" placeholder="请输入联系人"></el-input>
                            </el-form-item>
                            
                            <el-form-item label="状态：" prop="roomStatus" v-if="typeIndex !=1">
                                <el-select v-model="searchCondition.status" placeholder="请选择" @change="changeSearchType">
                                     <el-option
                                    v-for="item in optionsSearch"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div style="padding-bottom:22px">

                            
                            <span class="form-item-time">提交时间：</span>
                            <el-date-picker v-model="searchCondition.startDate" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
                            -
                            <el-date-picker v-model="searchCondition.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </div>
                            <el-form-item style="width: 100%">
                                <el-button type="primary" @click="search">查询</el-button>
                                <el-button @click="reset">重置</el-button>
                            </el-form-item>
                        </el-form>
                <!-- <ul>
                    <li>
                        <div>
                            <span>企业名称：</span>
                            <input type="text" v-model="searchCondition.customerName" placeholder="请输入企业名称">
                        </div>
                        <div>
                            <span>联系人：</span>
                            <input type="text" v-model='searchCondition.contactName' placeholder="请输入联系人">
                        </div>
                        <div v-if="typeIndex == 'my'">
                            <span>状态：</span>
                            <el-select v-model="searchCondition.status" placeholder="请选择" @change="changeSearchType">
                                    <el-option
                                    v-for="item in optionsSearch"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
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
            <p> 
                <el-button type="primary" size='small' class="addNew"   @click="add">新增</el-button>        
            </p>
           <p>采取先到先得的任务领取审核方式</p>
            <div class="tabList">
                <el-table
                    :data="list"
                    style="width: 100%" 
                    
                    >
                    <el-table-column align="center"  prop="id"  label="客户编号" width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="customerName" label="企业名称"  width="250"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="contactName" label="联系人"  width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="contactPhone" label="联系方式"  width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="enterpriceScale" label="企业规模"  width="150"></el-table-column>
                    <el-table-column align="center" prop="joinTime" label="提交时间"   width="150">
                        <template slot-scope="scope">
                            {{scope.row.joinTime | timerFormat(scope.row.joinTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="state" width="200" label="状态">
                            <template slot-scope="scope">
                            <!-- <el-button type="text"  @click="changeDetail(scope.row)">修改</el-button> -->
                           
                                <el-select v-model="scope.row.status" :disabled="isdisabledFn(scope.row.status)" placeholder="请选择" @change="changeType(scope.row)">
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
                    <el-table-column align="center" fixed="right" width="150" label="操作">
                        <template slot-scope="scope">
                            <template>
                                 <!-- <el-button type="text"  @click="changeDetail(scope.row)">领取</el-button> -->
                            <el-button v-if="scope.row.status=='1'" type="text" @click="changeTypeWay({id:scope.row.id,status:'2'},scope.$index)">领取</el-button>
                            <el-button v-if="scope.row.status!='1'" type="text" @click='fnFollow(scope.row)'>跟进详情</el-button>
                            <el-button v-if="scope.row.status!='1'" type="text" @click='orderContracts(scope.row)'>签订合同</el-button>
                                                         
                                </template>
                         </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pageList" v-if="totalCount>10" >
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNumber"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
         
         <dialog-add :show.sync="showDialog" @tip-event="tipAdd"></dialog-add>
    </div>  
</template>

<script>
import Moment from "moment";
import dialogAdd from "../changeCustManagement/index";
export default {
  data() {
    return {
      totalCount: 0,
      pageNumber: 1,
      pageSize: 10,
      count: {},
      typeIndex: 0,
      currentIndex: 0,
      showDialog: false,
      options: [
        // {
        //   label: "全部",
        //   value: "0"
        // },
        {
          label: "待认领",
          value: "1"
        },
        {
          label: "跟进中",
          value: "2"
        },
        {
          label: "认租",
          value: "3"
        },
        {
          label: "合同阶段",
          value: "4"
        },
        {
          label: "已完成",
          value: "5"
        },
        {
          label: "流失",
          value: "6"
        }
      ],
      optionsSearch: [
        {
          label: "跟进中",
          value: "2"
        },
        {
          label: "认租",
          value: "3"
        },
        {
          label: "合同阶段",
          value: "4"
        },
        {
          label: "已完成",
          value: "5"
        },
        {
          label: "流失",
          value: "6"
        }
      ],
      list: [],
      pageNumber: 0,
      searchCondition: {
        startDate: "",
        endDate: "",
        customerName: "",
        contactName: "",
        status: ""
      },
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      parkId: sessionStorage.getItem("parkId")
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name == "park-businessManagerAll") {
        vm.currentIndex = vm.typeIndex = 0;
      } else if (to.name == "park-taskToTake") {
        vm.currentIndex = vm.typeIndex = 1;
      } else if (to.name == "park-taskToFollow") {
        vm.currentIndex = vm.typeIndex = "my";
      }
      vm.optionsSearch = [
        {
          label: "全部",
          value: vm.typeIndex
        },
        {
          label: "跟进中",
          value: "2"
        },
        {
          label: "认租",
          value: "3"
        },
        {
          label: "合同阶段",
          value: "4"
        },
        {
          label: "已完成",
          value: "5"
        },
        {
          label: "流失",
          value: "6"
        }
      ];
      // vm.optionsSearch.unshift({
      //     label: "全部",
      //     value: vm.typeIndex
      //   })
      vm.reset();
      vm.getList({ status: vm.typeIndex });

      // this.typeIndex = to.meta.index == 2 ? "my" : to.meta.index;
      // vm.getList({});
    });
  },
  computed: {},
  components: { dialogAdd },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD");
    }
  },
  methods: {
    tipAdd() {
      this.getList({});
    },
    orderContracts(data) {
      this.$router.push({
        path: "/parkHall/merchants/contractsManager",
        query: {
          id: data.id,
          name: data.contactName
        }
      });
    },
    fnFollow(data) {
      if (data.status > 1) {
        this.$router.push({
          path: "/parkHall/merchants/processTracking",
          query: {
            id: data.id
          }
        });
      }
    },
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
    changeDetail(params) {},
    changeType(data, index) {
      // this.list.splice(index, 1);
      this.changeTypeWay(data);
    },
    changeSearchType(data, index) {
      // this.search()
    },
    deleteItem(data, index) {
      this.list.splice(index, 1);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList({});
    },
    handleCurrentChange(val) {
      this.getList(Object.assign({}, { pageNumber: val }));
    },
    changeTypeWay(item, index) {
      this.$post(this.$apiUrl.businessManager.updateOpportunityCustomer, {
        id: item.id,
        status: item.status,
        followUper: item.status != 1 ? this.userInfo.id : "",
        parkId: this.parkId
      }).then(
        res => {
          this.getList({ status: this.typeIndex });
          this.$message({
            type: "success",
            message: item.status != 1 ? "修改成功！" : "领取成功"
          });
        },
        err => {
          this.$message.error("接口异常");
        }
      );
    },

    search() {
      this.getList(this.searchCondition);
    },
    //list列表
    getList(data) {
      this.$post(this.$apiUrl.businessManager.getOpportunityCustomer, {
        customerName: data.customerName ? data.customerName : undefined,
        contactName: data.contactName ? data.contactName : undefined,
        startDate: data.startDate
          ? data.startDate.replace(/-/g, "")
          : undefined,
        endDate: data.endDate ? data.endDate.replace(/-/g, "") : undefined,
        status: data.status || this.typeIndex,
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        followUper: this.typeIndex == "my" ? this.userInfo.id : undefined,
        parkId: this.parkId
      }).then(
        res => {
          this.list = [];
          // this.pageNumber = Number(res.resultData.pageNumber);
          this.totalCount = Number(res.resultData.totalNumber);
          this.list.push(...res.resultData.listData);
        },
        err => {
          this.$message.error("接口异常");
        }
      );
    },
    reset() {
      this.searchCondition.startDate = "";
      this.searchCondition.endDate = "";
      this.searchCondition.customerName = "";
      this.searchCondition.contactName = "";
      this.searchCondition.status = "";
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (to.name == "park-businessManagerAll") {
        this.currentIndex = this.typeIndex = 0;
      } else if (to.name == "park-taskToTake") {
        this.currentIndex = this.typeIndex = 1;
      } else if (to.name == "park-taskToFollow") {
        this.currentIndex = this.typeIndex = "my";
      }

      this.optionsSearch = [
        {
          label: "全部",
          value: this.typeIndex
        },
        {
          label: "跟进中",
          value: "2"
        },
        {
          label: "认租",
          value: "3"
        },
        {
          label: "合同阶段",
          value: "4"
        },
        {
          label: "已完成",
          value: "5"
        },
        {
          label: "流失",
          value: "6"
        }
      ];
      // this.optionsSearch.unshift({
      //     label: "全部",
      //     value: this.typeIndex
      //   },)
      this.reset();
      this.getList({ status: this.typeIndex });
      // this.typeIndex = to.meta.index == 2 ? "my" : to.meta.index;
      // console.log(this.typeIndex)
      // this.reset();
      // this.getList({ status: this.typeIndex });
    }
  }
};
</script>

<style lang='less' scoped>
.form-item-time {
  width: 120px;
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.demo-ruleFormSearch {
  .el-form-item {
    display: inline-block;
    width: 40%;
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
    min-height: 600px;
    background-color: #ffffff;
    .searchAdd {
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
