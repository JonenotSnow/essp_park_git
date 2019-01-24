<template>
    <div class="expert-detail-wrapsss">
        <!-- 专家详情页 -->
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="expert-detail__content"></div>
        <div class="expertcontainer">
            <div class="experinfo">
                <div class="brief_info">
                    <div class="expertimg">
                        <img :src="detailInfo.photo" alt="专家头像">
                    </div>
                    <div class="contact_info">
                        <div class="contact_tel">
                            <span>联系电话：</span>
                            <div class="tel_num">{{detailInfo.phone || '暂无'}}</div>
                        </div>
                        <div class="contact_mail">
                            <span>联系邮箱：</span>
                            <div class="mail_num">{{detailInfo.email || '暂无'}}</div>
                        </div>
                    </div>
                </div>
                <div class="detail_info">
                    <div class="detail_item basic_info">
                        <div class="expertname">{{detailInfo.name || "建信金融"}}</div>
                        <div class="expertlevel">{{detailInfo.title || "平台"}}</div>
                        <div class="basic_des detail_item_content">
                            {{detailInfo.introduction || "暂无"}}
                        </div>
                    </div>
                    <div class="other_info second_title" v-for="(item,index) in moduleData" :key="index">
                        <span class="second_title_name">{{item.title}}</span>
                        <div class="detail_item_content">
                            <pre v-html="item.info || '暂无'"></pre>
                        </div>
                        <div class="detail_item_img_wrap esspclearfix"v-if="item.isPic == '1'">
                            <div class="detail_item_img" v-for="(itemC,indexC) in item.photoList">
                                <img :src="itemC.src">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear-both" style="clear: both"></div>
            </div>
        </div>
        <!--专家详情end-->
    </div>

</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";

    export default {
        components: {},
        data() {
            return {
                msg: "专家详情页",
                detailInfo: {
                    // createId: "1000180019",
                    // createName: "陈08",
                    // createTime: 1545121041000,
                    // delFlag: null,
                    // email: "bdppcorg@163.com",
                    // id: "20181218161721286261",
                    // introduction: `管越强：男，汉族，1973年出生，理学博士（后），教授，河北深泽人，
                    // 理学博士，教授，水生生物学专业硕士生导师。现任河北大学生命科学学院生物科学系主任、
                    // 水生生物学硕士点召集人。1994年7月毕业于中国海洋大学海水养殖专业，
                    // 获学士学位，2000年7月毕业于河北大学水生生物学专业，
                    // 获硕士学位，2003年7月毕业于中国科学院海洋研究所，
                    // 获博士学位。1994年7月到河北大学工作至今，先后任助教（1995）、
                    // 讲师（2001）、副教授（2003）、教授（2009）。2004年10月-2006年
                    // 10月在汕头大学海洋生物研究所进行博士后研究。2011年10月至2012年10月
                    // 在澳大利亚联邦科学与工业组织海洋研究所水产养殖实验室作为公派访问学者，
                    // 从事合作研究。主持河北省自然科学基金2项，其它项目7项，参与国家973项目、
                    // 海洋公益专项项目等共计10余项。以第一作者或通讯作者身份在国内外核心期刊
                    // 发表学术论文30篇。主持编写著作1部，参与编写著作1部。获得河北省海洋科技
                    // 创新一等奖。主要学术兼职：中国水产学会会员、中国动物学会会员、中国海洋学
                    // 会会员，河北生物工程学会理事.`,
                    // modifyDate: null,
                    // moduleData: `主要研究方向从事水生动物免疫与疾病控制研究工作，
                    // 侧重于营养、环境因子对水生动物免疫水平和疾病发生的影响，并采用环境、
                    // 营养调控方法防治水生动物疾病。研究对象包括对虾、日本沼虾、中华绒螯
                    // 蟹及中华鳖。研究兴趣：水生动物营养基因组学、环境基因组组学；水产物健康养殖。`,
                    // name: "管越强",
                    // parkId: "20181217093701001",
                    // phone: "0312-5079733",
                    // photo: `http://128.196.235.129:8080/essp/
                    // upload/active/park/20181218/bb8c9184-6179-4466-a42e-e195534ffade.jpg`,
                    // status: null,
                    // title: "教授"
                },
                id: this.$route.query.id || "",
                breadlist: [
                    {
                        path: "/parkHome",
                        name: "首页"
                    },
                    {
                        path: "/parkIndex/expertDetail",
                        name: "专家详情"
                    }
                ],
                moduleData: []
            }
        },
        created() {
            this.initData()
        },
        components: {
            EsspBreadCrumb,
        },
        methods: {
            async initData() {
                await this.getExpertDetail();
            },
            getExpertDetail() {
                let url = this.$apiUrl.home.getExpertById;
                let pop = {
                    id: this.id
                };
                this.$post(url, pop).then(
                    response => {
                        var res = response.resultData;
                        this.detailInfo = res.expert
                        this.moduleData = JSON.parse(this.detailInfo.moduleData);
                        console.log(this.moduleData);
                    },
                    err => {
                        this.$message.error(response.resultMsg);
                    }
                );
            }
        }
    }
