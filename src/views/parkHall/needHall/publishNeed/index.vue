<template>
  <div class="wrapper">
    <essp-bread-crumb :breadList="list"></essp-bread-crumb>
    <div class="content">
      <div class="title">
        <span></span>
        <label>需求发布</label>
        <span></span>
      </div>
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="需求标题" prop="title">
          <el-col :span="12">
            <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="需求详情" required>

          <div class="wrap" >
                      <quillEditor :options="editorOption" v-model="form.detail"></quillEditor>
          </div>

        </el-form-item>
        <el-form-item label="发布人" required>
          <el-col :span="12">
            <el-input v-model="form.people" disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="#"
            :before-upload="beforeAvatarUploadFile"
            multiple
            :limit="1"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">附件上传</el-button>
            <div slot="tip" class="el-upload__tip">（科技服支持pdf/word/excel等类型文件，大小10M内）</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="normal" plain>预览</el-button>
        </el-form-item>

        <div class="btn-sure" @click="saveNeed">创建</div>
      </el-form>
    </div>
  </div>
</template>
<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import mixin from '@/components/mixins/mixins_windowOpen.js'
export default {
  mixins:[mixin],
  components: {
    EsspBreadCrumb,
    quillEditor
  },
  data() {
    return {
      list: [
        {
          path: "/needHall",
          name: "需求大厅"
        },
        {
          path: "",
          name: "发布需求"
        }
      ],
      form: {
        title: "",
        detail: "",
        people: "",
        cstId:'',
        cstName:''
      },
      fileList: [],
      editorOption: {
        placeholder: "请输入模板内容",
        theme: "snow"
      },
      rules: {
        title: [
          { required: true, message: "请输入需求标题", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        detail: [
          { required: true, message: "请输入需求详情", trigger: "blur" },
          { min: 1,max:1000, message: "长度在 1 到 1000 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    beforeAvatarUploadFile(file) {
      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据

      param.append("type", "park"); // 通过append向form对象添加数据
      param.append("model", "fj"); // 通过append向form对象添加数据
      console.log("上传文件格式：", file.type);
      var flieName = file.name;
      var fileType = flieName
        .substring(flieName.lastIndexOf(".") + 1)
        .toLowerCase();
      console.log(fileType);
      const isFile =
        fileType === "pdf" ||
        fileType === "word" ||
        fileType === "excel" ||
        fileType === "xlsx" ||
        fileType === "xls" ||
        fileType === "docx";
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isFile) {
        this.$message.error(
          "上传附件只能上传pdf/word/excel格式文件"
        );
        return isFile;
      }

      if (!isLt10M) {
        this.$message.error("附件总共不能超过10MB!");
        return isLt10M;
      }
      this.$post(this.$apiUrl.upload.upload, param).then(response => {
        var obj = {
          name: file.name,
          url: response.resultData[0].url
        };
        this.fileList=[]
        this.fileList.push(obj);
      });
      return false; // 返回false不会自动上传
    },
    saveNeed() {
      let that = this;
      this.$refs["form"].validate(vaild => {
        if (vaild) {
          if (that.fileList[0] && that.fileList[0].url) {
            that.form.accessory = that.fileList[0].url;
          }
          if(!that.form.detail){
               return that.$message("请填写需求内容!");
          }
          let params = Object.assign({parkId:sessionStorage.getItem('parkId')}, that.form);
          that.$post("/need/saveNeed", params).then(res => {
            if (res.resultCode === "CLT000000000") {
              that.$message.success("发布成功!");
              // this.$router.push('/needHall')
              let token = this.SSH.getItem('token')
              token?'&token='+token:''
              this.windowOpenUrl('requIndex/display-own?bsnRqmId='+res.resultData.id+token)
            } else {
              that.$message.warning("发布失败");
            }
          });
        }
      });
    }
  },
  created() {
    let userInfo =this.SSH.getItem("userInfo")
    this.form.people = userInfo.truename;
    this.form.cstId = userInfo.cstId
    this.form.cstNm = userInfo.cstNm
  }
};
</script>
<style lang="less" scoped>
.btn-sure {
  width: 200px;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%),
    linear-gradient(#00a0e9, #00a0e9);
  border-radius: 5px;
  font-size: 16px;
  letter-spacing: 10px;
  color: #ffffff;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
.el-upload__tip {
  display: inline-block;
}
.el-form {
  width: 980px;
  margin: 0 auto;
}
.wrapper {
  width: 1200px;
  margin: 10px auto 20px;
}
.content {
  width: 1200px;
  min-height: 685px;
  background-color: #ffffff;
  .title {
    font-size: 24px;
    line-height: 90px;
    color: #333333;
    text-align: center;
    position: relative;
    width: 300px;
    margin: 0 auto;
    span {
      position: relative;
      width: 66px;
      display: inline-block;
      &:before {
        content: "  ";
        position: absolute;
        width: 66px;
        height: 1px;
        background-color: #cccccc;
        top: -8px;
        left: 0;
      }
    }
  }
}
    //编辑器样式
    .wrap {
        width: 850px;
        height: 600px;
        // margin: 0 0 20px;
        .quill-editor {
            height: 400px;
        }
    }
</style>

