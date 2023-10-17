<style scoped>
.con {
  margin-left: 100px;
  width: -webkit-calc(100% - 100px);
  width: -moz-calc(100% - 100px);
  width: calc(100% - 100px);
}

.posi {
  position: relative;
  left: 150px;
  bottom: -23px;
}
.backg {
  background: url(/static/images/blue_line.png) left no-repeat;
  background-size: 2px 20px;
}

.blocklist-container .content-container .search .search-title {
  position: relative;
  float: right;
  z-index: 99999;
  right: 5px;
  top: -30px;
  height: 30px;
  line-height: 30px;
  color: #ccc;
  width: 30px;
  background: url(/static/images/search_i.png) center no-repeat;
  background-size: 15px 15px;
  cursor: pointer;
}
</style>


<template>
  <div class="blocklist-container">
    <div class="content-container">
      <div class="block-container display-pc-and-pad">
        <div class="content-wrapper">
          <div class="top-wrapper" style="padding: 35px 30px 15px 30px">
            <div class="left-wrapper">
              <span>{{ $t("flowmining.flowmining") }}</span>
              <span>{{ $t("flowmining.currentlyflowmining", [total]) }}</span>
            </div>
            <div class="search display-pc-and-pad">
              <div>
                <el-input
                  style="
                    width: 414px;
                    height: 30px;
                    border-radius: 0;
                    text-align: left;
                    padding-left: 10px;
                    line-height: 30px;
                  "
                  v-model="searchInput"
                  :placeholder="$t('flowmining.minersearch')"
                  @keyup.enter.native="seachData()"
                />
              </div>
              <div class="search-title" @click="seachData()"></div>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span
                :class="page > 1 ? 'cursor' : 'gray'"
                class="space"
                @click="pageNfcCltList(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="page > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="pageNfcCltList(page - 1)"
                >&lt;</span
              >
              <span class="forcibly-blue">{{ page }}</span
              >/
              <span class="space forcibly-blue">{{ totalPages }}</span>
              <span
                :class="page == totalPages ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="pageNfcCltList(page + 1)"
                >&gt;</span
              >
              <span
                :class="page == totalPages ? 'gray' : 'cursor'"
                @click="pageNfcCltList(totalPages)"
                >{{ $t("comm.lastPage") }}</span
              >
            </div>
          </div>
          <div class="list-wrapper">
            <div
              v-for="(item, index) in blockList"
              :key="index"
              class="item-wrapper"
            >
              <div class="posi">
                <span
                  class="cursor equal-width"
                  style="color: rgb(74, 123, 211)"
                  @click="goToUrl('flowmiView', item)"
                  >{{ $t("flowmining.name", [item.en_address]) }}
                  {{ item.revenue_address }})</span
                >
              </div>
              <div class="item">
                <div>{{ $t("flowmining.flmining") }}</div>
              </div>
              <div class="backg" style="padding-left: 20px; width: 100px">
                <img src="/static/images/default.png" width="60px" />
              </div>

              <div
                class="content con"
                style="
                  padding-top: 0px;
                  margintop: -60px;
                  background: transparent;
                "
              >
                <div class="item" v-if="false">
                  <div>{{ $t("flowmining.trans_hash") }}</div>
                  <div>{{ item.trans_hash }}</div>
                </div>
                <div class="item">
                  <div>{{ $t("flowmining.bandwidth") }}</div>
                  <div>
                    {{ item.bandwidth }}
                    <span v-if="item.bandwidth">Mbps</span>
                  </div>
                </div>
                <div class="item">
                  <div>{{ $t("flowmining.report_time") }}</div>
                  <div>{{ item.report_time }}</div>
                </div>
                <div class="item">
                  <div>{{ $t("flowmining.flow_value") }}</div>
                  <div>
                    {{ item.flow_value }}
                  </div>
                </div>
                <div class="item">
                  <div>{{ $t("flowmining.fulnum") }}</div>
                  <div>
                    {{ clearZero(item.fulnum) }}
                    <span v-if="item.fulnum">FUL</span>
                  </div>
                </div>
                <div class="item">
                  <div>{{ $t("flowmining.profitamount") }}</div>
                  <div>
                    {{ item.profitamount }}
                    <span v-if="item.profitamount">NFC</span>
                  </div>
                </div>
                <div class="item">
                  <div>{{ $t("flowmining.instime") }}</div>
                  <div>{{ item.instime }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="bottom-wrapper">
            <div class="left-wrapper">
              <span>{{ $t('comm.show') }}</span>
              <span>
                <el-select
                  v-model="prePage"
                  :placeholder="$t('comm.selected')"
                  size="mini"
                  @change="pageNfcCltList(page)"
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
                @click="pageNfcCltList(1)"
              >{{ $t('comm.firstPage') }}</span>
              <span
                :class="page > 1 ? 'page-cursor' : 'gray' "
                class="space symbol"
                @click="pageNfcCltList(page-1)"
              >&lt;</span>
              <span class="forcibly-blue">{{ page }}</span>/
              <span class="space forcibly-blue">{{ totalPages }}</span>
              <span
                :class="page == totalPages ? 'gray' : 'page-cursor' "
                class="space symbol"
                @click="pageNfcCltList(page+1)"
              >&gt;</span>
              <span
                :class="page == totalPages ? 'gray' : 'cursor' "
                @click="pageNfcCltList(totalPages)"
              >{{ $t('comm.lastPage') }}</span>
             
            </div>
          </div>-->
        </div>
      </div>
      <!-- <div class="block-container display-phone" style="overflow:auto">
        <div class="block-swiper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t('flowmining.miner') }}</span>
              <span>{{ $t('flowmining.currentlyminer',[total]) }}</span>
            </div>
          </div>
          <div class="content-wrapper">
            <div v-for="(item, index) in blockList" :key="index" class="card-wrapper">
              <div class="item">
                <div class="content">
                  <div
                    class="block-height cursor"
                    @click="goToUrl('Blockinfo',item.block)"
                  >{{ item.block }}</div>
                  <div class="other">
                    <p>{{ $t('home.tranNumber',[item.transition]) }}</p>
                    <p>
                      {{ $t('home.verificationNode') }}
                      <span
                        class="node cursor"
                        @click="goToUrl('accountsinfo',item.validationAddress)"
                      >{{ item.validation }}({{ getAddrFormat(item.validationAddress,12) }})</span>
                    </p>
                    <p class="block-reward">
                      {{ $t('home.blockReward') }}
                      <span>{{ item.award }} {{ item.unit }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="load-more" @click="pageNfcCltList(page+1,1)">{{ $t('comm.clickLoad') }}</div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
export default {
  name: "Mining",
  data() {
    return {
      page: 1,
      prePage: 10,
      totalPages: 0,
      total: 0,
      searchInput: null,
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
      blockList: [],
      timer: {},
      loadText: this.$t("comm.clickLoad"),
      currPage: 1,
    };
  },
  computed: {
    disabled() {
      return !(this.blockList.length < 20);
    },
  },
  created() {
    // let width = document.documentElement.clientWidth
    // this.$parent.$parent.showheader(false)
    // this.$parent.$parent.showfooter(false)
  },
  mounted() {
    this.pageNfcCltList(this.page);
  },
  destroyed() {
    this.$parent.$parent.showfooter(true);
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    clearZero(val, num = 4) {
      return utils.clearZero(val, num);
    },
    formatTime(time) {
      return helper.formatTimimg(time);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    goToUrl(name, item) {
      helper.goPathUrl(this, name, item.en_address + "_" + item.report_time);
    },

    seachData() {
      this.blockList = [];
      this.pageNfcCltList(1);
    },
 
    pageNfcCltList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      this.broadcastData = [];
      var that = this;
      that.page = page;

      var param = {
        current: page,
        size: that.prePage,
        //  revenue_address: that.searchInput,
        miner_addr: that.searchInput,
      };

      api
        .postJson("/platform/flow/pageNfcCltList", param)
        .then((response) => {
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
            // data = data.reverse()
            that.total = response.result.total;
            that.totalPages = response.result.pages;
            const newData = [];
            let temp = {};
            data.forEach((item) => {
              temp = {
                trans_hash: item.trans_hash,
                bandwidth: item.bandwidth,
                report_time: item.report_time,
                flow_value: utils.getSuffix(item.flow_value, "iB"),
                fulnum: utils.clearZero(item.fulnum, 4),
                profitamount: utils.clearZero(item.profitamount),
                instime: item.instime,
                en_address: item.en_address,
                revenue_address: item.revenue_address,
              };
              newData.push(temp);

              if (device === 1 && that.blockList.length > 0) {
                that.blockList.push(temp);
              }
            });

            if (that.blockList.length === 0 || device === 0) {
              that.blockList = newData;
            }

            that.timer = setInterval(() => {
              that.blockList.forEach((item) => {
                item.time++;
              });
            }, 1000);
          }
        })
        .catch((error) => {
          // this.$message.error(error.ErrMsg)
          // this.dialogVisible = true
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.ie_img {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.blocklist-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.blocklist-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  height: 3px;
}

.blocklist-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}

/* .blocklist-container /deep/ .el-input--medium .el-input__inner {
  height: 22px;
  padding: 0;
  text-align: center;
  border-radius: 8px;
} */

.blocklist-container /deep/ .el-button--text {
  color: #4a7bd3;
}

.blocklist-container /deep/ .el-input--medium .el-input__inner {
  height: 30px;

  text-align: left;
  border-radius: 0px;
}
</style>
