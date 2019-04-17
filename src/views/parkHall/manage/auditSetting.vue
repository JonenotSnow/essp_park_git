<template>
    <div class="el-main">
        <div class="baseInfo">
            <p>基本信息</p>
            <ul>
                <li v-for="(it,i) in vipList" :key="i">
                    <div>园区{{it.parkClassName}}级管理员任务池审核权限
                        <span>(开启后，园区{{it.parkClassName}}级管理员拥有任务池审核功能)</span>
                    </div>
                    <el-switch v-model="it.vip" active-value="1" inactive-value="0" active-color="#00a0e9" inactive-color="#ccc" @click.native="updateAuthParam(it)"></el-switch>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            vipList: [
                {
                    id: "0",
                    vip: "0",
                    parkClassName: "初"
                },
                {
                    id: "1",
                    vip: "0",
                    parkClassName: "高"
                }
            ]
        };
    },
    created() {
        this.getAuthParam();
    },
    methods: {
        getAuthParam() {
            this.$post(this.$apiUrl.manage.getAuthParam, {
                parkId: window.sessionStorage.getItem("parkId")
            }).then(response => {
                if (response.resultData) {
                    this.vipList[0].vip = response.resultData.lowAuthStatus;
                }
                if (response.resultData) {
                    this.vipList[1].vip = response.resultData.seniorAuthStatus;
                }
            });
        },
        updateAuthParam(v) {
            this.$post(this.$apiUrl.manage.updateAuthParam, {
                parkId: window.sessionStorage.getItem("parkId"),
                lowAuthStatus: this.vipList[0].vip,
                seniorAuthStatus: this.vipList[1].vip
            }).then(
                response => {
                },
                err => {
                    if (this.vipList[0].vip == 0) {
                        this.vipList[0].vip = 0;
                    } else {
                        this.vipList[0].vip = 1;
                    }
                    if (this.vipList[1].vip == 0) {
                        this.vipList[1].vip = 0;
                    } else {
                        this.vipList[1].vip = 1;
                    }
                }
                
                    // this.getAuthParam();
            );
        }
    }
};
</script>

<style lang='less' scoped>
.el-main {
    margin-left: 10px;
    width: 990px;
    background: #fff;
    min-height: 455px;
    padding: 0;
    .baseInfo {
        & > p {
            font-size: 24px;
            line-height: 30px;
            margin: 50px 0 50px 40px;
            color: #333;
            border-left: 10px solid #10b5ff;
            text-indent: 22px;
        }
        & > ul {
            width: 800px;
            height: auto;
            margin: 0 auto;
            li {
                overflow: hidden;
                line-height: 30px;
                & > div {
                    &:nth-of-type(1) {
                        width: 750px;
                        float: left;
                        font-size: 18px;
                        color: #333333;
                        span {
                            margin-left: 30px;
                            font-size: 14px;
                            color: #999999;
                        }
                    }
                    &:nth-of-type(2) {
                        width: 50px;
                        float: right;
                    }
                }
            }
        }
    }
}
</style>
