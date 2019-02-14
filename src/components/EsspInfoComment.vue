<template>
    <div class="cnbox">
        <!-- 园区评论模块公用代码提取 -->
        <div class="cn_box">
            <div class="esspclearfix funmain">
                <div class="portrait"><i class="iconfont icon-touxiang1-copy"></i></div>
                <div class="comment">
                    <div class="fundes">我来说两句</div>
                    <div class="border">
                        <textarea class="cnptext" maxlength="300" v-model.trim="cnttext"></textarea>
                        <div class="cnptool esspclearfix">
                            <div class="toolleft">
                                <!-- <i class="iconfont icon-biaoqing"></i> -->
                                <!-- <i class="iconfont icon-tupian1"></i> -->
                            </div>
                            <div class="toolright">
                                <el-checkbox v-model="anonymous" class="cnanony">匿名评论</el-checkbox>
                                <!--<el-button评论</el-button>-->
                                <span  class="cnbtn" @click="addCnt">评论</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="commentlist">
            <div class="fundes">所有评论&nbsp;({{allTotal}})</div>
            <div class="nocnslist" v-if="cnts.length==0">
                <i class="iconfont icon-shafa"></i>
                <p class="nocntops">还没评论，来抢个沙发</p>
            </div>
            <div class="cnslist">
                <div class="item_about esspclearfix" v-for="(item,index) in cnts" :key="index">
                    <div class="face">
                        <i class="iconfont icon-touxiang1-copy"></i>
                        <!-- <img src="../assets/avatar.png" class="logoface" alt=""> -->
                    </div>
                    <div class="main_about">
                        <div class="username">{{item.state == "1" ? "匿名" : item.userName+"-"+item.cstNm}}</div>
                        <div class="comm">{{item.content}}</div>
                        <!-- 回复框内容 -->
                        <div class="recommbox" v-for="(it,indexChild) in item.replyList" v-show="indexChild<item.replyLen"
                             :key="indexChild">
                            <div class="recomm">
                                <div class="replyname esspclearfix">
                                    <!-- 回复者 -->
                                    <span class="re_person">{{it.state == "1"? "匿名" : it.userName+"-"+it.cstNm}}</span>
                                    <span class="re_funs">回复</span>
                                    <!-- 初始评论 -->
                                    <span class="re_reUserName">{{item.state == "1"? "匿名" : it.reUserName+"-"+item.cstNm}}</span>
                                </div>
                                <div class="replytext">{{it.content}}</div>
                                <div class="replytool esspclearfix"  v-if="userInfo">
                                    <div class="relytoolleft">
                                        <em class="replytimeicon">{{it.createTime | timerFormat(it.createTime)}}</em>
                                        <span style="padding-left: 10px;" v-if="showDel || it.userId == userInfo.id" @click="delReply(it,item,index,indexChild)">删除</span>
                                        <span @click="tipOffFn(5,it.id,it.content,it.cstNm,it.usrNm)" v-if="it.userId != userInfo.id">举报</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="reply_more_btn_c" v-show="item.maxReplyLen > 2"><span @click="reply_more_btn(item)">{{item.btn_name}}<i
                            :class="item.replyLen==2?'el-icon-arrow-down':'el-icon-arrow-up'"></i></span></div>
                        <div class="esspclearfix abouttool">
                            <div class="abouttool-left">
                                <em class="timeicon">{{item.createTime | timerFormat(item.createTime)}}</em>
                            </div>
                            <div class="abouttool-right" v-if="userInfo">
                                <el-dropdown @command="handleCommand">
                                    <span class="el-dropdown-link">
                                         <i class="el-icon-more"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :command="{item,keyindex:0,index:index}">回复</el-dropdown-item>
                                        <el-dropdown-item :command="{item,keyindex:1,index:index}"
                                                          v-if="showDel || item.userId == userInfo.id">删除
                                        </el-dropdown-item>
                                        <el-dropdown-item :command="{item,keyindex:2}" v-if="item.userId != userInfo.id">举报</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="border_nm" v-if="item.showBox && index===reIndex">
                            <div class="border">
                                <textarea class="cnptext" :placeholder="item.state == '1'?'//@匿名':'//@'+item.userName+'-'+item.cstNm" maxlength="300" v-model.trim="item.replytext">
                                </textarea>
                                <div class="cnptool esspclearfix">
                                    <div class="toolleft">
                                        <!-- <i class="iconfont icon-biaoqing"></i> -->
                                        <!-- <i class="iconfont icon-tupian1"></i> -->
                                    </div>
                                    <div class="toolright">
                                        <el-checkbox v-model="anonymous2" class="cnanony">匿名评论</el-checkbox>
                                        <!--<el-button评论</el-button>-->
                                        <span  class="cnbtn" @click="reconclose(item)">评论</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--<div class="recon esspclearfix" v-if="item.showBox">
                            <textarea class="recon_box" v-model.trim="item.replytext">
                            </textarea>
                            <div class="rebtntool">

                                <el-button class="recon_cnbtncancel"  @click="reconclosecancel(item)">取消</el-button>
                                <el-button class="recon_cnbtn" type="info" @click="reconclose(item)">提交</el-button>
                            </div>
                        </div>-->
                    </div>
                </div>


            </div>
            <div class="pageList">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="pageRanges"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="allTotal">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
    import mixin from '@/components/mixins/mixins_windowOpen.js'

    export default {
        mixins: [mixin],
        data() {
            return {
                reIndex:"",
                anonymous: false,//默认不匿名
                anonymous2: false,//回复评论默认不匿名
                cnttext: "",//评论的内容
                entityId: this.$route.query.informationId || this.$route.query.activityId,
                cnts: [],
                pageRanges: [5, 10, 20],//默认每页10条数区间
                pageNum: 1,//当前页码
                pageSize: 5,//每页条数
                allTotal: 0,//总条数
                userInfo: {},
                isClick: true,
                userrole: this.userInfo ? this.userInfo.userrole : '11',
                showDel:false
            }
        },
        props:[
            "commentSty",// 评论类型 1. 活动  2. 资讯
            "info"
        ],
        computed: {},
        created() {
            this.userInfo = this.SSH.getItem('userInfo');
            if(this.utils.arrayIsContain('33,',this.SSH.getItem('userInfo').userPostList)
                ||this.utils.arrayIsContain('34,',this.SSH.getItem('userInfo').userPostList)){
                this.showDel=true
            }
            console.log(this.userInfo);
            this.getCnt();
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.getCnt();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getCnt();
            },
            handleCommand(command) {
                var item = command.item;
                // 回复
                if (command.keyindex == "0") {
                    item.showBox = true;
                    this.reIndex=command.index
                }
                // 删除
                if (command.keyindex == "1") {
                    this.$confirm("是否删除该评论?","删除").then(() => {
                        this.delComment(item);
                    });
                }
                // 举报
                if (command.keyindex == "2") {
                    this.tipOffFn(5,item.id,item.content,"ddsd",item.usrNm)
                }
            },
            // 3. 资讯模块  4. 活动模块  5. 评论模块
            tipOffFn(type,id,title,cstNm,byInformer){
                if(this.utils.isLoginMode()){
                    if(this.utils.isVisitorMode()){
                        this.$message.warning("您暂无权限进行举报");
                        return;
                    }
                    var cstNm = cstNm || this.infoDetailData.cstNm;
                    var byInformer = byInformer || this.infoDetailData.usrNm;
                    this.$commonJs.tipOffMask({
                        informType: type,                                      // 类型（必填）
                        informContent: title,                                  // 举报标题
                        byInformer: byInformer,                                // 被举报人（必填）
                        informerEnt: cstNm,                                    // 被举报人所在企业（必填）
                        entId: id                                              //  实体编号  类似id比如 活动id， 评论id等（必填）
                    });
                }else{
                    var _this = this;
                    this.$message.warning("您尚未登录，请您先登录");
                    setTimeout(function(){
                        _this.windowHrefUrl('/userIndex/login')
                    },2000)
                }
            },
            reconclose(item) {
                this.addReply(item);
            },
            reconclosecancel(item) {
                item.showBox = false;
                item.content = "";
            },

            //添加回复
            addReply(item) {
                if(this.utils.isLoginMode()){
                    this.cstBscInf()
                    if(item.replytext.length===0){
                        this.$message.warning("回复内容不能为空");
                        return;
                    }
                    var isClick = true;
                    if(!isClick) {
                        return;
                    }
                    isClick = false;
                    var url = this.$apiUrl.parkInfo.addReply;
                    var realcnttext = item.replytext;
                    if (item.userId==item.reUserId){
                        this.$message.warning("暂不支持回复自己")
                        return

                    }
                    if (realcnttext.length == 0) {
                        this.$message.warning("回复内容不能为空")
                        return
                    }
                    if (realcnttext.length > 300){
                        this.$message.warning("回复内容不能超过300个字")
                        return
                    }
                    var pop = {entityId: item.entityId, content: realcnttext, reUserId: item.userId, commentId: item.id}
                    var anonymous2=""
                    //匿名对匿名
                    if(item.state==='1' && this.anonymous2){
                        anonymous2='2'
                    }else{
                        anonymous2 = this.anonymous2 ? "1" : "0";//后台约定 匿名为1，不匿名为0
                    }
                    pop['anonymous']=anonymous2
                    this.$post(url, pop)
                        .then((response) => {
                            isClick = true;
                            if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                                this.$message.success("回复发表成功");
                                this.getCnt();
                                item.replytext = "";
                            } else {
                                this.$message.info(response.resultMsg);
                            }
                        }, (err) => {
                            isClick = true;
                            this.$message.error(response.resultMsg);
                        })

                }else{
                    var _this = this;
                    this.$message.warning("您尚未登录，请您先登录");
                    setTimeout(function(){
                        _this.windowHrefUrl('/userIndex/login')
                    },2000)
                }
            },
            delReply(item,parentItem,index,childIndex) {
                if(this.utils.isLoginMode()){
                    if(!this.utils.isVisitorMode()){
                        this.$message.warning("您暂无权限删除回复");
                        return;
                    }
                    this.$confirm("是否删除该评论?","删除").then(() => {
                        var url = this.$apiUrl.parkInfo.delReply;
                        var pop = {id: item.id}
                        //onsole.log(item,parentItem,index);
                        this.$post(url, pop)
                            .then((response) => {
                                if (response.resultCode == "CLT000000000") {
                                    this.cnts[index].replyList.splice(childIndex,1);
                                    this.$message.success("该条评论删除成功");
                                } else {
                                    this.$message.info(response.resultMsg);
                                }
                            }, (err) => {
                                this.$message.error(err.resultMsg);
                            })
                    });
                }else{
                    var _this = this;
                    this.$message.warning("您尚未登录，请您先登录");
                    setTimeout(function(){
                        _this.windowHrefUrl('/userIndex/login')
                    },2000)
                }
            },
            // 删除评论
            delComment(item) {
                if(this.utils.isLoginMode()){
                    if(this.utils.isVisitorMode()){
                        this.$message.warning("您暂无权限删除评论");
                        return;
                    }
                    var url = this.$apiUrl.parkInfo.delComment;
                    var pop = {id: item.id}

                    this.$post(url, pop)
                        .then((response) => {
                            if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                                this.$message.success("该条评论删除成功");
                                this.getCnt();
                            } else {
                                this.$message.info(response.resultMsg);
                            }
                        }, (err) => {
                            this.$message.error(response.resultMsg);
                        })
                }else{
                    var _this = this;
                    this.$message.warning("您尚未登录，请您先登录");
                    setTimeout(function(){
                        _this.windowHrefUrl('/userIndex/login')
                    },2000)
                }
            },
            //获取回复
            getReplys(item) {
                var url = this.$apiUrl.parkInfo.getReplys;
                var pop = {commentId: item.id}
                this.$post(url, pop)
                    .then((response) => {
                        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.$message.success("获取回复成功");
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    }, (err) => {
                        this.$message.error(response.resultMsg);
                    })
            },
            //判断是否企业认证
            cstBscInf(){
                var _this = this;
                if (!this.SSH.getItem("enterpriseFlag")|| !this.SSH.getItem("cetificateFlag")){
                    this.$confirm('您未进行实名认证，无法评论，请先进行认证，再评论', '提示', {
                        confirmButtonText: '去实名认证',
                        cancelButtonText: '暂不认证',
                        type:"warning",
                        center: true
                    }).then(() => {
                        //去实名认证
                        if(!this.SSH.getItem("cetificateFlag")){//个人
                            _this.windowHrefUrl('/certInfor/personalCert')
                        }else if(!this.SSH.getItem("enterpriseFlag")){//企业
                            _this.windowHrefUrl('/certInfor/enterpriseCertApply')
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '暂不认证'
                        });
                    });

                    return;
                };
            },
            //添加评论
            addCnt() {
                //alert("是否登录"+this.utils.isLoginMode())
                // alert("是否游客模式"+this.utils.isVisitorMode())
                if(this.utils.isLoginMode()){
                    this.cstBscInf()
                    var url = this.$apiUrl.parkInfo.addComment;
                    // var realcnttext = this.cnttext.replace(/\s+/g, "");
                    var realcnttext = this.cnttext;
                    if (realcnttext.length == 0) {
                        this.$message.warning("请输入评论内容")
                        return
                    }
                    if (realcnttext.length > 300){
                        this.$message.warning("评论内容不能超过300个字")
                        return
                    }
                    var anonymous = this.anonymous ? "1" : "0";//后台约定 匿名为1，不匿名为0

                    var pop = {
                        entityId: this.entityId,
                        type: this.commentSty,
                        content: realcnttext,
                        anonymous: anonymous
                    }
                    if(!this.isClick) {
                        return;
                    }
                    this.isClick = false;
                    this.$post(url, pop).then((response) => {
                        if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.$message.success("评论发表成功");
                            this.getCnt();
                            this.cnttext = "";
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                        this.isClick = true;
                    }, (err) => {
                        this.$message.error("接口异常");
                        this.isClick = true;
                    })
                }else{
                    var _this = this;
                    this.$message.warning("您尚未登录，请您先登录");
                    setTimeout(function(){
                        _this.windowHrefUrl('/userIndex/login')
                    },2000)
                }
            },
            reply_more_btn(item) {
                item.replyLen = item.replyLen == 2 ? item.replyList.length : 2;
                item.btn_name = item.replyLen == 2 ? "查看更多回复" : "收起更多回复";
            },
            //获取评论
            getCnt() {
                var url = this.$apiUrl.parkInfo.getComment;
                var pop = {entityId: this.entityId, type: this.commentSty, pageNum: this.pageNum, pageSize: this.pageSize}
                this.$post(url, pop).then((response) => {
                    if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.allTotal = response.resultData.total;
                        this.cnts = response.resultData.commentList;
                        this.cnts.map(item => {
                            this.$set(item, "replytext", '');
                            this.$set(item, "replyLen", 2);
                            this.$set(item, "maxReplyLen", item.replyList.length);
                            this.$set(item, "btn_name", "查看更多回复")
                        })
                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, (err) => {
                    this.$message.error(err.resultMsg);
                })
            },
        },
        watch:{
            $route(to,from){
                this.cnttext = "";
                this.entityId = to.query.informationId||to.query.activityId;
                this.getCnt();
            }
        }
    }
