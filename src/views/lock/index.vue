<template>
  <div class="accounts-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t("lock.lock") }}</span>
              <span>{{ $t("lock.currentReleaseNumber", [total]) }}</span>
            </div>
            <!-- <div class="unLock">{{ $t('lock.unLockedNumber',[totalUnlocked]) }}</div> -->
            <div class="search display-pc-and-pad">
              <div>
                <el-input
                  v-model="searchInput"
                  :placeholder="$t('lock.lockSearch')"
                  @keyup.enter.native="seachData(1)"
                />
              </div>
              <div class="search-title" @click="seachData(1)"></div>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span
                :class="page > 1 ? 'cursor' : 'gray'"
                class="space"
                @click="getAddrList(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="page > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="getAddrList(page - 1)"
              >
                &lt;
              </span>
              <span class="forcibly-blue">{{ page }}</span
              >/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span
                :class="page == totalPages ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="getAddrList(page + 1)"
              >
                &gt;
              </span>
              <span
                :class="page == totalPages ? 'gray' : 'cursor'"
                @click="getAddrList(totalPages)"
                >{{ $t("comm.lastPage") }}</span
              >
              <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
              <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
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
                  :label="$t('lock.order')"
                  prop="order"
                  width="150"
                />
                <el-table-column
                  :label="$t('lock.type')"
                  prop="type"
                  width="10"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.type === 5">{{
                      $t("lock.flowLock")
                    }}</span>
                    <span v-else-if="scope.row.type === 1">{{
                      $t("lock.teamLock")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('lock.address')" width="400">
                  <template slot-scope="scope">
                    <span style="color: #4a7bd3">
                      {{ scope.row.address }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('lock.totalAmount')"
                  prop="totalAmount"
                  width="200"
                />
                <el-table-column
                  :label="$t('lock.leftAmount')"
                  prop="leftAmount"
                  width="200"
                />
                <el-table-column
                  :label="$t('lock.lockNumber')"
                  prop="lockNumber"
                  width="140"
                >
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.lockNumber }} {{ $t("lock.day") }}</span
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
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
              <div
                v-for="(item, index) in tableData"
                :key="index"
                class="item-wrapper"
              >
                <div class="addr">
                  <div>{{ item.order }}</div>
                  <div class="equal-width">
                    {{ getAddrFormat(item.address, 12) }}
                  </div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t("lock.type") }}</span>
                    <span v-if="item.type === 5">{{
                      $t("lock.flowLock")
                    }}</span>
                    <span v-else-if="item.type === 1">{{
                      $t("lock.teamLock")
                    }}</span>
                  </div>
                  <div>
                    <span>{{ $t("lock.totalAmount") }}</span>
                    <span>{{ item.totalAmount }}</span>
                  </div>
                  <div>
                    <span>{{ $t("lock.leftAmount") }}</span>
                    <span>{{ item.leftAmount }}</span>
                  </div>
                  <div>
                    <span>{{ $t("lock.lockNumber") }}</span>
                    <span>{{ item.lockNumber }} {{ $t("lock.day") }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="display-pc-and-pad">
            <div class="bottom-wrapper">
              <div class="left-wrapper">
                <span>{{ $t("comm.show") }}</span>
                <span>
                  <el-select
                    v-model="prePage"
                    :placeholder="$t('comm.selected')"
                    size="mini"
                    @change="getAddrList(page)"
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
                  @click="getAddrList(1)"
                  >{{ $t("comm.firstPage") }}</span
                >
                <span
                  :class="page > 1 ? 'page-cursor' : 'gray'"
                  class="space symbol"
                  @click="getAddrList(page - 1)"
                >
                  &lt;
                </span>
                <span class="forcibly-blue">{{ page }}</span
                >/<span class="space forcibly-blue">{{ totalPages }}</span>
                <span
                  :class="page == totalPages ? 'gray' : 'page-cursor'"
                  class="space symbol"
                  @click="getAddrList(page + 1)"
                >
                  &gt;
                </span>
                <span
                  :class="page == totalPages ? 'gray' : 'cursor'"
                  @click="getAddrList(totalPages)"
                  >{{ $t("comm.lastPage") }}</span
                >
                <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
                <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
                <span>{{ $t("comm.page")}}</span> -->
              </div>
            </div>
          </div>
          <div
            class="load-more display-phone"
            @click="getAddrList(page + 1, 1)"
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

export default {
  name: "Accounts",
  data() {
    return {
      page: 1,
      prePage: 15,
      totalPages: 0,
      total: 0,
      searchInput: null,
      showNumbers: [
        {
          value: 15,
          label: "15",
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
      tableData: [],
      gasUsedRate: 20,
      loadText: this.$t("comm.clickLoad"),
      currPage: 1,
      totalUnlocked: 0,
    };
  },
  created() {
    this.searchInput = this.$route.params.id || "";

    // let width = document.documentElement.clientWidth
    // this.$parent.showheader(false)
    // this.$parent.showfooter(false)
    let that = this;
    this.getAddrList(1);
    // this.getTotalUnlocked()
    setTimeout(function () {
      that.getAddrList(1);
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

    goToUrl(contract) {
      helper.goPathUrl(this, "Accountsinfo", contract);
    },
    seachData() {
      this.tableData = [];
      this.getAddrList(1);
      /*
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return
      }

      var that = this

      that.page = page
      var param = {
        current: that.page,
        size: 10000,
        address : that.searchInput
      }

      api.postJson('/platform/lockNfcMinerSerach', param).then(response => {
        if (response.statusCode !== 0) {
          that.$message({
            type: 'error',
            message: response.message
          })
        } else {
          if (response.result === null || response.result.total === 0) {
            that.loadText = ''
           
            return
          }
          var data = response.result.records
          if (data.length < that.prePage) {
            that.loadText = this.$t('comm.bottomLine')
          }
          that.totalPages = response.result.pages
          that.total = response.result.total
          const newData = []
          const rand = (that.page - 1) * that.prePage
          var temp = {}
          data.forEach((item, index) => {
            temp = {
              order: index + 1 + rand,
              type: item.type,
              address: item.address,
              totalAmount: helper.getDataFormat(item.totalAmount,18,10000).toFixed(4) + ' NFC',
              leftAmount: helper.getDataFormat(item.leftAmount,18,10000).toFixed(4) + ' NFC',
              lockNumber: Math.ceil(item.lockNumber / (24*60*60/10) - (new Date().getTime() - item.startTime)/(24*60*60*1000))
            }
            newData.push(temp)
            if (device === 1) {
              that.tableData.push(temp)
            }
          })
          if (that.tableData.length === 0 || device === 0) {
            that.tableData = newData
          }
        }
      }).catch((error) => {
        // this.$message.error(error.message)
        // this.dialogVisible = true
        console.error(error)
      })
      */
    },

    lockingNumber(
      startTime,
      value,
      dayNumberThree,
      dayNumberSix,
      yearNumberOne,
      yearNumberSix,
      type,
      avgBlockTime
    ) {
      if (type === 1) {
        let lockTime =
          Math.floor(
            (new Date().getTime() - startTime) / (avgBlockTime * 1000)
          ) - yearNumberOne;

        if (lockTime > (24 * 60 * 60) / avgBlockTime) {
          let lockNumber = (lockTime * value) / yearNumberSix;
          if (lockNumber < value) {
            // return helper.getDataFormat((Math.ceil(lockTime/(24*60*60/avgBlockTime)) * value / Math.ceil(yearNumberSix/(24*60*60/avgBlockTime))),18,10000).toFixed(4) + ' NFC'

            return (
              (helper.getDataFormat(value, 18, 10000) *
                Math.floor(lockTime / ((24 * 60 * 60) / avgBlockTime))) /
              Math.floor(yearNumberSix / ((24 * 60 * 60) / avgBlockTime))
            ).toFixed(4); 
            // return (helper.getDataFormat(value,18,10000) * Math.ceil(lockTime/3) / Math.ceil(yearNumberSix/3)).toFixed(4) + ' NFC' //测试
          } else {
            return helper.getDataFormat(value, 18, 10000).toFixed(4);
          }
        } else {
          return 0;
        }
      } else if (type === 5) {
        let lockTime =
          Math.floor(
            (new Date().getTime() - startTime) / (avgBlockTime * 1000)
          ) - dayNumberThree;

        if (lockTime > (24 * 60 * 60) / avgBlockTime) {
          let lockNumber = (lockTime * value) / dayNumberSix;
          // console.log(lockNumber)
          // console.log(value)
          if (lockNumber < value) {
            return (
              (helper.getDataFormat(value, 18, 10000) *
                Math.floor(lockTime / ((24 * 60 * 60) / avgBlockTime))) /
              Math.floor(dayNumberSix / ((24 * 60 * 60) / avgBlockTime))
            ).toFixed(4); 
            // return (helper.getDataFormat(value,18,10000) * Math.ceil(lockTime/3) / Math.ceil(dayNumberSix/3)).toFixed(4) + ' NFC' //测试
          } else {
            return helper.getDataFormat(value, 18, 10000).toFixed(4);
          }
        } else {
          return 0;
        }
      }
    },
    lockingNumber1(startTime, value, type) {
      if (type === 1) {
        let lockTime =
          Math.floor((new Date().getTime() - startTime) / (20 * 1000)) -
          1576800;
        if (lockTime > (24 * 60 * 60) / 20) {
          let lockNumber = (lockTime * value) / 9460800;
          if (lockNumber < value) {
            return (
              (helper.getDataFormat(value, 18, 10000) *
                Math.floor(lockTime / ((24 * 60 * 60) / 20))) /
              Math.floor(9460800 / ((24 * 60 * 60) / 20))
            ).toFixed(4); //线上
          } else {
            return helper.getDataFormat(value, 18, 10000).toFixed(4);
          }
        } else {
          return 0;
        }
      } else if (type === 5) {
        let lockTime =
          Math.floor((new Date().getTime() - startTime) / (20 * 1000)) - 129600;
        if (lockTime > (24 * 60 * 60) / 20) {
          let lockNumber = (lockTime * value) / 777600;
          if (lockNumber < value) {
            return (
              (helper.getDataFormat(value, 18, 10000) *
                Math.floor(lockTime / ((24 * 60 * 60) / 20))) /
              Math.floor(777600 / ((24 * 60 * 60) / 20))
            ).toFixed(4); 
          } else {
            return helper.getDataFormat(value, 18, 10000).toFixed(4);
          }
        } else {
          return 0;
        }
      }
    },
    lockingTime(
      type,
      dayNumberThree,
      dayNumberSix,
      yearNumberOne,
      yearNumberSix,
      startTime,
      avgBlockTime
    ) {
      if (type === 1) {
        let dayNumber = Math.floor(
          (yearNumberOne + yearNumberSix) / ((24 * 60 * 60) / avgBlockTime) -
            Math.floor(
              (new Date().getTime() - startTime) / (24 * 60 * 60 * 1000)
            )
        ); 
        // let dayNumber = Math.ceil((yearNumberOne + yearNumberSix) / 3 - (new Date().getTime() - startTime)/(24*60*60*1000))//测试
        if (dayNumber > 0) {
          return dayNumber;
        } else {
          return 0;
        }
      } else if (type === 5) {
        // let dayNumber = Math.ceil((dayNumberThree + dayNumberSix) / 3 - (new Date().getTime() - startTime)/(24*60*60*1000)) //测试
        let dayNumber = Math.floor(
          (dayNumberThree + dayNumberSix) / ((24 * 60 * 60) / avgBlockTime) -
            Math.floor(
              (new Date().getTime() - startTime) / (24 * 60 * 60 * 1000)
            )
        ); 
        if (dayNumber > 0) {
          return dayNumber;
        } else {
          return 0;
        }
      }
    },
    getTotalUnlocked() {
      var that = this;
      var param = {
        address: "",
      };
      api
        .postJson("/platform/lockNfcMinerInfoForTotal", param)
        .then((response) => {
          var data = response.result.records;
          data.forEach((item, index) => {
            // this.totalUnlocked += parseFloat(that.lockingNumber(item.startTime,item.value,item.dayNumberThree,item.dayNumberSix,item.yearNumberOne,item.yearNumberSix,item.type,item.avgBlockTime))

            this.totalUnlocked += parseFloat(
              that.lockingNumber1(item.startTime, item.value, item.type)
            );
          });
          this.totalUnlocked = this.totalUnlocked.toFixed(4);
        })
        .catch((error) => {
          // this.$message.error(error.message)
          // this.dialogVisible = true
          console.error(error);
        });
    },
    getAddrList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      var that = this;

      that.page = page;
      var param = {
        current: page,
        size: that.prePage,
        address: that.searchInput,
      };

      api
        .postJson("/platform/lockNfcMinerInfo", param)
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
              temp = {
                order: index + 1 + parseInt(rand),
                type: item.type,
                address: item.address,
                totalAmount:
                  helper.getDataFormat(item.value, 18, 10000).toFixed(4) +
                  " NFC",
                // leftAmount: helper.getDataFormat(item.leftAmount,18,10000).toFixed(4) + ' NFC',
                // leftAmount: that.lockingNumber(item.startTime,item.value,item.dayNumberThree,item.dayNumberSix,item.yearNumberOne,item.yearNumberSix,item.type,item.avgBlockTime),
                leftAmount:
                  that.lockingNumber(
                    item.startTime,
                    item.value,
                    item.dayNumberThree,
                    item.dayNumberSix,
                    item.yearNumberOne,
                    item.yearNumberSix,
                    item.type,
                    item.avgBlockTime
                  ) + " NFC",
                lockNumber: that.lockingTime(
                  item.type,
                  item.dayNumberThree,
                  item.dayNumberSix,
                  item.yearNumberOne,
                  item.yearNumberSix,
                  item.startTime,
                  item.avgBlockTime
                ),
                // lockNumber: that.lockingTime(item.type,item.dayNumberThree,item.dayNumberSix,item.yearNumberOne,item.yearNumberSix,item.startTime,28800)
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
  height: 22px;
  padding: 0;
  text-align: center;
  border-radius: 8px;
}
</style>
