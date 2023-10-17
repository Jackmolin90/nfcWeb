<template>
  <div class="accountsinfo-container ieHome">
    <div
      class="content-container list-container punishment"
      style="margin-top: -170px"
    >
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              :class="isActivity == 0 ? 'is_activity' : ''"
              @click="isActivity = 0"
              >{{ $t("mymanageNode.candidateNode") }}</span
            >
            <span
              :class="isActivity == 1 ? 'is_activity' : ''"
              @click="isActivity = 1"
              >{{ $t("mymanageNode.witnessNode") }}</span
            >
          </div>

          <div class="right-wrapper">
            <el-button
              type="text"
              size="medium"
              icon="el-icon-plus"
              @click="add"
              class="equal-width"
              >{{ $t("node.nodepledge") }}</el-button
            >
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
          <f-table
            :search="true"
            placeholder="mymanageNode.candidateNode"
            searchName="node_address"
            :url="'/platform/node/getcadnodelist'"
            :table-heard="tableHeard"
            :param="getParamOne"
            :show-action="true"
            :data-utils="dataUtils"
            :ation-width="100"
            :total-text="totalText"
          >
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
                  <el-dropdown-item v-if="scope.data.table_btn_upbinding">
                    <el-button
                      style="width: 100%"
                      type="default"
                      size="mini"
                      @click="upBinding(scope.data)"
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
                  <el-dropdown-item v-if="scope.data.table_btn_in">
                    <el-button
                      style="width: 100%"
                      type="default"
                      size="mini"
                      @click="makeGood(scope.data)"
                      >{{ $t("mymanageNode.makegood") }}</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.data.table_btn_quit">
                    <el-button
                      style="width: 100%"
                      type="default"
                      size="mini"
                      @click="quitNode(scope.data)"
                      ><span style="color: red">{{
                        $t("mymanageNode.quit")
                      }}</span></el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template slot="col_pledge_amount" slot-scope="scope">
              <el-button
                type="text"
                @click="pledge(scope.data)"
                class="cursor"
                >{{ scope.data.pledge_amount }}</el-button
              >
            </template>
            <template slot="col_fractions" slot-scope="scope">
              <el-button
                type="text"
                @click="punishment(scope.data)"
                class="cursor"
                >{{ scope.data.fractions }}</el-button
              >
            </template>

            <span
              slot="col_node_address"
              @click="gotoNodeView(scope.data)"
              slot-scope="scope"
              class="cursor"
              style="color: #4a7bd3"
            >
              {{ getAddrFormat(scope.data.node_address) }}
            </span>
          </f-table>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
          <f-table
            :url="'/platform/node/getcadnodelist'"
            :table-heard="tableHeard"
            :param="getParamTwo"
            :show-action="true"
            :data-utils="dataUtils"
            :ation-width="100"
            :total-text="totalText"
          >
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
                  <el-dropdown-item v-if="scope.data.table_btn_upbinding">
                    <el-button
                      style="width: 100%"
                      type="default"
                      size="mini"
                      @click="upBinding(scope.data)"
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
                  <el-dropdown-item v-if="scope.data.table_btn_in">
                    <el-button
                      style="width: 100%"
                      type="default"
                      size="mini"
                      @click="makeGood(scope.data)"
                      >{{ $t("mymanageNode.makegood") }}</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.data.table_btn_quit">
                    <el-button
                      style="width: 100%"
                      type="default"
                      size="mini"
                      @click="quitNode(scope.data)"
                      ><span style="color: red">{{
                        $t("mymanageNode.quit")
                      }}</span></el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template slot="col_pledge_amount" slot-scope="scope">
              <el-button
                type="text"
                @click="pledge(scope.data)"
                class="cursor"
                >{{ scope.data.pledge_amount }}</el-button
              >
            </template>
            <template slot="col_fractions" slot-scope="scope">
              <el-button
                type="text"
                @click="punishment(scope.data)"
                class="cursor"
                >{{ scope.data.fractions }}</el-button
              >
            </template>
            <span
              slot="col_node_address"
              @click="gotoNodeView(scope.data)"
              slot-scope="scope"
              class="cursor"
              style="color: #4a7bd3"
            >
              {{ getAddrFormat(scope.data.node_address) }}
            </span>
          </f-table>
        </div>
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
      totalText: "node.currentCandidateNumber",
      tableHeard: [
        {
          name: "node_address",
          label: "mymanageNode.candidateNode",
          type: "address",
        },
        {
          name: "revenue_address",
          label: "mymanageMining.revenuesaddress",
          type: "address",
        },
        {
          name: "node_type",
          minWidth: "100px",
          label: "mymanageNode.nodeType",
          isT: true,
        },
        {
          name: "pledge_amount",
          width: "120px",
          label: "mymanageNode.pledgenum",
        },
        {
          name: "fractions",
          width: "150px",
          label: "mymanageNode.punilshamount",
        },
      ],
      dataUtils: (item) => {
        item.pledge_amount = utils.isEmpty(item.pledge_amount)
          ? ""
          : `${utils.clearZero(item.pledge_amount)} NFC`;
        switch (item.node_type + "") {
          case "1":
            item.node_type = "mymanageNode.candidateNode";
            break;
          case "2":
            item.node_type = "mymanageNode.witnessNode";
            break;
          case "3":
            item.node_type = "mymanageNode.quit";
            break;
          default:
            item.node_type = "";
            break;
        }

        item.table_more = false;
        item.table_btn_in = item.fractions > 0;
        item.table_btn_quit = true;
        item.table_btn_binding = utils.isEmpty(item.revenue_address);
        item.table_btn_upbinding = !utils.isEmpty(item.revenue_address);
        item.table_btn_bindinglift = !utils.isEmpty(item.revenue_address);
      },
      isActivity: 0,
    };
  },
  methods: {
    gotoNodeView(data) {
      if (data.node_address) {
        helper.goPathUrl(this, "mymanage/nodeView", data.node_address);
      }
    },
    add() {
      helper.goUrl(this, "MymanageAddNode", "");
    },
    pledge(data) {
      if (data.node_address) {
        helper.goPathUrl(this, "mymanage/pledgelist", data.node_address);
      }
    },
    punishment(data) {
      if (data.node_address) {
        helper.goPathUrl(this, "mymanage/punishment", data.node_address);
      }
    },
    bindinglift(data) {
      if (data.node_address) {
        helper.goPathUrl(this, "mymanage/nodeBindingLift", data.node_address);
      }
    },

    quitNode(data) {
      let sdk = this.$store.getters.getsdk || null;
      if (!data.node_address) {
        return;
      }
      let revenue_address = data.revenue_address;
      //let node_address=data.node_address;
      let waddress = "";

      if (revenue_address) {
        try {
          revenue_address = ethers.utils.getAddress(revenue_address);
          waddress = ethers.utils.getAddress(this.$store.getters.account);
        } catch (error) {}
        if (revenue_address != waddress) {
          this.$message.error(`${this.$t("mymanageMining.pleasetoyaddr")}`);
          return;
        }
      }

      if (sdk) {
        let _this_ = this;

        data.table_btn_quit = false;
        let setData = {
          title: `${this.$t("node.signoutNode")}`,
          context: `${this.$t("mymanageNode.node")}：${helper.getAddrFormat(
            data.node_address,
            10
          )}`,
          closebtnshow: true,
          request,
          success() {
            this.$notify({
              title: "success",
              message: `${_this_.$t("node.signoutNode")} OK : ${
                data.node_address
              }`,
              type: "success",
            });

            data.table_btn_quit = false;
          },
          err() {
            data.table_btn_quit = true;
            // _this_.$message.error("failed");
          },
        };
        let request = sdk.sendTransactionTo(
          webSdk.typeJson.candexit,
          {
            addr1: data.node_address,
          },
          setData
        );
        setData.request = request;
        this.$store.dispatch("setNotification", setData);
      }
    },

    makeGood(data) {
      if (data.node_address) {
        helper.goPathUrl(this, "mymanage/makegood", data.node_address);
      }
    },
    binding(data) {
      if (data.node_address) {
        helper.goPathUrl(this, "mymanage/NodeBinding", data.node_address);
      }
    },
    upBinding(data) {
      if (data.node_address) {
        helper.goPathUrl(this, "mymanage/NodeUpBinding", data.node_address);
      }
    },
    getAddrFormat(val, num = 15) {
      return helper.getAddrFormat(val, num);
    },
  },
  computed: {
    getParamOne() {
      let address = this.$store.getters.account;
      return { address: address, node_type: 1 };
    },
    getParamTwo() {
      let address = this.$store.getters.account;
      return { address: address, node_type: 2 }; //node_address: address,
    },
  },
  watch: {
    isActivity(newVal) {
      if (newVal === 0) {
        this.tableHeard[0].label = "mymanageNode.candidateNode";
        this.totalText = "node.currentCandidateNumber";
      } else {
        this.tableHeard[0].label = "mymanageNode.witnessNode";
        this.totalText = "node.currentWitnessNumber";
      }
    },
  },
};
</script>
<style scoped>
.top-wrapper {
  width: 100%;
}
</style>