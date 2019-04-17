<template>
    <div class="essp-list-item-detail">
        <div class="item-left-img">
            <img :src="img" width="170" alt="" @error="setDefaultImg($event)">
            <div class="mark">
                <span class="sign"></span>
                <span class="price"></span>
            </div>
        </div>
        <div class="inter">
            <h3 class="title">{{title}}</h3>
            <div class="spread">
                <span class="icon-box"><i class="icon iconfont icon-liulan"></i>{{viewTime}}</span>
                <span class="icon-box"><i class="icon iconfont icon-collect2"></i>{{countFollower}}</span>
                <span class="icon-box"><i></i></span>
            </div>
            <div class="info" v-html="infoDetail"></div>
            <div class="message">
                <span class="company"><i class=""></i>{{cstNm}}</span>
                <span class="time">{{createTime}}</span>
                <span class="label"></span>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import imgfault from "@/assets/error.png";
export default {
    name: "单个详情组件",
    props: {
        img: {
            type: String,
            default: ''
        }, 
        title: {
            type: String,
            default: ''
        },
        approvedNum: {
            type: Number,
            default: null
        },
        createTime: {
            type: Number,
            default: null
        },
        activityLabelList: {
            type: Array,
            default: () => {
                return []
            }
        },
        cstNm: {
            type: String,
            default: ''
        },
        viewTime: {
            type: Number,
            default: null
        },
        countFollower: {
            type: Number,
            default: null
        },
        infoDetail: {
            type: String,
            default: ''
        }
    },
    methods: {
        setDefaultImg(event) {
            var ele = event.currentTarget;
                ele.src = imgfault;
                ele.title = "默认配图";
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>
