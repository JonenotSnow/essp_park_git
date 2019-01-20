<template>
    <div class="actauditpage" id="manageActivityAudit">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="common_titwrap">
            <p class='Otitle'>
                <i></i>
                活动发布审核
                <i></i>
            </p>
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
                        <span v-if="infoList.activityType == it.type" v-for="(it,i) in typeList"
                              :key="i">{{it.name}}</span>
                    </p>
                    <p>
                        <span>活动开始时间：</span>
                        <span>{{infoList.activityStarttime}}</span>
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
                    <p class="ts">
                        <span class="tspan">活动详情：</span>
                        <span v-html="infoList.activityDetails"></span>
                    </p>
                    <p class="ts">
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
            <div class="k1">
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
                        <p><input type="text" v-model="item.tittext" disabled></p><!-- <input type="text" disabled> -->
                    </div>
                    <!-- <div>
                        <p><i>*</i><span>姓名：</span></p>
                        <p><input type="text" disabled></p>
                    </div>
                    <div>
                        <p><i>*</i><span>手机：</span></p>
                        <p><input type="text" disabled></p>
                    </div>
                    <div>
                        <p><i>*</i><span>职位：</span></p>
                        <p><input type="text" disabled></p>
                    </div>
                    <div>
                        <p><i>*</i><span>公司：</span></p>
                        <p><input type="text" disabled></p>
                    </div> -->
                    <!-- <div>
                        <p><i>*</i><span>希望从活动中获得哪些信息：</span></p>
                        <p><input type="text" disabled></p>
                    </div> -->
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
                        <!-- <span>操作</span> -->
                    </li>
                    <li v-for="item in items" :key="item.ticketType">
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
                        <span>{{infoList.enterStarttime}}</span>
                    </p>
                    <p>
                        <span>报名截止时间：</span>
                        <span>{{infoList.enterEndtime}}</span>
                    </p>
                    <!-- <p>
                        <span>邀请对象：</span>
                        <span>xxxxxxxxxxx</span>
                    </p> -->
                </div>
            </div>
            <hr class="divider">
            <p class="submitMark">
                <span>备注：</span>
                <span>{{infoList.activityRemarks}}</span>
            </p>
            <p class="submitMark" v-if="!auditRole.includes('34')">
                <span class="ts">是否需要园区高级管理员审核</span>
                <span style="display:inline;position:relative;top:-10px;"> ：</span>
                <el-radio-group v-model="isReview" style="display:inline;position:relative;top:-6px;">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                </el-radio-group>
            </p>
            <div class="mark">
                <span>审核意见：</span>
                <textarea v-model="mark" placeholder="请输入审核意见（必填）"></textarea>
            </div>
            <p class="btn">
                <span @click="access = true">通过</span>
                <span @click="noAccess = true">不通过</span>
                <span @click="cancelAudit">取消</span>
            </p>
        </div>
        <!-- 通过审核弹窗 -->
        <el-dialog :visible.sync="access" width='560px' class='noAccess'>
            <p>是否确认通过审核！</p>
            <p>
                <el-button type="primary" size="small" @click="auditFn('02')">确认</el-button>
                <el-button type="primary" size="small" @click="access =false">取消</el-button>
            </p>
        </el-dialog>

        <!-- 未通过审核弹窗 -->
        <el-dialog :visible.sync="noAccess" width='560px' class='noAccess'>
            <p>是否拒绝通过审核！</p>
            <p>
                <el-button type="primary" size="small" @click="auditFn('12')">确认</el-button>
                <el-button type="primary" size="small" @click="noAccess =false">取消</el-button>
            </p>
        </el-dialog>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"

    export default {
        data() {
            return {
                breadlist: [
                    {
                        path: '/parkHall/manage/baseInfo',
                        name: this.utils.isBdPark() ? "系统管理" : "园区管理"
                    },
                    {
                        path: `/parkHall/manage/activityPoolActivityAditing1`,
                        name: this.utils.isBdPark() ? "审核管理" : "任务池"
                    },
                    {
                        path: '',
                        name: "活动发布审核"
                    }
                ],
                infoList: {},
                access: false,
                noAccess: false,
                mark: '',
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
                    }
                ],
                mark: '',
                items: [],
                numberToplimit: 0,
                formRqList: [],
                isReview: 0,
                auditRole: this.SSH.getItem('LoginUserRol')
            }
        },
        components: {
            EsspBreadCrumb
        },
        // filters: {
        //     timerFormat(vaule){
        //         var d = new Date(vaule);
        //         var times=d.getFullYear() +
        //             '-' + (parseInt((d.getMonth() + 1))<10?'0'+(d.getMonth() + 1):(d.getMonth() + 1)) +
        //             '-' + (parseInt(d.getDate())<10?'0'+d.getDate():d.getDate()) + ' ' +
        //             (parseInt(d.getHours())<10?'0'+d.getHours():d.getHours()) + ':' +
        //             (parseInt(d.getMinutes())<10?'0'+d.getMinutes():d.getMinutes()) + ':' +
        //             (parseInt(d.getSeconds())<10?'0'+d.getSeconds():d.getSeconds());
        //         return times;
        //     }
        // },
        created() {
            this.getInfo()
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getInfo() {
                this.$post(this.$apiUrl.manage.activityAduit, {
                    activityId: this.$route.query.id,
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
                        this.numberToplimit = number;
                    }, (err) => {
                        this.$message({
                            type: 'warn',
                            message: response.returnMsg
                        })
                    })
            },
            auditFn(status) {
                let st = status;
                if (!this.mark) {
                    this.$message({
                        type: 'warn',
                        message: '审核意见不能为空'
                    });
                    return;
                }
                if (this.isReview == '1' && this.access) {
                    st = '13'
                }
                this.$post(this.$apiUrl.manage.auditActivity, {
                    entityId: this.$route.query.id,
                    parkId: window.sessionStorage.getItem("parkId"),
                    status: st,
                    mark: this.mark,
                    isReview: this.isReview
                })
                    .then((response) => {
                        this.$message({
                            type: 'success',
                            message: response.resultMsg
                        });
                    }, (err) => {
                        this.$message({
                            type: 'warn',
                            message: response.resultMsg
                        });
                    })
                this.access = false;
                this.noAccess = false;
                this.$router.push('/parkHall/manage/activityPoolActivityAditing')
            },
            //取消审核
            cancelAudit() {
                this.$post(this.$apiUrl.manage.auditCancer, {
                    entityId: this.$route.query.id,
                    parkId: window.sessionStorage.getItem("parkId"),
                    type: '02',
                    status: '10',
                    flag: "noContent"
                })
                this.$router.push('/parkHall/manage/activityPoolActivityAditing')
            }
        },
        filters: {
            openStatus(value) {
                if (value == '0') {
                    return '本园区';
                } else if (value == '1') {
                    return '全开放';
                }
            }
        }
    }
