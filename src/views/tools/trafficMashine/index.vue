<template>
  <div class="accounts-container">
    <div class="top-container"></div>
    <div v-show="!logind" class="login-form">
      <login @submitForm="toLogin" />
    </div>

    <div class="content-container" v-show="logind">
      <div class="content-wrapper">
        <el-button @click="removeloca">clear</el-button>

        <div class="list-wrapper">
          <action-table />
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import login from "./login";
import { createSocket, closeSocket, sendWSPush } from "@/utils/websocket.js";
import localstorage from "@/utils/localstorage.js";
import actionTable from "./table.vue";
export default {
  components: { login, actionTable },
  data() {
    return {
      logind: false,
      socketOk: false,
      message: "",
      remessage: "",
      socketUrl: window.$url.SOCKET_URL,
    };
  },
  created() {
    this.upState();
  },
  mounted() {
    this.initSocket();
  },

  beforeDestroy() {
    closeSocket();
  },
  methods: {
    upState() {
      let item = localstorage.getItem();
      this.logind = !!item;
    },
    initSocket() {
      createSocket(this.socketUrl, (re) => {
        let data = JSON.parse(re.data);
       
      
        if (data) {
          
          if (data.ip == "192.168.1.1" && data.password == "123456") {
            localstorage.setItem("otkenTest");
            this.logind = true;
          }
        }
      });
      this.socketOk = true;
    },
    setMsg() {
      sendWSPush(this.message);
    },
    toLogin(data) {
      sendWSPush(data.data);
    },
    removeloca() {
      localstorage.removeItem();
      this.upState();
    },
  },
};
</script>
