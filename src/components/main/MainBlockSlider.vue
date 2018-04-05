<template>
  <transition name="banner">
    <div class="main-block-baner d-none d-md-block">
      <div class="main-block-baner__bg float-right relative">
        <p>{{currentText}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'main-block-slider',
  data () {
    return {
      info: ['Курьерский сервис день в день', 'Следи за курьером онлайн', 'Доступно для Android и iOS'],
      currentText: '',
      countdown: null
    }
  },
  created () {
    this.currentText = this.info[0]
    this.setInterval()
  },
  beforeDestroy () {
    clearInterval(this.countdown)
  },
  watch: {
    '$route' () {
      clearInterval(this.countdown)
    }
  },
  methods: {
    setInterval () {
      let index = 0
      this.countdown = setInterval(() => {
        this.currentText = this.info[index++]
        if (index === this.info.length) {
          index = 0
        }
      }, 3000)
    }
  }
}
</script>
