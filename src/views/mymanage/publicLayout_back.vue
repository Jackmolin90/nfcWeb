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
      <div class="ie_right_addr" :title="$store.getters.account">
        {{ getAddrFormat($store.getters.account || "", 8) }}
        <el-dialog ref="ie_addr_div" :visible="false"></el-dialog>
      </div>
      <div class="blocklist-container ieHome">
        <div class="content-container" >
          <add-node />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as helper from "@/utils/helper";
import BassContract from "@/utils/BassContract.js";
import webSdk from "@/utils/webSdk.js";
import addNode from "@/views/mymanage/node/addNode.vue";
export default {
  components: { addNode },
  data() {
    return {
      active: "",
      sdk: null,
      initBtnLoading: false,
      netId: window.$url.netId,
    };
  },
  created() {
    this.active = this.$route.name;
     this.initNetwork();
    /*if (this.$store.getters.getsdk) {
      this.initSdk();
    } else {
      this.initNetwork();
    }*/
  },
  methods: {
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },
    initSdk(isup) {
      if (webSdk.sdkUtils.netWorkOk()) {
        let sdk =
          this.$store.getters.getsdk || new webSdk.sdk(new BassContract());
        let account = webSdk.sdkUtils.getSelectAddress();
        if (account) {
          account = webSdk.sdkUtils.hashToNX(account);
          this.$store
            .dispatch("setAccount", { _this_: this, account,isup })
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
              if (this.$refs.ie_addr_div) {
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
              if (this.$refs.ie_addr_div) {
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
  beforeDestroy(){
       this.$store.dispatch("setSdk", null);
       this.$store.dispatch("setAccount", { _this_: this, account:"" })
  }
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