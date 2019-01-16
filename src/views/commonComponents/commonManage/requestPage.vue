<template>
    <div id="requestPage">
        <el-dialog :visible.sync="scan" width='850px' height='273px' class='requestPage'>
            <div class="scanWrap">
                <img src="../../../assets/request_bg.png" alt="">
                <div v-html='content' class='scanContent'></div>
                <p class="check">
                    <span @click="$router.push({path:'/parkIndex/scanIndex',query:{id:parkId}})">点击查看{{parkNm}}园区详情</span>
                </p>
                <p class="save">
                    <el-button type="primary" size='small' @click="agreeInvite" :disabled="mark|markfike(mark)">确认加入
                    </el-button>
                    <el-button type="primary" size='small' @click="$router.push('/messageCenter/sysMsg')">
                        取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消
                    </el-button>
                </p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: '',
                scan: true,
                key: '',
                mark: '',
                parkId: '',
                parkNm: ''
            }
        },
        async created() {
            await this.getInviteByKey();
        },
        filters: {
            markfike(value) {
                let save = {
                    '': false,
                    '0': true,
                    '1': true,
                }
                return save[value] ? save[value] : false;
            }
        },
        methods: {
            getInviteByKey() {
                this.$post(this.$apiUrl.manage.getInviteByKey, {
                    key: this.$route.query.key,
                })
                    .then((response) => {
                        this.content = response.resultData.content;
                        this.parkId = response.resultData.parkId;
                        this.mark = response.resultData.mark;
                        this.getParkById(this.parkId)
                    }, (error) => {
                        this.$message({
                            type: "error",
                            message: response.resultMsg
                        });
                    })
            },
            agreeInvite() {
                this.$post(this.$apiUrl.manage.agreeInvite, {
                    parkId: this.parkId,
                    key: this.$route.query.key
                })
                    .then((response) => {
                        this.$message({
                            type: "success",
                            message: "加入成功"
                        });
                    }, (error) => {
                        this.$message({
                            type: "error",
                            message: response.resultMsg
                        });
                    })
                this.$router.push('/messageCenter/sysMsg')
            },
            getParkById(park) {
                this.$post(this.$apiUrl.manage.getParkById, {
                    parkId: parkId
                }).then(
                    response => {
                        this.parkNm = response.resultData.parkNm
                    },
                    err => {
                        this.$message({
                            type: "warn",
                            message: response.resultMsg
                        });
                    }
                );
            }
        }
    }
</script>

<style>
    #requestPage .el-dialog__body {
        padding: 0 !important;
    }

    #requestPage .requestPage .el-dialog__header {
        padding: 0 !important;
    }

    #requestPage .scanContent p {
        line-height: 0;
        padding: 0;
        margin: 0;
    }

    #requestPage .scanContent .ql-indent-1 {
        line-height: 35px;
        padding-left: 3em;
    }

    #requestPage .scanContent .ql-indent-2 {
        line-height: 35px;
        padding-left: 3em;
        text-indent: 2em;
    }

    #requestPage .scanContent .ql-indent-3 {
        line-height: 35px;
        padding-left: 5em;
    }

    #requestPage .scanContent .ql-align-right {
        line-height: 25px;
        text-align: right;
    }

    #requestPage .sd {
        margin-top: 35px !important;
    }
</style>
<style lang="less" scoped>
    .requestPage {
        .scanWrap {
            position: relative;
            background: #ddd;
            & > img {
                position: absolute;
                top: 0;
                z-index: 101;
            }
            .scanContent {
                width: 560px;
                margin: 0 auto;
                position: absolute;
                top: 130px;
                left: 145px;
                z-index: 102;
                & > p {
                    font-size: 16px;
                    color: #666666;
                    &:nth-of-type(1) {
                        line-height: 50px;
                    }
                ;
                    &:nth-of-type(2) {
                        text-indent: 90px;
                        margin-bottom: 10px;
                    }
                ;
                    &:nth-of-type(3) {
                        line-height: 30px;
                        width: 474px;
                        margin: 0 auto;
                        text-indent: 41px;
                        word-wrap: break-word;
                    }
                ;
                    &:nth-of-type(4) {
                        margin-top: 70px;
                        text-align: right;
                    }
                ;
                    &:nth-of-type(5) {
                        line-height: 40px;
                        text-align: right;
                    }
                ;
                    &:nth-of-type(6) {
                        line-height: 40px;
                        text-align: right;
                    }
                ;
                    &:nth-of-type(7) {
                        line-height: 40px;
                        text-align: right;
                    }
                ;
                }
            }
            .check, .save {
                width: 560px;
                margin: 0 auto;
                position: absolute;
                left: 145px;
                z-index: 102;
            }
            .save {
                top: 450px;
                text-align: center;
            }
            .check {
                top: 420px;
                width: 670px;
                text-align: right;
                cursor: pointer;
                color: #409EFF;
            }
        }
    }
</style>

