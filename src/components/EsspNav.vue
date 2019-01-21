<template>
    <div class="essp-cont">
        <div class="essp-nav">
            <ul class="esspclearfix">
                <li v-for="(item,index) in headMenu"
                    :key="index">
                    <span :class="item.id == active?'span-link':'span-none'"
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
                headMenu: [],
            };
        },
        watch: {
            $route() {
                //路由变化获取最新选择的园区
                this.getNavIndex();
            },

        },
        created() {
            this.getNavIndex();
        },
        methods: {
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
