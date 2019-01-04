<template>
  <div :class="esspTopShow ? 'indexother' : 'indexpark' ">
    <div class="active_index ">
      <div class="esspclearfix">
        <div class="content_l fd active_l">
          <essp-aside :title="asidetitle"
                      :activeList="leftMenu"></essp-aside>
        </div>
        <div class="content_r"
             v-if="!esspTopShow">
          <router-view />
        </div>
        <div class="content_r"
             v-if="esspTopShow">
          <div class="content_r_main">
            <essp-tob-tag />
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EsspAside from "@/components/EsspAside";
import EsspTobTag from "@/components/EsspTobTag";
export default {
  name: "",
  components: {
    EsspTobTag,
    EsspAside
  },
  data() {
    return {
      asidetitle: "",
      leftMenu: [],
    };
  },
  watch: {
    $route() {
      this.getLeftMenu();
    }
  },
  created() {
    this.getLeftMenu();
  },
  computed:{
    esspTopShow(){
      let defaultVal =false;
      let name = this.$router.currentRoute.name;
      if (name.indexOf("park") > -1) {
        defaultVal = false;
      } else {
        defaultVal = true;
      }
      return defaultVal;
    }

  },
  methods: {
    getLeftMenu() {
      let name = this.$router.currentRoute.name;
      let menuList = this.SSH.getItem("menuList");
      let menuResource = this.SSH.getItem("menuResource");
      let currentMenu = menuResource[name];
      // if(this.utils.isEmpty(currentMenu)){
      //     this.$message.error('该页面没有配置菜单权限，请配置菜单权限！')
      //     return
      // }
      let tmp = [];
      this.leftMenu = [];
      let firstLevel = this.utils.compareId(
        currentMenu.menuid.substr(0, 2),
        menuList
      );
      let secondLevel = "";
      if (firstLevel != null) {
        secondLevel = this.utils.compareId(
          currentMenu.menuid.substr(0, 4),
          menuList[firstLevel].children
        );
      }
      if (
        firstLevel == null ||
        secondLevel == null ||
        menuList[firstLevel].name.indexOf("&") > -1
      ) {
        for (let i = 0; i < menuList[firstLevel].children.length; i++) {
          for (
            let j = 0;
            j < menuList[firstLevel].children[i].children.length;
            j++
          ) {
            tmp.push(menuList[firstLevel].children[i].children[j]);
          }
        }
        this.leftMenu = {
          title: menuList[firstLevel].children[0].menu,
          firstList: tmp
        };
      } else if (
        menuList[firstLevel].children[secondLevel].children[0].id.length == 8
      ) {
        this.asidetitle = menuList[firstLevel].children[secondLevel].menu;
        for (
          let i = 0;
          i < menuList[firstLevel].children[secondLevel].children.length;
          i++
        ) {
          tmp.push(menuList[firstLevel].children[secondLevel].children[i]);
        }
        this.leftMenu = tmp;
      } else if (
        menuList[firstLevel].children[secondLevel].children[0].id.length == 6
      ) {
        for (
          let i = 0;
          i < menuList[firstLevel].children[secondLevel].children.length;
          i++
        ) {
          tmp.push(menuList[firstLevel].children[secondLevel].children[i]);
        }
        this.leftMenu = {
          title: menuList[firstLevel].children[secondLevel].menu,
          firstList: tmp
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/mixin";
.indexother{
    background-color: #fff;
}
.indexpark{
  background-color: #f5f5f5;
}
.active_index {
  .essp_width_auto();
  padding-bottom: 20px;
  padding-top: 20px;
}

.content_r {
  background-color: #fff;
}

.fd {
  .essp-aside-cont {
    padding-bottom: 20px;
  }
  .essp-aside-cont .cont-head {
    text-align: left;
    text-indent: 30px;
  }
  .essp-aside-cont .cont-body ul li {
    text-indent: 30px;
    height: 50px;
    line-height: 50px;
  }
}
</style>
