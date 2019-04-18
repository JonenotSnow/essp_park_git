<template>
  <div class="content">
      <el-form class="form" :inline="true">
          <el-form-item :label='item.label' v-for="item in value" :key="item.key">
              <component :is="item.componentType" v-model.lazy="item.value" type="datetimerange" 
              :options="item.options?item.options:''"
              :start-placeholder="item.startPlaceholder?item.startPlaceholder:''" :end-placeholder="item.endPlaceholder?item.endPlaceholder:''" :placeholder="item.placeholder" range-separator="至"></component>
          </el-form-item>
        <el-form-item>
            <slot name='slot-part-button'></slot>
        </el-form-item>
      </el-form>
      
     
    </div>
</template>

<script>
/**
 * auto:zyb
 * 引入组件，使用动态去渲染需要的组件，后续有新需求可以动态改动
 * --------------------------------
 * 
 * 使用方式:<temp v-model="value">
            <div slot="slot-part-button">
                <button @click="reset">旋钮</button>
            </div>
        </temp>
        temp 为当前动态模块
    ----------------------------
    插槽name：slot-part-button 插入组件，降低耦合度
 * ---------------------------
 * 使用value为props传入值，需要渲染的组件用数组形式传入
 * input组件------start-------
 * {
                componentType:"Input",
                value:'',
                label:'查看内容'
                
            },
    --------------end---------------
    DatePicker组件------勾选时间组件
    {
                componentType:"DatePicker",
                value:'',
                label:'查看内容'
                
            },
    --------------------------
    select组件参数详情
    {
                componentType:"Select",
                value:"",
                label:'热门标签',
                placeHolder:'请选择标签',
                options:[{
                    label:'选择1',
                    value:"1"
                },{
                    label:'选择2',
                    value:"2"
                },{
                    label:'选择3',
                    value:"3"
                }]
                
            }
 */
import {DatePicker,Input} from 'element-ui'
import Select from './EsspSearchConditionSelect.vue'
export default {
  name: '',
  props:{
    value:{
      type:Array,
      default:()=>{
         return {
             components:[]
        }
      }
    },
    config:{
        type:Object,
        default:()=>{
            return {
            }
        }
    }
  },
  components:{
      DatePicker,Select,Input
  },
  data () {
    return {

    }
  },
  methods: {
      reset(){
          console.log('重置')
          this.$emit('reset')
      },
      search(){
          console.log('查询')
          this.$emit('search')
      }
   
  },
  created () {

  },
  watch: {
      'value':function(val){
          this.$emit('input',val)
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .content{
    // display: flex;
    // justify-content: space-between;
    // .form{
    //     display: flex;
    //         justify-content: flex-start;
    // }
    width: auto;
}
</style>

