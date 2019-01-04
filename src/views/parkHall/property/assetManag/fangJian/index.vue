<template>
    <div class="essp-am-fj-wrap">
        <div class="am-fj-list_page">
            <div class="am-fj-head">
                <div class="am-fj-head-bread-crumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/parkHall/manage/baseInfo' }">园区管理</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/parkHall/merchants/assetManag/projects' }">楼宇项目
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <span role="link" class="el-breadcrumb__inner is-link" @click="goBack()">楼宇</span>
                        </el-breadcrumb-item>
                        <!--<el-breadcrumb-item>楼宇</el-breadcrumb-item>-->
                        <el-breadcrumb-item>房间</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="am-fj-head-add">
                    <el-button type="primary" @click="showPublishPage()">新增房间</el-button>
                </div>
            </div>

            <div class="am-fj-content">
                <div class="am-fj-content-overview">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>楼宇概览</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>-->
                        </div>
                        <div>
                            <div class="am-fj-content-overview-img">
                                <img :src="buildingInfoData.imageUrl?buildingInfoData.imageUrl:noImgUrl">
                            </div>
                            <div class="am-fj-content-overview-detail">
                                <p>楼宇名称：{{buildingName}}</p>
                                <p>建筑总面积：{{buildingInfoData.area}}平方米</p>
                                <p>房间：共{{buildingInfoData.totalRoom}}套，剩余{{buildingInfoData.freeRoom}}套</p>
                                <!--<p>工位：共333个，剩余200个</p>-->
                                <p class="remarks">
                                    备注：{{buildingInfoData.remark || '暂无'}}
                                </p>
                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </el-card>
                </div>

                <div class="am-fj-content-list">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>房间列表</span>
                        </div>
                        <div>
                            <div class="am-fj-content-list-table">
                                <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                    <el-table-column label="房间" width="120px">
                                        <template slot-scope="scope">
                                            <el-button
                                            size="mini" style="min-width:62px;padding: 7px 4px;text-align:center;max-width: 140px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" @click="getDetail(scope.$index, scope.row)">{{scope.row.rname}}</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="evaArea" label="预测面积"></el-table-column>
                                    <el-table-column prop="relArea" label="实测面积"></el-table-column>
                                    <el-table-column prop="countArea" label="计费面积"></el-table-column>
                                    <el-table-column prop="standerPrice" label="标准单价"></el-table-column>
                                    <el-table-column prop="lowestPrice" label="最低单价"></el-table-column>
                                    <!--<el-table-column prop="rentStatus" label="租赁状态" width="120"></el-table-column>-->
                                    <!--<el-table-column label="销售状态" width="100px">-->
                                    <!--<template slot-scope="scope">{{scope.row.sellStatus === 1 ? '已售' : '未售'}}-->
                                    <!--</template>-->
                                    <!--</el-table-column>-->
                                    <el-table-column label="操作" width="100px">
                                        <template slot-scope="scope">
                                            <span @click="update(scope.$index, scope.row)"
                                                  style="margin: 0 3px; cursor: pointer">编辑</span>
                                            <span @click="showDialog_delete(scope.$index, scope.row)"
                                                  style="margin: 0 3px; cursor: pointer">删除</span>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
                                    <p style="margin-top:10px;text-align: center">确定删除该条跟踪信息？</p>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="hairDelete()">确 定</el-button>
                                    </span>
                                </el-dialog>

                            </div>

                            <div class="am-fj-content-list-pagination">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pageNumber"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>

        <div class="am-fj-publish_page">
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form label-width="120px" class="demo-ruleForm" v-if="idType === 'detail'">
                    <el-form-item label="所属项目：">
                        {{projectName}}
                    </el-form-item>
                    <el-form-item label="所属楼宇：">
                        {{buildingName}}
                    </el-form-item>
                    <el-form-item label="房间名称：">
                        {{roomDetail.rname}}
                    </el-form-item>
                    <el-form-item label="所属楼层："> <!-- 用房间号代替 -->
                        {{roomDetail.rno}}
                    </el-form-item>
                    <el-form-item label="预测面积：">
                        {{roomDetail.evaArea}}
                    </el-form-item>
                    <el-form-item label="实测面积：">
                        {{roomDetail.relArea}}
                    </el-form-item>
                    <el-form-item label="计费面积：">
                        {{roomDetail.countArea}}
                    </el-form-item>
                    <el-form-item label="是否自用：">
                        {{roomDetail.isSelf == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="联系人：">
                        {{roomDetail.linkMan}}
                    </el-form-item>
                    <el-form-item label="联系电话：">
                        {{roomDetail.linkPhone}}
                    </el-form-item>
                    <el-form-item label="标准单价：">
                        {{roomDetail.standerPrice}}
                    </el-form-item>
                    <el-form-item label="最低单价：">
                        {{roomDetail.lowestPrice}}
                    </el-form-item>
                    <el-form-item label="是否可租：">
                        {{roomDetail.isRent == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="是否可售：">
                        {{roomDetail.isSell == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="是否虚拟：">
                        {{roomDetail.isDummy == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="租赁状态：">
                        <span v-if="roomDetail.rentStatus == '00'">空闲</span>
                        <span v-if="roomDetail.rentStatus == '01'">已租</span>
                        <span v-if="roomDetail.rentStatus == '02'">预定</span>
                        <!--<span v-if="roomDetail.rentStatus == '03'">已售</span>-->
                    </el-form-item>
                    <!--<el-form-item label="销售状态：">-->
                    <!--{{roomDetail.sellStatus == 1 ? '已售' : '未售'}}-->
                    <!--</el-form-item>-->
                    <el-form-item label="备注：" style="display: block; width: 100%">
                        {{roomDetail.remark}}
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" style="display: block; width: 100%"
                                  v-if="roomDetail.imageUrl">
                        <span class="detail-img" :key="index" v-for="(item, index) in roomDetail.imageUrl.split(',')">
                            <!--<img :src="buildingInfoData.imageUrl?buildingInfoData.imageUrl:noImgUrl">-->
                            <img :src="item">
                        </span>
                    </el-form-item>
                </el-form>

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
                         v-else>
                    <el-form-item label="所属项目：">
                        <!--<el-input v-model="ruleForm.spaceProjectId" readonly="true"></el-input>-->
                        {{projectName}}
                    </el-form-item>
                    <el-form-item label="所属楼宇：">
                        <!--<el-input v-model="ruleForm.buildingId" readonly="true"></el-input>-->
                        {{buildingName}}
                    </el-form-item>
                    <el-form-item label="房间名称：" prop="rname">
                        <el-input v-model="ruleForm.rname" placehofjer="请输入房间名称"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="房间号：" prop="rno">-->
                    <!--<el-input v-model="ruleForm.rno" placehofjer="请输入房间名称"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="所属楼层：" prop="rno"> <!-- 用房间号代替 -->
                        <el-input type="number" v-model="ruleForm.rno" placehofjer="请输入所属楼层"></el-input>
                    </el-form-item>
                    <el-form-item label="预测面积：" prop="evaArea">
                        <el-input type="number" v-model="ruleForm.evaArea" placehofjer="请输入预测面积，单位：平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="实测面积：" prop="relArea">
                        <el-input type="number" v-model="ruleForm.relArea" placehofjer="请输入实测面积，单位：平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="计费面积：" prop="countArea">
                        <el-input type="number" v-model="ruleForm.countArea" placehofjer="请输入计费面积，单位：平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="是否自用：" prop="isSelf">
                        <el-select v-model="ruleForm.isSelf" placehofjer="请选择是否自用">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="linkMan">
                        <el-input v-model="ruleForm.linkMan" placehofjer="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="linkPhone">
                        <el-input type="number" v-model="ruleForm.linkPhone" placehofjer="请输入联系电话"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="入住公司：" prop="inCompany">-->
                    <!--<el-input type="text" v-model="ruleForm.inCompany" placehofjer="请输入入住公司"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="标准单价：" prop="standerPrice">
                        <!--<el-col :span="10">-->
                        <!--<el-input type="number" v-model="ruleForm.standerPrice" placehofjer="请输入标准单价"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col class="line" :span="1">-</el-col>-->
                        <!--<el-col :span="10">-->
                        <!--<el-select v-model="ruleForm.type" placehofjer="请选择单位">-->
                        <!--<el-option label="元/天/平方米" value="1"></el-option>-->
                        <!--<el-option label="元/月/平方米" value="2"></el-option>-->
                        <!--<el-option label="元/年/平方米" value="3"></el-option>-->
                        <!--</el-select>-->
                        <!--</el-col>-->
                        <el-input type="number" v-model="ruleForm.standerPrice" placehofjer="请输入标准单价"></el-input>
                    </el-form-item>
                    <el-form-item label="最低单价：" prop="lowestPrice">
                        <!--<el-col :span="10">-->
                        <!--<el-input type="number" v-model="ruleForm.heightNumber" placehofjer="请输入最低单价"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col class="line" :span="1">-</el-col>-->
                        <!--<el-col :span="10">-->
                        <!--<el-select v-model="ruleForm.type" placehofjer="请选择单位">-->
                        <!--<el-option label="元/天/平方米" value="1"></el-option>-->
                        <!--<el-option label="元/月/平方米" value="2"></el-option>-->
                        <!--<el-option label="元/年/平方米" value="3"></el-option>-->
                        <!--</el-select>-->
                        <!--</el-col>-->
                        <el-input type="number" v-model="ruleForm.lowestPrice" placehofjer="请输入最低单价"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可租：" prop="isRent">
                        <el-select v-model="ruleForm.isRent" placehofjer="请选择是否可租">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可售：" prop="isSell">
                        <el-select v-model="ruleForm.isSell" placehofjer="请选择是否可售">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否虚拟：" prop="isDummy">
                        <el-select v-model="ruleForm.isDummy" placehofjer="请选择是否虚拟">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="租赁状态：" prop="rentStatus">
                        <el-select v-model="ruleForm.rentStatus" placehofjer="请选择租赁状态">
                            <el-option label="空闲" value="00"></el-option>
                            <el-option label="已租" value="01"></el-option>
                            <el-option label="预定" value="02"></el-option>
                            <el-option label="已售" value="03"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="销售状态：" prop="sellStatus">-->
                    <!--<el-select v-model="ruleForm.sellStatus" placehofjer="请选择销售状态">-->
                    <!--<el-option label="已售" value="1"></el-option>-->
                    <!--<el-option label="未售" value="0"></el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="备注：" prop="remark" style="display: block; width: 100%">
                        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="附件上传：" :label-width="formLabelWidth" style="display: block; width: 100%">
                        <el-upload
                            class="upload-demo"
                            :before-upload="beforeUpload"
                            :on-remove="onRemove"
                            :action='uploads'
                            :limit="6"
                            :on-exceed="onExceed"
                            :multiple='true'
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">图片的大小不能超过2MB</div>
                        </el-upload>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">

                    <el-button type="primary" v-if="idType === 'update'" @click="submitForm('ruleForm')">保存修改
                    </el-button>
                    <!--<el-button @click="cancleUpdate('ruleForm')">取消修改</el-button>-->
                    <el-button type="primary" v-if="idType === 'add'" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')" v-if="idType === 'add'">重置</el-button>
                </div>
            </el-dialog>
        </div>


        <div class="am-fj-update_page">
            <el-dialog :title="title" :visible.sync="dialogFormVisible_update">
                <el-form :model="ruleForm_update" :rules="rules" ref="ruleForm_update" label-width="120px"
                         class="demo-ruleForm">
                    <el-form-item label="所属项目：">
                        {{projectName}}
                    </el-form-item>
                    <el-form-item label="所属楼宇：">
                        {{buildingName}}
                    </el-form-item>
                    <el-form-item label="房间名称：" prop="rname">
                        <el-input v-model="ruleForm_update.rname" placehofjer="请输入房间名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属楼层：" prop="rno"> <!-- 用房间号代替 -->
                        <el-input type="number" v-model="ruleForm_update.rno" placehofjer="请输入所属楼层"></el-input>
                    </el-form-item>
                    <el-form-item label="预测面积：" prop="evaArea">
                        <el-input type="number" v-model="ruleForm_update.evaArea"
                                  placehofjer="请输入预测面积，单位：平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="实测面积：" prop="relArea">
                        <el-input type="number" v-model="ruleForm_update.relArea"
                                  placehofjer="请输入实测面积，单位：平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="计费面积：" prop="countArea">
                        <el-input type="number" v-model="ruleForm_update.countArea"
                                  placehofjer="请输入计费面积，单位：平方米"></el-input>
                    </el-form-item>
                    <el-form-item label="是否自用：" prop="isSelf">
                        <el-select v-model="ruleForm_update.isSelf" placehofjer="请选择是否自用">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="linkMan">
                        <el-input v-model="ruleForm_update.linkMan" placehofjer="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="linkPhone">
                        <el-input type="number" v-model="ruleForm_update.linkPhone" placehofjer="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="标准单价：" prop="standerPrice">
                        <el-input type="number" v-model="ruleForm_update.standerPrice" placehofjer="请输入标准单价"></el-input>
                    </el-form-item>
                    <el-form-item label="最低单价：" prop="lowestPrice">
                        <el-input type="number" v-model="ruleForm_update.lowestPrice" placehofjer="请输入最低单价"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可租：" prop="isRent">
                        <el-select v-model="ruleForm_update.isRent" placehofjer="请选择是否可租">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可售：" prop="isSell">
                        <el-select v-model="ruleForm_update.isSell" placehofjer="请选择是否可售">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否虚拟：" prop="isDummy">
                        <el-select v-model="ruleForm_update.isDummy" placehofjer="请选择是否虚拟">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="租赁状态：" prop="rentStatus">
                        <el-select v-model="ruleForm_update.rentStatus" placehofjer="请选择租赁状态">
                            <el-option label="空闲" value="00"></el-option>
                            <el-option label="已租" value="01"></el-option>
                            <el-option label="预定" value="02"></el-option>
                            <el-option label="已售" value="03"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="销售状态：" prop="sellStatus">-->
                    <!--<el-select v-model="ruleForm_update.sellStatus" placehofjer="请选择销售状态">-->
                    <!--<el-option label="已售" value="1"></el-option>-->
                    <!--<el-option label="未售" value="0"></el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="备注：" prop="remark" style="display: block; width: 100%">
                        <el-input type="textarea" v-model="ruleForm_update.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="附件上传：" :label-width="formLabelWidth" style="display: block; width: 100%">
                        <el-upload
                            class="upload-demo"
                            :before-upload="beforeUpload"
                            :on-remove="onRemove"
                            :action='uploads'
                            :multiple='true'
                            :limit="6"
                            :on-exceed="onExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">图片的大小不能超过2MB</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm_update')">保存修改</el-button>
                    <!--<el-button @click="cancleUpdate('ruleForm')">取消修改</el-button>-->
                </div>
            </el-dialog>
        </div>

        <div class="am-fj-detail_page">
            <el-dialog :title="title" :visible.sync="dialogFormVisible_detail">
                <el-form label-width="120px" class="demo-ruleForm">
                    <el-form-item label="所属项目：">
                        {{projectName}}
                    </el-form-item>
                    <el-form-item label="所属楼宇：">
                        {{buildingName}}
                    </el-form-item>
                    <el-form-item label="房间名称：">
                        {{roomDetail.rname}}
                    </el-form-item>
                    <el-form-item label="所属楼层："> <!-- 用房间号代替 -->
                        {{roomDetail.rno}}
                    </el-form-item>
                    <el-form-item label="预测面积：">
                        {{roomDetail.evaArea}}
                    </el-form-item>
                    <el-form-item label="实测面积：">
                        {{roomDetail.relArea}}
                    </el-form-item>
                    <el-form-item label="计费面积：">
                        {{roomDetail.countArea}}
                    </el-form-item>
                    <el-form-item label="是否自用：">
                        {{roomDetail.isSelf == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="联系人：">
                        {{roomDetail.linkMan}}
                    </el-form-item>
                    <el-form-item label="联系电话：">
                        {{roomDetail.linkPhone}}
                    </el-form-item>
                    <el-form-item label="标准单价：">
                        {{roomDetail.standerPrice}}
                    </el-form-item>
                    <el-form-item label="最低单价：">
                        {{roomDetail.lowestPrice}}
                    </el-form-item>
                    <el-form-item label="是否可租：">
                        {{roomDetail.isRent == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="是否可售：">
                        {{roomDetail.isSell == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="是否虚拟：">
                        {{roomDetail.isDummy == 1 ? '是' : '否'}}
                    </el-form-item>
                    <el-form-item label="租赁状态：">
                        <span v-if="roomDetail.rentStatus == '00'">空闲</span>
                        <span v-if="roomDetail.rentStatus == '01'">已租</span>
                        <span v-if="roomDetail.rentStatus == '02'">预定</span>
                        <!--<span v-if="roomDetail.rentStatus == '03'">已售</span>-->
                    </el-form-item>
                    <!--<el-form-item label="销售状态：">-->
                    <!--{{roomDetail.sellStatus == 1 ? '已售' : '未售'}}-->
                    <!--</el-form-item>-->
                    <el-form-item label="备注：" style="display: block; width: 100%">
                        {{roomDetail.remark}}
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" style="display: block; width: 100%"
                                  v-if="roomDetail.imageUrl">
                        <span class="detail-img" :key="index" v-for="(item, index) in roomDetail.imageUrl.split(',')">
                            <!--<img :src="buildingInfoData.imageUrl?buildingInfoData.imageUrl:noImgUrl">-->
                            <img :src="item">
                        </span>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fang-jian',
        props: {},
        components: {},
        data() {

            let checkRname = (rule, value, callback) => {
                let newValue = value.trim();
                let len = newValue.toString().length;
                if (!newValue) {
                    return callback(new Error('请输入房间名称'));
                }
                setTimeout(() => {
                    if (len < 1 || len > 30) {
                        callback(new Error('长度在 1 到 30 个字符'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            let checkEvaArea = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入预测面积'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue <= 0) {
                            callback(new Error('预测面积必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            let checkRelArea = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入真实面积'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue <= 0) {
                            callback(new Error('真实面积必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            let checkCountArea = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入计费面积'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue <= 0) {
                            callback(new Error('计费面积必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            let checkLinkMan = (rule, value, callback) => {
                let newValue = value.trim();
                let len = newValue.toString().length;
                if (!newValue) {
                    return callback(new Error('请输入联系人'));
                }
                setTimeout(() => {
                    if (len < 1 || len > 30) {
                        callback(new Error('长度在 1 到 30 个字符'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            let checkLinkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入联系电话'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue.toString().length != 11) {
                            callback(new Error('联系电话为11位'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            let checkStanderPrice = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入标准单价'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue <= 0) {
                            callback(new Error('标准单价必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            let checkLowestPrice = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入最低单价'));
                }
                setTimeout(() => {
                    let newValue = parseInt(value);
                    if (!Number.isInteger(newValue)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (newValue <= 0) {
                            callback(new Error('最低单价必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };

            return {
                msg: '房间',

                idType: 'add',  // 判断是新增页面还是修改页面

                /**
                 *  房间信息发布---开始
                 **/

                // 新增房间页面字段
                dialogFormVisible: false,
                dialogFormVisible_update: false,
                dialogFormVisible_detail: false,

                title: "创建新房间",
                ruleForm: {
                    // parkId: sessionStorage.getItem("parkId") || "",
                    parkId: "1234556", // 园区Id  ---测试时用
                    // buildingId: '',
                    rname: '',
                    rno: '',    // 代替所属楼层
                    evaArea: '',
                    relArea: '',
                    countArea: '',
                    isSelf: '',
                    linkMan: '',
                    linkPhone: '',
                    inCompany: '',
                    standerPrice: '',
                    lowestPrice: '',
                    isRent: '',
                    isSell: '',
                    isDummy: '',
                    rentStatus: '',
                    sellStatus: '',
                    remark: '',
                    imageUrl: '',

                    addtime: '' // 数据反显时用到
                },
                rules: {
                    // buildingId: [
                    //     {required: true, message: '请输入楼宇编号', trigger: 'blur'},
                    //     {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    // ],
                    rname: [
                        {validator: checkRname, trigger: 'blur'},
                        {required: true, message: '请输入房间名称', trigger: 'blur'}
                    ],
                    rno: [
                        {required: true, message: '请输入所属楼层', trigger: 'blur'},
                        // {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    evaArea: [
                        {validator: checkEvaArea, trigger: 'blur'},
                        {required: true, message: '请输入预测面积', trigger: 'blur'}
                    ],
                    relArea: [
                        {validator: checkRelArea, trigger: 'blur'},
                        {required: true, message: '请输入真实面积', trigger: 'blur'}
                    ],
                    countArea: [
                        {validator: checkCountArea, trigger: 'blur'},
                        {required: true, message: '请输入计费面积', trigger: 'blur'}
                    ],
                    isSelf: [
                        {required: true, message: '请选择是否虚拟', trigger: 'change'}
                    ],
                    linkMan: [
                        {validator: checkLinkMan, trigger: 'blur'},
                        {required: true, message: '请输入联系人', trigger: 'blur'}
                    ],
                    linkPhone: [
                        {validator: checkLinkPhone, trigger: 'blur'},
                        {required: true, message: '请输入联系电话', trigger: 'blur'}
                    ],
                    // inCompany: [
                    //     {required: true, message: '请输入入住公司', trigger: 'blur'},
                    //     {min: 6, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    // ],
                    standerPrice: [
                        {validator: checkStanderPrice, trigger: 'blur'},
                        {required: true, message: '请输入标准单价', trigger: 'blur'}
                    ],
                    lowestPrice: [
                        {validator: checkLowestPrice, trigger: 'blur'},
                        {required: true, message: '请输入最低单价', trigger: 'blur'}
                    ],
                    isRent: [
                        {required: true, message: '请选择是否可租', trigger: 'change'},
                    ],
                    isSell: [
                        {required: true, message: '请选择是否可售', trigger: 'change'},
                    ],
                    isDummy: [
                        {required: true, message: '请选择是否虚拟', trigger: 'change'},
                    ],
                    rentStatus: [
                        {required: true, message: '请选择出租状态', trigger: 'change'},
                    ],
                    // sellStatus: [
                    //     {required: true, message: '请选择出售状态', trigger: 'change'},
                    // ],
                    remark: [
                        // {required: true, message: '请输入备注', trigger: 'blur'},
                        {min: 0, max: 40, message: '长度在 0 到 40 个字符', trigger: 'blur'}
                    ]
                },
                ruleForm_copy: null,
                ruleForm_update: {
                    // parkId: sessionStorage.getItem("parkId") || "",
                    parkId: "1234556", // 园区Id  ---测试时用
                    // buildingId: '',
                    rname: '',
                    rno: '',    // 代替所属楼层
                    evaArea: '',
                    relArea: '',
                    countArea: '',
                    isSelf: '',
                    linkMan: '',
                    linkPhone: '',
                    inCompany: '',
                    standerPrice: '',
                    lowestPrice: '',
                    isRent: '',
                    isSell: '',
                    isDummy: '',
                    rentStatus: '',
                    sellStatus: '',
                    remark: '',
                    imageUrl: '',

                    addtime: '' // 数据反显时用到
                },
                formLabelWidth: '120px',

                // 附件上传
                fileList: [],

                /**
                 *  楼宇信息发布---结束
                 **/

                /**
                 *  楼宇信息列表---开始
                 **/

                //  项目名称
                projectName: null,

                // 查询表格
                ruleFormSearch: {
                    // parkId: sessionStorage.getItem("parkId") || "",
                    remark: ''
                },

                // 楼宇信息
                buildingInfoData: {},
                noImgUrl: require('./projectsPic.jpg'),

                // 房间信息
                buildingId: '',
                tableData: [],


                // 提示框
                dialogVisible: false,
                deleteId: '',

                // 分页
                pageNumber: 0,
                pageSize: 10,
                total: 0,
                /**
                 *  楼宇信息列表---结束
                 **/

                /**
                 *  房间信息列表---开始
                 **/
                // 房间详情
                roomDetail: {
                    parkId: "", // 园区Id  ---测试时用
                    rname: '',
                    rno: '',    // 代替所属楼层
                    evaArea: '',
                    relArea: '',
                    countArea: '',
                    isSelf: '',
                    linkMan: '',
                    linkPhone: '',
                    inCompany: '',
                    standerPrice: '',
                    lowestPrice: '',
                    isRent: '',
                    isSell: '',
                    isDummy: '',
                    rentStatus: '',
                    sellStatus: '',
                    remark: '',
                    imageUrl: '',
                    addtime: '' // 数据反显时用到
                },
                /**
                 *  房间信息列表---结束
                 **/
            }
        },
        methods: {
            goBack() {
                window.history.go(-1);
            },

            //  弹出发布页面
            showPublishPage() {
                this.idType = 'add';
                this.title = "创建新房间";
                this.ruleForm = this.ruleForm_copy;
                this.dialogFormVisible = true;
                this.fileList = [];
                this.$nextTick(() => {
                    this.$refs["ruleForm"].resetFields();
                });
            },

            /**
             * 楼宇信息发布事件------------开始
             */

            //图片上传
            beforeUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png";
                const isLt5M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
                    return isJPG;
                }
                if (!isLt5M) {
                    this.$message.error("上传图片的大小不能超过 2MB!");
                    return isLt5M;
                }
                let param = new FormData();  // 创建form对象
                param.append('file', file);
                param.append('type', 'park');
                param.append('model', 'assetManag');
                var _this = this;

                _this.loading = true;
                this.$post(this.$apiUrl.upload.upload, param).then(response => {
                    this.$message.success("图片上传成功");
                    this.fileList.push(response.resultData[0]);
                }, err => {
                    this.$message.error("接口异常")
                });
                return false // 返回false不会自动上传
            },

            onRemove(file, fileLis) {
                this.fileList = fileLis;
            },
            onExceed() {
                this.$message.warning("图片最多只能上传6张");
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let imageURL = '';

                        for (let i = 0; i < this.fileList.length; i++) {
                            imageURL += this.fileList[i].url;
                            if (i !== this.fileList.length - 1) {
                                imageURL += ',';
                            }
                        }

                        this.ruleForm.imageUrl = imageURL;
                        this.ruleForm_update.imageUrl = imageURL;

                        let params;
                        if (this.idType == 'update') {
                            params = this.ruleForm_update
                        } else {
                            params = this.ruleForm
                        }

                        this.$post("/space/addRoom", params).then(
                            response => {
                                if (response.resultCode === "CLT000000000") {
                                    // this.$message(response.resultMsg);
                                    if (this.idType == 'update') {
                                        this.$message.success("修改房间成功！");
                                    } else {
                                        this.$message.success("创建房间成功！");
                                        this.$refs[formName].resetFields();
                                    }
                                    this.dialogFormVisible = false;
                                    this.dialogFormVisible_update = false;
                                    this.fileList.length = 0;   // 清空图片
                                    this.getfjInfoData(this.pageNumber);
                                }
                            },
                            err => {
                            }
                        );
                    } else {
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
                // this.ruleForm.buildingId = this.buildingId;
            },

            // 修改事件
            update(index, item) {
                this.idType = 'update';
                this.title = "更新房间信息";
                this.dialogFormVisible_update = true;
                if (this.dialogFormVisible_update) {
                    // this.ruleForm = item;
                    this.ruleForm_update = Object.assign({}, item);
                    if (item.imageUrl != null) {
                        this.fileList = (item.imageUrl || "").split(",").map((o, i) => {
                            return {
                                name: o,
                                uid: i,
                                url: o
                            }
                        });
                    } else {
                        this.fileList = [];
                    }
                }
            },

            cancleUpdate(formName) {
                this.dialogFormVisible = false;
                this.idType = 'add';
            },

            // 删除相关事件
            showDialog_delete(index, item) {
                this.dialogVisible = true;
                this.deleteId = item.id
            },

            hairDelete() {
                this.$post("/space/delByRoomId", {
                    // parkId: this.parkId,
                    id: this.deleteId,
                }).then(
                    response => {
                        if (response.resultCode === "CLT000000000") {
                            this.dialogVisible = false;
                            // this.$message(response.resultMsg);
                            this.$message.success('删除成功');
                            this.getfjInfoData(this.pageNumber);
                        }
                    },
                    err => {
                    }
                )
            },


            /**
             * 楼宇信息发布事件------------结束
             */


            /**
             * 楼宇信息列表事件------------开始
             */
            // 查询事件
            search() {
                this.getfjInfoData(this.pageNumber);
            },

            // 根据id获取楼宇
            getBuildingInfoData(builddingId) {
                this.$post("/space/getBuildingById", {id: builddingId}).then(
                    response => {
                        if (response.resultCode === "CLT000000000") {
                            this.buildingInfoData = response.resultData;
                        }
                    },
                    err => {
                    }
                );
            },

            // 获取楼宇信息数据
            getfjInfoData(pageNumber) {
                // 把空值的“键”清除
                for (var key in this.ruleFormSearch) {
                    if (this.ruleFormSearch[key] == '') {
                        delete this.ruleFormSearch[key];
                    }
                }

                // 增加楼宇ID：
                this.ruleFormSearch.buildingId = this.ruleForm.buildingId;

                // 组装数据，加上分页条件

                this.ruleFormSearch.pageNum = pageNumber;
                this.ruleFormSearch.pageSize = this.pageSize;

                this.$post("/space/getRooms", this.ruleFormSearch).then(
                    response => {
                        if (response.resultCode === "CLT000000000") {
                            this.total = response.resultData.count;
                            this.tableData = response.resultData.list;
                        }
                    },
                    err => {
                    }
                );
            },

            // 根据id获取房间
            getDetail(index, item) {
                this.title = "房间详细信息";
                this.dialogFormVisible_detail = true;
                this.roomDetail = item;
            },

            // 分页相关方法
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
                let curVal = val - 1;
                this.getfjInfoData(curVal);
            },

            /**
             * 初始化事件
             */
            init() {

                this.getfjInfoData(this.pageNumber);
            }
            /**
             * 楼宇信息列表事件------------结束
             */
        },
        mounted() {
            this.init();
        },
        created() {

            // 上传接口
            this.uploads = this.$apiUrl.upload.upload;

            this.ruleForm_copy = this.ruleForm;

            let buildingId = this.$route.query.buildingId;
            this.buildingId = this.$route.query.buildingId;
            let buildingName = this.$route.query.buildingName;
            let projectName = this.$route.query.projectName;
            this.ruleForm.buildingId = buildingId;
            this.ruleForm_update.buildingId = buildingId;
            this.buildingName = buildingName;
            this.projectName = projectName;

            // 获取楼宇信息
            this.getBuildingInfoData(buildingId);

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .essp-am-fj-wrap {
        margin: 20px auto;
        padding: 10px;
        width: 1200px;
        background: #fff;
        .am-fj-list_page {
            .am-fj-head {
                position: relative;
                height: 60px;
                border-bottom: 1px solid #ccc;
                .am-fj-head-bread-crumb {
                    position: absolute;
                    top: 25px;
                    left: 10px;
                }
                .am-fj-head-add {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
            }
            .am-fj-content {
                margin-top: 10px;
                .am-fj-content-overview {
                    padding: 10px;
                    .am-fj-content-overview-img {
                        /*display: inline-block;*/
                        float: left;
                        width: 30%;
                        height: 170px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .am-fj-content-overview-detail {
                        /*display: inline-block;*/
                        float: left;
                        margin-left: 20px;
                        padding-top: 10px;
                        width: 67%;
                        height: 170px;
                        p {
                            margin-bottom: 15px;
                            width: 100%;
                        }
                        p.remarks {
                            line-height: 1.7em;
                        }
                    }
                }

                .am-fj-content-list {
                    padding: 10px;
                    .am-fj-content-list-table {
                        .demo-table-expand {
                            font-size: 0;
                        }
                        .demo-table-expand label {
                            text-align: right;
                            width: 120px;
                            color: #99a9bf;
                        }
                        .demo-table-expand {
                            .el-form-item {
                                margin-right: 0;
                                margin-bottom: 0;
                                width: 50%;

                            }
                            .follow-ext.remarks {
                                display: block;
                                width: 100%;
                                .el-form-item__content {
                                    width: 85%;
                                }
                            }
                        }
                        .el-table th {
                            text-align: center;
                        }
                        .el-table__row,
                        .el-table__row.expanded {
                            td {
                                text-align: center;
                            }
                        }
                    }
                    .am-fj-content-list-pagination {
                        margin: 10px;
                        text-align: right;
                    }
                }
            }
        }

        .am-fj-publish_page {
            .el-dialog {
                width: 70%;
                height: 80%;
                overflow: hidden;
                margin: 5% auto 0 !important;
            }
            .el-dialog__body {
                padding: 0 20px;
                height: 74%;
                overflow: auto;
            }
            .el-dialog__header {
                margin-bottom: 20px;
                padding: 10px;
                font-weight: bold;
                background-color: #0f74a8;
                .el-dialog__title {
                    color: #fff;
                }
                .el-dialog__headerbtn {
                    top: 10px;
                }
                .el-dialog__headerbtn .el-dialog__close {
                    color: #fff;
                    font-weight: bold;
                }
            }
            .el-form {
                .el-form-item {
                    display: inline-block;
                    width: 49%;
                    .el-form-item__content {
                        .el-select {
                            width: 100%;
                        }
                        .el-input,
                        .el-textarea {
                            width: 98%;
                        }

                        .upload-demo {
                            width: 90%;
                            .el-upload el-upload--text {
                                display: inline-block;
                            }
                            .el-upload__tip {
                                margin-left: 20px;
                                display: inline-block;
                            }
                        }

                        .detail-img {
                            display: inline-block;
                            width: 150px;
                            height: 150px;
                            margin-right: 10px;
                            border: 1px solid #eee;
                            overflow: hidden;
                            img {
                                width: 100%;
                                min-height: 100%;
                            }
                        }
                    }
                }
            }
        }

        .am-fj-update_page {
            .el-dialog {
                width: 70%;
                height: 80%;
                overflow: hidden;
                margin: 5% auto 0 !important;
            }
            .el-dialog__body {
                padding: 0 20px;
                height: 74%;
                overflow: auto;
            }
            .el-dialog__header {
                margin-bottom: 20px;
                padding: 10px;
                font-weight: bold;
                background-color: #0f74a8;
                .el-dialog__title {
                    color: #fff;
                }
                .el-dialog__headerbtn {
                    top: 10px;
                }
                .el-dialog__headerbtn .el-dialog__close {
                    color: #fff;
                    font-weight: bold;
                }
            }
            .el-form {
                .el-form-item {
                    display: inline-block;
                    width: 49%;
                    .el-form-item__content {
                        .el-select {
                            width: 100%;
                        }
                        .el-input,
                        .el-textarea {
                            width: 98%;
                        }

                        .upload-demo {
                            width: 90%;
                            .el-upload el-upload--text {
                                display: inline-block;
                            }
                            .el-upload__tip {
                                margin-left: 20px;
                                display: inline-block;
                            }
                        }

                        .detail-img {
                            display: inline-block;
                            width: 150px;
                            height: 150px;
                            margin-right: 10px;
                            border: 1px solid #eee;
                            overflow: hidden;
                            img {
                                width: 100%;
                                min-height: 100%;
                            }
                        }
                    }
                }
            }
        }

        .am-fj-detail_page {
            .el-dialog {
                width: 70%;
                height: 80%;
                overflow: hidden;
                margin: 5% auto 0 !important;
            }
            .el-dialog__body {
                padding: 0 20px;
                height: 74%;
                overflow: auto;
            }
            .el-dialog__header {
                margin-bottom: 20px;
                padding: 10px;
                font-weight: bold;
                background-color: #0f74a8;
                .el-dialog__title {
                    color: #fff;
                }
                .el-dialog__headerbtn {
                    top: 10px;
                }
                .el-dialog__headerbtn .el-dialog__close {
                    color: #fff;
                    font-weight: bold;
                }
            }
            .el-form {
                .el-form-item {
                    display: inline-block;
                    width: 49%;
                    .el-form-item__content {
                        .el-select {
                            width: 100%;
                        }
                        .el-input,
                        .el-textarea {
                            width: 98%;
                        }

                        .upload-demo {
                            width: 90%;
                            .el-upload el-upload--text {
                                display: inline-block;
                            }
                            .el-upload__tip {
                                margin-left: 20px;
                                display: inline-block;
                            }
                        }

                        .detail-img {
                            display: inline-block;
                            width: 150px;
                            height: 150px;
                            margin-right: 10px;
                            border: 1px solid #eee;
                            overflow: hidden;
                            img {
                                width: 100%;
                                min-height: 100%;
                            }
                        }
                    }
                }
            }
        }

    }
</style>
