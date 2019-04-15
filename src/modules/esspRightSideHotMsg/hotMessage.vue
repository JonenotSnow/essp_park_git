<template>
    <div class="essp-right-side-hot">
        <h3 class="title esspclearfix">{{mainTitle}}<button class="btn" @click="changeClick">换一换</button></h3>
        <div class="inner">
            <hot-item
                v-for="(item, index) in listData" :key="index"
                :title="item[titleLabel]"
                :date="item[dateLabel]"
                @itemClick="routeClick(item)"
            >
            </hot-item>
        </div>
    </div>
</template>
<script>
import hotItem from './hotItem'
export default {
    name: 'hotMessage',
    components: {
        hotItem
    },
    props: {
        //热门标签名称
        mainTitle: {
            type: String,
            default: '热门'
        },
        //热门列表
        listData: {
            required: true,
            type: Array,
            default: () => {
                return []
            }
        },
        //热门列表title字段
        titleLabel: {
            type: String,
            default: 'title'
        },
        //热门列表时间字段
        dateLabel: {
            type: String,
            default: 'date'
        }
        
    },
    data () {
        return {

        }
    },
    methods: {
        //换一换按钮事件
        changeClick() {
            this.$emit('hotExchange')
        },
        //详情列表详情按钮事件
        routeClick(item) {
            this.$emit('hotItemClick', item)
        }
    }
}
</script>
<style lang="less" scoped>
    @import './style.less';
</style>

