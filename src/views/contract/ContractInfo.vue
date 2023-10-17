<template>
  <div class="accountsinfo-container ieHome" style="min-height: 500px">
    <div class="content-container">
      <f-elrow :title-width="this.$i18n.locale == 'zh' ? '90px' : '130px'" title="contracts.contractdetail"
        :titles="titles" :datas="accInfo" :col-width="8" bgcolor="#fff" title-align="left">
      </f-elrow>
    </div>

    <div class="content-container">
      <div class="content-wrapper">
        <div class="top-wrapper">
          <div class="left-wrapper">
            <span :class="isActivity == 0 ? 'is_activity' : ''" @click="isActivity = 0">{{ $t("home.tran") }}</span>
            <span :class="isActivity == 1 ? 'is_activity' : ''" @click="isActivity = 1">{{ $t("contracts.contract")
            }}</span>
          </div>
        </div>
        <div v-if="isActivity == 0">
          <f-table :url="tableUrl" :table-heard="tableHeard" :param="getParamOne"
            total-text="Transactions.currentTranNumber" :show-action="false" :data-utils="dataUtils" :ation-width="200">


            <img slot="col_img" src="@/assets/images/icon_to.png" class="thumb-xs ml-2" height="21" width="21" />
            <template slot="col_status" slot-scope="scope">
              <span v-if="scope.data.status == 1" style="color: #2ebac6">{{
                  $t("comm.success")
              }}</span>
              <span v-else style="color: red; margin-right: 20px">{{ $t("comm.fail") }}
              </span>
            </template>

          </f-table>
        </div>

        <div v-if="isActivity == 1" class="list-wrapper">

          <div class="container-fluid" style="margin-top: 10px" v-if="total <= 0">
            <p style="margin: 8px 0px; text-align: left">
              <i class="fa fa-info-circle text-secondary mr-1"></i>
              <span>{{ $t("contracts.contractadminmsg") }}</span>
              <span style="color: #3498db;font-weight: 600;" class="cursor"
                @click="goToUrl('VerifyContract', accAddr)">{{
                    $t("contracts.contractverified")
                }}</span>
              <span>{{ $t("contracts.contractselfmsg") }}</span>
            </p>
            <textarea v-model="contractcodes" spellcheck="false" class="area-content"
              style="height: 300px; padding: 1px 1px; display: flex;width: 100%;" readonly></textarea>
          </div>

          <div class="container-fluid" v-show="total > 0" style="margin-top: 10px">
            <h6 style="text-align: left">
              <i class="fa fa-check-circle text-success mr-1"></i>
              <span>{{ $t("contracts.contractverify") }}</span>
            </h6>
            <f-elrow :title-width="this.$i18n.locale == 'zh' ? '90px' : '130px'"
              :titles="contracttitles" :datas="accInfo" :col-width="8" bgcolor="#fff" title-align="left">
            </f-elrow>
          </div>

          <div class="container-fluid" v-show="total > 0">
            <h6 style="text-align: left">
              <i class="fa fa-file-code text-secondary mr-1"></i>
              {{ $t("contracts.contractcode") }}
            </h6>

            <div class="row" style="margin-top: 10px" v-for="(item, index) in codeList" :key="index">
              <div class="col-md-9 col-sm-12">
                <p class="sub-title" style="margin: 8px 0px; text-align: left">
                  File {{ index + 1 }} of {{ total }} : {{ item.filename }}
                </p>
              </div>

              <div class="col-md-3 col-sm-12" style="text-align: right; padding: 6px">
                <a type="button" class="btn-sm" :title="$t('contracts.copysourcecode')"
                  @click="btnCopySourcecode(item.id)"><i class="fa fa-copy" aria-hidden="true"></i></a>
              </div>

              <ContractTextarea :areaText="item.sourcecode" :ids="item.id" :id="'sourcecode' + item.id" >
              </ContractTextarea>
            </div>
            
            <div class="row" style="margin-top: 10px" v-if="contractabi != ''">
              <div class="col-md-9 col-sm-12">
                <h6 style="margin: 8px 0px; text-align: left">
                  <i class="fa fa-tasks text-secondary mr-1"></i>{{ $t("contracts.ContractABI") }}
                </h6>
              </div>

              <div class="col-md-3 col-sm-12" style="text-align: right; padding: 6px">
                <a type="button" class="btn-sm" :title="$t('contracts.copyabi')" @click="btnCopyabi"><i
                    class="fa fa-copy" aria-hidden="true"></i></a>
              </div>
              <textarea v-model="contractabi" spellcheck="false" id="txtAbi" class="area-content"
                style="height: 300px; padding: 1px 1px; display: flex;width: 100%;" readonly></textarea>
            </div>

            <div class="row" style="margin-top: 10px" v-if="contractbin != ''">
              <div class="col-md-9 col-sm-12">
                <h6 style="margin: 8px 0px; text-align: left">
                  <i class="fa fa-code text-secondary mr-1"></i>{{ $t("contracts.Contractbin") }}
                </h6>
              </div>
              <textarea v-model="contractbin" spellcheck="false" class="area-content"
                style="height: 300px; padding: 1px 1px; display: flex;width: 100%;" readonly></textarea>
            </div>

          
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
import fTable from "@/components/modules/Ftable.vue";
import utils from "@/utils/utils";
import fElrow from "@/components/modules/Felrow.vue";

