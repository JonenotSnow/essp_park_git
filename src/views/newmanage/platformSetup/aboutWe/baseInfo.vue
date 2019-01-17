<template>
    <div class="el-main" id="baseInfo2">
        <div class="baseInfo">
            <p>关于我们</p>
            <div class="step">
                <div v-for="(item,i) in step" :key="i" :class="{'font':i<2}">
                    <div class="wrap" :class="{'active':stepType == item.id}" @click="getCurStepId(item.id)">
                        <span class="border"></span>
                        <span class="number">{{item.id}}</span>
                        <span class="title">{{item.title}}</span>
                        <span class='line' v-if="i != 2"></span>
                    </div>
                </div>
            </div>
        </div>
        <parkInfoSet v-if="stepType == 1" @sendStepType = 'sendStepType'></parkInfoSet>
        <selectModule v-if="stepType == 2"></selectModule>
    </div>
</template>

<script>
import parkInfoSet from './parkInfoSet'
import selectModule from './selectModule'
export default {
    components:{
        parkInfoSet,
        selectModule
    },
    data () {
        return {
            writeInfo:{},
            step:[
                {
                    id:1,
                    title:'基本信息'
                },
                {
                    id:2,
                    title:'选择模板'
                },
                {
                    id:3,
                    title:'完善模板'
                }
            ],
            stepType:'1', 
            firstSetModel: '1'
        }
    },
    created() {
        this.getParkById();
    },
    methods: {
        sendStepType(value){
            this.stepType = value;
        },
        //获取当前步骤
        getCurStepId(id){
            //如果没完善园区信息
            if (id != 1 && !this.writeInfo.setUpTime) {
                this.$message({
                    type: 'warning',
                    message: "请先完善园区信息"
                });
                return;
            }
            this.stepType = id;
        },
        
        getParkById(){
            this.$post(this.$apiUrl.manage.getParkById,{
                parkId : window.sessionStorage.getItem("parkId")
            })
            .then((response) => {
                this.writeInfo = Object.assign({},response.resultData);
                //如果没完善园区信息
                if (response.resultData && !response.resultData.setUpTime) {
                    this.$message({
                        type: 'warning',
                        message: "请先完善园区信息"
                    });
                    return;
                };
                //如果第一次设置模板，直接跳过模板选择，默认模板一
                if (response.resultData && (response.resultData.parkSet2 == "default2" || response.resultData.parkSet == "default1") ) {
                    this.firstSetModel = '1';
                    return;
                };
                //如果非第一次设置模板，上次设置模板一
                if (response.resultData.parkService == "1") {
                    this.firstSetModel = '1';
                    return;
                };
                //如果非第一次设置模板，上次设置模板二
                if (response.resultData && response.resultData.parkService == "2" ) {
                    this.firstSetModel = '2';
                    return;
                };
            },(err)=>{
                this.$message({
                    type: 'success',
                    message: response.resultMsg
                });
            })
        },
    },
    watch: {
        stepType(){
            if (this.stepType == 3) {
                if (this.firstSetModel == '1') {
                    this.$router.push({path:'/parkHall/manage/scanModelOne',query:{moduleType:1}});
                }else{
                    this.$router.push({path:'/parkHall/manage/scanModelTwo',query:{moduleType:2}});
                }
            }
        }
    },

};
</script>

<style lang='less' scoped>
    #baseInfo2{
        margin-left: 10px;
        width:990px;
        background: #fff;
        min-height:455px;
        padding:0;
        .baseInfo{
            &>p{
                font-size: 18px;
                line-height: 30px;
                margin:42px 0 50px 40px;
                color: #333;
                border-left:8px solid #10b5ff;
                text-indent:22px;
                letter-spacing: 3.6px;
                font-weight:700;
            }
            .step{
                width:921px;
                margin:0 auto;
                height:70px;
                overflow: hidden;
                &>div{
                    float: left;
                    position: relative;
                    &:nth-of-type(1){
                        margin-left:56px;
                    }
                    &.font{
                        width:370px;
                    }
                    span{
                        display: inline-block;
                    }
                    .border{
                        width: 30px;
                        height: 30px;
                        background-color: #ffffff;
                        border: solid 2px #ccc;
                        border-radius:50%;
                    }
                    .number{
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #ccc;
                        position: relative;    
                        left: -27px;
                        top: -9px;
                    }
                    .title{
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #ccc;
                        position: relative;    
                        left: -53px;
                        top: 30px;
                    }
                    .line{
                        width: 336px;
                        height: 2px;
                        background-color: #cccccc;    
                        position: relative;
                        left: 34px;
                        top: -35px;
                    }
                    .wrap{
                        width:125px;
                    }
                    .wrap:hover,.active{
                        width:125px;
                        cursor: pointer;
                        .number,.title{
                            color:#00a0e9;
                        }
                        .border{
                            border: solid 2px #00a0e9;
                        }
                    }
                }
            }
        }
    }

</style>
