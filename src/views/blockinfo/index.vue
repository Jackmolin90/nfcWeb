<template>
  <div class="blockinfo-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container">
        <div class="detail-wrapper detail-info">
          <div class="left-wrapper">
            <div class="title">
              {{ $t("home.block") }} <span>{{ block }}</span>
            </div>
            <div class="other">
              <span>{{ $t("home.tranNumber", [blockInfo.txsCount]) }}</span>
              <span>{{ blockInfo.blockSize }} bytes</span>
              <span class="display-phone">
                <br />
              </span>
              <span
                >{{ formatTime(blockInfo.timeStamp)
                }}{{ false ? $t("comm.before") : "" }}（{{
                  formatTimed(
                    blockInfo.timeStamp / 1000,
                    "yyyy-MM-dd hh:mm:ss"
                  )
                }}）</span
              >
            </div>
            <div class="content">
              <div>
                <span>{{ $t("blockinfo.hash") }}</span
                ><span class="equal-width">{{ blockInfo.hash }}</span>
              </div>
              <div>
                <span>{{ $t("blockinfo.parentHash") }}</span
                ><span class="equal-width">{{ blockInfo.parentHash }}</span>
              </div>
              <div>
                <span>{{ $t("blockinfo.difficulty") }}</span
                ><span>{{ blockInfo.difficulty }}</span>
              </div>
              <div>
                <span>{{ $t("blockinfo.totalDifficulty") }}</span
                ><span>{{ blockInfo.totalDifficulty }}</span>
              </div>
              <div>
                <span>{{ $t("blockinfo.nonce") }}</span
                ><span>{{ blockInfo.nonce }}</span>
              </div>
            </div>
          </div>
          <div class="right-wrapper">
            <div class="title">
              <span>{{ $t("home.verificationNode") }}</span>
              <span
                v-show="blockInfo.minerAddress !== undefined"
                class="cursor"
                @click="goToUrl('Accountsinfo', blockInfo.minerAddress)"
              >
                {{ getAddrFormat(blockInfo.minerAddress, 8) }}
              </span>
            </div>
            <div class="content">
              <div>
                <span>Gas Used</span>
                <span>
                  {{ blockInfo.gasUsed }}（{{ blockInfo.gasUsedRate }}%）
                  <el-slider v-model="blockInfo.gasUsedRate" disabled />
                </span>
              </div>
              <div>
                <span>Gas Limit</span><span>{{ blockInfo.gasLimit }}</span>
              </div>
              <div>
                <span>Gas Price</span
                ><span>{{ getDataFormat(blockInfo.avgGasPrice, 9) }} Gwei</span>
              </div>
              <div>
                <span>{{ $t("home.blockReward") }}</span>
                <span>
                  <!-- <h2 v-for="(item, index) in rewardList" :key="index">
                    {{ getDataFormat(item.reward) }} NFC (<span class="cursor forcibly-blue" @click="goToUrl('Accountsinfo',item.addressHash)">{{ getAddrFormat(item.addressHash,6) }}</span>)</h2> -->
                  <h2>{{ getDataFormat(blockInfo.reward).toFixed(4) }} NFC</h2>
                </span>
              </div>
              <!--  <div>
                <span>{{ $t("flowmining.lockquantity") }}</span
                ><span>{{ blockInfo.lockamount }}</span>
              </div>
              <div>
                <span>{{ $t("lock.leftAmount") }}</span
                ><span>{{ blockInfo.releaseamount }}</span>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="false"
      class="content-container list-container"
      style="background: #ffffff"
      v-show="showTable"
    >
      <f-table
        title="lock.nodeawardFreed"
        @totalchange="totalchange"
        :url="tableUrl"
        :table-heard="tableHeard"
        :param="getParam"
        :show-action="false"
        :data-utils="dataUtils"
        :ation-width="200"
      ></f-table>
    </div>
    <div class="content-container">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span>{{ $t("home.tran") }}</span>
            <span></span>
          </div>
        </div>
        <div class="list-wrapper">
          <div v-if="tranList.length == 0" class="general-no-data">
            {{ $t("comm.noData") }}
          </div>
          <div class="display-pc-and-pad">
            <div
              v-for="(item, index) in tranList"
              :key="index"
              class="item-wrapper"
            >
              <div class="content">
                <div class="img">
                  <img src="/static/images/default.png" />
                </div>
                <div class="item tran-addr">
                  <div>
                    <span class="tran-title">{{ $t("home.tran") }} # </span
                    ><span
                      class="cursor equal-width"
                      @click="goToUrl('txnsinfo', item.tranAddr)"
                      >{{ item.tranAddr }}</span
                    >
                  </div>
                  <div>
                    <span class="tran-title">{{ $t("home.from") }}</span>
                    <span
                      class="cursor"
                      @click="goToUrl('accountsinfo', item.from)"
                    >
                      <span class="display-pc equal-width">{{
                        getAddrFormat(item.from, 10)
                      }}</span>
                      <span class="display-pad equal-width">{{
                        getAddrFormat(item.from, 8)
                      }}</span>
                    </span>
                    <span class="tran-title margin-left20">{{
                      $t("home.to")
                    }}</span>
                    <span
                      class="cursor"
                      @click="goToUrl('accountsinfo', item.to)"
                    >
                      <span class="display-pc equal-width">{{
                        getAddrFormat(item.to, 10)
                      }}</span>
                      <span class="display-pad equal-width">{{
                        getAddrFormat(item.to, 8)
                      }}</span>
                    </span>
                  </div>
                </div>
                <div class="item">
                  <div class="text-center">
                    {{ $t("home.tranValue") }}
                  </div>
                  <div>
                    {{ item.tranValue }}
                  </div>
                </div>
                <div class="item">
                  <div class="text-center">
                    {{ $t("home.handleFee") }}
                  </div>
                  <div>
                    {{ item.handFee }}
                  </div>
                </div>
                <div class="item">
                  <div class="cursor" @click="goToUrl('blockinfo', item.block)">
                    {{ item.block }}
                  </div>
                  <div>
                    <span class="status">{{ item.status }}</span
                    ><span
                      >{{ formatTime(item.time) }}{{ $t("comm.before") }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="display-phone">
            <div
              v-for="(item, index) in tranList"
              :key="index"
              class="item-wrapper"
            >
              <div class="top">
                <div class="left">
                  <div class="img">
                    <img :src="item.img" />
                  </div>
                  <div>
                    <h2
                      class="cursor"
                      @click="goToUrl('Blockinfo', item.block)"
                    >
                      {{ item.block }}
                    </h2>
                    <h3>{{ formatTime(item.time) }}{{ $t("comm.before") }}</h3>
                  </div>
                </div>
                <div class="right">
                  {{ item.status }}
                </div>
              </div>
              <div class="item-content">
                <div>
                  <span class="tran-title">{{ $t("home.tran") }} # </span
                  ><span
                    class="cursor equal-width"
                    @click="goToUrl('txnsinfo', item.tranAddr)"
                    >{{ getAddrFormat(item.tranAddr, 9) }}</span
                  >
                </div>
                <div>
                  <span class="tran-title">{{ $t("home.from") }}</span>
                  <span
                    class="cursor equal-width"
                    @click="goToUrl('accountsinfo', item.from)"
                    >{{ getAddrFormat(item.from, 8) }}</span
                  >
                  <br />
                  <span class="tran-title">{{ $t("home.to") }}</span>
                  <span
                    class="cursor equal-width"
                    @click="goToUrl('accountsinfo', item.to)"
                    >{{ getAddrFormat(item.to, 8) }}</span
                  >
                </div>
                <div>
                  <span class="text-center">{{ $t("home.tranValue") }}</span
                  ><span>{{ item.tranValue }}</span>
                </div>
                <div>
                  <span class="text-center">{{ $t("home.handleFee") }}</span
                  ><span>{{ item.handFee }}</span>
                </div>
              </div>
            </div>
            <div class="load-more" @click="getTranList(page + 1, 1)">
              {{ $t("comm.clickLoad") }}
            </div>
          </div>
        </div>
        <div class="display-pc-and-pad">
          <div class="bottom-wrapper">
            <div v-show="totalPages > 0" class="left-wrapper">
              <span>{{ $t("comm.show") }}</span>
              <span>
                <el-select
                  v-model="prePage"
                  :placeholder="$t('comm.selected')"
                  size="mini"
                  @change="getTranList(page)"
                >
                  <el-option
                    v-for="item in showNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </span>
              <span>{{ $t("comm.records") }}</span>
            </div>
            <div v-show="totalPages >= page" class="page-wrapper">
              <span
                :class="page > 1 ? 'cursor' : 'gray'"
                class="space"
                @click="getTranList(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="page > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="getTranList(page - 1)"
              >
                &lt;
              </span>
              <span class="forcibly-blue">{{ page }}</span
              >/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span
                :class="page == totalPages ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="getTranList(page + 1)"
              >
                &gt;
              </span>
              <span
                :class="page == totalPages ? 'gray' : 'cursor'"
                @click="getTranList(totalPages)"
                >{{ $t("comm.lastPage") }}</span
              >
              <span class="span-goto">{{ $t("comm.goto") }}</span>
              <span
                ><el-input
                  class="input-page"
                  v-model="currPage"
                  @keyup.enter.native="getTranList(currPage)"
                ></el-input
              ></span>
              <span>{{ $t("comm.page") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fTable from "@/components/modules/Ftable.vue";
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
export default {
  name: "Blockinfo",
  components: { fTable },
  data() {
    return {
      tableUrl: "",
      showTable: false,
      tableHeard: [
        {
          name: "revenue_address",
          label: "mymanageMining.revenuesaddress",
          type: "address",
        },
        {
          name: "releaseamount",
          label: "lock.freed",
        },
        {
          name: "curtime",
          label: "lock.freedTime",
        },
      ],
      dataUtils: (item) => {
        item.releaseamount = `${utils.clearZero(item.releaseamount)} NFC`;
        let time = item.curtime;
        try {
          if (time) {
            time = helper.formatTime(item.curtime / 1000);
          }
        } catch (error) {}
        item.curtime = time;
      },
      page: 1,
      prePage: 10,
      totalPages: 0,
      total: 0,
      block: "",
      blockInfo: {
        gasUsedRate: 0,
      },
      showNumbers: [
        {
          value: 10,
          label: "10",
        },
        {
          value: 20,
          label: "20",
        },
        {
          value: 50,
          label: "50",
        },
        {
          value: 100,
          label: "100",
        },
      ],
      tranList: [],
      timer2: {},
      timer: {},
      rewardList: {},
      loadText: this.$t("comm.clickLoad"),
      currPage: 1,
      tipsT: {
        just: " just ",
        second: " sec",
        minute: " min",
        hour: " hr",
        day: " day",
        week: " week",
        month: " month",
        year: " year",
      },
    };
  },
  created() {
    // let width = document.documentElement.clientWidth
    // this.$parent.showheader(false)
    // this.$parent.showfooter(false)
    this.block = this.$route.params.id;
    this.tableUrl = "/platform/lockNfcMinerInfo";
    this.getBlockInfo();

    // this.getBlockReward()
  },
  mounted() {
    this.getTranList(this.page);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.timer2) {
      clearInterval(this.timer2);
    }
  },
  methods: {
    totalchange(val) {
      this.showTable = val > 0;
    },
    getDataFormat(data, pow = 18, decimal = 10000) {
      return helper.getDataFormat(data, pow, decimal);
    },

    formatTime(time) {
      let timeL = helper.formatTimimg(time);
      if (timeL) {
         let times = timeL.split(" ");
        if (this.$i18n.locale == "en") {
          timeL = times[0] > 1 && times[1].indexOf("s") < 0 ? timeL + "s" : timeL;
        }
      }
      return timeL;
    },

    formatTimed(timestamp, format) {
      return helper.formatTime(timestamp, format);
    },

    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    getBlockReward() {
      this.broadcastData = [];
      var that = this;
      const param = {
        blockNumber: that.block,
      };

      api
        .post("/platform/getRewardByblockNumber", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            // that.$message({
            //   type: 'error',
            //   message: response.message
            // })
            helper.goPathUrl(that, "Search", that.block);
          } else {
            if (response.result === null) {
              return;
            }
            that.rewardList = response.result;
          }
        })
        .catch((error) => {
          // this.$message.error(error.ErrMsg)
          // this.dialogVisible = true
          console.error(error);
        });
    },

    getBlockInfo() {
      this.broadcastData = [];
      var that = this;
      const param = {
        blockNumber: that.block,
      };

      api
        .post("/platform/searchByNumber", param)
        .then((response) => {
          if (response.statusCode !== 0 || response.result === null) {
            // that.$message({
            //   type: 'error',
            //   message: response.message
            // })
            helper.goPathUrl(that, "Search", that.block);
          } else {
            that.blockInfo = response.result[0];
            that.blockInfo.gasUsedRate =
              Math.floor(
                (that.blockInfo.gasUsed / that.blockInfo.gasLimit) * 10000
              ) / 100;

            that.blockInfo.lockamount = `${utils.clearZero(
              that.blockInfo.lockamount  - that.blockInfo.releaseamount 
            )} NFC`;
            that.blockInfo.releaseamount = `${utils.clearZero(
              that.blockInfo.releaseamount
            )} NFC`;
            that.timer2 = setInterval(() => {
              that.blockInfo.timestamp++;
            }, 1000);
          }
        })
        .catch((error) => {
          // this.$message.error(error.ErrMsg)
          // this.dialogVisible = true
          console.error(error);
        });
    },

    getTranList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      var that = this;

      that.page = page;
      var param = {
        blockNumber: that.block,
        current: page,
        size: that.prePage,
      };
      api
        .postJson("/platform/getTransactionByBlockNumber", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result.total === 0) {
              that.loadText = "";

              return;
            }

            var data = response.result.records;
            if (data.length < that.prePage) {
              that.loadText = this.$t("comm.bottomLine");
            }
            that.totalPages = response.result.pages;
            that.total = response.result.total;
            const newData = [];
            var temp = {};
            data.forEach((item) => {
              temp = {
                img: "/static/images/default.png",
                block: item.blockNumber,
                time: item.timeStamp,
                status: this.$t("comm.success"),
                tranAddr: item.hash,
                from: item.fromAddr,
                to: item.toAddr,
                tranValue:
                  helper.getDataFormat(item.value, 18, 10000).toFixed(4) +
                  " NFC",
                handFee:
                  helper
                    .getDataFormat(item.gasUsed * item.gasPrice, 18, 10000)
                    .toFixed(4) + " NFC",
              };
              newData.push(temp);

              if (device === 1 && that.tranList.length > 0) {
                that.tranList.push(temp);
              }
            });
            if (that.tranList.length === 0 || device === 0) {
              that.tranList = newData;
            }

            that.timer = setInterval(() => {
              that.tranList.forEach((item) => {
                item.time++;
              });
            }, 1000);
          }
        })
        .catch((error) => {
          // this.$message.error(error.message)
          // this.dialogVisible = true
          console.error(error);
        });
    },
  },
  computed: {
    getParam() {
      return {
        type: 2,
        blockNumber: this.block,
      };
    },
  },
};
</script>

<style scoped>
.blockinfo-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.blockinfo-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  height: 3px;
}

.blockinfo-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}

.blockinfo-container /deep/ .el-input--medium .el-input__inner {
  height: 22px;
  padding: 0;
  text-align: center;
  border-radius: 8px;
}
</style>
