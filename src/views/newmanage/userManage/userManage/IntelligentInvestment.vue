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
                <el-button type="primary" size="small" @click="getInviteByInfo">查询</el-button>
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
                    path: "/parkIndex/park/all",
                    name: this.utils.isBdPark()?"系统管理":"园区管理"
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
                bngCntyCd: "",
                bngProvCd: "",
                bngCityCd: ""
            },
            rzz:JSON.parse(localStorage.getItem('rzz'))
        };
    },
    created() {
        this.getCasParentList();
        this.getInviteByInfo();
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
            this.getInviteByInfo();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getInviteByInfo();
        },
        handleClick(row) {
            this.$router.push({path:"/parkHall/manage/sendRequest",query:{cstId:row.cstId}});
        },
        getInviteByInfo() {
            let address = '';
            if (this.searchForm.bngProvCd) {
                for (let index = 0; index < this.dataSoure.COM_00001.length; index++) {
                    let item = this.dataSoure.COM_00001[index];
                    if (item.key == this.searchForm.bngProvCd) {
                        this.searchForm.bngProvCd = item.value;
                        break;
                    }
                }
                for (let index = 0; index < this.dataSoure.COM_00002.length; index++) {
                    let item = this.dataSoure.COM_00002[index];
                    if (item.key == this.searchForm.bngCityCd) {
                        this.searchForm.bngCityCd = item.value;
                        break;
                    }
                }
                let bngProvCd = this.searchForm.bngProvCd;
                let bngCityCd = this.searchForm.bngCityCd;
                if (bngProvCd.indexOf('自治区')>-1) {
                    bngProvCd = bngProvCd.slice(0,bngProvCd.length-3);
                }else if(bngProvCd.slice(bngProvCd.length-1,bngProvCd.length == '市')>-1){
                    bngProvCd = bngProvCd.slice(0,bngProvCd.length-1);
                }
                if (',北京,上海,重庆,天津,'.indexOf(','+bngProvCd+',')>-1) {
                    bngCityCd = '';
                    address = bngProvCd+'%';
                }else{
                    if (bngCityCd) {
                        address = bngProvCd+'%'+bngCityCd.slice(0,bngCityCd.length-1) +'%';
                    } else {
                        address = bngProvCd+'%';
                    }
                }
            }
            this.$post(this.$apiUrl.manage.getInviteByInfo, {
                parkId: sessionStorage.getItem("parkId"),
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                idyCode: this.searchForm.indLvl3Cd,
                adress: address
            }).then(response => {
                this.list = response.resultData.list;
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
                bngCntyCd: "",
                bngProvCd: "",
                bngCityCd: ""
            }
            this.getInviteByInfo();
        }
    }
};
</script>

<style>
#IntelligentInvestment .search .el-input__inner {
    height: 40px!important;
    line-height: 40px!important;
    border-radius: 6px!important;
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
</style>
