<template>
  <div style="text-align: left">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('pledge.mineraddr')">
        {{ address }}
      </el-form-item>
      <el-form-item :label="$t(subtitle)" prop="Mbps">
        <f-number
          :min="mbpsMin+1"
          v-model="form.Mbps"
          :placeholder="'<='+(mbpsMin+1)"
          step="1"
          units="Mbps"
          style="width: calc(100% - 70px)"
        />

        <el-button
        v-if="false"
          type="text"
          style="vertical-align: top"
          :disabled="!form.Mbps"
          v-loading="testNetworkLd"
          @click="testNetwork"
          element-loading-spinner="el-icon-loading"
        >
          {{ $t("pledge.andwidthtest") }}
        </el-button>
      </el-form-item>
      <el-form-item :label="$t('mymanage.estimate')">
        <span v-loading="nfcLoading"> {{ getnfcnum }}{{ " NFC" }} </span>
      </el-form-item>
     
      <el-form-item v-if="false" :label="$t('pledge.operator')" prop="operator">
        <el-select v-model="form.operator" style="width: calc(100% - 70px)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="action_sub_div">
      <el-button
        type="primary"
        :disabled="nfcLoading || mbpsMin==null"
        @click="onsub"
        element-loading-spinner="el-icon-loading"
        >{{ $t("pledge.pledge") }}</el-button
      >
      <el-button
        v-if="showjump"
        type="text"
        @click="jump"
        element-loading-spinner="el-icon-loading"
        >{{ $t("pledge.jump") }}</el-button
      >
    </div>
  </div>
</template>
<script>
import fNumber from "@/components/modules/fNumber.vue";
import { Decimal } from "decimal.js";
import webSdk from "@/utils/webSdk.js";
import utils from "@/utils/utils.js";
import * as api from "@/api/api";
export default {
  components: { fNumber },
  props: {
    title: {
      type: String,
      default: "pledge.bandwidthpledge",
    },
    subtitle: {
      type: String,
      default: "pledge.allege",
    },
    btntitle: {
      type: String,
      default: "pledge.pledge",
    },
    showjump: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mbpsMin: null,
      testNetworkLd: false,
      nfcLoading: false,
      setTime: null,
      nfcnum: 0,
      form: {
        Mbps: "1",
        operator: "4",
      },
      options: [],
      rules: {
        Mbps: [{ required: true, trigger: "input" }],
       // operator: [{ required: true, trigger: "change" }],
      },
    };
  },
  created() {
    this.flowToNfc();
    this.getOperator();
  },
  methods: {
    jump() {
      this.$emit("jump");
    },
    testNetwork() {
      window.open(window.$url.OPEN_URL, "_blank");
      return;
      this.testNetworkLd = true;
      setTimeout(() => {
        this.$message({
          message: this.$t("pledge.successfultest"),
          type: "success",
        });
        this.testNetworkLd = false;
      }, 1500);
    },
    onsub() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let mbps = new Decimal(this.form.Mbps || "0");
          if (mbps.isZero()) {
            return;
          }
          let jsonL = {
            addr1: this.address,
            operator: this.form.operator,
            mbps: mbps.toFixed(0),
          };
          this.$emit("sendTransactionTo", webSdk.typeJson.flwreq, jsonL);
        }
      });
    },
    getOperator() {
      api
        .postJson("/platform/getOperatorConfig", {})
        .then((response) => {
          let options = response.result || [];
          options.forEach((item) => {
            item.value = item.id;
            item.label = item.operator_name;
          });
          this.options = options;
        })
        .catch((err) => {});
    },
    flowToNfc(timeout = 800) {
      this.nfcLoading = true;
      this.nfcnum = "0";
      if (this.setTime) {
        clearTimeout(this.setTime);
      }
      let mbps = this.form.Mbps || 0;
      if (mbps <= 0) {
        this.nfcLoading = false;
        return;
      }
      this.setTime = setTimeout(() => {
        api
          .postJson("/platform/bandWidthToNfc", { bandWidth: mbps-this.mbpsMin })
          .then((response) => {
            this.nfcLoading = false;
            try {
              this.nfcnum = utils.clearZero(response.result.nfc);
            } catch (error) {}
          })
          .catch((err) => {
            this.$message.error(
              `${this.$t("mymanage.estimate")} ${this.$t("coins.error")}`
            );
            this.nfcLoading = false;
          });
      }, timeout);
    },
    getMbpsMin() {
      this.mbpsMin =null
      api
        .postJson("/platform/my/getminerdetail", { miner_addr: this.address })
        .then((response) => {
          let result = response.result || {};
          this.mbpsMin = (result.bandwidth || 0);
          if(this.form.Mbps<=this.mbpsMin){
            this.form.Mbps=(this.mbpsMin+1)+""
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  beforeDestroy() {
    if (this.setTime) {
      clearTimeout(this.setTime);
    }
  },
  computed: {
    getnfcnum() {
      let dnuml = new Decimal(this.nfcnum || 0);
      return dnuml.toFixed(8);
    },
  },
  watch: {
    "form.Mbps": function () {
      this.flowToNfc();
    },
    address:{
      immediate:true,
      handler:function(){
        this.getMbpsMin()
      }
    }
  },
};
</script>
<style scoped>
.action_sub_div {
  text-align: center;
}
</style>