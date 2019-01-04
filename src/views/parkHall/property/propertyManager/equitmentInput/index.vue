<template>   
<el-dialog :visible.sync="addType"  :before-close='beforeClose' width='1000px'  @close="$emit('update:show', false)" :show='show'>

    <div class="el-main" id="baseInfo">
        <div class="baseInfo">
            <p>设备信息录入</p>
            <el-form  label-width="120px" :model="equipment">
              <el-form-item label="设备名称：">
                <el-input v-model="equipment.equipmentName" placeholder="请输入设备名称" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="设备编码：">
                <el-input v-model="equipment.equipmentCode" placeholder="请输入设备编码" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="设备类型：">
                <el-input v-model="equipment.equipmentType" placeholder="请输入设备类型" maxlength="3"></el-input>
              </el-form-item>
              <el-form-item label="设备状态：">
                <el-select v-model="equipment.equipmentStatus" placeholder="请选择" >
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
              </el-form-item>
              <el-form-item label="规格型号：">
                <el-input v-model="equipment.specifications" placeholder="请输入型号" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="安装地点：" >
                <el-input v-model="equipment.installAddress" placeholder="请输入安装地点" maxlength="33"></el-input>
              </el-form-item>
              <el-form-item label="设备材质：">
                <el-input v-model="equipment.meterial" placeholder="请输入材质" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item label="设备重量：">
                <el-input v-model="equipment.weight" type="number" placeholder="请输入重量 /kg"></el-input>
              </el-form-item>
              <el-form-item label="安装日期：">
                <el-date-picker v-model="equipment.installTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            
              </el-form-item>
              <el-form-item label="报废日期：">
                 <el-date-picker v-model="equipment.scrapTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              
              </el-form-item>
              <el-form-item label="使用年限：">
                <el-input v-model="equipment.durableYears" type="Number" placeholder="请输入使用年限 /年"></el-input>
              </el-form-item>
              <el-form-item label="登记人："  placeholder="请输入登记人">
                <el-input v-model="equipment.registrar" maxlength="33"></el-input>
              </el-form-item>
            </el-form>
            <!-- <ul >
                
                <li>
                    <span><em>*</em>设备名称：</span>
                     <input v-model="equipment.equipmentName">
                </li>
                <li>
                    <span><em>*</em>设备编码：</span>
                    <input v-model="equipment.equipmentCode">
                </li>
                <li>
                    <span><em>*</em>设备类型：</span>
                    <input v-model="equipment.equipmentType">
                </li>
                <li>
                    <span><em>*</em>设备状态：</span>
                     <el-select v-model="equipment.equipmentStatus" placeholder="请选择" >
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                </li>
                <li>
                    <span><em>*</em>规格型号：</span>
                    <input v-model="equipment.specifications">
                </li>
                <li>
                    <span><em>*</em>安装地点：</span>
                    <input v-model="equipment.installAddress">
                </li>
                <li>
                    <span><em>*</em>设备材质：</span>
                    <input v-model="equipment.meterial">
                </li>
                <li>
                    <span><em>*</em>设备重量：</span>
                    <input v-model="equipment.weight">
                </li>
                <li>
                    <span><em>*</em>安装日期：</span>
                    <el-date-picker v-model="equipment.installTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </li>
                <li>
                    <span><em>*</em>报废日期：</span>
                    <el-date-picker v-model="equipment.scrapTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              
                </li>
                <li>
                    <span><em>*</em>使用年限：</span>
                    <input v-model="equipment.durableYears">
                </li>
                
                <li>
                    <span><em>*</em>登记人：</span>
                    <input v-model="equipment.registrar">
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
    }
  },
  data() {
    return {
      options: [
        {
          label: "正常",
          value: "0"
        },
        {
          label: "保养",
          value: "1"
        },
        {
          label: "报废",
          value: "2"
        }
      ],
      value1: "",
      startDate: "",
      equipment: {
        equipmentNumber: "",
        equipmentName: "",
        equipmentCode: "",
        equipmentType: "",
        equipmentStatus: "",
        specifications: "",
        installAddress: "",
        meterial: "",
        weight: "",
        installTime: "",
        scrapTime: "",
        durableYears: "",
        registerTime: "",
        registrar: "",
        parkId: sessionStorage.getItem("parkId") || ""
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
      if (!this.equipment.equipmentCode) {
        this.$message({
          message: "设备编码不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.equipmentName) {
        this.$message({
          message: "设备名称不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.equipmentStatus) {
        this.$message({
          message: "设备状态不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.specifications) {
        this.$message({
          message: "型号规格不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.installAddress) {
        this.$message({
          message: "安装地点不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.meterial) {
        this.$message({
          message: "设备材质不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.installTime) {
        this.$message({
          message: "安装日期不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.scrapTime) {
        this.$message({
          message: "报废日期不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.equipment.registrar) {
        this.$message({
          message: "登记人不能为空",
          type: "warning"
        });
        return;
      }
      let currentEquipment = Object.assign(
        {},
        {
          installTime: new Date(this.equipment.installTime),
          scrapTime: new Date(this.equipment.scrapTime)
        },
        this.equipment
      );
      this.$post(this.$apiUrl.property.addEquipmentInfo, currentEquipment).then(
        response => {
          this.$message({
            type: "success",
            message: '新增成功！'
          });
          this.$emit("tip-event");
          this.$emit("update:show", false);
          
        }
      );
    }
  },
  watch: {
    show() {
      this.addType = this.show;
      Object.assign(this.equipment, {
        equipmentNumber: "",
        equipmentName: "",
        equipmentCode: "",
        equipmentType: "",
        equipmentStatus: "",
        specifications: "",
        installAddress: "",
        meterial: "",
        weight: "",
        installTime: "",
        scrapTime: "",
        durableYears: "",
        registerTime: "",
        registrar: ""
      });
    }
  }
};
</script>
<style>

</style>

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
