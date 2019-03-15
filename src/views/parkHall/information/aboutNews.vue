<template>
    <div>
        <ul><li v-for="item in newList" :key="item.key" @click="detail(item)">
            <p class=title>{{item.informationTitle}}</p>
            <p class="content">{{item.content}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        classtType:{
            default:'0'
        }
    },
    data() {
        return {
            newList:[],
            
        }
    },
    methods:{
        detail(item){
            this.$router.push({path:"/parkIndex/infoDetail",query:{informationId:item.informationId}})
        },
        getList(){
            this.$post('information/getAllInformation',{
                pageNum: 1,
                pageSize: 6,
                classtType:this.classtType
            }).then((result) => {
                this.newList = result.resultData.informationList
            }).catch((err) => {
                this.$message(err.result)
            });
        }
    },
    created (){
        this.getList()
    },
    watch: {
        classtType:function(){
            this.getList()
        }
    },
}
</script>
<style lang="less" scoped>
ul{
    padding-left:35px; 
    li{
        cursor: pointer;
        &:hover{
             .title{
                color: #10b5ff
             }
        }
        .title{
            font-size: 16px;
            color: #333333;
            padding:25px 0;
            // &:hover{
                
            // }
        }
        .content{
            font-size: 14px;
            color: #999;
            margin:0 0 25px;
            line-height: 26px;
            height: 52px;
            overflow: hidden;
            width: 300px;
            text-overflow: ellipsis;
            -o-text-overflow:ellipsis;
            display:block;
            display: -webkit-box;
            -webkit-line-clamp: 2;
        }
        border-top:1px solid #eeeeee  ;
        &:last-child{
            border-bottom: 1px solid #eeeeee  ;
        }
    }
}
</style>
