
    <template>
  <div>
    <el-dialog :visible.sync="showNeedRange" width="720px" height="400px" class="needRange" :before-close="handleClose"> 
      <p class="title">请选择需求发布范围</p>
      <div class="title-border"></div>
      <div class="select-radio">
        <el-radio-group v-model="NeedRangeRadio" size="mini">
          <el-radio label="1">建融智合平台（全国可见）</el-radio>
          <el-radio label="2">仅科技局管理员可见</el-radio>
        </el-radio-group>
      </div>

      <div class="btn-sure" @click="publishNeed">确认</div>
      <div class="title-tip">
        {{NeedRangeRadio==='1'?
        '点击确认后系统将自动跳转至建融智合需求发布页面':''}}
      </div>
    </el-dialog>
  </div>
</template>
    <script>
export default {
  props: ["showNeedRange"],
  data() {
    return {
      NeedRangeRadio: "1"
    };
  },
  methods: {
    publishNeed() {
      let isInPark = !(this.SSH.getItem("LoginUserRol").indexOf("11") > -1);
      this.$emit("update:showNeedRange", false);
      if (this.NeedRangeRadio === "2" && !isInPark) {
        return this.$message("请先入驻园区");
      }
      if (this.NeedRangeRadio === "2") {
        return this.$router.push({ path: "/publishNeed" });
      }
      let query = isInPark ? "linkSrc=" +this.SSH.getItem("parkId")  : '';
      let token = this.SSH.getItem("token");
      token = token ? "&token=" + token : "";
      window.location.href =
        this.$openUrl + "/requIndex/publish?" + query + token;
      return false;
    },
    handleClose(){
        this.$emit("update:showNeedRange", false);
    }
  }
};
</script>
    <style lang="less" scoped>
.needRange {
  border-radius: 6px;
  .title {
    text-align: center;
    font-size: 18px;
    color: #333;
    margin: 0px auto 28px;
    text-align: center;
  }
  .title-border {
    width: 620px;
    height: 2px;
    background-color: #f5f5f5;
    margin: 0 auto;
  }
  .select-radio {
    margin: 50px auto 30px;
    text-align: center;
  }
  .btn-sure {
    width: 277px;
    height: 50px;
    line-height: 50px;
    background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%),
      linear-gradient(#00a0e9, #00a0e9);
    background-blend-mode: normal, normal;
    border-radius: 3px;
    margin: 0 auto;
    text-align: center;
    vertical-align: middle;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
  }
  .title-tip {
    font-size: 18px;
    line-height: 72px;
    height: 72px;
    color: #68bff7;
    text-align: center;
  }
}
.row_width_auto {
  width: 1000px;
  margin: 0 auto;
  font-size: 16px;
}
.noData {
  float: left;
  margin-left: 90px;
  width: 430px; /*font-size: 16px;*/
}
.more {
  font-size: 14px;
  color: #999;
  margin-left: 20px;
  &:hover {
    color: #00a0e9;
  }
}
</style>
    
    