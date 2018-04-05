<template>
  <section>
    <div class="page-header-block">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-8 text-center text-md-left">
            <h1 class="text-white">{{$t('title')}}</h1>
          </div>
          <div class="col-12 col-lg-4">
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="page-content rounded bg-white container-fluid mb-4">
        <article class="py-4">
          <div class="row align-items-center">
            <div class="col-12 col-md-5 col-lg-5 col-lg-offset-1">
              <div class="about-block__img ml-auto mr-auto">
                <img src="../assets/devices.png" alt="" class="mw-100">
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
    </div>
  </section>
</template>

<script>
import config from '../store/config'

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
