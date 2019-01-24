
<template>
  <div class="tag">
    <ul class="tag-ul">
      <li v-for="(item,i) in topMenu"
          :key="i">
        <router-link :to={name:item.name}>
          <span v-if="active == item.id"
                class="tag-em">{{item.menu}}<span class="msg"
                  v-show="item.msgShow"></span></span>
          <span v-if="active != item.id">{{item.menu}}<span class="msg"
                  v-show="item.msgShow"></span></span>
        </router-link>
      </li>
      <div class="cc_home"
           @click="back_cc_home"
           v-if="homeShow">
        <img class="cc_img"
             src="../assets/imgs/enterprise/icon_home.png" />
        <div class="cc_txt">橱窗首页</div>
      </div>
    </ul>
  </div>
</template>

<script>
import { apiUrl } from "@/fetch/apiUrl.js";
import bus from "../eventBus";
export default {
  data() {
    return {
      menuName: "",
      topTagMenu: [],
      path: "",
      childId: "",
      homeShow: false,
      topMenu: [],
      active: ""
    };
  },
  watch: {
    $route() {
      this.getTopMenu();
    }
  },
  created() {
    let vm = this;
    this.getTopMenu();
    bus.$on("isRefresh", function(val) {
      vm.getTopMenu();
    });
  },
  methods: {
    async getTopMenu() {
      let name = this.$router.currentRoute.name;
      let menuList = this.SSH.getItem("menuList");
      let menuResource = this.SSH.getItem("menuResource");
      let currentMenu = menuResource[name];
      this.active = currentMenu.menuid.substr(0, 8);
      // if(this.utils.isEmpty(currentMenu)){
      //     this.$message.error('该页面没有配置菜单权限，请配置菜单权限！')
      //     return
      // }
      let firstLevel = this.utils.compareId(
        currentMenu.menuid.substr(0, 2),
        menuList
      );
      let secondLevel = "";
      let thirdLevel = "";
      if (firstLevel != null) {
        secondLevel = this.utils.compareId(
          currentMenu.menuid.substr(0, 4),
          menuList[firstLevel].children
        );
      }
      if (secondLevel != null) {
        thirdLevel = this.utils.compareId(
          currentMenu.menuid.substr(0, 6),
          menuList[firstLevel].children[secondLevel].children
        );
      }
      let tmp =
        menuList[firstLevel].children[secondLevel].children[thirdLevel]
          .children;
      if (
        tmp.length > 0 &&
        tmp[0].name.indexOf("user-") > -1 &&
        tmp[0].name.indexOf("Msg") > -1
      ) {
        let msgData = "";
        await this.$post(apiUrl.user.getNewMsg, {}).then(response => {
          msgData = response.resultData;
        });
        for (let i = 0; i < tmp.length; i++) {
          if (tmp[i].name == "user-sysMsg" && msgData.systemMsg > 0) {
            tmp[i]["msgShow"] = true;
          }
          if (tmp[i].name == "user-businessMsg" && msgData.rqmMsg > 0) {
            tmp[i]["msgShow"] = true;
          }
          if (tmp[i].name == "user-subscribeMsg" && msgData.subMsg > 0) {
            tmp[i]["msgShow"] = true;
          }
        }
      }
      if (tmp.length > 0 && tmp.name === "center-edit") {
        this.homeShow = true;
      }
      this.topMenu = tmp;
    },
    back_cc_home() {
      this.$router.push({
        path: "/centerIndex/showHome"
      });
    }
  }
};
</script>

<style lang='less' scoped>
.tag {
  border-bottom: 2px solid #f2f2f2;
  margin: 0;
  height: 40px;
  line-height: 40px;

  .tag-ul {
    background-color: #fff;
    font-size: 16px;
    li {
      display: inline-block;
      cursor: pointer;
      &:last-child {
        a:after {
          display: none;
        }
      }
      &:only-of-type {
        a:after {
          display: none;
        }
      }
    }
    a {
      background-color: #fff;
      padding: 0 25px;
      color: #666;
      display: block;
      position: relative;
      &:after {
        position: absolute;
        content: " ";
        height: 20px;
        width: 1px;
        top: 10px;
        right: 0;
        background: #e5e5e5;
      }
    }
    a:hover {
      color: #0090f3;
    }
    .tag-em {
      color: #0090f3;
    }
    .tag-span {
      color: #e2e2e2;
      font-size: 16px;
      margin-left: 50px;
    }
  }
  .cc_home {
    cursor: pointer;
    float: right;
    .cc_img {
      display: inline-block;
      margin-top: 4px;
    }
    .cc_txt {
      float: right;
      color: #0090f3;
      font-size: 16px;
    }
  }
}
.msg {
  background: red;
  border-radius: 50%;
  border: 2px solid red;
  position: absolute;
  z-index: 100;
  top: 10px;
  margin-left: 2px;
}
</style>
