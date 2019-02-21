<template>
    <div class="appOut">
        <div class="top">
            <div style="padding: 20px">
                <div class="userAppeal">
                    <span class="title">用户申诉</span>
                </div>
                <div style="clear: both">
                    <div style=" margin-top: 10px;"><span class="descri-y">请描述申诉原因:<span class="redP">*</span></span></div>
                    <div style="width: 100%">
                        <el-input
                            type="textarea"
                            :rows="9"
                            placeholder="请尽可能详细描述申诉原因，以便帮助平台快速处理"
                            v-model="textarea"
                            maxlength="100">
                        </el-input>
                    </div>

                    <div class="div-but" @click="submit"><button class="but"><span class="submit">提交</span></button></div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { apiUrl } from "@/fetch/apiUrl.js";
    export default {
        created () {
            //onsole.log('444',this.$route.query)
        },
        data () {
            return {
                tipObj:{},
                textarea:""
            };
        },
        methods:{
            submit(){
                if(this.utils.isEmpty(this.textarea)){
                    this.$message.warning('申诉原因不能为空！')
                    return
                }
                this.tipObj={
                    'entId':this.$route.query.entId,
                    'appealReason':this.textarea,
                    'appealType':this.$route.query.informType,
                }
                this.$post(apiUrl.rqmList.insertUserComplainUrl,this.tipObj)
                    .then((response) => {
                        //onsole.log(response)
                        // if(response.resultCode == "CLT000000000" || response.resultCode == "0000000000"){
                            this.$message.success("申诉提交成功！")
                            this.$router.push('/messageCenter/sysMsg');//跳转到消息中心
                        // }
                    },(err)=>{
                    })
            }
        }
    }

</script>

<style lang="less" scoped>
    .title{
        font-size: 16px;color: #000000;
    }

    .div-but{
        text-align: center; margin-top: 10px;
    }
    .but{
        margin-top: 14px;
        width: 120px;
        height: 38px;
        background-color: #22a2fa;
        border-radius: 3px;
    }
    .submit{
        width: 28px;
        height: 14px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0.1px;
        color: #ffffff;
    }
    .redP{
        color: red;	width: 11px;
        height: 13px; margin-left: 6px;
    }
    .descri-y{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0.1px;
        color: #666666;
    }
    .userAppeal{
        border-bottom: #efefef solid 1px;
        padding-bottom:18px;
    }
    .top{
        width: 700px;
        height: 384px;
        background-color: #ffffff;margin:0 auto
    }
    .appOut{
        padding-top:50px;padding-bottom: 50px ;
        background-image: linear-gradient(130deg,
        #f7f8fd 0%,
        #dae3f7 100%);
    }
</style>
