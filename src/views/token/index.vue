<template>
  <div class="accountsinfo-container">
    <div class="top-container"></div>
    <div
      class="content-container list-container token"
      style="margin-top: -170px"
    >
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              :class="isActivity == 0 ? 'is_activity' : ''"
              @click="updShowList(0)"
              >{{ "NRC20 " }}{{ $t("api.tokens") }}</span
            >
            <span
              v-if="false"
              :class="isActivity == 1 ? 'is_activity' : ''"
              @click="updShowList(1)"
              >NRC1155{{ $t("api.tokens") }}</span
            >
            <!-- <span :class=" isActivity == 2?'is_activity':''" @click="isActivity = 2">验证区块</span> -->
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{
                $t("token.currentTokenNumber", [total])
              }}</span>
            </div>
            <div class="page-wrapper display-pc-and-pad">
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
              <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
            </div>
          </div>
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="tranList" stripe style="width: 100%">
                <el-table-column :label="$t('ftable.order')" width="100">
                  <template slot-scope="scope">
                    <span style="color: #2d353b">{{ scope.row.ranking }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  :label="$t('api.contract')"
                  prop="contract"
                  min-width="160"
                >
                  <template slot-scope="scope">
                    <span
                      @click="goTheUrl(scope.row)"
                      style="color: rgb(74, 123, 211)"
                      class="equal-width cursor"
                      >{{ scope.row.contract }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column :label="$t('api.token')" min-width="160">
                  <template slot-scope="scope">
                    <span
                      @click="goTheUrl(scope.row)"
                      style="color: rgb(74, 123, 211)"
                      class="equal-width cursor"
                      >{{ scope.row.name }}</span
                    >
                    <span
                      @click="goTheUrl(scope.row)"
                      style="color: rgb(74, 123, 211)"
                      class="equal-width cursor"
                      >{{ scope.row.description }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('token.Abbreviation')"
                  min-width="160"
                >
                  <template slot-scope="scope">
                    <span style="color: #2d353b">{{ scope.row.symbol }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('token.totalNumber')"
                  prop="totalSupply"
                  width="200"
                />
                <el-table-column
                  :label="$t('token.holder')"
                  prop="type"
                  width="200"
                >
                  <template slot-scope="scope">
                    {{ scope.row.accountTotal }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div
                v-for="(item, index) in tranList"
                :key="index"
                class="item-wrapper"
              >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t("api.contract") }}</span>
                    <span> {{ item.contract }} </span>
                  </div>
                  <div>
                    <span>{{ $t("api.token") }}</span>
                    <span @click="goTheUrl(item)"> {{ item.name }} </span>
                  </div>
                  <div>
                    <span>{{ $t("token.description") }}</span>
                    <span> {{ item.description }} </span>
                  </div>
                  <div>
                    <span>{{ $t("token.Abbreviation") }}</span>
                    <span> {{ item.symbol }} </span>
                  </div>
                  <div>
                    <span>{{ $t("token.totalNumber") }}</span>
                    <span>{{ item.totalSupply }}</span>
                  </div>
                  <div>
                    <span>{{ $t("token.addressNumber") }}</span>
                    <span>{{ item.accountTotal }}</span>
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
                <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
                <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
                <span>{{ $t("comm.page")}}</span> -->
              </div>
            </div>
          </div>
          <div
            class="load-more display-phone"
            @click="getTranList(page + 1, 1)"
          >
            {{ loadText }}
          </div>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
          <!-- <div v-if="voterList.length == 0" class="general-no-data">
            {{ $t('comm.noData') }}
          </div> -->
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{
                $t("token.currentTokenNumber", [total1])
              }}</span>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span
                :class="page1 > 1 ? 'cursor' : 'gray'"
                class="space"
                @click="getVoterList(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="page1 > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="getVoterList(page1 - 1)"
              >
                &lt;
              </span>
              <span class="forcibly-blue">{{ page1 }}</span
              >/<span class="space forcibly-blue">{{ totalPages1 }}</span>
              <span
                :class="page1 == totalPages1 ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="getVoterList(page1 + 1)"
              >
                &gt;
              </span>
              <span
                :class="page1 == totalPages1 ? 'gray' : 'cursor'"
                @click="getVoterList(totalPages1)"
                >{{ $t("comm.lastPage") }}</span
              >
            </div>
          </div>
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="voterList" stripe style="width: 100%">
                <el-table-column :label="$t('ftable.order')" width="100">
                  <template slot-scope="scope">
                    <span style="color: #2d353b">{{ scope.row.ranking }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('token.tokenAddress')">
                  <template slot-scope="scope">
                    <span
                      @click="goTheUrl(scope.row)"
                      class="equal-width cursor"
                      >{{ scope.row.contractManager }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('token.addressNumber')"
                  prop="type"
                  width="200"
                >
                  <template slot-scope="scope">
                    {{ scope.row.accountTotal }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div
                v-for="(item, index) in voterList"
                :key="index"
                class="item-wrapper"
              >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t("token.tokenAddress") }}</span>
                    <span @click="goTheUrl(item)" class="equal-width">{{
                      item.contractManager
                    }}</span>
                  </div>
                  <div>
                    <span>{{ $t("token.addressNumber") }}</span>
                    <span>{{ item.accountTotal }}</span>
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
                    v-model="prePage1"
                    :placeholder="$t('comm.selected')"
                    size="mini"
                    @change="getVoterList(page1)"
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
                  :class="page1 > 1 ? 'cursor' : 'gray'"
                  class="space"
                  @click="getVoterList(1)"
                  >{{ $t("comm.firstPage") }}</span
                >
                <span
                  :class="page1 > 1 ? 'page-cursor' : 'gray'"
                  class="space symbol"
                  @click="getVoterList(page1 - 1)"
                >
                  &lt;
                </span>
                <span class="forcibly-blue">{{ page1 }}</span
                >/<span class="space forcibly-blue">{{ totalPages1 }}</span>
                <span
                  :class="page1 == totalPages1 ? 'gray' : 'page-cursor'"
                  class="space symbol"
                  @click="getVoterList(page1 + 1)"
                >
                  &gt;
                </span>
                <span
                  :class="page1 == totalPages1 ? 'gray' : 'cursor'"
                  @click="getVoterList(totalPages1)"
                  >{{ $t("comm.lastPage") }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="load-more display-phone"
            @click="getVoterList1(page1 + 1, 1)"
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
import { setValue } from "@/utils/auth";

export default {
  name: "Accountsinfo",
  data() {
    return {
      page: 1,
      page1: 1,
      prePage: 10,
      prePage1: 10,
      totalPages: 0,
      totalPages1: 0,
      total: 0,
      total1: 0,
      streamPage: 1,
      streamPrePage: 3,
      streamTotalPages: 0,
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
      tranTypes: [
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
      ],
      tableData: [],
      gasUsedRate: 20,
      isActivity: 0,
      tranList: [],
      voterList: [],
      timer: {},
      copyData: "",
      recodeDialogVisible: false,
      streamLoadText: this.$t("comm.clickLoad"),
      loadText: this.$t("comm.clickLoad"),
      currPage: 1,
      currStreamPage: 1,
      message: {},
    };
  },
  created() {
    this.message = this.$route.params;
    setValue("accAddr", "");
    setValue("accInfo", "");
  },
  mounted() {
    this.getTranList(this.page);
    this.getVoterList(this.page);
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
    },
    formatTimed(timestamp, format) {
      return helper.formatTime(timestamp, format);
    },
    getDataFormat(data, pow = 18, decimal = 10000) {
      return helper.getDataFormat(data, pow, decimal);
    },

    formatTime(time) {
      return helper.formatTimimg(time);
    },

    goToUrl(contract) {
      helper.goPathUrl(this, "TokenInfo", contract);
    },

    goTheUrl(params) {
      setValue("accAddr", params);
      setValue("accInfo", params);
      helper.goTheUrl(this, "TokenInfo", params);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

    getTranList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      var that = this;
      let status = 1;
      that.page = page;
      if (parseInt(this.message.nowBlock) > parseInt(this.message.maxBlock)) {
        status = 2;
      }
      console.log(this.message);
      var param = {
        type: 0, //0:mrc20,1:721
        current: page,
        size: that.prePage,
      };

      api
        .postJson("/platform/getTokensInfo", param)
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
            const rand = (that.page - 1) * that.prePage;
            var temp = {};

            data.forEach((item, index) => {
              temp = {
                ranking: index + 1 + rand,
                accountTotal: item.accountTotal,
                contract: item.contract,
                name: item.name,
                symbol: item.symbol,
                totalSupply: item.totalSupply,
                description: item.description,
                decimals: item.decimals,
                is1155: false,
              };
              newData.push(temp);
              if (device === 1) {
                that.tranList.push(temp);
              }
            });
            if (that.tranList.length === 0 || device === 0) {
              that.tranList = newData;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getVoterList(page1, device = 0) {
      if (page1 < 1 || (this.totalPages1 > 0 && page1 > this.totalPages1)) {
        return;
      }

      var that = this;
      let status = 1;
      that.page1 = page1;
      if (parseInt(this.message.nowBlock) > parseInt(this.message.maxBlock)) {
        status = 2;
      }
      var param = {
        type: 1,
        current: page1,
        size: that.prePage1,
      };

      api
        .postJson("/platform/getContractToken", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";
              that.voterList = [];
              return;
            }
            var data = response.result.records;
            if (data.length < that.prePage1) {
              that.loadText = this.$t("comm.bottomLine");
            }
            that.totalPages1 = response.result.pages;
            that.total1 = response.result.total;
            const newData = [];
            const rand = (that.page1 - 1) * that.prePage1;
            var temp = {};
            data.forEach((item, index) => {
              temp = {
                ranking: index + 1 + rand,
                accountTotal: item.accountTotal,
                contractManager: item.contractManager,
                contractAddress: item.contractAddress,
                is1155: true,
              };
              newData.push(temp);
              if (device === 1) {
                that.voterList.push(temp);
              }
            });
            if (that.voterList.length === 0 || device === 0) {
              that.voterList = newData;
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
