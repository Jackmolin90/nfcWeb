<template>
  <f-table
    :url="''"
    :table-heard="tableHeard"
    :param="getParam"
    :show-action="true"
    :data-utils="dataUtils"
    :ation-width="100"
    title="mymanage.minersmanagement"
    total-text="ftable.totalnumbertraffic"
  >
    <template slot="ie_col_action" slot-scope="scope">
      <el-dropdown trigger="click">
        <el-button size="mini" type="default" icon="el-icon-menu">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="scope.data.table_btn_binding">
            <el-button style="width: 100%" type="default" size="mini">{{
              $t("binding.bindaddr")
            }}</el-button>
          </el-dropdown-item>
          <el-dropdown-item v-if="scope.data.table_btn_upbinding">
            <el-button style="width: 100%" type="default" size="mini">{{
              $t("mymanageMining.transferaddress")
            }}</el-button>
          </el-dropdown-item>
          <el-dropdown-item v-if="scope.data.table_btn_bindinglift">
            <el-button style="width: 100%" type="default" size="mini"
              ><span style="color: red">{{
                $t("messages.bindinglift")
              }}</span></el-button
            >
          </el-dropdown-item>
          <el-dropdown-item v-if="scope.data.table_btn_in">
            <el-button style="width: 100%" type="default" size="mini">{{
              $t("mymanageNode.makegood")
            }}</el-button>
          </el-dropdown-item>
          <el-dropdown-item v-if="scope.data.table_btn_quit">
            <el-button style="width: 100%" type="default" size="mini"
              ><span style="color: red">{{
                $t("mymanageNode.quit")
              }}</span></el-button
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </f-table>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";

export default {
  components: { fTable },
  data() {
    return {
      totalText: "node.currentCandidateNumber",
      tableHeard: [
        {
          name: "miner_addr",
          label: "mymanageMining.mineraddr",
          type: "address",
        },
        {
          name: "revenue_address",
          label: "mymanageMining.revenuesaddress",
          type: "address",
        },
        {
          name: "pledge_amount",
          label: "mymanageMining.pledgeamount",
          minWidth: "120px",
        },
        {
          name: "bandwidth",
          label: "flowmining.AdjPower",
          minWidth: "110px",
        },
        {
          name: "miner_flow",
          label: "flowmining.TotalNetworkFlow",
          minWidth: "140px",
        },

        {
          name: "dayProfitamount",
          label: "mymanageMining.Rewardh",
          minWidth: "125px",
        },
        {
          name: "dayFlow",
          label: "mymanageMining.Growthfh",
          minWidth: "125px",
        },
      ],
      dataUtils: (item) => {},
    };
  },
  computed: {
    getParam() {
      return {};
    },
  },
};
</script>