import * as api from "@/api/api";
import * as helper from "@/utils/helper";

import { showLoading, hideLoading } from "@/utils/loading";
import ContractTextarea from "./components/ContractTextarea.vue";
import ContractVerify from "./components/ContractVerify.vue";
import VTable from "@/components/modules/VTable.vue";
import { Message } from "element-ui";

export default {
  components: {
    fTable, fElrow,
    ContractTextarea,
    VTable,
    ContractVerify,
  },
  data() {
    let _this_ = this;
    const types = {
      common: "Transactions.common",
      stProof: "Transactions.stProof",
      Bind: "Transactions.Bind",
      Unbind: "Transactions.Unbind",
      Rebind: "Transactions.Rebind",
      Deposit: "Transactions.Deposit",
      stReq: "Transactions.stReq",
      stExit: "Transactions.stExit",
      stset: "Transactions.stset",
      stRent: "Transactions.stRent",
      stRentPg: "Transactions.stRentPg",
      stReNew: "Transactions.stReNew",
      stReNewPg: "Transactions.stReNewPg",
      stRescind: "Transactions.stRescind",
      stReValid: "Transactions.stReValid",
      chPrice: "Transactions.chPrice",
      CndLock: "Transactions.CndLock",
      RwdLock: "Transactions.RwdLock",
      ExchRate: "Transactions.ExchRate",
      Exch: "Transactions.Exch",
      CandReq: "Transactions.CandReq",
      CandExit: "Transactions.CandExit",
      CandPnsh: "Transactions.CandPnsh",
      FlwLock: "Transactions.FlwLock",
      chbw: "Transactions.chbw",
      TlcChAdmin1: "Transactions.TlcChAdmin1",
      TlcPickup: "Transactions.TlcPickup",
      ContractNew: "Transactions.ContractNew",
      TokenNew: "Transactions.TokenNew",
      TokenTransfer: "Transactions.TokenTransfer",
      stCatchUp: "Transactions.stCatchUp",
      CandEntrust: "Transactions.CandEntrust",
      CandETExit: "Transactions.CandETExit",
      CandChaRate: "Transactions.CandChaRate",
    };
    return {
      isActivity: 0,
      address: "",
      type: 0,
      blockNumber: 0,
      tableUrl: "",
      types,
      accAddr: null,
      contractname: "",
      accInfo: {},
      recodeDialogVisible: false,
      ownerflag: false,
      contractcode: "",
      contracttotal: 0,

      areaText: "",
      codeList: [],
      total: 0,
      contractabi: "",
      contractbin: "",     
      contractcodes: "",
      contractnames: "",

      titles: [
        {
          titles: [
            { title: "contracts.tokenAddress", name: "contract" },
            {
              title: "contracts.contractname", name: "contractname",
            },
            { title: "contracts.Abbreviation", name: "symbol" },
            { title: "contracts.balance", name: "balance" },
            { title: "contracts.txns", name: "txcount" },
          ],
          colWidth: 13,
        },
        {
          titles: [
            { title: "contracts.contractCreator1", name: "author" },
            { title: "contracts.owner", name: "admin1" },
            { title: "contracts.contractCreator2", name: "txhash" },
          ],
          colWidth: 11,
        },
      ],

      contracttitles: [
        {
          titles: [
            { title: "contracts.contractnames", name: "contractnames" },
            { title: "contracts.compilerversion", name: "compilerversion" },
          ],
          colWidth: 12,
        },
        {
          titles: [
            { title: "contracts.optimizationenabled", name: "optimizationenabled" },
            { title: "contracts.othersettings", name: "othersettings" },
          ],
          colWidth: 12,
        }
      ],


      tableHeard: [
        {
          name: "hash",
          label: "Transactions.TxnHash",
          //type: "address",
        },
        {
          label: "Transactions.Block",
          name: "blockNumber",
        },

        // { label: "Transactions.Age", name: "timeStamp" },
        { label: "Transactions.From", name: "fromAddr" },
        // { label: "", name: "img" ,width: "40px"},
        { label: "Transactions.To", name: "toAddr" },
        { label: "Transactions.Value", name: "value" },
        { label: "Transactions.TxnFee", name: "gasUsed" },
        { label: "Transactions.type", name: "ufooperator" },
        { label: "Transactions.status", name: "status", isT: true },
      ],


      dataUtils: (item) => {
        item.timeStamp = `${helper.formatTimimg(item.timeStamp)}${_this_.$t("comm.before")}`;
        item.value = utils.weedZero(helper.getDataFormat(item.value, 18, 10000), 8) + " NFC"
        item.gasUsed = utils.weedZero(helper.getDataFormat(item.gasUsed * item.gasPrice, 18, 10000), 8) + " NFC"
        item.ufooperator = `${_this_.$t(_this_.types[item.ufooperator || "common"])}`;

        item.hash = this.getAddrFormat(item.hash, 7);
        item.fromAddr = this.getAddrFormat(item.fromAddr, 7);
        item.toAddr = this.getAddrFormat(item.toAddr, 7);

      },
      
    };
  },
  created() {
    let idL = this.$route.params.id;
    console.log("idL=" + idL);
    let ids = idL.split("_");
    this.accAddr = ids[0];
    this.contractname = ids[1];
    this.isActivity = 0;

    this.tableUrl = "/platform/getTransactionList";
    this.getrowDatas();
  },
  methods: {
    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
    },
    getAddrFormat(data, number = 15) {
      return helper.getAddrFormat(data, number);
    },

    getrowDatas() {
      const param = {
        contract: this.accAddr,
      };
      api
        .post("/platform/getContractInfo", param)
        .then((response) => {
          if (response.result == null) {
            Message.error(response.message);
          } else {
            this.accInfo = response.result;
            this.accInfo.balance =
              helper
                .getDataFormat(response.result.balance, 18, 10000)
                .toFixed(4) + " NFC";
            this.ownerflag =
              this.accInfo.admin1 != null && this.accInfo.admin1 != "";
            this.accInfo.contractname =
              this.accInfo.contractname === null ||
                typeof this.accInfo.contractname == "undefined"
                ? this.accInfo.name
                : this.accInfo.contractname;

            // this.accInfo.author = this.getAddrFormat(this.accInfo.author,12);
            //this.accInfo.admin1 = this.getAddrFormat(this.accInfo.admin1,12);
            this.accInfo.txhash = this.getAddrFormat(this.accInfo.txhash, 20);

            this.accInfo.contractnames = this.accInfo.contractname;
            this.accInfo.compilerversion = this.accInfo.vername;
            this.accInfo.optimizationenabled = "No with 200 runs";
            this.accInfo.othersettings = "default evmVersion";
            this.contractcode = this.accInfo.input;
          
            this.contractcodes = this.accInfo.input;
            this.contractnames = this.accInfo.contractnames;

            if (this.contractnames != '') {
              this.getContractSources(1);
            }

          }
        })
        .catch((err) => { });
    },

    loadContract(val) {
      this.contractname = val;
      this.contractabi = "";
      this.contractbin = "";
      this.getContractSources(1);
    },

    btnCopySourcecode(id) {
      var copyCode = document.getElementById("sourcecode" + id).children[1];
      /* Select the text field */
      copyCode.select();
      copyCode.setSelectionRange(0, 99999); /* For mobile devices */
      /* Copy the text inside the text field */
      document.execCommand("copy");
      /* Alert the copied text */
      Message.info("Copied source code to clipboard");
    },
    btnCopyabi() {
      /* Get the text field */
      var copyAbi = document.getElementById("txtAbi");
      /* Select the text field */
      copyAbi.select();
      copyAbi.setSelectionRange(0, 99999); /* For mobile devices */
      /* Copy the text inside the text field */
      document.execCommand("copy");
      /* Alert the copied text */
      Message.info("Copied ABI to clipboard");
    },


    getContractSources() {
      showLoading();
      const param = {
        contract: this.accAddr,
      };
      api
        .post("/platform/getContractSources", param)
        .then((response) => {
          if (response.statusCode !== 0) {
            Message.error(response.message);
            hideLoading();
          } else {
            if (response.result === null || response.result.total === 0) {
              this.loadText = "";
              hideLoading();
              return;
            }
            var data = response.result;
            this.total = data.length;
            const newData = [];
            let temp = {};
            data.forEach((item, index) => {
              temp = {
                id: item.id,
                contract: item.contract,
                filename: item.filename,
                sourcecode: item.sourcecode,
                ord: item.ord,
                abi: item.abi,
                bin: item.bin,
              };

              if (this.contractabi == "") {
                this.contractabi = this.getJson(
                  JSON.parse(item.abi),
                  1,
                  this.contractnames
                );
                // console.log("contractabi:" + this.contractabi)
              }
              if (this.contractbin == "") {
                this.contractbin = this.getJson(
                  JSON.parse(item.bin),
                  0,
                  this.contractnames
                );
              }

              newData.push(temp);
            });
            this.codeList = newData;
            this.$parent.contracttotal = this.total;           
            hideLoading();
          }
        })
        .catch((error) => {
          console.error(error);
          Message.error(error.ErrMsg);
          hideLoading();
        });
    },

    getJson(myJson, flag, key) {
      let str = "";
      for (var p in myJson) {
        // console.log("p:" + p, "key:" + key);
        if (p == key) {
          //console.log("p:" + p, "key:" + key);
          //console.log("myJson:" + JSON.stringify(myJson[p]));
          if (flag == 1) str = JSON.stringify(myJson[p]);
          else str = myJson[p];
          break;
        }
      }
      return str;
    },

    uploadCode(event) {
      const selectedFile = event.target.files[0];
      const name = selectedFile.name;
      const size = selectedFile.size;
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = (e) => {
        //console.log(e.target.result);
        this.areaText = reader.result;
      };
    },
  },
  computed: {
    getParamOne() {
      return {
        toAddr: this.accAddr,
      };
    },

  },

  watch: {
    contractname(val) {
      this.contractnames = val;
    },
    contractcode(val) {
      this.contractcodes = val;
    },
    accInfo(val) {
      this.contractInfo = val;
    },
  },
};
</script>