<template>
  <div class="input tags-wrap">
    <div class="tags-upload" transition="tags-upload" v-for="(item,index) in picArr" :key="index">
      <div class="content" v-show="showdelButton"><img :src="item"> <i class="el-icon-close" style="width: 22px;height: 15px;  position: absolute;  top: 0px;
      right: 15px;" @click="del(index)"></i>
          <!--<img style="width: 22px;height: 15px;  position: absolute;  top: 0px;-->
      <!--right: 0px;" src="../assets/imgs/active.png" @click="del(index)">-->
      </div>
    </div>

    <div class="tags" v-show="showAddButton">
      <a href="" class="file-wrap">
        <input name="pic" ref="fileInput" @change="selectFile" type="file" class="upload" />
      </a>
    </div>
    <!--<p class="txt-info">(图片5M内，最多4张，支持jpg、png格式)</p>-->
  </div>
</template>

<script>
  export default {
    name: "Tags",
    props: {
      imageUrls: {
        type: Array,
        default: []
      }
    },
    created: function () {
    },
    watch:{
      imageUrls:function(val){
        this.picArr=val
        if(val.length>=1){
          this.showAddButton=false;
        }
      }
    },
    data() {
      return {
        check: false,
        value: '',
        text: '',
        picArr:this.imageUrls,
        fileArr:[],
        showAddButton:true,
        showdelButton: true,
      }
    },
    methods: {
      add(text) {
        let vm = this;
        //onsole.log('子组件监听')
        this.$emit('add-item', text);
        vm.text = ''
      },
      del(index) {
        let vm = this;
        vm.picArr.splice(index, 1);
        if(vm.picArr.length<1){
            this.showAddButton = true;
        }
      },
      showAlert(msg){
           MessageBox.alert(msg);
      },
      selectFile(e) {
            let files = e.target.files || e.dataTransfer.files;
            if(files.length){
                let allImgExt = '.jpg|.jpeg|.gif|.bmp|.png|';
                let filePath = this.$refs.fileInput.value;
                let extName = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
                if(allImgExt.indexOf(extName+'|') == -1){
                    // Toast('请选择正确的文件类型！！！');
                    // return;
                    this.showAlert('请选择正确的文件类型！！！');
                    this.$refs.fileInput.value = '';
                    return;
                }
                let arr=filePath.split('\\');
                let fileName=arr[arr.length-1];
                let file = this.$refs.fileInput.files[0];
                if(file){
                  //5242880(5M)
                  if(file.size>5242880){
                     this.showAlert('请上传不大于5M的图片！！！');
                     this.$refs.fileInput.value = '';
                     return;
                  }
                }
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    this.picArr.push(reader.result);
                    this.fileArr.push(file);
                    //图片最多4张，超过隐藏添加按钮
                    if(this.picArr.length>=1){
                      this.showAddButton = false;
                    }
                }
            }
            this.$refs.fileInput.value = '';
        }
    }
  }
</script>

<style lang="less" scoped>

  .file-wrap{
      background: url(../assets/imgs/upload.png) center center no-repeat #e8e8e8;
      background-size: 88px 30px;
      width: 88px;
      height: 30px;
      display: inline-block;
       .upload{width: 88px;overflow: hidden;
        font-size: 120px;
        opacity: 0;

      }
  }

  //输入框tags
  .tags-wrap {
    width: 100%;
    height: 100%;
    outline: none;
    &::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
    }
  }

  .tags {
    position: relative;
    float: left;
    color: #666666;
    border-radius: 30px;
    height: 30px;
    background-color: white;
  }

  .tags-upload {
      position: relative;
      float: left;
      color: #666666;
      border-radius: 30px;
      height: 170px;
      /*margin-left: 15px;*/
      background-color: white;
      /*padding: 10px 20px 10px 18px;*/
      /*margin: 20px 10px 10px 20px;*/
      .content {
          font-size: 30px;
          img {
              width: 160px;
              height: 160px;
              padding-right: 20px;
              padding-bottom: 30px;
          }
      }
      .del {
          width: 12px;
          height: 12px;
          font-size: 32px;
          color: chocolate;
          cursor: pointer;
          position: absolute;
          top: -10px;
          right: 20px;
      }
  }
  .txt-info{color:gray;font-size: 24px; clear:both;padding-bottom: 18px }
</style>
