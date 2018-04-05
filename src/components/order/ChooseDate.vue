<template>
  <label class="w-100 relative mb-0">
    <datepicker
      :options="fpOptions"
      :placeholder="$t('today')"
      :class="classes"
      :value="thisValue"
      v-on:input="setNewDate($event)"
    ></datepicker>
    <i class="material-icons input-icon input-icon--right" v-if="!thisValue">date_range</i>
    <a href="#"
      v-on:click.prevent="removeOrderDate()"
      class="material-icons link-reset input-icon input-icon--right"
      v-else
      title="Remove time"
    >clear</a>
  </label>
</template>

<script>
import Datepicker from '../utils/Datepicker'

export default {
  name: 'choose-time',
  props: {
    timePoint: '',
    classes: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      fpOptions: {
        enableTime: true,
        time_24hr: true,
        firstDayOfWeek: 2,
        shorthandCurrentMonth: true,
        minuteIncrement: 30,
        altInput: true,
        altFormat: 'd.m.Y H:i',
        altInputClass: '',
        minDate: new Date()
      }
    }
  },
  components: {
    Datepicker
  },
  computed: {
    thisValue () {
      if (+this.timePoint > 1) {
        let prevTime = this.$store.state.orderTimes['time' + (+this.timePoint - 1).toString()]
        this.fpOptions.minDate = prevTime
      }
      let timeVal = this.$store.state.orderTimes['time' + this.timePoint]
      if (typeof timeVal !== 'undefined') {
        this.fpOptions.defaultDate = timeVal
      }
      // this.fpOptions.defaultDate = (typeof timeVal === 'undefined') ? '' : timeVal
      return (typeof timeVal === 'undefined') ? '' : timeVal
    }
  },
  mounted () {
    this.fpOptions.defaultDate = new Date().getTime()
    if (!this.thisValue) {
      this.fpOptions.minDate = new Date().setMinutes(new Date().getMinutes() + 20)
    }
  },
  methods: {
    removeOrderDate () {
      this.$store.commit('REMOVE_ORDER_TIME', 'time' + this.timePoint)
    },
    setNewDate (val) {
      let options = {
        key: this.timePoint,
        value: val
      }
      this.$store.commit('SET_ORDER_TIME', options)
    }
  }
}
</script>
