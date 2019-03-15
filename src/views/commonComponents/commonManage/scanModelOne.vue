<template>
    <div class="scanModelOne" id="scanModelOne"  v-loading='bLoading' element-loading-text="正在拼命请求资源..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="scanWrap">
            <div class="banner" @click="getCurType('banner')" v-loading='loading' element-loading-text="正在上传图片..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-upload v-if="bannerDisList.length==0"
                    class="avater-uploader"
                    :before-upload="beforeUpload"
                    :action='uploads'
                    :multiple='true'>
                    <i class="icon iconfont icon-tianjia-" style="font-size:30px;line-height:50px;display:block;margin-top:165px;"></i>
                    <p style="font-size:24px;line-height:50px;color:#999;">点击上传园区轮播图</p>
                    <p style="font-size:12px;color:#999;margin-top:50px;">注：可支持多图片同时选取上传,支持jpg、png、gif格式上传，建议尺寸1200*450像素、大小5M内、尺寸一致。</p>
                </el-upload>
                <el-carousel indicator-position="none" height="450px">
                    <el-carousel-item v-for="(item,i) in bannerDisList" :key="i">
                        <img :src="item" alt="" @click="delBannerClick(item)">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="listContent">
                <div class="aside">
                    <p class="addressParkName">{{parkInfoes.parkNm}}</p>
                    <div class="upload" @click="getCurType('comlogo')" v-loading='loading' element-loading-text="正在上传图片..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-upload v-if="!comlogo"
                            class="avater-uploader"
                            :before-upload="beforeUpload"
                            :action='uploads'>
                            <i class="icon iconfont icon-tianjia-" style="font-size:30px;display:block;margin-top:48px;"></i>
                            <p style="font-size:18px;color:#4d4d4d;">企业logo</p>
                            <p style="font-size:12px;color:#999;">建议尺寸300*300像素</p>
                        </el-upload>
                        <img v-else :src="comlogo" alt="" @click="delComlogoClick(comlogo)">

                    </div>
                    <p class="address">成立日期：
                        <span v-if="parkInfoes.setUpTime">{{parkInfoes.setUpTime.slice(0,10)}}</span>
                    </p>
                    <p class="address">联系电话：{{parkInfoes.parkAdminTel}}</p>
                    <p  v-if="!isBdPark" class="address">占地面积：{{parkInfoes.parkSize}}平方米</p>
                    <p  v-else class="address">联系邮箱：{{parkInfoes.email}}</p>
                    <div class="addressT">
                        <span>园区地址：</span>
                        <div>{{parkInfoes.parkPosition}}</div>
                    </div>
                    <p class="addressBtn">
                        <span>申请加入园区</span>
                    </p>
                </div>
                <div class="main">
                    <div class="moduleContent"  @click="getCurType('content')" v-for="(it,moudelIndex) in moduleList" :key="moudelIndex">
                        <div class="title">
                            <el-input type="text" :placeholder="`请输入模块${moudelIndex+1}标题`" v-model="it.title"></el-input>
                            <i v-if="!isBdPark" class="titleRight el-icon-delete" @click="delParams(moudelIndex,0)"></i>
                            <div class="titleRight">
                                <span>选择模块类型：</span>
                                <el-select v-model="it.isPic">
                                    <el-option label="无配图" value="0"></el-option>
                                    <el-option label="可配图" value="1"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="noPic">
                            <vue-ueditor v-model="it.content" :ueditorConfig="editorOption"></vue-ueditor>
                        </div>
                        <div class="picList" v-if="it.isPic == '1'">
                            <div v-for="(is,itemindex) in imgBoxA[moudelIndex]" :key="itemindex" @click="getCurPicOrder(itemindex,moudelIndex)"
                            v-loading='loading' element-loading-text="正在上传图片..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                                <el-upload v-if="is.length==0"
                                    class="avater-uploader"
                                    :before-upload="beforeUpload"
                                    :action='uploads'>
                                    <i class="icon iconfont icon-tianjia-" style="font-size:30px;display:block;margin-top:35px;"></i>
                                    <p style="font-size:18px;color:#4d4d4d;margin-top: 9px;">模块配图</p>
                                    <!-- <p style="font-size:12px;color:#999;">建议尺寸500*250像素/不大于5M</p> -->
                                </el-upload>
                                <div class="alterPic" v-if="is" @click="delitemClick(it,itemindex)">
                                    <img :src="is" alt="">
                                </div>
                            </div>
                        </div>
                        <p class="picDetail" v-if="it.isPic == '1'">注：可上传1-3张图片，支持jpg/jpeg/gif/png等格式上传，图片尺寸宽：高为2：1，建议尺寸800*400像素、大小2M内、尺寸一致。</p>
                        <hr class="divider">
                    </div>
                    <p class="create">
                        <span @click="createModule"><i class='el-icon-plus'></i>添加新模块</span>
                        <span @click="getOne">预览</span>
                    </p>
                    <p class="createSave" v-if="isBdPark">
                        <span @click="upDateModelA(0)">保存上传</span>
                        <span @click="$router.push('/parkHall/manage/baseInfo')">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</span>
                    </p>
                    <p class="createSave" v-else>
                        <span @click="accessT=true">暂&nbsp;&nbsp;存</span>
                        <span @click="upDateModelA(0)">保存上传</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 预览模板 -->
        <el-dialog :visible.sync="scanOne"  width='1200px' height='280px' class='confirmRequest'>
            <div class="scanOneM">
                <el-carousel indicator-position="none" height="450px">
                    <el-carousel-item v-for="(item,i) in bannerDisList" :key="i">
                        <img :src="item" alt="">
                    </el-carousel-item>
                </el-carousel>
                <div class="listContent">
                    <div class="aside">
                        <p class="address">{{parkInfoes.parkNm}}</p>
                        <p class="address"><img :src="comlogo" alt=""></p>
                        <p class="address">成立日期：
                        	<span v-if="parkInfoes.setUpTime">{{parkInfoes.setUpTime.slice(0,10)}}</span>
                        </p>
                        <p class="address">联系电话：{{parkInfoes.parkAdminTel}}</p>
                        <p  v-if="!isBdPark" class="address">占地面积：{{parkInfoes.parkSize}}平方米</p>
                        <p  v-else class="address">联系邮箱：{{parkInfoes.email}}</p>
                        <div class="addressT">
                            <span>园区地址：</span>
                            <div>{{parkInfoes.parkPosition}}</div>
                        </div>
                        <p class="addressBtn">
                            <span>申请加入园区</span>
                        </p>
                    </div>
                    <div class="main displayMain">
                        <div class="moduleContent" v-for="(it,moudelIndex) in moduleList" :key="moudelIndex">

                            <p class="title">{{it.title}}</p>
                            <div v-html="it.content">
                            </div>
                            <div class="picList" v-if="scanImgList && scanImgList[moudelIndex] && scanImgList[moudelIndex].length > 0" >
                                <div :class="{'one':scanImgList[moudelIndex].length == 1,'two':scanImgList[moudelIndex].length == 2,'three':scanImgList[moudelIndex].length == 3}">
                                    <img v-for="(is,i) in scanImgList[moudelIndex]" :key="i" :src="scanImgList[moudelIndex][i]" alt="">
                                </div>
                            </div>
                            <hr class="divider">
                        </div>
                    </div>
                </div>
                <p class="cancelScan">
                    <el-button type="primary" @click="scanOne=false">取消预览</el-button>
                </p>
            </div>
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
                <span @click="upDateModelA(1)">确认</span>
            </p>
        </el-dialog>
        <!-- 有暂存时给提示是否显示暂存 -->
        <el-dialog :visible.sync="access" width='520px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP">
                <i class="el-icon-warning"></i>&nbsp;&nbsp;存在暂存信息，是否显示</p>
            <p class="btn">
                <span @click="getModuleData(0)">取消</span>
                <span @click="getModuleData(1)">确认</span>
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
import EsspBreadCrumb from "@/components/EsspBreadCrumb"
export default {
    components:{
        EsspBreadCrumb,
    },
    data () {
        return {
            breadlist:[
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
            parkSet1:"",
            parkSet1Obj:{},
            comlogo:"",//企业logo
            parkInfoes:{},//园区名称 电话地址等基本信息
            scanOne:false,
            bannerDisList:[],
            moudelIndex:"0",//默认是第一个模块
            curType:'',//当前点击区域 （banner logo 模块）
            curIndex:0,
            listPic:'',
            moduleList:[],//内容区模块列表
            imgBoxA:[],//子集图片集合
            scanImgList :[],
            loading:false,
            bLoading:false,
            confirmSend:false,
            isBdPark: this.utils.isBdPark(),
            // 编辑器提示语
            editorOption: {
                initialFrameWidth:778,
                initialFrameHeight: 270,
                UEDITOR_HOME_URL: '/essp_park/static/UEditor/',
            },
            accessT:false,
            access:false,
            accessA:false,
            delIndex:'',//删除模块的索引
        }
    },
    created(){
        this.bLoading = true;
        this.uploads = this.$apiUrl.upload.upload;
        this.createModule();
        this.getParkById();
    },
    methods: {
        scanImg(){
            var arr = [];
            this.moduleList.forEach(element => {
                var brr =[];
                if (element.isPic == '1') {
                    element.imgList.forEach(el => {
                        if (el != '') {
                            brr.push(el);
                        }
                    });
                }
                arr.push(brr)
            });
            this.scanImgList = arr;
        },
        getOne(){
            this.scanOne = true;
            this.scanImg();
        },
        //园区基本信息
        getParkById(){
            this.$post(this.$apiUrl.manage.getParkById,{
                parkId : window.sessionStorage.getItem("parkId")
            })
            .then((response) => {
                var result = response.resultData;
                this.parkInfoes = result;
                //获取logo图片
                if((','+Object.keys(result).join(',')+',').indexOf(',imgUrl,')>-1){
                    this.comlogo = result.imgUrl;
                }
                //保定
                if (this.isBdPark) {
                    if(result.parkSet2 && result.parkSet2!=="default2"){
                        let parkset = JSON.parse(result.parkSet2)
                        let deoptions = {
                            title:'',
                            content:'',
                            isPic:"0",
                            imgList:["","",""]
                        };
                        this.bannerDisList = parkset.bannerDisList?parkset.bannerDisList:[];
                        this.moduleList = parkset.moduleList?parkset.moduleList:[deoptions];
                        this.imgBoxA = [];
                        this.moduleList.forEach(item=>{
                            //配合app改造  app不传图片时，item.imgList.length == 0
                            if (item.imgList.length == 0) {
                                item.imgList = ["","",""]
                            }
                            this.imgBoxA.push(item.imgList);
                        })
                    }
                }else{
                    /*
                    标准版：
                    如果有暂存模板 先提示是否继续编辑暂存模板 反之显示保存模板
                    */
                    if (result.temp1) {
                        this.access = true;
                    }else if(result.parkSet2 && result.parkSet2!=="default2"){
                        let parkset = JSON.parse(result.parkSet2)
                        let deoptions = {
                            title:'',
                            content:'',
                            isPic:"0",
                            imgList:["","",""]
                        };
                        this.bannerDisList = parkset.bannerDisList?parkset.bannerDisList:[];
                        this.moduleList = parkset.moduleList?parkset.moduleList:[deoptions];
                        this.imgBoxA = [];
                        this.moduleList.forEach(item=>{
                            //配合app改造  app不传图片时，item.imgList.length == 0
                            if (item.imgList.length == 0) {
                                item.imgList = ["","",""]
                            }
                            this.imgBoxA.push(item.imgList);
                        })
                    }
                }
                this.bLoading = false;
            },(err)=>{
                this.$message.error("接口异常");
            })
        },
        //筛选出模板数据
        getModuleData(type){
            //type 0 保存的模板数据 1 暂存的模板数据
            let parkset = type==0?JSON.parse(this.parkInfoes.parkSet2):JSON.parse(this.parkInfoes.temp1);
            let deoptions = {
                title:'',
                content:'',
                isPic:"0",
                imgList:["","",""]
            };
            this.bannerDisList = parkset.bannerDisList?parkset.bannerDisList:[];
            this.moduleList = parkset.moduleList?parkset.moduleList:[deoptions];
            this.imgBoxA = [];
            this.moduleList.forEach(item=>{
                if (item.imgList.length == 0) {
                    item.imgList = ["","",""]
                }
                this.imgBoxA.push(item.imgList);
                
            })
            this.access = false;
        },
         //保存或暂存模版1
        upDateModelA(type){
            //type 0 保存  1 上传
            let _that = this;
            var updatePark = this.$apiUrl.manage.updatePark;
            var parkId = sessionStorage.getItem("parkId");
            this.parkSet1Obj={
                bannerDisList:this.bannerDisList,
                moduleList:this.moduleList
            }
            let saveParams = {
                logo:this.comlogo,
                parkSet2:this.parkSet1Obj,
                parkId:sessionStorage.getItem("parkId"),
                parkService : this.$route.query.moduleType.toString()
            }
            let timelyParams = {
                logo:this.comlogo,
                parkId:sessionStorage.getItem("parkId"),
                temp1:this.parkSet1Obj
            };
            let params = {};
            //保定和标准版保存（type==0）是用保存参数saveParams，标准版存用暂存temp1参数timelyParams
            if (this.isBdPark || type == 0) {
                params = saveParams;
            }else{
                params = timelyParams;
            }

            this.$post(updatePark,params).then((response) => { 
                //保存成功提示
                if (this.isBdPark || type == 0) {
                        _that.confirmSend = true;
                }else{  //暂存成功提示
                    _that.accessT =  type == 1 ?true:false;
                }
                setTimeout(() => {
                    _that.confirmSend = false;
                    _that.accessT = false;
                    this.$router.push("/parkHall/manage/baseInfo");
                }, 2000);
            },(err)=>{
                this.$message({
                    type: "warning",
                    message: response.resultMsg
                });
            })
        },
        //删除每个模块下的特定图片
        delitemClick(it,itemindex){
            if(it.imgList[itemindex].length==0){
                return
            }
            var _this = this;
            var url = it.imgList[itemindex];
            var delurl = this.$apiUrl.upload.deload;
            var pop = {
                fileUrl : url
            }
            this.$post(delurl,pop).then((response)=>{
                _this.moduleList[_this.moudelIndex].imgList[_this.curIndex]="";
                this.imgBoxA = [];
                _this.moduleList.forEach((item,index)=>{
                    _this.imgBoxA.push(item.imgList);
                })

                this.$message.success("图片删除成功")
            },(err)=>{
                this.$message.error("接口异常")
            })

        },
        //删除替换banner图操作
        delBannerClick(url){

            if(url.length==0){
                return
            }
            var delurl = this.$apiUrl.upload.deload;
            var pop = {
                fileUrl : url
            }
            this.$post(delurl,pop).then((response)=>{
                this.bannerDisList  = this.bannerDisList.filter(x=>x!=url);//过滤后的新数据
            },(err)=>{
                this.$message.error("接口异常")
            })
        },
        //删除替换企业logo图操作
        delComlogoClick(url){
            if(url.length==0){
                return
            }
            var delurl = this.$apiUrl.upload.deload;
            var pop = {
                fileUrl : url
            }
            this.$post(delurl,pop).then((response)=>{
                this.comlogo = ""
            },(err)=>{
                this.$message.error("接口异常")
            })

        },

        //新增模块
        createModule(){
            var moduleL = {
                title:'',
                content:'',
                isPic:"0",
                imgList:["","",""]
            }
            this.moduleList.push(moduleL)
            this.imgBoxA = [];
            //为什么不能深度监听呢，无奈啊
            this.moduleList.forEach((item,index)=>{
                this.imgBoxA.push(item.imgList);
            })
        },
        //图片上传
        beforeUpload(file) {
            const isJPG = file.type === "image/jpeg" || file.type === "image/png"  || file.type === "image/gif";
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error("图片只支持jpg、png、gif等格式上传");
                return isJPG;
            }
            if (!isLt5M) {
                this.$message.error("上传图片大小不能超过 5MB!");
                return isLt5M;
            }
            let param = new FormData();  // 创建form对象
            param.append('file', file);
            param.append('type', 'park');
            param.append('model', 'manageModuleOne');
            var _this = this;
            _this.loading = true;
            this.$post(this.$apiUrl.upload.upload,param).then(response => {
                if (this.curType == 'banner') {
                    this.bannerDisList.push(response.resultData[0].url);
                    _this.loading = false;
                    return
                }
                if (this.curType=="comlogo"){
                    this.comlogo = response.resultData[0].url;
                    _this.loading = false;
                    return
                }
                if(this.curType="content"){
                    _this.$message.success("图片上传成功")
                    _this.moduleList[_this.moudelIndex].imgList[_this.curIndex]=response.resultData[0].url;
                    _this.imgBoxA = [];
                    _this.moduleList.forEach((item,index)=>{
                        _this.imgBoxA.push(item.imgList);
                    })
                    _this.loading = false;
                    return
                }
            },err=>{
                this.$message.error("接口异常")
            })
            return false // 返回false不会自动上传
        },
        //点击获取当前区域类型（banner comlogo 内容列表区）并且获取内容区具体第几个模块
        getCurType(curType){
            this.curType = curType;
        },
        getCurPicOrder(index,moudelIndex){
            this.curIndex = index;//当前点击到第几个图
            this.moudelIndex = moudelIndex;//当前所在的模块是哪一个
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
                this.moduleList.forEach((item,index)=>{
                    if (this.delIndex != index) {
                        newData.push(item);
                    }
                })
                this.moduleList = newData;
                this.accessA = false;
            }
        }
    },
}
</script>
<style>
    #scanModelOne .aside{
        overflow: hidden;
    }
    #scanModelOne .aside .upload{
        width:150px;
        height:150px;
        margin-left:45px;
        background: #fff;
        text-align: center;
    }
    #scanModelOne .aside .upload img{
        width:150px;
        height:150px;
    }
    #scanModelOne .aside .el-upload {
        height: 100px;
    }
    #scanModelOne .aside .el-upload i {
        font-size: 24px;
        color: #409eff;
        margin-top:35px;
    }
    #scanModelOne .aside .el-upload p:nth-of-type(1) {
        font-size: 18px;
        line-height:40px;
        color: #4d4d4d;
    }
    #scanModelOne .aside .el-upload p:nth-of-type(2) {
        font-size: 12px;
        /* color: #999; */
    }
    /* #scanModelOne .scanWrap .ql-editor{
        height: 230px;
        overflow-y: scroll;
    } */
    #scanModelOne .ownPic .picList{
        margin:20px 0;
        text-align: center;
    }
    #scanModelOne .ql-size-large{
        font-size: 16px;
    }
    #scanModelOne .ql-size-huge{
        font-size: 24px;
    }
    #scanModelOne .scanOneM .el-carousel img{
        width:1200px;
        height:450px;
    }
    /* .listContent .main p{
        text-indent:2.5%;
    } */
    #scanModelOne .listContent .main p img{
        width:30%;
        margin-left:2.5%;
    }
    #scanModelOne .picList .upload-demo i{
        margin-top:15px;
        color: #409eff;
        font-size: 20px;
    }
    #scanModelOne .banner{
        text-align: center;
    }
    #scanModelOne .banner .avater-uploader i{
        margin-top:200px;
		font-size:16px;
		color:#409EFF;
    }
    #scanModelOne .quill-editor{
        background:#fff;
    }
    #scanModelOne .listContent .picList .avater-uploader i{
            margin-top:35px;
            font-size:16px;
            color:#409EFF;
    }
    #scanModelOne .quill-editor .ql-container.ql-snow .ql-editor{
            height:240px!important;
            min-height:240px!important;
            max-height:240px!important;
    }
    /* 配置无效 */
    /* #scanModelOne .ql-video,#scanModelOne .ql-image,#scanModelOne .ql-link{
        display:none;
    } */
    #scanModelOne .access .el-dialog__header {
        display: none;
    }

    #scanModelOne .access .el-dialog__body {
        text-align: center;
        overflow: hidden;
        padding: 30px 20px;
    }

    #scanModelOne .access .el-dialog__body p:nth-of-type(1) {
        line-height: 55px;
    }
