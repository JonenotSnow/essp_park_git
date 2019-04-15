//审核操作统一
<template>
    <div class="divider">
        <p class="submitMark" v-if="!auditRole.includes('34') && config.review">
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
            <span @click="openOne">通过</span>
            <span @click="openTwo">不通过</span>
            <span @click="cancelAudit">取消</span>
        </p>
        <!-- 通过审核弹窗 -->
        <el-dialog :visible.sync="access" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP"><i class="el-icon-warning"></i>&nbsp;&nbsp;确认通过该{{config.manageText}}发布申请？</p>
            <p class="btn">
                <span @click="access = false">取消</span>
                <span @click="auditFn('02')">确认</span>
            </p>
        </el-dialog>

        <!-- 未通过审核弹窗 -->
        <el-dialog :visible.sync="noAccess" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP"><i class="el-icon-warning"></i>&nbsp;&nbsp;您确认拒绝该{{config.manageText}}发布申请？</p>
            <p class="btn">
                <span @click="noAccess =false">取消</span>
                <span @click="auditFn('12')">确认</span>
            </p>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        config: {
            type: Object,
            default: () => {
                return {
                    review: false,
                    manageText: '',
                    backUrl: '',
                    auditApi: ''
                }
            }
        }
    },
    data() {
        return {
            mark: '',
            access: false,
            noAccess: false,
            isReview: 0,
            auditRole: this.SSH.getItem('LoginUserRol')
        }
    },
    methods: {
        hasFull() {
            if (this.mark.match(/^\s*$/)) {
                this.$message({
                    type: 'warning',
                    message: '审核意见不能为空'
                });
                return false;
            }
            return true
        },
        openOne(){
            if(this.hasFull())
            this.access = true;
        },
        openTwo(){
            if(this.hasFull())
            this.noAccess = true;
        },
        auditFn(status) {
            let st = status;
            let params = {
                entityId: this.$route.query.entityId || this.$route.query.id,
                parkId: window.sessionStorage.getItem("parkId"),
                status: st,
                mark: this.mark
            }
            if(this.config.review){
                params.isReview = this.isReview
            }
            if(this.$route.query.cstId){
                 params.cstId = this.$route.query.cstId
            }
            this.$post(this.config.auditApi, params)
            .then((response) => {
                this.$message({
                    type: 'success',
                    message: response.resultMsg
                });
                this.access = false;
                this.noAccess = false;
                this.$router.push(this.config.backUrl)
            }, (err) => {
            })
        },
        //取消审核
        cancelAudit() {
            this.$router.push(this.config.backUrl)
        }
    }
}
</script>
<style lang="less" scoped>
    
    .divider {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 2px solid #f2f2f2;
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
            width: 145px;
            margin-right: 5px;
            text-align: right;
            font-size: 16px;
            letter-spacing: 0.4px;
            color: #666666;
            line-height: 38px;
        }
        textarea {
            width: 600px;
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

