<template>
    <div class="active_index ">
        <div class="esspclearfix">
            <div class="content_l text_align_r active_l">
                <essp-aside :title="asidetitle" :activeList="thisAsideList"></essp-aside>
            </div>
            <div class="content_r">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import EsspAside from "@/components/EsspAside";
export default {
  name: "",
  components: {
    EsspAside
  },
  data() {
    return {
      msg: "园区活动",
      asidetitle: "园区活动",
      iconClass: "el-icon-share",
      thisAsideList: [],
      activeList: [
        {
          path: "/parkIndex/park/all",
          name: "全部活动"
        },
        {
          path: "/parkIndex/park/enroll",
          name: "我报名的活动"
        },
        {
          path: "/parkIndex/park/launch",
          name: "我发起的活动"
        },
        {
          path: "/parkIndex/park/follow",
          name: "我关注的活动"
        },
        {
          path: "/parkIndex/park/auditing",
          name: "活动发布审核"
        },
        {
          path: "/parkIndex/park/auditingBm",
          name: "活动报名审核"
        }
      ],
      goverBeneList: [
        {
          path: "/parkIndex/goverBene/all",
          name: "全部惠政"
        },
        {
          path: "/parkIndex/goverBene/release",
          name: "我发布的惠政"
        },
        {
          path: "/parkIndex/goverBene/apply",
          name: "我申请的惠政"
        },
        {
          path: "/parkIndex/goverBene/follow",
          name: "我关注的惠政"
        },
        {
          path: "/parkIndex/goverReview",
          name: "惠政发布审核"
        },
        {
          path: "/parkIndex/goverReviewBm",
          name: "惠政申请审核"
        }
      ],
      infoList: [
        {
          path: "/parkIndex/parkInformation/all",
          name: "全部资讯"
        },
        {
          path: "/parkIndex/parkInformation/myFollowedInfo",
          name: "我关注的资讯"
        },
        {
          path: "/parkIndex/parkInformation/myPublishedInfo",
          name: "我发布的资讯"
        },
        {
          path: "/parkIndex/parkInformation/auditing",
          name: "我审核的资讯"
        }
      ],
      records: [
        {
          path: "/parkIndex/parkInformation/all",
          name: "全部记录"
        },
        {
          path: "/parkIndex/parkInformation/myFollowedInfo",
          name: "我关注的走访记录"
        },
        {
          path: "/parkIndex/parkInformation/myPublishedInfo",
          name: "我发布的记录"
        },
        {
          path: "/parkIndex/parkInformation/auditing",
          name: "我审核的记录"
        }
      ],
      firstList: [
        {
          subTitle: "园区设置",
          id: "0",
          childrenList: [
            {
              id: "00",
              path: "/parkHall/manage/baseInfo",
              name: "概览设置"
            },
            {
              id: "01",
              path: "/parkHall/manage/occupancyApplication",
              name: "入驻申请表"
            },
            {
              id: "02",
              path: "/parkHall/manage/userManage",
              name: "成员管理"
            }
          ]
        },
        {
          subTitle: "任务池",
          id: "1",
          childrenList: [
            {
              id: "10",
              path: "/parkHall/manage/activityPool/1",
              name: "入园审核"
            },
            {
              id: "11",
              path: "/parkHall/manage/activityPool/2",
              name: "资讯审核"
            },
            {
              id: "12",
              path: "/parkHall/manage/activityPool/3",
              name: "活动审核"
            }
          ]
        },
        {
          subTitle: "其他设置",
          id: "2",
          childrenList: [
            {
              id: "20",
              path: "/parkHall/manage/auditSetting",
              name: "审核设置"
            },
            {
              id: "21",
              path: "/parkHall/manage/noticeAndAD",
              name: "审核设置"
            }
          ]
        }
      ],
      manageList: {
        title: "园区管理",
        firstList: []
      }
    };
  },
  created() {
    this.getRouteInfo();
  },
  methods: {
    getRouteInfo() {
      var navIndex = Cookies.get("navIndex") || 2;

      let res = this.LSH.getItem("resource");
      if (navIndex == 2) {
        this.asidetitle = "园区活动";
        let data = [];
        for (let i = 0; i < this.activeList.length; i++) {
          for (var key in res) {
            if (this.activeList[i].path == key) {
              data.push(this.activeList[i]);
            }
          }
        }
        this.thisAsideList = data;
        this.asidetitle = "园区活动";
      }
      if (navIndex == 3) {
        this.asidetitle = "政惠服务";
        let data = [];
        for (let i = 0; i < this.goverBeneList.length; i++) {
          for (var key in res) {
            if (this.goverBeneList[i].path == key) {
              data.push(this.goverBeneList[i]);
            }
          }
        }
        this.thisAsideList = data;
        this.asidetitle = "园区惠政";
      }
      if (navIndex == 4) {
        let data = [];
        for (let i = 0; i < this.infoList.length; i++) {
          for (var key in res) {
            if (this.infoList[i].path == key) {
              data.push(this.infoList[i]);
            }
          }
        }
        this.thisAsideList = data;
        this.asidetitle = "园区资讯";
      }
      if (navIndex == 5) {
        this.manageList.firstList = [];
        let data = [];
        for (let i = 0; i < this.firstList.length; i++) {
          data = [];
          for (let j = 0; j < this.firstList[i].childrenList.length; j++) {
            for (var key in res) {
              if (this.firstList[i].childrenList[j].path == key) {
                data.push(this.firstList[i].childrenList[j]);
              }
            }
          }
          if (data.length != 0) {
            this.firstList[i].childrenList = data;
            this.manageList.firstList.push(this.firstList[i]);
          }
        }
        this.thisAsideList = this.manageList;
        this.asidetitle = "园区管理";
      }
      // if(navIndex == 7) {
      //     let data = []
      //     for(let i=0;i<this.records.length;i++){
      //         for (var key in res) {
      //             if(this.records[i].path == key){
      //                 data.push(this.records[i])
      //             }
      //         }
      //     }
      //     this.thisAsideList = data;
      //     this.asidetitle = '走访记录';
      // }
    }
  },
  watch: {
    $route() {
      this.getRouteInfo();
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixin";
.active_index {
  .essp_width_auto();
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
