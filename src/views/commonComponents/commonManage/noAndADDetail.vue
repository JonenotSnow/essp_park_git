<template>
    <div class="sendRequest" id="sendRequest">
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <div class="sendRequest_content">
            <p class="title">{{info.title}}</p>
            <p class="sub">
                <span>发布时间：{{info.createTime | formTime(info.createTime)}}</span>
                <span>发布人：{{info.issuer}}</span>
            </p>
            <div class="send_main" v-html="info.content">
            </div>
        </div>
    </div>
</template>

<script>
    import Moment from "moment";
    import EsspBreadCrumb from "@/components/EsspBreadCrumb";

    export default {
        components: {
            EsspBreadCrumb
        },
        data() {
            return {
                breadlist: [
                    {
                        path: "/parkHome",
                        name: "园区首页"
                    },
                    {
                        path: "",
                        name: "通知公告"
                    }
                ],
                info: {}
            };
        },
        filters: {
            formTime(vaule) {
                var d = new Date(vaule);
                var times = d.getFullYear() +
                    '-' + (parseInt((d.getMonth() + 1)) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                    '-' + (parseInt(d.getDate()) < 10 ? '0' + d.getDate() : d.getDate()) + ' ' +
                    (parseInt(d.getHours()) < 10 ? '0' + d.getHours() : d.getHours()) + ':' +
                    (parseInt(d.getMinutes()) < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' +
                    (parseInt(d.getSeconds()) < 10 ? '0' + d.getSeconds() : d.getSeconds());
                return times;
            }
        },
        created() {
            this.getNoticeById();
        },
        methods: {
            getNoticeById() {
                this.$post(this.$apiUrl.manage.getNoticeById, {
                    id: this.$route.query.id
                })
                    .then((response) => {
                        // this.$message({
                        //     type: "success",
                        //     message: response.resultMsg
                        // });
                        this.info = response.resultData;
                    }, (error) => {
                        this.$message({
                            type: "error",
                            message: response.resultMsg
                        });
                    })
            }
        }
    };
</script>

<style lang='less' scoped>
    .sendRequest_content {
        width: 1050px;
        margin: 0 auto;
        padding: 44px 76px;
        margin-bottom: 30px;
        background: #fff;
        .title {
            font-size: 20px;
            color: #333333;
            text-align: center;
        }
        .sub {
            font-size: 14px;
            text-align: center;
            margin-top: 31px;
            color: #999999;
        }
        .send_main {
            margin-top: 45px;
        }
    }
</style>
