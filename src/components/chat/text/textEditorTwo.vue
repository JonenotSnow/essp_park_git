<!--<script src="../../../video_admin/config/index.js"></script>-->
<template>
    <quill-editor ref="myTextEditor" v-model="editorCon" v-if="!IEshow" @focus="onEditorFocus($event)">
        <div id="toolbar" slot="toolbar">
        </div>
    </quill-editor>
</template>

<script>
    export default {
        name: 'editor',
        components: {
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



