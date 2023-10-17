<template>
  <div>
    <div style="padding-left: 5%">
      <el-date-picker
        v-model="dates"
        type="daterange"
        range-separator="~"
        start-placeholder="Start"
        end-placeholder="End"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </div>

    <div ref="chart_ie" class="chart_context"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import * as api from "@/api/api";
import utils from "@/utils/utils";
import * as helper from "@/utils/helper";

export default {
  name: "flowChart",
  mounted() {
    this.setChahrt();
  },
  data() {
    const endTime = new Date().getTime();
    const startTime = endTime - 30 * 24 * 60 * 60 * 1000;
    const endL = helper.formatTime(endTime / 1000, "yyyy-MM-dd");
    const startL = helper.formatTime(startTime / 1000, "yyyy-MM-dd");
    let _this_ = this;
    return {
      dates: [startL, endL],
      chartObj: null,
      option: {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          formatter: (item) => {
            let reStr = `${item[0].axisValue}<br/>`;
            item.forEach((element) => {
              reStr += `${element.marker || ""} ${element.seriesName} : ${
                element.value || 0
              } GiB <br/>`;
            });
            return reStr;
          },
        },
        legend: {
          show: false,
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
       /* toolbox: {
          feature: {
            saveAsImage: {},
          },
        },*/
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],
        },
        yAxis: {
          type: "value",
          name: "GiB",
        },
        series: [],
      },
    };
  },
  methods: {
    setChahrt() {
      if (!this.chartObj) {
        this.chartObj = echarts.init(this.$refs.chart_ie, "light");
      }
      this.chartObj.resize();
      this.chartObj.showLoading({
        text: "Loading...",
        textStyle: { fontSize: 30, color: "#444" },
        effectOption: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      });
      this.getDatas();
    },
    getDatas() {
      let query = {
        startTime: "",
        endTime: "",
      };
      if (this.dates && this.dates.length == 2) {
        query.startTime = this.dates[0];
        query.endTime = this.dates[1];
      }

      api
        .postJson("/platform/getNfcNetStatics", query)
        .then((response) => {
          let arr = response.result || [];

          let dataMap = utils.chartData(arr, "ctime", this.chartConfig());
          this.option.legend.data = dataMap.legendsData;
          this.option.xAxis.data = dataMap.xAxisData;
          this.option.series = dataMap.series;

          this.chartObj.setOption(this.option, true);
          this.chartObj.hideLoading();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    chartConfig() {
      return [
        {
          name: "totalflow",
          getData: (item) => {
            return item.totalflow ? item.totalflow / 1024 : item.totalflow;
          },
          propertys: {
            name: this.$t("charts.totalflow"),
            type: "line",
            stack: "Total",
          },
        } /*,
        {
          name: "incre_flow",
           getData:(item)=>{
           return  item.incre_flow?item.incre_flow/1024:item.incre_flow
          },
          propertys: {
            name: this.$t("charts.growth"),
            type: "line",
            stack: "Total"
           
          },
        },*/,
      ];
    },
  },

  watch: {
    "$i18n.locale": function () {
      this.setChahrt();
    },
    dates: function () {
      this.setChahrt();
    },
  },
};
</script>
<style scoped>
.chart_context {
  height: 250px;
  width: 100%;
}
</style>