<template>
  <div class="accountsinfo-container ">
    <div class="top-container">

    </div>
    <div class="content-container">
      <div class="block-container">
        <div v-if="!accInfo.is1155" class="detail-wrapper detail-info">
          <div class="left-wrapper">
            <div class="title info-title">
              <p style="margin-bottom:10px;">{{ accInfo.name }}</p>
              <span style="color: #B3BDC8;">{{ accInfo.description }}</span>
            </div>
            <div class="content">
              <div class="info-p">
                <span class="info-span">{{ $t('token.Abbreviation') }}</span>{{ accInfo.symbol }}
              </div>
              <div class="info-p">
                <span class="info-span">{{ $t('token.totalNumber') }}</span>{{ accInfo.totalSupply }}
              </div>
              <div class="info-p">
                <span class="info-span">{{ $t('token.holder') }}</span>{{ accInfo.accountTotal }}
              </div>
              <div class="display-pad-and-phone info-p">
                <span class="info-span">{{ $t('token.tokenAddress') }}</span>{{ getAddrFormat(accInfo.contract,8) }}
              </div>
              <div class="display-pad-and-phone info-p">
                <span class="info-span">{{ $t('token.decimal') }}</span>{{ accInfo.decimals }}{{ $t('token.bit') }}
              </div>
            </div>
          </div>
          <div class="right-wrapper">
            <div class="title">
              <span>{{ $t('token.tokenAddress') }}</span>
            </div>
            <div class="content">
              <div>{{ accInfo.contract }}</div>
            </div>
            <div class="right-info-title">
              <span>{{ $t('token.decimal') }}</span>{{ accInfo.decimals }}{{ $t('token.bit') }}
            </div>
          </div>
        </div>
        <div v-else class="detail-wrapper detail-info">
          <div class="left-wrapper" style="width:100%;">
            <div class="content">
              <div class="display-pc-and-pad info-p">
                <span class="info-span">{{ $t('token.tokenAddress') }}</span>{{ accInfo.contractManager }}
              </div>
              <div class="display-pad-and-phone info-p">
                <span class="info-span">{{ $t('token.tokenAddress') }}</span>{{ getAddrFormat(accInfo.contractManager, 8) }}
              </div>
              <div class="info-p">
                <span class="info-span">{{ $t('token.holder') }}</span>{{ accInfo.accountTotal }}
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
            <span :class=" isActivity == 0?'is_activity':''" @click="updShowList(0)">{{ $t('home.tran') }}</span>
            <span :class=" isActivity == 1?'is_activity':''" @click="updShowList(1)">{{ $t('token.holder') }}</span>
          <!-- <span :class=" isActivity == 2?'is_activity':''" @click="isActivity = 2">验证区块</span> -->
          </div>
        </div>
        <div v-if="isActivity == 0" class="list-wrapper">
          <div v-if="tranList.length == 0" class="general-no-data">
            {{ $t('comm.noData') }}
          </div>
          <div class="display-pc-and-pad">
            <div v-for="(item, index) in tranList" :key="index" class="item-wrapper">
              <div class="content">
                <div class="img">
                  <img src="/static/images/default.png">
                </div>
                <div class="item tran-addr">
                  <div>
                    <!--<span class="tran-title">{{ $t('home.tran') }} #  </span>--><span class="cursor equal-width" @click="goTheUrl(item)">{{ item.tranAddr }}</span>
                  </div>
                  <div>
                    <!-- <span class="tran-title">{{ $t('home.from') }}</span> -->
                    <span class="cursor" @click="goToUrl('Accountsinfo',item.from)">
                      <span class="display-pc equal-width">{{ getAddrFormat(item.from,10) }}</span>
                      <span class="display-pad equal-width">{{ getAddrFormat(item.from,8) }}</span>
                    </span>
                    <img src="/static/images/to.png" alt="">
                    <!-- <span class="tran-title margin-left20">{{ $t('home.to') }}</span> -->
                    <span class="cursor" @click="goToUrl('Accountsinfo',item.to)">
                      <span class="display-pc equal-width">{{ getAddrFormat(item.to,10) }}</span>
                      <span class="display-pad equal-width">{{ getAddrFormat(item.to,8) }}</span>
                    </span>
                  </div>
                </div>
                <div class="item">
                  <div class="text-center">
                    {{ $t('home.tranValue') }}
                  </div>
                  <div>
                    {{ item.tranValue }}
                  </div>
                </div>
                <div class="item">
                  <div class="text-center">
                    {{ $t('home.handleFee') }}
                  </div>
                  <div>
                    {{ item.handFee }}
                  </div>
                </div>
                <div class="item">
                  <div class="cursor forcibly-blue" @click="goToUrl('Blockinfo',item.block)">
                    {{ item.block }}
                  </div>
                  <div>
                    <span class="status">{{ $t('comm.success') }}</span><span> {{ formatTime(item.time) }}{{ $t('comm.before') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="display-phone">
            <div v-for="(item, index) in tranList" :key="index" class="item-wrapper" >
              <div class="top">
                <div class="left">
                  <div class="img">
                    <img :src="item.img">
                  </div>
                  <div>
                    <h2 class="cursor" @click="goToUrl('Blockinfo',item.block)">
                      {{ item.block }}
                    </h2>
                    <h3>
                      {{ formatTime(item.time) }}{{ $t('comm.before') }}
                    </h3>
                  </div>
                </div>
                <div class="right">
                  {{ $t('comm.success') }}
                </div>
              </div>
              <div class="item-content">
                <div>
                  <!--<span class="tran-title">{{ $t('home.tran') }} #  </span>--><span class="cursor equal-width" @click="goTheUrl(item)">{{ getAddrFormat(item.tranAddr,12) }}</span>
                </div>
                <div>
                  <!-- <span class="tran-title">{{ $t('home.from') }}</span> -->
                  <span class="cursor equal-width" @click="goToUrl('Accountsinfo',item.from)">{{ getAddrFormat(item.from,5) }}</span>
                  <img src="/static/images/to.png" alt="">
                  <!-- <span class="tran-title">{{ $t('home.to') }}</span> -->
                  <span class="cursor equal-width" @click="goToUrl('Accountsinfo',item.to)">{{ getAddrFormat(item.to,5) }}</span>
                </div>
                <div>
                  <span class="text-center">{{ $t('home.tranValue') }}</span><span>{{ item.tranValue }}</span>
                </div>
                <div>
                  <span class="text-center">{{ $t('home.handleFee') }}</span><span>{{ item.handFee }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="display-pc-and-pad">
            <div class="bottom-wrapper">
              <div class="left-wrapper">
                <div v-if="isActivity != 1">
                  <span>{{ $t('comm.show') }}</span>
                  <span>
                    <el-select v-model="prePage" :placeholder="$t('comm.selected')" size="mini" @change="getTranList(page)">
                      <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </span>
                  <span>{{ $t('comm.records') }}</span>
                </div>
              </div>
              <div class="page-wrapper">
                <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getTranList(1)">{{ $t('comm.firstPage') }}</span>
                <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getTranList(page-1)"> &lt; </span>
                <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
                <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getTranList(page+1)"> &gt; </span>
                <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getTranList(totalPages)">{{ $t('comm.lastPage') }}</span>
                <!-- <span class="span-goto">{{ $t("comm.goto")}}</span>
              <span><el-input class="input-page" v-model="currPage" @keyup.enter.native="getTranList(currPage)" ></el-input></span>
              <span>{{ $t("comm.page")}}</span> -->
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getTranList(page+1,1)">
            {{ $t('comm.clickLoad') }}
          </div>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
          <!-- <div v-if="voterList.length == 0" class="general-no-data">
            {{ $t('comm.noData') }}
          </div> -->
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span class="voter-note">{{ $t('token.currentPeopleNumber',[total1]) }}</span>
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
                <el-table-column :label="$t('voterInfo.rounds')" width="150">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.ranking}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('accounts.addr')" width="850">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.address}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('token.quantity')" width="240">
                  <template slot-scope="scope">
                    <span style="color:#2D353B">{{scope.row.balance}}</span>
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
                    <span>{{ $t('accounts.addr') }}</span>
                    <span>{{ item.address }}</span>
                  </div>
                  <div>
                    <span>{{ $t('token.quantity') }}</span>
                    <span>{{ item.balance}}</span>
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
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'
import { setValue, getValue } from '@/utils/auth'
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
      accAddr: null,
      accInfo: null,
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
      voterList: [],
      tableData: [],
      gasUsedRate: 20,
      isActivity: 0, 
      tranList: [],
      timer: {},
      copyData: '',
      recodeDialogVisible: false,
      streamLoadText: this.$t('comm.clickLoad'),
      loadText: this.$t('comm.clickLoad'),
      currPage:1,
      currStreamPage:1,
    }
  },


  created() {
    if(this.$route.params.name == undefined && getValue('accAddr') != ''){
      this.accAddr = JSON.parse(getValue('accAddr'))
    }else{

      this.accAddr = this.$route.params
      console.log(this.accAddr)
    }
    if(this.$route.params.name == undefined && getValue('accInfo') != ''){
      this.accInfo = JSON.parse(getValue('accInfo'))
    }else{
      this.accInfo = this.$route.params

    }
    setValue('tran', '')
    // this.getAccountsInfo()
    this.getTranList(this.page)
    this.getVoterList(this.page1)
  },

  methods: {

    updShowList(type) {
      this.isActivity = type

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

    goTheUrl(params) {
      setValue('tran', params)
      helper.goTheUrl(this, 'Tokendetail', params)
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number)
    },

   
    getAccountsInfo() {
      var that = this
      const param = {
        address: that.accAddr.contract
      }

      api.postJson('/platform/getTokensDescription', param).then(response => {
        if (response.result == null) {
          helper.goPathUrl(that, 'Search', that.accAddr.contract)
        } else {
          that.accInfo = response.result
        }
      }).catch((error) => {
        // helper.goPathUrl(that, 'Search', that.accAddr)
        this.$message.error(error.ErrMsg)
        // this.dialogVisible = true
        // console.error(error)
      })
    },

    getTranList(page, device = 0) {

      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return
      }

      var that = this

      that.page = page
      if(that.accAddr.is1155){
        var param = {
          address: that.accAddr.contractAddress,
          current: page,
          size: that.prePage
        }
      }else{
        var param = {
          address: that.accAddr.contract,
          current: page,
          size: that.prePage
        }
      }

      api.postJson('/platform/getTransTokenListForContract', param).then(response => {
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
          var temp = {}
          data.forEach(item => {
            temp = {
              img: '/static/images/default.png',
              block: item.blockNumber,
              time: item.timeStamp,
              status: that.$t('comm.success'),
              tranAddr: item.transHash,
              from: item.fromAddr,
              to: item.toAddr,
              tranValue: item.amount + ' ' + (this.accInfo.symbol ? this.accInfo.symbol : ''),
              handFee: helper.getDataFormat(item.gasUsed * item.gasPrice,18,10000).toFixed(4) + ' NFC',
              // handFee: helper.getDataFormat(item.gasUsed * item.gasPrice,18,10000).toFixed(4) + ' ' + (this.accInfo.symbol ? this.accInfo.symbol : ''),
              symbol: this.accInfo.symbol ? this.accInfo.symbol : ''
            }
            newData.push(temp)
            if (device === 1) {
              that.tranList.push(temp)
            }
          })
          if (that.tranList.length === 0 || device === 0) {
            that.tranList = newData
          }
          that.timer = setInterval(() => {
            that.tranList.forEach(item => {
              item.time++
            })
          }, 1000)
        }
      }).catch((error) => {
        // this.$message.error(error.message)
        // this.dialogVisible = true
        // console.error(error)
      })
    },
    getVoterList(page1, device = 0) {
      if (page1 < 1 || (this.totalPages1 > 0 && page1 > this.totalPages1)) {
        return
      }

      var that = this
      let status = 1
      that.page1 = page1
      if(that.accAddr.is1155){
        var param = {
          current: page1,
          size: that.prePage1,
          address: that.accAddr.contractAddress,
        }
      }else{
        var param = {
          current: page1,
          size: that.prePage1,
          address: that.accAddr.contract,
        }
      }


      api.postJson('/platform/getAddressInfoList', param).then(response => {
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
              balance: helper.getDataFormat(item.balance,18,10000).toFixed(4)
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
        // console.error(error)
      })
    },


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
