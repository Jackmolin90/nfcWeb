<template>
  <div class="app-footer">
    <div class="content-container">
      <div class="footer-left">
        <div class="footer-logo">
          <img
            src="/static/images/top_logo.png"
            @click="handleSelect('', 'Home')"
          />
        </div>
        <div class="footer-text" v-html="$t('home.footerText')">
    
          {{ false ? $t("comm.intro") : "" }}
        </div>
      </div>
      <div class="footer-right" v-if="false">
        <h2>{{ $t("comm.community") }}</h2>
        <div class="logos">
          <div class="item">
            <a target="_blank" href="https://t.me/NetFlowCoinCommunity"
              ><img src="/static/images/telegram.png"
            /></a>
          </div>
          <div class="item">
            <a target="_blank" href="https://twitter.com/NetFlowCoin_io"
              ><img src="/static/images/twitter.png" style="margin: 0 auto"
            /></a>
          </div>
          <div v-if="false" class="item">
            <a
              target="_blank"
              href="https://www.facebook.com/Netflowcoinofficial-102117091704116/"
              ><img src="/static/images/facebook.png"
            /></a>
          </div>
          <div class="item">
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCfvnw1bIF6fBsRia1tDnOSw"
              ><img src="/static/images/youtube.png"
            /></a>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="display-phone">
      <div class="content-container">
        <div class="item item-nav">
          <h2>{{ $t('home.home') }}</h2>
          <li><span class="cursor" @click="handleSelect('','Home')">{{ $t('home.home') }}</span></li>
        </div>
        <div class="item item-nav">
          <h2>DPoS</h2>
          <li><span class="cursor" @click="goToUrl('Voter','')">{{ $t('voter.voter') }}</span></li>
        </div>
        <div class="item item-nav">
          <h2>{{ $t('home.blockchain') }}</h2>
          <li><span class="cursor" @click="goToUrl('Block','')">{{ $t('home.block') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Mining','')">{{ $t('home.mining') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Txns','')">{{ $t('home.tran') }}</span></li>
        </div>
        <div class="item item-nav">
          <h2>{{ $t('home.pledgeLock') }}</h2>
          <li><span class="cursor" @click="goToUrl('Lock','')">{{ $t('lock.lock') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Pledge','')">{{ $t('lock.pledge') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Extract','')">{{ $t('lock.extract') }}</span></li>
        </div>

        <div class="item item-nav">
          <h2>APIs</h2>
          <li><span class="cursor" @click="goToUrl('Apis','1')">{{ $t('api.accounts') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Apis','2')">{{ $t('api.contract') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Apis','3')">{{ $t('home.tran') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Apis','4')">{{ $t('home.block') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Apis','5')">{{ $t('api.logs') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Apis','6')">{{ $t('api.node') }}</span></li>
          <li><span class="cursor" @click="goToUrl('Apis','7')">{{ $t('api.token') }}</span></li>
        </div>
        <div class="item item-language">
          <h2>{{ $t('comm.language') }}</h2>
          <li><span class="cursor" @click="onLanguageDropdownCommand('zh')">简体中文</span></li>
          <li><span class="cursor" @click="onLanguageDropdownCommand('en')">English</span></li>
        </div>
        <div class="item item-icon" style="padding-left:7px">
          <h2>{{ $t('comm.community') }}</h2>
          <div class="logos">
            <div class="item">
              <a target="_blank" href="https://t.me/NetFlowCoinCommunity"><img src="/static/images/telegram.png"></a>
            </div>
            <div class="item">
              <a target="_blank" href="https://twitter.com/NetFlowCoin_io"><img src="/static/images/twitter.png" style="margin:0 auto;"></a>
            </div>
            <div class="item">
              <a target="_blank" href="https://www.facebook.com/Netflowcoinofficial-102117091704116/"><img src="/static/images/facebook.png"></a>
            </div>
            <div class="item">
              <a target="_blank" href="https://www.youtube.com/channel/UCfvnw1bIF6fBsRia1tDnOSw"><img src="/static/images/youtube.png"></a>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { setValue } from "@/utils/auth";
import * as helper from "@/utils/helper";
export default {
  name: "AppFooter",
  props: {},
  data() {
    return {};
  },
  methods: {
    goToUrl(name, params) {
      helper.goPathUrl(this, name, params);
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
  },
};
</script>

<style lang="scss" scoped>
</style>
