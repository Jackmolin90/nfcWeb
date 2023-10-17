<template>
  <div class="blocklist-container ieHome">
    <div class="content-container">
      <div class="content-container">
        <div style="width: 100%; text-align: center; padding: 20px">
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="auto"
            style="max-width: 500px; margin: 0px auto"
          >
            <el-form-item
              :label="$t('mymanage.Receivingaddress')"
              class="is-required"
              prop="address"
            >
              <el-input v-model="form.address" />
            </el-form-item>

            <el-form-item
              :label="$t('mymanage.FULAmount')"
              class="is-required"
              prop="ful"
            >
              <f-number
                :min="0"
                v-model="form.ful"
                step="0.000001"
                units="FUL"
              />
            </el-form-item>
            <el-form-item label="">
              <div class="ie-form-item__label" style="text-align: left">
                {{ $t("mymanage.estimate") }}{{ "： "
                }}{{ form.ful ? (exchRate > 0 ? form.ful / exchRate : 0) : 0 }}
                NFC
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                v-loading="exchRate <= 0"
                @click="onSubmit"
                :disabled="form.ful <= 0"
                >{{ $t("mymanage.convert") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div class="content-container list-container">
      <f-table
        title="mymanage.payrecord"
        ref="ftable"
        :param="getParam"
        :data-utils="dataUtils"
        placeholder=""
        :url="'/platform/getTxRecord'"
        :table-heard="tableHeard"
      />
    </div>
  </div>
</template>
<script>
import * as api from "@/api/api";
import fNumber from "@/components/modules/fNumber.vue";
import { Decimal } from "decimal.js";
import utils from "@/utils/utils";
import webSdk from "@/utils/webSdk.js";
import fTable from "@/components/modules/Ftable.vue";
import * as helper from "@/utils/helper";
import { ethers } from "ethers";
export default {
  components: { fNumber, fTable },
  data() {
    let _this_ = this;
    return {
      form: {
        address: "",
        ful: "",
        nfc: "",
      },
      rules: {
        address: [
          {
            validator: (rule, val, callback) => {
              if (utils.isEmpty(val)) {
                callback(new Error(_this_.$t("messages.pleaseaddress")));
                return;
              }
              let addL = "";
              try {
                addL = ethers.utils.getAddress(val);
              } catch (error) {}
              if (addL) {
                callback();
              } else {
                callback(new Error(_this_.$t("messages.pleaseaddress")));
              }
            },
            trigger: "change",
          },
        ],
        ful: [
          //  { required: true, trigger: "input" },
          {
            validator: (rule, val, callback) => {
              if (utils.isEmpty(val) || val <= 0) {
                callback(new Error(_this_.$t("messages.greaterZero")));
              } else {
                callback();
              }
            },
          },
        ],
      },
      exchRate: 0,

      tableHeard: [
        { name: "param4", label: "mymanage.payfulnum", minWidth: "120px" },
        { name: "param3", label: "mymanage.burntnfc", minWidth: "100px" },

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
        { name: "timeStamp", label: "mymanage.payTime", minWidth: "150px" },
      ],
      dataUtils: (item) => {
        let time = "";
        try {
          time = helper.formatTime(item.timeStamp / 1000);
        } catch (error) {}
        item.timeStamp = time;
        item.param4 = `${utils.clearZero(item.param4)} FUL`;
        item.param3 = `${utils.clearZero(item.param3)} NFC`;
      },
    };
  },
  created() {
    this.form.address = this.$store.getters.account;
    this.loadData();
  },
  activated() {
    this.loadData();
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let addr = this.form.address;
          let ful = new Decimal(this.form.ful || "0");
          let exchRate = new Decimal(this.exchRate || "0");
          let valL = ful.div(exchRate);
          if (valL.isZero()) {
            return;
          }
          try {
            addr = ethers.utils.getAddress(addr);
          } catch (error) {}

          let sdk = this.$store.getters.getsdk || null;

          if (sdk) {
            let _this_ = this;
            let setData = {
              title: `${this.$t("mymanage.convert")}`,

              context: `${valL.toFixed()} NFC => ${ful.toFixed()} FUL<br/>${
                this.form.address
              }<br/>`,
              request: null,
              success() {
                if (_this_.$refs.ftable) {
                  _this_.$refs.ftable.getAddrList();
                }
              },
              err() {
                _this_.$message.error("failed");
              },
            };

            let request = sdk.sendTransactionTo(
              webSdk.typeJson.exch,
              {
                value: valL.toFixed(),
                addr1: addr,
              },
              setData
            );
            setData.request = request;
            this.$store.dispatch("setNotification", setData);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    loadData() {
      api
        .postJson("/platform/ful/getExchRate", { txType: "ExchRate" })
        .then((response) => {
          let exchRate = response.result || 0;
          this.exchRate = exchRate > 0 ? exchRate / 10000 : 0;
        })
        .catch((error) => {
          this.exchRate = 1.5;
          console.error(error);
        });
    },
  },
  computed: {
    getParam() {
      let address = this.$store.getters.account;
      return { param1: address, txType: "Exch" };
    },
  },
  watch: {
    "form.ful": function () {
      if (this.$refs.form) {
        this.$refs.form.validate(() => {});
      }
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