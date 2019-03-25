<template>
    <div class="park_contact">
        <div class="contact_center box_flex esspclearfix">
            <div class="contact_item">
                <span><i class="icon iconfont icon-tel"></i>联系电话：</span><span>{{parkInfo.parkAdminTel || '暂无联系电话'}}</span>
            </div>
            <div class="contact_item contact_item2 box_flex_item">
                <span><i class="el-icon-message"></i>联系邮箱：</span><span>{{parkInfo.email || '暂无联系邮箱'}}</span>
            </div>
            <div class="contact_item contact_item3 esspclearfix">
                <span><i class="icon iconfont icon-didian"></i>园区地址：</span>
                <span>{{parkInfo.parkPosition || '暂无园区地址'}}</span>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "园区联系方式",
        props: {
            parkInfo: {
                type: Object,
                default: {}
            }
        },
        components: {},
        data() {
            return {}
        },
        created() {

        },
        methods: {},
        watch: {
            parkInfo: function (val) {
                console.log("监听",val, this.$refs);
            }
        },
    };
</script>

<style lang="less" scoped>
    /* 浮动样式提取 */
    //清浮动
    .esspclearfix:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
    }

    .esspclearfix {
        zoom: 1;
    }
    .box_flex {
        display: -moz-box;  /* Firefox */
        display: -ms-flexbox;    /* IE10 */
        display: -webkit-box;    /* Safari */
        display: -webkit-flex;    /* Chrome, WebKit */
        display: -moz-flex;    /* Chrome, WebKit */
        display: -ms-flex;    /* Chrome, WebKit */
        display: flex;
    }
    .box_flex_item {
        -moz-box-flex:1;
        -ms-box-flex:1;
        -webkit-box-flex:1;
        box-flex:1;
        flex: 1;
        -webkit-flex: 1;
        -moz-flex: 1;
        -ms-flex: 1;
    }
    .park_contact {
        background: #3d8afd url("../../../assets/newparkimg/home/contact_bg.png") center;
        min-height: 160px;
        padding: 10px 0;
        .contact_center {
            width: 1200px;
            margin: 0 auto;
            padding-top:66px;
            .contact_item {
                float: left;
                font-size: 16px;
                color: #fff;
                i {
                    margin-right: 16px;
                }

            }
            .contact_item2 {
                text-align: center;
            }
            .contact_item3 {
                span {
                    float: left;
                }
                span:nth-child(2) {
                    max-width: 207px;
                }
            }

        }
    }
</style>
