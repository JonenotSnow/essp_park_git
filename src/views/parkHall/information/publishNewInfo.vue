<template>
    <div class="sponsorcon">
        <!-- 发布新资讯 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="newscon">
            <span></span>
            <h2 class="tit_tips">发布园区资讯</h2>
            <span></span>
        </div>
        <div>
            <div class="common_titwrap esspclearfix noborder">
                <div>
                    <h3 class="common_titdes" style="margin-left:130px;font-weight: normal;">基本信息</h3>
                </div>
            </div>
            <div class="base_tablecon">
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>标题 :
                    </span>
                    <el-input class="el_input_left" v-model="informationTitle" placeholder="必填"></el-input>
                </div>
                <div class="tdcon esspclearfix">
                    <span class="inline_span">
                        <em>*</em>资讯类型 :
                    </span>
                    <el-select v-model="classtType" placeholder="请选择" class="inline_select">
                        <el-option v-for="(item,index) in typeitems" :key="index" :label="item.name" v-if="index>0" :value="item.id"></el-option>
                    </el-select>
                </div>
                <ParkUpload :parkUploadData="parkUploadData" @changeImgUrl="showImgUrl"></ParkUpload>
                <!--<div class="tdcon">-->
                <!--<span class="inline_span"><em>*</em>标题配图：</span>-->
                <!--<div class="uploadconInfo" >-->
                <!--<el-upload  id="UploadInfo" v-show="titleImg.length==0" action="" list-type="picture-card"-->
                <!--:before-upload="beforeUpload" v-loading="stillUpdateImg" element-loading-text="正在处理中"-->
                <!--element-loading-spinner="el-icon-loading" multiple ref="helloworld">-->
                <!--<i class="el-icon-plus"></i>-->
                <!--</el-upload>-->
                <!--<div class="imgbox" v-show="titleImg.length!=0">-->
                <!--<img :src="titleImg" alt="" class="imgtext">-->
                <!--<i class="el-icon-circle-close-outline delimg" @click="handleRemove"></i>-->
                <!--</div>-->
                <!--<div class="upload_tips_info">（该图片以资讯主图进行展示,温馨提示图片大小最大不得超过5M，效果图默认宽高比例1:1 图片仅支持jpg/jpeg/png格式。）</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>资讯简介 :
                    </span>
                    <el-input class="inline-textarea" type="textarea" :rows="5" placeholder="请输入内容" v-model="contentbrif"></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>发布人 :
                    </span>
                    <div class="inline-box">
                        <el-input class="pulishinput tdcon_input" style="width:500px" v-model="initiatorWay" placeholder="反显用户关联名称，不可更改" :readonly="true"></el-input>
                    </div>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                        <!--<em>*</em>-->
                        资讯标签 :
                    </span>
                    <div class="inline_div_tag">
                        <essp-add-tag ref="eat" :showtags="tags" @showTagWin="showTagWin" @delTag="delTag" @initTag="initTag" :tagprops="tagprops"></essp-add-tag>
                    </div>
                    <essp-tag @showtag="closetag" :centerDialogVisible="visible" :tagprops="tagprops"></essp-tag>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>详细内容 :
                    </span>
                    <div class="inline-box wrap" id="publishNewInfo">
                        <!-- <essp-editor ref="childEditor"></essp-editor> -->
                        <essp-editor :editorCont="this.content" @onEditorChange="onEditorChange"></essp-editor>
                    </div>
                </div>
            </div>
        </div>
        <div class="base_tablecon border-top">
            <div class="tdcon">
                <span class="inline_span">
                    <em>*</em>是否需要公司内部审核 :
                </span>
                <div class="inline_div">
                    <el-radio v-model="approveType" label="1">是</el-radio>
                    <el-radio v-model="approveType" label="0">否</el-radio>
                    <div class="tips_div">提示：选择公司内部审核，则需经过企业管理员先行审核，后转至园区管理员审核生效</div>
                </div>
            </div>
            <div class="tdcon">
                <span class="inline_span">备注 :</span>
                <el-input class="inline-textarea" type="textarea" :rows="5" placeholder="请输入内容" v-model="pubComment"></el-input>
            </div>
            <div class="tdcon">
                <span class="inline_yulan">
                    <button @click="infoPrint">预览</button>
                </span>
            </div>
        </div>
        <div class="btntool">
            <el-button class="sure_btn" type="primary" @click="submitInfo()">暂&nbsp;&nbsp;&nbsp;&nbsp;存
            </el-button>
            <el-button class="cancel_btn" type="primary" @click="lookfinalData()">提&nbsp;&nbsp;&nbsp;&nbsp;交
            </el-button>
        </div>

        <el-dialog title="资讯发布预览功能（仅提供预览功能）" :visible.sync="infoDialog" width="90%">
            <div class="inlookInfo">
                <h2 class="inlookTit">{{informationTitle}}</h2>
                <div class="newstatus esspclearfix">
                    <span class="statusitemsA">
                        <label>发布时间 :</label>
                        <span>{{createTime | timerFormat(createTime)}}</span>
                    </span>
                    <span class="statusitemsB">
                        <label>发布机构 :</label>
                        <span>{{cstNm}}</span>
                    </span>
                </div>
                <div class="inlookContent">
                    <div v-html="this.content"></div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="infoDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
