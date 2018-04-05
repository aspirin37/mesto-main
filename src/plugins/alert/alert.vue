<template>
  <transition name="drop">
    <div class="ralert rounded-right" v-bind:class="alertClasses" v-if="alertShow">
      <b>{{alertMessage}}</b>
      <span class="d-block" v-if="alertText">{{alertText}}</span>
      <router-link :to="alertLink.to" class="d-block" v-if="alertLink.to">{{alertLink.text}}</router-link>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VueAlert',
  data () {
    return {
      alertMessage: '',
      alertText: '',
      alertLink: {},
      alertType: '',
      alertShow: false,
      alertClasses: '',
      default: {
        classes: 'border-success',
        duration: null,
        forceRender: true,
        message: '',
        text: '',
        link: {},
        type: 'hide'
      }
    }
  },
  methods: {
    clearDefault () {
      this.default.type = 'hide'
    },
    setDefault ({ message = this.default.message, type = this.default.type, duration = this.default.duration, forceRender = this.default.forceRender } = {}) {
      this.default.message = message
      this.default.type = type
      this.default.duration = duration
      this.default.forceRender = forceRender
      return this
    },
    show ({ message = this.default.message, text = this.default.text, link = this.default.link, type = this.default.type, duration = this.default.duration, forceRender = this.default.forceRender, classes = this.default.classes } = {}) {
      this.alertClasses = classes
      this.alertShow = true
      this.alertText = text
      this.alertMessage = message
      this.alertLink = link
      this.alertType = `border-${type}`
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout)
      }
      /* istanbul ignore else */
      if (duration) {
        this.alertTimeout = setTimeout(() => {
          if (this.default.type === 'hide') {
            this.hide()
          } else {
            this.show({
              duration: false
            })
          }
        }, duration)
      }
    },
    hide () {
      this.alertShow = false
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout)
      }
    }
  }
}
</script>

<style lang="scss">
  .ralert{
    position: fixed;
    top: 18%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 9999;
    max-width: 100%;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    padding: 1rem 1.5rem;
    background-color: #fff;
    border-left: 6px solid #d9534f;
  }
</style>
