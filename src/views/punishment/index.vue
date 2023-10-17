<template>
  <div class="accountsinfo-container">
    <div class="top-container">

    </div>
    <div class="content-container list-container punishment" style="margin-top:-170px">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span :class=" isActivity == 0?'is_activity':''" @click="updShowList(0)">{{ $t('voter.dropOut') }}</span>
            <span :class=" isActivity == 1?'is_activity':''" @click="updShowList(1)">{{ $t('voter.punishment') }}</span>
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{ $t('voter.totalDropOut',[total]) }}</span>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getTranList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getTranList(page-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getTranList(page+1)"> &gt; </span>
              <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getTranList(totalPages)">{{ $t('comm.lastPage') }}</span>
            </div>
          </div>
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="tranList" stripe style="width: 100%">
                <el-table-column :label="$t('voterInfo.rounds')" width="150">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.ranking}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.dropOutNode')" width="480">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.addressName}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.dropOutNumber')" width="180">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.deductionAmount}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.dropOutPledge')" prop="pledgeAmount" width="200"/>
                <el-table-column :label="$t('voter.punishmentTime')" prop="time" width="230">
                  <template slot-scope="scope">
                    <span>{{ formatTimed(scope.row.timeStamp/1000, 'yyyy-MM-dd hh:mm:ss') }}</span>
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
                    <span>{{ $t('voter.dropOutNode') }}</span>
                    <span> {{ item.voter }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voter.dropOutNumber') }}</span>
                    <span> {{ item.stake }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voter.dropOutPledge') }}</span>
                    <span>{{ item.proportion }}</span>
                  </div>
                  <div>
                    <span>{{ $t('voter.dropOutTime') }}</span>
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
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getTranList(page+1,1)">
            {{ loadText }}
          </div>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{ $t('voter.totalPunishment',[total1]) }}</span>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span :class="page1 > 1 ? 'cursor' : 'gray' " class="space" @click="getVoterList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page1 > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getVoterList(page1-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page1 }}</span>/<span class="space forcibly-blue">{{ totalPages1 }}</span>
              <span :class="page1 == totalPages1 ? 'gray' : 'page-cursor' " class="space symbol" @click="getVoterList(page1+1)"> &gt; </span>
              <span :class="page1 == totalPages1 ? 'gray' : 'cursor' " @click="getVoterList(totalPages1)">{{ $t('comm.lastPage') }}</span>
            </div>
          </div>
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="voterList" stripe style="width: 100%">
                <el-table-column :label="$t('voterInfo.rounds')" width="150">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.ranking}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.punishmentNode')" width="400">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.address}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.fractionPunishment')" width="150">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.fractions}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.punishmentNumber')" prop="pledgeAmount" width="180"/>
                <el-table-column :label="$t('voter.punishmentReason')" width="160">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type == 1">{{ $t('voter.absentBlock') }}</span>
                    <span v-else>{{ $t('voter.unAbsent') }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.punishmentTime')" prop="time" width="200">
                  <template slot-scope="scope">
                    <span>{{ formatTimed(scope.row.timeStamp/1000, 'yyyy-MM-dd hh:mm:ss') }}</span>
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
                    <span>{{ $t('voter.punishmentNode') }}</span>
                    <span> {{ getAddrFormat(item.address,8) }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voter.fractionPunishment') }}</span>
                    <span> {{ item.fractions }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voter.punishmentNumber') }}</span>
                    <span>{{ item.pledgeAmount }}</span>
                  </div>
                  <div>
                    <span>{{ $t('voter.punishmentReason') }}</span>
                    <span v-if="item.type == 1">{{ $t('voter.absentBlock') }}</span>
                    <span v-else>{{ $t('voter.unAbsent') }}</span>
                  </div>
                  <div>
                    <span>{{ $t('voter.punishmentTime') }}</span>
                    <span>{{ formatTimed(item.timeStamp/1000, 'yyyy-MM-dd hh:mm:ss') }}</span>
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
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getVoterList(page1+1,1)">
            {{ loadText }}
          </div>
        </div>
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
      message:{}
    }
  },
  created() {
    this.message = this.$route.params
  },
  mounted() {
    this.getTranList(this.page)
    this.getVoterList(this.page)
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
        current: page,
        size: that.prePage
      }

      api.postJson('/platform/getNodeExitForRn', param).then(response => {
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
              addressName: item.addressName,
              deductionAmount: helper.getDataFormat(item.deductionAmoun,18,10000).toFixed(4) + ' NFC',
              pledgeAmount: helper.getDataFormat((item.pledgeAmount-item.tractAmount-item.deductionAmount),18,10000).toFixed(4) + ' NFC',
              timeStamp: item.timeStamp
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

      api.postJson('/platform/getPunished', param).then(response => {
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
              address: item.address,
              fractions: item.fractions,
              pledgeAmount: helper.getDataFormat(item.pledgeAmount,18,10000).toFixed(4) + ' NFC',
              timeStamp: item.timeStamp,
              type:item.type
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
