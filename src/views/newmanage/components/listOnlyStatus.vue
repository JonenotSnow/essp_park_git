<template>
    <div>
        <!-- 列表只有类型-->
        <div class="selectTitle" v-if="list">
            <span class="all"><i class="el-icon-circle-plus"></i>全选</span>
            共
            <span class="total">4</span>
            条，已选
            <span class="total">1</span>
            条
            <span class="removeBtn">删除</span>
            <span class="selectStatus">状态：
                <select>
                    <option value=""></option>
                </select>
            </span>
        </div>
        <ul class="listWrap" v-if="list">
            <li class="list" v-for="item in list" :key="item">
                <div class="ListTop">
                    <i class="el-icon-circle-plus"></i>
                    <span class="time">保存时间：2018-10-22  10：24：00</span>
                    <span class="create">发布人：孔乙fdsaf己</span>
                    <span class="classifyC">状态：<span>待审fdsfdfagdfsgfdsgfdsgdfsafsda核</span></span>
                    <i class="el-icon-delete remove"></i>
                </div>
                <div class="listBottom">
                    <div class="contentTitle">保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单保定市科技服务机构备案名单</div>
                    <!-- <div class='editorBtn2'>
                        <span>发布</span>
                        <span>编辑</span>
                    </div> -->
                    <div class='editorBtn2'>
                        <span>查看</span>
                        <span>编辑</span>
                    </div>
                    <!-- <div class='editorBtn1'>
                        <span>编辑</span>
                    </div> -->
                </div>
            </li>
        </ul> 
        <div v-else class="noData">
            <span>尚未发布成果，点击右上方发布按钮立即发布吧！</span>
            <img src="../../../assets/newparkimg/newmanage/achievementSet/no_list.png" alt="">
        </div>
        <div class="pageList" v-if="list">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props:['list'],
    data() {
        return {
            totalCount:0,
            pageNum:1,
            pageSize:5
        }
    },
    created () {
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageNum = val;
        }
    },
}
</script>

<style lang='less' scoped>
.selectTitle,.listWrap{
    width:910px;
    margin:0 auto;
}
.selectTitle{
    margin:15px auto 19px;
    font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
    color: #666666;
    .all{
        i{
            margin-right:6px;
        }
    }
    .total{
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #00a0e9;
    }
    .removeBtn{
        display:inline-block;
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
        margin-left:14px;
    }
    .selectStatus{
        margin-left:14px;
        select{
          width: 100px;
          height: 30px;
          border-radius: 3px;
          border: solid 1px #cccccc;
          outline: none;
          padding:0 10px;
        }
    }
}
.listWrap{
    // width: 910px;
    // margin: 0 auto;
    .list{
        margin-bottom:20px;
        border: solid 1px #cccccc;
        .ListTop,.ListTopStatus{
            height: 40px;
            width:876px;
            background-color: #f5f5f5;
            padding:0 16px;
            line-height:25px;
            margin:0 auto;
            overflow: hidden;
            .time{
                display: inline-block;
                width:230px;
                margin-left:8px;
            }
            .create,.classifyC{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                top: 7px;
            }
            .create{
                display: inline-block;
                width:100px;
                margin-left:50px;
            }
            .classifyC{
                display: inline-block;
                // width:150px;
                margin-left:42px;
                span{
                    color: #10b5ff;
                }
            }
            .remove{
                float: right;
                margin-top:13px;
                color:#999;
                cursor: pointer;
            }
        }
        .ListTopStatus{
            .create{
                display: inline-block;
                width:120px;
                margin-left:50px;
            }
            .classify{
                display: inline-block;
                width:150px;
                span{
                    color: #10b5ff;
                }
            }
            .classifyA{
                margin-left:42px;
            }
            .classifyB{
                margin-left:62px;
            }
        }
        .listBottom{
            height: 60px;
            width:840px;
            margin:0 auto;
            padding:0 40px 0 29px;
            overflow: hidden;
            .contentTitle{
                float: left;
                width: 500px;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                line-height:60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .editorBtn1{
                float: right;
                margin-right:5px;
                width:106px;
                margin-top:16px;
                span{
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
                    line-height:28px;
                    cursor: pointer;
                }
            }
            .editorBtn2{
                float: right;
                width:180px;
                margin-top:16px;
                span{
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
                    line-height:28px;
                    cursor: pointer;
                    &:nth-of-type(2){
                        margin-left: 15px;
                    }
                }
            }
        }
    }
}
.noData{
    position: relative;
    margin:57px 137px 238px 237px;
    text-align: center;
    span{
        position: absolute;
        top: 90px;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
    }
}
.pageList{
    width: 910px;
    margin: 45px auto 57px;
    text-align: right;
    padding-bottom: 57px;
}
</style>
