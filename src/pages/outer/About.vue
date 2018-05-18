<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3 mr-3">{{$t('title')}}</h1>
    </div>
    <hr class="my-0">
    <div class="container зн-5">
      <article class="py-4">
        <div class="row align-items-center">
          <div class="col-12 col-md-5 col-lg-5 col-lg-offset-1">
            <div class="about-block__img ml-auto mr-auto">
              <img src="@/assets/devices.png" alt="" class="mw-100">
            </div>
          </div>
          <div class="col-12 col-md-7 col-lg-5">
            <p class="lead pre-wrap">{{$t('about')}}</p>
            <a v-bind:href="googleLink" class="micon micon--gplay mr-3" target="_top"></a>
            <a v-bind:href="appleLink" class="micon micon--appstore" target="_top"></a>
          </div>
        </div>
      </article>
      <hr>
      <section class="py-4">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8 d-flex flex-wrap flex-md-nowrap align-items-center">
            <div class="order-md-2 mx-auto mx-md-3 my-3 order-md-2">
              <div class="about-block__circle about-block__circle--1"></div>
            </div>
            <p class="lead pre-wrap text-center text-md-left order-md-1">Для начала работы нет необходимости проходить утомляющую регистрацию: просто сделайте первый заказ и получите личный кабинет.</p>
          </div>
        </div>
      </section>
      <section class="py-4">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8 d-flex flex-wrap flex-md-nowrap align-items-center">
            <div class="mx-auto mx-md-3 my-3">
              <div class="about-block__circle about-block__circle--2 mx-auto my-3"></div>
            </div>
            <p class="lead pre-wrap text-center text-md-left">У нас ответственные курьеры, мотивированные на качественное выполнение заказов рейтингом, выставляемым заказчиками.</p>
          </div>
        </div>
      </section>
      <section class="py-4">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8 d-flex flex-wrap flex-md-nowrap align-items-center">
            <div class="mx-auto mx-md-3 my-3 order-md-2">
              <div class="about-block__circle about-block__circle--3 mx-auto my-3"></div>
            </div>
            <p class="lead pre-wrap text-center text-md-left order-md-1">В личном кабинете вы всегда можете увидеть подробную информацию по ранее сделанным заказам, оставить отзыв курьеру и многое другое.</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import config from '@/store/config'

export default {
  name: 'about',
  data () {
    return {
      googleLink: config.APP_PLAYMARKET,
      appleLink: config.APP_APPSTORE
    }
  }
}
</script>
