<template>
  <div id="dataManage">
    <div class="baseInfo">
      <p>数据管理</p>
    </div>
    <el-collapse class="accordion">
      <el-collapse-item v-for="(item,i) in list" :key="i">
        <template slot="title" style="font">{{item.title}}</template>
        <div class="list">
          <ul v-for="(is,j) in item.content" :key="j" :class="{'top':j>0}">
            <li>
              <span class="require">
                <span>*</span>年份：
              </span>
              <!-- <el-date-picker
                v-model="is.time"
                type="date"
                placeholder="选择日期"
                format="yyyy 年"
                value-format="yyyy"
              ></el-date-picker>-->
              <el-select v-model="is.time" placeholder="请选择">
                <el-option
                  v-for="dataItem in dataSelect"
                  :key="dataItem.value"
                  :label="dataItem.value"
                  :value="dataItem.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span class="require">
                <span>*</span>
                {{is.subTitle}}
              </span>
              <div>
                <input type="text" v-model="is.value">
                <span class="sub1" v-if="is.sub && is.sub.length == 1">{{is.sub}}</span>
                <span class="sub2" v-if="is.sub && is.sub.length == 2">{{is.sub}}</span>
              </div>
            </li>
            <span class="addYear" v-if="j == item.content.length-1" @click="addItem(i,j)">
              <i class="el-icon-plus" ></i>添加年份
            </span>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>
    <p class="save" @click="saveUp">
      <span>保存上传</span>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [
        {
          title: "研究与发展（R&D）人员数（万人）",
          content: [
            {
              id: "0",
              time: "",
              value: "",
              sub: "万人",
              subTitle: "R&D人员："
            }
          ]
        },
        {
          title: "企业研究与发展（R&D）经费支出（亿元）",
          content: [
            {
              id: "0",
              time: "",
              value: "",
              sub: "亿元",
              subTitle: "R&D投入："
            }
          ]
        },
        {
          title: "专利申请量",
          content: [
            {
              id: "0",
              time: "",
              value: "",
              sub: "项",
              subTitle: "专利申请量："
            }
          ]
        },
        {
          title: "发明专利申请量",
          content: [
            {
              id: "0",
              time: "",
              value: "",
              sub: "项",
              subTitle: "发明专利申请量："
            }
          ]
        },
        {
          title: "高新技术企业数量",
          content: [
            {
              id: "0",
              time: "",
              value: "",
              sub: "项",
              subTitle: "高新技术企业数量："
            }
          ]
        },
        {
          title: "技术合同登记额",
          content: [
            {
              id: "0",
              time: "",
              value: "",
              sub: "亿",
              subTitle: "技术合同登记额："
            }
          ]
        }
      ],
      dataSelect: [
        { value: '2013' },
        { value: '2014' },
        { value: '2015' },
        { value: '2016' },
        { value: '2017' },
        { value: '2018' },
        { value: '2019' }
      ]
    };
  },
  mounted() {

  },
  created() {},
  methods: {
    getData() {
      let params = this.list;
      this.$post("/dataIndex/saveData", params).then(res => {
        console.log("设置数据");
      });
    },
    addItem(index, jIndex) {
  
      let obj = this.switchFn(index, jIndex)
      console.log(index, jIndex,obj)
      this.list[index].content.push(obj);
      console.log(this.list)
    },
    switchFn(index, jIndex) {
      let tmp = {};
      switch (index) {
        case 0:
          tmp = {
            id: 1 + jIndex,
            time: "",
            value: "",
            sub: "亿元",
            subTitle: "R&D人员："
          };
          break;
        case 1:
          tmp = {
            id: 1 + jIndex,
            time: "",
            value: "",
            sub: "亿元",
            subTitle: "R&D投入："
          };
          break;
        case 2:
          tmp = {
            id: 1 + jIndex,
            time: "",
            value: "",
            sub: "项",
            subTitle: "专利申请量："
          };
          break;
        case 3:
          tmp = {
            id: 1 + jIndex,
            time: "",
            value: "",
            sub: "项",
            subTitle: "发明专利申请量："
          };
          break;
        case 4:
          tmp = {
            id: 1 + jIndex,
            time: "",
            value: "",
            sub: "项",
            subTitle: "高新技术企业数量："
          };
          break;
        case 5:
          tmp = {
            id: 1 + jIndex,
            time: "",
            value: "",
            sub: "亿",
            subTitle: "技术合同登记额："
          };
          break;

        default:
          break;
      }
      return tmp
    },
    saveUp(){
        console.log(1)
    }
  }
};
</script>
<style>
#dataManage .accordion {
  width: 820px;
  margin-left: 60px;
}
#dataManage .el-collapse {
  border-top: none;
  border-bottom: none;
}
#dataManage .accordion .el-collapse-item {
  margin-bottom: 25px;
}
#dataManage .accordion .is-active {
  margin-bottom: 0;
}
#dataManage .accordion .el-collapse-item .el-collapse-item__header {
  height: 35px;
  background-color: #e6f4ff;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0.4px;
  color: #00a0e9;
  text-indent: 9px;
}
#dataManage .accordion .el-collapse-item .el-collapse-item__header i {
  float: right;
}
#dataManage .el-collapse-item__content {
  padding-bottom: 0;
}
#dataManage .list ul li:nth-of-type(1) .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 200px !important;
}
</style>

