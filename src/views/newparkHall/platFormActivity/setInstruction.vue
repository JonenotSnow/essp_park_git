<template>
    <div class="sponsorcon">
        <essp-bread-crumb :breadList="breadList"></essp-bread-crumb>
        <div class="content">
            <div class="title">
                <span></span>
                报名表设置说明
                <span></span>
            </div>
            <div class="title-s">{{pageTypeT}}报名</div>
            <div class="word word-1">
                {{pageTypeT}}报名为公司整体整合申报是指{{pageTypeT}}发起后，报名企业不需根据报名人数填写多份个人信息报名表，
                仅需统一填写一份公司报名表，其中
                <span>公司名称</span> 、
                <span>联系人姓名</span>、
                <span>联系人手机</span>、
                <span>报名人数</span>为必填信息，{{pageTypeT}}发布者可根据需要自定义报名表信息。该模式适用于不需收集个人报名信息，仅需要报名企业信息的场景。
            </div>
            <div class="img-wrap">
                <p v-if="pageTypeT== '惠政'">
                    <img src="../../../assets/parkUploadImg/gover/set0.png" alt class="img">
                </p>
                <p v-if="pageTypeT== '活动'">
                    <img src="../../../assets/parkUploadImg/gover/set2.png" alt class="img">
                    <img src="../../../assets/parkUploadImg/gover/set1.png" alt class="img">
                </p>
            </div>

            <div class="title-s">自定义报名表设置说明</div>
            <div class="word word-1">
                {{pageTypeT}}发布者可在“
                <span>新增报名项</span>”处，自定义添加报名表信息项，支持类型包括：
                <span>单行文本框</span>、
                <span>多行文本框</span>、
                <span>单选框</span>、
                <span>多选下拉框</span>、
                <span>日期选择框</span>和
                <span>数值输入框</span>。
            </div>
            <div class>
                <img src="../../../assets/parkUploadImg/gover/set1.png" alt class="img">
            </div>
            <div class="word word-2">
                添加自定义信息项后后，须对信息项进行编辑。须填写信息项
                <span>名称</span>、
                <span>是否必填</span>，
                <span>可输入提示信息</span>对报名者进行录入提示。
            </div>
            <div class>
                <img src="../../../assets/parkUploadImg/gover/set2.png" alt class="img">
            </div>
            <div class="word word-2" style="margin-bottom: 60px">
                自定义保存成功后，可对自定义报名表进行预览，{{pageTypeT}}发布成功后，报名企业将填写该报名表进行报名。
            </div>
        </div>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";

    export default {
        components: {EsspBreadCrumb},
        data() {
            return {
                breadListObj: {
                    defaultcon: [
                        {
                            path: "/parkHome",
                            name: "首页"
                        },
                        {
                            path: "/parkIndex/setInstruction",
                            name: "设置说明"
                        }
                    ],
                    active: [
                        {
                            path: "/parkIndex/park/launch",
                            name: "平台活动"
                        },
                        {
                            path: "/parkIndex/launchForm",
                            name: "发起平台活动"
                        },
                        {
                            path: "/parkIndex/setInstruction",
                            name: "设置说明"
                        }
                    ],
                    grov: [
                        {
                            path: "/parkIndex/goverBene/release",
                            name: "惠政服务"
                        },
                        {
                            path: "/parkIndex/publishGover",
                            name: "我发布的惠政"
                        },
                        {
                            path: "/parkIndex/setInstruction",
                            name: "设置说明"
                        }]
                }

            };
        },
        created() {
            console.log(this.$route.query.pagetype)
        },
        computed: {
            breadList() {
                let defaultArr = this.breadListObj.defaultcon;
                if (this.$route.query.pagetype) {
                    var pageType = this.$route.query.pagetype;
                    switch (pageType) {
                        case 'active':
                            defaultArr = this.breadListObj.active;
                            break
                        case 'grov':
                            defaultArr = this.breadListObj.grov;
                            break
                    }
                }
                return defaultArr
            },
            pageTypeT() {
                let defaultR = "活动";
                if (this.$route.query.pagetype) {
                    var pageType = this.$route.query.pagetype;
                    switch (pageType) {
                        case 'active':
                            defaultR = "活动";
                            break
                        case 'grov':
                            defaultR = "惠政"
                            break
                    }
                }
                return defaultR
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../assets/css/mixin";

    .sponsorcon {
        .essp_width_auto();
        background-color: #fff;
    }

    .title {
        font-size: 24px;
        text-align: center;
        margin: 63px auto 49px;
        span {
            position: relative;
            display: inline-block;
            width: 66px;
            padding: 0 10px;
            // font-size: 10px;
            &:before {
                content: "  ";
                position: absolute;
                width: 66px;
                height: 1px;
                background-color: #cccccc;
                top: -6px;
                left: 9px;
            }
        }
    }

    .content {
        padding: 0 100px;
        overflow: hidden;
        margin-bottom: 20px;
        .title-s {
            line-height: 30px;
            font-size: 20px;
            position: relative;
            padding-left: 23px;
            padding-bottom: 45px;
            &::before {
                content: " ";
                position: absolute;
                width: 10px;
                height: 30px;
                background-color: #00a0e9;
                left: 0;
                top: 0;
            }
        }

        .word {
            text-indent: 30px;
            font-size: 14px;
            span {
                color: #00a0e9;
            }
        }
        .img-wrap{
            margin-top: 42px;
            margin-bottom: 52px;
            .img {
                /*margin: 42px auto 52px;*/
                display: block;
                margin: 0 auto;
            }
        }

    }
</style>
