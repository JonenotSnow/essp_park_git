<template>
    <div @click="urlClick">
        <h3>{{ title }}</h3>
        <p>{{ date }}</p>
    </div>
</template>
<script>
export default {
    name: '热门活动item',
    props: {
        title:{
            type: String,
            default: ''
        },
        date: {
            type: String,
            default: ''
        },
        
    },
    data() {
        return {

        }
    },
    methods: {
        urlClick(item) {
            this.$emit('itemClick', item)
        }
    }

}
</script>
<style lang="less" scoped>

</style>
