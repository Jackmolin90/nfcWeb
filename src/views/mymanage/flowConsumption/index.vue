<template>
  <div class="accountsinfo-container">
    <div class="content-container">
      <div class="content-wrapper">
        <f-table
          :search="true"
          placeholder="ftable.searchAddress"
          :title="isModule ? '' : 'flowConsumption.flowConsumption'"
          :param="s_param"
          :data-utils="dataUtils"
          search-name="fromAddr"
          :url="initOk ? '/platform/getFlowReportList' : ''"
          :table-heard="tableHeard"
        >
          <div slot="top_search">
            <el-date-picker
              class="ie_date_picker"
              style="width: 130px; padding: 5px 0px"
              v-model="search.starttime"
              type="date"
              :placeholder="$t('flowConsumption.startDate')"
              format="yyyy-MM-dd"
              :picker-options="{
                disabledDate: disabledDateStart,
              }"
            >
            </el-date-picker>

            <el-date-picker
              class="ie_date_picker"
              :picker-options="{
                disabledDate: disabledDateEnd,
              }"
              v-model="search.endtime"
              type="date"
              :placeholder="$t('flowConsumption.endDate')"
              style="width: 130px; padding: 5px 0px"
              format="yyyy-MM-dd"
            >
            </el-date-picker>

            <el-input
              style="width: 280px"
              v-show="isModule"
              v-model="search.target"
              :placeholder="$t('flowConsumption.target')"
            />

            <el-input
              style="width: 280px"
              v-show="!isModule"
              v-model="search.sourceAddress"
              :placeholder="$t('flowConsumption.sourceAddress')"
            />
          </div>
        </f-table>
      </div>
    </div>
  </div>
</template>
<script>
import fElrow from "@/components/modules/Felrow.vue";
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
import * as helper from "@/utils/helper";
import * as api from "@/api/api";
export default {
  components: { fElrow, fTable },
  props: {
    param: {
      type: Object,
      default() {
        return {};
      },
    },
    isModule: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let _this_ = this;
    return {
      initOk: false,
      s_param: null,
      search: {
        starttime: null,
        endtime: null,
        target: "",
        sourceAddress: "",
      },
      disabledDateStart(time) {
        if (utils.isEmpty(_this_.search.endtime)) return false;
        return new Date(_this_.search.endtime).getTime() < time.getTime();
      },
      disabledDateEnd(time) {
        if (utils.isEmpty(_this_.search.starttime)) return false;
        return new Date(_this_.search.starttime).getTime() > time.getTime();
      },
      tableHeard: [
        { name: "timestamp", label: "flowConsumption.time" },
        { name: "blocknumber", label: "flowConsumption.blockNumber" },
        {
          hide: this.isModule,
          name: "miner_addr",
          type: "address",
          label: "flowConsumption.sourceAddress",
          width: "",
        },
        {
          hide: !this.isModule,
          name: "client_addr",
          type: "address",
          label: "flowConsumption.target",
        },
        {
          name: "flow_value",
          label: "flowConsumption.flow",
        },
        { name: "ful", label: "flowConsumption.consume" },
        //   { name: "balance", label: "accounts.balance" },
      ],
      dataUtils: (item) => {
        item.timestamp = helper.formatTime(item.timestamp, "yyyy-MM-dd", true);
        item.flow_value = utils.getSuffix(item.flow_value, "iB");
        item.ful = `${utils.clearZero(item.ful, 4) || 0} FUL`;
      },

      tipsT: {
        just: " just ",
        second: " sec",
        minute: " min",
        hour: " hr",
        day: " day",
        week: " week",
        month: " month",
        year: " year",
      },
    };
  },

  methods: {
    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },
    formatTime(time) {
      let timeL = helper.formatTimimg(time);
      if (timeL) {
        let times = timeL.split(" ");
        if (this.$i18n.locale == "en") {
          timeL =
            times[0] > 1 && times[1].indexOf("s") < 0 ? timeL + "s" : timeL;
        }
      }
      return timeL;
    },
    setsPara() {
      let address = "";
      let miner_addr="";
      if (this.isModule) {
        address = this.search.target;
      } else {
        address = this.$store.getters.account;
        miner_addr = this.search.sourceAddress
      }

      let data = {
        miner_addr,
        client_addr: address,
        starttime: this.search.starttime
          ? this.search.starttime.getTime()
          : undefined,
        endtime: this.search.endtime
          ? this.search.endtime.getTime()
          : undefined,
      };
      Object.assign(data, this.param);
      this.s_param = data;
      this.initOk = true;
    },
  },

  watch: {
    search: {
      deep: true,
      handler: function () {
        this.setsPara();
      },
    },
    "$store.getters.account": {
      immediate: true,
      handler: function () {
        this.setsPara();
      },
    },
    isModule: {
      immediate: true,
      handler: function () {
        console.log("3");
        this.setsPara();
      },
    },
  },
};
</script>
<style>
.ie_date_picker .el-input__inner {
  padding-right: 0px;
}
</style>