<template>
    <div class="IntelligentInvestment" id="IntelligentInvestment">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class='content'>
            <div class="wrap">
                <p>
                    <i></i>
                    智能招商推荐
                    <i></i>
                </p>
                <div class="search">
                    <p>
                        <span>填写招商条件</span>
                    </p>
                    <ul>
                        <li>
                            <div>企业所在地：</div>
                            <el-select filterable v-model="searchForm.bngProvCd" placeholder="省份" @change="delete searchForm.bngCityCd;">
                                <el-option v-for="item in dataSoure.COM_00001" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                            <el-select filterable v-model="searchForm.bngCityCd" placeholder="城市">
                                <el-option v-for="item in dataSoure.COM_00002" :key="item.key" :label="item.value" :value="item.key" v-if="searchForm.bngProvCd && item.key.startsWith(searchForm.bngProvCd.slice(0,2))">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <div>所属行业：</div>
                            <el-select filterable v-model="searchForm.indLvl1Cd" placeholder="请选择行业" @change="delete searchForm.indLvl2Cd;delete searchForm.indLvl3Cd" class="el-select_input">
                                <el-option v-for="item in dataSoure.RZZL_00017" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                            <el-select filterable v-model="searchForm.indLvl2Cd" placeholder="请选择行业" @change="delete searchForm.indLvl3Cd">
                                <el-option v-for="item in dataSoure.RZZL_00018" :key="item.key" :label="item.value" :value="item.key" v-if="item.key.startsWith(searchForm.indLvl1Cd)">
                                </el-option>
                            </el-select>
                            <el-select filterable v-model="searchForm.indLvl3Cd" placeholder="请选择行业">
                                <el-option v-for="item in dataSoure.RZZL_00019" :key="item.key" :label="item.value" :value="item.key" v-if="item.key.startsWith(searchForm.indLvl2Cd)">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="seaBtn">
                <el-button type="primary" size="small" @click="queryBriefEntInfos">查询</el-button>
                <el-button type="info" size="small" @click="reset">重置</el-button>
            </p>
            <div class="list">
                <p class='title'>查询结果
                    <span style="padding-left:15px;">已为您查找出
                        <span>{{totalCount}}</span>家企业</span>
                </p>
                <el-table :data="list" min-height='50px' style="width: 100%" :header-cell-style="getRowClass">
                    <el-table-column type="index" label="全部" width="80" align='center'></el-table-column>
                    <el-table-column prop="cstNm" label="企业名称" width="250" align='center'></el-table-column>
                    <el-table-column prop="dtlAdr" label="所属地" width="320" align='center'></el-table-column>
                    <el-table-column label="所属行业" align='center' width="250">
                        <template slot-scope="scope">
                            {{scope.row.idyTpcd | idType(scope.row.idyTpcd)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" align='center'>
                        <template slot-scope="scope">
                            <el-button
                                type="primary" style="font-size: 16px;padding: 6px 7px;
                            background:linear-gradient(31deg,#22a2fa 0%,#10b5ff 100%);
                            border-radius:5px;" size="mini"
                                @click="handleClick(scope.row)"
                            >发送邀请
                            </el-button>
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
        
        <!-- 发送邀请函提示 -->
        <el-dialog :visible.sync="access" width='560px' class='access'>
            <h2 class="titleTips">提示</h2>
            <p class="accessP"><i class="el-icon-warning"></i>&nbsp;&nbsp;确认邀请该企业加入园区？</p>
            <p class="btn">
                <span @click="access = false">取消</span>
                <span @click="inviteMember">确认</span>
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
            totalCount: 0,
            pageNum: 1,
            pageSize: 5,
            list: [],
            breadlist: [
                {
                    path: "/parkHall/manage/baseInfo",
                    name: this.utils.isBdPark()? "系统管理" : "园区管理"
                },
                {
                    path: "/parkHall/manage/userManage",
                    name: "成员管理"
                },
                {
                    path: "/",
                    name: "智能招商推荐"
                }
            ],
            index: "",
            city: "",
            dataSoure: {},
            searchForm: {
                indLvl1Cd: "",
                indLvl2Cd: "",
                indLvl3Cd: "",
                bngProvCd: "",
                bngCityCd: ""
            },
            rzz:JSON.parse(localStorage.getItem('rzz')),
            access:false,
            curcstId:'',//当前邀请企业信用代码
            parkNm:'',// 当前园区名称
        };
    },
    created() {
        this.getCasParentList();
        this.queryBriefEntInfos();
        this.getParkById();
    },
    filters:{
        idType(value){
            let flag = false;
            let rzz = JSON.parse(window.localStorage.getItem('rzz')) || [];
            for (let i = 0; i < rzz.length; i++) {
                if (rzz[i].code == value) {
                    flag = true;
                    return rzz[i].name;
                }
            }
            if(!flag){
                return '未知';
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryBriefEntInfos();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.queryBriefEntInfos();
        },
        handleClick(row) {
            this.access = true;
            this.curcstId = row.cstId;
        },
        queryBriefEntInfos() {
            let address = this.searchForm.bngCityCd ? this.searchForm.bngCityCd:this.searchForm.bngProvCd;
            let job = this.searchForm.indLvl3Cd;
            //如果二级查询存在 三级查询无  取二级查询
            if (!this.searchForm.indLvl3Cd && this.searchForm.indLvl2Cd) {
                job = this.searchForm.indLvl2Cd;
            }
            //如果二级查询不存在 取一级查询
            if (!this.searchForm.indLvl2Cd) {
                job = this.searchForm.indLvl1Cd;
            }
            this.$post(this.$apiUrl.manage.queryBriefEntInfos, {
                entNm:'',
                pageSize: this.pageSize,
                currentPage: this.pageNum,
                nalEncCd: job, //行业
                areaId: address //地址
            }).then(response => {
                this.list = response.resultData && response.resultData.list || [];
                this.totalCount = response.resultData.totalCount;
            });
        },
        // 获取一级下拉框参数数组
        getCasParentList() {
            let that = this;
            this.$post(this.$apiUrl.rqmList.getcasListUrl, {
                codeTypeList: [
                    { type: "RZZL_00017" },
                    { type: "RZZL_00018" },
                    { type: "RZZL_00019" },
                    { type: "COM_00001" },
                    { type: "COM_00002" }
                ]
            }).then(response => {
                if (response.resultMsg === "success") {
                    that.dataSoure = response.resultData;
                }
            });
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return "background:#e6f4ff;color:#333;font-size:16px;";
            }
        },
        reset(){
            this.searchForm = {
                indLvl1Cd: "",
                indLvl2Cd: "",
                indLvl3Cd: "",
                bngProvCd: "",
                bngCityCd: ""
            }
            this.queryBriefEntInfos();
        },
        inviteMember() {
            this.$post(this.$apiUrl.manage.inviteMember, {
                cstId: this.curcstId,
                parkId: sessionStorage.getItem("parkId"),
                parkName: this.SSH.getItem("parkName")
            }).then(response => {
                // if (response.resultCode == "CLT000000000" || response.resultCode == "0000000000") {
                    this.$message({
                        type: "success",
                        message: '邀请函已发送'
                    });
                // }else{
                //     this.$message({
                //         type: "warn",
                //         message: response.resultMsg
                //     });
                // }
            });
            this.access = false;
        },
        getParkById() {
            this.$post(this.$apiUrl.manage.getParkById, {
                parkId: sessionStorage.getItem("parkId")
            }).then(
                response => {
                    this.parkNm = response.resultData.parkNm
                },
                err => {
                    this.$message({
                        type: "warn",
                        message: response.resultMsg
                    });
                }
            );
        },
    }
};
</script>

