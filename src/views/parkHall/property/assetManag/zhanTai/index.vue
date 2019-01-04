<template>
    <div>
        {{msg}}
        <hr>
        {{tip}}
    </div>
</template>

<script>
    export default {
        name: 'zhan-tai',
        props: {},
        components: {},
        data() {
            return {
                msg: '展台',
                tip: '该功能暂未开放'
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
