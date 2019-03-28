<template>
    <div class="scanModelTwo" id="scanModelTwo" v-loading='bLoading' element-loading-text="正在拼命请求资源..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="pic">
            <img src="../../../assets/scan_bg.png" alt="">
            <div class="middle">
                <div>
                    <div class="logo" @click="clearCurIndex" v-loading='loading' element-loading-text="正在上传图片..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-upload v-if="logoPic == ''" class="avater-uploader" :before-upload="beforeAvatarUpload" :action='uploads'>
                            <i class="icon iconfont icon-tianjia-" style="font-size:30px;display:block;margin-top:35px;"></i>
                            <p style="font-size:18px;color:#4d4d4d;margin-top:5px;">企业logo</p>
                            <p style="font-size:12px;color:#999;margin-top:15px;">建议尺寸300*300像素</p>
                        </el-upload>
                        <div v-else class="alterPic" @click="logoPic=false">
                            <img :src="logoPic" alt="">
                            <p>更改图片</p>
                        </div>
                    </div>
                    <div>
                        <p>{{displayList.parkNm}}</p>
                        <p>成立日期：
                            <span v-if="displayList.setUpTime">{{displayList.setUpTime.slice(0,10)}}</span>
                        </p>
                        <p>联系电话：{{displayList.parkAdminTel}}</p>
                        <p v-if="!isBdPark">占地面积：{{displayList.parkSize}}平方米</p>
                        <p v-else class="address">联系邮箱：{{displayList.email}}</p>
                        <p>园区地址：{{displayList.parkPosition}}</p>
                    </div>
                </div>
                <div>
                    <p>点击立即申请加入园区</p>
                    <p>
                        <span>申请加入园区</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="list">
            <p class="titleZ">
                <i></i>
                {{title}}
                <i></i>
            </p>
            <div class="listC" v-for="(it,index) in displayList.parkSet" :key="index">
                <div class="left" @click="getCurOrder(index)" v-loading='loading' element-loading-text="正在上传图片..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-upload v-if="!it.img" :before-upload="beforeAvatarUpload" :action='uploads'>
                        <i class="icon iconfont icon-tianjia-" style="font-size:30px;display:block;margin-top:160px;"></i>
                        <p class="el-icon" style="font-size:24px;color:#999;top:28px;">点击上传模块配图</p>
                        <p class="el-icon" style="font-size:12px;color:#999;top:77px;">注：支持jpg/jpeg/gif/png等格式上传，建议尺寸600*420像素、大小5M内。</p>
                    </el-upload>
                    <div class="alterPic alterPicL" v-else @click="moudleItemClick(index)">
                        <img :src="it.img" alt="">
                        <p>更改图片</p>
                    </div>

                </div>
                <div class="right">
                    <p class="title">
                        <input type="text" :placeholder="`请输入模块${index+1}标题`" v-model='it.title'>
                        <i class="el-icon-delete" @click="delParams(index,0)" v-if="!isBdPark"></i>
                    </p>
                    <div class="editorContent">
                        <!-- <quill-editor :options="toolOptions" v-model='it.content'></quill-editor> -->
                        <vue-ueditor :id="index" v-model="it.content" :ueditorConfig="editorOption"></vue-ueditor>
                        <span>350字</span>
                    </div>
                </div>
            </div>
            <p class="create">
                <span @click="createModule"><i class='el-icon-plus'></i>添加新模块</span>
                <span @click="scanTwo = true">预览</span>
            </p>
            <p class="createSave" v-if="isBdPark">
                <span @click="getDataList()">保存上传</span>
                <span @click="$router.push('/parkHall/manage/baseInfo')">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</span>
            </p>
            <p class="createSave" v-else>
                <span @click="accessT=true">暂&nbsp;&nbsp;存</span>
                <span @click="getDataList(0)">保存上传</span>
            </p>
        </div>

        <!-- 预览模板 -->
        <el-dialog :visible.sync="scanTwo" width='1200px' height='280px' class='scanTwoM'>
            <div class="pic">
                <img src="../../../assets/scan_bg.png" alt="">
                <div class="middle">
                    <div>
                        <div class="logo">
                            <img :src="logoPic" alt="">
                        </div>
                        <div>
                            <p>{{displayList.parkNm}}</p>
                            <p>成立日期：
                                <span v-if="displayList.setUpTime">{{displayList.setUpTime.slice(0,10)}}</span>
                            </p>
                            <p>联系电话：{{displayList.parkAdminTel}}</p>
                            <p  v-if="!isBdPark">占地面积：{{displayList.parkSize}}平方米</p>
                            <p  v-else class="address">联系邮箱：{{displayList.email}}</p>
                            <p>园区地址：{{displayList.parkPosition}}</p>
                        </div>
                    </div>
                    <div>
                        <p>点击立即申请加入园区</p>
                        <p>
                            <span>申请加入园区</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="list">
                <p class="titleZ">
                    <i></i>
                    园区概览
                    <i></i>
                </p>
                <div class="listC" v-for="(it,index) in displayList.parkSet" :key="index">
                    <div class="left">
                        <img :src="it.img" alt="">
                    </div>
                    <div class="right">
                        <p class="title">{{it.title}}</p>
                        <div v-html="it.content"></div>
                    </div>
                </div>
            </div>
            <p class="cancelScan">
                <el-button type="primary" @click="scanTwo=false">取消预览</el-button>
            </p>
        </el-dialog>

        <!-- 园区概览设置已成功上传 -->
        <el-dialog :visible.sync="confirmSend" width='520px' height='280px' class='confirmSend' :show-close="false">
            <div>
                <p class="confirmSend1 concom">
                    <i class="el-icon-close" @click="confirmSend=false" ></i>
                </p>
                <p class="confirmSend2 concom"><img src="../../../assets/sendConofirm.jpg" alt=""></p>
                <p class="confirmSend3 concom">园区概览设置已成功上传</p>
                <p class="confirmSend4 concom">
                    <el-button type="primary" size='mini' @click="$router.push('/parkHall/manage/baseInfo')">返回</el-button>
                </p>
            </div>
        </el-dialog>

        <!-- 园区概览暂存 -->
        <el-dialog :visible.sync="accessT" width='520px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP">
                <i class="el-icon-warning"></i>&nbsp;&nbsp;是否确认暂存当前模板编辑内容</p>
            <p class="btn">
                <span @click="accessT = false">取消</span>
                <span @click="getDataList(1)">确认</span>
            </p>
        </el-dialog>
        <!-- 有暂存时给提示是否显示暂存 -->
        <el-dialog :visible.sync="access" width='520px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP">
                <i class="el-icon-warning"></i>&nbsp;&nbsp;存在暂存信息，是否显示</p>
            <p class="btn">
                <span @click="getModuleData(0)">否</span>
                <span @click="getModuleData(1)">是</span>
            </p>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog :visible.sync="accessA" width='520px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP">
                <i class="el-icon-warning"></i>&nbsp;&nbsp;是否确认删除该模块</p>
            <p class="btn">
                <span @click="accessA = false">取消</span>
                <span @click="delParams(2,1)">确认</span>
            </p>
        </el-dialog>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
