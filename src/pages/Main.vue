<template>
  <div class="white-bg">
    <section class="main-block bg-white">
      <div class="container main-block__content">
        <order-block></order-block>
      </div>
    </section>

    <section class="py-4">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../assets/icons/distance.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Онлайн-трекинг</p>
            <span class="text-muted mw-280 d-block mx-auto">Следите за посылкой онлайн, на любом устройстве: ноутбук, планшет или смартфон</span>
          </div>
          <div class="col-12 col-sm-6 col-md-3 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../assets/icons/fin-card.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Удобно платить</p>
            <span class="text-muted mw-280 d-block mx-auto">Любой способ оплаты — наличные, банковская карта или безналичная оплата по счету</span>
          </div>
          <div class="col-12 col-sm-6 col-md-3 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../assets/icons/wall-clock.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">60 минут</p>
            <span class="text-muted mw-280 d-block mx-auto">Среднее время прибытия — 60 минут, система выдает заказы ближайшим курьерам</span>
          </div>
          <div class="col-12 col-sm-6 col-md-3 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../assets/icons/bank-safe-box.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">100% безопасно</p>
            <span class="text-muted mw-280 d-block mx-auto">Курьеры проходят проверку и обучение, а посылку можно застраховать</span>
          </div>
        </div>
      </div>
    </section>

    <!-- <hr class="bg-light mt-0"> -->

    <section class="py-5 bg-light" id="sli">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9">
            <h2 class="text-center mb-4">
              <span class="d-block mb-3"><span class="title-line"></span></span>
              Как все работает
            </h2>
            <how-work :offsetTop="sliderOffsetTop"></how-work>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-9">
          <div class="row align-items-center">
            <div class="col-12 col-md-5 order-2 order-md-1 text-center text-md-left">
              <p class="text-large">Наш сервис с неизменным качеством доступен на всех популярных платформах. Выбирайте, что вам удобнее: смартфон, планшет или ноутбук, сайт или приложения для iOS и Android</p>
              <a v-bind:href="googleLink" class="micon micon--gplay mr-3" target="_top"></a>
              <a v-bind:href="appleLink" class="micon micon--appstore" target="_top"></a>
            </div>
            <div class="col-12 col-md-7 order-1 order-md-2">
              <img src="../assets/devices.png" alt="" class="mw-100 mb-3">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-3">
          <span class="d-block mb-3"><span class="title-line"></span></span>
          Наши курьеры
        </h2>
        <p class="text-center mb-4 text-muted mw-600 mx-auto text-large">Мы тщательно проверяем и обучаем каждого курьера. После доставки вы ставите оценку курьеру. Если она хорошая — мы похвалим исполнителя, а если плохая — поможем ему больше не совершать таких ошибок.</p>
        <h3 class="text-center mb-3">Лучшие из лучших</h3>
        <div class="d-flex justify-content-center flex-wrap">
          <div class="text-center px-2 courier-col mb-4">
            <div class="img-100 rounded-circle mx-auto mb-2">
              <img src="../assets/test.jpg" alt="courier" class="mw-100">
            </div>
            <p class="mb-1"><b>Никита</b></p>
            <small class="text-muted d-block mb-2"><b>141</b> счастливый получатель</small>
            <div class="courier-rating px-2 py-1 d-inline-flex align-items-center">
              <img src="../assets/icons/star-orange.svg" class="courier-rating__star mr-2" alt="star">
              <b>4,8</b><span class="courier-rating__divider"></span><small>42 оценки</small>
            </div>
          </div>
          <div class="text-center px-2 courier-col mb-4 courier-best">
            <div class="img-100 rounded-circle mx-auto mb-2">
              <img src="../assets/test.jpg" alt="courier" class="mw-100">
            </div>
            <p class="mb-1"><b>Павел</b></p>
            <small class="text-muted d-block mb-2"><b>242</b> безупречных доставки</small>
            <div class="courier-rating px-2 py-1 d-inline-flex align-items-center">
              <img src="../assets/icons/star-orange.svg" class="courier-rating__star mr-2" alt="star">
              <b>4,9</b><span class="courier-rating__divider"></span><small>42 оценки</small>
            </div>
          </div>
          <div class="text-center px-2 courier-col mb-4">
            <div class="img-100 rounded-circle mx-auto mb-2">
              <img src="../assets/test.jpg" alt="courier" class="mw-100">
            </div>
            <p class="mb-1"><b>Кирилл</b></p>
            <small class="text-muted d-block mb-2"><b>77</b> вовремя доставленных посылок</small>
            <div class="courier-rating px-2 py-1 d-inline-flex align-items-center">
              <img src="../assets/icons/star-orange.svg" class="courier-rating__star mr-2" alt="star">
              <b>4,7</b><span class="courier-rating__divider"></span><small>42 оценки</small>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section class="py-5">
      <div class="container">
        <h2 class="mb-3 text-center">
          <span class="d-block mb-3"><span class="title-line"></span></span>
          Бизнесу
        </h2>
        <div class="row justify-content-center mb-4">
          <div class="col-12 col-lg-10 col-xl-9">
            <div class="row align-items-center mt-3">
              <div class="col-12 col-md-6 text-center mb-5">
                <div class="advant-circle mx-auto mb-4 relative">
                  <img src="../assets/icons/pre-presenter.svg" alt="advantage">
                  <span class="styled-circle-bg d-inline-block rounded-circle"></span>
                </div>
                <h3 class="mb-3">Курьеры для юрлиц</h3>
                <p class="text-large text-muted">Выгоднее, чем держать в штате — оплата по безналу, отсрочка и скидки от объема</p>
                <router-link to="/for-business" class="lead-md text-dark">Хочу платить по безналу ›</router-link>
              </div>
              <div class="col-12 col-md-6 text-center mb-5">
                <div class="advant-circle mx-auto mb-4 relative">
                  <img src="../assets/icons/db-settings.svg" alt="advantage">
                  <span class="styled-circle-bg d-inline-block rounded-circle"></span>
                </div>
                <h3 class="mb-3">Интеграция с бизнесом</h3>
                <p class="text-large text-muted">Подружимся с любой CMS или через наш API, реализуем ваши самые смелые фантазии</p>
                <router-link to="/for-business" class="lead-md text-dark">Заинтриговали ›</router-link>
              </div>
            </div>
          </div>
        </div>
        <h3 class="mb-3 text-center">Нашим сервисом уже пользуются</h3>
        <div class="font-size-null text-center bg-light rounded p-4">
          <div class="text-center partners-block__item">
            <img src="../assets/lartech.svg" alt="">
          </div>
          <div class="text-center partners-block__item">
            <img src="../assets/energosbit.svg" alt="">
          </div>
          <div class="text-center partners-block__item">
            <img src="../assets/petrofort.png" alt="">
          </div>
          <div class="text-center partners-block__item">
            <a href="https://fin.team" target="_blank"><img src="../assets/finteam-logo.svg" alt=""></a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-3">
          <span class="d-block mb-3"><span class="title-line"></span></span>
          Популярные вопросы
        </h2>
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9">
            <faq-info showby="6"></faq-info>
            <div class="text-center">
              <router-link to="/faq" class="text-dark lead-md link-arrow">Все популярные вопросы</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import OrderBlock from '@/components/main/OrderBlock'
import HowWork from '@/components/main/HowWork'
import Modal from '@/components/utils/Modal'
import config from '@/store/config'
import FaqInfo from '@/components/faq/FaqInfo'

export default {
  name: 'main-page',
  components: {
    OrderBlock,
    Modal,
    HowWork,
    FaqInfo
  },
  data () {
    return {
      googleLink: config.APP_PLAYMARKET,
      appleLink: config.APP_APPSTORE,
      sliderOffsetTop: 0
    }
  },
  mounted () {
    let el = document.getElementById('sli')
    this.sliderOffsetTop = el.offsetTop
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    }
  }
}
</script>
