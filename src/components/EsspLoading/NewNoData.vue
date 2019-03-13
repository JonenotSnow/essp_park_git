<template>
    <div>
        <div class="comnoData" v-if="nodata && !loading">
            <div class="no-list-pic">
                <img src="@/assets/newparkimg/no-list-img.png" :width="width" alt="">
            </div>
            <div class="no-list-desc">
                {{nodataMsg}}<template v-if="gologin">，请先 <a @click="toLogin">登录</a></template>
            </div>
        </div>
        <div class="comnoData" v-if="loading">
            <div class="no-list-desc" v-html="loadingMsg">
            </div>
        </div>
    </div>
</template>
<script>
import mixin from "@/components/mixins/mixins_windowOpen.js";
export default {
    mixins: [mixin],
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
        },
        gologin: {
        type: Boolean,
        default: false
        }
    },
    methods: {
        toLogin: function () {
            this.windowHrefUrl("/userIndex/login");
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
            a{
                color: #1792fd;
                cursor: pointer;
            }
        }
    }
</style>
