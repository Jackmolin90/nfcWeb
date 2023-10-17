<template>
  <div class="accountsinfo-container ieHome">
    <div class="content-container">
      <f-elrow
        :titles="titles"
        :datas="rowDatas"
        :col-width="12"
        position="left"
        bgcolor="#fff"
        title-width="110px"
        title-align="right"
      >
      </f-elrow>
    </div>

    <div class="content-container list-container">
      <div style="padding-top: 15px"></div>
      <f-table
        title="node.punishRepairPaymentLog"
        :param="getParam"
        :data-utils="dataUtils"
        placeholder=""
        :url="tableUrl"
        :table-heard="tableHeard"
      />
    </div>
  </div>
</template>
<script>
import * as api from "@/api/api";
import utils from "@/utils/utils";
import fTable from "@/components/modules/Ftable.vue";
import fElrow from "@/components/modules/Felrow.vue";
import * as helper from "@/utils/helper";
export default {
  components: { fElrow, fTable },
  data() {
    return {
      account: "",
      tableUrl: "",
      titles: [
        {
          titles: [{ title: "mymanageNode.node" }],
        },
        {
          titles: [{ title: "node.nowpunishScore" }],
        },
      ],
      rowDatas: {
        "mymanageNode.node": "",
        "node.nowpunishScore": "",
      },
      tableHeard: [
        { name: "param1", label: "mymanageNode.payaddress", type: "address" },
        { name: "param3", label: "mymanageNode.paynumber" },
        { name: "param4", label: "mymanageNode.nfcnumber" },
        { name: "timeStamp", label: "mymanageNode.paytime" },
        { name: "blockNumber", label: "mymanageNode.payheight" },
      ],
      dataUtils: (item) => {
        item.param4 = utils.clearZero(item.param4);
        let time = "";
        try {
          time = helper.formatTime(item.timeStamp / 1000);
        } catch (error) {}
        item.timeStamp = time;
        item.param3 = utils.isEmpty(item.param3) ? "" : `${item.param3}`;
      },
    };
  },
  created() {
    this.account = this.$route.params.id;
    if (!this.account) {
      return;
    }
    this.tableUrl = "/platform/getTxRecord";
    this.loadData();
  },
  activated() {
    this.account = this.$route.params.id;
    if (!this.account) {
      return;
    }
    this.loadData();
  },
  methods: {
    loadData() {
      this.btnLoading = true;
      let rowDatas = {
        "mymanageNode.node": this.account,
        "node.nowpunishScore": "---",
      };

      this.rowDatas = rowDatas;
      api
        .postJson("/platform/node/getcadnode", { node_address: this.account })
        .then((response) => {
          let result = response.result || {};
          rowDatas["node.nowpunishScore"] = result.fractions || 0;
        })
        .catch((error) => {});
    },
  },
  computed: {
    getParam() {
      return { param1: this.account, txType: "CandPnsh" };
    },
  },
};
</script>
<style scoped>
.ie-form-item__label {
  font-weight: 600 !important;
  color: #555;
}
</style>