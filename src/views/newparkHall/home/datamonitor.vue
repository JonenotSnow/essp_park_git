<template>
  <div class="newpark_warp warp_dmt">
    <!-- 数据监测模块 -->
    <div class="main_inter">
      <div class="com-tit">数据监测</div>
      <div class="com-brf">保定市近五年规模以上工业企业科技统计主要指标</div>
      <div class="chartbox">
        <el-carousel indicator-position="outside" class="resultbox" :interval="50000" arrow="never">
          <el-carousel-item>
            <div id="homecharta" class="conchart"></div>

            <div id="homechartb" class="conchart"></div>

            <div id="homechartc" class="conchart"></div>
          </el-carousel-item>
          <el-carousel-item>
            <div id="homechartd" class="conchart"></div>

            <div id="homecharte" class="conchart"></div>

            <div id="homechartf" class="conchart"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { newParkHomeChartData } from "./chartoptions/newParkHome_chartData.js";
export default {
  data() {
    return {
      msg: "数据监测",
      list: {
        charta: null,
        chartb: null,
        chartc: null,
        chartd: null,
        charte: null,
        chartf: null
      }
    };
  },
  async created() {
    await this.getData();
    this.$nextTick(function() {
      this.initChart();
    });
  },

  computed: {},
  components: {},
  methods: {
    initChart() {
      this.list.charta = this.$echarts.init(
        document.getElementById("homecharta")
      );
      this.list.chartb = this.$echarts.init(
        document.getElementById("homechartb")
      );
      this.list.chartc = this.$echarts.init(
        document.getElementById("homechartc")
      );
      this.list.chartd = this.$echarts.init(
        document.getElementById("homechartd")
      );
      this.list.charte = this.$echarts.init(
        document.getElementById("homecharte")
      );
      this.list.chartf = this.$echarts.init(
        document.getElementById("homechartf")
      );
      this.list.charta.setOption(newParkHomeChartData.data0);
      this.list.chartb.setOption(newParkHomeChartData.data1);
      this.list.chartc.setOption(newParkHomeChartData.data2);
      this.list.chartd.setOption(newParkHomeChartData.data3);
      this.list.charte.setOption(newParkHomeChartData.data4);
      this.list.chartf.setOption(newParkHomeChartData.data5);
    },
    async getData() {
      let that = this;

      await this.$post("/dataIndex/getIndexData", {
        parkId: sessionStorage.getItem("parkId")
      }).then(res => {
        if (res.resultData) {
          let dataList = [];
          res.resultData.forEach(el => {
            if (el.type < 6) {
              if (!Array.isArray(dataList[el.type])) {
                dataList[el.type] = [];
              }
              dataList[el.type].push(el);
            }
          });
          dataList.forEach((element, index) => {
            element = element.reverse();
            newParkHomeChartData["data" + index].xAxis.data = [];
            newParkHomeChartData["data" + index].series[0].data = [];
            element.forEach(element => {
              console.log(newParkHomeChartData["data" + index])
              if (newParkHomeChartData["data" + index].xAxis.data.length < 5) {
                newParkHomeChartData["data" + index].xAxis.data.push(
                  element.year
                );
                // console.log(newParkHomeChartData["data" + index].xAxis)
                newParkHomeChartData["data" + index].series[0].data.push(
                  element.dataNum
                );
              }
            });
            console.log(newParkHomeChartData["data" + index].xAxis)
          });
        }
      });
    }
  }
};
</script>

<style lang='less' scoped >
@import "../../../assets/css/newpark/home.common.less";
.warp_dmt {
  height: 545px;
  background-color: #ffffff;
}
.chartbox {
  padding-top: 50px;
  .conchart {
    &:nth-of-type(1) {
      margin-left: 10px;
    }
    &:nth-of-type(3) {
      margin-right: 10px;
    }
  }
  .conchart {
    float: left;
    width: 380px;
    height: 265px;
    margin-right: 20px;
    margin-top: 10px;
    background-color: #ffffff;
    box-shadow: 2.5px 4.3px 19.4px 0.6px rgba(0, 0, 0, 0.15);
  }
  &:last-child {
    margin-right: 0px;
  }
}
.el-carousel__item h3 {
  color: #ffffff;
}
</style>
