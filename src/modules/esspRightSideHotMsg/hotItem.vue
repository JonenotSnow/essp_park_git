<template>
    <div @click="urlClick" class="hot-item">
        <div class="item-imgbox">
            <img :src="imgUrl" width="135" height="80" class="item-img"/>
        </div>
        <div class="item-intor">
            <h3 class="item-title">{{ title }}</h3>
            <p class="item-date">{{ date | dateFilter }}</p>
        </div>
        
    </div>
</template>
<script>
import Moment from "moment";
let nowDate = new Date().getTime()
export default {
    name: '热门活动item',
    props: {
        title:{ //标题
            type: String,
            default: ''
        },
        date: { //日期
            type: String,
            default: ''
        },
        imgUrl: { //图片
            type: String,
            default: ''
        },
    },
    filters: {
        dateFilter(val) {
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
    },
    data() {
        return {

        }
    },
    methods: {
        //点击事件
        urlClick(item) {
            this.$emit('itemClick', item)
        }
    }

}
</script>
<style lang="less" scoped>
.hot-item {
    position: relative;
    display: flex;
    flex-direction:row;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 30px 0;
    margin-top: -1px;
    .item-imgbox {
        width: 135px;
        .img {
            border: none;
        }
    }
    .item-intor {
        padding-left: 10px;
        .item-title {
            margin: 0;
            font-size: 16px;
            color: #333;
            height: 56px;
            line-height: 28px;
            word-break: break-all;
            overflow: hidden;
            text-overflow: -o-ellipsis-lastline;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*!autoprefixer: off */
            -webkit-box-orient: vertical;
            /*autoprefixer: on */
        }
        .item-date {
            font-size: 12px;
            color: #999;
            line-height: 20px;
            margin: 2px 0;
        }
    }
}
</style>
