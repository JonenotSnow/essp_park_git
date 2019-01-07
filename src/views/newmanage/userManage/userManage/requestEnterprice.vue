<template>
    <div class="IntelligentInvestment" id="requestEnterprice">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class='content'>
            <div class="wrap">
                <p>
                    <i></i>
                    邀请企业加入园区
                    <i></i>
                </p>
                <div class="search">
                    <p>
                        <span>企业查询</span>
                        <span @click="toGether = true">批量导入入驻企业</span>
                    </p>
                    <ul>
                        <li>
                            <div>
                                <span>公司名称：</span>
                                <input type="text" placeholder="请输入公司名称" v-model="condition.cstName">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>统一社会信用代码：</span>
                                <input type="text" placeholder="统一社会信用代码" v-model="condition.cstId">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="seaBtn">
                <el-button type="primary" size="small" @click="getCstInfo">查询</el-button>
                <el-button type="info" size="small" @click="rest">重置</el-button>
            </p>
            <div class="list">
                <p class='title'>查询结果
                    <span style="padding-left:15px;">已为您查找出
                        <span>{{totalCount}}</span>家企业</span>
                </p>
                <el-table :data="list" min-height='50px' style="width: 100%" :header-cell-style="getRowClass">
                    <el-table-column type="index" label="全部" width="150" align='center'></el-table-column>
                    <el-table-column prop="cstNm" label="企业名称" width="350" align='center'></el-table-column>
                    <el-table-column label="所属行业" align='center' width="350">
                        <template slot-scope="scope">
                            {{scope.row.idyTpcd | idType(scope.row.idyTpcd)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" align='center'>
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="primary" style="font-size: 16px;padding: 6px 7px;
                            background:linear-gradient(31deg,#22a2fa 0%,#10b5ff 100%);
                            border-radius:5px;" size="mini">发送邀请</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
        <!-- 确认下载 -->
        <el-dialog :visible.sync="toGether" width='520px' height='280px' class='toGether' :show-close='true'>
            <h2></h2>
            <p>下载模板批量导入入驻企业</p>
            <p>
                <a href="/essp_vue/static/excel/applyParkTemp.xlsx">下载模板</a>
                <el-upload ref='upload' class="upload-demo" :show-file-list='false' style="" :before-upload="beforeAvatarUpload" :action='uploads'>
                    上传表格
                </el-upload>
            </p>
        </el-dialog>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
export default {
    components: {
        EsspBreadCrumb
    },
    data() {
        return {
            totalCount:0,
            pageNum:1,
            pageSize:5,
            breadlist: [
                {
                    path: "/parkIndex/park/all",
                    name: this.utils.isBdPark()?"系统管理":"园区管理"
                },
                {
                    path: "/parkHall/manage/userManage",
                    name: "成员管理"
                },
                {
                    path: "/",
                    name: "邀请企业加入园区"
                }
            ],
            list: [],
            show: false,
            index: "",
            uploads: "",
            currentPage: 4,
            toGether: false,
            moduleUrl:'',
            condition:{
                cstName : '',
                cstId : ''
            },
            rzz:JSON.parse(localStorage.getItem('rzz'))
        };
    },
    created() {
        this.uploads = this.$apiUrl.upload.upload;
        this.getCstInfo();
    },
    filters:{
        idType(value){
            let flag = false;
            let rzz = JSON.parse(window.localStorage.getItem('rzz'));
            for (let i = 0; i < rzz.length; i++) {
                if (rzz[i].code == value) {
                    flag = true;
                    return rzz[i].name;
                }
            }
            if(!flag){
                return '其他行业';
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getCstInfo();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getCstInfo();
        },
        getCstInfo() {
            this.$post(this.$apiUrl.manage.getCstInfo, {
                parkId: sessionStorage.getItem("parkId"),
                pageSize : this.pageSize,
                pageNum : this.pageNum,
                cstNm : this.condition.cstName,
                cstId : this.condition.cstId
            }).then(response => {
                this.list = response.resultData.cstInfo;
                this.totalCount = response.resultData.cstInfoCount;
            });
        },
        rest(){
            this.condition = {
                cstName : '',
                cstId : ''
            }
            this.getCstInfo();
        },
        handleClick(row) {
            this.$router.push({path:"/parkHall/manage/sendRequest",query:{cstId:row.cstId}});
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return "background:#e6f4ff;color:#333;font-size:16px;";
            }
        },
        beforeAvatarUpload(file) {
            if (file.type !="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                this.$message.error("上传文件必须为excel文件");
                return;
            }
            let param = new FormData(); // 创建form对象
            param.append("file", file);
            param.append("parkId", sessionStorage.getItem("parkId"));
            param.append("access_token", this.SSH.getItem('token'));

            this.$post(this.$apiUrl.manage.exceclImport, param).then(response => {
                this.$message({
                    type: "success",
                    message: response.resultMsg
                });
                this.toGether = !this.toGether;
            });
            return false; // 返回false不会自动上传
        }
    }
};
</script>
<style>
#requestEnterprice .toGether .el-dialog__header {
    padding: 0;
}
#requestEnterprice th .cell {
    font-weight: normal;
}
#requestEnterprice th button {
    font-size: 16px;
}
#requestEnterprice.el-upload{
    border: solid 1px #cccccc;
    border-radius: 5px;
}
</style>

