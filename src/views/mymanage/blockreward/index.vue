<template>
  <div class="home-container" style="padding: 0px">
    <div class="accountsinfo-container">
      <div class="content-container">
        <div class="content-container">
          <f-elrow
            :title="title"
            bgcolor="#fff"
            title-width="auto"
            :titles="titles"
            :datas="datas"
          >
            <div slot="colrow_total">
              {{$t("mymanage.totalblock", [datas.totalamount || 0])}}
            </div>
             <div slot="colrow_phone_total">
              {{
                $t("mymanage.Totalbandwidthmining", [datas.totalamount || 0])
              }}
            </div>
          </f-elrow>
        </div>
        <div class="content-wrapper">
          <statistics :type="type" :title="tableTitle" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fElrow from "@/components/modules/Felrow.vue";
import statistics from "@/views/mymanage/statistics/index.vue";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
import * as api from "@/api/api";
export default {
  components: { fElrow, statistics },
  data() {
    return {
      type: 1,
      title: "mymanage.blockreward",
      tableTitle: "mymanage.releaserecord",
      titles: [
        {
          titles: [{ title: "total" }],
          colWidth: 24,
        },
        {
          titles: [{ title: "lock.LockedReward", name: "leftamount" }],
        },
        {
          titles: [{ title: "lock.ReleasedReward", name: "releaseamount" }],
        },
      ],
      datas: {},
    };
  },
  created() {
    this.loadDatas();
  },
  methods: {
    toRelease(data) {
      if (data.address && data.type) {
        helper.goPathUrl(
          this,
          "releaseList",
          `${data.address}_${data.type + 1}_${data.blockNumber}_${data.revenue_address}`
        );
      }
    },
    loadDatas() {
      let param = {
        type: this.type,
        revenueAddress: this.$store.getters.account,
      };
      api
        .postJson("/platform/lockSummaryByRevAddress", param)
        .then((response) => {
          let datas = response.result || {};
          datas.totalamount = `${utils.clearZero(datas.totalamount)}`;
          datas.releaseamount = `${utils.clearZero(datas.releaseamount)} NFC`;
          datas.leftamount = `${utils.clearZero(datas.leftamount)} NFC`;
         
          this.datas = datas;
        })
        .catch((err) => {});
    },
  },
  watch: {
    "$store.getters.account": function () {
      this.loadDatas();
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