<template>
    <div class="essp-main-cont">

        <EsspMcCardSci
            :mcCardList="mcCardDataList"
            :temeTitle="temeTitle"/>

        <div class="essp-aside-right-cont">
            <div class="aside-right-item aside-right-item-seach">
                <div>
                    <el-input
                        placeholder="请输入标签关键字"
                        v-model="tagTxt" @change="clearCurrentKeyname">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="getSciAndTechPolicy"></i>
                    </el-input>
                </div>
                <div class="keyname">
                    <!-- 只展示前5热门标签 -->
                    <el-button :class="{'sel':currentKeyname===index,'btns':true}" type="primary" round size="mini"
                               v-for="(items,index) in tagItems" :key="index" @click="setKeyName(items,index)"
                               v-if="index<5">{{items.tagTxt}} ( {{items.tagCount}} )
                    </el-button>
                </div>
            </div>
            <div class="aside-right-item aside-right-item1">
                <div class="aside-r-sea aside-r-sea1">
                    <el-date-picker
                        v-model="currentTime"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        value-format="yyyy-MM-dd"
                        end-placeholder="结束日期" @change="timeChangeList">
                    </el-date-picker>
                </div>
                <div class="keyname">
                    <el-button :class="{'sel':currentKeytime===index,'btns':true}" type="primary" round size="mini"
                               v-for="(items,index) in btnItems" :key="index" @click="setTime(items,index)">
                        {{items.name}}
                    </el-button>
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
</template>

