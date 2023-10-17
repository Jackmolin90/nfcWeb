<template>
  <div id="app">
    <loading-sub-pan />
    <router-view :key="this.$route.path"/>
  </div>
</template>

<script>
import loadingSubPan from "@/components/modules/loadingSubPan.vue"
export default {
  components:{loadingSubPan},
  name: 'App'
}
</script>
