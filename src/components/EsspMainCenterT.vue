<template>
  <div class="essp-main-cont">
    <!-- 惠政服务的全部惠政，关注惠政的模版 -->
    <essp-mc-card-t :chilrPageType="pageType" @deleteCardList="getGoverBeneList" :mcCardList="mcCardDataList" :isLodingTxt="isLodingTxt"></essp-mc-card-t>
    <div class="essp-aside-right-cont">
      <div class="aside-right-item aside-right-item-seach">
        <div>
          <el-input placeholder="请输入标签关键字" v-model="tagTxt" @change="clearCurrentKeyname">
            <i slot="suffix" style="cursor: pointer" @click="getGoverBeneList" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="keyname">
          <!-- 只展示前5热门标签 -->
          <el-button :class="{'sel':currentKeyname===index,'btns':true}" type="primary" round size="mini" v-for="(items,index) in tagItems" :key="index" @click="setKeyName(items,index)" v-if="index<5">{{items.tagTxt}} ( {{items.tagCount}} )
          </el-button>
        </div>
      </div>
      <div class="aside-right-item aside-right-item1">
        <div class="aside-r-sea aside-r-sea1">
          <el-date-picker v-model="currentTime" type="daterange" range-separator="-" start-placeholder="开始日期" value-format="yyyy-MM-dd" end-placeholder="结束日期" @change="timeChangeList">
          </el-date-picker>
        </div>
        <div class="keyname">
          <el-button :class="{'sel':currentKeytime===index,'btns':true}" type="primary" round size="mini" v-for="(items,index) in btnItems" :key="index" @click="setTime(items,index)">{{items.name}}</el-button>
        </div>
      </div>
    </div>
    <div class="pageList">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageRanges" :page-size="pageSize" layout="total,sizes, prev, pager, next, jumper" :total="allTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import EsspMcCardT from "@/components/EsspMcCardT";
// 引入获取列表的公共的js
import { goverBene } from "@/fetch/api/goverBene/goverBene";

import Moment from "moment";