<script>
    import EsspMcCardSci from '@/components/sciAndTechPolicy/EsspMcCardSci';
    import Moment from "moment";

    export default {
        name: 'EsspMainCenterInfo',
        props: {
            temeTitle: {
                type: String,
                default: ''
            },
            satpType: {
                type: String,
                default: ''
            },
            classtType: {
                type: String,
                default: ''
            }
        },
        components: {
            EsspMcCardSci
        },
        data() {
            return {
                msg: "科技政策",
                parkId: sessionStorage.getItem("parkId") || "",

                currentKeytime: "",//默认不选择时间区间
                currentKeyname: "",//默认不选择关键字
                currentTime: [],//默认不选择时间
                tagItems: [],
                btnItems: [
                    {name: "今天", code: "today"},
                    {name: "昨天", code: "yestoday"},
                    {name: "最近一周", code: "week"},
                    {name: "最近一个月", code: "month"}
                ],

                // 分页
                pageRanges: [5, 10, 20, 50, 100],//默认每页10条数区间
                pageNum: 1,//当前页码
                pageSize: 10,//每页条数
                allTotal: 0,//总条数
                startDate: "",//起始时间
                endDate: "",//结束时间
                title: "",//搜索关键词
                times: '',
                tagTxt: "",//通过标签搜索

                // 列表数据
                mcCardDataList: []
            }
        },
        created() {
            // this.getSciAndTechPolicy();
            // this.getListInfoTags();
            this.getSciAndTechPolicy();
        },
        methods: {
            //聚焦右侧搜索栏的清空
            clearCurrentKeyname() {
                this.currentKeyname = '';
            },
            timeChangeList() {
                this.startDate = this.currentTime[0];
                this.endDate = this.currentTime[1];
                this.currentKeytime = "";
                this.getSciAndTechPolicy();
            },
            setKeyName(item, index) {
                this.currentKeyname = index;
                this.tagTxt = item.tagTxt;
                this.getSciAndTechPolicy()
            },
            setTime(item, index) {
                this.currentKeytime = index;
                const date = new Date();
                var code = item.code;
                if (code == "today") {
                    this.startDate = Moment().format("YYYY-MM-DD");
                    this.endDate = Moment().format("YYYY-MM-DD");
                }
                if (code == "yestoday") {
                    this.startDate = Moment().subtract(1, "days").format("YYYY-MM-DD");
                    this.endDate = Moment().subtract(1, "days").format("YYYY-MM-DD");
                }
                if (code == "week") {
                    this.startDate = Moment().subtract(1, "weeks").format("YYYY-MM-DD");
                    this.endDate = Moment().format("YYYY-MM-DD");
                }
                if (code == "month") {
                    this.startDate = Moment().subtract(1, "months").format("YYYY-MM-DD");
                    this.endDate = Moment().format("YYYY-MM-DD");
                }
                this.currentTime = [this.startDate, this.endDate];
                this.getSciAndTechPolicy();
            },
            //获取列表的标签
            getListInfoTags() {
                var url = this.$apiUrl.parkInfo.getListTags;
                var parkId = sessionStorage.getItem("parkId") || "";
                var _this = this;
                this.$post(url, {
                    tagTp: "3000003",
                    parkId: parkId
                })
                    .then(response => {
                        var codestatus = response.resultCode;
                        if (codestatus == "CLT000000000") {
                            var data = response.resultData;
                            _this.tagItems = data;
                        } else {
                            this.$message.info(response.resultMsg);
                        }
                    }, err => {
                        this.$message.error("接口异常");
                    })
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.getSciAndTechPolicy();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getSciAndTechPolicy();
            },
            //点击右侧搜索栏的特殊处理
            getDataByKeyWord() {
                this.currentKeyname = '';
                this.getSciAndTechPolicy();
            },

            /**
             * 获取“科技政策”的数据
             */
            getSciAndTechPolicy() {
                let params = {
                    parkId: this.parkId,            // 园区ID
                    pageNum: this.pageNum,          // 页码
                    pageSize: this.pageSize,        // 每页显示数量
                    startDate: this.startDate,      // 信息发布时间---开始时间
                    endDate: this.endDate,          // 信息发布时间---结束时间
                    title: '',                       // 标题,
                    type: this.satpType,            // 政策01，或科技服务02
                    classtType: this.classtType     // 科技服务才会有这个字段---
                };

                // “政策法规”不需要“classtType”这个字段
                if (this.satpType === '01') {
                    delete params.classtType;
                }

                this.$post("/policy/getAllPolicy", params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        let resultData = response.resultData;
                        this.allTotal = resultData.total;
                        this.mcCardDataList = resultData.policyList;
                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            }
        },
    }
</script>

<style>

    .aside-right-item-seach .el-input--suffix {
        width: 80%;
        margin-left: 10%;
    }

    .aside-right-item-seach .el-input__suffix {
        top: -4px;
    }

    .aside-right-item-seach .el-input--suffix input {
        border-radius: 20px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        height: 30px;
        background: #f8f8f8;
        border: 0px solid #000;
        font-size: 12px;
    }

    .aside-r-sea1 .el-icon-date {
        display: none;
    }

    .aside-r-sea1 .el-range__close-icon {
        display: none;
    }

    .aside-r-sea1 .el-date-editor {
        height: 30px;
        line-height: 30px;
        width: 100%;
    }

    .aside-r-sea1 .el-date-editor .el-range-input {
        width: 43%;
        font-size: 12px;
        height: 28px;
        line-height: 28px;
    }

    .aside-r-sea1 .el-range-editor .el-range-separator {
        line-height: 24px;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .essp-main-cont {
        /*本应是770px像素，实际有4个像素的偏差*/
        .cont-launch-new-act {
            height: 68px;
            line-height: 68px;
        }
    }

    .pageList {
        float: left;
        padding-top: 40px;
        padding-right: 24px;
        padding-bottom: 50px;
        width: 746px;
        background: #fff;
        text-align: right;
    }

    .essp-aside-right-cont {
        float: right;
        width: 218px;
        background: #fff;
        padding: 20px 0;
        .aside-right-item1 {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
        }
        .aside-r-sea1 {
            width: 190px;
            margin: 0 auto;
            input {
                height: 30px;
                line-height: 30px;
                background-color: #f8f8f8;
                color: #ccc;
            }

            .el-range-editor.el-input__inner {
                width: 100%;
            }
            .el-input__icon {
                line-height: 30px;
            }
            .el-date-editor.el-input {

                width: 100%;
            }
        }
        .keyname {
            /*padding: 0 20px;*/
            margin-top: 25px;
            .btns {
                margin-left: 14px;
                margin-bottom: 20px;
            }
            .el-button--mini,
            .el-button--mini.is-round {
                padding: 5px 10px;
            }
            .el-button--primary {
                background-color: #ccc;
                border-color: #ccc;

            }
            .sel {
                //傻逼的ui
                background-color: #409EFF;
                border-color: #409EFF;
            }
        }
    }
</style>
