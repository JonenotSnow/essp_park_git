<template>
    <div class="publish-sciAnd-tech-policy-wrap" id="needManageDetail">
        <essp-bread-crumb :breadList="breadlist"/>
     
        <div class="publish-title">
            <i></i>非公开需求<i></i>
        </div>
        <div class="publist-form">
            <el-form  label-width="125px" class="demo-ruleForm">
                <el-form-item label="需求标题：" prop="title">
                    <div class="my-style">{{data.title}}</div>
                </el-form-item>
                <el-form-item label="发布人姓名：" prop="createName">
                    <div class="my-style">{{data.createName}}</div>
                </el-form-item>
                <el-form-item label="公司名称：" prop="cstName">
                    <div class="my-style">
                        <div v-html="data.cstName"></div>
                    </div>
                </el-form-item>
                <el-form-item label="发布时间：" prop="createTime">
                    <div class="my-style">{{data.createTime | timerFormat(data.createTime) }}</div>
                </el-form-item>
                <el-form-item label="需求详情：">
                    <div class="ql-container ql-snow my-style bord-none">
                    <div class="ql-editor" v-html="data.detail"></div>
                    </div>
                </el-form-item>
                <el-form-item label="附件：" v-if="accessory.length>0">
                    <a v-for="(it,i) in accessory" :key="i" :href="it.url" :download="it.name">{{it.name}}</a>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";
    export default {
        components: {
            EsspBreadCrumb
        },
        data() {
            return {
                parkId: sessionStorage.getItem("parkId") || "",
                id: this.$route.query.id || "",
                breadlist: [
                    {
                        path: "/parkHall/manage/baseInfo",
                        name: "系统管理"
                    },
                    {
                        path: "/parkHall/manage/needManage?id=1",
                        name: "需求管理"
                    },
                    {
                        path: "/parkHall/manage/needManage?id=1",
                        name: "非公开需求"
                    },
                    {
                        path: "",
                        name: "非公开需求详情"
                    }
                ],
                data:{},
                accessory:[]
            }
        },
        created() {
            this.getNeedByKey();
        },
        methods: {
            getNeedByKey() {
                let params = {
                    id: this.id
                };
                this.$post(this.$apiUrl.manageNeed.getNeedByKey, params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus ==  "CLT000000000" || codestatus == "0000000000") {
                        this.data = response.resultData;
                        console.log(typeof(this.data.accessory));
                        if (this.data.accessory !== null) {
                            this.accessory = JSON.parse(this.data.accessory);
                        }
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

<style lang='less' scoped>
    #needManageDetail {
        width: 1200px;
        background: #fff;
        margin: 0 auto 20px;
        .publish-title {
            margin-top: 66px;
            margin-bottom: 95px;
            font-size: 24px;
            color: #333333;
            text-align: center;
            i {
                display: inline-block;
                width: 70px;
                border: 1px solid #ddd;
                position: relative;
                top: -6px;
                &:nth-of-type(1){
                    left:-17px;
                }
                &:nth-of-type(2){
                    right:-17px;
                }
            }
        }
        .publist-form {
            .demo-ruleForm {
                padding: 0 125px 88px;
            }
            .demo-ruleForm-Next {
                padding-bottom: 60px;
            }
            .my-style {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.1px;
                color: #999;
                .my-tag {
                    margin-right: 20px;
                    padding: 7px 16px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #fff;
                    border-radius: 3px;
                    background-color: #cccccc;
                }
            }
            .audit-line {
                margin-bottom: 20px;
                border-bottom: 1px solid #ccc;
            }
            .audit-opinion {
                padding: 0px 15px;
                width: 570px;
                height: 180px;
                border-radius: 3px;
                border: solid 1px #00a0e9;
                background-color: #ffffff;
            }
        }
    }
</style>