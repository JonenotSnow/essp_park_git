// 惠政基本信息
<template>
    <div class="common_titwrap infobox">
        <div class="themeTit">
            <span class="tittext">{{titleText}}</span>
        </div>
        <div class="k1">
            <div class="title">
                <h3 class="common_titdes" style="font-weight: normal">基本信息</h3>
            </div>
            <div class="contentList">
                <p>
                    <span>活动主题：</span>
                    <span>{{infoList.activityTheme}}</span>
                </p>
                <p>
                    <span>活动类别：</span>
                    <span>{{infoList.activityType | activeType }}</span>
                </p>
                <p>
                    <span>活动开始时间：</span>
                    <span>{{infoList.activityStarttime | timerFormat }}</span>
                </p>
                <p>
                    <span>活动天数：</span>
                    <span>{{infoList.activityDays}}</span>
                </p>
                <p>
                    <span>活动地点：</span>
                    <span>{{infoList.activityPlace}}</span>
                </p>
                <p>
                    <span>是否收费：</span>
                    <span>{{infoList.isCharge == 1 ? '是' : '否'}}</span>
                </p>
                <p v-if="infoList.isCharge == 1">
                    <span>收费说明：</span>
                    <span>{{infoList.chargeInfo}}</span>
                </p>
                <p>
                    <span>报名是否需审核：</span>
                    <span>{{infoList.enterNeedAudit == 0 ? '否' : '是'}}</span>
                </p>
                <p class="ts ql-container ql-snow bord-none">
                    <span class="tspan">活动详情：</span>
                    <span style="border: none; padding:0;" class="ql-editor editor-content" v-html="infoList.activityDetails"></span>
                </p>
                <p class="ts" v-if="isStatus">
                    <span class="tspan">活动宣传图/海报：</span>
                    <img :src="infoList.activityPhoto" alt="" style="width:40%;">
                </p>
                <p v-if="infoList.activityLabel">
                    <span>活动标签：</span>
                    <span>{{infoList.activityLabel}}</span>
                </p>
                <p>
                    <span>发起单位：</span>
                    <span>{{infoList.initiateUnits}}</span>
                </p>
                <p>
                    <span>发布方：</span>
                    <span>{{infoList.cstName}}</span>
                </p>
            </div>
        </div>
        <div class="k1" v-if="isStatus">
            <div class="title">
                <h3 class="common_titdes">报名表设置</h3>
            </div>
            <!-- <p class="radioBtn">
                <label for="n1"><input type="radio" name="sa" value="1" id="n1">在网页中填写</label>
                <label for="n2"><input type="radio" name="sa" value="2" id="n2">报名表批量导入</label>
            </p> -->
            <div class="contentList1">
                <div v-for=" (item,index)  in formRqList" :key="index">
                    <p><i v-if="item.requir">*</i><span>{{item.name}}：</span></p>
                    <p><input type="text" v-model="item.tittext" disabled></p>
                </div>
            </div>
        </div>
        <div class="k2">
            <div class="title">
                <h3 class="common_titdes">其他设置</h3>
            </div>
            <p class="infoTitle">票务信息：</p>
            <ul class="tickInfo">
                <li>
                    <span>票种名称</span>
                    <span>价格</span>
                    <span>数量</span>
                </li>
                <li v-for="item in items" :key="item.ticketType">
                    <span>{{item.ticketType}}</span>
                    <span>￥{{item.ticketPirce}}</span>
                    <span>{{item.ticketNum}}</span>
                </li>
            </ul>
            <div class="contentList2">
                <p>
                    <span>活动开放范围：</span>
                    <span>{{infoList.openScope | openStatus}}</span>
                </p>
                <p>
                    <span>报名开始时间：</span>
                    <span>{{infoList.enterStarttime}}</span>
                </p>
                <p>
                    <span>报名截止时间：</span>
                    <span>{{infoList.enterEndtime}}</span>
                </p>
                <p class="submitMark">
                    <span>备注：</span>
                    <span>{{infoList.activityRemarks}}</span>
                </p>
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
            infoList: {},
            typeList: [
                {
                    type: '1',
                    name: '培训'
                },
                {
                    type: '2',
                    name: '论坛'
                },
                {
                    type: '3',
                    name: '比赛'
                },
                {
                    type: '4',
                    name: '聚会'
                },
                {
                    type: '5',
                    name: '研讨会'
                },
                {
                    type: '6',
                    name: '发布会'
                },
                {
                    type: '7',
                    name: '分享会'
                },
                {
                    type: '8',
                    name: '沙龙'
                },
                {
                    type: '9',
                    name: '其他'
                }
            ],
            items: [],
            formRqList: [],
        }
    },
    filters: {
        openStatus(value) {
            if (value == '0') {
                return '本园区';
            } else if (value == '1') {
                return '全开放';
            }
        },
        timerFormat(value) {
            if(!value) {
                return ''
            }
            var d = new Date(value);
            var times =
                d.getFullYear() +
                "-" +
                (parseInt(d.getMonth() + 1) < 10
                    ? "0" + (d.getMonth() + 1)
                    : d.getMonth() + 1) +
                "-" +
                (parseInt(d.getDate()) < 10 ? "0" + d.getDate() : d.getDate()) +
                " " +
                (parseInt(d.getHours()) < 10
                    ? "0" + d.getHours()
                    : d.getHours()) +
                ":" +
                (parseInt(d.getMinutes()) < 10
                    ? "0" + d.getMinutes()
                    : d.getMinutes()) +
                ":" +
                (parseInt(d.getSeconds()) < 10
                    ? "0" + d.getSeconds()
                    : d.getSeconds());
            return times;
        },
        activeType(value) {
            let activeTypeList = {
                "1": "培训",
                "2": "论坛",
                "3": "比赛",
                "4": "聚会",
                "5": "研讨会",
                "6": "发布会",
                "7": "分享会",
                "8": "沙龙",
                "9": "其他"
            };
            return activeTypeList[value] ? activeTypeList[value] : "";
        },
    },
    created() {
        this.getInfo()
    },
    methods: {
        // 获取活动基本信息
        getInfo() {
            this.$post(this.$apiUrl.manage.activityAduit, {
                activityId: this.$route.query.entityId || this.$route.query.id,
                parkId: sessionStorage.getItem("parkId"),
                opMark: '01'
            })
            .then((response) => {
                this.infoList = Object.assign({}, response.resultData);
                this.items = JSON.parse(this.infoList.ticketForm);//票务信息
                var enterForm = JSON.parse(this.infoList.enterForm); //申报信息
                this.formRqList = enterForm.formRqList.concat(enterForm.formTypeList);
                var number = 0;
                for (var i = 0; i < this.items.length; i++) {
                    number = number + this.items[i].ticketNum;
                }
            }, (err) => {
                this.$message({
                    type: 'warning',
                    message: response.returnMsg
                })
            })
        },
    }
}
</script>
<style lang='less' scoped>
    .k1, .k2{
        margin-left: 70px;
    }
    .infobox {
        padding: 50px 0 0;
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

    .common_titwrap {
        width: 1200px;
        border-top: none;
        .title {
            width: 1020px;
            margin: 0 auto;
            overflow: hidden;
            h3 {
                letter-spacing: 4.8px;
                margin: 0;
                margin-left: 55px;
            }
        }
        .contentList,
        .contentList1,
        .contentList2 {
            width: 990px;
            margin: 20px auto;
            & > p {
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
                &.ts {
                    position: relative;
                    .tspan {
                        position: relative;
                        float: left;
                    }
                }
            }
        }
        .radioBtn {
            width: 1034px;
            margin: 20px auto;
            margin-bottom: 20px;
            label {
                cursor: pointer;
                margin-right: 20px;
                input {
                    position: relative;
                    top: 2px;
                    margin-right: 5px;
                }
            }
        }
        .contentList1 {
            width: 990px;
            margin: 20px auto;
            height: auto;
            padding-bottom: 20px;
            border-radius: 6px;
            border: solid 1px #cccccc;
            & > div {
                width: 550px;
                margin: 0 auto;
                line-height: 35px;
                & > p {
                    i {
                        color: #ff9900;
                        margin-right: 5px;
                        font-size: 16px;
                    }
                    span {
                        color: #666;
                        font-size: 16px;
                    }
                    input {
                        width: 550px;
                        height: 35px;
                        background-color: #f6f9fb;
                        border: solid 1px #eaeff2;
                    }
                }
                &:nth-of-type(1) {
                    margin-top: 20px;
                }
            }
        }
        .k1{
            .title {
                margin-left: 0;
                h3{
                    font-weight: 400;
                }
            }
        }
        .k2 {
            .title {
                margin: 40px 0 20px;
                h3{
                    font-weight: 400;
                }
            }
            .infoTitle {
                width: 1000px;
                margin: 20px auto;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .tickInfo {
                width: 995px;
                margin: 0 auto;
                border: solid 1px #cccccc;
                li {
                    display: flex;
                    height: 50px;
                    line-height: 50px;
                    border-top: solid 1px #cccccc;
                    span {
                        flex: 1;
                        font-size: 16px;
                        text-align: center;
                    }
                    &:nth-of-type(1) {
                        border-top: none;
                    }
                }
            }
        }
    }
</style>
