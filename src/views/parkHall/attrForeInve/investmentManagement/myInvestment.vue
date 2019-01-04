<template>
 <div>
    <!-- 我的招商总入口，重定向到储备招商 -->
    <ul class="mainul esspclearfix" >
        <router-link class="mainli" exact tag="li" v-for="(items,index) in munes" :key="index"  :to="items.linkurl" >{{items.name}}</router-link>
    </ul>
     <transition name="move" mode="out-in">
         <router-view></router-view>
    </transition>
    <!-- <router-view></router-view> -->
 </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "我的招商",
            munes: [
            {
                name: "储备招商",
                linkurl: "/parkHall/manage/myInvestment/reserveInvestment"
            },
            {
                name: "在谈招商",
                linkurl: "/parkHall/manage/myInvestment/followupInvestment"
            },
            {
                name: "已成交招商",
                linkurl: "/parkHall/manage/myInvestment/finishedInvestment"
            },
            {
                name: "搁置招商",
                linkurl: "/parkHall/manage/myInvestment/shelveInvestment"
            }
            ]
        };
    },
    created() {

    },
    methods: {

    }
};
</script>

<style lang='less' scoped >
@import "../../../../assets/css/mixin";
.mainul {
  padding-left:20px;
  .mainli {
    float: left;
    width: 150px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;

    box-shadow: 0 0 5px #ddd;
    &:not(:first-child) {
      border-left: none;
    }
  }
}
.router-link-active {
  text-shadow: 1px 1px 1px #000;
  border: 1px solid #409EFF;
  background: #409EFF;
  color: #fff;
}
</style>
