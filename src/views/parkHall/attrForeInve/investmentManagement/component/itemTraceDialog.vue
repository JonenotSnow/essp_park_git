<template>
    <div id="itemTraceDialog">
        <!-- 项目跟踪 -->
        <el-dialog :visible.sync="show" width='560px' class='removePark' :before-close="changeShow">
            <!--:show-close="false"-->
            <p class='title'>项目跟踪</p>
            <div class="manager">
                <p><span>项目名称：</span>{{detail.atractInvestTitle}}</p>
                <p><span>跟踪日期：</span>{{detail.followTime | timerFormat(detail.followTime)}}</p>
                <p><span>跟踪人：</span>{{detail.followPersonName}}</p>
                <p><span>跟踪方式：</span>
                    <span v-if="detail.followType == 1">来访</span>
                    <span v-else-if="detail.followType == 2">走访</span>
                    <span v-else-if="detail.followType == 3">电话</span>
                    <span v-else>邮件</span>
                </p>
                <p><span>过程纪要：</span>{{detail.followDesc}}</p>
                <div><span>意向房源：</span>
                    <span v-if="detail.followIntention && detail.followIntention.length == 0">暂无</span>
                    <p style="display: inline-block" v-else>
                        <span v-for="(item , index) in detail.followIntention" :key="index">{{item.blProject}}>{{item.bname}}>{{item.rname}}、</span>
                    </p>
                </div>
                <div><span>附件：</span>
                    <span v-if="detail.followAccessory && detail.followAccessory.length == 0">暂无</span>
                    <p style="display: inline-block" v-else>
                        <span  style="display: block; width: 100%" v-for="(item , index) in detail.followAccessory"  :key="index">
                            <a :href="item.url" :download="item.name">{{item.name}}</a>
                        </span>
                    </p>
                </div>
            </div>
            <p class="btn">
                <el-button type="primary" size='small' @click="changeShow">确定</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>
    import Moment from "moment";

    export default {
        props: ["show", "detail"],
        data() {
            return {};
        },
        methods: {
            changeShow() {
                this.show = false;
                this.$emit("parentShowTrance", this.show);
            }
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD");
            }
        },
        computed: {
            itemStatus: function () {
                if (this.detail.followStatu == 1) {
                    return "来访";
                } else if (this.detail.followStatu == 2) {
                    return "走访";
                } else if (this.detail.followStatu == 3) {
                    return "电话";
                } else {
                    return "邮件";
                }
            }
        }
    };
</script>

<style lang='less'>
    #itemTraceDialog {
        .removePark {
            .el-dialog__header {
                display: none;
            }
            .el-dialog .el-dialog__body {
                height: 400px;
                overflow: auto;
                .title {
                    height: 50px;
                    color: #333;
                    font-size: 18px;
                    text-indent: 20px;
                    line-height: 50px;
                }
                .manager {
                    width: 80%;
                    margin: 0 auto;
                    padding: 15px 0;
                    p {
                        line-height: 40px;
                        font-size: 14px;
                        color: #666;
                        span {
                            color: #444;
                        }
                    }
                }
                .btn {
                    text-align: right;
                }
            }
        }
    }
</style>