</style>


<style lang='less' scoped>
 @import "../../../assets/css/mixin";
.scanWrap{
    width:1200px;
    margin:0 auto;
    .banner{
        width:1200px;
        height:450px;
        background: #fff;
        overflow: hidden;
        .upload-demo{
            text-align: center;
            width:620px!important;
            margin:0 auto;
            margin-top:120px;
            .el-upload-list{
                margin:0 auto;
            }
        }
        img{
            display: block;
            width:1200px;
            height:450px;
        }
    }
    .listContent{
        margin-top:37px;
        overflow: hidden;
        .aside{
            width:270px;
            float:left;
			&>div{
				margin-top:10px;
			}
            &>p.address,&>p.addressParkName{
                width:100%;
                margin-left:45px;
                font-size: 14px;
                color:#777;
                &:nth-of-type(1){
                    line-height: 30px;
                    font-size:16px;

                    color:#333;
                }
                &:nth-of-type(2){
                    margin-top:15px;
                }
                &:nth-of-type(3),
                &:nth-of-type(4),
				&:nth-of-type(5){
                    font-size: 14px;
                    line-height: 20px;
                    margin-top:10px;
                }
                img{
                    width: 150px;
                    height:150px;
                }
            }
            .addressParkName{
                font-size:16px;
                color:#333;
            }
            .addressT{
                width:240px;
                margin-left:45px;
                overflow: hidden;
                font-size: 14px;
                color:#777;
                span{
                    display: inline-block;
                    float: left;
                }
                &>div{
                    width:145px;
                    float: left;
                }
            }
            .addressBtn{
                display: inline-block;
                width: 149px;
                margin-left:48px;
                height: 40px;
                background-image: -webkit-gradient(linear, left bottom, left top, from(#f5f5f5), to(#ffffff));
                background-image: linear-gradient(0deg, #f5f5f5 0%, #ffffff 100%);
                -webkit-box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                border-radius: 20px;
                border: solid 1px #cccccc;
                font-size: 16px;
                line-height: 40px;
                color: #666666;
                text-align: center;
                margin-top: 33px;
                cursor: pointer
            }
        }
        .main{
            width:780px;
            float:right;
            &>div{
                width:100%;
                margin-bottom:40px;
                &>.title{
                    overflow: hidden;
                    .el-select{
                        float: right;
                        width:180px;
                        .el-input{
                            width:45%;
                        }
                    }
                    .el-input{
                        width:400px;
                        float: left;
                    }
                    .titleRight{
                        float: right;
                        span{
                            line-height:35px;
                            font-size: 16px;
                            color:#999;
                        }
                    }
                    i.titleRight{
                        margin-top: 15px;
                        margin-left: 35px;
                        cursor: pointer;
                        font-size: 16px;
                        &:hover{
                            color:#00a0e9;   
                        }
                    }

                }
                &>.noPic{
                    margin-top:20px;
                }
                .picList{
                    overflow: hidden;
                    &>div{
                        text-align: center;
                        float: left;
                        width:238px;
                        margin-top:20px;
                        margin-left:13px;
                        line-height:25px;
                        height: 118px;
                        background-color: #ffffff;
                        border: solid 1px #cccccc;
                    }
                }
                &:nth-last-of-type(1){
                    &>div{
                        border-bottom: none;
                    }
                }
                .picDetail{
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #999999;
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
}
.scanOneM{
    width:1200px;
    margin:0 auto;
    background: #f5f5f5;
    //预览图的位置
    .bannershow{
        height:450px;
        border:1px solid #ccc;
    }
    .listContent{
        margin-top:37px;
        overflow: hidden;
        .aside{
            width:270px;
            float:left;
			&>div{
				margin-top:10px;
			}
            &>p.address{
                width:100%;
                margin-left:45px;
                &:nth-of-type(1){
                    line-height: 30px;
                    font-size: 16px;
                    color: #333333;
                }
                &:nth-of-type(2){
                    margin-top:15px;
                }
                &:nth-of-type(3),
                &:nth-of-type(4),
				&:nth-of-type(5){
                    font-size: 14px;
                    line-height: 20px;
                    margin-top:10px;
                }

                img{
                    width:149px;
                    height:149px;
                }
            }
            .addressT{
                width:100%;
                margin-left:45px;
                overflow: hidden;
                span{
                    display: inline-block;
                    float: left;
                }
                &>div{
                    width:145px;
                    float: left;
                }
            }
            .addressBtn{
                display: inline-block;
                width: 149px;
                margin-left:48px;
                height: 40px;
                background-image: -webkit-gradient(linear, left bottom, left top, from(#f5f5f5), to(#ffffff));
                background-image: linear-gradient(0deg, #f5f5f5 0%, #ffffff 100%);
                -webkit-box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.15);
                border-radius: 20px;
                border: solid 1px #cccccc;
                font-size: 16px;
                line-height: 40px;
                color: #666666;
                text-align: center;
                margin-top: 33px;
                cursor: pointer
            }
        }
        .main{
            width:780px;
            float:right;
            .moduleContent{
                width:100%;
                margin-bottom:40px;
                &>.title{
                    font-size: 16px;
                    color: #444444;

                }
                .picList{
                    width:780px;
                    margin-bottom:40px;
                    // background: red;
                    .one{
                        width:100%;
                        text-align: center;
                        margin-top:20px;
                        img{
                            width: 520px;
                            height:250px;
                            text-align: center;
                        }
                    }
                    .two{
                        width:100%;
                        margin-top:20px;
                        text-align: center;
                        overflow: hidden;
                        img{
                            width: 320px;
                            margin-left:45px;
                            height:160px;
                            float:left;
                        }
                    }
                    .three{
                        width:100%;
                        margin-top:20px;
                        text-align: center;
                        overflow: hidden;
                        img{
                            width: 240px;
                            margin-left:15px;
                            float:left;
                            height:120px;
                        }
                    }
                }
                &:nth-last-of-type(1){
                    &>div{
                        border-bottom: none;
                    }
                }
            }
        }
    }
    .cancelScan{
        padding-bottom:60px;
        text-align: center;
    }
}

.alterPic{
    position: relative;
    img{
        display: block;
        width: 240px;
        height: 120px;
        border:0;
    }
    p{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        line-height:110px;
        z-index:101;
        text-align: center;
        background: #000;
        opacity: 0.5;
        color:#fff;
        display: none;
        &.bannerP{
            line-height:450px;
        }
        &.logoP{
            line-height:150px;
        }
    }
    &:hover{
        p{
            display: block;
            cursor: pointer;
        }
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
.divider{
    width:100%;
    margin:20px auto;
    color:#ddd;
    border: 1px solid #f2f2f2;
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
        text-align: center;
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


