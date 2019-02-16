<template>
    <div class="checkcon">
        <!-- 活动审核 -->
        <!-- 废弃代码 -->
        <div class="themeTit">
            <span class="borderone"></span>
            <span class="bordertwo"></span>
            <span class="tittext">活动发布审核</span>
        </div>
        <div class="toolcon">
            <div class="esspclearfix tsdiv">
                <div class="tdcon">
                    <span class="inlinespan">资讯标题：</span>
                    <el-input class="inlineinput" v-model="model1" placeholder=""></el-input>
                </div>
                <div class="tdcon">
                    <span class="inlinespan">发布人：</span>
                    <el-input class="inlineinput" v-model="model2" placeholder=""></el-input>
                </div>
            </div>
            <div class="timetools">
                <span class="inlinespan">提交日期：</span>
                <el-date-picker v-model="model3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="btntools">
                <el-button class="" type="primary" @click="queryList()">查询</el-button>
                <el-button class="" type="info" @click="reSet()">重置</el-button>
            </div>
        </div>
        <div class="auditcon">
            <el-table :data="auditconData" v-loading="auditingLoading" style="border:1px solid #eee;font-weight:normal;width: 100%">
                <el-table-column align="center" prop="index" label="序号" width="85">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="activityTheme" label="标题内容" width="185">
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="initiatorTime" label="提交时间" width="120">
                    <template slot-scope="scope">
                        {{scope.row.initiatorTime | timerFormat(scope.row.initiatorTime)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="initiatorName" label="发布人" width="115">
                </el-table-column>
                <el-table-column align="center" prop="initiatorPhone" label="联系手机" width="130">
                    <template slot-scope="scope">
                        {{scope.row.initiatorPhone || "—"}}
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="status" label="发布状态" width="115">
                    <template slot-scope="scope">
                        {{scope.row.status | statusCn(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="tolink(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页部分 -->
        <div class="pageList">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" layout="total, prev, pager, next, jumper" :total="allTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import Moment from "moment";

export default {
  data() {
    return {
      timeStart: "",
      timeEnd: "",
      tel: "接口中。。",
      currentPageNum: 1, //当前页
      pageSize: 10, //每页的记录数
      activityListSize: 0,
      allTotal: 0,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      auditingLoading: true,
      model1: "",
      model2: "",
      model3: "",
      auditconData: [] ,
      timeStart:"",
      timeEnd: ""
    };
  },
  created() {
    this.queryList();
  },
  methods: {
    tolink(row) {
      //var draftId = scope.row.draftId
      this.$router.push({
        path: "/parkHall/activity/activityAuditDetail",
        query: { id: row.activityId, opMark: "03" }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPageNum = val;
      this.queryList();
    },
    /**==========查询列表=============****/
    queryList() {
      var currentPageNum = this.currentPageNum;
      var pageSize = this.pageSize;
      /* if(this.model3){
                    alert(this.model3);
                   var times=this.model3.split(",");
                    this.timeStart=times[0].format("yyyy-MM-dd HH:mm:ss");
                    thid.timeEnd=times[1].format("yyyy-MM-dd HH:mm:ss");
                    alert("开始时间:"+this.timeStart+";结束时间:"+this.timeEnd);
                } */
      if (this.model3.length == 2) {
        this.timeStart = Moment(this.model3[0]).format("YYYY-MM-DD");
        this.timeEnd = Moment(this.model3[1]).format("YYYY-MM-DD");
      }
      this.$post(this.$apiUrl.active.auditList, {
        pageNum: this.currentPageNum,
        pageSize: this.pageSize,
        parkId: window.sessionStorage.getItem("parkId"),
        activityTheme: this.model1, //活动主题
        initiatorName: this.model2, //发布人
        timeStart: this.timeStart, //提交起始时间
        timeEnd: this.timeEnd //提交结束时间
      }).then(
        response => {
          if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
            this.auditconData = response.resultData.list;
            this.allTotal = response.resultData.activityList;
          }
          this.auditingLoading = false;
        },
        err => {
          this.auditingLoading = false;
          this.$message.error(err);
        }
      );
    },

    /**
     * 重置查询条件
     * model1 资讯标题
     * model2 发布人
     * model3 提交时间
     */
    reSet() {
      this.model1 = ""; //资讯标题
      this.model2 = ""; //发布人
      this.model3 = ""; //提交时间
    }
  },
  computed: {},
  components: {},
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
    },
    statusCn(value) {
      const statuMap = {
          "0":"起草中",//起草中
          "01": "园区审核中", //园区审核中
          "02": "园区审核通过", //园区审核通过
          "03": "企业管理员审核拒绝", //企业管理员审核拒绝
          "05": "企业审核中", //报名审核中
          "10": "企业审核通过", //企业审核通过
          "11": "已邀请待回复", //已邀请待回复
          "12": "园区管理员审核拒绝", //已邀请待回复
          "21": "企业待审核", //企业待审核
      };
      return statuMap[vaule] ? statuMap[vaule] : "";
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../../assets/css/mixin";

.checkcon {
  background-color: #fff;
  padding: 30px 40px;
}

.themeTit {
  position: relative;
  margin-bottom: 30px;
  text-align: center;
  .tittext {
    font-size: 24px;
    line-height: 36px;
    color: #333333;
  }
  .borderone {
    position: absolute;
    width: 68px;
    left: 32%;
    top: 18px;
    border-top: 2px solid #cccccc;
  }
  .bordertwo {
    position: absolute;
    width: 68px;
    right: 32%;
    top: 18px;
    border-top: 2px solid #cccccc;
  }
}

.toolcon {
  margin-bottom: 20px;
}

.tsdiv {
  margin-bottom: 20px;
  .tdcon {
    float: left;
    width: 40%;
    .inlinespan {
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .inlineinput {
      float: left;
      width: 220px;
    }
  }
}

.timetools {
  margin-bottom: 20px;
}

.btntools {
  text-align: center;
}

.pageList {
  background: #fff;
  text-align: right;
  padding: 20px 20px 10px;
}
</style>
