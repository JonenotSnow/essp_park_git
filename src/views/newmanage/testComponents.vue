<template>
    <div>
        <temp v-model="value">
            <div slot="slot-part-button">
                <button @click="reset">旋钮</button>
            </div>
        </temp>
    </div>
</template>
<script>
import temp from '../../components/EsspSearchCondition'
export default {
    data() {
        return {
            value:[{
                componentType:"Input",
                value:'请输入内容',
                label:'查看内容'
                
            },
            {
                componentType:"DatePicker",
                value:'',
                label:'查看内容'
                
            },
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
                
            }]
        }
    },
    components:{
        temp
    },
    methods:{
        reset(){
            console.log(this.value)
            this.value.map(item=>{
                item.value = ''
            })
        }
    }
}
</script>
