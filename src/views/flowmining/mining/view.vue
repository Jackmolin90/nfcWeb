<template>
  <div class="accountsinfo-container ieHome">
    <div
      class="content-container list-container punishment"
      style="margin-top: -170px"
    >
      <div class="content-wrapper">
        <f-table
          title="flowmining.minerview"
          :url="tableUrl"
          :table-heard="tableHeard"
          :param="getParam"
          :show-action="false"
          :data-utils="dataUtils"
          :ation-width="100"
        >
        </f-table>
      </div>
    </div>
  </div>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
import webSdk from "@/utils/webSdk.js";
import { ethers } from "ethers";
export default {
  components: { fTable },
  data() {
    return {
      tableUrl: "",
      tableParam: {},
      tableHeard: [
        {
          name: "en_address",
          label: "flowmining.Minersaddress",
          type: "address",
        },
        {
          name: "bandwidth",
          label: "flowmining.bandwidthmbps",
          minWidth:"131px"
        },
        {
          name: "report_time",
          label: "flowmining.time",
          isT: true,
        },
        {
          name: "flow_value",
          label: "flowmining.miningflow",
           minWidth:"114px"
        },
        {
          name: "fulnum",
          label: "flowmining.consumeful",
           minWidth:"114px"
        },
        {
          name: "revenue_address",
          label: "flowmining.revenueaddress",
          type: "address",
        },
        {
          name: "profitamount",
          label: "flowmining.profitamount",
           minWidth:"114px"
        },
      ],
      dataUtils: (item) => {
        item.flow_value = utils.getSuffix(item.flow_value, "iB");
        item.fulnum = utils.clearZero(item.fulnum, 4);
        item.profitamount = utils.clearZero(item.profitamount);
      },
    };
  },
  created() {
    let ids = this.$route.params.id;
    if (!ids) {
      return;
    }
    let idArr = ids.split("_");
    if (idArr.length != 2) {
      return;
    }
    this.tableParam = {
      miner_addr: idArr[0],
      time: idArr[1],
    };
    this.tableUrl = "/platform/flow/pageNfcCltDetailList";
  },
  methods: {
   
  },
  computed: {
    getParam() {
      return this.tableParam;
    },
  },
};
</script>
<style scoped>
.top-wrapper {
  width: 100%;
}
</style>