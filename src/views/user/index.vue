<template>
  <div class="accounts-container ">
    <div class="top-container">

    </div>
    <div class="coins-release">
      <h2>{{ $t('user.title') }}</h2>
      <div class="coins-submit" v-show="secondStep">
        <div class="coins-message-form">
          <div class="coins-message">
            <div class="coins-message-label">{{ $t('user.email') }}</div>
            <div class="coins-message-content">{{userInfo.email}}</div>
          </div>
          <div class="coins-message">
            <div class="coins-message-label">{{ $t('coins.paymentAddress') }}</div>
            <div class="coins-message-content" v-show="!isBind">{{userInfo.payAddress}}<span class="changeAddress" @click="changeAddress">{{ $t('coins.modify') }}</span></div>
            <div class="coins-message-input" v-show="isBind">
              <el-input
                v-model.trim="userInfo.payAddress"
                name="sendAddress"
                type="input"
                auto-complete="on"
              />
              <span @click="bindAddress">{{ $t('coins.sure') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'
import { getToken, getUser } from '@/utils/auth'
export default {
  name: 'Accounts',
  data() {
    return {
      secondStep: true,
      isBind: false,
      userInfo:{
        email: null,
        payAddress: null
      },
      receiveInfo:{
        receivingAddress: '',
        receivingAmount: ''
      },
      sendAddress: '',
      orderNo: null
    }
  },
  created() {
    this.info()
  },
  methods: {

    info() {
      if(getUser('user') === undefined || getUser('user') === null){
        this.$router.push( '/login' )
        return false
      }


      api.userGet('/customer/getCustomerInfo').then((res,err) => {
        this.userInfo = res.data
        this.sendAddress = res.data.payAddress
        if(res.data.payAddress==null) {
          this.dialogBindVisible = true
        }

      })
      api.userPostJson('/customer/getReceivingPaymentInfo').then((res,err) => {
        this.receiveInfo = res.data
      })
    },
    changeAddress(){
      this.isBind = true
    },
    bindAddress(){
      const params = {
        payAddress:this.userInfo.payAddress,
        orderNo: '0'
      }
      api.userGet('/customer/bindPayAddress',params).then((res,err) => {
        if(res.data){
          this.$message.success('OK!')
          this.isBind = false
          this.info()
        }else{
          this.$message.error(res.mesg)
        }
      })
    }
  }
}
</script>

