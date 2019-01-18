<template>
    <div class="actauditpage" id="manageParkAuditDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>

        <div class="common_titwrap">
            <p class='Otitle'>
                <i></i>
                活动发布审核详情
                <i></i>
            </p>
            <div class="k1">
                <div class="title">
                    <h3 class="common_titdes">基本信息</h3>
                </div>
                <div class="contentList">
                    <p>
                        <span>活动主题：</span>
                        <span>{{infoList.activityTheme}}</span>
                    </p>
                    <p>
                        <span>活动类别：</span>
                        <span>{{infoList.activityType | activeType}}</span>
                    </p>
                    <p>
                        <span>活动开始时间：</span>
                        <span>{{infoList.activityStarttime | timerFormat(infoList.activityStarttime)}}</span>
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
                    <p class="ts">
                        <span class="tspan">活动详情：</span>
                        <span v-html="infoList.activityDetails"></span>
                    </p>
                </div>
            </div>
            <div class="k2">
                <div class="title">
                    <h3 class="common_titdes">其他设置</h3>
                </div>
                <p class="infoTitle">票务信息：</p>
                <ul class="tickInfo" v-if="infoList.ticketForm && JSON.parse(infoList.ticketForm).length>0">
                    <li>
                        <span>票种名称</span>
                        <span>价格</span>
                        <span>数量</span>
                        <!-- <span>操作</span> -->
                    </li>
                    <li v-for="item in JSON.parse(infoList.ticketForm)" :key="item.ticketType">
                        <span>{{item.ticketType}}</span>
                        <span>￥{{item.ticketPirce}}</span>
                        <span>{{item.ticketNum}}</span>
                        <!-- <span>XX</span> -->
                    </li>
                </ul>
                <div class="contentList2">
                    <p>
                        <span>活动开放范围：</span>
                        <span>{{infoList.openScope | openStatus(infoList.openScope)}}</span>
                    </p>
                    <!-- <p>
                        <span>报名人数上限：</span>
                        <span>xxxxxxxxxx</span>
                    </p> -->
                    <p>
                        <span>报名开始时间：</span>
                        <span>{{infoList.enterStarttime | timerFormat(infoList.enterStarttime)}}</span>
                    </p>
                    <p>
                        <span>报名截止时间：</span>
                        <span>{{infoList.enterEndtime | timerFormat(infoList.enterEndtime)}}</span>
                    </p>
                    <!-- <p>
                        <span>邀请对象：</span>
                        <span>xxxxxxxxxxx</span>
                    </p> -->
                    <p class="submitMark">
                        <span>备注：</span>
                        <span>{{infoList.activityRemarks}}</span>
                    </p>
                </div>
            </div>
            <div v-if='auditInfo && auditInfo.length>0'>
                <hr class="divider">
                <div class="auditInfo" v-for="(it,i) in auditInfo" :key="i">
                    <p><span>审核人：</span>{{it.auditer}}</p>
                    <p><span>当前审核状态：</span>{{it.auditResult | statusFormat}}</p>
                    <p><span>审核时间：</span>{{it.createTime | timerFormat}}</p>
                    <p v-if="it.mark"><span>审核意见：</span>{{it.mark}}</p>
                    <hr v-if="i<auditInfo.length-1">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb"
export default {
    components:{
        EsspBreadCrumb
    },
    data () {
        return {
            breadlist:[
                {
                    path: '/parkHall/manage/baseInfo1',
                    name: this.utils.isBdPark()?"系统管理":"园区管理"
                },
                {
                    path:`/parkHall/manage/activityPoolActivityAditing`,
                    name: this.utils.isBdPark() ? "审核管理" : "任务池"
                },
                {
                    path:'',
                    name: "活动发布审核详情"
                }
            ],
            infoList:{},
            rzz:JSON.parse(localStorage.getItem('rzz')),
            auditInfo:[]
        }
    },
    created () {
        this.getCommentList();
        this.getByActivityId();
    },
    filters: {
        timerFormat(vaule){
            var d = new Date(vaule);
            var times=d.getFullYear() +
                '-' + (parseInt((d.getMonth() + 1))<10?'0'+(d.getMonth() + 1):(d.getMonth() + 1)) +
                '-' + (parseInt(d.getDate())<10?'0'+d.getDate():d.getDate()) + ' ' +
                (parseInt(d.getHours())<10?'0'+d.getHours():d.getHours()) + ':' +
                (parseInt(d.getMinutes())<10?'0'+d.getMinutes():d.getMinutes()) + ':' +
                (parseInt(d.getSeconds())<10?'0'+d.getSeconds():d.getSeconds());
            return times;
        },
        statusFormat(value){
            let val = value?value.trim():'';
            let statusList={
                "10":"园区待审核",
                "01":"园区审核中",
                "02":"发布中",
                "12":"园区审核未通过",
                "21":"企业待审核",
                "05":"企业审核中",
                "03":"企业审核未通过"
            }
            return statusList[val]?statusList[val]:''
        },
        activeType(value){
            let activeTypeList = {
                '1':"培训",
                '2':"论坛",
                '3':"比赛",
                '4':"聚会",
                '5':"研讨会",
                '6':"发布会",
                '7':"分享会",
                '8':"沙龙",
                '9':"其他",
            }
            return activeTypeList[value]?activeTypeList[value]:'';
        },
        openStatus(value) {
            if (value == '0') {
                return '本园区';
            } else if (value == '1') {
                return '全开放';
            }
        }
    },
    methods: {
        getByActivityId(){
            this.$post(this.$apiUrl.manage.getByActivityId,{
                parkId : window.sessionStorage.getItem("parkId"),
                activityId : this.$route.query.entityId,
                opMark :'01'
            })
            .then((response) => {
                this.infoList = response.resultData;
            },(response)=>{
                this.$message({
                    type: 'error',
                    message: response.resultMsg
                });
            })
        },
        getCommentList(){
            this.$post(this.$apiUrl.manage.getCommentList,{
                parkId : window.sessionStorage.getItem("parkId"),
                entityId :this.$route.query.entityId
            })
            .then((response) => {
                this.auditInfo = response.resultData;
            },(response)=>{
                this.$message({
                    type: 'error',
                    message: response.resultMsg
                });
            })
        }
    }
}
</script>

