<template>
  <div class="accounts-container ">
    <div class="top-container">

    </div>
    <div class="content-container">
      <div class="block-container">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t('voter.voter') }}</span>
              <span>{{ $t('voter.currentVoterNumber',[total]) }}</span>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getAddrList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getAddrList(page-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getAddrList(page+1)"> &gt; </span>
              <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getAddrList(totalPages)">{{ $t('comm.lastPage') }}</span>
              <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
              <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
            </div>
          </div>
          <div class="list-wrapper">
            <div class="display-pc-and-pad">
              <el-table :data="tableData" :cell-style="cellStyle" stripe style="width: 100%">
                <el-table-column :label="$t('voter.voterRounds')" prop="ranking" width="200">
                  <template slot-scope="scope">
                    <span>{{ $t('voter.rounds',[scope.row.ranking]) }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.voterCycle')" prop="voterCycle" width="240"/>
                <el-table-column :label="$t('voter.blockInterval')" prop="blockInterval" width="200"/>
                <el-table-column :label="$t('voter.totalVoterNumber')" prop="totalVoterNumber" width="200"/>
                <el-table-column :label="$t('voter.voterStatus')" width="200">
                  <template slot-scope="scope">
                    <span v-if="scope.row.nowBlock < scope.row.minBlock">{{ $t('voter.notStarted') }}</span>
                    <span v-else-if="scope.row.nowBlock > scope.row.maxBlock" class="red">{{ $t('voter.over') }}</span>
                    <span v-else class="lightBlue"> {{ $t('voter.processing') }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('voter.operating')" width="200">
                  <template slot-scope="scope">
                    <el-button type="text" size="medium" @click="goToUrl(scope.row.ranking)" class="equal-width">{{ $t('voter.details') }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div v-for="(item, index) in tableData" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                  <div>{{ item.voterCycle }}</div>
                  <!-- <div @click="goToUrl(item.contract)" class="equal-width">{{ getAddrFormat(item.contract,12) }}</div> -->
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('voter.blockInterval') }}</span>
                    <span> {{ item.blockInterval }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voter.totalVoterNumber') }}</span>
                    <span>{{ item.totalVoterNumber }}</span>
                  </div>
                  <div>
                    <span>{{ $t('voter.voterStatus') }}</span>
                    <span  v-if="item.nowBlock < item.minBlock">{{ $t('voter.notStarted') }}</span>
                    <span v-else-if="item.nowBlock > item.maxBlock" class="red">{{ $t('voter.over') }}</span>
                    <span v-else class="lightBlue"> {{ $t('voter.processing') }} </span>
                  </div>
                  <div>
                    <span>{{ $t('voter.operating') }}</span>
                    <span @click="goToUrl(item.ranking)">{{ $t('voter.details') }}</span>
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
                  <el-select v-model="prePage" :placeholder="$t('comm.selected')" size="mini" @change="getAddrList(page)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('comm.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getAddrList(1)">{{ $t('comm.firstPage') }}</span>
                <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getAddrList(page-1)"> &lt; </span>
                <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getAddrList(page+1)"> &gt; </span>
                <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getAddrList(totalPages)">{{ $t('comm.lastPage') }}</span>
                <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
                <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getAddrList(currPage)" ></el-input></span>
                <span>{{ $t("comm.page")}}</span> -->
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getAddrList(page+1,1)">
            {{ loadText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'

export default {
  name: 'Accounts',
  data() {
    return {
      page: 1,
      prePage: 15,
      totalPages: 0,
      total: 0,
      showNumbers: [{
        value: 15,
        label: '15'
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
      tableData: [],
      gasUsedRate: 20,
      loadText: this.$t('comm.clickLoad'),
      currPage:1,
      selRow: {},
    }
  },
  created() {
    // let width = document.documentElement.clientWidth
    // this.$parent.showheader(false)
    // this.$parent.showfooter(false)

    this.getAddrList(this.page)
  },
  mounted() {

  },
  methods: {
    formatTimed(timestamp, format) {
      return helper.formatTime(timestamp, format)
    },
    cellStyle(row, column, rowIndex, columnIndex) { 
    //   if (row.column.label === this.$t('accounts.addr')) {
    //     // return 'color:rgba(64, 112, 244, 1)'
    //   }
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number)
    },

    goToUrl(contract) {
      helper.goPathUrl(this, 'Voterinfo', contract)
      /*
      this.selRow = Object.assign({}, record)
      this.$router.push({
        name: 'Voterinfo', 
        params: this.selRow
      })
      */
    },

    getAddrList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return
      }

      var that = this

      that.page = page
      var param = {
        current: page,
        size: that.prePage
      }

      api.postJson('/platform/getVoterListInfo', param).then(response => {
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
              ranking: item.round,
              voterCycle: that.formatTimed( item.timeStampOne / 1000 + (item.maxTime / 1000) * (item.round - 1) , 'yyyy.MM.dd') + ' - ' + that.formatTimed((item.timeStampOne / 1000) + (item.maxTime * item.round/1000), 'yyyy.MM.dd'),
              blockInterval: (1 + item.roundNumber * (item.round - 1)) + ' ~ ' + (item.roundNumber * item.round),
              minBlock: 1 + item.roundNumber * (item.round - 1),
              maxBlock: item.roundNumber * item.round,
              nowBlock: item.nowBlock,
              totalVoterNumber: Math.ceil(helper.getDataFormat(item.voterTotal,18,10000))
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
    }
  }
}
</script>

<style scoped>
.accounts-container /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  border: none;
}

.accounts-container /deep/ .el-slider__runway.disabled .el-slider__bar {
  background-color: #409EFF;
  height: 3px
}

.accounts-container /deep/ .el-slider__runway {
  height: 3px;
  margin: 0;
}

.accounts-container /deep/ .el-button--text{
  color: #4A7BD3;
}

.accounts-container /deep/ .el-input--medium .el-input__inner{
  height: 22px;
  padding:0;
  text-align: center;
  border-radius: 8px;
}

</style>
