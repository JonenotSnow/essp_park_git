<template>
    <div id="requestPage">
        <el-dialog :visible.sync="scan" width='510px' height='280px' class='re' :show-close='true'>
            <div>
                <img class='bg' src="./re1.png" alt="">
                <i @click="toHis" class="el-icon-close close"></i>
                <div class="contentn">
                    <p class="infoing" v-html='content' @click="skip"></p>
                    <p class="toDetail">
                        <i></i>
                        <img src="./re2.png" alt="">
                        <span @click="$router.push({path:'/parkIndex/scanIndex',query:{id:parkId}})">查看园区详情</span>
                        <i></i>
                    </p>
                    <div v-if="!mark && mark != 0">
                        <p class="btn btnB">
                            <button @click="agreeInvite">接受邀请</button>
                        </p>
                        <p class="btn btnC">
                            <button @click="disagreeInvite">拒绝邀请</button>
                        </p>
                    </div>
                    <p v-if="mark == 0" class="btn btnA">
                        <button>已接受</button>
                    </p>

                    <p v-if="mark == 1" class="btn btnA">
                        <button>已拒绝</button>
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
                this.content = response.resultData.content;
                this.parkId = response.resultData.parkId;
                this.mark = response.resultData.mark;
                this.getParkById(this.parkId);
            });
        },
        agreeInvite() {
            let that = this;
            this.$post(this.$apiUrl.manage.agreeInvite, {
                parkId: this.parkId,
                key: this.$route.query.key,
                fromUserId: this.$route.query.fromUserId
            }).then(response => {
                this.$message({
                    type: "success",
                    message: "加入成功"
                });
            });
            this.getInviteByKey();
            setTimeout(() => {
                this.$router.push({path:'/parkHome',query:{id:this.parkId}});
            }, 2000);
        },
        skip(){
            this.$router.push({path:'/parkHome',query:{id:this.parkId}});
        },
        disagreeInvite() {
            let that = this;
            this.$post(this.$apiUrl.manage.disagreeInvite, {
                parkId: this.parkId,
                key: this.$route.query.key,
                fromUserId: this.$route.query.fromUserId
            }).then(response => {
                this.$message({
                    type: "success",
                    message: `已拒绝${this.parkNm}的入园邀请`
                });
            });
            this.getInviteByKey();
            setTimeout(() => {
                window.history.go(-1);
            }, 2000);
        },
        getParkById(parkId) {
            this.$post(this.$apiUrl.manage.getParkById, {
                parkId: parkId
            }).then(
                response => {
                    this.parkNm = response.resultData.parkNm;
                }
            );
        },
        toHis() {
            window.history.go(-1);
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
        .close{
            position: absolute;    
            top: -24px;
            right: 8px;
            z-index: 102;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 81px;
            letter-spacing: 0.3px;
            color: #f8f8f8;
            cursor: pointer;
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
                button{
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
                }
            }
            .btnB{
                button{
                    background-color: #dbb992;
                    color:#fff;
                    cursor: pointer;
                    top: 271px;
                }
            }
            .btnC{
                button{
                    background-color: #fff;
                    color: #7cbfc2;
                    cursor: pointer;
                    top: 271px;
                }
            }
            .btnA button {
                background-image: linear-gradient(256deg, 
                    #dddee2 0%, 
                    #c9ccd3 100%), 
                linear-gradient(
                    #c4d6d4, 
                    #c4d6d4);
                background-blend-mode: normal, 
                    normal;
                color: #ffffff;
                top: 266px;
            }
        }
    }
}
</style>

