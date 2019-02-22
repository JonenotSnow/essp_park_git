<template>
  <div class="actauditpage" id="manageActivityAudit">
    <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
    <div class="common_titwrap">
      <p class='Otitle'>活动发布审核</p>
      <div class="k1">
        <div class="title">
          <h3 class="common_tit_des">基本信息</h3>
        </div>
        <div class="contentList">
          <p>
            <span>活动主题：</span>
            <span>{{infoList.activityTheme}}</span>
          </p>
          <p>
            <span>活动类别：</span>
            <span v-if="infoList.activityType == it.type" v-for="(it,i) in typeList" :key="i">{{it.name}}</span>
          </p>
          <p>
            <span>活动开始时间：</span>
            <span>{{infoList.activityStarttime}}</span>
          </p>
          <p>
            <span>活动天数：</span>
            <span>{{infoList.activityDays}}</span>
          </p>
          <p>
            <span>活动地点：</span>
            <span>{{infoList.activityPlace}}</span>
          </p>
          <p>
            <span>是否收费：</span>
            <span>{{infoList.isCharge == 1 ? '是' : '否'}}</span>
          </p>
          <p v-if="infoList.isCharge==1">
            <span>收费说明：</span>
            <span>{{infoList.chargeInfo}}</span>
          </p>
          <p>
            <span>报名是否需审核：</span>
            <span>{{infoList.enterNeedAudit == 0 ? '否' : '是'}}</span>
          </p>
          <p>
            <span style="float: left">活动详情：</span>
            <span style="border: none; padding:0;" class="ql-editor" v-html="infoList.activityDetails"></span>
          </p>
          <p class="esspclearfix">
            <span style="float: left">活动宣传图/海报：</span>
            <img style="float: left;width: 245px;" :src="infoList.activityPhoto" alt="">
          </p>
          <p>
            <span>活动标签：</span>
            <span>{{infoList.activityLabel || "无"}}</span>
          </p>
          <p>
            <span>发起单位：</span>
            <span>{{infoList.initiateUnits}}</span>
          </p>
          <p v-if="infoList.cstNam">
            <span>发布方：</span>
            <span>{{infoList.cstName}}</span>
          </p>
        </div>
      </div>
      <div class="k1">
        <div class="title">
          <h3 class="common_tit_des">报名表设置</h3>
        </div>
        <p class="radioBtn">
          <el-radio v-model="radio" disabled label="0">个人实名分页申报</el-radio>
          <el-radio v-model="radio" disabled label="1">企业实名分页申报</el-radio>
        </p>
        <div class="contentList1">
          <div v-for=" (item,index)  in formRqList" :key="index">
            <p>
              <i v-if="item.requir">*</i>
              <span>{{item.name}}：</span>
            </p>
            <p><input type="text" v-model="item.tittext" disabled></p>
            <!-- <input type="text" disabled> -->
          </div>
        </div>
      </div>
      <div class="k2">
        <div class="title">
          <h3 class="common_tit_des">其他设置</h3>
        </div>
        <p class="infoTitle">票务信息：</p>
        <ul class="tickInfo">
          <li>
            <span>票种名称</span>
            <span>价格</span>
            <span>数量</span>
            <span>操作</span>
          </li>
          <li v-for="item in items" :key="item.ticketType">
            <span>{{item.ticketType}}</span>
            <span>￥{{item.ticketPirce}}</span>
            <span>{{item.ticketNum}}</span>
            <span>
              <i class="el-icon-delete" style="color:#ddd;"></i>
            </span>
          </li>
        </ul>
        <div class="contentList2">
          <p>
            <span>活动开放范围：</span>
            <span>{{infoList.openScope | openStatus(infoList.openScope)}}</span>
          </p>
          <p>
            <span>报名人数上限：</span>
            <span>{{numberToplimit}}</span>
          </p>
          <p>
            <span>报名开始时间：</span>
            <span>{{infoList.enterStarttime}}</span>
          </p>
          <p>
            <span>报名截止时间：</span>
            <span>{{infoList.enterEndtime}}</span>
          </p>
          <!--<p>-->
          <!--<span>邀请对象：</span>-->
          <!--<span>xxxxxxxxxxx</span>-->
          <!--</p>-->
        </div>
      </div>
      <hr>
      <p class="submitMark">
        <span>提交审核备注：</span>
        <span>{{infoList.activityRemarks || "无"}}</span>
      </p>
      <p class="markReason esspclearfix">
        <span>
          <i style="color: red;margin-right: 5px;">*</i>审核原因：</span>
        <textarea v-model="mark" :disabled="$route.query.opMark==='01'"></textarea>
      </p>
      <p class="btn" v-if="$route.query.opMark==='03'">
        <span @click="access = true">通过</span>
        <span @click="noAccess = true">不通过</span>
        <span @click="$router.go(-1)">取消</span>
        <!--<el-button type="primary" size="small" @click="access = true"></el-button>-->
        <!--<el-button type="primary" size="small" @click="noAccess = true">不通过</el-button>-->
        <!--<el-button type="primary" size="small" @click="$router.go(-1)">取消</el-button>-->
      </p>
    </div>
    <!-- 通过审核弹窗 -->
    <el-dialog :visible.sync="access" width='560px' class='access'>
      <p>是否确认通过审核！</p>
      <p>
        <el-button type="primary" size="small" @click="access =false">取消</el-button>
        <el-button type="primary" size="small" @click="auditFn('10')">确认</el-button>
      </p>
    </el-dialog>

    <!-- 未通过审核弹窗 -->
    <el-dialog :visible.sync="noAccess" width='560px' class='noAccess'>
      <p>是否拒绝通过审核</p>
      <p>
        <el-button type="primary" size="small" @click="noAccess =false">取消</el-button>
        <el-button type="primary" size="small" @click="auditFn('03')">确认</el-button>
      </p>
    </el-dialog>
  </div>
