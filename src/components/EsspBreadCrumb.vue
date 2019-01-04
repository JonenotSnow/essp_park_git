<template>
    <div class="detailNav">
        <div class="breadbox">
            <span v-for="(item,index) in breadList" :key="index">
            <span v-if="index == breadList.length-1" class="lastspan">
            {{item.name}}
            </span>
            <span v-else>
            <router-link :to="{path:item.path,query:item.query}">{{item.name}}</router-link>
            <span v-if="breadList.length > 1"> > </span>
            </span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            breadList: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/mixin";

    .detailNav {
        background: #f5f5f5;
        font-size: 16px;
        line-height: 30px;
        color: #666;
    }

    .breadbox {
        .essp_width_auto();
        padding: 22px 0 10px;
        .lastspan {
            color: #888;
        }
    }


</style>
