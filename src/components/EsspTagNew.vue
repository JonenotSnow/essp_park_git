<template>
    <div class="essp-tag">
        <div class="esspclearfix">
            <span v-if="this.entityTag.length > 0"
                  class="tagsspanbox">
                <el-tag class="it_tag"
                        v-for="(item,index) in entityTag"
                        closable
                        :disable-transitions="false"
                        @close="delet(item)"
                        :key="index">{{item}}</el-tag>
            </span>
            <el-button class="button-new-tag"
                       size="small"
                       @click="showAddTag()">+ 新标签</el-button>
        </div>
        <el-dialog :visible.sync="showAdd"
                   width="720px"
                   :before-close="closeAddTag"
                   center>
            <div class="tabletit">
                <h3>推荐标签</h3>
                <p class="title_p">请添加合适该项目的标签，可多选，同一标签不能重复</p>
            </div>

            <div class="tagstore">
                <el-button :key="index"
                           v-for="(item,index) in recomTag_show"
                           size="small"
                           @click="handleInputTag(item)">
                    {{item}}
                </el-button>
            </div>
            <div class="taginput">
                <el-tag :key="index"
                        v-for="(item,index) in entityTag"
                        closable
                        :disable-transitions="false"
                        @close="deletTag(item)">
                    {{item}}
                </el-tag>

                <el-tooltip v-if="inputVisible"
                            :disabled="isValid"
                            effect="light"
                            content="不能添加重复标签"
                            placement="top">
                    <el-input class="input-new-tag"
                              v-model="inputValue"
                              ref="saveTagInput"
                              size="small"
                              @keyup.enter.native="handleInputConfirm"
                              @blur="handleInputConfirm"
                              maxlength="20">
                    </el-input>
                </el-tooltip>

                <el-button class="button-new-tag"
                           size="small"
                           @click="showInput">+ 自定义新标签

                </el-button>
            </div>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="closeAddTag()">取 消</el-button>
                <el-button type="primary"
                           @click="addTag()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: {
    tagprops: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // -实体标签（存储标签）
      entityTag: [],
      // -推荐标签
      recomTag: [],
      // -推荐标签显示(去除已经选择的实体标签)
      recomTag_show: [],
      // -
      showAdd: false,
      // -判断自定义标签重复
      inputVisible: false,
      inputValue: "",
      isValid: true, // -提示框是否可用

      // -用户点取消或者空白处关闭，还原编辑时候数据
      entityTag_old: [],
      recomTag_old: []
    };
  },
  methods: {
    // -设置数据
    setData(list) {
      let t = [];
      for (let i = 0; i < list.length; i++) {
        t.push(list[i]);
      }
      return t;
    },

    // -自定义标签方法
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      this.isValid = true;
      if (inputValue) {
        if (this.entityTag.indexOf(inputValue) == -1) {
          this.entityTag.push(inputValue);
          this.inputVisible = false;
          this.inputValue = "";
        } else {
          this.isValid = false;
        }
        if (this.recomTag_show.indexOf(inputValue) > -1) {
          this.recomTag_show.splice(this.recomTag_show.indexOf(inputValue), 1);
        }
      } else {
        this.inputVisible = false;
        this.inputValue = "";
      }
    },
    handleInputTag(tag) {
      // -判断重复标签
      if (this.entityTag.indexOf(tag) == -1) {
        this.entityTag.push(tag);
        this.recomTag_show.splice(this.recomTag_show.indexOf(tag), 1);
      }
    },

	// -页面编辑清空标签
	clear(){
		if(this.entityTag.length > 0){
			for(let i=0; i<this.entityTag.length; i++){
				if (this.recomTag.indexOf(this.entityTag[i]) > -1) {
			        this.recomTag_show.push(this.entityTag[i]);
		      	}
			}
		}
		this.entityTag = [];
		this.entityTag_old = this.setData(this.entityTag);
      	this.recomTag_old = this.setData(this.recomTag_show);
      	this.$emit("getTag", this.entityTag);
	},

    // -编辑页面删除
    delet(item) {
      this.entityTag.splice(this.entityTag.indexOf(item), 1);
      if (this.recomTag.indexOf(item) > -1) {
        this.recomTag_show.push(item);
      }
      this.entityTag_old = this.setData(this.entityTag);
      this.recomTag_old = this.setData(this.recomTag_show);
      this.$emit("getTag", this.entityTag);
    },

    // -删除标签
    deletTag(item) {
      this.entityTag.splice(this.entityTag.indexOf(item), 1);
      if (this.recomTag.indexOf(item) > -1) {
        this.recomTag_show.push(item);
      }
    },
    // -显示新增标签弹窗
    showAddTag() {
      this.showAdd = true;
    },
    // -关闭新增标签弹窗
    closeAddTag() {
      this.entityTag = this.setData(this.entityTag_old);
      this.recomTag_show = this.setData(this.recomTag_old);
      this.showAdd = false;
    },
    // -新增标签
    addTag() {
      this.entityTag_old = this.setData(this.entityTag);
      this.recomTag_old = this.setData(this.recomTag_show);
      this.$emit("getTag", this.entityTag);
      this.showAdd = false;
    },
    // -获取推荐标签
    getRecomTag() {
      this.recomTag = [];
      this.recomTag_show = [];
      this.$post(this.$apiUrl.common.findRecomTags, {
        lblTpCd: this.tagprops.lblTpCd
      }).then(response => {
        let dataArr = response.resultData.lblInfo;
        if (dataArr && dataArr.length > 0) {
          for (let i = 0; i < dataArr.length; i++) {
            this.recomTag.push(dataArr[i].lblTxt);
          }
        }
        this.setRecomTag();
      });
    },
    // -获取实体标签
    getEntityTag() {
      this.entityTag = [];
      this.$post(this.$apiUrl.common.findEntityTag, {
        entId: this.tagprops.entId
      }).then(response => {
        let dataArr = response.resultData.lblInfo;
        if (dataArr && dataArr.length > 0) {
          for (let i = 0; i < dataArr.length; i++) {
            this.entityTag.push(dataArr[i].lblTxt);
          }
        }
        this.entityTag_old = this.setData(this.entityTag);
        this.setRecomTag();
        this.$emit("getTag", this.entityTag);
      });
    },
    // -设置显示推荐标签
    setRecomTag() {
      this.recomTag_show = this.recomTag.filter(
        tag => this.entityTag.indexOf(tag) === -1
      );
      this.recomTag_old = this.setData(this.recomTag_show);
    },
    // -保存标签
    saveTags() {
      return this.$post(this.$apiUrl.common.saveEntityTag, {
        entId: this.tagprops.entId,
        entTp: this.tagprops.entTp,
        lblTxtList: this.entityTag.join(",")
      });
    },
    // -保存标签
    getTags() {
      return this.entityTag;
    }
  },
  created() {
    if (this.tagprops.getRecomTagFirst) {
      this.getRecomTag();
    }
    if (this.tagprops.entId) {
      this.getEntityTag();
    }
  },
  watch: {
    "tagprops.lblTpCd": {
      handler(newValue, oldValue) {
        this.getRecomTag();
      },
      deep: true
    },
    "tagprops.entId": {
      handler(newValue, oldValue) {
        this.getEntityTag();
      },
      deep: true
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.essp-tag {
  .tagsspanbox {
    float: left;
    .it_tag {
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
    height: auto;
    white-space: normal;
  }

  .button-new-tag {
    margin-top: 0 !important;
  }

  .input-new-tag {
    width: 90px;
    margin-right: 10px;
  }

  .tagstore {
    margin: 10px 0 20px;
    .el-button {
      margin: 10px 10px 0 0;
    }
  }

  .taginput {
    border: 1px solid #ccc;
    padding: 10px;
    min-height: 130px;
  }

  .tabletit {
    text-align: center;
    border-bottom: 1px solid #ccc;
    h3 {
      font-size: 20px;
      padding: 0 4px 4px;
      color: #333333;
      font-weight: normal;
    }
  }

  .title_p {
    color: #999999;
    margin-bottom: 5px;
  }
}
</style>
