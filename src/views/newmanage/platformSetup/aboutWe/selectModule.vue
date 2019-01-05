<template>
    <div class="el-main">
        <div class="baseInfo">
            <p>选择模板</p>
            <div class="selectItem">
                <p>请选择您需要的模版</p>
                <p>主模块信息待编辑</p>
                <ul>
                    <li @click="moduleType = 1">
                        <img v-if="moduleType == 1" src="@assets/module1_sel.png" alt="">
                        <img v-else src="@assets/module1_nor.png" alt="">
                    </li>
                    <li @click="moduleType = 2">
                        <img v-if="moduleType == 2" src="@assets/module2_sel.png" alt="">
                        <img v-else src="@assets/module2_nor.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <p class="save">
            <span v-if="moduleType == 1" @click="$router.push({path:'/parkHall/manage/scanModelOne',query:{moduleType:1}})">下一步</span>
            <span v-else @click="$router.push({path:'/parkHall/manage/scanModelTwo',query:{moduleType:2}})">下一步</span>
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value1: '',
            moduleType:'1'
        }
    }
};
</script>

<style lang='less' scoped>
    .el-main{
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
            .selectItem{
                width: 610px;
                height: 480px;
                margin:0 auto;
                &>p{
                    text-align: center;
                    font-size: 22px;
                    color: #000000;
                    &:nth-of-type(2){
                        font-size: 12px;
                        color: #999999;
                        margin:10px 0 45px;
                    }
                }
                &>ul{
                    overflow: hidden;
                    li{
                        float:left;
                        cursor: pointer;
                        &:nth-of-type(2){
                            float:right;
                        }
                    }
                }
            }

        }
        .save{
            text-align: center;
            margin:40px 0 80px;
            span{
                display:inline-block;
                width: 277px;
                height: 50px;
                background-image: linear-gradient(21deg,  #22a2fa 0%, #10b5ff 100%),
                linear-gradient(#00a0e9,  #00a0e9);
                background-blend-mode: normal, normal;
                border-radius: 3px;
                line-height:50px;
                font-size: 18px;
                color: #ffffff;
                cursor: pointer;
            }
        }
    }

</style>