export default {
    name: "",
    components: {
        EsspBreadCrumb,
    },
    data() {
        return {
            breadlist: [
                {
                    path:'/parkIndex/park/all',
                    name: this.utils.isBdPark()?"系统管理":"园区管理"
                },
                {
                    path: "/parkHall/manage/baseInfo",
                    name: this.utils.isBdPark()?"平台设置":"园区设置"
                },
                {
                    path: "/parkHall/manage/baseInfo",
                    name: this.utils.isBdPark()?"关于我们":"概览设置"
                },
                {
                    path:'/',
                    name: "模板编辑"
                }
            ],
            // 编辑器提示语
            editorOption: {
                initialFrameWidth:558,
                initialFrameHeight: 220,
                UEDITOR_HOME_URL: this.$urlUEditor,
            },
            scanTwo: false,
            logoPic: "",
            dialogImageUrl: "",
            curIndex: "",
            uploads: "",
            imgUrlResList: [],
            picOrder: 0,
            listM: [],

            displayList: {
                parkSet: [],
                imgUrl: ""
            },
            loading: false,
            bLoading: false,
            confirmSend:false,
            title:this.utils.isBdPark()?"关于我们":"园区概览",
            isBdPark: this.utils.isBdPark(),
            accessT:false,
            access:false,
            accessA:false,
            delIndex:'',//删除模块的索引
        };
    },
    async created() {
        this.bLoading = true;
        this.uploads = this.$apiUrl.upload.upload;
        await this.getParkById();
    },
    methods: {
        moudleItemClick(index) {
            this.displayList.parkSet[index].img = "";
        },
        createModule() {
            var moduleL = {
                img: "",
                title: "",
                content: ""
            };
            this.displayList.parkSet.push(moduleL)
        },
        clearCurIndex() {
            if(this.logoPic){
                this.delPic(this.logoPic);
            }
            this.curIndex = "logoPic";
        },
        getCurOrder(it) {
            if(this.displayList.parkSet[it].img){
                this.delPic(this.displayList.parkSet[it].img);
            }
            this.displayList.parkSet[it].img = "";
            this.curIndex = it;
        },
        delPic(picUrl) {
            this.$post(this.$apiUrl.upload.deload, { fileUrl: picUrl });
        },
        beforeAvatarUpload(file) {
            var _this = this;
            const isJPG =
                file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error("图片只支持jpg、png、gif等格式上传");
                return;
            }
            if (!isLt5M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
                return isLt5M;
            }
            let param = new FormData(); // 创建form对象
            param.append("file", file);
            param.append("type", "park");
            param.append("model", "manageModuleTwo");
            _this.loading = true;
            _this.$post(_this.$apiUrl.upload.upload, param).then(response => {
                if (_this.curIndex == "logoPic") {
                    _this.logoPic = response.resultData[0].url;
                } else {
                    var parkSet = _this.displayList.parkSet;
                    for (let i = 0; i < parkSet.length; i++) {
                        if (_this.curIndex == i) {
                            parkSet[i].img = response.resultData[0].url;
                            break;
                        }
                    }
                    _this.displayList.parkSet = parkSet;
                }
                _this.loading = false;
            });

            return false; // 返回false不会自动上传
        },
        getDataList(type) {
            //type 0 保存  1 上传
            let _that = this;
            // this.displayList.parkSet = "default1";//测试用作清空模板

            let saveParams = {
                logo: this.logoPic,
                parkSet: this.displayList.parkSet,
                parkId: window.sessionStorage.getItem("parkId"),
                parkService : this.$route.query.moduleType.toString()
            }
            let timelyParams = {
                logo: this.logoPic,
                temp2:this.displayList.parkSet,
                parkId: window.sessionStorage.getItem("parkId")
            };
            let params = {};
            //保定和标准版保存（type==0）是用保存参数saveParams，标准版存用暂存temp2参数timelyParams
            if (this.isBdPark || type == 0) {
                params = saveParams;
            }else{
                params = timelyParams;
            }
            this.$post(this.$apiUrl.manage.updatePark, params).then(
                response => {
                    // this.$message({
                    //     message: response.resultMsg,
                    //     type: 'success'
                    // });
                    if (this.isBdPark || type == 0) {
                         _that.confirmSend = true;
                    }else{
                        _that.accessT =  type == 1 ?true:false;
                    }
                    setTimeout(() => {
                        _that.confirmSend = false;
                        _that.accessT = false;
                        this.$router.push("/parkHall/manage/baseInfo");
                    }, 2000);
                },
                err => {
                    this.$message({
                        type: "warning",
                        message: response.resultMsg
                    });
                }
            );
        },
        getParkById() {
            var _this = this;
            this.$post(this.$apiUrl.manage.getParkById, {
                parkId: sessionStorage.getItem("parkId")
            }).then(
                response => {
                    _this.displayList = response.resultData;
                    //初始数据
                    if (_this.displayList.parkSet && _this.displayList.parkSet !="default1") {
                        _this.displayList.parkSet = JSON.parse(_this.displayList.parkSet);
                    }else{
                        _this.displayList.parkSet = [{img:'',title:'',content:''}];
                    }
                    //返回数据存logo图片
                    if (response.resultData.imgUrl) {
                        this.logoPic = response.resultData.imgUrl;
                    }
                    //暂存功能  保定只有保存没有暂存，标准版有暂存temp2
                    if (!_this.isBdPark) {
                        //之前有暂存模板
                        if (_this.displayList.temp2) {
                            this.access = true;
                        }
                    }
                    this.bLoading = false;
                },
                err => {
                    this.$message({
                        type: "warning",
                        message: response.resultMsg
                    });
                }
            );
        },
        //标准版筛选出模板数据
        getModuleData(type){
            //type 0 保存的模板数据 1 暂存的模板数据
            if (type == 1) {
                this.displayList.parkSet = JSON.parse(this.displayList.temp2);
            }
            this.access = false;
        },
        //删除模块
        delParams(moudelIndex,type){
            //type 0  打开删除框  保存删除信息   1 删除操作
            if (type == 0) {
                this.accessA = true;
                this.delIndex = moudelIndex;
                return;
            }else{
                let that = this;
                let newData = [];
                let forArr = this.displayList.parkSet;
                forArr.forEach((item,index)=>{
                    if (this.delIndex != index) {
                        newData.push(item);
                    }
                })
                this.displayList.parkSet = newData;
                this.accessA = false;
            }
        }
    }
};
</script>

