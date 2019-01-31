<template>
    <!-- 更多资讯的更多模块 -->
    <div>
        <div class="title_home_btn">        
            <div class="title_type_btn" :class="{sel:newsTabIndex==0}" @click="newTitleTab(0)" >最新</div> 
            <div class="title_type_btn" :class="{sel:newsTabIndex==1}" @click="newTitleTab(1)" >最热</div>
        </div>
        <div class="more_newscon esspclearfix" v-if="moreNewDates.length>0">
            <div class="newslastest" v-if="newsTabIndex==0">
                <div class="newslist left_side">
                    <div class="newsitem" @click="goinfoDetail(item)" v-for="(item,index) in moreNewDates" :key="index" v-if="index<3">
                        <img class="newsimg" :src="item.titleImg" :alt="item.informationTitle">
                        <div class="newinfo">
                            <div class="img_tips">
                                <div class="tip_tit">{{item.informationTitle}}</div>
                                <div class="tip_time">{{item.createTime | timerFormat(item.createTime)}}</div>
                            </div>
                            <div class="newsdetail">
                                <p>{{item.infoDetail}}fasdf阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发双方都盎司，大是大非，阿斯蒂芬，阿斯蒂芬，阿斯蒂芬，手动阀问问，人情味，二，去玩儿，千万人群翁，认为，人，去玩儿，玩儿，我去二，玩儿，去玩儿玩儿群，问问， 去玩儿，人情味</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="newslist right_side">
                    <div class="newsitem" @click="goinfoDetail(item)" v-for="(item,index) in moreNewDates" :key="index" v-if="index<6&&index>=3">
                        <img class="newsimg" :src="item.titleImg" :alt="item.informationTitle">
                        <div class="newinfo">                         
                            <div class="img_tips">
                                <div class="tip_tit">{{item.informationTitle}}</div>
                                <div class="tip_time">{{item.createTime | timerFormat(item.createTime)}}</div>
                            </div>
                            <div class="newsdetail">
                                <p>{{item.infoDetail}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="newslastest" v-if="newsTabIndex==1">
                <div class="newslist left_side">
                    <div class="newsitem" @click="goinfoDetail(its)" v-for="(its,index) in hotNewDates" :key="index" v-if="index<3">
                        <img class="newsimg" :src="its.titleImg" :alt="its.informationTitle">
                        <div class="newinfo">                                
                            <div class="img_tips">
                                <div class="tip_tit">{{its.informationTitle}}</div>
                                <div class="tip_time">{{its.createTime | timerFormat(its.createTime)}}</div>
                            </div>
                            <div class="newsdetail">
                                <p>{{its.infoDetail}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="newslist right_side">
                    <div class="newsitem" @click="goinfoDetail(its)" v-for="(its,index) in hotNewDates" :key="index" v-if="index<6&&index>=3">
                        <img class="newsimg" :src="its.titleImg" :alt="its.informationTitle">
                        <div class="newinfo">
                            <div class="img_tips">
                                <div class="tip_tit">{{its.informationTitle}}</div>
                                <div class="tip_time">{{its.createTime | timerFormat(its.createTime)}}</div>
                            </div>
                            <div class="newsdetail">
                                <p>{{its.infoDetail}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link to="/parkIndex/parkInformation/all" class="entermore">More ></router-link>
        </div>
        <!-- <div v-else style="text-align:center;color:#999; padding:20px 0">暂无数据</div> -->
        <essp-loading v-else :nodata="true"></essp-loading>
    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        data() {
            return {
                informationId: "",//点击要排除的资讯id
                moreNewDates: [],
                hotNewDates:[],
                newsTabIndex:0
            }
        },
        props:['tabType'],
        created() {
            this.getHotInfoList();
        },

        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        methods: {
            newTitleTab(type) {
              this.newsTabIndex = type;
            },
            //获取热门资讯
            getHotInfoList() {
                let that = this,
                    url = this.$apiUrl.parkInfo.hotListInfo,
                    pop = {
                        pageNum: 0,
                        pageSize: 10,
                        type: "2",
                        parkId: window.sessionStorage.getItem("parkId"),
                        informationId: this.informationId
                    };
                this.$post(url, pop)
                    .then((response) => {
                        let codestatus = response.resultCode;
                        if (codestatus == "CLT000000000") {
                            let data = response.resultData;
                            that.moreNewDates = data.newest
                            that.hotNewDates = data.hot
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    }, (err) => {
                        this.$message.error("接口异常");
                    })
            },
            goinfoDetail(item) {
                this.informationId = item.informationId;
                this.getHotInfoList();
                this.$router.push({path: '/parkIndex/infoDetail', query: {informationId: this.informationId}})
            },

        }

    }
</script>

<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .title_home_btn {
        float: right;
        line-height: 63px; 
        /*position: relative;
        top: -16px;*/
        margin-top:-16px;
        width:110px;
        height: 35px;
        border-radius:3px;
        border:1px solid #e1e1e1;
        .title_type_btn{
            float:left;
            font-size: 16px;
            width: 55px;
            height: 35px;
            line-height: 33px;
            text-align: center;
            cursor:pointer;
            background-color:#e1e1e1;
            color:#aaa;
        }
        .title_type_btn:hover,
        .title_type_btn.sel {
            color: @essp_nav_bg;
            background-color:#f3f3f3;
        }
    }
    .newslastest{
        height: 440px;
        .newslist{
          float:left;
          width:580px;
          height: 440px;
          box-shadow: 0px 0px 19px 1px 
            rgba(0, 0, 0, 0.08);
          border-radius: 6px;
        }
        .left_side{
          margin-right: 20px;
        }
    }
    //更多的样式
    .entermore{
        float: right;
        margin:0 auto;
        text-align: right;
        line-height: 50px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
    } 
    .more_newscon {
        padding: 40px 0 10px;
    }

    .newsitem {
        padding:20px 20px 0;
        height: 120px;
        .newsimg{
            float: left;
            width:210px;
            height: 120px;
            margin-right: 20px;
            border-radius:6px;
        }
        .newinfo{

            width: 310px;
            float: left;    
            .img_tips {
                font-size: 12px;
                height: 50px;
                line-height: 50px;
                border-bottom:1px solid #ccc;
                transition:all 2s;
                .esspopacity(0.6);
                cursor: pointer;
                &:hover{
                    .esspopacity(0.8);
                }
                .tip_tit {
                    float: left;
                    font-size: 16px;
                    width:210px;
                    color:#333;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:1;
                }
                .tip_time {
                    float: right;
                    font-size: 14px;
                }

            }
            .newsdetail{
                height: 60px;
                p{
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    font-size: 14px;
                    line-height:30px;
                    color:#999;
                    padding-top: 5px;
                }
            }
        }
    }

</style>
