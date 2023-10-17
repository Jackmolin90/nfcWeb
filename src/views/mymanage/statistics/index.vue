<template>
  <f-table
    :search="false"
    placeholder=""
    total-text="ftable.totalnumberrelease"
    :title="title"
    :param="getParam"
    :data-utils="dataUtils"
    table-type="table"
    search-name="fromAddr"
    url="/platform/lockNfcMinersByRevAddress"
    :table-heard="tableHeard"
  >
    <span
      slot="col_address"
      slot-scope="scope"
      style="color: #4a7bd3; cursor: pointer"
      @click="toRelease(scope.data)"
    >
      {{ scope.data.address }}
    </span>
  </f-table>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
import * as helper from "@/utils/helper";
export default {
  components: { fTable },
  props: {
    type: {
      type: [String, Number],
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      setTimes: null,
      tableHeard: [
        {
          name: "address",
          label: "lock.minerAddress",
          overflow: true,
          minWidth: "170px",
        },
        /*  {
          name: "blockNumber",
          label: "lock.blockNumber",
        },*/
         { name: "leftAmount", label: "lock.LockedReward" },
       // { name: "totalAmount", label: "lock.Locked" },
        { name: "releaseamount", label: "lock.ReleasedReward" },
       
        // { name: "lockingTime", label: "lock.lockNumber" },
      ],
      dataUtils: (item) => {
        item.totalAmount = `${utils.clearZero(item.totalAmount, 4)} NFC`;
        item.leftAmount = `${utils.clearZero(item.leftAmount, 4)} NFC`;
        item.releaseamount = `${utils.clearZero(item.releaseamount, 4)} NFC`;

        
      },
    };
  },
  methods: {
    toRelease(data) {
      if (data.address ) {
        helper.goPathUrl(
          this,
          "mymanage/releaseList",
          `${data.address}_${this.type }`
        );
      }
    },
  },
  computed: {
    getParam() {
      let address = this.$store.getters.account;
      return {
        revenueAddress: address,
        type: this.type,
      };
    },
  },
};
</script>c