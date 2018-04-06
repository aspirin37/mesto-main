<template>
  <div class="w-100">

    <!-- Phone -->
    <div class="d-inline-block" v-if="!smsSended">
      <p class="lead mw-600 text-left" v-if="signText">{{signText}}</p>
      <signup-phone-form v-on:submitted="sendSms(phone = $event)" :phone="phone"></signup-phone-form>
    </div>
    <!-- /Phone -->

    <!-- Pin -->
    <form v-on:submit.prevent="confirmAccount" v-else class="d-inline-block text-left">
      <p class="lead mw-600 mb-0">Мы отправили СМС с кодом на номер {{phone}}.</p>
      <p class="lead mw-600">{{pinText}}</p>
      <div class="mb-3"><a href="#" v-on:click.prevent="smsSended = !smsSended">Изменить номер</a></div>
      <div class="d-flex flex-wrap flex-md-nowrap">
        <div class="input-group mb-3 mr-3 w-auto">
          <input
            type="text"
            name="pin"
            ref="pin"
            v-model="pin"
            class="form-control sign-mw mx-0 input-number-reset"
            placeholder="Код из СМС"
            v-validate="'required'"
            v-bind:class="{'border-danger' : errors.has('pin'), 'bg-white border-secondary' : !errors.has('pin') && pin.length > 3}"
          >
          <div class="input-group-append">
            <button type="submit" class="btn btn-lg btn-theme w-100">Подтвердить</button>
          </div>
        </div>
        <div class="mb-3 d-inline-block d-flex align-items-center w-100">
          <a href="#" v-on:click.prevent="$emit('toggleSign')" class="btn btn-outline-secondary mr-2 btn-lg"><img src="../../assets/icons/login.svg" class="mr-1 vertical-middle half-opacity" alt=""><b>Войти</b></a>
          <small class="text-muted">Если уже пользовались<br>сервисом</small>
        </div>
      </div>
    </form>
    <!-- /Pin -->

    <p class="text-danger" v-if="errorMessage">{{errorMessage}}</p>

  </div>
</template>

<script>
import auth from '../../auth'
import SignupPhoneForm from './SignupPhoneForm'

export default {
  name: 'signup-block',
  data () {
    return {
      phone: this.globPhone || '',
      pin: '',
      errorMessage: '',
      user: auth.user,
      smsSended: false,
      rules: ''
    }
  },
  props: {
    routeTo: {
      type: String,
      default: ''
    },
    globPhone: {
      type: String,
      default: ''
    },
    signText: '',
    pinText: ''
  },
  components: {
    SignupPhoneForm
  },
  computed: {
    formatedPhone () {
      return this.phone.replace(/\+|-|_|\(|\)|\s/g, '')
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(success => {
        if (!success) {
          return
        }
        this.sendSms()
      })
    },
    sendSms () {
      // let tzOffset = -1 * (new Date().getTimezoneOffset() / 60)
      let options = {
        phone: +this.formatedPhone,
        // tz_offset: tzOffset,
        idc_traffic_source: 2
      }
      auth.sendSms(this, options).then(() => {
        this.$refs.pin.focus()
      })
    },
    confirmAccount () {
      let options = {
        phone: +this.formatedPhone,
        pin: this.pin
      }
      auth.signup(this, options, this.routeTo)
    }
  }
}
</script>
