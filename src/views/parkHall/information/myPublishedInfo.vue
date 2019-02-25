<template>
    <div>
        <!-- 我发起的资讯模版 -->
        <div class="launchcon">
            <div class="toolcon esspclearfix">
                <div class="toolleft">
                    <span :class="{'showblue': type == 0}" @click="changeType(0)">已发布</span>
                    <span :class="{'showblue': type == 1}" @click="changeType(1)">草稿箱</span>
                </div>
                <div class="toolright" v-if="flag">
                    <el-button
                        class="toolright_btn"
                        type="primary"
                        size="mini"
                        @click="$router.push('/parkIndex/publishNewInfo')"
                    >
                        <i class="el-icon-circle-plus"></i>发布新资讯
                    </el-button>
                </div>
            </div>
            <div v-if="type == 1">
                <div class="esspclearfix tools">
                    {{startDate}}
                    <span class="tdspan">
            <el-button type="info" plain @click="delInfoDraft()">删除草稿</el-button>
          </span>
                    <span class="tdspan">
            <el-date-picker
                v-model="timeRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
            ></el-date-picker>
          </span>
                    <span class="tdspan">
            <el-button type="primary" icon="el-icon-search" @click="getDraftInfoList()">搜索</el-button>
          </span>
                </div>
                <!-- <div class="btntools">
                                  <el-button class="" type="primary" >查询</el-button>
                                  <el-button class="" type="info" @click="reSetSerchOption()">重置</el-button>
                </div>-->
                <el-table
                    ref="multipleTable"
                    :data="mcCardDataList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="userName" label="发布人" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column label="保存时间" width="155" show-overflow-tooltip>
                        <template
                            slot-scope="scope"
                        >{{ scope.row.createTime | timerFormatDraft(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column width="190" prop="content" label="资讯简介"
                                show-overflow-tooltip>
                    </el-table-column>-->
                    <el-table-column width="400" prop="informationTitle" label="资讯标题" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="tip-changebg">{{ scope.row.informationTitle }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">

                            <!--<el-button type="primary" @click="goBaoMing(scope)" size="mini">编辑</el-button>-->
                            <button class="edit-btn" @click="goBaoMing(scope)">
                                <span class="edit-text">编</span>辑
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <ul v-if="type == 0 && mcCardDataList && mcCardDataList.length>0" class="esspclearfix">
                <li class="itemli" v-for="(item, index) in mcCardDataList" :key="index">
                    <div class="infostit esspclearfix">
            <span>
              发布人:
              <em>{{item.userName}}</em>
            </span>
                        <span>
              发布时间:
              <em>{{item.createTime | timerFormat(item.createTime)}}</em>
            </span>
                        <span>
              资讯状态:
              <em class="ema">{{item.status| statusFilter(item.status)}}</em>
            </span>
                        <!--<div class="delete">-->
                        <!--<i class="el-icon-delete" @click="getInfoId(item)"></i>-->
                        <!--</div>-->
                        <div class="delete" v-if="checkActivityOperateAuth(item.userName)">
                            <i class="el-icon-delete" @click="getInfoId(item)"></i>
                        </div>
                    </div>
                    <div class="infocon esspclearfix">
                        <div class="logocon" @click="goinfoDetail(item)">
                            <img class="detaillogo" :src="item.titleImg" @error="setDefaultImg($event)">
                            <div class="img_tips">
                                <p class="cost">{{item.createTime | timerFormat(item.createTime)}}</p>
                            </div>
                        </div>
                        <div class="detailcon esspclearfix">
                            <h2 @click="goinfoDetail(item)">{{item.informationTitle}}</h2>
                            <div class="goactive_l">
                                <p class="introduction">{{item.content}}</p>
                                <p class="tagcon">
                                    <!--<el-tag-->
                                    <!--class="it_tag"-->
                                    <!--v-for="(it, tagIndex) in activityLabelList[index]"-->
                                    <!--v-if="tagIndex<3"-->
                                    <!--:key="tagIndex"-->
                                    <!--&gt;{{it}}-->
                                    <!--</el-tag>-->
                                    <essp-park-tag
                                        v-for="(item, eptIndex) in activityLabelList[index]"
                                        :value="item"
                                        v-if="eptIndex<3"
                                        :key="eptIndex"
                                    />
                                </p>
                                <div class="fundiv">
                  <span class="funitems">
                    <i :class="icons[0]"></i>
                    <em>{{item.viewTime}}</em>
                  </span>
                                    <span class="funitems">
                    <i :class="icons[1]"></i>
                    <em>{{item.countFollower}}</em>
                  </span>
                                    <span class="funitems">
                    <i :class="icons[2]"></i>
                    <em>{{item.countComment}}</em>
                  </span>
                                </div>
                            </div>
                            <div class="goactive_r" v-if="checkActivityOperateAuth(item.userName)">
                                <el-button
                                    type="primary"
                                    class="btncon"
                                    size="small"
                                    :disabled="item.status|disableBtnFormat(item.status)"
                                    round
                                    @click="goLanchInfo(item)"
                                >编 &nbsp;&nbsp;&nbsp;&nbsp;辑
                                </el-button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="type == 0 && mcCardDataList && mcCardDataList && mcCardDataList.length==0">
                <!-- <div style="text-align: center">暂无数据</div> -->
                <essp-loading :nodata="true"></essp-loading>
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
                :total="allTotal"
            ></el-pagination>
        </div>

        <!-- 移除资讯 -->
        <el-dialog
            :visible.sync="dialogTableVisible"
            width="520px"
            :before-close="handleClose">
            <div slot="title">
                <p style="padding: 0 20px; height: 22px; line-height: 22px; font-size: 24px;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #333333;">
                    提示</p>
            </div>
            <p style="padding:0 20px; height: 28px; line-height: 28px">
                <span
                    style="display: inline-block; margin-right: 20px; width: 28px;height: 28px; text-align: center; font-size: 20px; border-radius: 50%; color: #fff; background-color: #00a0e9;">!</span>
                <span
                    style="display: inline-block; height: 19px;line-height: 19px;font-size: 20px;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #333333">是否确认删除该条资讯</span>
            </p>
            <div slot="footer" class="dialog-footer">
                <button
                    style="margin-right: 50px; width: 100px;height: 35px;line-height: 35px; border: none; background-color: #e6f4ff; border-radius: 2px; font-size: 18px; font-weight: normal;font-stretch: normal; line-height: 30px; letter-spacing: 0px; color: #00a0e9;"
                    @click="dialogTableVisible = false">取 消
                </button>
                <button
                    style="width: 100px;height: 35px;line-height: 35px; border: none; background-color: #04a2ea; border-radius: 2px; font-size: 18px; font-weight: normal;font-stretch: normal; line-height: 30px; letter-spacing: 0px; color: #fff;"
                    @click="delInfo">确 定
                </button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import EsspTopToolbar from "@/components/EsspTopToolbar";
    import imgfault from "@/assets/error.png"; //引入加载失败默认图
    import EsspParkTag from "@/components/EsspParkTag";

    import Moment from "moment";

    export default {
        components: {
            // EsspTopToolbar
            EsspParkTag
        },
        name: "",
        data() {
            return {
                msg: "我发起的资讯",
                pageRanges: [10, 20, 30, 40], //默认每页10条数区间
                pageNum: 1, //当前页码
                pageSize: 10, //每页条数
                allTotal: 0, //总条数
                startDate: "", //起始时间
                endDate: "", //结束时间
                title: "", //搜索关键词
                mcCardDataList: [],
                pageType: "myPublishedInfo",
                icons: [
                    "icon iconfont icon-liulan",
                    "icon iconfont icon-collect2",
                    "icon iconfont icon-pinglun"
                ],
                curInfoId: "",
                dialogTableVisible: false,

                //草稿合并参数
                mcCardDataList: [],
                timeRange: [],
                ids: "",
                flag: sessionStorage.getItem("loginFlag"),
                type: 0
            };
        },
        created() {
            if (this.$route.query.type) {
                this.type = this.$route.query.type;
                if (this.type == 1) {
                    return this.getDraftInfoList()
                }
            }
            this.getLanchInfoList();
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            },
            timerFormatDraft(vaule) {
                return Moment(vaule).format("YYYY-MM-DD HH:mm");
            },
            statusFilter(vaule) {
                const statuMap = {
                    "0": "起草中", //起草中
                    "01": "园区审核中", //园区审核中
                    "02": "发布中", //企业管理审核通过
                    "03": "审核不通过", //企业拒绝
                    "05": "企业审核中", //企业审核中
                    "10": "园区待审核", //园区待审核
                    "12": "审核不通过", //园区拒绝
                    "13": "园区待审核", //园区高级待审核
                    "14": "高级管理员审核中", //园区高级待审核
                    "21": "企业待审核" //企业待审核
                };
                return statuMap[vaule] ? statuMap[vaule] : "";
            },
            disableBtnFormat(code) {
                // 在审核状态不可编辑
                return code == "01" || code == "05" || code == "10" || code == "21";
            }
        },
        methods: {
            changeType(type) {
                if (type == 0) {
                    this.type = type;
                    this.getLanchInfoList();
                }
                if (type == 1) {
                    this.type = type;
                    this.getDraftInfoList();
                }
            },

            getInfoId(item) {
                this.dialogTableVisible = true;
                this.curInfoId = item.informationId;
            },
            delInfo(item) {
                var pop = {ids: this.curInfoId};
                var url = this.$apiUrl.parkInfo.delInfoes;
                this.dialogTableVisible = false
                this.$post(url, pop).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.$message.success("资讯删除成功");
                            this.getLanchInfoList();
                        // }
                    },
                    err => {
                        this.$message.info(response.resultMsg);
                    }
                );
            },
            goinfoDetail(item) {
                var informationId = item.informationId;
                this.$router.push({
                    path: "/parkIndex/infoDetail",
                    query: {informationId}
                });
            },
            goLanchInfo(item) {
                var informationId = item.informationId;
                this.$router.push({
                    path: "/parkIndex/publishNewInfo",
                    query: {informationId}
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                if (this.type == 0) {
                    this.getLanchInfoList();
                } else {
                    this.getDraftInfoList();
                }
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                if (this.type == 0) {
                    this.getLanchInfoList();
                } else {
                    this.getDraftInfoList();
                }
            },
            //图片失败设置默认图
            setDefaultImg(event) {
                var ele = event.currentTarget;
                ele.src = imgfault;
                ele.title = "默认配图";
            },
            getLanchInfoList() {
                var url = this.$apiUrl.parkInfo.lanchInfo;
                var parkId = sessionStorage.getItem("parkId") || "";
                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    title: "",
                    parkId: parkId
                }).then(
                    response => {
                        // var codestatus = response.resultCode;
                        // if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                            this.mcCardDataList = response.resultData.informationList;
                            this.allTotal = response.resultData.total;
                        // } else {
                        //     this.$message.info(response.resultMsg);
                        // }
                    });
            },

            //草稿箱
            reSetSerchOption() {
                this.timeRange = [];
            },
            delInfoDraft() {
                if (this.ids == "") {
                    this.$message("您没有选择删除的项目");
                    return;
                }
                var ids = this.ids;
                var pop = {ids: ids};
                var url = this.$apiUrl.parkInfo.delInfoes;
                this.$post(url, pop).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.$message.success("删除成功");
                            this.getDraftInfoList();
                        // }
                    });
            },
            getDraftInfoList() {
                var url = this.$apiUrl.parkInfo.lanchInfo;
                var parkId = sessionStorage.getItem("parkId") || "";
                this.$post(url, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startDate: this.timeRange[0] ? this.timeRange[0] : "",
                    endDate: this.timeRange[1] ? this.timeRange[1] : "",
                    title: "",
                    status: "0", //表示草稿箱
                    parkId: parkId
                }).then(
                    response => {
                        // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                            this.timeRange = [];
                            this.mcCardDataList = response.resultData.informationList;
                            this.allTotal = response.resultData.total;
                        // } else {
                        //     this.$message.info(failMsg + response.resultMsg);
                        // }
                    });
            },
            goBaoMing(scope) {
                var informationId = scope.row.informationId;
                this.$router.push({
                    path: "/parkIndex/publishNewInfo",
                    query: {informationId: informationId}
                });
            },
            handleSelectionChange(val) {
                var _this = this;
                var selectArray = [];
                this.multipleSelection = val;
                this.multipleSelection.forEach(function (item) {
                    var id = item.informationId;
                    selectArray.push(id);
                });
                _this.ids = selectArray.join(",");
            },

            // 判断是不是自己发布的
            checkActivityOperateAuth(recordOwner) {
                let defautlFlag = false;
                let currentUser = this.SSH.getItem("userName");

                if (currentUser === recordOwner) {
                    defautlFlag = true;
                }

                return defautlFlag;
            }
        },

        computed: {
            activityLabelList() {
                let arr = [];
                let brr = [];
                let len = this.mcCardDataList.length;
                for (let i = 0; i < len; i++) {
                    if (this.mcCardDataList[i].tagsTxt != undefined) {
                        arr = this.mcCardDataList[i].tagsTxt.split(",");
                    } else {
                        arr = [];
                    }
                    brr.push(arr);
                }
                return brr;
            }
        }
    };
