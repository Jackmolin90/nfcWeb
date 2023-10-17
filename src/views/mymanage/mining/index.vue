<template>
  <div class="accountsinfo-container ieHome">
    <div class="content-container">
      <div class="content-wrapper">
        <f-table
        :search="true"
        placeholder="mymanageMining.mineraddr"
        searchName="miner_addr"
          ref="ftables"
          :url="'/platform/flow/getflowMinerRanklist'"
          title="mymanage.minersmanagement"
          total-text="ftable.totalnumbertraffic"
          :table-heard="tableHeard"
          :param="getParamOne"
          :show-action="true"
          :data-utils="dataUtils"
          :ation-width="120"
        >
          <template slot="top_page">
            <el-button
              type="text"
              size="medium"
              icon="el-icon-plus"
              @click="add"
              class="equal-width"
              >{{ $t("mymanageMining.add") }}</el-button
            >
          </template>
          <template slot="col_miner_addr" slot-scope="scope">
            <span
              @click="tolog(scope.data)"
              class="cursor"
              style="color: #409eff"
            >
              {{ scope.data.miner_addr }}
            </span>
          </template>
          <template slot="ie_col_action" slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button size="mini" type="default" icon="el-icon-menu">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.data.table_btn_binding">
                  <el-button
                    style="width: 100%"
                    type="default"
                    size="mini"
                    @click="binding(scope.data)"
                    >{{ $t("binding.bindaddr") }}</el-button
                  >
                </el-dropdown-item>

                <el-dropdown-item v-if="scope.data.table_btn_add">
                  <el-button
                    style="width: 100%"
                    type="default"
                    size="mini"
                    @click="bandwidth(scope.data)"
                    >{{ $t("mymanageMining.adjustbandwidth") }}</el-button
                  >
                </el-dropdown-item>

                <el-dropdown-item v-if="scope.data.table_btn_up">
                  <el-button
                    style="width: 100%"
                    type="default"
                    size="mini"
                    @click="uppledge(scope.data)"
                    >{{ $t("mymanageMining.transferaddress") }}</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.data.table_btn_bindinglift">
                  <el-button
                    style="width: 100%"
                    type="default"
                    size="mini"
                    @click="bindinglift(scope.data)"
                    ><span style="color: red">{{
                      $t("messages.bindinglift")
                    }}</span></el-button
                  >
                </el-dropdown-item>

                <el-dropdown-item v-if="scope.data.table_btn_in&&false">
                  <el-button
                    style="width: 100%"
                    type="default"
                    size="mini"
                    @click="join(scope.data)"
                    >{{ $t("mymanageMining.join") }}</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.data.table_btn_quit">
                  <el-button
                    style="width: 100%"
                    type="default"
                    size="mini"
                    @click="quit(scope.data)"
                    ><span style="color: red">{{
                      $t("mymanageMining.quit")
                    }}</span></el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot="col_bandwidth" slot-scope="scope">
            <el-button type="text" @click="flowList(scope.data)">{{
              scope.data.bandwidth
            }}</el-button>
          </template>
        </f-table>
      </div>
    </div>
  </div>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import * as helper from "@/utils/helper";
import webSdk from "@/utils/webSdk.js";
import utils from "@/utils/utils";
import { ethers } from "ethers";
export default {
  components: { fTable },
  data() {
    return {
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
      dataUtils: (item) => {
        item.pledge_amount = `${utils.clearZero(item.pledge_amount, 4)} NFC`;
        item.dayProfitamount = `${utils.clearZero(
          item.dayProfitamount,
          4
        )} NFC`;

        item.bandwidth = utils.getSuffix(item.bandwidth || 0, "bps");
        item.dayFlow = utils.getSuffix(item.dayFlow || 0, "iB");
        item.miner_flow = utils.getSuffix(item.miner_flow || 0, "iB");

        let addpool = item.addpool;
        let isRevenue = !utils.isEmpty(item.revenue_address);
        item.addpoolstr =
          addpool == 1
            ? "mymanageMining.havejoined"
            : "mymanageMining.nottojoin";
        item.table_btn_add = true;
        item.table_btn_quit = item.miner_status == 1 && isRevenue;
        item.table_btn_in = addpool != 1 && isRevenue;
        item.table_btn_bindinglift = isRevenue;
        item.table_btn_up = isRevenue;
        item.table_btn_binding = !isRevenue;
        item.table_more = false;
      },
      isActivity: 0,
    };
  },
  methods: {
    add() {
      helper.goUrl(this, "Mymanagebinding", "");
    },
    bandwidth(data) {
      if (data.miner_addr) {
        helper.goPathUrl(this, "mymanage/bandwidth", data.miner_addr);
      }
    },
    binding(data) {
      if (data.miner_addr) {
        helper.goPathUrl(this, "mymanage/bindingRevenue", data.miner_addr);
      }
    },
    bindinglift(data) {
      if (data.miner_addr) {
        helper.goPathUrl(this, "mymanage/bindinglift", data.miner_addr);
      }
    },
    uppledge(data) {
      if (data.miner_addr && data.revenue_address) {
        helper.goPathUrl(this, "mymanage/uppledge", data.miner_addr);
      }
    },
    join(data) {
      if (data.miner_addr) {
        helper.goPathUrl(this, "mymanage/join", data.miner_addr);
      }
    },
    tolog(data) {
      if (data.miner_addr) {
        helper.goPathUrl(this, "mymanage/minerview", data.miner_addr);
      }
    },
    flowList(data) {
      if (data.miner_addr) {
        helper.goPathUrl(this, "mymanage/flowList", data.miner_addr);
      }
    },
    quit(data) {
   
      let sdk = this.$store.getters.getsdk || null;
      let addres = data.miner_addr;
      if (utils.isEmpty(addres)) {
        return;
      }
      let revenue = "";
      let select = webSdk.sdkUtils.getSelectAddress();
      try {
        revenue = ethers.utils.getAddress(data.revenue_address);
        select = ethers.utils.getAddress(select);
      } catch (error) {}
      if (select != revenue) {
        this.$message.error(`${this.$t("mymanageMining.pleasetoyaddr")}`);
        return;
      }

      if (sdk) {
        let _this_ = this;
        let setData = {
          title: `${this.$t("mymanageMining.quit")}`,
          context: `${this.$t(
            "mymanageMining.mineraddr"
          )}：${helper.getAddrFormat(addres, 10)}`,
          closebtnshow: false,
          request: null,
          success() {
            _this_.$refs.ftables.getAddrList();
          },
        };
        let request = sdk.sendTransactionTo(
          webSdk.typeJson.flwexit,
          {
            addr1: addres,
          },
          setData
        );
        setData.request = request;

        this.$store.dispatch("setNotification", setData);
      }
    },
    btnTypes(data = {}, types) {
      let status = data.miner_status + "" || "";

      return types.includes(status);
    },
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },
  },
  computed: {
    getParamOne() {
      let address = this.$store.getters.account;
      return { revenue_address: address };
    },
  },
};
</script>