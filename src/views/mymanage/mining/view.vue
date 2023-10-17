<template>
  <div class="home-container">
    <div class="accountsinfo-container">
      <div class="content-container">
        <f-elrow
          title="mymanage.minersmanagement"
          :title-width="this.$i18n.locale == 'zh' ? '90px' : '175px'"
          :titles="titles"
          :datas="rowDatas"
          :col-width="8"
          bgcolor="#fff"
          title-align="left"
        >
          <template
            slot="colData_mymanageMining.minerstatus"
            slot-scope="dataL"
          >
            {{ dataL.data }}
          </template>
          <template slot="colData_flowConsumption.flowunitprice">
            {{ flowunitprice }}
          </template>
        </f-elrow>
      </div>
      <div class="content-container">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              @click="activity = 1"
              :class="activity == 1 ? 'is_activity' : ''"
              >{{ $t("flowConsumption.minerReward") }}</span
            >
            <span
              @click="activity = 2"
              :class="activity == 2 ? 'is_activity' : ''"
              >{{ $t("flowConsumption.flowConsumption") }}</span
            >
          </div>
        </div>
        <div class="content-wrapper" v-show="activity == 1">
          <logtable :param="getParamOne" @totalchange="totalchange" />
        </div>
        <div class="content-wrapper" v-show="activity == 2">
          <flow-consumption :is-module="true" :param="getParamOne" />
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
import logtable from "@/views/mymanage/mininglog/table.vue";
import flowConsumption from "@/views/mymanage/flowConsumption/index.vue";

export default {
  components: { fTable, fElrow, logtable, flowConsumption },
  data() {
    let flowunitprice = window.$url.flowunitprice || "";
    return {
      flowunitprice,
      showTable: false,
      address: "",
      tableUrl: "",
      activity: 1,
      titles: [
        {
          titles: [
            { title: "mymanageMining.miner", type: "address" },
            { title: "mymanageMining.revenuesaddress", type: "address" },
            { title: "lock.totalPledgeAmount", name: "pledge_amount" },
            { title: "mymanageMining.theremaining" },
            { title: "mymanageMining.revenueamount" },
            { title: "lock.flowLock", name: "flwtotalamount" },
            { title: "lock.flowFreed", name: "flwreleaseamount" },
            { title: "flowConsumption.flowunitprice", name: "flowunitprice" },
            //{ title: "mymanageMining.freed" },
          ],
          colWidth: 13,
        },
        {
          titles: [
            { title: "mymanageMining.jointime" },
            { title: "mymanageMining.minerstatus", isT: true },
            { title: "flowmining.AdjPower" },
            { title: "mymanageMining.expendful" },
            { title: "mymanageMining.miningearnings" },
            { title: "lock.BandwidthLock", name: "bdtotalamount" },
            { title: "lock.bandwidthFreed", name: "bdreleaseamount" },
          ],
          colWidth: 11,
        },
      ],
      rowDatas: {},
    };
  },
  created() {
    this.address = this.$route.params.id;
    if (!this.address) {
      return;
    }

    this.getrowDatas();
  },
  activated() {
    this.getrowDatas();
  },
  methods: {
    totalchange(val) {
      this.showTable = val > 0;
    },
    getStrType(obj, map) {
      for (let key in map) {
        let str = map[key];
        obj[key] = utils.isEmpty(obj[key]) ? "" : `${obj[key]} ${str}`;
      }
    },

    getrowDatas() {
      api
        .postJson("/platform/my/getminerdetail", {
          miner_addr: this.address,
        })
        .then((response) => {
          let item = response.result || {};
          item.revenue_amount = utils.clearZero(item.revenue_amount);
          item.release_amount = utils.clearZero(item.release_amount);
          item.lock_amount = utils.clearZero(item.lock_amount);
          item.payful = utils.clearZero(item.payful);
          item.surplusful = utils.clearZero(item.surplusful);
          item.pledge_amount = utils.clearZero(item.pledge_amount);

          item.flwtotalamount = utils.clearZero(
            item.flwtotalamount - item.flwreleaseamount
          );
          item.flwreleaseamount = utils.clearZero(item.flwreleaseamount);
          item.bdtotalamount = utils.clearZero(
            item.bdtotalamount - item.bdreleaseamount
          );
          item.bdreleaseamount = utils.clearZero(item.bdreleaseamount);
          switch (item.miner_status + "") {
            case "1":
              item.miner_statusstr = "mymanageMining.mining";
              break;
            case "2":
              item.miner_statusstr = "mymanageMining.waitingmining";
              break;
            case "3":
              item.miner_statusstr = "mymanageMining.alreadyexits";
              break;
            default:
              item.miner_statusstr = "--";
              break;
          }
          let map = {
            lock_amount: "NFC",
            release_amount: "NFC",
            bandwidth: "Mbps",
            payful: "FUL",
            revenue_amount: "NFC",
            surplusful: "FUL",
            pledge_amount: "NFC",

            flwtotalamount: "NFC",
            flwreleaseamount: "NFC",
            bdtotalamount: "NFC",
            bdreleaseamount: "NFC",
          };
          this.getStrType(item, map);

          let miner_flow = item.miner_flow || 0;
          miner_flow = utils.getSuffix(miner_flow, "iB");
          /*     miner_flow >= 1024
              ? utils.weedZero(miner_flow / 1024, 4) + " GB"
              : `${miner_flow} MB`;*/
          item.miner_flow = miner_flow;

          this.rowDatas = {
            "mymanageMining.miner": this.address,
            "mymanageMining.minerstatus": item.miner_statusstr,
            "mymanageMining.revenueamount": item.miner_flow,
            "mymanageMining.lockamount": item.lock_amount,
            "mymanageMining.freed": item.release_amount,
            "mymanageMining.revenuesaddress": item.revenue_address,
            "mymanageMining.jointime": item.join_time,
            "flowmining.AdjPower": item.bandwidth,
            "mymanageMining.expendful": item.payful,
            "mymanageMining.miningearnings": item.revenue_amount,
            "mymanageMining.theremaining": item.surplusful,
            pledge_amount: item.pledge_amount,
            flwtotalamount: item.flwtotalamount,
            flwreleaseamount: item.flwreleaseamount,
            bdtotalamount: item.bdtotalamount,
            bdreleaseamount: item.bdreleaseamount,
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
        revenue_address: "",
        miner_addr: this.address,
        isLike: true,
      };
    },
  },
};
</script>