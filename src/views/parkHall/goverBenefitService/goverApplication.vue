<template>
    <div class="applicationcon">
        <!-- 这个页面已废弃不维护 -->
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <!-- 惠政服务申请模板 -->
        <div class="newscon">
            <h2>厦门火炬高新区管委会关于受理第3批厦门市新引进人才生活补贴申报的通知</h2>
            <div class="newstatus esspclearfix">
                <span class="statusitems"><label>发布时间：</label><em>2018-06-01  14：25</em></span>
                <span class="statusitems"><label>发布机构：</label><em>厦门火炬高新园管委会</em></span>
                <span class="statusitems"><label>已申请：</label><em>47</em></span>
            </div>
            <div class="newstags">
                <el-tag class="tagsbox" type="info">补贴</el-tag>
                <el-tag class="tagsbox" type="info">交流</el-tag>
                <el-tag class="tagsbox" type="info">创业</el-tag>
            </div>
            <!--<div class="newsbtncon">-->
                <!--<el-button type="primary" size="mini" round>立即申请</el-button>-->
                <!--<el-button type="primary" size="mini" round>关注</el-button>-->
            <!--</div>-->
        </div>
        <div class="personal" v-if="enrollType == 1">
            <div class="common_titwrap esspclearfix">
                <div>
                    <h3 class="common_titdes">填写报名信息</h3>
                </div>
            </div>
            <div class="txform">
                <div class="item_wrap esspclearfix">
                    <div class="item">
                        <div class="floats"><span>*</span>联系人姓名：</div>
                        <div class="floats">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="floats"><span>*</span>联系人电话：</div>
                        <div class="floats">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="txform">
                <div class="item_wrap esspclearfix">
                    <div class="item">
                        <el-radio v-model="radio" label="1">在网页中填写</el-radio>
                        <el-radio v-model="radio" label="2">报名表批量导入</el-radio>
                    </div>
                    <div class="item text_align_r">
                        <span>友情提醒：当报名人数>5人时，建议批量导入</span>
                    </div>
                </div>
            </div>
            <div class="enroll_margin">
                <div class="tablemain">
                    <!-- 报名表界面 -->
                    <div class="tablemain_item" v-for="(item,index) in nrollFormList" :key="index">
                        <div class="tabletit">
                            <img src="@/assets/imgs/avatar.jpg" alt="" class="avatarlogo">
                            <p>报名人修改测试</p>
                        </div>
                        <div class="tabmain">
                            <div class="itemdiv">
                                <label for=""><em class="importanticon">*</em>姓名</label>
                                <input type="text" v-model="item.username">
                            </div>
                            <div class="itemdiv">
                                <label for=""><em class="importanticon">*</em>手机</label>
                                <input type="text" v-model="item.tel">
                            </div>
                            <div class="itemdiv">
                                <label for=""><em class="importanticon">*</em>职位</label>
                                <input type="text" v-model="item.job">
                            </div>
                            <div class="itemdiv">
                                <label for=""><em class="importanticon">*</em>公司</label>
                                <input type="text" v-model="item.company">
                            </div>
                            <div class="itemdiv">
                                <label for=""><em class="importanticon">*</em>期望从活动中获得哪些信息</label>
                                <input type="text" v-model="item.getInfo">
                            </div>
                            <div class="itemdiv">
                                <el-button round class="tablebtn" size="mini">保存并收起</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--公司信息-->
        <div class="company" v-if="enrollType == 2">
            <div class="common_titwrap esspclearfix">
                <div>
                    <h3 class="common_titdes">填写报名信息</h3>
                </div>
            </div>
            <div class="tablemain">
                <div class="tabmain" style="padding-bottom: 30px;">
                    <div class="itemdiv">
                        <label for=""><em class="importanticon">*</em>公司名称</label>
                        <input type="text" v-model="companyForm.companyName">
                    </div>
                    <div class="itemdiv">
                        <label for=""><em class="importanticon">*</em>联系人姓名</label>
                        <input type="text" v-model="companyForm.name">
                    </div>
                    <div class="itemdiv">
                        <label for=""><em class="importanticon">*</em>联系人电话</label>
                        <input type="text" v-model="companyForm.tel">
                    </div>
                </div>
            </div>
        </div>
        <div class="submit_btns">
            <div class="submit_btns_inner esspclearfix">
                <el-button class="sure_btn" type="primary" size="small">确定申请</el-button>
                <el-button class="cancel_btn" size="small">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"

    export default {
        data() {
            return {
                enrollType: 2, // 根据个人还是公司报名 1.个人 2. 公司
                input: '',
                radio: '1',
                showBtn: true,   // true 表示确定隐藏
                nrollFormList: [
                    {
                        username: "小王",
                        tel: '223232',
                        job: '总经理',
                        company: '小电视机',
                        getInfo: 'dadfada'
                    },
                    {
                        username: "小李",
                        tel: '223232',
                        job: '总经理',
                        company: '小电视机',
                        getInfo: 'dadfada'
                    },
                ],
                companyForm:{
                    companyName: "小王",
                    tel:'223232',
                    name:'总经理'
                },
                breadlist:[
                    {
                        path:'/parkIndex/goverBenne/all',
                        name: "园区惠政"
                    },
                    {
                        path:'/parkIndex/activityDetail',
                        name: "惠政申请"
                    }
                ],
            }

        },
        components: {
            EsspBreadCrumb
        },
    }
