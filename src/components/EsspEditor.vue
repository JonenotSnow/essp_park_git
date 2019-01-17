<!--<script src="../../../video_admin/config/index.js"></script>-->
<template>
    <quill-editor ref="myTextEditor" style="height: 400px;"  @keyup.tabprevent="onEditorTab" v-model="editorCont" @blur="onEditorBlur($event)" @change="onEditorChange($event)" :options="editorOption">
        <div id="toolbar" slot="toolbar">
         </div>
    </quill-editor>
</template>

<script>

    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {
        name: 'editor',
        components: {
            quillEditor
        },
        props: ["editorCont"],
        created(){
            console.log(this.editorCont);
        },
        data() {
            return {
            	editorCon: this.editorCon || '',
                editorOption: {
                	editorCon: '',
                    readOnly: 'true',
                    placeholder: `请输入内容`
                },
            }
        },
        methods: {
            // tab键
            onEditorTab(event){
                console.log(event);
            },
            // 失去焦点
            onEditorBlur(editor){
//                console.log("失去焦点",this.editorCon);
//                var htmlStr = this.editorCon.replace(/\s/g, "&nbsp;&nbsp");
                var htmlStr = this.editorCon;
                this.$emit("onEditorChange", htmlStr);
            },
            // change事件
            onEditorChange({editor,html,text}){
                this.editorCon = html;
                this.$emit("onEditorChange", this.editorCon);
            }
        },
        computed:{
            editor() {
                return this.$refs.myTextEditor.quill
            }
        }
    }
</script>
<style lang="less">
    .ql-container {
        background: #fff;
        height: -ms-calc(100% - 66px)!important;
        height: -moz-calc(100% - 66px)!important;;
        height: -webkit-calc(100% - 66px)!important;;
        height: calc(100% - 66px)!important;;
    }
    .ql-container.ql-snow {
        border: none!important;
    }
    .ql-container.ql-snow .ql-editor {
        border: 1px solid #ccc!important;;
    }
</style>



