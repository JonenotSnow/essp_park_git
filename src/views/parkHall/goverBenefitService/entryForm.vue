<template>
  <div class="enroll_form">
    <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
    <div class="enrollform_con">
      <div class="gover_bene_info">
        <div class="newscon">
          <div class="h2_label">{{activeDetailData.policyTitle}}</div>
          <div class="newstatus esspclearfix">
            <span class="statusitems">
              <label>发布时间：</label>
              <em>{{activeDetailData.createTime | timerFormat}} </em>
            </span>
            <span class="statusitems">
              <label>发布机构：</label>
              <em>{{activeDetailData.cstNm || '暂无机构'}}</em>
            </span>
            <span class="statusitems" v-if="activeDetailData.isonlineApply == 1">
              <label>已申报人数：</label>
              <em>{{(activeDetailData.approvedNum) || '0'}}</em>
            </span>
          </div>
          <div class="tagscon" v-show="tags.length>0">
            <div class="tags_con" style="text-align: center">
              <!--<span class="taglables">标签</span>-->
              <el-tag class="tagitem" v-for="(it, tagIndex) in tags" v-if="tagIndex<3" :key="tagIndex" size="mini">
                {{it}}
              </el-tag>
            </div>
          </div>
          <div class="newsbtncon">
            <!--<el-button type="primary" size="mini" round>立即申请</el-button>-->
            <div class="btncon" style="padding-top: 50px">
              <!--{{followStatus == 0 ? "立即申请" : "取消申请"}}-->
              <!--<el-button type="primary" size="mini" round>立即申请</el-button>-->
              <el-button type="primary" size="mini" round class="focus-btn" @click="showDialog()">
                <i class="iconfont icon-font-size" :class="followStatus == 0 ? 'icon-aixin-xianxing':'icon-collect2'"></i>{{followStatus == 0 ? "关注" : "已关注"}}
              </el-button>

            </div>
          </div>

          <!--惠政详情内容开始-->
          <!--<div class="newscontain" style="padding: 20px 30px;" v-html="activeDetailData.infoDetail"></div>-->
          <!--惠政详情内容结束-->

        </div>
      </div>

      <!--个人信息-->
      <div class="personal" v-if="enrollType != '1'">
        <div class="common_titwrap esspclearfix">
          <div>
            <h3 class="common_titdes">填写报名信息</h3>
          </div>
        </div>
        <div class="txform" v-if="enrollType != '1'">
          <div class="item_wrap esspclearfix">
            <div class="item">
              <div class="floats">
                <span>*</span>联系人姓名：</div>
              <div class="floats">
                <el-input v-model="inputName" placeholder="请输入姓名"></el-input>
              </div>
            </div>
            <div class="item">
              <div class="floats">
                <span>*</span>联系人手机：</div>
              <div class="floats">
                <el-input v-model="inputTel" type="number" placeholder="请输入手机号"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="txform" v-if="enrollType != '1'">
          <div class="item_wrap esspclearfix">
            <div class="item">
              <el-radio v-model="bookstyle" label="1">在网页中填写</el-radio>
              <el-radio v-model="bookstyle" label="2">报名表批量导入</el-radio>
            </div>
            <div class="item text_align_r">
              <span>友情提醒：当报名人数>5人时，建议批量导入</span>
            </div>
          </div>
        </div>
        <div class="enroll_margin" style="width: 1200px;margin: 0 auto;">
          <div class="tablemain" v-show="bookstyle == '1'">
            <!-- 报名表界面 -->
            <div v-for="(item,index) in nrollFormList" :key="index">
              <div class="tablemain_item">
                <div class="tabletit esspclearfix">
                  <p class="text_align_c" style="width: 90%;">报名人{{index + 1}}</p>
                  <p class="text_align_c" v-show="!item.isShow" style="width: 10%;">
                    <el-button round size="mini" @click="item.isShow = !item.isShow">查看详情
                    </el-button>
                  </p>
                  <span class="close" @click="deleteItem(index)">
                    <i class="el-icon-close"></i>
                  </span>
                </div>
                <div class="tabmain" v-show="item.isShow">
                  <div class="itemdiv" v-for="(formListItem, formListIndex) in item.formRqList" :key="formListIndex">
                    <label for="">
                      <em class="importanticon" v-if="formListItem.requir">*</em>{{formListItem.name + '：'}}
                    </label>
                    <!--输入框-->
                    <input v-if="formListItem.type=='text'" type="text" :placeholder="'请输入'+formListItem.name" v-model="formListItem.tittext">
                    <!--文本框-->
                    <el-input type="textarea" v-if="formListItem.type=='textarea'" :rows="2" :placeholder="'请输入'+formListItem.name" v-model="formListItem.tittext"></el-input>
                    <!--单选框-->
                    <el-select v-if="formListItem.type=='radio'" v-model="formListItem.tittext" clearable placeholder="请选择">
                      <el-option v-for="(item,index) in formListItem.childrens" :key="item.value" :label="index" :value="item.name">
                      </el-option>
                    </el-select>
                    <!--复选框-->
                    <el-select multiple collapse-tags v-if="formListItem.type=='checkbox'" v-model="formListItem.tittext" clearable placeholder="请选择">
                      <el-option v-for="(item,index) in formListItem.childrens" :key="item.value" :label="index" :value="item.name">
                      </el-option>
                    </el-select>
                    <!--日期模版-->
                    <el-date-picker v-if="formListItem.type=='dataTime'" v-model="formListItem.tittext" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    <!--数字模版-->
                    <el-input v-if="formListItem.type=='number'" v-model="formListItem.tittext" type="number" auto-complete="off" class="cpm"></el-input>
                  </div>
                  <div class="itemdiv">
                    <el-button round class="tablebtn" size="mini" @click="item.isShow = !item.isShow ">收起
                    </el-button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div v-show="bookstyle == '2'" class="batchimport">
            <!-- 批量导入 -->
            <div class="batchbtn esspclearfix">
              <el-button size="small" type="primary" class="downloadbtn">
                <a class="down_a" :href="activeDetailData.enrolTemplateUrl">下载模板</a>
              </el-button>
              <el-upload class="uploadbtn upload-demo" action="#" :before-upload="beforeup">
                <el-button size="small" slot="trigger" type="primary">选择文件</el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <!--公司信息-->
      <div class="company" v-if="enrollType == '1'">
        <div class="common_titwrap esspclearfix">
          <div>
            <h3 class="common_titdes">填写报名信息</h3>
          </div>
        </div>
        <div class="tablemain">
          <div class="tabmain" style="padding-bottom: 30px;">
            <div class="itemdiv" v-for="(item,index) in formRqList" :key="index">
              <label for="">
                <em class="importanticon" v-if="item.requir">*</em>{{item.name}}</label>
              <input v-if="item.type=='text'" type="text" :placeholder="'请输入'+item.name" v-model="item.tittext">
              <!--文本框-->
              <el-input type="textarea" v-if="item.type=='textarea'" :rows="2" :placeholder="'请输入'+item.name" v-model="item.tittext"></el-input>
              <!--单选框-->
              <el-select v-if="item.type=='radio'" v-model="item.tittext" clearable placeholder="请选择">
                <el-option v-for="(item,index) in item.childrens" :key="item.value" :label="index" :value="item.name">
                </el-option>
              </el-select>
              <!--复选框-->
              <el-select multiple collapse-tags v-if="item.type=='checkbox'" v-model="item.tittext" clearable placeholder="请选择">
                <el-option v-for="(item,index) in item.childrens" :key="item.value" :label="index" :value="item.name">
                </el-option>
              </el-select>
              <!--日期模版-->
              <el-date-picker v-if="item.type=='dataTime'" v-model="item.tittext" type="datetime" :placeholder="'请输入'+item.name"></el-date-picker>
              <!--数字模版-->
              <el-input v-if="item.type=='number'" v-model="item.tittext" type="number" auto-complete="off" class="cpm" :placeholder="'请输入'+item.name"></el-input>
            </div>

          </div>
        </div>
      </div>

      <!--该功能暂不需要====================================-->
      <!--<div class="txform">-->
      <!--<div class="item_wrap esspclearfix">-->
      <!--<span style="padding-right: 10px;">是否需要审核:</span>-->
      <!--<el-radio disabled v-model="radioEnroll" label="0">否</el-radio>-->
      <!--<el-radio disabled v-model="radioEnroll" label="1">是</el-radio>-->
      <!--</div>-->
      <!--<div class="item_wrap esspclearfix">-->
      <!--<span style="padding-right: 10px;">报名上限人数:</span>-->
      <!--<span>{{activeDetailData.applyMaximum}}人数</span>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div class="item_wrap esspclearfix">&ndash;&gt;-->
      <!--&lt;!&ndash;<span style="padding-right: 10px;">上传附件:</span>&ndash;&gt;-->
      <!--&lt;!&ndash;<p v-for="(item,index) in activeDetailData.fileUrl" :key="index">&ndash;&gt;-->
      <!--&lt;!&ndash;<a :href="item.url">{{item.name}}</a>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
      <!--该功能暂不需要====================================-->

      <div class="submit_btns">
        <div class="submit_btns_inner esspclearfix">
          <el-button class="sure_btn" @click="submitForm" type="primary" size="small">
            {{btnText}}
          </el-button>
          <el-button class="cancel_btn" size="small" @click="$router.push('/parkIndex/goverBene/all')">取消
          </el-button>
        </div>
      </div>

    </div>

    <!-- 关注事件对话框start -->
    <el-dialog class="quguanbox" title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- <span style="display: inline-block; width: 100%; text-align: center;font-size: 16px">确定取消该关注？</span> -->
      <div>
        <i class="icon iconfont icon-tishi"></i>
        <span class="quguan">是否取消该关注</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upDatefollowStatus(0)">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 关注事件对话框end -->

  </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
