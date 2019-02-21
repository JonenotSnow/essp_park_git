<template>
    <div class="requestAddPark" id="requestAddPark" v-if="show">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="wrap">
            <div class="content">
                <p>
                    <i></i>
                    申请入驻园区
                    <i></i>
                </p>
                <div class="detail" v-if="getFormList && getFormList.length>0">
                    <div v-for="(it,i) in getFormList" :key="i">
                        <p>
                            <span v-if="it.requir">*</span>
                            {{it.name}}
                            <span class="sub" v-if="it.sub">（{{it.sub}}）</span>
                        </p>
                        <p v-if="it.fx && it.nickName == 'company'" class="sj">
                            <input type="text" v-model='fxContent.CSTNM' disabled>
                        </p>
                        <p v-if="it.fx && it.nickName == 'ind'" class="sj">
                            <input type="text" v-model='fxContent.IDYTPCD' disabled>
                        </p>
                        <p v-if="!it.fx && it.type == 'text'"><input type="text" v-model='it.value' :placeholder="`请输入${it.name}`"></p>
                        <p v-else-if="!it.fx && it.type == 'textarea'">
                            <textarea v-model="it.value" :placeholder="`请输入${it.name}`"></textarea>
                        </p>
                        <p v-else-if="!it.fx && ',radio,'.indexOf(','+it.type+',')>-1" class="downSel" style="text-indent:5px;">
                            <el-radio-group v-model="it.value">
                                <el-radio :label="is.name" v-for="(is,j) in it.childrens" :key="j">{{is.name}}
                                </el-radio>
                            </el-radio-group>
                            <!-- <select v-model="it.value">
                                <option :value="is.name" v-for="(is,j) in it.childrens" :key="j">{{is.name}}</option>
                            </select> -->
                        </p>
                        <p v-else-if="!it.fx && ',checkbox,'.indexOf(','+it.type+',')>-1" class="downSel" style="text-indent:5px;">
                            <el-checkbox-group v-model="it.value">
                                <el-checkbox :label="is.name" v-for="(is,j) in it.childrens" :key="j"></el-checkbox>
                            </el-checkbox-group>
                        </p>
                        <p v-else-if="!it.fx && (it.type == 'radioDown' || it.type == 'selectTS')" class="downSel" style="text-indent:5px;">
                            <select v-model="it.value" :placeholder="`请选择${it.name}`">
                                <option v-for="item in it.childrens" :key="item.id" :label="item.name" :value="item.name">
                                </option>
                            </select>
                        </p>
                        <p v-else-if="!it.fx && it.type == 'checkboxDown'" class="downSel" style="text-indent:5px;min-height:35px;">
                            <select v-model="it.value" multiple :placeholder="`请选择${it.name}`" style="min-height:35px;">
                                <option v-for="item in it.childrens" :key="item.id" :label="item.name" :value="item.name">
                                </option>
                            </select>
                        </p>
                        <p v-else-if="!it.fx && (it.type == 'dateTime' ||  it.type == 'dataTime')">
                            <span class="sub">{{it.sub}}</span>
                            <el-date-picker class="dataS" v-model="it.value" type="date" :placeholder="`请选择${it.name}`"></el-date-picker>
                        </p>
                        <p v-else-if="!it.fx && ',numberBox,number,'.indexOf(','+it.type+',')>-1">
                            <span class="sub">{{it.sub}}</span>
                            <input type="text" v-model='it.value' :placeholder="`请输入${it.name}`">
                        </p>
                    </div>
                    <span @click="goShowHome">查看企业橱窗</span>
                </div>
                <p class="btnT">
                    <span @click="toPop">提交申请</span>
                    <span @click="access = true">取消</span>
                </p>
            </div>
        </div>
        <!-- 是否取消本次申请 -->
        <el-dialog :visible.sync="accessT" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP">
                <i class="el-icon-warning"></i>&nbsp;&nbsp;是否确认加入该园区</p>
            <p class="btn">
                <span @click="accessT = false">取消</span>
                <span @click="submitForm">确认</span>
            </p>
        </el-dialog>
        <!-- 是否确认取消加入该园区 -->
        <el-dialog :visible.sync="access" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP">
                <i class="el-icon-warning"></i>&nbsp;&nbsp;是否确认取消加入该园区</p>
            <p class="btn">
                <span @click="access = false">取消</span>
                <span @click="$router.go(-1)">确认</span>
            </p>
        </el-dialog>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
