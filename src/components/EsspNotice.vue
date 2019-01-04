<template>
    <div class="notice-box">
        <el-col :span="22">
            <ul :class="{anim:animate==true}">
                <li v-for='(item, idx) in items' :key="idx">
                    <p v-for='(index, i) in item' :key="i" class="txt-2" style="">{{index}}</p>
                </li>
            </ul>
        </el-col>
        <el-col :span="2">
            <p><img src="../assets/imgs/home/syxsjt.png" class="txt-3" @click="noticeClick()"/></p>
        </el-col>
    </div>
</template>
<script>
    export default {
        name: "",
        props: {
            data: {     //传入的数据
                type: Array,
                default (){
                    return []
                }
            },
            num: {      //每行占几条公告
                type: Number,
                default: 1
            }
        },
        data(){
			return {
                animate:false,
                myVal: "",
                items:[]
			}
        },
        watch:{
            data(val){
                //onsole.log("触发");
                this.getData();
            }
        },
        created(){
            this.getData();
            //onsole.log(this.items);
            
        },
        methods: {
            getData(){
                //初始化数据
                for(let i=0,len=this.data.length;i<len;i+=this.num){
                    if(i+this.num>=len){
                        this.items.push(this.data.slice(i));
                    }else{
                        this.items.push(this.data.slice(i,i+this.num));
                    }
                }
                //默认公告滚动
                if(this.data.length>this.num){
                    this.myVal=setInterval(this.scroll,3000);
                }
            },
			scroll(cb){
                this.animate=true;    
                setTimeout(()=>{ 
                    this.items.push(this.items[0]);
                    this.items.shift();
                    this.animate=false;
                    if(cb){
                        cb();
                    }
                },500);
            },
            //点击滚动，停止默认滚动，结束后再启动
            noticeClick() {
                let self = this;
                if(this.data.length>this.num){
                    if(!self.animate){
                        clearInterval(self.myVal);
                        self.scroll(function(){
                            self.myVal=setInterval(self.scroll,3000);
                        });
                    }
                }
                
            }
		},
    }
</script>
<style lang="less">
    .notice-box{
        text-align: left;
        height: 32px;
        overflow: hidden;
        .anim{
            transition: all 0.5s;
            margin-top: -32px;    
        }
        ul li{
            display: flex;
        }
        .txt-2{
            flex:1;
	        font-family: AdobeHeitiStd-Regular;
	        font-size: 16px;
        	font-weight: normal;
	        font-stretch: normal;
	        line-height: 32px;
	        letter-spacing: 0px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 32px;
            margin-right: 10px;
                     
        }
        .txt-3{
            padding-left: 17.5px;
            padding-right: 17.5px;
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
    
    
</style>