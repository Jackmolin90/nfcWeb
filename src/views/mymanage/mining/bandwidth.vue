<template>
  <div class="accountsinfo-container ieHome">
    <div class="content-container">
      <div class="content-container">
        <div style="width: 100%; text-align: center; padding: 20px">
          <div class="top-wrapper">
            <div class="left-wrapper">
              {{ $t("pledge.bandwidthpledge") }}
            </div>
          </div>
          <pledge
            title="mymanageMining.adjustbandwidth"
            subtitle="mymanageMining.adjustbandwidth"
            style="max-width: 500px; margin: 0px auto"
            btntitle="mymanageMining.submit"
            :showjump="false"
            :address="address"
            @sendTransactionTo="sendTransactionTo"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pledge from "@/views/mymanage/pledge/index.vue";

import * as helper from "@/utils/helper";
export default {
  components: { pledge },
  data() {
    return { address: "" };
  },
  created() {
    this.address = this.$route.params.id;
    if (!this.address) {
      return;
    }
  },
  methods: {
    
    sendTransactionTo(type, jsonL) {
      let sdk = this.$store.getters.getsdk || null;

      if (sdk) {
        let _this_ = this;
        let setData = {
          title: `${this.$t("mymanageMining.adjustbandwidth")}`,
          context: `${this.$t(
            "mymanageMining.mineraddr"
          )}：${helper.getAddrFormat(this.address, 10)}<br/>Mbps：${
            jsonL.mbps
          } `,
          request: null,
          closebtnshow:false,
          closewin(type) {
            if (type == 2 ) {
               _this_.exit();
            }
          },
          err() {
            // _this_.$message.error("failed");
          },
        };
        let request = sdk.sendTransactionTo(type, jsonL, setData);
        setData.request = request;
        this.$store.dispatch("setNotification", setData);
      }
    },
    exit() {
      helper.goUrl(this, "MymanageMining", "");
    },
  },
  computed: {},
};
</script>
<style scoped>
.ie-form-item__label {
  font-weight: 600 !important;
  color: #555;
}
</style>