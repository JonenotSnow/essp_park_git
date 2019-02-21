<template>
    <div class="essp-pro-am-wrap">
        <div class="asset-type-select">
            <el-tabs v-model="assetType" @tab-click="handleClick" class="asset-type">
                <!--地产-->
                <el-tab-pane label="房产" name="dc">
                    <div class="di-chan">
                        <el-form :model="ruleFormDc" :rules="rulesDc" ref="ruleFormDc" label-width="120px"
                                 class="demo-ruleFormDc">
                            <el-form-item label="资产编号：" prop="id">
                                <el-input v-model="ruleFormDc.id"></el-input>
                            </el-form-item>
                            <el-form-item label="资产名称：" prop="assetName">
                                <el-input v-model="ruleFormDc.assetName"></el-input>
                            </el-form-item>
                            <el-form-item label="楼宇编号：" prop="buildingId">
                                <el-input v-model="ruleFormDc.buildingId"></el-input>
                            </el-form-item>
                            <el-form-item label="楼层数：" prop="storey">
                                <el-input v-model="ruleFormDc.storey"></el-input>
                            </el-form-item>
                            <el-form-item label="房间代码：" prop="roomNumber">
                                <el-input v-model="ruleFormDc.roomNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="房间类型" prop="roomType">
                                <el-select v-model="ruleFormDc.roomType" placeholder="请选择房间类型">
                                    <el-option label="公寓" value="gongyu"></el-option>
                                    <el-option label="办公间" value="bangongjian"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="建筑面积：" prop="StructureArea">
                                <el-input v-model="ruleFormDc.StructureArea"></el-input>
                            </el-form-item>
                            <el-form-item label="使用面积：" prop="useableArea">
                                <el-input v-model="ruleFormDc.useableArea"></el-input>
                            </el-form-item>
                            <el-form-item label="房间状态" prop="roomStatus">
                                <el-select v-model="ruleFormDc.roomStatus" placeholder="请选择房间状态">
                                    <el-option label="出租" value="chuzu"></el-option>
                                    <el-option label="空置" value="kongzhi"></el-option>
                                    <el-option label="保留" value="baoliu"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleFormDc')">立即创建</el-button>
                                <el-button @click="resetForm('ruleFormDc')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="房产列表" name="dclb">
                    <ul>
                        <li></li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="楼栋" name="ld">
                    <div class="lou-dong">
                        <el-form :model="ruleFormLd" :rules="rulesLd" ref="ruleFormLd" label-width="120px"
                                 class="demo-ruleFormLd">
                            <el-form-item label="楼栋编号：" prop="buildingId">
                                <el-input v-model="ruleFormLd.buildingId"></el-input>
                            </el-form-item>
                            <el-form-item label="楼栋名称：" prop="buildingName">
                                <el-input v-model="ruleFormLd.buildingName"></el-input>
                            </el-form-item>
                            <el-form-item label="楼栋序号：" prop="buildingSerial">
                                <el-input v-model="ruleFormLd.buildingSerial"></el-input>
                            </el-form-item>
                            <el-form-item label="楼层数：" prop="floorsNumber">
                                <el-input v-model="ruleFormLd.floorsNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="楼层类型：" prop="floorsType">
                                <el-select v-model="ruleFormLd.floorsType" placeholder="请选择楼层类型">
                                    <el-option label="高层" value="gaoceng"></el-option>
                                    <el-option label="中高层" value="zhonggaoceng"></el-option>
                                    <el-option label="低层" value="diceng"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用途：" prop="useType">
                                <el-select v-model="ruleFormLd.useType" placeholder="请选择用途类型">
                                    <el-option label="住宅用途" value="zhuzhai"></el-option>
                                    <el-option label="商业用途" value="shangye"></el-option>
                                    <el-option label="工业用途" value="gongye"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="朝向：" prop="toward">
                                <el-select v-model="ruleFormLd.toward" placeholder="请选择朝向">
                                    <el-option label="东方" value="east"></el-option>
                                    <el-option label="西方" value="weast"></el-option>
                                    <el-option label="南方" value="south"></el-option>
                                    <el-option label="北方" value="north"></el-option>
                                    <el-option label="东北方" value="northeast"></el-option>
                                    <el-option label="东南方" value="southeast"></el-option>
                                    <el-option label="西北方" value="northweast"></el-option>
                                    <el-option label="西南方" value="southweast"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态：" prop="status">
                                <el-select v-model="ruleFormLd.status" placeholder="请选择状态">
                                    <el-option label="出租" value="zhuzhai"></el-option>
                                    <el-option label="空置" value="shangye"></el-option>
                                    <el-option label="保留" value="gongye"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="街道：" prop="street">
                                <el-input v-model="ruleFormLd.street"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="desc">
                                <el-input type="textarea" v-model="ruleFormLd.desc"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleFormLd')">立即创建</el-button>
                                <el-button @click="resetForm('ruleFormLd')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="房间" name="fj">房间</el-tab-pane>
                <el-tab-pane label="广告位" name="ggw">广告位</el-tab-pane>
                <el-tab-pane label="展台" name="zt">展台</el-tab-pane>
                <el-tab-pane label="人才公寓" name="rcgy">人才公寓</el-tab-pane>
                <el-tab-pane label="商铺" name="sp">商铺</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'asset-manag',
        props: {},
        components: {},
        data() {
            return {
                msg: '资产管理',
                assetType: 'dc',

                /**
                 * 发布页面数据------开始
                 * */
                ruleFormDc: {
                    id: '',
                    assetName: '',
                    buildingId: '',
                    storey: '',
                    roomNumber: '',
                    roomType: '',
                    StructureArea: '',
                    useableArea: '',
                    roomStatus: ''
                },
                rulesDc: {
                    id: [
                        {required: true, message: '请输入资产编号', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    assetName: [
                        {required: true, message: '请输入资产名称', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    buildingId: [
                        {required: true, message: '请输入楼宇编号', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    storey: [
                        {required: true, message: '请输入楼层数', trigger: 'blur'},
                        // {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    roomNumber: [
                        {required: true, message: '请输入楼层数', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    roomType: [
                        {required: true, message: '请选择房间类型', trigger: 'change'}
                    ],
                    StructureArea: [
                        {required: true, message: '请输入建筑面积', trigger: 'change'}
                    ],
                    useableArea: [
                        {required: true, message: '请输入使用面积', trigger: 'change'}
                    ],
                    roomStatus: [
                        {required: true, message: '请选择房间状态', trigger: 'change'}
                    ]
                },
                /**
                 * 发布页面数据------结束
                 * */

                /**
                 * 列表页面数据------开始
                 * */
                tableData: [],

                // 提示框
                dialogVisible: false,
                deleteId: '',

                // 分页
                pageNum: 1,
                pageSize: 2,
                total: 0,
                /**
                 * 列表页面数据------结束
                 * */

                // 楼栋
                ruleFormLd: {
                    buildingId: '',
                    buildingName: '',
                    buildingSerial: '',
                    floorsNumber: '',
                    floorsType: '',
                    useType: '',
                    toward: '',
                    street: '',
                    status: '',
                    desc: ''
                },
                rulesLd: {
                    buildingId: [
                        {required: true, message: '请输入楼栋编号', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    buildingName: [
                        {required: true, message: '请输入楼栋名称', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    buildingSerial: [
                        {required: true, message: '请输入楼栋序号', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    floorsNumber: [
                        {required: true, message: '请输入楼层数', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    floorsType: [
                        {required: true, message: '请选择楼层类型', trigger: 'change'},
                    ],
                    useType: [
                        {required: true, message: '请选择用途', trigger: 'change'},
                    ],
                    toward: [
                        {required: true, message: '请选择朝向', trigger: 'change'},
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change'},
                    ],
                    street: [
                        {required: true, message: '请输入街道', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],


                },
            }
        },
        methods: {
            handleClick(tab, event) {
                switch (tab.index) {
                    case '0':
                        this.resetForm('ruleFormDc');
                        break;
                    case '1':
                        this.resetForm('ruleFormLd');
                        break;
                    default:
                        break;
                }
            },

            /**
             *
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post("/parkAsset/updateAssetHouse",
                            this.ruleFormDc
                        ).then(
                            response => {
                                // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                                    alert(response.resultMsg);
                                    // this.$refs[formName].resetFields();
                                    // this.activeName = "second";
                                    // this.getFollowInfoData(this.custInfoData.parkId, this.custInfoData.customerNumber, this.pageNum);
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

            // 获取房产列表数据
            getHouseInfoData(id, pageNum) {
                this.$post("/parkAsset/getAssetHouse", {
                    id: id,
                    pageNum: pageNum,
                    pageSize: this.pageSize
                }).then(
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
            init(){
                this.getHouseInfoData('11111111111111', 1);
            }
        },
        created(){
            this.init();
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .essp-pro-am-wrap {
    }
</style>
