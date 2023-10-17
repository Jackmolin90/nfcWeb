<template>
  <div class="accountsinfo-container">
    <slot name="ie_top">
      <div class="top-container"></div>
      <div class="content-container">
        <div class="block-container">
          <div class="detail-wrapper detail-info">
            <div class="left-wrapper">
              <div class="title">
                {{ $t("accounts.info") }}
              </div>
              <div class="other">
                <span>{{
                  $t("accounts.totalTran", [accInfo.transactionCount])
                }}</span>
                <!-- <div class="display-phone"><br></div> -->
                <span>{{ $t("accounts.lastUpdateBlock") }}</span>
                <span
                  class="cursor"
                  @click="goToUrl('Blockinfo', accInfo.blockNumber)"
                  >{{ accInfo.blockNumber }}</span
                >
              </div>
              <div class="content">
                <div>
                  <span>{{ accAddr }}</span>
                  <span class="display-pc"
                    ><img
                      src="/static/images/copy.png"
                      class="cursor"
                      @click="handleCopy(accAddr)"
                  /></span>
                  <span class="display-pc"
                    ><img
                      class="cursor"
                      src="/static/images/recode.png"
                      @click="recodeDialogVisible = true"
                  /></span>
                </div>
              </div>
              <div class="display-pad-and-phone operate">
                <span
                  ><img
                    src="/static/images/copy.png"
                    class="cursor"
                    @click="handleCopy(accAddr)"
                /></span>
                <span
                  ><img
                    class="cursor"
                    src="/static/images/recode.png"
                    @click="recodeDialogVisible = true"
                /></span>
              </div>
            </div>
            <div class="right-wrapper">
              <div class="title">
                <span>{{ $t("accounts.balance") }}</span>
              </div>
              <div class="content">
                <div>
                  <span>{{ accInfo.balance }} NFC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <div class="content-container list-container">
      <div class="content-wrapper">
        <slot name="ie_context_top"></slot>
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              :class="isActivity == 0 ? 'is_activity' : ''"
              @click="updShowList(0)"
              >{{ $t("home.tran") }}</span
            >
            <span
              :class="isActivity == 1 ? 'is_activity' : ''"
              @click="updShowList(1)"
              >{{ $t("accounts.balanceHistory") }}</span
            >
            <!-- <span :class=" isActivity == 2?'is_activity':''" @click="isActivity = 2"></span> -->
          </div>
          <div v-show="isActivity == 0" class="right-wrapper">
            <el-select
              v-model="tranType"
              :placeholder="$t('comm.selected')"
              size="medium"
              @change="getTranList(page)"
            >
              <el-option
                v-for="item in tranTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
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
                <div class="img" >
                  <img src="/static/images/default.png" />
                </div>
                <div class="item tran-addr">
                  <div>
                    <!--<span class="tran-title">{{ $t('home.tran') }} #  </span>--><span
                      class="cursor equal-width"
                      @click="goToUrl('txnsinfo', item.tranAddr)"
                      >{{ item.tranAddr }}</span
                    >
                  </div>
                  <div>
                    <!-- <span class="tran-title">{{ $t('home.from') }}</span> -->
                    <span
                      class="cursor"
                      @click="goToUrl('Accountsinfo', item.from)"
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
                      @click="goToUrl('Accountsinfo', item.to)"
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
                  <div
                    class="cursor forcibly-blue"
                    @click="goToUrl('Blockinfo', item.block)"
                  >
                    {{ item.block }}
                  </div>
                  <div>
                    <span class="status">{{ $t("comm.success") }}</span
                    ><span>
                      {{ formatTime(item.time) }}{{ $t("comm.before") }}</span
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
                  {{ $t("comm.success") }}
                </div>
              </div>
              <div class="item-content">
                <div>
                  <!--<span class="tran-title">{{ $t('home.tran') }} #  </span>--><span
                    class="cursor equal-width"
                    @click="goToUrl('txnsinfo', item.tranAddr)"
                    >{{ getAddrFormat(item.tranAddr, 12) }}</span
                  >
                </div>
                <div>
                  <!-- <span class="tran-title">{{ $t('home.from') }}</span> -->
                  <span
                    class="cursor equal-width"
                    @click="goToUrl('Accountsinfo', item.from)"
                    >{{ getAddrFormat(item.from, 5) }}</span
                  >
                  <img src="/static/images/to.png" alt="" />
                  <!-- <span class="tran-title">{{ $t('home.to') }}</span> -->
                  <span
                    class="cursor equal-width"
                    @click="goToUrl('Accountsinfo', item.to)"
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
          <div class="display-pc-and-pad">
            <div class="bottom-wrapper">
              <div class="left-wrapper">
                <div v-if="isActivity != 1">
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
              <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getTranList(currPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
              </div>
            </div>
          </div>
          <div
            class="load-more display-phone"
            @click="getTranList(page + 1, 1)"
          >
            {{ $t("comm.clickLoad") }}
          </div>
        </div>
        <div v-show="isActivity == 1" class="balance-history">
          <div class="left-wrapper">
            <div class="title">
              {{ $t("accounts.trendChart") }}
            </div>
            <div class="echart">
              <div
                id="trendChart"
                :style="{ width: '300px', height: '250px', top: '20px' }"
              ></div>
            </div>
          </div>
          <div class="right-wrapper">
            <div class="title">
              {{ $t("accounts.waterDetails") }}
            </div>
            <div class="list-wrapper">
              <div
                v-for="(item, index) in tableData"
                :key="index"
                class="item-wrapper display-phone"
              >
                <div class="item-content">
                  <div>
                    <span
                      class="cursor"
                      @click="goToUrl('txnsinfo', item.tranAddr)"
                      >{{ item.block }}</span
                    ><span class="time"
                      >{{ formatTime(item.time) }}{{ $t("comm.before") }}</span
                    >
                  </div>
                  <div>
                    <span class="text-center">{{ $t("accounts.variety") }}</span
                    ><span>{{ item.amount }}</span>
                  </div>
                </div>
              </div>

              <el-table
                :data="tableData"
                stripe
                class="display-pc-and-pad"
                style="width: 100%"
              >
                <el-table-column :label="$t('home.block')" prop="block" />
                <el-table-column :label="$t('comm.time')">
                  <template slot-scope="scope">
                    {{ formatTime(scope.row.time) }}{{ $t("comm.before") }}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('accounts.variety')"
                  prop="amount"
                />
                <el-table-column
                  :label="$t('accounts.amount')"
                  prop="balance"
                />
              </el-table>
            </div>
            <div
              class="load-more display-phone"
              @click="getStreamList(streamPage + 1, 1)"
            >
              {{ $t("comm.clickLoad") }}
            </div>
          </div>
        </div>
        <div v-if="isActivity == 1" class="display-pc-and-pad">
          <div class="bottom-wrapper">
            <div class="left-wrapper"></div>
            <div class="page-wrapper">
              <span
                :class="streamPage > 1 ? 'cursor' : 'gray'"
                class="space"
                @click="getStreamList(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="streamPage > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="getStreamList(streamPage - 1)"
              >
                &lt;
              </span>
              <span class="forcibly-blue">{{ streamPage }}</span
              >/<span class="space forcibly-blue">{{ streamTotalPages }}</span>
              <span
                :class="streamPage == streamTotalPages ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="getStreamList(streamPage + 1)"
              >
                &gt;
              </span>
              <span
                :class="streamPage == streamTotalPages ? 'gray' : 'cursor'"
                @click="getStreamList(streamTotalPages)"
                >{{ $t("comm.lastPage") }}</span
              >
              <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
              <span><el-input class="input-page" v-model="currStreamPage" @keyup.enter.native="getStreamList(currStreamPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
            </div>
          </div>
        </div>

        <!-- <div v-if="isActivity == 2" class="list-wrapper">
          <div class="item-wrapper">
            <div class="content">
              <div class="item">
                <div>
                  <h2 class="cursor" @click="goToUrl('accountsinfo',item.block)">{{ item.block }}</h2>
                </div>
                <div class="time"> {{ formatTime(item.time) }}{{ $t('comm.before') }}</div>
              </div>
              <div class="item">
                <div>
                  {{ $t('home.blockTranNumber') }}
                </div>
                <div>
                  123
                </div>
              </div>
              <div class="item">
                <div>
                  {{ $t('home.verificationNode') }}
                </div>
                <div class="node">
                  Syncnode SRL (ox567e83)
                </div>
              </div>
              <div class="item">
                <div>
                  Gas Used
                </div>
                <div>
                  0.000001 ACL
                  <el-slider v-model="gasUsedRate" disabled />
                </div>
              </div>
              <div class="item">
                <div>
                  Gas Limit
                </div>
                <div>
                  9,990,236
                </div>
              </div>
              <div class="item">
                <div>
                  Gas Price
                </div>
                <div>
                  15.44Gwei
                </div>
              </div>
              <div class="item">
                <div>
                  {{ $t('home.blockReward') }}
                </div>
                <div>
                  2.0146 ACL
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <el-dialog
      :visible.sync="recodeDialogVisible"
      class="register-limit-dialog"
      width="240px"
    >
      <div slot="footer" class="dialog-footer">
        <div class="title">{{ $t("accounts.scanReCode") }}</div>
        <div ref="qrCodeUrl" class="qrcode"></div>
        <div class="acc-addr">{{ accAddr }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/api";
import echarts from "echarts";
import * as helper from "@/utils/helper";
import QRCode from "qrcodejs2";

export default {
  name: "Accountsinfo",
  props: {
    setId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      page: 1,
      prePage: 10,
      totalPages: 0,
      total: 0,
      streamPage: 1,
      streamPrePage: 3,
      streamTotalPages: 0,
      accAddr: "",
      accInfo: {},
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
      tranType: 0,

      tableData: [],
      gasUsedRate: 20,
      isActivity: 0, 
      tranList: [],
      timer: {},
      copyData: "",
      recodeDialogVisible: false,
      streamLoadText: this.$t("comm.clickLoad"),
      loadText: this.$t("comm.clickLoad"),
      currPage: 1,
      currStreamPage: 1,
    };
  },
  computed: {
    tranTypes() {
      return [
        {
          value: 0,
          label: this.$t("accounts.allTran"),
        },
        {
          value: 1,
          label: this.$t("accounts.outgoTran"),
        },
        {
          value: 2,
          label: this.$t("accounts.acceptedTran"),
        },
      ];
    },
  },

  created() {
    this.accAddr = this.setId || this.$route.params.id;

    this.getAccountsInfo();
  },
  mounted() {
    this.getTranList(this.page);

    this.creatQrCode(this.accAddr);
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
    updShowList(type) {
      this.isActivity = type;
      if (type === 1) {
        this.trendChart();
        this.getStreamList(this.streamPage);
      }
    },

    getDataFormat(data, pow = 18, decimal = 10000) {
      return helper.getDataFormat(data, pow, decimal);
    },

    formatTime(time) {
      return helper.formatTimimg(time);
    },

    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    getAccountsInfo() {
      var that = this;
      const param = {
        addressHash: that.accAddr,
      };

      api
        .postJson("/platform/getAddressInfoByAddressHash", param)
        .then((response) => {
          if (response.statusCode !== 0 || response.result == null) {
            // that.$message({
            //   type: 'error',
            //   message: response.message
            // })
            if (!this.setId) {
              helper.goPathUrl(that, "Search", that.accAddr);
            }
          } else {
            that.accInfo = response.result.records[0];
            that.accInfo.balance =
              that.accInfo.balance === null
                ? 0
                : that.accInfo.balance / 1000000000000000000;
          }
        })
        .catch((error) => {
          if (!this.setId) {
            helper.goPathUrl(that, "Search", that.accAddr);
          }
          this.$message.error(error.ErrMsg);
          // this.dialogVisible = true
          // console.error(error)
        });
    },

    getTranList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      var that = this;

      that.page = page;
      var param = {
        addressHash: that.accAddr,
        type: that.tranType,
        current: page,
        size: that.prePage,
      };
      api
        .postJson("/platform/getTransactionByAddressHash", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";
              that.tranList = [];
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
                status: that.$t("comm.success"),
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

    getStreamList(page, device = 0) {
      if (
        page < 1 ||
        (this.streamTotalPages > 0 && page > this.streamTotalPages)
      ) {
        this.streamLoadText = this.$t("comm.bottomLine");
        return;
      }

      var that = this;

      that.streamPage = page;
      var param = {
        addressHash: that.accAddr,
        current: page,
        size: that.streamPrePage,
      };
      api
        .postJson("/platform/selectForAddressDetail", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.streamLoadText = "";

              return;
            }
            var data = response.result.records;
            if (data.length < that.streamPrePage) {
              that.streamLoadText = this.$t("comm.bottomLine");
            }
            that.streamTotalPages = response.result.pages;
            const newData = [];
            var temp = {};
            var type = "";
            data.forEach((item) => {
              type = item.type === 1 ? "-" : "+";
              temp = {
                block: item.blockNumber,
                time: item.timeStamp,
                amount:
                  type +
                  helper.getDataFormat(item.amount, 18, 10000).toFixed(4),
                balance: helper
                  .getDataFormat(item.balance, 18, 10000)
                  .toFixed(4),
              };
              newData.push(temp);
              if (device === 1) {
                that.tableData.push(temp);
              }
            });

            if (that.tableData.length === 0 || device === 0) {
              that.tableData = newData;
            }
            that.timer2 = setInterval(() => {
              that.tableData.forEach((item) => {
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

    trendChart() {
      if (this.isActivity !== 1) {
        return;
      }

      var that = this;
      var params = {
        addressHash: that.accAddr,
      };

      api
        .post("/platform/getBlanceForAddressHash", params)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.res.msg,
            });
          } else {
            if (response.result === null) {
              return;
            }
            var data = response.result;
            var blocks = [];
            var date = [];
            data.forEach((item, index) => {
              // blocks.push(helper.getDataFormat(parseInt(item.balance)))
              // date.push(helper.formatTime(item.insertedAt / 1000, 'MM-dd'))
              blocks.push(
                helper.getDataFormat(item.balance, 18, 10000).toFixed(4)
              );
              date.push(item.blockNumber);
            });

            // const blocks = [10, 15, 12, 14, 23, 50]
            // const date = ['09-01', '09-05', '09-10', '09-15', '09-20', '09-25']

            const trendChart = echarts.init(
              document.getElementById("trendChart"),
              "light"
            );
            trendChart.resize();
            trendChart.setOption({
              // backgroundColor: '#212354',
              // legend: {
              //   textStyle: {
              //     fontSize: 14,
              //     color: '#ffffff'

              //   },
              //   x: 'left',
              //   left: 16,
              //   top: '5%',
              //   data: [{
              //     name:this.$t('accounts.balance') +  '(ACL)',
              //     icon: 'circle',
              //     itemWidth: 10,
              //     itemHeight: 10,
              //     textStyle: {
              //       color: '#ffffff'
              //     }
              //   }]
              // },
              grid: {
                left: "20%",
                bottom: "15%",
              },
              tooltip: {
                trigger: "axis",
                textStyle: {
                  align: "left",
                },
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: date,
                axisTick: {
                  show: false,
                  color: "#0a0d13",
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#C8CCD9",
                  },
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#4D5161",
                  },
                },
                // axisLabel: {
                //   show: true,
                //   interval: 60,
                //   rotate: 30,
                //   textStyle: {
                //     color: '#ffffff'
                //   }
                // }
              },
              yAxis: {
                type: "value",
                // splitLine: {
                //   lineStyle: {
                //     type: 'dashed',
                //     color: '#0a0d13'
                //   }
                // },

                splitLine: false,
                axisTick: {
                  show: false,
                  color: "#0a0d13",
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#C8CCD9",
                  },
                },
                // min: 0,
                splitNumber: 5,
                axisLabel: {
                  show: true,
                  formatter: function (params) {
                    if (params / 1000000000 > 1) {
                      params = Math.floor(params / 1000000000) + "G";
                    } else if (params / 1000000 > 1) {
                      params = Math.floor(params / 1000000) + "M";
                    } else if (params / 1000 > 1) {
                      params = Math.floor(params / 1000) + " K";
                    }
                    return params;
                  },
                  textStyle: {
                    color: "#4D5161",
                  },
                },
              },
              series: [
                {
                  data: blocks,
                  type: "line",
                  symbol: "none",
                  smooth: true,
                  // color: '#44d7b6',
                  color: "rgba(37,93,193,0)",
                  name: this.$t("accounts.balance") + "(NFC)",
                  areaStyle: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(105, 128, 183, 1)",
                        },
                        {
                          offset: 1,
                          color: "rgba(139, 189, 255, 0)",
                        },
                      ],
                    },
                  },
                },
              ],
            });
          }
        })
        .catch((error) => {
          // this.$message.error(error.ErrMsg)
          // this.dialogVisible = true
          console.error(error);
        });
    },
    handleCopy(data) {
      this.copy(data);
    },
    copy(data) {
      var that = this;
      const url = data;
      const oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message({
        message: that.$t("accounts.copySuccess"),
        type: "success",
      });
      oInput.remove();
    },
    creatQrCode(text) {
      new QRCode(this.$refs.qrCodeUrl, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
  },
  watch: {
    setId: {
      immediate: true,
      handler: function (newVal) {
        this.accAddr = newVal || this.$route.params.id;
        this.getAccountsInfo();
        this.getTranList(this.page);
      },
    },
  },
};
</script>

<style scoped>
.accountsinfo-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.accountsinfo-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  height: 3px;
}

.accountsinfo-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}

.accountsinfo-container
  .content-container
  .top-wrapper
  .right-wrapper
  .el-select
  /deep/
  .el-input__inner {
  background: rgba(249, 250, 252, 1);
  border: none;
  height: 34px;
}

.accountsinfo-container /deep/ .el-input--medium .el-input__icon {
  line-height: 40px;
}

.accountsinfo-container /deep/ .el-input--medium .el-input__inner {
  height: 22px;
  padding: 0;
  text-align: center;
  border-radius: 8px;
}
</style>
