<template>
  <div id="dataManage">
    <div class="baseInfo">
      <p>数据管理</p>
    </div>
    <el-form ref="accordionForm" :model="form" label-width="150px">
      <el-collapse class="accordion" v-model="activeNames">
        <el-collapse-item v-for="(item,i) in form.list" :key="i" :name="i">
          <template slot="title" style="font">{{item.title}}</template>
          <div class="list">
            <ul v-for="(is,j) in item.content" :key="j" :class="{'top':j>0}">
              <li>
                <span class="require">
                  <span>*</span>年份：
                </span>
                <!-- <el-date-picker
                  v-model="is.year"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年"
                  value-format="yyyy"
                ></el-date-picker>-->
                <el-select v-model="is.year" placeholder="请选择">
                  <el-option
                    v-for="dataItem in dataSelect"
                    :key="dataItem.value"
                    :label="dataItem.value"
                    :value="dataItem.value"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <el-form-item 
                  :label="is.subTitle" 
                  :prop="'list.' + i + '.content.' + j + '.dataNum'"
                  :rules="rulesData(i)"
                >
                  <el-input type="number" v-model="is.dataNum"></el-input>
                  <span class="sub1" v-if="is.sub && is.sub.length == 1">{{is.sub}}</span>
                  <span class="sub2" v-if="is.sub && is.sub.length == 2">{{is.sub}}</span>
                </el-form-item>
                <!-- <span class="require">
                  <span>*</span>
                  {{is.subTitle}}
                </span>
                <div>
                  <input type="number" v-model="is.dataNum">
                  <span class="sub1" v-if="is.sub && is.sub.length == 1">{{is.sub}}</span>
                  <span class="sub2" v-if="is.sub && is.sub.length == 2">{{is.sub}}</span>
                </div> -->
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <p class="save" @click="saveUp">
        <span>保存上传</span>
      </p>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    
  },
  data() {
    return {
      activeNames: [0],
      form:{
        list: [
          {
            title: "研究与发展（R&D）人员数（万人）",
            content: [
              {
                id: 0,
                year: "",
                dataNum: "",
                sub: "万人",
                subTitle: "R&D人员：",
                type:0
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "万人",
                subTitle: "R&D人员：",
                type:0
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "万人",
                subTitle: "R&D人员：",
                type:0
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "万人",
                subTitle: "R&D人员：",
                type:0
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "万人",
                subTitle: "R&D人员：",
                type:0
              }
            ]
          },
          {
            title: "企业研究与发展（R&D）经费支出（亿元）",
            content: [
              {
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "R&D投入：",
                type:1
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "R&D投入：",
                type:1
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "R&D投入：",
                type:1
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "R&D投入：",
                type:1
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "R&D投入：",
                type:1
              }
            ]
          },
          {
            title: "专利申请量（项）",
            content: [
              {
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "专利申请量：",
                type:2
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "专利申请量：",
                type:2
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "专利申请量：",
                type:2
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "专利申请量：",
                type:2
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "个",
                subTitle: "专利申请量：",
                type:2
              }
            ]
          },
          {
            title: "发明专利申请量（项）",
            content: [
              {
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "发明专利申请量：",
                type:3
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "发明专利申请量：",
                type:3
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "发明专利申请量：",
                type:3
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "发明专利申请量：",
                type:3
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "项",
                subTitle: "发明专利申请量：",
                type:3
              }
            ]
          },
          {
            title: "高新技术企业数量（家）",
            content: [
              {
                id: 0,
                year: "",
                dataNum: "",
                sub: "家",
                subTitle: "高新技术企业数量：",
                type:4
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "家",
                subTitle: "高新技术企业数量：",
                type:4
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "家",
                subTitle: "高新技术企业数量：",
                type:4
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "家",
                subTitle: "高新技术企业数量：",
                type:4
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "家",
                subTitle: "高新技术企业数量：",
                type:4
              }
            ]
          },
          {
            title: "技术合同登记额（亿元）",
            content: [
              {
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "技术合同登记额：",
                type:5
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "技术合同登记额：",
                type:5
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "技术合同登记额：",
                type:5
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "技术合同登记额：",
                type:5
              },{
                id: 0,
                year: "",
                dataNum: "",
                sub: "亿元",
                subTitle: "技术合同登记额：",
                type:5
              }
            ]
          }
        ],
      },
      dataSelect: [
        { value: "2013" },
        { value: "2014" },
        { value: "2015" },
        { value: "2016" },
        { value: "2017" },
        { value: "2018" },
        { value: "2019" }
      ]
    };
  },
  mounted() {},
  created() {
    this.getData();
  },
  methods: {
    rulesData: (type) => {
      var rules
      switch(type) {
        case 0:
        case 1:
        case 5:
          rules = [
            { required: true, trigger: 'blur', message: ' '},
            { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, trigger: 'blur', message: ' '},
          ]
          break;
        default:
          rules = [
            { required: true, trigger: 'blur', message: ' '},
            { pattern: /^[1-9]+\d*$/, trigger: 'blur', message: ' '},
          ]
          break;
      }
      return rules
    },
    getData() {
      this.$post("/dataIndex/getIndexData", {
        parkId: sessionStorage.getItem("parkId")
      }).then(res => {
        if (res.resultCode === "CLT000000000") {
          if (res.resultData.length > 0) {
            this.form.list.forEach(item => {
              item.content = [];
            });
          }

          res.resultData.forEach(item => {
            let itemIndex = Number(item.type);
            if (itemIndex > 5) return false;
            let itemObj = Object.assign({},this.switchFn(itemIndex,0),item)
            if(this.form.list[itemIndex].content.length<5){this.form.list[itemIndex].content.push(itemObj);}
          });
        }
      });
    },
    addItem(index, jIndex) {
      let obj = this.switchFn(index, jIndex);
      console.log(index, jIndex, obj);
      this.form.list[index].content.push(obj);
      console.log(this.form.list);
    },
    switchFn(index, jIndex) {
      let tmp = {};
      switch (index) {
        case 0:
          tmp = {
            id: 1 + jIndex,
            year: "",
            dataNum: "",
            sub: "万人",
            subTitle: "R&D人员："
          };
          break;
        case 1:
          tmp = {
            id: 1 + jIndex,
            year: "",
            dataNum: "",
            sub: "亿元",
            subTitle: "R&D投入："
          };
          break;
        case 2:
          tmp = {
            id: 1 + jIndex,
            year: "",
            dataNum: "",
            sub: "项",
            subTitle: "专利申请量："
          };
          break;
        case 3:
          tmp = {
            id: 1 + jIndex,
            year: "",
            dataNum: "",
            sub: "项",
            subTitle: "发明专利申请量："
          };
          break;
        case 4:
          tmp = {
            id: 1 + jIndex,
            year: "",
            dataNum: "",
            sub: "家",
            subTitle: "高新技术企业数量："
          };
          break;
        case 5:
          tmp = {
            id: 1 + jIndex,
            year: "",
            dataNum: "",
            sub: "亿元",
            subTitle: "技术合同登记额："
          };
          break;

        default:
          break;
      }
      return tmp;
    },
    saveUp() {
      let parkId = this.SSH.getItem("parkId");
      let params = [];
      this.$refs['accordionForm'].validate((valid) => {
          if (valid) {
             try{
              this.form.list.forEach((item, index) => {
              if (item.content.length > 0) {
                item.content.forEach(items => {
                  if(!items.dataNum || !items.year){
                    throw '数据不完整'
                    return false
                  }
                  let obj = Object.assign({}, items, {
                    parkId: parkId,
                    type: index
                  });
                  params.push(obj);
                });
              }
            });
            }catch(err){
                this.$message('数据完整设置后，才可上传')
                return false
            }

            this.$post("/dataIndex/saveData", params).then(res => {
              this.$message.success("数据上传成功");
            });
          } else {
            this.$message('数据完整设置后，才可上传')
            return false;
          }
        });
     
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
  line-height: 35px;
  letter-spacing: 0.4px;
  color: #00a0e9;
  text-indent: 9px;
}
#dataManage .accordion .el-collapse-item .el-collapse-item__header .el-collapse-item__arrow{
    line-height: 35px;
}
#dataManage .accordion .el-collapse-item .el-collapse-item__header i {
  float: right;
}
#dataManage .el-collapse-item__content {
  padding-bottom: 0;
}
#dataManage .list ul li:nth-of-type(1) .el-date-editor.el-input,
#dataManage .el-date-editor.el-input__inner {
  width: 200px !important;
}
</style>

<style lang='less' scoped>
#dataManage {
  width: 990px;
  background: #fff;
  min-height: 455px;
  padding-top: 42px;
  .baseInfo {
    width: 832px;
    margin-left: 40px;
    & > p {
      font-size: 18px;
      margin-bottom: 50px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 30px;
      letter-spacing: 4.8px;
      color: #333333;
      border-left: 8px solid #10b5ff;
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
            left: -44px;
            display: inline-block;
            width: 30px;
            background: #fff;
            height: 30px;
            line-height: 30px;
            padding-left: 5px;
          }
          .sub1 {
            left: -30px;
            width: 15px;
          }
          .el-form-item{
            width: 350px;
            .el-input{
              width: 160px;
            }
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
    cursor: pointer;
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
