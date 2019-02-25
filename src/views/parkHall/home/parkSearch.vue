<template>
 <div>
     <!-- 园区搜索页面 -->
     <div class="banner_index">
        <div style="position: relative;height: 500px;overflow: hidden;">
            <el-carousel indicator-position="none" height="500px">
                <el-carousel-item v-if="bannerDisList && bannerDisList.length>0" v-for="item in bannerDisList" :key="item.id">
                    <div class="banner_bg" :style="'background-image:url('+item.img_url+')'" @click="swiperLink(item,index)"></div>
                </el-carousel-item>
            </el-carousel>
            <div class="swiper-button-next2" tabindex="0" role="button" aria-label="Next slide"></div>
            <div class="swiper-button-prev2" tabindex="0" role="button" aria-label="Previous slide"></div>
            <div class='swiper-pagination'></div>
        </div>
        <div class="indexSeach" v-if="isBdPark">
            <el-input placeholder="请输入标题关键字" v-model="indexSeachKW">
                <el-select v-model="typeselect" slot="prepend" placeholder="请选择" class="typecon" @change="changetype">
                    <el-option label="活动" value="park_activity"></el-option>
                    <el-option label="惠政" value="park_gover" v-if="!isBdPark"></el-option>
                    <el-option label="资讯" value="park_information" v-if="!isBdPark"></el-option>
                    <el-option label="资讯" value="park_information" v-if="isBdPark"></el-option>
                    <el-option label="政策" value="park_gover" v-if="isBdPark"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="getListResult()">园区内搜索</el-button>
            </el-input>
            <div class="local esspclearfix">
                <span v-for="(item,index) in sometags" :key="index" v-if="index<5" @click="setTagTxtSearch(item,index)" :class="{'sel':currentIndex===index}"
                >{{item}}</span>
            </div>
        </div>
    </div>
    <div class="ffbox">
        <div class="listbox">
            <div class="toollist" id="toollist">
                <div class="tit-toolcon esspclearfix">
                    <h2 class="tit-tool">筛选条件</h2>
                    <el-button type="text" class="reset-tool" @click="resetHandelSearch()">重置条件</el-button>
                </div>
                <div id="el-date-editor">
                    <div class="tdcon esspclearfix aa" v-if="!isBdPark">
                        <span class="inline_span"><em></em>关键字搜索 :</span>
                        <el-input placeholder="请输入内容" v-model="indexSeachKW" class="input-with-select">
                            <el-select v-model="typeselect" slot="prepend" placeholder="请选择" @change="getListResult">
                                <el-option v-for="(item,index) in searchList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-input>
                    </div>
                    <div class="tdcon esspclearfix bb" v-if="!isBdPark || typeselect == 'park_activity'">
                        <span class="inline_span"><em></em>{{typeName}}类型 :</span>
                        <el-select v-model="classtType" placeholder="请选择" class="inline_select"  @change="getListResult">
                            <el-option v-for="(item,index) in typeitems" :key="index" :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="tdcon esspclearfix" :class="{'ccc':!isBdPark}">
                    <span class="inline_span"><em></em>发布日期 :</span>
                     <el-date-picker
                        v-model="timeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:40px;" @click="getListResult">查询</el-button>
                </div>
            </div>
            <div class="resultlist">
                <h2 class="tit-tool">筛选结果</h2>
                <div class="rescon">
                    <!-- 资讯 -->
                    <essp-loading :loading="loading" :nodata="searchData.length==0"></essp-loading>
                    <ul v-if="this.typeselect=='park_information'">
                        <li v-for="(items,index) in searchData" :key="index" class="itemli esspclearfix">
                            <div class="itemli_wrap_div esspclearfix">
                                <div class="imgcon" @click="goinfoDetail(items)"><img class="imgdetail" :src="items.titleImg" alt=""></div>
                                <div class="maincon">
                                    <h2 class="tit_main" @click="goinfoDetail(items)">{{items.informationTitle}}</h2>
                                    <div class="time_main">发布时间 : {{items.createTime | timerFormat(items.createTime)}}</div>
                                    <div class="btncon esspclearfix">
                                        <span><i class="icon iconfont icon-liulan"></i> {{items.viewTime}}</span>
                                        <span><i class="icon iconfont icon-collect2"></i> {{items.countFollower}}</span>
                                        <span><i class="icon iconfont icon-pinglun"></i> {{items.countComment}}</span>
                                    </div>
                                </div>
                                <div class="funbtncn">
                                    <i :class="items.followStatus==0?'iconfont icon-aixin-xianxing':'iconfont icon-collect2'"></i>
                                    <span class="btntext">{{items.followStatus==0?"未关注":"已关注"}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 惠政 -->
                    <ul v-if="this.typeselect=='park_gover' && !isBdPark">
                        <li v-for="(items,index) in searchData" :key="index" class="itemli esspclearfix">
                            <div class="itemli_wrap_div esspclearfix">
                                <div class="imgcon" @click="gotoGoverDetail(items)"><img class="imgdetail" :src="items.titleImg" alt=""></div>
                                <div class="maincon">
                                    <h2 class="tit_main" @click="gotoGoverDetail(items)">{{items.policyTitle}}</h2>
                                    <div class="time_main">发布方 : {{items.cstNm || "无发布方"}}</div>
                                    <div class="btncon esspclearfix">
                                        <span><i class="icon iconfont icon-liulan"></i> {{items.viewTime}}</span>
                                        <span><i class="icon iconfont icon-collect2"></i> {{items.countFollower}}</span>
                                        <!-- <span><i class="icon iconfont icon-pinglun"></i> {{items.countComment}}</span> -->
                                    </div>
                                </div>
                                <div class="funbtncn">
                                    <i :class="items.followStatus==0?'iconfont icon-aixin-xianxing':'iconfont icon-collect2'"></i>
                                    <span class="btntext">{{items.followStatus==0?"未关注":"已关注"}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 政策 -->
                    <ul v-if="this.typeselect=='park_gover' && isBdPark">
                        <li v-for="(items,index) in searchData" :key="index" class="itemli esspclearfix">
                            <div class="essp-card">
                                <div class="card__head">
                                    <p class="head__title" @click.stop="linkToDetail(items)">{{items.policyTitle}}</p>
                                    <p class="head__time">{{items.createTime | timerFormat(items.createTime)}}</p>
                                </div>
                                <div class="card__dest">
                                    <p>
                                        {{items.approveComment}}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 活动 -->
                    <ul v-if="this.typeselect=='park_activity'">
                        <li v-for="(items,index) in searchData" :key="index" class="itemli esspclearfix">
                            <div class="itemli_wrap_div esspclearfix">
                                <div class="imgcon" @click="gotoActiveDetail(items)"><img class="imgdetail" :src="items.activityPhoto" alt=""></div>
                                <div class="maincon">
                                    <h2 class="tit_main" @click="gotoActiveDetail(items)">{{items.activityTheme}}</h2>
                                    <div class="time_main">发布地点 : {{items.activityPlace || "无该地点"}}</div>
                                    <div class="btncon esspclearfix">
                                        <span><i class="icon iconfont icon-liulan"></i> {{items.viewSum}}</span>
                                        <span><i class="icon iconfont icon-collect2"></i> {{items.attentionSum}}</span>
                                        <span><i class="icon iconfont icon-pinglun"></i> {{items.commentSum}}</span>
                                    </div>
                                </div>
                                <div class="funbtncn">
                                    <i :class="items.currAttenStatus==0?'iconfont icon-aixin-xianxing':'iconfont icon-collect2'"></i>
                                    <span class="btntext">{{items.currAttenStatus==0?"未关注":"已关注"}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                </div>
            </div>
            <div class="pageList">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="pageRanges"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="allTotal">
                </el-pagination>
            </div>
        </div>
    </div>

 </div>
</template>

<script>
import Moment from "moment";
import { classtType } from "./../../../util/classtType";
export default {
    components: {
    },
    data() {
        return {
            isBdPark: this.utils.isBdPark(),
            currentIndex: "", //默认选第一个
            typeselect: this.$route.query.type || "park_activity", //关键类型判断，默认采用活动
            indexSeachKW: this.$route.query.title || "", //关键词搜索
            tagTxt: this.$route.query.tagTxt || "", //标签搜索
            parkId:sessionStorage.getItem("parkId") || "",//园区id
            searchData: [], //搜索的数据源头
            tagItems: [], //接纳标签所有数据
            sometags: [], //加工处理标签内容
            pageRanges: [5, 10, 20, 50], //默认每页10条数区间
            pageNum: 1, //当前页码
            pageSize: 10, //每页条数
            allTotal: 0, //总条数
            timeRange: [], //时间区间
            classtType: "", //明细分类条件
            loading: false,
            bannerDisList:[],
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
        };
    },
    computed: {
        //判断类型
        typeName() {
            let nameObj = {
                park_activity: "活动", //活动标签
                park_gover: "惠政", //惠政标签
                park_information: "资讯" //资讯标签
            };
            return nameObj[this.typeselect];
        },
        typeitems() {
            let itemTypeObj = {
                park_activity: classtType.activetType, //活动标签
                park_gover: classtType.goverType, //惠政标签
                park_information: classtType.infoType //资讯标签
            };
            return itemTypeObj[this.typeselect];
        }
    },
    created() {
        this.changetype();
    },
    methods: {
        setTagTxtSearch(item, index) {
            this.tagTxt = item;
            this.currentIndex = index;
            this.getListResult();
        },
        //彻底重置搜索条件
        resetSearch() {
            this.classtType = "";
            this.currentIndex = "";
            this.tagTxt = "";
            this.timeRange = [];
            this.indexSeachKW = '';
        },
        //按重置的操作
        resetHandelSearch(){
            this.resetSearch();
            this.getListResult();
        },
        //清空标签，清空类型
        resetSerchA(){
            // this.currentIndex = "";
            // this.tagTxt = "";
            // this.timeRange = [];

        },
        //改变时间后搜索
        changeTimeSeach(){
            setTimeout(()=>{
                this.getListResult()
            },1000)
        },
        async changetype() {
            this.classtType = "";
            this.getAllData();
            await this.getListInfoTags();
            await this.getListResult();
        },
        getListResult() {
            let type = this.typeselect;
            //活动
            if (type == "park_activity") {
                this.getParkActiveList();
                this.resetSerchA();
                return;
            }
            //惠政
            if (type == "park_gover") {
                this.getParkGoverList();
                this.resetSerchA();
                return;
            }
            //资讯
            if (type == "park_information") {
                this.getParkInfoList();
                this.resetSerchA();
                return;
            }
            return
        },
        //全部活动
        getParkActiveList() {
            if (this.timeRange == null) {
                this.timeRange = [];
            }
            this.searchData = [];
            var url = this.$apiUrl.active.actAll;
            var pop = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                timeStart: this.timeRange.length>0?this.timeRange[0] : "",
                timeEnd: this.timeRange.length>0?this.timeRange[1] : "",
                activityLabel: this.tagTxt,
                parkId: this.parkId,
                activityTheme: this.indexSeachKW,
                activityType: this.classtType
            };
            this.loading = true
            this.$post(url, pop).then(response => {
                this.loading = false
                var codestatus = response.resultCode;
                this.searchData = response.resultData.activityList;
                this.allTotal = response.resultData.total; //总条数
            });
        },
        //全部惠政
        getParkGoverList() {
            if (this.timeRange == null) {
                this.timeRange = [];
            }
            this.searchData = [];
            var url = this.$apiUrl.goverBene.allPolicy;
            var pop = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                startDate: this.timeRange.length>0?this.timeRange[0] : "",
                endDate: this.timeRange.length>0?this.timeRange[1] : "",
                tagTxt: this.tagTxt,
                parkId: this.parkId,
                title: this.indexSeachKW
            };
            this.isBdPark ? '' : pop.classtType = this.classtType
            this.loading = true
            this.$post(url, pop).then(response => {
                this.loading = false
                var codestatus = response.resultCode;
                this.searchData = response.resultData.policyList;
                this.allTotal = response.resultData.total; //总条数
            });
        },
        //全部资讯
        getParkInfoList() {
            if (this.timeRange == null) {
                this.timeRange = [];
            }
            this.searchData = [];
            var url = this.$apiUrl.parkInfo.allInfos;
            var pop = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                startDate: this.timeRange.length>0?this.timeRange[0] : "",
                endDate: this.timeRange.length>0?this.timeRange[1] : "",
                tagTxt: this.tagTxt,
                parkId: this.parkId,
                title: this.indexSeachKW
            };
            if(this.isBdPark) {
                pop.classtType = this.classtType
                pop.type = '1'
            }
            this.loading = true
            this.$post(url, pop).then(response => {
                this.loading = false
                var codestatus = response.resultCode;
                this.searchData = response.resultData.informationList;
                this.allTotal = response.resultData.total; //总条数
            });
        },
        //活动详情页
        gotoActiveDetail(item) {
            var url = "/parkIndex/activityDetail";
            this.$router.push({path: url, query: {activityId:item.activityId,opMark: "01"}});
        },
        //惠政详情页
        gotoGoverDetail(item) {
            var url = "/parkIndex/goverBeneDetail";
            this.$router.push({ path: url, query: {id: item.id } });
        },
        //资讯详情页
        goinfoDetail(item) {
            var informationId = item.informationId;
            let url = this.isBdPark ? '/news/newsdetail' : '/parkIndex/infoDetail'
            this.$router.push({path: url,query: { informationId: informationId }});
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getListResult();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getListResult();
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
            var tagTp = tagTpObj[this.typeselect]||"3000003";
            var pop = {tagTp,parkId}
            this.$post(url,pop).then(response => {
                var codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.resetSearch();//彻底重置搜索条件
                        var data = response.resultData;
                        this.tagItems = data;
                        this.resometags(data);
                    } else {
                        // this.$message.info(response.resultMsg);
                    }
                },err => {
                    this.$message.error("接口异常");
                }
            );
        },
        //获取列表的标签
        resometags(data) {
            //每次重新组合，计算属性处理不了异步处理，改用直接调接口之后直接处理数据
            this.sometags = [];
            if (data && data.length) {
                this.sometags = data.map((item, index) => {
                    return item.tagTxt;
                });
            }
        },
        //政策详情
        linkToDetail(item) {
            this.$router.push({
                path: '/sciIndex/sciAndTechPolicyDetail',
                query: {
                    applyType: item.applyType,
                    id: item.id
                }
            });
        },
        getAllData() {
            this.$post("/parkManage/getParkById", {
                parkId: window.sessionStorage.getItem("parkId")
            }).then(res => {
                if (res.resultData.slidesImage) {
                    let list = JSON.parse(res.resultData.slidesImage)
                    this.bannerDisList = list;
                }
            });
        }
    },
    filters: {
        timerFormat(vaule) {
            return Moment(vaule).format("YYYY-MM-DD");
        }
    }
};
</script>
<style>
    #el-date-editor .aa{
        float: left;
    }
    #el-date-editor .aa .el-input-group{
        width: 350px;
        margin-right:40px;
    }
    #el-date-editor .aa .el-select .el-input {
        width: 74px;
    }
    #el-date-editor .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    #toollist .ccc{
        margin-left:15px;
    }
    .indexSeach .el-input-group__append button {
        margin: -10px -21px;
    }
    .indexSeach1 {
        position: relative;
    }
    .typecon .el-input:after {
        content: " ";
        position: absolute;
        right: 0;
        top: 27%;
        width: 1px;
        height: 20px;
        background: #ccc;
    }
    .indexSeach .el-input__inner {
        border: none;
    }