</script>

<style scoped lang='less'>
    @import "../../../assets/css/mixin";

    em {
        font-style: normal;
    }

    .launchcon {
        padding: 0px 20px 0;
        background: #fff;
        overflow: hidden;
    }

    .pageList {
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
    }

    .goactive_l {
        float: left;
        width: 80%;
        .introduction {
            width: 100%;
            color: #999;
            .esspellipsis();
            font-size: 14px;
            margin-bottom: 15px;
        }
        .tagcon {
            margin-bottom: 15px;
            .it_tag {
                margin-right: 5px;
                background: #fff;
                color: #999;
                padding: 0 5px;
                border-radius: 10px;
                text-align: center;
                border: 1px solid #999;
            }
        }
    }

    .goactive_r {
        float: left;
        margin-left: 40px;
        .btncon {
            float: right;
            width: 80px;
            margin-right: 10px;
        }
    }

    // 消息简介汇总
    .itemli {
        margin-bottom: 25px;
    }

    .infostit {
        background-color: #f1f1f1;
        height: 30px;
        line-height: 30px;
        span {
            float: left;
            width: 24%;
            padding-left: 1%;
            text-align: left;
            color: #666666;
            em {
                margin-left: 4px;
            }
            .ema {
                margin-left: 4px;
                color: #00a0e9;
            }
        }

        .delete {
            float: right;
            padding-right: 15px;
            i {
                cursor: pointer;
            }
        }
    }

    .infocon {
        margin-top: 10px;

        &:hover {
            zoom: 1;
            box-shadow: 1px 1px 2px 0px rgba(0, 102, 179, 0.15);
        }
        h2 {
            margin-top: 5px;
        }
        .funitems {
            margin-right: 15px;
            i {
                margin-right: 10px;
                color: #cccccc;
            }
        }
    }

    .logocon {
        width: 25.3%;
        height: 160px;
        float: left;
        margin-right: 2%;
        position: relative;
        transition: all 1s;
        border: 1px solid #ccc;
        &:hover .img_tips {
            transform: scale(1.02);
        }
        //显示hover效果的遮盖层
        .img_tips {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20px;
            background-color: #000000;
            .esspopacity(@value:0.7); //调节透明度
            p {
                position: absolute;
                top: 0;
                color: #fff;
            }
            .enrolled {
                left: 10px;
            }
            .cost {
                right: 10px;
            }
        }
        .detaillogo {
            display: block;
            width: 100%;
            height: 100%;
            transition: all 1s;
            &:hover {
                transform: scale(1.02);
            }
        }
    }

    .detailcon {
        float: left;
        width: 72.4%;
        padding: 10px 0;
        h2 {
            .esspellipsis();
            font-size: 18px;
            line-height: 24px;
            font-weight: normal;
            color: #444;
            margin-bottom: 15px;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .statusnum {
        margin-bottom: 15px;
        span {
            float: left;
            margin-right: 20px;
            font-size: 16px;
            line-height: 24px;
            color: #777;
        }
    }

    .addrdiv {
        margin-bottom: 15px;
        color: #999999;
        i {
            margin-right: 5px;
        }
    }

    .fundiv {
        margin-bottom: 10px;
        .funitems {
            i {
                margin-right: 5px;
            }
        }
    }

    .removePark {
        .el-dialog__header {
            display: none;
        }
        .el-dialog__body {
            padding: 0;
            & > p {
                margin: 0 auto;
                &:nth-of-type(1) {
                    line-height: 110px;
                    width: 520px;
                    text-align: center;
                    font-size: 20px;
                    color: #333333;
                    border-bottom: solid 3px #ccc;
                }
                &:nth-of-type(2) {
                    width: 336px;
                    height: 44px;
                    margin: 50px auto;
                    font-size: 16px;
                    text-align: center;
                    color: #ccc;
                }
                &:nth-of-type(3) {
                    text-align: center;
                    & > button {
                        width: 80px;
                        height: 40px;
                        line-height: 0;
                        font-size: 20px;
                        border-radius: 3px;
                        &:nth-of-type(1) {
                            margin-right: 35px;
                        }
                    }
                }
            }
        }
    }

    //合并草稿箱追加
    .toolcon {
        /*margin-bottom: 10px;*/
        padding: 24px 0;
        .toolleft {
            float: left;
            span {
                font-size: 18px;
                cursor: pointer;
                &:nth-of-type(1) {
                    padding-right: 15px;
                    border-right: 1px solid #ccc;
                }
                &:nth-of-type(2) {
                    padding-left: 15px;
                }
            }
            .showblue {
                color: #00a0e9 !important;
            }
            .toolspan {
                float: left;
                padding: 0 7px;
                position: relative;
                font-size: 18px;
                padding-right: 15px;
                height: 30px;
                line-height: 30px;
                color: #333333;
                &:hover {
                    cursor: pointer;
                }
                &:before {
                    content: " ";
                    position: absolute;
                    width: 1px;
                    height: 70%;
                    right: 0;
                    top: 5px;
                    background: #ccc;
                }
                &:last-child {
                    padding-left: 15px;
                    border-right: none;
                    &:before {
                        width: 0;
                    }
                }
            }
        }
        .toolright {
            float: right;
            .toolright_btn {
                position: relative;
                line-height: 30px;
                font-size: 14px;
                padding: 0 8px 0 35px;
                i {
                    position: absolute;
                    left: 6px;
                    top: 4px;
                    font-size: 22px;
                }
            }
        }
    }

    .edit-btn {
        padding: 5px 15px;
        width: 85px;
        height: 30px;
        line-height: 20px;
        color: #fff;
        border: none;
        background: #409EFF;
        border-radius: 50px;
        .edit-text {
            margin-right: 15px;
        }
    }
</style>
