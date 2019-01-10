<template>
    <div id="auditDetail">
        <essp-bread-crumb :breadList="breadlist"></essp-bread-crumb>
        <p class='Otitle'>
            <i></i>
            {{typeTitle}}
            <i></i>
        </p>
    </div>
</template>

<script>
import EsspBreadCrumb from "@/components/EsspBreadCrumb";
export default {
    components: {
        EsspBreadCrumb
    },
    props:{
        //引用组件区别字段
        type:{
            type:String,
            default:''
        },
        //引用组件顶部显示字段
        typeTitle:{
            type:String,
            default:''
        },
        //面包屑导航
        breadlist:{
            type:[],
            default:[]
        },
    },
    data() {
        return {
        }
    },
    created() {
        
    },
    methods: {
    },
}
</script>

<style lang='less' scoped>
#auditDetail{
    width:1200px;
    background:#fff;
    margin: 0 auto;
    .Otitle{
        font-size: 24px;
        line-height: 36px;
        margin-bottom:20px;
        margin-top:60px;
        color: #333333;
        text-align: center;
        i {
            display: inline-block;
            width: 70px;
            border: 1px solid #ddd;
            position: relative;
            top: -6px;
        }
    }
    .content{
        width:884px;
        margin: 76px auto 0;
        li{
            margin-bottom:20px;
            .require{
                color:#ff9900;
            }
            .title,.title1{
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0.4px;
                color: #666666;
                display: inline-block;
                width:72px;
                text-align: right;
                margin-right:10px;
            }
            input,select{
                width: 198px;
                height: 35px;
                padding: 0 5px;
                border-radius: 3px;
                border: solid 1px #cccccc;
            }
            select{
                width: 210px;
            }
            textarea{
                width: 700px;
                height: 120px;
                max-width: 700px;
                max-height:120px;
                min-width: 700px;
                min-height:120px;
                border-radius: 3px;
                border: solid 1px #cccccc;
            }
            .sub,.sub1{
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.1px;
                color: #999999
            }
            .sub1{
                margin-top:100px;
                margin-left:14px;
            }
            .title1{
                margin-left:10px;
            }
            .scan{
                display: inline-block;
                width: 100px;
                height: 35px;
                background-color: #e6f4ff;
                border-radius: 3px;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 35px;
                letter-spacing: 0px;
                color: #00a0e9;
                text-align: center;
                margin-left:95px;
                cursor: pointer;
            }
            &.pic{
                overflow: hidden;
                &>span{
                    float: left;
                }
                .avater-uploader{
                    float: left;
                    width: 210px;
                    height: 120px;
                    border-radius: 3px;
                    border: dashed 1px #cccccc;
                    margin-left:8px;
                    .tianjia{
                        display:block;
                        font-size: 40px;
                        margin-left:80px;
                        margin-top:36px;
                    }
                    .detil{
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 30px;
                        letter-spacing: 0px;
                        color: #cccccc;
                        margin-left:80px;
                    }
                }
            }
            &.resume{
                overflow: hidden;
                span{
                    float: left;
                }
                textarea{
                    float: left;
                    margin-left:8px;
                    padding:10px;
                }
            }
            &.editor{
                overflow: hidden;
                span{
                    float: left;
                }
                div{
                    float: left;
                    margin-left:8px;
                    width: 700px;
                    height: 400px;
                    max-width: 700px;
                    max-height:400px;
                    min-width: 700px;
                    min-height:400px;
                    border-radius: 3px;
                    border: solid 1px #cccccc;
                    padding:10px;
                }
            }
        }
    }
    .save{
        padding-bottom: 60px;
        text-align: center;
        width: 884px;
        margin: 40px auto 20px;
        span{
            display: inline-block;
            width: 180px;
            height: 40px;
            background-image: linear-gradient(31deg, 
                #22a2fa 0%, 
                #10b5ff 100%);
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: #ffffff;
            text-align: center;
        }
    }
}
</style>
