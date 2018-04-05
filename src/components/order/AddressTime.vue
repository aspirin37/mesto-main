<template>
  <label class="w-100 relative mb-0">
    <datepicker
      :options="fpOptions"
      :placeholder="$t('today')"
      :class="['form-control']"
      :value="currentTime"
      v-on:input="setAddressTime($event)"
      v-on:opened="getMinTime"
    ></datepicker>
    <img src="../../assets/icons/calendar.svg" alt="" class="input-icon input-icon--right half-opacity" v-if="!currentTime">
    <img src="../../assets/icons/close-del-gray.svg"
      v-on:click.prevent="removeAddressTime"
      v-else
      alt="del"
      title="Remove time"
      class="cursor-pointer input-icon input-icon--right half-opacity"
    >
  </label>
</template>

<script>
import Datepicker from '../utils/Datepicker'

export default {
  name: 'address-time',
  props: {
    step: null
  },
  data () {
    return {
      secSpace: 30,
      fpOptions: {
        enableTime: true,
        time_24hr: true,
        firstDayOfWeek: 2,
        shorthandCurrentMonth: true,
        minuteIncrement: 30,
        dateFormat: 'U',
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
  beforeMount () {
    this.getMinTime()
  },
  computed: {
    minDate () {
      return new Date().setMinutes(new Date().getMinutes() + this.secSpace)
    },
    currentTime () {
      let stateData = this.$store.state.orderAddresses[this.step]

      if (typeof stateData !== 'undefined') {
        return stateData.contact_time || ''
      } else {
        return ''
      }
    }
  },
  methods: {
    removeAddressTime () {
      let options = {
        step: this.step,
        key: 'contact_time'
      }
      this.$store.commit('REMOVE_ADDRESS_TIME', {options})
    },
    setAddressTime (time) {
      this.$emit('dateSetted', time)
      this.getMinTime()
    },
    getMinTime () {
      if (+this.step > 1) {
        let prevStep = this.$store.state.orderAddresses[(+this.step - 1).toString()]
        let prevTime = ''
        if (typeof prevStep !== 'undefined') {
          prevTime = prevStep.contact_time
        }

        this.fpOptions.minDate = prevTime ? (+prevTime + (+this.secSpace * 20)).toString() : this.minDate
      } else {
        this.fpOptions.minDate = this.minDate
      }
    }
  }
}
</script>
