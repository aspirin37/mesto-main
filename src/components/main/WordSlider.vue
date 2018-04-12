<template>
  <span class="word-slider">
    <span class="word-slider__item" :class="cssClass">{{words[current]}}</span>
  </span>
</template>

<script>
export default {
  name: 'word-slider',
  data () {
    return {
      current: 0,
      seconds: 6,
      animSeconds: 1,
      word: '',
      interval: null,
      cssClass: ''
    }
  },
  props: {
    words: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    this.switchSlide()
  },
  beforeDestroy () {
    this.stopSwitching()
  },
  methods: {
    setSlide (num) {
      console.log(this.current)
      setTimeout(() => {
        this.current = num
        console.log(this.current)
      }, (this.animSeconds / 4) * 1000)
    },
    switchSlide () {
      this.interval = setInterval(() => {
        this.addCssClass()
        let num = this.current
        num = this.current + 1
        if (num >= this.words.length) {
          num = 0
        }
        this.setSlide(num)
      }, this.seconds * 1000)
    },
    stopSwitching () {
      clearInterval(this.interval)
    },
    addCssClass () {
      this.cssClass = 'word-slider__item--active'
      setTimeout(() => {
        this.cssClass = ''
      }, (this.animSeconds / 2) * 1000)
    }
  }
}
</script>