import Moment from "moment";
import mixin from "@/components/mixins/mixins_windowOpen.js";
export default {
    mixins: [mixin],
    data() {
        return {
            logo: "",
            activityLabelList: [],
            msg: "个人或者报名",
            btnText: "确定报名",
            btnBloon: true,
            enrollType: "", // 根据个人还是公司报名 0.个人 1. 公司
            input: "",
            followId: "",
            bookstyle: "1",
            radioEnroll: "0", // 报名是否需要审核
            showBtn: true, // true 表示确定隐藏
            inputName: "",
            inputTel: "",
            maxNum: 1, // 报名上限
            num1: "",
            activeDetailData: {}, // 详情数据
            formRqList: [],
            selcetfile: "",
            listfile: [],
            tags: [], // 标签
            companyForm: {
                companyName: "",
                tel: "",
                name: ""
            },
            fileList: [],
            nrollFormList: [],
            breadlist: [
                {
                    path: "/parkIndex/goverBene/all",
                    name: "园区惠政"
                },
                {
                    path: "/parkIndex/activityDetail",
                    name: "惠政申请"
                }
            ],
            tableData: [],

            // 关注
            dialogVisible: false,
            followStatus: "" //资讯关注状态，非0 就是关注了
        };
    },
    components: {
        EsspBreadCrumb
    },
    filters: {
        changePrice: function(value) {
            value = Number(value);
            return "￥" + value.toFixed(2);
        },
        timerFormat(vaule) {
            return Moment(vaule).format("YYYY-MM-DD HH:ss");
        }
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            this.$post(this.$apiUrl.goverBene.getPolById, {
                id: this.$route.query.id
            }).then(response => {
                this.activeDetailData = response.resultData;
                this.fileList = this.activeDetailData.fileUrl;

                this.followId = this.activeDetailData.followId || "";

                var arr = JSON.parse(this.activeDetailData.applyForm)
                    .formRqList;
                var arr1 = JSON.parse(this.activeDetailData.applyForm)
                    .formTypeList;

                this.radioEnroll = this.activeDetailData.isNeedApprove;
                this.maxNum = response.resultData.applyMaximum;

                this.tags = this.activeDetailData.tagsTxt
                    ? this.activeDetailData.tagsTxt.split(",")
                    : [];
                this.followStatus = this.activeDetailData.followStatus;
                console.log(this.followStatus);
                this.enrollType = this.activeDetailData.applyType;
                var allArr = arr.concat(arr1);
                //                    allArr.forEach((item,index)=>{
                //                        this.$set(item,"isShow",index == 0? true:false);
                //                    })
                this.formRqList = allArr;

                /**
                 * 这循环的作用是干啥用的？打开会卡死
                 * */
                // for (var i = 0; i < this.maxNum; i++) {
                //     var obj = {
                //         isShow: i == 0 ? true : false,
                //         formRqList: this.formRqList
                //     }
                //     this.nrollFormList.push(obj);
                // }
            });
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        deleteItem(index) {
            this.maxNum--;
            this.nrollFormList.splice(index, 1);
        },
        // 检查报名表是否都填写
        rulenrollFormList() {
            var isNull = false;
            this.nrollFormList.forEach((item, index) => {
                item.forEach((itemChild, indexChild) => {
                    if (isNull) {
                        return;
                    }
                    var i = index;
                    for (var key in itemChild) {
                        if (isNull) {
                            return;
                        }
                        var j = indexChild;
                        var val = itemChild[key]; // 每一列的建值
                        if (val !== 0 && val == "") {
                            isNull = true;
                            this.$message.error(
                                "您当前的票种" +
                                    itemChild.pName +
                                    ",第" +
                                    (j + 1) +
                                    "项的" +
                                    this.getTitleName(key) +
                                    "为空！"
                            );
                        }
                    }
                });
            });
            return isNull;
        },
        getTitleName(val) {
            var tit = "";

            if (val == "username") {
                tit = "姓名";
            }
            if (val == "tel") {
                tit = "手机";
            }
            if (val == "job") {
                tit = "职位";
            }
            if (val == "company") {
                tit = "公司";
            }
            if (val == "getInfo") {
                tit = "期望从活动中获得哪些信息";
            }
            return tit;
        },
        // 获取总人数
        getAllNum() {
            var num = 0;
            this.tableData.forEach((item, index) => {
                num += item.ticketNum;
            });
            return num;
        },
        beforeup(file) {
            this.reFile(); //每次开始重置为空
            this.selcetfile = file;
            this.listfile = this.listfile.push(file);
        },
        reFile() {
            this.selcetfile = "";
            this.listfile = [];
        },
        // 点击报名
        submitForm() {
            this.grSubmit();
        },
        // 个人提交
        grSubmit() {
            var parkId = sessionStorage.getItem("parkId") || "";

            var companyName = ""; // 公司名称
            var contactName = ""; // 联系人
            var contactPhone = ""; // 联系电话
            var nums = this.maxNum;

            if (this.enrollType == "1") {
                var enterForm = this.formRqList;
                companyName = enterForm[0].tittext;
                contactName = enterForm[1].tittext;
                contactPhone = enterForm[2].tittext;
                nums = Number(enterForm[3].tittext);

                console.log(nums);

                if (nums <= 0) {
                    this.$message.error("报名人数不能小于等于0");
                    return;
                }
                if (nums > this.maxNum) {
                    this.$message.error(
                        "剩余可申报人数" + this.maxNum + "人，请修改申报人数"
                    );
                    //this.$message.error("报名人数不能大于总申报人数");
                    return;
                }
            } else {
                if (!this.btnBloon) {
                    return;
                }
                if (this.maxNum <= 0) {
                    this.btnBloon = true;
                    this.$message.error("报名人数不能小于0人");
                    return;
                }
                if (this.inputName == "") {
                    this.btnBloon = true;
                    this.$message.error("报名信息联系人不能为空");
                    return;
                }
                if (this.inputTel == "") {
                    this.btnBloon = true;
                    this.$message.error("报名信息手机号不能为空");
                    return;
                }

                var enterForm = this.nrollFormList;
                companyName = "";
                contactName = this.inputName;
                contactPhone = this.inputTel;
            }

            /* var isNull = this.rulenrollFormList();
                if(isNull) {
                    this.btnBloon = true;
                    return;
                } */

            this.btnBloon = false;
            this.$post(this.$apiUrl.goverBene.applyPolicy, {
                parkId: sessionStorage.getItem("parkId"),
                policyId: this.$route.query.id,
                name: contactName,
                phone: contactPhone,
                applyType: this.enrollType,
                companyName: companyName,
                applyNum: nums,
                applyInfo: enterForm // 报名表
            }).then(response => {
                this.btnBloon = true;
                if (response.resultCode == "CLT000000000") {
                    this.$alert(response.resultMsg, "报名提示", {
                        confirmButtonText: "确定",
                        callback: action => {
                            this.$router.push("/parkIndex/goverBene/apply");
                        }
                    });
                } else {
                    this.$message.error(response.resultMsg);
                }
            });
        },

        /**
         * 关注事件
         */
        // 弹窗
        showDialog() {
            //未登录
            if (!this.utils.isLoginMode()) {
                var _this = this;
                this.$message.warning("您尚未登陆，请您先登陆");
                setTimeout(function() {
                    _this.windowHrefUrl("/userIndex/login");
                }, 2000);
                return;
            }
            //游客模式暂不支持关注
            if (this.utils.isVisitorMode()) {
                this.$message.warning("您暂无权限进行关注/取消关注");
                return;
            }
            if (this.followStatus == "1") {
                this.dialogVisible = true;
            }
            if (this.followStatus != "1") {
                this.upDatefollowStatus();
            }
        },
        upDatefollowStatus() {
            let type = this.followStatus;

            var pop =
                type == 0
                    ? { id: this.$route.query.id }
                    : { followId: this.followId };
            var url =
                type == 0
                    ? this.$apiUrl.goverBene.addMyFocus
                    : this.$apiUrl.goverBene.cancelMyFocus;
            console.log(this.followId);

            var successMsg = type == 0 ? "关注成功" : "取消关注成功";
            var failMsg = type == 0 ? "关注失败" : "取消关注失败";
            this.$post(url, pop).then(
                response => {
                    var codestatus = response.resultCode;
                    let data = response.resultData;
                    this.$message.success(successMsg);
                    this.followId = data.followId;
                    this.followStatus = data.followStatus;
                    this.dialogVisible = false;
                },
                err => {
                    this.$message.error(response.resultMsg);
                }
            );
        }
    }
};
</script>

