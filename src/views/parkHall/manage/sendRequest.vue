<template>
    <div class="sendRequest" id="sendRequest">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class='content'>
            <p>
                <img src="./request.png" alt="">
                <span>邀请函</span>
                <span>INVITATION</span>
            </p>
            <div class="wrap">
                <quillEditor :options="editorOption" v-model="content"></quillEditor>
            </div>
            <p style="display:none;"><span>*</span>请使用编辑器自带功能编辑</p>
            <p class="scan">
                <span @click="scan = true">预览</span>
            </p>
            <p class="save">
                <span @click="inviteMember">确认发送</span>
            </p>
        </div>
        <!-- 确认发送 -->
        <el-dialog :visible.sync="confirmSend" width='520px' height='280px' class='confirmRequest'>
            <p >
                <!-- <i class="el-icon-close" @click="confirmSend=false"></i> -->
            </p>
            <p><img src="../../../assets/sendConofirm.jpg" alt=""></p>
            <p>恭喜发送邀请成功</p>
            <p>
                <el-button type="primary" size='middle' @click="confirmSend=false">返回发送邀请页面</el-button>
            </p>
        </el-dialog>
        <!-- 预览 -->
        <el-dialog :visible.sync="scan" width='850px' height='273px' class='scan'>
            <div class="scanWrap">
                <img src="../../../assets/request_bg.png" alt="">
                <div v-html='content' class='scanContent'></div>
                <p class="check">
                    <span @click="$router.push('/parkIndex/scanIndex')">点击查看{{parkNm?parkNm:'该'}}园区详情</span>
                </p>
                <p class="save">
                    <el-button type="primary" size='small' @click="scan = false" style="font-size: 16px;">取消预览</el-button>
                </p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
    components: {
        EsspBreadCrumb,
        quillEditor
    },
    data() {
        return {
            breadlist: [
                {
                    path: "/parkIndex/park/all",
                    name: this.utils.isBdPark()?"系统管理":"园区管理"
                },
                {
                    path: "/parkHall/manage/userManage",
                    name: "成员管理"
                },
                {
                    path: "",
                    name: "邀请函填写"
                }
            ],
            content: `<p class="ql-indent-1" style="font-size:16px;">尊敬的企业管理员：</p>
                    <p class="ql-indent-3" style="font-size:16px;">您好！</p>
                    <p class="ql-indent-2" style="font-size:16px;">我们诚挚地邀请您加入xxxxxx园区与我们共创辉煌未来，真诚的期待您的加入。</p>
                    <p><br></p>
                    <p class="ql-align-right sd style="font-size:16px;"">邀请单位：xxxxxx园区</p>
                    <p class="ql-align-right" style="font-size:16px;">xxxx年xx月xx日</p>`,
            confirmSend: false,
            scan: false,
            editorOption:{
                readOnly:true,
                placeholder:'',
                modules:{
                    toolbar:[
                        ['bold', 'italic', 'underline'],        // toggled buttons
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        // [{ 'size': ['small', false, 'large', 'huge'] }],
                        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }]
                    ]
                },
                theme:'snow'
            },
            parkNm:''
        };
    },
    created () {
        this.getParkById();
    },
    methods: {
        inviteMember() {
            this.$post(this.$apiUrl.manage.inviteMember, {
                cstId: this.$route.query.cstId,
                parkId: sessionStorage.getItem("parkId"),
                parkName: this.SSH.getItem("parkName"),
                mark:this.content
            }).then(response => {
                if (response.resultCode == "CLT000000000") {
                    this.confirmSend = true;
                    setTimeout(() => {
                        this.confirmSend = false;
                        this.$router.push('/parkHall/manage/requestEnterprice');
                    }, 2000);
                }
            });
        },
        getParkById() {
            this.$post(this.$apiUrl.manage.getParkById, {
                parkId: sessionStorage.getItem("parkId")
            }).then(
                response => {
                    this.parkNm = response.resultData.parkNm
                },
                err => {
                    this.$message({
                        type: "warn",
                        message: response.resultMsg
                    });
                }
            );
        }
    }
};
</script>
<style>
#sendRequest .ql-editor .ql-indent-1 ,.scanContent .ql-indent-1{
    line-height:35px;
    padding-left:3em;
    font-size:16px;
    color:#666;
}
#sendRequest .ql-editor .ql-size-large{
    font-size:1.5em;
}
#sendRequest .ql-editor .ql-indent-2,.scanContent .ql-indent-2 {
    line-height:35px;
    padding-left:3em;
    text-indent:2em;
    color:#666;
    font-size:16px;
}
#sendRequest .ql-editor .ql-indent-3,.scanContent .ql-indent-3 {
    line-height:35px;
    padding-left:5em;
    font-size:16px;
    color:#666;
}
#sendRequest .ql-editor .ql-align-right,.scanContent .ql-align-right{
    line-height:25px;
    text-align: right;
    font-size:16px;
    color:#666;
}
#sendRequest .sd{
    margin-top:35px;
}
#sendRequest .el-dialog__body{
    padding: 0!important;
}
</style>

