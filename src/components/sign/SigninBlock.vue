<template>
  <div class="w-100">
    <form v-on:submit.prevent="validateBeforeSubmit" v-if="!passForm" class="d-inline-block">
      <div class="d-inline-flex text-left flex-wrap flex-md-nowrap">
        <div class="form-group sign-mw mr-2">
          <input
            v-masked-input="currentPhoneMask[`${globPhone ? 1 : 0}`]"
            type="tel"
            name="phone"
            v-model="phone"
            class="form-control form-control-lg sign-input-width"
            placeholder="Телефон"
            v-validate="'required|verify_phone'"
            v-bind:class="{'border-danger' : errors.has('phone')}"
          >
        </div>
        <div class="form-group relative sign-mw mr-2" title="Показать пароль">
          <input type="password"
            name="password"
            class="form-control form-control-lg sign-input-width"
            placeholder="Пароль"
            v-model="password"
            v-validate="'required'"
            v-if="!showPassword"
            data-vv-delay="200"
            v-bind:class="{'border-danger' : errors.has('password')}"
          >
          <input type="text"
            name="password"
            class="form-control form-control-lg sign-input-width"
            placeholder="Пароль"
            v-model="password"
            v-validate="'required'"
            v-if="showPassword"
            data-vv-delay="200"
            v-bind:class="{'border-danger' : errors.has('password')}"
          >
          <a href="#" class="show-password" tabindex="-1" v-bind:class="{'show-password--hide' : !showPassword}" v-on:click.prevent="showPassword = !showPassword"></a>
        </div>
        <div class="form-group text-center sign-mw mr-2">
          <button type="button" class="btn btn-default" v-if="showCancel" v-on:click="cancelSign">Назад</button>
          <input type="submit" class="btn btn-theme btn-lg" value="Войти" v-bind:class="{'btn-block' : !showCancel}">
        </div>
      </div>
      <p class="text-danger text-left" v-if="errorMessage">{{errorMessage}}</p>
    </form>
    <new-password v-if="passForm" :phone="phone" v-on:onPassSetted="onPassSetted"></new-password>
    <div v-if="showFooter">
      <a href="#" class="text-secondary mr-2" v-on:click.prevent="setNewPass" v-if="!passForm">Забыл пароль</a>
      <a href="#" class="text-secondary mr-2" v-on:click.prevent="passForm = false" v-if="passForm">Войти</a>
      <!-- <router-link to="/signup" class="btn btn-link">Регистрация</router-link> -->
      <a href="#" v-on:click.prevent="$emit('toggleSign')" class="text-secondary mr-2">Зарегистрироваться</a>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'
import NewPassword from '@/components/sign/NewPassword'
import maskedInput from '@/directives/maskedInput'

export default {
  name: 'signin-block',
  data () {
    return {
      phone: this.globPhone || '',
      pin: '',
      errorMessage: '',
      errorCode: '',
      user: auth.user,
      password: '',
      passForm: false,
      redirect: this.$route.query.redirect,
      showPassword: false
    }
  },
  props: {
    showCancel: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    routeTo: {
      type: String,
      default: ''
    },
    globPhone: {
      type: String,
      default: ''
    }
  },
  directives: {
    maskedInput
  },
  components: {
    NewPassword
  },
  computed: {
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    },
    formatedPhone () {
      return this.phone.replace(/\+|-|_|\(|\)|\s/g, '')
    }
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
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(success => {
        if (!success) {
          return
        }
        this.login()
      })
    },
    login () {
      let options = {
        phone: +this.formatedPhone,
        pass: this.password
      }
      auth.login(this, options, this.redirect || this.routeTo || '')
      this.password = ''
    },
    setNewPass () {
      this.passForm = true
    },
    cancelSign () {
      this.$emit('cancelAdd')
    },
    onPassSetted () {
      this.$router.push({name: 'profile'})
    }
  }
}
</script>
