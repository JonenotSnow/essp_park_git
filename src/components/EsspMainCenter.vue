<template>
    <div class="essp-main-cont">
        <essp-mc-card :mcCardList="mcCardDataList" :lodingMsg="loadMsg" :chilrPageType="pageType"></essp-mc-card>
        <div class="essp-aside-right-cont">
            <div class="aside-right-item aside-right-item-seach">
                <div>
                    <el-input
                        placeholder="请输入标签关键字"
                        v-model="tagTxt" @change="clearCurrentKeyname">
                        <i slot="suffix" class="el-input__icon el-icon-search"  @click="getActListSource" ></i>
                    </el-input>
                </div>
                <div class="keyname">
                    <!-- 只展示前5热门标签 -->
                    <el-button :class="{'sel':currentKeyname===index,'btns':true}" type="primary" round  size="mini"
                    v-for="(items,index) in tagItems" :key="index" @click="setKeyName(items,index)" v-if="index<5">{{items.tagTxt}} ( {{items.tagCount}} )</el-button>
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
                    <el-button
                        type="primary"
                        round
                        size="mini"
                        :class="{'sel':currentKeytime===index,'btns':true}"
		                v-for="(items,index) in btnItems"
                        :key="index"
                        @click="setTime(items,index)"
                    >
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
    // pageType 1. 活动全部 2.我报名的活动 ……
    import EsspMcCard from '@/components/EsspMcCard';
    // 引入获取列表的公共的js
    import { active } from '@/fetch/api/active/active';
    import Moment from "moment";

    export default {
        name: 'EsspMainCenter',
        props: ['pageType'],
        components: {
            EsspMcCard
        },
        data() {
            return {
                currentKeytime:-1,
                currentKeyname:"",//默认不选择关键字
                currentTime:[],//默认不选择时间
                tagItems:[],
                msg: "全部活动",
                loadMsg:"数据加载中~",
                currentPage4:5,
                pageRanges:[5,10,20,50,100],//默认每页10条数区间
                input2: '',
                input3: '',
                active: 0,
                dataTime: '',
                pageNum:1,     // 当前页数
                allTotal: 1,    // 总条数
                pageSize: 10,   // 每一页条数
                startDate:"",   // 开始时间
                endDate: '',    // 结束时间
                title:'',       // 当前搜索关键字
                tagTxt:"",//通过标签搜索
                mcCardDataList:[],
                btnItems:[
                    {name:"今天",code:"today"},
                    {name:"昨天",code:"yestoday"},
                    {name:"最近一周",code:"week"},
                    {name:"最近一个月",code:"month"}
                ],
            }
        },
        created(){
            this.pageNum = 1;
            this.getActListSource();
            this.getListInfoTags();
        },
        methods: {
            //聚焦右侧搜索栏的清空
            clearCurrentKeyname(){
                this.currentKeyname = '';
            },
            timeChangeList(){
                this.startDate = this.currentTime[0];
                this.endDate = this.currentTime[1];
                this.currentKeytime = "";
                this.getActListSource();
            },
            //获取列表的标签
            getListInfoTags() {
                var url = this.$apiUrl.parkInfo.getListTags;
                var parkId =  sessionStorage.getItem("parkId") || "";
                var _this = this;
                this.$post(url,{
                    tagTp:"3000002",
                    parkId: parkId
                })
                .then(response => {
                    // var codestatus = response.resultCode;
                    // if(codestatus=="CLT000000000" || codestatus=="0000000000"){
                        var data = response.resultData;
                        _this.tagItems= data;

                    // }else{
                    //     this.$message.error(response.resultMsg);
                    // }
                },err =>{
                    this.$message.error(err.resultMsg);
                })
            },
            setKeyName(item,index){
                this.pageNum = 1;
                this.currentKeyname = index;
                this.tagTxt =item.tagTxt;
                this.getActListSource();
            },
            setTime(item,index){
                this.pageNum = 1;
                this.currentKeytime =index;
                const date = new Date();
                var code = item.code;
                if(code=="today"){
                    this.startDate=Moment().format("YYYY-MM-DD");
                    this.endDate=Moment().format("YYYY-MM-DD");
                }
                if(code=="yestoday"){
                    this.startDate=Moment().subtract(1, "days").format("YYYY-MM-DD");
                    this.endDate = Moment().subtract(1, "days").format("YYYY-MM-DD");
                }
                if(code=="week"){
                   this.startDate=Moment().subtract(7, "days").format("YYYY-MM-DD");
                   this.endDate = Moment().format("YYYY-MM-DD");
                }
                if(code=="month"){
                    this.startDate=Moment().subtract(1, "month").format("YYYY-MM-DD");
                    this.endDate = Moment().format("YYYY-MM-DD");
                }
                this.currentTime = [this.startDate,this.endDate];
                this.getActListSource();
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.getActListSource();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.getActListSource();
            },
            getMillisecond(vaule){
                // 获取秒数
                return Moment(vaule).unix();
            },
            statusCn(value) {
                //当前用户报名状态 01报名待审核 02审核通过 03审核拒绝 10报名审核中
                var mapStatus = {
                    "01":"报名待审核",
                    "02":"报名成功",
                    "03":"报名失败",
                    "10":"报名审核中"
                }
                return mapStatus[value] || "报名待审核"

            },
            getStatusBtn(item,btnType){
                var status = this.pageType;   // 返回的类型
                // btnType
                // 1. 当前时间<报名开始时间
                // 2. 报名开始时间<=当前时间<=报名截止时间
                // 3. 当前时间>活动截止时间
                switch (status){
                    case "actAll"://全部活动
                        var arr = [];
                        if(btnType === 1) {
                            arr = [{
                                name: '预告中',
                                type: 2,
                                clicked: false,
                                show: true
                            }]
                        }
                        if(btnType ===2) {
                            arr = [{
                                name: '立即报名',
                                type: 1,
                                clicked: true,
                                show: true
                            }]
                        }

                        if(btnType === 3) {
                            arr = [{
                                name: '已结束',
                                type: 2,
                                clicked: false,
                                show: true
                            }]
                        }
                        this.itemBtnSet(item,arr);
                        break;
                    case "actFollow"://
                        this.itemBtnSet(item,[
                            {
                                name: '取消关注',
                                type: 3,
                                clicked: true,
                                show: true
                            }
                        ])
                        break;
                    case "actEnroll"://我报名的活动
                        var name = this.statusCn(item.currEnrolStatus);
                        this.itemBtnSet(item,[
                            {
                                name: name,
                                type: 2,//没有特殊操作，只是做反显
                                clicked: false,
                                show: true
                            }
                        ])
                }

            },
            itemSet(item,val){
                if(!item.timeStatus) {
                    this.$set(item,"timeStatus",val);
                }  else {
                    item.timeStatus = val;
                }
            },
            itemBtnSet(item,val){
                if(!item.btn) {
                    this.$set(item,"btn",val);
                }  else {
                    item.btn = val;
                }
            },
            getActListSource() {
                var url = active[this.pageType]||"";
                var parkId =  sessionStorage.getItem("parkId") || "";
                this.mcCardDataList = [];
                this.loadMsg = "数据加载中~"
                this.$post(url,{
                    parkId: parkId,
                    pageNum : this.pageNum,
                    pageSize: this.pageSize,
                    timeStart:this.startDate,
                    timeEnd: this.endDate,
                    title: this.title,
                    activityLabel:this.tagTxt,//根据标签搜索
                })
                .then((response) => {
                    // if(response.resultCode == "CLT000000000" || response.resultCode == "0000000000"){
                        var arr = response.resultData.activityList;
                        arr.forEach((item,index)=>{
                            var activityStarttime = this.getMillisecond(item.activityStarttime);  // 活动开始时间
                            var enterEndtime = this.getMillisecond(item.enterEndtime);           // 活动报名截止时间
                            var enterStarttime = this.getMillisecond(item.enterStarttime);      // 活动报名开始时间
                            var thisTime = this.getMillisecond(new Date());                      // 当前时间
                            // 如果 1. 当前时间<报名开始时间  2. 报名开始时间<=当前时间<=报名截止时间
                            // 3. 当前时间>活动截止时间
                            var btnTyp = 0;
                            if(thisTime < enterStarttime) {
                                this.itemSet(item,1);  // 设置属性兼容处理
                                btnTyp = 1;
                            }
                            if(thisTime >= enterStarttime && thisTime <= enterEndtime) {
                                this.itemSet(item,2);  // 设置属性兼容处理
                                btnTyp = 2;
                            }
                            if(thisTime > enterEndtime) {
                                this.itemSet(item,3);  // 设置属性兼容处理
                                btnTyp = 3;
                            }


                            this.getStatusBtn(item,btnTyp);

                        })
                        this.mcCardDataList = arr;
                        this.allTotal = response.resultData.total;
                        this.loadMsg = "数据加载完毕！";
                    // } else {
                    //     this.$message.info(response.resultMsg);
                    // }

                }, (err) => {
                    this.loadMsg = "数据加载完毕！";
                })


            },
            removeAttention(item) {//取消关注
                if (typeof item == 'undefined'){
                    return ;
                }
                this.$post('/attention/removeAttention',{
                    activityId: item.activityId,
                    parkId: window.sessionStorage.getItem('parkId')
                }).then((response) => {
                    //onsole.log(response)
                    // if(response.resultCode == "CLT000000000" || response.resultCode == "0000000000"){
                    // }else{
                    //     this.$message.info(response.resultMsg);
                    // }
                },response=>{
                    this.$message.info(response.resultMsg);
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
    }
    .aside-r-sea1 .el-date-editor .el-range-input {
        width: 43%;
        font-size: 12px;
        height: 28px;
        line-height:28px;
    }
    .aside-r-sea1 .el-range-editor .el-range-separator {
        line-height: 24px;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .essp-main-cont {
        /*本应是770px像素，实际有4个像素的偏差*/
        .cont-launch-new-act{
            height:68px;
            line-height: 68px;
        }
    }
    .aside-r-sea1 {
        .el-range-editor.el-input__inner {
            width: 100%;
        }
    }
    .pageList {
        float: left;
        width: 707px;
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
                //傻逼的ui
                background-color: #409EFF;
                border-color: #409EFF;
            }
        }
    }
</style>
