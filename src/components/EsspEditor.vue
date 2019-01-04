<!--<script src="../../../video_admin/config/index.js"></script>-->
<template>
    <quill-editor ref="myTextEditor" v-model="editorCon" :options="editorOption" v-if="!IEshow">
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
                        toolbar:[
                          	['bold', 'italic', 'underline', 'strike'],
                        ]
                    }
                },
            }
        },
        methods: {

        },
    }
</script>
<style lang="less">


    .ql-container {
        background: #fff;
    }
</style>



