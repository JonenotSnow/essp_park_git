<template>
    <div>
        <!-- 列表没有状态和类型 -->
        <div v-if="list.length>0">
            <div class="selectTitle">
                <span class="all"><i class="el-icon-circle-plus"></i>全选</span>
                共
                <span class="total">4</span>
                条，已选
                <span class="total">1</span>
                条
                <span class="removeBtn">删除</span>
            </div>
            <ul class="listWrap">
                <li class="list" v-for="item in list" :key="item">
                    <div class="ListTop">
                        <i class="el-icon-circle-plus"></i>
                        <span class="time">保存时间：2018-10-22  10：24：00</span>
                        <span class="create">发布人：孔乙己</span>
                        <i class="el-icon-delete remove"></i>
                    </div>
                    <div class="listBottom">
                        <img src="../../../assets//actlogo.png" alt="">
                        <div class='display'>
                            <p class="title">成果名称</p>
                            <p class="content">这是关于成果的的介绍描述，这是关于成果的的介绍描述，
                                这是关于成果的的介绍描述，这是关于成果的的介绍描述，这是
                                关于成果的的介绍描...，这是关于成果的的介绍描述，这是关于成
                                果的的介绍描述，这是关于成果的的介绍描述，这是关于成
                                果的的介绍描述，这是关于成···</p>
                        </div>
                        <div class='editorBtn'>
                            <span>编辑</span>
                        </div>
                    </div>
                </li>
            </ul> 
            <div class="pageList">
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
        <div v-else class="noData">
            <span>尚未发布{{type}}，点击右上方发布按钮立即发布吧！</span>
            <img src="@assets/newparkimg/newmanage/achievementSet/no_list.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
  props: {
      type: {
          type: String,
          default: ''
      },
      list:{
          type: [],
          default: ''
      }
  },
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
}
.listWrap{
    // width: 910px;
    // margin: 0 auto;
    .list{
        margin-bottom:20px;
        border: solid 1px #cccccc;
        .ListTop{
            height: 40px;
            width:876px;
            background-color: #f5f5f5;
            padding:0 16px;
            line-height:40px;
            margin:0 auto;
            overflow: hidden;
            .time{
                margin-left:8px;
            }
            .create{
                margin-left:40px;
            }
            .remove{
                float: right;
                margin-top:13px;
                color:#999;
                cursor: pointer;
            }
        }
        .listBottom{
            height: 120px;
            width:890px;
            margin:0 auto;
            padding:10px;
            overflow: hidden;
            img{
                float:left;
                width: 210px;
                height: 120px;
            }
            .display{
                float: left;
                margin-left:21px;
                width:451px;
                .title{
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #666666;
                    margin-top: 8px;
                }
                .content{
                    overflow: hidden;
                    text-overflow:ellipsis;//文本溢出显示省略号
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #999999;
                    margin-top:28px;
                }
            }
            .editorBtn{
                float: right;
                margin-right:5px;
                width:106px;
                margin-top:46px;
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
