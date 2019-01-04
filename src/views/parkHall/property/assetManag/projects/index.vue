<template>
    <div class="essp-am-projects-wrap">
        <div class="am-projects-list_page">
            <div class="am-projects-head">
                <div class="am-projects-head-bread-crumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/parkHall/manage/baseInfo' }">园区管理</el-breadcrumb-item>
                        <el-breadcrumb-item>楼宇项目</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="am-projects-head-add">
                    <el-button type="primary" @click="btnAdd">新增项目</el-button>
                </div>

            </div>
            <div class="am-projects-content">
                <card class="am-projects-content-card" :projectsList="listData" @tip-event="tipEvent"></card>

                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible_delete"
                    width="30%"
                    center>
                    <p style="margin-top:10px;text-align: center">确定删除该条跟踪信息？</p>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="hairDelete()">确 定</el-button>
                  </span>
                </el-dialog>
            </div>
            <!-- <div class="pageList" v-if="totalCount>10" >
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNumber"
                            :page-size="10"
                            layout="total, prev, pager, next, jumper"
                            :total="totalCount">
                        </el-pagination>
                 </div> -->
        </div>

        <div class="am-projects-publish_page">
            <!--<form></form>-->
            <el-dialog :title="tietle" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <!-- <el-form-item label="所属园区：" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="00"></el-option>
                            <el-option label="区域二" value="01"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="项目名称：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目简称：" :label-width="formLabelWidth" prop="shortName">
                        <el-input v-model.trim="form.shortName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="房源类型：" :label-width="formLabelWidth" prop="projectType">
                        <el-select v-model="form.projectType" placeholder="请选择活动区域">
                            <el-option label="现房" value="00"></el-option>
                            <el-option label="期房" value="01"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业主：" :label-width="formLabelWidth" prop="owner">
                        <el-input v-model.trim="form.owner" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物业公司：" :label-width="formLabelWidth" prop="propertyComyany">
                        <el-input v-model.trim="form.propertyComyany" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物业地址：" :label-width="formLabelWidth" prop="propertyAddr">
                        <el-input v-model.trim="form.propertyAddr" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="总面积：" :label-width="formLabelWidth" prop="area">
                        <el-input v-model="form.area" type="number" autocomplete="off" placeholder="平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="实际面积：" :label-width="formLabelWidth" prop="countArea">
                        <el-input v-model="form.countArea" type="number" autocomplete="off"
                                  placeholder="平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="图片上传：" :label-width="formLabelWidth">
                        <el-upload
                            class="upload-demo"
                            multiple
                            :limit="3"
                            :before-upload="beforeAvatarUploadFile"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addProject('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Card from "./Card";

    export default {
        name: "vue-temp",
        props: {},
        components: {
            Card
        },
        data() {
            return {
                msg: "全部项目",
                listData: [],
                parkId: sessionStorage.getItem("parkId"),

                // 删除对话框
                dialogVisible_delete: false,

                // 新增项目页面字段
                dialogFormVisible: false,
                form: {
                    id: "",
                    name: "",
                    region: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: "",
                    parkId: sessionStorage.getItem("parkId")
                },
                formLabelWidth: "120px",
                totalCount: 0,
                // 附件上传
                fileList: [],
                rules: {
                    name: [
                        {required: true, message: "请输入项目名称", trigger: "blur"},
                        {min: 1, max: 32, message: "长度在1到32个字", trigger: "blur"}
                    ],
                    shortName: [
                        {required: true, message: "请输入项目简介", trigger: "blur"},
                        {min: 1, max: 32, message: "长度在1到32个字", trigger: "blur"}
                    ],
                    region: [{required: true, message: "请选择房源", trigger: "blur"}],
                    propertyComyany: [
                        {required: true, message: "请填写物业公司", trigger: "blur"},
                        {min: 1, max: 32, message: "长度在1到32个字", trigger: "blur"}
                    ],
                    propertyAddr: [
                        {required: true, message: "请填写物业公司", trigger: "blur"},
                        {min: 1, max: 32, message: "长度在1到32个字", trigger: "blur"}
                    ],
                    area: [
                        {required: true, message: "请填写总面积", trigger: "blur"},
                        {min: 1, max: 32, message: "长度在1到32个字", trigger: "blur"}
                    ],
                    countArea: [
                        {required: true, message: "请填写实际面积", trigger: "blur"},
                        {min: 1, max: 32, message: "长度在1到32个字", trigger: "blur"}
                    ],
                    owner: [
                        {required: true, message: "请填写业主", trigger: "blur"},
                        {min: 1, max: 32, message: "长度在1到32个字", trigger: "blur"}
                    ]
                }
            };
        },
        methods: {
            /**
             * 附件上传相关事件
             */
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            tipEvent(obj) {
                console.log(obj.type);
                if (obj.type === 1) {
                } else if (obj.type === 2) {
                    this.update(obj.item);
                }
                this.getList();
            },
            update(item) {
                this.dialogFormVisible = true;
                this.form = item;
                if (!item.imageUrl) {
                    return false;
                }
                this.fileList = [];
                this.fileList.push({
                    name: item.imageUrl.match(/.*\/(.*)/)[1],
                    url: item.imageUrl
                });
                //   console.log(item)
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`).then(res => {
                    this.getList();
                });
            },
            beforeAvatarUploadFile(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' ;
                const isLt2M = file.size / 1024 / 1024 < 2;
                console.log(isJPG)
                if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                return false
                }
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return false
                }

                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "attachment"); // 通过append向form对象添加数据
                this.$post(this.$apiUrl.upload.upload, param).then(response => {
                    this.fileList = [];
                    var obj = {
                        name: file.name,
                        url: response.resultData[0].url
                    };
                    this.form.imageUrl = response.resultData[0].url;
                    this.fileList.push(obj);
                });
                return false; // 返回false不会自动上传
            },
            btnAdd() {
                this.dialogFormVisible = true;
                this.form = {};
                this.fileList = [];
            },
            addProject(form) {
                this.$refs[form].validate(valid => {
                    if(this.form.countArea<1) {
                        return this.$message('实际面积需大于0!')
                    }
                    if(this.form.area<1) {
                        return this.$message('总面积需大于0!')
                    }
                    if (valid) {
                        let form = Object.assign({}, {parkId: this.parkId}, this.form);
                        this.$post(this.$apiUrl.building.addProject, form).then(
                            response => {
                                if (response.resultCode === "CLT000000000") {
                                    if (this.form.id) {
                                        this.$message.success("修改项目成功！");
                                    } else {
                                        this.$message.success("创建项目成功！");
                                    }
                                    this.dialogFormVisible = false;
                                    this.getList();
                                }
                            },
                            err => {
                            }
                        );
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            getList() {
                this.$post(this.$apiUrl.building.getProjects, {
                    parkId: this.parkId
                }).then(res => {
                    if (res.resultCode === "CLT000000000") {
                        this.listData = [];
                        res.resultData.forEach(item => {
                            this.listData.push(item);
                        });
                    }
                });
            }
        },
        created() {
            this.getList();
        },
        mounted() {
        },
        computed: {
            tietle: function () {
                return this.form.id ? "编辑楼宇项目" : "创建楼宇项目";
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.essp-am-projects-wrap {
  /*列表页面*/
  .am-projects-list_page {
    .am-projects-head {
      position: relative;
      height: 60px;
      border-bottom: 1px solid #ccc;
      .am-projects-head-bread-crumb {
        position: absolute;
        top: 10px;
        left: 10px;
        .el-breadcrumb__item {
          line-height: 40px;
        }
      }
      .am-projects-head-add {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    .am-projects-content {
      .am-projects-content-card {
        .el-card__header {
          div {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }

  /*新增页面*/
  .am-projects-publish_page {
    .el-dialog {
      margin: 5% auto 0 !important;
      height: 80%;
      overflow: hidden;
    }
    .el-dialog__body {
      height: 74%;
      overflow: auto;
      padding: 0 20px;
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
        .el-form-item__content {
          .el-select {
            width: 100%;
          }
          .el-input,
          .el-textarea {
            width: 90%;
          }

          .upload-demo {
            width: 90%;
            .el-upload el-upload--text {
              display: inline-block;
            }
            // .el-upload__tip {
            //   margin-left: 20px;
            //   display: inline-block;
            .el-dialog__body {
              height: 75%;
              overflow: auto;
              padding: 0 20px;
            }
          }
        }
      }
    }
  }
}
</style>
