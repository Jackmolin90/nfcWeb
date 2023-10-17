<template>
  <div class="ftable list-wrapper">
    <div class="top-wrapper">
      <div class="left-wrapper">
        <span v-show="!!title">{{ $t(title) }}</span>
        <span>{{ $t(totalText, [total]) }}</span>
      </div>
      <!-- <div class="unLock">{{ $t('lock.unLockedNumber',[totalUnlocked]) }}</div> -->
      <slot name="top_search" v-if="search">
        <div style="width: 100%; max-width: 400px">
          <div>
            <el-input
              suffix-icon="el-icon-search"
              v-model="searchInput"
              :placeholder="$t(placeholder)"
              @keyup.enter.native="seachData(1)"
              clearable
            />
          </div>
          <div class="search-title" @click="seachData(1)"></div>
        </div>
      </slot>
      <div class="page-wrapper">
        <slot name="top_page">
          <!-- <template v-if="false">
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
        
          </template>-->
        </slot>
      </div>
    </div>

    <div class="list-wrapper" style="min-height: 100px" v-loading="loading">
      <div class="display-pc-and-pad">
        <div v-if="tableType == 'div'">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="item-wrapper"
          >
            <div style="">
              <slot name="div_table_top" :data="item"> </slot>
            </div>
            <div class="content" style="padding-top: 0px">
              <div class="img" v-if="divImg">
                <img src="/static/images/default.png" width="60px" />
              </div>
              <div class="item" v-for="(heard, cd) in tableHeard" :key="cd">
                <div>
                  {{ heard.notT ? heard.label : $t(heard.label) }}
                </div>

                <div class="node" v-if="heard.type == 'address'">
                  <span
                    class="display-pad cursor equal-width"
                    @click="goToUrl(item[heard.name])"
                    >{{ getAddrFormat(item[heard.name], 8) }}</span
                  >
                </div>
                <div v-else>
                  <slot :name="'col_' + heard.name" :data="item">
                    {{ item[heard.name] }}
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-table
          v-else
          :data="tableData"
          stripe
          :style="{ width: '100%', 'min-height': tableMin }"
        >
          <el-table-column
            :label="$t('ftable.order')"
            prop="ieIndex"
            min-width="60"
            v-if="showIndex"
          />
          <template v-for="(heard, cd) in tableHeard">
            <el-table-column
              v-if="!heard.hide"
              :key="cd"
              :label="heard.notT ? heard.label : $t(heard.label)"
              :prop="heard.name"
              :width="heard.width ? heard.width : undefined"
              :min-width="
                heard.type == 'address' ? '160px' : heard.minWidth || undefined
              "
              :show-overflow-tooltip="
                heard.type == 'address' || !!heard.overflow
              "
            >
              <template slot-scope="scope">
                <slot :name="'col_' + heard.name" :data="scope.row">
                  <el-popover
                    v-if="heard.type == 'address'"
                    placement="bottom"
                    trigger="hover"
                    :content="scope.row[heard.name]"
                  >
                    <span
                      slot="reference"
                      class="cursor"
                      style="color: #409eff"
                      @click="goToUrl(scope.row[heard.name])"
                    >
                      {{ getAddrFormat(scope.row[heard.name], 10) }}
                    </span>
                  </el-popover>
                  <span
                    v-else-if="!!heard.isHtml"
                    v-html="scope.row[heard.name]"
                  ></span>
                  <span v-else-if="!!heard.isT">{{
                    $t(scope.row[heard.name])
                  }}</span>
                  <span v-else> {{ scope.row[heard.name] }}</span>
                </slot>
              </template>
            </el-table-column>
          </template>
          <el-table-column
            :label="$t('ftable.action')"
            :width="ationWidth"
            :min-width="ationMinWidth"
            v-if="showAction"
            :fixed="ationFixed"
          >
            <template slot-scope="scope">
              <slot name="ie_col_action" :data="scope.row"> </slot>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="display-phone">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="item-wrapper"
        >
          <div class="other">
            <template v-for="(heard, cd) in tableHeard">
              <div :key="cd" v-if="!heard.hide">
                <span>{{ heard.notT ? heard.label : $t(heard.label) }}</span>
                <span>
                  <slot :name="'col_' + heard.name" :data="item">
                    <span
                      v-if="heard.type == 'address'"
                      style="color: #409eff"
                      @click="goToUrl(item[heard.name])"
                      class="equal-width"
                    >
                      {{ getAddrFormat(item[heard.name], 8) }}
                    </span>
                    <span v-else-if="!!heard.isT">
                      {{ $t(item[heard.name]) }}
                    </span>
                    <span v-else>
                      {{ item[heard.name] }}
                    </span>
                  </slot>
                </span>
              </div>
            </template>
          </div>
        </div>
        <div v-if="total < 1" class="load-more">
          {{ $t("comm.noData") }}
        </div>
      </div>
    </div>

    <div>
      <div class="bottom-wrapper">
        <div class="left-wrapper display-pc-and-pad">
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
        <div class="page-wrapper page_tools_ie">
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
        </div>
      </div>
    </div>

    <div
      v-if="false"
      class="load-more display-phone"
      @click="getAddrList(page + 1, 1)"
    >
      {{ loadText }}
    </div>
  </div>
