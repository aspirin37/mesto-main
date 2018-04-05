<template>
  <div v-on:keyup="setKeyControl">
    <slot></slot>
    <div class="thumb-img__bg" v-if="isShowed"></div>
    <a href="#" v-on:click.prevent="setKeyControl(37)" class="thumbs-control thumbs-control--left" v-if="isShowed"></a>
    <a href="#" v-on:click.prevent="setKeyControl(39)" class="thumbs-control thumbs-control--right" v-if="isShowed"></a>
  </div>
</template>

<script>
export default {
  name: 'thumbnails-outer',
  props: {
    isOpen: false
  },
  data () {
    return {
      thumbs: [],
      activeEl: null,
      isShowed: false
    }
  },
  created () {
    this.thumbs = this.$children
    this.$on('indexSetted', (index) => {
      this.activeEl = index
    })
    this.$on('isShowed', (val) => {
      this.isShowed = val
    })
  },
  methods: {
    setKeyControl (event) {
      if (this.activeEl !== null) {
        switch (event.keyCode || event) {
          case 27:
            this.thumbs[this.activeEl].escaped()
            break
          case 37:
            this.thumbs[this.activeEl].toggleShowThumb()
            this.setActiveEl(-1)
            break
          case 39:
            this.thumbs[this.activeEl].toggleShowThumb()
            this.setActiveEl(1)
            break
        }
      }
    },
    setActiveEl (dir) {
      this.activeEl += dir
      if (this.activeEl < 0) {
        this.activeEl = this.thumbs.length - 1
      } else if (this.activeEl > this.thumbs.length - 1) {
        this.activeEl = 0
      }
      this.thumbs[this.activeEl].toggleShowThumb()
    }
  }
}
</script>
