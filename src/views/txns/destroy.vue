<template>
  <txns :toaddress="address" totitle="home.destroy"/>
</template>
<script>
import txns from "./index.vue"
export default {
    components:{txns},
    data(){
        return {
            address:"0x0000000000000000000000000000000000000000"
        }
    }
}
</script>