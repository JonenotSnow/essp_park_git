<template>
    <div class="essp-am-ggw-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="广告位信息发布" name="first" class="am-ggw-publish">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="广告位编号：" prop="id" v-if="idType === 'update'">
                        <el-input v-model="ruleForm.id" readonly=""></el-input>
                    </el-form-item>
                    <el-form-item label="广告位位置：" prop="adPosition">
                        <el-input v-model="ruleForm.adPosition" placeholder="请输入广告位位置"></el-input>
                    </el-form-item>
                    <el-form-item label="广告位面积：" prop="adArea">
                        <el-input type="number" v-model="ruleForm.adArea" placeholder="平方米（大概）"></el-input>
                    </el-form-item>
                    <el-form-item label="广告位价格：" prop="adPrice">
                        <el-input type="number" v-model="ruleForm.adPrice" placeholder="元/月"></el-input>
                    </el-form-item>
                    <el-form-item label="广告位状态：" prop="status">
                        <el-select v-model="ruleForm.status">
                            <el-option label="出租" value="出租"></el-option>
                            <el-option label="空置" value="空置"></el-option>
                            <el-option label="保留" value="保留"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item v-if="idType === 'add'">
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item v-if="idType === 'update'">
                        <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
                        <el-button @click="cancleUpdate()">取消修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="广告位信息列表" name="second" class="am-ggw-list">
                <div class="ggw-info-search">
                    <div class="title">
                        <h5>查询条件：</h5>
                    </div>
                    <div class="main">
                        <el-form :model="ruleFormSearch" ref="ruleFormSearch" label-width="120px"
                                 class="demo-ruleFormSearch">
                            <!--<el-form-item label="广告位编号：" prop="id">-->
                            <!--<el-input v-model="ruleFormSearch.id"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item label="广告位位置：" prop="adPosition">
                                <el-input v-model="ruleFormSearch.adPosition" placeholder="请输入广告位位置"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="广告位面积：" prop="adArea">-->
                            <!--<el-input v-model="ruleFormSearch.adArea"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item label="广告位价格：" prop="adPrice">
                                <el-input v-model="ruleFormSearch.adPrice" placeholder="请输入广告位价格（单位：元）"></el-input>
                            </el-form-item>
                            <el-form-item label="广告位状态：" prop="status">
                                <el-select v-model="ruleFormSearch.status">
                                    <el-option label="出租" value="出租"></el-option>
                                    <el-option label="空置" value="空置"></el-option>
                                    <el-option label="保留" value="保留"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item label="备注：" prop="remark">-->
                            <!--<el-input v-model="ruleFormSearch.remark"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item style="width: 100%">
                                <el-button type="primary" @click="search">查询</el-button>
                                <el-button @click="resetForm('ruleFormSearch')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="ggw-info-content">
                    <div class="title">
                        <h5>广告位信息：</h5>
                    </div>
                    <div class="main">
                        <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="广告位编号：">
                                            <span>{{ props.row.id }}</span>
                                        </el-form-item>
                                        <el-form-item label="广告位位置：">
                                            <span>{{ props.row.adPosition }}</span>
                                        </el-form-item>
                                        <el-form-item label="广告位面积：">
                                            <span>{{ props.row.adArea }}平方米</span>
                                        </el-form-item>
                                        <el-form-item label="广告位价格：">
                                            <span>{{ props.row.adPrice }}元</span>
                                        </el-form-item>
                                        <el-form-item label="广告位状态：">
                                            <span>{{ props.row.status }}</span>
                                        </el-form-item>
                                        <el-form-item label="备注：" class="remarks">
                                            <span>{{ props.row.remark }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="广告位编号"
                                prop="id">
                            </el-table-column>
                            <el-table-column
                                label="广告位位置"
                                prop="adPosition">
                            </el-table-column>
                            <el-table-column
                                label="广告位面积"
                                prop="adArea">
                            </el-table-column>
                            <el-table-column
                                label="广告位价格"
                                prop="adPrice">
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                    <!--<el-button type="text" size="small" @click="goToDetail(scope.row)">查看</el-button>-->
                                    <el-button type="text" size="small" @click.prevent="update(scope.row)">更改
                                    </el-button>
                                    <!--<el-button icon="el-icon-delete" @click="showDialog(scope.row)"></el-button>-->
                                    <el-button type="text" size="small" @click="showDialog(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog
                            title="提示"
                            :visible.sync="dialogVisible"
                            width="30%"
                            center>
                            <p style="margin-top:10px;text-align: center">确定删除该条广告位信息？</p>
                            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="hairDelete()">确 定</el-button>
                  </span>
                        </el-dialog>
                    </div>
                </div>
                <div class="ggw-info-pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNumber"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                    <!--:page-sizes="[3, 20, 50, 100]"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'guang-gao-wei',
        props: {},
        components: {},
        data() {
            var adArea = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('广告面积不能为空'));
                }
                setTimeout(() => {
                    if (value <= 0) {
                        callback(new Error('必须为正数'));
                    } else {
                        callback();
                    }
                }, 1000);
            };

            var adPrice = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('广告位价格不能为空'));
                }
                setTimeout(() => {
                    if (value <= 0) {
                        callback(new Error('必须为正数'));
                    } else {
                        callback();
                    }
                }, 1000);
            };

            return {
                msg: '广告位',
                activeName: "second",

                idType: 'add',  // 判断是新增页面还是修改页面

                /**
                 *  广告位信息发布---开始
                 **/
                ruleForm: {
                    parkId: sessionStorage.getItem("parkId") || "",
                    id: '',
                    adPosition: '',
                    adArea: '',
                    adPrice: '',
                    status: '',
                    remark: '',

                    addtime: '' // 数据反显时用到
                },
                rules: {
                    id: [
                        {required: true, message: '请输入广告位编号', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    adPosition: [
                        {required: true, message: '请输入广告位位置', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    adArea: [
                        {validator: adArea, trigger: 'blur'}
                    ],
                    adPrice: [
                        {validator: adPrice, trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择广告位状态', trigger: 'change'}
                    ],

                    remark: [
                        // {required: true, message: '请输入备注', trigger: 'blur'},
                        {min: 0, max: 150, message: '长度在 0 到 150 个字符', trigger: 'blur'}
                    ]
                },
                /**
                 *  广告位信息发布---结束
                 **/

                /**
                 *  广告位信息列表---开始
                 **/
                // 查询表格
                ruleFormSearch: {
                    parkId: sessionStorage.getItem("parkId") || "",
                    // id: '',
                    adPosition: '',
                    // adArea: '',
                    adPrice: '',
                    status: '',
                    remark: ''
                },

                // 广告位信息
                tableData: [],

                // 提示框
                dialogVisible: false,
                deleteId: '',

                // 分页
                pageNumber: 1,
                pageSize: 10,
                total: 0,
                /**
                 *  广告位信息列表---结束
                 **/
            }
        },
        methods: {
            /**
             * 选项卡切换
             * @param tab
             * @param event
             */
            handleClick(tab, event) {
                this.$refs['ruleForm'].resetFields();
                this.$refs['ruleFormSearch'].resetFields();
                if (tab.index === '1') {
                    this.idType = 'add';
                    this.getGgwInfoData(this.pageNumber);
                }
            },

            /**
             * 广告位信息发布事件------------开始
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post("/parkAsset/updateAssetAd",
                            this.ruleForm
                        ).then(
                            response => {
                                // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                                    // this.$message(response.resultMsg);
                                    this.$message.success('发布成功');
                                    this.$refs[formName].resetFields();
                                    this.activeName = "second";
                                    this.getGgwInfoData(this.pageNumber);
                                // }
                            },
                            err => {
                            }
                        );
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            cancleUpdate() {
                this.idType = 'add';
                this.activeName = "second";
            },
            /**
             * 广告位信息发布事件------------结束
             */


            /**
             * 广告位信息列表事件------------开始
             */
            // 查询事件
            search() {
                this.getGgwInfoData(this.pageNumber);
            },

            // 获取广告位信息数据
            getGgwInfoData(pageNumber) {
                // 把空值的“键”清除
                for (var key in this.ruleFormSearch) {
                    if (this.ruleFormSearch[key] == '') {
                        delete this.ruleFormSearch[key];
                    }
                }

                // 组装数据，加上分页条件
                this.ruleFormSearch.pageNumber = pageNumber;
                this.ruleFormSearch.pageSize = this.pageSize;

                this.$post("/parkAsset/getAssetAd", this.ruleFormSearch).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.total = response.resultData.totalNumber;
                            this.tableData = response.resultData.listData;
                        // }
                    },
                    err => {
                    }
                );
            },

            // 修改事件
            update(item) {
                delete item.addtime;
                this.ruleForm = item;
                this.idType = 'update';
                this.activeName = "first";
            },

            // 删除相关事件
            showDialog(item) {
                this.dialogVisible = true;
                this.deleteId = item.id
            },
            hairDelete() {
                this.$post("/parkAsset/deleteAssetAd", {
                    parkId: this.parkId,
                    id: this.deleteId,
                }).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.dialogVisible = false;
                            // this.$message(response.resultMsg);
                            this.$message.success('删除成功');
                            this.getGgwInfoData(this.pageNumber);
                        // }
                    },
                    err => {
                    }
                )
            },

            // 分页相关方法
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
                this.getGgwInfoData(val);
            },

            /**
             * 初始化事件
             */
            init() {
                this.getGgwInfoData(this.pageNumber);
            }
            /**
             * 广告位信息列表事件------------结束
             */
        },
        mounted() {
            this.init();
        },
        created() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .essp-am-ggw-wrap {
        .am-ggw-publish {
        }
        .am-ggw-list {
            padding: 0 20px;
            .ggw-info-search {
                .title {
                    margin-bottom: 20px;
                    h5 {
                        font-size: 20px;
                    }
                }
                .main {
                    margin-left: 20px;
                    .demo-ruleFormSearch {
                        .el-form-item {
                            display: inline-block;
                            width: 40%;
                        }
                    }
                }
            }
            .ggw-info-content {
                .title {
                    margin: 20px 0;
                    h5 {
                        font-size: 20px;
                    }
                }
                .main {
                    margin-left: 20px;
                    .demo-table-expand {
                        font-size: 0;
                    }
                    .demo-table-expand label {
                        text-align: right;
                        width: 120px;
                        color: #99a9bf;
                    }
                    .demo-table-expand {
                        .el-form-item {
                            margin-right: 0;
                            margin-bottom: 0;
                            width: 50%;
                        }
                        .remarks {
                            display: block;
                            width: 100%;
                            .el-form-item__content {
                                width: 85%;
                            }
                        }
                    }
                    .el-table th {
                        text-align: center;
                    }
                    .el-table__row,
                    .el-table__row.expanded {
                        td {
                            text-align: center;
                        }
                    }
                }
            }
            .ggw-info-pagination {
                margin: 10px;
                text-align: right;
            }
        }
    }
</style>
