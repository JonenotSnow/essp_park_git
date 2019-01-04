<template>
    <div class="">
        <ul class="navbar xq-clearfix ">
            <li v-for="(item,i) in navData" :key="'navItem' +  i" class="navbar__item "
            :class="{'navbar__item--active':active == i}"
            @click="active = i">
                <router-link :to="item.path">
                    {{item.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['getNavData','getActive'],
    data () {
        return {
            active:0,
            navData:[
                // {
                //     name:'首页',
                //     path:'/jzfpIndex/index'
                // },
                // {
                //     name:'企业融资',
                //     path:'/jzfpIndex/qyrzIndex'
                // },
                // {
                //     name:'扶贫项目',
                //     path:'/jzfpIndex/fpxmIndex'
                // },
                // {
                //     name:'扶贫政策',
                //     path:'/jzfpIndex/fpzcIndex'
                // },
            ]
        }
    },
    methods:{
        onRoutePath(){
            var path = this.$route.path
            //onsole.log(this.getNavData)
            var index = this.getNavData.findIndex((item)=>{
                return item.path == path;
            })
            //onsole.log(index)
            this.active = index;
        }
    },
    created(){
        // 进入页面判断路由地址,更改active参数
        //onsole.log(this.$route)
        if(this.getNavData && this.getNavData.length > 0){
            this.onRoutePath()
        }
    },
    watch:{
        'getNavData':{
            immediate: true,
            handler:function (val) {
                if(val){
                    this.navData = val;
                }
                //onsole.log('触发',val)
            }
        },
        'getActive':{
            immediate: true,
            handler:function (val) {
                console.log('触发A',val);
                if(val || val == 0){
                    this.active = val;
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
    
    .navbar{
        width: 100%;
        line-height: 36px;
        margin-left: 30px;
        .navbar__item:last-child{
            margin-right: 0;
        }
    }
    .navbar__item{
        float: left;
        font-size: 18px;
        color: #333;
        margin-right: 40px;
    }

    .navbar__item--active{
        a{
            color: #00a0e9;
        }
    }

    // 浮动清除
.xq-clearfix:before,
.xq-clearfix:after {
    content:"";
    display:table;
}
.xq-clearfix:after {
    clear:both;
}
.xq-clearfix {
    zoom:1; /* IE < 8 */
}
</style>
