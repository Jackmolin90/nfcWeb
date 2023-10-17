<template>
  <div class="accountsinfo-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container">
        <div class="detail-info">
          <div class="left-wrapper" style="width:100%">
            <div class="title" style="margin-bottom:16px;">
              {{ $t('node.nodepledge') }}
            </div>
            <div class="content" style="padding-left: 100px;padding-top:10px;padding-bottom:10px;margin:0 auto;">
              <div>
                <span>{{ $t('node.address') }} :</span>
                 <el-input v-model="pledgeaddress" :placeholder="$t('node.address')" @keyup.enter.native="seachData(1)" style="width:400px;" />
              </div>
              <div>
                <span>{{ $t('node.pledgeAmount') }} :</span>
                {{message.pledgeAmount}}
              </div>              
              <div style="padding-left: 200px;">
                 <el-button type="text" size="medium" @click="goToUrl(pledgeaddress)" class="equal-width">{{ $t('node.pledge') }}</el-button>                
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
            <span>{{ $t('node.pledgerecord') }}</span>        
          </div>
        </div>
        <div class="list-wrapper">         
          <div class="voter-node">
            <div class="display-pc-and-pad">
              <el-table :data="pledgeList" stripe style="width: 100%">
                  <el-table-column :label="$t('node.serialnumber')" type="index" width="100" :index='(index)=>{return (index+1) + (this.page-1)*this.prePage}'/>  
                <el-table-column :label="$t('node.address')" prop="address" />
                <el-table-column :label="$t('node.pledgeAmount')" prop="pledgenum"/>
                <el-table-column :label="$t('node.blockNumber')" prop="blocknumber"/>
                <el-table-column :label="$t('node.pledgetime')" prop="pledgetime"/>          
              </el-table>
            </div>
            <div class="display-phone">
              <div v-for="(item, index) in pledgeList" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('node.address') }}</span>
                    <span> {{ getAddrFormat(item.address,8) }} </span>
                  </div>
                  <div>
                    <span>{{ $t('node.pledgeAmount') }}</span>
                    <span> {{ item.pledgeAmount }} </span>
                  </div>
                  <div>
                    <span>{{ $t('node.blockNumber') }}</span>
                    <span>{{ item.blockNumber }}</span>
                  </div>
                  <div>
                    <span>{{ $t('node.pledgetime') }}</span>
                    <span>{{ item.pledgetime }}</span>
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
                <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getPledgeList(1)">{{ $t('comm.firstPage') }}</span>
                <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getPledgeList(page-1)"> &lt; </span>
                <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
                <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getPledgeList(page+1)"> &gt; </span>
                <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getPledgeList(totalPages)">{{ $t('comm.lastPage') }}</span>               
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getPledgeList(page+1,1)">
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
      pledgeList: [],  
      pledgeaddress:'',
      pledgenum:'',
      timer: {},
      copyData: '',
      recodeDialogVisible: false,
      streamLoadText: this.$t('comm.clickLoad'),
      loadText: this.$t('comm.clickLoad'),
      currPage:1,
      currStreamPage:1,
      message:{        
        pledgeAmount: 0
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
      const param = { }
      api.postJson('/platform/node/getNodePledgeAmount', param).then(response => {
        this.message.pledgeAmount = Math.ceil(helper.getDataFormat(response.result.NODE_PLEDGE_AMOUNT, 18, 10000))  + ' NFC'       
      }).catch((error) => {       
        console.error(error)
      })
    },

    seachData(){
      this.tableData = []
      this.getPledgeList(1)      
    },

    
    getPledgeList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return
      }
      var that = this
      let status = 1
      that.page = page   
      var param = {
        param1: that.pledgeaddress,
        txType:'CandReq',
        current: page,
        size: that.prePage       
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
            that.pledgeList = []
            
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
              address: item.param1,
              pledgenum: helper.getDataFormat(item.value,18,10000).toFixed(4) + ' NFC',
              blocknumber: item.blocknumber,
              pledgetime: item.timeStamp
            }
            newData.push(temp)
            if (device === 1) {
              that.pledgeList.push(temp)
            }
          })
          if (that.pledgeList.length === 0 || device === 0) {
            that.pledgeList = newData
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
  /*
  background: rgba(249,250,252,1);
  border: none;
  */
  height: 34px;
}

.accountsinfo-container /deep/ .el-input--medium .el-input__icon{
  line-height: 40px;
}

.accountsinfo-container /deep/ .el-input--medium .el-input__inner{
  height: 25px;
  padding:0;
  text-align: left;
  /*border-radius: 8px;*/
}

</style>