<style lang='less' scoped>
@import "../../../assets/css/mixin";

@com_font_size: 16px;
@con_bg: #fff;
.newsbtncon {
    text-align: center;
    .btncon {
        .focus-btn {
            color: black;
            min-width: 100px;
            border-color: #cccccc;
            background-color: #fff;
            i {
                margin-right: 5px;
                color: #fc1878;
                font-size: 12px;
            }
        }
    }
}

.common_titwrap .common_titdes {
    font-weight: normal;
}

.tags_con {
    span {
        margin-right: 20px;
    }
}

.newscon {
    .essp_width_auto();
    background: @con_bg;
    padding: 58px 0 38px;
    .h2_label {
        font-size: 20px;
        line-height: 36px;
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }
    em {
        font-style: normal;
    }
}

.newstatus {
    padding: 0 14%;
    margin-bottom: 20px;
    margin-left: 120px;
    .statusitems {
        float: left;
        margin: 0 24px;
        font-size: 14px;
        line-height: 25px;
        color: #999;
        text-align: center;
    }
}

.newstags {
    margin-bottom: 20px;
    text-align: center;
    .tagsbox {
        margin-right: 12px;
        background-color: #cccccc;
        color: #fff;
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }
}

.tablemain {
    overflow: hidden;
    .essp_width_auto();
    background: #fff;
    padding-top: 74px;
    /*padding-bottom: 55px;*/
    .tablemain_item {
        position: relative;
        border: 1px solid #ccc;
        width: 1000px;
        margin: 0 auto;
        .esspborder-radius(5px);
        margin-bottom: 20px;
    }
}

