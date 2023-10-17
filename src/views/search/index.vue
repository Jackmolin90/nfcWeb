<template>
  <div class="search-container ">
    <div class="top-container">

    </div>
    <div class="content-container">
      <div>
        <img src="/static/images/no_data.png">
      </div>
      <div>
        {{ $t('comm.searchNoData',[search]) }}
      </div>
      <div class="back-input cursor" @click="back()">
        {{ $t('comm.backToHome') }}
      </div>
    </div>
  </div>
</template>

<script>
import * as helper from '@/utils/helper'

export default {
  name: 'Search',
  data() {
    return {
      search: ''
    }
  },
  computed: {

  },

  watch: {
    '$route'(to, from) {
      this.updSearch()
    }
  },

  created() {

  },
  mounted() {
    this.updSearch()
  },

  methods: {

    updSearch() {
      this.search = this.$route.params.id
    },

    back() {
      helper.goUrl(this, 'Home', '')
    }
  }
}
</script>

<style scoped>

</style>
