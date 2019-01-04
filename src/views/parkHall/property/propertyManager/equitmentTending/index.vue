<template>
<el-dialog :visible.sync="addType"  :before-close='beforeClose' width='1000px'  @close="$emit('update:show', false)" :show='show'>

    <div class="el-main" id="baseInfo">
        <div class="baseInfo">
            <p>维护保养计划</p>
            <el-form  label-width="120px" :model="equipment">
              <el-form-item label="计划开始时间：">
              <el-date-picker v-model="equipment.planStartTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
               </el-form-item>
              <el-form-item label="计划结束时间：">
                <el-date-picker v-model="equipment.planEndTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
               </el-form-item>
              <el-form-item label="制定人：">
                <el-input v-model="equipment.customName" placeholder="请输入制定人" maxlength="16"></el-input>
              </el-form-item>
             
              <el-form-item label="保养项目：">
                <el-input v-model="equipment.upkeepItem" placeholder="请输入保养项目" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="设备编号：" >
                <el-input v-model="equipment.equipmentNumber" :disabled='true' placeholder="请输入设备编号" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="设备名称：">
                <el-input v-model="equipment.equipmentName" :disabled='true' placeholder="请输入设备名称" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="计划状态：">
                <el-input v-model="equipment.planStatus"  placeholder="请输入计划状态" maxlength="3"></el-input>
              </el-form-item>
              
            </el-form>
            <!-- <ul >
                <li>
                    <span><em>*</em>计划开始时间：</span>
                     <el-date-picker v-model="equipment.planStartTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              
                     
                </li>
                <li>
                    <span><em>*</em>计划结束时间：</span>
                    <el-date-picker v-model="equipment.planEndTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              
                </li>
                <li>
                    <span><em>*</em>制定人：</span>
                    <input v-model="equipment.customName">
                </li>

                <li>
                    <span><em>*</em>保养项目：</span>
                    <input v-model="equipment.upkeepItem">
                </li>
                <li>
                    <span><em>*</em>设备编号：</span>
                    <input v-model="equipment.equipmentNumber" disabled=false>
                </li>
                <li>
                    <span><em>*</em>设备名称：</span>
                    <input v-model="equipment.equipmentName" disabled=false>
                </li>
                <li>
                    <span><em>*</em>计划状态：</span>
                    <input v-model="equipment.planStatus">
                </li>
                
               
                
            </ul> -->
        </div>

        <p class="save">
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
    },
    equipmentTending: {
      type: Object
    }
  },
  data() {
    return {
      value1: "",
      startDate: "",
      equipment: {
        planNumber: "",
        planStartTime: "",
        planEndTime: "",
        customName: "",
        customTime: "",
        upkeepItem: "",
        planStatus: "",
        equipmentNumber: "",
        equipmentName: "",

        parkId: sessionStorage.getItem("parkId") || ""
      },
      flagChange: false,
      addType: this.show
    };
  },
  beforeUpdate() {},
  methods: {
    add() {
      this.addType = true;
    },
    beforeClose() {
      this.addType = !this.addType;
    },

    saveBaseInfo() {
      if (!this.equipment.planStartTime) {
        this.$message({
          message: "开始时间不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.planEndTime) {
        this.$message({
          message: "结束时间不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.customName) {
        this.$message({
          message: "制定人不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.upkeepItem) {
        this.$message({
          message: "保养项目不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.planStatus) {
        this.$message({
          message: "计划状态不能为空",
          type: "warning"
        });
        return;
      }
      let currentEquipment = Object.assign(
        {},
        {
          planStartTime: new Date(this.equipment.planStartTime),
          planEndTime: new Date(this.equipment.planEndTime)
        },
        this.equipment,
        { parkId: sessionStorage.getItem("parkId") }
      );
      this.$post(this.$apiUrl.property.addUpkeepPlan, currentEquipment).then(
        response => {
          this.$message({
            type: "success",
            message: response.resultMsg
          });
          // this.addType=false
          this.$emit("update:show", false);
        }
      );
    }
  },
  watch: {
    show() {
      this.addType = this.show;

      Object.assign(this.equipment, this.equipmentTending, {
        planNumber: "",
        planStartTime: "",
        planEndTime: "",
        customName: "",
        customTime: "",
        upkeepItem: "",
        planStatus: ""
      });
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