.minus,
.plus {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: #fbfbfb;
    border: 1px solid #ccc;
}

.close {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
}

.minus {
    border-right: 0;
}

.plus {
    border-left: 0;
}

.inputs {
    width: 50px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #ccc;
    input {
        display: block;
        width: 96%;
        height: 100%;
        padding: 0 2%;
        text-align: center;
        background: #fff;
        border: none;
        outline: none;
    }
}

.count {
    display: inline-block;
}

.txform {
    .essp_width_auto();
    background: @con_bg;
    .item_wrap {
        padding: 0 100px 35px;
        .floats {
            .esspfloat();
            height: 34px;
            line-height: 34px;
            font-size: @com_font_size;
        }

        .item {
            .esspfloat();
            width: 50%;
            span {
                color: @essp_nav_bg;
            }
        }
    }
}

.submit_btns {
    .essp_width_auto();
    background: @con_bg;
    padding-bottom: 50px;
    margin-bottom: 20px;
    .submit_btns_inner {
        .essp_width_auto(330px);
        button {
            float: left;
            min-width: 100px;
        }
        .cancel_btn {
            float: right;
        }
    }
}

.piaoj {
    .essp_width_auto();
    background: @con_bg;
    padding-bottom: 50px;
    .pjdiv {
        padding: 0 100px;
    }
}

