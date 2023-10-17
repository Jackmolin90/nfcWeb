<template>
  <div class="accounts-container ">
    <div class="top-container">

    </div>
    <div class="content-container">
      <div class="block-container">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>{{ $t('absent.absentRecord') }}</span>
              <span>{{ $t('absent.currentAbsentNumber',[total]) }}</span>
            </div>
            <div class="search display-pc-and-pad">
              <div>
                <el-input v-model="searchInput" :placeholder="$t('absent.absentSearch')" @keyup.enter.native="seachData()" />
              </div>
              <div class="search-title" @click="seachData()">
              </div>
            </div>
            <div class="page-wrapper display-pc-and-pad">
              <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getAbsentBlockList(1)">{{ $t('comm.firstPage') }}</span>
              <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getAbsentBlockList(page-1)"> &lt; </span>
              <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getAbsentBlockList(page+1)"> &gt; </span>
              <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getAbsentBlockList(totalPages)">{{ $t('comm.lastPage') }}</span>            
            </div>
          </div>
          <div class="list-wrapper">
            <div class="display-pc-and-pad">
              <el-table :data="tableData" :cell-style="cellStyle" stripe style="width: 100%">
               <el-table-column :label="$t('ftable.order')" type="index" width="60" :index='(index)=>{return (index+1) + (this.page-1)*this.prePage}'/>           
                <el-table-column :label="$t('absent.address')" prop="address" min-width="160px" show-overflow-tooltip/>
                <el-table-column :label="$t('absent.blockNumber')" prop="blockNumber"/>
                <el-table-column :label="$t('absent.punishScore')" prop="fractions"/>
                <el-table-column v-if="false" :label="$t('absent.punishPledgeNumber')" width="200px" >
                   <template slot-scope="scope">
                    <span>{{ scope.row.totalPledgeAmount }}  </span>                
                  </template>
                </el-table-column>
                <el-table-column :label="$t('absent.punishCause')">
                 <template slot-scope="scope">
                    <span v-if="scope.row.type == 1">  {{ $t('absent.absentType1') }} </span>
                    <span v-else-if="scope.row.type == 2"> {{ $t('absent.absentType2') }} </span>                   
                  </template>
                </el-table-column>
                <el-table-column :label="$t('absent.punishTime')" prop="timeStamp"/>
              </el-table>
            </div>
            <div class="display-phone">
              <div class="phone-search">
                <div>
                  <el-input v-model="searchInput" :placeholder="$t('absent.absentSearch')" @keyup.enter.native="seachData()" />
                </div>
                <div class="search-title" @click="seachData()">
                </div>
              </div>
              <div v-for="(item, index) in tableData" :key="index" class="item-wrapper" >
                <div class="addr">
                  <div>{{ index }}</div>
                  <div>
                    <span style="color:#4A7BD3"> {{ getAddrFormat(item.address,12) }} </span>
                  </div>
                </div>
                <div class="other">
                  <div>
                    <span>{{ $t('absent.punishScore') }}</span>
                    <span>{{ item.fractions }}</span>
                  </div>
                  <div v-if="false">
                    <span>{{ $t('absent.punishPledgeNumber') }}</span>
                    <span>{{ item.pledgeamount }} NFC</span>
                  </div>
                  <div>
                    <span>{{ $t('absent.punishCause') }}</span>
                    <span v-if="item.type == 1"> CN {{ $t('absent.absentType1') }} </span>
                    <span v-else-if="item.type == 2"> EN {{ $t('absent.absentType2') }} </span> 
                  </div>
                  <div>
                    <span>{{ $t('absent.punishTime') }}</span>
                    <span>{{ item.timeStamp }}</span>
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
                  <el-select v-model="prePage" :placeholder="$t('comm.selected')" size="mini" @change="getAbsentBlockList(page)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('comm.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="page > 1 ? 'cursor' : 'gray' " class="space" @click="getAbsentBlockList(1)">{{ $t('comm.firstPage') }}</span>
                <span :class="page > 1 ? 'page-cursor' : 'gray' " class="space symbol" @click="getAbsentBlockList(page-1)"> &lt; </span>
                <span class="forcibly-blue">{{ page }}</span>/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span :class="page == totalPages ? 'gray' : 'page-cursor' " class="space symbol" @click="getAbsentBlockList(page+1)"> &gt; </span>
                <span :class="page == totalPages ? 'gray' : 'cursor' " @click="getAbsentBlockList(totalPages)">{{ $t('comm.lastPage') }}</span>                
              </div>
            </div>
          </div>
          <div class="load-more display-phone" @click="getAbsentBlockList(page+1,1)">
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
  name: 'Absent',
  data() {
    return {
      page: 1,
      prePage: 15,
      totalPages: 0,
      total: 0,
      searchInput: null,
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
    }
  },
  created() {
    this.getAbsentBlockList(this.page)
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

    goToUrl(contract) {
     // helper.goPathUrl(this, 'Accountsinfo', contract)
    },
    seachData(){
      this.tableData = []
      this.getAbsentBlockList(1)
    },
   
    getAbsentBlockList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return
      }

      var that = this

      that.page = page
      var param = {
        current: page,
        size: that.prePage,        
        address: that.searchInput
      }

      api.postJson('/platform/nfc/getPunished', param).then(response => {
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

            item.order=index + 1 + rand
            item.totalPledgeAmount=helper.getDataFormat(item.pledgeAmount,18,10000).toFixed(4) + ' NFC'
           /* temp = {
              order: index + 1 + rand,
              status: item.status,
              pledgeAddress: item.address,
              totalPledgeAmount: helper.getDataFormat(item.value,18,10000).toFixed(4) + ' NFC'
            }*/
            newData.push(item)
            if (device === 1) {
              that.tableData.push(item)
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