<style>
#scanModelTwo .editorContent .ql-container {
    height: 235px !important;
    min-height: 235px !important;
}
#scanModelTwo .ql-editor {
    height: 235px;
    overflow-y: scroll;
}
#scanModelTwo .logo {
    overflow: hidden;
}
#scanModelTwo .logo .upload {
    padding-top: 18px;
    text-align: center;
}
#scanModelTwo .el-upload {
    display: block;
}
#scanModelTwo .logo img {
    width: 150px;
    height: 150px;
}
#scanModelTwo .el-upload i {
    margin-top: 40px;
    color: #00a0e9;
}
#scanModelTwo .listC .el-upload i {
    margin-top: 75px;
}
#scanModelTwo .list .left .upload-demo {
    text-align: center;
    margin-top: 100px;
}
#scanModelTwo .list .left .el-icon-circle-plus-outline {
    position: relative;
    top: 100px;
}
#scanModelTwo .list .left .el-icon {
    position: relative;
    top: 105px;
}
#scanModelTwo .list .left .el-upload-dragger {
    margin: 0 auto;
}
#scanModelTwo .scanTwoM .el-dialog__header{
    display:none;
}
/* 配置无效 */
/* #scanModelTwo .ql-video,#scanModelTwo .ql-image,#scanModelTwo .ql-link{
    display:none;
} */
#scanModelTwo .access .el-dialog__header {
    display: none;
}

