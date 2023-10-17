<template>
  <div class="accounts-container ">
    <div class="top-container">

    </div>
    <div class="content-container">
      <div class="block-container">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t('accounts.addr') }}</span>
              <span></span>
              <!-- <span>{{ $t('accounts.currentAddrNumber',[total]) }}</span> -->
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
                <el-table-column :label="$t('ftable.order')" prop="ranking" width="100"/>
                <el-table-column :label="$t('accounts.addr')" prop="contract" min-width="180">
                  <template slot-scope="scope">
                    <el-button type="text" size="medium" @click="goToUrl(scope.row.contract)" class="equal-width">{{ scope.row.contract }}</el-button>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('accounts.balance')" prop="balance" />
                <el-table-column :label="$t('accounts.market')" prop="proportion" />
                <el-table-column :label="$t('accounts.tranTotal')" prop="tran"  >
                  <template slot-scope="scope">
                    <span>{{ scope.row.tran }}</span>
                  </template>
                </el-table-column>
                 <el-table-column v-if="false" :label="$t('lock.lock')" prop="haslock" width="100">
                    <template slot-scope="scope">
                    <span>
                        <el-button  type='text' :disabled="!(scope.row.haslock)"  @click="goToUrl(scope.row.contract,'lock')"  color="red">{{$t('coins.check')}}</el-button>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="display-phone">
              <div v-for="(item, index) in tableData" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div>{{ item.ranking }}</div>
                  <div @click="goToUrl(item.contract)" class="equal-width">{{ getAddrFormat(item.contract,12) }}</div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('accounts.balance') }}</span>
                    <span> {{ item.balance }} </span>
                  </div>
                  <div>
                    <span>{{ $t('accounts.market') }}</span>
                    <span>{{ item.proportion }}</span>
                  </div>
                  <div>
                    <span>{{ $t('accounts.tranTotal') }}</span>
                    <span>{{ item.tran }}</span>
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
  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'
import utils from '@/utils/utils'
export default {
  name: 'Accounts',
  data() {
    return {
      page: 1,
      prePage: 10,
      totalPages: 0,
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

    cellStyle(row, column, rowIndex, columnIndex) { 
    //   if (row.column.label === this.$t('accounts.addr')) {
    //     // return 'color:rgba(64, 112, 244, 1)'
    //   }
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number)
    },

    goToUrl(contract,path='Accountsinfo') {

      helper.goPathUrl(this, path, contract)
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

      api.postJson('/platform/getAddressList', param).then(response => {
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
              ranking: index + 1 + rand,
              contract: item.address,
              balance: `${utils.clearZero(item.balance,8)} NFC`,
              proportion: `${utils.weedZero((helper.getDataFormat(item.balance,18,10000)/2100000000)*100,8)}%`,
              // proportion: item.proportion,
              // tran: that.$t('accounts.totalTran', [item.nonce + item.toCount])
              tran: item.toCount,
              haslock:item.haslock
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
<style>
.el-button.is-disabled{
  color:#C0C4CC !important;
}
</style>
