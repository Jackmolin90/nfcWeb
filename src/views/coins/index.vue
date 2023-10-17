<template>
  <div class="accounts-container ">
    <div class="top-container">

    </div>
    <div class="coins-release">
      <h2>{{ $t('coins.title') }}</h2>
      <div class="coins-form" v-show="firstStep">
        <el-form v-show="!is1155" ref="coinForm" :model="coinsForm" :rules="coinsRules" auto-complete="on" label-position="left">
          <span class="form-label">*{{ $t('coins.type') }}</span>
          <el-form-item class="form-input" prop="coinType">
            <el-select v-model="coinsForm.coinType" :placeholder="$t('comm.selected')" clearable style="width:100%" @change="handleSelect">
              <el-option v-for="item in nodeTypeList" :key="item.value" :label="item.status" :value="item.value" />
            </el-select>
          </el-form-item>
          <span class="form-label">*{{ $t('coins.name') }}</span>
          <el-form-item class="form-input" prop="coinName">
            <el-input
              v-model.trim="coinsForm.coinName"
              name="coinName"
              type="text"
              auto-complete="on"
              maxlength="30"
            />
          </el-form-item>
          <span class="form-label">*{{ $t('coins.abbreviation') }}</span>
          <el-form-item class="form-input" prop="coinCode">
            <el-input
              v-model.trim="coinsForm.coinCode"
              name="coinCode"
              type="text"
              auto-complete="on"
              maxlength="9"
            />
          </el-form-item>
          <span class="form-label">*{{ $t('coins.number') }}</span>
          <el-form-item class="form-input" prop="circulationTotal">
            <el-input
              v-model.trim="coinsForm.circulationTotal"
              name="circulationTotal"
              type="text"
              auto-complete="on"
              maxlength="11"
              onkeyup="value=value.replace(/[^\d]/g,'')"
            />
          </el-form-item>
          <span class="form-label">*{{ $t('coins.decimal') }}</span>
          <el-form-item class="form-input" prop="keepDecimal">
            <el-input
              v-model.trim="coinsForm.keepDecimal"
              name="keepDecimal"
              type="text"
              auto-complete="on"
              maxlength="2"
              onkeyup="value=value.replace(/[^\d]/g,'')"
            />
          </el-form-item>
          <span class="form-label">*{{ $t('coins.address') }}</span>
          <el-form-item class="form-input" prop="contractManageAddress">
            <el-input
              v-model.trim="coinsForm.contractManageAddress"
              name="contractManageAddress"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <span class="form-label">*{{ $t('coins.intro') }}</span>
          <el-form-item class="form-input" prop="description">
            <el-input
              v-model.trim="coinsForm.description"
              name="description"
              type="textarea"
              auto-complete="on"
              maxlength="400"
            />
          </el-form-item>
          <el-button type="primary" class="form-btn" @click.native.prevent="release">{{ $t('coins.next') }}</el-button>
        </el-form>
        <el-form v-show="is1155" :model="coinsForm1155" ref="coinForm1155" :rules="coinsRules1155" auto-complete="on" label-position="left">
          <span class="form-label">*{{ $t('coins.type') }}</span>
          <el-form-item class="form-input" prop="coinType">
            <el-select v-model="coinsForm.coinType" :placeholder="$t('comm.selected')" clearable style="width:100%" @change="handleSelect">
              <el-option v-for="item in nodeTypeList" :key="item.value" :label="item.status" :value="item.value" />
            </el-select>
          </el-form-item>
          <span class="form-label">*{{ $t('coins.address') }}</span>
          <el-form-item class="form-input" prop="contractManageAddress">
            <el-input
              v-model.trim="coinsForm1155.contractManageAddress"
              name="contractManageAddress"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-button v-show="!is1155" type="primary" class="form-btn" @click.native.prevent="release">{{ $t('coins.next') }}</el-button>
          <el-button v-show="is1155" type="primary" class="form-btn" @click.native.prevent="release1155">{{ $t('coins.next') }}</el-button>
        </el-form>
      </div>
      <div class="coins-submit" v-show="secondStep">
        <div class="coins-prompt">
          <i></i>
          <p>
            <span>{{ $t('coins.reminderTitle') }}</span>
            {{ $t('coins.reminderContent') }}
          </p>
        </div>
        <div class="coins-message-form">
          <div class="coins-message">
            <div class="coins-message-title"><i class="to"></i>  {{ $t('coins.collectionMessage') }}</div>
            <div class="coins-message-label">{{ $t('coins.collectionAddress') }}</div>
            <div class="coins-message-content">{{receiveInfo.receivingAddress}}</div>
          </div>
          <div class="coins-message">
            <div class="coins-message-title"><i class="from"></i>  {{ $t('coins.paymentMessage') }}</div>
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
          <div class="coins-message">
            <div class="coins-message-label">{{ $t('coins.payNumber') }}</div>
            <div class="coins-message-content">{{receiveInfo.receivingAmount}} NFC</div>
          </div>
           <div class="coin-message-btn" @click="handleClick">{{ $t('coins.confirm') }}</div>
        </div>
      </div>
      <!--
      <div class="coins-forward" v-show="forwardConfirm">
        <div class="coins-forward-status">
          <i class="forward-i"></i>
          <p>{{ $t('coins.payConfirm') }}</p>
          <span>{{ $t('coins.payConfirmLabel') }}</span>
        </div>
        <div class="coins-forward-message">
          <p><span>{{ $t('coins.collectionAddress') }}</span>{{receiveInfo.receivingAddress || '-'}}</p>
          <p><span>{{ $t('coins.paymentAddress') }}</span>{{userInfo.payAddress || '-'}}</p>
          <p><span>{{ $t('coins.payNumber') }}</span>{{receiveInfo.receivingAmount || '-'}}</p>
        </div>
      </div>
      <div class="coins-forward" v-show="forwardSuccess">
        <div class="coins-forward-status">
          <i class="success-i"></i>
          <p>{{ $t('coins.paySuccess') }}</p>
        </div>
        <div class="coins-forward-message">
          <p><span>{{ $t('coins.name') }}</span>{{contractOrderInfo.coinName || '-'}}</p>
          <p><span>{{ $t('coins.abbreviation') }}</span>{{contractOrderInfo.coinCode || '-'}}</p>
          <p><span>{{ $t('coins.number') }}</span>{{contractOrderInfo.circulationTotal || '-'}}</p>
          <p><span>{{ $t('coins.manageAddress') }}</span>{{contractOrderInfo.contractAddress || '-'}}</p>
          <p><span>{{ $t('coins.intro') }}</span>{{contractOrderInfo.description || '-'}}</p>
        </div>
        <div class="coins-forward-button" @click="goToUrl('MyToken','')">{{ $t('coins.view') }}</div>
      </div>
      <div class="coins-forward" v-show="forwardError">
        <div class="coins-forward-status">
          <i class="error-i"></i>
          <p>{{ $t('tokenInfo.issueFail') }}</p>
        </div>
        <div class="coins-forward-message">
          <p><span>{{ $t('tokenInfo.reasonTitle') }}</span>{{ $t('tokenInfo.unpaid') }}</p>
          <div class="coins-forward-text">{{ $t('tokenInfo.label') }}</div>
          <p><span>{{ $t('tokenInfo.address') }}</span>{{receiveInfo.receivingAddress || '-'}}</p>
          <p><span>{{ $t('tokenInfo.number') }}</span>{{receiveInfo.receivingAmount || '-'}} NFC</p>
        </div>
        <div class="coins-forward-button" @click="goToUrl('MyToken','')">{{ $t('tokenInfo.see') }}</div>
      </div>
      <div class="coins-forward" v-show="forwardOther">
        <div class="coins-forward-status">
          <i class="error-i"></i>
          <p>{{ $t('tokenInfo.issueFail') }}</p>
        </div>
        <div class="coins-forward-message">
          <p><span>{{ $t('tokenInfo.reasonTitle') }}</span>{{ $t('tokenInfo.deploy') }}</p>
          <p>{{contractOrderInfo.failInfo || '-'}}</p>
        </div>
        <div class="coins-forward-button" @click="goToUrl('MyToken','')">{{ $t('tokenInfo.see') }}</div>
      </div>
      -->
    </div>
    <el-dialog class="detail-dialog" :visible.sync="dialogBindVisible" :title="$t('coins.bind')" :show-close="showClose" :close-on-click-modal="closeClickModel" :close-on-press-escape="closeEscape">
      <div class="dialog-text">
        <div class="dialog-text-title">{{ $t('coins.bindAddress') }}</div>
        <div class="dialog-text-content">
          <el-input
            v-model.trim="sendAddress"
            name="sendAddress"
            type="input"
            auto-complete="on"
            class="dialog-input"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bindFirstAddress">
          {{ $t('coins.sure') }}
        </el-button>
      </span>
    </el-dialog>
    <el-dialog class="detail-dialog" :visible.sync="dialogPvVisible" :title="$t('coins.release')" :close-on-click-modal="closeModal">
      <div class="dialog-text">
        <div class="dialog-text-title">{{ $t('tokenInfo.label') }}</div>
        <div class="dialog-text-content">
          <p><span>{{ $t('coins.paymentAddress') }}</span>{{receiveInfo.receivingAddress}}</p>
          <p><span>{{ $t('coins.payNumber') }}</span>{{receiveInfo.receivingAmount}} NFC</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPvVisible = false">
          {{ $t('comm.close') }}
        </el-button>
        <el-button type="primary" @click="sumbit">
          {{ $t('coins.sure') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'
import { getToken, getUser, setValue, getValue } from '@/utils/auth'
export default {
  name: 'Accounts',
  data() {
    return {
      closeEscape: false,
      closeClickModel: false,
      showClose: false,
      closeModal: false,
      dialogBindVisible: false,
      dialogPvVisible: false,
      firstStep: true,
      secondStep: false,
      isBind: false,
      forwardConfirm: false,
      forwardSuccess: false,
      forwardError: false,
      forwardOther: false,
      coinsForm: {
        coinType: null,
        circulationTotal: null,
        coinCode: null,
        coinName: null,
        contractManageAddress: null,
        description: null,
        keepDecimal: null
      },
      coinsForm1155: {
        contractManageAddress: null
      },
      loginForm: {
        username: '',
        password: '',
        googleCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      nodeSelectType: null,
      nodeTypeList: [
        { status: 'NRC20', value: '1' },
        { status: 'NRC1155', value: '2' }
      ],
      userInfo:{
        email: null,
        payAddress: null
      },
      receiveInfo:{
        receivingAddress: '',
        receivingAmount: ''
      },
      sendAddress: '',
      orderNo: null,
      contractOrderInfo: {
        coinType: null,
        circulationTotal: null,
        coinCode: null,
        coinName: null,
        contractAddress: null,
        description: null,
        failInfo: null
      },
      timer: {},
      is1155: false
    }
  },
  computed:{
    coinsRules(){
      return {
        coinType: [{ required: true, message: this.$t('validate.coinType'), trigger: 'change' }],
        circulationTotal: [{ required: true, message: this.$t('validate.circulationTotal'), trigger: 'blur' }],
        coinCode: [{ required: true, message: this.$t('validate.coinCode'), trigger: 'blur' }],
        coinName: [{ required: true, message: this.$t('validate.coinName'), trigger: 'blur' }],
        contractManageAddress: [{ required: true, message: this.$t('validate.contractManageAddress'), trigger: 'blur' }],
        description: [{ required: true, message: this.$t('validate.description'), trigger: 'blur' }],
        keepDecimal: [{ required: true, message: this.$t('validate.keepDecimal'), trigger: 'blur' }]
      }
    },
    coinsRules1155(){
      return {
        contractManageAddress: [{ required: true, message: this.$t('validate.contractManageAddress'), trigger: 'blur' }]
      }
    }
  },
  created() {
    this.orderNo = this.$route.params.id
    this.info()
  },
  methods: {
    goToUrl(name, params) {
      helper.goPathUrl(this, name, params)
    },
    info() {
      if(getUser('user') === undefined || getUser('user') === null){
        this.$router.push( '/login' )
        return false
      }
      const params = {
        orderNo: this.orderNo
      }
      api.userGet('/customer/getCustomerInfo').then((res,err) => {
        this.userInfo = res.data
        this.sendAddress = res.data.payAddress
        if(res.data.payAddress==null) {
          this.dialogBindVisible = true
          this.sendAddress = ''
        }
        
      })
      api.userPostJson('/customer/getReceivingPaymentInfo').then((res,err) => {
        this.receiveInfo = res.data
      })
      api.userGet('/contract-order/contractOrderInfo',params).then((res,err) => {
        if(res.data){
          this.coinsForm = res.data
          if(res.data.coinType === 1){
            this.coinsForm.coinType = 'NRC20'
          }else{
            this.coinsForm.coinType = 'NRC721'
          }
        }
      })
    },
    handleClick(){
      if(this.userInfo.payAddress === ''){
        this.$message.error(this.$('validate.payAddress'))
        return false
      }
      this.dialogPvVisible = true
    },
    release() {
      this.$refs['coinForm'].validate(valid => {
        if (valid) {
          let nodeSelectType = 1
          const params = {
            coinType: nodeSelectType,
            circulationTotal: this.coinsForm.circulationTotal - 0,
            coinCode: this.coinsForm.coinCode,
            coinName: this.coinsForm.coinName,
            contractManageAddress: this.coinsForm.contractManageAddress,
            description: this.coinsForm.description,
            keepDecimal: this.coinsForm.keepDecimal - 0
          }
          api.userPostJson('/contract-order/createContractOrder', params).then((res,err) => {
            if(res.data){
              this.firstStep = false
              this.secondStep = true
              this.orderNo = res.data

            }else{
              this.$message.error(res.mesg)
            }
          })
        }
      })
    },
    release1155() {
      this.$refs['coinForm1155'].validate(valid => {
        if (valid) {
          const contractManageAddress = this.coinsForm1155.contractManageAddress
          api.userPostJson('/contract-order/createContractOrder1155', contractManageAddress).then((res,err) => {
            if(res.data){
              this.firstStep = false
              this.secondStep = true
              this.orderNo = res.data
            }else{
              this.$message.error(res.mesg)
            }
          })
        }
      })
    },
    next() {
      this.firstStep = false
      this.secondStep = true
      this.forwardConfirm = false
      this.dialogPvVisible = false
      this.forwardSuccess = false
      this.forwardError = false
      this.forwardOther = false
      if(this.userInfo.payAddress===null){
        this.isBind = false
      }else{
        this.isBind = true
      }

    },
    changeAddress(){
      this.isBind = true
    },
    sumbit(){
      // this.$router.push('/myTokenInfo/' + this.orderNo )
      helper.goTheUrl(this, 'MyTokenInfo', { orderNo: this.orderNo, is1155: this.is1155 })
    },
    bindAddress(){
      let that = this
      const params = {
        payAddress:that.userInfo.payAddress,
        orderNo: that.orderNo
      }
      api.userGet('/customer/bindPayAddress',params).then((res,err) => {
        if(res.data){
          that.$message.success(that.$('coins.success'))
          that.isBind = false
          that.info()
        }else{
          that.$message.error(res.mesg)
        }
      })
    },
    bindFirstAddress(){
      let that = this
      const params = {
        payAddress:that.sendAddress,
        orderNo: that.orderNo
      }
      api.userGet('/customer/bindPayAddress',params).then((res,err) => {
        if(res.data){
          that.$message.success(res.mesg)
          that.dialogBindVisible = false
          that.isBind = false
          that.info()
        }else{
          that.$message.error(res.mesg)
        }
      })
    },
    handleSelect(val){
      if(val == 2){
        this.is1155 = true
      }else{
        this.is1155 = false
      }
    }
  }
}
</script>

