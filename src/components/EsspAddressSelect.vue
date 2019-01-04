<template>
    <div>
        <!-- 省市区地址选择组件 -->
        <el-row>
            <el-col :span="7">
                <el-select v-model="provinceKey" placeholder="请选择-" @change="onProvince" :class="{'xq-jgsz__select':type==1}"
                :disabled="disabled">
                    <el-option
                    v-for="item in province"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="7" :offset="setOffset">
                <el-select v-model="cityKey" placeholder="请选择-"  @change="onCity" :class="{'xq-jgsz__select':type==1}"
                 :disabled="disabled">
                    <el-option
                    v-for="item in city"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="7" :offset="setOffset">
                <el-select v-model="areaKey" placeholder="请选择-" @change="onArea" :class="{'xq-jgsz__select':type==1}"
                 :disabled="disabled">
                    <el-option
                    v-for="item in area"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import fn from '../../static/xq_script/fn.js';
import code from '../../static/xq_script/address.js'; //省市区code码
export default {
    // type = 1 会添加一个类,让输入框变小
    // setOffset 第二个和第三个框 向右移动的格数
    // addressCode 必须是一个包含省市区的对象
    // resetStatus 一个数字,>0表示清空目前key值,此方法为监听,所以最好是一个数字,如果不断清空就不断+1
    // disabled 判断当前是否可选
    props:['type','resetStatus','addressCode','setOffset','disabled'],
    data () {
        return {
            totalData:{
                COM_00001:null,
                COM_00002:null,
                COM_00003:null,
            }, //总数据
            province:null, //省
            city:null, //市
            area:null, //区
            provinceKey:null, //选择省的key
            cityKey:null, 
            areaKey:null,
            codeNum:true, //判断code是否是第一次加载
        }
    },
    methods:{
        // 监听省份
        onProvince(val){
            //onsole.log(val)
            // 先将市跟区清空,并且通过key查找市的内容
            this.city = null;
            this.area = null;
            // 告知父组件将数据清空
            this.cityKey = null;
            this.areaKey = null;
            this.city = this.totalData.COM_00002.filter(function(item){
                var key = val.slice(0,2);
                var index = item.key.indexOf(key)
                return (index == 0)
            })

            //onsole.log(this.provinceKey)
            // 派发事件
            this.$emit('setAddress',{province:this.provinceKey,city:this.cityKey,area:this.areaKey});
        },
        // 监听市
        onCity(val){
            //onsole.log('触发了这里')
            // 清空区,并通过key找区的内容
            this.area = null;
            this.areaKey = null;
            //onsole.log(val)
            this.$emit('area',null)

            this.area = this.totalData.COM_00003.filter(function(item){
                var key = val.slice(0,4);
                var index = item.key.indexOf(key)
                return (index == 0)
            })

            this.$emit('setAddress',{province:this.provinceKey,city:this.cityKey,area:this.areaKey});
        },
        onArea(){
            this.$emit('setAddress',{province:this.provinceKey,city:this.cityKey,area:this.areaKey});
        },
        // 过滤数组的方法
        filterArr(){
        }
    },
    created(){

        // console.log(code)
        var data = code;
        // 获取省市区数据
        //onsole.log()
        // var data = this.SSH.getItem('jzfpCode')  
        this.totalData.COM_00001 = data.COM_00001
        this.totalData.COM_00002 = data.COM_00002
        this.totalData.COM_00003 = data.COM_00003


        // 先绑定省份
        this.province = this.totalData.COM_00001

        
        // if(this.addressCode){
        //     var vm = this;
         //onsole.log('触发1',this.addressCode,this.addressCode.province)
        
        //     // vm.provinceKey = vm.addressCode.province;
         //onsole.log(vm.provinceKey)
        // }

    },
    watch:{
        // 监听code值最回调
        addressCode(val){
            if(this.codeNum){
                if(val.province){
                    var vm = this;
                    vm.provinceKey = vm.addressCode.province;

                    this.city = this.totalData.COM_00002.filter(function(item){
                        var key = vm.provinceKey.slice(0,2);
                        var index = item.key.indexOf(key)
                        return (index == 0)
                    })

                    if(this.addressCode.city){
                        this.cityKey = this.addressCode.city;
                        this.area = this.totalData.COM_00003.filter(function(item){
                            var key = vm.cityKey.slice(0,4);
                            var index = item.key.indexOf(key)
                            return (index == 0)
                        })
                        if(this.addressCode.area){
                            this.areaKey = this.addressCode.area;
                        }
                    }
                    this.codeNum = false;
                }
            }     
        },
        //监听是否重置0表示不重置, >0 表示重置
        resetStatus(val){
            //onsole.log('状态',val)
            if(val){
                this.provinceKey = null
                this.cityKey = null
                this.areaKey = null
                this.city = null
                this.area = null
            }
        }
    }
}
</script>

<style>

</style>
