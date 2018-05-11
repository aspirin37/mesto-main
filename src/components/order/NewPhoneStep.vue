<template>
  <div>
    <form v-on:submit.prevent="sendSms">
      <div class="modal-height-body">
        <div class="cap__circle"><i class="material-icons">textsms</i></div>
        <p class="text-center">Для подтверждения заказа введите ваш номер телефона, мы пришлём СМС с проверочным кододм</p>
        <div class="row w-100 justify-content-center">
          <div class="col-12 col-md-6">
            <div class="form-group">
              <input
                v-masked-input="currentPhoneMask[0]"
                type="tel"
                name="phone"
                v-model="phone"
                class="form-control"
                placeholder="Телефон"
              >
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-theme w-100" :disabled="phone.length < 11">Получить код</button>
            </div>
          </div>
        </div>
        <p class="text-danger text-center">{{errorMessage}}</p>
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
import api from '@/store/api'
import auth from '@/auth'
import Modal from '@/components/utils/Modal'
import Privacy from '@/components/Privacy'
import maskedInput from '@/directives/maskedInput'

export default {
  name: 'sms-confirm-step',
  data () {
    return {
      rules: '',
      phone: '',
      errorMessage: ''
    }
  },
  components: {
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
    isAuth () {
      return auth.user.authenticated
    }
  },
  mounted () {
    this.loadrules()
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    loadrules () {
      this.$http.get(api.API_LINK + '/webview/terms/1/agreement-client.php').then(response => {
        this.rules = response.body
      })
    },
    sendSms () {
      this.$emit('sendSms', this.phone)
    }
  }
}
</script>