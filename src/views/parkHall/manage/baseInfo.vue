<template>
    <div>
        <baseInfo v-if="isBdPark"></baseInfo>
        <div v-else class="el-main" id="baseInfo">
                <div class="baseInfo">
                    <p>基本信息</p>
                    <ul v-if='writeInfoDis.startDate'>
                        <li>
                            <span><em>*</em>园区名称：</span>
                            <span>{{writeInfo.parkName}}</span>
                        </li>
                        <li>
                            <span><em>*</em>成立时间：</span>
                            <span>{{writeInfoDis.startDate.slice(0,10)}}</span>
                        </li>
                        <li>
                            <span><em>*</em>联系电话：</span>
                            <span>{{writeInfoDis.phoneNumber}}</span>
                        </li>
                        <li>
                            <span><em>*</em>联系邮箱：</span>
                            <span>{{writeInfoDis.email}}</span>
                        </li>
                        <li>
                            <span><em>*</em>占地面积：</span>
                            <span>{{writeInfoDis.ownArea}}</span>
                            <span>平方米</span>
                        </li>
                        <li>
                            <span><em>*</em>所在区域：</span>
                            <span>{{writeInfoDis.city}}</span>
                        </li>
                        <li>
                            <span><em>*</em>园区地址：</span>
                            <span>{{writeInfoDis.detailAddress}}</span>
                        </li>
                    </ul>
                    <ul v-else>
                        <li>
                            <span><em>*</em>园区名称：</span>
                            <span>{{writeInfo.parkName}}</span>
                        </li>
                        <li>
                            <span><em>*</em>成立时间：</span>
                            <span v-if='writeInfoDis.startDate'>
                                {{writeInfoDis.startDate.slice(0,10)}}
                            </span>
                            <span v-else>
                                <el-date-picker  v-model="startDate" type="date" placeholder="成立时间只能设置一次"  value-format="yyyy-MM-dd"></el-date-picker>
                            </span>
                        </li>
                        <li>
                            <span><em>*</em>联系电话：</span>
                            <input type="text" v-model="writeInfo.phoneNumber" placeholder="0000-0000000格式">
                        </li>
                        <li>
                            <span><em>*</em>联系邮箱：</span>
                            <input type="text" v-model="writeInfo.email" placeholder="请输入联系邮箱">
                        </li>
                        <li>
                            <span><em>*</em>占地面积：</span>
                            <input type="text" v-model="writeInfo.ownArea" placeholder=">=1">
                            <span>平方米</span>
                        </li>
                        <li>
                            <span><em>*</em>所在区域：</span>
                            <input type="text" class="addrTS" v-model="writeInfo.city" v-if="!xg" @click="xg=true">
                            <v-distpicker v-else @selected='selected'></v-distpicker>
                        </li>
                        <li>
                            <span><em>*</em>园区地址：</span>
                            <input type="text" v-model="writeInfo.detailAddress" placeholder="请输入详细地址">
                        </li>
                    </ul>
                </div>
                <p class="save hf" v-if='writeInfoDis.startDate'>
                    <el-button type="primary" size="middle" @click="fz">修改</el-button>
                    <el-button type="primary" size="middle" @click="$router.push('/parkHall/manage/selectModule')">下一步</el-button>
                </p>
                <p class="save" v-else>
                    <el-button type="primary" size="middle" @click="saveBaseInfo">下一步</el-button>
                </p>
        </div>
    </div>
</template>

