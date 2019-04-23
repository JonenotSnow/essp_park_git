<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'sci-and-tech-service',
        props: {},
        components: {},
        data() {
            return {
                msg: '科技服务',
                /**
                 ======类型============
                 科技创新---01
                 技术合同登记---02
                 高企认定---03
                 科小认定---04
                 知识产权---05
                 科技服务机构---06
                 风险投资---07
                 天使投资---08
                 */
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
