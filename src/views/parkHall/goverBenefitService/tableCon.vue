<template>
    <el-table class="tablecon"
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="80" class="resultitem"
      >
    </el-table-column>
    <el-table-column
      prop="ccname"
      label="公司名称"
      width="250" class="resultitem">
    </el-table-column>
    <el-table-column
      prop="enlistnum"
      label="报名人数"
      width="115"
      show-overflow-tooltip class="resultitem">
    </el-table-column>
     <el-table-column
      prop="concat"
      label="公司联系人"
      width="160"
      show-overflow-tooltip class="resultitem">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="联系电话"
      width="160"
      show-overflow-tooltip class="resultitem">
    </el-table-column>
    <el-table-column
      prop="process"
      label="报名状态"
      width="160"
      show-overflow-tooltip class="resultitem">
    </el-table-column>
    <el-table-column
      prop="handel"
      label="操作"
      width="160"
      show-overflow-tooltip class="resultitem">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
    data() {
      return {
        tableData3: [
            {
                id:0,
                status:true,
                ccname:"腾讯股份有限公司",
                enlistnum:22 ,
                concat:"周杰伦",
                tel:13860715111,
                process:"不通过",
                handel:"查看"
            },
            {
                id:1,
                status:false,
                ccname:"腾讯股份有限公司",
                enlistnum:22 ,
                concat:"周杰伦",
                tel:13860715111,
                process:"不通过",
                handel:"查看"
            },
            {
                id:2,
                status:true,
                ccname:"腾讯股份有限公司",
                enlistnum:22 ,
                concat:"周杰伦",
                tel:13860715111,
                process:"不通过",
                handel:"查看"
            }
        ],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.tablecon{
    width:1200px;
    margin: 0 auto;

}
</style>