</script>
<style lang='less' scoped>
    @import "../assets/css/mixin";
    @com_font_size: 16px;
    @con_bg: #fff;
    //评论区域样式
    .cnbox{
        //        .essp_width_auto();
        background: @con_bg;
        /*margin-bottom: 30px;*/
        /*border-bottom: 1px solid #ccc;*/
        .cn_box{
            .fundes{
                /*text-indent: 50px;*/
                /*font-family: "微软雅黑";*/
                font-size: 16px;
                font-weight: normal;
                line-height: 30px;
                color: #444444;
                /*margin-bottom: 10px;*/
            }
            .border {
                border: 1px solid #00a0e9;
            }
            //评论主要区域
            .funmain{
                .portrait{
                    float: left;
                    margin-right: 10px;
                    .icon-touxiang1-copy {
                        font-size: 40px;
                        color: #00a0e9;
                    }
                }
                .comment{
                    float: left;
                    width:1020px;
                }
            }
        }
    }
    .cn_box {
        .fundes {
            /*text-indent: 50px;*/
            /*font-family: "微软雅黑";*/
            font-size: 16px;
            font-weight: normal;
            line-height: 30px;
            color: #444444;
            /*margin-bottom: 10px;*/
        }

        //评论主要区域
        .funmain {
            .portrait {
                float: left;
                margin-right: 10px;
                padding-top: 28px;
                .icon-faburen {
                    font-size: 36px;
                }
            }
            .comment {
                float: left;
                width: 980px;
                /*border: 1px solid #cccccc;*/
                .cnptext {
                    width: 100%;
                    height: 100px;
                    resize: none;
                    text-indent: 10px;
                    display: block;
                    outline: none;
                    background-color: transparent;
                    scrollbar-arrow-color: yellow;
                    scrollbar-base-color: lightsalmon;
                    color: #666464;
                    border: 0;
                    padding: 10px 0px;

                }
                //评论工具条样式
                .cnptool {
                    width: 100%;
                    background-color: #fafafa;
                    .toolleft {
                        float: left;
                        padding: 0 15px;
                        height: 40px;
                        line-height: 40px;
                        .iconfont {
                            margin-right: 10px;
                            font-size: 20px;
                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }
                    .toolright {
                        float: right;
                        .cnanony {
                            margin-right: 16px;
                            font-size: 14px;
                            line-height: 40px;

                        }
                        .cnbtn {
                            float: right;
                            width: 110px;
                            text-align: center;
                            line-height: 40px;
                            height: 40px;
                            background-image: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                            color: #fff;
                            cursor: pointer;
                        }
                    }

                }
            }
        }
    }

    .commentlist {
        padding: 20px 48px;
        .fundes {
            /*text-indent: 50px;*/
            /*font-family: "微软雅黑";*/
            font-size: 16px;
            font-weight: normal;
            line-height: 30px;
            color: #444444;
            margin-bottom: 10px;
        }

    }

    //无评论的情况
    .nocnslist {
        text-align: center;
        padding: 20px 0px;
        .icon-shafa {
            font-size: 80px;
            color: #ccc;

        }
        .nocntops{
            color:#ccc;
            margin-top:15px;
        }
    }

    //有评论的情况
    .cnslist {
        padding: 20px 0px;
        margin-left: 30px;
        .item_about {
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
            .face {
                float: left;
                margin: 0 10px 30px;
                .icon-touxiang1-copy {
                    display: block;
                    font-size:50px;
                    color:#00a0e9;
                }
            }
            .main_about {
                float: left;
                width: 90%;
                .username {
                    margin-bottom: 9px;
                    font-size: 14px;
                    color: #00a0e9;
                }
                .comm {
                    margin-bottom: 5px;
                    font-size: 14px;
                    line-height: 30px;
                    color: #444444;
                    word-break: break-word;
                }
                .recommbox {
                    margin-bottom: 10px;
                    .recomm {
                        background-color: #e8f3ff;
                        padding: 5px 15px;
                        .replyname {
                            margin-bottom: 5px;
                            color: #333;
                            font-size: 12px;
                            line-height: 30px;
                            .re_person {
                                float: left;
                                margin-right: 5px;
                                color: #00a0e9;
                            }
                            .re_funs {
                                float: left;
                                margin-right: 5px;
                            }
                            .re_reUserName {
                                float: left;
                                margin-right: 5px;
                                color: #00a0e9;
                            }

                        }
                        .replytext {
                            margin-bottom: 5px;
                            font-size: 12px;
                            line-height: 30px;
                            color: #444;
                        }
                        .replytool {
                            .relytoolleft {
                                float: left;
                                width: 100%;
                                .replytimeicon {
                                    font-style: normal;
                                    font-size: 12px;
                                }
                                span {
                                    float: right;
                                    cursor: pointer;
                                }
                            }
                        }

                    }
                }
                .abouttool {
                    margin-bottom: 10px;
                    font-size: 12px;
                    color: #999;
                }
                .recon {
                    margin-bottom: 10px;
                    .recon_box {
                        width: 100%;
                        height: 100px;
                        resize: none;
                        text-indent: 10px;
                        background-color: transparent;
                        scrollbar-arrow-color: yellow;
                        scrollbar-base-color: lightsalmon;
                        color: #666464;
                        padding: 10px 0px;
                    }
                    .rebtntool {
                        float: right;
                        padding: 10px 0;
                        .recon_cnbtn {
                            float: left;
                            height: 40px;
                            background-image: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                            color: #fff;
                        }
                        .recon_cnbtncancel {
                            float: left;
                            background-color: #909399;
                            margin-right: 2px;
                            color: #fff;
                        }

                    }
                }
            }
        }
    }

    //评论工具样式
    .abouttool-left {
        float: left;
        em {
            float: left;
            font-style: normal;
        }
    }

    .abouttool-right {
        float: right;
        i {
            float: left;
        }
    }

    //分页器
    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }
    .reply_more_btn_c {
        padding: 10px 0;
        text-align: center;
    }

    .reply_more_btn_c span {
        cursor: pointer;
    }
    .border_nm{
        .border {
            border: 1px solid #00a0e9;
        }
        .cnptext{
            width: 100%;
            height: 66px;
            resize: none;
            text-indent: 10px;
            display: block;
            outline: none;
            background-color: transparent;
            scrollbar-arrow-color: yellow;
            scrollbar-base-color: lightsalmon;
            color: #666464;
            border: 0;
            padding: 10px 0px;
        }
        .cnptool{
            width: 100%;
            background-color: #fafafa;
            .toolleft{
                float: left;
                padding: 0 15px;
                height: 40px;
                line-height: 40px;
            }
            .toolright{
                float: right;
                .cnbtn{
                    float: right;
                    width: 110px;
                    text-align: center;
                    line-height: 40px;
                    height: 40px;
                    background-image: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                    color: #fff;
                    cursor: pointer;
                }
                .cnanony {
                    margin-right: 16px;
                    font-size: 14px;
                    line-height: 40px;

                }
            }
        }
    }

</style>
