<template>
  <div class="blocklist-container ieHome">
    <div class="content-container">
      <div class="content-container">
        <div class="top-wrapper">
          <div class="left-wrapper">
            {{ $t(title) }}
          </div>
        </div>
        <div style="width: 100%; text-align: center; padding-bottom: 20px">
          <el-form
            :model="from"
            ref="form"
            label-width="auto"
            style="max-width: 500px; margin: 0px auto; text-align: left"
          >
            <el-form-item :label="$t('node.address')">
              {{ from.node_address }}
            </el-form-item>
            <div v-if="upAddr">
              <el-form-item :label="$t('mymanageMining.revenuesaddress')">
                {{ from.revenue_address }}
              </el-form-item>
              <el-form-item
                :rules="rules"
                :label="$t('mymanageMining.newaddress')"
                prop="neWaddress"
              >
                <el-input v-model="from.neWaddress" />
              </el-form-item>
            </div>
            <el-form-item v-else :label="$t('mymanageMining.revenuesaddress')">
              <template slot="label">
                {{ $t("mymanageMining.revenuesaddress") }}
                <el-tooltip
                  class="item"
                  :content="$t('messages.upwallet')"
                  placement="top-start"
                >
                  <i class="el-icon-warning" style="color: orange"> </i>
                </el-tooltip>
              </template>

              {{ $store.getters.accounty }}
              <!-- <el-input v-model="form.data2.earnings"> </el-input>-->
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
                v-loading="loading"
                :disabled="loading || !from.isok"
                >{{ $t("messages.binding") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
import webSdk from "@/utils/webSdk.js";
import { ethers } from "ethers";
import * as api from "@/api/api";
export default {
  props: {
    title: {
      type: String,
      default: "binding.bindaddr",
    },
    upAddr: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let _this_ = this;
    return {
      loading: false,
      from: {
        node_address: "",
        revenue_address: "",
        neWaddress: "",
        isok: false,
      },
      rules: [
        {
          required: true,
          trigger: "change",
          message: _this_.$t("messages.pleaseaddress"),
        },
        {
          validator: (rule, value, callback) => {
            let valL = "";
            try {
              valL = ethers.utils.getAddress(value);
            } catch (error) {}
            if (valL) {
              callback();
            } else {
              callback(new Error(_this_.$t("messages.pleaseaddress")));
            }
          },
          trigger: "change",
        },
      ],
    };
  },
  created() {
    this.from.node_address = this.$route.params.id;
    if (!this.from.node_address) {
      return;
    }
    this.loadData();
  },
  methods: {
    goTheUrl(name) {
      helper.goTheUrl(this, name);
    },
    getAddrFormat(addr, num = 10) {
      return helper.getAddrFormat(addr, num);
    },
    onCopy() {
      this.$message({
        showClose: true,
        type: "success",
        message: this.$t("utilsmsg.copyok"),
      });
    },

    toData(sdk, fun) {
      let contractAddr = "0x0000000000000000000000000000000000000000";
      let signaddr = "0x0000000000000000000000000000000000000000";
      let nodeAdd = this.from.node_address;
      let revenueAddr = this.upAddr
        ? this.from.neWaddress
        : this.from.revenue_address;
      
      try {
        revenueAddr = ethers.utils.getAddress(revenueAddr);
      } catch (error) {}
      let setData = {
        title: `${this.$t(this.title)}`,
        context: `${this.$t("node.address")}:${nodeAdd}<br/>`,
        request: null,
        closebtnshow: false,
        success(response) {
          fun(response);
        },
      };
      let request = null;
      if (this.upAddr) {
        request = sdk.sendTransactionTo(
          webSdk.typeJson.rebind,
          {
            addr1: nodeAdd,
            type: 0,
            contractAddr,
            signaddr,
            revenueAddr,
          },
          setData
        );
      } else {
        request = sdk.sendTransactionTo(
          webSdk.typeJson.Bind,
          {
            addr1: nodeAdd,
            type: 0,
            contractAddr,
            signaddr,
            revenueAddr,
          },
          setData
        );
      }

      setData.request = request;

      this.$store.dispatch("setNotification", setData);
    },

    toPoolOk() {
      this.$store.dispatch("setWinStatus", false);
      let message = this.upAddr
        ? `${this.$t("messages.newaddress")}：${this.from.neWaddress}`
        : `${this.$t("coins.success")}`;
      let title = this.$t(this.title);

      this.$notify({
        title,
        message,
        type: "success",
      });

      this.toNodes();
    },
    toNodes() {
      helper.goUrl(this, "MymanageNode", "");
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        let sdk = this.$store.getters.getsdk || null;

        if (this.upAddr) {
          let waddress = "";
          let revenue_address = "";
          try {
            revenue_address = ethers.utils.getAddress(
              this.from.revenue_address
            );
            waddress = ethers.utils.getAddress(this.$store.getters.account);
          } catch (error) {}
          if (revenue_address != waddress) {
            this.$message.error(`${this.$t("mymanageMining.pleasetoyaddr")}`);
            return;
          }
        }
       
        this.revenueAddressOk(() => {
          this.toData(sdk, () => {
            this.toPoolOk();
          });
        });
      });
    },
    revenueAddressOk(fun) {
      this.loading=true;
      let reAddress = this.upAddr
        ? this.from.neWaddress
        : this.$store.getters.account;
      reAddress = webSdk.sdkUtils.hashToNX(reAddress);
      api
        .postJson("/platform/node/getcadnodeByRev", {
          revenue_address: reAddress,
        })
        .then((response) => {
          this.loading=false;
          let binNumber = response.result;
          if (binNumber > 0) {
            this.$message.error(`${this.$t("messages.addressused")}`);
            return;
          }
          fun();
        })
        .catch((err) => {
          this.loading=false;
        });
    },
    loadData() {
      this.loading = true;
      let tabledata = {
        node_address: this.from.node_address,
      };
      api
        .postJson("/platform/node/getcadnode", tabledata)
        .then((response) => {
          let item = response.result || {};
          let node_address = item.node_address;
          let revenue_address = item.revenue_address;
          if (node_address) {
            this.from = {
              node_address,
              revenue_address,
              neWaddress: "",
              isok: !(utils.isEmpty(revenue_address) && this.upAddr),
            };
          } else {
            this.from = {
              node_address: "",
              revenue_address: "",
              neWaddress: "",
              isok: false,
            };
          }

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
};
</script>