<!--
 * @Author: Evan-lian
 * @Date: 2019-01-07 16:14:17
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-08 17:05:47
 * @Description: 发布新闻
 -->
<template>
    <div class="sponsorcon">
        <!-- 发布新资讯 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="newscon">
            <span></span>
            <h2 class="tit_tips">发布新闻动态</h2>
            <span></span>
        </div>
        <div>
            <div class="base_tablecon">
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>新闻动态标题 :
                    </span>
                    <el-input class="el_input_left" v-model="informationTitle" placeholder="必填"></el-input>
                </div>
                <ParkUpload :parkUploadData="parkUploadData" @changeImgUrl="showImgUrl"></ParkUpload>
                
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>新闻简介 :
                    </span>
                    <el-input
                        class="inline-textarea"
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="contentbrif"
                    ></el-input>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>新闻动态详情 :
                    </span>
                    <div class="inline-box wrap" id="publishNewInfo">
                        <!-- <essp-editor ref="childEditor"></essp-editor> -->
                        <quill-editor v-model="content" :options="editorOption">
                            <div id="toolbar" slot="toolbar"></div>
                        </quill-editor>
                    </div>
                </div>
                
                <div class="tdcon">
                    <span class="inline_span">
                        <!--<em>*</em>-->
                        新闻动态标签 :
                    </span>
                    <div class="inline_div_tag">
                        <essp-add-tag
                            ref="eat"
                            :showtags="tags"
                            @showTagWin="showTagWin"
                            @delTag="delTag"
                            @initTag="initTag"
                            :tagprops="tagprops"
                        ></essp-add-tag>
                    </div>
                    <essp-tag @showtag="closetag" :centerDialogVisible="visible" :tagprops="tagprops"></essp-tag>
                </div>
                <div class="tdcon">
                    <span class="inline_span">
                        <em>*</em>发布人 :
                    </span>
                    <div class="inline-box">
                        <el-input
                            class="pulishinput tdcon_input"
                            style="width:500px"
                            v-model="initiatorWay"
                            placeholder="反显用户关联名称，不可更改"
                            :readonly="true"
                        ></el-input>
                    </div>
                </div>
                
            </div>
        </div>
            <div class="tdcon">
                <span class="inline_yulan">
                    <button @click="infoPrint">预览</button>
                </span>
            </div>
        <!-- </div> -->
        <div class="btntool">
            <el-button
                class="sure_btn"
                type="primary"
                @click="submitInfo()"
            >暂&nbsp;&nbsp;&nbsp;&nbsp;存
            </el-button>
            <el-button
                class="cancel_btn"
                type="primary"
                @click="lookfinalData()"
            >提&nbsp;&nbsp;&nbsp;&nbsp;交
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
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    import {quillEditor} from "vue-quill-editor";
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    import EsspTag from "@/components/EsspTag";
    import EsspAddTag from "@/components/EsspAddTag";
    import ParkUpload from "@/views/parkHall/parkUpload";
    import {classtType} from "@/util/classtType";
    import Moment from "moment";

    export default {
        name: "",
        data() {
            return {
                msg: "发布新闻动态",
                breadlist: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/newsInfoSet",
                        name: "发布管理"
                    },
                    {
                        path: "/news/addNews",
                        name: "发布新闻动态"
                    }
                ],
                initiatorWay: "",
                typeitems: [], //类型明细
                infoDialog: false,
                editorOption: {
                    placeholder: `请您编辑新闻动态内容`,
                    modules: {
                        toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            ["blockquote", "code-block"],
                            [{header: 1}, {header: 2}],
                            [{list: "ordered"}, {list: "bullet"}],
                            [{script: "sub"}, {script: "super"}],
                            [{indent: "-1"}, {indent: "+1"}],
                            [{direction: "rtl"}],
                            [{size: ["small", false, "large", "huge"]}],
                            [{header: [1, 2, 3, 4, 5, 6, false]}],
                            [{font: []}],
                            [{color: []}, {background: []}],
                            [{align: []}],
                            ["clean"],
                            ["link", "image"]
                        ]
                    }
                },
                content: "", //资讯详情
                classtType: "", //资讯明细分类
                informationTitle: "", //资讯标题
                contentbrif: "", //资讯简介
                saveType: "0", //暂存草稿箱
                tags: [], //标签
                //新版上传图片
                parkUploadData: {
                    title: "新闻动态配图 :",
                    src: "", //资讯配图
                    isPic:"",
                        // "（该图片以资讯主图进行展示,每张最大2M，图片宽高比为7：4，建议分辨率建议为840*480，支持jpg/jpeg/gif/png格式。）",
                    imgItemType: "information", // 图片图库类型 资讯
                    styleClass: "inline_span_my"
                },
                pubComment: "", //备注
                approveType: "1", //是否需要公司内部审核
                informationId: "", //资讯id，供后台去重功能
                visible: false,
                tagprops: {
                    lblTpCd: "3000003",
                    entId: ""
                },
                createTime: "",
                cstNm: ""
            };
        },
        components: {
            EsspBreadCrumb,
            EsspTag,
            EsspAddTag,
            ParkUpload,
            quillEditor
        },
        created() {
            // this.getDraftResource();
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
            }
        },
        methods: {
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
                return true;
            },
            //获取资讯暂存的草稿数据
            getDraftResource() {
                this.typeitems = classtType.infoType;
                var informationId = this.$route.query.informationId; //parkIndex/launchForm?draftId=1
                if (informationId) {
                    var pop = {informationId};
                    this.$post(this.$apiUrl.parkInfo.infoById, pop).then(
                        response => {
                            var codestatus = response.resultCode;
                            if (codestatus == "CLT000000000") {
                                let data = response.resultData;
                                this.informationTitle = data.informationTitle; //资讯标题
                                this.contentbrif = data.content; //资讯简介
                                this.classtType = data.classtType; //资讯明细分类
                                this.approveType = data.approveType; //是否需要公司内部审核1是0否
                                this.content = data.infoDetail; //资讯详情
                                this.pubComment = data.pubComment; //资讯备注
                                this.informationId = data.informationId; //资讯id
                                this.parkUploadData.src = data.titleImg ? data.titleImg : ""; //资讯配图
                                this.tags = data.tagsTxt ? data.tagsTxt.split(",") : [];
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
            closetag({viewtags}) {
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
                    this.$message.warning("新闻动态标题不能为空");
                    return false;
                }
                if (this.informationTitle.length > 50) {
                    this.$message.warning("新闻动态标题长度不能大于50个字");
                    return false;
                }
                if (this.content == "") {
                    this.$message.warning("新闻动态内容不能为空");
                    return false;
                }
                if (this.parkUploadData.src == "") {
                    this.$message.warning("标题配图不能为空");
                    return false;
                }
                return true;
            },
            //新闻发布功能
             lookfinalData() {
                var parkId = sessionStorage.getItem("parkId") || "";
                var msg = "您是否发布新闻动态？";
                var goto = "/parkHall/manage/publicNews?status=0";
                if (!this.checkInfo()) {
                    return;
                }
                var maskConfig = {
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    center: true
                };
                this.$confirm(msg, maskConfig).then(() => {
                    var url = "information/saveNews";
                    var pop = {
                        parkId,
                        informationTitle:this.informationTitle,
                        informationId:this.informationId,
                        infoDetail:this.content ? this.content.replace(/\s/g, "&nbsp") : "",
                        tags:this.tags.join(","),
                        saveType:1,
                        content: this.contentbrif,
                        titleImg: this.parkUploadData.src,
                    }
                    this.$post(url, pop).then(response => {
                        this.$message.success("新闻动态发布成功")
                        this.$router.push({path: goto});
                    });
                    this.$refs.eat.saveTags();
                });
            },
            //暂存新闻
             submitInfo() {
                var parkId = sessionStorage.getItem("parkId") || "";
                var type = 0;
                var msg = "<p><i class='icon iconfont icon-queren' style='font-size: 45px;color: #00a0e9;'></i></p><p style='padding: 25px 0 30px;'>您发布的新闻动态已保存至草稿箱</p>";
                var url = "/parkHall/manage/publicNews?status=1";
                var maskConfig = {
                    confirmButtonText: "返回草稿箱查看",
                    center: true,
                    showCancelButton: false,
                    dangerouslyUseHTMLString: true
                };
                
                this.$post("information/saveNews", {
                    parkId: parkId,
                    informationTitle: this.informationTitle,
                    titleImg: this.parkUploadData.src,
                    content: this.contentbrif,
                    saveType: type,
                    tags: this.tags.join(","),
                    infoDetail: this.content ? this.content.replace(/\s/g, "&nbsp") : "",
                    informationId: this.informationId
                }).then(response => {
                    this.$confirm(msg, maskConfig).then(() => {
                        this.$refs.eat.saveTags();
                        this.$message.success("新闻动态暂存成功")
                        this.$router.push({path: url});
                    });
                   
                });
            }
        }
    };
</script>
<style>
    #publishNewInfo .ql-container {
        min-height: 0;
    }

    .ql-toolbar .ql-formats .ql-link,
    .ql-toolbar .ql-formats .ql-image,
    .ql-toolbar .ql-formats .ql-video {
        display: none;
    }
</style>


<style lang='less' scoped>
    @import "../../../../assets/css/mixin";

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
                cursor: pointer;
                outline: none;
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
        height: 400px;
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