<script>
import baseInfo from '../../newmanage/platformSetup/aboutWe/baseInfo'
import VDistpicker from 'v-distpicker'
export default {
    components:{
        VDistpicker,
        baseInfo
    },
    data () {
        return {
            value1: '',
            startDate:'',
            writeInfo:{
                parkName:this.SSH.getItem('parkName') != null ? this.SSH.getItem('parkName') : '',
                startDate:'',
                phoneNumber:'',
                ownArea:'',
                city: '',
                detailAddress:'',
            },
            writeInfoDis:{
                parkName:'',
                startDate:'',
                phoneNumber:'',
                email:'',
                ownArea:'',
                city: '',
                detailAddress:'',
            },
            addressJson:{},
            province:'',
            show:true,
            show1:true,
            xg:false,
            isBdPark: this.utils.isBdPark(),
        }
    },
    created() {
        this.getParkById()
    },
    methods: {
        // 省市区三级联动
        selected(data){
            this.addressJson = data;
            this.writeInfo.city = data.province.value + data.city.value + data.area.value;
            this.province = data.province.code;
        },
        saveBaseInfo(){
            if (!this.startDate) {
                this.$message({
                    message: '园区成立时间不能为空',
                    type: 'warning'
                });
                return;
            }
            if (!this.writeInfo.phoneNumber) {
                this.$message({
                    message: '联系电话不能为空',
                    type: 'warning'
                });
                return;
            }
            if (this.writeInfo.phoneNumber) {
                let mb= /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                if (!mb.test(this.writeInfo.phoneNumber) ){
                    this.$message({
                        message: '固定电话格式不对',
                        type: 'warning'
                    });
                    return;
                }
            }
            if (!this.writeInfo.email) {
                this.$message({
                    message: '联系邮箱不能为空',
                    type: 'warning'
                });
                return;
            }
            if (this.writeInfo.email) {
                let mb= /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                if (!mb.test(this.writeInfo.email) ){
                    this.$message({
                        message: '联系邮箱格式不对',
                        type: 'warning'
                    });
                    return;
                }
            }
            if (!this.writeInfo.ownArea) {
                this.$message({
                    message: '请输入园区占地面积',
                    type: 'warning'
                });
                return;
            }
            if (this.writeInfo.ownArea<1) {
                this.$message({
                    message: '园区占地面积不能小于1平方米   ',
                    type: 'warning'
                });
                return;
            }
            if (!this.writeInfo.city) {
                this.$message({
                    message: '请输入园区所在区域',
                    type: 'warning'
                });
                return;
            }
            if (!this.writeInfo.detailAddress) {
                this.$message({
                    message: '请输入园区详细地址',
                    type: 'warning'
                });
                return;
            }

            this.$post(this.$apiUrl.manage.updatePark,{
                parkId : window.sessionStorage.getItem("parkId"),
                finishTime:this.startDate.slice(0,10),
                phone:this.writeInfo.phoneNumber,
                parkSize:this.writeInfo.ownArea,
                area:this.writeInfo.city +','+ this.writeInfo.detailAddress,
                province:this.province,
                email:this.writeInfo.email
            })
            .then((response) => {
                this.$message({
                    type: 'success',
                    message: response.resultMsg
                });
                this.$router.push('/parkHall/manage/selectModule')
            })
        },
        getParkById(){
            this.$post(this.$apiUrl.manage.getParkById,{
                parkId : window.sessionStorage.getItem("parkId")
            })
            .then((response) => {
                let j = Object.assign({},response.resultData)
                if (j) {
                    if (j.parkNm) {
                        this.writeInfoDis.parkName = j.parkNm
                    }
                    if (j.setUpTime) {
                        this.writeInfoDis.startDate = j.setUpTime
                        this.startDate = this.writeInfoDis.startDate;
                    }
                    if (j.email) {
                        this.writeInfoDis.email = j.email
                    }
                    if (j.parkAdminTel) {
                        this.writeInfoDis.phoneNumber = j.parkAdminTel
                    }
                    if (j.parkSize) {
                        this.writeInfoDis.ownArea = j.parkSize
                    }
                    if (j.parkPosition) {
                        this.writeInfoDis.city = j.parkPosition.split(',')[0]
                        this.writeInfoDis.detailAddress = j.parkPosition.split(',')[1]
                    }
                    if (j.parkProvinceCode) {
                        this.province =  j.parkProvinceCode
                    }
                }
                this.writeInfo = this.writeInfoDis
            },(err)=>{
                this.$message({
                    type: 'success',
                    message: response.resultMsg
                });
            })
        },
        fz(){
            let aj = this.writeInfoDis;
            this.writeInfoDis = '';
            this.writeInfo = aj;
        }
    },
    watch: {
        '$route':'getParkById'
    }

};
</script>
<style>
    #baseInfo .baseInfo .distpicker-address-wrapper select{
        min-width:120px;
        margin-top:8px;
    }
    #baseInfo .baseInfo .distpicker-address-wrapper select:nth-of-type(1){
        margin-left: 3px;
    }
</style>

<style lang='less' scoped>
    #baseInfo{
        margin-left: 10px;
        width:990px;
        background: #fff;
        min-height:455px;
        padding:0;
        .baseInfo{
            &>p{
                font-size: 24px;
                line-height: 30px;
                margin:42px 0 50px 40px;
                color: #333;
                border-left:10px solid #10b5ff;
                text-indent:22px;
            }
            &>ul{
                width:800px;
                height:auto;
                margin:0 auto;
                li{
                    width:100%;
                    overflow: hidden;
                    line-height:50px;
                    span{
                        font-size: 16px;
                        font-weight: normal;
                        color: #666666;
                        em{
                            color:#ff9900;
                            margin-right:5px;
                        }
                        &:nth-of-type(2){
                            position:relative;
                            // left:-50px;
                            font-size: 14px;
                            color: #666666;
                            display: inline-block;
                        }
                    }
                    input{
                        width: 207px;
                        height: 35px;
                        padding:0 5px;
                        border: solid 1px #ddd;
                        border-radius: 4px;
                        &.addrTS{
                            margin-left:5px;
                        }
                    }
                    &:nth-last-of-type(2){
                        span{
                            float:left;
                        }
                        &>div{
                            margin-left:5px;
                            &>select{
                                margin-top: 8px;
                                &:nth-of-type(1){
                                    margin-left:3px;
                                }
                            }
                        }
                    }
                    &:nth-of-type(1){
                        span{
                            &:nth-of-type(2){
                                left:0;
                            }
                        }
                    }
                    &:nth-last-of-type(1){
                        input{
                            width:470px;
                            border-radius:4px;
                        }
                    }
                    button{
                        margin-left:50px;
                    }
                }
            }
        }
        .save{
            text-align: center;
            margin:80px 0 70px;
            button{
                font-size:16px;
            }
        }
    }

</style>
