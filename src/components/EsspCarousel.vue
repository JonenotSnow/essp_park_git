<template>
    <div class="carousel-box">
        <ul :class="classObject">
            <!-- <li v-for='(item, idx) in items' :key="idx">
                <p v-for='index in item' :key="index.time" style="">{{index.time}}</p>
            </li> -->
            <li v-for='(item, idx) in items' :key="idx">
                <div class="fpjm-list" v-for='(dt, index) in item' :key="index">
                    <div class="fpjm-top">
                        <div class="span-left">
                            <P class="title">{{dt.time}}</P>
                            <p class="center">{{dt.title}}</p>
                        </div>
                        <span class="span-right">
                            <div class="span-img">
                                <img :src="dt.imgUrl" width="100%" height="100%"/>
                            </div>
                        </span>
                    </div>
                    <div class="fpjm-foot">
                        <p class="foot-title">{{dt.content}} </p>
                        <router-link class="foot-look" :to="dt.routerUrl"><span>查看</span></router-link>
                    </div>
                </div>
            </li>
        </ul>
        <div class="fpjm-an">
            <p class="fpzm-an-zuo" @click="carouselClick(true)"><span><img src="../assets/imgs/home/syzqt.png"/></span></p>
            <p class="fpzm-an-you" @click="carouselClick(false)"><span><img src="../assets/imgs/home/syyxt.png"/></span></p>
        </div>
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
                default: 3
            }
        },
        data(){
			return {
                animate:false,
                isleft:false,       //是否向右轮播,默认向左（false）
                classObject: {
                    anim:false,
                    animl: false,
                    animr: false
                },
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
        },
        methods: {
			scroll(cb){
                this.animate=true;
                
                if(this.isleft){
                    this.items.unshift(this.items[this.items.length-1]);
                    this.items.pop();
                    this.classObject.animl = true;
                    // this.classObject.animl = false;
                    setTimeout(()=>{
                        this.classObject.anim = true;
                        this.classObject.animr = true;
                    },30);
                    setTimeout(()=>{ 
                        this.classObject.anim = false;
                        this.classObject.animl = false;
                        this.classObject.animr = false;
                        this.isleft = false;
                        this.animate=false;
                        if(cb){
                            cb();
                        }
                    },500);
                }else{   
                    this.classObject.anim = true;
                    this.classObject.animl = true;
                    setTimeout(()=>{ 
                        this.items.push(this.items[0]);
                        this.items.shift();
                        this.animate=false;
                        this.classObject.anim = false;
                        this.classObject.animl = false;
                        if(cb){
                            cb();
                        }
                    },500);
                }
                
            },
            /** 点击滚动，停止默认滚动，结束后再启动
             * isleft 是否向右轮播
             */
            carouselClick(isleft) {
                let self = this;
                if(this.data.length>this.num){
                    self.isleft = isleft;
                    if(!self.animate){
                        clearInterval(self.myVal);
                        self.scroll(function(){
                            self.myVal=setInterval(self.scroll,10000);
                        });
                    }
                }
            },
            getData() {
                //初始化数据
                this.items = [];
                for(let i=0,len=this.data.length;i<len;i+=this.num){
                    if(i+this.num>=len){
                        this.items.push(this.data.slice(i));
                    }else{
                        this.items.push(this.data.slice(i,i+this.num));
                    }
                }
                //默认公告滚动
                if(this.data.length>this.num){
		            this.myVal=setInterval(this.scroll,10000);
                }
            }
        },
        mounted(){
        }
    }
