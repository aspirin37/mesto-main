<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3 mr-3">Курьерам</h1>
    </div>
    <hr class="my-0">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-lg-7">
          <article>
            <h2 class="mb-4 gradient-text">
              Что мы можем предложить курьеру
            </h2>
            <ul class="circle-list list-unstyled">
              <li>
                <span class="lead-md">
                  Возможность совмещать с учебой или другой работой.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Гарантия оплаты работы: составление официального договора.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Большое количество заказов.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Проверенные клиенты с рейтингом.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Абсолютно бесплатное пользование сервисом.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Выплаты на карту еженедельно.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Круглосуточная поддержка.
                </span>
              </li>
            </ul>
          </article>
          <article class="py-4">
            <h2 class="mb-4 gradient-text">
              Как пользоваться приложением «Место»
            </h2>
            <ul class="circle-list list-unstyled">
              <li>
                <span class="lead-md">
                  Установите приложение Место.Партнер для <a v-bind:href="googleLink" target="_top">Android</a>.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  <a href="//mesto.partners">Зарегистрируйтесь</a> и дождитесь подтверждения анкеты.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Переходите в Онлайн и получайте предложения.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Заберите и отвезите заказ.
                </span>
              </li>
              <li>
                <span class="lead-md">
                  Получите деньги наличными или на счет.
                </span>
              </li>
            </ul>
          </article>
        </div>
        <div class="col-12 col-lg-5">
          <div class="trg-block trg-block--courier text-center">
            <h2 class="trg-block__title">Начните зарабатывать прямо сейчас</h2>
            <p>Оформите заявку (менее минуты) и мы свяжемся с вами и пригласим на собеседование</p>
            <a href="//mesto.partners" class="btn btn-blue trg-block__btn"><strong>Начать зарабатывать</strong></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '@/store/config'

export default {
  name: 'for-couriers',
  data () {
    return {
      googleLink: config.APP_PLAYMARKET_COURIER,
      appleLink: config.APP_APPSTORE_COURIER
    }
  }
}
</script>
