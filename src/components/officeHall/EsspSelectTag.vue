<template>
    <div class="essp-select-tag-wrap">
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: 'essp-select-tag',
        props: {},
        components: {},
        data() {
            return {
                msg: '标志位',
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .essp-select-tag-wrap {
        height: 10px;
    }
</style>
