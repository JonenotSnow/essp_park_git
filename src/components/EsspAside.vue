<template>
    <div class="essp-aside-cont">
        <div class="cont-body">
            <div class='aside'>
                <p class="tTitle">{{title}}</p>
                <ul class="fNav" v-if="asideList && asideList.length>0">
                    <li v-for="(it, i) in asideList" :key="i" :class="noChildMenu?'guanliStyle':'huodongStyle'">
                        <!-- 多层子菜单 -->
                        <div v-if="noChildMenu">
                            <!-- 多层菜单需要判断一下顶级目录是否需要加样式 'someli-active':'someli-p'-->
                            <p @click="togglechildren(it)" class="someli-p" :class="parentId == it.id?'someli-active':''">{{it.menu}}</p>
                            <ul v-if="it.children && it.children.length>0" class="someli-ul">
                                <li @click="linkto(it,is)" v-if="is.isshow" v-for="(is,j) in it.children" :key="j"
                                    :class="childId == is.id?'span-link':''">
                                    <span v-if="is.children.length > 0" v-for="(item,j) in is.children" :key="j">
                                         <span v-if="j == 0">{{is.menu}}</span>
                                    </span>
                                    <span v-if="is.children.length == 0">{{is.menu}}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- 无子菜单 -->
                        <div v-else>
                            <router-link :to="{name:it.name}" tag='p'>
                                <span class="li-tag"></span>{{it.menu}}
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    import {leftNavStyleSetting} from "@/util/leftNavStyleSetting";
    export default {
        name: "EsspAside",
        components: {},
        data() {
            return {
                title: "",
                asideList: [],
                childId:'',
                routerName: this.$route.name,
                //当前左侧菜单显示类型-多层子菜单 (保定园区-科技政策，资讯公告，系统管理，淮安园区-园区管理),
                curLeftClass:['0421','0424','0426','0405'],
                firstLevel:0,
                active:'',
                parentId:''
            };
        },
        created() {
            this.getLeftMenu();
        },
        methods: {
            togglechildren(it) {
                if (it.children && it.children.length) {
                    var children = it.children;
                    children.forEach(element => {
                        element.isshow = element.isshow == 1 ? 0 : 1
                    });
                }
            },
            getLeftMenu() {
                let name = this.$router.currentRoute.name;
                let menuList = this.SSH.getItem("menuList");
                let menuResource = this.SSH.getItem("menuResource");
                let currentMenu = menuResource[name];
                let tmp = [];
                this.asideList = [];
                //保持左侧入口样式
                this.parentId = currentMenu.menuid.toString().substr(0, 6);
                this.childId = currentMenu.menuid.toString().substr(0, 8);
                //获取当前横向导航索引
                let dir = currentMenu.menuid.substr(0, 4);
                if (menuList.children && menuList.children.length>0) {
                    for (let i = 0; i < menuList.children.length; i++) {
                        if (dir == menuList.children[i].id) {
                            this.firstLevel = i;
                        }
                    }
                }
                //当前横向导航下 菜单入口
                let child = menuList.children[this.firstLevel];
                if (child.children[0].id.length == 8) {//子菜单第一个id长度为8时(三级导航，如管理)
                    for (let i = 0;i < child.children.length;i++) {
                        tmp.push(child.children[i]);
                    }
                    this.title = child.menu;
                    this.asideList = tmp;
                } else if (child.children[0].id.length == 6) {//子菜单第一个id长度为6时(二级导航，如活动)
                    for (let i = 0;i < child.children.length;i++) {
                        tmp.push(child.children[i]);
                    }
                    this.title = child.menu;
                    this.asideList = tmp;
                }
            },
            linkto(it,is) {
                debugger;
                this.$router.push({name: is.name})
            }
        },
        watch: {
            $route() {
                this.routerName = this.$route.name;
                this.getLeftMenu();
            }
        },
        computed: {
            noChildMenu() {
                let curLeft = false;
                if (this.asideList && this.asideList.length>0) {
                    this.asideList.forEach((element,index) => {
                        if (this.curLeftClass.includes(element.id.slice(0,4))) {
                            curLeft = true;
                        }
                    });
                }
                return curLeft;
            }
        }
    };
