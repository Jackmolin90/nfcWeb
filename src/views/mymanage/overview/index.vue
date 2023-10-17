<template>
  <div>
    <div class="home-container ieHome">
      <div class="base-container">
        <div class="content-wrapper" style="padding: 10px">
          <f-elrow
            :title-width="$i18n.locale == 'zh' ? '90px' : '185px'"
            :titles="titles"
            :datas="datas"
          >
            <template
              slot="colData_mymanage.theremaining"
              slot-scope="scopeData"
            >
              {{ scopeData.data }}{{ "  "
              }}<span class="cursor" @click="pays">{{
                $t("mymanage.convert")
              }}</span>
            </template>

            <template v-if="false" slot="colData_lock.FlowLockedReward">
              <span class="cursor" @click="goUrls('flowReward')">
                {{ datas.flwtotalamount }}</span
              >
            </template>
            <template slot="colData_lock.flowReleasedReward">
              <span class="cursor" @click="goUrls('flowReward')">
                {{ datas.flwreleaseamount }}</span
              >
            </template>

            <template v-if="false" slot="colData_lock.bandwidthLockedReward">
              <span class="cursor" @click="goUrls('bandwidthReward')">
                {{ datas.bdtotalamount }}</span
              >
            </template>
            <template slot="colData_lock.bandwidthReleasedReward">
              <span class="cursor" @click="goUrls('bandwidthReward')">
                {{ datas.bdreleaseamount }}</span
              >
            </template>
            <template slot="colData_lock.blockrewardFreed">
              <span class="cursor" @click="goUrls('blockreward')">
                {{ datas.blockreleaseamount }}</span
              >
            </template>
          </f-elrow>
        </div>
      </div>
    </div>
    <div style="height: 20px"></div>
    <accountsinfo :set-id="getAccount">
      <template slot="ie_top">
        <div></div>
      </template>
    </accountsinfo>
  </div>
</template>
<script>
import accountsinfo from "@/views/accountsinfo/index.vue";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
import fElrow from "@/components/modules/Felrow.vue";
import * as api from "@/api/api";
export default {
  components: { accountsinfo, fElrow },
  data() {
    return {
      titles: [
        {
          titles: [
            { title: "mymanage.loginaddress" },
            { title: "mymanage.nfcamount" },
            { title: "lock.FlowLockedReward", name: "flwtotalamount" },
            { title: "lock.bandwidthLockedReward", name: "bdtotalamount" },
             { title: "lock.blockrewardLock", name: "blocktotalamount" },
            { title: "mymanage.theremaining" },
          ],
        },
        {
          titles: [
            //      { title: "mymanage.lastloginint" },
            { title: "mymanage.nodenumber" },
            { title: "mymanage.numberofminers" },
            { title: "lock.flowReleasedReward", name: "flwreleaseamount" },
            { title: "lock.bandwidthReleasedReward", name: "bdreleaseamount" },
            { title: "lock.blockrewardFreed", name: "blockreleaseamount" },
            
          ],
        },
      ],
      datas: {
        "mymanage.loginaddress": "",
        "mymanage.nfcamount": "",
        "mymanage.numberofminers": "",
        //"mymanage.lastloginint": "",
        "mymanage.nodenumber": "",
        "mymanage.theremaining": "",
      },
    };
  },
  created() {
    this.loadData();
  },
  activated() {
    this.loadData();
  },
  methods: {
    pays() {
      helper.goUrl(this, "MymanagePay", "");
    },
    goUrls(key) {
      helper.goUrl(this, key, "");
    },
    loadData() {
      let datas = {
        "mymanage.loginaddress": "",
        "mymanage.nfcamount": "",
        "mymanage.numberofminers": "",
        //"mymanage.lastloginint":"2021-09-02 13:10:23",
        "mymanage.nodenumber": "",
        "mymanage.theremaining": "",
      };
      api
        .postJson("/platform/my/outLine", {
          revenue_address: this.$store.getters.account,
        })
        .then((response) => {
          let result = response.result || {};

          datas["mymanage.loginaddress"] = this.$store.getters.account; //result.address;
          datas["mymanage.nfcamount"] = `${utils.clearZero(
            result.balance || 0
          )} NFC`;
          datas["mymanage.numberofminers"] = result.minerCount;
          datas["mymanage.nodenumber"] = result.nodeCount;
          datas["mymanage.theremaining"] = `${utils.clearZero(
            result.ful_balance || 0
          )} FUL`;

          datas.flwtotalamount = `${utils.clearZero(
            result.flwtotalamount - result.flwreleaseamount 
          )} NFC`;
          datas.flwreleaseamount = `${utils.clearZero(
            result.flwreleaseamount || 0
          )} NFC`;
          datas.bdtotalamount = `${utils.clearZero(
            result.bdtotalamount - result.bdreleaseamount 
          )} NFC`;
          datas.bdreleaseamount = `${utils.clearZero(
            result.bdreleaseamount || 0
          )} NFC`;

          datas.blocktotalamount = `${utils.clearZero(
            result.blocktotalamount  - result.blockreleaseamount 
          )} NFC`;
          datas.blockreleaseamount = `${utils.clearZero(
            result.blockreleaseamount || 0
          )} NFC`;

          this.datas = datas;
        })
        .catch((error) => {
          this.datas = datas;
          console.error(error);
        });
    },
  },

  computed: {
    getAccount() {
      return this.$store.getters.account;
    },
  },
  watch: {
    "$store.getters.account": function () {
      this.loadData();
    },
  },
};
</script>
<style scoped>
.warppaer_item {
  min-height: 100px;
  background-color: #f9fafc;
  padding: 5px 15px;
}
.warppaer_item .item-wrapper {
  font-weight: 400;
  line-height: 36px;
  font-size: 14px;
}
.warppaer_item .item-wrapper .equal-width {
  font: inherit;
  vertical-align: baseline;
  color: #2d353b;
}
.warppaer_item .item-wrapper .equal-width .cursor {
  color: #5e89d8;
  font-weight: 600;
}
</style>