.tabletit {
    position: relative;
    text-align: center;
    padding: 0 40px 0 20px;

    .avatarlogo {
        width: 78px;
        height: 78px;
    }
    p {
        float: left;
        width: 33.33%;
        padding: 20px 0;
        height: 30px;
        line-height: 30px;
        span {
            color: @essp_nav_bg;
        }
    }
}

.tabmain {
    padding: 0 28%;
    .itemdiv {
        label {
            display: block;
            margin-bottom: 10px;
            margin-top: 10px;
            padding: 0 5px;
            font-size: 16px;
            color: #666;
        }
        .importanticon {
            color: #ff9900;
            margin-right: 5px;
        }
        input {
            display: block;
            width: 530px;
            height: 35px;
            margin-bottom: 10px;
            /*background-color: #f6f9fb;*/
            border: 1px solid #eaeff2;
            padding: 0 10px;
        }
    }
    .tablebtn {
        display: block;
        margin: 20px auto;
    }
}

.activemain {
    .essp_width_auto();
}

.activemain_con {
    padding: 20px;
    background: #fff;
}

.login_con_a {
    .esspsc(16px);
}

.bmbtn {
    margin-left: 20px;
    em {
        padding-right: 5px;
    }
}

// 左侧部分
.actleft {
    float: left;
    padding: 0 0 10px;
    margin-right: 25px;
    /*border: 1px solid #ccc;*/

    .acttit {
        width: 180px;
        height: 40px;
        background-color: @essp_nav_bg;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin-bottom: 10px;
    }
    .actlogo {
        display: block;
        width: 180px;
        height: 180px;
    }
    .actcpname {
        font-size: 12px;
        width: 180px;
        overflow: hidden;
        line-height: 30px;
        color: #333333;
    }
}

