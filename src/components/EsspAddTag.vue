<template>
  <div class="esspclearfix">
    <span v-if="this.showtags.length > 0"
          class="tagsspanbox">
      <el-tag class="it_tag"
              v-for="(items,index) in showtags"
              closable
              :disable-transitions="false"
              @close="handleClose(items)"
              :key="index">{{items}}</el-tag>
    </span>
    <el-button class="button-new-tag"
               size="small"
               @click="showTagWin()">
               <label class="label-color">+ </label>添加标签</el-button>
  </div>
</template>

<script>
export default {
  props: {
    showtags: {
      type: Array,
      required: true
    },
    tagprops: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    showTagWin() {
    	// -打开新增标签页面
      this.$emit("showTagWin");
    },
    handleClose(tag) {
    	// -删除标签
    	this.$emit('delTag',tag);
    },
    saveTags() {
      return this.$post(this.$apiUrl.common.saveEntityTag, {
        entId: this.tagprops.entId,
        entTp: this.tagprops.entTp,
        lblTxtList: this.showtags.join(",")
      });
    },
    findEntityTag() {
    	let tmpTags = [];
      //获取实体对应标签
      let vm = this;
      if (this.tagprops.entId != "") {
        this.$post(this.$apiUrl.common.findEntityTag, {
          entId: this.tagprops.entId
        }).then(response => {
          if (
            (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") &&
            response.resultData["lblInfo"]
          ) {
            let lblInfo = response.resultData.lblInfo;
            for(let i=0; i<lblInfo.length; i++){
            	tmpTags.push(lblInfo[i].lblTxt);
            }
            vm.$emit("initTag",tmpTags)
          }
        });
      }
    }
  },
  created() {
    this.findEntityTag();
  },
  watch: {
    "tagprops.entId": {
      handler(newValue, oldValue) {
        this.findEntityTag();
      },
    }
  }
};
</script>
<style lang='less'>
    .el-button--small, .el-button--small.is-round{
        margin-right: 5px;
        margin-top: 5px;
    }
</style>
<style lang='less' scoped>
@import "../assets/css/mixin";

//标签部分
.tagsspanbox {
  float: left;
  .it_tag {
    float: left;
    margin-right: 5px;
    margin-top: 5px;
  }
}

.tagitem {
  margin: 0px 20px 10px 0px;
  color: #00a0e9;
  background-color: #fff;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #00a0e9;
  }
  .eleicon {
    margin-right: 2px;
  }

  .button-new-tag {
    margin-top: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    
  }
}
.label-color{
      color:#00a0e9
    }
</style>