#scanModelTwo .access .el-dialog__body {
    /* text-align: center; */
    overflow: hidden;
    padding: 30px 20px;
}

/* #scanModelTwo .access .el-dialog__body p:nth-of-type(1) {
    line-height: 55px;
} */
</style>


<style scoped lang='less'>
.scanModelTwo {
    & > p {
        &:nth-of-type(1) {
            width: 1200px;
            margin: 15px auto 9px;
            font-size: 16px;
            color: #666666;
        }
    }
    .pic {
        margin: 0 auto;
        position: relative;
        height: 180px;
        & > img {
            max-width: 100%;
            position: absolute;
            height: 180px;
        }
        .middle {
            width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            overflow: hidden;
            & > div {
                width: 240px;
                float: left;
                &:nth-of-type(1) {
                    margin-left: 93px;
                    width: 720px;
                    margin-top: 15px;
                    & > div {
                        overflow: hidden;
                        &.logo {
                            width: 150px;
                            height: 150px;
                            float: left;
                            background: #fff;
                            .upload {
                                padding-top: 15px;
                                text-align: center;
                            }
                        }
                        &:nth-of-type(2) {
                            margin-left: 25px;
                            float: left;
                            width: 545px;
                            height: 150px;
                            overflow: hidden;
                            & > p {
                                font-size: 14px;
                                line-height: 30px;
                                color: #ffffff;
                                &:nth-of-type(1) {
                                    font-size: 20px;
                                    line-height: 30px;
                                    margin-bottom:4px;
                                    color: #ffffff;
                                }
                            }
                        }
                    }
                }
                &:nth-of-type(2) {
                    margin-top: 40px;
                    & > p {
                        text-align: center;
                        &:nth-of-type(1) {
                            line-height: 40px;
                            font-size: 18px;
                            color: #ffffff;
                        }
                        &:nth-of-type(2) {
                            margin-top: 10px;
                            span {
                                display: inline-block;
                                width: 149px;
                                height: 40px;
                                background-image: linear-gradient(
                                    0deg,
                                    #f5f5f5 0%,
                                    #ffffff 100%
                                );
                                box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                                border-radius: 20px;
                                border: solid 1px #cccccc;
                                font-size: 15px;
                                line-height: 40px;
                                color: #666666;
                                cursor: pointer;
                                &:hover {
                                    background: #f2f2f2;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .list {
        width: 1200px;
        margin: 0 auto 20px;
        & > p.titleZ{
            font-size: 24px;
            line-height: 36px;
            margin: 44px auto 45px;
            color: #333333;
            text-align: center;
            i {
                display: inline-block;
                width: 80px;
                border: 1px solid #ddd;
                position: relative;
                top: -6px;
            }
        }
        .listC {
            height: 420px;
            background: #fff;
            overflow: hidden;
            .left {
                float: left;
                width: 598px;
                height: 418px;
                text-align: center;
                border: 1px dashed #F2F2F2;
                img {
                    width: 600px;
                    height: 420px;
                }
            }
            .right {
                float: right;
                padding: 20px;
                width: 558px;
                border: 1px dashed #F2F2F2;
                & > p {
                    input {
                        width: 347px;
                        height: 35px;
                        border: solid 1px #cccccc;
                        margin-bottom: 20px;
                        padding: 0 10px;
                    }
                    i{
                        float: right;
                        margin-top: 12px;
                        cursor: pointer;
                        font-size: 16px;
                        &:hover{
                            color:#00a0e9;
                        }
                    }
                }
                .editorContent{
                    &>span{
                        font-size:14px;
                        color:#ccc;
                        float: right;
                        position: relative;
                        top: -20px;
                        right: 2px;
                    }
                }
            }
            &:nth-of-type(2n) {
                .left {
                    float: right;
                    border: 1px dashed #F2F2F2;
                }
                .right {
                    float: left;
                    border: 1px dashed #F2F2F2;
                }
            }
        }
        .create {
            margin: 20px 0;
            span{
                text-align: center;
                display:inline-block;
                width: 100px;
                height:40px;
                line-height: 40px;
                font-size: 14px;
                color: #666;
                cursor: pointer;
                &:nth-of-type(1) {
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    i{
                        color:#00a0e9;
                        font-size: 14px;
                    }
                }
                &:nth-of-type(2) {
                    float: right;
                    background: #e6f4ff;
                    color:#00a0e9;
                    font-size: 16x;
                }
            }
        }
        .createSave {
            padding: 40px 0 60px;
            text-align: center;
            span{
                text-align: center;
                display:inline-block;
                width: 100px;
                height:40px;
                background:linear-gradient(#22a2fa 0%, #10b5ff 100%);
                border-radius: 5px;
                line-height: 40px;
                font-size: 16px;
                color: #fff;
                cursor: pointer;
                &:nth-of-type(2) {
                    margin-left: 120px;
                }
            }
        }
    }
}
.scanTwoM {
    .pic {
        margin: 0 auto;
        position: relative;
        height: 180px;
        & > img {
            max-width: 100%;
            position: absolute;
            height: 180px;
        }
        .middle {
            width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            overflow: hidden;
            & > div {
                // width: 600px;
                float: left;
                &:nth-of-type(1) {
                    margin-left: 93px;
                    width: 700px;
                    margin-top: 15px;
                    & > div {
                        overflow: hidden;
                        &.logo {
                            float: left;
                            & > img {
                                width: 150px;
                                height: 150px;
                            }
                        }
                        &:nth-of-type(2) {
                            margin-left: 25px;
                            width: 360px;
                            float: left;
                            & > p {
                                font-size: 14px;
                                line-height: 30px;
                                color: #ffffff;
                                &:nth-of-type(1) {
                                    font-size: 20px;
                                    line-height: 30px;
                                    color: #ffffff;
                                    margin-bottom:5px;
                                }
                            }
                        }
                    }
                }
                &:nth-of-type(2) {
                    margin-top: 33px;
                    & > p {
                        text-align: center;
                        &:nth-of-type(1) {
                            line-height: 40px;
                            font-size: 18px;
                            color: #ffffff;
                        }
                        &:nth-of-type(2) {
                            margin-top: 10px;
                            span {
                                display: inline-block;
                                width: 149px;
                                height: 40px;
                                background-image: linear-gradient(
                                    0deg,
                                    #f5f5f5 0%,
                                    #ffffff 100%
                                );
                                box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                                border-radius: 20px;
                                border: solid 1px #cccccc;
                                font-size: 15px;
                                line-height: 40px;
                                color: #666666;
                                cursor: pointer;
                                &:hover {
                                    background: #f2f2f2;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .list {
        width: 1160px;
        margin: 0 auto 20px;
        & > p.titleZ {
            margin: 45px auto 55px;
            font-size: 24px;
            line-height: 36px;
            color: #333333;
            text-align: center;
            i {
                display: inline-block;
                width: 80px;
                border: 1px solid #ddd;
                position: relative;
                top: -6px;
            }
        }
        .listC {
            height: 420px;
            background: #fff;
            overflow: hidden;
            .left {
                float: left;
                width: 580px;
                border:none;
                img {
                    width: 580px;
                }
            }
            .right {
                float: right;
                border:none;
                padding: 20px;
                width: 535px;
                & > p {
                    &.title {
                        font-size: 20px;
                        color: #444444;
                    }
                    &:nth-of-type(2) {
                        margin-top: 40px;
                    }
                    &:nth-of-type(3) {
                        margin-top: 20px;
                    }
                    &:not(:first-child) {
                        line-height: 25px;
                    }
                }
                &>div{
                    height: 350px;
                    overflow: auto;
                    margin-top: 10px;
                }
            }
            &:nth-of-type(2n) {
                .left {
                    float: right;
                }
                .right {
                    float: left;
                }
            }
        }
    }
    .cancelScan {
        margin-top: 40px;
        padding-bottom: 60px;
        text-align: center;
    }
}
.alterPic,
.alterPicL {
    position: relative;
    img {
        width: 150px;
        height: 150px;
    }
    p {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        line-height: 110px;
        z-index: 101;
        text-align: center;
        background: #000;
        opacity: 0.5;
        color: #fff;
        display: none;
    }
    &:hover {
        p {
            display: block;
            cursor: pointer;
        }
    }
}
.alterPicL {
    p {
        font-size: 30px;
        line-height: 420px;
    }
}

.confirmSend {
    .concom{
        text-align: right;
        & > i {
            cursor: pointer;
            margin-right: 10px;
            margin-top: 10px;
        }
            &.confirmSend2,&.confirmSend3,&.confirmSend4 {
                margin: 0 auto;
                text-align: center;
                font-size: 18px;
                line-height: 72px;
                color: #c7c7c7;
            }
            &.confirmSend1 {
                height: 50px;
                border-top: 5px solid #00a0e9;
                position: relative;
                top: -30px;
                left: -20px;
                width: 520px;
            }
            &.confirmSend3 {
                font-size: 20px;
                line-height: 30px;
                color: #333333;
            }
            &.confirmSend4  {
                padding-bottom: 20px;
                button {
                    font-size: 18px;
                    margin: 33px 30px 20px;
                }
            }
    }
}


.access {
    .titleTips {
        text-indent: 36px;
        font-size: 24px;
        color: #555;
        position: relative;
        font-weight: normal;
        top: -12px;
        margin-top: 5px;
        text-align: left;
    }
    .accessP {
        text-indent: 20px;
        text-align: left;
        font-size: 20px;
        color: #333;
        line-height: 30px;
        i {
            font-size: 28px;
            color: #00a0e9;
        }
    }
    .btn {
        margin-top: 35px;
        text-align: right;
        span {
            text-align: center;
            display: inline-block;
            width: 100px;
            height: 35px;
            border-radius: 2px;
            line-height: 35px;
            font-size: 18px;
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
                margin-right:11px;
                background: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                color: #fff;
            }
        }
    }
}
</style>
