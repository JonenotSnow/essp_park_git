<template>
    <div>
        <el-select v-model="temp">
            <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">

            </el-option>
        </el-select>
    </div>
</template>
<script>

export default {
    props:{
        value:{
            type:Object,
            default:()=>{
                return {
                    value:'',
                }
            }
        },
        options:{
            type:Object,
            default:()=>{
                return {
                    options:[
                        {value:'1',label:'第1选择'},
                        {value:'2',label:'第2选择'},
                        {value:'3',label:'第3选择'}
                    ]
                    
                }
            }
        },
        
    },
    data() {
        return {
            temp:''
        }
    },
    created(){
        this.temp = this.value
    },
    watch:{
        'value':function(val){
            this.temp = this.value
        },
        'temp':function(val){
           this.$emit('input',val)
        }
    }
}
</script>