<template>
  <div class="blocklist-container ieHome">
    <div class="content-container">
      <div class="content-container">
        <div class="top-wrapper">
          <div class="left-wrapper">
            {{ $t("mymanageNode.pledgeNode") }}
          </div>
        </div>
        <div style="width: 100%; text-align: center; padding-bottom: 20px">
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="auto"
            style="max-width: 500px; margin: 0px auto; text-align: left"
          >
            <el-form-item :label="$t('mymanageNode.node')" prop="address">
              <el-input v-model="form.address"
            /></el-form-item>

            <el-form-item
              :label="$t('mymanageNode.pledgenum')"
              required
              prop="nfc"
            >
              {{ form.nfc || 0 }}{{ " NFC" }}
            </el-form-item>
            <el-form-item>
              <el-button
                v-loading="loading"
                v-if="btnShow"
                type="primary"
                @click="onSubmit"
                :disabled="form.nfc <= 0 || !form.address"
                >{{ $t("mymanageNode.pledge") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div class="content-container list-container">
      <f-table
        title=""
        ref="ftable"
        :param="getParam"
        :data-utils="dataUtils"
        placeholder=""
        :url="tableUrl"
        :table-heard="tableHeard"
        total-text="lock.currentReleaseNumber"
      />
    </div>
  </div>
</template>
<script>
import * as api from "@/api/api";
import fNumber from "@/components/modules/fNumber.vue";
import utils from "@/utils/utils";
import webSdk from "@/utils/webSdk.js";
import fTable from "@/components/modules/Ftable.vue";
import { ethers, BigNumber } from "ethers";
import * as helper from "@/utils/helper";
export default {
  components: { fNumber, fTable },
  data() {
    return {
      tableUrl: "/platform/getTxRecord",
      loading: false,
      btnShow: false,
      form: {
        address: "",
        nfc: "",
      },
      rules: {
        address: [
          { required: true, trigger: "change" },
          {
            validator: (rule, value, callback) => {
              try {
                if (ethers.utils.getAddress(value)) {
                  callback();
                } else {
                  callback(new Error("Please enter the correct address"));
                }
              } catch (error) {
                callback(new Error("Please enter the correct address"));
              }
            },
            trigger: "change",
          },
        ],
        nfc: [{ required: true, trigger: "change" }],
      },
      exchRate: 0,

      tableHeard: [
        {
          name: "param1",
          label: "mymanage.miner",
          type: "address",
        },
        { name: "param4", label: "mymanageNode.pledgenum" },
        {
          name: "blockNumber",
          label: "mymanage.blockheight",
        },
        { name: "timeStamp", label: "mymanageNode.paytime" },
      ],
      dataUtils: (item) => {
        /*  try {
         item.value= ethers.utils.formatUnits(BigNumber.from(item.value))   
        } catch (error) {
            
        }*/
        item.param4 = utils.isEmpty(item.param4)
          ? ""
          : `${utils.clearZero(item.param4)} NFC`;
        let time = "";
        try {
          time = helper.formatTime(item.timeStamp / 1000);
        } catch (error) {}
        item.timeStamp = time;
      },
    };
  },
  mounted() {
    this.form.address = this.$store.getters.account;
    this.loadData();
  },
  activated() {
    this.loadData();
  },
  methods: {
    revenueAddressOk(fun) {
      this.loading = true;
      let address = webSdk.sdkUtils.hashToNX(this.form.address);
      api
        .postJson("/platform/node/getNodeExistRealse", {
          address,
        })
        .then((response) => {
          this.loading = false;
          let binNumber = response.result;
          if (binNumber > 0) {
            this.$message.error(`${this.$t("messages.addresslocked")}`);
            return;
          }
          fun();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.revenueAddressOk(() => {
            let address = this.form.address;

            let valL = this.form.nfc;
            if (valL <= 0) {
              return;
            }

            let sdk = this.$store.getters.getsdk || null;

            if (sdk) {
              let _this_ = this;
              let setData = {
                title: `${this.$t("mymanageNode.pledgeNode")}`,
                context: `${this.$t("mymanageNode.node")} : ${address}`,
                request: null,
                closebtnshow: false,
                success() {
                  if (_this_.$refs.ftable) {
                    _this_.$refs.ftable.getAddrList();
                  }                  
                  _this_.$notify({
                    title: _this_.$t("loadingSubPan.finish"),
                    message: _this_.$t("messages.pledgok"),
                    type: "success",
                  });
                },
                err() {
                  _this_.$message.error("failed");
                },
              };
              let request = sdk.sendTransactionTo(
                webSdk.typeJson.candreq,
                { addr1: address },
                setData
              );
              setData.request = request;

              this.$store.dispatch("setNotification", setData);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    loadData() {
      this.btnShow = false;
      api
        .postJson("/platform/node/getNodePledgeAmount")
        .then((response) => {
          let exchRate = (response.result.NODE_PLEDGE_AMOUNT || 0) + "";
          this.form.nfc = utils.clearZero(exchRate);
          this.btnShow = this.form.nfc > 0;
        })
        .catch((error) => {
          this.btnShow = false;
          console.error(error);
        });
    },
  },
  computed: {
    getParam() {
      let address = this.$store.getters.account;
      return { fromAddr: address, txType: "CandReq" };
    },
  },
  watch: {
    "form.address": {
      immediate: true,
      handler: function (newVal) {
        try {
          if (ethers.utils.getAddress(newVal)) {
            //this.tableUrl = "/platform/getTxRecord";
            this.loadData();
          } else {
            this.btnShow = false;
            //   this.tableUrl = "";
          }
        } catch (error) {
          //  this.tableUrl = "";
          this.btnShow = false;
        }
        /* if(this.$refs.table&&this.$refs.table.getAddrList){
            this.$refs.table.getAddrList();
        }*/
      },
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