//批量报名模块(样式伪造)
.batchimport {
    .essp_width_auto();
    background: #fff;
    padding-bottom: 20px;
    .batchbtn {
        margin-left: 100px;
        .downloadbtn {
            display: block;
            margin-bottom: 20px;
            .down_a {
                color: #fff;
            }
        }
        .uploadbtn {
            display: block;
            margin-bottom: 20px;
            color: #fff;
            &:hover {
                cursor: pointer;
            }
        }
    }
}

// 右侧部分
.actright {
    float: left;
}

.logocon {
    width: 420px;
    height: 240px;
    float: left;
    margin-right: 10px;
    cursor: pointer;
    .detaillogo {
        display: block;
        width: 100%;
        height: 100%;
    }
}

.detailcon {
    float: left;
    width: 522px;
    h2 {
        height: 72px;
        font-size: 20px;
        font-weight: bolder;
        line-height: 36px;
        color: #333333;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -moz-line-clamp: 2;
        -moz-box-orient: vertical;
        -ms-line-clamp: 2;
        -ms-box-orient: vertical;
        cursor: pointer;
    }
}

.cpm input {
    display: block;
    width: 530px;
    height: 35px;
    margin-bottom: 10px;
    background-color: #f6f9fb;
    border: 1px solid #eaeff2;
    padding: 0 10px;
}

//标签模块
.tagcon {
    margin-bottom: 5px;
    padding-left: 20px;
    span {
        float: left;
        margin-right: 20px;
        padding: 4px 10px;
        font-size: 12px;

        background-color: #cccccc;
        text-align: center;
        color: #fff;
    }
}

.infos {
    margin-bottom: 5px;
    .iconcoom {
        margin-right: 4px;
    }
    b,
    em {
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        font-style: normal;
    }
}

.infobtn {
    margin-bottom: 20px;
    .btnitem {
        float: left;
        width: 110px;
        height: 30px;
        line-height: 30px;
        margin-left: 15px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #ccc;
        &:hover {
            cursor: pointer;
        }
    }
    .selecrborder {
        position: relative;
        color: #ff9900;
        border: 1px solid #ff9900;
    }
    .selecrborder:before {
        position: absolute;
        content: " ";
        bottom: 0px;
        right: 0px;
        width: 0;
        height: 0;
        border-width: 0 10px 10px;
        border-style: solid;
        border-color: transparent transparent transparent #fc0; /*透明 透明 透明 黄*/
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
    }
}
</style>
