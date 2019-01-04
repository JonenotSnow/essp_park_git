<template>
    <div class="essp-park-tag__wrap">
        <span class="essp-park-tag">{{value}}</span>
    </div>
</template>

<script>
    export default {
        name: 'essp-park-tag',
        props: {
            value: {
                type: String,
                default: '园区专属标签'
            }
        },
        components: {},
        data() {
            return {
                msg: 'essp-park-tag',
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .essp-park-tag__wrap {
        display: inline-block;
        margin-right: 20px;
        .essp-park-tag {
            display: inline-block;
            padding: 4px 8px;
            height: 10px;
            line-height: 10px;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #36c0ff;
            background-color: #d9f3ff;
            border-radius: 3px;
            border: solid 1px #c3ecff;
        }
    }
</style>
