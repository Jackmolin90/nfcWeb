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
    <div class="content-container">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              :class="isActivity == 0 ? 'is_activity' : ''"
              @click="isActivity = 0"
              >{{ $t("lock.nodeawardFreed") }}</span
            >
            <span
              :class="isActivity == 1 ? 'is_activity' : ''"
              @click="isActivity = 1"
              >{{ $t("lock.nodeFreed") }}</span
            >
          </div>
        </div>
        <div v-if="isActivity == 0">
          <f-table
            :get-list-front="getNowHeight"
            :url="tableUrl"
            :table-heard="tableHeard"
            :param="getParamOne"
            total-text="lock.currentReleaseNumber"
            :show-action="false"
            :data-utils="dataUtils"
            :ation-width="200"
          >
            <template slot="col_lockingTime" slot-scope="scope">
              {{ scope.data.lockingTime }} {{ $t("lock.day") }}
            </template>
            <span
              slot="col_blockNumber"
              slot-scope="scope"
              style="color: #4a7bd3; cursor: pointer"
              @click="toRelease(scope.data)"
            >
              {{ scope.data.blockNumber }}
            </span>
          </f-table>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
          <f-table
            :get-list-front="getNowHeight"
            :url="tableUrl"
            total-text="lock.currentReleaseNumber"
            :table-heard="tableHeardTwo"
            :param="getParamTwo"
            :show-action="false"
            :data-utils="dataUtils"
            :ation-width="200"
          >
            <template slot="col_lockingTime" slot-scope="scope">
              {{ scope.data.lockingTime }} {{ $t("lock.day") }}
            </template>
            <span
              slot="col_blockNumber"
              slot-scope="scope"
              style="color: #4a7bd3; cursor: pointer"
              @click="toRelease(scope.data)"
            >
              {{ scope.data.blockNumber }}
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
          label: "lock.blockNumber",
          name: "blockNumber",
        },

        { label: "lock.nodeawardAmount", name: "totalAmountAmount" },
        { label: "lock.totalAmount", name: "totalAmount" },
        { label: "lock.leftAmount", name: "leftAmount" },
        { label: "lock.lockNumber", name: "lockingTime" },
        // { label: "lock.state", name: "state", isT: true },
      ],

      tableHeardTwo: [
        {
          name: "revenue_address",
          label: "mymanageMining.revenuesaddress",
          type: "address",
        },

        {
          label: "lock.blockNumber",
          name: "blockNumber",
        },

        { label: "lock.totalPledgeAmount", name: "pledge_amount" },
        { label: "lock.totalAmount", name: "totalAmount" },
        { label: "lock.leftAmount", name: "leftAmount" },
        { label: "lock.lockNumber", name: "lockingTime" },
      ],
      dataUtils: (item) => {
        item.pledge_amount = `${utils.clearZero(item.pledge_amount)} NFC`;
        item.totalAmountAmount = `${utils.clearZero(
          item.totalAmount || 0
        )} NFC`;

        item.totalAmount = `${utils.clearZero(
          (item.totalAmount || 0) - (item.releaseamount || 0)
        )} NFC`;
        item.leftAmount = `${utils.clearZero(item.releaseamount)} NFC`;
        item.lockingTime = utils.lockingTime(
          item.startTime,
          item.avgBlockTime,
          item.unLockNumber,
          item.releaseHeigth
        );
      },

      getNowHeight: {
        sync: true,
        fun: utils.getNowHeight,
      },
    };
  },
  created() {
    let idL = this.$route.params.id;
    if (!idL) {
      return;
    }
    let ids = idL.split("_");
    this.address = ids[0];
    this.isActivity = ids.length >= 2 ? ids[1] : 0;
    /* this.type = ids[1];
    this.blockNumber = ids[2];*/
    this.tableUrl = "/platform/lockNfcMinerInfo";
    this.getrowDatas();
  },
  methods: {
    getAddrFormat(data, number = 15) {
      return helper.getAddrFormat(data, number);
    },
    toRelease(data) {
      if (data.address && data.type) {
        helper.goPathUrl(
          this,
          "releaseList",
          `${data.address}_${data.type + 1}_${data.blockNumber}_${
            data.revenue_address
          }`
        );
      }
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
        type: 1,
      };
    },
    getParamTwo() {
      return {
        address: this.address,
        type: 3,
      };
    },
  },
};
</script>