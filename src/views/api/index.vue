<template>
  <div class="api-container">
    <div v-if="!showEn" class="content-container">
      <div class="empty_text" v-if="api.length==0">
        {{$t("comm.noData")}}
      </div>
      <div class="api-interface pc-and-pad" v-for="(item,index) in api" :key="item.id">
        <div class="api-interface-label">
          <div class="api-interface-title">{{ item.groupName }} {{ item.url }}</div>
          <div class="api-interface-note"><p>{{ item.descion }}</p><div v-if="(item.method).indexOf('GET') != -1" class="api-get">GET</div><div v-if="(item.method).indexOf('POST') != -1" class="api-post">POST</div></div>
          <div class="api-interface-url">{{ item.action }}</div>
          <div class="api-interface-name">{{ item.methodName }}<div v-show="item.isShow" class="api-show" @click = "toggleShow(index)">{{ $t('api.hide') }}<i></i></div><div v-show="!item.isShow" class="api-show" @click = "toggleShow(index)">{{ $t('api.show') }}<i class="down"></i></div></div>
        </div>
        <div class="api-interface-content" v-show="item.isShow">
          <div class="api-interface-content-parameter">
           <div class="api-interface-parameter">{{ $t('api.params') }}</div>
           <div class="api-interface-parameter-content">
             <div class="api-interface-parameter-list" v-for="(param,index) in (JSON.parse(api[index].valuesConf))" :key="index">
               <div class="api-interface-parameter-label"><p>{{ param.module }}</p><p>{{ param.type }}</p></div>
               <div class="api-interface-parameter-detail"><p>{{ param.moduleValue }}</p><p>{{ param.description }}</p></div>
             </div>
           </div>
          </div>
          <div class="api-interface-content-parameter api-interface-content-response">
           <div class="api-interface-parameter">{{ $t('api.response') }}</div>
           <div class="api-interface-parameter-content">
             <div class="api-interface-parameter-list">
               <div class="api-interface-parameter-label"><p>Code</p></div>
               <div class="api-interface-parameter-detail"><p>{{ item.code }}</p></div>
             </div>
             <div class="api-interface-parameter-list">
               <div class="api-interface-parameter-label"><p>Description</p></div>
               <div class="api-interface-parameter-detail"><p>{{ item.resultDesc }}</p></div>
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="content-container">
      <div class="empty_text" v-if="apiEn.length==0">
        {{$t("comm.noData")}}
      </div>
      <div class="api-interface pc-and-pad" v-for="(item,index) in apiEn" :key="item.id">
        <div class="api-interface-label">
          <div class="api-interface-title">{{ item.groupName }} {{ item.url }}</div>
          <div class="api-interface-note"><p>{{ item.descion }}</p><div v-if="(item.method).indexOf('GET') != -1" class="api-get">GET</div><div v-if="(item.method).indexOf('POST') != -1" class="api-post">POST</div></div>
          <div class="api-interface-url">{{ item.action }}</div>
          <div class="api-interface-name">{{ item.methodName }}<div v-show="item.isShow" class="api-show" @click = "toggleShowEn(index)">{{ $t('api.hide') }}<i></i></div><div v-show="!item.isShow" class="api-show" @click = "toggleShowEn(index)">{{ $t('api.show') }}<i class="down"></i></div></div>
        </div>
        <div class="api-interface-content" v-show="item.isShow">
          <div class="api-interface-content-parameter">
           <div class="api-interface-parameter">{{ $t('api.params') }}</div>
           <div class="api-interface-parameter-content">
             <div class="api-interface-parameter-list" v-for="(param,index) in (JSON.parse(api[index].valuesConf))" :key="index">
               <div class="api-interface-parameter-label"><p>{{ param.module }}</p><p>{{ param.type }}</p></div>
               <div class="api-interface-parameter-detail"><p>{{ param.moduleValue }}</p><p>{{ param.description }}</p></div>
             </div>
           </div>
          </div>
          <div class="api-interface-content-parameter api-interface-content-response">
           <div class="api-interface-parameter">{{ $t('api.response') }}</div>
           <div class="api-interface-parameter-content">
             <div class="api-interface-parameter-list">
               <div class="api-interface-parameter-label"><p>Code</p></div>
               <div class="api-interface-parameter-detail"><p>{{ item.code }}</p></div>
             </div>
             <div class="api-interface-parameter-list">
               <div class="api-interface-parameter-label"><p>Description</p></div>
               <div class="api-interface-parameter-detail"><p>{{ item.resultDesc }}</p></div>
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/api'
import * as helper from '@/utils/helper'
import { getCookie } from '@/utils/auth'
export default {
  name: 'Txnsinfo',
  data() {
    return {
      tranAddr: '',
      api: {},
      apiEn: {}
    }
  },
  computed: {
    // a computed getter
    showEn: function () {
      // `this` points to the vm instance
      return this.$i18n.locale === 'en'
    }
  },

  created() {
    // let width = document.documentElement.clientWidth
    // this.$parent.showheader(false)
    // this.$parent.showfooter(false)
    this.tranAddr = this.$route.params.id
    this.getTranInfo()
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.intervalToken) {
      clearInterval(this.intervalToken)
    }
  },
  methods: {

    toggleShow(index){
      this.api[index].isShow = !this.api[index].isShow
    },
    toggleShowEn(index){
      this.apiEn[index].isShow = !this.apiEn[index].isShow
    },
    
    getTranInfo() {
      var that = this
      api.post('/platform/getAllParamters', {
        types: that.tranAddr,
        language: 'en'
      }).then(response => {
        that.apiEn = response.result
      })
      api.post('/platform/getAllParamters', {
        types: that.tranAddr,
        language: 'zh'
      }).then(response => {
        that.api = response.result
      })
    }
  }
}
</script>
<style scoped>
.empty_text{
  text-align: center;
  color:#999;
  line-height: 300px;
}
</style>