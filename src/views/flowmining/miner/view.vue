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
              <span>{{ $t("flowmining.flowmining") }}</span>
              <span></span>
            </div>
            <div>
              <div>
                <el-date-picker
                  style="width: 414px"
                  v-model="valueTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :placeholder="$t('flowmining.minerSearch')"
                  @change="seachData()"
                ></el-date-picker>
              </div>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span
                :class="page > 1 ? 'cursor' : 'gray'"
                class="space"
                @click="getMinerDayStatislist(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="page > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="getMinerDayStatislist(page - 1)"
                >&lt;</span
              >
              <span class="forcibly-blue">{{ page }}</span
              >/
              <span class="space forcibly-blue">{{ totalPages }}</span>
              <span
                :class="page == totalPages ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="getMinerDayStatislist(page + 1)"
                >&gt;</span
              >
              <span
                :class="page == totalPages ? 'gray' : 'cursor'"
                @click="getMinerDayStatislist(totalPages)"
                >{{ $t("comm.lastPage") }}</span
              >
            </div>
          </div>
          <div class="list-wrapper">
            <div class="display-pc-and-pad">
              <el-table
                :data="tableData"
                :cell-style="cellStyle"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  :label="$t('ftable.order')"
                  type="index"
                  width="60"
                  :index="
                    (index) => {
                      return index + 1 + (this.page - 1) * this.prePage;
                    }
                  "
                />
                <el-table-column
                  :label="$t('flowmining.Minersaddress')"
                  prop="minerAddr"
                   min-width="140px"
                   show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span
                      slot=""
                      class="cursor equal-width"
                      style="color: rgb(74, 123, 211)"
                      @click="goToUrl('flowmiView', scope.row)"
                    >
                      {{ scope.row.minerAddr }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                 min-width="140px"
                  :label="$t('flowmining.bandwidthmbps')"
                  prop="bandwidth"
                />
                <el-table-column  min-width="100px" :label="$t('flowmining.time')" prop="time" />
                <el-table-column
                  :label="$t('flowmining.miningflow')"
                  prop="minerflow"
                   min-width="100px"
                />
                <el-table-column
                  :label="$t('flowmining.consumeful')"
                  prop="fulnum"
                   min-width="120px"
               
                />
                <el-table-column
                  :label="$t('flowmining.revenueaddress')"
                  prop="revenue_address"
                   min-width="140px"
                   show-overflow-tooltip
                />
                <el-table-column
                  :label="$t('flowmining.profitamount') + '(NFC)'"
                  prop="profitamount"
                  min-width="155px"
                />
                <el-table-column
                  v-if="false"
                  :label="$t('flowmining.Lastminingtime')"
                  prop="ctime"
                  width="140"
                />
              </el-table>
            </div>
            <!-- <div class="display-phone">
              <div class="phone-search">
                <div>
                  <el-input
                    v-model="searchInput"
                    :placeholder="$t('lock.lockSearch')"
                    @keyup.enter.native="seachData()"
                  />
                </div>
                <div class="search-title" @click="seachData()"></div>
              </div>
              <div v-for="(item, index) in tableData" :key="index" class="item-wrapper">
                <div class="addr">
                  <div>{{ index }}</div>
                  <div class="equal-width">{{ getAddrFormat(item.address,12) }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('lock.totalAmount') }}</span>
                    <span>{{ item.totalAmount }}</span>
                  </div>
                  <div>
                    <span>{{ $t('lock.leftAmount') }}</span>
                    <span>{{ item.leftAmount }}</span>
                  </div>
                  <div>
                    <span>{{ $t('lock.lockNumber') }}</span>
                    <span>{{ item.lockNumber }} {{ $t('lock.day') }}</span>
                  </div>
                </div>
              </div>
            </div>-->
          </div>
          <!-- <div class="display-pc-and-pad">
            <div class="bottom-wrapper">
              <div class="left-wrapper">
                <span>{{ $t('comm.show') }}</span>
                <span>
                  <el-select
                    v-model="prePage"
                    :placeholder="$t('comm.selected')"
                    size="mini"
                    @change="getMinerDayStatislist(page)"
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
                  @click="getMinerDayStatislist(1)"
                >{{ $t('comm.firstPage') }}</span>
                <span
                  :class="page > 1 ? 'page-cursor' : 'gray' "
                  class="space symbol"
                  @click="getMinerDayStatislist(page-1)"
                >&lt;</span>
                <span class="forcibly-blue">{{ page }}</span>/
                <span class="space forcibly-blue">{{ totalPages }}</span>
                <span
                  :class="page == totalPages ? 'gray' : 'page-cursor' "
                  class="space symbol"
                  @click="getMinerDayStatislist(page+1)"
                >&gt;</span>
                <span
                  :class="page == totalPages ? 'gray' : 'cursor' "
                  @click="getMinerDayStatislist(totalPages)"
                >{{ $t('comm.lastPage') }}</span>
              </div>
            </div>
          </div>-->
          <div
            class="load-more display-phone"
            @click="getMinerDayStatislist(page + 1, 1)"
          >
            {{ loadText }}
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
export default {
  name: "MinerView",
  data() {
    return {
      page: 1,
      prePage: 15,
      totalPages: 0,
      total: 0,
      minerAddr: "",
      searchInput: null,
      valueTime: "",
      // showNumbers: [
      //   {
      //     value: 15,
      //     label: "15"
      //   },
      //   {
      //     value: 20,
      //     label: "20"
      //   },
      //   {
      //     value: 50,
      //     label: "50"
      //   },
      //   {
      //     value: 100,
      //     label: "100"
      //   }
      // ],
      tableData: [],
      gasUsedRate: 20,
      loadText: this.$t("comm.clickLoad"),
      currPage: 1,
      totalUnlocked: 0,
    };
  },
  created() {
    this.minerAddr = this.$route.params.id || "";
    let that = this;
    this.getMinerDayStatislist(1);
    // this.getTotalUnlocked()
    setTimeout(function () {
      that.getMinerDayStatislist(1);
    }, 60000);
  },
  mounted() {},
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      //   if (row.column.label === this.$t('accounts.addr')) {
      //     // return 'color:rgba(64, 112, 244, 1)'
      //   }
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    goToUrl(name, item) {
      helper.goPathUrl(this, name, item.minerAddr + "_" + item.time);
    },
    seachData() {
      this.tableData = [];
      this.getMinerDayStatislist(1);
    },
    

    getMinerDayStatislist(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      var that = this;

      that.page = page;
      var param = {
        current: page,
        size: that.prePage,
        time: that.valueTime,
        timeEqual: true,
        miner_addr: that.minerAddr,
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
            that.totalPages = response.result.pages;
            that.total = response.result.total;
            const newData = [];
            const rand = (that.page - 1) * that.prePage;
            var temp = {};
            data.forEach((item, index) => {
              //  let minerflow=item.minerflow||0
              //  minerflow=minerflow>=1024?utils.weedZero((minerflow/1024),4)+' GB':minerflow+' MB'

              temp = {
                order: index + 1 + parseInt(rand),
                minerAddr: item.en_address,
                bandwidth: item.bandwidth,
                time: item.report_time,
                fulnum: utils.clearZero(item.fulnum, 4),
                revenue_address: item.revenue_address,
                minerflow: utils.getSuffix(item.flow_value, "iB"),
                ctime: item.ctime,
                profitamount: utils.clearZero(item.profitamount),
              };

              newData.push(temp);
              if (device === 1) {
                that.tableData.push(temp);
              }
            });
            if (that.tableData.length === 0 || device === 0) {
              that.tableData = newData;
            }
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
