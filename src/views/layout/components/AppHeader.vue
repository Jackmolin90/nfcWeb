<template>
  <div class="header-container">
    <div class="display-pc-and-pad">
      <div class="header-top">
        <div class="logo">
          <!--
          <img :src="isCn?'/static/images/top_logo_cn.png':'/static/images/top_logo_en.png'" @click="handleSelect('','Home')" >
          -->
          <img
            :src="'/static/images/top_logo.png'"
            v-show="isShow('Home')"
            @click="handleSelect('', 'Home')"
          />
        </div>
        <div style="position: absolute; top: 35px; color: #fff; left: 300px">
          {{ $t("home.currentNetWork") }}
        </div>
        <div
          v-if="$store.getters.account"
          style="
            position: absolute;
            right: 20px;
            font-size: 14px;
            top: 20px;
            color: #fff;
          "
        >
          <el-button
            @click="handleCopy"
            icon="el-icon-connection"
            :title="
              $t('mymanage.connecttowallet') + ':' + $store.getters.account
            "
            size="mini"
            round
            >{{ getAddrFormat($store.getters.account, 8) }}</el-button
          >
        </div>
        <div class="header-link">
          <div v-if="!hasUser && false" class="login-register">
            <span class="login-i"></span>
            <span @click="handleSelect('Login', '')">{{
              $t("login.logIn")
            }}</span>
            <span>/</span>
            <span @click="handleSelect('Register', '')">{{
              $t("register.reg")
            }}</span>
          </div>

          <div v-if="hasUser" class="login-register">
            <!-- <span class="login-i"></span>
            <span @click="handleSelect('MyCoins' ,'')" style="color:#FFF"> {{ user }} </span>
            <span @click="logout" style="color:#FFF;margin-left:10px;"> 退出 </span>-->
            <el-dropdown
              class="avatar-container right-menu-item hover-effect"
              trigger="click"
            >
              <div class="avatar-wrapper">
                <span class="login-i"></span>
                <span style="color: #fff">{{ user }}</span>
                <i class="el-icon-caret-bottom" style="color: #fff" />
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-show="isShow('MyCoins')">
                  <p @click="handleSelect('MyCoins', '')">
                    {{ $t("coins.myToken") }}
                  </p>
                </el-dropdown-item>
                <el-dropdown-item v-show="isShow('User')">
                  <p @click="handleSelect('User', '')">
                    {{ $t("user.title") }}
                  </p>
                </el-dropdown-item>
                <el-dropdown-item
                  @click.native="logout"
                  v-show="isShow('dropOut')"
                >
                  <p style="display: block">{{ $t("voter.dropOut") }}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="language" style="line-height: 42px">
            <el-button
              v-show="isShow('DownloadWallte')"
              type="text"
              @click="handleSelect('DownloadWallte', '')"
              style="color: #fff; margin-right: 20px"
              ><img src="/static/images/blueImg.svg" width="20px" />{{
                $t("home.addNetFlowCoin")
              }}</el-button
            >
            <el-dropdown @command="onLanguageDropdownCommand">
              <span class="el-dropdown-link">
                {{ $t("home.language") }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="zh">简体中文</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="header-bottom">
        <div class="header-nav">
          <el-menu
            ref="menu"
            text-color="#ffffff"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item
              data-index="home"
              index="Home"
              v-show="isShow('Home')"
              @click="handleSelect('', 'Home')"
              >{{ $t("home.home") }}</el-menu-item
            >
            <el-submenu data-index="Block" index="Block">
              <template slot="title">{{ $t("home.blockchain") }}</template>
              <el-menu-item
                data-index="block"
                index="Block"
                v-show="isShow('Block')"
                @click="handleSelect('Block', '')"
                >{{ $t("home.block") }}</el-menu-item
              >
              <el-menu-item
                v-show="false"
                data-index="mining"
                index="Mining"
                @click="handleSelect('Mining', '')"
                >{{ $t("home.mining") }}</el-menu-item
              >
              <el-menu-item
                data-index="txns"
                index="Txns"
                v-show="isShow('Txns')"
                @click="handleSelect('Txns', '')"
                >{{ $t("home.tran") }}</el-menu-item
              >
              <el-menu-item
                data-index="contracts"
                index="contracts"
                v-show="isShow('Contract')"
                @click="handleSelect('Contract', '')"
                >{{ $t("contracts.contract") }}</el-menu-item
              >

              <el-menu-item
                v-show="false"
                data-index="coins"
                index="Coins"
                @click="handleCoins()"
                >{{ $t("coins.title") }}</el-menu-item
              >
              <el-menu-item
                v-show="true"
                data-index="token"
                index="Token"
                @click="handleSelect('Token', '')"
                >{{ $t("api.tokens") }}</el-menu-item
              >
              <el-menu-item
                v-if="true"
                data-index="absent"
                index="Absent"
                v-show="isShow('Absent')"
                @click="handleSelect('Absent', '')"
                >{{ $t("absent.absent") }}</el-menu-item
              >
            </el-submenu>
            <el-submenu data-index="lockpledge" index="lockpledge">
              <template slot="title">{{ $t("lock.lockRelease") }}</template>
              <el-menu-item
                data-index="nodeaward"
                index="Nodeaward"
                v-show="isShow('Nodeaward')"
                @click="handleSelect('Nodeaward', '')"
                >{{ $t("lock.nodeawardFreed") }}</el-menu-item
              >

              <el-menu-item
                data-index="flowlock"
                index="FlowLock"
                v-show="isShow('FlowLock')"
                @click="handleSelect('FlowLock', '')"
                >{{ $t("lock.flowFreed") }}</el-menu-item
              >
              <el-menu-item
                data-index="bandwidthlock"
                index="BandwidthLock"
                v-show="isShow('BandwidthLock')"
                @click="handleSelect('BandwidthLock', '')"
                >{{ $t("lock.bandwidthFreed") }}</el-menu-item
              >

              <el-menu-item
                data-index="nodeLock"
                index="NodeLock"
                v-show="isShow('NodeLock')"
                @click="handleSelect('NodeLock', '')"
                >{{ $t("lock.nodeFreed") }}</el-menu-item
              >
              <el-menu-item
                data-index="minerLock"
                index="MinerLock"
                v-show="isShow('MinerLock')"
                @click="handleSelect('MinerLock', '')"
                >{{ $t("lock.minerFreed") }}</el-menu-item
              >
            </el-submenu>

            <el-submenu v-show="false" data-index="dpos" index="dpos">
              <template slot="title">DPoS</template>
              <el-menu-item
                data-index="voter"
                index="Voter"
                v-show="isShow('Voter')"
                @click="handleSelect('Voter', '')"
                >{{ $t("voter.voter") }}</el-menu-item
              >
              <el-menu-item
                data-index="punishment"
                index="Punishment"
                v-show="isShow('Punishment')"
                @click="handleSelect('Punishment', '')"
                >{{ $t("voter.dropOutPunishment") }}</el-menu-item
              >
            </el-submenu>
            <el-menu-item
              data-index="accounts"
              index="Accounts"
              v-show="isShow('Accounts')"
              @click="handleSelect('Accounts', '')"
              >{{ $t("accounts.addr") }}</el-menu-item
            >

            <el-submenu data-index="flowmining" index="flowmining">
              <template slot="title">{{ $t("flowmining.miner") }}</template>
              <el-menu-item
                v-if="false"
                data-index="miner"
                index="miner"
                v-show="isShow('miner')"
                @click="handleSelect('miner', '')"
                >{{ $t("flowmining.flowminer") }}</el-menu-item
              >
              <el-menu-item
                v-if="false"
                data-index="flowmi"
                index="flowmi"
                v-show="isShow('flowmi')"
                @click="handleSelect('flowmi', '')"
                >{{ $t("flowmining.flowmining") }}</el-menu-item
              >

              <el-menu-item
                data-index="topMiners"
                index="topMiners"
                v-show="isShow('topMiners')"
                @click="handleSelect('topMiners', '')"
                >{{ $t("flowmining.ToPTrafficMiners") }}</el-menu-item
              >
              <el-menu-item
                data-index="nodes"
                index="Nodes"
                v-show="isShow('Nodes')"
                @click="handleSelect('Nodes', '')"
                >{{ $t("node.nodeManage") }}</el-menu-item
              >
            </el-submenu>

            <el-submenu data-index="apis" index="Apis" v-if="false">
              <template slot="title">APIs</template>
              <el-menu-item
                data-index="apis1"
                index="1"
                v-show="isShow('Apis1')"
                @click="handleSelect('Apis', '1')"
                >{{ $t("api.accounts") }}</el-menu-item
              >
              <el-menu-item
                data-index="apis2"
                index="2"
                v-show="isShow('Apis2')"
                @click="handleSelect('Apis', '2')"
                >{{ $t("api.contract") }}</el-menu-item
              >
              <el-menu-item
                data-index="apis3"
                index="3"
                v-show="isShow('Apis3')"
                @click="handleSelect('Apis', '3')"
                >{{ $t("home.tran") }}</el-menu-item
              >
              <el-menu-item
                data-index="apis4"
                index="4"
                v-show="isShow('Apis4')"
                @click="handleSelect('Apis', '4')"
                >{{ $t("home.block") }}</el-menu-item
              >
              <el-menu-item
                data-index="apis5"
                index="5"
                v-show="isShow('Apis5')"
                @click="handleSelect('Apis', '5')"
                >{{ $t("api.logs") }}</el-menu-item
              >
              <el-menu-item
                data-index="apis6"
                index="6"
                v-show="isShow('Apis6')"
                @click="handleSelect('Apis', '6')"
                >{{ $t("api.node") }}</el-menu-item
              >
              <!--
              <el-menu-item data-index='apis7' index="7" @click="handleSelect('Apis','7')">{{ $t('api.tokens') }}</el-menu-item>
              -->
            </el-submenu>
            <el-menu-item
              data-index="mymanage"
              index="Mymanage"
              v-show="isShow('Mymanage')"
              @click="handleSelect('Mymanage', '')"
              >{{ $t("mymanage.my") }}</el-menu-item
            >
            <el-submenu
              v-if="false"
              data-index="trafficMashine"
              index="trafficMashine"
            >
              <template slot="title">{{ "Tools" }}</template>
              <el-menu-item
                data-index="trafficMashine"
                index="trafficMashine"
                v-show="isShow('trafficMashine')"
                @click="handleSelect('trafficMashine', '')"
                >{{ "traffic mashine" }}</el-menu-item
              >
            </el-submenu>

            <el-menu-item data-index="swap" v-if="false" @click="openWindow"
              >Swap</el-menu-item
            >
          </el-menu>
        </div>
        <div class="header-search">
          <el-input
            v-model="searchInput"
            :placeholder="$t('comm.searchTips')"
            @keyup.enter.native="seachData()"
          />
          <div class="search-title">
            <h2 @click="seachData()"></h2>
          </div>
        </div>
      </div>
    </div>
    <div class="display-phone">
      <div v-if="!isSearch" class="content-container">
        <div class="left-container">
          <div class="logo">
            <img
              src="/static/images/top_logo.png"
              @click="handleSelect('', 'Home')"
            />
          </div>
        </div>
        <div class="right-container navigation">
          <div class="img" @click="isSearch = true">
            <img src="/static/images/search.png" />
          </div>
          <div v-if="!hasUser" class="user" @click="handleSelect('Login', '')">
            <img src="/static/images/user.png" />
          </div>
          <div v-else class="user" @click="phoneUser = true">
            <img src="/static/images/user.png" />
          </div>
          <div class="img">
            <img
              src="/static/images/phone_mark_white.png"
              @click="phoneNav = true"
            />
          </div>
          <div class="phone-nav" v-show="phoneUser">
            <el-menu
              ref="menu"
              text-color="#ffffff"
              @select="handleSelect"
              active-text-color="#ffffff"
            >
              <el-menu-item
                data-index="myCoins"
                index="MyCoins"
                @click="handleSelect('MyCoins', '')"
                >{{ $t("coins.myToken") }}</el-menu-item
              >
              <el-menu-item
                data-index="user"
                index="User"
                @click="handleSelect('User', '')"
                >{{ $t("user.title") }}</el-menu-item
              >
              <el-menu-item @click.native="logout">{{
                $t("voter.dropOut")
              }}</el-menu-item>
            </el-menu>
            <div class="phoneNav-bg" @click="phoneUser = false"></div>
          </div>
          <div class="phone-nav" v-show="phoneNav">
            <el-menu
              ref="menu"
              text-color="#ffffff"
              @select="handleSelect"
              active-text-color="#ffffff"
            >
              <el-menu-item
                data-index="home"
                index="Home"
                v-show="isShow('Home')"
                @click="handleSelect('', 'Home')"
                >{{ $t("home.home") }}</el-menu-item
              >
              <el-submenu data-index="Block" index="Block">
                <template slot="title">{{ $t("home.blockchain") }}</template>
                <el-menu-item
                  data-index="block"
                  index="Block"
                  v-show="isShow('Block')"
                  @click="handleSelect('Block', '')"
                  >{{ $t("home.block") }}</el-menu-item
                >
                <el-menu-item
                  v-show="false"
                  data-index="mining"
                  index="Mining"
                  @click="handleSelect('Mining', '')"
                  >{{ $t("home.mining") }}</el-menu-item
                >
                <el-menu-item
                  data-index="txns"
                  index="Txns"
                  v-show="isShow('Txns')"
                  @click="handleSelect('Txns', '')"
                  >{{ $t("home.tran") }}</el-menu-item
                >
                <el-menu-item
                  v-show="false"
                  data-index="coins"
                  index="Coins"
                  @click="handleCoins()"
                  >{{ $t("coins.title") }}</el-menu-item
                >
                <el-menu-item
                  data-index="token"
                  index="Token"
                  v-show="isShow('Token')"
                  @click="handleSelect('Token', '')"
                  >{{ $t("api.tokens") }}</el-menu-item
                >
                <el-menu-item
                  v-if="true"
                  data-index="absent"
                  index="Absent"
                  v-show="isShow('Absent')"
                  @click="handleSelect('Absent', '')"
                  >{{ $t("absent.absent") }}</el-menu-item
                >
              </el-submenu>
              <el-submenu data-index="lockpledge" index="lockpledge">
                <template slot="title">{{ $t("lock.lockRelease") }}</template>
                <el-menu-item
                  data-index="nodeaward"
                  index="Nodeaward"
                  v-show="isShow('Nodeaward')"
                  @click="handleSelect('Nodeaward', '')"
                  >{{ $t("lock.nodeawardFreed") }}</el-menu-item
                >

                <el-menu-item
                  data-index="flowlock"
                  index="FlowLock"
                  v-show="isShow('FlowLock')"
                  @click="handleSelect('FlowLock', '')"
                  >{{ $t("lock.flowFreed") }}</el-menu-item
                >
                <el-menu-item
                  data-index="bandwidthlock"
                  index="BandwidthLock"
                  v-show="isShow('BandwidthLock')"
                  @click="handleSelect('BandwidthLock', '')"
                  >{{ $t("lock.bandwidthFreed") }}</el-menu-item
                >

                <el-menu-item
                  data-index="nodeLock"
                  index="NodeLock"
                  v-show="isShow('NodeLock')"
                  @click="handleSelect('NodeLock', '')"
                  >{{ $t("lock.nodeFreed") }}</el-menu-item
                >
                <el-menu-item
                  data-index="minerLock"
                  index="MinerLock"
                  v-show="isShow('MinerLock')"
                  @click="handleSelect('MinerLock', '')"
                  >{{ $t("lock.minerFreed") }}</el-menu-item
                >
              </el-submenu>

              <el-submenu v-show="false" data-index="dpos" index="dpos">
                <template slot="title">DPoS</template>
                <el-menu-item
                  data-index="voter"
                  index="Voter"
                  v-show="isShow('Voter')"
                  @click="handleSelect('Voter', '')"
                  >{{ $t("voter.voter") }}</el-menu-item
                >
                <el-menu-item
                  data-index="punishment"
                  index="Punishment"
                  v-show="isShow('Punishment')"
                  @click="handleSelect('Punishment', '')"
                  >{{ $t("voter.dropOutPunishment") }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                data-index="accounts"
                index="Accounts"
                v-show="isShow('Accounts')"
                @click="handleSelect('Accounts', '')"
                >{{ $t("accounts.addr") }}</el-menu-item
              >

              <el-submenu data-index="flowmining" index="flowmining">
                <template slot="title">{{ $t("flowmining.miner") }}</template>
                <el-menu-item
                  v-if="false"
                  data-index="miner"
                  index="miner"
                  @click="handleSelect('miner', '')"
                  >{{ $t("flowmining.flowminer") }}</el-menu-item
                >
                <el-menu-item
                  v-if="false"
                  data-index="flowmi"
                  index="flowmi"
                  @click="handleSelect('flowmi', '')"
                  >{{ $t("flowmining.flowmining") }}</el-menu-item
                >

                <el-menu-item
                  data-index="topMiners"
                  index="topMiners"
                  v-show="isShow('topMiners')"
                  @click="handleSelect('topMiners', '')"
                  >{{ $t("flowmining.ToPTrafficMiners") }}</el-menu-item
                >
                <el-menu-item
                  data-index="nodes"
                  index="Nodes"
                  v-show="isShow('Nodes')"
                  @click="handleSelect('Nodes', '')"
                  >{{ $t("node.nodeManage") }}</el-menu-item
                >
              </el-submenu>

              <el-submenu v-if="false" data-index="apis" index="Apis">
                <template slot="title">APIs</template>
                <el-menu-item
                  data-index="apis1"
                  index="1"
                  @click="handleSelect('Apis', '1')"
                  >{{ $t("api.accounts") }}</el-menu-item
                >
                <el-menu-item
                  data-index="apis2"
                  index="2"
                  @click="handleSelect('Apis', '2')"
                  >{{ $t("api.contract") }}</el-menu-item
                >
                <el-menu-item
                  data-index="apis3"
                  index="3"
                  @click="handleSelect('Apis', '3')"
                  >{{ $t("home.tran") }}</el-menu-item
                >
                <el-menu-item
                  data-index="apis4"
                  index="4"
                  @click="handleSelect('Apis', '4')"
                  >{{ $t("home.block") }}</el-menu-item
                >
                <el-menu-item
                  data-index="apis5"
                  index="5"
                  @click="handleSelect('Apis', '5')"
                  >{{ $t("api.logs") }}</el-menu-item
                >
                <el-menu-item
                  data-index="apis6"
                  index="6"
                  @click="handleSelect('Apis', '6')"
                  >{{ $t("api.node") }}</el-menu-item
                >
                <!--
              <el-menu-item data-index='apis7' index="7" @click="handleSelect('Apis','7')">{{ $t('api.tokens') }}</el-menu-item>
              -->
              </el-submenu>
              <el-menu-item
                data-index="mymanage"
                index="Mymanage"
                v-show="isShow('Mymanage')"
                @click="handleSelect('Mymanage', '')"
                >{{ $t("mymanage.my") }}</el-menu-item
              >

              <el-menu-item data-index="swap" v-if="false" @click="openWindow"
                >Swap</el-menu-item
              >
            </el-menu>

            <div class="phoneNav-bg" @click="phoneNav = false"></div>
            <div class="phone-lang">
              <span
                :class="getLang() == 'zh' ? '' : 'gray'"
                class="cursor"
                @click="onLanguageDropdownCommand('zh')"
                >ZH</span
              >
              <span class="line">|</span>
              <span
                :class="getLang() == 'en' ? '' : 'gray'"
                class="cursor"
                @click="onLanguageDropdownCommand('en')"
                >EN</span
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="isSearch" class="content-container search-container">
        <div class="search-input">
          <div>
            <el-input
              v-model="searchInput"
              :placeholder="$t('comm.searchTips')"
              @keyup.enter.native="seachData()"
            />
          </div>
          <div class="img">
            <div>
              <img src="/static/images/search.png" @click="seachData()" />
            </div>
          </div>
        </div>
        <div class="search-button">
          <el-button @click="isSearch = false">{{
            $t("comm.close")
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as api from "@/api/api";
import * as helper from "@/utils/helper";
import { getValue, setValue } from "@/utils/auth";
import $ from "jquery";
export default {
  name: "AppHeader",
  props: {},

  data() {
    const hideMenus = window.$url.hideMenus || [];
    return {
      hideMenus,
      isCn: false,

      drawer: false,
      isSearch: false,
      navTab: true,
      oldScrollTop: 0,
      scrollTop: 0,
      isPhone: false,
      main_media: 1200,
      main_phone: 719,
      navIndex: "",
      searchInput: "",
      phoneNav: false,
      phoneUser: false,
      router: true,
      hasUser: false,
      user: null,
      UNISWAP_URL: window.$url.UNISWAP_URL,
    };
  },

  computed: {
    ...mapGetters(["statusStyle"]),
  },

  watch: {
    scrollTop(newValue, oldValue) {
      setTimeout(() => {
        if (newValue === window.scrollY) {
          if (this.oldScrollTop > newValue || newValue < 100) {
            this.navTab = true;
          } else {
            // } else if (this.isPhone) {
            this.navTab = false;
          }
          this.oldScrollTop = newValue;
        }
      }, 15);
    },
    "$i18n.locale": {
      immediate: true,
      handler: function (newVal) {
        //this.isCn=newVal=='zh'
        this.isCn = false;
      },
    },
  },

  created() {
    this.screenWidth = document.documentElement.clientWidth;
    this.isPhone = this.screenWidth <= this.main_phone;
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    if (getValue("user") === undefined || getValue("user") === null) {
      this.hasUser = false;
      this.user = null;
    } else {
      this.hasUser = true;
      this.user = getValue("user");
    }
  },

  mounted() {
    this.handleScroll();

    // this.onLanguageDropdownCommand('en')
    /*
    if (localStorage.getItem('locale') === '' || localStorage.getItem('locale') === null || localStorage.getItem('locale') === 'en') {
      this.onLanguageDropdownCommand('en')
    } else {
      this.onLanguageDropdownCommand('cn')
    }
    */

    if (
      getValue("locale") === "" ||
      getValue("locale") === undefined ||
      getValue("locale") === null ||
      getValue("locale") === "en"
    ) {
      this.onLanguageDropdownCommand("en");
    } else {
      this.onLanguageDropdownCommand("zh");
    }
    const path = this.$route.path.split("/")[1];
    const params = this.$route.path.split("/")[2];
    if (path == "") {
      $("[data-index=home]").addClass("is-active");
    } else if (path == "block") {
      $("[data-index=Block]").addClass("is-active");
      $("[data-index=block]").addClass("is-active");
    } else if (path == "mining") {
      $("[data-index=Block]").addClass("is-active");
      $("[data-index=mining]").addClass("is-active");
    } else if (path == "txns") {
      $("[data-index=Block]").addClass("is-active");
      $("[data-index=txns]").addClass("is-active");
    } else if (path == "coins") {
      $("[data-index=Block]").addClass("is-active");
      $("[data-index=coins]").addClass("is-active");
    } else if (path == "token") {
      $("[data-index=Block]").addClass("is-active");
      $("[data-index=token]").addClass("is-active");
    } else if (path == "absent") {
      $("[data-index=Block]").addClass("is-active");
      $("[data-index=absent]").addClass("is-active");
    } else if (path == "lock") {
      $("[data-index=lockpledge]").addClass("is-active");
      $("[data-index=lock]").addClass("is-active");
    } else if (path == "lock") {
      $("[data-index=flowlock]").addClass("is-active");
      $("[data-index=lock]").addClass("is-active");
    } else if (path == "lock") {
      $("[data-index=nodeLock]").addClass("is-active");
      $("[data-index=lock]").addClass("is-active");
    } else if (path == "lock") {
      $("[data-index=minerLock]").addClass("is-active");
      $("[data-index=lock]").addClass("is-active");
    } else if (path == "pledge") {
      $("[data-index=lockpledge]").addClass("is-active");
      $("[data-index=pledge]").addClass("is-active");
    } else if (path == "nodes") {
      $("[data-index=nodes]").addClass("is-active");
    } else if (path == "extract") {
      $("[data-index=lockpledge]").addClass("is-active");
      $("[data-index=extract]").addClass("is-active");
    } else if (path == "voter") {
      $("[data-index=dpos]").addClass("is-active");
      $("[data-index=voter]").addClass("is-active");
    } else if (path == "punishment") {
      $("[data-index=dpos]").addClass("is-active");
      $("[data-index=punishment]").addClass("is-active");
    } else if (path == "accounts") {
      $("[data-index=accounts]").addClass("is-active");
    } else if (path == "apis") {
      $("[data-index=apis]").addClass("is-active");
      if (params == "1") {
        $("[data-index=apis1]").addClass("is-active");
      } else if (params == "2") {
        $("[data-index=apis2]").addClass("is-active");
      } else if (params == "3") {
        $("[data-index=apis3]").addClass("is-active");
      } else if (params == "4") {
        $("[data-index=apis4]").addClass("is-active");
      } else if (params == "5") {
        $("[data-index=apis5]").addClass("is-active");
      } else if (params == "6") {
        $("[data-index=apis6]").addClass("is-active");
      } else if (params == "7") {
        $("[data-index=apis7]").addClass("is-active");
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    isShow(name) {
      return !this.hideMenus.includes(name);
    },
    handleCopy() {
      this.copy(this.$store.getters.account || "");
    },
    copy(data) {
      var that = this;
      const url = data;
      const oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message({
        message: that.$t("accounts.copySuccess"),
        type: "success",
      });
      oInput.remove();
    },
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },
    handleLogoClick() {
      this.$router.push("/");
    },
    handleCoins() {
      this.$router.push("/coins/0");
    },
    trimPath(path) {
      path = path.replace(/\//g, "");
      if (path) {
        path = path.replace(path[0], path[0].toUpperCase());
      }
      return path;
    },
    handleSelect(key, keyPath) {
      if (key == "") {
        key = keyPath;
      }
      this.navIndex = keyPath[0];
      this.drawer = false;

      if (key == "Apis") {
        helper.goPathUrl(this, key, keyPath);
      } else {
        helper.goUrl(this, key, "");
      }
    },
    openWindow() {
      window.open(this.UNISWAP_URL, "_blank");
    },
    seachData() {
      var that = this;
      this.searchInput = this.searchInput.trim();
      console.log(this.searchInput);
      if (this.searchInput === "" || this.searchInput === null) {
        return "";
      }
      api
        .postJson("/platform/searchByParam", { param: this.searchInput })
        .then((response) => {
          if (response.statusCode !== 0) {
            that.$message({
              type: "error",
              message: response.message,
            });
          } else {
            const type = response.result.type;
            let home = "Search";
            switch (type) {
              case 1:
                home = "Blockinfo";
                break;
              case 2:
                home = "Txnsinfo";
                break;
              case 3:
                home = "Accountsinfo";
                break;
            }

            helper.goPathUrl(that, home, that.searchInput);
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
          this.dialogVisible = true;
          console.error(error);
        });
    },

    handleScroll() {
      window.addEventListener("scroll", () => {
        this.scrollTop =
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset;
      });
    },

    handleResize(event) {
      this.screenWidth = document.documentElement.clientWidth;
      this.isPhone = this.screenWidth <= this.main_phone;
    },

    handleSignIn() {
      this.$parent.loginFlag = true;
    },

    handleSignUp() {
      this.$parent.registerFlag = true;
    },

    handleGoShopcart() {
      if (this.$parent.isSupplementComplete) {
        this.$router.replace("/shopcart/index");
      } else {
        this.$parent.supplementInformationFlag = true;
      }
    },

    getLanguageName() {
      return this.$parent.language === "en"
        ? this.$t("header.lang_en")
        : this.$t("header.lang_zh");
    },

    handleNameDropdownCommand(option) {
      if (option === "personal-center") {
        this.$router.replace("/personal-center/index");
      } else if (option === "logout") {
        this.$store.dispatch("Logout");
        this.$router.push("/");
      }
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.hasUser = false;
      this.$router.push("/");
    },
    goAnchor(selector) {
      this.drawer = false;
      const anchor = document.getElementById(selector);
      const total = anchor.offsetTop;
      let distance =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      let step = total / 50;
      if (distance < total) {
        (function smoothDown() {
          if (distance < total) {
            distance += step;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothDown, 10);
          } else {
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total;
          }
        })();
      } else {
        const newTotal = distance - total;
        step = newTotal / 50;
        (function smoothUp() {
          if (distance > total) {
            distance -= step;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothUp, 5);
          } else {
            document.documentElement.scrollTop = total;
          }
        })();
      }
    },
    getTriggerMode() {
      if (window.innerWidth > 1200) {
        return "hover";
      } else {
        return "click";
      }
    },
    onLanguageDropdownCommand(langVal) {
      if (langVal === "en") {
        langVal = "en";
      } else {
        langVal = "zh";
      }

      setValue("locale", langVal);
      // localStorage.setItem('locale', langVal)

      this.$i18n.locale = langVal;
    },
    getLang() {
      return getValue("locale");
      // return localStorage.getItem('locale')
    },
  },
};
</script>

<style lang="scss" >
.header-container .el-input__inner{
  border: none !important;
  background-color: rgba(255, 255, 255, 1) !important;
  width: 370px !important;
  border-radius: 4px 0px 0px 4px !important;
  color: #2d353b !important;
  margin-right: 60px;
}

.header-container
  .el-menu--horizontal
  > .el-submenu
  .el-submenu__title {
  // height: 34px;
  // line-height: 34px;
  // border-radius: 17px;
  // margin-top: 20px;

  line-height: 70px;
  border-bottom: none;
  color: #ffffff;
}

.header-container
 .el-menu--horizontal
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  // -webkit-transform: rotateZ(-90deg);
  //-ms-transform: rotate(-90deg);
  // transform: rotateZ(-90deg);
  color: #ffffff;
}
//菜单展开
.header-container
  .el-menu--horizontal
  > .el-submenu.is-opened
  > .el-submenu__title
  .el-submenu__icon-arrow {
  //-webkit-transform: rotateZ(0deg);
  // -ms-transform: rotate(0deg);
  // transform: rotateZ(0deg);
  color: #ffffff;
}

.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

@media screen and (max-width: 1200px) {
  .header-container .el-input__inner {
    width: 220px !important;
  }

  .header-container
    .el-menu--horizontal
    > .el-submenu
    .el-submenu__title {
    line-height: 55px;
  }
}

@media screen and (max-width: 1200px) {
  .header-container .el-input__inner {
    width: 200px !important;
  }
}
</style>
