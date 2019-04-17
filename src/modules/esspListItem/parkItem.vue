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
            <h3 class="title"><i class="type">{{type}}</i>{{title}}</h3>
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
        img: { //图片
            type: String,
            default: ''
        },
        type: { //状态类型
            type: String,
            default: ''
        },
        title: { //标题
            type: String,
            default: ''
        },
        approvedNum: { //申报个数
            type: Number,
            default: null
        },
        createTime: { //创建时间
            type: Number,
            default: null
        },
        activityLabelList: { //标签数组
            type: Array,
            default: () => {
                return []
            }
        },
        cstNm: { //公司地址
            type: String,
            default: ''
        },
        viewTime: { //浏览数
            type: Number,
            default: null
        },
        countFollower: { //关注数
            type: Number,
            default: null
        },
        infoDetail: { //内容详情
            type: String,
            default: ''
        }
    },
    methods: {
        setDefaultImg(event) { //图片默认设置
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
