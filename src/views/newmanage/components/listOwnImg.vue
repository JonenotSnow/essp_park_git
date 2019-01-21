<template>
    <div id="listOwnImg">
        <!-- 列表没有状态和类型 -->
        <div v-if="list">
            <div class="selectTitle" v-if="list.length > 0">
                <el-checkbox v-model="allCheck" @change="changeAllChecked">全选</el-checkbox>
                共
                <span class="total">{{ list.length}}</span>
                条，已选
                <span class="total">{{selectCheckItem.length}}</span>
                条
                <span class="removeBtn" @click="removeList">删除</span>
            </div>
            <ul class="listWrap">
                <li class="list" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
                    <div class="ListTop">
                        <el-checkbox v-model="item.isChecked" @change="changeChecked(item,index)">备选项</el-checkbox>
                        <span class="time">保存时间：{{item.modifyTime | timerFormat}}</span>
                        <span class="create">发布人：{{item.modifyName || item.createName}}</span>
                        <i class="el-icon-delete remove" @click="removeList('01',item)"></i>
                    </div>
                    <div class="listBottom">
                        <img :src="item.photo"><!-- @assets//actlogo.png -->
                        <div class='display'>
                            <p class="title">{{item.name}}</p>
                            <p class="content">{{item.title}}</p>
                        </div>
                        <div class='editorBtn'>
                            <span @click="editAchievementInfo(item)">编辑</span>
                        </div>
                    </div>
                </li>
                <li v-if="list.length == 0 && ajaxTit != '数据加载中……'" class="no_odata">暂无数据！</li>
                <li v-if="list.length == 0 && ajaxTit == '数据加载中……'" class="data_tit">{{ajaxTit}}</li>

            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['type','componentType','list','ajaxTit','allChecks'],
        data() {
            return {
                selectCheckItem: [],  // 已选择项
                allCheck: this.allChecks,
            }
        },
        methods: {
            // changeAllCheck
            changeAllCheck(val) {
                this.allCheck = false;
                this.selectCheckItem = [];
            },
            // 配置相应的删除接口
            filterStatus(type,string) {
                var string = string || "00";
                let urlMap = {
                    "achievement": string == "00" ? this.$apiUrl.achievement.delAchievByKey : '/parkHall/manage/publishAchievement',   // 成果管理
                    "expertItem": string == "00" ? this.$apiUrl.achievement.delExpert : '/parkHall/manage/publishExpertTeam'    // 专家团队
                }
                return urlMap[type];
            },
            // 删除列表  01 表示删除一条 其他表示删除多条
            removeList(type,item){
                var type = type;
                var id = '';
                if(type == "01") {
                    id = item.id;
                } else {
                    if(this.selectCheckItem.length < 1) {
                        this.$message.error("您还未选择"+this.type + "信息！");
                        return;
                    }
                    var arrId = [];
                    this.selectCheckItem.forEach((item,index) => {
                        arrId.push(item.id)
                    })
                    id = arrId.join(",");
                }
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delAchievByKey(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            // 删除成果列表
            delAchievByKey(id){
                var url = this.filterStatus(this.componentType);
                this.$post(url, {
                    id: id
                }).then(
                    response => {

                        this.$message.success(response.resultMsg);
                        this.$emit("delectList");
                        this.selectCheckItem = [];
                    },
                    err => {
                        this.$message.error(err.resultMsg);
                    }
                );
            },
            // 全选选择项
            changeAllChecked(){
                this.selectCheckItem = [];

                this.list.forEach((item,index) => {
                    item.isChecked = this.allCheck;
                    if(this.allCheck){
                        this.selectCheckItem.push(item);
                    }
                })
                console.log("全选",this.selectCheckItem);

            },
            // 列表选择项
            changeChecked(item,index) {
                if(item.isChecked) {
                    this.selectCheckItem.push(item);
                    if(this.selectCheckItem.length == this.list.length) {
                        this.allCheck = true;
                    }
                } else {
                    console.log(this.selectCheckItem.length == this.list.length);
                    this.allCheck = false;
                   if(this.selectCheckItem.length) {
                       var index = this.selectCheckItem.indexOf(item);
                       if(index >-1) {
                           this.selectCheckItem.splice(index,1)
                       }
                   }
                }
                console.log("选一个",this.selectCheckItem);
            },
            editAchievementInfo(info) {
                var url = this.filterStatus(this.componentType, "01");
                this.$router.push({path: url, query: {id: info.id}})
            }
        }
    }
</script>
<style>
    #listOwnImg .ListTop .el-checkbox__label {
        display: none;
    }

    #listOwnImg .ListTop .el-checkbox-group {
        width: 13px;
        float: left;
    }
