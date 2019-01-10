<template>
    <div class="actauditpage ">
    <!-- 园区报名审核页面 -->
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <div class="common_titwrap esspclearfix">
            <div>
                <h3 class="common_titdes">填写报名信息</h3>
            </div>
        </div>
        <div v-if="isPeo">
            <div class="maincon">
                <div class="esspclearfix tgcon">
                    <span class="tgitem"><label for="">公司名称：</label><em>xxxxxx有限公司</em></span>
                    <span class="tgitem"><label for="">联系人姓名：</label><em>张某某</em></span>
                </div>
                <div class="esspclearfix tgcon">
                    <span class="tgitem"><label for="">公司名称：</label><em>xxxxxx有限公司</em></span>
                    <span class="tgitem"><label for="">联系人姓名：</label><em>张某某</em></span>
                </div>
                <div class="persontip">报名人信息表</div>
                <div>
                    <!-- <div class="applyperson esspclearfix"><span class="spanmain">报名人</span><i class="personsanjiao"></i></div>
                    <div class="detail esspclearfix">
                        <div class="detailitem"><lable class="detaillable">名字 :</lable><em class="detailtxt">张茉茉</em></div>
                        <div class="detailitem"><lable class="detaillable">手机 :</lable><em class="detailtxt">13860715115</em></div>
                        <div class="detailitem"><lable class="detaillable">性别 :</lable><em class="detailtxt">男</em></div>
                        <div class="detailitem"><lable class="detaillable">年龄 :</lable><em class="detailtxt">25</em></div>
                        <div class="detailitem"><lable class="detaillable">岗位 :</lable><em class="detailtxt">开发工程师</em></div>
                        <div class="detailitem"><lable class="detaillable">部门 :</lable><em class="detailtxt">研发部</em></div>
                        <div class="detailitem"><lable class="detaillable">兴趣爱好 :</lable><em class="detailtxt">泡妞</em></div>
                        <div class="detailitem"><lable class="detaillable">毕业学校 :</lable><em class="detailtxt">清华大学</em></div>
                        <div class="detailitem"><lable class="detaillable">邮箱 :</lable><em class="detailtxt">33445566@qq.com</em></div>
                        <div class="detailitem"><lable class="detaillable">地址 :</lable><em class="detailtxt">厦门大学生生世世顶顶顶</em></div>
                    </div> -->
                    <!-- 活动表审核内容区 -->
                    <book-info-table></book-info-table>
                </div>
            </div>
            <div class="newsbtncon newsbtncon1">
                <el-button type="primary" size="mini" round>确定</el-button>
                <el-button type="primary" size="mini" round>取消</el-button>
            </div>
        </div>
        <div v-if="!isPeo">
            <div class="tablecon_wrap">
                <div class="txform">
                    <div class="item_wrap item_wraps esspclearfix">
                        <div class="item">
                            <div class="floats">公司名称：</div>
                            <div class="floats"><el-input v-model="input" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <div class="floats">报名状态：</div>
                            <div class="floats">
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div>
                            <div class="floats">报名日期：</div>
                            <div class="floats">
                                <el-date-picker
                                    v-model="value4"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cxbtn">
                    <el-button size="mini" type="primary" >查询</el-button>
                    <el-button size="mini"   type="info">重置</el-button>
                </div>
                <el-table class="tablecon"
                          ref="multipleTable"
                          :data="tableData3"
                          tooltip-effect="dark"
                          @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="80" class="resultitem"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="ccname"
                        label="公司名称"
                        width="250" class="resultitem">
                    </el-table-column>
                    <el-table-column
                        prop="enlistnum"
                        label="报名人数"
                        width="115"
                        show-overflow-tooltip class="resultitem">
                    </el-table-column>
                    <el-table-column
                        prop="concat"
                        label="公司联系人"
                        width="160"
                        show-overflow-tooltip class="resultitem">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="联系电话"
                        width="160"
                        show-overflow-tooltip class="resultitem">
                    </el-table-column>
                    <el-table-column
                        prop="process"
                        label="报名状态"
                        width="160"
                        show-overflow-tooltip class="resultitem">
                    </el-table-column>
                    <el-table-column
                        prop="handel"
                        label="操作"
                        width="160"
                        show-overflow-tooltip class="resultitem">

                    </el-table-column>
                </el-table>
                <div class="cxbtn1">
                    <el-button size="mini">报表导出</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import BookInfoTable from "@/views/parkHall/activity/bookInfoTable";
