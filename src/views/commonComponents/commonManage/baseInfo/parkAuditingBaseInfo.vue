// 园区基本信息
<template>
    <div class="infobox">
        <div class="themeTit">
            <span class="tittext">{{titleText}}</span>
        </div>
        <div class="itemCon">
            <div class="title">
                <h3 class="common_titdes" style="font-weight: normal">基本信息</h3>
            </div>
        </div>
        <div class="contentList" v-if="infoList && infoList.length>0">
            <p class="common"><span>公司名称：</span><span>{{infoList[0].value}}</span></p>
            <p class="common"><span>所属行业：</span><span>{{infoList[1].value}}</span></p>
            <p class="common"><span>公司地址：</span><span>{{infoList[2].value}}</span></p>
            <p class="common"><span>申请说明：</span><span>{{infoList[3].value}}</span></p>
            <p class="common"><span>联系人姓名：</span><span>{{infoList[4].value}}</span></p>
            <p class="common"><span>联系电话：</span><span>{{infoList[5].value}}</span></p>
            <p class="common" v-if="infoList.length>6" v-for="(it,i) in infoList.slice(6)" :key="i">
                <span>{{it.name}}：</span>
                <textarea v-if="it.inputType && it.inputType == 'textarea' && !it.value.isArray()"></textarea>
                <span v-else-if="it.type == 'dataTime' && it.value  && !Array.isArray(it.value)">{{it.value | timerFormat(it.value)}}</span>
                <span v-else-if="!Array.isArray(it.value)">{{it.value}}{{it.sub?it.sub.slice(3):''}}</span>
                <span v-else-if="Array.isArray(it.value) && it.value.length>0">{{it.value.join(',')}}</span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        titleText: {
            type: String,
            default: "审核详情"
        }
    },
    data() {
        return {
            infoList: {}
        }
    },
    filters: {
        //时间格式化
        timerFormat(vaule) {
            if (!vaule) return;
            var d = new Date(vaule);
            var times = d.getFullYear() +
                '-' + (parseInt((d.getMonth() + 1)) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) +
                '-' + (parseInt(d.getDate()) < 10 ? '0' + d.getDate() : d.getDate());
            return times;
        },
    },
    created() {
        this.getInfo()
    },
    methods: {
        // 获取园区基本信息
        getInfo() {
            this.$post(this.$apiUrl.manage.getCstForm, {
                id: this.$route.query.entityId,
                cstId: this.$route.query.cstId,
            })
            .then((response) => {
                this.infoList = JSON.parse(response.resultData || '[]')
            }, (err) => {
            })
        },
    }
}
</script>
<style lang='less' scoped>
    .infobox {
        padding: 38px 0 0;
        .themeTit {
            position: relative;
            margin-bottom: 20px;
            text-align: center;
            .tittext {
                font-size: 24px;
                line-height: 36px;
                position: relative;
                color: #333333;
                &:before {
                    content: '';
                    position: absolute;
                    width: 68px;
                    left: -83px;
                    top: 16px;
                    border-top: 2px solid #ddd;
                }
                &:after {
                    content: '';
                    position: absolute;
                    width: 68px;
                    right: -83px;
                    top: 16px;
                    border-top: 2px solid #ddd;

                }
            }
        }
    }

    .itemCon {
        padding-left: 100px;
        .title {
            width: 1050px;
            margin: 0 auto;
            overflow: hidden;
            .common_titwrap {
                border-top: none !important;
            }
            h3 {
                margin: 0;
                text-indent: 8px;
                letter-spacing: 4.8px;
                float: left;
                font-size: 20px;
                // margin-left: 55px;
                padding: 0 12px 4px;
                border-left: 10px solid #00a0e9;
            }
        }
    }
    .contentList {
        width: 950px;
        margin: 20px auto;
        & > p.common {
            line-height: 50px;
            overflow: hidden;
            span {
                display: inline-block;
                width: 145px;
                font-size: 16px;
                line-height: 30px;
                color: #666;
                text-align: right;
                margin-right: 10px;
                text-align: right;

                &:nth-of-type(2) {
                    width: 700px;
                    font-size: 16px;
                    /*line-height: 30px;*/
                    color: #333333;
                    text-align: left;
                }
            }
           
            &.texta {
                position: relative;
                overflow: hidden;
                span {
                    float: left;
                }
                textarea {
                    width: 820px;
                    float: left;
                    min-width: 820px;
                    max-width: 820px;
                    padding: 5px;
                    min-height: 140px;
                }
            }
        }
    }
</style>
