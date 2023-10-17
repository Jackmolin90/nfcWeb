<style scoped>
.accounts-container
  .content-container
  .search
  .el-input--medium
  .el-input__inner {
  width: 414px;
  height: 30px;
  border-radius: 0;
  text-align: left;
  padding-left: 20px;
}
</style>

<template>
  <div class="accounts-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t('flowmining.miningview') }}</span>
              <span></span>
            </div>
          </div>

          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item :label="$t('flowmining.trans_hash')">{{form.trans_hash}}</el-form-item>
            <el-form-item :label="$t('flowmining.report_time')">{{form.report_time}}</el-form-item>
            <el-form-item :label="$t('flowmining.en_address')">{{form.en_address}}</el-form-item>
            <el-form-item :label="$t('flowmining.flow_value')">
              {{form.flow_value}}
              <template>
                <span v-if="form.flow_value">Mbps</span>
              </template>
            </el-form-item>
            <el-form-item :label="$t('flowmining.router_ipaddr')">{{form.router_ipaddr}}</el-form-item>
            <el-form-item :label="$t('flowmining.from_addr')">{{form.from_addr}}</el-form-item>
            <el-form-item :label="$t('flowmining.to_addr')">{{form.to_addr}}</el-form-item>
            <el-form-item :label="$t('flowmining.router_ipaddr')">{{form.router_ipaddr}}</el-form-item>
          </el-form>
          <!-- <div class="display-pc-and-pad">
            <div class="bottom-wrapper">
              <div class="left-wrapper">
                <span>{{ $t('comm.show') }}</span>
                <span>
                  <el-select
                    v-model="prePage"
                    :placeholder="$t('comm.selected')"
                    size="mini"
                    @change="getnfcCltDetail(page)"
                  >
                    <el-option
                      v-for="item in showNumbers"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </span>
                <span>{{ $t('comm.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span
                  :class="page > 1 ? 'cursor' : 'gray' "
                  class="space"
                  @click="getnfcCltDetail(1)"
                >{{ $t('comm.firstPage') }}</span>
                <span
                  :class="page > 1 ? 'page-cursor' : 'gray' "
                  class="space symbol"
                  @click="getnfcCltDetail(page-1)"
                >&lt;</span>
                <span class="forcibly-blue">{{ page }}</span>/
                <span class="space forcibly-blue">{{ totalPages }}</span>
                <span
                  :class="page == totalPages ? 'gray' : 'page-cursor' "
                  class="space symbol"
                  @click="getnfcCltDetail(page+1)"
                >&gt;</span>
                <span
                  :class="page == totalPages ? 'gray' : 'cursor' "
                  @click="getnfcCltDetail(totalPages)"
                >{{ $t('comm.lastPage') }}</span>
              </div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
import * as helper from "@/utils/helper";

export default {
  name: "MiningView",
  data() {
    return {
      hash: "",
      form: {},
      loadText: this.$t("comm.clickLoad")
    };
  },
  created() {
    this.hash = this.$route.params.id || "";
    let that = this;
    this.getnfcCltDetail();
    setTimeout(function() {
      that.getnfcCltDetail();
    }, 60000);
  },
  mounted() {},
  methods: {
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    getnfcCltDetail() {
      var that = this;
      api
        .postJson("/platform/flow/nfcCltDetail", { hash: that.hash })
        .then(response => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";
              return;
            }
            var data = response.result;
            that.form = data;
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.accounts-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.accounts-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  height: 3px;
}

.accounts-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}

.accounts-container /deep/ .el-button--text {
  color: #4a7bd3;
}

.accounts-container /deep/ .el-input--medium .el-input__inner {
  width: 414px;
  height: 30px;
  border-radius: 0;
  text-align: left;
  padding-left: 30px;
}
</style>
