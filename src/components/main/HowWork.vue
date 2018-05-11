<template>
  <div class="d-flex align-items-center pb-4 pt-3 justify-content-around flex-wrap flex-md-nowrap mw-100" ref="sli">
    <nav class="howto-col" v-on:mouseover="stopSwitching" v-on:mouseleave="switchSlide">
      <span class="d-inline-block">
        <a href="#" class="d-flex text-dark my-3 text-nowrap align-items-center mr-3" v-for="(title, index) in titles" v-on:click.prevent="setSlide(index)" :key="index">
          <span class="animated-circle mr-3" v-bind:class="{'animated-circle--active': current === index && !stopped}">
            <span class="animated-circle__main text-dark"><b>{{index + 1}}</b></span>
            <span class="animated-circle__left"></span>
            <span class="animated-circle__right"></span>
          </span>
          <b v-bind:class="{'text-theme' : current === index}" class="text-large">{{title}}</b>
        </a>
      </span>
    </nav>
    <div class="styled-circle-img m-5">
      <div class="styled-circle-img__img rounded-circle">
        <img :src="pic1" alt="" v-if="current === 0">
        <img :src="pic2" alt="" v-if="current === 1">
        <img :src="pic3" alt="" v-if="current === 2">
      </div>
      <span class="styled-circle-bg d-inline-block rounded-circle"></span>
    </div>
    <p class="text-large right-effect howto-col pre-wrap text-center text-md-left"
      :key="index"
      v-if="current === index"
      v-for="(slide, index) in slides"
    >{{slide.text}}</p>
  </div>
</template>

<script>
import pic1 from '@/assets/how1.png'
import pic2 from '@/assets/how2.png'
import pic3 from '@/assets/how3.png'

export default {
  name: 'how-work',
  data () {
    return {
      current: 0,
      seconds: 6,
      pic1: pic1,
      pic2: pic2,
      pic3: pic3,
      stopped: true,
      titles: [
        'Вызов курьера',
        'Выполнение заказа',
        'Доставлено'
      ],
      slides: [
        {text: 'Достаточно указать точку А и Б и все.\nПользуйтесь как вам удобно: приложения iOS, Android, сайт. Оплата наличными или банковской картой. Все застраховано при объявленной стоимости'},
        {text: 'Вы будете получать актуальную информацию о местоположении курьера и статусе заказа'},
        {text: 'По завершении заказа вы сможете оценить курьера, оставить отзыв, а также увидеть всю информацию о заказе в истории'}
      ],
      interval: null
    }
  },
  props: {
    offsetTop: 0
  },
  beforeDestroy () {
    document.removeEventListener('scroll', () => {})
    this.stopSwitching()
  },
  mounted () {
    document.addEventListener('scroll', () => {
      if (this.offsetTop <= window.pageYOffset + 300) {
        if (this.stopped) {
          this.switchSlide()
        }
      }
    })
  },
  methods: {
    setSlide (num) {
      this.current = num
    },
    switchSlide () {
      this.stopped = false
      this.interval = setInterval(() => {
        this.current = this.current + 1
        if (this.current >= this.slides.length) {
          this.current = 0
        }
        this.setSlide(this.current)
      }, this.seconds * 1000)
    },
    stopSwitching () {
      this.stopped = true
      clearInterval(this.interval)
    }
  }
}
</script>
