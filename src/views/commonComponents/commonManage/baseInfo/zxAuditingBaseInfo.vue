// 资讯基本信息
<template>
    <div class="infobox">
        <div class="themeTit">
            <span class="tittext">{{titleText}}</span>
        </div>
        <div class="itemCon">
            <div class="title">
                <h3 class="common_titdes" style="font-weight: normal">基本信息</h3>
            </div>
            <div class="dtcon">
                <span class="lable_span">资讯标题：</span>
                <span class="line_span">{{infoList.informationTitle}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">资讯类型：</span>
                <span class="line_span">{{infoList.classtType | showClassType }}</span>
            </div>
            <div class="dtcon" v-if="isStatus">
                <span class="lable_span">发布方：</span>
                <span class="line_span">{{infoList.cstNm}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">发布人：</span>
                <span class="line_span">{{infoList.userName}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">联系人手机：</span>
                <span class="line_span">{{infoList.phone}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">提交日期：</span>
                <span class="line_span">{{infoList.createTime | timerFormat}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">标题配图：</span>
                <span class="line_img"><img v-lazy="infoList.titleImg"></span>
            </div>
            <div class="dtcon">
                <span class="lable_span">资讯简介：</span>
                <span class="line_area">{{infoList.content}}</span>
            </div>
            <div class="dtcon ql-container ql-snow dtcon bord-none">
                <span class="lable_span">资讯详情：</span>
                <span class="detail ql-editor editor-content" v-html="infoList.infoDetail"></span>
            </div>
            <div class="dtcon" v-if="isStatus">
                <span class="lable_span">审核状态：</span>
                <span class="line_span">{{infoList.status | statusFormat}}</span>
            </div>
            <div class="dtcon" v-if="isStatus">
                <span class="lable_span">备注：</span>
                <span class="line_pub-comment">{{infoList.pubComment}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isStatus: {
            type: Boolean,
            default: false
        },
        titleText: {
            type: String,
            default: "审核详情"
        }
    },
    data() {
        return {
            infoList: {}
        }
    },
    filters: {
        //时间格式化
        timerFormat(value) {
            if (!value) return;
            var d = new Date(value);
            var times = d.getFullYear() +
                '-' + (parseInt((d.getMonth() + 1)) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                '-' + (parseInt(d.getDate()) < 10 ? '0' + d.getDate() : d.getDate()) + ' ' +
                (parseInt(d.getHours()) < 10 ? '0' + d.getHours() : d.getHours()) + ':' +
                (parseInt(d.getMinutes()) < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' +
                (parseInt(d.getSeconds()) < 10 ? '0' + d.getSeconds() : d.getSeconds());
            return times;
        },
        //审核状态
        statusFormat(value) {
            let val = value ? value.trim() : '';
            let statusList = {
                "10": "审核中",
                "02": "发布中",
                "12": "园区审核未通过",
                "13": "审核中"
            }
            return statusList[val] ? statusList[val] : ''
        },
        //惠政类型过滤器
        showClassType(value){
            const types = {
                "": "全部",
                "1": "行业动态",
                "2": "通知公告",
                "3": "政府公告",
                "4": "方针政策",
                "5": "专家解读",
                "6": "专栏",
                "7": "财经新闻",
                "8": "其他"
            }
            return types[value]
        }
    },
    created() {
        this.getInfoById()
    },
    methods: {
        // 获取资讯基本信息
        getInfoById() {
            this.$post('/information/getInfoById', {
                parkId: window.sessionStorage.getItem("parkId"),
                informationId: this.$route.query.entityId
            })
            .then((response) => {
                this.infoList = response.resultData || {};
            }, (err) => {
                this.$message({
                    type: 'success',
                    message: response.resultMsg
                });
            })
        }
    }
}
</script>
<style lang='less' scoped>
    @import "./baseInfoLess";
</style>
