<template>
    <div class="actauditpage" id="manageAuditing">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="common_titwrap">
            <p class='Otitle'>
                <i></i>
                入园申请审核
                <i></i>
            </p>
            <div class="title">
                <h3 class="common_titdes" style="margin-left:0;">基本信息</h3>
            </div>
            <div class="contentList">
                <p class="common" v-for="(it,i) in infoList" :key="i"
                   :class="{'texta':it.inputType && it.inputType == 'textarea'}">
                    <span>{{it.name}}：</span>
                    <textarea v-if="it.inputType && it.inputType == 'textarea' && !it.value.isArray()"></textarea>
                    <span v-else-if="it.type == 'dataTime' && it.value  && !Array.isArray(it.value)">{{it.value | timerFormat(it.value)}}</span>
                    <span v-else-if="!Array.isArray(it.value)">{{it.value}}{{it.sub?it.sub.slice(3):''}}</span>
                    <span v-else-if="Array.isArray(it.value) && it.value.length>0">{{it.value.join(',')}}</span>
                </p>
                <hr class='divider'>
                <p class="submitMark" v-if="!auditRole.includes('34')">
                    <span class="ts">是否需要园区高级管理员审核</span>
                    <span style="display:inline;position:relative;top:-10px;"> ：</span>
                    <el-radio-group v-model="isReview" style="display:inline;position:relative;top:-6px;">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </p>
                <div class="mark">
                    <span >审核意见：</span>
                    <textarea v-model="mark" placeholder="请输入审核意见（必填）"></textarea>
                </div>
                <p class="btn">
                    <span @click="access = true">通过</span>
                    <span @click="noAccess = true">不通过</span>
                    <span @click="cancelAudit">取消</span>
                </p>
            </div>
        </div>
        <!-- 通过审核弹窗 -->
        <el-dialog :visible.sync="access" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP"><i class="el-icon-warning"></i>&nbsp;&nbsp;是否确认通过该入园申请？</p>
            <p class="btn">
                <span @click="access = false">取消</span>
                <span @click="auditFn('02')">确认</span>
            </p>
        </el-dialog>

        <!-- 未通过审核弹窗 -->
        <el-dialog :visible.sync="noAccess" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP"><i class="el-icon-warning"></i>&nbsp;&nbsp;您确认拒绝该入园申请？</p>
            <p class="btn">
                <span @click="noAccess =false">取消</span>
                <span @click="auditFn('12')">确认</span>
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
                        name: this.utils.isBdPark()?"系统管理":"园区管理"
                    },
                    {
                        path: `/parkHall/manage/activityPoolAddPark`,
                        name: this.utils.isBdPark() ? "审核管理:" : "任务池:"
                    },
                    {
                        path: '',
                        name: this.utils.isBdPark() ? "入驻申请审核" : "入园申请审核"
                    }
                ],
                infoList: [],
                access: false,
                noAccess: false,
                mark: '',
                isReview: 0,
                auditRole: this.SSH.getItem('LoginUserRol')
            }
        },
        components: {
            EsspBreadCrumb
        },
        filters: {
            timerFormat(vaule) {
                var d = new Date(vaule);
                // var times=d.getFullYear() +
                //     '-' + (parseInt((d.getMonth() + 1))<10?'0'+(d.getMonth() + 1):(d.getMonth() + 1)) +
                //     '-' + (parseInt(d.getDate())<10?'0'+d.getDate():d.getDate()) + ' ' +
                //     (parseInt(d.getHours())<10?'0'+d.getHours():d.getHours()) + ':' +
                //     (parseInt(d.getMinutes())<10?'0'+d.getMinutes():d.getMinutes()) + ':' +
                //     (parseInt(d.getSeconds())<10?'0'+d.getSeconds():d.getSeconds());

                var times = d.getFullYear() +
                    '-' + (parseInt((d.getMonth() + 1)) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                    '-' + (parseInt(d.getDate()) < 10 ? '0' + d.getDate() : d.getDate());
                return times;
            }
        },
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
                this.$post(this.$apiUrl.manage.getCstForm, {
                    id: this.$route.query.id,
                })
                    .then((response) => {
                        this.infoList = JSON.parse(response.resultData)
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
                this.$post(this.$apiUrl.manage.auditApplyPark, {
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
                    });
                this.access = false;
                this.noAccess = false;
                this.$router.push('/parkHall/manage/activityPoolAddPark')
            },
            //取消审核
            cancelAudit() {
                this.$post(this.$apiUrl.manage.auditCancer, {
                    entityId: this.$route.query.id,
                    parkId: window.sessionStorage.getItem("parkId"),
                    type: '01',
                    status: '10',
                    flag: "noContent"
                })
                this.$router.push('/parkHall/manage/activityPoolAddPark')
            }
        }

    }
</script>
<style>
    #manageAuditing .access .el-dialog__header {
        display: none;
    }

    #manageAuditing .access .el-dialog__body {
        overflow: hidden;
        margin: 30px 20px;
    }

    #manageAuditing .access .el-dialog__body p:nth-of-type(1) {
        line-height: 55px;
    }
</style>

<style scoped lang="less">
    #manageAuditing{
        margin-bottom: 50px;
    }
    .common_titwrap {
        width: 1200px;
        margin: 0 auto;
        background: #fff;
        border: none !important;
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
            width: 950px;
            margin: 0 auto;
            overflow: hidden;
            h3 {
                letter-spacing: 4.8px;
                color: #333;
                margin-bottom: 20px;
            }
        }
        .contentList {
            width: 950px;
            margin: 20px auto;
            & > p.common {
                line-height: 50px;
                overflow: hidden;
                span {
                    display: inline-block;
                    float: left;
                    width: 145px;
                    font-size: 16px;
                    line-height: 40px;
                    margin-right: 10px;
                    color: #666666;
                    text-align: right;

                    &:nth-of-type(2) {
                        width: 700px;
                        font-size: 16px;
                        /*line-height: 30px;*/
                        color: #333333;
                        text-align: left;
                        float: left;
                    }
                }
                &:nth-last-of-type(1) {
                    text-align: center;
                    line-height: 100px;
                    button:not(:first-child) {
                        margin-left: 130px;
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
            }
        }
        .divider {
            width: 126%;
            margin: 20px auto;
            margin-left: -125px;
            color: #ddd;
            border: 1px solid #f2f2f2;
        }
        .submitMark {
            width: 990px;
            margin: 0 auto;
            line-height: 50px;
            span {
                display: inline-block;
                width: 123px;
                font-size: 16px;
                line-height: 40px;
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
            .ts {
                line-height: 20px;
            }
        }
        
    }

    .common_titdes{
        font-weight: normal;
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
    .access {
        .titleTips {
            text-indent: 36px;
            font-size: 24px;
            color: #555;
            position: relative;
            font-weight: normal;
            top: -30px;
            margin-top: 20px;
        }
        .accessP {
            text-indent: 20px;
            font-size: 20px;
            color: #333;
            line-height: 30px;
            i {
                font-size: 28px;
                color: #00a0e9;
            }
        }
        .btn {
            text-align:right;
            margin-top: 35px;
            span {
                text-align: center;
                display: inline-block;
                width: 100px;
                height: 35px;
                border-radius: 2px;
                line-height: 35px;
                font-size: 18x;
                cursor: pointer;
                color: #fff;
                letter-spacing: 4.8px;
                &:nth-of-type(1) {
                    letter-spacing: 4.8px;
                    background: #e6f4ff;
                    color: #00a0e9;
                }
                &:nth-of-type(2) {
                    margin-left: 55px;
                    background: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                    color: #fff;
                }
            }
        }
    }
</style>

