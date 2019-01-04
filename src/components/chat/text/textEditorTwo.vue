<!--<script src="../../../video_admin/config/index.js"></script>-->
<template>
    <quill-editor ref="myTextEditor" v-model="editorCon" :options="editorOption" v-if="!IEshow" @focus="onEditorFocus($event)">
        <div id="toolbar" slot="toolbar">
        </div>
    </quill-editor>
</template>

<script>

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillEditor} from 'vue-quill-editor'


    export default {
        name: 'editor',
        components: {
            quillEditor
        },
        data() {
            return {
                editorCon: "",
                IEshow: false,
                editorOption: {
                    editorCon: '',
                    readOnly: 'true',
                    placeholder: `请输入内容`,
                    modules:{
                    }
                },
            }
        },
        mounted(){
            this.$refs.myTextEditor.focus()
        },
        methods: {
            onEditorFocus(e){
                debugger
            }
        },
    }
</script>
<style lang="less">
    .ql-toolbar.ql-snow{
        display: none;
    }
    .ql-editor{
        padding: 0 15px;
        height: 85px;
    }
    .ql-container {
        background: #fff;
    }
    .ql-container.ql-snow {
        border: 0;
    }
</style>



