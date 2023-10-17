<template>
  <div class="home-container">
    <div class="accountsinfo-container">
      <div class="content-container">
        <div class="content-wrapper">
          <f-table
            :search="false"
            placeholder=""
            title="mymanage.producedBlock"
            :param="getParam"
            :data-utils="dataUtils"
            :datas-utils="datasUtils"
            table-type="div"
            search-name="fromAddr"
            :url="'/platform/getBlockList'"
            :table-heard="tableHeard"
            total-text="ftable.totalnumberproduced"
          >
            <div
              slot="col_blockNumber"
              slot-scope="scope"
              style="
                font-size: 16px;
                font-weight: bold;
                color: #4a7bd3;
                cursor: pointer;
              "
              @click="goToUrl('Blockinfo', scope.data.blockNumber)"
            >
              {{ scope.data.blockNumber }}
            </div>
            <div slot="col_gasUsed" slot-scope="scope">
              {{ scope.data.gasUsed }} ({{ scope.data.gasUsedRate }}%)
              <el-slider v-model="scope.data.gasUsedRate" disabled />
            </div>
            <span slot="col_phone_gasUsed" slot-scope="scope">
              {{ scope.data.gasUsed }} ({{ scope.data.gasUsedRate }}%)
            </span>

            <div slot="col_timeStamp" slot-scope="scope">
              {{ formatTime(scope.data.timeStamp) }}
            </div>
            <span slot="col_phone_timeStamp" slot-scope="scope">
              {{ formatTime(scope.data.timeStamp) }}
            </span>
          </f-table>
        </div>
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
  data() {
    return {
      setTimes: null,
      tableHeard: [
        { name: "blockNumber", label: "home.block" },
        { name: "timeStamp", label: "mymanage.age" },
        {
          name: "blockTransactionCount",
          label: "home.blockTranNumber",
        },
        {
          name: "gasUsed",
          label: "Gas Used",
          notT: true,
        },
        { name: "awardunit", label: "home.blockReward" },
      ],
      dataUtils: (item) => {
        item.awardunit =
          helper.getDataFormat(item.reward, 18, 10000).toFixed(4) + " NFC";
        item.gasUsedRate = item.gasUsed
          ? Math.floor((item.gasUsed / item.gasLimit) * 10000) / 100
          : 0;
      },
      datasUtils: (arr = []) => {
        if (this.setTimes) {
          clearInterval(this.setTimes);
          this.setTimes = null;
        }
        this.setTimes = setInterval(() => {
          arr.forEach((item) => {
            item.timeStamp++;
          });
        }, 1000);
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
  destroyed() {
    if (this.setTimes) {
      clearInterval(this.setTimes);
    }
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
          timeL = times[0] > 1 && times[1].indexOf("s") < 0 ? timeL + "s" : timeL;
        }
      }
      return timeL;
    },
  },
  computed: {
    getParam() {
      let address = this.$store.getters.account;
      return {
        address: address,
      };
    },
  },
};
</script>
<style scoped>
.accountsinfo-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.accountsinfo-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  height: 3px;
}

.accountsinfo-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}
</style>