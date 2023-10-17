<template>
  <f-table
   @totalchange="totalchange"
    :div-img="true"
 
    :url="tableUrl"
    :table-heard="tableHeard"
    :param="getParamOne"
    :show-action="false"
    :data-utils="dataUtils"
    :search="false"
    placeholder="mininglog.payearnings"
  >
    <template slot="div_table_top" slot-scope="scope">
      <div
        style="
          padding-top: 30px;
          padding-left: 180px;
          color: #555;
          font-size: 15px;
        "
      >
        {{ getTopData(scope.data) }}
      </div>
    </template>
   
    <template slot="col_fwflag" slot-scope="dataL">
      {{ $t(dataL.data.fwflag==0?"mymanage.FlowReward":"mymanage.BandwidthReward") }}
    </template>
      <template slot="col_phone_fwflag" slot-scope="dataL">
      {{ $t(dataL.data.fwflag==0?"mymanage.FlowReward":"mymanage.BandwidthReward") }}
    </template>
    <!--<template slot="col_lockNumber" slot-scope="dataL">
      {{ dataL.data.lockNumber || 0 }}{{ " " + $t("mininglog.day") }}
    </template>-->
  </f-table>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
export default {
  components: { fTable },
  props: {
    param: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tableUrl: "/platform/flow/pageNfcCltList",
      tableHeard: [
        {
          name: "report_time",
          label: "mininglog.oreremoval",
        },
        {
          name: "bandwidth",
          label: "mininglog.bandwidth",
        },
        {
          name: "flow_value",
          label: "mininglog.flow",
        },
        {
          name: "fulnum",
          label: "mininglog.expendful",
        },
        {
          name: "profitamount",
          label: "mininglog.miningearnings",
        },

        {
          name: "lock_amount",
          label: "mininglog.locknumber",
        },
        {
          name: "fwflag",
          label: "mininglog.Rewardtype",
        },
        {
          name: "release_amount",
          label: "mininglog.unlockedquantity",
        },
      ],
      
      dataUtils: (item) => {
        let map = {
         // bandwidth: "Mbps",
         // miner_flow: "GiB",
          fulnum: "FUL",
          profitamount: "NFC",
          lock_amount: "NFC",
          release_amount: "NFC",
        };
         item.bandwidth=utils.getSuffix(item.bandwidth,"bps")
        item.flow_value=utils.getSuffix(item.flow_value,"iB")
        item.profitamount = utils.clearZero(item.profitamount, 4);
        item.lock_amount = utils.clearZero(item.lock_amount, 4);
        item.release_amount = utils.clearZero(item.release_amount, 4);
        item.fulnum = utils.clearZero(item.fulnum, 4);

        this.getStrType(item, map);
      },
    };
  },
  methods: {
    totalchange(val){
         this.$emit("totalchange",val);
    },
    getTopData(data = {}) {
      return `${this.$t("mymanageMining.miner")}(${
        data.en_address
      })--->${this.$t("mymanageMining.miningpool")}---->${this.$t(
        "mymanageMining.payearnings"
      )}(${data.revenue_address})`;
    },
    getStrType(obj, map) {
      for (let key in map) {
        let str = map[key];
        obj[key] = utils.isEmpty(obj[key]) ? "" : `${obj[key]} ${str}`;
      }
    },
    
  },
  computed: {
    getParamOne() {
      let address = this.$store.getters.account;
      let data = {
        revenue_address: address,
      };
      Object.assign(data, this.param);

      return data;
    },
  },
};
</script>