</template>
<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";

export default {
    data() {
        return {
            breadlist: [
                {
                    path: "/parkIndex/park/all",
                    name: this.utils.isBdPark() ? "平台活动" : "园区活动"
                },
                {
                    path: `/parkIndex/park/auditing`,
                    name: "我审核的活动"
                },
                {
                    path: "",
                    name: "活动发布审核"
                }
            ],
            numberToplimit: 0, //人数上限
            items: [], //票务列表信息
            formRqList: [], //申报表列表信息
            auditType: "", //审核类型（企业审核、园区审核）
            infoList: {},
            access: false,
            noAccess: false,
            radio: "",
            mark: "",
            typeList: [
                {
                    type: "1",
                    name: "培训"
                },
                {
                    type: "2",
                    name: "论坛"
                },
                {
                    type: "3",
                    name: "比赛"
                },
                {
                    type: "4",
                    name: "聚会"
                },
                {
                    type: "5",
                    name: "研讨会"
                },
                {
                    type: "6",
                    name: "发布会"
                },
                {
                    type: "7",
                    name: "分享会"
                },
                {
                    type: "8",
                    name: "沙龙"
                }
            ],
            userId: ""
        };
    },
    components: {
        EsspBreadCrumb
    },
    created() {
        this.userId = this.SSH.getItem("userInfo").id;
        this.getInfo();
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /*获取企业活动审核详情页面的活动信息 */
        getInfo() {
            this.$post(this.$apiUrl.manage.activityAduit, {
                activityId: this.$route.query.id,
                parkId: sessionStorage.getItem("parkId"),
                opMark: this.$route.query.opMark
            }).then(
                response => {
                    if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.infoList = Object.assign({}, response.resultData);
                        this.items = JSON.parse(this.infoList.ticketForm); //票务信息
                        var enterForm = JSON.parse(this.infoList.enterForm); //申报信息

                        this.formRqList = enterForm.formRqList.concat(
                            enterForm.formTypeList
                        );
                        var number = 0;
                        for (var i = 0; i < this.items.length; i++) {
                            number = number + this.items[i].ticketNum;
                        }
                        this.numberToplimit = number;
                        this.radio = this.infoList.enterType;
                        this.mark = this.infoList.reason || "";
                        console.log(this.mark, this.infoList.reason);
                    } else {
                        this.$message.error(response.resultMsg);
                    }
                },
                response => {
                    this.$message.error(response.resultMsg);
                }
            );
        },
        /* 点击通过或者不通过按钮操作触发 */
        auditFn(status) {
            console.log(this.mark);
            if (this.mark == "") {
                this.$message.error("请填写审核原因");
                return;
            }
            if (this.mark.length > 100) {
                this.$message.error("填写的审核原因不能大于1oo字！");
                return;
            }
            /* ========企业审核========================= */
            this.$post(this.$apiUrl.active.activityAudit, {
                activityId: this.$route.query.id,
                parkId: window.sessionStorage.getItem("parkId"),
                status: status,
                reason: this.mark
            }).then(
                response => {
                    if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                        this.$message.success(response.resultMsg);
                    } else {
                        this.$message.error(response.resultMsg);
                    }
                },
                response => {
                    this.$message.error(response.resultMsg);
                }
            );
            this.access = false;
            this.noAccess = false;
            this.$router.push("/parkIndex/park/auditing");
        }
    },
    filters: {
        openStatus(value) {
            if (value == "0") {
                return "仅对本园区开放";
            } else if (value == "1") {
                return "全开放";
            }
        }
    }
};
</script>
<style>
#manageActivityAudit .access .el-dialog__body,
#manageActivityAudit .noAccess .el-dialog__body {
    text-align: center;
}

