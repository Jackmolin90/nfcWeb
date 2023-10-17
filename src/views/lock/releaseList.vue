<template>
  <div class="accountsinfo-container ieHome" style="min-height: 500px">
    <div class="content-container">
      <f-elrow
        :title-width="this.$i18n.locale=='zh'?'90px':'180px'"
        title="lock.freedDetails"
        :titles="titles"
        :datas="rowDatas"
        :col-width="8"
        bgcolor="#fff"
        title-align="left"
      >
      </f-elrow>
    </div>
    <div class="content-container" v-show="showTable">
      <div class="content-wrapper">
        <f-table
          @totalchange="totalchange"
          :url="tableUrl"
          :table-heard="tableHeard"
          :param="getParamOne"
          :show-action="false"
          :data-utils="dataUtils"
          :ation-width="200"
        ></f-table>
      </div>
    </div>
  </div>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
import fElrow from "@/components/modules/Felrow.vue";
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
export default {
  components: { fTable, fElrow },
  data() {
    const types = {
      1: "lock.nodeaward",
      2: "lock.nodeawardFreed",
      3: "lock.nodeLock",
      4: "lock.nodeFreed",
      5: "lock.flowLock",
      6: "lock.flowFreed",
      7: "lock.minerLock",
      8: "lock.minerFreed",
      9: "lock.BandwidthLock",
      10: "lock.bandwidthFreed",
    };
    return {
      address: "",
      revenue_address:"",
      type: 0,
      blockNumber: 0,
      tableUrl: "",
      showTable: false,
      types,
      titles: [
        {
          titles: [
            { title: "lock.minerAddress", name: "minerAddress" },
            {
              title: "mymanageMining.revenuesaddress",
              name: "revenue_address",
            },
            { title: "flowmining.lockquantity", name: "lockamount" },
          ],
          colWidth: 13,
        },
        {
          titles: [
            { title: "lock.type", name: "type", isT: true },
            { title: "lock.blockNumber", name: "blockNumber" },
            { title: "mymanageMining.freed", name: "releaseamount" },
          ],
          colWidth: 11,
        },
      ],
      rowDatas: {},

      tableHeard: [
        {
          name: "revenue_address",
          label: "mymanageMining.revenuesaddress",
          type: "address",
        },
        {
          name: "releaseamount",
          label: "lock.freed",
        },
        {
          name: "curtime",
          label: "lock.freedTime",
        },
      ],
      dataUtils: (item) => {
        item.releaseamount = `${utils.clearZero(item.releaseamount, 4)} NFC`;
        let time = item.curtime;
        try {
          if (time) {
            time = helper.formatTime(item.curtime / 1000);
          }
        } catch (error) {}
        item.curtime = time;
      },
    };
  },
  created() {
    let idL = this.$route.params.id;
    if (!idL) {
      return;
    }
    let ids = idL.split("_");
    if (ids.length != 4) {
      return;
    }

    this.address = ids[0];
    this.type = ids[1];
    this.blockNumber = ids[2];
    this.revenue_address=ids[3]
    this.tableUrl = "/platform/lockNfcMinerInfo";
    this.getrowDatas();
  },
  methods: {
    totalchange(val) {
      this.showTable = val > 0;
    },
    getrowDatas() {
      let param = {
        address: this.address,
        type: this.type - 1,
        blockNumber: this.blockNumber,
      };
      let rowDatas = {
        minerAddress: this.address,
        type: this.types[this.type-1],
        blockNumber: this.blockNumber,
        revenue_address:this.revenue_address||"---"
      };
      api
        .postJson("/platform/getNfcMinerLockSum", param)
        .then((response) => {
          let result = response.result || {};
          result.lockamount = `${utils.clearZero(result.lockamount)} NFC`;
          result.releaseamount = `${utils.clearZero(result.releaseamount)} NFC`;
          //result.revenueAddress=result.revenueAddress||"--"
         this.rowDatas = Object.assign(rowDatas, result);
        })
        .catch((err) => {});
    },
  },
  computed: {
    getParamOne() {
      return {
        address: this.address,
        type: this.type,
        blockNumber: this.blockNumber,
      };
    },
  },
};
</script>