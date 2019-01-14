<template>
    <div class="banner_index">
        <div style="position: relative;height: 500px;overflow: hidden;">
            <!-- <swiper :options="swiperOption2" ref="swiper_banner">
                <swiper-slide v-for="item in bannerDisList" :key="item.id">
                    <div class="banner_bg" :style="'background-image:url('+item+')'"></div>
                </swiper-slide>
            </swiper>
             -->
            <el-carousel indicator-position="none" height="500px">
                <el-carousel-item v-for="item in bannerDisList" :key="item.id">
                    <div class="banner_bg" :style="'background-image:url('+item.img_url+')'" @click="swiperLink(item,index)"></div>
                </el-carousel-item>
            </el-carousel>
            <div class="swiper-button-next2" tabindex="0" role="button" aria-label="Next slide"></div>
            <div class="swiper-button-prev2" tabindex="0" role="button" aria-label="Previous slide"></div>
            <div class='swiper-pagination'></div>
        </div>

        <div class="indexSeach">
            <el-input placeholder="请输入搜索关键词" v-model="indexSeachKW">
                <el-select
                    v-model="typeselect"
                    slot="prepend"
                    placeholder="请选择"
                    class="typecon"
                    @change="getListInfoTags"
                >
                    <el-option label="活动" value="park_activity"></el-option>
                    <el-option label="惠政" value="park_gover" v-if="!isBdPark"></el-option>
                    <el-option label="资讯" value="park_information" v-if="!isBdPark"></el-option>
                </el-select>

                <el-button class slot="append" icon="el-icon-search" @click="goSearchPage()">中心内搜索</el-button>
            </el-input>
            <div class="local esspclearfix">
        <span
            v-for="(item,index) in sometags"
            :key="index"
            v-if="index<5"
            @click="clickTag(item,index)"
            :class="{'sel':currentIndex===index}"
        >{{item}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import "swiper/dist/css/swiper.css"; ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    export default {
        components: {
            swiper, swiperSlide
        },
        props: {
            bannerDisList: {
                type: Array,
                default: [
                    "http://128.196.235.129:8080/essp/upload/manageModuleOne/park/20181215/1134e16b-f453-42ab-b970-5d6f7bd9ef10.jpg",
                    "http://128.196.235.129:8080/essp/upload/manageModuleOne/park/20181215/1134e16b-f453-42ab-b970-5d6f7bd9ef10.jpg"
                ]
            }
        },
        data() {
            return {
                isBdPark: this.utils.isBdPark(),
                currentIndex: "",
                sometags: [],
                typeselect: "park_activity",
                tagTxt: "",
                swiperOption2: {
                    // banner轮播
                    nitialSlide: 0, //设定初始化时slide的索引
                    notNextTick: true,
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    autoplay: {autoplay: 3000},
                    pagination:'.swiper-pagination',
                    navigation: {
                        nextEl: ".swiper-button-next2", //前进按钮的css选择器或HTML元素。
                        prevEl: ".swiper-button-prev2" //后退按钮的css选择器或HTML元素。
                    },
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    pagination: {
                        el: '.swiper-pagination',
                        // type: 'bullets',
                        //type: 'fraction',
                        type : 'progressbar',
                        //type : 'custom',
                        progressbarOpposite: false, //使进度条分页器与Swiper的direction参数相反
                        bulletElement : 'li', //设定分页器指示器（小点）的HTML标签。
                        dynamicBullets: true,  //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
                        dynamicMainBullets: 2, //动态分页器的主指示点的数量
                        hideOnClick: true, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
                        clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。

                    },
                },
            }
        },
        methods: {
            // banner图跳转方法
            swiperLink(item,index){
                if(item.link_url == "") {
                    return;
                }
                window.location.href=item.link_url;
            },
            goSearchPage() {
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
            },
            clickTag(item, index) {
                this.tagTxt = item;
                this.currentIndex = index;
                this.goSearchPage();
            },
            //获取热门标签
            getListInfoTags() {
                var url = this.$apiUrl.parkInfo.getListTags;
                var parkId = sessionStorage.getItem("parkId") || "";
                var tagTpObj = {
                    park_activity: "3000002", //活动标签
                    park_gover: "3000004", //惠政标签
                    park_information: "3000003" //资讯标签
                };
                var tagTp = tagTpObj[this.typeselect]
                    ? tagTpObj[this.typeselect]
                    : "3000003";
                this.$post(url, {
                    tagTp: tagTp,
                    parkId: parkId
                }).then(
                    response => {
                        var codestatus = response.resultCode;
                        if (codestatus == "CLT000000000") {
                            var data = response.resultData;
                            this.tagItems = data;
                            this.resometags(data);
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    },
                    err => {
                        this.$message.error("接口异常");
                    }
                );
            },
            //获取列表的标签
            resometags(data) {
                this.sometags = [];
                if (data && data.length) {
                    this.sometags = data.map((item, index) => {
                        return item.tagTxt;
                    });
                }
            },

        },
        created() {
            this.getListInfoTags();
        },
        watch: {
            bannerDisList: function (val) {
                console.log(val, this.$refs);
            }
        },
        computed: {}
    };
</script>
<style>
    .banner_index .indexSeach .el-input-group__append {
        border-color:  #00a0e9;
        background: #00a0e9;
        -webkit-border-radius: 0 4px 4px 0;
        -moz-border-radius:  0 4px 4px 0;
        border-radius:  0 4px 4px 0;
        overflow: hidden;
    }
    .banner_index .indexSeach .el-input-group__append button {
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
    }
    .banner_index .indexSeach .el-input__inner{
        height: 50px;
        line-height: 50px;
    }
    .banner_index .indexSeach .el-input-group__prepend{
        background: #fff;
    }
</style>
<style lang="less" scoped>
    @import "../../../assets/css/mixin";

    // .indexSeach .el-input-group__append button {
    //     margin: -10px -21px;
    // }

    // .typecon .el-input:after {
    //     content: " ";
    //     position: absolute;
    //     right: 0;
    //     top: 27%;
    //     width: 1px;
    //     height: 20px;
    //     background: #ccc;
    // }

    // .indexSeach .el-input__inner {
    //     border: none;
    // }
    .banner_index {
        position: relative;
        height: 500px;
        overflow: hidden;
        .banner_bg {
            .bgSize(cover);
            width: 100%;
            height: 500px;
            background-position: center;
            background-repeat: no-repeat;
            overflow: hidden;
        }
        .indexSeach {
            position: absolute;
            left: 50%;
            top: 40px;
            padding: 12px 20px 0;
            background-color: rgba(51, 51, 51, 0.7);
            margin-left: -450px;
            width: 860px;
            z-index: 10;
            .typecon {
                //被傻逼全局污染了 只能打补丁了
                width: 80px;
                font-size: 16px;
            }

            .el-input-group__append button.el-button {
                background-color: @essp_nav_bg;
                // border: 1px solid @essp_nav_bg;
                color: #fff;
               //.esspborder-radius(0);
                width: 118px;
                padding-left: 0;
                padding-right: 0;
            }
            .esspborder-radius(12px);
            .local {
                /*padding: 10px;*/
                padding-top: 5px;
                padding-bottom: 2px;
                height: 20px;
                span {
                    float: left;
                    height: 20px;
                    line-height: 20px;
                    color: #fff;
                    font-size: 12px;
                    margin-right: 10px;
                    cursor: pointer;
                }
                .sel {
                    color: @essp_nav_bg;
                }
            }
        }
    }

    .indexSeach .el-input-group__append, .el-input-group__prepend {
        border: none !important;
    }
</style>
