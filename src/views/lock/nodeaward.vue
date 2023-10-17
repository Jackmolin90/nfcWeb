<template>
  <div class="accounts-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t("lock.nodeawardFreed") }}</span>
              <span>{{ $t("lock.currentReleaseNumber", [total]) }}</span>
            </div>
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
                @click="getFlowlockList(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="page > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="getFlowlockList(page - 1)"
              >
                &lt;
              </span>
              <span class="forcibly-blue">{{ page }}</span
              >/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span
                :class="page == totalPages ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="getFlowlockList(page + 1)"
              >
                &gt;
              </span>
              <span
                :class="page == totalPages ? 'gray' : 'cursor'"
                @click="getFlowlockList(totalPages)"
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
                  width="80"
                  :index="
                    (index) => {
                      return index + 1 + (this.page - 1) * this.prePage;
                    }
                  "
                />
                <el-table-column
                  :label="$t('lock.minerAddress')"
                  prop="address"
                  show-overflow-tooltip
                  minWidth="160"
                >
                  <template slot-scope="scope">
                    <span
                      style="color: #4a7bd3; cursor: pointer"
                      @click="toviews(scope.row)"
                    >
                      {{ getAddrFormat(scope.row.address, 15) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('lock.blockNumber')"
                  prop="blockNumber"
                  minWidth="100"
                >
                  <template slot-scope="scope">
                   
                      {{ scope.row.blockNumber }}
                   
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('lock.totalAmount')"
                  prop="totalAmount"
                  minWidth="100"
                />
                <el-table-column
                  :label="$t('lock.leftAmount')"
                  prop="leftAmount"
                  minWidth="140"
                />
                <el-table-column
                  :label="$t('lock.lockNumber')"
                  prop="lockNumber"
                  minWidth="140"
                >
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.lockingTime }} {{ $t("lock.day") }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="false"
                  :label="$t('lock.state')"
                  prop="state"
                  minWidth="80"
                >
                  <template slot-scope="scope">
                    {{ $t(scope.row.state) }}
                  </template>
                  <!-- <template slot-scope="scope">
                    <span v-if="scope.row.nstatus == 1">{{
                      $t("lock.state11")
                    }}</span>
                    <span v-else-if="scope.row.nstatus == 2">{{
                      $t("lock.state12")
                    }}</span>
                    <span v-else-if="scope.row.nstatus == 3">{{
                      $t("lock.state13")
                    }}</span>
                  </template>-->
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
                  <div>{{ index + 1 }}</div>
                  <div class="equal-width">
                    {{ getAddrFormat(item.address, 12) }}
                  </div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t("lock.totalAmount") }}</span>
                    <span>{{ item.totalAmount }}</span>
                  </div>
                  <div>
                    <span>{{ $t("lock.blockNumber") }}</span>
                    <span>{{ item.blockNumber }}</span>
                  </div>
                  <div>
                    <span>{{ $t("lock.leftAmount") }}</span>
                    <span>{{ item.leftAmount }}</span>
                  </div>
                  <div>
                    <span>{{ $t("lock.lockNumber") }}</span>
                    <span>{{ item.lockingTime }} {{ $t("lock.day") }}</span>
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
                    @change="getFlowlockList(page)"
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
                  @click="getFlowlockList(1)"
                  >{{ $t("comm.firstPage") }}</span
                >
                <span
                  :class="page > 1 ? 'page-cursor' : 'gray'"
                  class="space symbol"
                  @click="getFlowlockList(page - 1)"
                >
                  &lt;
                </span>
                <span class="forcibly-blue">{{ page }}</span
                >/<span class="space forcibly-blue">{{ totalPages }}</span>
                <span
                  :class="page == totalPages ? 'gray' : 'page-cursor'"
                  class="space symbol"
                  @click="getFlowlockList(page + 1)"
                >
                  &gt;
                </span>
                <span
                  :class="page == totalPages ? 'gray' : 'cursor'"
                  @click="getFlowlockList(totalPages)"
                  >{{ $t("comm.lastPage") }}</span
                >
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
import utils from "@/utils/utils";
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
    let that = this;
    this.getFlowlockList(1);
    // this.getTotalUnlocked()
    /* setTimeout(function () {
      that.getFlowlockList(1);
    }, 60000);*/
  },
  mounted() {},
  methods: {
    toviews(data) {
      if (data.address) {
        helper.goPathUrl(this, "nodeView", data.address);
      }
    },
    toRelease(data) {
      if (data.address && data.type) {
        helper.goPathUrl(
          this,
          "releaseList",
          `${data.address}_${data.type + 1}_${data.blockNumber}_${
            data.revenue_address
          }`
        );
      }
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      //   if (row.column.label === this.$t('accounts.addr')) {
      //     // return 'color:rgba(64, 112, 244, 1)'
      //   }
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    goToUrl(contract) {
      //helper.goPathUrl(this, 'Accountsinfo', contract)
    },
    seachData() {
      this.tableData = [];
      this.getFlowlockList(1);
    },

    async getFlowlockList(page, device = 0) {
      /* let revenue_address= this.$store.getters.account;
      if(!revenue_address){
        return ;
      }*/

      await utils.getNowHeight();
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      var that = this;

      that.page = page;
      var param = {
        current: page,
        size: that.prePage,
        address: that.searchInput,
        type: 1,
        //revenue_address
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

            data.forEach((item, index) => {
              let pledge_amount = utils.clearZero(item.pledge_amount);
             // let totalAmount = utils.clearZero(item.totalAmount);
              
              let state =
                item.totalAmount >= item.releaseamount ? "lock.stateOk" : "lock.Waiting";

              let temp = {
                order: index + 1 + parseInt(rand),
                type: item.type,
                address: item.address,
                revenue_address: item.revenue_address,
                ntype: item.ntype,
                blockNumber: item.blockNumber,
                pledge_amount: pledge_amount + " NFC",
                totalAmount: `${utils.clearZero(
                  (item.totalAmount || 0) - (item.releaseamount || 0))} NFC`,
                state,
                //  leftAmount: helper.getDataFormat(item.leftAmount,18,10000).toFixed(4) + ' NFC',
                lockNumber: item.lockNumber,
                leftAmount: `${utils.clearZero(item.releaseamount)} NFC`,
                lockingTime: utils.lockingTime(
                  item.startTime,
                  item.avgBlockTime,
                  item.unLockNumber,
                  item.releaseHeigth
                ),
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
  /*watch:{
    "$store.getters.account":function(){
        this.getFlowlockList(1)
    }
  }*/
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