</style>
<style lang='less' scoped >
@import "../../../assets/css/mixin";

.banner_index {
    position: relative;
    height: 500px;
    overflow: hidden;
    .banner_bg {
        height: 100%;
        background: url("../../../assets/parkSearch.jpeg") no-repeat center;
        .bgSize(cover);
    }
    .indexSeach {
        position: absolute;
        left: 50%;
        top: 265px;
        padding: 12px 16px 0;
        background-color: rgba(0,0,0,0.7);
        margin-left: -450px;
        width: 900px;
        z-index: 102;
        .typecon {
            //被傻逼全局污染了 只能打补丁了
            width: 80px;
            font-size: 16px;
            background: #fff;
        }
        .el-input-group__append {
            border: 1px solid @essp_nav_bg;
        }
        .el-input-group__append button.el-button {
            background-color: @essp_nav_bg;
            border: 1px solid @essp_nav_bg;
            color: #fff;
            .esspborder-radius(0);
            width: 118px;
            padding-left: 0;
            padding-right: 0;
        }
        .esspborder-radius(10px);
        .local {
            /*padding: 10px;*/
            padding-top: 5px;
            padding-bottom: 2px;
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
//列表区域
@con_bg: #fff;
.ffbox {
    position: relative;
    z-index: 102;
    margin-bottom: 20px;
    .listbox {
        .essp_width_auto();
        min-height: 100px;
        margin-top: -110px;
        background: @con_bg;
        // border: 1px solid #ccc;
    }
    .toollist {
        padding: 20px 40px;
        .tit-toolcon {
            margin-bottom: 20px;
            .tit-tool {
                float: left;
                margin-bottom: 20px;
                font-size: 20px;
                font-weight: normal;
                color: #444444;
            }
            .reset-tool {
                float: right;
                font-size: 16px;
            }
            }
            .tdcon {
            margin-bottom: 15px;
            .inline_span {
                float: left;
                margin-right: 15px;
                font-size: 16px;
                line-height: 40px;
                color: #666666;
                text-align: right;
            }
            .inline_select {
                float: left;
                width: 250px;
                background-color: #fff !important;
                .el-input {
                float: left;
                width: 100%;
                }
            }
        }
    }
    .resultlist {
        padding: 20px 40px;
        .tit-tool {
        margin-bottom: 9px;
        font-size: 20px;
        font-weight: normal;
        color: #444444;
        }
        .rescon {
        border-top: 1px solid #ccc;
        }
        .essp-card {
            margin-top: 25px;
            height: 110px;
            .card__head {
                position: relative;
                height: 49px;
                line-height: 50px;
                border-bottom: 1px solid #ccc;
                p {
                    display: inline-block;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                }
                .head__title {
                    font-size: 16px;
                    color: #222222;
                    height: 50px;
                    overflow: hidden;
                    max-width: 900px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover {
                        color: #00a0e9;
                        cursor: pointer;
                    }
                }
                .head__time {
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 14px;
                    color: #999999;
                }
            }
            .card__dest {
                margin-top: 10px;
                p {
                    height: 40px;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }

        }
    }
}
//分页器
.pageList {
    background: #fff;
    text-align: right;
    padding: 83px 40px 77px;
}
//具体内容区域
.itemli {
    padding: 0 20px;
    /*margin-bottom: 15px;*/

    .itemli_wrap_div {
        padding: 24px 0;
        border-bottom: 1px solid #ccc;
    }
    .imgcon {
        float: left;
        margin-right: 15px;
        height: 100px;
        width: 170px;
        .imgdetail {
        display: block;
        width: 100%;
        height: 100%;
            &:hover {
                cursor: pointer;
            }
        }
    }
    .maincon {
        float: left;
        margin-right: 10px;
        .tit_main {
            width: 784px;
            .esspellipsis();
            margin-bottom: 15px;
            font-size: 20px;
            font-weight: normal;
            color: #444444;
            &:hover {
                cursor: pointer;
            }
        }
        .time_main {
            width: 100%;
            font-size: 14px;
            line-height: 26px;
            margin-bottom: 15px;
            color: #777777;
        }
        .btncon {
            span {
                float: left;
                margin-right: 15px;
                color:#ccc;
                i{
                    margin-right: 5px;
                    font-size: 14px;
                }
                .icon-collect2,.icon-pinglun {
                    font-size: 12px;
                }

            }
        }
    }
    .funbtncn {
        float: left;
        /*padding: 0 10px 0px;*/
        padding-left: 20px;
        i{
            font-size: 16px;
            margin-right: 8px;
        }
        .icon-aixin-xianxing {
            color: #ccc;
        }
        .icon-collect2 {
            color: #fc1878;
        }
        .btntext {
            /*float: left;*/
            font-size: 16px;
            font-weight: normal;
            color: #777777;
        }

    }
    .btncon {
        .icon-pinglun {
            font-size: 14px;
        }
    }
}
//暂无数据样式
.nothing {
  padding: 20px 0px;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
