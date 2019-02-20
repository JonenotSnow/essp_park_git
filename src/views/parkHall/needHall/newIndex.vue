<template>
  <div>

    <el-container>
      <el-main>

        <!-- 需求搜索-->
        <div class="search-list-container"
            >
          <essp-search-panel :search-form="searchForm"
                             :search-type="type"
                             @resetSeachOption="resetSeachOption"></essp-search-panel>
          <div class="search-wrapper">
            <ul class="search-list">
              <li v-for="(requItem,i) in resultList"
                  :key="i"
                  class="search-list-item">
                <el-row v-if="requItem.simRqmInfVo">
                  <el-col :span="3">
                    <img @click="toDetailRqm(requItem)"
                         :src="requItem.pic_logo"
                         class="search-item-img" />
                  </el-col>
                  <el-col :span="21">
                    <el-row class="ml-20">
                      <el-col :span="18">
                        <h3 @click="toDetailRqm(requItem)"
                            :id="requItem.simRqmInfVo.bsnRqmID"
                            class="search-item-title">{{requItem.simRqmInfVo.prjNm}}</h3>
                      </el-col>
                      <el-col :span="6">
                        <div v-if="requItem.isFcs == '1'"
                             @click="doFocus(requItem.simRqmInfVo.bsnRqmID,'1',requItem.simRqmInfVo.cstID)"
                             class="essp-statusBar-item flex-end">
                          <img src="@/assets/imgs/searchpage/icon_heart.png" />
                          <span>已关注（{{requItem.fcsNm}}已关注）</span>
                        </div>
                        <div v-else-if="requItem.isFcs == '0'"
                             @click="doFocus(requItem.simRqmInfVo.bsnRqmID,'0',requItem.simRqmInfVo.cstID)"
                             class="essp-statusBar-item flex-end">
                          <img src="@/assets/imgs/searchpage/icon_focus.png" />
                          <span>关注（{{requItem.fcsNm}}已关注）</span>
                        </div>
                        <div v-else
                             @click="goToLogin"
                             class="essp-statusBar-item flex-end">
                          <img src="@/assets/imgs/searchpage/icon_focus.png" />
                          <span>关注（0已关注）</span>
                        </div>
                      </el-col>
                      <el-col :span="24"
                              class="search-item-detail mt-15">
                        <span>所在地：{{ requItem.address }}</span>
                        <span class="ml-55">发布时间：{{requItem.dateToString}}</span>
                      </el-col>
                      <el-col :span="24"
                              class="essp-statusBar mt-20">
                        <div class="essp-statusBar-item">
                          <img src="@/assets/imgs/searchpage/icon_view.png" />
                          <span>{{requItem.clckNm}}</span>
                        </div>
                        <div class="essp-statusBar-item">
                          <img src="@/assets/imgs/searchpage/icon_focus.png" />
                          <span>{{requItem.fcsNm}}</span>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
        <div class="pagination-center">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageNum"
                         :page-sizes="pageSizes"
                         :page-size="page.pageSize"
                         layout="total,sizes, prev, pager, next, jumper"
                         :total="page.total">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import EsspSearchPanel from "@/components/matchmark/EsspSearchPanel";