import EsspTag from "@/components/EsspTag";
import EsspAddTag from "@/components/EsspAddTag";
import ParkUpload from "@/views/parkHall/parkUpload";
import EsspEditor from "@/components/EsspEditor";
import { classtType } from "./../../../util/classtType";

import Moment from "moment";

export default {
    name: "",
    data() {
        return {
            //新版上传图片
            parkUploadData: {
                title: "资讯主图：",
                src: "",
                isPic:
                    "（该图片以资讯主图进行展示,每张最大2M，图片宽高比为7：4，建议分辨率建议为840*480，支持jpg/jpeg/gif/png格式。）",
                imgItemType: "information",
                styleClass: "inline_span_my"
            },
            breadlist: [
                {
                    path: "/parkIndex/parkInformation/all",
                    name: "园区资讯"
                },
                {
                    path: "/parkIndex/parkInformation/publishNewInfo",
                    name: "发布资讯"
                }
            ],
            initiatorWay: "",
            typeitems: [], //类型明细
            infoDialog: false,
            content: "", //资讯详情
            classtType: "", //资讯明细分类
            informationTitle: "", //资讯标题
            contentbrif: "", //资讯简介
            saveType: "0", //暂存草稿箱
            tags: [], //标签
            pubComment: "", //备注
            approveType: "1", //是否需要公司内部审核
            informationId: "", //资讯id，供后台去重功能
            visible: false,
            tagprops: {
                lblTpCd: "3000003",
                entId: ""
            },
            createTime: "",
            cstNm: JSON.parse(sessionStorage.getItem("userInfo")).cstNm || ""
        };
    },
    components: {
        EsspBreadCrumb,
        EsspTag,
        EsspAddTag,
        ParkUpload,
        EsspEditor
    },
    created() {
        this.getDraftResource();
        console.log();
        if (JSON.parse(sessionStorage.getItem("userInfo")).cstNm) {
            this.initiatorWay = JSON.parse(
                sessionStorage.getItem("userInfo")
            ).cstNm;
        }
    },
    filters: {
        timerFormat(vaule) {
            return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    methods: {
        // 编辑器的值获取
        onEditorChange(val) {
            this.content = val;
            console.log(this.content);
        },
        // 改变图片路径
        showImgUrl(url) {
            this.parkUploadData.src = url;
        },
        //资讯预览功能
        infoPrint() {
            if (this.checkLookInfo()) {
                this.infoDialog = true;
                this.createTime = new Date();
            }
        },
        //限制预览功能的触发条件
        checkLookInfo() {
            if (this.informationTitle == "") {
                this.$message.warning("资讯主题不能为空");
                return;
            }
            if (this.informationTitle.length > 40) {
                this.$message.warning("资讯主题长度不能大于50个字");
                return;
            }
            if (this.content == "") {
                this.$message.warning("资讯内容不能为空");
                return;
            }
            // if(this.stillUpdateImg){
            //     this.$message.warning('正在处理标题配图');
            //     return;
            // }
            return true;
        },
        //获取资讯暂存的草稿数据
        getDraftResource() {
            this.typeitems = classtType.infoType;
            var informationId = this.$route.query.informationId; //parkIndex/launchForm?draftId=1
            if (informationId) {
                var pop = { informationId };
                this.$post(this.$apiUrl.parkInfo.infoById, pop).then(
                    response => {
                        var codestatus = response.resultCode;
                        if (
                            codestatus == "CLT000000000" ||
                            codestatus == "0000000000"
                        ) {
                            let data = response.resultData;
                            this.informationTitle = data.informationTitle; //资讯标题
                            this.contentbrif = data.content; //资讯简介
                            this.classtType = data.classtType; //资讯明细分类
                            this.approveType = data.approveType; //是否需要公司内部审核1是0否
                            this.content = data.infoDetail; //资讯详情
                            this.pubComment = data.pubComment; //资讯备注
                            this.informationId = data.informationId; //资讯id
                            this.parkUploadData.src = data.titleImg
                                ? data.titleImg
                                : ""; //资讯配图
                            this.tags = data.tagsTxt
                                ? data.tagsTxt.split(",")
                                : [];
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    },
                    err => {
                        this.$message.error("接口异常");
                    }
                );
            }
        },
        closetag({ viewtags }) {
            this.visible = false;
            this.tags = viewtags;
        },
        showTagWin() {
            this.visible = true;
        },
        delTag(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },
        initTag(tmpTags) {
            this.tags = tmpTags;
        },

        checkInfo() {
            if (this.informationTitle == "") {
                this.$message.warning("资讯主题不能为空");
                return false;
            }
            if (this.informationTitle.length > 50) {
                this.$message.warning("资讯主题长度不能大于50个字");
                return false;
            }
            if (this.content == "") {
                this.$message.warning("资讯内容不能为空");
                return false;
            }
            if (this.parkUploadData.src == "") {
                this.$message.warning("标题配图不能为空");
                return false;
            }
            if (this.classtType == "") {
                this.$message.warning("请您选择资讯类型");
                return false;
            }
            return true;
        },
        // 保持发布
        lookfinalData(type) {
            var parkId = sessionStorage.getItem("parkId") || "";
            var type = 1;
            var msg = "您是否发布资讯？";
            var url = "/parkIndex/parkInformation/myPublishedInfo?type=0";

            if (!this.checkInfo()) {
                return;
            }
            var maskConfig = {
                confirmButtonText: "是",
                cancelButtonText: "否",
                center: true
            };

            this.$confirm(msg, maskConfig).then(() => {
                this.$post("information/saveInformation", {
                    parkId: parkId,
                    classtType: this.classtType,
                    informationTitle: this.informationTitle,
                    titleImg: this.parkUploadData.src,
                    content: this.contentbrif,
                    approveType: this.approveType,
                    saveType: type,
                    tags: this.tags.join(","),
                    pubComment: this.pubComment,
                    infoDetail: this.content,
                    informationId: this.informationId
                }).then(response => {
                    if (
                        response.resultCode == "CLT000000000" ||
                        response.resultCode == "0000000000"
                    ) {
                        this.$router.push({ path: url });
                    } else {
                        // this.$message.error(response.resultMsg);
                    }
                });
                this.$refs.eat.saveTags();
            });
        },
        submitInfo() {
            var parkId = sessionStorage.getItem("parkId") || "";
            var type = 0;
            var msg =
                "<p><i class='icon iconfont icon-queren' style='font-size: 45px;color: #00a0e9;'></i></p><p style='padding: 25px 0 30px;'>您发布的资讯已保存至草稿箱</p>";
            var url = "/parkIndex/parkInformation/myPublishedInfo?type=1";
            var maskConfig = {
                confirmButtonText: "返回草稿箱查看",
                center: true,
                showCancelButton: false,
                dangerouslyUseHTMLString: true
            };
            if (!this.checkInfo()) {
                return;
            }
            this.$post("information/saveInformation", {
                parkId: parkId,
                classtType: this.classtType,
                informationTitle: this.informationTitle,
                titleImg: this.parkUploadData.src,
                content: this.contentbrif,
                approveType: this.approveType,
                saveType: type,
                tags: this.tags.join(","),
                pubComment: this.pubComment,
                infoDetail: this.content,
                informationId: this.informationId
            }).then(response => {
                if (
                    response.resultCode == "CLT000000000" ||
                    response.resultCode == "0000000000"
                ) {
                    this.$confirm(msg, maskConfig).then(() => {
                        this.$refs.eat.saveTags();
                        this.$router.push({ path: url });
                    });
                } else {
                    // this.$message.error(response.resultMsg);
                }
            });
        }
    }
};
</script>


<style lang='less' scoped>
@import "../../../assets/css/mixin";

@con_bg: #fff;
.noborder {
    border-top: none !important;
}

.sponsorcon {
    .essp_width_auto(); //1200居中
    background-color: #fff;
}

//第一部分布局
.newscon {
    .essp_width_auto();
    background: @con_bg;
    padding: 70px 0 22px;
    text-align: center;
    h2 {
        font-size: 24px;
        // line-height: 36px;
        color: #333;
        text-align: center;
        display: inline-block;
        // margin-bottom: 20px;
    }
    span {
        position: relative;
        display: inline-block;
        width: 66px;
        padding: 0 10px;
        // font-size: 10px;
        &:before {
            content: "  ";
            position: absolute;
            width: 66px;
            height: 1px;
            background-color: #cccccc;
            top: -6px;
            left: 9px;
        }
    }
}

span {
    em {
        color: #ff9900;
        margin-right: 5px;
    }
}

.tit_tips {
    // height: 24px;
    /*font-family: "微软雅黑";*/
    font-weight: normal;
    font-size: 24px;
    text-align: center;
    color: #333333;
    line-height: 36px;
    margin-bottom: 20px;
}

.tit_con {
    width: 81%;
    margin: 0 auto 20px;
    background-color: #fef9f0;
    border: solid 1px #ff9900;
    padding: 18px 24px;
    p {
        text-align: left;
        font-size: 16px;
        line-height: 24px;
        color: #666666;
    }
}

//基本信息布局
.tdcon {
    overflow: hidden;
    margin-bottom: 25px;
    .inline_span {
        float: left;
        width: 20%;
        margin-right: 15px;
        font-size: 14px;
        line-height: 40px;
        color: #666666;
        text-align: right;
    }
    .inline_div {
        line-height: 40px;
        .tips_div {
            float: right;
            font-size: 14px;
            color: #00a0e9;
            margin: 0 10px 0 0;
        }
    }
    .inline_yulan {
        position: relative;
        margin-left: 235px;
        // width: 27%;
        // margin-right: 15px;
        font-size: 14px;
        line-height: 40px;
        color: #666666;
        text-align: right;
        button {
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00a0e9;
            border: none;
            background-color: #e6f4ff;
        }
    }
    .el_input_left {
        float: left;
        width: 500px;
    }
    .inline_select {
        float: left;
        width: 245px;
        .el-input {
            float: left;
            width: 100%;
        }
    }
    .inline-picker {
        float: left;
        width: 250px;
    }
    .inline-textarea {
        float: left;
        width: 850px;
    }
    .inline-box {
        float: left;
    }
}

.base_tablecon {
    padding: 12px 55px 0;
}

.btntool {
    .essp_width_auto();
    background: @con_bg;
    padding: 40px 0px;
    margin-bottom: 20px;
    text-align: center;
    .sure_btn,
    .cancel_btn {
        width: 100px;
        height: 40px;
        background-color: #00a0e9;
        border-radius: 5px;
        margin-left: 130px;
    }
}

.uploadconInfo {
    float: left;
    .imgbox {
        width: 245px;
        height: 140px;
        position: relative;
        .imgtext {
            display: block;
            width: 100%;
            height: 100%;
        }
        .delimg {
            position: absolute;
            font-size: 30px;
            right: 2%;
            top: 5%;
            &:hover {
                cursor: pointer;
            }
        }
    }
    .upload_tips_info {
        margin-top: 10px;
        font-size: 14px;
        line-height: 24px;
        color: #ccc;
    }
}

.inline_div_tag {
    float: left;
    width: 40%;
    line-height: 40px;
}

//编辑器样式
.wrap {
    width: 850px;
    height: 470px;
    margin: 0 auto 20px;
    .quill-editor {
        height: 83%;
    }
}

//资讯预览功能
.inlookInfo {
    .inlookTit {
        margin-bottom: 20px;
        padding: 20px;
        text-align: center;
        font-weight: normal;
        border-bottom: 1px solid #ccc;
    }
    .inlookContent {
        margin-bottom: 20px;
        padding: 20px;
    }
}

.newstatus {
    display: flex;
    /* text-align: center; */
    justify-content: center;
    em {
        color: #606266;
    }
}

.statusitemsB {
    margin: 0 50px;
}

.border-top {
    border-top: 1px solid #ccc;
    padding: 25px 55px 0;
}
</style>

