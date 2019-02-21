<template>
    <div id="traceRecords">
        <!-- 跟踪记录 -->
        <el-dialog :visible.sync="show" title="跟踪记录" class='removeParkTrace'
                   :before-close="changeShow">
            <!--<p class="title">跟踪记录</p>-->
            <div class="content">
                <div class="condition">
                    <el-form :model="ruleFormSearch" ref="ruleFormSearch" label-width="120px"
                             class="demo-ruleFormSearch">

                        <el-form-item label="跟踪日期：">
                            <el-col :span="11">
                                <el-form-item prop="startTime">
                                    <el-date-picker
                                        type="date" placeholder="选择开始日期"
                                        v-model="ruleFormSearch.startTime"
                                        style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align: center">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="endTime">
                                    <el-date-picker
                                        type="date" placeholder="选择结束日期"
                                        v-model="ruleFormSearch.endTime"
                                        style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="跟踪方式：" prop="followType">
                            <el-select v-model="ruleFormSearch.followType" placeholder="请选择跟踪方式">
                                <el-option label="来访" value="1"></el-option>
                                <el-option label="走访" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="邮件" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="跟踪人：">-->
                        <!--<el-input v-model="ruleFormSearch.trancer" placeholder="请输入跟踪人"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="房间类型：" prop="roomType">-->
                        <!--<el-select v-model="ruleFormSearch.roomType" placeholder="请选择房间类型">-->
                        <!--<el-option label="公寓" value="1"></el-option>-->
                        <!--<el-option label="商铺" value="2"></el-option>-->
                        <!--<el-option label="办公间" value="3"></el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <el-form-item style="width: 100%">
                            <el-button type="primary" @click="search">查询</el-button>
                            <el-button @click="resetForm()">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tabList">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" align="center" label="序号"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" label="跟踪方式">
                            <template slot-scope="scope">
                                <span v-if="scope.row.followType == 1">来访</span>
                                <span v-else-if="scope.row.followType == 2">走访</span>
                                <span v-else-if="scope.row.followType == 3">电话</span>
                                <span v-else>邮件</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip align="center" label="跟踪纪要">
                            <template slot-scope="scope">
                                <span>{{scope.row.followDesc}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip align="center"
                                         label="跟踪人" prop="followPersonName"></el-table-column>
                        <el-table-column align="center" width="120"
                                         label="跟踪日期">
                            <template slot-scope="scope">{{scope.row.followTime | timerFormat}}</template>
                        </el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="getDetail(scope.$index, scope.row)">查看</el-button>
                                <el-button type="text" @click="showDialog_delete(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>

                        <!--<el-table-column align="center" prop="status" width="120" label="跟踪日期" >-->
                        <!--<template slot-scope="scope">-->
                        <!--2018-02-33-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </div>
                <div class="pageList">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

        </el-dialog>

        <!-- 详情 -->
        <el-dialog title="详细信息" :visible.sync="dialogFormVisible_detail" width="70%" id="detail">
            <el-form label-width="120px" class="demo-ruleForm">
                <el-form-item label="跟进编号：">
                    {{afDeatil.followNumber}}
                </el-form-item>
                <el-form-item label="跟进时间：">
                    {{afDeatil.followTime | timerFormat}}
                </el-form-item>
                <el-form-item label="跟进类型：">
                    <span v-if="afDeatil.followType == 1">来访</span>
                    <span v-else-if="afDeatil.followType == 2">走访</span>
                    <span v-else-if="afDeatil.followType == 3">电话</span>
                    <span v-else>邮件</span>
                </el-form-item>
                <el-form-item label="跟进状态：">
                    <span v-if="afDeatil.followStatus == 0">储备项目</span>
                    <span v-else-if="afDeatil.followStatus == 1">在谈项目</span>
                    <span v-else-if="afDeatil.followStatus == 2">已成交项目</span>
                    <span v-else>搁置项目</span>
                </el-form-item>
                <el-form-item label="跟进人：">
                    {{afDeatil.followPersonName}}
                </el-form-item>
                <el-form-item label="创建时间：">
                    {{afDeatil.createTime | timerFormat}}
                </el-form-item>
                <el-form-item label="更新时间：">
                    {{afDeatil.updateTime | timerFormat}}
                </el-form-item>
                <el-form-item label="项目名称：">
                    {{afDeatil.atractInvestTitle}}
                </el-form-item>
                <el-form-item label="跟进人姓：">
                    {{afDeatil.followPersonName}}
                </el-form-item>
                <el-form-item label="意向房源：" style="width: 100%">
                    <span v-if="afDeatil.followIntention && afDeatil.followIntention.length == 0">暂无</span>
                    <p style="display: inline-block" v-else>
                        <span v-for="(item , index) in afDeatil.followIntention" :key="index">{{item.blProject}}>{{item.bname}}>{{item.rname}}、</span>
                    </p>
                </el-form-item>
                <el-form-item label="跟进详情：" style="width: 100%">
                    {{afDeatil.followDesc}}
                </el-form-item>
                <el-form-item label="附件：" style="width: 100%">
                    <span v-if="afDeatil.followAccessory && afDeatil.followAccessory.length == 0">暂无</span>
                    <p v-else>
                        <span style="display: block; width: 100%" v-for="(item , index) in afDeatil.followAccessory"
                              :key="index">
                            <a :href="item.url" :download="item.name">{{item.name}}</a>
                        </span>
                    </p>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--  删除 -->
        <el-dialog title="提示" :visible.sync="dialogVisible_delete" width="30%" center>
            <p style="margin-top:10px;text-align: center">确定删除该条跟踪信息？</p>
            <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible_delete = false">取 消</el-button>
                                        <el-button type="primary" @click="hairDelete()">确 定</el-button>
                                    </span>
        </el-dialog>

    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        props: ['show', 'afId'],
        data() {
            return {

                // 查询表格
                ruleFormSearch: {
                    parkId: sessionStorage.getItem("parkId") || "",
                    startTime: '',
                    endTime: '',
                    followType: '',
                },

                // 详情列表
                tableData: [],

                // 分页
                pageNumber: 0,
                pageSize: 10,
                total: 0,

                // 提示框_详情
                afDeatil: {},
                dialogFormVisible_detail: false,
                detailId: '',

                // 提示框_删除
                dialogVisible_delete: false,
                deleteId: '',
            }
        },
        methods: {

            // 子传父
            changeShow() {
                this.show = false;
                this.$emit('parentShow', this.show);
            },

            // 查询事件
            search() {
                this.getAttractFollowDetailList(this.pageNumber);
            },
            resetForm() {
                this.ruleFormSearch.startTime = "";
                this.ruleFormSearch.endTime = "";
                this.ruleFormSearch.followType = "";
                this.search();
            },

            // 获取跟进详情列表
            getAttractFollowDetailList(pageNumber) {

                // 把空值的“键”清除
                for (var key in this.ruleFormSearch) {
                    if (this.ruleFormSearch[key] == '') {
                        delete this.ruleFormSearch[key];
                    }
                }

                console.log("====", this.afId);
                // 项目编号（必填）
                this.ruleFormSearch.followNumber = this.afId;
                // 组装数据，加上分页条件
                this.ruleFormSearch.pageNum = pageNumber+1;
                this.ruleFormSearch.pageSize = this.pageSize;

                this.$post("/attractFollow/getAttractFollowPage", this.ruleFormSearch).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.total = response.resultData.total;
                            this.tableData = response.resultData.list;
                        // }
                    },
                    err => {
                    }
                );
            },

            // 查看具体详情
            getDetail(index, item) {
                this.dialogFormVisible_detail = true;
                this.$post("/attractFollow/getAttractFollowByKey", {afId: item.afId}).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.afDeatil = response.resultData;
                            this.afDeatil.followAccessory = JSON.parse(this.afDeatil.followAccessory);
                            this.afDeatil.followIntention = JSON.parse(this.afDeatil.followIntention);
                        // }
                    },
                    err => {
                    }
                );
            },

            handleSizeChange(val) {
                this.pageSize = val;
                // this.getAttractFollowDetailList(val);

            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getAttractFollowDetailList(val);
            },

            // 删除相关事件
            showDialog_delete(index, item) {
                this.dialogVisible_delete = true;
                this.deleteId = item.afId
            },
            hairDelete() {
                this.$post("/attractFollow/deleteAttractFollow", {
                    afId: this.deleteId,
                }).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.dialogVisible_delete = false;
                            // this.$message(response.resultMsg);
                            this.$message.success('删除成功');
                            this.getAttractFollowDetailList(this.pageNumber);
                        // }
                    },
                    err => {
                    }
                )
            },

        },
        watch: {
            'show'() {
                this.getAttractFollowDetailList(this.pageNumber);
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        mounted() {
            this.resetForm();
        },
        created() {

        }
    }
</script>
<style>
    #traceRecords .removeParkTrace .el-dialog {
        width: 1000px;
        margin: 5% auto 0 !important;
        height: 80%;
        overflow: hidden;
    }

    #traceRecords .removeParkTrace .el-dialog__body {
        padding: 0 20px;
        height: 80%;
        overflow: auto;
    }

    #detail > .el-dialog {
        margin-top: 7%;
        height: 83%;
        overflow: hidden;
    }

    #detail .el-dialog__body {
        height: 400px;
        overflow: hidden;
    }

</style>
<style lang='less' scoped>
    #traceRecords {
        .removeParkTrace {

            .el-dialog__header {
                display: none;
            }

            .el-dialog__body {
                .title {
                    height: 50px;
                    color: #333;
                    font-size: 18px;
                    text-indent: 20px;
                    line-height: 50px;
                }
                .content {
                    margin: 10px;
                    padding: 10px 20px;
                    .condition {
                        border-bottom: 1px solid #eee;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        .demo-ruleFormSearch {
                            height: 175px;
                        }
                        .el-form-item {
                            /*display: inline-block;*/
                            float: left;
                            /*width: 49%;*/
                        }
                    }
                    .tabList {
                        border-bottom: none;
                        margin: 0 auto 20px;
                    }
                }
                .pageList {
                    margin-top: 15px;
                    width: 880px;
                    margin: 0 auto;
                    text-align: right;
                }
                .btn {
                    text-align: center;
                }
            }
        }

        #detail {
            .el-form-item {
                display: inline-block;
                width: 49%;
            }
        }
    }
</style>
