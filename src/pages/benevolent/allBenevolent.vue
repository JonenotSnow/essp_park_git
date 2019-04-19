<template>
    <div>
        <!-- 全部惠政模块 -->
        <essp-com-banner :url="url"></essp-com-banner>
        <essp-list-search 
            :hasTag="true"
            :hasType="true"
            :hasHot="true"
            :tag-model="tagModel"
            :hot-model="hotModel"
            :type-model="typeModel"
            :date-model="dateModel"
            :mark-model="markModel"
            :hot-list="tagItems"
            :hot-name="'tagTxt'"
            :hot-key="'tagId'"
            :hot-count="'tagCount'"
            @serTagClick="serTagClick"
            @serHotChange="serHotChange"
            @serTypeChange="serTypeChange"
            @serDateChange="serDateChange"
            @serEnter="serEnter"
            @serReset="serReset"
            @serGetList="serGetList"
        ></essp-list-search>
        <div class="container">
            <div class="main esspclearfix">
                <div class="list-main">
                    <div v-show="listData.length==0" v-cloak>
                        <essp-loading 
                            :loading="isLoding" 
                            :nodata="!isLoding">
                        </essp-loading>
                    </div>
                    <div v-if="listData.length > 0">
                        <essp-list-item
                            v-for="(item, index) in listData"
                            :key="index"
                            :img="item.titleImg"
                            :approved-num="item.approvedNum"
                            :avaliableTime="item.avaliableTime"
                            :avaliableEndTime="item.avaliableEndTime"
                            :type="item.applyType || 0"
                            :title="item.policyTitle"
                            :create-time="item.createTime"
                            :activity-label-list="item.tagsTxt"
                            :cst-nm="item.cstNm"
                            :view-time="item.viewTime"
                            :count-follower="item.countFollower"
                        ></essp-list-item>
                        <div class="pageList page-list">
                            <el-pagination 
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange" 
                                :current-page="pageNum" 
                                :page-sizes="pageRanges" 
                                :page-size="pageSize" 
                                layout="total,sizes, prev, pager, next, jumper" 
                                :total="allTotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <essp-right-side-hot-msg 
                        :listData="sideListData"
                        @hotItemClick="hotItemClick"
                        ></essp-right-side-hot-msg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { goverBene } from "@/fetch/api/goverBene/goverBene";
    import esspComBanner from '@/modules/esspComBanner';
    import esspListSearch from '@/modules/esspListSearch';
    import esspRightSideHotMsg from '@/modules/esspRightSideHotMsg';
    import esspListItem from '@/modules/esspListItem';
    import listSearchMixins from "@/modules/mixins/listSearchMixins.js"
    import pagesMixins from "@/modules/mixins/pagesMixins.js"
    export default {
        name: "惠政",
        components: {
            esspComBanner,
            esspListSearch,
            esspRightSideHotMsg,
            esspListItem
        },
        data() {
            return {
                url: './static/images/bannerLan.png',
                sideListData: [{
                        title: '活动标题',
                        date: 1234565434544
                    }, {
                        title: '活动标题活动活动标题活动活动标题活动活动标题活动活动标题活动',
                        date: 1234565434544
                    }, {
                        title: '活动标题活动活动标题活动活动标题活动活动标题活动活动标题活动',
                        date: 1234565434544
                    }, {
                        title: '活动标题活动活动标题活动活动标题活动活动标题活动活动标题活动',
                        date: 1234565434544
                    }
                ],
                listData: [],
                tagItems: [], //热门标签
                pageType: "allPolicy"
            }
        },
        mixins: [listSearchMixins, pagesMixins],
        mounted() {
            this.getList()
            this.getListGoverBeneTags()
        },
        methods: {
            getList() {
                var url = goverBene[this.pageType] || "";
                this.isLoding = true;
                this.listData = []
                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    tagTxt: this.tagModel, //根据标签搜索
                    mark: this.mark,
                    parkId: sessionStorage.getItem("parkId") || ""
                }).then(response => {
                    this.listData = response.resultData.policyList;
                    this.allTotal = response.resultData.total;
                    this.isLoding = false;
                },
                response => {
                    this.isLoding = false;
                    this.$message.info(response.resultMsg);
                });
            },
            getListGoverBeneTags() {
                var url = this.$apiUrl.parkInfo.getListTags;
                var parkId = sessionStorage.getItem("parkId") || "";
                var _this = this;
                this.$post(url, {
                    tagTp: "3000004", //惠政标签
                    parkId: parkId
                }).then(
                    response => {
                        _this.tagItems = response.resultData;
                    },
                    err => {
                    }
                );
            },
            hotItemClick(item) {
                console.log(item)
            },
        }
    }
</script>

<style lang="less" scoped>
.main {
    padding: 30px 0;
    .list-main {
        width: 850px;
        float: left;
    }
    .right-side {
        width: 300px;
        float: right;
    }
}

</style>
