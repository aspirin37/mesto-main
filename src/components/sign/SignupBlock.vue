<template>
  <div class="w-100">
    <form v-on:submit.prevent="validateBeforeSubmit" v-if="!smsSended" class="d-inline-block">
      <p class="lead mw-600 text-left" v-if="signText">{{signText}}</p>
      <div class="d-inline-flex flex-wrap flex-md-nowrap text-left">
        <div class="input-group mr-3 w-auto flex-md-nowrap">
          <input
            v-masked-input="currentPhoneMask[`${globPhone ? 1 : 0}`]"
            type="tel"
            name="phone"
            v-model="phone"
            class="form-control form-control-lg sign-input-width mx-0 mb-3"
            placeholder="Телефон"
            v-validate="'required'"
            v-bind:class="{'border-danger' : errors.has('phone'), 'bg-white border-secondary' : !errors.has('phone') && formatedPhone.length > 10}"
          >
          <div class="input-group-append mb-3">
            <button type="submit" class="btn btn-lg btn-theme w-100 sign-mw px-2 px-sm-3">Получить код</button>
          </div>
        </div>
        <div class="mb-3 d-inline-block d-flex align-items-center w-100">
          <a href="#" v-on:click.prevent="$emit('toggleSign')" class="btn btn-outline-secondary mr-2 btn-lg"><img src="../../assets/icons/login.svg" class="mr-1 vertical-middle half-opacity" alt=""><b>Войти</b></a>
          <small class="text-muted">Если уже пользовались<br>сервисом</small>
        </div>
      </div>
      <p class="text-danger text-left" v-if="errorMessage">{{errorMessage}}</p>
      <p class="small text-muted mw-400 text-left mr-auto">
        Используя сервис, вы соглашаетесь с <a href="#" v-on:click.prevent="toggleModal('terms')" target="_blank" class="text-dark">пользовательским соглашением</a> и обработкой <a href="#" v-on:click.prevent="toggleModal('privacy')" target="_blank" class="text-dark">персональных данных.</a>
      </p>
    </form>
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
        <!-- <div class="form-group">
          <input
            v-masked-input="currentPhoneMask[`${globPhone ? 1 : 0}`]"
            type="tel"
            name="phone"
            v-model="phone"
            class="form-control sign-mw mx-auto"
            placeholder="Телефон"
            v-validate="'required'"
            v-bind:class="{'border-danger' : errors.has('phone'), 'border-success' : !errors.has('phone') && formatedPhone.length > 10}"
          >
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-theme w-100">Подтвердить</button>
        </div> -->
        <div class="mb-3 d-inline-block d-flex align-items-center w-100">
          <a href="#" v-on:click.prevent="$emit('toggleSign')" class="btn btn-outline-secondary mr-2 btn-lg"><img src="../../assets/icons/login.svg" class="mr-1 vertical-middle half-opacity" alt=""><b>Войти</b></a>
          <small class="text-muted">Если уже пользовались<br>сервисом</small>
        </div>
      </div>

      <!-- <div class="form-group sign-mw mx-auto">
        <input
          type="text"
          name="pin"
          v-model="pin"
          class="form-control sign-mw"
          placeholder="Код из СМС"
          v-validate="'required'"
          v-bind:class="{'border-danger' : errors.has('pin')}"
        >
      </div>
      <div class="form-group sign-mw mx-auto">
        <button type="submit" class="btn btn-theme w-100">Подтвердить</button>
      </div> -->
      <p class="text-danger" v-if="errorMessage">{{errorMessage}}</p>
    </form>
    <!-- <new-password v-if="smsSended" :phone="phone" :fromAuth="true" :route="routeTo" v-on:signed="signed"></new-password> -->
    <modal
      modalSize="modal-lg"
      ref="terms"
      :clickedBack="true"
    >
      <div slot="modalBody">
        <div class="modal-scroll-body modal-scroll-body--md">
          <div v-html="rules" class="rules-pre"></div>
        </div>
      </div>
    </modal>
    <modal
      modalSize="modal-lg"
      ref="privacy"
      :clickedBack="true"
    >
      <div slot="modalBody">
        <div class="modal-scroll-body modal-scroll-body--md">
          <privacy></privacy>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import auth from '../../auth'
import api from '../../store/api'
// import NewPassword from './NewPassword'
import maskedInput from '../../directives/maskedInput'
import Modal from '../utils/Modal'
import Privacy from '../Privacy'

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
    globName: {
      type: String,
      default: ''
    },
    signText: '',
    pinText: ''
  },
  components: {
    // NewPassword,
    Modal,
    Privacy
  },
  directives: {
    maskedInput
  },
  computed: {
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    },
    formatedPhone () {
      return this.phone.replace(/\+|-|_|\(|\)|\s/g, '')
    }
  },
  mounted () {
    this.loadrules()
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then(success => {
        if (!success) {
          return
        }
        this.sendSms()
      })
    },
    openTermsModal (e) {
      if (!e.ctrlKey) {
        this.toggleModal('terms')
      } else {
        this.$router.push({ path: 'agreement' })
      }
    },
    openPrivacyModal (e) {
      if (!e.ctrlKey) {
        this.toggleModal('privacy')
      } else {
        this.$router.push({ path: 'privacy' })
      }
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
    },
    loadrules () {
      this.$http.get(api.API_LINK + '/webview/terms/1/agreement-client.php').then((response) => {
        this.rules = response.body
      })
    },
    signed () {
      this.$emit('signed')
    }
  }
}
</script>
