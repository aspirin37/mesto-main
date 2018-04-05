<template>
  <div>
    <form v-on:submit.prevent="confirmOrder">
      <div class="modal-height-body">
        <div class="cap__circle"><i class="material-icons">textsms</i></div>
        <p class="text-center">Мы отправили СМС с кодом на номер <b><span v-html="phone" v-masked-input="currentPhoneMask[1]" class="text-nowrap"></span></b>. Введите этот код</p>
        <div class="row w-100 justify-content-center">
          <div class="col-12 col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" v-model="pin" placeholder="Код из СМС">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-theme w-100" :disabled="pin.length < 4">Подтвердить</button>
            </div>
          </div>
        </div>
        <p>
          <span v-if="smsDisabled">Выслать код повторно через {{smsDisabled ? '0:' + repeatSec : ''}}</span>
          <a href="#" v-else v-on:click.prevent="resendConfirmSms">Выслать код повторно</a>
        </p>
        <p class="text-danger text-center">{{errorMessage}}</p>
        <!-- <p v-if="!isAuth" class="text-center">
          <span>После подтверждения по СМС мы перенаправим вас<br>на страницу с заказом и авторизуем.</span>
        </p> -->
      </div>
      <div v-if="!isAuth">
        Используя сервис, вы соглашаетесь с <a href="#" v-on:click.prevent="toggleModal('terms')" target="_blank">пользовательским соглашением</a> и обработкой <a href="#" v-on:click.prevent="toggleModal('privacy')" target="_blank">персональных данных.</a>
      </div>
    </form>
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
import api from '../../store/api'
import auth from '../../auth'
import Modal from '../utils/Modal'
import Privacy from '../Privacy'
import maskedInput from '../../directives/maskedInput'
import subtraction from '../../mixins/subtraction'

export default {
  name: 'sms-confirm-step',
  data () {
    return {
      rules: '',
      pin: '',
      errorMessage: '',
      smsDisabled: false
    }
  },
  props: {
    phone: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: null
    }
  },
  directives: {
    maskedInput
  },
  mixins: [subtraction],
  components: {
    Modal,
    Privacy
  },
  computed: {
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    },
    isAuth () {
      return auth.user.authenticated
    }
  },
  mounted () {
    this.loadrules()
    this.resendConfirmSms()
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    resendConfirmSms () {
      let options = {
        idt_order: this.orderId
      }
      this.$http.post(api.WEBCLIENT_URL + 'resendConfirmSms', options).then((response) => {
        let data = response.data
        this.smsDisabled = true

        this.setSubstr()

        setTimeout(() => {
          this.smsDisabled = false
        }, this.repeatSec * 1000)
        if (!data) {
          return
        }
        return
      })
    },
    confirmOrder () {
      let data = {
        phone: this.phone,
        idt_order: this.id,
        pin: this.pin
      }
      this.$http.post(api.WEBCLIENT_URL + 'confirmOrder', data).then((response) => {
        if (response.data.error !== 0) {
          this.errorMessage = response.data.error_description
        } else {
          this.errorMessage = ''
          this.$emit('smsConfirmed')
        }
      })
    },
    loadrules () {
      this.$http.get(api.API_LINK + '/webview/terms/1/agreement-client.php').then((response) => {
        this.rules = response.body
      })
    }
  }
}
</script>