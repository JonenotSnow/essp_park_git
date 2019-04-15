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
        mainTitle: {
            type: String,
            default: '热门'
        },
        listData: {
            required: true,
            type: Array,
            default: () => {
                return []
            }
        },
        titleLabel: {
            type: String,
            default: 'title'
        },
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
        changeClick() {
            this.$emit('hotExchange')
        },
        routeClick(item) {
            this.$emit('hotItemClick', item)
        }
    }
}
</script>
<style lang="less" scoped>
    @import './style.less';
</style>

