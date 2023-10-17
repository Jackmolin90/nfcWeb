<template>
  <div class="accounts-container ">
    <div class="top-container">

    </div>
    <div class="content-container">
      <div class="block-container">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t('coins.myToken') }}</span>
              <span>{{ $t('coins.currentToken',[total]) }}</span>
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
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column :label="$t('lock.order')" prop="ranking" width="80"/>
                <el-table-column :label="$t('api.token')">
                  <template slot-scope="scope">
                    <span>{{scope.row.coinName}}</span>
                    <p>{{scope.row.description}}</p>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('coins.tokenAbbreviation')" prop="coinCode" width="150"/>
                <el-table-column :label="$t('token.tokenAddress')" width="180">
                  <template slot-scope="scope">
                    <span>{{ getAddrFormat(scope.row.contractManageAddress,8) }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('coins.number')" prop="circulationTotal" width="150"/>
                <el-table-column :label="$t('coins.decimal')" prop="keepDecimal" width="120"/>
                <el-table-column :label="$t('coins.status')" width="100">
                  <template slot-scope="scope">
                    <span class="token-success" v-if="scope.row.contractStauts === 3">{{$t('comm.success')}}</span>
                    <span class="token-error" v-if="scope.row.contractStauts === 4">{{$t('coins.error')}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('coins.remarks')" width="180">
                  <template slot-scope="scope">
                   <span v-if="scope.row.contractStauts === 4"> {{scope.row.failInfo}} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('coins.operate')" width="140">
                  <template slot-scope="scope">
                    <span v-if="scope.row.contractStauts == 4" class="token-btn" @click="goTheUrl('MyTokenInfo',scope.row.orderNo,scope.row.coinType)">{{$t('coins.detail')}}</span>
                    <span v-if="scope.row.contractStauts == 4" class="token-line">|</span>
                    <span v-if="scope.row.contractStauts == 4 && scope.row.payStatus != 2" class="token-btn" @click="goToUrl('Coins',scope.row.orderNo)"> {{$t('coins.retry')}}</span>
                    <span v-if="scope.row.contractStauts == 4 && scope.row.payStatus == 2" class="token-btn" @click="retry(scope.row.orderNo)"> {{$t('coins.retry')}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div v-for="(item, index) in tableData" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div style="color:#fff">{{ item.ranking }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('api.token') }}</span>
                    <span> {{ item.coinName }} </span>
                  </div>
                  <div>
                    <span>{{ $t('coins.intro') }}</span>
                    <span>{{ item.description }}</span>
                  </div>
                  <div>
                    <span>{{ $t('coins.tokenAbbreviation') }}</span>
                    <span>{{ item.coinCode }}</span>
                  </div>
                  <div>
                    <span>{{ $t('token.tokenAddress') }}</span>
                    <span>{{ getAddrFormat(item.contractManageAddress,8) }}</span>
                  </div>
                  <div>
                    <span>{{ $t('coins.number') }}</span>
                    <span> {{ item.circulationTotal }} </span>
                  </div>
                  <div>
                    <span>{{ $t('coins.decimal') }}</span>
                    <span>{{ item.keepDecimal }}</span>
                  </div>
                  <div>
                    <span>{{ $t('coins.status') }}</span>
                    <span v-if="item.contractStauts === 3">{{$t('comm.success')}}</span>
                    <span v-else-if="item.contractStauts === 4">{{$t('coins.error')}}</span>
                    <span v-else></span>
                  </div>
                  <div>
                    <span>{{ $t('coins.remarks') }}</span>
                    <span>{{ item.failInfo }}</span>
                  </div>
                  <div>
                    <span>{{ $t('coins.operate') }}</span>
                    <span v-if="item.contractStauts === 4" class="token-btn" @click="goTheUrl('MyTokenInfo',item.orderNo,item.coinType)">{{$t('coins.detail')}}</span>
                    <span v-if="item.contractStauts === 4">|</span>
                    <span v-if="item.contractStauts === 4 && item.payStatus !== 2" class="token-btn" @click="goToUrl('Coins',item.orderNo)"> {{$t('coins.retry')}}</span>
                    <span v-if="item.contractStauts === 4 && item.payStatus === 2" class="token-btn" @click="retry(item.orderNo)"> {{$t('coins.retry')}}</span>
                    <span v-else></span>
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
            {{ $t('comm.clickLoad') }}
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="detail-dialog" :visible.sync="dialogPvVisible" :title="$t('coins.sureTitle')" :close-on-click-modal="closeModal">
      <div class="dialog-text">
        <div class="dialog-text-title"> {{ $t('coins.sureRetry') }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPvVisible = false">
          {{ $t('comm.close') }}
        </el-button>
        <el-button type="primary" @click="again">
          {{ $t('coins.sure') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'

export default {
  name: 'Accounts',
  data() {
    return {
      closeModal: false,
      page: 1,
      prePage: 10,
      totalPages: 0,
      dialogPvVisible: false,
      total: 0,
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
      tableData: [],
      gasUsedRate: 20,
      loadText: this.$t('comm.clickLoad'),
      currPage:1,
      orderNo: null,

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


    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number)
    },

    goTheUrl(name, orderNo , coinType) {
      console.log(coinType)
      if (coinType == 2){
        helper.goTheUrl(this, 'MyTokenInfo', { orderNo: orderNo, is1155: true })
      }else{
        helper.goTheUrl(this, 'MyTokenInfo', { orderNo: orderNo, is1155: false })
      }

      // helper.goPathUrl(this, name, params)
    },
    goToUrl(name, orderNo , coinType) {
      helper.goPathUrl(this, name, params)
    },
    retry(orderNo){
      this.orderNo = orderNo
      this.dialogPvVisible = true
    },
    again(orderNo){
      const params = {
        orderNo: this.orderNo
      }
      api.userGet('/contract-order/republish',params).then((res,err) => {
        if(res.data){
          this.$message.success(this.$t('comm.success'))
          this.dialogPvVisible = false
          this.getAddrList(this.page)
        }else{
          this.$message.success(res.mesg)
        }
      })
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

      api.userPostJson('/contract-order/contractOrderByCustomerList', param).then(response => {

          var data = response.records
          if (data.length < that.prePage) {
            that.loadText = this.$t('comm.bottomLine')
          }
          that.totalPages = response.pages
          that.total = response.total
          const newData = []
          const rand = (that.page - 1) * that.prePage
          var temp = {}
          data.forEach((item, index) => {
            temp = {
              ranking: index + 1 + rand,
              coinName: item.coinName,
              description: item.description,
              coinCode: item.coinCode,
              circulationTotal: item.circulationTotal,
              contractManageAddress: item.contractManageAddress,
              keepDecimal: item.keepDecimal,
              contractStauts: item.contractStauts,
              failInfo: item.failInfo,
              orderNo: item.orderNo,
              payStatus: item.payStatus
            }
            newData.push(temp)
            if (device === 1) {
              that.tableData.push(temp)
            }
          })
          if (that.tableData.length === 0 || device === 0) {
            that.tableData = newData
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