import EsspBreadCrumb from "@/components/EsspBreadCrumb"
export default {
    data(){
        return{
            isPeo: false,
            decstitle:"园区报名审核",
            tableData3: [
                {
                    id:0,
                    status:true,
                    ccname:"腾讯股份有限公司",
                    enlistnum:22 ,
                    concat:"周杰伦",
                    tel:13860715111,
                    process:"不通过",
                    handel:"查看"
                },
                {
                    id:1,
                    status:false,
                    ccname:"腾讯股份有限公司",
                    enlistnum:22 ,
                    concat:"周杰伦",
                    tel:13860715111,
                    process:"不通过",
                    handel:"查看"
                },
                {
                    id:2,
                    status:true,
                    ccname:"腾讯股份有限公司",
                    enlistnum:22 ,
                    concat:"周杰伦",
                    tel:13860715111,
                    process:"不通过",
                    handel:"查看"
                }
            ],
            multipleSelection: [],
            input:'',
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }
            ],
            value: '',
            value4: [new Date(2018, 10, 10, 10, 10), new Date(2030, 10, 11, 10, 10)],
            breadlist:[
                {
                    path:'/parkIndex/park/all',
                    name: "园区活动"
                },
                {
                    path:'/parkIndex/park/auditing',
                    name: "我审核的活动"
                },
                {
                    path:'/parkIndex/activityAudit',
                    name: "活动审核"
                }
            ],
        }
    },
    components:{
    
        BookInfoTable,
        EsspBreadCrumb
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }

}
</script>

<style scoped lang="less">
@import "../../../assets/css/mixin";
@com_font_size: 16px;
@con_bg: #fff;

.actauditpage,.tablecon_wrap {
    .essp_width_auto();
    /*margin-top: 20px;*/
}
.tablecon_wrap {
    margin-bottom: 30px;
    background: @con_bg;
    padding-bottom: 50px;
    .el-table {
        border: 1px solid #eee;
    }
}
.tablecon {
    .essp_width_auto(1000px);
}

.acttit {
    margin-bottom: 30px;
}
.maincon {
    padding: 0 6.5%;
    background: @con_bg;
}
.newsbtncon1 {
    padding: 20px 0;
    margin-bottom: 20px;
}
.cxbtn {
    background: #fff;
    text-align: center;
    padding-bottom: 70px;
}
.cxbtn1 {
    .essp_width_auto(1000px);
    padding-top: 24px;
}
.tgcon{
    margin-bottom:15px;
}
.tgitem{
    float: left;
    width:50%;
    label,em{
        font-size: 14px;
        line-height: 30px;
        color: #333;
    }
}
.persontip{
	font-size: @com_font_size;
	line-height: 30px;
    color: #0066b3;
    padding-left:4px;
    border-left:4px solid #0066b3;
    margin-bottom: 15px;
}
.txform {
    .essp_width_auto();
    background: @con_bg;
    .item_wraps .item {
        margin-bottom: 20px;
    }
    .item_wrap {
        padding: 0 100px 35px;
        .floats {
            .esspfloat();
            height: 34px;
            line-height: 34px;
            font-size: @com_font_size;
        }

        .item {
            .esspfloat();
            width: 50%;
            span {
                color: @essp_nav_bg
            }
        }

    }
    .item_wraps {
        padding:  35px 170px;
        .el-date-editor .el-range__icon {
            line-height: 28px;
        }
        .el-date-editor .el-range-separator {
            line-height: 28px;
        }
    }
}

.btncon{
    width:100%;
    margin: 0 auto 20px;
    text-align: center;
}



</style>

