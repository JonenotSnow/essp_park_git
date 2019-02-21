<template>
    <div class="essp-afi-pt-wrap">

        <h2 class="essp-afi-pt-title"><span>跟踪登记</span></h2>
        <el-form ref="form" :model="form" @submit.native.prevent>
            <el-form-item class="esspclearfix">
                <span class="form_label_tit"><span>*</span>项目名称：</span>
                <div class="form_label_con">

                    <el-autocomplete
                        popper-class="my-autocomplete"
                        class="mini-name"
                        v-model="form.title"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容" :disabled="isDisable"
                        @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.atractInvestTitle }}</div>
                        </template>
                    </el-autocomplete>
                </div>
            </el-form-item>
            <el-form-item class="esspclearfix">
                <span class="form_label_tit"><span>*</span>跟踪日期：</span>
                <div class="form_label_con">
                    <el-date-picker class="mini-name" type="date" placeholder="选择日期"
                                    v-model="form.date"></el-date-picker>
                </div>
            </el-form-item>
            <el-form-item class="esspclearfix">
                <!--默认当前操作人-->
                <span class="form_label_tit"><span>*</span>跟踪人：</span>
                <div class="form_label_con">
                    <el-input v-model="form.username" :disabled="isProjectMenageName" class="mini-name"></el-input>
                </div>
            </el-form-item>
            <el-form-item class="esspclearfix">
                <!--默认当前操作人-->
                <span class="form_label_tit"><span>*</span>跟踪方式：</span>
                <div class="form_label_con">
                    <el-select v-model="form.mode" class="mini-name" placeholder="请选择跟踪方式">
                        <el-option label="来访" value="1"></el-option>
                        <el-option label="走访" value="2"></el-option>
                        <el-option label="电话" value="3"></el-option>
                        <el-option label="邮件" value="4"></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item class="esspclearfix">
                <span class="form_label_tit"><span>*</span>项目状态：</span>
                <div class="form_label_con">
                    <el-select v-model="form.status" class="mini-name" placeholder="请选择项目状态">
                        <el-option label="储备项目" value="0"></el-option>
                        <el-option label="在谈项目" value="1"></el-option>
                        <el-option label="已成交项目" value="2"></el-option>
                        <el-option label="搁置项目" value="3"></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item class="esspclearfix">
                <span class="form_label_tit"><span>*</span>过程纪要：</span>
                <div class="form_label_con">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" class="textarea_input title-name"
                              v-model="form.desc"></el-input>
                </div>
            </el-form-item>
            <el-form-item class="esspclearfix">
                <span class="form_label_tit">意向房源：</span>
                <div class="form_label_con">
                    <ul>
                        <li v-for="(item,index) in form.roomInfoList" :key="index">{{item.blProject}}
                            <i class="el-icon-arrow-right"></i>{{item.bname}}
                            <i class="el-icon-arrow-right"></i>{{item.rname}}
                        </li>
                    </ul>
                    <i class="el-icon-circle-plus el_icon_plus" @click="iShow=true"></i>
                </div>
            </el-form-item>
            <el-form-item class="esspclearfix">
                <span class="form_label_tit">附件上传：</span>
                <div class="form_label_con">
                    <el-upload class="upload-demo upload-close-btn" action="#" :on-remove="removeList" :before-upload="beforeAvatarUploadFile"
                               :file-list="form.fileList3">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span> 注:单个附件不能大于2M,附件不能超过6个</span>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="btn_con_ss">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="$router.go(-1)">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
        <PropertyPosi :isShow=iShow @closeMask="closeMa" @sureSelectRoom="sureSelectRooms"></PropertyPosi>
    </div>
</template>

