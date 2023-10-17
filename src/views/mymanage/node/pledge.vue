<template>
  <div class="blocklist-container ieHome">
    <div class="content-container">
      <div class="content-container">
        <f-table
          title="mymanageNode.pledgelog"
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
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
export default {
  components: { fTable },
  data() {
    return {
      address: "",
      tableUrl: "",
      tableHeard: [
        {
          name: "param1",
          label: "mymanageNode.node",
          type: "address",
        },
        {
          name: "param4",
          label: "mymanageNode.pledgenum",
        },
        {
          name: "blockNumber",
          label: "mymanageNode.pledgeheight",
        },
        {
          name: "timeStamp",
          label: "mymanageNode.pledgetime",
        },
      ],
      dataUtils: (item) => {
        let time = "";
        try {
          time = helper.formatTime(item.timeStamp / 1000,'yyyy-MM-dd hh:mm:ss');
        } catch (error) {}
        item.timeStamp = time;
        item.param4 = utils.isEmpty(item.param4) ? "" : `${utils.clearZero(item.param4)} NFC`;
      },
    };
  },
  created() {
    this.address = this.$route.params.id;
    if (!this.address) {
      return;
    }
    this.tableUrl = "/platform/getTxRecord";
  },
  computed: {
    getParamOne() {
      return { param1: this.address, txType: "CandReq" };
    },
  },
};
</script>