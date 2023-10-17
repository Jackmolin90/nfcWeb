<template>
  <div class="accountsinfo-container">
    <div class="top-container">

    </div>
    <div class="content-container">
      <div class="block-container">
        <div class="detail-info">
          <div class="left-wrapper" style="width:100%">
            <div class="title" style="margin-bottom:16px;">
              {{ $t('voterInfo.voterDetails') }}
            </div>
            <div class="content" style="padding-top:10px;padding-bottom:10px">
              <p>
                <span>{{ $t('voter.voterRounds') }}</span>
                {{ $t('voter.rounds',[message.ranking]) }}
              </p>
              <p>
                <span>{{ $t('voter.voterCycle') }}</span>
                {{message.voterCycle}}
              </p>
              <p>
                <span>{{ $t('voter.blockInterval') }}</span>
                {{message.blockInterval}}
              </p>
              <p>
                <span>{{ $t('voter.totalVoterNumber') }}</span>
                {{message.totalVoterNumber}}
              </p>
              <div class="status">
                <span v-if="parseInt(message.nowBlock) < parseInt(message.minBlock)">{{ $t('voter.notStarted') }}</span>
                <span v-else-if="parseInt(message.nowBlock) > parseInt(message.maxBlock)" class="red">{{ $t('voter.over') }}</span>
                <span v-else class="lightBlue"> {{ $t('voter.processing') }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-container list-container">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span :class=" isActivity == 0?'is_activity':''" @click="updShowList(0)">{{ $t('api.node') }}</span>
            <span :class=" isActivity == 1?'is_activity':''" @click="updShowList(1)">{{ $t('voterInfo.voter') }}</span>
          <!-- <span :class=" isActivity == 2?'is_activity':''" @click="isActivity = 2">验证区块</span> -->
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{ $t('voterInfo.currentNodeNumber',[total]) }}</span>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getTranList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getTranList(page-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getTranList(page+1)"> &gt; </span>
              <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getTranList(totalPages)">{{ $t('comm.lastPage') }}</span>
              <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
              <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
            </div>
          </div>
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="tranList" stripe style="width: 100%">
                <el-table-column :label="$t('voterInfo.rounds')">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.ranking}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voterInfo.nodeName')" width="600">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.voter}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voterInfo.votesNumber')" width="200">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.stake}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voterInfo.proportion')" prop="proportion" width="200"/>
                <el-table-column :label="$t('voterInfo.type')" prop="type" width="150">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type === 1">{{ $t('voterInfo.witness') }}</span>
                    <span v-else-if="scope.row.type === 2">{{ $t('voterInfo.candidate') }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div v-for="(item, index) in tranList" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('voterInfo.nodeName') }}</span>
                    <span> {{ getAddrFormat(item.voter,8) }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voterInfo.votesNumber') }}</span>
                    <span> {{ item.stake }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voterInfo.proportion') }}</span>
                    <span>{{ item.proportion }}</span>
                  </div>
                  <div>
                    <span>{{ $t('voterInfo.type') }}</span>
                    <span v-if="item.type === 1">{{ $t('voterInfo.witness') }}</span>
                    <span v-else-if="item.type === 2">{{ $t('voterInfo.candidate') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="display-pc-and-pad">
            <div class="bottom-wrapper">
              <div class="left-wrapper">
                <span>{{ $t('comm.show') }}</span>
                <span>
                  <el-select v-model="prePage" :placeholder="$t('comm.selected')" size="mini" @change="getTranList(page)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('comm.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getTranList(1)">{{ $t('comm.firstPage') }}</span>
                <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getTranList(page-1)"> &lt; </span>
                <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
                <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getTranList(page+1)"> &gt; </span>
                <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getTranList(totalPages)">{{ $t('comm.lastPage') }}</span>
                <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
                <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
                <span>{{ $t("comm.page")}}</span> -->
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getTranList(page+1,1)">
            {{ loadText }}
          </div>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
          <!-- <div v-if="voterList.length == 0" class="general-no-data">
            {{ $t('comm.noData') }}
          </div> -->
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{ $t('voterInfo.currentVoterNumber',[total1]) }}</span>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span :class="page1 > 1 ? 'cursor' : 'gray' " class="space" @click="getVoterList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page1 > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getVoterList(page1-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page1 }}</span>/<span class="space forcibly-blue">{{ totalPages1 }}</span>
              <span :class="page1 == totalPages1 ? 'gray' : 'page-cursor' " class="space symbol" @click="getVoterList(page1+1)"> &gt; </span>
              <span :class="page1 == totalPages1 ? 'gray' : 'cursor' " @click="getVoterList(totalPages1)">{{ $t('comm.lastPage') }}</span>
              <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
              <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
            </div>
          </div>
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="voterList" stripe style="width: 100%">
                <el-table-column :label="$t('voterInfo.rounds')">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.ranking}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voterInfo.voter')" width="400">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.voter}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voterInfo.voterNode')" width="400">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.candiDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voterInfo.totalVoter')" prop="stake" width="180"/>
                <el-table-column :label="$t('voterInfo.voterTime')" prop="time" width="180">
                  <template slot-scope="scope">
                    <span>{{ formatTimed(scope.row.time, 'yyyy-MM-dd hh:mm:ss') }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div v-for="(item, index) in voterList" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('voterInfo.voter') }}</span>
                    <span> {{ getAddrFormat(item.voter,8) }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voterInfo.voterNode') }}</span>
                    <span> {{ getAddrFormat(item.candiDate,8) }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voterInfo.totalVoter') }}</span>
                    <span>{{ item.stake }}</span>
                  </div>
                  <div>
                    <span>{{ $t('voterInfo.voterTime') }}</span>
                    <span>{{ formatTimed(item.time, 'yyyy-MM-dd hh:mm:ss') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="display-pc-and-pad">
            <div class="bottom-wrapper">
              <div class="left-wrapper">
                <span>{{ $t('comm.show') }}</span>
                <span>
                  <el-select v-model="prePage1" :placeholder="$t('comm.selected')" size="mini" @change="getVoterList(page1)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('comm.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="page1 > 1 ? 'cursor' : 'gray' " class="space" @click="getVoterList(1)">{{ $t('comm.firstPage') }}</span>
                <span :class="page1 > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getVoterList(page1-1)"> &lt; </span>
                <span class="forcibly-blue">{{ page1 }}</span>/<span class="space forcibly-blue">{{ totalPages1 }}</span>
                <span :class="page1 == totalPages1 ? 'gray' : 'page-cursor' " class="space symbol" @click="getVoterList(page1+1)"> &gt; </span>
                <span :class="page1 == totalPages1 ? 'gray' : 'cursor' " @click="getVoterList(totalPages1)">{{ $t('comm.lastPage') }}</span>
                <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
                <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
                <span>{{ $t("comm.page")}}</span> -->
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getVoterList(page1+1,1)">
            {{ loadText }}
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
  </div>
</template>

<script>
import * as api from '@/api/api'
import echarts from 'echarts'
import * as helper from '@/utils/helper'
import QRCode from 'qrcodejs2'

export default {
  name: 'Accountsinfo',
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
      showNumbers: [{
        value: 10,
        label: '10'
      }, {
        value: 20,
        label: '20'
      }, {
        value: 50,
        label: '50'
      }, {
        value: 100,
        label: '100'
      }],
      tranType: 0,
      tranTypes: [{
        value: 0,
        label: this.$t('accounts.allTran')
      }, {
        value: 1,
        label: this.$t('accounts.outgoTran')
      }, {
        value: 2,
        label: this.$t('accounts.acceptedTran')
      }],
      tableData: [],
      gasUsedRate: 20,
      isActivity: 0,
      tranList: [],
      voterList: [],
      timer: {},
      copyData: '',
      recodeDialogVisible: false,
      streamLoadText: this.$t('comm.clickLoad'),
      loadText: this.$t('comm.clickLoad'),
      currPage:1,
      currStreamPage:1,
      message:{
        voterCycle: 0,
        blockInterval: 0,
        minBlock: 0,
        maxBlock: 0,
        nowBlock: 0,
        totalVoterNumber: 0
      }
    }
  },
  created() {
    // this.message = this.$route.params
    this.info()
  },
  mounted() {
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) 
    }

    if (this.timer2) {
      clearInterval(this.timer2) 
    }
  },
  methods: {
    updShowList(type) {
      this.isActivity = type
    },
    formatTimed(timestamp, format) {
      return helper.formatTime(timestamp, format)
    },
    getDataFormat(data,pow = 18, decimal = 10000) {
      return helper.getDataFormat(data,pow,decimal)
    },

    formatTime(time) {
      return helper.formatTimimg(time)
    },

    goToUrl(name, params) {
      helper.goPathUrl(this, name, params)
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number)
    },
    info() {
      let that = this
      const param = {
        round: this.$route.params.round
      }
      api.postJson('/platform/getVoterListInfoForRound', param).then(response => {
        this.message.ranking = this.$route.params.round
        this.message.voterCycle = that.formatTimed( response.result.timeStampOne / 1000 + (response.result.maxTime / 1000) * (response.result.round - 1) , 'yyyy.MM.dd') + ' - ' + that.formatTimed((response.result.timeStampOne / 1000) + (response.result.maxTime * response.result.round/1000), 'yyyy.MM.dd')
        this.message.blockInterval = (1 + response.result.roundNumber * (response.result.round - 1)) + ' ~ ' + (response.result.roundNumber * response.result.round)
        this.message.minBlock = 1 + response.result.roundNumber * (response.result.round - 1)
        this.message.maxBlock = response.result.roundNumber * response.result.round
        this.message.nowBlock = response.result.nowBlock
        this.message.totalVoterNumber = Math.ceil(helper.getDataFormat(response.result.voterTotal, 18, 10000))
        this.getTranList(this.page)
        this.getVoterList(this.page)
      }).catch((error) => {
        // this.$message.error(error.message)
        // this.dialogVisible = true
        console.error(error)
      })
    },
    getTranList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return
      }

      var that = this
      let status = 1
      that.page = page
      if (parseInt(this.message.nowBlock) > parseInt(this.message.maxBlock)){
        status = 2
      }
      console.log(this.message)
      var param = {
        round: that.message.ranking,
        current: page,
        size: that.prePage,
        status: status,
        address: ''
      }

      api.postJson('/platform/getDposNodeInfo', param).then(response => {
        if (response.statusCode !== 0) {
          that.$message({
            type: 'error',
            message: response.message
          })
        } else {
          if (response.result === null || response.result.total === 0) {
            that.loadText = ''
            that.tranList = []
            
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
              ranking: index + 1 + rand,
              voter: item.voter,
              stake: Math.ceil(helper.getDataFormat(item.stake,18,10000)),
              proportion: (Math.ceil(helper.getDataFormat(item.stake,18,10000)) / that.message.totalVoterNumber * 100).toFixed(2) + '%',
              type: item.type
            }
            newData.push(temp)
            if (device === 1) {
              that.tranList.push(temp)
            }
          })
          if (that.tranList.length === 0 || device === 0) {
            that.tranList = newData
          }

        }
      }).catch((error) => {
        console.error(error)
      })

    },

    getVoterList(page1, device = 0) {
      if (page1 < 1 || (this.totalPages1 > 0 && page1 > this.totalPages1)) {
        return
      }

      var that = this
      let status = 1
      that.page1 = page1
      if (parseInt(this.message.nowBlock) > parseInt(this.message.maxBlock)){
        status = 2
      }
      var param = {
        round:that.message.ranking,
        current: page1,
        size: that.prePage1,
        status: status
      }

      api.postJson('/platform/getDposVoterInfo', param).then(response => {
        if (response.statusCode !== 0) {
          that.$message({
            type: 'error',
            message: response.message
          })
        } else {
          if (response.result === null || response.result.total === 0) {
            that.loadText = ''
            that.voterList = []
            
            return
          }
          var data = response.result.records
          if (data.length < that.prePage1) {
            that.loadText = this.$t('comm.bottomLine')
          }
          that.totalPages1 = response.result.pages
          that.total1 = response.result.total
          const newData = []
          const rand = (that.page1 - 1) * that.prePage1
          var temp = {}
          data.forEach((item, index) => {
            temp = {
              ranking: index + 1 + rand,
              voter: item.voter,
              candiDate: item.candiDate,
              stake: Math.ceil(helper.getDataFormat(item.stake,18,10000)),
              time: item.timeStampOne / 1000 + (item.blockNumber * item.avgBlockTime)
            }
            newData.push(temp)
            if (device === 1) {
              that.voterList.push(temp)
            }
          })
          if (that.voterList.length === 0 || device === 0) {
            that.voterList = newData
          }

        }
      }).catch((error) => {
        // this.$message.error(error.message)
        // this.dialogVisible = true
        console.error(error)
      })
    }


  }
}
</script>

<style scoped>
.accountsinfo-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.accountsinfo-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409EFF;
  height: 3px
}

.accountsinfo-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}

.accountsinfo-container .content-container .top-wrapper .right-wrapper .el-select /deep/ .el-input__inner{
  background: rgba(249,250,252,1);
  border: none;
  height: 34px;
}

.accountsinfo-container /deep/ .el-input--medium .el-input__icon{
  line-height: 40px;
}

.accountsinfo-container /deep/ .el-input--medium .el-input__inner{
  height: 22px;
  padding:0;
  text-align: center;
  border-radius: 8px;
}

</style>
