<template>
    <div>
        <!-- 我发起的惠政草稿模版 -->
        <div class="draftcon">
            <essp-top-toolbar :pageType="pageType"></essp-top-toolbar>
            <div>
                <div class="esspclearfix tools">
                    <span class="tdspan"><el-button type="info" plain @click="delDelDraft()">删除草稿</el-button></span>
                    <span class="tdspan"><el-date-picker
                        v-model="timeRange"
                        type="daterange"
                        range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </span>
                    <span class="tdspan"><el-button
                        type="primary"
                        icon="el-icon-search"
                        @click="getGoverList()">搜索</el-button></span>
                </div>
                <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column prop="userName" label="发布人" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="保存时间" width="155" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.createTime | timerFormat(scope.row.createTime)}}
                        </template>
                    </el-table-column>

                    <el-table-column width="300" label="惠政标题" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="hz-title">{{ scope.row.policyTitle}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="right">
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
                :current-page="pageNum"
                :page-sizes="pageRanges"
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="allTotal">
            </el-pagination>
        </div>

    </div>

</template>

<script>
    import EsspTopToolbar from "@/components/EsspTopToolbar";
    // 引入获取列表的公共的js
    import {goverBene} from "@/fetch/api/goverBene/goverBene";

    import Moment from "moment";

    export default {
        name: "",
        data() {
            return {
                pageRanges: [5, 10, 20, 50, 100], //默认每页10条数区间
                pageNum: 1, //当前页码
                pageSize: 10, //每页条数
                allTotal: 0, //总条数
                startDate: "", //起始时间
                endDate: "", //结束时间
                model1: "",
                pageType: "draftGover", //活动草稿页
                tableData3: [],
                ids: "", //删除的ids
                timeRange: []
            };
        },
        created() {
            this.getGoverList();
        },
        components: {
            EsspTopToolbar,
            Moment
        },
        methods: {
            goBaoMing(scope) {
                var draftId = scope.row.id;
                this.$router.push({
                    path: "/parkIndex/publishGover",
                    query: {draftId: draftId}
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getGoverList();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getGoverList();
            },

            handleSelectionChange(val) {
                var _this = this;
                var selectArray = [];
                this.multipleSelection = val;
                this.multipleSelection.forEach(function (item) {
                    var id = item.id;
                    selectArray.push(id);
                });
                _this.ids = selectArray.join(",");
            },
            getGoverList() {
                var url = goverBene["getMyPubPol"] || "";

                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.timeRange[0] ? this.timeRange[0] : "",
                    endDate: this.timeRange[1] ? this.timeRange[1] : "",
                    status: "0",
                    parkId: sessionStorage.getItem("parkId") || ""
                }).then(response => {
                    this.timeRange = [];
                    this.tableData3 = response.resultData.policyList;
                    this.allTotal = response.resultData.total;
                });
            },
            delDelDraft() {
                if (this.ids == "") {
                    this.$message("您没有选择删除的项目！");
                    return;
                }
                var ids = this.ids;
                var pop = {ids: ids};
                var url = this.$apiUrl.goverBene.delPolicy;
                this.$post(url, pop).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.getGoverList();
                        // } else {
                        //     this.$message.info(response.resultMsg);
                        // }
                    },
                    err => {
                        this.$message.error("接口异常");
                    }
                );
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

    .hz-title:hover {
        color: #04a2ea;
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
