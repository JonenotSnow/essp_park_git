<template>
    <div class="actauditpage" id="manageParkAuditDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="infobox">
            <div class="themeTit">
                <span class="borderone"></span>
                <span class="bordertwo"></span>
                <span class="tittext">惠政发布审核详情</span>
            </div>
            <div class="itemCon" v-if="infoList">
                <div class="title">
                    <h3 class="common_titdes" style="font-weight: normal">基本信息</h3>
                </div>
                <div class="dtcon">
                    <span class="lable_span">惠政主题：</span>
                    <span class="line_span">{{infoList.policyTitle}}</span>
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
                <div class="dtcon">
                    <span class="lable_span">惠政内容：</span>
                    <span class="line_area" v-html="infoList.infoDetail"></span>
                </div>
                <div class="dtcon"  v-if="infoList.avaliableTime && infoList.avaliableEndTime">
                    <span class="lable_span">惠政有效期：</span>
                    <span class="line_span">{{infoList.avaliableTime | timerFormat(infoList.avaliableTime)}} 至 {{infoList.avaliableEndTime | timerFormat(infoList.avaliableEndTime)}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">审核状态：</span>
                    <span class="line_span">{{infoList.status | statusFormat}}</span>
                </div>
            </div>
        </div>
        <div v-if='auditInfo && auditInfo.length>0'>
            <hr class="divider">
            <div class="auditInfo" v-for="(it,i) in auditInfo" :key="i">
                <p><span>审核人：</span>{{it.auditer}}</p>
                <p><span>当前审核状态：</span>{{it.auditResult | statusFormat}}</p>
                <p><span>审核时间：</span>{{it.createTime | timerFormat(it.createTime)}}</p>
                <p v-if="it.mark"><span>审核意见：</span>{{it.mark}}</p>
                <hr v-if="i<auditInfo.length-1">
            </div>
        </div>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"
    import Moment from 'moment'

    export default {
        components: {
            EsspBreadCrumb
        },
        data() {
            return {
                breadlist: [
                    {
                        path: '/parkHall/manage/baseInfo',
                        name: "园区管理"
                    },
                    {
                        path: `/parkHall/manage/activityPoolAddPark`,
                        name: "任务池"
                    },
                    {
                        path: '',
                        name: "惠政审核详情"
                    }
                ],
                infoList: {},
                auditInfo: []
            }
        },
        created() {
            this.getCommentList();
            this.getPolById();
        },
        filters: {
            timerFormat(vaule) {
                var d = new Date(vaule);
                var times = d.getFullYear() +
                    '-' + (parseInt((d.getMonth() + 1)) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                    '-' + (parseInt(d.getDate()) < 10 ? '0' + d.getDate() : d.getDate());
                return times;
            },
            statusFormat(value) {
                let val = value ? value.trim() : '';
                let statusList = {
                    "02":"发布中",
                    "12":"园区审核未通过",
                    "13": "审核中"
                }
                return statusList[val] ? statusList[val] : ''
            }
        },
        methods: {
            getCommentList() {
                this.$post(this.$apiUrl.manage.getCommentList, {
                    parkId: window.sessionStorage.getItem("parkId"),
                    entityId: this.$route.query.entityId
                })
                    .then((response) => {
                        this.auditInfo = response.resultData;
                    }, (err) => {
                        this.$message({
                            type: 'success',
                            message: response.resultMsg
                        });
                    })
            },
            getPolById() {
                this.$post('policy/getPolById', {
                    parkId: window.sessionStorage.getItem("parkId"),
                    id: this.$route.query.entityId
                })
                    .then((response) => {
                        this.infoList = response.resultData;
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
<style>
    .line_area p {
        word-break: break-all;
    }
</style>
<style scoped lang="less">
    #manageParkAuditDetail {
        background: #fff;
        width: 1200px;
        margin: 0 auto 50px;
    }

    .infobox {
        padding: 50px 0;
    }

    .themeTit {
        position: relative;
        margin-bottom: 30px;
        text-align: center;
        .tittext {
            font-size: 24px;
            line-height: 36px;
            color: #333333;
        }
        .borderone {
            position: absolute;
            width: 68px;
            left: 35%;
            top: 18px;
            border-top: 2px solid #cccccc;
        }
        .bordertwo {
            position: absolute;
            width: 68px;
            right: 35%;
            top: 18px;
            border-top: 2px solid #cccccc;

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
        }

    }

    .toolbtn {
        text-align: center;
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

    .divider {
        width: 100%;
        margin: 20px auto;
        color: #ddd;
        border: 1px solid #f2f2f2;
    }
</style>