</script>

<style lang='less' scoped>

    .expert-detail-wrapsss {
        margin: 0 auto;
        width: 1200px;
        .expert-detail__content {
            background-color: #fff !important;
        }

        /*专家详情start*/
        .expertcontainer {
            background-color: #fff !important;

        }

        .expertcontainer .experinfo {
            margin-bottom: 20px;
        }

        .expertcontainer .experinfo .brief_info {
            margin-top: 56px;
            margin-left: 54px;
            float: left;
            width: 315px;
        }

        .expertcontainer .experinfo .brief_info .expertimg {
            height: 180px;
            line-height: 180px;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .expertcontainer .experinfo .brief_info .contact_info {
            margin-top: 20px;
            font-size: 14px;
            line-height: 32px;
            color: #999999;
            text-align: left;
        }

        .expertcontainer .experinfo .brief_info .contact_info .tel_num {
            display: inline;
            color: #000;
        }

        .expertcontainer .experinfo .brief_info .contact_info .mail_num {
            display: inline;
            color: #000;
        }

        .expertcontainer .experinfo .detail_info {
            float: left;
            margin-top: 56px;
            margin-left: 40px;
            margin-bottom: 100px;
            color: #999;
            text-align: left;
            width: 730px;
        }

        .expertcontainer .experinfo .basic_info .basic_des {
            margin-top: 30px;
            margin-bottom: 40px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;
        }

        .expertcontainer .experinfo .basic_info .expertname {
            margin-top: 14px;
            height: 19px;
            line-height: 19px;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333333;
        }

        .expertcontainer .experinfo .basic_info .expertlevel {
            margin-top: 20px;
            height: 12px;
            line-height: 12px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #777777;
        }

        .expertcontainer .experinfo .detail_info .second_title {
            font-size: 16px;
        }

        .expertcontainer .experinfo .detail_info .detail_item {
            border-bottom: 1px dashed #ccc;
        }

        .expertcontainer .experinfo .second_title_name {
            font-size: 16px;
        }

        .expertcontainer .experinfo .detail_item_content {
            margin-top: 30px;
            margin-bottom: 40px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 0px;
            color: #999999;
            pre {
                white-space: -webkit-pre-wrap!important;
                white-space: -moz-pre-wrap!important;
                white-space: -ms-pre-wrap!important;
                white-space: -o-pre-wrap!important;
                white-space: pre-wrap!important;
                word-wrap: break-word!important;
                *white-space:normal!important;
            }
        }

        .expertcontainer .experinfo .program_experience {
            margin-top: 40px;
        }

        .winprize {
            margin-top: 40px;
        }

        .other_info {
            margin-top: 40px;
        }
        .detail_item_img_wrap {
            .detail_item_img {
                float: left;
                width: 31%;
                height: 140px;
                overflow: hidden;
                margin-right: 14px;
                img {
                    display: block;
                    width: 100%;
                    min-height: 100%;
                }
            }
        }

        /*专家详情end*/
    }

</style>
