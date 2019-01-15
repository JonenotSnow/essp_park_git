<template>
    <div class="essp-cont">
        <div class="essp-nav">
            <ul class="esspclearfix">
                <li v-for="(item,index) in headMenu"
                    :key="index">
                    <span :class="index == active?'span-link':'span-none'"
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
        data() {
            return {
                //游客默认导航
                defaultNav:[],
                active: sessionStorage.getItem('navIndex')||0,
                headMenu: []
            };
        },
        watch: {
            $route() {
                //路由变化获取最新选择的园区
                var menuList = this.SSH.getItem("menuList");
                this.headMenu = (menuList && menuList.children) ||[];
            }
        },
        created() {
            // 直接从本地获取菜单权限
            var menuList = this.SSH.getItem("menuList");
            this.headMenu = (menuList && menuList.children) || [];
            var routerName = this.$route.name;
            var munuLen = this.headMenu.length;
            //定位当前激活的横向导航并存值对应的sessionStorage
            // 左侧一级导航的判断
            for(var i = 0 ;i < munuLen; i++ ){
                // 判断菜单地下是否有存在子菜单，需要循环判断子菜单里的name
                var menuChildLen = this.headMenu[i].children && this.headMenu[i].children.length;
                // 左侧二级导航的判断
                if(menuChildLen > 0) {
                    for(var j = 0; j < menuChildLen; j ++) {
                        var menuChild = this.headMenu[i].children[j];
                        var menuChildChildLen = menuChild.length;
                        // 左侧三级导航的时候判断
                        if(menuChildChildLen > 0) {
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
