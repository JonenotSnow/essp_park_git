<template>
    <div>
        <!-- 通知公告管理专用 -->
        <div v-if="list.length">
            <div class="maintool esspclearfix">
             <el-checkbox class="maincheck" :indeterminate="isIndeterminate" v-model="checkAll" @change="AllChange" >全选</el-checkbox>
             <div class="numdes">共<span class="detailnum">{{customopts.allTotal}}</span>条，已选<span class="detailnum">{{hascheckedNum}}</span>条</div>
             <div class="btntool"><span class="delbtn" @click="delNew()">删除</span></div>
             <!-- 草稿屏蔽 -->
             <div class="statustool" v-if="!customopts.status==0">
                 <el-select v-model="classtType" placeholder="请选择" class="inline_select">
                        <el-option
                            v-for="(item,index) in typeitems"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
             </div>
            </div>
            <div>
                <div class="listitem" v-for="(item,index) in list" :key="index">
                    <div class="listtop esspclearfix">
                        <el-checkbox-group v-model="checkedIds" class="checktop" @change="handleCheckedCitiesChange">
                            <el-checkbox :label="item.id" :key="index"></el-checkbox>
                        </el-checkbox-group>
                        <div class="tdcn timecn"><span>保存时间：2018-10-22  10：24：00</span></div>
                        <div class="tdcn pbcn"><span>发布人:孔乙己</span></div>
                        <!-- 草稿屏蔽 -->
                        <div class="tdcn statusdes" v-if="!customopts.status==0"><span>状态:<span class="detail">审核通过</span></span></div>
                        <div class="tdcn handeltool"><i class="el-icon-delete remove" @click="delNew(item)"></i></div>
                    </div>
                    <div class="maintext esspclearfix">
                        <div class="textTit">新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈新闻内容哈哈哈</div>
                        <div class="btnArea">
                            <!--已审核的操作按钮 -->
                            <div class="btncons" v-if="customopts.status==2">
                                <span class="btnitem" @click="goAudit(item)">查看</span>
                                <span class="btnitem" @click="goEdit(item)">编辑</span>
                            </div>
                            <!-- 已发布 -->
                            <div class="btncons" v-if="customopts.status==1">
                                <span class="btnitem" @click="goEdit(item)">编辑</span>
                            </div>
                            <!-- 草稿 -->
                            <div class="btncons" v-if="customopts.status==0">
                                <span class="btnitem" @click="goEdit(item)">编辑</span>
                            </div>

                        </div>
                    </div>
                </div>
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
      customopts: {
          type: Object,
          default: {}
      },
      list:{
          type: [],
          default: ''
      }
  },
    data() {
        return {
            checkAll: false,
            checkedIds: [],//选择的资源
            isIndeterminate: false,
            classtType:"01",//审核的状态
            typeitems:[
                {
                    name:"审核通过",
                    id:"01"

                },
                {
                    name:"审核不通过",
                    id:"02"
                }
            ]

        }
    },
    created () {
        this.init();
    },
    methods: {
        delNew(item){
            this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
            }).then(() => {
            this.$message.success('删除成功!');
            }).catch(() => {
            this.$message.info("已取消删除")
            })
        },
        goAudit(item){
            this.$message.warning('功能待开发，查看审核详情界面')
            this.$router.push({
                name: 'park-lookNoticeAudit',
                query: {
                    informationId: item.informationId,
                    
                }
            })
        },
        goEdit(item){
            this.$router.push({
                path: '/news/addNotice',
                query: {
                    id: item.id,
                    
                }
            })
        },
        init(){
            this.list =[{id:"00001"},{id:"00002"}]
        },
        //全选
        AllChange(val) {
        this.checkedIds = val ? this.allListIds : [];
        this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {console.log(value)
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.allListIds.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.allListIds.length;//有选择但不是全部
        }
        
    },
    computed:{
        //可以选择的id
        allListIds(){
            var ids = this.list.map(item=>{
                return item.id
            })
            return ids
        },
        //已选数量
        hascheckedNum(){
            return this.checkedIds.length;
        }
    }
}
</script>

<style lang='less' scoped>
@import "../../../../../assets/css/mixin.less";
/deep/.checktop .el-checkbox__label{
    display: none;
}
//全选工具条
.maintool{
    width: 910px;
    padding:20px 0 0;
    margin: 0 auto;
    margin-bottom: 20px;
    height:40px;
    line-height: 40px;
    .maincheck{
        float: left;
        margin-right: 16px;
        font-family:" MicrosoftYaHei";
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
    }
    .numdes{
        float: left;
        margin-right:10px;
        font-family:" MicrosoftYaHei";
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        height:40px;
        line-height: 40px;
        .detailnum{
            color:#00a0e9;
        }
    }
    .btntool{
        float: left;
        margin-right:15px;
        height:40px;
        line-height: 40px;
        .delbtn{
            float: left;
            width: 50px;
            margin-top:4px;
            height: 28px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            background-image: linear-gradient(0deg, 
                #f5f5f5 0%, 
                #ffffff 100%);
            border-radius: 5px;
            border: solid 1px #cccccc;
        }

    }
    .statustool{
        float: left;
        /deep/.el-input__inner{
            height: 30px;
            width:120px;
            line-height: 30px;
        }
    }
}
.listitem{
    //每一层列表样式
    width: 910px;
    height: 100px;
    margin: 0 auto;
    margin-bottom: 20px;
	background-color: #ffffff;
    border: solid 1px #cccccc;
}
//第一层工具栏样式
.listtop{
    margin: 0 auto;
    width: 910px;
    height: 40px;
    background-color: #f5f5f5;
    border: solid 1px #cccccc;
    line-height: 40px;
    font-family: "MicrosoftYaHei";
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    .tdcn{
        float: left; 
    }
    .checktop{
        float: left;
        margin:0 12px;
    }
    .timecn{
        margin-right:42px;
    }
    .pbcn{
        margin-right:40px;
    }
    .statusdes{
        .detail{
            margin-left: 5px;
            color:#00a0e9;
        }
    }
    .handeltool{
        float: right;
        margin-right:20px;
        .remove{
            cursor: pointer;
        }
    }
}
//第二层内容区
.maintext{
    margin: 0 auto;
    width: 910px;
    height: 60px;
    line-height: 60px;
    .textTit{
        float: left;
        width: 650px;
        font-family: "MicrosoftYaHei";
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #444444;
        .esspellipsis();
    }
    .btnArea{
        //按钮的最外层样式
        float: right;
    }
    .btncons{
        float: right;
        margin-top:15px;
        .btnitem{
            cursor: pointer;
            float: left;
            width: 80px;
            height: 28px;
            margin-right:20px;
            background-color: #10b5ff;
            border-radius: 14px;
            color: #fefefe;
            line-height: 28px;
            text-align: center;
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
</style>
