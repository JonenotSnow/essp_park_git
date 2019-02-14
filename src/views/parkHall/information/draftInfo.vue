<template>
  <div>
    <!-- 我发起的资讯的草稿模版 -->
    <div class="draftcon">
      <essp-top-toolbar :pageType="pageType"></essp-top-toolbar>
      <div>
        <div class="esspclearfix tools">
          {{startDate}}
          <span class="tdspan">
            <el-button type="info" plain @click="delInfoDraft()">删除草稿</el-button>
          </span>
          <span class="tdspan">
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </span>
          <span class="tdspan">
            <el-button type="primary" icon="el-icon-search" @click="getDraftInfoList()">搜索</el-button>
          </span>
        </div>
        <!-- <div class="btntools">
                    <el-button class="" type="primary" >查询</el-button>
                    <el-button class="" type="info" @click="reSetSerchOption()">重置</el-button>
        </div>-->
        <el-table
          ref="multipleTable"
          :data="mcCardDataList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="userName" label="发布人" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="保存时间" width="155" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ scope.row.createTime | timerFormat(scope.row.createTime)}}</template>
          </el-table-column>
          <!-- <el-table-column width="190" prop="content" label="资讯简介"
                show-overflow-tooltip>
          </el-table-column>-->
          <el-table-column width="400" prop="informationTitle" label="资讯标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="tip-changebg">{{ scope.row.informationTitle }}</div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                type="info"
                class="button_info"
                round
                size="mini"
                @click="goBaoMing(scope)"
              >编&nbsp;&nbsp;&nbsp;&nbsp;辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pageList">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageRanges"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import EsspTopToolbar from "@/components/EsspTopToolbar";
import Moment from "moment";
export default {
  components: {
    EsspTopToolbar
  },
  name: "",
  data() {
    return {
      pageRanges: [5, 10, 20, 50, 100], //默认每页10条数区间
      pageNum: 1, //当前页码
      pageSize: 10, //每页条数
      allTotal: 0, //总条数
      startDate: "", //起始时间
      endDate: "", //结束时间
      title: "", //搜索关键词
      pageType: "draftInfo", //活动草稿页
      mcCardDataList: [],
      timeRange: [],
      ids: "" //删除的ids
    };
  },
  created() {
    this.getDraftInfoList();
  },
  methods: {
    reSetSerchOption() {
      this.timeRange = [];
    },
    delInfoDraft() {
      if (this.ids == "") {
        this.$message("您没有选择删除的项目");
        return;
      }
      var ids = this.ids;
      var pop = { ids: ids };
      var url = this.$apiUrl.parkInfo.delInfoes;
      this.$post(url, pop).then(
        response => {
          if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
            this.$message.success("删除成功");
            this.getDraftInfoList();
          } else {
            this.$message.info(failMsg + response.resultMsg);
          }
        },
        err => {
          this.$message.error("接口异常");
        }
      );
    },
    getDraftInfoList() {
      var url = this.$apiUrl.parkInfo.lanchInfo;
      var parkId = sessionStorage.getItem("parkId") || "";
      this.$post(url, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startDate: this.timeRange[0] ? this.timeRange[0] : "",
        endDate: this.timeRange[1] ? this.timeRange[1] : "",
        title: "",
        status: "0", //表示草稿箱
        parkId: parkId
      }).then(
        response => {
          if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
            this.timeRange = [];
            this.mcCardDataList = response.resultData.informationList;
            this.allTotal = response.resultData.total;
          } else {
            this.$message.info(failMsg + response.resultMsg);
          }
        },
        err => {
          this.$message.error("接口异常");
        }
      );
    },
    goBaoMing(scope) {
      var informationId = scope.row.informationId;
      this.$router.push({
        path: "/parkIndex/publishNewInfo",
        query: { informationId: informationId }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDraftInfoList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDraftInfoList();
    },
    handleSelectionChange(val) {
      var _this = this;
      var selectArray = [];
      this.multipleSelection = val;
      this.multipleSelection.forEach(function(item) {
        var id = item.informationId;
        selectArray.push(id);
      });
      _this.ids = selectArray.join(",");
    }
  },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/css/mixin";
.draftcon {
  padding: 0px 20px 0;
  background: #fff;
}
.pageList {
  background: #fff;
  text-align: right;
  padding: 20px 20px 10px;
}
.tools {
  padding: 0px 5px;
  margin-bottom: 10px;
  .tdspan {
    float: left;
    margin-right: 10px;
    height: 40px;
    line-height: 40px;
  }
}
.btntools {
  text-align: center;
  margin-bottom: 30px;
}

.button_info {
  border-color: #cccccc !important;
  background-color: #cccccc !important;
}
.el-table__row {
  &:hover {
    .button_info {
      border-color: #aaaaaa !important;
      background-color: #aaaaaa !important;
    }
    .tip-changebg {
      color: #00a0e9;
    }
  }
}

.edit-btn {
  padding: 5px 15px;
  width: 85px;
  height: 30px;
  line-height: 20px;
  color: #fff;
  border: none;
  background: #409EFF;
  border-radius: 50px;
  .edit-text {
    margin-right: 15px;
  }
}
</style>