export default {
    name: "EsspMainCenter",
    components: {
        EsspMcCardT,
        Moment
    },
    props: ["pageType"],
    data() {
        return {
            msg: "全部慧政",
            pageRanges: [5, 10, 20, 50, 100], //默认每页10条数区间
            pageNum: 1, //当前页码
            pageSize: 10, //每页条数
            allTotal: 0, //总条数
            startDate: "", //起始时间
            endDate: "", //结束时间
            title: "", // 当前搜索关键字
            food: "", // 美食
            input2: "",
            input3: "",
            active: 0,
            dataTime: "",
            isLodingTxt: "数据加载中", // 默认数据加载中
            mcCardDataList: [],
            tagItems: [],
            tagTxt: "", //通过标签搜索
            btnItems: [
                { name: "今天", code: "today" },
                { name: "昨天", code: "yestoday" },
                { name: "最近一周", code: "week" },
                { name: "最近一个月", code: "month" }
            ],
            currentKeytime: "", //默认不选择时间区间
            currentKeyname: "", //默认不选择关键字
            currentTime: [] //默认不选择时间
        };
    },
    filters: {
        timerFormat(vaule) {
            return Moment(vaule).format("YYYY-MM-DD");
        }
    },
    created() {
        this.getGoverBeneList();
        this.getListGoverBeneTags();
    },
    methods: {
        //聚焦右侧搜索栏的清空
        clearCurrentKeyname() {
            this.currentKeyname = "";
        },
        timeChangeList() {
            this.startDate = this.currentTime[0];
            this.endDate = this.currentTime[1];
            this.currentKeytime = "";
            this.getGoverBeneList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getGoverBeneList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getGoverBeneList();
        },
        // 搜索关键字
        seachVal() {
            this.thisPage = 1;
            this.getGoverBeneList();
        },
        // 搜索美食
        lookFood(foodid) {
            this.food = foodid;
            this.thisPage = 1;
            this.getGoverBeneList();
        },
        statusCn(value) {
            if (value == "02") {
                return "申请成功";
            } else if (value == "01") {
                return "申请受理中";
            } else if (value == "03") {
                return "申请失败";
            } else if (value == "10") {
                return "申请受理中";
            }
        },
        getStatusBtn(item, btnType) {
            var status = this.pageType; // 返回的类型
            // btnType
            // 1. 当前时间<报名开始时间
            // 2. 报名开始时间<=当前时间<=报名截止时间
            // 3. 当前时间>活动截止时间
            switch (status) {
                case "allPolicy":
                    var arr = [];
                    if (btnType === 1) {
                        arr = [
                            {
                                name: "预告中",
                                type: 2,
                                clicked: false,
                                show: true
                            }
                        ];
                    }
                    if (btnType === 2 && this.SSH.getItem("loginFlag")) {
                        arr = [
                            {
                                name: "立即申报",
                                type: 1,
                                clicked: true,
                                show: true
                            }
                        ];
                    }

                    if (btnType === 3) {
                        arr = [
                            {
                                name: "已结束",
                                type: 2,
                                clicked: false,
                                show: true
                            }
                        ];
                    }
                    if (btnType === 4) {
                        arr = [
                            {
                                name: "发布中",
                                type: 2,
                                clicked: false,
                                show: true
                            }
                        ];
                    }
                    if (btnType === 5) {
                        arr = [
                            {
                                name: "人数已满",
                                type: 2,
                                clicked: false,
                                show: true
                            }
                        ];
                    }
                    this.itemBtnSet(item, arr);
                    break;
                case "myFollPol":
                    this.itemBtnSet(item, [
                        {
                            name: "取消关注",
                            type: 3,
                            clicked: true,
                            show: true
                        }
                    ]);
                    break;
                case "getMyApply":
                    //onsole.log(item);
                    var name = this.statusCn(item.applyStatus);
                    //onsole.log(name);
                    this.itemBtnSet(item, [
                        {
                            name: name,
                            type: 4,
                            clicked: false,
                            show: true
                        }
                    ]);
            }
        },
        itemSet(item, val) {
            if (!item.timeStatus) {
                this.$set(item, "timeStatus", val);
            } else {
                item.timeStatus = val;
            }
        },
        itemBtnSet(item, val) {
            if (!item.btn) {
                this.$set(item, "btn", val);
            } else {
                item.btn = val;
            }
        },
        getMillisecond(vaule) {
            // 获取秒数
            return Moment(vaule).unix();
        },
        getGoverBeneList() {
            var url = goverBene[this.pageType] || "";
            this.isLodingTxt = "数据加载中";
            this.mcCardDataList = []
            this.$post(url, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                startDate: this.startDate,
                endDate: this.endDate,
                tagTxt: this.tagTxt, //根据标签搜索
                parkId: sessionStorage.getItem("parkId") || ""
            }).then(response => {
                this.mcCardDataList = response.resultData.policyList;

                this.allTotal = response.resultData.total;
                this.mcCardDataList.forEach((item, index) => {
                    var thisTime = this.getMillisecond(new Date());
                    var enterEndtime = item.avaliableEndTime / 1000; // 活动报名截止时间
                    var enterStarttime = item.avaliableTime / 1000; // 活动报名开始时间
                    var btnTyp = 0;
                    if (
                        item.applyMaximum == item.approvedNum &&
                        item.isonlineApply == "1"
                    ) {
                        this.itemSet(item, 5); // 设置属性兼容处理
                        btnTyp = 5;
                    } else {
                        if (item.isonlineApply == "0") {
                            this.itemSet(item, 4); // 设置属性兼容处理
                            btnTyp = 4;
                        } else {
                            if (thisTime < enterStarttime) {
                                this.itemSet(item, 1); // 设置属性兼容处理
                                btnTyp = 1;
                            }
                            if (
                                thisTime >= enterStarttime &&
                                thisTime <= enterEndtime
                            ) {
                                this.itemSet(item, 2); // 设置属性兼容处理
                                btnTyp = 2;
                            }
                            if (thisTime > enterEndtime) {
                                this.itemSet(item, 3); // 设置属性兼容处理
                                btnTyp = 3;
                            }
                        }
                    }
                    this.getStatusBtn(item, btnTyp);
                });
                this.isLodingTxt = "数据完毕!";
            },
            response => {
                this.isLodingTxt = "数据完毕!";
                this.$message.info(response.resultMsg);
            });
        },
        getListGoverBeneTags() {
            var url = this.$apiUrl.parkInfo.getListTags;
            var parkId = sessionStorage.getItem("parkId") || "";
            var _this = this;
            this.$post(url, {
                tagTp: "3000004", //惠政标签
                parkId: parkId
            }).then(
                response => {
                    // var codestatus = response.resultCode;
                    // if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                        var data = response.resultData;
                        _this.tagItems = data;
                    // } else {
                    //     this.$message.error(response.resultMsg);
                    // }
                },
                err => {
                    this.$message.error("接口异常");
                }
            );
        },
        setKeyName(item, index) {
            this.currentKeyname = index;
            this.tagTxt = item.tagTxt;
            this.getGoverBeneList();
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
                this.startDate = Moment()
                    .subtract(1, "days")
                    .format("YYYY-MM-DD");
                this.endDate = Moment()
                    .subtract(1, "days")
                    .format("YYYY-MM-DD");
            }
            if (code == "week") {
                this.startDate = Moment()
                    .subtract(1, "weeks")
                    .format("YYYY-MM-DD");
                this.endDate = Moment().format("YYYY-MM-DD");
            }
            if (code == "month") {
                this.startDate = Moment()
                    .subtract(1, "months")
                    .format("YYYY-MM-DD");
                this.endDate = Moment().format("YYYY-MM-DD");
            }
            this.currentTime = [this.startDate, this.endDate];
            this.getGoverBeneList();
        }
    }
};
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
    width: 718px;
    background: #fff;
    text-align: right;
    padding: 65px 24px 52px;
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
    .aside-r-sea {
        width: 190px;
        margin: 0 auto;
        input {
            height: 30px;
            line-height: 30px;
            background-color: #f8f8f8;
            color: #ccc;
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
            background-color: #409eff;
            border-color: #409eff;
        }
    }
}
</style>
