<template>
  <div class="txns-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container display-pc-and-pad">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t(totitle) }}</span>
              <span>{{ $t("home.currentTranNumber", [total]) }}</span>
            </div>
            <div class="page-wrapper">
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
              <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
            <span>
              <el-input class="input-page" v-model="currPage" @keyup.enter.native="getTranList(currPage)"></el-input>
            </span>
            <span>{{ $t("comm.page")}}</span> -->
            </div>
          </div>
          <div class="list-wrapper">
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
                    <!--<span class="tran-title">{{ $t('home.tran') }} </span>--><span
                      class="cursor equal-width"
                      @click="goToUrl('txnsinfo', item.tranAddr)"
                      >{{ item.tranAddr }}</span
                    >
                  </div>
                  <div>
                    <!-- <span class="tran-title">{{ $t('home.from') }}</span> -->
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
                    <img src="/static/images/to.png" alt="" />
                    <!-- <span class="tran-title margin-left20">{{ $t('home.to') }}</span> -->
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
                  <div class="cursor" @click="goToUrl('Blockinfo', item.block)">
                    {{ item.block }}
                  </div>
                  <div>
                    <span v-if="item.status == 1" class="status">{{
                      $t("comm.success")
                    }}</span>
                    <span v-else style="color: red;margin-right: 20px">{{ $t("comm.fail") }}</span>
                    <span>
                      {{ formatTime(item.time)
                      }}{{ false ? $t("comm.before") : "" }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="left-wrapper">
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
            <div class="page-wrapper">
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
              <!-- <span class="span-goto">{{ $t("comm.goto") }}</span>
            <span>
              <el-input class="input-page" v-model="currPage" @keyup.enter.native="getTranList(currPage)"></el-input>
            </span>
            <span>{{ $t("comm.page") }}</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="block-container display-phone">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t(totitle) }}</span>
              <span>{{ $t("home.currentTranNumber", [total]) }}</span>
            </div>
            <div class="right-wrapper"></div>
          </div>
          <div v-loading="isLoading" class="list-wrapper">
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
                    <h3>
                      {{ formatTime(item.time)
                      }}{{ false ? $t("comm.before") : "" }}
                    </h3>
                  </div>
                </div>
                <div class="right">
                   <span v-if="item.status == 1" class="status">{{
                      $t("comm.success")
                    }}</span>
                    <span v-else style="color: red;margin-right: 20px">{{ $t("comm.fail") }}</span>
                    
                </div>
              </div>
              <div class="item-content">
                <div>
                  <!--<span class="tran-title">{{ $t('home.tran') }} # </span>--><span
                    class="cursor"
                    @click="goToUrl('txnsinfo', item.tranAddr)"
                    >{{ getAddrFormat(item.tranAddr, 12) }}</span
                  >
                </div>
                <div>
                  <!-- <span class="tran-title">{{ $t('home.from') }}</span> -->
                  <span
                    class="cursor"
                    @click="goToUrl('accountsinfo', item.from)"
                    >{{ getAddrFormat(item.from, 5) }}</span
                  >
                  <img src="/static/images/to.png" alt="" />
                  <!-- <span class="tran-title">{{ $t('home.to') }}</span> -->
                  <span
                    class="cursor"
                    @click="goToUrl('accountsinfo', item.to)"
                    >{{ getAddrFormat(item.to, 5) }}</span
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
          </div>
        </div>
        <div class="load-more display-phone" @click="getTranList(page + 1, 1)">
          {{ $t("comm.clickLoad") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
export default {
  name: "Txns",
  props: {
    toaddress: {
      type: String,
      default: "",
    },
    totitle: {
      type: String,
      default: "home.tran",
    },
  },
  data() {
    return {
      page: 1,
      prePage: 10,
      totalPages: 0,
      total: 0,
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
      timer: {},
      loadText: this.$t("comm.clickLoad"),
      isLoading: false,
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
  },
  mounted() {
    this.getTranList(this.page);
  },
  destroyed() {
    this.$parent.$parent.showfooter(true);
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
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

    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    getTranList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      var that = this;
      that.isLoading = true;
      that.page = page;
      var param = {
        current: page,
        size: that.prePage,
        toAddr: that.toaddress || "",
      };

      api
        .postJson("/platform/getTransactionList", param)
        .then((response) => {
          that.isLoading = false;
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
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
            let temp = {};
            data.forEach((item) => {
              temp = {
                img: "/static/images/default.png",
                block: item.blockNumber,
                time: item.timeStamp,
                status: item.status,
                tranAddr: item.hash,
                from: item.fromAddr,
                to: item.toAddr,
                tranValue: `${utils.clearZero(item.value, 8)} NFC`,
                /* helper.getDataFormat(item.value, 18, 10000).toFixed(4) +
                  " NFC",*/
                handFee: `${utils.clearZero(
                  item.gasUsed * item.gasPrice,
                  8
                )} NFC`,
                /*
                  helper
                    .getDataFormat(item.gasUsed * item.gasPrice, 18, 10000)
                    .toFixed(4) + " NFC",*/
              };
              newData.push(temp);
              if (device === 1) {
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
};
</script>

<style scoped>
.txns-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.txns-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  height: 3px;
}

.txns-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}

.txns-container /deep/ .el-input--medium .el-input__inner {
  height: 22px;
  padding: 0;
  text-align: center;
  border-radius: 8px;
}
</style>
