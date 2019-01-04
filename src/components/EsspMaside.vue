<template>
    <div class="essp-aside-cont">
        <div class="cont-nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>需求管理</el-breadcrumb-item>
       </el-breadcrumb>
       </div>
        <div class="cont-head">
            {{title}}
        </div>
        <div class="cont-body">
            <ul>
                <li v-for="(item, index) in mactiveList" :key="index">
                    <router-link :to="item.path">
                        <span class="li-tag"></span>{{item.name}}

                    </router-link>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EsspMaside',
        props: {
            title: {
                type: String,
                default: ''
            },
            mactiveList: {
                type: Array,
                default: []
            }
        },
        components: {},
        data() {
            return {
                active: 0,
                msg: 'EsspMaside',
                icon: 'ic'
            }
        },
        created(){
            this.active = this.$route.meta.index;
        },
        methods: {
            toLink(item,index) {
                //onsole.log(item.path);
                this.$router.push(item.path);
                this.active = index;
                //onsole.log(index);
            }
        }
    }
</script>
<style lang="less">
    .cont-nav{
        height: 30px;
        padding-top: 15px;
    }
    .essp-aside-cont{
        height:100%;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        .cont-head{
            width: 100%;
            height:50px;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            color:#000;
            background-color: #00a0e9;
        }
        .cont-body{
            margin-top: 10px;
            ul{
                li {
                    position: relative;
                    width: 100%;
                    height:50px;
                    line-height: 50px;
                    font-size: 15px;
                    color: #666;
                    text-align: center;

                    a.sel, .router-link-active{
                        display: block;
                        position: relative;
                        width: 100%;
                        height:100%;
                        font-size: 15px;
                        color: #62b1f6;
                        background-color: #f5f5f5;
                        cursor: pointer;
                        .li-tag{
                            position: absolute;
                            top: 0;
                            left:0;
                            width: 10px;
                            height:100%;
                            background-color: #00a0e9;
                        }
                    }
                }
            }
        }
    }
</style>
