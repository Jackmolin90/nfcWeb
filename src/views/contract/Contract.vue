<template>
  <div class="accountsinfo-container ieHome">
    <div class="content-container">
      <div class="content-wrapper">
        <f-table :search="true" placeholder="contracts.addrSearch" searchName="contract" ref="ftables"
          :url="'/platform/getContractList'" title="contracts.contract"
          total-text="contracts.currentTokenNumber" :table-heard="tableHeard"  :show-action="false"
          :data-utils="dataUtils" :ation-width="120">
          
          <template slot="col_contract" slot-scope="scope">
            <span @click="goToUrl('ContractInfo', scope.data)" class="cursor" style="color: #409eff">
              {{ scope.data.contract }}
            </span>
          </template>          
          <template slot="col_blocknumber" slot-scope="scope">
            <span @click="goToBlockUrl('Blockinfo', scope.data.blocknumber)" class="cursor" style="color: #409eff">
              {{ scope.data.blocknumber }}
            </span>
          </template>  
        </f-table>
      </div>
    </div>
  </div>
</template>
<script>

import fTable from "@/components/modules/Ftable.vue";
import * as helper from "@/utils/helper";
import utils from "@/utils/utils";
export default {
  components: { fTable },
  data() {
    return {
      tableHeard: [
        {
          label: "contracts.tokenAddress",
          name: "contract",
          type: "address",
        },
        {
          label: "contracts.Block",
          name: "blocknumber",
        },
        {
          label: "contracts.contractname",
          name: "contractname",
          minWidth: "200px",
        },
        {
          label: "contracts.compiler",
          name: "compiler",
          minWidth: "120px",
        },
        {
          label: "contracts.version",
          name: "version",
          minWidth: "120px",
        },
        {
          label: "contracts.balance",
          name: "balance",
          minWidth: "120px",
        },
        {
          label: "contracts.txns",
          name: "txcount",
        },
        {
          label: "contracts.verified",
          name: "verifydate",
          minWidth: "150px",
        },
        {
          label: "contracts.contractCreator1",
          name: "author",
          minWidth: "120px",
          type: "address",
        },
      ],
      dataUtils: (item) => {
        item.balance = `${utils.clearZero(item.balance, 4)} NFC`; 
        item.verifydate = item.verifydate === null || typeof item.verifydate == "undefined"
              ? ""
              : helper.formatTimeSeconds(item.verifydate,1);
        
        item.contractname = item.contractname === null || typeof item.contractname == "undefined" ? item.name : item.contractname;
      },
      isActivity: 0,
    };
  },
  methods: {
    goToBlockUrl(name, params) {
      helper.goPathUrl(this, name, params);
    }, 

    goToUrl(name, data) {
      helper.goPathUrl(this, name, `${data.contract}_${data.contractname}`);      
    },

    
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },
  }, 
};
</script>