<script>
    import Moment from "moment";
    import PropertyPosi from "@/views/parkHall/attrForeInve/processTracking/property_posi"

    export default {
        name: 'process-tracking',
        props: {},
        components: {
            PropertyPosi
        },
        filters: {
            timerFormat(vaule) {
                return Moment(vaule).format("YYYY-MM-DD")
            }
        },
        data() {
            return {
                iShow: false,
                isDisable: false,  // 项目编号是否不可编辑
                isProjectMenageName: true, // 项目经理是否可编辑 true 不可编辑
                restaurants: [],
                form: {
                    parkId: sessionStorage.getItem("parkId"),
                    followNumber: this.$route.query.id,
                    title: "",
                    username: JSON.parse(sessionStorage.getItem("ctData")).userInfo.truename || '匿名',
                    userId: JSON.parse(sessionStorage.getItem("ctData")).userInfo.id,
                    mode: "1",
                    date: new Date(),
                    status: this.$route.query.processType,
                    fileList3: [],
                    roomInfoList: []
                }
            }
        },
        created() {
            // 获取查询商机列表
            this.getAttractInvestInfo();
        },
        methods: {
            onSubmit() {
                if (this.form.parkId == "" || this.form.parkId == undefined) {
                    this.$message.error("园区id不能为空！")
                    return;
                }
                if (this.form.followNumber == "" || this.form.followNumber == undefined) {
                    this.$message.error("项目名称不能为空！")
                    return;
                }
                if (this.form.date == "" || this.form.date == undefined) {
                    this.$message.error("跟踪日期不能为空！")
                    return;
                }
                if (this.form.username == "" || this.form.username == undefined) {
                    this.$message.error("跟进人不能为空！")
                    return;
                }
                if (this.form.desc == "" || this.form.desc == undefined) {
                    this.$message.error("过程纪要不能为空！")
                    return;
                }
                this.$post(this.$apiUrl.processTrack.addAttractFollow, {
                    followNumber: this.form.followNumber,       // 项目编号
                    followTime: this.form.date,                  // 跟进时间
                    followType: this.form.mode,                  // 跟进类型   (必填)
                    followDesc: this.form.desc,                  // 跟进详情(过程纪要)    (必填)
                    followStatus: this.form.status,              // 跟进状态（项目状态）   (必填)
                    followPerson: this.form.userId,             // 跟进人   (必填)
                    followIntention: this.form.roomInfoList,    // 意向房源 JSON.stringify(this.form.roomInfoList)
                    followAccessory: this.form.fileList3,       // 附件
                    parkId: this.form.parkId                    // 园区ID（必填）
                }).then(response => {
                    // if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                        this.$alert(response.resultMsg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.go(-1);
                            }
                        });
                    // } else {
                    //     this.$message.error(response.resultMsg)
                    // }
                }, (response) => {
                    this.$message.error(response.resultMsg)
                })

            },
            // 关闭窗口
            closeMa(val) {
                this.iShow = val;
            },
            // sureSelectRooms 确认之后弹窗
            sureSelectRooms(val) {
                this.form.roomInfoList = val;
            },
            // 项目列表输入
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.atractInvestTitle.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            // 选中一条记录
            handleSelect(item) {
                this.form.title = item.atractInvestTitle;
                this.form.followNumber = item.id;
            },
            // 获取查询商机列表
            getAttractInvestInfo() {
                this.$post(this.$apiUrl.processTrack.getAttractInvestInfo, {
                    parkId: this.form.parkId,
                    pageSize: 1000,
                }).then((response) => {
                    // if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                        this.restaurants = response.resultData.listData;
                        this.restaurants.forEach((item, index) => {
                            if (item.id == this.form.followNumber) {
                                this.form.title = item.atractInvestTitle;
                            }
                        })
                    // } else {
                    //     this.$message.error(response.resultMsg)
                    // }
                }, (response) => {
                    this.$message.error(response.resultMsg)
                })
            },
            removeList(file,fileList){
                console.log(fileList);
                this.form.fileList3 = fileList;
            },
            beforeAvatarUploadFile(file) {
                if(this.form.fileList3.length > 5) {
                    this.$message.error("上传附件个数不能超过6个!");
                    return;
                }
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据

                param.append("type", "park"); // 通过append向form对象添加数据
                param.append("model", "fj"); // 通过append向form对象添加数据

                const isLt5M = file.size / 1024 / 1024 < 2;
                if (!isLt5M) {
                    this.$message.error("上传附件大小不能超过2MB!");
                    return isLt5M;
                }

                this.$post(this.$apiUrl.upload.upload, param).then(response => {
                    var obj = {
                        name: file.name,
                        url: response.resultData[0].url
                    };
                    this.form.fileList3.push(obj);

                });
                return false; // 返回false不会自动上传
            },
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

    .essp-afi-pt-wrap {

        width: 1100px;
        margin: 20px auto;
        background: #fff;
        padding: 30px 50px;
        .essp-afi-pt-title {
            padding: 20px 0;
            font-size: 24px;
            text-align: center;
            color: #333333;
            margin-bottom: 20px;
        }
        .essp-afi-pt-title span {
            position: relative;
        }
        .mini-name {
            width: 22%;
        }
        .title-name {
            width: 50%;
        }
        .el_icon_plus {
            font-size: 25px;
            cursor: pointer;
        }
        .btn_con_ss {
            text-align: center;
            padding: 10px 0;
        }
        .essp-afi-pt-title span:before {
            position: absolute;
            content: " ";
            left: -168px;
            top: 50%;
            width: 150px;
            height: 1px;
            background: #ccc;
        }
        .essp-afi-pt-title span:after {
            position: absolute;
            content: " ";
            right: -168px;
            top: 50%;
            width: 150px;
            height: 1px;
            background: #ccc;
        }
        .form_label_tit {
            float: left;
            width: 10%;
            /*margin-right: 2%;*/
            text-align: center;
            font-size: 14px;
            span {
                color: #ff2200;
                margin-right: 5px;
            }
        }
        .form_label_con {
            float: left;
            width: 90%;
        }
    }

</style>
<style>
    /*.upload-close-btn .el-icon-close ,*/
    /*.upload-close-btn .el-icon-close-tip {*/
        /*display: none!important;*/
    /*}*/
    /*.upload-close-btn .el-icon-upload-success {*/
        /*display: block!important;*/
    /*}*/
</style>