</style>

<style lang='less' scoped>
    .data_tit {
        text-align: center;
        line-height: 40px;
    }
    .no_odata {
        text-align: center;
        min-height: 480px;
        line-height: 480px;
        font-size: 18px;
        color: #666;
        background: url('../../../assets/newparkimg/no-list-img.png') no-repeat center 57px;
    }
    #listOwnImg {
        .selectTitle, .listWrap {
            width: 910px;
            margin: 0 auto;
        }
        .selectTitle {
            margin: 15px auto 19px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #666666;
            .all {
                i {
                    margin-right: 6px;
                }
                .selectitem {
                    display: inline-block;
                }
            }
            .total {
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #00a0e9;
            }
            .removeBtn {
                display: inline-block;
                width: 48px;
                height: 28px;
                background-image: linear-gradient(0deg,
                #f5f5f5 0%,
                #ffffff 100%);
                border-radius: 5px;
                border: solid 1px #cccccc;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 0px;
                color: #666666;
                text-align: center;
                cursor: pointer;
                margin-left: 14px;
            }
        }
        .listWrap {
            // width: 910px;
            // margin: 0 auto;
            .list {
                margin-bottom: 20px;
                border: solid 1px #cccccc;
                .ListTop {
                    height: 40px;
                    width: 876px;
                    background-color: #f5f5f5;
                    padding: 0 16px;
                    line-height: 40px;
                    margin: 0 auto;
                    overflow: hidden;
                    .time {
                        margin-left: 8px;
                    }
                    .create {
                        margin-left: 40px;
                    }
                    .remove {
                        float: right;
                        margin-top: 13px;
                        color: #999;
                        cursor: pointer;
                    }
                }
                .listBottom {
                    height: 120px;
                    width: 890px;
                    margin: 0 auto;
                    padding: 10px;
                    overflow: hidden;
                    img {
                        float: left;
                        width: 210px;
                        height: 120px;
                    }
                    .display {
                        float: left;
                        margin-left: 21px;
                        width: 451px;
                        .title {
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #666666;
                            margin-top: 8px;
                        }
                        .content {
                            overflow: hidden;
                            text-overflow: ellipsis; //文本溢出显示省略号
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 24px;
                            letter-spacing: 0px;
                            color: #999999;
                            margin-top: 28px;
                        }
                    }
                    .editorBtn {
                        float: right;
                        margin-right: 5px;
                        width: 106px;
                        margin-top: 46px;
                        span {
                            display: inline-block;
                            width: 80px;
                            height: 28px;
                            background-color: #10b5ff;
                            border-radius: 14px;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #fefefe;
                            text-align: center;
                            line-height: 28px;
                            cursor: pointer;
                        }
                    }
                    .editorBtn2 {
                        float: right;
                        width: 180px;
                        margin-top: 16px;
                        span {
                            display: inline-block;
                            width: 80px;
                            height: 28px;
                            background-color: #10b5ff;
                            border-radius: 14px;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #fefefe;
                            text-align: center;
                            line-height: 28px;
                            cursor: pointer;
                            &:nth-of-type(2) {
                                margin-left: 15px;
                            }
                        }
                    }
                }
            }
        }
        .noData {
            position: relative;
            margin: 57px 137px 238px 237px;
            text-align: center;
            span {
                position: absolute;
                top: 90px;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
            }
        }
    }
</style>