</script>
<style scoped lang="less">
    #manageActivityAudit .noAccess .el-dialog__body {
        text-align: center;
    }

    #manageActivityAudit .noAccess .el-dialog__body textarea {
        width: 460px;
        min-width: 460px;
        max-width: 460px;
        min-height: 80px;
        border-radius: 10px;
        border: 1px solid #ddd;
        outline: none;
        padding: 20px;
    }

    #manageActivityAudit .noAccess .el-dialog__body p:nth-of-type(1) {
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        color: #444;
        text-indent: 25px;
    }

    #manageActivityAudit .noAccess .el-dialog__body p:nth-of-type(2) {
        margin-top: 20px;
    }
</style>

<style scoped lang="less">
    .common_titwrap {
        width: 1200px;
        margin: 0 auto;
        background: #fff;
        border-top: none !important;
        .Otitle {
            font-size: 24px;
            line-height: 36px;
            margin-bottom: 20px;
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
        .title {
            width: 1020px;
            margin: 0 auto;
            overflow: hidden;
            h3 {
                letter-spacing: 4.8px;
                color: #333;
                margin-left: 75px;
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
            width: 1034px;
            margin: 0 auto;
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
        .k2 {
            .title {
                margin: 40px 0 20px;
            }
            .infoTitle {
                width: 1000px;
                margin: 20px auto;
                margin-bottom: 20px;
            }
            .tickInfo {
                width: 1060px;
                margin: 0 auto;
                border: solid 1px #cccccc;
                li {
                    display: flex;
                    height: 50px;
                    line-height: 50px;
                    border-top: solid 1px #cccccc;
                    span {
                        flex: 1;
                        text-align: center;
                    }
                    &:nth-of-type(1) {
                        border-top: none;
                    }
                }
            }
        }
    }

    .divider {
        width: 100%;
        margin: 20px auto;
        color: #ddd;
        border: 1px solid #f2f2f2;
    }

    .submitMark {
        width: 990px;
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
                font-size: 14px;
                line-height: 30px;
                color: #333333;
                text-align: left;
            }
        }
        .ts {
            width: 121px;
            line-height: 20px;
            margin-right: 0;
        }
    }

    .btn {
        text-align: center;
        span {
            cursor: pointer;
            display: inline-block;
            width: 100px;
            height: 40px;
            background: linear-gradient(#22a2fa 0%, #10b5ff 100%);
            border-radius: 5px;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            margin-left: 120px;
            &:nth-of-type(2) {
                background: #ccc;
            }
            &:nth-of-type(1),
            &:nth-of-type(3) {
                letter-spacing: 4.8px
            }
        }
    }

    .mark {
        width: 960px;
        margin: 0 auto 40px;
        overflow: hidden;
        span {
            float: left;
            width: 126px;
            margin-right: 5px;
            text-align: right;
            font-size: 16px;
            letter-spacing: 0.4px;
            color: #666666;
            line-height: 38px;
        }
        textarea {
            width: 600px;
            min-width: 560px;
            max-width: 460px;
            min-height: 80px;
            border: 1px solid #ddd;
            outline: none;
            padding: 10px 20px;
            float: left;
        }
    }
</style>

