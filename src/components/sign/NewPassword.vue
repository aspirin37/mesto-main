<template>
  <div>
    <form v-on:submit.prevent="sendSms" v-if="currentStep === 0" class="d-inline-block">
      <div class="input-group mb-3 mr-3 w-auto d-inline-flex text-left">
        <input type="tel"
          class="form-control form-control-lg sign-mw mx-0"
          placeholder="Номер телефона"
          v-masked-input="currentPhoneMask"
          v-model="phoneNumber"
          :disabled="!isAuth ? false : true"
        >
        <div class="input-group-append">
          <button type="submit" class="btn btn-theme btn-lg" :disabled="formatedPhone.length < 11">Получить код</button>
        </div>
      </div>
      <p class="text-danger" v-if="errorMessage">{{errorMessage}}</p>
      <!-- <div class="form-group sign-mw mx-auto">
        <input type="tel" class="form-control" placeholder="Номер телефона" v-masked-input="currentPhoneMask" v-model="phoneNumber" :disabled="!isAuth ? false : true">
      </div>
      <p class="text-danger">{{errorMessage}}</p>
      <div class="form-group sign-mw mx-auto">
        <button type="submit" class="btn btn-theme btn-block" :disabled="formatedPhone.length < 11">Получить код</button>
      </div> -->
    </form>
    <form v-on:submit.prevent="setPassword" v-if="currentStep === 1" class="d-inline-block">
      <p class="lead mw-600 text-left">Мы отправили СМС с кодом на номер {{phoneNumber}}. <br>Введите его в форму ниже:</p>
      <sms-input :phone="phoneNumber" v-on:codeTyped="changePin" v-on:sendSms="sendSms"></sms-input>
      <transition name="drop">
        <div v-if="!(pin.length < 4)" class="d-inline-block">
          <p class="lead mw-600">Теперь введите новый пароль:</p>
          <div class="d-flex flex-wrap">
            <div class="form-group relative sign-mw mr-2">
              <input type="password" class="form-control form-control-lg" placeholder="Новый пароль" v-model="password" :disabled="paswTyped" v-if="!showPassword">
              <input type="text" class="form-control form-control-lg" placeholder="Новый пароль" v-model="password" :disabled="paswTyped" v-if="showPassword">
              <a href="#" class="show-password" v-bind:class="{'show-password--d-none' : !showPassword}" v-on:click.prevent="showPassword = !showPassword" title="Показать пароль"></a>
            </div>
            <div class="form-group relative sign-mw mr-2" v-bind:class="{'has-error': password !== passwordRepeat}">
              <input type="password" class="form-control form-control-lg" placeholder="Повторите пароль" v-model="passwordRepeat" :disabled="paswTyped" v-if="!showPassword">
              <input type="text" class="form-control form-control-lg" placeholder="Повторите пароль" v-model="passwordRepeat" :disabled="paswTyped" v-if="showPassword">
            </div>
            <div class="form-group sign-mw mr-2" v-if="!(pin.length < 4)">
              <button type="submit" class="btn btn-theme btn-block btn-lg" :disabled="(formatedPhone.length < 11) || (pin.length < 4) || !password.length || (password !== passwordRepeat)">Сохранить пароль</button>
            </div>
          </div>
          <p class="text-danger" v-if="password !== passwordRepeat">Пароли должны совпадать</p>
        </div>
      </transition>
      <p class="text-danger text-center">{{errorMessage}}</p>
    </form>
  </div>
</template>

<script>
import auth from '@/auth'
import subtraction from '@/mixins/subtraction'
import SmsInput from '@/components/inner/SmsInput'
import maskedInput from '@/directives/maskedInput'

export default {
  name: 'new-password',
  data () {
    return {
      password: '',
      passwordRepeat: '',
      pin: '',
      smsDisabled: false,
      paswSetted: false,
      paswTyped: false,
      showPassword: false,
      errorMessage: '',
      phoneNumber: '',
      currentStep: 0,
      smsSended: false
    }
  },
  watch: {
    paswSetted (val) {
      if (val) {
        this.$emit('onPassSetted')
      }
    }
  },
  props: {
    route: String,
    phone: {
      type: String,
      default: ''
    },
    fromAuth: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    maskedInput
  },
  components: {
    SmsInput
  },
  mounted () {
    this.phoneNumber = this.phone
    if (this.fromAuth) {
      this.sendSms()
    }
  },
  computed: {
    isAuth () {
      return auth.user.authenticated
    },
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry][this.phone.replace(/\+|-|_|\(|\)|\s/g, '').length > 10 ? 1 : 0]
    },
    formatedPhone () {
      return this.phoneNumber.replace(/\+|-|_|\(|\)|\s/g, '')
    }
  },
  mixins: [subtraction],
  methods: {
    setPassword () {
      let data = {
        phone: this.formatedPhone,
        pass: this.password,
        pin: this.pin
      }
      if (this.password === this.passwordRepeat) {
        auth.setPassword(this, data, this.route || '').then(response => {
          if (response) {
            this.$emit('signed')
            this.$alert.show({
              message: 'Пароль успешно изменен',
              duration: 1500
            })
          } else {
            this.errorMessage = 'Неверный код, попробуйте еще раз'
          }
        })
      }
    },
    changePin (e) {
      this.pin = e
    },
    sendSms () {
      let options = {
        phone: this.formatedPhone
      }
      auth.sendSms(this, options).then(() => {
        if (this.smsSended) {
          this.currentStep = 1
        }
      })
      this.smsDisabled = true

      this.setSubstr()

      setTimeout(() => {
        this.smsDisabled = false
      }, this.repeatSec * 1000)
    }
  }
}
</script>
