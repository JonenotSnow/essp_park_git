<template>
    <div class="wrapper">
        <!-- 资讯公告模块 -->
        <div class="content">
            <div class="title">资讯公告</div>
            <div class="introduce">随时随地，一键了解中心动态</div>
            <div class="content">
                <div class="left-aside">
                    <div class="title-s">新闻动态</div>
                    <ul v-if="newsList.length > 0">
                        <li class="item" v-for="(item,index) in newsList" :key="index">
                            <div class="word-part" @click="goToNewsDetail(item)">
                                <div class="title-ss">{{item.informationTitle}}</div>
                                <div class="detail">{{(item.content && item.content.length>40)?item.content.slice(0,40)+'...':item.content}}</div>
                                <div class="part-b">
                                    <div class="label" v-if="item.tagsTxt && item.tagsTxt.length > 0"><span>{{item.tagsTxt.split(',')[0]}}</span></div>
                                    <div class="time">{{ item.createTime | timerFormat(item.createTime) }}</div>
                                </div>
                            </div>
                            <div class="img" :style="'background-image:url('+item.titleImg+')'"></div>
                        </li>
                    </ul>
                    <essp-loading :nodata="newsList.length==0" class="nothing"></essp-loading>
                    <div class="more" v-if="newsList.length>0" @click="linkToNewsListPage">More ></div>
                </div>
                <div class="right-aside">
                    <div class="title-s">通知公告</div>
                    <ul v-if="noticesList.length > 0">
                        <li v-for="(item,index) in noticesList" :key="index" @click="goToNoticeDetail(item)">
                            <div class="left-p">{{item.informationTitle}}</div>
                            <div class="time">{{ item.createTime | timerFormat(item.createTime) }}</div>
                        </li>
                    </ul>
                    <essp-loading :nodata="noticesList.length==0" class="nothing"></essp-loading>
                    <div class="more" v-if="noticesList.length>0" @click="linkToNoticeListPage">More></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Moment from "moment";
    export default {
        components:{
        },
        data(){
            return {
                list: [{title: "标题"}],
                imgUrl: require('../../../assets/actlogo.png'),
                newsList:[],
                noticesList:[]
            }
        },
        created(){
            this.getNewsList(1)
            this.getNewsList(2)
        },
        methods:{
            getNewsList(type){
                let parkId =  sessionStorage.getItem("parkId") || "";
                this.$post('/information/getAllInformation',{
                    endDate: "",
                    pageNum: 1,
                    pageSize: type==1?2:8,
                    parkId: parkId,
                    startDate: "",
                    title: "",
                    type: type
                }).then((result) => {
                    if(type == 1){
                        this.newsList = result.resultData.informationList;//新闻数据源
                    }else if(type == 2){
                        this.noticesList = result.resultData.informationList;//通告数据源
                    }
                    console.log( this.newsList);
                }).catch((err) => {
                    this.$message.error("接口异常");
                });
            },
            linkToNoticeListPage() {
                this.$router.push("/news/notice");
            },
            linkToNewsListPage() {
                this.$router.push("/news/alllistnews");
            },
            goToNewsDetail(item){
                this.$router.push({path: "/news/newsdetail",query: {informationId: item.informationId}});
            },
            goToNoticeDetail(item){
                this.$router.push({path: "/news/noticedetail",query: {informationId: item.informationId}});
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        }
    };
</script>
<style lang="less" scoped>
    .wrapper {
        width: 100%;
        height: 570px;
        background-color: #f5f5f5;
        .content {
            width: 1200px;
            margin: 0 auto;
            .title {
                font-size: 28px;
                letter-spacing: 2px;
                color: #333333;
                margin-bottom: 20px;
                padding-top: 44px;
                text-align: center;
            }
            .introduce {
                font-size: 16px;
                text-align: center;
                color: #999999;
            }
            .more {
                font-size: 14px;
                color: #999999;
                justify-items: right;
                float: right;
                padding: 16px 0 0;
                cursor: pointer;
                &:hover {
                    color: #00a0e9;
                }
            }
            .content {
                margin-top: 32px;
                height: 420px;
                display: flex;
                justify-content: space-between;
                .title-s {
                    font-size: 20px;
                    text-align: left;
                    color: #474747;
                    padding-bottom: 18px;
                    border-bottom: 1px solid #ccc;
                }
                .left-aside {
                    width: 570px;
                    ul{
                        height: 319px;
                        border-bottom: solid 1px #cccccc;
                        .item {
                            height: 160px;
                            display: flex;
                            justify-content: space-around;
                            border-bottom: solid 1px #cccccc;
                            box-sizing: border-box;
                            align-items: center;
                            &:hover {
                                cursor: pointer;
                            }
                            .word-part {
                                width: 340px;
                                height: 130px;
                                overflow: hidden;
                                margin-top: 4px;
                                .title-ss {
                                    font-size: 16px;
                                    letter-spacing: 1px;
                                    color: #333333;
                                    width: 320px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .detail {
                                    font-size: 14px;
                                    width: 320px;
                                    height: 40px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -o-text-overflow:ellipsis;
                                    display:block;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    /*! autoprefixer: off */
                                    -webkit-box-orient: vertical;
                                    /* autoprefixer: on */
                                    letter-spacing: 1px;
                                    color: #777777;
                                    margin-top: 17px;
                                }
                                .part-b {
                                    /*display: flex;
                                    justify-content: space-between;*/
                                    overflow: hidden;
                                    margin-top: 21px;
                                    vertical-align: bottom;
                                    width: 320px;
                                    .label {
                                        float:left;
                                        width: 74px;
                                        height: 25px;
                                        line-height:25px;
                                        color:#fff;
                                        text-align: center;
                                        background-image: linear-gradient(119deg,
                                            #fb7272 0%,
                                            #fc9595 100%);
                                        transform: skew(-10deg);
                                        margin:0 7px;
                                        border-radius: 3px;
                                        span{
                                            display: inline-block;
                                           transform: skew(10deg);
                                        }
                                    }
                                    .time {
                                        float: right;
                                        font-size: 14px;
                                        height: 25px;
                                        line-height:40px;
                                        color: #777777;
                                    }
                                }
                            }
                            .img {
                                width: 210px;
                                height: 120px;
                                vertical-align: middle;
                                background-position: center;
                                background-size: cover;
                                background-repeat: no-repeat;
                            }
                            &:hover {
                                background-color: #fff;
                            }
                        }
                    }
                }
                .right-aside {
                    width: 570px;
                    ul {
                        height: 319px;
                        border-bottom: solid 1px #cccccc;
                        li {
                            display: flex;
                            justify-content: space-between;
                            border-bottom: solid 1px #cccccc;
                            line-height: 39px;
                            vertical-align: middle;
                            &:hover {
                                cursor: pointer;
                            }
                            .left-p {
                                padding-left: 35px;
                                position: relative;
                                width: 335px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: 16px;
                                color: #333;
                                &::before {
                                    content: " ";
                                    position: absolute;
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 50%;
                                    left: 10px;
                                    top: 16px;
                                    background-color: #cccccc;
                                }
                            }
                            &:hover {
                                background-color: #fff;
                            }
                            .time {
                                padding: 0 5px;
                                font-size: 14px;
                                color: #777;
                            }
                        }
                        li:last-child{
                            border-bottom: 0;
                        }
                    }
                }
            }
        }
    }
</style>
