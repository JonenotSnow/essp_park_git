<template>
    <div class="tablemain">
        <!-- 报名表界面 -->
        <div class="tablemain_item" v-for="(item,index) in nrollFormList">
            <div class="tabletit">
                <img src="../assets/imgs/avatar.jpg" alt="" class="avatarlogo">
                <p>报名人修改测试</p>
            </div>
            <div class="tabmain">
                <div class="itemdiv">
                    <label for=""><em class="importanticon">*</em>姓名</label>
                    <input type="text" v-model="item.username">
                </div>
                <div class="itemdiv">
                    <label for=""><em class="importanticon">*</em>手机</label>
                    <input type="text" v-model="item.tel">
                </div>
                <div class="itemdiv">
                    <label for=""><em class="importanticon">*</em>职位</label>
                    <input type="text" v-model="item.job">
                </div>
                <div class="itemdiv">
                    <label for=""><em class="importanticon">*</em>公司</label>
                    <input type="text" v-model="item.company">
                </div>
                <div class="itemdiv">
                    <label for=""><em class="importanticon">*</em>期望从活动中获得哪些信息</label>
                    <input type="text" v-model="item.getInfo">
                </div>
                <div class="itemdiv">
                    <el-button round class="tablebtn" size="mini">保存并收起</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                nrollFormList:[
                    {
                        username: "小王",
                        tel:'223232',
                        job:'总经理',
                        company: '小电视机',
                        getInfo:'dadfada'
                    },
                    {
                        username: "小李",
                        tel:'223232',
                        job:'总经理',
                        company: '小电视机',
                        getInfo:'dadfada'
                    },
                ]
            }
        },
        computed: {

        },
        components: {

        }
    }
</script>

<style lang='less' scoped >
    @import "../assets/css/mixin";
    .tablemain{
        overflow: hidden;
        .essp_width_auto();
        background: #fff;
        padding-top: 74px;
        /*padding-bottom: 55px;*/
        .tablemain_item {
            padding-top: 74px;
            position: relative;
            border: 1px solid #ccc;
            width: 1000px;
            margin: 0 auto ;
            .esspborder-radius(5px);
            margin-bottom: 100px;
        }
    }
    .tabletit{
        position: absolute;
        left: 50%;
        margin-left: -45px;
        top: -50px;
        text-align: center;
        z-index: 1;
        .avatarlogo{
            width:78px;
            height:78px;
        }
    }
    .tabmain{
        padding:0 28%;
        .itemdiv{
            label{
                display: block;
                margin-bottom: 10px;
                padding:0 5px;
                font-size: 16px;
                color: #ccc;
            }
            .importanticon{
                color:#ff9900;
                margin-right: 5px;
            }
            input{
                display: block;
                width:530px;
                height:35px;
                margin-bottom: 10px;
                padding: 0 10px;
            }

        }
        .tablebtn{
            display: block;
            margin:20px auto 20px;
        }



    }



</style>