</script>
<style lang="less" scoped>
    .essp-aside-cont {
        height: 100%;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        background: #fff;
        //border: 1px solid #e5e5e5;
        .cont-body {
            margin-top: 0px;
            .aside {
                .tTitle {
                    height: 120px;
                    font-size: 18px;
                    line-height: 120px;
                    text-align: center;
                    //padding-left: 25px;
                    color: #fff;
                    background: url("../assets/imgs/aside-bg.jpg") no-repeat 25% center,
                    linear-gradient(265deg, #1598ff 0%, #1b83f8 100%);
                }
                .fNav {
                    background: #fff;
                    overflow: hidden;
                    //padding-bottom: 20px;
                    //资讯的
                    .zixunStyle {
                        position: relative;
                        font-size: 16px;
                        color: #333;
                        height: auto;
                        line-height: 50px;
                        text-align: left;
                        cursor: pointer;
                        border-top: 1px solid #f5f5f5;
                        .someli-p {
                            //margin: 20px 0 10px;
                            //text-indent: 9px;
                            padding-left: 44px;
                            border-left: 6px solid #fff;
                        }
                        .someli-active{
                            padding-left: 44px;
                            border-left: 6px solid #1792fd;
                        }
                        .someli-ul {
                            li {
                                text-align: left;
                                font-size: 14px;
                                color: #999;
                                cursor: pointer;
                                padding-left: 44px;
                                border-left: 6px solid #fff;
                                &.span-link {
                                    color: #333;
                                }
                            }
                        }
                    }
                    //活动的
                    .huodongStyle {
                        position: relative;
                        font-size: 16px;
                        color: #333;
                        //margin: 10px 0;
                        height: 50px;
                        line-height: 50px;
                        text-align: left;
                        cursor: pointer;
                        border-top: 1px solid #f5f5f5;
                        p {
                            padding-left: 44px;
                            border-left: 6px solid #fff;
                            &.router-link-active {
                                border-left: 6px solid #1792fd;
                                //color: #22a2fa;
                            }
                        }
                    }
                    //科技的
                    .sciStyle {
                        position: relative;
                        font-size: 16px;
                        color: #333;
                        height: auto;
                        line-height: 50px;
                        text-align: left;
                        cursor: pointer;
                        border-top: 1px solid #f5f5f5;
                        .someli-p {
                            //margin: 20px 0 10px;
                            //text-indent: 9px;
                            padding-left: 44px;
                            border-left: 6px solid #fff;
                        }
                        .someli-active{
                            padding-left: 44px;
                            border-left: 6px solid #1792fd;
                        }
                        .someli-ul {
                            li {
                                text-align: left;
                                font-size: 14px;
                                color: #999;
                                cursor: pointer;
                                padding-left: 44px;
                                border-left: 6px solid #fff;
                                &.span-link {
                                    color: #333;
                                }
                            }
                        }
                    }
                    //管理的
                    .guanliStyle {
                        position: relative;
                        font-size: 16px;
                        color: #333;
                        height: auto;
                        line-height: 50px;
                        text-align: left;
                        cursor: pointer;
                        border-top: 1px solid #f5f5f5;
                        .someli-p {
                            //margin: 20px 0 10px;
                            //text-indent: 9px;
                            padding-left: 44px;
                            border-left: 6px solid #fff;
                        }
                        .someli-active{
                            padding-left: 44px;
                            border-left: 6px solid #1792fd;
                        }
                        .someli-ul {
                            li {
                                text-align: left;
                                font-size: 14px;
                                color: #999;
                                cursor: pointer;
                                padding-left: 44px;
                                border-left: 6px solid #fff;
                                &.span-link {
                                    color: #333;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
