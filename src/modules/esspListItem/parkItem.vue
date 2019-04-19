<template>
    <div class="essp-list-item-detail">
        <div class="item-left-img">
            <img :src="img" width="170" alt="" @error="setDefaultImg($event)">
            <div class="mark" v-if="approvedNum !== null || price !== null">
                <span class="sign" v-if="approvedNum !== null">已申请：{{approvedNum}}人</span>
                <span class="price" v-if="price !== null">￥{{price}}起</span>
            </div>
        </div>
        <div class="inter">
            <h3 class="title"><i class="type" v-if="type !== null">{{type}}</i>{{title}}</h3>
            <div class="spread">
                <span class="icon-box"><i class="icon iconfont icon-liulan"></i>{{viewTime || 0}}</span>
                <span class="icon-box"><i class="icon iconfont icon-collect2"></i>{{countFollower || 0}}</span>
                <span class="icon-box"><i></i></span>
            </div>
            <div class="info" v-if="infoDetail !== null" v-html="infoDetail"></div>
            <div class="info" v-if="avaliableTime !== null || avaliableEndTime !== null">申报时间：{{avaliableTime | dateFilter('YYYY-MM-DD HH:MM')}} - {{avaliableEndTime | dateFilter('YYYY-MM-DD HH:MM')}}</div>
            <div class="message">
                <span class="company"><img :src="companyLogo" width="25" height="25" @error="setDefaultImg($event)"/>{{cstNm}}</span>
                <span class="time">{{createTime | createDateFilter}}</span>
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
            type: Number,
            default: null
        },
        title: { //标题
            type: String,
            default: ''
        },
        approvedNum: { //申报个数
            type: Number,
            default: null
        },
        price: { //最低价格
            type: Number,
            default: null
        },
        avaliableTime: { //申报起始时间
            type: Number,
            default: null
        },
        avaliableEndTime: { //申报结束时间
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
        companyLogo: { //公司图片
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
            default: null
        }
    },
    computed: {
        activityLabel() {
            let val = this.activityLabelList ? this.activityLabelList.split(",") : []
            return val.slice(0, 3)
        }
    },
    filters: {
        createDateFilter(val) {
            if(nowDate - 3600 * 1000 * 24 -val < 0 ) {
                return "今天"
            } else if (nowDate - 3600 * 1000 * 24 * 2 -val < 0 ) {
                return "1天前"
            } else if (nowDate - 3600 * 1000 * 24 * 3 -val < 0 ) {
                return "2天前"
            } else if (nowDate - 3600 * 1000 * 24 * 4 -val < 0 ) {
                return "3天前"
            } else {
                return Moment(val).format("YYYY-MM-DD");
            }
        },
        dateFilter(val, type="YYYY-MM-DD") {
             return Moment(val).format(type);
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
