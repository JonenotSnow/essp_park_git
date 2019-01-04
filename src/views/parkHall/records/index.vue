<template>
    <div class="active_index">
        <div class="esspclearfix">
            <div class="content_l">
                <essp-aside></essp-aside>
            </div>
            <div class="content_r"><router-view/></div>
        </div>
    </div>
</template>

<script>
    import EsspAside from '@/components/EsspAside';
    export default {
        name: "",

        data() {
            return {
                msg: "走访记录",
                asidetitle:"走访记录"
            }
        },
        components:{
            EsspAside
        }
    }
</script>

<style lang="less">
    @import "../../../assets/css/mixin";
    .active_index  {
        .essp_width_auto();
        margin-bottom: 20px;
        margin-top: 20px;
    }
</style>
