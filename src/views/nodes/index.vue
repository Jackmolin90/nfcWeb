<template>
  <div class="accountsinfo-container">
    <div class="top-container"></div>
    <div class="content-container" style="margin-top: -180px">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              :class="isActivity == 0 ? 'is_activity' : ''"
              @click="updShowList(0)"
              >{{ $t("node.candidateNode") }}</span
            >
            <span
              :class="isActivity == 1 ? 'is_activity' : ''"
              @click="updShowList(1)"
              >{{ $t("node.witnessNode") }}</span
            >
            <span
              :class="isActivity == 2 ? 'is_activity' : ''"
              @click="updShowList(2)"
              >{{ $t("node.signoutNode") }}</span
            >
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{
                $t("node.currentCandidateNumber", [total])
              }}</span>
            </div>
            <div class="search display-pc-and-pad">
              <div>
                <el-input
                  v-model="searchCandidateInput"
                  :placeholder="$t('node.nodeSearch')"
                  @keyup.enter.native="seachCandidateData(1)"
                />
              </div>
              <div class="search-title" @click="seachCandidateData(1)"></div>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <el-button
                type="text"
                size="medium"
                @click="goToUrlNodepledge(message)"
                class="equal-width"
                >{{ $t("node.nodepledge") }}</el-button
              >
              <!--             
              <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getCandidateNodeList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getCandidateNodeList(page-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getCandidateNodeList(page+1)"> &gt; </span>
              <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getCandidateNodeList(totalPages)">{{ $t('comm.lastPage') }}</span>   
              -->
            </div>
          </div>
          <div class="voter-node" style="min-height: 350px">
            <div class="display-pc-and-pad">
              <el-table :data="candidateList" stripe style="width: 100%">
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
                  min-width="160"
                  :label="$t('node.candidateNode')"
                  prop="node_address"
                  show-overflow-tooltip
                >
                  <span
                    @click="gotoNodeView(scope.row)"
                    slot-scope="scope"
                    class="cursor"
                    style="color: #4a7bd3"
                  >
                    {{ getAddrFormat(scope.row.node_address) }}
                  </span>
                </el-table-column>
                <el-table-column :label="$t('node.nodetype')" minWidth="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.node_type == 1">
                      {{ $t("node.candidateNode") }}
                    </span>
                    <span v-else-if="scope.row.node_type == 2">
                      {{ $t("node.witnessNode") }}
                    </span>
                    <span v-else-if="scope.row.node_type == 3">
                      {{ $t("node.signoutNode") }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="false"
                  :label="$t('node.pledgeAmount')"
                  prop="pledge_amount"
                  minWidth="120"
                />
                <el-table-column
                   v-if="false"
                  :label="$t('lock.WaitingReleased')"
                  prop="leftamount"
                  minWidth="120"
                />
                <el-table-column
             
                  :label="$t('node.punishScore')"
                  prop="fractions"
                  minWidth="140"
                />
                <el-table-column
                  :label="$t('mymanageNode.paytime')"
                  prop="join_time"
                  minWidth="120"
                />
                <el-table-column
                  :label="$t('node.operation')"
                  show-overflow-tooltip
                  width="100px"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="medium"
                      @click="goToUrlCandidate(scope.row.node_address)"
                      :disabled="scope.row.fractions <= 0"
                      class="equal-width"
                      >{{ $t("node.punishRepairPayment") }}</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div
                v-for="(item, index) in candidateList"
                :key="index"
                class="item-wrapper"
              >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t("node.nodeAddress") }}</span>
                    <span @click="goToUrlCandidate(scope.row.node_address)">
                      {{ item.node_address }}
                    </span>
                  </div>
                  <div>
                    <span>{{ $t("node.nodetype") }}</span>
                    <span v-if="item.node_type == 1">
                      {{ $t("absent.candidateNode") }}
                    </span>
                    <span v-else-if="item.node_type == 2">
                      {{ $t("absent.witnessNode") }}
                    </span>
                    <span v-else-if="item.node_type == 3">
                      {{ $t("absent.signoutNode") }}
                    </span>
                  </div>
                  <div v-if="false">
                    <span>{{ $t("node.pledgeAmount") }}</span>
                    <span> {{ item.pledge_amount }} </span>
                  </div>
                  <div    v-if="false">
                    <span>{{ $t("lock.WaitingReleased") }}</span>
                    <span> {{ item.leftamount }} </span>
                  </div>
                  <div>
                    <span>{{ $t("node.punishScore") }}</span>
                    <span>{{ item.fractions }}</span>
                  </div>
                  <div>
                    <span>{{ $t("node.pledgeTime") }}</span>
                    <span>{{ item.join_time }}</span>
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
                    @change="getCandidateNodeList(page)"
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
                  @click="getCandidateNodeList(1)"
                  >{{ $t("comm.firstPage") }}</span
                >
                <span
                  :class="page > 1 ? 'page-cursor' : 'gray'"
                  class="space symbol"
                  @click="getCandidateNodeList(page - 1)"
                >
                  &lt;
                </span>
                <span class="forcibly-blue">{{ page }}</span
                >/<span class="space forcibly-blue">{{ totalPages }}</span>
                <span
                  :class="page == totalPages ? 'gray' : 'page-cursor'"
                  class="space symbol"
                  @click="getCandidateNodeList(page + 1)"
                >
                  &gt;
                </span>
                <span
                  :class="page == totalPages ? 'gray' : 'cursor'"
                  @click="getCandidateNodeList(totalPages)"
                  >{{ $t("comm.lastPage") }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="load-more display-phone"
            @click="getCandidateNodeList(page + 1, 1)"
          >
            {{ loadText }}
          </div>
        </div>

        <div v-if="isActivity == 1" class="list-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{
                $t("node.currentWitnessNumber", [total1])
              }}</span>
            </div>
            <div class="search display-pc-and-pad">
              <div>
                <el-input
                  v-model="searchWitnessInput"
                  :placeholder="$t('node.nodeWitnessSearch')"
                  @keyup.enter.native="seachWitnessData(1)"
                />
              </div>
              <div class="search-title" @click="seachWitnessData(1)"></div>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <!-- 
              <span :class="page1 > 1 ? 'cursor' : 'gray' " class="space" @click="getWitnessNodeList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page1 > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getWitnessNodeList(page1-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page1 }}</span>/<span class="space forcibly-blue">{{ totalPages1 }}</span>
              <span :class="page1 == totalPages1 ? 'gray' : 'page-cursor' " class="space symbol" @click="getWitnessNodeList(page1+1)"> &gt; </span>
              <span :class="page1 == totalPages1 ? 'gray' : 'cursor' " @click="getWitnessNodeList(totalPages1)">{{ $t('comm.lastPage') }}</span>
              -->
            </div>
          </div>
          <div class="voter-node" style="min-height: 350px">
            <div class="display-pc-and-pad">
              <el-table :data="witnessList" stripe style="width: 100%">
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
                  :label="$t('node.witnessNode')"
                  prop="node_address"
                  min-width="160"
                  show-overflow-tooltip
                >
                  <span
                    @click="gotoNodeView(scope.row)"
                    slot-scope="scope"
                    class="cursor"
                    style="color: #4a7bd3"
                  >
                    {{ getAddrFormat(scope.row.node_address) }}
                  </span>
                </el-table-column>
                <el-table-column :label="$t('node.nodetype')" minWidth="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.node_type == 1">
                      {{ $t("node.candidateNode") }}
                    </span>
                    <span v-else-if="scope.row.node_type == 2">
                      {{ $t("node.witnessNode") }}
                    </span>
                    <span v-else-if="scope.row.node_type == 3">
                      {{ $t("node.signoutNode") }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="false"
                  :label="$t('node.pledgeAmount')"
                  prop="pledge_amount"
                  minWidth="120"
                />
                <el-table-column
                   v-if="false"
                  :label="$t('lock.WaitingReleased')"
                  prop="leftamount"
                  minWidth="120"
                />
                <el-table-column
                  :label="$t('node.punishScore')"
                  prop="fractions"
                  minWidth="140"
                />
                <el-table-column
                  :label="$t('mymanageNode.paytime')"
                  prop="join_time"
                  minWidth="120"
                />
                <el-table-column
                  :label="$t('node.operation')"
                  show-overflow-tooltip
                  width="100px"
                >
                  <template slot-scope="scope">
                    <el-button
                      :disabled="scope.row.fractions <= 0"
                      type="text"
                      size="medium"
                      @click="goToUrlCandidate(scope.row.node_address)"
                      class="equal-width"
                      >{{ $t("node.punishRepairPayment") }}</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div
                v-for="(item, index) in witnessList"
                :key="index"
                class="item-wrapper"
              >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t("node.nodeAddress") }}</span>
                    <span> {{ item.node_address }} </span>
                  </div>
                  <div>
                    <span>{{ $t("node.nodetype") }}</span>
                    <span v-if="item.node_type == 1">
                      {{ $t("node.candidateNode") }}
                    </span>
                    <span v-else-if="item.node_type == 2">
                      {{ $t("node.witnessNode") }}
                    </span>
                    <span v-else-if="item.node_type == 3">
                      {{ $t("node.signoutNode") }}
                    </span>
                  </div>
                  <div v-if="false">
                    <span>{{ $t("node.pledgeAmount") }}</span>
                    <span> {{ item.pledge_amount }} </span>
                  </div>
                  <div    v-if="false">
                    <span>{{ $t("lock.WaitingReleased") }}</span>
                    <span> {{ item.leftamount }} </span>
                  </div>
                  <div>
                    <span>{{ $t("node.punishScore") }}</span>
                    <span>{{ item.fractions }}</span>
                  </div>
                  <div>
                    <span>{{ $t("node.pledgeTime") }}</span>
                    <span>{{ item.join_time }}</span>
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
                    @change="getWitnessNodeList(page1)"
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
                  @click="getWitnessNodeList(1)"
                  >{{ $t("comm.firstPage") }}</span
                >
                <span
                  :class="page1 > 1 ? 'page-cursor' : 'gray'"
                  class="space symbol"
                  @click="getWitnessNodeList(page1 - 1)"
                >
                  &lt;
                </span>
                <span class="forcibly-blue">{{ page1 }}</span
                >/<span class="space forcibly-blue">{{ totalPages1 }}</span>
                <span
                  :class="page1 == totalPages1 ? 'gray' : 'page-cursor'"
                  class="space symbol"
                  @click="getWitnessNodeList(page1 + 1)"
                >
                  &gt;
                </span>
                <span
                  :class="page1 == totalPages1 ? 'gray' : 'cursor'"
                  @click="getWitnessNodeList(totalPages1)"
                  >{{ $t("comm.lastPage") }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="load-more display-phone"
            @click="getWitnessNodeList(page1 + 1, 1)"
          >
            {{ loadText }}
          </div>
        </div>

        <div v-if="isActivity == 2" class="list-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{
                $t("node.currentSignoutNumber", [total2])
              }}</span>
            </div>
            <div class="search display-pc-and-pad">
              <div>
                <el-input
                  v-model="searchSignoutInput"
                  :placeholder="$t('node.nodeSignoutSearch')"
                  @keyup.enter.native="seachSignoutData(1)"
                />
              </div>
              <div class="search-title" @click="seachSignoutData(1)"></div>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <!-- 
              <span :class="page2 > 1 ? 'cursor' : 'gray' " class="space" @click="getSignoutNodeList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page2 > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getSignoutNodeList(page2-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page2 }}</span>/<span class="space forcibly-blue">{{ totalPages2 }}</span>
              <span :class="page2 == totalPages2 ? 'gray' : 'page-cursor' " class="space symbol" @click="getSignoutNodeList(page2+1)"> &gt; </span>
              <span :class="page2 == totalPages2 ? 'gray' : 'cursor' " @click="getSignoutNodeList(totalPages2)">{{ $t('comm.lastPage') }}</span>
              -->
            </div>
          </div>
          <div class="voter-node" style="min-height: 350px">
            <div class="display-pc-and-pad">
              <el-table :data="SignoutList" stripe style="width: 100%">
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
                  min-width="160"
                  :label="$t('node.signoutNode')"
                  prop="node_address"
                  show-overflow-tooltip
                >
                  <span
                    @click="gotoNodeView(scope.row)"
                    slot-scope="scope"
                    class="cursor"
                    style="color: #4a7bd3"
                  >
                    {{ getAddrFormat(scope.row.node_address) }}
                  </span>
                </el-table-column>
                <el-table-column :label="$t('node.nodetype')" minWidth="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.node_type == 1">
                      {{ $t("node.candidateNode") }}
                    </span>
                    <span v-else-if="scope.row.node_type == 2">
                      {{ $t("node.witnessNode") }}
                    </span>
                    <span v-else-if="scope.row.node_type == 3">
                      {{ $t("node.signoutNode") }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="false"
                  :label="$t('node.pledgeAmount')"
                  prop="pledge_amount"
                  min-width="120"
                />
                <el-table-column
                   v-if="false"
                  :label="$t('lock.WaitingReleased')"
                  prop="leftamount"
                  minWidth="120"
                />
                <el-table-column
                  :label="$t('node.punishScore')"
                  prop="fractions"
                  min-width="140"
                />
                <el-table-column
                  :label="$t('mymanageNode.paytime')"
                  prop="join_time"
                  min-width="120"
                />
              </el-table>
            </div>
            <div class="display-phone">
              <div
                v-for="(item, index) in SignoutList"
                :key="index"
                class="item-wrapper"
              >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t("node.nodeAddress") }}</span>
                    <span> {{ item.node_address }} </span>
                  </div>
                  <div>
                    <span>{{ $t("node.nodetype") }}</span>
                    <span v-if="item.node_type == 1">
                      {{ $t("node.candidateNode") }}
                    </span>
                    <span v-else-if="item.node_type == 2">
                      {{ $t("node.witnessNode") }}
                    </span>
                    <span v-else-if="item.node_type == 3">
                      {{ $t("node.signoutNode") }}
                    </span>
                  </div>
                  <div v-if="false">
                    <span>{{ $t("node.pledgeAmount") }}</span>
                    <span> {{ item.pledge_amount }} </span>
                  </div>
                  <div    v-if="false">
                    <span>{{ $t("lock.WaitingReleased") }}</span>
                    <span> {{ item.leftamount }} </span>
                  </div>
                  <div>
                    <span>{{ $t("node.punishScore") }}</span>
                    <span>{{ item.fractions }}</span>
                  </div>
                  <div>
                    <span>{{ $t("node.pledgeTime") }}</span>
                    <span>{{ item.join_time }}</span>
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
                    v-model="prePage2"
                    :placeholder="$t('comm.selected')"
                    size="mini"
                    @change="getSignoutNodeList(page2)"
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
                  :class="page2 > 1 ? 'cursor' : 'gray'"
                  class="space"
                  @click="getSignoutNodeList(1)"
                  >{{ $t("comm.firstPage") }}</span
                >
                <span
                  :class="page2 > 1 ? 'page-cursor' : 'gray'"
                  class="space symbol"
                  @click="getSignoutNodeList(page2 - 1)"
                >
                  &lt;
                </span>
                <span class="forcibly-blue">{{ page2 }}</span
                >/<span class="space forcibly-blue">{{ totalPages2 }}</span>
                <span
                  :class="page2 == totalPages2 ? 'gray' : 'page-cursor'"
                  class="space symbol"
                  @click="getSignoutNodeList(page2 + 1)"
                >
                  &gt;
                </span>
                <span
                  :class="page2 == totalPages2 ? 'gray' : 'cursor'"
                  @click="getSignoutNodeList(totalPages2)"
                  >{{ $t("comm.lastPage") }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="load-more display-phone"
            @click="getSignoutNodeList(page2 + 1, 1)"
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
  name: "Nodes",
  data() {
    return {
      page: 1,
      page1: 1,
      page2: 1,
      prePage: 10,
      prePage1: 10,
      prePage2: 10,
      totalPages: 0,
      totalPages1: 0,
      totalPages2: 0,
      total: 0,
      total1: 0,
      total2: 0,
      streamPage: 1,
      streamPrePage: 3,
      streamTotalPages: 0,
      searchCandidateInput: null,
      searchWitnessInput: null,
      searchSignoutInput: null,
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
      candidateList: [],
      witnessList: [],
      SignoutList: [],
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
  },
  mounted() {
    this.getCandidateNodeList(this.page);

    this.getWitnessNodeList(this.page);

    this.getSignoutNodeList(this.page);
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

    getAddrFormat(data, number = 15) {
      return helper.getAddrFormat(data, number);
    },

    goToUrlNodepledge(contract) {
      // helper.goPathUrl(this, 'NodePledge', contract)
      helper.goUrl(this, "MymanageAddNodep");

      //  helper.goPathUrl(this, "mymanagep/addNode")
    },
    gotoNodeView(data) {
      this.goPathUrls("nodeView", data.node_address);
    },
    goPathUrls(name, param) {
      helper.goPathUrl(this, name, param);
    },

    goToUrlCandidate(contract) {
      if (contract) {
        helper.goPathUrl(this, "mymanagep/makegood", contract);
      }
      //   helper.goPathUrl(this, 'NodeSupple', contract)
    },

    seachCandidateData() {
      this.candidateList = [];
      this.getCandidateNodeList(1);
    },

    getCandidateNodeList(page, device = 0) {
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
        node_address: that.searchCandidateInput,
        node_type: 1,
        current: page,
        size: that.prePage,
      };

      api
        .postJson("/platform/node/getcadnodelist", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";
              that.candidateList = [];

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
                node_address: item.node_address,
                node_type: item.node_type,
                pledge_amount:
                  helper
                    .getDataFormat(item.pledge_amount, 18, 10000)
                    .toFixed(4) + " NFC",
                fractions: item.fractions,
                releaseday: item.releaseday,
                join_time: item.join_time,
                leftamount: `${utils.clearZero(item.leftamount)} NFC`,
              };
              newData.push(temp);
              if (device === 1) {
                that.candidateList.push(temp);
              }
            });
            if (that.candidateList.length === 0 || device === 0) {
              that.candidateList = newData;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    goToUrlWitness(contract) {
      helper.goPathUrl(this, "NodeSupple", contract);
    },

    seachWitnessData() {
      this.witnessList = [];
      this.getWitnessNodeList(1);
    },

    getWitnessNodeList(page1, device = 0) {
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
        node_address: that.searchWitnessInput,
        node_type: 2,
        current: page1,
        size: that.prePage1,
      };

      api
        .postJson("/platform/node/getcadnodelist", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";
              that.witnessList = [];

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
                node_address: item.node_address,
                node_type: item.node_type,
                pledge_amount:
                  helper
                    .getDataFormat(item.pledge_amount, 18, 10000)
                    .toFixed(4) + " NFC",
                fractions: item.fractions,
                releaseday: item.releaseday,
                join_time: item.join_time,
                leftamount: `${utils.clearZero(item.leftamount)} NFC`,
              };
              newData.push(temp);
              if (device === 1) {
                that.witnessList.push(temp);
              }
            });
            if (that.witnessList.length === 0 || device === 0) {
              that.witnessList = newData;
            }
          }
        })
        .catch((error) => {
          // this.$message.error(error.message)
          // this.dialogVisible = true
          console.error(error);
        });
    },

    seachSignoutData() {
      this.SignoutList = [];
      this.getSignoutNodeList(1);
    },

    getSignoutNodeList(page2, device = 0) {
      if (page2 < 1 || (this.totalPages2 > 0 && page2 > this.totalPages2)) {
        return;
      }

      var that = this;
      let status = 1;
      that.page2 = page2;
      if (parseInt(this.message.nowBlock) > parseInt(this.message.maxBlock)) {
        status = 2;
      }
      var param = {
        node_address: that.searchSignoutInput,

        node_type: 3,
        current: page2,
        size: that.prePage2,
      };

      api
        .postJson("/platform/node/getcadnodelist", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";
              that.SignoutList = [];
              return;
            }
            var data = response.result.records;
            if (data.length < that.prePage2) {
              that.loadText = this.$t("comm.bottomLine");
            }
            that.totalPages2 = response.result.pages;
            that.total2 = response.result.total;
            const newData = [];
            const rand = (that.page2 - 1) * that.prePage2;
            var temp = {};
            data.forEach((item, index) => {
              temp = {
                ranking: index + 1 + rand,
                node_address: item.node_address,
                node_type: item.node_type,
                pledge_amount:
                  helper
                    .getDataFormat(item.pledge_amount, 18, 10000)
                    .toFixed(4) + " NFC",
                fractions: item.fractions,
                releaseday: item.releaseday,
                join_time: item.join_time,
                leftamount: `${utils.clearZero(item.leftamount)} NFC`,
              };
              newData.push(temp);
              if (device === 1) {
                that.SignoutList.push(temp);
              }
            });
            if (that.SignoutList.length === 0 || device === 0) {
              that.SignoutList = newData;
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
.accountsinfo-container
  /deep/
  .el-table
  .el-table__row
  .el-table_1_column_2
  .cell {
  color: #333;
}
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
  height: 30px;
  padding: 0;
  border-radius: 0;
  text-align: left;
  padding-left: 10px;
  min-width: 414px;
  /*border-radius: 8px;*/
}

.accountsinfo-container .content-container .search {
  position: relative;
}
.accountsinfo-container
  .content-container
  .search
  .el-input--medium
  .el-input__inner {
  width: 414px;
  height: 30px;
  border-radius: 0;
  text-align: left;
  padding-left: 10px;
}
.accountsinfo-container .content-container .search .search-title {
  position: absolute;
  right: 5px;
  top: 0px;
  height: 30px;
  line-height: 30px;
  color: #ccc;
  width: 30px;
  background: url("/static/images/search_i.png") center no-repeat;
  background-size: 15px 15px;
  cursor: pointer;
}
</style>