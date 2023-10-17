<template>
  <div class="accountsinfo-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container">
        <div class="detail-info">
          <div class="left-wrapper" style="width:100%">
            <div class="title" style="margin-bottom:16px;">
              {{ $t('node.punishRecharge') }}
            </div>
            <div class="content" style="padding-left: 100px;padding-top:10px;padding-bottom:10px;margin:0 auto;">
              <div>
                <span>{{ $t('node.nodeAddress') }} :</span>
                {{ message.node_address}}
              </div>
              <div>
                <span>{{ $t('node.RechargeCreditScore') }} :</span>
                {{message.fractions}}
              </div>
              <div>
                <span>{{ $t('node.estimatedPayment') }} :</span>
                {{message.estimatedpayment}}
              </div>
              <div style="padding-left: 200px;">
                 <el-button type="text" size="medium" @click="goToUrl(message)" class="equal-width">{{ $t('node.recharge') }}</el-button>                
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
            <span>{{ $t('node.rechargeRecord') }}</span>        
          </div>
        </div>
        <div class="list-wrapper">         
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="tranList" stripe style="width: 100%">
                <el-table-column :label="$t('node.rechargeAddress')" prop="fromAddr" />
                <el-table-column :label="$t('node.nodeAddress')" prop="nodeaddress"/>
                <el-table-column :label="$t('node.valueNFC')" prop="value"/>
                <el-table-column :label="$t('node.rechargeTime')" prop="timestamp"/>
                <el-table-column :label="$t('node.rechargeHeight')" prop="blocknumber"/>               
              </el-table>
            </div>
            <div class="display-phone">
              <div v-for="(item, index) in tranList" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('node.rechargeAddress') }}</span>
                    <span> {{ getAddrFormat(item.fromAddr,8) }} </span>
                  </div>
                  <div>
                    <span>{{ $t('node.nodeAddress') }}</span>
                    <span> {{ item.nodeaddress }} </span>
                  </div>
                  <div>
                    <span>{{ $t('node.valueNFC') }}</span>
                    <span>{{ item.value }}</span>
                  </div>
                  <div>
                    <span>{{ $t('node.rechargeTime') }}</span>
                    <span>{{ item.timestamp }}</span>
                  </div>
                  <div>
                    <span>{{ $t('node.rechargeHeight') }}</span>
                    <span>{{ item.blocknumber }}</span>
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
                  <el-select v-model="prePage" :placeholder="$t('comm.selected')" size="mini" @change="getRechargeList(page)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('comm.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getRechargeList(1)">{{ $t('comm.firstPage') }}</span>
                <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getRechargeList(page-1)"> &lt; </span>
                <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
                <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getRechargeList(page+1)"> &gt; </span>
                <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getRechargeList(totalPages)">{{ $t('comm.lastPage') }}</span>               
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getRechargeList(page+1,1)">
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
      prePage: 10,    
      totalPages: 0,      
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
      tranList: [],      
      timer: {},
      copyData: '',
      recodeDialogVisible: false,
      streamLoadText: this.$t('comm.clickLoad'),
      loadText: this.$t('comm.clickLoad'),
      currPage:1,
      currStreamPage:1,
      message:{
        node_address:'',
        node_type: 0,
        pledge_amount: 0,        
        punilshamount: 0,
        releaseday: 0,
        time: '',
        estimatedpayment:0,
        pledgeAmount:0,
      }
    }
  },
  created() {   
    this.info()
  },
  mounted() {
    // 
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
        node_address:this.$route.params.round
      }
      api.postJson('/platform/node/getcadnode', param).then(response => {
        this.message.node_address = response.result.node_address
        this.message.node_type = response.result.node_type
        this.message.pledge_amount= helper.getDataFormat(response.result.pledge_amount, 18, 10000)
        this.message.fractions = response.result.fractions       
        this.message.releaseday = response.result.releaseday
        this.message.join_time = response.result.join_time 
        this.getPledgeAmount()     
      }).catch((error) => {
        // this.$message.error(error.message)
        // this.dialogVisible = true
        console.error(error)
      })
     
    },

    
    getPledgeAmount(){
       const param = { }
       api.postJson('/platform/node/getNodePledgeAmount', param).then(response => {
        this.message.pledgeAmount = Math.ceil(helper.getDataFormat(response.result.NODE_PLEDGE_AMOUNT, 18, 10000))   
        if(typeof this.message.fractions === 'undefined') 
          this.message.estimatedpayment=''
        else
          this.message.estimatedpayment=(Math.ceil(helper.getDataFormat(response.result, 18, 10000)) / 100) * parseInt(this.message.fractions) + ' NFC'
      }).catch((error) => {       
        console.error(error)
      })
    },


   
    getRechargeList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return
      }

      var that = this
      let status = 1
      that.page = page
     
      
      var param = {
        param1: this.$route.params.round,
        txType: 'CandPnsh',
        current: page,
        size: that.prePage,       
        address: ''
      }

      api.postJson('/platform/getTxRecord', param).then(response => {
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
              nodeaddress: item.param1,
              fromAddr: item.fromAddr,
              blocknumber: item.blocknumber,
              value: item.value,
              timestamp: item.timestamp
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
