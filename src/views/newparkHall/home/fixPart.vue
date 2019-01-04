<template>
  <!-- 园区首页右侧fixed内容，显示邮箱地址电话 -->
  <div class="contact">
    <div class="item" @mouseover="change(1)" @mouseout="change(1)">
      <img :src="isphone?imgUrlPhone1:imgUrlPhone" alt>
      <div class="tip">{{userDetail.parkAdminTel||"暂无电话"}}</div>
    </div>
    <div class="item" @mouseover="change(2)" @mouseout="change(2)">
      <img :src="isEail?imgUrlEmail1:imgUrlEmail" alt>
      <div class="tip">{{userDetail.email ||"暂无邮件"}}</div>
    </div>
    <div class="item" @mouseover="change(3)" @mouseout="change(3)">
      <img :src="isAdddress?imgUrlAdd:imgUrlAdd1" alt>
      <div class="tip">{{userDetail.parkPosition||"暂无地址"}}</div>
    </div>
    <div class="item" @click="toTop">
      <div class="up">
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
        isAdddress: false,
        isphone: false,
        isEail: false,
        imgUrlPhone: require("@/assets/newparkimg/home/phone-nor.png"),
        imgUrlPhone1: require("@/assets/newparkimg/home/phone-sel.png"),
        imgUrlEmail: require("@/assets/newparkimg/home/mail-nor.png"),
        imgUrlEmail1: require("@/assets/newparkimg/home/mail-sel.png"),
        imgUrlAdd: require("@/assets/newparkimg/home/dizhi.png"),
        imgUrlAdd1: require("@/assets/newparkimg/home/address-nor.png")
    }
  },
  props: {
    userDetail: {
      type: Object,
      default: {
        mail: "暂无邮箱",
        phone: "暂无联系电话",
        address: "暂无地址详情"
      }
    }
  },
  methods: {
    change(type) {
      switch (type) {
        case 1:
          this.isphone = !this.isphone;
          break;
        case 2:
          this.isEail = !this.isEail;
          break;
        case 3:
          this.isAdddress = !this.isAdddress;
          break;
      }
    },
    toTop() {
      // - 回到滚动顶部
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      this.scrollHandle();
    },
    scrollHandle(val) {
      let scorllTop =
        val ||
        window.pageYOffset ||
        document.documentElement.clientTop ||
        document.body.clientTop;
      scorllTop = scorllTop - 60;
      if (scorllTop > 0) {
        document.body.scrollTop = scorllTop;
        document.documentElement.scrollTop = scorllTop;
        let that = this;
        setTimeout(function() {
          that.scrollHandle(scorllTop);
        }, 10);
      } else {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.contact {
  position: fixed;
  right: 0;
  top: 63%;
  width: 50px;
  background-color: #fff;
  border-bottom: solid 1px #999999;
  border-left: solid 1px #999999;
  border-right: solid 1px #999999;
  z-index: 100;
  transform: translateY(-50%);
  .item {
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-top: solid 1px #999999;
    .tip {
      position: absolute;
      width: 130px;
      display: none;
      background-color: #ffffff;
      box-shadow: 1px 2px 3px 0px rgba(0, 102, 179, 0.2),
        -1px -2px 3px 0px rgba(0, 102, 179, 0.2);
      opacity: 0.8;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
      text-align: center;
      padding: 16px 20px;
      top: 0;
      right: 52px;
      overflow-wrap: break-word;
    }
    &:hover {
      background-color: #00a0e9;
      .tip {
        display: block;
      }
    }

    .up {
      width: 50px;
      height: 50px;
      line-height: 50px;
      vertical-align: middle;
      text-align: center;
      transform: rotate(180deg);
      cursor: pointer;
    }
  }
}
</style>