</template>
<script>
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    param: {
      type: Object,
      default() {
        return {};
      },
    },
    dataUtils: {
      type: Function,
      default() {
        return null;
      },
    },
    getListFront: {
      type: Object,
      default() {
        return null;
      },
    },
    testDatas: {
      type: Array,
      default() {
        return null;
      },
    },
    datasUtils: {
      type: Function,
      default() {
        return null;
      },
    },
    tableType: {
      type: String,
      default: "table",
    },
    divImg: {
      type: Boolean,
      default: false,
    },
    showTopPage: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    showAction: {
      type: Boolean,
      default: false,
    },
    ationWidth: {
      type: [Number, String],
      default: 80,
    },
    ationMinWidth: {
      type: [Number, String],
      default: 50,
    },
    ationFixed: {
      type: String,
      default: null,
    },
    search: {
      type: Boolean,
      default: false,
    },
    searchName: {
      type: String,
      default: "searchInput",
    },
    placeholder: {
      type: String,
      default: "",
    },
    tableHeard: {
      type: Array,
      default() {
        return [];
      },
    },
    tableMin: {
      type: String,
      default: "100px",
    },
    totalText: {
      type: String,
      default: "ftable.totalnumber",
    },
  },
  data() {
    return {
      loading: false,
      searchTime: null,
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
  mounted() {
    this.getAddrList();
  },
  activated() {
    this.getAddrList();
  },
  destroyed() {
    if (this.searchTime) {
      clearTimeout(this.searchTime);
    }
  },
  methods: {
    seachData() {
      this.getAddrList(1);
    },
    goToUrl(contract, path = "Accountsinfo") {
      helper.goPathUrl(this, path, contract);
    },
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },
    getAddrList(page) {
      if (this.searchTime) {
        window.clearTimeout(this.searchTime);
        this.searchTime = null;
      }
      this.searchTime = window.setTimeout(
        () => {
          this.loadingDatas(page);
        },

        800
      );
    },
    async loadingDatas(page) {
      var that = this;
      if (this.testDatas) {
        that.tableData = that.testDatas;
        return;
      }

      if (!this.url) {
        this.tableData = [];
        this.totalPages = 0;
        this.total = 0;
        this.page = 0;
        return;
      }
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }

      that.page = page || that.page;
      var param = {
        current: page,
        size: that.prePage,
      };
      param[this.searchName] = this.searchInput;

      Object.assign(param, this.param);

      if (this.getListFront) {
        if (this.getListFront.sync) {
          await this.getListFront.fun();
        } else {
          this.getListFront.fun();
        }
      }
      this.loading = true;
      that.total = 0;
      that.tableData = [];
      api
        .postJson(this.url, param)
        .then((response) => {
          this.loading = false;
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";
              that.tableData = [];
              that.total = 0;
              return;
            }
            that.total = response.result.total || 0;

            var data = response.result.records;

            if (data.length < that.prePage) {
              that.loadText = this.$t("comm.bottomLine");
            }
            that.totalPages = response.result.pages;

            const newData = [];
            const rand = (that.page - 1) * that.prePage;

            data.forEach((item, index) => {
              item.ieIndex = index + 1 + parseInt(rand || 0);
              if (this.dataUtils) {
                this.dataUtils(item);
              }
              newData.push(item);
            });

            that.tableData = newData;

            if (this.datasUtils) {
              this.datasUtils(newData);
            }
          }
        })
        .catch((error) => {
          that.total = 0;
          // this.$message.error(error.message)
          // this.dialogVisible = true
          console.error(error);
          this.loading = false;
        });
    },
  },
  watch: {
    url: {
      immediate: true,
      handler: function () {
        this.getAddrList(1);
      },
    },
    searchInput: function () {
      this.seachData();
    },

    param: function () {
      this.getAddrList(1);
    },
    totalPages: function (newVal) {
      this.$emit("totalchange", newVal);
    },
  },
};
</script>
<style scoped>
.ftable {
  padding-top: 10px;
}

.top-wrapper .left-wrapper span {
  padding: 0px !important;
}
.top-wrapper .left-wrapper span:first-child {
  font-size: 16px;
  font-weight: 400;
  color: #2d353b !important;
}
.top-wrapper .left-wrapper span:last-child {
  font-size: 12px;
  color: #b3bdc8;
  margin-left: 10px;
}
</style>
<style >
.ftable .search {
  width: 414px;
  height: 30px;
  border-radius: 0;
  text-align: left;
  padding-left: 10px;
  padding-top: 5px;
}

.ieHome .content-container {
  margin-bottom: 20px !important;
  margin-top: 20px !important;
}

.page_tools_ie {
  user-select: none;
}
</style>