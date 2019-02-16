<template>
    <div id="requestPage">
        <el-dialog :visible.sync="scan" width='510px' height='280px' class='re' :show-close='true'>
            <div>
                <img class='bg' src="./re1.png" alt="">
                <div class="contentn">
                    <p class="infoing" v-html='content'></p>
                    <p class="toDetail">
                        <i></i>
                        <img src="./re2.png" alt="">
                        <span @click="$router.push({path:'/parkIndex/scanIndex',query:{id:parkId}})">查看园区详情</span>
                        <i></i>
                    </p>
                    <div v-if="!mark && mark != 0">
                        <p class="btn btnA">
                            <button @click="agreeInvite">接受邀请</button>
                        </p>
                        <p class="btn btnB">
                            <button @click="disagreeInvite">拒绝邀请</button>
                        </p>
                    </div>
                    <p v-if="mark == 0" class="btn btnA">
                        <button>已接受邀请</button>
                    </p>

                    <p v-if="mark == 1" class="btn btnA">
                        <button>已拒绝邀请</button>
                    </p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/components/mixins/mixins_windowOpen.js";
export default {
    mixins: [mixin],
    data() {
        return {
            content: "",
            scan: true,
            key: "",
            mark: "", //空表示未做接受或拒绝操作，0表示已接受邀请，1表示已拒绝邀请
            parkId: "",
            parkNm: "",
            notice: false
        };
    },
    async created() {
        await this.getInviteByKey();
    },
    filters: {
        // markfike(value) {
        //     let save = {
        //         '': false,
        //         '0': true,
        //         '1': true,
        //     }
        //     return save[value] ? save[value] : false;
        // }
    },
    methods: {
        getInviteByKey() {
            this.$post(this.$apiUrl.manage.getInviteByKey, {
                key: this.$route.query.key
            }).then(response => {
                if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    this.content = response.resultData.content;
                    this.parkId = response.resultData.parkId;
                    this.mark = response.resultData.mark;
                    this.getParkById(this.parkId);
                } else {
                    this.$message({
                        type: "error",
                        message: response.resultMsg
                    });
                }
            });
        },
        agreeInvite() {
            let that = this;
            this.$post(this.$apiUrl.manage.agreeInvite, {
                parkId: this.parkId,
                key: this.$route.query.key,
                fromUserId: this.$route.query.fromUserId
            }).then(response => {
                if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    this.$message({
                        type: "success",
                        message: "加入成功"
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: response.resultMsg
                    });
                }
            });
            setTimeout(() => {
                that.toOut();
            }, 2000);
        },
        disagreeInvite() {
            let that = this;
            this.$post(this.$apiUrl.manage.disagreeInvite, {
                parkId: this.parkId,
                key: this.$route.query.key,
                fromUserId: this.$route.query.fromUserId
            }).then(response => {
                if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    this.$message({
                        type: "success",
                        message: `已拒绝${this.parkNm}的入园邀请`
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: response.resultMsg
                    });
                }
            });
            setTimeout(() => {
                that.toOut();
            }, 2000);
        },
        getParkById(parkId) {
            this.$post(this.$apiUrl.manage.getParkById, {
                parkId: parkId
            }).then(
                response => {
                    this.parkNm = response.resultData.parkNm;
                },
                err => {
                    this.$message({
                        type: "warn",
                        message: response.resultMsg
                    });
                }
            );
        },
        toOut() {
            this.windowOpenNoParams("/messageCenter/sysMsg");
        }
    }
};
</script>

<style>
#requestPage .re .el-dialog {
    margin-top: 5vh !important;
}
#requestPage .re .el-dialog__header {
    display: none;
}
#requestPage .re .el-dialog__body {
    padding: 0;
}
</style>
<style lang="less" scoped>
#requestPage {
    .re {
        .bg {
            position: absolute;
        }
        .contentn {
            position: relative;
            z-index: 101;
            .infoing {
                width: 350px;
                margin: 0 auto;
                line-height: 34px;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 36px;
                letter-spacing: 0px;
                color: #409fa3;
                position: relative;
                top: 197px;
                text-indent: 32px;
            }
            .toDetail {
                position: relative;
                width: 191px;
                margin-left: 142px;
                top: 246px;
                i {
                    display: inline-block;
                    width: 54px;
                    height: 4px;
                    border-bottom: solid 1px #cccccc;
                    position: relative;
                    top: -6px;
                    &:nth-of-type(2) {
                        left: 194px;
                        top: -24px;
                        margin-left: 11px;
                    }
                }
                span {
                    cursor: pointer;
                }
                img {
                    position: relative;
                    top: 2px;
                    margin: 0 12px;
                }
                &:hover {
                    span {
                        color: #00a0e9;
                    }
                }
            }
            .btn {
                text-align: center;
            }
            .btnA button,
            .btnB button {
                outline: none;
                border: none;
                display: inline-block;
                position: relative;
                width: 167px;
                height: 46px;
                border-radius: 23px;
                font-size: 18.4px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 46px;
                letter-spacing: 0.4px;
                text-align: center;
                cursor: pointer;
            }
            .btnA button {
                background-color: #dbb992;
                color: #ffffff;
                top: 266px;
            }
            .btnB button {
                color: #7cbfc2;
                top: 271px;
                background: #f5f5f5;
            }
        }
    }
}
</style>

