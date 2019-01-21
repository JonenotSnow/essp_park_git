<template>
    <div id="oneCardModel">
        <!-- 新闻管理专用 -->
        <div class="maintool esspclearfix">
            <el-checkbox class="all_checked_model" v-model="allCheck" @change="changeAllChecked">全选</el-checkbox>
            <div class="numdes">共<span class="detailnum">{{list.length}}</span>条，已选<span class="detailnum">{{selectCheckItems.length}}</span>条
            </div>
            <div class="btntool"><span class="delbtn" @click="removeList">删除</span></div>
            <!-- 草稿屏蔽 -->
            <div class="statustool" v-if="!customopts.status==0">
                <el-select v-model="classtType" @change="changeStatus" placeholder="请选择" class="inline_select">
                    <el-option
                        v-for="(item,index) in typeitems"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div>
        </div>
        <div v-if="list.length">
            <div>
                <div class="listitem" v-for="(item,index) in list" :key="index">
                    <div class="listtop esspclearfix">
                        <el-checkbox class="model_label" v-model="item.isChecked" @change="changeChecked(item,index)"></el-checkbox>
                        <div class="tdcn timecn"><span>保存时间：{{item.createTime | timerFormat}}</span></div>
                        <div class="tdcn pbcn"><span>发布人:{{item.userName}}</span></div>
                        <!-- 草稿屏蔽 -->
                        <div class="tdcn statusdes" v-if="!customopts.status==0"><span>状态:<span
                            class="detail">{{item.status | statusFormat(item.status)}}</span></span></div>
                        <div class="tdcn handeltool"><i class="el-icon-delete remove" @click="removeList('01',item)"></i></div>
                        <!--当前用户是否能删除其他用户-->
                        <!--<div class="tdcn handeltool" v-if="item.creator == thisUserId"><i class="el-icon-delete remove" @click="removeList('01',item)"></i></div>-->
                    </div>
                    <div class="maintext esspclearfix">
                        <div class="textTit">{{item.informationTitle}}</div>
                        <div class="btnArea">
                            <!--已审核的操作按钮 -->
                            <div class="btncons" v-if="customopts.status==2">
                                <span class="btnitem" @click="goAudit(item)">查看</span>
                                <span class="btnitem" v-if="thisUserId == item.creator" @click="goEdit(item)">编辑</span>
                            </div>
                            <!-- 已发布 -->
                            <div class="btncons" v-if="customopts.status==1">
                                <span class="btnitem" @click="goEdit(item)" v-if="thisUserId == item.creator">编辑</span>
                            </div>
                            <!-- 草稿 -->
                            <div class="btncons" v-if="customopts.status==0">
                                <span class="btnitem" @click="goEdit(item)" v-if="thisUserId == item.creator">编辑</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else  class="no_odata">暂无数据！</div>
    </div>
</template>

