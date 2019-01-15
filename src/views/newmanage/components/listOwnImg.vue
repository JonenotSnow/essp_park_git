<template>
    <div id="listOwnImg">
        <!-- 列表没有状态和类型 -->
        <div v-if="list">
            <div class="selectTitle">
                <el-checkbox v-model="allCheck" @change="changeAllChecked">全选</el-checkbox>
                共
                <span class="total">{{totalCount}}</span>
                条，已选
                <span class="total">{{selectListNum}}</span>
                条
                <span class="removeBtn" @click="removeList">删除</span>
            </div>
            <ul class="listWrap">
                <li class="list" v-for="(item,index) in list" :key="index">
                    <div class="ListTop">
                        <el-checkbox v-model="item.isChecked" @change="changeChecked(item,index)">备选项</el-checkbox>
                        <span class="time">保存时间：{{item.modifyTime | timerFormat}}</span>
                        <span class="create">发布人：{{item.modifyName}}</span>
                        <i class="el-icon-delete remove" @click="removeList('01',item)"></i>
                    </div>
                    <div class="listBottom">
                        <img :src="item.photo"><!-- @assets//actlogo.png -->
                        <div class='display'>
                            <p class="title">{{item.name}}</p>
                            <p class="content">{{item.title}}</p>
                        </div>
                        <div class='editorBtn'>
                            <span @click="editAchievementInfo(item,1)">编辑</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else class="noData">
            <span>尚未发布{{type}}，点击右上方发布按钮立即发布吧！</span>
            <img src="@assets/newparkimg/newmanage/achievementSet/no_list.png" alt="">
        </div>
    </div>
</template>

<script>
    import Moment from "moment";

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        props: {
            type: {
                type: String,
                default: ''
            },
            componentType: {
                type: String,
                default: ''
            },
            list: {
                type: [],
                default: null

            },
            selectListNum: {
                type: Number,
                default: ''
            },
            totalCount: {
                type: Number,
                defalut: 0
            }
        },
        data() {

            return {
                allCheck: false, // 全选默认值
                selectCheckItem: [],  // 已选择项
            }
            console.log(this.list.achievList)
        },
        computed: {},
        methods: {
            // 删除列表  01 表示删除一条 其他表示删除多条
            removeList(type,item){
                var type = type;
                var id = '';
                if(type == "01") {
                    if(!item.isChecked) {
                        this.$message.error("您还未选择该项成果！");
                        return;
                    }
                    id = item.id;
                } else {
                    if(this.selectCheckItem.length < 1) {
                        this.$message.error("您还未选择成果！");
                        return;
                    }
                    var arrId = [];
                    this.selectCheckItem.forEach((item,index) => {
                        arrId.push(item.id)
                    })
                    id = arrId.join(",");
                }
                this.delAchievByKey(id);
            },
            // 删除成果列表
            delAchievByKey(id){
                this.$post(this.$apiUrl.achievement.delAchievByKey, {
                    id: id
                }).then(
                    response => {
                        this.$message.error(response.resultMsg);
                        this.$emit("delectList");
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
                } else {
                   if(this.selectCheckItem.length) {
                       var index = this.selectCheckItem.indexOf(item);
                       if(index >-1) {
                           this.selectCheckItem.splice(index,1)
                       }
                   }
                }
                console.log("选一个",this.selectCheckItem);
            },
            editAchievementInfo(info, _type) {
                this.$router.push({path: '/parkHall/manage/publishAchievement', query: {id: info.id}})
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
