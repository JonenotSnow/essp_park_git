<template>

    <div>

        <el-dialog :visible.sync="show" width="560px" height="360px" center :before-close="setVisible" id="downLoadExcel">
            <div class="tabletit">
                <p class="title_p">系统正在为你导出表格，导出完毕可点击下载</p>
            </div>
            <div class="downContent"></div>
            <p class="downLoadBtn">
                <a href="" download="true">点击下载</a>
            </p>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        props: {
            //是否显示弹窗
            show: {
                type: Boolean,
                required: true
            },
            //引用该页面的组件类型，最好以组件名称代替，容易区分
            pageType: {
                type: String,
                required: true
            },
            //需要导出的数据唯一字段,数组,传过来之前请先判空
            checkedIds: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
            };
        },
        created() {
        },
        methods: {
            exportData () {
                let params = {
                    id: this.checkedIds.toString()
                };
                this.$post(this.$apiUrl.manageNeed.exportNeedData, params).then(response => {
                    let codestatus = response.resultCode;
                    if (codestatus == "CLT000000000") {
                        this.data = response.resultData;
                    } else {
                        this.$message.info(response.resultMsg);
                    }
                }, err => {
                    this.$message.error("接口异常");
                })
            },
            //关闭弹窗
            setVisible() {
                this.show = false;
                this.$emit("showDialog", {show: this.show});
            }
        },
        watch: {
            show(){
                if (this.show) {
                    this.exportData();
                }
            }
        },
    };
</script>

<style lang='less' scoped>
#downLoadExcel{
    .tabletit {
        text-align: center;
        border-bottom: 1px solid #f5f5f5;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.2px;
        color: #333333;
        .title_p {
            margin: 10px 0 20px 0 ;
            color: #999999;
        }
    }
    .downContent{
        margin:69px auto 0;
        width: 413px;
        height: 50px;
        background-color: #f5f5f5;
        border-radius: 3px;
    }
    .downLoadBtn{
        margin:45px auto 30px;
        text-align: center;
        a{
            display: inline-block;
            width: 277px;
            height: 50px;
            background-image: linear-gradient(21deg, 
                #22a2fa 0%, 
                #10b5ff 100%);
            border-radius: 3px;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 50px;
            letter-spacing: 0.2px;
            color: #fff;
            text-align: center;
            cursor: pointer;
        }
    }
}

</style>
