<template>
  <div class="accountsinfo-container ieHome">
    <div class="content-container">
      <div class="content-wrapper">
        <f-table
          ref="ftables"
          :url="null"
          title="BEP-20 Tokens"
          :table-heard="tableHeard"
          :show-action="false"
          :data-utils="dataUtils"
          :test-Datas="testDatas"
        >
          <template slot="col_token" slot-scope="scope">
            {{ scope.data.token }}
          </template>
          <span
            style="font-size: 10px"
            slot="col_description"
            slot-scope="scope"
          >
            {{ scope.data.description }}
          </span>
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
          name: "token",
          label: "coins.name",
        },
        {
          name: "description",
          label: "token.description",
        },
        {
          name: "quantity",
          label: "token.quantity",
        },

        {
          name: "addressNumber",
          label: "token.addressNumber",
        },
      ],
      dataUtils: (item) => {},
      testDatas: [
        {
          token: "UNI-V2",
          description:
            "UNI-V2 is a digital asset built for payments. It is the native digital asset on the XRP Ledger—an open-source, permissionless and decentralized blockchain technology that can settle transactions in 3-5 seconds",
          quantity: "2100000000",
          addressNumber: "3211777",
        },
        {
          token: "TT-V2",
          description:
            "TT-V2 is a decentralized platform that will allow complex programmable transfers of value in a secure and scalable fashion. TT-V2 is built in the secure Haskell programming language.",
          quantity: "2100000000",
          addressNumber: "3",
        },
      ],
    };
  },
};
</script>