<style>
#IntelligentInvestment .search .el-input__inner {
    height: 40px!important;
    line-height: 40px!important;
    border-radius: 6px!important;
}

#IntelligentInvestment .access .el-dialog__header {
    display: none;
}

#IntelligentInvestment .access .el-dialog__body {
    overflow: hidden;
    margin: 30px 20px;
}

#IntelligentInvestment .access .el-dialog__body p:nth-of-type(1) {
    line-height: 55px;
}
</style>

<style lang='less' scoped>
.content {
    width: 1200px;
    background: #fff;
    margin: 0 auto 20px;
    .wrap {
        width: 1040px;
        margin: 0 auto;
        overflow: hidden;
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
            position: relative!important;
            height:174px!important;
            & > p {
                height: 50px;
                & > span {
                    // border-bottom: 4px solid #00a0e9;
                    padding-bottom: 5px;
                    font-size: 20px;
                    line-height: 30px;
                    color: #333333;
                }
            }
            & > ul {
                overflow: hidden;
                margin-top: 35px;
                width: 87%;
                margin: 0 auto;
                li {
                    display: inline-block;
                    min-height: 55px;
                    float: left;
                    overflow: hidden;
                    & > div {
                        input {
                            min-width: 120px;
                            height: 35px;
                            background-color: #ffffff;
                            border: solid 1px #cccccc;
                        }
                        &:nth-of-type(1){
                            width:100px;
                            font-size: 16px;
                            color: #666;
                            float: left;
                            line-height:40px;
                            text-align: right;
                        }
                    }
                }
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
}

.pageList {
    width: 1020px;
    margin: 30px auto 0;
    text-align: right;
    padding-bottom: 40px;
}
.access {
    .titleTips {
        text-indent: 36px;
        font-size: 24px;
        color: #555;
        position: relative;
        font-weight: normal;
        top: -12px;
        margin-top: 5px;
        text-align: left;
    }
    .accessP {
        text-indent: 20px;
        text-align: left;
        font-size: 20px;
        color: #333;
        line-height: 30px;
        i {
            font-size: 28px;
            color: #00a0e9;
        }
    }
    .btn {
        margin-top: 35px;
        text-align: right;
        span {
            text-align: center;
            display: inline-block;
            width: 100px;
            height: 35px;
            border-radius: 2px;
            line-height: 35px;
            font-size: 18px;
            cursor: pointer;
            color: #fff;
            letter-spacing: 4.8px;
            &:nth-of-type(1) {
                letter-spacing: 4.8px;
                background: #e6f4ff;
                color: #00a0e9;
            }
            &:nth-of-type(2) {
                margin-left: 55px;
                margin-right:11px;
                background: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
                color: #fff;
            }
        }
    }
}
</style>
