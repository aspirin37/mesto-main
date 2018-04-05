<template>
  <input type="text" :placeholder="placeholder" :value="value" @input="onInput">
</template>

<style lang="stylus">
  $selectedDayBackground = #5E39BA
  $daySize = 20px
  $timeHeight = 100px
  @import "../../../node_modules/flatpickr/src/style/flatpickr.styl"
  .flatpickr-calendar
    &.noCalendar
      .flatpickr-time
        border-top: none
        border-bottom: none
        margin-top: 0
        margin-bottom: 0
    &.open
      display: flex
      flex-direction: column

    .flatpickr-month
      order: 1

    .flatpickr-time
      order: 2
      height: 45px!important
      line-height: 45px
      max-height: 45px
      border-top: 1px solid rgba(#000, 0.1)
      border-bottom: 1px solid rgba(#000, 0.1)
      margin-top: 10px
      margin-bottom: 10px
      .numInputWrapper
        height: 45px
      .time24hr
        .numInputWrapper
          height: 45px;
      input
        font-size: 24px
        &.flatpickr-hour
          text-align: right;
          padding-right: 15px;
        &.flatpickr-minute
          text-align: left;
          padding-left: 15px;
      .flatpickr-time-separator
        font-size: 24px

    .flatpickr-innerContainer
      order: 3

</style>

<script>
import Flatpickr from 'flatpickr'
import 'flatpickr/dist/l10n/ru.js'
// import {de} from 'flatpickr/dist/l10n/de.js'
// import {en} from 'flatpickr/dist/l10n/en.js'

Flatpickr.l10ns.en.rangeSeparator = ' - '

export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: 'ru'
    }
  },
  data () {
    return {
      fp: null
    }
  },
  computed: {
    fpOptions () {
      return JSON.stringify(this.options)
    }
  },
  watch: {
    fpOptions (newOpt) {
      const option = JSON.parse(newOpt)
      for (let o in option) {
        this.fp.set(o, option[o])
      }
    },
    value (val) {
      if (!val) {
        this.fp.clear()
      }
    }
  },
  mounted () {
    const self = this
    const origOnValUpdate = this.options.onValueUpdate
    this.fp = new Flatpickr(this.$el, Object.assign(this.options, {
      'locale': this.lang,
      onValueUpdate () {
        self.onInput(self.$el.value)
        if (typeof origOnValUpdate === 'function') {
          origOnValUpdate()
        }
      },
      onOpen () {
        self.$emit('opened')
      }
    }))
    this.$emit('FlatpickrRef', this.fp)
  },
  destroyed () {
    this.fp.destroy()
    this.fp = null
  },
  methods: {
    onInput (e) {
      typeof e === 'string' ? this.$emit('input', e) : this.$emit('input', e.target.value)
    },
    clearValue () {
      this.fp.clear()
    }
  }
}
</script>