</script>
<style lang="less">
    .carousel-box{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        .anim{
            transition: all 0.5s;   
        }
        .animl{
            margin-left: -1200px;   
        }
        .animr{
            margin-left: 0px;   
        }
        ul{
            width: 100%;
            height: 390px;
            display: flex;
            overflow: hidden;
            li{
                display: flex;
				width: 1200px;
                flex-shrink: 0;
                justify-content: space-around;
                .fpjm-list{
                    display: inline-block;
                    width: 360px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 9.2px 0.8px rgba(172, 172, 172, 0.3);
                    margin-bottom: 10px;
                    .fpjm-top{
                        background-color: #f5f9fb;
                        border-radius: 10px 10px 0px 0px;
                        position: relative;
                        padding: 30px;
                        .span-left{
                            width: 108px;
                            height: 128px;
                            .title{
                                width: 100%;
                                height: 11px;
                                font-family: AdobeHeitiStd-Regular;
                                font-size: 11px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #aac2d6;
                            }
                            .center{
                                width: 107px;
                                font-family: AdobeHeitiStd-Regular;
                                font-size: 14px;
                                font-weight: 500;
                                font-stretch: normal;
                                line-height: 26px;
                                letter-spacing: 0px;
                                color: #333333;
                                margin-top: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp:3;
                            }

                        }
                        .span-right{
                            position: absolute;
                            top:30px;
                            left: 160px;
                            .span-img{
                                width: 170px;
                                height: 128px;
                            }
                        }
                        
                    }
                    .fpjm-foot{
                        display:-webkit-box;
                        display:box;
                        -webkit-box-orient:vertical;
                        box-orient:vertical;
                        position: relative;
                        width: 360px;
                        height: 192px;
                        background-color: #ffffff;
                        border-radius: 0 0 10px 10px;
                        display: flex;
                        margin: 0 auto;
                        .foot-title{
                            width: 295px;
                            height: 86px;
                            font-family: AdobeHeitiStd-Regular;
                            font-size: 16px;
                            line-height: 30px;
                            color: #666666;
                            // margin: 26px 35px 35px 35px;
                            // text-align: center;
                            // align-items: center;
                            margin: 0 auto;
                            margin-top: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp:3;
                        }
                        .foot-look{
                            position: absolute;
                            bottom: 0;
                            width: 70px;
                            height: 30px;
                            background-color: #ffffff;
                            border-radius: 15px;
                            border: solid 1px #299ffc;
                            margin: 0 259px 30px 31px;
                            // margin-top: 26px;
                            // margin-left: 26px;
                            span{
                                width: 28px;
                                height: 14px;
                                font-family: AdobeHeitiStd-Regular;
                                font-size: 10px;
                                margin-left: 22px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 30px;
                                letter-spacing: 0px;
                                color: #299ffc;
                            }
                        }
                    }
                }
            }
        }
        // 按钮
        .fpjm-an{
            // margin-top: 90px;
            margin:90px auto 8px;
            width: 180px;
            // height: 164px;
            display: flex;
            justify-content:space-between;
            .fpzm-an-zuo{
                width: 60px;
                height: 60px;
                border-radius: 30px;
                background-color: #adddff;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0px 4px 9px 0px rgba(109, 204, 253, 0.3);
                // margin-left: 550px;
                .fpzm-an-zuo img{
                    width: 20px;
                    height: 14px;
                    background-color: #ffffff;
                }
            }
            .fpzm-an-you{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                background-color: #adddff;
                border-radius: 30px;
                box-shadow: 0px 4px 9px 0px rgba(109, 204, 253, 0.3);
                // margin-right: 650px;
                .fpzm-an-you img{
                    width: 20px;
                    height: 14px;
                    background-color: #ffffff;
                
                }
            }
            .fpzm-an-you:hover,.fpzm-an-zuo:hover{
                background-image: linear-gradient(90deg, 
                rgba(76, 194, 253, 0.8) 0%, 
                rgba(57, 175, 253, 0.9) 50%, 
                rgba(40, 158, 252, 0.99) 94%, 
                #289efc 100%), 
                linear-gradient(#ffffff, #ffffff);
                box-shadow: 0px 4px 9.2px 0.8px 
                rgba(173, 221, 255, 0.3);
            }
        }
    }
    
    
</style>