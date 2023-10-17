<template>
  <div class="accountsinfo-container ieHome" style="min-height: 500px">
    <div class="content-container">
      <f-elrow
        :title-width="this.$i18n.locale == 'zh' ? '90px' : '130px'"
        title="node.nodeManage"
        :titles="titles"
        :datas="rowDatas"
        :col-width="8"
        bgcolor="#fff"
        title-align="left"
      >
      </f-elrow>
    </div>
    <div class="content-container" v-show="showTable">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              :class="isActivity == 0 ? 'is_activity' : ''"
              @click="isActivity = 0"
              >{{ $t("lock.nodeFreed") }}</span
            >
            <span
              :class="isActivity == 1 ? 'is_activity' : ''"
              @click="isActivity = 1"
              >{{ $t("lock.nodeawardFreed") }}</span
            >
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
          <f-table
            @totalchange="totalchange"
            :url="tableUrl"
            :table-heard="tableHeard"
            :param="getParamOne"
            :show-action="false"
            :data-utils="dataUtils"
            :ation-width="200"
          ></f-table>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
          <f-table
            @totalchange="totalchange"
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
    const types = {
      1: "node.candidateNode",
      2: "node.witnessNode",
      3: "node.signoutNode",
      /* 4: "lock.nodeFreed",
      5: "lock.flowLock",
      6: "lock.flowFreed",
      7: "lock.minerLock",
      8: "lock.minerFreed",
      9: "lock.BandwidthLock",
      10: "lock.bandwidthFreed",*/
    };
    return {
      isActivity: 0,
      address: "",
      type: 0,
      blockNumber: 0,
      tableUrl: "",
      showTable: false,
      types,
      titles: [
        {
          titles: [
            { title: "lock.minerAddress", name: "node_address" },
            {
              title: "mymanageMining.revenuesaddress",
              name: "revenue_address",
            },
            { title: "lock.nodeLock", name: "exitlockamount" },
            { title: "lock.nodeFreed", name: "exitreleaseamount" },
            { title: "node.Lastpledgetime", name: "join_time", notShow: true },
          ],
          colWidth: 13,
        },
        {
          titles: [
            { title: "node.nodetype", name: "type", isT: true },
            { title: "lock.totalPledgeAmount", name: "pledge_amount" },
            { title: "lock.nodeawardNumber", name: "lockamount" },
            { title: "lock.ReleasedReward", name: "releaseamount" },
          ],
          colWidth: 11,
        },
      ],
      rowDatas: {},

      tableHeard: [
        {
          name: "revenue_address",
          label: "mymanageMining.revenuesaddress",
          type: "address",
        },

        {
          name: "blockNumber",
          label: "home.block",
        },
        {
          name: "type",
          label: "lock.Releasetype",
          isT: true,
        },
        {
          name: "releaseamount",
          label: "lock.freed",
        },

        {
          name: "curtime",
          label: "lock.freedTime",
        },
      ],

      dataUtils: (item) => {
        item.releaseamount = `${utils.clearZero(item.releaseamount, 4)} NFC`;
        let types = { 2: "lock.nodeawardFreed", 4: "lock.nodeFreed" };
        item.type = types[item.type];
        let time = item.curtime;

        try {
          if (time) {
            time = helper.formatTime(item.curtime / 1000);
          }
        } catch (error) {}
        item.curtime = time;
      },
    };
  },
  created() {
    let idL = this.$route.params.id;
    if (!idL) {
      return;
    }

    this.address = idL;
    /* this.type = ids[1];
    this.blockNumber = ids[2];*/
    this.tableUrl = "/platform/lockNfcMinerInfo";
    this.getrowDatas();
  },
  methods: {
    getAddrFormat(data, number = 15) {
      return helper.getAddrFormat(data, number);
    },
    totalchange(val) {
      this.showTable = val > 0;
    },
    getrowDatas() {
      let param = {
        node_address: this.address,
      };
      let rowDatas = {
        node_address: this.address,
      };

      api
        .postJson("/platform/node/getcadnode", param)
        .then((response) => {
          let result = response.result || {};
          result.lockamount = `${utils.clearZero(result.lockamount)} NFC`;
          result.releaseamount = `${utils.clearZero(result.releaseamount)} NFC`;
          result.pledge_amount = `${utils.clearZero(result.pledge_amount)} NFC`;

          result.exitlockamount = `${utils.clearZero(
            result.exitlockamount - result.exitreleaseamount
          )} NFC`;
          result.exitreleaseamount = `${utils.clearZero(
            result.exitreleaseamount
          )} NFC`;

          result.type = this.types[result.node_type || 0];
          result.revenue_address = result.revenue_address || "--";
          let titles = this.titles[0].titles;
          this.$set(
            titles[titles.length - 1],
            "notShow",
            result.node_type == 3
          );
          this.rowDatas = Object.assign(rowDatas, result);
        })
        .catch((err) => {});
    },
  },
  computed: {
    getParamOne() {
      return {
        address: this.address,
        type: 0,
      };
    },
  },
};
</script>