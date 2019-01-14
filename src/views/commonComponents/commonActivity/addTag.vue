<template>
 <div>
    <el-button size="mini" round @click="triggerOpen()">添加标签</el-button>
    <el-dialog title="添加标签" :visible.sync="tagMarkShow">
    <el-form style="padding:10px">
        <el-form-item>
            <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加新标签</el-button>

        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancelWind">取 消</el-button> -->
        <el-button type="primary" @click="closeWind">确 定</el-button>
    </div>
    </el-dialog>
 </div>
</template>

<script>
  export default {
    data() {
      return {
        inputVisible: false,
        inputValue: "",
        tagMarkShow:false//开始是隐藏的
      };
    },
    props:{
        dynamicTags:{
            // type:Array,
            default:['标签一', '标签二', '标签三']
        }
    },
    watch:{
        dynamicTags: function(curVal,oldVal){
            this.initTags = oldVal;
        }
    },


    methods:{
        triggerOpen() {
            return this.tagMarkShow?this.tagMarkShow=false:this.tagMarkShow=true
        },
        cancelWind(){
            this.tagMarkShow=false;
        },
        closeWind(){
            var _this = this;
            this.tagMarkShow=false
            this.$emit('upup', { name: _this.dynamicTags, age:  10 })
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            console.log(inputValue);
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }

    }

  };
</script>
<style scoped lang="less">
    .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-dialog .el-dialog__headerbtn,.el-icon-close{
      display: none;
  }
</style>