import mixin from "@/components/mixins/mixins_windowOpen.js";
export default {
    components: {
        EsspBreadCrumb
    },
    mixins: [mixin],
    data() {
        return {
            getFormList: [],
            fxContent: {},
            rzz: [],
            submitData: [],
            access: false,
            curCstId:
                this.SSH.getItem("userInfo") &&
                this.SSH.getItem("userInfo").cstId,
            accessT: false,
            adr: "",
            bdFlag: this.SSH.getItem("bdFlag"),
            show: false
        };
    },
    created() {
        this.rzz = JSON.parse(window.localStorage.getItem("rzz"));

        this.getFxContent();
        this.getForm();

        // let filterList = ['0410','0411','0412','0413','0414','0415'];
        // let menuList = this.SSH.getItem("menuList");
        // let arr = [];
        // if (!this.bdFlag && menuList.length>0) {
        //     menuList.forEach(el => {
        //         if (el.name == 'parkList' && el.children  && el.children.length>0) {
        //             el.children.forEach((element,index)=>{
        //                 if (!filterList.includes(element.id)) {
        //                     arr.push(element)
        //                 }
        //             })
        //             el.children = arr;
        //         }
        //         return;
        //     });
        // }
        // this.SSH.setItem("menuList",menuList)
    },
    methods: {
        getForm() {
            this.$post(this.$apiUrl.manage.applyParkForm, {
                parkId: window.sessionStorage.getItem("parkId")
            }).then(
                response => {
                    if (response.resultData && response.resultData.entryForm) {
                        this.submitData = response.resultData.entryForm;
                        this.getFormList = JSON.parse(
                            response.resultData.entryForm
                        );
                    }
                },
                err => {
                    this.$message({
                        type: "warn",
                        message: response.resultMsg
                    });
                }
            );
        },
        goShowHome() {
            this.windowOpenUrl("/centerIndex/showHome", {
                cstId: this.curCstId
            });
        },
        getFxContent() {
            this.$post(this.$apiUrl.manage.getCstIdByUserId, {}).then(
                response => {
                    if (
                        response.resultCode != "CLT000000000" &&
                        response.resultCode != "0000000000"
                    ) {
                        this.$message({
                            type: "warn",
                            message: response.returnMsg
                        });
                        this.$router.go(-1);
                        return;
                    }
                    this.show = true;
                    if (response.resultData) {
                        this.fxContent = Object.assign({}, response.resultData);
                        if (!this.fxContent.CSTNM) {
                            this.fxContent.CSTNM = "其他行业";
                        }
                        if (this.rzz && this.rzz.length) {
                            for (let i = 0; i < this.rzz.length; i++) {
                                if (
                                    this.rzz[i].code == this.fxContent.IDYTPCD
                                ) {
                                    if (this.rzz[i].name) {
                                        this.fxContent.IDYTPCD = this.rzz[
                                            i
                                        ].name;
                                    }
                                    return false;
                                } else {
                                    this.fxContent.IDYTPCD = "其他行业";
                                }
                            }
                        }
                    }
                }
            );
        },
        toPop() {
            let _that = this;
            if (this.getFormList.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请联系管理员设置入园申请表模板"
                });
                setTimeout(() => {
                    _that.$router.go(-1);
                }, 1500);
                return;
            }
            let list = this.getFormList.slice(2, this.getFormList.length);
            let list1 = this.getFormList.slice(0, 2);
            if (
                this.getFormList.slice(2, 3)[0] &&
                this.getFormList.slice(2, 3)[0].value
            ) {
                this.adr = this.getFormList.slice(2, 3)[0].value;
            }
            if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].requir && !list[i].value) {
                        this.$message({
                            type: "warning",
                            message: `请输入${list[i].name}`
                        });
                        return;
                    }
                }
            }
            //area,linkMan,linkPhone 反显可修改
            if (this.getFormList[0] && !this.getFormList[0].value) {
                this.getFormList[0].value = this.fxContent.CSTNM;
            }
            if (this.getFormList[1] && !this.getFormList[1].value) {
                this.getFormList[1].value = this.fxContent.IDYTPCD;
            }
            if (this.getFormList[2] && !this.getFormList[2].value) {
                this.getFormList[2].value = this.fxContent.area;
            }
            if (this.getFormList[3] && !this.getFormList[3].value) {
                this.getFormList[3].value = this.fxContent.linkMan;
            }
            if (this.getFormList[4] && !this.getFormList[4].value) {
                this.getFormList[4].value = this.fxContent.linkPhone;
            }
            this.accessT = true;
        },
        submitForm() {
            let _that = this;
            this.$post(this.$apiUrl.manage.applyPark, {
                parkId: window.sessionStorage.getItem("parkId"),
                entryForm: this.getFormList,
                cstOrgPlace: this.adr
            }).then(response => {
                this.$message({
                    type: "success",
                    message: response.resultMsg
                });
                setTimeout(() => {
                    _that.$router.go(-1);
                }, 1500);
            });
        }
    }
};
</script>

