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
                            :type="item.classtType || 0"
                            :title="item.policyTitle"
                            :create-time="item.createTime"
                            :activity-label-list="item.tagsTxt"
                            :cst-nm="item.cstNm"
                            :view-time="item.viewTime"
                            :count-follower="item.countFollower"
                            :comment-num="item.commentSum"
                            @click="jumpClick(item)"
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
                sideListData: [],
                listData: [],
                tagItems: [], //热门标签
                pageType: "actAll",
                parkId: window.sessionStorage.getItem("parkId")
            }
        },
        mixins: [listSearchMixins, pagesMixins],
        mounted() {
            this.getList()
            this.getListGoverBeneTags()
            this.getHotList()
        },
        methods: {
            getList() {
                var url = this.$apiUrl.active[this.pageType] || "";
                this.isLoding = true;
                this.listData = []
                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    activityLabel: this.tagModel, //根据标签搜索
                    mark: this.mark,
                    parkId: sessionStorage.getItem("parkId") || ""
                }).then(response => {
                    this.listData = response.resultData.activityList;
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
                var _this = this;
                this.$post(url, {
                    tagTp: "3000004", //活动标签
                    parkId: this.parkId
                }).then(
                    response => {
                        _this.tagItems = response.resultData;
                    },
                    err => {
                    }
                );
            },
            getHotList() { // 获取
                this.$post(this.$apiUrl.active.getHotActivity, {
                    pageNum: 0,
                    pageSize: 20,
                    type: 0,
                    parkId: this.parkId
                }).then((response) => {
                    this.sideListData = response.resultData.hot;
                });
            },
            hotItemClick(item) {
            },
            jumpClick(item) {
            }
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
