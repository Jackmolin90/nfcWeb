<template>
  <div class="txnsinfo-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container">
        <div class="detail-info">
          <div class="left-wrapper">
            <div class="title">
              <span>{{ $t("tran.info") }}</span
              ><span class="display-phone">{{
                tranInfo.status == 1 ? $t("comm.success") : ""
              }}</span>
            </div>
            <div class="addr equal-width">
              {{ tranAddr }}
            </div>
            <div class="other">
              <span class="display-pc-and-pad">{{
                tranInfo.status == 1 ? $t("comm.success") : ""
              }}</span
              ><span
                >{{ formatTime(tranInfo.time) }}{{ $t("comm.before") }}（{{
                  tranInfo.timeStamp
                }}
                ）</span
              >
            </div>
            <div class="content">
              <div>
                <span>{{ $t("tran.sendAddr") }}</span
                ><span
                  class="cursor forcibly-blue equal-width"
                  @click="goToUrl('accountsinfo', tranInfo.fromAddr)"
                  >{{ tranInfo.fromAddr }}</span
                >
              </div>
              <div>
                <span>{{ $t("tran.acceptAddr") }}</span
                ><span
                  class="cursor forcibly-blue equal-width"
                  @click="goToUrl('accountsinfo', tranInfo.toAddr)"
                  >{{ tranInfo.toAddr }}</span
                >
              </div>
              <div>
                <span>{{ $t("home.block") }}</span
                ><span
                  class="cursor blue"
                  @click="goToUrl('blockinfo', tranInfo.blockNumber)"
                  >{{ tranInfo.blockNumber }} </span
                ><span>（{{ $t("tran.verifyBlock", [confirmBlock]) }}）</span>
              </div>
              <div>
                <span>Nonce</span><span>{{ tranInfo.nonce }}</span>
              </div>
              <div>
                <span>{{ $t("home.tranValue") }}</span
                ><span>{{ getDataFormat(tranInfo.value).toFixed(4) }} NFC</span>
              </div>
              <div>
                <span>{{ $t("home.handleFee") }}</span
                ><span
                  >{{
                    getDataFormat(
                      tranInfo.gasUsed * tranInfo.gasPrice,
                      18,
                      10000
                    ).toFixed(4)
                  }}
                  NFC</span
                >
              </div>
              <div>
                <span>Gas Used</span
                ><span
                  >{{ tranInfo.gasUsed }}（{{ tranInfo.gasUsedRate }} %）</span
                >
              </div>
              <div>
                <span>Gas Limit</span><span>{{ tranInfo.gasLimit }}</span>
              </div>
              <div>
                <span>Gas Price</span
                ><span>{{ getDataFormat(tranInfo.gasPrice, 9) }} Gwei</span>
              </div>
             
               <div v-for="(item, cd) in additions" :key="cd">
                <span>{{ $t(item.title) }}</span
                ><span>{{item.isT? $t(getAdditionsVal(item,tranInfo[item.name])):getAdditionsVal(item,tranInfo[item.name]) }}</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
import txnsinfoDatas from "@/utils/txnsinfoDatas";
export default {
  name: "Txnsinfo",
  data() {
    return {
      tranAddr: "",
      newBlock: 0,
      confirmBlock: 0,
      tranInfo: {},
      timer: {},
      intervalToken: {},
      additions: [],
    };
  },
  created() {
    // let width = document.documentElement.clientWidth
    // this.$parent.showheader(false)
    // this.$parent.showfooter(false)
    this.tranAddr = this.$route.params.id;
    this.getTranInfo();
  },
  mounted() {
    this.intervalToken = setInterval(() => {
      this.getBlockList();
    }, 10000);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.intervalToken) {
      clearInterval(this.intervalToken);
    }
  },
  methods: {
    additionsData() {
      let item = this.tranInfo || {};
      if (item.status != 1) {
        this.additions = [];
        return;
      }

      let jsonL = txnsinfoDatas[item.ufoprefix] || {};
      this.additions = jsonL[item.ufoOperator] || [];
    },
     getAdditionsVal(item, val) {
      if (item.valFun) {
        return item.valFun(val);
      }
      if (item.valMap) {
        return item.valMap[val];
      }
      return val;
    },
    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },

    formatTime(time) {
      return helper.formatTimimg(time);
    },

    getDataFormat(data, pow = 18, decimal = 10000) {
      return helper.getDataFormat(data, pow, decimal);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    getBlockList() {
      var that = this;
      var param = {
        current: 1,
        size: 1,
      };
      api
        .postJson("/platform/getBlockList", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            that.newBlock = response.result.records[0]["blockNumber"];
            that.confirmBlock = that.newBlock - that.tranInfo.blockNumber;
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
          this.dialogVisible = true;
          console.error(error);
        });
    },

    getTranInfo() {
      this.broadcastData = [];
      var that = this;
      const param = {
        txHash: that.tranAddr,
      };

      api
        .postJson("/platfrom/getTransactionByTokenHash", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            // that.$message({
            //   type: 'error',
            //   message: response.message
            // })

            helper.goPathUrl(that, "Search", that.accAddr);
          } else {
            that.tranInfo = response.result[0];
            that.tranInfo.time = that.tranInfo.timeStamp;
            that.tranInfo.timeStamp = helper.formatTime(
              that.tranInfo.timeStamp / 1000,
              "yyyy-MM-dd hh:mm:ss"
            );
            that.tranInfo.gasUsedRate =
              Math.floor(
                (that.tranInfo.gasUsed / that.tranInfo.gasLimit) * 10000
              ) / 100;
            that.timer = setInterval(() => {
              that.tranInfo.time++;
            }, 1000);
            that.additionsData();
            this.getBlockList();
          }
        })
        .catch((error) => {
          this.$message.error(error.ErrMsg);
          this.dialogVisible = true;
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.txnsinfo-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.txnsinfo-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  height: 3px;
}

.txnsinfo-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}
</style>
