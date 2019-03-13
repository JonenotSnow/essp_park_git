<template>
    <div class="el-main" id="userManage">
        <div v-if="!info"  class="userManage">
            <div class="userHeader">
                <span>
                    <i class="el-icon-circle-plus-outline"></i>
                    还没企业没加入中心？立即邀请TA
                    <span @click="$router.push('/parkHall/manage/requestEnterprice')"><span>点击立即邀请</span></span>
                </span>
                <span>
                    <i class="iconfont icon-tuijianren"></i>试一试系统为你推荐企业>>
                    <span @click="$router.push('/parkHall/manage/IntelligentInvestment')"><span>点击查看推荐</span></span>
                </span>
            </div>
            <div class="search">
                <div>
                    <input type="text" placeholder="请输入搜索企业" v-model="seachVal" />
                    <i class="el-icon-search" @click="getMemInfo"></i>
                </div>
                <div class='item'>
                    <span>我的分类：</span>
                    <span v-for="(it,i) in hotTagList.slice(0,6)" :key="i" :class="{'active':curSelectTag == it.tagId}" @click="getMemByTblTxt(it)" >{{it.tagTxt}}&nbsp;({{it.tagCount}})</span>
                </div>
            </div>
            <div class="userList" v-if="getMemInfoList.length>0">
                <ul>
                    <li v-for="(it,i) in getMemInfoList" :key="i">
                        <div>
                            <img src="@assets/actdetaillogo.png" alt="">
                            <div>
                                <p>{{it.cstNm}}</p>
                                <p>行业：{{it.idyTpcd | idType(it.idyTpcd)}}</p>
                                <p>
                                    <span>标签：</span>
                                    <span class='tagItem' v-if="it.tbList.length>0" v-for="(is,j) in it.tbList.slice(0,5)" :key="j">{{is.lblTxt}}</span>
                                    <span class='tagItem' @click="getDefaultTag(it.cstId)"><i class="el-icon-plus"></i>添加分类</span>
                                </p>
                                <p v-if="it.cstOrgPlace"><i class="icon iconfont icon-dizhi" style="color: orange;"></i>{{it.cstOrgPlace}}</p>
                            </div>
                            <div>
                                <p>
                                    <span  @click="$router.push({path:'/centerIndex/showHome',query:{id:it.cstId}})">查看详情</span>
                                </p>
                                <p>
                                    <span v-if="it.commandInd != '1'" @click="openDelPop(it.cstId)">移除园区</span>
                                    <span v-if="it.commandInd == '1'" class="ts">移除园区</span>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="pageList">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                    </el-pagination>
                </div>
                <!-- 移除园区 -->
                <el-dialog :visible.sync="dialogTableVisible"  width='560px' class='removePark'>
                    <p>是否确认将该成员移除园区</p>
                    <p>确实移除后系统将自动给被移除企业发送被移除园区的消息提示</p>
                    <p>
                        <el-button type="primary" @click="delMemInfo">是</el-button>
                        <el-button type="primary" @click="dialogTableVisible =false">否</el-button>
                    </p>
                </el-dialog>
                <!-- 添加分类 -->
                <el-dialog :visible.sync="addFL" width="720px" center class="reTag">
                    <div class="tabletit">
                        <p class="title_p">请添加合适该企业的标签，可多选</p>
                    </div>
                    <div class="yList">
                        <el-tag v-if="TJTagList && TJTagList.length>0" :key="it.lblId" v-for="it in TJTagList" @click.native="addTagToL(it)">{{it.lblTxt}}</el-tag>
                    </div>
                    <div class="relist">
                        <el-tag :key="tag" v-for="tag in forTagList" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="addFL = false">取 消</el-button> -->
                        <el-button type="primary" @click="saveEntityTags" style="width: 277px;font-size: 18px;">保存</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <div v-else class="noInfo">
            非该园区管理员不能执行此操作!
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            totalCount:0,
            pageNum:1,
            pageSize:5,
            seachVal:'',
            dialogTableVisible:false,
            addType:false,
            showMore:false,
            addFL:false,

            inputVisible: false,
            inputValue: '',
            forTagList:[],
            getMemInfoList:[],
            rzz:JSON.parse(window.localStorage.getItem('rzz')),
            curCasId:'',
            hotTagList:[],//全局标签
            TJTagList:[],//企业推荐标签
            dynamicTags: [],//企业已有标签
            curSelectTag:'',
            info:'',
            stop:false
        }
    },
    async created () {
        await this.getMemInfo();
        await this.getTagUsg();
    },
    filters:{
        idType(value){
            let flag = false;
            let rzz = JSON.parse(window.localStorage.getItem('rzz'));
            for (let i = 0; i < rzz.length; i++) {
                if (rzz[i].code == value) {
                    flag = true;
                    return rzz[i].name;
                }
            }
            if(!flag){
                return '其他行业';
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getMemInfo();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getMemInfo();
        },
        handleClose(tag) {
            this.forTagList.splice(this.forTagList.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            if (this.inputValue.length >5) {
                this.$message({
                    type: 'warn',
                    message: "输入的标签不能超过6个字符,请重新输入",
                })
                this.stop = true;
                return;
            }
            let inputValue = this.inputValue;
            if (inputValue) {
                this.forTagList.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        addTagToL(tag){
            if (`,${this.forTagList},`.indexOf(`,${tag.lblTxt},`)>-1) {
                this.$message({
                    type: 'warning',
                    message: "该类型标签已添加,请勿重新输入"
                })
                return;
            }
            this.forTagList.push(tag.lblTxt);
        },
        getMemInfo(){
            this.curSelectTag = '';
            this.$post(this.$apiUrl.manage.getMemInfo,{
                cstNm : this.seachVal,
                parkId : window.sessionStorage.getItem("parkId"),
                pageSize : this.pageSize,
                pageNum : this.pageNum
            })
            .then((response) => {
                if (response.resultData) {
                    this.getMemInfoList = response.resultData.memberList
                    this.totalCount = response.resultData.memInfoCount;
                }
            },(err)=>{
                this.info = err.data.resultMsg;
            })
        },
        openDelPop(cstId){
            this.dialogTableVisible = true;
            this.curCasId = cstId;
            this.findEntityTags();
        },
        async delMemInfo(){
            await this.$post(this.$apiUrl.manage.delPark,{
                parkId : window.sessionStorage.getItem("parkId"),
                cstId:this.curCasId
            })
            .then((response) => {
                this.$message({
                    type: 'success',
                    message: response.resultMsg
                })
            })
            await this.getMemInfo();
            this.dialogTableVisible = false;
        },
        //打开添加标签分类弹窗
        getDefaultTag(casId){
            this.addFL = true;
            this.curCasId = casId;
            this.forTagList = [];
            this.findEntityTags();
            this.selectLblInfo();
        },
        //企业已有标签
        findEntityTags(){
            this.$post(this.$apiUrl.manage.findEntityTags,{
                    entId : `${window.sessionStorage.getItem("parkId")}_${this.curCasId}`,
                    entTp : '3000001'
                })
                .then((response) => {
                    this.dynamicTags =response.resultData.lblInfo;

                    if (this.dynamicTags.length>0) {
                        this.dynamicTags.map(x=>{
                            this.forTagList.push(x.lblTxt)
                        })
                    }
                })
        },
        //企业推荐标签
        selectLblInfo(){
            this.$post(this.$apiUrl.manage.selectLblInfo,{
                    lblStCd : 2,
                    lblTpCd : '3000001'
                })
                .then((response) => {
                    this.TJTagList =response.resultData.lblInfo
                })
        },
        //全局推荐标签
        getTagUsg(){
            this.$post(this.$apiUrl.manage.getTagUsg,{
                    parkId : window.sessionStorage.getItem("parkId"),
                    tagTp : '3000001',
                    isParkManager:'212' //只要不为空
                })
                .then((response) => {
                    this.hotTagList =response.resultData
                })
        },
        //保存标签
        saveEntityTags(){
            if (this.stop) {
                this.stop = false;
                this.addFL = false;
                return;
            }
            this.$post(this.$apiUrl.manage.saveEntityTags,{
                entId : `${window.sessionStorage.getItem("parkId")}_${this.curCasId}`,
                entTp : '3000001',
                lblTxtList : this.forTagList.join(',')
            })
            .then((response) => {
                // this.$message({
                //     type: 'sucess',
                //     message: response.resultMsg
                // })
            },(err)=>{
                this.$message({
                    type: 'warn',
                    message: response.resultMsg
                })
            })
            setTimeout(()=>{
                this.getMemInfo();
                this.getTagUsg();
            },500)
            this.addFL = false;
        },
        //全局标签查询
        getMemByTblTxt(v){
            this.curSelectTag =v.tagId
            this.$post(this.$apiUrl.manage.getMemByTblTxt,{
                    parkId : window.sessionStorage.getItem("parkId"),
                    lblTxt : v.tagTxt,
                    pageSize : this.pageSize,
                    pageNum : this.pageNum
                })
                .then((response) => {
                    // this.$message({
                    //     type: 'sucess',
                    //     message: response.resultMsg
                    // })
                    this.getMemInfoList = response.resultData.memberList;
                    this.totalCount = response.resultData.totalCount;
                },(err)=>{
                    this.$message({
                        type: 'warn',
                        message: response.resultMsg
                    })
                })
        }
    }
}
</script>
<style>
    #userManage .reTag .el-dialog__body .tabletit{
        text-align: center;
    }
    #userManage .reTag .el-dialog__body .tabletit p,
    #userManage .reTag .el-dialog__body .tabletit h3{
        font-size: 18px;
    }
    #userManage .reTag .el-dialog__body .tabletit p{
        margin-bottom:20px;
    }
    #userManage .reTag .el-dialog__body .relist,
    #userManage .reTag .el-dialog__body .yList{
        width:620px;
        margin:0 auto;
    }
    #userManage .reTag .el-dialog__body .relist{
        width:600px;
        border-radius: 12px;
        border: solid 2px #e9e9e9;
        padding:10px;
    }
    #userManage .reTag .el-dialog__body .relist>span{
        margin-bottom:10px;
    }
    #userManage .reTag .el-dialog__body .relist>.input-new-tag{
        width:100px;
    }
    #userManage .reTag .el-dialog__body .yList{
        padding-top:20px;
        margin:0 auto 10px;
        border-top:2px solid #f5f5f5;
    }
    #userManage .reTag .el-dialog__body .yList span,
    #userManage .reTag .el-dialog__body .relist span{
        margin-left:20px;
        cursor: pointer;
    }
    #userManage .reTag .el-dialog__body .yList span:nth-of-type(1),
    #userManage .reTag .el-dialog__body .relist span:nth-of-type(1){
        margin-left:0;
    }
    #userManage .el-badge__content.is-fixed{
        top:10px;
    }
    #userManage .el-button--mini{
        border-radius: 20px;
    }
