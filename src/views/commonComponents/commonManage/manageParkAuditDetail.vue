<template>
    <div class="actauditpage" id="manageParkAuditDetail">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="common_titwrap">
            <p class='Otitle'>
                <i></i>
                入园审核详情
                <i></i>
            </p>
            <div class="title">
                <h3 class="common_titdes" style="font-weight: normal">基本信息</h3>
            </div>
            <div class="contentList" v-if="infoList && infoList.length>0">
                <p><span>公司名称：</span><span>{{infoList[0].value}}</span></p>
                <p><span>所属行业：</span><span>{{infoList[1].value}}</span></p>
                <p><span>公司地址：</span><span>{{infoList[2].value}}</span></p>
                <p><span>申请说明：</span><span>{{infoList[3].value}}</span></p>
                <p><span>联系人姓名：</span><span>{{infoList[4].value}}</span></p>
                <p><span>联系电话：</span><span>{{infoList[5].value}}</span></p>
                <p v-if="infoList.length>6" v-for="(it,i) in infoList.slice(6)" :key="i">
                    <span>{{it.name}}：</span>
                    <span v-if="it.type=='dataTime' && it.value">
                        {{it.value | timerFormat(it.value)}}
                    </span>
                    <span v-else-if="it.type=='checkbox' && it.value.length>0">{{it.value.join(',')}}</span>
                    <span v-else>{{it.value}}</span>
                    <span class="sub">{{it.sub?it.sub.slice(3):''}}</span>
                </p>
                <div v-if="auditInfo && auditInfo.length>0">
                    <hr class="divider">
                    <div class="auditInfo" v-for="(it,i) in auditInfo" :key="i">
                        <p><span>审核人：</span><span>{{it.auditer}}</span></p>
                        <p><span>当前审核状态：</span><span>{{it.auditResult | statusFormat(it.auditResult)}}</span></p>
                        <p><span>审核时间：</span><span>{{it.createTime | timerFormat(it.createTime)}}</span></p>
                        <p v-if="it.mark"><span>审核意见：</span><span>{{it.mark}}</span></p>
                        <hr v-if="i<auditInfo.length-1">
                    </div>
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
                    path: '/parkHall/manage/baseInfo',
                    name: this.utils.isBdPark()?"系统管理":"园区管理"
                },
                {
                    path:`/parkHall/manage/activityPoolAddPark`,
                    name: this.utils.isBdPark() ? "审核管理" : "任务池"
                },
                {
                    path:'',
                    name: "",
                    name: this.utils.isBdPark() ? "入驻审核详情" : "入园审核详情"
                }
            ],
            infoList:[],
            rzz:JSON.parse(localStorage.getItem('rzz')),
            auditInfo:[]
        }
    },
    created () {
        this.getCommentList();
        this.getInfo();
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
                "02":"通过审核",
                "11":"邀请待回复",
                "12":"园区审核未通过",
                "21":"企业待审核",
                "05":"企业审核中",
                "03":"企业审核未通过",
                "13":"高级管理员待审核"
            }
            return statusList[val]?statusList[val]:''
        }
    },
    methods: {
        getInfo(){
            this.$post(this.$apiUrl.manage.getCstForm,{
                id:this.$route.query.entityId
            })
            .then((response) => {
                // if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                    this.infoList = JSON.parse(response.resultData);
                // }
            },(err)=>{
                this.$message({
                    type: 'warn',
                    message: response.returnMsg
                })
            })
        },
        getCommentList(){
            this.$post(this.$apiUrl.manage.getCommentList,{
                parkId : window.sessionStorage.getItem("parkId"),
                entityId :this.$route.query.entityId
            })
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

<style scoped lang="less">
.common_titwrap{
    width:1200px;
    margin:0 auto 50px;
    background:#fff;
    overflow: hidden;
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
        width:1050px;
        margin:0 auto;
        overflow: hidden;
        .common_titwrap{
            border-top: none!important;
        }
        h3{
            text-indent:8px;
            letter-spacing: 4.8px;
        }
    }
    .contentList{
        width:950px;
        margin:20px auto;
        &>p{
            line-height:50px;
            &>span{
                display:inline-block;
                font-size: 16px;
                line-height: 40px;
                margin-right:10px;
                color: #666666;

                &:nth-of-type(1){
                    width:145px;
                    font-size: 16px;
                    line-height: 30px;
                    color: #666;
                    text-align: right;
                }
                &:nth-of-type(2){
                    font-size: 16px;
                    line-height: 30px;
                    color: #333333;
                    text-align: left;
                }
                .sub{
                    font-size: 16px;
                    line-height: 30px;
                    color: #333333;
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
        }
        .auditInfo{
            line-height:50px;
            span{
                display:inline-block;
                font-size: 16px;
                line-height: 40px;
                margin-right:10px;
                color: #666666;

                &:nth-of-type(1){
                    width:145px;
                    font-size: 16px;
                    line-height: 30px;
                    color: #333333;
                    text-align: right;
                }
                &:nth-of-type(2){
                    font-size: 16px;
                    line-height: 30px;
                    color: #333333;
                    text-align: left;
                }
                .sub{
                    font-size: 16px;
                    line-height: 30px;
                    color: #333333;
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
            hr{
                border:1px dashed #ccc;
            }
        }
    }

    .divider{
        width: 126%;
        margin: 20px auto;
        margin-left: -125px;
        color:#ddd;
        border: 1px solid #f2f2f2;
    }
}
</style>

