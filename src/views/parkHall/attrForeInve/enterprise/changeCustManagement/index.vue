<template> 
<el-dialog :visible.sync="addType"  :before-close='beforeClose' width='1000px'  @close="$emit('update:show', false)" :show='show'>
             
    <div class="el-main" id="baseInfo">
        <div class="baseInfo">
            <p>客户填表</p>
            <el-form  label-width="120px" :model="custom">
              
              <el-form-item label="企业名称：">
                <el-input v-model="custom.customerName" placeholder="请输入企业名称" maxlength="50"></el-input>
              </el-form-item>
             
              <el-form-item label="联系人：">
                <el-input  v-model="custom.contactName" placeholder="请输入联系人" maxlength="10"></el-input>
              </el-form-item>
 
              <el-form-item label="联系电话：">
                <el-input v-model="custom.contactPhone" type="number" placeholder="请输入手机号码" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="规模：">
                <el-input v-model="custom.enterpriceScale" type="number" placeholder="请输入人数" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="营业项目：">
                <el-input v-model="custom.mainBusiness" placeholder="请输入营业项目" maxlength="33"></el-input>
              </el-form-item>
              <el-form-item label="所属行业：">
                <el-input v-model="custom.industry" placeholder="请输入所属行业" maxlength="33"></el-input>
              </el-form-item>
              <el-form-item label="营业范围：">
                <el-input v-model="custom.businessScope" placeholder="请输入营业范围" maxlength="33"></el-input>
              </el-form-item>
            </el-form>
            
        </div>
        <p class="save hf" v-if='flagChange'>
            <span @click="fz">修改</span>
            <span @click="saveBaseInfo">提交</span>
        </p>
        <p class="save" v-else>
            <span @click="saveBaseInfo">提交</span>
        </p>
    </div>  
    </el-dialog>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  components: {
    VDistpicker
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value1: "",
      startDate: "",
      custom: {
        customerName: "",
        contactName: "",
        contactPhone: "",
        businessScope: "",
        establlishDate: "",
        industry: "",
        mainBusiness: "",
        parkId: sessionStorage.getItem("parkId") || "123"
      },
      flagChange: false,
      addType: this.show
    };
  },
  created() {},
  methods: {
    add() {
      this.addType = true;
    },
    beforeClose() {
      this.addType = !this.addType;
    },

    saveBaseInfo() {
      //   if (!this.startDate) {
      //     this.$message({
      //       message: "园区成立时间不能为空",
      //       type: "warning"
      //     });
      //     return;
      //   }
      if (!this.custom.contactPhone) {
        this.$message({
          message: "联系电话不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.custom.contactName) {
        this.$message({
          message: "联系人不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.custom.customerName) {
        this.$message({
          message: "企业名称不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.custom.businessScope) {
        this.$message({
          message: "营业范围不能为空",
          type: "warning"
        });
        return;
      }

      this.$post(
        this.$apiUrl.businessManager.updateOpportunityCustomer,
        this.custom
      ).then(response => {
        this.$message({
          type: "success",
          message: response.resultMsg
        });
        // this.addType=false
        this.$emit('tip-event')
        this.$emit("update:show", false);
        
      });
    }
  },
  watch: {
    show() {
      this.addType = this.show;
    }
  }
};
</script>


<style lang='less' scoped>
.el-main {
  margin-left: 10px;
  width: 990px;
  background: #fff;
  min-height: 455px;
  padding: 0;
  .baseInfo {
    width: 900px;
    & > p {
      font-size: 24px;
      line-height: 30px;
      margin: 42px 0 50px 40px;
      color: #333;
      border-left: 10px solid #10b5ff;
      text-indent: 22px;
    }
    & > ul {
      width: 800px;
      height: auto;
      margin: 0 auto;
      li {
        overflow: hidden;
        line-height: 50px;
        span {
          font-size: 16px;
          font-weight: normal;
          color: #666666;
          em {
            color: #ff9900;
            margin-right: 5px;
          }
          &:nth-of-type(2) {
            position: relative;
            // left:-50px;
            font-size: 14px;
            color: #666666;
            display: inline-block;
          }
        }
        input {
          width: 210px;
          height: 35px;
          padding: 0 5px;
          border: solid 1px #ddd;
        }
        &:nth-last-of-type(2) {
          span {
            float: left;
          }
          & > div {
            margin-left: 5px;
            & > select {
              margin-top: 8px;
              &:nth-of-type(1) {
                margin-left: 3px;
              }
            }
          }
        }
        &:nth-of-type(1) {
          span {
            &:nth-of-type(2) {
              left: 0;
            }
          }
        }
        
        button {
          margin-left: 50px;
        }
      }
    }
  }
  .save {
    text-align: center;
    margin: 146px 0 70px;
    span {
      display: inline-block;
      width: 277px;
      height: 50px;
      background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%),
        linear-gradient(#00a0e9, #00a0e9);
      background-blend-mode: normal, normal;
      border-radius: 3px;
      line-height: 50px;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .hf {
    span {
      display: inline-block;
      width: 120px;
      height: 50px;
      background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%),
        linear-gradient(#00a0e9, #00a0e9);
      background-blend-mode: normal, normal;
      border-radius: 3px;
      line-height: 50px;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
