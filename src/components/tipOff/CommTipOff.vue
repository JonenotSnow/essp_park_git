<template>
<div style="padding-left: 30px;">
    <div class="userAppeal">
        <span class="title">用户举报</span>
        <span class="title-ti">提示：您的个人信息将会严格保密，请放心举报</span>
    </div>
    <div>
        <div style="margin-top: 14px;"><span class="choose-y">请选择举报原因（多选）:<span class="redP">*</span></span></div>
        <!--标签-->
        <div style="height: 114px">
            <div :class="this.default1===true?'choose-b':'choose-b-f'" @click="changeClass(1)">
                <span :class="this.default1===true?'choose-b-i':'choose-b-i-f'">虚假信息</span>
            </div>
            <div :class="this.default2===true?'choose-b':'choose-b-f'" @click="changeClass(2)">
                <span :class="this.default2===true?'choose-b-i':'choose-b-i-f'">有害信息</span>
            </div>
            <div :class="this.default3===true?'choose-b':'choose-b-f'" @click="changeClass(3)">
                <span :class="this.default3===true?'choose-b-i':'choose-b-i-f'">违法信息</span>
            </div>
            <div v-if="rqmShow" :class="this.default6===true?'choose-b':'choose-b-f'" @click="changeClass(6)">
                <span :class="this.default6===true?'choose-b-i':'choose-b-i-f'">需求过期</span>
            </div>
            <div :class="this.default5===true?'choose-b':'choose-b-f'" @click="changeClass(5)">
                <span :class="this.default5===true?'choose-b-i':'choose-b-i-f'">其他</span>
            </div>
        </div>
    </div>
    <div style="clear: both">
        <div style=" margin-top: 10px;"><span class="descri-y">请描述举报原因:</span></div>
        <div style="width: 96%">
            <el-input
                type="textarea"
                :rows="9"
                placeholder="请尽可能详细描述举报原因，以便帮助平台快速处理"
                v-model="textarea">
            </el-input>
        </div>

        <div class="div-but"><el-button class="but" @click="submit"><span class="submit">提交</span></el-button></div>

    </div>

</div>
</template>

<script>
    import { apiUrl } from "@/fetch/apiUrl.js";
    import utils from '../../util/utils'

    export default {
        watch:{
            //监听保存事件，触发关闭弹窗
            button: {
                handler(newValue) {
                    this.$emit('getButtonStatus',newValue)
                },
                deep: true
            },
        },
        props:['asc'],
        created () {
           //onsole.log('cccccc',this.asc)
            if(this.asc.type==='2'){//需求
                this.tipObj.informType='1'
                this.rqmShow=true
            }else if(this.asc.type==='1'){//服务
                this.tipObj.informType='2'
                this.rqmShow=false
            }else if(this.asc.type === '6') {//商品
                this.tipObj.informType='6';
                this.rqmShow=false;
            }
        },
        data () {
            return {
                button:"",
                tipObj:{
                    "informContent":"",//举报内容
                    "informType":"",//类型，需求1，服务2
                    "informReason":"",//举报原因
                    "byInformer":"",//被举报人
                    "informerEnt":"",//所在企业
                    "informExplain":"",//举报说明
                    "entId":"",//需求ID
                },
                rqmShow:false,
                tagList:[],
                default1:true,
                default2:true,
                default3:true,
                default6:true,
                default5:true,
                textarea:""
            };
        },
        methods:{
            //判断数组是否包含一个数
            contains(arr, obj) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return true;
                    }
                }
                return false;
            },
            submit(){
                if(utils.isEmpty(this.SSH.getItem('token'))){
                    this.$message.error("举报失败，原因：未登录，请先登录！")
                    return
                }
                //判断是否选择了举报原因
                if(this.tagList.length<=0){
                    this.$message.warning("举报原因不能为空，请选择举报原因")
                    return ;
                }
                let tagStr=""
                for(let i of this.tagList){
                    tagStr=tagStr+i+','
                }
                //onsole.log(tagStr)
                this.tipObj.informContent=this.asc.reqtitle
                this.tipObj.informReason=tagStr
                this.tipObj.byInformer=this.asc.userid
                this.tipObj.informerEnt=this.asc.comname
                this.tipObj.informExplain=this.textarea
                this.tipObj.entId=this.asc.bsnrqmid
                //onsole.log('this.tipObj====',this.tipObj)
                this.$post(apiUrl.rqmList.insertInformUrl,this.tipObj)
                    .then((response) => {
                        //onsole.log(response)
                        // if(response.resultCode =="CLT000000000" || response.resultCode == "0000000000"){
                            this.$message.success(response.resultMsg)
                            this.button=new Date()
                        // }
                    },(err)=>{
                    })
            },
            //虚假1 有害2 违法3 其他5 6过期
            changeClass(i){
                if(i===1)
                    this.default1=!this.default1
                if(i===2)
                    this.default2=!this.default2
                if(i===3)
                    this.default3=!this.default3
                if(i===5)
                    this.default5=!this.default5
                if(i===6)
                    this.default6=!this.default6
                if(this.contains(this.tagList,i)){
                    this.tagList.splice(this.tagList.findIndex(item => item === i), 1)
                }else{
                    this.tagList.push(i)
                }
                //onsole.log('this.tagList',this.tagList)
            }
        }
    }

</script>

<style lang="less" scoped>

.title{
    font-size: 16px;color: #000000;
}
    .title-ti{
        margin-left: 10px;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0.1px;
        color: #b6b6b6;
    }
    .choose-y{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0.1px;
        color: #666666;
    }
    .choose-b{
        float: left;

        line-height: 40px;
        text-align: center;
        margin-top: 10px;
        margin-right:20px;
        width: 200px;height: 40px;
        background-color: #ececec;
        border: 0px;
        cursor: pointer;
    }
    .choose-b-f{
        float: left;
        line-height: 40px;
        text-align: center;
        margin-top: 10px;
        margin-right:20px;
        width: 200px;height: 40px;
        border: 0px;
        background-color: #e1f4fe;
        cursor: pointer;
    }
    .choose-b-i{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0.1px;
        color: #999999;
    }
    .choose-b-i-f{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0.1px;
        color: #20affb;
    }
    .descri-y{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0.1px;
        color: #666666;
        cursor: pointer;
    }
    .input-y{
        margin-bottom: 10px;
        margin-top: 10px;
        width: 674px;
        height: 140px;
        border-radius: 6px;
        border: solid 2px #e0e0e0;
    }

    .but{

        width: 120px;
        height: 38px;
        background-color: #22a2fa;
        border-radius: 3px;
    }

    .userAppeal{
        border-bottom: #efefef solid 1px;
        padding-bottom:18px;
    }
    .div-but{
        text-align: center;
        margin-top: 10px;
        width: 96%;
        .el-button{
            border: none;
            padding: 12px 45px;
        }
    }
    .redP{
        color: red;	width: 11px;
        height: 13px; margin-left: 6px;
    }
    .submit{
        width: 28px;
        height: 14px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.1px;
        color: #ffffff;
    }
</style>
