<template>
  <div class="blocklist-container ieHome">
    <div class="content-container">
      <f-elrow
        title="mymanageMining.bandwidthlog"
        :titles="titles"
        :datas="rowDatas"
        :col-width="8"
        bgcolor="#fff"
        title-align="left"
      >
      </f-elrow>
    </div>
    <div class="content-container">
      <div class="content-wrapper">
        <f-table
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
    return {
      address: "",
      tableUrl: "",
      titles: [
        {
          titles: [{ title: "mymanageMining.miner" }],
          colWidth: 12,
        },
        {
          titles: [{ title: "mymanageMining.nowbandwidth" }],
          colWidth: 12,
        },
      ],
      rowDatas: {},

      tableHeard: [
        {
          name: "param1",
          label: "mymanageMining.mineraddr",
          type: "address",
          width: "380px",
        },
        {
          name: "param3",
          label: "mymanageMining.bandwidth",
        },
        {
          name: "param4",
          label: "mymanageMining.pledgeamount",
        },
        {
          name: "timeStamp",
          label: "mymanageMining.time",
        },
      ],
      dataUtils: (item) => {
        item.param4 = utils.isEmpty(item.param4) ? "" : `${utils.clearZero(item.param4)} NFC`;
        item.param3 = utils.isEmpty(item.param3) ? "" : `${item.param3} Mbps`;
        let time = item.timeStamp;
        try {
          if (item.timeStamp) {
            time = helper.formatTime(item.timeStamp / 1000);
          }
        } catch (error) {}
        item.timeStamp = time;
      },
    };
  },
  created() {
    this.address = this.$route.params.id;
    if (!this.address) {
      return;
    }
    this.tableUrl = "/platform/getTxRecord";
    this.getrowDatas();
  },
  activated() {
    this.getrowDatas();
  },
  methods: {
    getrowDatas() {
      api
        .postJson("/platform/my/getminerdetail", { miner_addr: this.address })
        .then((response) => {
          let data = response.result || {};
          this.rowDatas = {
            "mymanageMining.miner": this.address,
            "mymanageMining.nowbandwidth": (data.bandwidth || 0) + " Mbps",
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    getParamOne() {
      return {
        param1: this.address,
        txType: "FlwReq",
      };
    },
  },
};
</script>