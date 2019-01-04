<template>
    <div class="essp-cont">
        <div class="essp-nav">
            <ul class="esspclearfix">
                <li v-for="(item,index) in headMenu"
                    :key="index">
                    <span :class="index ==active?'span-link':'span-none'"
                          @click="toLink(item,index)"><span style="font-size: 18px;">{{item.menu}}</span></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ["routerType"],
        // mixins: [baseLogin],
        data() {
            return {
                // version: '1221',
                //游客默认导航
                defaultNav:[
                    {authorityflag: "1",
                    cetificateflag: "0",
                    children: [],
                    enterpriseflag: "0",
                    id: "0400",
                    isclick: "1",
                    ismenu: "1",
                    isshow: "1",
                    loginflag: "0",
                    menu: "园区首页",
                    message: "园区功能正在内测中，敬请期待!",
                    name: "park-home",
                    parentId: "04"},
                    ],
                active: sessionStorage.getItem('navIndex')||0,
                LoginUserRol: '',
                headMenu: [],
                curParkId: sessionStorage.getItem("parkId") || "",
                myList: sessionStorage.getItem("myList") || []
            };
        },
        watch: {
            $route() {
                //路由变化获取最新选择的园区
                this.curParkId = sessionStorage.getItem("parkId");
                this.myList = sessionStorage.getItem("myList");
                var menuList = this.SSH.getItem("menuList");
                this.headMenu = (menuList && menuList.children) ||this.defaultNav;
            }
        },
        created: function () {
            // 直接从本地获取菜单权限
            var menuList = this.SSH.getItem("menuList");
            this.headMenu = (menuList && menuList.children) ||this.defaultNav;
            var routerName = this.$route.name;
            var munuLen = this.headMenu.length;
            // 左侧一级导航的判断
            for(var i = 0 ;i < munuLen; i++ ){
                // 判断菜单地下是否有存在子菜单，需要循环判断子菜单里的name
                var menuChildLen = this.headMenu[i].children && this.headMenu[i].children.length;
                if(menuChildLen > 0) {
                    // 左侧二级导航的判断
                    for(var j = 0; j < menuChildLen; j ++) {
                        var menuChild = this.headMenu[i].children[j];
                        var menuChildChildLen = menuChild.length;
                        if(menuChildChildLen > 0) {
                            // 左侧三级导航的时候判断
                            for(var z = 0; z < menuChildChildLen; z ++ ) {
                                var menuChildChild = menuChild.menuChild[z];
                                if(menuChildChild.name == routerName) {
                                    this.active = i;
                                    sessionStorage.setItem('navIndex',i); 
                                    break
                                }
                            }
                        } else {
                            if(menuChild.name == routerName) {
                                this.active = i;
                                sessionStorage.setItem('navIndex',i); 
                                break
                            }
                        }
                    }
                } else {
                    if(this.headMenu[i].name == routerName) {
                        this.active = i;
                        sessionStorage.setItem('navIndex',i); 
                        break
                    }
                }
            }
           
        },
        methods: {
            toLink(item,index) {
                this.active = index;
                sessionStorage.setItem('navIndex',index); 
                this.$router.push({
                    name: item.name
                })
            }
        }
    };
</script>

<style lang="less">
    @import "../assets/css/mixin";

    .essp-cont {
        width: 100%;
        .essp-nav {
            margin: 0 auto;
            ul {
                width: 1000px;
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
</style>
