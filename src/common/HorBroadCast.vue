<template>
  <div :style="takeContainerStyle" class="com_broadcast_container">
    <ul ref="com_container">
      <li v-for="item in bindData" :key="item" :style="takeItemStyle">
        <a :href="item.link" :style="takeLinkStyle" :target="getWindowTarget(item)">
          {{ item.content }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HorBroadCast',
  props: {
    
    data: {
      type: Array,
      required: true
    },

   
    speed: {
      type: Number,
      default: 1
    },

   
    row_height: {
      type: Number,
      default: 36
    },

   
    spacing: {
      type: Number,
      default: 40
    },

   
    background: {
      type: String,
      default: 'transparent'
    },

    
    color: {
      type: String,
      default: '#FFF'
    },

    
    font_size: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      timer: null,
      bindData: []
    }
  },
  computed: {
    takeContainerStyle: function() {
      return 'height:' + this.row_height + 'px;' + 'line-height:' + this.row_height + 'px;' + 'background:' + this.background
    },

    takeItemStyle: function() {
      return 'margin-right:' + this.spacing + 'px'
    },

    takeLinkStyle: function() {
      return 'color:' + this.color + ';font-size:' + this.font_size + 'px;'
    }
  },
  watch: {
    data: function(newData, oldData) {
      this.bindData.splice(0, this.bindData.length)
      this.bindData = newData.concat(newData)
      const vueThis = this
      setTimeout(() => {
        vueThis.startScroll(vueThis)
      }, 200)
    }
  },
  created() {

  },
  mounted() {

  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    getWindowTarget: function(item) {
      if (item.link.indexOf('/') === 0) {
        return '_self'
      } else {
        return '_blank'
      }
    },
    startScroll: function(context) {
      if (context.data && context.data.length > 0) {
        if (context.timer) {
          clearInterval(context.timer)
          context.timer = null
        }
        const mContainer = this.$refs.com_container
        // mContainer.innerHTML += mContainer.innerHTML;
        const items = mContainer.getElementsByTagName('li')
        let totalWidth = 0
        for (let i = 0; i < items.length; i++) {
          totalWidth += items[i].offsetWidth + context.spacing
        }
        mContainer.style.width = totalWidth + 'px'
        let left = 0

        context.timer = setInterval(function() {
          left -= context.speed
          if (left < -mContainer.offsetWidth / 2) {
            left = 0
          }
          mContainer.style.left = left + 'px'
        }, 20)
      }
    }
  }
}
</script>

<style scoped>
.com_broadcast_container {
  position: relative;
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: transparent;
  overflow: hidden;
}

.com_broadcast_container>ul {
  position: absolute;
  left: 0;
  top: 0;
}

.com_broadcast_container>ul li {
  width: auto;
  height: 100%;
  margin-right: 40px;
  color: white;
  float: left;
}
</style>
