<template>
    <div class="el-main">
        asdfasd
    </div>
</template>

<script>
import Moment from 'moment'
export default {
    data () {
        return {
            
        }
    },
    async created(){
       
    },
    computed: {
        curId(){
            return this.$route.params.id
        }
    },
    filters: {
        timerFormat(vaule){
           return Moment(vaule).format("YYYY-MM-DD HH:mm")
        }
    },
    methods:{
        
    }
};
</script>

<style lang='less' scoped>
    .el-main{
        height: 100%;      
    }
</style>
