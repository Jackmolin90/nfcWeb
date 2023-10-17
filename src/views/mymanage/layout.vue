<template>
  <div>
    <div
      v-if="!sdkIsok"
      style="min-height: 500px; text-align: center; padding-top: 20px"
    >
      <el-button
        @click="initNetwork"
        :disabled="initBtnLoading"
        v-loading="initBtnLoading"
        type="primary"
        >{{ $t("mymanage.connecttowallet") }}
      </el-button>
      <div style="color: red; font-size: 12px; padding: 5px">
        {{ $t("mymanage.notconnectedwallet") }}
      </div>
    </div>
    <div v-else>
      <div>
        <el-container style="min-height: 1000px; border: 1px solid #eee">
          <el-aside
            v-if="showM"
            class="display-pc-and-pad"
            width="250px"
            style="background-color: rgb(238, 241, 246)"
          >
            <el-menu
              :default-openeds="['BlockMiner', 'TrafficMiner']"
              style="padding-left: 30px; height: 100%"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              :collapse="false"
              :default-active="active"
            >
              <el-menu-item
                data-index="1"
                index="Mymanage"
                v-show="isShow('Mymanage')"
                >{{ $t("mymanage.overview") }}</el-menu-item
              >
              <el-submenu
                data-index="BlockMiner"
                index="BlockMiner"
                v-show="isShow('BlockMiner')"
              >
                <template slot="title">{{
                  $t("mymanage.BlockMiner")
                }}</template>
                <el-menu-item
                  data-index="node"
                  index="MymanageNode"
                  v-show="isShow('MymanageNode')"
                  >{{ $t("mymanage.nodemanagement") }}</el-menu-item
                >
                <el-menu-item
                  data-index="producedBlock"
                  index="producedBlock"
                  v-show="isShow('producedBlock')"
                  >{{ $t("mymanage.producedBlock") }}</el-menu-item
                >
                <el-menu-item
                  data-index="blockreward"
                  index="blockreward"
                  v-show="isShow('blockreward')"
                  >{{ $t("mymanage.blockreward") }}</el-menu-item
                >
              </el-submenu>
              <el-submenu
                data-index="TrafficMiner"
                index="TrafficMiner"
                v-show="isShow('TrafficMiner')"
              >
                <template slot="title">{{
                  $t("mymanage.TrafficMiner")
                }}</template>
                <el-menu-item
                  v-show="isShow('MymanageMining')"
                  data-index="MymanageMining"
                  index="MymanageMining"
                  >{{ $t("mymanage.minersmanagement") }}</el-menu-item
                >
                <el-menu-item
                  data-index="flowReward"
                  index="flowReward"
                  v-show="isShow('flowReward')"
                  >{{ $t("mymanage.FlowReward") }}</el-menu-item
                >
                <el-menu-item
                  data-index="bandwidthReward"
                  index="bandwidthReward"
                  v-show="isShow('bandwidthReward')"
                  >{{ $t("mymanage.BandwidthReward") }}</el-menu-item
                >
                <el-menu-item
                  data-index="flowConsumption"
                  index="flowConsumption"
                  v-show="isShow('flowConsumption')"
                  >{{ $t("flowConsumption.flowConsumption") }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                data-index="paylog"
                index="MymanagePayLog"
                v-show="isShow('MymanagePayLog')"
                >{{ $t("mymanage.rechargerecord") }}</el-menu-item
              >

              <!--
              <el-menu-item data-index="mininglog" index="MymanageMiningLog">{{
                $t("mymanage.miningrecords")
              }}</el-menu-item>
              <el-menu-item data-index="paylog" index="MymanagePayLog">{{
                $t("mymanage.rechargerecord")
              }}</el-menu-item>

             
              <el-submenu
                data-index="lockpledge"
                index="lockpledge"
                
              >
               <el-menu-item
                  data-index="nodeLock"
                  index="NodeLock"
                  @click="handleSelect('NodeLock', '')"
                  >{{ $t("lock.nodeFreed") }}</el-menu-item
                >
                 <el-menu-item
                  data-index="nodeaward"
                  index="Nodeaward"
                  @click="handleSelect('Nodeaward', '')"
                  >{{ $t("lock.nodeawardFreed") }}</el-menu-item
                >
                <template slot="title">{{ $t("home.pledgeLock") }}</template>
               
              
               
                <el-menu-item
                  data-index="flowlock"
                  index="FlowLock"
                  @click="handleSelect('FlowLock', '')"
                  >{{ $t("lock.flowFreed") }}</el-menu-item
                >
                <el-menu-item
                  data-index="bandwidthlock"
                  index="BandwidthLock"
                  @click="handleSelect('BandwidthLock', '')"
                  >{{ $t("lock.bandwidthFreed") }}</el-menu-item
                >

                
               
                <el-menu-item
                  data-index="minerLock"
                  index="MinerLock"
                  @click="handleSelect('MinerLock', '')"
                  >{{ $t("lock.minerFreed") }}</el-menu-item
                >
                <el-menu-item
                  v-if="true"
                  data-index="extract"
                  index="Extract"
                  @click="handleSelect('Extract', '')"
                  >{{ $t("lock.extract") }}</el-menu-item
                >
              </el-submenu>
             -->

              <el-menu-item
                v-if="false"
                data-index="withdrawal"
                index="Withdrawal"
                v-show="isShow('Withdrawal')"
                @click="handleSelect('Withdrawal', '')"
                >{{ $t("mymanageExtract.exchangewithdrawl") }}</el-menu-item
              >
            </el-menu>
          </el-aside>
          <el-container>
            <el-main style="overflow-x: hidden">
              <el-tooltip
                v-show="false"
                class="item"
                effect="dark"
                :content="$store.getters.account"
                placement="top-end"
              >
                <el-button class="ie_right_addr" @click="handleCopy">
                  {{
                    getAddrFormat($store.getters.account || "", 8)
                  }}</el-button
                >
              </el-tooltip>

              <transition name="el-fade-in" mode="out-in">
                <!-- <router-view :key="key"></router-view> -->
                <router-view />
              </transition>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import * as helper from "@/utils/helper";
import BassContract from "@/utils/BassContract.js";
import webSdk from "@/utils/webSdk.js";
export default {
  props: {
    showM: {
      type: Boolean,
      default: true,
    },
  },
  data() {
     const hideMenus = window.$url.hideMenus || [];
    return {
      hideMenus,
      active: "",
      sdk: null,
      initBtnLoading: false,
      netId: window.$url.netId,
    };
  },
  created() {
    this.active = this.$route.name;
    if (this.$store.getters.getsdk) {
      this.initSdk();
    } else {
      this.initNetwork();
    }
  },
  methods: {
    isShow(name) {
      return !this.hideMenus.includes(name);
    },
    handleCopy() {
      this.copy(this.$store.getters.account || "");
    },
    copy(data) {
      var that = this;
      const url = data;
      const oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message({
        message: that.$t("accounts.copySuccess"),
        type: "success",
      });
      oInput.remove();
    },
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },
    initSdk(isup = false) {
      if (webSdk.sdkUtils.netWorkOk()) {
        let sdk =
          this.$store.getters.getsdk || new webSdk.sdk(new BassContract());
        let account = webSdk.sdkUtils.getSelectAddress();

        if (account) {
          account = webSdk.sdkUtils.hashToNX(account);
          this.$store
            .dispatch("setAccount", { _this_: this, account, isup })
            .then(() => {
              this.sdk = sdk;
            })
            .catch((err) => {
              this.sdk = null;
              this.$store.dispatch("setSdk", null);
              this.initBtnLoading = false;
            });
          this.$store.dispatch("setSdk", sdk);
        } else {
          this.sdk = null;
          this.initBtnLoading = false;
        }
      } else {
        this.initBtnLoading = false;
      }
    },
    initNetwork() {
      this.initBtnLoading = true;

      let netIdInt = parseInt(this.netId, 16);
      webSdk.sdkUtils
        .getEnable(() => {
          this.initBtnLoading = false;
        })
        .then(() => {
          webSdk.sdkUtils.networkChanged((network) => {
            if (netIdInt == network) {
              let path = this.$route.path || "";
              if (
                path.indexOf("mymanage") > -1 ||
                path.indexOf("mymanagep") > -1
              ) {
                this.initSdk();
              }
            } else {
              this.initBtnLoading = false;
              this.sdk = null;
              this.$store.dispatch("setSdk", null);
            }
          });
          webSdk.sdkUtils.accountsChanged((address) => {
            if (webSdk.sdkUtils.netWorkOk()) {
              let path = this.$route.path || "";
              if (
                path.indexOf("mymanage") > -1 ||
                path.indexOf("mymanagep") > -1
              ) {
                this.initSdk(true);
              }
            } else {
              this.sdk = null;
              this.$store.dispatch("setSdk", null);
            }
          });

          this.initSdk();
        })
        .catch((err) => {
          this.initBtnLoading = false;
          this.$store.dispatch("setSdk", null);
        });
    },
    handleSelect(key, keyPath) {
      if (key == "") {
        key = keyPath;
      }

      helper.goUrl(this, key, "");
    },
  },
  computed: {
    sdkIsok() {
      return !!this.$store.getters.account;
    },
  },
};
</script>

<style  scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.ie_right_addr {
  float: right;
  font-weight: 600;
  padding: 3px;
  font-size: 15px;
  background-color: #eee;
  color: #40aaff;
  z-index: 999999;
}
</style>