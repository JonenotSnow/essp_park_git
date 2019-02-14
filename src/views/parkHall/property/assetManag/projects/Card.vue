<template>
    <div class="essp-am-projects-comp_card">
        <el-card class="box-card" v-for="(projectItem, index) in projectsList" :key="index">
            <div slot="header" class="clearfix" @click="manager(projectItem.id)" style="cursor: pointer;">
                <span>{{projectItem.name}}</span>
            </div>
            <div>
                <div class="image"  @click="manager(projectItem.id)">
                    <img :src="projectItem.imageUrl?projectItem.imageUrl:noImgUrl">
                </div>
                <div class="detail">
                    <p>楼宇总数：<span>{{projectItem.totalBuilding || '0'}}栋</span></p>
                    <p>建筑总面积：<span>{{projectItem.area
                    || '0'}}平方米</span></p>
                    <p>房间：共{{projectItem.totalRoom || '0'}}套，剩余{{projectItem.freeRoom || '0'}}套</p>
                    <!-- <p>工位：共{{projectItem.workSpaceTotal}}个，剩余{{projectItem.workSpaceLeft}}个</p> -->
                    <p class="operator">
                        <span><i class="el-icon-setting"  @click="manager(projectItem.id)">管理楼宇</i></span>
                        <span><i class="el-icon-edit" @click.prevent="update(projectItem)">编辑</i></span>
                        <span><i class="el-icon-delete" @click="deleteId(projectItem.id)">删除</i></span>
                    </p>
                </div>
            </div>

        </el-card>

    </div>
</template>

<script>
export default {
  name: "projects-list-card",
  props: {
    projectsList: {
      type: Array,
      default: []
    }
  },
  components: {},
  data() {
    return {
      msg: "projects-list-card",
      noImgUrl:
        require('./projectsPic.jpg')
    };
  },
  methods: {
    /**
     * 编辑事件
     */
    update(projectItem) {
      this.$confirm("是否编辑?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$emit("tip-event", { type: 2, item: projectItem });
      });
    },

    /**
     * 删除相关事件
     */
    deleteId(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post(this.$apiUrl.building.delProjectById, {
          parkId: this.parkId,
          id: id
        }).then(
          response => {
            if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
              this.$message.success("删除成功");
              this.$emit("tip-event", { type: 1 });
            }
          },
          err => {}
        );
      });
    },
    manager(id) {
      this.$router.push({
        path: "/parkHall/merchants/assetManag/louDong",
        query: {
          id: id
        }
      });
    },
    hairDelete() {
      this.$post("/parkAsset/deleteAssetHouse", {
        parkId: this.parkId,
        id: this.deleteId
      }).then(
        response => {
          if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
            this.dialogVisible = false;
            // this.$message(response.resultMsg);
            this.$message.success("删除成功");
            this.getFjInfoData(this.pageNumber);
            // this.handleCurrentChange(this.pageNumber);
          }
        },
        err => {}
      );
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.essp-am-projects-comp_card {
  .box-card {
    display: inline-block;
    margin-top: 10px;
    margin-left: 10px;
    width: 48%;
    .el-card__header {
    }
    .el-card__body {
      padding: 10px;
      .image {
        display: inline-block;
        width: 180px;
        height: 120px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .detail {
        display: inline-block;
        margin-left: 10px;
        p {
          margin-bottom: 15px;
        }
        .operator {
          span {
            margin-right: 10px;
            padding: 3px 5px;
            color: #333;
            border: 1px solid #999;
          }
          span:hover {
            color: #ff0000;
            border: 1px solid #ff0000;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
