<template>
    <custom-form></custom-form>
</template>
<script>
    import customForm from '@/modules/customForm/customForm';
    export default {
        name: "",
        components: {
            customForm,
        },
        data() {
            return {
                msg: ""
            }
        },
        created(){

        }
    }
</script>
<style lang="less" scoped>
    @import './style.less';
</style>
