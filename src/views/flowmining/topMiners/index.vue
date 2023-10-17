<template>
  <div class="home-container">
    <div class="accountsinfo-container">
      <div class="content-container">
        <div class="content-wrapper">
          <f-table
            tableMin="300px"
            :search="true"
            placeholder="flowmining.TrafficMiner"
            searchName="miner_addr"
            :param="getParam"
            title="flowmining.ToPTrafficMiners"
            :data-utils="dataUtils"
            table-type="table"
            url="/platform/flow/getflowMinerRanklist"
            :table-heard="tableHeard"
          >
            <template slot="top_page">
              <div>
                <el-button
                  size="small"
                  plain
                  :type="sortBy == 'bandwidth' ? 'primary' : 'default'"
                  round
                  @click="sortBy = 'bandwidth'"
                  >{{ $t("flowmining.AdjPower") }}</el-button
                >
                <el-button
                  size="small"
                  plain
                  :type="sortBy == 'revenue_amount' ? 'primary' : 'default'"
                  round
                  @click="sortBy = 'revenue_amount'"
                  >{{ $t("mininglog.earnings") }}</el-button
                >

                <el-button
                  size="small"
                  plain
                  :type="sortBy == 'miner_flow' ? 'primary' : 'default'"
                  round
                  @click="sortBy = 'miner_flow'"
                  >{{ $t("flowmining.NetworkFlow") }}</el-button
                >
              </div>
            </template>
            <span
              slot="col_miner_addr"
              @click="gotoView(scope.data)"
              slot-scope="scope"
              class="cursor"
              style="color: #4a7bd3"
            >
              {{ getAddrFormat(scope.data.miner_addr,10) }}
            </span>
         
            <span slot="col_bandwidth_str" slot-scope="scope" style="">
              {{ scope.data.bandwidth_str}}
            </span>

             <span slot="col_revenue_amount" slot-scope="scope" style="">
              {{ scope.data.revenue_amount }} {{ "  /  "
              }}{{ scope.data.totalRevenueamount }}
            </span>

             <span slot="col_miner_flow" slot-scope="scope" style="">
              {{ scope.data.miner_flow }} {{ "  /  "
              }}{{ scope.data.totalFlow }}
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
      setTimes: null,
      sortBy: "bandwidth",
      tableHeard: [
        {
          name: "miner_addr",
          label: "flowmining.TrafficMiner",
          type: "address",
        },
        {
          name: "bandwidth_str",
          label: "flowmining.AdjPowerProportion",
          minWidth: "166px",
        },
        {
          name: "revenue_amount",
          label: "mininglog.miningProportion",
          minWidth: "166px",
        },
        {
          name: "miner_flow",
          label: "flowmining.FlowProportion",
          minWidth: "166px",
        },
        {
          name: "dayProfitamount",
          label: "flowmining.Rewardh",
          minWidth: "120px",
        },

        { name: "dayFlow", label: "flowmining.FlowGrowthh", minWidth: "120px" },
      ],
      dataUtils: (item) => {
        item.dayProfitamount = `${utils.clearZero(item.dayProfitamount)} NFC`;
       
       item.totalRevenueamount =
          this.percentage(item.totalRevenueamount, item.revenue_amount) + "%";
       item.revenue_amount = `${utils.clearZero(item.revenue_amount)} NFC`;
       
       item.totalbandwidth =
          this.percentage(item.totalbandwidth, item.bandwidth) + "%";
        item.bandwidth = utils.getSuffix(item.bandwidth || 0, "bps");

    item.bandwidth_str=` ${item.bandwidth }  /  ${ item.totalbandwidth }`

        item.totalFlow =
          this.percentage(item.totalFlow, item.miner_flow) + "%";
        item.miner_flow = utils.getSuffix(item.miner_flow || 0, "iB");
        item.dayFlow = utils.getSuffix(item.dayFlow || 0, "iB");
      },
    };
  },
  computed: {
    getParam() {
      return { sortBy: this.sortBy, descending: true };
    },
  },
  methods: {
    percentage(numA, numB) {
      if (numA <= 0 || numB <= 0) {
        return 0;
      }
      return ((numB / numA) * 100).toFixed(2);
    },
    gotoView(data) {
      if (data.miner_addr) {
        helper.goPathUrl(this, "topminingview", data.miner_addr);
      }
    },
    getAddrFormat(val, num = 15) {
      return helper.getAddrFormat(val, num);
    },
  },
};
</script>
