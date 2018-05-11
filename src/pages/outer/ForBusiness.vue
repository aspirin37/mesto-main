<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3">B2B – «Место» бизнесу</h1>
    </div>
    <hr class="my-0">
    <div class="bg-light pt-4">
      <div class="container">
        <div class="overflow-x mt-1 text-nowrap">
          <a href="#description" class="mr-3 text-dark pb-3 d-inline-block" v-scroll-to="setScrollOptions('#description')">Сервис умных доставок</a>
          <a href="#internet" class="mr-3 text-dark pb-3 d-inline-block" v-scroll-to="setScrollOptions('#internet')">Интернет-магазинам</a>
          <a href="#companies" class="mr-3 text-dark pb-3 d-inline-block" v-scroll-to="setScrollOptions('#companies')">Компаниям</a>
          <a href="#questions" class="mr-3 text-dark pb-3 d-inline-block" v-scroll-to="setScrollOptions('#questions')">Вопросы</a>
        </div>
      </div>
    </div>

    <hr class="my-0">

    <article>
      <section class="container container-sm py-5" id="description">
        <h2 class="mb-4 gradient-text">Сервис умных доставок</h2>
        <div class="row">
          <div class="col-12 col-md-8">
            <p class="text-xlarge text-muted mb-4">Сервис «Место» не похож на обычную курьерскую службу. Мы распределяем заказы между курьерами, которые находятся во всех районах города и готовы выполнить ваше задание прямо сейчас</p>
            <ul class="circle-list list-unstyled text-large">
              <li class="mb-2">От 250 рублей за доставку</li>
              <li class="mb-2">Вызов бесплатно</li>
              <li class="mb-2">Оплата картой, наличными или по счету</li>
              <li class="mb-2">Работаем без выходных с 9 до 21</li>
            </ul>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/distance.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Контроль</p>
            <span class="text-muted mw-280 d-block mx-auto">Посылка отображается на карте, приходят оповещения о статусе заказа</span>
          </div>
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/wall-clock.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Скорость</p>
            <span class="text-muted mw-280 d-block mx-auto">Курьер приедет в течение часа и сразу же отправится по вашему заказу</span>
          </div>
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/bank-safe-box.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Безопасность</p>
            <span class="text-muted mw-280 d-block mx-auto">Рейтинговая система отсеивает медленных и ненадежных курьеров</span>
          </div>
        </div>
      </section>

      <hr>

      <section class="container container-sm py-5" id="internet">
        <h2 class="mb-4 gradient-text">Интернет-магазинам</h2>
        <p class="text-muted text-xlarge mw-400 mb-4">«Местом» пользуются даже те магазины, у которых есть свои штатные курьеры</p>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-5 mr-auto mb-4">
            <h3 class="mw-280 page-section__title">
              <span class="d-block mb-3"><span class="title-line"></span></span>
              Усилить штат в дни пиковых нагрузок
            </h3>
            <p class="text-muted text-large">
              Перед праздниками или во время проведения рекламной кампании своих курьеров попросту не хватает. А еще они болеют и уходят в отпуска.
            </p>
          </div>
          <div class="col-12 col-md-6 col-lg-6 mb-4">
            <h3 class="mw-280 page-section__title">
              <span class="d-block mb-3"><span class="title-line"></span></span>
              Успеть быстрее конкурентов
            </h3>
            <p class="text-muted text-large">
              Отправляйте товар сразу, как клиент подтвердит заказ. Для многих скорость доставки — один из самых важных критериев при выборе магазина.
            </p>
          </div>
          <div class="col-12 col-md-6 col-lg-5 mr-auto mb-4">
            <h3 class="mw-280 page-section__title">
              <span class="d-block mb-3"><span class="title-line"></span></span>
              Привезти точно ко времени
            </h3>
            <p class="text-muted text-large">
              Интервал доставки — 30 минут, а не «когда наш курьер освободится и доедет до вашего района». Доставляйте утром, вечером и в выходные.
            </p>
          </div>
          <div class="col-12 col-md-6 col-lg-6 mb-4">
            <h3 class="mw-280 page-section__title">
              <span class="d-block mb-3"><span class="title-line"></span></span>
              Стоимость доставки известна сразу
            </h3>
            <p class="text-muted text-large">
              И ее можно сразу же сообщить клиенту. Ограничений по минимальному количеству доставок нет, равно как и нет дополнительной платы за забор товара. Пользуйтесь сервисом тогда, когда нужно — каждый день, раз в неделю или два раза в год.
            </p>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/database.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Интеграция</p>
            <span class="text-muted mw-280 d-block mx-auto">Стоимость доставки может рассчитываться у вас на сайте. «Место» интегрируется с любой CMS, даже самописной</span>
          </div>
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/send-letter.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Доставка «Почтой России»</p>
            <span class="text-muted mw-280 d-block mx-auto">Курьер купит пакеты, упакует заказы, постоит в очереди и пришлет номера трекингов или привезет чеки</span>
          </div>
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/money.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Прием денег</p>
            <span class="text-muted mw-280 d-block mx-auto">Вы обговариваете схему индивидуально с курьером, сервис в это не вмешивается</span>
          </div>
        </div>
      </section>

      <hr>

      <section class="container container-sm py-5" id="companies">
        <h2 class="mb-4 gradient-text">Компаниям</h2>
        <p class="text-muted text-xlarge mw-600 mb-4">Нет смысла тратить рабочее время сотрудников на мелкие поручения и разъезды по городу. Вызывайте курьера</p>
      </section>

      <section class="bg-light pt-5 pb-4">
        <div class="container container-sm">
          <h3 class="mb-4">Что могут курьеры «Места»</h3>
          <div class="row">
            <div class="col-12 col-md-6">
              <ul class="list-unstyled circle-list text-large">
                <li class="mb-3">Доставить документы в течение нескольких часов</li>
                <li class="mb-3">Развести подарки партнерам</li>
                <li class="mb-3">Забрать визитки из типографии</li>
                <li class="mb-3">Отправить почту</li>
                <li class="mb-3">Съездить в магазин и купить нужный товар</li>
              </ul>
            </div>
            <div class="col-12 col-md-6">
              <ul class="list-unstyled circle-list text-large">
                <li class="mb-3">Занять очередь и позвонить, когда она подойдет к концу</li>
                <li class="mb-3">Сфотографировать выкладку товара в магазине</li>
                <li class="mb-3">Подать документы в госучреждения по доверенности</li>
                <li class="mb-3">Привести забытые дома ключи</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="container container-sm pt-3">
        <div class="row mt-5 mb-5 justify-content-center">
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/verification-window.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">Общий личный кабинет</p>
            <span class="text-muted mw-400 d-block mx-auto">Видны все заказы, удобно отслеживать, кто и зачем заказывал доставку</span>
          </div>
          <div class="col-12 col-sm-4 col-md-4 text-center mb-5">
            <div class="advant-circle mx-auto mb-4 relative">
              <img src="../../assets/icons/user-doc.svg" alt="advantage">
              <span class="styled-circle-bg d-inline-block rounded-circle"></span>
            </div>
            <p class="mb-2 pt-2 h3">По доверенности</p>
            <span class="text-muted mw-400 d-block mx-auto">Укажите при заказе «курьер с паспортом», и вы получите паспортные данные для оформления доверенности</span>
          </div>
        </div>
        <div class="rounded current-shadow-lg px-3 py-4 px-md-5 pt-md-5 pb-md-4 mb-5">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-5 col-lg-4">
              <div class="d-flex mb-5 align-items-center">
                <div class="advant-circle-sm mr-3 relative">
                  <img src="../../assets/icons/phone-color.svg" alt="advantage">
                </div>
                <div>
                  <p class="mb-0 text-large"><b>Звоните</b></p>
                  <a href="tel:88003501646" class="text-xlarge text-dark">8 800 350-16-46</a>
                </div>
              </div>
              <div class="d-flex mb-5 align-items-center">
                <div class="advant-circle-sm mr-3 relative">
                  <img src="../../assets/icons/mail-color.svg" alt="advantage">
                </div>
                <div>
                  <p class="mb-0 text-large"><b>Пишите</b></p>
                  <a href="mailto:hi@mesto.delivery" class="text-xlarge text-dark">hi@mesto.delivery</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-5 col-lg-4">
              <div class="d-flex mb-3 align-items-top">
                <div class="advant-circle-sm mr-3 relative">
                  <img src="../../assets/icons/phone-incoming.svg" alt="advantage">
                </div>
                <div>
                  <p class="mb-3 text-large mt-2"><b>Заказать звонок</b></p>
                  <form class="sign-mw" v-on:submit.prevent="sendBackCall" v-if="!messageSended">
                    <input type="text" class="form-control mb-2" required placeholder="Ваше имя" name="name" v-model="name" autocomplete="name">
                    <input type="tel" class="form-control mb-2" required placeholder="Телефон" name="phone" v-masked-input="currentPhoneMask[0]" v-model="phone" autocomplete="tel">
                    <input type="text" class="form-control mb-2" placeholder="Когда позвонить?" v-model="question">
                    <button class="btn w-100 btn-theme">Позвоните мне</button>
                    <p class="text-danger float-left" v-if="errorMessage">{{errorMessage}}</p>
                  </form>
                  <div v-else>
                    <p><img src="../../assets/icons/checked.svg" class="mr-2 inline-img vertical-middle" alt="">Мы позвоним!</p>
                    <button class="btn btn-outline-secondary" v-on:click="messageSended = false">Ok</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 col-lg-4">
              <img src="../../assets/courier-window.svg" alt="main" class="mw-100 d-none d-md-block call-form-image mx-auto">
            </div>
          </div>
        </div>
      </section>

      <section class="py-5" id="questions">
        <div class="container container-sm">
          <h2 class="mb-4 gradient-text">Остались вопросы?</h2>
          <faq-info showby="6"></faq-info>
          <div class="text-center">
            <router-link to="/faq" class="text-dark lead-md link-arrow">Все популярные вопросы</router-link>
          </div>
        </div>
      </section>

    </article>
  </section>
</template>

<script>
import api from '../../store/api'
import FaqInfo from '../../components/faq/FaqInfo'
import VueScrollto from 'vue-scrollto'
import maskedInput from '../../directives/maskedInput'

export default {
  name: 'for-business',
  data () {
    return {
      errorMessage: '',
      messageSended: false,
      name: '',
      phone: '',
      question: '',
      maskType: 1,
      activeBlockId: ''
    }
  },
  components: {
    FaqInfo
  },
  directives: {
    'scroll-to': VueScrollto,
    maskedInput
  },
  computed: {
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    }
  },
  methods: {
    setScrollOptions (el) {
      return {
        el: el,
        duration: 300,
        easing: 'ease-in-out',
        offset: -50,
        cancelable: true,
        x: false,
        y: true
      }
    },
    sendBackCall () {
      let options = {
        name: this.name,
        phone: this.phone,
        text: 'Перезвоните мне ' + this.question
      }
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
