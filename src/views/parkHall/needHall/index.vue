<template>
  <!--筛选结果start-->
  <div>
    <div class="bg">
      <div class="btn_group">
        <div class="btn" @click="publish">
			<i class="iconfont icon-fasong icon-publish"></i>
			需求发布</div>
        <div class="btn" @click="myNeed">
			<i class="iconfont icon-icon-test"></i>
			我的商机</div>
      </div>
    </div>
	<div class="content">
		<search-head :search-form="searchForm"
                             :search-type="'2'"
                             @resetSeachOption="resetSeachOption"></search-head>

      <div class="allfilterresult">
        <div class="result_list" v-if="totalCount>0">
          <div class="result_item"  v-for="(item,index) in hotRqmList" :key="index">
            <div class="result_item-cont">
              <div class="leftAside">
                <div class="result_item-img">
                  <img :src="item?item.pic_logo:''" alt>
                </div>
                <div class="result_item-info">
                  <p @click="toDetailrqm(item)" class="title">{{item?item.simRqmInfVo.prjNm:''}}</p>
                  <p class="center-p">发布日期：{{item?item.dateToString:''}}</p>
                  <p>
                    <i class="mdui-icon icon-1 iconfont icon-liulan1"></i>
                    <span>{{item?item.clckNm:''}}</span>
                    <i class="mdui-icon icon-2 iconfont icon-collect2"></i>
                    <span>{{item?item.fcsNm:''}}</span>
                    <!-- <i class="mdui-icon icon-3 iconfont icon-pinglun"></i>
                    <span>{{item?item.scsNm:''}}</span> -->
                  </p>
                </div>
              </div>
              <div class="isfocus">
                <i
                  class="mdui-icon iconfont"
                  :class="item.isFcs==1?'isfocusicon icon-collect2':'icon-aixin-xianxing'"
                  @click="focus(item,index)"
                ></i>
                <span>{{item.isFcs==1?'已关注':'关注'}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="result_list" v-else>
           <div class="result_item no-data-tip" >暂无数据</div>
           </div>
        <div class="pageList">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
		</div>

	</div>
      <dialog-need :showNeedRange.sync="showNeedRange" ></dialog-need>
  </div>
  <!--筛选结果end-->
</template>

<script>
import Moment from "moment";
import searchHead from './head.vue'
import DialogNeed from '@/components/DialogNeedRange.vue'
import mixins from '@/components/mixins/mixins_windowOpen.js'
export default {
  name: "",
  mixins:[mixins],
  data() {
    return {
      totalCount: 0,
      resultInfo: [],
      pageNum: 1,
      pageSize: 10,
      isHover: false,
      hotRqmList: [],
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      searchForm: {
        keyword: "",
        areaCntyCd: "",
        areaProvCd: "",
        serviecTpCd: "",
        rqmTpCd: [],
        rqmRole: "",
        ancDate_start: "",
        ancDate_end: ""
      },
      showNeedRange:false
    };
  },
  components: {searchHead,DialogNeed},
  created() {
    this.getSearchData();
  },
  filters: {
    timerFormat(vaule) {
      return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
	  // 重置搜索条件
    resetSeachOption() {
      let  searchForm = {
            keyword: "",
            areaCntyCd: "",
            areaProvCd: "",
            serviecTpCd: "",
            rqmTpCd: [],
            rqmRole: "",
            ancDate_start: "",
            ancDate_end: "",
      }
      // 设置时间戳防止数据未改变不刷新
      searchForm.date = Date.now();
      this.$set(this, "searchForm", searchForm);
      this.pageSize = 10;
      this.pageNum = 1;
    },
	  getSearchData() {
      let that = this;
      let data = Object.assign({}, this.searchForm);
          // 需求查询
          // 判断是否有选择需求类型
          if (!!data.rqmTpCd) {
            // 根据选择的需求类型拆分字段
            data.rqmTpCd.forEach((o, i) => {
              data[`type${i + 1}Cd`] = o;
            });
            delete data.rqmTpCd;
          }
      let page = {
        pageSize:this.pageSize,
        pageNum:this.pageNum,
      }
      data = Object.assign({}, {linkSrc:sessionStorage.getItem("parkId")},page,data);

      this.$post(
        this.$apiUrl.rqmList.searchForResultUrls[2],
        data
      ).then(
        response => {
          if (response.resultCode == "CLT000000000") {
          that.hotRqmList = response.resultData.searchResultList;
          that.totalCount = response.resultData.page.total;
            //onsole.log('that.resultList',that.resultList)
          } else {
            that.hotRqmList = [];
            that.totalCount = 0;
          }
        },
        error => {
          that.hotRqmList = [];
          that.totalCount = 0;
        }
      );
    },
    myNeed() {

      let parkId = this.SSH.getItem('parkId')
      let token= this.SSH.getItem('token')
      let params = '?linkSrc='+parkId+'&token='+token
      this.windowOpenUrl('requIndex/requMyrqm/all',params)
      // let routerData = this.$router.resolve({
      //                   path: 'requIndex/requMyrqm/all',
      //                   query: {linkSrc: parkId}
      //               });
      // window.open(routerData.href+'&token='+token, '_blank')
      
    },
    publish() {
            this.showNeedRange = true
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSearchData();
    },
    handleCurrentChange(val) {
	    this.pageNum = val;
      this.getSearchData();
    },

    toDetailrqm(val) {
      let displayUrl = "";
      let usrid = "";

      if (!this.utils.isEmpty(this.userInfo)) {
        this.$post("/requirement/requirement_other_detail_head", {
          bsnId: val.simRqmInfVo.bsnRqmID
        }).then(response => {
          if (response.resultCode === "CLT000000000") {
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
                  tplId: val.simRqmInfVo.tplID
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
                  tplId: val.simRqmInfVo.tplID
                }
              });
              window.open(routerData.href, "_blank");
            }
          }
        });
      } else {
        displayUrl = "/requIndex/display-other";
        //标签页打开页面
        let routerData = this.$router.resolve({
          path: displayUrl,
          query: {
            bsnRqmId: val.simRqmInfVo.bsnRqmID,
            tplId: val.simRqmInfVo.tplID
          }
        });
        window.open(routerData.href, "_blank");
      }
    },
    focus(item, index) {
    //item.isFcs 1.关注，0、未关注 fcsStInd /返回关注状态码同
      if (this.utils.isEmpty(this.userInfo)) {
        return this.$message.info("请先登陆");
      }
      this.$post(this.$apiUrl.rqmList.doFocusUrl, {
        bsnRqmId: item.simRqmInfVo.bsnRqmID,
        fcsStInd: item.isFcs,
        fcsTp: "2"
      }).then(res => {
        item.isFcs = res.resultData.fcsStInd;
        item.fcsNm = res.resultData.focusNum;
        this.$set(this.hotRqmList, index, item);
        // this.hotRqmList[index].fcsFlage= res.resultData.fcsStInd
        // this.hotRqmList[index].fcsNm= res.resultData.focusNum
      })
    }
  },
  watch: {
    searchForm: {
      handler() {
        this.pageNum = 1;
        this.getSearchData();
      },
      deep: true
    },
    $route(to, from) {
      this.initSearchForm();
    }
  },
}
</script>
<style lang="less" scoped>
/*需求库start*/
.content{
	background-color: #fff;
	width: 1200px;
	margin: 70px auto 20px;
}
.bg {
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url("../../../assets/newparkimg/needHall/needBanner.jpg");
  background-position: center bottom;
  background-repeat: no-repeat;
  .btn_group {
    position: absolute;
    bottom: -40px;
    width: 660px;
    display: flex;
    left: 50%;

    justify-content: space-between;
    transform: translateX(-300px);
    .btn {
      width: 280px;
      height: 80px;
      color: #666;
      text-align: center;
      line-height: 80px;
      vertical-align: middle;
      letter-spacing: 6px;
      font-size: 20px;
      background-color: #fff;
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        color: #00a0e9;
      }
    }
  }
}
.mdui-icon {
  color: #ccc;
}

