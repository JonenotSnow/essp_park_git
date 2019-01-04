<template>
  <div class="newpark_warp warp_dmt">
    <!-- 数据监测模块 -->
    <div class="main_inter">
      <div class="com-tit">数据监测</div>
      <div class="com-brf">保定市近五年规模以上工业企业科技统计主要指标</div>
      <div class="chartbox">
        <el-carousel
          indicator-position="outside"
          class="resultbox"
          :interval="50000"
          arrow="never"
        >
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
  created() {
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
      this.list.charta.setOption(newParkHomeChartData.firstData);
      this.list.chartb.setOption(newParkHomeChartData.secondData);
      this.list.chartc.setOption(newParkHomeChartData.threeData);
      this.list.chartd.setOption(newParkHomeChartData.firstData);
      this.list.charte.setOption(newParkHomeChartData.secondData);
      this.list.chartf.setOption(newParkHomeChartData.threeData);
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
    float: left;
    width: 380px;
    height: 265px;
    margin-right: 20px;
    background-color: #ffffff;
    box-shadow: 2.5px 4.3px 19.4px 0.6px rgba(0, 0, 0, 0.15);
  }
  &:last-child {
    margin-right: 0px;
  }
}
.el-carousel__item h3{
  color: #ffffff
}
</style>
