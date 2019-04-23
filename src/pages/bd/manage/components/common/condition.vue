<template>
    <div class="condition">
        <ul>
            <li>
                <span>成果名称：</span>
                <div><input type="text" placeholder="请输入成果名称 "></div>
            </li>
            <li>
                <span>所属领域：</span>
                <div>
                <select>
                    <option value=""></option>
                </select>
                </div>
            </li>
            <li>
                <span>发&nbsp;&nbsp;明&nbsp;&nbsp;人：</span>
                <div><input type="text" placeholder="请输入成果名称"></div>
            </li>
            <li>
                <span>所属单位：</span>
                <div><input type="text" placeholder="请输入成果名称"></div>
            </li>
            <li class="searchBtn">
                <span>查询</span>
            </li>
        </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.condition{
    width:910px;
    margin:0 auto;
    ul{
      overflow: hidden;
      li{
        float: left;
        overflow: hidden;
        width:270px;
        margin-top:20px;
        span{
          float:left;
          display:inline-block;
          width:75px;
          font-size: 14px;
          font-weight: normal;
          line-height: 30px;
          letter-spacing: 0px;
          color: #666666;
        }
        input,select{
          width: 160px;
          height: 30px;
          border-radius: 3px;
          border: solid 1px #cccccc;
          outline: none;
          padding:0 10px;
        }
        &.searchBtn{
          span{
            display: inline-block;
            width: 60px;
            height: 30px;
            background-image: linear-gradient(31deg, 
              #22a2fa 0%, 
              #10b5ff 100%);
            border-radius: 5px;
            font-size: 16px;
            font-weight: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #ffffff;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
