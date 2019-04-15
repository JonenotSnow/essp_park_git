<template>
    <div>
        <!-- 全部惠政模块 -->
        <!-- <essp-main-center-t :pageType="aipStyle"></essp-main-center-t> -->
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

            :hot-list="hotList"
            
            @serTagClick="serTagClick"
            @serHotChange="serHotChange"
            @serTypeChange="serTypeChange"
            @serDateChange="serDateChange"
            @serEnter="serEnter"
            @serReset="serReset"
        ></essp-list-search>
        <div class="common_titwrap esspclearfix" style="height:400px;background: #fff;">
            <div style="width: 300px;float: right;">
                <essp-right-side-hot-msg 
                    :listData="listData"
                    @hotItemClick="hotItemClick"
                    ></essp-right-side-hot-msg>
            </div>
        </div>
    </div>
</template>
<script>
    import esspComBanner from '@/modules/esspComBanner';
    import esspListSearch from '@/modules/esspListSearch';
    import esspRightSideHotMsg from '@/modules/esspRightSideHotMsg';
    import listSearchMixins from "@/modules/mixins/listSearchMixins.js"
    // import EsspMainCenterT from '@/components/EsspMainCenterT';
    // export default {
    //     name: "",
    //     components: {
    //         EsspMainCenterT,
    //     },
    //     data() {
    //         return {
    //             msg: "全部惠政",
    //             aipStyle:"allPolicy"
    //         }
    //     },
    //     methods: {
            
    //     },
    // }
    export default {
        name: "惠政",
        components: {
            esspComBanner,
            esspListSearch,
            esspRightSideHotMsg
        },
        data() {
            return {
                url: './static/images/bannerLan.png',
                hotList: [],
                listData: [{
                        title: '活动标题',
                        date: 1234565434544
                    }, {
                        title: '活动标题活动标题活动标题活动标题',
                        date: 1234565434544
                    },
                ]
            }
        },
        mixins: [listSearchMixins],
        methods: {
            getList() {

            },
            hotItemClick(item) {
                console.log(item)
            }
        }
    }
</script>

<style>

</style>