<script>

    export default {
        props: {
            customopts: {
                type: Object,
                default: {}
            },
            allCheck: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: ''
            },
            list: {
                type: Array,
                default: []
            },
            classtType: {
                type: String(),
                default: ''
            }
        },
        data() {
            return {
                typeitems: [
                    {
                        name: "全部",
                        id: ""

                    },
                    {
                        name: "审核通过",
                        id: "02"

                    },
                    {
                        name: "审核不通过",
                        id: "12"
                    }
                ],
                selectCheckItems: [],
                thisUserId: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).id : '',
            }
        },
        created() {
            console.log("传入List",this.list);
        },
        methods: {
            // 改变已选重置
            changeAllCheck(val){
                console.log(val);
                this.allCheck = false;
                this.selectCheckItems = [];
            },
            // 跳转审核详情
            goAudit(item) {
                this.$router.push({
                    name: 'park-lookNewsAudit',
                    query: {
                        id: item.informationId,
                        applyType: '0'+this.type
                    }
                })
            },
            // 跳转编辑页面
            goEdit(item) {
                this.$router.push({
                    path: '/news/addNews',
                    query: {
                        id: item.informationId,
                        applyType: '01'
                    }
                })
            },
            // 状态修改
            changeStatus(){
                this.selectCheckItems = [];
                this.allCheck = false;
                console.log( this.selectCheckItems);
                this.$emit("changeStatusList",this.classtType);

            },
            // 删除列表  01 表示删除一条 其他表示删除多条
            removeList(type,item){
                var type = type;
                var ids = '';
                if(type == "01") {
                    console.log(this.thisUserId,item.creator);
                    if(this.thisUserId != item.creator) {
                        this.$message.error("抱歉,您只能删除当前用户人数据！");
                        return;
                    }
                    ids = item.informationId;
                } else {
                    console.log(this.selectCheckItems)
                    var arrId = [];
                    var len = this.selectCheckItems.length;
                    if(len < 1) {
                        var msg = this.type == '1' ? "新闻动态":'通知公告'
                        this.$message.error("您还未选择"+msg + "信息！");
                        return;
                    }
                    for (var i = 0; i < len; i++) {
                        var item = this.selectCheckItems[i];
                        if(this.thisUserId != item.creator) {
                            arrId = [];
                            break
                        }
                        arrId.push(item.informationId);
                    }
                    console.log(arrId)
                    if(arrId.length == 0) {
                        this.$message.error("您删除的信息含有不属于您的信息！");
                        return;
                    }

                    ids = arrId.join(",");
                }
                console.log(ids);
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delAchievByKey(ids);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            // 删除新闻动态或者通知公告列表
            delAchievByKey(id){
                var url = this.$apiUrl.parkInfo.delInfoes;
                console.log(id);
                this.$post(url, {
                    ids: id
                }).then(
                    response => {
                        this.$message.success(response.resultMsg);
                        this.$emit("delectList");
                        this.selectCheckItems = [];
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            // 全选选择项
            changeAllChecked(){
                this.selectCheckItems = [];
                var arr = [];
                this.list.forEach((item,index) => {
                    item.isChecked = this.allCheck;
                    if(this.allCheck){
                        arr.push(item);
                    }
                })
                arr.forEach((item,index) => {
                    this.selectCheckItems.push(item);
                })

                console.log("全选",this.selectCheckItems);

            },
            // 列表选择项
            changeChecked(item,index) {
                if(item.isChecked) {
                    this.selectCheckItems.push(item);
                    console.log(this.selectCheckItems.length,this.list.length);
                    console.log(this.selectCheckItems.length==this.list.length);

                    if(this.selectCheckItems.length >= this.list.length) {
                        this.allCheck = true;
                    }

                    console.log(this.allCheck);
                } else {
                    this.allCheck = false;
                    if(this.selectCheckItems.length) {
                        var index = this.selectCheckItems.indexOf(item);
                        if(index >-1) {
                            this.selectCheckItems.splice(index,1)
                        }
                    }
                }
                console.log("选一个",this.selectCheckItems);
            }

        },
        filters: {
            statusFormat(value) {
                let statusList = {
                    "10": "园区待审核",
                    "01": "园区审核中",
                    "02": "发布中",
                    "12": "园区审核未通过",
                    "21": "企业待审核",
                    "05": "企业审核中",
                    "03": "企业审核未通过",
                    "13": "高级管理员待审核",
                    "14": "高级管理员审核中"
                }
                return statusList[value] ? statusList[value] : ''
            }
        }
    }
</script>
<style>
    #oneCardModel.checktop .el-checkbox__label {
        display: none;
    }
</style>

<style lang='less' scoped>
    @import "../../../../../assets/css/mixin.less";
    .all_checked_model {
        float: left;
        margin-right: 15px;
    }
    .model_label {
        float: left;
        margin: 0 15px;
    }
    .no_odata {
        text-align: center;
        min-height: 480px;
        line-height: 480px;
        font-size: 18px;
        color: #666;
        background: url('../../../../../assets/newparkimg/no-list-img.png') no-repeat center 57px;
    }
    //全选工具条
    #oneCardModel {
        .maintool {
            width: 910px;
            padding: 20px 0 0;
            margin: 0 auto;
            margin-bottom: 20px;
            height: 40px;
            line-height: 40px;
            .maincheck {
                float: left;
                margin-right: 16px;
                font-family: " MicrosoftYaHei";
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
            }
            .numdes {
                float: left;
                margin-right: 10px;
                font-family: " MicrosoftYaHei";
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
                height: 40px;
                line-height: 40px;
                .detailnum {
                    padding: 0 4px;
                    color: #00a0e9;
                }
            }
            .btntool {
                float: left;
                margin-right: 15px;
                height: 40px;
                line-height: 40px;
                .delbtn {
                    float: left;
                    width: 50px;
                    margin-top: 4px;
                    height: 28px;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                    background-image: linear-gradient(0deg,
                    #f5f5f5 0%,
                    #ffffff 100%);
                    border-radius: 5px;
                    border: solid 1px #cccccc;
                }

            }
            .statustool {
                float: left;
                /deep/ .el-input__inner {
                    height: 30px;
                    width: 120px;
                    line-height: 30px;
                }
            }
        }
        .listitem {
            //每一层列表样式
            width: 910px;
            height: 100px;
            margin: 0 auto;
            margin-bottom: 20px;
            background-color: #ffffff;
            border: solid 1px #cccccc;
        }
        //第一层工具栏样式
        .listtop {
            margin: 0 auto;
            width: 910px;
            height: 40px;
            background-color: #f5f5f5;
            line-height: 40px;
            font-family: "MicrosoftYaHei";
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            .tdcn {
                float: left;
            }
            .checktop {
                float: left;
                margin: 0 12px;
                height: 40px;
            }
            .timecn {
                margin-right: 42px;
            }
            .pbcn {
                margin-right: 40px;
            }
            .statusdes {
                .detail {
                    margin-left: 5px;
                    color: #00a0e9;
                }
            }
            .handeltool {
                float: right;
                margin-right: 20px;
                .remove {
                    cursor: pointer;
                }
            }
        }
        //第二层内容区
        .maintext {
            margin: 0 auto;
            width: 910px;
            height: 60px;
            line-height: 60px;
            .textTit {
                float: left;
                width: 650px;
                padding: 0 29px;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #444444;
                .esspellipsis();
            }
            .btnArea {
                //按钮的最外层样式
                float: right;
            }
            .btncons {
                float: right;
                margin-top: 15px;
                .btnitem {
                    cursor: pointer;
                    float: left;
                    width: 80px;
                    height: 28px;
                    margin-right: 20px;
                    background-color: #10b5ff;
                    border-radius: 14px;
                    color: #fefefe;
                    line-height: 28px;
                    text-align: center;
                }
            }
        }
        .noData {
            position: relative;
            margin: 57px 137px 238px 237px;
            text-align: center;
            span {
                position: absolute;
                top: 90px;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
            }
        }
    }
</style>
