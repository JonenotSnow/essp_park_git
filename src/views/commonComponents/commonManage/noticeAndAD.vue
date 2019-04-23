<template>
    <div class="el-main" id="noticeAndAD">
        <p style="height: 50px; line-height: 50px; background-color: #e6f4ff; font-size: 16px; font-weight: normal; font-stretch: normal; letter-spacing: 0px; color: #00a0e9;">
            <i class="icon iconfont icon-guangbo" style="color: orange; margin-left:17px;"></i>【温馨提示】您发布的最新通知公告已在园区首页进行展示</p>
        <div class="baseInfos">
            <p>
                <span style="letter-spacing: 4px;"> 已发布</span>
                <el-button type="primary" size="small" @click="$router.push('/parkHall/manage/publishAD')">
                    <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;发布通知公告
                </el-button>
            </p>
            <ul>
                <li>
                    <span class="time">时间</span>
                    <span class="title">通知公告标题</span>
                    <span class="audit">发布人</span>
                    <span>操作</span>
                </li>
                <li v-for="(it,i) in list" :key="i">
                    <span @click="$router.push({path:'/parkHall/manage/noAndADDetail',query:{id:it.id}})" class="time">{{it.createTime | timerFormat(it.createTime)}}</span>
                    <span @click="$router.push({path:'/parkHall/manage/noAndADDetail',query:{id:it.id}})" class="title">{{it.title}}</span>
                    <span @click="$router.push({path:'/parkHall/manage/noAndADDetail',query:{id:it.id}})" class="title">{{it.issuer}}</span>
                    <span>
                        <i class="el-icon-delete" @click="delNotice(it.id)"></i>
                    </span>
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
        <!-- 是否删除 -->
        <el-dialog :visible.sync="access"  width='400px' class='access'>
            <p>是否确认删除！</p>
            <p>
                <el-button type="primary" size="small" @click="auditFn">确认</el-button>
                <el-button type="primary" size="small" @click="access =false">取消</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            totalCount:0,
            pageNum:1,
            pageSize:5,
            list:[],
            curId:'',
            access:false
        }
    },
    created() {
        this.getNoticeList();
    },
    filters: {
        timerFormat(vaule){
            var d = new Date(vaule);
            var times=d.getFullYear() +
                '-' + (parseInt((d.getMonth() + 1))<10?'0'+(d.getMonth() + 1):(d.getMonth() + 1)) +
                '-' + (parseInt(d.getDate())<10?'0'+d.getDate():d.getDate()) + ' ' +
                (parseInt(d.getHours())<10?'0'+d.getHours():d.getHours()) + ':' +
                (parseInt(d.getMinutes())<10?'0'+d.getMinutes():d.getMinutes());
            return times;
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getNoticeList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getNoticeList();
        },
        //列表
        getNoticeList(){
            this.$post(this.$apiUrl.manage.getNoticeList,{
                parkId : window.sessionStorage.getItem("parkId"),
                pageNum : this.pageNum,
                pageSize : this.pageSize,
                flag:'1',
            })
            .then((response) => {
                this.list = [];
                this.totalCount = response.resultData.totalCount;
                this.list.push(...response.resultData.list);
            })
        },
        //删除
        delNotice(v){
            this.access = true;
            this.curId = v;
        },
        auditFn(){
            this.$post(this.$apiUrl.manage.delNotice,{
                id : this.curId,
                parkId : sessionStorage.getItem("parkId")
            })
            .then((response) => {
                this.$message({
                    type: "success",
                    message: response.resultMsg
                });
            },(error)=>{
                this.$message({
                    type: "error",
                    message: response.resultMsg
                });
            })

            this.access = false;
            setTimeout(()=>{
                this.getNoticeList();
            },300)
        }
    }
};
</script>
<style>
#noticeAndAD .access .el-dialog__body{
    text-align: center;
}
#noticeAndAD .access .el-dialog__body p:nth-of-type(1){
    line-height:70px;
    font-size: 20px;
}
</style>

<style lang='less' scoped>
    .el-main{
        /*margin-left: 10px;*/
        width:990px;
        background: #fff;
        min-height:455px;
        padding:0;
        &>p{
            height: 40px;
            line-height:40px;
            background-color: #e6f4ff;
            font-size: 16px;
            color: #00a0e9;
            overflow: hidden;
        }
        .baseInfos{
            &>p:nth-of-type(1){
                font-size: 20px;
                line-height: 30px;
                margin:30px 0 40px 40px;
                color: #333;
                border-left:10px solid #10b5ff;
                text-indent:22px;
                button{
                    float: right;
                    font-size: 14px;
                    color: #ffffff;
                    margin-right: 35px;
                    text-indent: 0;
                }
            }
            &>ul{
                width:915px;
                height:auto;
                margin:0 auto;
                li{
                    overflow: hidden;
                    line-height:40px;
                    padding:5px 0;
                    border-bottom: solid 1px #eee;
                    cursor: pointer;
                    i{
                        color: #666;
                        // margin-right:30px;
                        text-align: center;
                    }
                    &>span{
                        display: inline-block;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        float:left;
                        text-align: center;
                        letter-spacing: 0px;
                        &:nth-of-type(1){
                            color: #777;
                            width:175px;
                            text-align: center;
                        }
                        &:nth-of-type(2){
                            width:500px;
                            color:#999;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            &:hover{
                                color: #00a0e9;
                            }
                        }
                        &:nth-of-type(3){
                            margin-right:30px;
                            width: 120px;
                            text-align: center;
                        }
                        &:nth-of-type(4){
                            margin-right:30px;
                            width: 50px;
                            text-align: center;
                        }
                    }
                    &:nth-of-type(1){
                        background:#f1f1f1;
                        line-height:30px;
                        span{
                            color:#333;
                            &:nth-of-type(2){
                                &:hover{
                                    color:#333;
                                }
                            }
                        }
                    }
                }
            }
            .pageList{
                width:915px;
                margin:30px auto;
                text-align: right;
            }
        }
    }
    .access{
        &>p{
            position:relative;
            top:-20px;
        }
    }

</style>
