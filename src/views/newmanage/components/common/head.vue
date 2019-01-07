<template>
    <div>
        <!-- 成果管理头部 -->
        <p class="title">{{
            }}</p>
        <div class="searchWrap">
            <div class="search">
                <div class="left">
                    <span class="pulishedBtn">已发布</span>
                    <div class="searchBox">
                        <span class="notice" v-if="searchContent">
                            "{{searchContent}}"共找到4个搜索内容
                        </span>
                        <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
                    </div>
                </div>
                <div class="publishBtn">
                    <i class="el-icon-circle-plus"></i>
                    <span @click="$router.push('/parkHall/manage/publishAchievement')">立即发布</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
prop:['type'],
data() {
    return {
        searchContent:''
    }
},
}
</script>

<style lang='less' scoped>
.title,.search{
    width:910px;
    margin:0 auto;
  }
  .title{
    margin: 0 auto 27px;
    padding-top: 48px;
    font-size: 18px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #00a0e9;
  }
  .searchWrap{
    border-bottom:1px solid #ccc;
    padding-bottom:20px;
    margin-bottom:3px;
  }
  .search{
    overflow: hidden;
    .left{
      float:left;
      overflow: hidden;
      width:695px;
      .pulishedBtn{
        float:left;
        display:inline-block;
        width: 90px;
        height: 30px;
        background-image: linear-gradient(21deg,
          #22a2fa 0%,
          #10b5ff 100%),
        linear-gradient(
          #00a0e9,
          #00a0e9);
        background-blend-mode: normal,
          normal;
        border-radius: 3px;
        font-size: 12px;
        line-height:30px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
      }
      .searchBox{
        float:right;
        line-height:30px;
        .notice{
          font-size: 14px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #999999;
          margin-right:20px;
        }
        input{
          width: 158px;
          height: 33px;
          border-radius: 17.5px;
          border: solid 1px #cccccc;
          outline: none;
          padding:0 20px;
        }
      }
    }
    .publishBtn{
      text-align: center;
      float: right;
      width: 130px;
      display: inline-block;
      height: 30px;
      background-image: linear-gradient(0deg,
        #22a2fa 0%,
        #10b5ff 100%);
      border-radius: 3px;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #ffffff;
      cursor: pointer;
      i{
        margin-right:14px;
        line-height:30px;
        font-size: 20px;
      }
      span{
        position:relative;
        top:-2px;
      }
    }
  }
</style>