<style lang='less' scoped>
.content {
    width: 1200px;
    background: #fff;
    margin: 0 auto 20px;
    .wrap {
        width: 1040px;
        height: auto !important;
        margin: 0 auto;
        & > p {
            &:nth-of-type(1) {
                width: 100%;
                margin: 0 auto;
                font-size: 24px;
                line-height: 90px;
                color: #444444;
                text-align: center;
                i {
                    display: inline-block;
                    width: 70px;
                    border: 1px solid #ddd;
                    position: relative;
                    top: -6px;
                }
            }
        }
        .search {
            width: 100%;
            position: relative;
            height:165px;
            & > p {
                height: 50px;
                & > span {
                    // border-bottom: 4px solid #00a0e9;
                    padding-bottom: 5px;
                    font-size: 20px;
                    line-height: 30px;
                    color: #333333;
                    &:nth-of-type(2) {
                        font-size: 14px;
                        color: #00a0e9;
                        float: right;
                        border: none;
                        cursor: pointer;
                    }
                }
            }
            & > ul {
                overflow: hidden;
                margin-top: 35px;
                li {
                    display: inline-block;
                    height: 55px;
                    &:nth-of-type(1) {
                        margin-left: 50px;
                        margin-right: 100px;
                    }
                    float: left;
                    & > div {
                        height: 40px;
                        & > span {
                            font-size: 16px;
                            line-height: 40px;
                            color: #666666;
                        }
                        input {
                            width: 250px;
                            padding:0 5px;
                            height: 35px;
                            background-color: #fff;
                            border-radius: 4px;
                            border: 1px solid #dcdfe6;
                        }
                    }
                }
            }
        }
    }
    .seaBtn {
        text-align: center;
        line-height: 70px;
        button {
            font-size: 16px;
            &:nth-of-type(2) {
                margin-left: 100px;
            }
        }
    }
    .list {
        width: 1020px;
        margin: 0 auto 10px;
        & > p {
            font-size: 16px;
            line-height: 50px;
            color: #333333;
            &>span {
                font-size: 12px;
                line-height: 30px;
                color: #666;
                span {
                    color: #0066b3;
                }
            }
        }
    }
    .pageList {
        width: 1020px;
        margin: 30px auto 0;
        text-align: right;
        padding-bottom: 40px;
    }
}

.toGether {
    .el-dialog__body {
        padding: 0 !important;
        h2{
            height: 5px;
            background-color: #00a0e9;
            position: relative;
            top: -30px;
            width: 520px;
            left: -20px;
        }
        & > p {
            a {
                padding: 8px 13px;
                display: block;
                color: #00a0e9;
                border-radius: 5px;
                width: 74px;
                margin-bottom: 10px;
                font-size: 16px;
                border:1px solid #00a0e9;
                float:left;
                background-image: linear-gradient(0deg,
                #f5f5f5 0%,
                #ffffff 100%);
                text-align: center;
            }
            &:nth-of-type(1) {
                font-size: 20px;
                color: #333333;
                height: 100px;
                line-height: 100px;
                text-align: center;
            }
            &:nth-of-type(2) {
                width:280px;
                margin: 0 auto;
                padding-bottom: 50px;
                overflow: hidden;
                .upload-demo{
                    float:right;
                    width:100px;
                    height:39px;
                    border:1px solid #cccccc;
                    line-height:39px;
                    border-radius:5px;
                    text-align:center;
                    font-size:16px;
                    color:#666;
                    .el-upload--text{
                        border: solid 1px #cccccc;
                        border-radius: 5px;
                    }
                    .el-button--primary{
                        background: linear-gradient(0deg,
                        #f5f5f5 0%,
                        #ffffff 100%)!important;
                        border-color:#fff;
                    }
                    .el-button--small, .el-button--small.is-round {
                        padding:8px 15px 12px 15px;;
                    }
                }
                button {
                    font-size: 16px;
                    color:#666;
                }
            }
        }
    }
}
</style>
