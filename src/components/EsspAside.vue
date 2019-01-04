<template>
    <div class="essp-aside-cont">
        <div class="cont-body">
            <div class='aside'>
                <p class="tTitle">{{title}}</p>
                <ul class="fNav">
                    <!-- 风格1 适合活动，资讯，惠政 没有二级导航的 -->
                    <li v-for="(item, index) in asideList" v-if="whichStyle=='huodongStyle'"
                        class="huodongStyle"
                        :key="index">
                        <router-link :to="{name:item.name}"
                                     tag='p'>
                            <span class="li-tag"></span>{{item.menu}}
                        </router-link>
                    </li>
                    <!-- 风格2 适合管理模块 多子菜单的 -->
                    <li v-for="(it,i) in asideList" :key="i" v-if="whichStyle=='guanliStyle'" class="guanliStyle">
                        <p @click="togglechildren(it)" class="someli-p">{{it.menu}}</p>
                        <ul v-if="it.children && it.children.length>0" class="someli-ul">
                            <!-- 做一个判断如果有路径显示 如果没有不显示，做权限控制 -->
                            <li @click="ziXunLinkto({faterindex:i,childrenindex:j,item:is})" v-if="is.isshow"
                                v-for="(is,j) in it.children" :key="j"
                                :class="j==active.childrenindex&&i==active.faterindex?'span-link':''">{{is.menu}}
                            </li>
                        </ul>
                    </li>
                    <!-- 风格3 通知公告模块 多子菜单的 -->
                    <li v-for="(it,i) in asideList" :key="i" v-if="whichStyle=='zixunStyle'" class="zixunStyle">
                        <p @click="togglechildren(it)" class="someli-p">{{it.menu}}</p>
                        <ul v-if="it.children && it.children.length>0" class="someli-ul">
                            <li @click="ziXunLinkto({faterindex:i,childrenindex:j,item:is})" v-if="is.isshow"
                                v-for="(is,j) in it.children" :key="j"
                                :class="j==active.childrenindex&&i==active.faterindex?'span-link':''">{{is.menu}}
                            </li>
                        </ul>
                    </li>
                    <!-- 风格4 科技政策模块 多子菜单的 -->
                    <li v-for="(it,i) in asideList" :key="i" v-if="whichStyle=='sciStyle'" class="sciStyle">
                        <p @click="togglechildren(it)" class="someli-p">{{it.menu}}</p>
                        <ul v-if="it.children && it.children.length>0" class="someli-ul">
                            <li @click="ziXunLinkto({faterindex:i,childrenindex:j,item:is})" v-if="is.isshow"
                                v-for="(is,j) in it.children" :key="j"
                                :class="j==active.childrenindex&&i==active.faterindex?'span-link':''">{{is.menu}}
                            </li>
                        </ul>
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
                active: {faterindex: 0, childrenindex: 0},
                title: "",
                asideList: [],
                routerName: this.$route.name
            };
        },

        created() {
            this.getRouteInfo();

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
            getRouteInfo() {
                var navIndex = sessionStorage.getItem("navIndex");
                var menuList = JSON.parse(sessionStorage.getItem("menuList"));
                this.asideList = menuList.children[navIndex].children;
                this.title = menuList.children[navIndex].menu;
            },
            getParentId() {

            },
            //适用于资讯通告,科技政策的菜单切换
            ziXunLinkto(options) {
                var name = options.item.name;
                this.active = {faterindex: options.faterindex, childrenindex: options.childrenindex}
                this.$router.push({name: name})
            }
        },
        watch: {
            $route() {
                console.log(this.whichStyle)
                this.routerName = this.$route.name;
                this.getRouteInfo();
            }
        },
        computed: {
            whichStyle() {
                console.log(this.$route.name)
                return leftNavStyleSetting[this.routerName] || "huodongStyle"
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
        border: 1px solid #e5e5e5;
        .cont-body {
            margin-top: 0px;
            .aside {
                .tTitle {
                    height: 50px;
                    font-size: 18px;
                    line-height: 50px;
                    text-align: left;
                    padding-left: 25px;
                    color: #fff;
                    background: linear-gradient(#1598ff 0%, #36bffd 100%);
                }
                .fNav {
                    background: #fff;
                    overflow: hidden;
                    padding-bottom: 20px;
                    //资讯的
                    .zixunStyle {
                        line-height: 30px;
                        text-align: left;
                        height: auto;
                        font-size: 14px;
                        color: #666;
                        cursor: pointer;
                        margin: 0 16px;
                        .someli-p {
                            margin: 20px 0 10px;
                            text-indent: 9px;
                            font-size: 14px;

                        }
                        .someli-ul {
                            li {
                                text-align: left;
                                font-size: 12px;
                                color: #999;
                                cursor: pointer;
                                text-indent: 18px;
                                margin: 0 9px;
                                &.span-link {
                                    background-color: #409eff;
                                    background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%), linear-gradient(#00a0e9, #00a0e9);
                                    border-radius: 3px;
                                    color: #fff;
                                    position: relative;
                                    &:after {
                                        position: absolute;
                                        content: " ";
                                        right: 20px;
                                        top: 10px;
                                        width: 0;
                                        height: 0;
                                        border-top: 5px solid transparent;
                                        border-bottom: 5px solid transparent;
                                        border-left: 5px solid #fff;
                                    }
                                }
                            }
                        }
                    }
                    //活动的
                    .huodongStyle {
                        position: relative;
                        font-size: 14px;
                        color: #666;
                        margin: 10px 0;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        cursor: pointer;
                        p {
                            border-left: 4px solid #fff;
                            &.router-link-active {
                                border-left: 4px solid #22a2fa;
                                color: #22a2fa;
                            }
                        }
                    }
                    //科技的
                    .sciStyle {
                        line-height: 30px;
                        text-align: left;
                        height: auto;
                        font-size: 14px;
                        color: #666;
                        cursor: pointer;
                        margin: 0 16px;
                        .someli-p {
                            margin: 20px 0 10px;
                            text-indent: 9px;
                            font-size: 14px;

                        }
                        .someli-ul {
                            li {
                                text-align: left;
                                font-size: 12px;
                                color: #999;
                                cursor: pointer;
                                text-indent: 18px;
                                margin: 0 9px;
                                &.span-link {
                                    background-color: #409eff;
                                    background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%), linear-gradient(#00a0e9, #00a0e9);
                                    border-radius: 3px;
                                    color: #fff;
                                    position: relative;
                                    &:after {
                                        position: absolute;
                                        content: " ";
                                        right: 20px;
                                        top: 10px;
                                        width: 0;
                                        height: 0;
                                        border-top: 5px solid transparent;
                                        border-bottom: 5px solid transparent;
                                        border-left: 5px solid #fff;
                                    }
                                }
                            }
                        }
                    }
                    //管理的
                    .guanliStyle {
                        line-height: 30px;
                        text-align: left;
                        height: auto;
                        font-size: 14px;
                        color: #666;
                        cursor: pointer;
                        margin: 0 16px;
                        .someli-p {
                            margin: 20px 0 10px;
                            text-indent: 9px;
                            font-size: 14px;

                        }
                        .someli-ul {
                            li {
                                text-align: left;
                                font-size: 12px;
                                color: #999;
                                cursor: pointer;
                                text-indent: 18px;
                                margin: 0 9px;
                                &.span-link {
                                    background-color: #409eff;
                                    background-image: linear-gradient(21deg, #22a2fa 0%, #10b5ff 100%), linear-gradient(#00a0e9, #00a0e9);
                                    border-radius: 3px;
                                    color: #fff;
                                    position: relative;
                                    &:after {
                                        position: absolute;
                                        content: " ";
                                        right: 20px;
                                        top: 10px;
                                        width: 0;
                                        height: 0;
                                        border-top: 5px solid transparent;
                                        border-bottom: 5px solid transparent;
                                        border-left: 5px solid #fff;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }


</style>
