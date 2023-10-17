<template>
  <div class="accountsinfo-container ieHome">
    <slot name="ie_top">
      <div class="top-container"></div>
      <div class="content-container">
        <div class="block-container">
          <div class="detail-wrapper detail-info">
            <div class="left-wrapper" style="width: 100%; text-align: center">
              <el-form
                ref="form"
                :rules="rules"
                :model="form"
                label-width="120px"
                style="max-width: 500px; margin: 0px auto"
              >
                <el-form-item :label="$t('mymanage.pay')" required prop="ful">
                  <f-number
                    :min="0.000001"
                    v-model="form.ful"
                    step="0.000001"
                    units="FUL"
                  />
                </el-form-item>
                <el-form-item label="">
                  <div class="ie-form-item__label" style="text-align: left">
                    {{ $t("mymanage.estimate") }}{{ "： "
                    }}{{ (form.ful || 0) * exchRate }} NFC
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="onSubmit"
                    v-loading="!exchRate"
                    :disabled="!exchRate || form.ful <= 0"
                    >{{ $t("mymanage.pay") }}</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
  
    <div class="content-container list-container">
      <div style="padding-top:15px;"></div>
        <f-table
          title="mymanage.payrecord"
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
import fTable from "@/components/modules/Ftable.vue"
export default {
  components: { fNumber,fTable },
  data() {
    return {
      form: {
        ful: "",
        nfc: "",
      },
      rules: {
        ful: [{ required: true, trigger: "change" }],
      },
      exchRate: 0,

      tableHeard:[
          {name:"fulnum",label:"mymanage.payfulnum"},
          {name:"profitamount",label:"mymanage.nfcnumber"},
          {name:"address",label:"mymanage.address",type:"address"},
          {name:"time",label:"mymanage.payTime"},
      ],
      dataUtils:(item)=>{
         item.profitamount=utils.isEmpty(item.profitamount)?"":`${item.profitamount} NFC`
      }
            

    };
  },
  created() {
    this.loadData();
  },
  activated() {
    this.loadData();
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let ful = new Decimal(this.form.ful || "0");
          let exchRate = new Decimal(this.exchRate || "0");
          let valL = ful.mul(exchRate);
          if (valL.isZero()) {
            return;
          }

          let sdk = this.$store.getters.getsdk || null;

          if (sdk) {
            let _this_ = this;
            let request = sdk.sendTransactionTo(
              webSdk.typeJson.exch,
              valL.toFixed()
            );

            let setData = {
              title: `${this.$t("mymanage.pay")}`,
              context: `${valL.toFixed()} NFC => ${ful.toFixed()} FUL`,
              request,
              success() {
              
              },
              err() {
                _this_.$message.error("failed");
              },
            };
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
  computed:{
      getParam(){
          let address=this.$store.getters.account
          return  {"param1":address,"txType":"Exch" }
      }
  }
};
</script>
<style scoped>
.ie-form-item__label {
  font-weight: 600 !important;
  color: #555;
}
</style>