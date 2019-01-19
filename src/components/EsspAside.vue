<template>
    <div class="essp-aside-cont">
        <div class="cont-body">
            <div class='aside'>
                <p class="tTitle">{{title}}</p>
                <ul class="fNav" v-if="asideList && asideList.length>0">
                    <li v-for="(it, index) in asideList" :key="index" :class="noChildMenu?'guanliStyle':'huodongStyle'">
                        <!-- 多层子菜单 -->
                        <div v-if="noChildMenu">
                            <p @click="togglechildren(it)" class="someli-p">{{it.menu}}</p>
                            <ul v-if="it.children && it.children.length>0" class="someli-ul">
                                <li @click="linkto(it,is)" v-if="is.isshow" v-for="(is,j) in it.children" :key="j"
                                    :class="routerName == is.name?'span-link':''">{{is.menu}}
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
                active: {
                    //999999999为了防冲突
                    faterindex: '99999999999',
                    childrenindex: '9999999999999'
                },
                title: "",
                asideList: [],
                // oldId:0,//横向导航切换时,左侧菜单第一个默认样式
                routerName: this.$route.name,
                //当前左侧菜单显示类型-多层子菜单 (保定园区-科技政策，资讯公告，系统管理，淮安园区-园区管理),
                curLeftClass:['0421','0424','0426','0405']
            };
        },

        created() {
            this.getRouteInfo();
        },
        methods: {
            togglechildren(it) {
                this.active.faterindex =  it.id;
                if (it.children && it.children.length) {
                    var children = it.children;
                    children.forEach(element => {
                        element.isshow = element.isshow == 1 ? 0 : 1
                    });
                }
            },
            //获取资源
            getRouteInfo() {
                // 主要是需要延迟跟导航顶部同时获取到数据
                setTimeout(()=>{
                    var navIndex = sessionStorage.getItem("navIndex");
                    console.log("导航索引项",navIndex);
                    var menuList = JSON.parse(sessionStorage.getItem("menuList"));
                    this.asideList = menuList.children[navIndex].children;
                    this.title = menuList.children[navIndex].menu;
                })

                // //此值变化，表示横向导航一切换，默认左侧第一个可点击菜单入口
                // this.oldId = this.asideList[0].id;
            },
            linkto(it,is) {
                console.log(it,is);
                this.active = {
                    faterindex: it.id,
                    childrenindex: is.id
                };
                this.$router.push({name: is.name})
            }
        },
        watch: {
            $route() {
                console.log(this.asideList)
                this.routerName = this.$route.name;
                this.getRouteInfo();
            },
            // oldId(){
            //     if (this.asideList && this.asideList.length>0) {
            //         if (this.asideList[0].children && this.asideList[0].children.length>0) {
            //             this.active = {
            //                 faterindex: this.asideList[0].id,
            //                 childrenindex: this.asideList[0].children[0].id
            //             };
            //         }
            //     }else{
            //         this.active = {
            //             faterindex: this.asideList[0].id,
            //             childrenindex: ''
            //         };
            //     }
            // }
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