<style lang='less' scoped>
.content {
    width: 1200px;
    background: #fff;
    margin: 0 auto;
    & > p {
        width: 850px;
        margin: 0 auto;
        font-size: 24px;
        line-height: 90px;
        color: #444444;
        text-align: center;
        &:nth-of-type(1) {
            position:relative;
            span{
                &:nth-of-type(1){
                    position:absolute;
                    left:391px;
                    top:3px;
                }
                &:nth-of-type(2){
                    position:absolute;
                    left:386px;
                    color:#666;
                    font-size: 14px;
                    top:23px;
                }
            }
        }
        &:nth-of-type(2) {
            line-height: 40px;
            margin-top:40px;
            font-size: 14px;
            text-align: left;
            span{
                color:red;
            }
        }
        &:nth-of-type(3) {
            text-align: left;
            line-height: 30px;
        }
        &.scan{
            span{
                background: #e6f4ff;
                font-size: 16px;
                text-align: center;
                display:inline-block;
                width: 100px;
                height:40px;
                line-height: 40px;
                color: #00a0e9;
                cursor: pointer;
                letter-spacing: 4.8px;
            }
        }
        &.save{
            margin-bottom: 20px;
            padding-bottom: 70px;
            span{
                cursor: pointer;
                text-align: center;
                display:inline-block;
                width: 80px;
                height:30px;
                background:linear-gradient(31deg,#22a2fa 0%, #10b5ff 100%);
                border-radius: 5px;
                line-height: 30px;
                font-size: 16px;
                color: #fff;
            }
        }
    }
    .wrap {
        width: 850px;
        height: 400px;
        margin: 0 auto;
        .quill-editor {
            height: 83%;
            .ql-container {
                // background:red;
            }
        }
    }
}
.confirmRequest {
    .el-dialog__body {
        padding: 0 !important;
        & > p {
            text-align: right;
            & > i {
                cursor: pointer;
                margin-right: 10px;
                margin-top: 10px;
            }
            &:not(:first-child) {
                margin: 0 auto;
                text-align: center;
                font-size: 18px;
                line-height: 72px;
                color: #c7c7c7;
            }
            &:nth-of-type(1) {
                border-top: 5px solid #00a0e9;
                height:35px;
            }
            &:nth-of-type(3) {
                font-size: 20px;
                line-height: 30px;
                padding: 10px 0;
                color: #333333;
            }
            &:nth-of-type(4) {
                padding-bottom: 30px;
                button {
                    font-size: 18px;
                }
            }
        }
    }
}
.scan {
    .scanWrap {
        position: relative;
        background: #ddd;
        & > img {
            position: absolute;
            top: 0;
            z-index: 101;
        }
        .scanContent {
            width: 560px;
            margin: 0 auto;
            position: absolute;
            top: 130px;
            left: 145px;
            z-index: 102;
            p {
                line-height: 35px;
                font-size: 16px;
                color: #666666;
                &.title {
                    line-height: 50px;
                    text-indent: 40px;
                    font-size: 15px;
                }
                &.subTitle {
                    text-indent: 90px;
                    margin-bottom: 10px;
                }
                &.Rc{
                    line-height: 30px;
                    width: 474px;
                    margin: 0 auto;
                    text-indent: 41px;
                    word-wrap: break-word;
                }
                &.addr {
                    margin-top: 70px;
                    text-align: right;
                }
                &.RTime{
                    line-height: 40px;
                    text-align: right;
                }
            }
        }
        .check,
        .save {
            width: 560px;
            margin: 0 auto;
            position: absolute;
            left: 145px;
            z-index: 102;
        }
        .check {
            width: 640px;
            top: 404px;
            text-align: right;
            span {
                font-size: 14px;
                line-height: 30px;
                color: #00a0e9;
                cursor: pointer;
            }
        }
        .save {
            top: 435px;
            text-align: center;
        }
    }
}

</style>
