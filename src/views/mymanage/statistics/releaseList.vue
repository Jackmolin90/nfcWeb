<template>
  <div class="home-container" style="padding: 0px">
    <div class="accountsinfo-container">
      <div class="content-container">
        <div class="content-wrapper">
          <f-table
            total-text="ftable.totalnumberrelease"
            :title="getTitle"
            :param="getParam"
            :data-utils="dataUtils"
            table-type="table"
            :url="tableUrl"
            :table-heard="tableHeard"
          >
            <span
              slot="col_address"
              slot-scope="scope"
              style="color: #4a7bd3; cursor: pointer"
              @click="toRelease(scope.data)"
            >
              {{ scope.data.address }}
            </span>
          </f-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
import * as helper from "@/utils/helper";
export default {
  components: { fTable },
  data() {
    return {
      address: "",
      type: 0,
      tableUrl: "",
      titles: [
        {
          titles: [{ title: "total" }],
          colWidth: 24,
        },
        {
          titles: [{ title: "lock.WaitingReleased", name: "leftamount" }],
        },
        {
          titles: [{ title: "lock.ReleasedReward", name: "releaseamount" }],
        },
      ],
      datas: {},
      tableHeard: [
        {
          name: "address",
          label: "lock.minerAddress",
          overflow: true,
          minWidth: "170px",
        },
        {
          name: "blockNumber",
          label: "lock.blockNumber",
        },
        // { name: "totalAmount", label: "lock.Locked" },
        { name: "leftAmount", label: "lock.LockedReward" },
        { name: "releaseamount", label: "lock.ReleasedReward" },
        { name: "lockingTime", label: "lock.ReleasedTime" },
      ],
      dataUtils: (item) => {
        //  item.totalAmount = `${utils.clearZero(item.totalAmount, 4)} NFC`;
        item.lockingTime =
          utils.lockingTime(
            item.startTime,
            item.avgBlockTime,
            item.unLockNumber,
            item.releaseHeigth
          ) + " Day";
        item.leftAmount = `${
          utils.clearZero((item.totalAmount||0)-(item.releaseamount||0), 4) 
        } NFC`;
        item.releaseamount = `${utils.clearZero(item.releaseamount, 4)} NFC`;
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
  created() {
    let id = this.$route.params.id;
    if (!id) {
      return;
    }
    let ids = id.split("_");
    if (ids.length != 2) {
      return;
    }
    this.address = ids[0];
    this.type = ids[1];
    this.tableUrl = "/platform/lockNfcMinerInfo";
  },
  methods: {
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
    toRelease(data) {
      if (data.address && data.type) {
        helper.goPathUrl(
          this,
          "releaseList",
          `${data.address}_${data.type + 1}_${data.blockNumber}_${data.revenue_address}`
        );
      }
    },
  },
  computed: {
    getParam() {
      let revenueAddress=this.$store.getters.account;
      return {
        address: this.address,
        type: this.type,
        revenueAddress
      };
    },
    getTitle() {
      switch (this.type) {
        case "1":
          return "mymanage.blockreward";
        case "5":
          return "mymanage.FlowReward";
        case "9":
          return "mymanage.BandwidthReward";
        default:
          return "";
      }
    },
  },
  watch: {
    "$store.getters.account": function () {
      this.loadDatas();
    },
  },
};
</script>