.container {
  width: 1100px;
  font-size: 16px;
  background-color: #ffffff;

  margin: 70px auto 20px;
  padding: 36px 50px;
}
.filtertitle {
  overflow: hidden;
  font-size: 20px;
  margin-bottom: 28px;
}
.filterconditions {
  float: left;

  font-size: 20px;
  color: #444444;
}
.resetconditions {
  float: right;
  font-family: SimHei;
  font-size: 16px;
  color: #00a0e9;
}
.allconditions {
  overflow: hidden;
  padding-left: 8px;
}
.allconditions span {
  margin-right: 25px;
}
.allconditions select {
  width: 180px;
  height: 35px;
  border-radius: 3px;
  border: solid 1px #cccccc;
  background: #fff;
}
.allconditions input[type="time"] {
  width: 180px;
  height: 35px;
  border-radius: 3px;
  border: solid 1px #cccccc;
}
.allconditions .matchingtype {
  color: #444444;
}
.allconditions .demandtype {

  color: #444444;
}
.allconditions .demandrole {
  color: #444444;
}
.allconditions .conditionitem {
  float: left;
  margin-right: 22px;
  margin-bottom: 25px;
}
.allfilterresult {
}
.filter_result_title {
  text-align: left;
  border-bottom: solid 2px #cccccc;
  font-size: 20px;
  line-height: 40px;
}
.filter_result_title .filter_result {
}
.result_list {
  padding: 0 70px 0;
}
.result_item {
  margin: 0 20px;
}
.result_item-cont {
  overflow: hidden;
  padding: 20px 0;
  border-bottom: solid 1px #cccccc;
  display: flex;
  justify-content: space-between;
  .leftAside {
    display: flex;
  }
}
.result_item-cont .result_item-img {
  width: 175px;
  height: 100px;
  margin-right: 20px;
}
.result_item-cont .result_item-img img {
  width: 100%;
  height: 100%;
}
.result_item-cont .result_item-info {
  margin-left: 0;
  text-align: left;
}
.result_item-cont .result_item-info p {
  margin: 0;

  &.title{
    height: 26px;
    font-size: 20px;
    color: #444;
    font-weight: 400;
    max-width: 600px;
    vertical-align: sub;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  &.center-p{
    padding: 21px 0 24px;
    color: #777;
  }
  &.last-p{
    font-size: 12px;
    color: #999;
  }
}
.result_item-cont .result_item-info p span {
  margin-left: 10px;
  margin-right: 30px;
}
.isfocusicon {
  color: #ff5656;
}
.pageList {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 0;
}
.no-data-tip{
  line-height: 100px;
  text-align: center;
  vertical-align: middle;
}
/*需求库end*/
</style>