<style>
#requestAddPark .access .el-dialog__header {
    display: none;
}

#requestAddPark .access .el-dialog__body {
    /* text-align: center; */
    overflow: hidden;
    padding: 30px 20px;
}

#requestAddPark .access .el-dialog__body p:nth-of-type(1) {
    line-height: 55px;
}

#requestAddPark .dataS input {
    width: 680px;
    background-color: #f6f9fb;
    border: solid 1px #eaeff2;
}
</style>

<style lang='less' scoped>
.wrap {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    .content {
        width: 680px;
        margin: 0 auto 30px;
        & > p {
            width: 100%;
            text-align: center;
            &:nth-of-type(1) {
                font-size: 24px;
                line-height: 90px;
                color: #333333;
                i {
                    display: inline-block;
                    width: 70px;
                    border: 1px solid #ddd;
                    position: relative;
                    top: -6px;
                }
            }
            &:nth-of-type(2) {
                padding: 60px 0 60px;
                & > button {
                    &:nth-of-type(2) {
                        margin-left: 130px;
                    }
                }
            }
            &.btnT {
                text-align: center;
                span {
                    text-align: center;
                    display: inline-block;
                    width: 100px;
                    height: 40px;
                    cursor: pointer;
                    background: linear-gradient(#22a2fa 0%, #10b5ff 100%);
                    border-radius: 5px;
                    line-height: 40px;
                    font-size: 16px;
                    color: #fff;
                    &:nth-of-type(2) {
                        margin-left: 120px;
                        letter-spacing: 4.8px;
                    }
                }
            }
        }
        .detail {
            width: 100%;
            position: relative;
            & > div {
                width: 100%;
                margin-bottom: 10px;
                & > p {
                    width: 100%;
                    font-size: 16px;
                    color: #666;
                    &:nth-of-type(1) {
                        line-height: 30px;
                        span {
                            color: #ff9900;
                            &:nth-of-type(2) {
                                color: #666;
                            }
                            &.sub {
                                color: #666;
                            }
                        }
                    }
                    &:nth-of-type(2) {
                        input {
                            width: 670px;
                            height: 35px;
                            padding: 0 5px;
                            background-color: #f6f9fb;
                            border: solid 1px #eaeff2;
                        }
                        textarea {
                            width: 660px;
                            min-width: 660px;
                            padding: 10px;
                            max-width: 660px;
                            line-height: 30px;
                            min-height: 100px;
                            border: solid 1px #eaeff2;
                            background-color: #f6f9fb;
                        }
                        select {
                            width: 680px;
                            min-height: 35px;
                            padding: 0 5px;
                            background-color: #f6f9fb;
                            border: solid 1px #eaeff2;
                        }
                    }
                }
                .sj {
                    input {
                        color: #333;
                    }
                }
            }
            & > span {
                position: absolute;
                top: 40px;
                right: -100px;
                font-size: 14px;
                color: #00a0e9;
                cursor: pointer;
            }
        }
    }
}

.access {
    .titleTips {
        text-indent: 36px;
        font-size: 24px;
        color: #555;
        position: relative;
        font-weight: normal;
        top: -30px;
        margin-top: 20px;
    }
    .accessP {
        text-indent: 20px;
        font-size: 20px;
        color: #333;
        line-height: 30px;
        i {
            font-size: 28px;
            color: #00a0e9;
        }
    }
    .btn {
        margin-top: 35px;
        text-align: center;
        span {
            text-align: center;
            display: inline-block;
            width: 100px;
            height: 35px;
            border-radius: 2px;
            line-height: 35px;
            font-size: 18x;
            cursor: pointer;
            color: #fff;
            letter-spacing: 4.8px;
            &:nth-of-type(1) {
                letter-spacing: 4.8px;
                background: #e6f4ff;
                color: #00a0e9;
            }
            &:nth-of-type(2) {
                margin-left: 55px;
                background: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                color: #fff;
            }
        }
    }
}
</style>
