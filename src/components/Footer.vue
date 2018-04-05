<template>
  <footer class="footer pt-4 pt-md-5 pb-4">
    <div class="container">
      <!-- <div class="row justify-content-between flex-lg-nowrap">
        <div class="col-12 col-sm-12 col-md col-xl-8 text-center text-sm-left d-none d-md-block mb-3 mb-lg-0">
          <span class="mr-2">© 2016 &ndash; {{ year }} {{$t('title')}}</span>
          <a href="mailto:support@mesto.delivery">support@mesto.delivery</a>
          <div>
            <span class="d-none d-lg-block d-xl-inline-block">{{$t('footer-text')}}.</span>
            <router-link to="/agreement">{{$t('agreement')}}</router-link> /
            <router-link to="/confidential">{{$t('confidential')}}</router-link>
            <router-link to="/requisites" class="mr-2">{{$t('requisites')}}</router-link>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-auto col-xl text-center text-sm-left text-nowrap mb-2">
          <a v-bind:href="googleLink" class="footer__icon micon micon--gplay mr-3" target="_top"></a>
          <a v-bind:href="appleLink" class="footer__icon micon micon--appstore" target="_top"></a>
        </div>
        <div class="col-12 col-sm-6 col-md-auto col-xl text-center text-sm-right d-none d-sm-block">
          <a href="http://a3technology.ru/" target="_blank" class="madeby text-secondary small">Made by <span class="text-nowrap"><br>A3 Technology</span></a>
        </div>
      </div> -->
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap">
        <div class="pr-4 pr-lg-5 mb-3">
          <p class="mb-2">Сервис</p>
          <router-link to="/about" class="d-block mb-2 text-nowrap">О сервисе</router-link>
          <router-link to="/for-corporate" class="d-block mb-2 text-nowrap">Бизнесу</router-link>
          <router-link to="/for-couriers" class="d-block mb-2 text-nowrap">Курьерам</router-link>
          <router-link to="/tariffs" class="d-block mb-2 text-nowrap">Тарифы</router-link>
        </div>
        <div class="pr-4 pr-lg-5 mb-3">
          <p class="mb-2">Поддержка</p>
          <router-link to="/contacts" class="d-block mb-2">Контакты</router-link>
          <router-link to="/faq" class="d-block mb-2">Помощь</router-link>
        </div>
        <div class="pr-4 pr-lg-5 mb-3">
          <a :href="`tel:${phone}`" class="d-block mb-2 text-nowrap"><img src="../assets/icons/phone-footer.svg" class="mr-2 footer__icon" alt="phone">{{phone}}</a>
          <a href="#" class="d-block mb-2 text-nowrap" v-on:click.prevent="toggleModal('back-call')"><img src="../assets/icons/comment-footer.svg" class="mr-2 footer__icon" alt="message">Задать вопрос</a>
          <a href="tel:hi@mesto.delivery" class="d-block mb-2 text-nowrap"><img src="../assets/icons/mail-footer.svg" class="mr-2 footer__icon" alt="mail">hi@mesto.delivery</a>
        </div>
        <div class="pr-4 pr-lg-5 mb-3">
          <p class="mb-2">Время работы</p>
          <p class="mb-2 half-opacity">Оформление заказов — круглосуточно</p>
          <p class="mb-2 half-opacity">Выполнение заказов и поддержка с 9:00 до 21:00</p>
        </div>
        <div class="">
          <p class="mb-2 d-none d-md-block">Скачайте приложение</p>
          <div class="text-nowrap mb-3">
            <a v-bind:href="googleLink" class="footer__icon micon micon--gplay-white mr-2" target="_top"></a>
            <a v-bind:href="appleLink" class="footer__icon micon micon--appstore-white" target="_top"></a>
          </div>
          <p class="mb-2 d-none d-md-block">Принимаем </p>
          <div class="text-nowrap d-none d-md-block mb-3">
            <span class="mr-2 card-type card-type--master-card-white"></span>
            <span class="mr-2 card-type card-type--visa-white"></span>
            <span class="mr-2 card-type card-type--mir-white"></span>
          </div>
        </div>
      </div>
      <hr class="border-secondary half-opacity d-none d-md-block">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="mr-3 half-opacity"><small>© 2016–{{ year }} Курьерская служба «Место»</small></span>
          <!-- <router-link to="/legal" class="mr-2"><small>Юридическая информация</small></router-link> -->
          <router-link to="/agreement" class="mr-2"><small>{{$t('agreement')}}</small></router-link>
          <router-link to="/confidential" class="mr-2"><small>{{$t('confidential')}}</small></router-link>
          <router-link to="/dogovor" class="mr-2"><small>Договор</small></router-link>
          <router-link to="/requisites" class="mr-2"><small>{{$t('requisites')}}</small></router-link>
        </div>
        <a href="http://a3technology.ru/" target="_blank" class="small d-none d-md-block text-nowrap">
          <span class="d-none d-lg-inline-block">Сделано в </span><span class="madeby align-bottom ml-2"></span>
        </a>
      </div>
    </div>
    <modal
      modalSize="modal-sm"
      modalTitle="Задать вопрос"
      ref="back-call"
      class="text-dark"
    >
      <div slot="modalBody">
        <back-call-form></back-call-form>
      </div>
    </modal>
  </footer>
</template>

<script>
import config from '../store/config'
import Modal from './utils/Modal'
import BackCallForm from './main/BackCallForm'

export default {
  name: 'main-footer',
  data () {
    return {
      year: new Date().getFullYear(),
      googleLink: config.APP_PLAYMARKET,
      appleLink: config.APP_APPSTORE
    }
  },
  components: {
    Modal,
    BackCallForm
  },
  computed: {
    phone () {
      return this.$store.state.companyData.phone
    }
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    }
  }
}
</script>