import mixin from '@/components/mixins/mixins_windowOpen.js'
export default {
  name: "",
    mixins:[mixin],
  components: {
    EsspSearchPanel
  },
  data() {
    return {
      userInfo: {},
      searchForm: {},
      resultList: [],
      page: {
        pageSize: 10
      },
      pageSizes: [10, 20, 30],
      type: -1, // 0 - 企业 1 - 服务 2 - 需求 4 -商品
      pageNum: 1,
      total: 0
    };
  },
  created() {
    this.userInfo = this.SSH.getItem("userInfo");
    this.initSearchForm();
  },
  filters: {
    address: function([info, keyNames]) {
      let resultArray = keyNames.reduce((array, keyName) => {
        if (info[keyName] && !Array.isArray(info[keyName])) {
          array.push(info[keyName]);
        } else if (info[keyName] && Array.isArray(info[keyName])) {
          if (info[keyName].length > 0) array.push(info[keyName][0]);
        }
        return array;
      }, []);
      return resultArray.join("-");
    },
    brfInf(val) {
      if (val.length > 0) {
        let index = 0;
        if (val.indexOf("<p>") != -1) {
          let data = val.substring(
            val.indexOf("<p>", index) + 3,
            val.indexOf("</p>", index)
          );
          return data;
        }
      }
    }
  },
  watch: {
    searchForm: {
      handler() {
        switch (Number.parseInt(this.type)) {
          case 0:
            this.page.pageSize = 10;
            break;
          case 1:
            this.page.pageSize = 12;
            break;
          case 2:
            this.page.pageSize = 10;
            break;
          case 4:
            this.page.pageSize = 12;
            break;
        }
        this.pageNum = 1;
        this.getSearchData();
      },
      deep: true
    },
    $route(to, from) {
      this.initSearchForm();
    }
  },
  methods: {
    initSearchForm() {
      let type = this.$route.query.type || 2;
      switch (type) {
        case "0":
          this.pageSizes = [10, 20, 30];
          this.page.pageSize = 10;
          break;
        case "1":
          this.pageSizes = [12, 24, 36];
          this.page.pageSize = 12;
          break;
        case "2":
          this.pageSizes = [10, 20, 30];
          this.page.pageSize = 10;
          break;
        case "4":
          this.pageSizes = [10, 20, 30];
          this.page.pageSize = 12;
          break;
      }
      // 更换搜索类型重置查询表单
      if (this.type !== type) {
        this.type = type;
        this.resetSeachOption();
      }
      // 填充查询条件
      let queryData = this.$route.query;
      let paramData = this.$route.params;
      let data =
        Object.keys(queryData).length > 0
          ? queryData
          : Object.keys(paramData).length > 0
          ? paramData.data
          : {};
      for (const key in data) {
        const value = data[key];
        if (this.searchForm.hasOwnProperty(key)) {
          this.searchForm[key] = value;
        }
      }
    },
    // 获取搜索结果
    getSearchData() {
      let that = this;
      let data = Object.assign({}, this.searchForm);
      switch (Number.parseInt(that.type)) {
        case 0:
          // 企业查询
          that.page.pageNumcpys = that.pageNum;
          that.pageSizes = [10, 20, 30];
          break;
        case 1:
          // 服务查询
          that.page.pageNumprods = that.pageNum;
          that.pageSizes = [12, 24, 36];
          // 判断是否有选择服务分类
          if (!!data.srvTpCd) {
            // 根据选择的需求类型拆分字段
            let arr = data.srvTpCd;
            arr.forEach((o, i) => {
              data[`type${i + 1}Cd`] = o;
            });
            delete data.srvTpCd;
          }
          break;
        case 2:
          // 需求查询
          that.page.pageNum = that.pageNum;
          that.pageSizes = [10, 20, 30];
          // 判断是否有选择需求类型
          if (!!data.rqmTpCd) {
            // 根据选择的需求类型拆分字段
            data.rqmTpCd.forEach((o, i) => {
              data[`type${i + 1}Cd`] = o;
            });
            delete data.rqmTpCd;
          }
          break;
        case 4:
          // 商品查询
          that.page.pageNumprods = that.pageNum;
          that.pageSizes = [12, 24, 36];
          // 判断是否有选择服务分类
          if (!!data.srvTpCd) {
            // 根据选择的需求类型拆分字段
            let arr = data.srvTpCd;
            arr.forEach((o, i) => {
              data[`type${i + 1}Cd`] = o;
            });
            delete data.srvTpCd;
          }
          break;
      }
      data = Object.assign({}, this.page, data);

      this.$post(
        this.$apiUrl.rqmList.searchForResultUrls[this.type],
        data
      ).then(
        response => {
          if (response.resultMsg == "success") {
            that.resultList = response.resultData.searchResultList;
            that.page.total = response.resultData.page.total;
            //onsole.log('that.resultList',that.resultList)
          } else {
            that.resultList = [];
            that.page.total = 0;
          }
        },
        error => {
          that.resultList = [];
          that.page.total = 0;
        }
      );
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getSearchData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getSearchData();
    },
    // 重置搜索条件
    resetSeachOption() {
      let searchForm = {};
      switch (this.type) {
        // 企业查询
        case "0":
          searchForm = {
            keyword: "",
            indLvl1Cd: "",
            indLvl2Cd: "",
            indLvl3Cd: "",
            areaCntyCd: "",
            areaProvCd: "",
            bngCntyCd: "",
            bngProvCd: "",
            bngCityCd: ""
          };
          break;
        // 服务查询
        case "1":
          searchForm = {
            keyword: "",
            srvTpCdData: [],
            areaCntyCd: "",
            areaProvCd: ""
          };
          break;
        // 需求查询
        case "2":
          searchForm = {
            keyword: "",
            areaCntyCd: "",
            areaProvCd: "",
            serviecTpCd: "",
            rqmTpCd: [],
            rqmRole: "",
            ancDate_start: "",
            ancDate_end: ""
          };
          break;
        // 商品查询
        case "4":
          searchForm = {
            keyword: "",
            srvTpCd: [],
            areaCntyCd: "",
            areaProvCd: ""
          };
          break;
        default:
          searchForm = {};
          break;
      }
      // 设置时间戳防止数据未改变不刷新
      searchForm.date = Date.now();
      this.$set(this, "searchForm", searchForm);
    },
    // 跳转企业详情页
    toDetailShow(val) {
      // this.$router.push({path: '/centerIndex/showHome',query:{
      //     'cstId': val.storeInfVo.cstID,
      // }});
      //新标签页打开页面
      let routerData = this.$router.resolve({
        path: "/centerIndex/showHome",
        query: { cstId: val.storeInfVo.cstID }
      });
      window.open(routerData.href, "_blank");
    },

    // 跳转需求详情页  需要先判断是否是用户本人发布的需求
    toDetailRqm(val) {
      let displayUrl = "";
      let usrid = "";
      if (!this.utils.isEmpty(this.userInfo)) {
        this.$post("/requirement/requirement_other_detail_head", {
          bsnId: val.simRqmInfVo.bsnRqmID
        }).then(response => {
          // if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
            usrid = response.resultData.param.usrid;
            if (
              !this.utils.isEmpty(this.userInfo.id) &&
              !this.utils.isEmpty(usrid)
            ) {
              if (this.userInfo.id == usrid) {
                displayUrl = "/requIndex/display-own";
              } else {
                displayUrl = "/requIndex/display-other";
              }
              //标签页打开页面
              let routerData = this.$router.resolve({
                path: displayUrl,
                query: {
                  bsnRqmId: val.simRqmInfVo.bsnRqmID,
                  tplId: val.simRqmInfVo.tplId
                }
              });
              window.open(routerData.href, "_blank");
            } else {
              displayUrl = "/requIndex/display-other";
              //标签页打开页面
              let routerData = this.$router.resolve({
                path: displayUrl,
                query: {
                  bsnRqmId: val.simRqmInfVo.bsnRqmID,
                  tplId: val.simRqmInfVo.tplId
                }
              });
              window.open(routerData.href, "_blank");
            }
          // }
        });
      } else {
        displayUrl = "/requIndex/display-other";
        //标签页打开页面
        let routerData = this.$router.resolve({
          path: displayUrl,
          query: {
            bsnRqmId: val.simRqmInfVo.bsnRqmID,
            tplId: val.simRqmInfVo.tplId
          }
        });
        window.open(routerData.href, "_blank");
      }
    },

    // 关注，取消关注需求
    doFocus(bsnRqmId, fcsStInd, cstId) {
      if (!this.checkIsLoginAndSelf(cstId, "需求")) {
        this.$post(this.$apiUrl.rqmList.doFocusUrl, {
          bsnRqmId: bsnRqmId,
          fcsTp: "2",
          fcsStInd: fcsStInd
        }).then(response => {
          this.focusSuccess(fcsStInd);
        });
      }
    },
    // 关注，取消关注企业（橱窗)
    doCpyFocus(cstId, fcsStInd) {
      if (!this.checkIsLoginAndSelf(cstId, "橱窗")) {
        this.$post(this.$apiUrl.user.cancelFocusUrl, {
          fcsTp: 1,
          fcsStInd: fcsStInd,
          bsnRqmId: cstId,
          cstId: cstId
        }).then(response => {
          this.focusSuccess(fcsStInd);
        });
      }
    },
    // 关注，取消关注成功
    focusSuccess(fcsStInd) {
      this.$message.info(fcsStInd == 0 ? "关注成功" : "取消关注成功");
      this.getSearchData();
    },
    //
    checkIsLoginAndSelf(cstId, type) {
      if (this.utils.isEmpty(this.userInfo)) {
        this.$message.info("请登录后在关注");
        return true;
      }
      if (this.userInfo.cstId == cstId) {
        this.$message.info("不可关注自己的" + type);
        return true;
      }
      return false;
    },
    goToLogin() {
        this.windowHrefUrl('/userIndex/login')
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin.less";
@import "../../../assets/css/common.less";
.breadcrunmb {
  margin-top: 10px;
}
.el-breadcrumb {
  width: 1200px;
  margin: 0 auto;
  .esspline-height(60px, 60px);
  background-color: transparent;
}

.el-container {
  .essp_bg();
  width: 1200px;
  margin: 0 auto 20px;
}
.el-main {
  padding: 0;
}
/*企业、需求搜索*/
.search-list-container {
  .essp_bg();
  .search-wrapper {
    padding: 0 45px;
    .search-list {
      .search-list-item {
        padding: 20px 0;
        border-bottom: 1px solid #e4e4e4;
        .search-item-img {
          display: block;
          width: 133px;
          height: 100px;
          background-color: #f2f2f2;
          cursor: pointer;
        }
        .search-item-title {
          height: 26px;
          font-size: 20px;
          color: #333333;
          font-weight: normal;
          display: inline-block;
          max-width: 600px;
          vertical-align: sub;
          cursor: pointer;
          .esspellipsis();
          &:hover {
            color: #00a0e9;
          }
        }
        .search-item-detail {
          font-size: 16px;
          color: #888;
        }
      }
    }
  }
}
/*服务、商品搜索*/
.search-block-container {
  .essp_bg();
  .search-wrapper {
    padding: 0 30px;
    .search-block {
      .search-block-item {
        float: left;
        width: 260px;
        height: 329px;
        margin-top: 24px;
        margin-right: 18px;
        box-shadow: 0 2px 8px 0 rgba(116, 116, 116, 0.12);
        .search-item-img img {
          display: block;
          width: 260px;
          height: 162px;
          cursor: pointer;
        }
        .search-item-content {
          padding: 6px 14px 6px;
          position: relative;
          .search-item-title {
            font-size: 18px;
            color: #222;
            font-weight: normal;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            .esspellipsis();
            &:hover {
              color: #00a0e9;
            }
          }
          .search-item-detail {
            margin-top: 12px;
            margin-bottom: 10px;
            font-size: 12px;
            color: #b1b1b1;
            height: 14px;
            line-height: 14px;
            word-wrap: break-word;
            .esspellipsis();
          }
          .search-item-price {
            // position: absolute;
            right: 18px;
            // bottom: 11px;
            margin-bottom: 5px;
            font-size: 14px;
            font-style: italic;
            color: #47b5f6;
            .item-price {
              float: left;
              max-width: 155px;
              padding-right: 3px;
              .esspellipsis();
            }
            .item-unit {
              max-width: 87px;
              .esspellipsis();
            }
          }
        }
        .search-item-tag {
          padding: 0 14px;
          .esspline-height(48px, 48px);
          overflow: hidden;
          border-top: 1px solid #f4f3f4;
          .tag-text {
            font-size: 12px;
            color: #c9c9c9;
            height: 48px;
            line-height: 48px;
          }
          .el-tag {
            margin-left: 7px;
          }
          .el-tag--mini {
            padding: 0 10px;
            height: 24px;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
