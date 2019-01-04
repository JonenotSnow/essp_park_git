<template>
    <div class="promotionInvest_wrap">
        <!-- 招商报备 -->
        <!-- 简介区域 -->
        <div class="promotionInvest_inner">
            <div class="esspclearfix titcon">
                <h2><span>项目登记</span></h2>
                <el-button type="text" class="gobackBtn" @click="linkTo">返回</el-button>
            </div>
            <!-- 具体的报备表主体部分 -->
            <div class="tabmain">
                <el-form :model="form" label-width="80px" ref="form" class="formul esspclearfix" :rules="rules">
                    <div class="tabmain_title">
                        <h4>基本信息:</h4>
                    </div>
                    <el-form-item class="elitem" label="项目名称" prop="atractInvestTitle">
                        <el-input v-model.trim="form.atractInvestTitle" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="重要程度" prop="importantLevel">
                        <el-select v-model="form.importantLevel" placeholder="请选择项目重要程度">
                            <el-option v-for="(it,index) in importantLevelList" :key="index" :label="it.context"
                                       :value="it.tureval"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="elitem" label="项目经理">
                        <el-input v-model="form.projectManager"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="首访日期" prop="visitDate">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                        v-model="form.visitDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item class="elitem" label="项目来源">
                        <el-select v-model="form.investSource" placeholder="请选择项目来源">
                            <el-option v-for="(it,index) in investSourceList" :key="index" :label="it.context"
                                       :value="it.tureval"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="elitem" label="推荐人" prop="referrer">
                        <el-input v-model.trim="form.referrer" placeholder="请输入推荐人"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="空间需求">
                        <el-input-number v-model="form.spaceSize" controls-position="right" @change="handleChange"
                                         :min="1"
                                         ></el-input-number>
                        m²
                    </el-form-item>
                    <el-form-item class="elitem" label="入驻方式">
                        <el-radio-group v-model="form.investMethod">
                            <el-radio :label="it.tureval" v-for="(it,index) in investMethodList" :key="index">
                                {{it.context}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="elitem" label="成交概率">
                        <el-select v-model="form.dealPercent" placeholder="请选择">
                            <el-option :label="it.context" :value="it.tureval" v-for="(it,index) in dealPercentList"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="elitem" label="备注" prop="investComment">
                        <el-input type="textarea" :rows="2" placeholder="请输入备注内容"
                                  v-model.trim="form.investComment">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="需要帮助" class="fullcon">
                        <el-checkbox-group v-model="form.needHelp">
                            <el-checkbox v-for="(it,index) in needHelpList" :key="index" :label="it.tureval"
                                         name="needhelp">{{it.context}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div class="tabmain_title">
                        <h4>客户联系人:</h4>
                    </div>
                    <el-form-item class="elitem" label="姓名" prop="customName">
                        <el-input v-model.trim="form.customName" placeholder="请输入客户名字"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="职位" prop="customPosition">
                        <el-input v-model.trim="form.customPosition" placeholder="请输入客户职位"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="手机" prop="customMobile">
                        <el-input v-model="form.customMobile" placeholder="请输入客户手机号码"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="电话" prop="customPhone">
                        <el-input v-model.trim="form.customPhone" placeholder="请输入客户电话/座机号码"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="邮箱" prop="customEmail">
                        <el-input v-model="form.customEmail" placeholder="请输入客户邮箱地址"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="QQ" prop="customQq">
                        <el-input v-model.trim="form.customQq" placeholder="请输入客户常用qq"></el-input>
                    </el-form-item>
                    <el-form-item class="elitem" label="微信" prop="customWechat">
                        <el-input v-model.trim="form.customWechat" placeholder="请输入客户微信"></el-input>
                    </el-form-item>
                    <el-form-item class="fullcon" label="招商简介" prop="atractInvestContent">
                        <el-input type="textarea" v-model.trim="form.atractInvestContent" placeholder="请输入招商简介"></el-input>
                    </el-form-item>
                    <el-form-item class="fullcon">
                        <el-button type="primary" @click="submitForm('form')">提交</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import Moment from 'moment';
    export default {
        data() {
            return {
                msg: "招商报备",
                orderId: "", //招商编号
                needHelpList: [
                    {context: "项目申报", tureval: "1"},
                    {context: "政策咨询", tureval: "2"},
                    {context: "天使投资", tureval: "3"},
                    {context: "贷款", tureval: "4"},
                    {context: "融资", tureval: "5"},
                    {context: "场地", tureval: "6"},
                    {context: "项目包装", tureval: "7"},
                    {context: "上市辅导", tureval: "8"},
                    {context: "创业辅导", tureval: "9"},
                    {context: "咨询培训", tureval: "10"},
                    {context: "技术支撑", tureval: "11"},
                    {context: "人才招聘", tureval: "12"},
                    {context: "注册/变更", tureval: "13"},
                    {context: "财税代理", tureval: "14"},
                    {context: "专利代理", tureval: "15"},
                    {context: "注册/变更", tureval: "16"},
                    {context: "财税代理", tureval: "17"},
                    {context: "专利代理", tureval: "18"}
                ],
                investMethodList: [
                    {context: "租赁", tureval: "1"},
                    {context: "挂靠", tureval: "2"},
                    {context: "孵化", tureval: "3"},
                    {context: "销售", tureval: "4"}
                ],
                // 项目来源
                investSourceList: [
                    {context: "中介推荐", tureval: "1"},
                    {context: "同事推荐", tureval: "2"},
                    {context: "网站宣传", tureval: "3"},
                    {context: "招商活动", tureval: "4"},
                    {context: "领导推荐", tureval: "5"}
                ],
                // 重要程度
                importantLevelList: [
                    {context: "一般项目", tureval: "1"},
                    {context: "重点项目", tureval: "2"},
                    {context: "特殊项目", tureval: "3"}
                ],
                dealPercentList: [
                    {context: "100%", tureval: "1"},
                    {context: "80%", tureval: "2"},
                    {context: "60%", tureval: "3"},
                    {context: "40%", tureval: "4"},
                    {context: "20%", tureval: "5"},
                    {context: "0", tureval: "6"}
                ],
                form: {
                    atractInvestTitle: "", //项目名称
                    importantLevel: "1", //重要程度
                    //【勿动】: 与后台小杰约定 prm 是 前端的显示文案，传后台id，后端通过id处理文案
                    projectManager: JSON.parse(sessionStorage.getItem("ctData")).userInfo.truename || "", //项目经理
                    projectManagerId: JSON.parse(sessionStorage.getItem("ctData")).userInfo.id || "",
                    visitDate: Moment(new Date()).format("YYYY-MM-DD"), //首访日期
                    investSource: "1", //项目来源
                    referrer: "", //推荐人
                    spaceSize: "", //空间需求
                    investMethod: "1", //入驻方式
                    dealPercent: "1", //成交概率
                    needHelp: [], //需要帮助
                    investComment: "", //备注
                    customName: "", //姓名
                    customPosition: "", //职位
                    customMobile: "", //手机
                    customPhone: "", //电话
                    customEmail: "", //邮箱
                    customQq: "", //qq
                    customWechat: "", //微信
                    atractInvestContent: "", //商机内容
                    attachment: "", //附件
                    parkId: "" //园区ID
                },
                rules: {
                    investComment:[//备注
                         {max: 50, message: '最多限定输入50个字', trigger: 'blur'}
                    ],
                    referrer:[//推荐人
                         {max: 30, message: '最多限定输入30个字', trigger: 'blur'}
                    ],
                    customPhone:[//电话
                         {max: 30, message: '最多限定输入30个字', trigger: 'blur'}
                    ],
                    customQq:[//qq
                         {max: 30, message: '最多限定输入30个字', trigger: 'blur'}
                    ],
                    customPosition:[//职位
                         {max: 30, message: '最多限定输入30个字', trigger: 'blur'}
                    ],
                    customWechat:[//微信
                         {max: 30, message: '最多限定输入30个字', trigger: 'blur'}
                    ],
                    atractInvestTitle:[//商机标题
                        {required: true, message: "请输入项目名称", trigger: "blur"},
                        {max: 50, message: '最多限定输入50个字', trigger: 'blur'}
                    ],
                    customName:[//客户名字
                        {required: true, message: "请输入名字", trigger: "blur"},
                        {max: 30, message: '最多限定输入30个字', trigger: 'blur'}
                    ],
                    customMobile:[//客户号码
                        {required: true, message: "请输入手机号", trigger: "blur"},
                        {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码',trigger: "blur" }
                    ],
                    customEmail:[//客户邮箱
                        {required: true, message: "请输入邮箱地址", trigger: "blur"},
                        {type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"]}
                    ],
                    visitDate:[//首访日
                        {required: true, message: "请输入首访时间", trigger: "blur"}
                    ],
                    atractInvestContent:[//招商简介
                        {required: true, message: "请输入招商简介", trigger: "blur"},
                        {max: 200, message: '最多限定输入200个字', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            handleChange(value) {
                // console.log(value);
            },
            linkTo() {
                var url = "/parkHall/manage/myInvestment/reserveInvestment";
                this.$router.push(url);
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.addInvest();
                    } else {
                        this.$message.warning("提交失败,请重新编辑")
                        return false;
                    }
                });
             
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            addInvest() {
                var api = this.$apiUrl.investment.addInvest;
                var pop = {
                    id: this.orderId, //招商编号
                    atractInvestTitle: this.form.atractInvestTitle, //商机名称
                    atractInvestContent: this.form.atractInvestContent, //商机内容
                    parkId: sessionStorage.getItem("parkId"), //园区id
                    importantLevel: this.form.importantLevel, //重要程度
                    projectManager: this.form.projectManagerId, //项目经理
                    investSource: this.form.investSource, //来源
                    referrer: this.form.referrer, //推荐人
                    spaceSize: this.form.spaceSize, //空间需求
                    investMethod: this.form.investMethod, //入驻方式
                    needHelp: this.form.needHelp.join(), //需要帮助
                    visitDate: this.form.visitDate, // 首访日期
                    investComment: this.form.investComment, //备注
                    dealPercent: this.form.dealPercent, //成交概率
                    attachment: this.form.attachment, //附件
                    customName: this.form.customName, //名称
                    customPosition: this.form.customPosition, // 职位
                    customMobile: this.form.customMobile, //手机
                    customPhone: this.form.customPhone, //电话
                    customEmail: this.form.customEmail, //邮箱
                    customQq: this.form.customQq, //qq
                    customWechat: this.form.customWechat //微信
                };
                this.$post(api, pop).then(
                    response => {
                        this.$message.success("发布成功");
                        this.linkTo();
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            }
        }
    };
</script>

<style lang='less' scoped>
    @import "../../../../assets/css/mixin";

    .tabmain_title {
        padding: 20px 0 30px;
        font-size: 18px;
        h4 {
            font-weight: normal;
        }
        span {
            position: relative;
        }
        span:after {
            position: absolute;
            content: "";
            right: -7px;
            top: 0;
            width: 3px;
            height: 100%;
            background: #888;
        }
    }

    .promotionInvest_wrap {
        padding: 20px;
        background: #f5f5f5;
        .promotionInvest_inner {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
        }
    }

    .titcon {
        position: relative;
        margin-bottom: 10px;
        padding: 5px;
        line-height: 30px;
        h2 {
            font-size: 24px;
            text-align: center;
            span {
                position: relative;

            }
            span:before, span:after {
                position: absolute;
                content: "";
                top: 16px;
                height: 2px;
                width: 150px;
                background: #ccc;
            }
            span:before {
                left: -170px;
            }
            span:after {
                right: -170px;
            }
        }
        .gobackBtn {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 16px;
            text-align: center;
        }
    }

    //具体的报备表主体部分
    .tabmain {
        margin-bottom: 10px;
        .formul .elitem {
            float: left;
            width: 50%;
        }
        .formul .fullcon {
            width: 100%;
            float: left;
        }
    }
</style>
