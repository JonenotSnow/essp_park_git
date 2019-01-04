<template>
<!-- 面包屑导航 -->
    <div>   
        <el-breadcrumb separator-class="el-icon-arrow-right" class="xq-jgsz__breadcrumb">
            <template v-for="(item,i) in listData">
                <el-breadcrumb-item  v-if="item.path" :key="'item'+ i" :to="item.path">{{item.name}}</el-breadcrumb-item>
                <el-breadcrumb-item  v-else :key="'item'+ i" >{{item.name}}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props:['listData'],
}
</script>
<style lang="less">
    @import "../assets/css/mixin.less";
    @import "../assets/css/xq_style/style.less";
    @import "../assets/css/xq_style/base.less";
</style>