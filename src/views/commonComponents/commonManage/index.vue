<template>
    <div id="manage">
        <essp-bread-crumb class="detailNav" :breadList="breadlist"></essp-bread-crumb>
        <!--<asideComRoot></asideComRoot>-->
        <essp-left></essp-left>
    </div>
</template>

<script>
    import EsspBreadCrumb from "@/components/EsspBreadCrumb"
    import EsspLeft from "@/components/EsspLeft"
    import asideComRoot from "@/views/parkHall/asideComRoot/index"
    export default {
        name: "",
        components: {
            EsspBreadCrumb,
            asideComRoot,
            EsspLeft
        },
        data() {
            return {
                msg: "园区管理",
                breadlist:[
                    {
                        path: '/parkHall/manage/baseInfo',
                        name: this.utils.isBdPark()?"系统管理":"园区管理"
                    },
                    {
                        path:'/parkIndex/activityDetail',
                        name: "成员管理"
                    }
                ]
            }
        }
    }
</script>

<style lang='less' scoped>
.el-container{
    width:1200px;
    margin:0 auto;
    background: #f5f5f5;
    .aside{
        width:200px;
        .tTitle{
            width: 200px;
            height: 50px;
            background-image: linear-gradient(84deg,#1598ff 0%,#36bffd 100%);
            font-size: 18px;
            line-height: 50px;
            text-align: center;
            color: #ffffff;
        }
        .fNav{
            background: #fff;
            &>li{
                width:200px;
                min-height:50px;
                line-height:50px;
                font-size: 16px;
                color:#333;
                &>p{
                    text-indent: 49px;
                    position: relative;
                    &>i{
                    float:right;
                    position:relative;
                    top:17px;
                    right:41px;
                    }
                }
                &>ul{
                    text-indent:71px;
                    li{
                        font-size: 14px;
                        color:#666;
                    }
                }
            }
        }
    }
    .el-main{
        margin-left: 10px;
        width:990px;
        background: #fff;
        padding:0;
        .baseInfo{
            &>p{
                font-size: 24px;
                line-height: 30px;
                margin:50px 0 50px 40px;
                color: #333;
                border-left:10px solid #10b5ff;
                text-indent:22px;
            }
            &>ul{
                width:800px;
                height:auto;
                margin:0 auto;
                li{
                    overflow: hidden;
                    line-height:30px;
                    &>div{
                        &:nth-of-type(1){
                            width:750px;
                            float: left;
                        }
                        &:nth-of-type(2){
                            width:50px;
                            float: right;
                        }
                    }
                }
            }
        }
        .userManage{
            .userHeader{
                height:50px;
                line-height:50px;
                background-color: #e6f4ff;
                span{
                    overflow: hidden;
                    font-size: 14px;
                    color: #00a0e9;
                    &:nth-of-type(1){
                        float: left;
                    }
                    &:nth-of-type(2){
                        float: right;
                        margin-right:20px;
                    }
                    &>i{
                        margin-left:21px;
                        margin-right:5px;
                    }
                }
            }
            .search{
                &>div{
                    height:54px;
                    overflow: hidden;
                    &>.el-input{
                        width:160px;
                        height:28px;
                        margin:14px 0 0 20px;
                        border-radius:14px;
                        float:left;
                        background:#f8f8f8;
                        .el-input__ingner{
                            background-color: #f8f8f8!important;
                        }
                    }
                    &>i{
                        float:left;
                        position:relative;
                        top:22px;
                        left:-30px;
                        font-size: 20px;
                        cursor: pointer;
                    }
                    &.item{
                        margin:30px 0;
                        overflow: hidden;
                        &>span{
                            float: left;
                            margin-left:20px;
                        }
                        &>ul{
                            width:800px;
                            overflow: hidden;
                            float: left;
                            li{
                                width: 100px;
                                height: 23px;
                                line-height:23px;
                                border-radius: 11px;
                                font-size: 12px;
                                background: #ccc;
                                color: #ffffff;
                                text-align:center;
                                float: left;
                                margin-left:20px;
                                &.active{
                                    background-color: #00a0e9;
                                }
                            }
                        }
                        &>.more{
                            float:right;
                            margin-right:20px;
                            cursor: pointer;
                            color:#666;
                            font-size: 14px;
                            i{
                                margin-left:5px;
                            }
                        }
                    }
                }
            }
            .userList{
                ul{
                    li{
                        width:990px;
                        border-bottom:1px solid #ccc;
                        &>div{
                            width:950px;
                            height: 120px;
                            background-color: #f7f7f7;
                            margin:20px;
                            overflow: hidden;
                            &>img{
                                width:120px;
                                height:120px;
                                float: left;
                            }
                            &>div{
                                &:nth-of-type(1){
                                    margin-left:20px;
                                    float: left;
                                    &>p{
                                        line-height:30px;
                                        &:nth-of-type(1){
                                            font-size: 16px;
                                            color: #444444;
                                        }
                                        &:nth-of-type(2){
                                            font-size: 14px;
                                            color: #666;
                                        }
                                        &:nth-of-type(3){
                                            span{
                                                width: 70px;
                                                height: 20px;
                                                line-height:20px;
                                                border-radius: 10px;
                                                border: solid 1px #999;
                                                margin-left:10px;
                                                text-align: center;
                                                padding:0 5px;
                                                cursor: pointer;
                                                &:nth-of-type(1){
                                                    margin-left:0;
                                                }
                                                em{
                                                    color:#00a0e9;
                                                }
                                            }
                                        }
                                        &:nth-of-type(4){
                                            i{
                                                color:orange;
                                            }
                                        }
                                    }
                                }
                                &:nth-of-type(2){
                                    float: right;
                                    margin-right:75px;
                                    height:80px;
                                    margin-top:18px;
                                    &>p{
                                        width: 80px;
                                        margin:10px 0;
                                        height: 28px;
                                        line-height:28px;
                                        background-color: #00afff;
                                        border-radius: 14px;
                                        font-size: 14px;
                                        color:#fffefe;
                                        text-align: center;
                                        cursor: pointer;
                                        &:hover{
                                            background: rgb(137, 197, 221);
                                        }
                                    }
                                }
                            }
                        }
                        &:nth-of-type(1){
                            border-top:1px solid #ccc;
                        }
                    }
                }
            }
        }
    }
}
.removePark{
    .el-dialog__header{
        display:none;
    }
    .el-dialog__body{
        padding:0;
        &>p{
            &:nth-of-type(1){
                line-height:110px;
                width:520px;
                text-align: center;
                font-size: 20px;
                color: #333333;
                border-bottom: solid 3px #ccc;
            }
            &:nth-of-type(2){
                width: 336px;
                height: 44px;
                margin:50px auto;
                font-size: 16px;
                text-align: center;
                color: #ccc;
            }
            &:nth-of-type(3){
                text-align: center;
                &>button{
                    width: 80px;
                    height: 40px;
                    line-height:0;
                    font-size: 20px;
                    border-radius: 3px;
                    &:nth-of-type(1){
                        margin-right:35px;
                    }
                }
            }
        }
    }
}
</style>
