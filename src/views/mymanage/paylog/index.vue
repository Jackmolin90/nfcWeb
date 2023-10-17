<template>
  <div class="accountsinfo-container ieHome">
    <div class="content-container">
      <f-elrow
        :titles="titles"
        :datas="rowDatas"
        :col-width="8"
        bgcolor="#fff"
        title-align="left"
      >
        <template slot="colData_mininglog.theremaining" slot-scope="scopeData">
          {{ scopeData.data }}{{ "  "
          }}<span class="cursor" style="color:#5e89d8;font-weight: 600;" @click="pays">{{ $t("mymanage.convert") }}</span>
        </template>
      </f-elrow>
    </div>
    <div class="content-container">
      <div class="content-wrapper">
        <f-table
          search
          title="mymanage.rechargerecord"
          :param="getParam"
          :data-utils="dataUtils"
          search-name="fromAddr"
          placeholder="ftable.searchAddress"
          :url="'/platform/getTxRecord'"
          :table-heard="tableHeard"
        />
      </div>
    </div>
  </div>
</template>
<script>
import fElrow from "@/components/modules/Felrow.vue";
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
import * as helper from "@/utils/helper";
import * as api from "@/api/api";
export default {
  components: { fElrow, fTable },
  data() {
    return {
      titles: [
        {
          titles: [{ title: "mymanageMining.revenuesaddress" }],
          colWidth: 12,
        },
        {
          titles: [{ title: "mininglog.theremaining" }],
          colWidth: 12,
        },
      ],
      rowDatas: {},
      tableHeard: [
        { name: "param4", label: "mymanage.payfulnum" ,minWidth:"120px"},
        { name: "param3", label: "mymanage.burntnfc" ,minWidth:"100px"},
        {
          name: "fromAddr",
          label: "mymanage.payaddress",
          type: "address",
        },
        {
          name: "param1",
          label: "tran.acceptAddr",
          type: "address",
        },
        { name: "timeStamp", label: "mymanage.payTime",width:"150px" },
      ],
      dataUtils: (item) => {
        item.param4 = utils.clearZero(item.param4);
        item.param3 = utils.isEmpty(item.param3)
          ? ""
          : `${utils.clearZero(item.param3,4)} NFC`;
        let time = "";
        try {
          time = helper.formatTime(item.timeStamp / 1000);
        } catch (error) {}
        item.timeStamp = time;
      },
    };
  },
  created() {
    this.getrowDatas();
  },
  activated() {
    this.getrowDatas();
  },
  methods: {
     pays() {
      helper.goUrl(this, "MymanagePay", "");
    },
    getrowDatas() {
      api
        .postJson("/platform/my/outLine", {
          revenue_address: this.$store.getters.account,
        })
        .then((response) => {
          let data = response.result || {};
          this.rowDatas = {
            "mymanageMining.revenuesaddress": this.$store.getters.account,
            "mininglog.theremaining":  `${ utils.clearZero((data.ful_balance||0),4)} FUL`,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    getParam() {
      let address = this.$store.getters.account;
      return {
       // fromAddr: address,
         address: address,
        txType: "Exch",
      };
    },
  },
  watch: {
    "$store.getters.account": function () {
      this.getrowDatas();
    },
  },
};
</script>