<template>
 <div class="toolcon esspclearfix">
     <!-- 整合我发起的（活动，资讯，惠政，草稿）的顶部公共模块 -->
    <div class="toolleft">
        <router-link v-for="(item,index) in toolspans" :to="item.path" :key="index"  :class="{'showblue': (curent_toolspan==index),'toolspan': true}">{{item.name}}</router-link>
    </div>
    <div class="toolright" v-if="flag">
        <el-button class="toolright_btn" type="primary" size="mini" @click="linkTo"><i class="el-icon-circle-plus"></i>{{contit}}</el-button>
    </div>
</div>
</template>

<script>
 export default {
   data () {
    return {
        flag: this.SSH.getItem("loginFlag")
    }
   },
   props:['pageType'],
   created(){
       this.getSetting()
   },
   methods:{
        linkTo(){
//            let data = this.SSH.getItem('userInfo');
//            if(data.freeze) {
//                this.$message({
//                    type: 'error',
//                    message: '您的权限被冻结，请尽快申述!'
//                });
//                return;
//            }
            var url = this.link
            this.$router.push(url)
        },
        getSetting(){
            var pageType = this.pageType;

            if(pageType=="launchActive"){
                this.toolspans=[
                    {
                        id:1,
                        name:"已发布",
                        path:'/parkIndex/park/launch'
                    },
                    {
                        id:2,
                        name:"草稿箱",
                        path:'/parkIndex/park/draft'
                    }
                ],
                this.curent_toolspan=0
                this.link = '/parkIndex/launchForm';
                this.contit = "发布新活动";
                return
            }
            if(pageType=="draftActivity"){
                this.toolspans=[
                    {
                        id:1,
                        name:"已发布",
                        path:'/parkIndex/park/launch'
                    },
                    {
                        id:2,
                        name:"草稿箱",
                        path:'/parkIndex/park/draft'
                    },

                ];
                this.curent_toolspan=1;
                this.link = '/parkIndex/launchForm';
                this.contit = "发布新活动";
                return
            }
            if(pageType=="releaseGover"){
                this.toolspans=[
                    {
                        id:1,
                        name:"已发布",
                        path:'/parkIndex/goverBene/release'
                    },
                    {
                        id:2,
                        name:"草稿箱",
                        path:'/parkIndex/goverBene/draft'
                    }
                ],
                this.curent_toolspan=0,
                this.link = '/parkIndex/publishGover';
                this.contit = "发布新惠政";
                return
            }
            if(pageType=="draftGover"){
                this.toolspans=[
                    {
                        id:1,
                        name:"已发布",
                        path:'/parkIndex/goverBene/release'
                    },
                    {
                        id:2,
                        name:"草稿箱",
                        path:'/parkIndex/goverBene/draft'
                    }
                ],
                this.curent_toolspan=1,
                this.link = '/parkIndex/publishGover';
                this.contit = "发布新惠政";
                return
            }
            if(pageType=="myPublishedInfo"){
                this.toolspans=[
                    {
                        id:1,
                        name:"已发布",
                        path:'/parkIndex/parkInformation/myPublishedInfo'
                    },
                    {
                        id:2,
                        name:"草稿箱",
                        path:'/parkIndex/parkInformation/draftInfo'
                    }
                ],
                this.curent_toolspan=0,
                this.link = '/parkIndex/publishNewInfo';
                this.contit = "发布新资讯";
                return
            }
            if(pageType=="draftInfo"){
                this.toolspans=[
                    {
                        id:1,
                        name:"已发布",
                        path:'/parkIndex/parkInformation/myPublishedInfo'
                    },
                    {
                        id:2,
                        name:"草稿箱",
                        path:'/parkIndex/parkInformation/draftInfo'
                    }
                ],
                this.curent_toolspan=1,
                this.link = '/parkIndex/publishNewInfo';
                this.contit = "发布新资讯";
                return
            }
        }

   }
 }
</script>

<style lang='less' scoped >
//顶部左侧工具栏目
@import "../assets/css/mixin";
.toolcon {
    /*margin-bottom: 10px;*/
    padding:24px 0;
}
.toolleft {
    float: left;
    .showblue{
    color:#00a0e9 !important;
    }
    .toolspan{
        float: left;
        padding: 0 7px;
        position: relative;
        /*border-right:1px solid #ccc;*/
        font-size: 18px;
        padding-right: 15px;
        height:30px;
        line-height: 30px;
        color: #333333;
        &:hover{
            cursor: pointer;
        }
        &:before{
            content: " ";
            position: absolute;
            width: 1px;
            height: 70%;
            right: 0;
            top: 5px;
            background: #ccc;
        }
        &:last-child{
            padding-left: 15px;
            border-right:none;
            &:before{
                width: 0;
            }
        }
    }
}
.toolright {
    float: right;
    .toolright_btn {
        position: relative;
        line-height: 30px;
        font-size: 14px;
        padding: 0 8px 0 35px;
        i {
            position: absolute;
            left: 6px;
            top: 4px;
            font-size: 22px;
        }
    }
}


</style>
