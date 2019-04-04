// 惠政基本信息
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
                <span class="lable_span">惠政主题：</span>
                <span class="line_span">{{infoList.policyTitle}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">惠政类型：</span>
                <span class="line_span">{{infoList.classtType | showGoverType}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">发布机构：</span>
                <span class="line_span">{{infoList.cstNm}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">发布人：</span>
                <span class="line_span">{{infoList.userName}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">提交日期：</span>
                <span class="line_span">{{infoList.createTime | timerFormat(infoList.createTime)}}</span>
            </div>
            <div class="dtcon">
                <span class="lable_span">惠政主图：</span>
                <span class="line_img"><img v-lazy="infoList.titleImg"></span>
            </div>
            <div class="dtcon ql-container ql-snow bord-none">
                <span class="lable_span">惠政内容：</span>
                <span class="line_area ql-editor editor-content" v-html="infoList.infoDetail"></span>
            </div>
            <div class="dtcon" v-if="infoList.avaliableTime && infoList.avaliableEndTime">
                <span class="lable_span">惠政有效期：</span>
                <span class="line_span">{{infoList.avaliableTime | timerFormat }} 至 {{infoList.avaliableEndTime | timerFormat(infoList.avaliableEndTime)}}</span>
            </div>
            <div class="dtcon" v-if="isStatus">
                <span class="lable_span">审核状态：</span>
                <span class="line_span">{{infoList.status | statusFormat}}</span>
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
        timerFormat(vaule) {
            if (!vaule) return;
            var d = new Date(vaule);
            var times = d.getFullYear() +
                '-' + (parseInt((d.getMonth() + 1)) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                '-' + (parseInt(d.getDate()) < 10 ? '0' + d.getDate() : d.getDate());
            return times;
        },
        //审核状态
        statusFormat(value) {
            let val = value ? value.trim() : '';
            let statusList = {
                "02": "发布中",
                "12": "园区审核未通过",
                "13": "审核中"
            }
            return statusList[val] ? statusList[val] : ''
        },
        //惠政类型过滤器
        showGoverType(value){
            switch (value){
                case "1":
                    return '科教文卫';
                    break;
                case "2":
                    return '监管监督';
                    break;
                case "3":
                    return '产业支持';
                    break;
                case "4":
                    return '民政事务';
                    break;
                case "5":
                    return '政务政策';
                    break;
                case "6":
                    return '基建生产';
                    break;
                case "7":
                    return '民族宗教';
                    break;
                case "8":
                    return '对外事务';
                    break;
                case "9":
                    return '财政金融';
                    break;
                case "10":
                    return '司法安全';
                    break;
                default:
                    return '其他'
            }
        }
    },
    created() {
        this.getPolById()
    },
    methods: {
        // 获取惠政基本信息
        getPolById() {
            let _this = this
            this.$post('policy/getPolById', {
                parkId: window.sessionStorage.getItem("parkId"),
                id: this.$route.query.entityId
            })
            .then((response) => {
                _this.infoList = response.resultData;
            }, (err) => {
                _this.$message({
                    type: 'success',
                    message: response.resultMsg
                });
            })
        },
    }
}
</script>
<style lang='less' scoped>
    .infobox {
        padding: 50px 0;
        .themeTit {
            position: relative;
            margin-bottom: 30px;
            text-align: center;
            .tittext {
                font-size: 24px;
                line-height: 36px;
                position: relative;
                color: #333333;
                &:before {
                    content: '';
                    position: absolute;
                    width: 68px;
                    left: -83px;
                    top: 15px;
                    border-top: 2px solid #cccccc;
                }
                &:after {
                    content: '';
                    position: absolute;
                    width: 68px;
                    right: -83px;
                    top: 15px;
                    border-top: 2px solid #cccccc;

                }
            }
        }
    }

    .itemCon {
        padding-left: 100px;
        .title {
            width: 1050px;
            margin: 0 auto;
            overflow: hidden;
            .common_titwrap {
                border-top: none !important;
            }
            h3 {
                text-indent: 8px;
                letter-spacing: 4.8px;
                float: left;
                font-size: 20px;
                // margin-left: 55px;
                padding: 0 12px 4px;
                border-left: 10px solid #00a0e9;
                margin: 0;
                margin-bottom: 20px;
            }
        }
        .dtcon {
            width: 100%;
            margin-bottom: 15px;
            overflow: hidden;
        }
        .lable_span {
            float: left;
            width: 15%;
            margin-right: 5px;
            text-align: right;
            font-size: 16px;
            line-height: 40px;
            letter-spacing: 0.4px;
            color: #666;
        }
        .line_span {
            float: left;
            font-size: 16px;
            line-height: 40px;
            letter-spacing: 0.4px;
            color: #333;
        }
        .line_img {
            float: left;
            width: 200px;
            height: 200px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .line_area {
            float: left;
            width: 600px;
            min-height: 100px;
            border: 1px solid #ccc;
            padding: 10px;
            /*overflow: auto;*/
            p {
                word-break: break-all;
            }
        }

    }
</style>
