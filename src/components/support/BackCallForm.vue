<template>
  <div>
    <form class="mb-3" v-on:submit.prevent="sendBackCall" v-if="!messageSended">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Имя" name="name" v-model="name" autocomplete="name">
      </div>
      <div class="form-group">
        <input type="tel" class="form-control" placeholder="Телефон" name="phone" v-masked-input="currentPhoneMask[0]" v-model="phone" autocomplete="tel">
      </div>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Почта" name="email" v-model="email" autocomplete="email">
      </div>
      <div class="form-group">
        <textarea type="tel" rows="3" class="form-control h-100" placeholder="Ваш вопрос или сообщение" v-model="question"></textarea>
      </div>
      <p class="text-danger float-left" v-if="errorMessage">{{errorMessage}}</p>
      <button class="btn btn-theme w-100" type="submit" :disabled="question.length < 2 || name.length < 2">Отправить</button>
    </form>
    <div v-if="messageSended" class="text-center cap">
      <div class="cap__success ml-auto mr-auto"></div>
      <p class="lead cap__text text-dark">Ваше сообщениe отправлено</p>
      <p>Мы скоро с вами свяжемся, если вы об этом просили</p>
    </div>
  </div>
</template>

<script>
import api from '@/store/api'

export default {
  data () {
    return {
      errorMessage: '',
      messageSended: false,
      name: '',
      phone: '',
      email: '',
      question: '',
      contactType: 1,
      maskType: 1
    }
  },
  computed: {
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    }
  },
  methods: {
    sendBackCall () {
      let options = {
        name: this.name,
        text: this.question
      }
      if (this.phone) { options.phone = this.phone }
      if (this.email) { options.email = this.email }
      this.$http.post(api.API_REST_LINK2 + 'web/feedbackForm', options).then(response => {
        this.messageSended = true
        this.errorMessage = ''
      }).catch(error => {
        this.errorMessage = error.data.message
      })
    }
  }
}
</script>
