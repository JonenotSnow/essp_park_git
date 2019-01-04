<template>
    <div class="essp-main-cont">

         <div class="pageList">
            <span class="select" v-if="checked==1" @click="selectAll">全选</span>
             <span class="select" v-if="del==1" @click="delAll">删除全部</span>
             <!-- <span class="select" v-if="turn==1" @click="turnAll">需求移交</span> -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'EsspMmainCenter',
        props: {},
        components: {},
        data() {
            return {
                msg: "需求管理",
                currentPage4:5,
                checked: '',
                del: '',
                turn: '',
                isSelectAll: '0',
                mcCardDataList:[
                    {

                    }
                ]
            }
        },
        watch:{
            //  金融机构特有信息
            isSelectAll:function (val) {
                this.$emit("getValue",val)
            }
        },
        created(){
            this.checked = this.$router.currentRoute.meta.ischecked;
            this.del = this.$router.currentRoute.meta.isdel;
            this.turn = this.$router.currentRoute.meta.isturn;
        },
        methods: {
            handleSizeChange(val) {
                //onsole.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //onsole.log(`当前页: ${val}`);
            },
            selectAll(){
                if(this.isSelectAll == '0'){
                    this.isSelectAll = '1'
                }else{
                    this.isSelectAll = '0'
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .essp-main-cont {
        /*本应是770px像素，实际有4个像素的偏差*/
        .cont-launch-new-act{
            height:68px;
            line-height: 68px;
        }
    }
    .pageList {
        float: left;
        width: 96%;
        background: #fff;
        text-align: right;
        padding: 20px 20px 10px;
        /*margin-top: 20px;*/
    }
    .select{
        float: left;
        margin-left: 20px;
    }
</style>
