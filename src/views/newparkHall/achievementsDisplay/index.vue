<template>
    <div class="achievements-list-wrap">
        <!-- 成果列表模版 -->
        <div class="achresult"></div>
        <div class="achmain">
            <div class="ach_title">成果展示</div>
            <div class="ach_desc">已推广使用的科研成果，持续更新中</div>
            <div class="ach_toolbar">
                <el-form :inline="true"
                         :model="formInline"
                         ref="formInline"
                         class="toolbox">
                    <el-form-item label="成果名称：" prop="name">
                        <el-input v-model.trim="formInline.name"
                                  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="所属领域：" prop="field">
                        <el-select v-model="formInline.field"
                                   placeholder="">
                            <el-option :label="item.label"
                                       :value="item.val"
                                       v-for="(item,index) in fields"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发明人：" prop="inventor">
                        <el-input v-model.trim="formInline.inventor"
                                  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位：" prop="unit">
                        <el-input v-model.trim="formInline.unit"
                                  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   class="cumbtn"
                                   @click="searchResult()">查询
                        </el-button>
                        <el-button @click="resetForm('formInline')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="ach_list">
                <div v-if="achievList.length">
                    <div class="achievement_result-item"
                         v-for="(item, index) in achievList"
                         @click="goAchDetail({item:item,opMark:'01'})"
                         :key="index">
                        <div class="result_item-img">
                            <img :src="item.photo"
                                 alt="成果图片">
                        </div>
                        <div class="result_item-info">
                            <div class="result-titlename">{{item.name || "暂无"}}</div>
                            <div class="result-des">
                                {{item.title}}
                            </div>

                            <div class="result-des__hover">
                                <p>所属领域：
                                    <span>{{item.field|formatFields(item.field)}}</span>
                                </p>
                                <p v-if="item.inventor">发明人：{{item.inventor}}</p>
                                <p>所属单位：{{item.unit}}</p>
                            </div>

                        </div>
                        <div class="readmore">
                            <span>>></span>
                        </div>
                    </div>
                </div>
                <div class="nothing"
                     v-else>
                    <img src="../../../assets/newparkimg/home/noting.png"
                         alt="">
                    <span class="tipspan">暂无成果展示</span>
                </div>
            </div>
            <div class="pageList">
                <el-pagination @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="pageNum"
                               :page-size="pageSize"
                               layout="total, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    name: "", //成果名称
                    field: "", //所属领域
                    inventor: "", //发明人
                    unit: "" //所属单位
                },
                parkId: sessionStorage.getItem("parkId") || "",
                achievList: [], //
                pageRanges: [10, 20, 30, 40], //默认每页10条数区间
                pageNum: 1, //当前页码
                pageSize: 10, //每页条数
                total: 0, //总条数

                //领域
                fields: [
                    {label: "电子信息", val: "0"},
                    {label: "生物与新医药", val: "1"},
                    {label: "新材料", val: "2"},
                    {label: "高新技术服务", val: "3"},
                    {label: "新能源与节流", val: "4"},
                    {label: "资源与环境", val: "5"},
                    {label: "现代农业", val: "6"},
                    {label: "高端装备制造", val: "7"}
                ]
            };
        },
        created() {
            this.getArcList();
        },
        computed: {},
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            searchResult() {
                this.getArcList();
            },
         
            //获取成果列表
            getArcList() {
                var url = this.$apiUrl.home.getAchievement;
                var pop = {
                    parkId: this.parkId, //园区ID
                    pageNum: this.pageNum, //页码
                    pageSize: this.pageSize, //每页显示数量
                    name: this.formInline.name, //成果名称
                    field: this.formInline.field, //领域
                    inventor: this.formInline.inventor, //发明人
                    unit: this.formInline.unit, //单位
                    userId: "" //当前用户Id（调用我发布的成果时候需要用到，当前登陆用户id）
                };
                this.$post(url, pop).then(
                    response => {
                        let res = response.resultData;
                        this.achievList = res.achievList;
                        this.total = res.total;
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            // 前往详情页面

            goAchDetail(options) {
                this.$router.push({
                    path: "/parkIndex/achievementDetail",
                    query: {id: options.item.id, opMark: options.opMark}
                });
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.getArcList();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getArcList();
            }
        },
        filters:{
            formatFields(val){
                let defaultVal = "高新技术服务"
                let mapFields={
                    "0": "电子信息",
                    "1":"生物与新医药", 
                    "2": "新材料", 
                    "3": "高新技术服务", 
                    "4": "新能源与节流", 
                    "5": "资源与环境", 
                    "6": "现代农业", 
                    "7": "高端装备制造"
                };
                return mapFields[val]||defaultVal
            }
        },
        components: {}
    };
</script>

<style lang='less' scoped>
    @import "../../../assets/css/newpark/home.common.less";
    @import "../../../assets/css/mixin";

    .achievements-list-wrap {
        .achresult {
            width: 100%;
            height: 500px;
            background: url(./img/ach_bg.jpg) no-repeat center center;
            border: solid 1px #cccccc;
        }

        .achmain {
            margin: -136px auto 0 auto;
            padding: 30px 0px 0 0;
            width: 1200px;
            background: #fff;

            .ach_title {
                text-align: center;
                .esspellipsis();
                font-size: 28px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 2.8px;
                color: #333333;
                margin-bottom: 22px;
            }

            .ach_desc {
                text-align: center;
                .esspellipsis();
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.4px;
                color: #999999;
                padding-bottom: 24px;
                border-bottom: 1px solid #ccc;
            }

            .ach_toolbar {
                margin: 0 auto 30px auto;
                padding: 24px 130px 0 130px;
                .toolbox .el-form-item {
                    margin-right: 15px;
                }
                .cumbtn {
                    background-image: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                    border-radius: 5px;
                }
            }

            .ach_list {
                padding: 0px 45px;
                .achievement_result-item {
                    overflow: hidden;
                    width: 1100px;
                    height: 200px;
                    background-color: #f5f5f5;
                    margin: 30px auto 0;
                    display: flex;
                    .result_item-img {
                        
                        padding: 10px;
                        width: 315px;
                        height: 180px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .result_item-info {
                       
                        margin-left: 30px;
                        padding: 10px;
                        text-align: left;
                        width: 622px;
                        .result-titlename {
                            margin-top: 25px;
                            height: 19px;
                            line-height: 19px;
                            font-size: 20px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #333333;
                            overflow: hidden;
                            text-overflow:ellipsis;

                        }

                        .expertlevel {
                            margin-top: 20px;
                            height: 18px;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #777;
                            overflow: hidden;
                        }

                        .result-des {
                            display: block;
                            margin-top: 42px;
                            height: 60px;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #999999;
                            overflow: hidden;
                            width: 617px;
                            text-overflow:ellipsis;
                            -webkit-line-clamp: 2;
                        }
                        .result-des__hover {
                            display: none;
                            margin-top: 50px;
                            p {
                                margin-top: 10px;
                                height: 14px;
                                line-height: 14px;
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                            }
                        }
                    }

                    .readmore {

                        margin: 70px 0;
                        width: 100px;
                        height: 90px;
                        line-height: 90px;
                        color: #ccc;
                        border-left: 1px solid #ccc;
                        span {
                            margin-left: 40px;
                            width: 17px;
                            height: 17px;
                        }
                    }

                    &:hover {
                        background-color: #00a0e9;
                        cursor: pointer;

                        .result-titlename,
                        .expertlevel,
                        .result-des {
                            color: #fff;
                        }

                        .result-des {
                            display: none;
                        }

                        .result-des__hover {
                            display: block;
                            p {
                                margin-top: 10px;
                                height: 14px;
                                line-height: 14px;
                                font-size: 14px;
                                color: #fff
                            }
                        }
                        .readmore {
                            border-left: 1px solid #fff;
                            color: #fff;
                        }
                    }
                }

                .nothing {
                    position: relative;
                    margin: 0 auto;
                    width: 500px;
                    height: 255px;
                    .tipspan {
                        position: absolute;
                        bottom: 60%;
                        left: 34%;
                        font-size: 18px;
                        color: #999;
                    }
                    img {
                        display: block;
                        outline: none;
                        width: 418px;
                        height: 316px;
                        margin: 0 auto;
                    }
                }
            }

            .pageList {
                margin: 0 auto;
                /*padding-top: 90px;*/
                /*padding-bottom: 80px;*/
                padding-top: 40px;
                padding-bottom: 33px;
                width: 1100px;
                text-align: right;
            }
        }
    }
</style>
