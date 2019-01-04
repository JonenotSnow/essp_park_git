<template>    
<el-dialog :visible.sync="addType"  :before-close='beforeClose' width='1000px'  @close="$emit('update:show', false)" :show='show'>

    <div class="el-main" id="baseInfo">
        <div class="baseInfo">
            <p>维修记录</p>
            <el-form  label-width="120px" :model="equipment">
              
              <el-form-item label="维修项目：">
                <el-input v-model="equipment.maintainItem" placeholder="请输入维修项目" maxlength="16"></el-input>
              </el-form-item>
             
              <el-form-item label="维修人：">
                <el-input v-model="equipment.maintainPerson" placeholder="请输入维修人" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="维修时间：" >
               <el-date-picker v-model="equipment.maintainTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
               </el-form-item>
              <el-form-item label="维修工时：">
                <el-input v-model="equipment.maintainHours" type="number"  placeholder="请输入维修工时"></el-input>
              </el-form-item>
              <el-form-item label="故障详情：">
                <el-input v-model="equipment.faultDesc"  placeholder="请输入故障详情" maxlength="33"></el-input>
              </el-form-item>
              <el-form-item label="维修情况：">
               <el-select v-model="equipment.maintainDesc" placeholder="请选择" >
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="equipment.remark"  placeholder="请输入备注" maxlength="33"></el-input>
              </el-form-item>
              <el-form-item label="设备编号：">
                <el-input v-model="equipment.equipmentNumber"  :disabled="true" placeholder="请输入设备编号"></el-input>
              </el-form-item>
              <el-form-item label="设备名称：">
                <el-input v-model="equipment.equipmentName" :disabled="true"  placeholder="请输入设备名称"></el-input>
              </el-form-item>
            </el-form>
            <!-- <ul >
                
                <li>
                    <span><em>*</em>维修项目：</span>
                     <input v-model="equipment.maintainItem">
                </li>
                <li>
                    <span><em>*</em>维修人：</span>
                    <input v-model="equipment.maintainPerson">
                </li>
                <li>
                    <span><em>*</em>维修时间：</span>
                    <el-date-picker v-model="equipment.maintainTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              
                </li>
                <li>
                    <span><em>*</em>维修工时：</span>
                    <input v-model="equipment.maintainHours">
                </li>
                <li>
                    <span><em>*</em>故障详情：</span>
                    <input v-model="equipment.faultDesc">
                </li>
                <li>
                    <span><em>*</em>维修情况：</span>
                   
                     <el-select v-model="equipment.maintainDesc" placeholder="请选择" >
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                </li>
                <li>
                    <span><em>*</em>备注：</span>
                    <input v-model="equipment.remark">
                </li>
                <li>
                    <span><em>*</em>设备编号：</span>
                    <input v-model="equipment.equipmentNumber" disabled=false>
                </li>
                <li>
                    <span><em>*</em>设备名称：</span>
                    <input v-model="equipment.equipmentName" disabled=false>
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
    equipmentInfo: {
      type: Object
    }
  },
  data() {
    return {
      options: [
        {
          label: "未维修",
          value: "1"
        },
        {
          label: "已维修",
          value: "2"
        }
      ],
      value1: "",
      startDate: "",
      equipment: {
        maintainNumber: "",
        maintainItem: "",
        maintainPerson: "",
        maintainTime: "",
        maintainHours: "",
        faultDesc: "",
        maintainDesc: "",
        remark: "",
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
      if (!this.equipment.equipmentName) {
        this.$message({
          message: "设备名称不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.equipmentNumber) {
        this.$message({
          message: "设备编号不能为空",
          type: "warning"
        });
        return;
      }

      let currentEquipment = Object.assign(
        {},
        { maintainTime: new Date(this.equipment.maintainTime) },
        this.equipment,
        { parkId: sessionStorage.getItem("parkId") }
      );

      this.$post(this.$apiUrl.property.addMaintainInfo, currentEquipment).then(
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
      Object.assign(this.equipment, this.equipmentInfo, {
        maintainNumber: "",
        maintainItem: "",
        maintainPerson: "",
        maintainTime: "",
        maintainHours: "",
        faultDesc: "",
        maintainDesc: "",
        remark: ""
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
