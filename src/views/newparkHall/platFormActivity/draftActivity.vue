<template>
    <div>
        <!-- 我发起的活动草稿模版 -->
        <div class="draftcon">
            <essp-top-toolbar :pageType="pageType"></essp-top-toolbar>
            <div>
                <div class="esspclearfix tools">
                    <span class="tdspan">
                        <el-button type="info" plain @click="delDraft()">删除草稿</el-button>
                    </span>
                    <span class="tdspan"><el-date-picker
                        v-model="timeRange"
                        type="daterange"
                        range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </span>
                    <span class="tdspan">
                        <el-button type="primary" icon="el-icon-search" @click="seachDraft">搜索</el-button>
                    </span>
                </div>
                <el-table ref="multipleTable" :data="drafLists" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column prop="updatorName" label="更新人" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="保存时间" width="155" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.updateTime | timerFormat(scope.row.updateTime)}}
                        </template>
                    </el-table-column>

                    <el-table-column width="300" label="活动主题" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="hd-title">{{ scope.row.activityTheme}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="right" label="操作">
                        <template slot-scope="scope">
                            <!--<el-button type="primary" @click="goBaoMing(scope)" size="mini">编辑</el-button>-->
                            <button class="edit-btn" @click="goBaoMing(scope)"><span class="edit-text">编</span>辑
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="pageList">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="pageRanges"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allTotal">
            </el-pagination>
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
                pageNumber: 1,
                pageSize: 10, // 每一页条数
                allTotal: 0,
                pageRanges: [5, 10, 20, 50], //默认每页10条数区间
                pageType: "draftActivity", //活动草稿页
                drafLists: [],
                ids: "",
                timeRange: []
            };
        },
        created() {
            this.getActDraftList();
        },
        methods: {
            //取得草稿列表
            getActDraftList() {
                var pop = {
                    pageNum: this.pageNumber,
                    pageSize: this.pageSize,
                    parkId: window.sessionStorage.getItem("parkId"),
                    timeStart2: this.timeRange[0] ? this.timeRange[0] : "",
                    timeEnd2: this.timeRange[1] ? this.timeRange[1] : "",
                };

                this.$post(this.$apiUrl.active.actDraftList, pop).then(
                    response => {
                        var codestatus = response.resultCode;
                        if (codestatus == "CLT000000000") {
                            var result = response.resultData.activityList;
                            this.allTotal = response.resultData.total;
                            this.drafLists = result;
                            this.timeRange = [];
                        } else {
                            this.$message.error(response.resultMsg);
                        }
                    },
                    err => {
                         this.$message.error("接口异常");
                    }
                );
            },
            // 搜索
            seachDraft() {
                this.getActDraftList();
            },
            // 删除
            delDraft() {
                if (this.ids == "") {
                    this.$message("您没有选择删除的项目！");
                    return;
                }
                var ids = this.ids;
                var pop = {
                    activityId: ids,
                    parkId: sessionStorage.getItem("parkId")
                };
                var url = this.$apiUrl.active.delActivity;
                this.$post(url, pop).then(
                    response => {

                        if (response.resultCode == "CLT000000000") {
                            this.$message.success("删除成功");
                            this.getActDraftList();
                        } else {
                            this.$message.error(failMsg + response.resultMsg);
                        }
                    },
                    response => {
                        this.$message.error(response.resultMsg);
                    }
                );
            },
            goBaoMing(scope) {
                var activityId = scope.row.activityId;
                this.$router.push({
                    path: "/parkIndex/launchForm",
                    query: {activityId: activityId, opMark: "02"}
                });
            },
          //控制分页条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.getActDraftList();
            },
            //切换当前页码
            handleCurrentChange(val) {
                this.pageNumber = val;
               this.getActDraftList();
            },
            goActiveDetail() {
                this.$router.push({
                    path: "/parkIndex/activityDetail",
                    query: {a: 123}
                });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                var _this = this;
                var selectArray = [];
                this.multipleSelection = val;
                this.multipleSelection.forEach(function (item) {
                    var id = item.activityId;
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
    .hd-title:hover {
        color: #04a2ea;
    }

    .edit-btn {
        padding: 5px 15px;
        width: 85px;
        height: 30px;
        line-height: 20px;
        color: #fff;
        border: none;
        border-radius: 50px;
        background: #409EFF;
        .edit-text {
            margin-right: 15px;
        }
    }
</style>