<style scoped lang="less">
.common_titwrap{
    width:1200px;
    margin:0 auto 50px;
    background:#fff;
    border-top: none!important;
    .Otitle{
        font-size: 24px;
        line-height: 36px;
        margin-bottom:20px;
        color: #333333;
        text-align: center;
        i {
            display: inline-block;
            width: 70px;
            border: 1px solid #ddd;
            position: relative;
            top: -6px;
        }
    }
    .title{
        // width:1020px;
        margin:0 auto;
        overflow: hidden;
        h3{
            text-indent:8px;
            letter-spacing: 4.8px;
            font-weight: normal;
        }
    }
    .k1{
        margin-left:70px;
    }
    .contentList,
    .contentList1,
    .contentList2{
        width:990px;
        margin:20px auto;
        &>p{
            line-height:50px;
            span{
                display:inline-block;
                width:140px;
                font-size: 16px;
                line-height: 40px;
                margin-right:10px;
                font-family: 'Microsoft YaHei';
                color: #666;
                text-align: right;
                &:nth-of-type(2){
                    width:700px;
                    font-size: 16px;
                    line-height: 30px;
                    color: #333;
                    text-align: left;
                }
            }
            &.texta{
                position:relative;
                overflow: hidden;
                span{
                    float:left;
                }
                textarea{
                    width:820px;
                    float:left;
                    min-width:820px;
                    max-width:820px;
                    padding:5px;
                    min-height:140px;
                }
            }
            &.ts{
                position:relative;
                overflow: hidden;
                .tspan{
                    position:relative;
                    float: left;
                }
            }
        }
    }
    .radioBtn{
        width:1034px;
        margin:20px auto;
        margin-bottom:20px;
        label{
            cursor: pointer;
            margin-right: 20px;
            input{
                position:relative;
                top:2px;
                margin-right: 5px;
            }
        }
    }
    .contentList1{
        width: 1034px;
        margin:0 auto;
        height: 404px;
        padding-bottom: 20px;
        border-radius: 6px;
        border: solid 1px #cccccc;
        &>div{
            width: 550px;
            margin:0 auto;
            line-height:35px;
            &>p{
                i{
                    color:#ff9900;
                    margin-right:5px;
                    font-size: 16px;
                }
                span{
                    color:#666;
                    font-size: 16px;
                }
                input{
                    width: 550px;
                    height: 35px;
                    background-color: #f6f9fb;
                    border: solid 1px #eaeff2;
                }
            }
            &:nth-of-type(1){
                margin-top:20px;
            }
        }
    }
    .k2{
        margin-left: 70px;
        .title{
            margin:40px 0 20px;
        }
        .infoTitle{
            width:1000px;
            font-size:16px;
            margin:20px auto;
            margin-bottom:20px;
        }
        .tickInfo{
            width: 995px;
            margin:0 auto;
            border: solid 1px #cccccc;
            li{
                display: flex;
                height:50px;
                line-height:50px;
                border-top: solid 1px #cccccc;
                span{
                    flex:1;
                    text-align: center;
                    font-size: 16px;
                }
                &:nth-of-type(1){
                    border-top:none;
                }
            }
        }
    }
    .auditInfo{
        width:950px;
        margin:0 auto;
        line-height:50px;
        span{
            display:inline-block;
            width:140px;
            font-size: 16px;
            line-height: 40px;
            margin-right:10px;
            color: #666666;
            text-align: right;
            &:nth-of-type(2){
                width:700px;
                font-size: 16px;
                line-height: 30px;
                color: #333333;
                text-align: left;
            }
        }
        hr{
            border:1px dashed #ccc;
        }
    }

    .divider{
        width:100%;
        margin:20px auto;
        color:#ddd;
        border: 1px solid #f2f2f2;
    }
}
</style>

