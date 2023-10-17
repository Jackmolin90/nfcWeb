<template>
  <div class="blocklist-container ieHome">
    <div class="content-container">
      <f-elrow
        title="mymanage.miningrecords"
        :titles="titles"
        :datas="rowDatas"
        :col-width="8"
        bgcolor="#fff"
        title-align="right"
        title-width="140px"
      >
      </f-elrow>
    </div>
      <div class="content-container list-container">
        <tablem />
    </div>
  </div>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
import fElrow from "@/components/modules/Felrow.vue";
import * as api from "@/api/api";
import tablem from "./table.vue";
export default {
  components: { fTable, fElrow, tablem },
  data() {
    return {
      titles: [
        {
          titles: [
            { title: "mininglog.payearnings" },
            { title: "mininglog.expendful" },
            { title: "mininglog.minersNumber" },
          ],
          colWidth: 12,
        },
        {
          titles: [
            // { title: "mininglog.payfulnum" },
            { title: "mininglog.theremaining" },
            { title: "mininglog.miningearnings" },
          ],
          colWidth: 12,
        },
      ],
      rowDatas: {},
    };
  },
  created() {
    this.getrowDatas();
  },
  activated() {
    this.getrowDatas();
  },
  methods: {
    getrowDatas() {
      api
        .postJson("/platform/my/outLine", {
          revenue_address: this.$store.getters.account,
        })
        .then((response) => {
          let data = response.result || {};
        
          this.rowDatas = {
            "mininglog.payearnings": data.address,
            "mininglog.expendful": `${utils.clearZero(data.payful)} FUL`,
            "mininglog.minersNumber": data.minerCount,
            "mininglog.theremaining": `${utils.clearZero(data.ful_balance)} FUL`,
            "mininglog.miningearnings": utils.isEmpty(data.revenue_amount)
              ? ""
              : `${utils.clearZero(data.revenue_amount)} NFC`,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    "$store.getters.account": function () {
      this.getrowDatas();
    },
  },
};
</script>