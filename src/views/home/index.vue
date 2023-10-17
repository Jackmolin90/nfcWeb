<template>
  <div class="home-container">

    <div class="base-container">
      <div class="display-pc-and-pad">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span><img :src="'/static/images/Overview.png'" /></span>
              <span>{{ $t("home.overview") }}</span>
              <span>{{ $t("home.network") }}</span>
            </div>
            <div class="right-wrapper">
              <div v-if="!isShowList" class="show-item" @click="showList()">
                {{ $t("home.show") }} <i></i>
              </div>
              <div v-else class="show-item" @click="showList()">
                {{ $t("home.hide") }} <i class="up"></i>
              </div>
            </div>
          </div>
          <div class="item-list" :class="{ 'show-list': isShowList }">
            <div class="item" v-for="(item, cd) in topDivs" :key="cd">
              <div class="content">
                <div class="detail">
                  <div class="number">
                    {{ topData[item.name] || "--" }}
                  </div>
                  <div class="title">
                    {{ $t(item.title) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="display-phone">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t("home.overview") }}</span>
              <span>{{ $t("home.network") }}</span>
            </div>
          </div>
          <div class="list" :class="{ 'show-list': isShowList }">
            <div class="item" v-for="(item, cd) in topDivs" :key="cd">
              <div class="number">
                {{ topData[item.name] || "--" }}
              </div>
              <div class="title">
                {{ $t(item.title) }}
              </div>
            </div>
          </div>
          <div v-if="!isShowList" class="show-more" @click="showList()">
            {{ $t("home.showMore") }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="true" class="base-container block-container">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span>{{ $t("charts.totalflowchart") }}</span>
            <span></span>
          </div>
        </div>
        <div class="charts_div">
          <flow-chart />
        </div>
      </div>
    </div>

    <div class="base-container block-container">
      <div class="display-pc-and-pad">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span
                ><img
                  width="32px"
                  height="33px"
                  :src="'/static/images/default.png'"
              /></span>
              <span>{{ $t("home.flowminingpledge") }}</span>
              <span></span>
            </div>
          </div>
          <div class="item-list show-list">
            <div class="item" v-for="(item, cd) in pledgeDivs" :key="cd">
              <div class="content ie_content">
                <div class="detail">
                  <div class="number">
                    {{
                      pledgeData[item.name]
                        ? pledgeData[item.name] + " NFC/Mbps"
                        : "--"
                    }}
                  </div>
                  <div class="title">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="display-phone">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t("home.overview") }}</span>
              <span>{{ $t("home.network") }}</span>
            </div>
          </div>
          <div class="list show-list">
            <div class="item" v-for="(item, cd) in pledgeDivs" :key="cd">
              <div class="number">
                {{
                  pledgeData[item.name]
                    ? pledgeData[item.name] + " NFC/Mbps"
                    : "--"
                }}
              </div>
              <div class="title">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block-container">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span><img :src="'/static/images/Blocks.png'" /></span>
            <span>{{ $t("home.block") }}</span>
            <span>{{ $t("home.currentBlockNumber", [blockListTotal]) }}</span>
          </div>
          <div class="right-wrapper display-pc-and-pad">
            <span class="more" @click="goToUrl('Block', '')">{{
              $t("home.more")
            }}</span>
            <!-- <img src="/static/images/more_img.png" @click="goToUrl('Block','')"> -->
          </div>
        </div>
        <div class="block-swiper display-pc-and-pad">
          <div class="card-wrapper">
            <swiper ref="swiper" :options="swiperOptions" dir="rtl">
              <swiper-slide v-for="(item, index) in blockList" :key="index">
                <div class="item">
                  <div class="content">
                    <div
                      class="block-height cursor"
                      @click="goToUrl('Blockinfo', item.block)"
                    >
                      {{ item.block }}
                      <img
                        :src="'/static/images/trade.png'"
                        style="float: right; margin-right: 20px"
                        height="48"
                        width="48"
                      />
                    </div>
                    <div class="other">
                      <p>{{ $t("home.tranNumber", [item.transition]) }}</p>
                      <p>
                        {{ $t("home.verificationNode")
                        }}<span
                          class="node cursor equal-width"
                          @click="
                            goToUrl('accountsinfo', item.validationAddress)
                          "
                          >{{ item.validation
                          }}{{ getAddrFormat(item.validationAddress, 8) }}</span
                        >
                      </p>
                      <p class="block-reward">
                        {{ $t("home.blockReward")
                        }}<span>{{ item.award }} {{ item.unit }}</span>
                      </p>
                      <!-- <p class="block-reward">{{ $t('home.blockReward') }}<span>30.8798 {{ item.unit }}</span></p> -->
                    </div>
                  </div>

                  <div class="time-wrapper">
                    <div>
                      <h2>
                        <img src="/static/images/max-point.png" /><span
                          >{{ formatTime(item.time)
                          }}{{ false ? $t("comm.before") : "" }}</span
                        >
                      </h2>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="dotted-line"></div>
        </div>
        <div class="block-swiper display-phone">
          <div
            v-for="(item, index) in phoneBlockList"
            :key="index"
            class="card-wrapper"
          >
            <div class="item">
              <div class="content">
                <div>
                  <div
                    class="block-height cursor"
                    @click="goToUrl('Blockinfo', item.block)"
                  >
                    {{ item.block }}
                  </div>
                  <div>
                    {{ formatTime(item.time)
                    }}{{ false ? $t("comm.before") : "" }}
                  </div>
                </div>
                <div class="other">
                  <p>{{ $t("home.tranNumber", [item.transition]) }}</p>
                  <p>
                    {{ $t("home.verificationNode")
                    }}<span
                      class="node cursor equal-width"
                      @click="goToUrl('accountsinfo', item.validationAddress)"
                      >{{ item.validation }}
                      {{ getAddrFormat(item.validationAddress, 16) }}</span
                    >
                  </p>
                  <p class="block-reward">
                    {{ $t("home.blockReward")
                    }}<span>{{ item.award }} {{ item.unit }}</span>
                  </p>
                  <!-- <p class="block-reward">{{ $t('home.blockReward') }}<span>30.8798 {{ item.unit }}</span></p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="more">
            <div @click="goToUrl('Block', '')">
              {{ $t("home.seeMore")
              }}<span><img src="/static/images/arrow.png" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block-container display-pc-and-pad">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span><img :src="'/static/images/Transactions.png'" /></span>
            <span></span>
            <span>{{ $t("home.tran") }}</span>
            <span>{{ $t("home.currentTranNumber", [tranListTotal]) }}</span>
          </div>
          <div class="right-wrapper">
            <span class="more" @click="goToUrl('Txns', '')">{{
              $t("home.more")
            }}</span>
            <!-- <img src="/static/images/more_img.png" @click="goToUrl('Txns','')"> -->
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
                  <span class="tran-title">{{ "Txn Hash" }} </span
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
                  <span v-if="item.status == 1" class="status">
                    {{ $t("comm.success") }}
                  </span>
                  <span v-else style="color: red;margin-right: 20px">{{ $t("comm.fail") }}</span>
                  <span
                    >{{ formatTime(item.time)
                    }}{{ false ? $t("comm.before") : "" }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block-container display-phone">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span>{{ $t("home.tran") }}</span>
            <span>{{ $t("home.currentTranNumber", [tranListTotal]) }}</span>
          </div>
          <div class="right-wrapper"></div>
        </div>
        <div class="list-wrapper">
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
                  <h2 class="cursor" @click="goToUrl('Blockinfo', item.block)">
                    {{ item.block }}
                  </h2>
                  <h3>
                    {{ formatTime(item.time)
                    }}{{ false ? $t("comm.before") : "" }}
                  </h3>
                </div>
              </div>
              <div class="right">
                 <span v-if="item.status == 1" class="status">
                    {{ $t("comm.success") }}
                  </span>
                  <span v-else style="color: red;margin-right: 20px">{{ $t("comm.fail") }}</span>
                  
              </div>
            </div>
            <div class="item-content">
              <div>
                <span class="tran-title">{{ "Txn Hash" }} </span
                ><span
                  class="cursor"
                  @click="goToUrl('txnsinfo', item.tranAddr)"
                  >{{ getAddrFormat(item.tranAddr, 10) }}</span
                >
              </div>
              <div>
                <span class="tran-title">{{ $t("home.from") }}</span>
                <span
                  class="cursor"
                  @click="goToUrl('accountsinfo', item.from)"
                  >{{ getAddrFormat(item.from, 8) }}</span
                >
                <br />
                <span class="tran-title">{{ $t("home.to") }}</span>
                <span
                  class="cursor"
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
        </div>
        <div class="more">
          <div @click="goToUrl('Txns', '')">
            {{ $t("home.seeMore")
            }}<span><img src="/static/images/arrow.png" /></span>
          </div>
        </div>
      </div>
    </div>

    <div class="block-container display-pc-and-pad">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              ><img
                style="
                  -webkit-filter: grayscale(100%);
                  -moz-filter: grayscale(100%);
                  -ms-filter: grayscale(100%);
                  -o-filter: grayscale(100%);
                  filter: grayscale(100%);
                  filter: gray;
                "
                :src="'/static/images/Transactions.png'"
            /></span>
            <span></span>
            <span>{{ $t("home.destroy") }}</span>
            <span>{{ $t("home.currentTranNumber", [destroyListTotal]) }}</span>
          </div>
          <div class="right-wrapper">
            <span class="more" @click="goToUrl('Destroy', '')">{{
              $t("home.more")
            }}</span>
            <!-- <img src="/static/images/more_img.png" @click="goToUrl('Txns','')"> -->
          </div>
        </div>
        <div class="list-wrapper">
          <div
            v-for="(item, index) in destroyList"
            :key="index"
            class="item-wrapper"
          >
            <div class="content">
              <div class="img">
                <img src="/static/images/default.png" />
              </div>
              <div class="item tran-addr">
                <div>
                  <span class="tran-title">HASH </span
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
                  <span v-if="item.status == 1" class="status">
                    {{ $t("comm.success") }}
                  </span>
                  <span v-else style="color: red;margin-right: 20px">{{ $t("comm.fail") }}</span
                  ><span
                    >{{ formatTime(item.time)
                    }}{{ false ? $t("comm.before") : "" }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block-container display-phone">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span>{{ $t("home.tran") }}</span>
            <span>{{ $t("home.currentTranNumber", [destroyListTotal]) }}</span>
          </div>
          <div class="right-wrapper"></div>
        </div>
        <div class="list-wrapper">
          <div
            v-for="(item, index) in destroyList"
            :key="index"
            class="item-wrapper"
          >
            <div class="top">
              <div class="left">
                <div class="img">
                  <img :src="item.img" />
                </div>
                <div>
                  <h2 class="cursor" @click="goToUrl('Blockinfo', item.block)">
                    {{ item.block }}
                  </h2>
                  <h3>
                    {{ formatTime(item.time)
                    }}{{ false ? $t("comm.before") : "" }}
                  </h3>
                </div>
              </div>
              <div class="right">
                {{ $t("comm.success") }}
              </div>
            </div>
            <div class="item-content">
              <div>
                <span class="tran-title">{{ "Txn Hash" }} </span
                ><span
                  class="cursor"
                  @click="goToUrl('txnsinfo', item.tranAddr)"
                  >{{ getAddrFormat(item.tranAddr, 10) }}</span
                >
              </div>
              <div>
                <span class="tran-title">{{ $t("home.from") }}</span>
                <span
                  class="cursor"
                  @click="goToUrl('accountsinfo', item.from)"
                  >{{ getAddrFormat(item.from, 8) }}</span
                >
                <br />
                <span class="tran-title">{{ $t("home.to") }}</span>
                <span
                  class="cursor"
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
        </div>
        <div class="more">
          <div @click="goToUrl('Destroy', '')">
            {{ $t("home.seeMore")
            }}<span><img src="/static/images/arrow.png" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
import flowChart from "@/views/home/charts/flowChart.vue";
export default {
  name: "Home",
  components: { flowChart },
  data() {
    return {
      blockTotal: "--",
      tranTotal: "--",
      destroyTotal: "--",
      walletAddrTotal: "--",
      blockTimeTotal: "--",
      computingPower: "--",
      activeMiner: "--",
      totalNetWorkTraffic: "--",
      totalCirculationQuantity: "--",
      totalDugQuantity: "--",
      addresspools: "--",
      totalPledgeQuantity: "--",
      totalLockUpQuantity: "--",
      totalTransactionValue: "--",
      yesterTransactionValue: "--",
      yesterNewAccount: "--",
      voterSize: "--",
      voterTotal: "--",
      voterProportion: "--",
      desnfc: "--",

      topDivs: [
        { name: "totalBlockNumber", title: "home.totalBlockNumber" },
        { name: "bandWidthSize", title: "home.effectiveforce" },
        { name: "totalFlow", title: "home.flow" },
        { name: "pledgeNum", title: "home.pledge" },
        { name: "lockNum", title: "home.lock" },
        { name: "destrNum", title: "home.desnfc" },
        { name: "nfcToGb", title: "home.power" },
        { name: "nfc24", title: "home.lastoutput" },
        { name: "nextElectTime", title: "home.nextelection" },

        { name: "blockRewardTotal", title: "home.BlockReward" },
        { name: "supplyTotalNfc", title: "home.TotalMaxSupply" },
        { name: "blockTime", title: "home.AverageBlockInterval" },
        { name: "totalAcount", title: "home.TotalAccount" },
        { name: "transaction24h", title: "home.Transactions" },
        { name: "circulatingSupply", title: "home.CirculatingSupply" },
        { name: "circulatingRate", title: "home.CirculatingRate" },
      ],
      topData: {},
      pledgeDivs: [
        { name: "bw0_300", title: "1-300 Mbps" },
        { name: "bw301_800", title: "301-800 Mbps" },
        { name: "bw801_1500", title: "801-1500 Mbps" },
        { name: "bw1500", title: ">1500 Mbps" },
      ],
      pledgeData: {},
      count: 0,
      swiperOptions: {
        slidesPerView: "auto",
      },
      blockListTotal: 0,
      laseBlock: 0,
      blockList: [],
      phoneBlockList: [],
      tranListTotal: 0,
      tranList: [],
      destroyListTotal: 0,
      destroyList: [],
      timer: {},
      timer2: {},
      isShowList: false,
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
    this.getTotalData();
    this.getPlgeRange();
    this.getBlockList();

    this.getTranList();

    this.getDestroyList();

    this.intervalToken = setInterval(() => {
      this.getBlockList();
    }, 20000);
    this.intervalData = setInterval(() => {
      this.getTotalData();
      this.getPlgeRange();
    }, 20000);
    this.intervalTran = setInterval(() => {
      this.getTranList();
    }, 20000);
    this.intervalDestroy = setInterval(() => {
      this.getDestroyList();
    }, 20000);
  },
  beforeDestroy() {
    if (this.intervalToken) {
      clearInterval(this.intervalToken);
    }
    if (this.intervalData) {
      clearInterval(this.intervalData);
    }
    if (this.intervalTran) {
      clearInterval(this.intervalTran);
    }
    if (this.intervalDestroy) {
      clearInterval(this.intervalDestroy);
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.timer2) {
      clearInterval(this.timer2);
    }
  },
  methods: {
    showList() {
      this.isShowList = !this.isShowList;
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
    changeSymbol(address, Symbol, digits) {
      return helper.changeSymbol(address, Symbol, digits);
    },
    changeBackSymbol(address, Symbol, digits) {
      return helper.changeBackSymbol(address, Symbol, digits);
    },
    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    commaSeparateNumber(val) {
      while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
      }
      return val;
    },
    getPlgeRange() {
      api
        .postJson("/platform/getBwPlgeRange", "")
        .then((response) => {
          this.pledgeData = response.result || {};
        })
        .catch((err) => {
          console.error(err);
        });
    },

    getTotalData() {
      var that = this;
      api
        .postJson("/platform/getDatas", "")
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              return;
            }
            const data = response.result || {};

            data.bandWidthSize = utils.getSuffix(data.bandWidthSize, "bps");
            data.totalFlow = utils.getSuffix(data.totalFlow, "iB");
            data.pledgeNum = data.pledgeNum
              ? data.pledgeNum + " NFC"
              : data.pledgeNum;

            data.lockNum = `${utils.clearZero(data.lockNum)} NFC`;
            data.destrNum = `${utils.clearZero(data.destrNum)} NFC`;

            data.nfcToGb = data.nfcToGb
              ? data.nfcToGb + " NFC/GiB"
              : data.nfcToGb;
            data.nfc24 = data.nfc24
              ? `${utils.clearZero(data.nfc24, 4)} NFC`
              : data.nfc24;

            data.nextElectTime = data.nextElectTime
              ? data.nextElectTime
              : data.nextElectTime;

            data.blockRewardTotal = data.blockRewardTotal
              ? `${utils.clearZero(data.blockRewardTotal, 4)} NFC`
              : data.blockRewardTotal;
            data.supplyTotalNfc = data.supplyTotalNfc
              ? `${data.supplyTotalNfc} NFC`
              : data.supplyTotalNfc;
            data.circulatingSupply = data.circulatingSupply
              ? `${utils.clearZero(data.circulatingSupply, 4)} NFC`
              : data.circulatingSupply;
            data.transaction24h = data.transaction24h;
            // ? utils.clearZero(data.transaction24h, 4):data.transaction24h

            data.blockTime = data.blockTime
              ? data.blockTime + " sec"
              : data.blockTime;
            data.circulatingRate = data.circulatingRate
              ? data.circulatingRate * 100 + " %"
              : data.circulatingRate;

            this.topData = data;
          }
        })
        .catch((error) => {
          // this.$message.error(error.message)
          // this.dialogVisible = true
          console.error(error);
        });
      api
        .postJson("/platform/getDataForNfc", "")
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              return;
            }
            const data = response.result;
            that.computingPower = data.ComputingPower;
            that.activeMiner = data.ActiveMiner;
            that.totalNetWorkTraffic = data.TotalNetWorkTraffic;
          }
        })
        .catch((error) => {
          // this.$message.error(error.message)
          // this.dialogVisible = true
          console.error(error);
        });
    },

    getBlockList() {
      var that = this;
      var param = {
        current: 1,
        size: 4,
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
            if (response.result === null || response.result.total === 0) {
              return;
            }
            var data = response.result.records;
            data = data.reverse();
            that.blockTotal = that.blockListTotal = response.result.total;
            const newData = [];
            var newLaseBlock = 0;
            let temp = {};
            var phoneNewData = [];
            data.forEach((item) => {
              temp = {
                block: item.blockNumber,
                transition: item.blockTransactionCount,
                validation: "",
                validationAddress: item.minerAddress,
                award: helper.getDataFormat(item.reward, 18, 10000).toFixed(4),
                unit: "NFC",
                time: item.timeStamp,
              };

              phoneNewData.push(temp);

              if (that.laseBlock === 0) {
                newData.push(temp);
                newLaseBlock = item.number;
              } else {
                if (that.laseBlock < item.number) {
                  newLaseBlock = item.number;
                  that.blockList.push(temp);
                  that.$nextTick(() => {
                    that.$refs.swiper.swiper.slideTo(that.blockList.length - 1);
                  });
                  if (that.blockList.length > 50) {
                    that.blockList.shift();
                  }
                }
              }
            });

            that.phoneBlockList = phoneNewData.reverse();

            if (newData.length > 0) {
              that.blockList = newData;
            }
            if (newLaseBlock > 0) {
              that.laseBlock = newLaseBlock;
            }

            that.timer2 = setInterval(() => {
              that.blockList.forEach((item) => {
                item.time++;
              });

              that.phoneBlockList.forEach((item) => {
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

    getTranList() {
      var that = this;
      var param = {
        current: 1,
        size: 4,
      };
      api
        .postJson("/platform/getTransactionList", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              return;
            }
            var data = response.result.records;
            that.tranTotal = that.tranListTotal = response.result.total;
            const newData = [];
            data.forEach((item) => {
              newData.push({
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
                /*helper
                    .getDataFormat(item.gasUsed * item.gasPrice, 18, 10000)
                    .toFixed(4) + " NFC",*/
              });
            });
            that.tranList = newData;
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

    getDestroyList() {
      var that = this;
      var param = {
        current: 1,
        size: 4,
        toAddr: "0x0000000000000000000000000000000000000000",
      };
      api
        .postJson("/platform/getTransactionList", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              return;
            }
            var data = response.result.records;
            that.destroyTotal = that.destroyListTotal = response.result.total;
            const newData = [];
            data.forEach((item) => {
              newData.push({
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
              });
            });
            that.destroyList = newData;
            that.timer = setInterval(() => {
              that.destroyList.forEach((item) => {
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

<style lang="scss" scoped>
.content-wrapper {
  max-width: 100%;
}
.charts_div {
  width: 100%;
}
</style>
