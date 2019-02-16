<template>
    <div id="itemTransfer">
        <!-- 项目转派 -->
        <el-dialog :visible.sync="showItemTransfer"  width='560px' class='removePark' :show-close="false">
            <p class='title'>项目转派</p>
            <div class="manager">
                <div>
                    <p>项目经理：</p>
                    <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="manageName"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.seniorManager ? item.seniorManager:item.lowManager }}</div>
                        </template>
                    </el-autocomplete>
                </div>
            </div>
            <p class="btn">
                <el-button type="primary" size='small' @click="uploadProjectManage">保存</el-button>
                <el-button type="primary" size='small'  @click="changeShow">取消</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:['showItemTransfer','dataItem'],
    data () {
        return {
            manageName: '',
            manageId:'',
            userId: JSON.parse(sessionStorage.getItem("ctData")).userInfo.id,
            parkId: sessionStorage.getItem("parkId"),
            restaurants:[]
        }
    },
    created(){
        this.getPManagerByParkId();
        console.log(this.dataItem);
    },
    methods:{
        changeShow(){
            this.showItemTransfer = false;
            this.$emit('parentShowTransfer',this.showItemTransfer);
        },
        // 获取园区管理员列表
        getPManagerByParkId(){
            this.$post(this.$apiUrl.processTrack.getPManagerByParkId,{
                parkId: this.parkId                    // 园区ID（必填）
            }).then(response => {
                if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                    this.restaurants = response.resultData;
                } else {
                    this.$message.error(response.resultMsg)
                }
            },(response) => {
                this.$message.error(response.resultMsg)
            })
        },
        querySearch(queryString, cb) {

            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                var str = restaurant.seniorManager? restaurant.seniorManager : restaurant.lowManager
                return (str.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
            var name = item.seniorManager ? item.seniorManager : item.lowManager;
            this.manageName =name;
            this.manageId = item.userId;
        },
        uploadProjectManage(){
            var api = this.$apiUrl.investment.addInvest;
            console.log(this.dataItem);
            if(this.manageId == "" || this.manageName == "") {
                this.$message.error("转向经理必填");
                return;
            }
            var pop = {
                id: this.dataItem.id, //招商编号
                projectManager: this.manageId, //项目经理
            };
            this.$post(api, pop).then(
                response => {
                    this.$emit('submitFn',false);
                    this.$alert('转派成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.changeShow();
                            // 转派成功之后刷新列表
                        }
                    });

                },
                err => {
                    this.$message.error(err.resultMsg);
                }
            );
        }
    }
}
</script>

<style lang='less' scoped>
#itemTransfer{
    .removePark{
        .el-dialog__header{
            display:none;
        }
        .el-dialog__body{
            .title{
                height:50px;
                color:#333;
                font-size: 18px;
                text-indent: 20px;
                line-height:50px;
            }
            .manager{
                width:80%;
                margin:0 auto;
                &>div{
                    padding:20px;
                    overflow: hidden;
                    p{
                        font-size: 14px;
                        line-height:40px;
                        float: left;
                    }
                    .el-select{
                        float:left;
                    }
                }
            }
            .btn{
                text-align: right;
            }
        }
    }
}
</style>