</script>

<style lang='less' scoped>
    @import "../../../assets/css/mixin";

    @com_font_size: 16px;
    @con_bg: #fff;
    .applicationcon {
        .essp_width_auto();
    }

    .newscon {
        .essp_width_auto();
        background: @con_bg;
        padding: 58px 0 38px;
        h2 {
            font-size: 20px;
            line-height: 36px;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }

    }

    .newstatus {
        padding: 0 20%;
        margin-bottom: 20px;
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
            line-height:24px;
        }
    }

    .newsbtncon {
        text-align: center;
    }

    //报名表部分样式
    .consetp {
        overflow: hidden;
        padding: 0 20px;
        span {
            float: left;
            font-size: 20px;
            line-height: 36px;
            color: #333;
            border-bottom: 4px solid #0066b3
        }

    }

    .tablemain {
        overflow: hidden;
        .essp_width_auto();
        background: #fff;
        padding-top: 74px;
        /*padding-bottom: 55px;*/
        .tablemain_item {
            padding-top: 74px;
            position: relative;
            border: 1px solid #ccc;
            width: 1000px;
            margin: 0 auto;
            .esspborder-radius(5px);
            margin-bottom: 100px;
        }
    }

    .tabletit {
        position: absolute;
        left: 50%;
        margin-left: -45px;
        top: -50px;
        text-align: center;
        z-index: 1;
        .avatarlogo {
            width: 78px;
            height: 78px;
        }
    }

    .tabmain {
        padding: 0 28%;
        .itemdiv {
            label {
                display: block;
                margin-bottom: 10px;
                padding: 0 5px;
                font-size: 16px;
                color: #ccc;
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
                padding: 0 10px;
            }

        }
        .tablebtn {
            display: block;
            margin: 20px auto 20px;
        }

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
                    color: @essp_nav_bg
                }
            }

        }
    }

    .common_titwrap {
        .essp_width_auto();
        background: @con_bg;
        padding: 38px 0;
        border-top: 1px solid #ccc;
        div {
            padding-left: 50px;
        }
        h3 {
            float: left;
            font-size: 20px;
            padding: 0 4px 4px;
            border-bottom: 4px solid @essp_nav_bg;
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
        text-align: center;
        .avatarlogo {
            width: 78px;
            height: 78px;
        }
    }

    .tabmain {
        padding: 0 28%;
        .itemdiv {
            label {
                display: block;
                margin-bottom: 10px;
                padding: 0 5px;
                font-size: 16px;
                color: #ccc;
            }
            .importanticon {
                color: #ff9900;
                margin-right: 5px;
            }
            input {
                display: block;
                width: 550px;
                height: 35px;
                margin-bottom: 10px;
            }

        }
        .tablebtn {
            display: block;
            margin: 0 auto 20px;
        }

    }

</style>

