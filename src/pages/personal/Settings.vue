<template>
  <div class="page-bottom-space">
    <div class="bg-white rounded current-shadow p-3 form-group">
      <div class="row">
        <div class="col-12 col-lg-4 mb-lg-0">
          <user-avatar></user-avatar>
        </div>
        <div class="col-12 col-lg-8">
          <form v-on:submit.prevent="updateProfile">
            <div class="form-group" v-if="userProfile.company && userProfile.company.company_name">
              <input type="text" class="form-control" placeholder="Название компании" v-model="companyName" v-on:keyup="submitDisabled = false">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" :placeholder="$t('profile.name')" v-model="firstName" v-on:keyup="submitDisabled = false">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" :placeholder="$t('profile.middle-name')" v-model="userProfile.middle_name" v-on:keyup="submitDisabled = false">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" :placeholder="$t('profile.last-name')" v-model="userProfile.last_name" v-on:keyup="submitDisabled = false">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email" v-model="userProfile.email" v-on:keyup="submitDisabled = false">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Телефон" v-model="phone" readonly v-masked-input="currentPhoneMask[1]" v-on:keyup="submitDisabled = false">
            </div>
            <div class="text-right">
              <p class="text-danger float-left" v-if="errorMessage">{{errorMessage}}</p>
              <input type="submit" class="btn btn-theme" :value="$t('save')" :disabled="submitDisabled">
            </div>
          </form>

          <modal
            modalSize="modal-md"
            modalTitle="Смена пароля"
            ref="newpass-modal"
            :clickedBack="false"
          >
            <div slot="modalBody">
              <new-password v-on:onPassSetted="onPassSetted" :phone="userProfile.phone" :route="'/settings'"></new-password>
            </div>
          </modal>

        </div>
      </div>
    </div>
    <button class="btn btn-default" v-on:click.prevent="toggleModal('newpass-modal')" v-if="userProfile.phone">{{$t('profile.change-passw')}}</button>
    <div class="bg-white rounded current-shadow p-3" v-if="false">
      <notifications-settings></notifications-settings>
    </div>
  </div>
</template>

<script>
import api from '@/store/api'
import NewPassword from '@/components/sign/NewPassword'
import UserAvatar from '@/components/settings/UserAvatar'
import Modal from '@/components/utils/Modal'
import subtraction from '@/mixins/subtraction'
import maskedInput from '@/directives/maskedInput'
import NotificationsSettings from '@/components/settings/NotificationsSettings'

export default {
  name: 'profile-settings',
  data () {
    return {
      id: null,
      companyName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      errorMessage: '',
      smsDisabled: false,
      submitDisabled: true
    }
  },
  components: {
    Modal,
    NewPassword,
    maskedInput,
    NotificationsSettings,
    UserAvatar
  },
  computed: {
    userProfile () {
      let data = this.$store.state.profile
      this.setEditableItems(data)
      return data
    },
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    },
    phone () {
      return this.$store.state.profile.phone
    }
  },
  mounted () {
    if (this.userProfile.is_company && this.userProfile.company) {
      this.firstName = this.userProfile.first_name
      this.companyName = this.userProfile.company.company_name
    }
  },
  mixins: [subtraction],
  methods: {
    setEditableItems (data) {
      this.firstName = data.first_name
      if (data.is_company && data.company) {
        this.companyName = data.company.company_name
      }
    },
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    updateProfile () {
      let options = {
        first_name: this.firstName,
        middle_name: this.userProfile.middle_name,
        last_name: this.userProfile.last_name,
        email: this.userProfile.email
      }
      if (this.companyName) { options.company_name = this.companyName }
      if (this.firstName) { options.first_name = this.firstName }
      if (this.userProfile.middle_name) { options.middle_name = this.userProfile.middle_name }
      if (this.userProfile.last_name) { options.last_name = this.userProfile.last_name }
      if (this.userProfile.email) { options.email = this.userProfile.email }

      this.$http.put(api.API_REST_LINK2 + 'webclient/profile', options).then(() => {
        this.errorMessage = ''
        this.$store.dispatch('LOAD_PROFILE')
        this.submitDisabled = true
        this.$alert.show({
          message: 'Информация сохранена',
          duration: 1500
        })
      }).catch(error => {
        this.errorMessage = error.data.message
      })
    },
    onPassSetted () {
      this.toggleModal('newpass-modal')
    }
  }
}
</script>
