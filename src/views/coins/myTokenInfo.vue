<template>
  <div class="accounts-container ">
    <div class="top-container">

    </div>
    <div class="coins-release">
      <h2>{{ $t('coins.title') }}</h2>
      <div class="progress">

      </div>
      <div class="coins-forward" v-show="forwardConfirm">
        <div class="coins-forward-status">
          <i class="forward-i"></i>
          <p>{{ $t('coins.payConfirm') }}</p>
          <span>{{ $t('coins.payConfirmLabel') }}</span>
          <p><el-progress :percentage="percentage" :status="status"></el-progress></p>
        </div>
        <div class="coins-forward-message">
          <p><span>{{ $t('coins.collectionAddress') }}</span>{{getAddrFormat(receiveInfo.receivingAddress,10) || '-'}}</p>
          <p><span>{{ $t('coins.paymentAddress') }}</span>{{getAddrFormat(userInfo.payAddress,10) || '-'}}</p>
          <p><span>{{ $t('coins.payNumber') }}</span>{{receiveInfo.receivingAmount || '-'}}</p>
        </div>
      </div>
      <div class="coins-forward" v-show="forwardSuccess">
        <div class="coins-forward-status">
          <i class="success-i"></i>
          <p>{{ $t('coins.paySuccess') }}</p>
        </div>
        <div class="coins-forward-message">
          <p v-if="!is1155"><span>{{ $t('coins.name') }}</span>{{contractOrderInfo.coinName || '-'}}</p>
          <p v-if="!is1155"><span>{{ $t('coins.abbreviation') }}</span>{{contractOrderInfo.coinCode || '-'}}</p>
          <p v-if="!is1155"><span>{{ $t('coins.number') }}</span>{{contractOrderInfo.circulationTotal || '-'}}</p>
          <p><span>{{ $t('coins.manageAddress') }}</span>{{contractOrderInfo.contractAddress || '-'}}</p>
          <p v-if="!is1155"><span>{{ $t('coins.intro') }}</span>{{contractOrderInfo.description || '-'}}</p>
        </div>
        <div class="coins-forward-button" @click="goToUrl('MyToken','')">{{ $t('coins.view') }}</div>
      </div>
      <div class="coins-forward" v-show="forwardError">
        <div class="coins-forward-status">
          <i class="error-i"></i>
          <p>{{$t('tokenInfo.issueFail')}}</p>
        </div>
        <div class="coins-forward-message">
          <p><span>{{$t('tokenInfo.reasonTitle')}}</span>{{$t('tokenInfo.unpaid')}}</p>
          <div class="coins-forward-text">{{$t('tokenInfo.label')}}</div>
          <p><span>{{$t('tokenInfo.address')}}</span>{{getAddrFormat(receiveInfo.receivingAddress,10) || '-'}}</p>
          <p><span>{{$t('tokenInfo.number')}}</span>{{receiveInfo.receivingAmount || '-'}} NFC</p>
        </div>
        <div class="coins-forward-button" @click="goToUrl('MyToken','')">{{$t('tokenInfo.see')}}</div>
      </div>
      <div class="coins-forward" v-show="forwardErrorOther">
        <div class="coins-forward-status">
          <i class="error-i"></i>
          <p>{{$t('tokenInfo.issueFail')}}</p>
        </div>
        <div class="coins-forward-message">
          <p><span>{{$t('tokenInfo.reasonTitle')}}</span>{{$t('tokenInfo.deploy')}}</p>
          <p>{{contractOrderInfo.failInfo || '-'}}</p>
        </div>
        <div class="coins-forward-button" @click="goToUrl('MyToken','')">{{$t('tokenInfo.see')}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'
import { getToken } from '@/utils/auth'
export default {
  name: 'Accounts',
  data() {
    return {
      forwardConfirm: false,
      percentage: 0,
      status: null,
      // forwardConfirm1: false,
      // forwardConfirm2: false,
      forwardSuccess: false,
      forwardError: false,
      forwardErrorOther: false,
      userInfo:{
        email: '',
        payAddress: ''
      },
      receiveInfo:{
        receivingAddress: '',
        receivingAmount: ''
      },
      orderNo: null,
      time: null,
      timer: null,
      is1155: false,
      contractOrderInfo: {
        coinName: '',
        coinCode: '',
        circulationTotal: '',
        contractAddress: '',
        description: '',
        failInfo: '',
      }
    }
  },
  created() {
    this.orderNo = this.$route.params.orderNo
    this.is1155 = this.$route.params.is1155
    this.info()
  },
  methods: {
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number)
    },
    goToUrl(name, params) {
      helper.goPathUrl(this, name, params)
    },
    info() {
      let that = this
      api.userGet('/customer/getCustomerInfo').then((res,err) => {
        this.userInfo = res.data
      })
      api.userPostJson('/customer/getReceivingPaymentInfo').then((res,err) => {
        this.receiveInfo = res.data
      })
      this.contractStatus()

      // that.forwardConfirm = true
      that.time = setInterval(() => {
        if(that.percentage < 99){
          that.percentage += 1
        }else{
          that.percentage = 99
          clearInterval(that.time)
        }
      }, 400)


        let count = 0
        that.timer = setInterval(() => {
          if(count < 6){
            count ++
            this.contractStatus()
          }else{
            clearInterval(that.timer)
          }
        }, 600000)

    },
    contractStatus() {
      let that = this
      api.userGet('/contract-order/contractOrderInfo',{orderNo:that.orderNo}).then((res,err) => {
        if(res.data){
          that.contractOrderInfo = res.data
          if(res.data.payStatus === 1){
            that.forwardConfirm = true
            that.forwardSuccess = false
            that.forwardError = false
            that.forwardErrorOther = false

          }else if(res.data.payStatus === 3){
            that.forwardConfirm = false
            that.forwardSuccess = false
            that.forwardError = true
            that.forwardErrorOther = false
            that.percentage = 100

            clearInterval(that.timer)
          }else{
            if(res.data.contractStauts === 1){
              that.forwardConfirm = true
              that.forwardSuccess = false
              that.forwardError = false
              that.forwardErrorOther = false

            }else if(res.data.contractStauts === 2){
              that.forwardConfirm = true
              that.forwardSuccess = false
              that.forwardError = false
              that.forwardErrorOther = false

            }else if(res.data.contractStauts === 3){
              that.forwardConfirm = false
              that.forwardSuccess = true
              that.forwardError = false
              that.forwardErrorOther = false
              that.percentage = 100

              clearInterval(that.timer)
            }else if(res.data.contractStauts === 4){
              that.forwardConfirm = false
              that.forwardSuccess = false
              that.forwardError = false
              that.forwardErrorOther = true
              that.percentage = 100

              clearInterval(that.timer)
            }
          }
        }else{
          that.forwardConfirm = true
          that.forwardSuccess = false
          that.forwardError = false
          that.forwardErrorOther = false
        }
      })
    }
  }
}
</script>

