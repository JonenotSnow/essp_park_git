<template>
    <div v-loading="loading2">
        <!-- 园区用不到，暂时不敢删 -->
        <essp-head @getValue="setSendTo" :isloginFlag="isloginFlag"></essp-head>
        <router-view :sendTo="sendTo" v-if="routerShow"/>
        <essp-foot v-if="footerShow"></essp-foot>
        <essp-main-footer v-if="mainFooterShow"></essp-main-footer>
        <el-dialog :visible.sync="htmlUrlShow" width="660px" height="450px" title="平台用户协议"
                   center top="10vh" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
                   class="user-agree-dialog">
            <div class="dialog-border">
                <essp-user-agreement @buttonIsShow="getButtonIsShow"></essp-user-agreement>
                <div class="agree-checkbox"><span @click="checkRead"><el-checkbox v-model="isAgree"
                                                                                  :disabled="isAgreeAbled"></el-checkbox></span>
                    我已认真阅读并同意《平台用户协议》
                </div>
            </div>
            <div class="agree-btn">
                <el-button v-if="agreeShow" type="primary" size="mini" :loading="loadClickTrue" @click="agree()">&nbsp;同&nbsp;&nbsp;&nbsp;&nbsp;意&nbsp;</el-button>
                <el-button v-if="disAgreeShow" type="danger" size="mini" @click="disagree()">&nbsp;拒&nbsp;&nbsp;&nbsp;&nbsp;绝&nbsp;</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import EsspHead from '@/components/EsspHead';
    import EsspFoot from '@/components/EsspFoot';
    import EsspMainFooter from '@/components/EsspMainFooter'
    import esspUserAgreement from '@/components/EsspUserAgreement'


    export default {
        name: "",
        // mixins: [baseLogin],
        components: {
            EsspHead,
            EsspFoot,
            EsspMainFooter,
            esspUserAgreement
        },
        // 需要用到的页面到底下方法中通过this.reload()调用
        data() {
            return {
                mainFooterShow:false,
                footerShow: false,
                routerShow: true,
                sendTo: false,
                htmlUrlShow: true,
                loading2: false,
                isAgree: false,
                isAgreeAbled: true,
                loadClickTrue: false,
                agreeShow: false,
                disAgreeShow: false,
                channel: '',
                accesslink: '',
                agreeIndex: 0, // 1--政务云  2--批量导入
                remoteToken: '',
                isloginFlag: false
            }
        },
        watch: {
            $route () {
                this.init()
            }
        },
        created(){
            this.init()
           
        },
        methods: {
            init(){

            }
        }
    }
</script>

<style lang="less">
    .user-agree-dialog {
        .el-dialog__header {
            padding-top: 33px;
            padding-bottom: 0px;
            .el-dialog__title {
                font-size: 24px;
                color: #22a2fa;
            }
        }
        .el-dialog--center .el-dialog__body {
            padding: 26px 32px 30px;
            .dialog-border {
                height: 480px;
                .agree-checkbox {
                    margin-top: 20px;
                    color: #333;
                }
            }
            .agree-btn {
                margin-top: 20px;
                text-align: center;
            }
        }
    }
</style>
