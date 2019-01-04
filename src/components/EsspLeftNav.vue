<template>
    <div class="xq-style">
        <div v-if="type && type == 2">
            <ul class="xq-rzxq__list--icon">    
                <li class="xq-rzxq__list--item" v-for="(item,i) in listData" :key="'item' + i"
                    :style="(i + '-') == active ? 'background-image:url(./static/xq_images/'+ item.icon +'_a.png)':'background-image:url(./static/xq_images/'+ item.icon +'.png)'"
                    @click="onActive(item.path,i,'',item.children?1:0)"
                    :class="{'xq-rzxq-list__item--active':(i + '-') == active}"
                    >
                    {{item.name}}
                    <ul v-if="item.children && item.children.length > 0" class="xq-rzxq__list--children"> 
                        <li v-for="(item2,i2) in item.children" :key="'children' + i2" class="xq-rzxq__item--children"
                        :class="{'xq-rzxq-list__item--active':active == (i + '-' + i2)}"
                        @click="onActive(item2.path,i,i2,0)"
                        >
                            {{item2.name}}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="xq-box--max " v-else>
            <h1 class="xq-t18 xq-leftNav__title">{{title}}</h1>
            <div class="xq-p30">
                <div v-for="(item,i) in listData" :key="'jgszLeft' + i"
                :class="{'xq-mt15':i != 0}">
                    <a  href="javascript:;"
                    class="xq-link xq-t14 xq-pl10 xq-leftNav__item "
                    @click="onActive(item.path,i,'',item.children?1:0)"
                    :class="{'xq-leftNav__item--active':(i + '-') == active}"
                    >
                        <span>{{item.name}}</span>
                    </a>
                    <ul v-if="item.children">
                        <li v-for="(item2,i2) in item.children" :key="'children' + i2" class="xq-mt15">
                            <a href="javascript:;" class="xq-link xq-t12 xq-leftNav__item xq-pl20"
                            :class="{'xq-leftNav__item--active':active == (i + '-' + i2)}"
                            @click="onActive(item2.path,i,i2,0)">
                                {{item2.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // type 1为常规样式, 2位融资特定样式
    props:['listData','title','getActive','type'],
    data(){
        return{
            active:'0-'
        }
    },
    methods:{
        onActive(link,i,i2,isChildren){
            //onsole.log(isChildren)
            // 如果有子集,就不能点击
            if(isChildren){

            }else{
                this.active = i + '-' + i2;
                this.$router.push({path:link})
            }   
        },

    },
    created(){
        if(this.getActive){
            this.active =  this.getActive
        }
    },
    watch:{
        // getActive(val){
         //onsole.log('触发')
        //     this.active = val;
        // }
    }
}
</script>

<style lang="less">
    @import "../assets/css/xq_style/style.less";
    @import "../assets/css/xq_style/base.less";
    .xq-leftNav__item-aux{
        text-align: center;
        color: #999;
    }
    .xq-leftNav__item--active{
        color: #fff;
    }
</style>