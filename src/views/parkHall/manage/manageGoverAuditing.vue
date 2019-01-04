<template>
    <div class="sponsorcon" id="manageZXAuditing">
        <!-- 资讯审核查看详情页面 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="infobox">
            <div class="themeTit">
                <span class="borderone"></span>
                <span class="bordertwo"></span>
                <span class="tittext">惠政发布审核</span>
            </div>
            <div class="itemCon">
                <div class="title">
                    <h3 class="common_titdes" style="font-weight: normal">基本信息</h3>
                </div>
                <div class="dtcon">
                    <span class="lable_span">惠政主题：</span>
                    <span class="line_span">{{content.policyTitle}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">发布机构：</span>
                    <span class="line_span">{{content.cstNm}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">发布人：</span>
                    <span class="line_span">{{content.userName}}</span>
                </div>
                <div class="dtcon">
                    <span class="lable_span">提交日期：</span>
                    <span class="line_span">{{content.createTime | timerFormat(content.createTime)}}</span>
                </div>
                 <div class="dtcon">
                    <span class="lable_span">惠政主图：</span>
                    <span class="line_img"><img v-lazy="content.titleImg"></span>
                </div>
                 <div class="dtcon">
                    <span class="lable_span">惠政内容：</span>
                    <span class="line_area" v-html="content.infoDetail"></span>
                </div>
                <div class="dtcon" v-if="content.avaliableTime && infoList.avaliableEndTime">
                    <span class="lable_span">惠政有效期：</span>
                    <span class="line_span">{{content.avaliableTime | timerFormat(content.avaliableTime)}} 至 {{infoList.avaliableEndTime | timerFormat(infoList.avaliableEndTime)}}</span>
                </div>
            </div>
        </div>
        <hr class="divider">
        <div class="mark">
            <span>审核意见：</span>
            <textarea v-model="mark" placeholder="请输入审核意见（必填）"></textarea>
        </div>
        <p class="btn">
            <span @click="access = true">通过</span>
            <span @click="noAccess = true">不通过</span>
            <span @click="cancelAudit">取消</span>
        </p>
        <!-- 通过审核弹窗 -->
        <el-dialog :visible.sync="access" width='560px' class='access'>
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
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";

    export default {
        data() {
            return {
                breadlist: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "园区管理"
                    },
                    {
                        path: "/parkHall/manage/activityPoolAddPark",
                        name: "任务池"
                    },
                    {
                        path: "",
                        name: "惠政发布审核"
                    }
                ],
                draftInfo: {
                    informationTitle: "",
                    userName: "",
                    phone: "",
                    createTime: "",
                    titleImg: "",
                    content: "",
                    informationId: "",
                },
                access: false,
                noAccess: false,
                infoList: {},
                mark: '',
                auditRole: this.SSH.getItem('LoginUserRol'),
                content:this.$route.query.content
            }
        },
        computed: {},
        filters: {
            timerFormat(vaule) {
                if (!vaule) return;
                var d = new Date(vaule);
                var times = d.getFullYear() +
                    '-' + (parseInt((d.getMonth() + 1)) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                    '-' + (parseInt(d.getDate()) < 10 ? '0' + d.getDate() : d.getDate());
                return times;
            },
        },
        components: {
            EsspBreadCrumb
        },
        created() {
            console.log(this.content)
        },
        methods: {
            auditFn(status) {
                let st = status;
                if (!this.mark) {
                    this.$message({
                        type: 'warn',
                        message: '审核意见不能为空'
                    });
                    return;
                }
                this.$post(this.$apiUrl.manage.auditPolicy, {
                    entityId: this.$route.query.id,
                    parkId: window.sessionStorage.getItem("parkId"),
                    status: st,
                    mark: this.mark
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
                this.$router.push('/parkHall/manage/activityPoolGover')
            },
            //取消审核
            cancelAudit() {
                // this.$post(this.$apiUrl.manage.auditCancer, {
                //     entityId: this.$route.query.id,
                //     parkId: window.sessionStorage.getItem("parkId"),
                //     type: '03',
                //     status: '10',
                //     flag: "noContent"
                // });
                this.$router.push('/parkHall/manage/activityPoolGover')
            }
        }
    }
</script>
<style>
    #manageZXAuditing .access .el-dialog__body,
    #manageZXAuditing .noAccess .el-dialog__body {
        text-align: center;
    }

    #manageZXAuditing .access .el-dialog__body p:nth-of-type(1) span {
        color: red;
    }

    #manageZXAuditing .access .el-dialog__body p:nth-of-type(1),
    #manageZXAuditing .noAccess .el-dialog__body p:nth-of-type(1) {
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        color: #444;
        text-indent: 25px;
    }

    #manageZXAuditing .noAccess .el-dialog__body p:nth-of-type(2) {
        margin-top: 20px;
    }
    .line_area p {
        word-break: break-all;
    }
</style>
<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    .sponsorcon {
        .essp_width_auto();
        padding-bottom: 50px;
        background-color: #fff;
    }

    .infobox {
        padding: 10px 0;
        margin-bottom: 30px;
    }

    .themeTit {
        position: relative;
        margin-bottom: 30px;
        margin-top: 25px;
        text-align: center;
        .tittext {
            font-size: 24px;
            line-height: 36px;
            color: #333333;
        }
        .borderone {
            position: absolute;
            width: 68px;
            left: 37%;
            top: 18px;
            border-top: 2px solid #cccccc;
        }
        .bordertwo {
            position: absolute;
            width: 68px;
            right: 37%;
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
            h3 {
                letter-spacing: 4.8px;
                color: #333;
                margin-bottom: 20px;
                float: left;
                font-size: 20px;
                padding: 0 12px 4px;
                border-left: 10px solid #00a0e9;
            }
        }
        .dtcon {
            width: 100%;
            margin-bottom: 15px;
            overflow: hidden;
        }
        .lable_span {
            float: left;
            width: 185px;
            margin-right: 5px;
            text-align: right;
            font-size: 16px;
            line-height: 40px;
            letter-spacing: 0.4px;
            color: #666666;
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
            padding: 10px;
            min-height: 100px;
            border: 1px solid #ccc;
        }

    }

    .toolbtn {
        text-align: center;
    }

    .btn {
        text-align: center;
        span {
            display: inline-block;
            cursor: pointer;
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
            width: 162px;
            font-size: 16px;
            line-height: 40px;
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
            line-height: 20px;
        }
    }

    .mark {
        width: 960px;
        margin: 0 auto 40px;
        overflow: hidden;
        span {
            float: left;
            width: 167px;
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
