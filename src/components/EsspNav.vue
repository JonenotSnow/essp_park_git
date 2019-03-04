<template>
    <div class="essp-cont" id="essp-nav">
        <div class="essp-nav">
            <ul class="esspclearfix">
                <li v-for="(item,index) in headMenu"
                    :key="index">
                    <span :class="item.id == active?'span-link':'span-none'"
                          @click="toLink(item,index)"><span style="font-size: 18px;">{{item.menu}}</span></span>
                </li>
            </ul>
        </div>
        <div class="search" v-if="!isBdPark">
            <i class="el-icon-search open" v-if="!tab" @click="changeTab"></i>
            <div v-else>
                <div class="searchBox">
                    <span class="left" slot="reference" @click="show = !show">{{typeName}}<i class="el-icon-arrow-down" :class="{'iActive':show}"></i></span>
                    <input type="text" placeholder="请输入搜索关键字" v-model="indexSeachKW">
                    <i class="el-icon-search" @click="goSearchPage"></i>
                </div>
                <transition name="el-zoom-in-top">
                    <div class="pop" v-if="show">
                        <ul v-for="(item,i) in searchList" :key="i">
                            <li @click.self="getListInfoTags(item)">{{item.name}}</li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ["routerType"],
        data() {
            return {
                //游客默认导航
                defaultNav:[],
                active: '',
                headMenu: [],
                typeselect: "park_activity",
                typeName: "活动",
                show:false,
                searchList:[
                    {
                        name:'活动',
                        id:'park_activity'
                    },
                    {
                        name:'惠政',
                        id:'park_gover'
                    },
                    {
                        name:'资讯',
                        id:'park_information'
                    }
                ],
                indexSeachKW:'',//搜索框内容
                isBdPark: this.utils.isBdPark(),
            };
        },
        watch: {
            $route() {
                //路由变化获取最新选择的园区
                this.getNavIndex();
            }
        },
        created() {
            this.getNavIndex();
        },
        mounted () { 
            this.ready();
        },
        computed: {
            tab(){
                return this.$store.state.park.searchState;
            }
        },
        methods: {
            changeTab(){
                this.$store.commit('getSearchState',{show:!this.tab})
            },
            ready() {
                document.addEventListener('click', (e) => {
                    if (e.path[0].className == 'el-icon-arrow-down' || e.path[0].className == 'left') {
                        this.show = true
                    }else{
                        this.show = false
                    }
                })
            },
            getNavIndex(){
                // 直接从本地获取菜单权限
                let name = this.$router.currentRoute.name;
                let menuList = this.SSH.getItem("menuList");
                this.headMenu = (menuList && menuList.children) || [];
                let menuResource = this.SSH.getItem("menuResource");
                let currentMenu = menuResource[name];
                if (currentMenu) {
                    this.active = currentMenu.menuid.substr(0, 4);
                }
            },
            toLink(item,index) {
                this.$router.push({
                    name: item.name
                })
            },
            getListInfoTags(item){
                this.typeselect = item.id;
                this.typeName = item.name;
                this.show = false;
            },
            goSearchPage() {
                //重新打开页面打开
                // var type = this.typeselect; //类型
                // var tagTxt = this.tagTxt; //标签内容
                // var title = this.indexSeachKW;
                // let routeData = this.$router.resolve({
                //     name: "detail",
                //     query: {type, tagTxt, title}
                // });
                // window.open(routeData.href, '_blank');
                
                this.$store.commit('getSearchState',{show:!this.tab})
                let _this = this;
                var type = this.typeselect; //类型
                var tagTxt = this.tagTxt; //标签内容
                var title = this.indexSeachKW;
                setTimeout(() => {
                    _this.$router.push({
                        path: "/parkSearch",
                        query: {type, tagTxt, title}
                    });
                }, 1000);
                this.indexSeachKW = '';
                this.typeselect = 'park_activity'
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../assets/css/mixin";
    .essp-cont {
        width: 100%;
        // overflow: hidden;
        clear: both;
        overflow: hidden;
        .essp-nav {
            margin: 0 auto;
            float: left;
            ul {
                // width: 1000px;
                width:auto;
            }
            li {
                float: left;
                height: 38px;
                line-height: 38px;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                cursor: pointer;
                margin-right: 18px;
                color: @essp_nav_color;
                &:hover {
                    color: @essp_nav_selcolor;
                }
                a {
                    display: block;
                    height: 100%;
                    padding: 0 15px;
                    color: @essp_nav_color;
                }
                .router-link-active {
                    color: @essp_nav_selcolor;
                }
            }
            .sel {
                color: @essp_nav_selcolor;
            }
        }
    }
    .el-dropdown-link {
        color: @essp_nav_selcolor;
        cursor: pointer;
    }
    .el-dropdown-none {
        outline: none;
        &:hover {
            color: @essp_nav_selcolor;
        }
    }
    .span-link {
        color: @essp_nav_selcolor;
        cursor: pointer;
    }
    .span-none {
        outline: none;
        color: #333;
        &:hover {
            color: @essp_nav_selcolor;
        }
    }
    .essp_left_background {
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 100%;
        background-color: #00a0e9;
    }
    .essp_float_left {
        float: left;
    }
    .page-header span,
    .el-dropdown span {
        outline: none;
    }
    .displayNone {
        display: none;
    }
    .displayBlock {
        display: block;
    }
    .search{
        float: left;
        width: 290px;
        position: relative;
        top:3px;
    }
    .open{
        color:#00a0e9;
        position: absolute;
        top:6px;
        font-size: 18px;
        left: 15px;
        cursor: pointer;
    }
    .searchBox{
        width: 210px;
        height: 30px;
        padding: 0 10px;
        line-height:30px;
        background-color: #f8f8f8;
        border-radius: 15px;
        position: relative;
        top: 2px;
        left: 40px;
        .left{
            cursor: pointer;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1.2px;
            color: #666666;
            border-right:1px solid #ccc;
            i{
                padding:0 9px;
                transform: rotate(0deg);
            }
            .iActive{
                transform: rotate(180deg)
            }
        }
        input{
            border:none;
            outline: none;
            height:30px;
            background:#f8f8f8;
            width:115px;
            padding:0 5px;
        }
        &>i{
            cursor: pointer;
        }
        
    }
    .pop{
        position: absolute;
        top: 38px;
        left: 48px;
        z-index: 101;
        border-radius:4px;
        background: #fff;
        box-shadow: 0 0 5px #ddd;
        ul{
            width:60px;
            li{
                height:30px;
                line-height:30px;
                color: #333;
                text-align: center;
                cursor: pointer;
            }
        }
    }
</style>