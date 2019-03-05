<template>
    <div class="essp-am-ld-wrap">
        <div class="am-ld-list_page">
            <div class="am-ld-head">
                <div class="am-ld-head-bread-crumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/parkHall/manage/baseInfo' }">园区管理</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/parkHall/merchants/assetManag/projects' }">楼宇项目
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>楼宇</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="am-ld-head-add">
                    <el-button type="primary" @click="showPublishPage('ruleForm')">新增楼宇</el-button>
                </div>
            </div>

            <div class="am-ld-content">
                <div class="am-ld-content-overview">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>项目概览</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>-->
                        </div>
                        <div>
                            <div class="am-ld-content-overview-img">
                                <img :src="projectInfoData.imageUrl?projectInfoData.imageUrl:noImgUrl">
                            </div>
                            <div class="am-ld-content-overview-detail">
                                <p>项目名称：{{projectInfoData.name}}</p>
                                <p class="half">楼宇总数：{{projectInfoData.totalBuilding}}栋</p>
                                <p class="half">建筑总面积：{{projectInfoData.area}}平方米</p>
                                <p class="half">房间：共{{projectInfoData.totalRoom}}套，剩余{{projectInfoData.freeRoom}}套</p>
                                <!--<p class="half">工位：共333个，剩余200个</p>-->
                                <p class="remarks">备注：{{projectInfoData.remark}}</p>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </el-card>
                </div>

                <div class="am-ld-content-list">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>楼宇列表</span>
                        </div>
                        <div>
                            <div class="am-ld-content-list-table">
                                <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                    <el-table-column
                                        label="楼宇名称"
                                        width="220">
                                        <template slot-scope="scope">
                                            <el-button
                                                size="mini" style="min-width:62px;padding: 7px 4px;text-align:center;max-width: 140px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                                                @click="redirect(scope.$index, scope.row)">
                                                {{scope.row.bname}}
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="area"
                                        label="总面积数">
                                    </el-table-column>
                                    <el-table-column
                                        prop="storeyUp"
                                        label="地上层数">
                                    </el-table-column>
                                    <el-table-column
                                        prop="storeyUnder"
                                        label="地下层数">
                                    </el-table-column>
                                    <el-table-column
                                        label="是否虚拟">
                                        <template slot-scope="scope">
                                            {{scope.row.isDummy == 1 ? '是' : '否'}}
                                        </template>
                                    </el-table-column>
                                    <!--<el-table-column label="房间">-->
                                    <!--<el-table-column-->
                                    <!--prop="buildingName"-->
                                    <!--label="已租套数">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                    <!--prop="buildingName"-->
                                    <!--label="剩余套数">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                    <!--prop="buildingName"-->
                                    <!--label="出租率">-->
                                    <!--</el-table-column>-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column label="工位">-->
                                    <!--<el-table-column-->
                                    <!--prop="buildingName"-->
                                    <!--label="已租">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                    <!--prop="buildingName"-->
                                    <!--label="剩余">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                    <!--prop="buildingName"-->
                                    <!--label="出租率">-->
                                    <!--</el-table-column>-->
                                    <!--</el-table-column>-->
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <span @click="update(scope.$index, scope.row)"
                                                  style="margin: 0 3px; cursor: pointer">编辑</span>
                                            <span @click="showDialog(scope.$index, scope.row)"
                                                  style="margin: 0 3px; cursor: pointer">删除</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    center>
                                    <p style="margin-top:10px;text-align: center">确定删除该条楼宇信息？</p>
                                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="hairDelete()">确 定</el-button>
                  </span>
                                </el-dialog>
                            </div>

                            <div class="am-ld-content-list-pagination">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pageNumber"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>

        <div class="am-ld-publish_page">
            <!--:before-close="closeWindow"-->
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="所属项目：">
                        <!--<el-input v-model="ruleForm.spaceProjectId"></el-input>-->
                        {{projectInfoData.name}}
                    </el-form-item>
                    <!--<el-form-item label="楼宇编号：" prop="bno">-->
                    <!--<el-input v-model="ruleForm.bno"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="楼宇名称：" prop="bname">
                        <el-input v-model="ruleForm.bname" placeholder="请输入楼宇名称"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="楼宇地址：" prop="addr">-->
                    <!--<el-input v-model="ruleForm.addr" placeholder="请输入楼宇地址"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="楼宇状态：" prop="status">-->
                    <!--<el-input v-model="ruleForm.status" placeholder="请输入楼宇状态"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="总面积数：" prop="area">
                        <el-input type="number" v-model="ruleForm.area" placeholder="请输入总面积数，单位为平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="地上层数：" prop="storeyUp">
                        <el-input type="number" v-model="ruleForm.storeyUp" placeholder="请输入地上层数"></el-input>
                    </el-form-item>
                    <el-form-item label="地下层数：" prop="storeyUnder">
                        <el-input type="number" v-model="ruleForm.storeyUnder" placeholder="请输入地下层数"></el-input>
                    </el-form-item>
                    <el-form-item label="是否虚拟：" prop="isDummy">
                        <el-select v-model="ruleForm.isDummy" placeholder="请选择是否虚拟">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark" style="display: block; width: 100%">
                        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="图片上传：" :label-width="formLabelWidth" style="display: block; width: 100%">
                        <el-upload
                            class="upload-demo"
                            :before-upload="beforeUpload"
                            :action='uploads'
                            :multiple='true'
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">图片的大小不能超过2MB</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item v-if="idType === 'add'">
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>


        <div class="am-ld-update_page">
            <el-dialog :title="title" :visible.sync="dialogFormVisible_update">
                <el-form :model="ruleForm_update" :rules="rules" ref="ruleForm_update" label-width="120px"
                         class="demo-ruleForm">
                    <el-form-item label="所属项目：">
                        {{projectInfoData.name}}
                    </el-form-item>
                    <el-form-item label="楼宇名称：" prop="bname">
                        <el-input v-model="ruleForm_update.bname" placeholder="请输入楼宇名称"></el-input>
                    </el-form-item>
                    <el-form-item label="总面积数：" prop="area">
                        <el-input type="number" v-model="ruleForm_update.area" placeholder="请输入总面积数，单位为平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="地上层数：" prop="storeyUp">
                        <el-input type="number" v-model="ruleForm_update.storeyUp" placeholder="请输入地上层数"></el-input>
                    </el-form-item>
                    <el-form-item label="地下层数：" prop="storeyUnder">
                        <el-input type="number" v-model="ruleForm_update.storeyUnder" placeholder="请输入地下层数"></el-input>
                    </el-form-item>
                    <el-form-item label="是否虚拟：" prop="isDummy">
                        <el-select v-model="ruleForm_update.isDummy" placeholder="请选择是否虚拟">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark" style="display: block; width: 100%">
                        <el-input type="textarea" v-model="ruleForm_update.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="图片上传：" :label-width="formLabelWidth" style="display: block; width: 100%">
                        <el-upload
                            class="upload-demo"
                            :before-upload="beforeUpload"
                            :action='uploads'
                            :multiple='true'
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">图片的大小不能超过2MB</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm_update')">保存修改</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'lou-dong',
        props: {},
        components: {},
        data() {

            let checkBname = (rule, value, callback) => {
                let newValue = value.trim();
                let len = newValue.toString().length;
                if (!newValue) {
                    return callback(new Error('请输入楼宇名称'));
                }
                setTimeout(() => {
                    if (len < 1 || len > 30) {
                        callback(new Error('长度在 1 到 30 个字符'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            let checkArea = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入总面积数'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue <= 0) {
                            callback(new Error('面积必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            let checkStoreyUp = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入地上层数'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue <= 0) {
                            callback(new Error('地上层数必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            let checkStoreyUnder = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入地下层数'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue < 0) {
                            callback(new Error('地下层数必须大于等于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };

            return {
                msg: '楼栋',
                activeName: "second",

                title: '创建新楼宇',
                idType: 'add',  // 判断是新增页面还是修改页面

                /**
                 *  楼宇信息发布---开始
                 **/
                // 新增项目页面字段
                dialogFormVisible: false,
                dialogFormVisible_update: false,
                ruleForm: {
                    parkId: sessionStorage.getItem("parkId") || "", // 园区Id
                    // parkId: "1234556", // 园区Id  ---测试时用
                    spaceProjectId: '', // 所属项目【接口获取，无需输入】
                    bno: '',    // 楼宇编号【接口获取，无需输入】
                    bname: '',
                    addr: '',
                    status: '',
                    area: '',
                    storeyUp: '',
                    storeyUnder: '',
                    heightNumber: '',
                    underHeightNumber: '',
                    isDummy: '',
                    remark: '',
                    imageUrl: '',

                    // addtime: '' // 数据反显时用到
                },
                rules: {
                    bname: [
                        {validator: checkBname, trigger: 'blur'},
                        {required: true, message: '请输入房间名称', trigger: 'blur'}
                    ],
                    area: [
                        {validator: checkArea, trigger: 'blur'},
                        {required: true, message: '请输入总面积数', trigger: 'blur'}
                    ],
                    storeyUp: [
                        {validator: checkStoreyUp, trigger: 'blur'},
                        {required: true, message: '请输入地上层数', trigger: 'blur'}
                    ],
                    storeyUnder: [
                        {validator: checkStoreyUnder, trigger: 'blur'},
                        {required: true, message: '请输入地下层数', trigger: 'blur'}
                    ],
                    isDummy: [
                        {required: true, message: '请选择是否虚拟', trigger: 'change'}
                    ],
                    remark: [
                        // {required: true, message: '请输入备注', trigger: 'blur'},
                        {min: 0, max: 40, message: '长度在 0 到 40 个字符', trigger: 'blur'}
                    ]
                },
                ruleForm_copy: {},
                ruleForm_update: {
                    parkId: sessionStorage.getItem("parkId") || "", // 园区Id
                    // parkId: "1234556", // 园区Id  ---测试时用
                    spaceProjectId: '', // 所属项目【接口获取，无需输入】
                    bno: '',    // 楼宇编号【接口获取，无需输入】
                    bname: '',
                    addr: '',
                    status: '',
                    area: '',
                    storeyUp: '',
                    storeyUnder: '',
                    heightNumber: '',
                    underHeightNumber: '',
                    isDummy: '',
                    remark: '',
                    imageUrl: '',

                    // addtime: '' // 数据反显时用到
                },
                formLabelWidth: '120px',

                // 图片上传
                uploads: '',    // 上传接口路径
                fileList: [],
                /**
                 *  楼宇信息发布---结束
                 **/

                /**
                 *  楼宇信息列表---开始
                 **/
                // 查询表格
                ruleFormSearch: {
                    remark: ''
                },

                // 项目信息
                projectInfoData: {},
                noImgUrl: require('./projectsPic.jpg'),

                // 楼宇信息
                tableData: [],

                // 提示框
                dialogVisible: false,
                deleteId: '',

                // 分页
                pageNumber: 0,
                pageSize: 10,
                total: 0,
                /**
                 *  楼宇信息列表---结束
                 **/
            }
        },
        methods: {

            /**
             * 楼宇信息发布事件------------开始
             */

            closeWindow() {
                this.dialogFormVisible = false;
            },

            //  弹出发布页面
            showPublishPage() {
                this.idType = 'add';
                this.title = "创建新楼宇";
                this.ruleForm = Object.assign({}, this.ruleForm_copy);
                this.fileList = [];
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs["ruleForm"].resetFields();
                });
            },

            // 修改事件
            update(index, item) {
                this.title = "更新楼栋信息";
                this.idType = 'update';
                this.dialogFormVisible_update = true;
                if (this.dialogFormVisible_update) {
                    this.ruleForm_update = Object.assign({}, item);
                }
            },


            //图片上传
            beforeUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png";
                const isLt5M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
                    return isJPG;
                }
                if (!isLt5M) {
                    this.$message.error("上传图片的大小不能超过2MB!");
                    return isLt5M;
                }
                let param = new FormData();  // 创建form对象
                param.append('file', file);
                param.append('type', 'park');
                param.append('model', 'assetManag');
                var _this = this;
                _this.loading = true;
                this.$post(this.$apiUrl.upload.upload, param).then(response => {
                    this.$message.success("图片上传成功");
                    this.fileList = [];
                    this.fileList.push(response.resultData[0]);
                }, err => {
                    this.$message.error("接口异常")
                });
                return false // 返回false不会自动上传
            },


            // 提交按钮
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let imageURL = '';
                        for (let i = 0; i < this.fileList.length; i++) {
                            imageURL += this.fileList[i].url;
                            if (i !== this.fileList.length - 1) {
                                imageURL += ',';
                            }
                        }

                        console.log('imageURL===================');
                        console.log(imageURL);

                        // let imageURL = this.fileList.toString();
                        this.ruleForm.imageUrl = imageURL;
                        this.ruleForm_update.imageUrl = imageURL;

                        let params;
                        if (this.idType == 'update') {
                            params = this.ruleForm_update
                        } else {
                            params = this.ruleForm
                        }

                        this.$post("/space/addBuilding",
                            params
                        ).then(
                            response => {
                                // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                                    // this.$message(response.resultMsg);

                                    if (this.idType == 'update') {
                                        this.$message.success("修改楼宇成功！");
                                    } else {
                                        this.$message.success("创建楼宇成功！");
                                        this.$refs[formName].resetFields();
                                    }
                                    this.dialogFormVisible = false;
                                    this.dialogFormVisible_update = false;
                                    this.fileList.length = 0;   // 清空图片
                                    this.getLdInfoData(this.pageNumber);
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
                this.dialogFormVisible = false;
            },
            /**
             * 楼宇信息发布事件------------结束
             */


            /**
             * 楼宇信息列表事件------------开始
             */
            // 查询事件
            search() {
                this.getLdInfoData(this.pageNumber);
            },

            // 根据项目项目id获取楼宇
            getBuildingDeatil(spaceProjectId) {
                this.$post("/space/getBuildingById", {id: spaceProjectId}).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            console.log('根据项目项目id获取楼宇');
                            console.log(response);
                        // }
                    },
                    err => {
                    }
                );
            },

            // 获取单个项目的数据
            getProjectInfoData(spaceProjectId) {
                this.$post("/space/getProjectById", {id: spaceProjectId}).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.projectInfoData = response.resultData;

                            console.log('获取单个项目的数据=====');
                            console.log(this.projectInfoData);

                        // }
                    },
                    err => {
                    }
                );
            },

            // 获取楼宇信息数据
            getLdInfoData(pageNumber) {
                // 把空值的“键”清除
                for (var key in this.ruleFormSearch) {
                    if (this.ruleFormSearch[key] == '') {
                        delete this.ruleFormSearch[key];
                    }
                }

                // 加上项目id
                this.ruleFormSearch.spaceProjectId = this.ruleForm.spaceProjectId;


                // 组装数据，加上分页条件
                this.ruleFormSearch.pageNum = pageNumber;
                this.ruleFormSearch.pageSize = this.pageSize;

                this.$post("/space/getBuildings", this.ruleFormSearch).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.total = response.resultData.count;
                            this.tableData = response.resultData.list;
                        // }
                    },
                    err => {
                    }
                );
            },


            // 删除相关事件
            showDialog(id, item) {
                this.dialogVisible = true;
                this.deleteId = item.id
            },
            hairDelete() {
                this.$post("/space/delByBuildingId", {
                    parkId: this.parkId,
                    id: this.deleteId,
                }).then(
                    response => {
                        // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            this.dialogVisible = false;
                            // this.$message(response.resultMsg);
                            this.$message.success('删除成功');
                            this.getLdInfoData(this.pageNumber);
                            // this.handleCurrentChange(this.pageNumber);

                        // }
                    },
                    err => {
                    }
                )
            },

            // 页面跳转
            redirect(index, item) {
                // 由楼栋列表页面跳转至具体楼栋---即房间列表页面
                this.$router.push({
                    path: "/parkHall/merchants/assetManag/fangJian",
                    query: {
                        buildingId: item.id,
                        buildingName: item.bname,
                        projectName: this.projectInfoData.name
                    }
                });
            },

            // 分页相关方法
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
                let curVal = val - 1;
                this.getLdInfoData(curVal);
            },

            /**
             * 初始化事件
             */
            init() {
                // this.getBuildingDeatil(this.ruleForm.spaceProjectId);
                this.getLdInfoData(this.pageNumber);
                this.getProjectInfoData(this.ruleForm.spaceProjectId);
            }
            /**
             * 楼宇信息列表事件------------结束
             */
        },
        mounted() {
            this.init();
        },
        created() {

            // 上传接口
            this.uploads = this.$apiUrl.upload.upload;

            // let type = this.$route.query.type;
            // let spaceProjectId = this.$route.query.id || 'cfa95ee1f3b1449e99a78f0d8fcd2a7a';
            let spaceProjectId = this.$route.query.id;
            this.ruleForm.spaceProjectId = spaceProjectId;
            this.ruleForm_copy = JSON.parse(JSON.stringify(this.ruleForm));
            // this.ruleForm_copy = Object.assign({}, this.ruleForm);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .essp-am-ld-wrap {
        margin: 20px auto;
        padding: 10px;
        width: 1200px;
        background: #fff;
        .am-ld-list_page {
            .am-ld-head {
                position: relative;
                height: 60px;
                border-bottom: 1px solid #ccc;
                .am-ld-head-bread-crumb {
                    position: absolute;
                    top: 25px;
                    left: 10px;
                }
                .am-ld-head-add {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
            }
            .am-ld-content {
                margin-top: 10px;
                .am-ld-content-overview {
                    padding: 10px;
                    .am-ld-content-overview-img {
                        /*display: inline-block;*/
                        float: left;
                        width: 30%;
                        height: 170px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .am-ld-content-overview-detail {
                        /*display: inline-block;*/
                        float: left;
                        margin-left: 20px;
                        padding-top: 10px;
                        width: 67%;
                        height: 160px;
                        p {
                            margin-bottom: 15px;
                            width: 100%;
                        }
                        p.half {
                            display: inline-block;
                            width: 49%;
                        }
                        p.remarks {
                            line-height: 1.7em;
                        }
                    }
                }

                .am-ld-content-list {
                    padding: 10px;
                    .am-ld-content-list-table {
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
                            .follow-ext.remarks {
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
                    .am-ld-content-list-pagination {
                        margin: 10px;
                        text-align: right;
                    }
                }
            }
        }

        .am-ld-publish_page {
            .el-dialog {
                width: 70%;
            }
            .el-dialog__header {
                margin-bottom: 20px;
                padding: 10px;
                font-weight: bold;
                background-color: #0f74a8;
                .el-dialog__title {
                    color: #fff;
                }
                .el-dialog__headerbtn {
                    top: 10px;
                }
                .el-dialog__headerbtn .el-dialog__close {
                    color: #fff;
                    font-weight: bold;
                }
            }
            .el-form {
                .el-form-item {
                    display: inline-block;
                    width: 49%;
                    .el-form-item__content {
                        .el-select {
                            width: 100%;
                        }
                        .el-input,
                        .el-textarea {
                            width: 98%;
                        }

                        .upload-demo {
                            width: 98%;
                            .el-upload el-upload--text {
                                display: inline-block;
                            }
                            .el-upload__tip {
                                margin-left: 20px;
                                display: inline-block;
                            }
                        }

                    }
                }
            }
        }

        .am-ld-update_page {
            .el-dialog {
                width: 70%;
            }
            .el-dialog__header {
                margin-bottom: 20px;
                padding: 10px;
                font-weight: bold;
                background-color: #0f74a8;
                .el-dialog__title {
                    color: #fff;
                }
                .el-dialog__headerbtn {
                    top: 10px;
                }
                .el-dialog__headerbtn .el-dialog__close {
                    color: #fff;
                    font-weight: bold;
                }
            }
            .el-form {
                .el-form-item {
                    display: inline-block;
                    width: 49%;
                    .el-form-item__content {
                        .el-select {
                            width: 100%;
                        }
                        .el-input,
                        .el-textarea {
                            width: 98%;
                        }

                        .upload-demo {
                            width: 98%;
                            .el-upload el-upload--text {
                                display: inline-block;
                            }
                            .el-upload__tip {
                                margin-left: 20px;
                                display: inline-block;
                            }
                        }

                    }
                }
            }
        }

    }
</style>
