<template>
  <div class="input-group mb-3 mr-3 w-auto" v-bind:class="{'has-error' : errors.has('confirmation.sms-code')}">
    <input type="text"
      class="form-control form-control-lg sign-mw mx-0"
      placeholder="Код из СМС"
      v-model="pin"
      name="sms-code"
      v-on:keyup="onType"
      autofocus
      autocomplete="off"
    >
    <div class="input-group-append">
      <button type="button" class="btn btn-default btn-lg" v-on:click.prevent="sendSms" :disabled="smsDisabled">
        {{!smsDisabled ? 'Отправить снова' : 'Повторить через'}}
        {{smsDisabled ? repeatSec + ' сек' : ''}}
      </button>
    </div>
  </div>
</template>

<script>
import subtraction from '@/mixins/subtraction'

export default {
  name: 'sms-input',
  data () {
    return {
      pin: '',
      smsDisabled: false
    }
  },
  props: {
    phone: String,
    route: String
  },
  mixins: [subtraction],
  methods: {
    sendSms () {
      this.$emit('sendSms')
      this.smsDisabled = true

      this.setSubstr()

      setTimeout(() => {
        this.smsDisabled = false
      }, this.repeatSec * 1000)
    },
    onType (event) {
      let val = event.target.value

      this.$emit('codeTyped', val)
    }
  }
}
</script>
