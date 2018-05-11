<template>
  <div>
    <form v-on:submit.prevent="validateBeforeSubmit">
      <div class="d-inline-flex flex-wrap flex-md-nowrap text-left">
        <div class="input-group mr-3 w-auto flex-md-nowrap">
          <input
            v-masked-input="currentPhoneMask[0]"
            type="tel"
            name="phone"
            v-model="thisPhone"
            class="form-control form-control-lg sign-input-width mx-0 mb-3"
            placeholder="Телефон"
            v-bind:class="errors.has('phone') ? 'border-danger' : ''"
            v-validate="'required|verify_phone'"
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
      <p class="small text-muted mw-400 text-left mr-auto">
        Используя сервис, вы соглашаетесь с <a href="#" v-on:click.prevent="toggleModal('terms')" target="_blank" class="text-dark">пользовательским соглашением</a> и обработкой <a href="#" v-on:click.prevent="toggleModal('privacy')" target="_blank" class="text-dark">персональных данных.</a>
      </p>
    </form>

    <!-- Terms -->
    <modal
      modalSize="modal-lg"
      ref="terms"
      :clickedBack="true"
    >
      <div slot="modalBody">
        <div class="modal-scroll-body modal-scroll-body--md px-3">
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
    <!-- /Terms -->

  </div>
</template>

<script>
import maskedInput from '../../directives/maskedInput'
import Modal from '../utils/Modal'
import Privacy from '../Privacy'

export default {
  name: 'signup-phone-form',
  data () {
    return {
      rules: '',
      thisPhone: this.phone,
      validType: ''
    }
  },
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  components: {
    Modal,
    Privacy
  },
  created () {
    this.$validator.extend('verify_phone', {
      getMessage: field => `The ${field} is not a valid.`,
      validate: value => new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valid: this.formatedPhone.length >= 11
          })
        }, 100)
      })
    })
  },
  directives: {
    maskedInput
  },
  computed: {
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    },
    formatedPhone () {
      return this.thisPhone.replace(/\+|-|_|\(|\)|\s/g, '')
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
        this.$emit('submitted', this.thisPhone)
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
    loadrules () {
      let url = `${window.location.origin}/terms/agreement/`

      this.$http.get(url).then(response => {
        this.rules = response.body
      })
    }
  }
}
</script>