<style lang='less' scoped>
#dataManage {
  width: 990px;
  background: #fff;
  min-height: 455px;
  padding-top: 50px;
  .baseInfo {
    width: 832px;
    margin-left: 40px;
    & > p {
      font-size: 18px;
      margin-bottom: 50px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 30px;
      letter-spacing: 3.6px;
      color: #333333;
      border-left: 10px solid #10b5ff;
      text-indent: 22px;
    }
  }
  .list {
    padding: 15px 0;
    position: relative;
    ul {
      width: 832px;
      height: 50px;
      padding-top: 5px;
      &.top {
        padding-top: 0;
      }
      li {
        float: left;
        height: 50px;
        .require {
          font-size: 14px;
          font-weight: normal;
          letter-spacing: 0.1px;
          color: #666666;
          margin-right: 11px;
          span {
            color: #ff9900;
          }
        }
        &:nth-of-type(1) {
          width: 270px;
          .el-input__inner {
            width: 200px !important;
            height: 35px !important;
            line-height: 35px !important;
          }
        }
        &:nth-of-type(2) {
          position: relative;
          overflow: hidden;
          margin-left: 33px;
          .require {
            float: left;
            line-height: 35px;
            width: 140px;
            text-align: right;
          }
          div {
            width: 200px;
            float: left;
          }
          input {
            width: 110px;
            height: 33px;
            border-radius: 3px;
            padding: 0 5px;
            border: solid 1px #cccccc;
          }
          .sub1,
          .sub2 {
            position: relative;
            left: -41px;
            display: inline-block;
            width: 30px;
            background: #fff;
            height: 33px;
            line-height: 33px;
            padding-left: 5px;
          }
          .sub1 {
            left: -28px;
            width: 15px;
          }
        }
      }
      .addYear {
        display: inline-block;
        width: 98px;
        height: 33px;
        border-radius: 3px;
        border: solid 1px #cccccc;
        position: absolute;
        bottom: 35x;
        line-height: 33px;
        text-align: center;
        margin-left: -38px;
        cursor: pointer;
      }
    }
  }
  .save {
    width: 832px;
    margin: 48px 0 0 40px;
    text-align: center;
    padding-bottom: 60px;
    span {
      display: inline-block;
      width: 180px;
      height: 40px;
      background-image: linear-gradient(31deg, #22a2fa 0%, #10b5ff 100%);
      border-radius: 5px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 40px;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