#manageActivityAudit .access .el-dialog__body p:nth-of-type(1) {
    line-height: 100px;
}

#manageActivityAudit .noAccess .el-dialog__body textarea {
    width: 460px;
    min-width: 460px;
    max-width: 460px;
    min-height: 80px;
    border-radius: 10px;
    border: 1px solid #ddd;
    outline: none;
    padding: 20px;
}

#manageActivityAudit .noAccess .el-dialog__body p:nth-of-type(1) {
    text-align: left;
    margin-bottom: 20px;
    font-size: 16px;
    color: #444;
    text-indent: 25px;
}

#manageActivityAudit .noAccess .el-dialog__body p:nth-of-type(2) {
    margin-top: 20px;
}
.markReason {
    width: 990px;
    margin: 0 auto;
    line-height: 50px;
}
.markReason span,
.markReason textarea {
    float: left;
}
.markReason span {
    width: 140px;
    font-size: 16px;
    margin-right: 10px;
    color: #666666;
    text-align: right;
}
.markReason textarea {
    width: 350px;
    height: 80px;
    resize: none;
    padding: 5px 10px;
}
</style>

<style scoped lang="less">
.common_tit_des {
    float: left;
    font-size: 20px;
    margin-left: 82px;
    padding: 0 12px 4px;
    font-weight: normal;
    border-left: 10px solid #00a0e9;
}
.common_titwrap {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    .Otitle {
        font-size: 24px;
        line-height: 36px;
        margin-bottom: 20px;
        color: #333333;
        text-align: center;
    }
    .title {
        width: 102 0px;
        margin: 0 auto;
        overflow: hidden;
    }
    .contentList,
    .contentList1,
    .contentList2 {
        width: 990px;
        margin: 20px auto;
        & > p {
            line-height: 50px;
            span {
                display: inline-block;
                width: 140px;
                font-size: 16px;
                line-height: 40px;
                margin-right: 10px;
                color: #666666;
                text-align: right;
                &:nth-of-type(2) {
                    width: 700px;
                    font-size: 16px;
                    line-height: 30px;
                    color: #333333;
                    text-align: left;
                }
            }
            &.texta {
                position: relative;
                overflow: hidden;
                span {
                    float: left;
                }
                textarea {
                    width: 820px;
                    float: left;
                    min-width: 820px;
                    max-width: 820px;
                    padding: 5px;
                    min-height: 140px;
                }
            }
        }
    }
    .radioBtn {
        width: 1034px;
        margin: 20px auto;
        margin-bottom: 20px;
        label {
            cursor: pointer;
            margin-right: 20px;
            input {
                position: relative;
                top: 2px;
                margin-right: 5px;
            }
        }
    }
    .contentList1 {
        width: 1034px;
        margin: 0 auto;
        padding-bottom: 20px;
        /*height: 404px;*/
        border-radius: 6px;
        border: solid 1px #cccccc;
        & > div {
            width: 550px;
            margin: 0 auto;
            line-height: 35px;
            & > p {
                i {
                    color: #ff9900;
                    margin-right: 5px;
                    font-size: 16px;
                }
                span {
                    color: #666;
                    font-size: 16px;
                }
                input {
                    width: 550px;
                    height: 35px;
                    background-color: #f6f9fb;
                    border: solid 1px #eaeff2;
                }
            }
            &:nth-of-type(1) {
                margin-top: 20px;
            }
        }
    }
    .k2 {
        .title {
            margin: 40px 0 20px;
        }
        .infoTitle {
            width: 1000px;
            margin: 20px auto;
            margin-bottom: 20px;
        }
        .tickInfo {
            width: 1032px;
            margin: 0 auto;
            border: solid 1px #cccccc;
            li {
                display: flex;
                height: 50px;
                line-height: 50px;
                border-top: solid 1px #cccccc;
                span {
                    flex: 1;
                    text-align: center;
                }
                &:nth-of-type(1) {
                    border-top: none;
                }
            }
            li:nth-child(1) {
                background: #f5f5f5;
                font-size: 16px;
            }
        }
    }
}

hr {
    color: #666;
}

.submitMark {
    width: 990px;
    margin: 0 auto;
    line-height: 50px;
    span {
        display: inline-block;
        width: 140px;
        font-size: 16px;
        line-height: 40px;
        margin-right: 10px;
        color: #666666;
        text-align: right;
        &:nth-of-type(2) {
            width: 700px;
            font-size: 14px;
            line-height: 30px;
            color: #333333;
            text-align: left;
        }
    }
}

.btn {
    text-align: center;
    line-height: 100px;
    span {
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin-right: 130px;
    }
    span:nth-child(1) {
        background: #00a0e9;
    }
    span:nth-child(2) {
        background: #999;
    }
    span:nth-child(3) {
        background: #00a0e9;
        margin-right: 0;
    }
}
</style>

