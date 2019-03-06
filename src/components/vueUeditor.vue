<template>
  <div class="setLineHeight">
    <vue-ueditor-wrap  v-model="editorContent" :config="ueditorConfig" @beforeInit="addCustomButtom"></vue-ueditor-wrap>
  </div>
</template>

<script>
export default {
  name: 'vue-ueditor',
  props:{
    value:{
      type:String,
      default:'请编辑内容'
    },
    imageFlag:{
      type:String,
      default:true
    },
    ueditorConfig:{
      type:Object,
      default:()=>{
         return {
           initialFrameWidth:900,
           initialFrameHeight:340,
           toolbars: [[
            'fullscreen', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'map', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'preview', 'searchreplace', 'help'
            ]],
            UEDITOR_HOME_URL: '/essp_park/static/UEditor/'
        }
      }
    }
  },
  data () {
    return {
      editorContent: '',
      imgUrl:require('../assets/chat-icon/add.png')
    }
  },
  methods: {

    addCustomButtom (editorId) {
        if(!this.imageFlag)return false
        let that= this
        window.UE.registerUI('test-button', function (editor, uiName) {
            // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName, {
            execCommand: function () {
                var input = document.createElement('input')
                input.type = "file"
                input.style.display = 'none'
                document.body.appendChild(input)
                input.click()
                input.addEventListener('change',bindingF)
                async function bindingF(e) {
                    // 利用 AJAX 上传，上传成功之后销毁 DOM
                    document.body.removeChild(input)
                    input.removeEventListener('change',bindingF)
                    input = null;
                    let res = await that.upload(e.target.files[0])
                    if(res){
                        editor.execCommand('inserthtml', `<img src="${((window.location.origin.indexOf('localhost')>-1?'http://128.196.235.132:1345':'')+res.url)}"></img>`)
                    }
                   
                }
            }
            })
        
            // 创建一个 button
            var btn = new window.UE.ui.Button({
            // 按钮的名字
            name: uiName,
            // 提示
            title: '上传图片',
            // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
            cssRules: `background-image: url('${that.imgUrl}') !important;background-size: cover;`,
            // 点击时执行的命令
            onclick: function () {
                // 这里可以不用执行命令，做你自己的操作也可
                editor.execCommand(uiName)
            }
            })
        
            // 当点到编辑内容上时，按钮要做的状态反射
            editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName)
            if (state === -1) {
                btn.setDisabled(true)
                btn.setChecked(false)
            } else {
                btn.setDisabled(false)
                btn.setChecked(state)
            }
            })
        
            // 因为你是添加 button，所以需要返回这个 button
            return btn
        }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
    },
    async upload(file){
                let flieName = file.name;
                let fileType = flieName.substring(flieName.lastIndexOf(".") + 1).toLowerCase();

                // fileType === "zip" 格式不支持
                const isFile = fileType === "png" || fileType === "jpg" || fileType === "jpeg" ;
                const isLt5M = file.size / 1024 / 1024;

                if (!isFile) {
                    this.$message.error("上传的附件只能是png、jpg、jpeg格式！");
                    return false;
                }
                if (!isLt5M) {
                    this.$message.error("上传文件大小不能超过1MB!");
                    return false;
                }

                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "sciAndTechPolicy"); // 通过append向form对象添加数据

                let response =  await this.$post(this.$apiUrl.upload.upload, param)
                var obj = {
                            name: file.name,
                            url: response.resultData[0].url
                        };
                       return obj
                // return false; // 返回false不会自动上传
    }
  },
  created () {
      this.editorContent = this.value
  },
  watch: {
      'editorContent':function(){
          this.$emit('input',this.editorContent)
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .setLineHeight{
    line-height: normal;
}
</style>

