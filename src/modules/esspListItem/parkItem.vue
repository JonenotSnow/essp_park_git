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
                <span class="icon-box"><i class="icon iconfont icon-liulan"></i>{{viewTime || 0}}</span>
                <span class="icon-box"><i class="icon iconfont icon-collect2"></i>{{countFollower || 0}}</span>
                <span class="icon-box"><i></i></span>
            </div>
            <div class="info" v-html="infoDetail"></div>
            <div class="message">
                <span class="company"><img :src="img" width="25" height="25" @error="setDefaultImg($event)"/>{{cstNm}}</span>
                <span class="time">{{createTime | dateFilter}}</span>
                <span class="label" v-for="(item, index) in activityLabel" :key="index">{{item}}</span>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Moment from "moment";
import imgfault from "@/assets/error.png";
let nowDate = new Date().getTime()
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
            type: String,
            default: ''
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
    computed: {
        activityLabel() {
            let val = this.activityLabelList ? this.activityLabelList.split(",") : []
            return val.slice(0, 3)
        }
    },
    filters: {
        dateFilter(val) {
            if(nowDate - 3600 * 1000 * 24 -val < 0 ) {
                return "今天"
            } else if (nowDate - 3600 * 1000 * 24 * 7 -val < 0 ) {
                return "最近一周"
            } else if (nowDate - 3600 * 1000 * 24 * 30 -val < 0 ) {
                return "最近一个月"
            } else {
                return Moment(val).format("YYYY-MM-DD");
            }
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
