<template>
  <div class="accountsinfo-container ieHome">
    <div class="content-container">
      <f-elrow
        title="mymanageNode.makegood"
        :titles="titles"
        :datas="rowDatas"
        :col-width="24"
        position="center"
        bgcolor="#fff"
        title-width="auto"
        title-align="left"
      >
        <div slot="ie_bottom" style="text-align: center; padding-bottom: 20px">
          <el-button @click="onSubmit" v-if="!btnLoading&&btnShow" type="primary">{{
            $t("mymanage.pay")
          }}</el-button>
        </div>
      </f-elrow>
    </div>

    <div class="content-container list-container">
      <div style="padding-top: 15px"></div>
      <f-table
        title="mymanage.payrecord"
        :param="getParam"
        :data-utils="dataUtils"
        placeholder=""
        :url="tableUrl"
        :table-heard="tableHeard"
      />
    </div>
  </div>
</template>
<script>
import * as api from "@/api/api";
import { Decimal } from "decimal.js";
import utils from "@/utils/utils";
import webSdk from "@/utils/webSdk.js";
import fTable from "@/components/modules/Ftable.vue";
import fElrow from "@/components/modules/Felrow.vue";
import * as helper from "@/utils/helper";
export default {
  components: { fElrow, fTable },
  data() {
    return {
      btnShow:true,
      btnLoading: true,
      account: "",
      tableUrl: "",
      form: {
        nfc: 0,
        fractions: 0,
      },
      exchRate: 0,
      titles: [
        {
          titles: [
            { title: "mymanageNode.node" },
            { title: "mymanageNode.makegood" },
            { title: "mymanageNode.estimate" },
          ],
        },
      ],
      rowDatas: {
        "mymanageNode.node": "",
        "mymanageNode.makegood": "",
        "mymanageNode.estimate": "",
      },
      tableHeard: [
        { name: "param1", label: "mymanageNode.payaddress", type: "address" },
        { name: "param3", label: "mymanageNode.paynumber" },
        { name: "param4", label: "mymanageNode.nfcnumber" },
        { name: "timeStamp", label: "mymanageNode.paytime" },
        { name: "blockNumber", label: "mymanageNode.payheight" },
      ],
      dataUtils: (item) => {
        item.param4=utils.clearZero(item.param4)
        let time = "";
        try {
          time = helper.formatTime(item.timeStamp / 1000);
        } catch (error) {}
        item.timeStamp = time;
        item.param3 = utils.isEmpty(item.param3) ? "" : `${item.param3}`;
      },
    };
  },
  created() {
    this.account = this.$route.params.id;
    if (!this.account) {
      return;
    }
    this.tableUrl = "/platform/getTxRecord";
    this.loadData();
  },
  activated() {
    this.account = this.$route.params.id;
    if (!this.account) {
      return;
    }
    this.loadData();
  },
  methods: {
    onSubmit() {
      let sdk = this.$store.getters.getsdk || null;
      let nfc = this.form.nfc;
      if (sdk && nfc > 0) {
        let _this_ = this;

        let setData = {
          title: `${this.$t("mymanageNode.makegood")}`,
          context: `${this.$t("mymanageNode.makegood")}：${
            this.form.fractions
          }<br/>${this.$t("mymanageNode.estimate")}：${this.form.nfc} NFC`,
          request: null,
          success() {
            _this_.btnShow = false;
          },
          closewin(type) {
            if (type == 2 && _this_.$route.name == "makeGood") {
              helper.goUrl(this, "MymanageAddNode", "");
            }
          },
          err() {},
        };
        let request = sdk.sendTransactionTo(
          webSdk.typeJson.candpnsh,
          {
            addr1: this.account,
          },
          setData
         
        );
        setData.request = request;
        this.$store.dispatch("setNotification", setData);
      }
    },

    loadData() {
      this.btnLoading = true;
      let rowDatas = {
        "mymanageNode.node": this.account,
        "mymanageNode.makegood": "",
        "mymanageNode.estimate": "",
      };

      api
        .postJson("/platform/node/getcadnode", { node_address: this.account })
        .then((response) => {
          let result = response.result || {};
          rowDatas["mymanageNode.node"] = result.node_address;
          rowDatas["mymanageNode.makegood"] = result.fractions;
          if (!result.fractions) {
            return;
          }
          this.form.fractions = result.fractions;
          api
            .postJson("/platform/node/getNodePledgeAmount", {})
            .then((responset) => {
              let rjson = responset.result || {};
     
              let numA = rjson.NODE_PLEDGE_AMOUNT || 0;
              let numB = rjson.TOTALMBPOINT || 0;
              let nfcA = utils.clearZero(numA );
              if (nfcA > 0 && numB > 0) {
                let nfcNum = result.fractions * (nfcA/numB) ;
                
                this.form.nfc = nfcNum;
                rowDatas["mymanageNode.estimate"] = `${utils.weedZero(nfcNum,8)} NFC`;
                this.rowDatas = rowDatas;

                this.btnLoading = nfcNum <= 0;
              }
            })
            .catch((error) => {
              this.form.nfc = 0;
              this.rowDatas = rowDatas;
            });
        })
        .catch((error) => {
          this.form.nfc = 0;
          this.rowDatas = rowDatas;
        });
    },
  },
  computed: {
    getParam() {
      return { param1: this.account, txType: "CandPnsh" };
    },
  },
};
</script>
<style scoped>
.ie-form-item__label {
  font-weight: 600 !important;
  color: #555;
}
</style>