<template>
    <div class="essp-banner-img">
        <img :src="url" height="350px" alt="">
    </div>
</template>
<script>
export default {
    name: "COMBanner",
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>
