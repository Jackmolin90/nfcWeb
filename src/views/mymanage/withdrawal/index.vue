<template>
   <div class="accountsinfo-container ieHome" style="min-height: 500px">
     <div class="content-container">
        <div class="content-wrapper">
            <div style="width: 100%; text-align: center; padding: 20px">
              <el-form
                ref="form"         
                :model="form"
                label-width="auto"
                style="max-width: 500px; margin: 10px auto; text-align: left"
                >           
                    <el-form-item :label="$t('mymanageExtract.walletaddress')" prop="walletaddress">
                        <span>{{ form.walletaddress }}</span> 
                    </el-form-item>  

                    <el-form-item :label="$t('mymanageExtract.contractaddress')" prop="contractaddress">
                        <span>{{ form.contractaddress }}</span> 
                    </el-form-item>      
                    <el-form-item :label="$t('mymanageExtract.lockedquantity')" prop="lockedquantity">
                        <span>{{ form.lockedquantity }}</span>            
                    </el-form-item>

                    <el-form-item :label="$t('mymanageExtract.extractquantity')" prop="extractquantity">
                        <span>{{ form.extractquantity }}</span>            
                    </el-form-item>

                    <el-form-item :label="$t('mymanageExtract.extractablequantity')" prop="extractablequantity">
                        <span>{{ form.extractablequantity }}</span>            
                    </el-form-item>

                    <el-form-item>
                    <el-button
                        v-loading="loading"                             
                        type="primary"                           
                        size="medium"
                        @click="onSubmit"
                        :disabled="!btnShow"
                        >{{ $t("mymanageExtract.extract") }}</el-button>
                    </el-form-item>
                    <el-form-item></el-form-item>
                </el-form>                    
            </div>
        </div>
    </div>

    <div class="content-container">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span
              :class="isActivity == 0 ? 'is_activity' : ''"
              @click="isActivity = 0"
              >{{ $t("mymanageExtract.exchangerecord") }}</span
            >
            <span
              :class="isActivity == 1 ? 'is_activity' : ''"
              @click="isActivity = 1"
              >{{ $t("mymanageExtract.transactionrecord") }}</span
            >
          </div>
        </div>
        <div v-if="isActivity == 0">
            <f-table
                :search="false"
                :url="'/platform/getNfcExchgList'"
                :table-heard="tableExchangeHeard"
                :param="getParamExchang"
                :show-action="false"
                :data-utils="dataUtils"           
                :total-text="totalText"
                :show-overflow-tooltip="true"
            >       
                <template slot="col_applyHash" slot-scope="scope">
                    <span >
                    {{ getAddrFormat( scope.data.applyHash, 7)  }}
                    </span>
                </template>
                <template slot="col_exchgHash" slot-scope="scope">
                    <span >
                    {{ getAddrFormat( scope.data.exchgHash, 7)  }}
                    </span>
                </template>
                 <template slot="col_transTime" slot-scope="scope">
                    <span >
                    {{ formatTimed( scope.data.transTime/ 1000,"yyyy-MM-dd hh:mm:ss")  }}
                    </span>
                </template>
            </f-table>
        </div>
        <div v-if="isActivity == 1" class="list-wrapper">
             <div class="block-container display-pc-and-pad">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">             
              <span>{{ $t("mymanageExtract.currentTranNumber", [total]) }}</span>
            </div>           
          </div>
          <div class="list-wrapper">
            <div
              v-for="(item, index) in tranList"
              :key="index"
              class="item-wrapper"
            >
              <div class="content">
                <div class="img">
                  <img src="/static/images/default.png" />
                </div>
                <div class="item tran-addr">
                  <div>
                    <span
                      class="cursor equal-width"
                      @click="goToUrl('txnsinfo', item.tranAddr)"
                      >{{ item.tranAddr }}</span
                    >
                  </div>
                  <div>                  
                    <span
                      class="cursor"
                      @click="goToUrl('accountsinfo', item.from)"
                    >
                      <span class="display-pc equal-width">{{
                        getAddrFormat(item.from, 10)
                      }}</span>
                      <span class="display-pad equal-width">{{
                        getAddrFormat(item.from, 8)
                      }}</span>
                    </span>
                    <img src="/static/images/to.png" alt="" />                  
                    <span
                      class="cursor"
                      @click="goToUrl('accountsinfo', item.to)"
                    >
                      <span class="display-pc equal-width">{{
                        getAddrFormat(item.to, 10)
                      }}</span>
                      <span class="display-pad equal-width">{{
                        getAddrFormat(item.to, 8)
                      }}</span>
                    </span>
                  </div>
                </div>
                <div class="item">
                  <div class="text-center">
                    {{ $t("mymanageExtract.extractNumber") }}
                  </div>
                  <div>
                    {{ item.extractNum }}
                  </div>
                </div>
                <!--
                <div class="item">
                  <div class="text-center">
                    {{ $t("mymanageExtract.tranValue") }}
                  </div>
                  <div>
                    {{ item.tranValue }}
                  </div>
                </div>
                -->
                <div class="item">
                  <div class="text-center">
                    {{ $t("mymanageExtract.handleFee") }}
                  </div>
                  <div>
                    {{ item.handFee }}
                  </div>
                </div>
                
                <div class="item">
                  <div class="cursor" @click="goToUrl('Blockinfo', item.block)">
                    {{ item.block }}
                  </div>
                  <div>
                    <span v-if="item.status == 1" class="status">{{
                      $t("comm.success")
                    }}</span>
                    <span v-else style="color: red">{{ $t("comm.fail") }}</span>
                    <span>
                      {{ formatTime(item.time)
                      }}{{ false ? $t("comm.before") : "" }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="left-wrapper">
              <span>{{ $t("comm.show") }}</span>
              <span>
                <el-select
                  v-model="prePage"
                  :placeholder="$t('comm.selected')"
                  size="mini"
                  @change="getTranList(page)"
                >
                  <el-option
                    v-for="item in showNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </span>
              <span>{{ $t("comm.records") }}</span>
            </div>
            <div class="page-wrapper">
              <span
                :class="page > 1 ? 'cursor' : 'gray'"
                class="space"
                @click="getTranList(1)"
                >{{ $t("comm.firstPage") }}</span
              >
              <span
                :class="page > 1 ? 'page-cursor' : 'gray'"
                class="space symbol"
                @click="getTranList(page - 1)"
              >
                &lt;
              </span>
              <span class="forcibly-blue">{{ page }}</span
              >/<span class="space forcibly-blue">{{ totalPages }}</span>
              <span
                :class="page == totalPages ? 'gray' : 'page-cursor'"
                class="space symbol"
                @click="getTranList(page + 1)"
              >
                &gt;
              </span>
              <span
                :class="page == totalPages ? 'gray' : 'cursor'"
                @click="getTranList(totalPages)"
                >{{ $t("comm.lastPage") }}</span
              >            
            </div>
          </div>
        </div>
          </div>
          <div class="block-container display-phone">
            <div class="content-wrapper">
              <div class="top-wrapper">
                <div class="left-wrapper">            
                  <span>{{ $t("mymanageExtract.currentTranNumber", [total]) }}</span>
                </div>
                <div class="right-wrapper"></div>
              </div>
              <div v-loading="isLoading" class="list-wrapper">
                <div
                  v-for="(item, index) in tranList"
                  :key="index"
                  class="item-wrapper"
                >
                  <div class="top">
                    <div class="left">
                      <div class="img">
                        <img :src="item.img" />
                      </div>
                      <div>
                        <h2
                          class="cursor"
                          @click="goToUrl('Blockinfo', item.block)"
                        >
                          {{ item.block }}
                        </h2>
                        <h3>
                          {{ formatTime(item.time)
                          }}{{ false ? $t("comm.before") : "" }}
                        </h3>
                      </div>
                    </div>
                    <div class="right">
                      {{ $t("comm.success") }}
                    </div>
                  </div>
                  <div class="item-content">
                    <div>
                    <span
                        class="cursor"
                        @click="goToUrl('txnsinfo', item.tranAddr)"
                        >{{ getAddrFormat(item.tranAddr, 12) }}</span
                      >
                    </div>
                    <div>               
                      <span
                        class="cursor"
                        @click="goToUrl('accountsinfo', item.from)"
                        >{{ getAddrFormat(item.from, 5) }}</span
                      >
                      <img src="/static/images/to.png" alt="" />                 
                      <span
                        class="cursor"
                        @click="goToUrl('accountsinfo', item.to)"
                        >{{ getAddrFormat(item.to, 5) }}</span
                      >
                    </div>
                    <!-- <div>
                      <span class="text-center">{{ $t("mymanageExtract.tranValue") }}</span
                      ><span>{{ item.tranValue }}</span>
                    </div> -->
                     <div>
                      <span class="text-center">{{ $t("mymanageExtract.extractNumber") }}</span
                      ><span>{{ item.extractNum }}</span>
                    </div>
                    <div>
                      <span class="text-center">{{ $t("mymanageExtract.handleFee") }}</span
                      ><span>{{ item.handFee }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="load-more display-phone" @click="getTranList(page + 1, 1)">
              {{ $t("comm.clickLoad") }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import felrow from "@/components/modules/Felrow.vue";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
import * as api from "@/api/api";

export default {
  components: { fTable ,felrow}, 
  data() {
    const exchgmodes = {
      "1": "10 → 1",
      "2": "9 → 1",
      "3": "8 → 1", 
      "4": "7 → 1",
      "5": "6 → 1",
      "6": "5 → 1",
      "7": "4 → 1",
      "8": "3 → 1",
      "9": "2 → 1",
      "10": "1 → 1",
      "11": "1 → 2",
      "12": "1 → 3",
      "13": "1 → 4",    
      "14": "1 → 5",
      "15": "1 → 6",
      "16": "1 → 7",
      "17": "1 → 8",
      "18": "1 → 9",
      "19": "1 → 10",
    };

    return {      
      exchgmodes,
      totalText: "mymanageExtract.currentExchangeNumber",
      tableExchangeHeard: [
        {
          name: "applyAddr",
          label: "mymanageExtract.exchangeaddress",
          type: "address",
        },
        /*
        {
          name: "exchgIpaddr",
          label: "mymanageExtract.receivingaddress",
          type: "address",
        },
        */
        {
          name: "applyHash",
          label: "mymanageExtract.transhash",             
        },
        /*
        {
          name: "blocknumber",
          minWidth: "120px",
          label: "mymanageExtract.blockheight",         
        },
        */
         {
          name: "exchgHash",
          label: "mymanageExtract.exchangetranshash",          
        },
        {
          name: "exchgNum",
          width: "135px",
          label: "mymanageExtract.exchgnum",
        },
        {
          name: "exchgToken",
          width: "135px",
          label: "mymanageExtract.exchgtoken",
        },
       
        {
          name: "exchgMode",
          width: "120px",
          label: "mymanageExtract.exchgmode",
        },
        
        {
          name: "transTime",
          width: "150px",
          label: "mymanageExtract.transfertime",
        },
      ],
      dataUtils: (item) => {
        item.exchgNum = utils.isEmpty(item.exchgNum)
          ? ""
          : `${item.exchgNum} NFC`;    

         item.exchgToken = utils.isEmpty(item.exchgToken)
          ? ""
          : `${item.exchgToken} NFC`; 

         item.exchgMode= this.exchgmodes[item.exchgMode];
      },      


      page: 1,
      prePage: 10,
      totalPages: 0,
      total: 0,
      showNumbers: [
        {
          value: 10,
          label: "10",
        },
        {
          value: 20,
          label: "20",
        },
        {
          value: 50,
          label: "50",
        },
        {
          value: 100,
          label: "100",
        },
      ],
      tranList: [],
      timer: {},
      loadText: this.$t("comm.clickLoad"),
      isLoading: false,     
      tipsT: {
        just: " just ",
        second: " sec",
        minute: " min",
        hour: " hr",
        day: " day",
        week: " week",
        month: " month",
        year: " year",
      },

      isActivity: 0,

      loading: false,   
      btnShow:false,  
      form: {
        walletaddress: "",
        contractaddress:"",    
        extractablequantity: "",
        extractquantity: "",
        lockedquantity: "",
      },

      contractaddress: window.$url.CONTRACT_URL,

    
    };
  },

  mounted() {
    this.getTranList(this.page);
    this.form.walletaddress = this.$store.getters.account;   
    this.form.contractaddress =this.contractaddress;
    //this.form.contractaddress =this.form.contractaddress.replace(this.form.contractaddress.substring(0, 2),"0x");
    this.getExtractablequantity();   
    this.getStatisLock();
  },

  methods: {
     formatTime(time) {
      let timeL = helper.formatTimimg(time);
      if (timeL) {
         let times = timeL.split(" ");
        if (this.$i18n.locale == "en") {
          timeL = times[0] > 1 && times[1].indexOf("s") < 0 ? timeL + "s" : timeL;
        }
      }
      return timeL;
    },

    extract(){
     helper.goUrl(this, "Exchangeextract", "");     
    }, 


   

    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },

    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },

     getDataFormat(data, pow = 18, decimal = 10000) {
      return helper.getDataFormat(data, pow, decimal);
    },

    formatTimed(timestamp, format) {
        if(timestamp==0){
            return ""
        }
        if (utils.isEmpty(timestamp)) {
            return ""
        }else{
             return helper.formatTime(timestamp, format);
        }
    },

    getStatisLock(){
      var param = {
        query: this.$store.getters.account,       
      };
       var that = this;
      api.postJson("/platform/statisLock", param)
        .then((response) => {          
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {                     
             this.form.extractquantity = utils.clearZero(response.result.extract,4) + " NFC"; 
             this.form.lockedquantity =utils.weedZero(response.result.locak,4) + " NFC";      
          }
        })
        .catch((error) => {         
          console.error(error);
        });
    },
     getTranList(page, device = 0) {
      if (page < 1 || (this.totalPages > 0 && page > this.totalPages)) {
        return;
      }
       let address = this.$store.getters.account;
      var that = this;
      that.isLoading = true;
      that.page = page;
     
       var param = {
        query: address,
        type: that.tranType,
        current: page,
        size: that.prePage,
      };

      api       
        .postJson("/platform/transactionList", param)
        .then((response) => {
          that.isLoading = false;
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            if (response.result === null || response.result.total === 0) {
              that.loadText = "";

              return;
            }
            var data = response.result.records;
            if (data.length < that.prePage) {
              that.loadText = this.$t("comm.bottomLine");
            }
            that.totalPages = response.result.pages;
            that.total = response.result.total;
            const newData = [];
            let temp = {};
            data.forEach((item) => {
              temp = {
                img: "/static/images/default.png",
                block: item.blockNumber,
                time: item.timeStamp,
                status: item.status,
                tranAddr: item.hash,
                from: item.fromAddr,
                to: item.toAddr,
                tranValue: `${utils.clearZero(item.value, 8)} NFC`,              
                handFee: `${utils.clearZero(
                  item.gasUsed * item.gasPrice,
                  8
                )} NFC`, 

                extractNum: utils.clearZero(item.param3,4) + " NFC",            
              };
              newData.push(temp);
              if (device === 1) {
                that.tranList.push(temp);
              }
            });

            if (that.tranList.length === 0 || device === 0) {
              that.tranList = newData;
            }
            that.timer = setInterval(() => {
              that.tranList.forEach((item) => {
                item.time++;
              });
            }, 1000);
          }
        })
        .catch((error) => {         
          console.error(error);
        });
    },


     getExtractablequantity(){
      let sdk = this.$store.getters.getsdk || null;
      if (!sdk) {
        return;
      }        
      let multaddr = this.$store.getters.account;              
      multaddr=multaddr.replace(multaddr.substring(0, 2),"0x");  
           
      sdk.toExtractAmount(this.contractaddress, multaddr).then(response=>{                  
        if(response<=0) 
            this.btnShow=false;
        else
            this.btnShow=true;         
        
        this.form.extractablequantity =utils.weedZero(response,4) + " NFC";
      }).catch(err => {
        console.log(err)     
     })     

    },
          
    onSubmit() {      
      let sdk = this.$store.getters.getsdk || null;
      if (!sdk) {
        return;
      }       
      this.toExtractData(sdk, () => {
          this.toPoolOk();
      });
    },  

    toExtractData(sdk, fun) {
      let multaddr = this.$store.getters.account;   
      multaddr=multaddr.replace(multaddr.substring(0, 1),"0x");  
      let setData = {
        title: `${this.$t("mymanageExtract.exchangewithdrawl")}`,       
        request: null,
        closebtnshow: false,
        success(response) {
          fun(response);
        },
      };     
      let request = sdk.toExtract(this.contractaddress, multaddr, setData);   
      setData.request = request;
      this.$store.dispatch("setNotification", setData);
    },

    toPoolOk() {
      this.$store.dispatch("setWinStatus", false);
      let message = `${this.$t("mymanageExtract.finish")}`;      
      let title = this.$t("mymanageExtract.exchangewithdrawl")
      this.$notify({
          title,
          message,
          type: "success",
        });
      this.getExtractablequantity();     
    },


  },


  computed: {
    getParamExchang() {
      let address = this.$store.getters.account;      
      return { query: address};
    },
    getParamTwo() {
      let address = this.$store.getters.account;
      return { address: address}; 
    },
  },
  watch: {
    isActivity(newVal) {
      if (newVal === 0) {      
        this.totalText = "mymanageExtract.currentExchangeNumber";
      } else {       
        this.totalText = "mymanageExtract.currentExchangeNumber";
      }
    },
  },
};
</script>
<style scoped>
.top-wrapper {
  width: 100%;
}
.ie-form-item__label {
  font-weight: 600 !important;
  color: #555;
}
</style>