</style>
<style lang='less' scoped>
    #userManage{
        width:990px;
        background: #fff;
        padding:0;
        min-height:540px;
        .userManage{
            .userHeader{
                height:50px;
                line-height:50px;
                background-color: #e6f4ff;
                &>span{
                    // overflow: hidden;
                    font-size: 14px;
                    color: #00a0e9;
                    &:nth-of-type(1){
                        float: left;
                    }
                    &:nth-of-type(2){
                        float: right;
                        margin-right:20px;
                    }
                    &>i{
                        margin-left:21px;
                        margin-right:5px;
                    }
                    &>span{
                        display: inline-block;
                        width:146px;
                        height:25px;
                        line-height:25px;
                        cursor: pointer;
                        background: #fff;
                        margin-left:5px;
                        text-align: center;
                        transform: skew(-30deg);
                        box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
                        opacity: 0.7;
                        border-radius: 5px;
                        &>span{
                            display: inline-block;
                            width:120px;
                            height:30px;
                            transform: skew(30deg);
                            color: #00a0e9;
                        }
                        &:hover{
                            box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.2);
                            background: #00a0e9;
                            &>span{
                                color:#fff;
                            }
                        }
                    }
                }
            }
            .search{
                position:relative!important;
                height:100px!important;
                width:990px!important;
                border-bottom: 1px solid #ccc;
                &>div{
                    // min-height:54px;
                    &>input{
                        width:180px;
                        height:32px;
                        outline: none;
                        margin:14px 0 0 20px;
                        padding:0 10px;
                        border:1px;
                        border-radius:14px;
                        float:left;
                        background:#f8f8f8;
                    }
                    &>i{
                        float:left;
                        position:relative;
                        top:22px;
                        left:-30px;
                        font-size: 20px;
                        cursor: pointer;
                    }
                    &.item{
                        margin:15px 0;
                        line-height: 54px;
                        &>span{
                            float: left;
                            margin-left:20px;
                            line-height: 20px;
                            &:not(:nth-of-type(1)){
                                display:inline-block;
                                text-align: center;
                                // min-width:80px;
                                height: 20px;
                                padding: 2px 12px;
                                background: #ccc;
                                color:#fff;
                                border-radius: 12px;
                                cursor: pointer;
                            }
                            &.active{
                                background: #00a0e9;
                            }
                        }
                    }
                }
                &>div:not([class="item"]){
                    overflow: hidden;
                }
                .el-badge{
                    margin-left:10px;
                }
            }
            .userList{
                ul{
                    li{
                        width:990px;
                        border-bottom:1px solid #ccc;
                        &>div{
                            width:950px;
                            min-height: 120px;
                            background-color: #f7f7f7;
                            margin:20px;
                            overflow: hidden;
                            display:flex;
                            &>img{
                                width:120px;
                                height:120px;
                                float: left;
                                align-self: center;
                            }
                            &>div{
                                &:nth-of-type(1){
                                    margin-left:20px;
                                    width:650px;
                                    float: left;
                                    &>p{
                                        line-height:35px;
                                        &:nth-of-type(1){
                                            font-size: 16px;
                                            color: #444444;
                                        }
                                        &:nth-of-type(2){
                                            font-size: 14px;
                                            color: #666;
                                        }
                                        &:nth-of-type(3){
                                            overflow: hidden;
                                            &>span{
                                                float:left;
                                                // width: 70px;
                                                height: 18px;
                                                line-height:18px;
                                                border-radius: 10px;
                                                border: solid 1px #999;
                                                margin-left:10px;
                                                text-align: center;
                                                padding:0 8px;
                                                color:#999;
                                                cursor: pointer;
                                                &:nth-of-type(1){
                                                    margin-left:0;
                                                    border: none;
                                                    width: 45px;
                                                    text-align: left;
                                                    padding: 0;
                                                    color:#666;
                                                }
                                                em{
                                                    color:#00a0e9;
                                                }
                                            }
                                            &>div{
                                                width: 75px;
                                                height:20px;
                                                float: left;
                                                position: relative;
                                                top: -10px;
                                                left: 15px;
                                            }
                                        }
                                        &:nth-of-type(4){
                                            i{
                                                color:orange;
                                            }
                                        }
                                    }
                                }
                                &:nth-of-type(2){
                                    float: right;
                                    margin-right:75px;
                                    height:80px;
                                    margin-top:18px;
                                    &>p{
                                        span{
                                            display: inline-block;
                                            width: 80px;
                                            margin:10px 0;
                                            height: 28px;
                                            line-height:28px;
                                            background-color: #00a0e9;
                                            border-radius: 14px;
                                            font-size: 14px;
                                            color:#fffefe;
                                            text-align: center;
                                            cursor: pointer;
                                            &:hover{
                                                background: #00afff;
                                            }
                                        }
                                        &:nth-of-type(2){
                                            span.ts{
                                                background: #ccc;
                                                cursor: default;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        &:nth-of-type(1){
                            border-top:1px solid #ccc;
                        }
                    }
                }
            }
            .pageList{
                width:915px;
                margin: 118px auto 55px;
                text-align: right;
            }
        }
        .noInfo{
            line-height:240px;
            text-align: center;
        }
    }
    .removePark{
        .el-dialog__header{
            display:none;
        }
        .el-dialog__body{
            padding:0;
            &>p{
                margin:0 auto;
                &:nth-of-type(1){
                    line-height:110px;
                    width:520px;
                    text-align: center;
                    font-size: 20px;
                    color: #333333;
                    border-bottom: solid 2px #ccc;
                }
                &:nth-of-type(2){
                    width: 385px;
                    height: 44px;
                    margin:50px auto;
                    font-size: 16px;
                    text-align: center;
                    color: #ccc;
                }
                &:nth-of-type(3){
                    text-align: center;
                    margin-bottom:50px;
                    &>button{
                        width: 80px;
                        height: 40px;
                        line-height:0;
                        font-size: 20px;
                        border-radius: 3px;
                        &:nth-of-type(1){
                            margin-right:35px;
                        }
                    }
                }
            }
        }
    }
    .addFClass{
        .el-dialog__body{
            padding:20px;
            &>p{
                text-align:right;
                &>i{
                    cursor: pointer;
                }
                &:nth-of-type(2){
                    width:620px;
                    margin:0 auto;
                    text-align: center;
                    // padding:10px 0;
                    font-size: 18px;
                    line-height: 72px;
                    color: #c7c7c7;
                    border-bottom:2px solid #f5f5f5;
                }
            }
            &>.addC{
                width:620px;
                margin:20px auto 10px;
                overflow: hidden;
                li{
                    float: left;
                    width: 96px!important;
                    margin-right:30px;
                    margin-bottom:20px;
                    cursor: pointer;
                    font-size: 16px;
                    text-align: center;
                    height: 38px;
                    border-radius: 6px;
                    line-height:40px;
                    color:#999;
                    border: solid 2px #e9e9e9;
                    &:nth-of-type(5n){
                        margin-right:0;
                    }
                    &:hover{
                        background:#22a2fa;
                        color: #fff;
                    }
                    &.active{
                        font-size: 18px;
                        border-color:#22a2fa;
                        color: #22a2fa;
                    }
                }
            }
            .textArea{
                width: 600px;
                min-width:600px;
                max-width:600px;
                margin-left:30px;
                padding:9px;
                min-height: 130px;
                outline:none;
                border-radius: 12px;
                border: solid 2px #e9e9e9;
            }
            .save{
                text-align: center;
                margin:15px auto 10px;
                button{
                    outline:none;
                    border: none;
                    width: 277px;
                    height: 50px;
                    background:#22a2fa;
                    border-radius: 3px;
                    font-size: 18px;
                    color: #ffffff;
                    cursor: pointer;
                    &:hover{
                        background: #71badb
                    }
                }
            }
        }
    }
    .reTag{
        .title_p{
            color:#c7c7c7;
        }
    }
</style>
