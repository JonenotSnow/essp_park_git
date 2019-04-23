// 审核列表
<template>
    <div class="audit" v-if="auditInfo && auditInfo.length > 0">
        <div class="auditInfo" v-for="(it,i) in auditInfo" :key="i">
            <p><span>审核人：</span><span>{{it.auditer}}</span></p>
            <p><span>当前审核状态：</span><span>{{it.auditResult | statusFormat(parkType)}}</span></p>
            <p><span>审核时间：</span><span>{{it.createTime | timerFormat(it.createTime)}}</span></p>
            <p v-if="it.mark"><span>审核意见：</span><span>{{it.mark}}</span></p>
            <hr v-if="i<auditInfo.length-1">
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: Number,
            default: 0
        },
        parkType: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            auditInfo: []
        }
    },
    filters: {
        statusFormat(value, parkType){
            let val = value?value.trim():'';
            let statusList={
                "10": "审核中",
                "02": parkType ? "园区审核通过":"发布中",
                "12": "园区审核未通过",
                "13": "审核中"
            }
            return statusList[val]?statusList[val]:''
        }
    },
    created() {
        this.getCommentList()
    },
    methods: {
        getCommentList(){
            let params = {
                parkId : window.sessionStorage.getItem("parkId"),
                entityId :this.$route.query.entityId
            }
            if(this.type) {
                params.type = this.type
            }
            this.$post(this.$apiUrl.manage.getCommentList, params)
            .then((response) => {
                this.auditInfo = response.resultData;
            },(err)=>{
                this.$message({
                    type: 'success',
                    message: response.resultMsg
                });
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .audit {
        padding-top: 20px;
        margin-top: 20px;
        border-top: 2px solid #f2f2f2;
    }
    .auditInfo {
        width: 950px;
        margin: 0 auto;
        line-height: 50px;
        span {
            display: inline-block;
            width: 140px;
            font-size: 16px;
            line-height: 40px;
            margin-right: 10px;
            color: #666666;
            text-align: right;
            &:nth-of-type(2) {
                width: 700px;
                font-size: 16px;
                line-height: 30px;
                color: #333333;
                text-align: left;
            }
        }
        &.texta {
            position: relative;
            overflow: hidden;
            span {
                float: left;
            }
            textarea {
                width: 820px;
                float: left;
                min-width: 820px;
                max-width: 820px;
                padding: 5px;
                min-height: 140px;
            }
        }
        hr {
            border: 1px dashed #ccc;
        }
    }
</style>

