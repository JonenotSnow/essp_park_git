<template>
    <div>
        <div class="comnoData" v-if="nodata && !loading">
            <div class="no-list-pic">
                <img src="@/assets/newparkimg/no-list-img.png" :width="width" alt="">
            </div>
            <div class="no-list-desc">
                {{nodataMsg}}
            </div>
        </div>
        <div class="comnoData" v-if="loading">
            <div class="no-list-desc">
                {{loadingMsg}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        loading: {
        type: Boolean,
        default: false
        },
        nodata: {
        type: Boolean,
        default: false
        },
        nodataMsg: {
        type: String,
        default: '暂无数据'
        },
        loadingMsg: {
        type: String,
        default: '数据加载中...'
        },
        width: {
        type: Number,
        default: 245
        }
    }
}
</script>

<style lang="less">
    .comnoData{
        padding-top: 100px;
        padding-bottom: 50px;
        text-align: center;
        .no-list-desc {
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
        }
    }
</style>
