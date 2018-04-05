<template>
  <section class="page-section">
    <div class="container">
      <h3 class="text-center text-uppercase mb-3"><strong>Последние отзывы</strong></h3>
      <div class="review">
        <!-- <carousel
          :auto="3000"
          :watch-items="[1, 2, 3, 4]"
          :loop="true"
          prev-html=""
          next-html=""
        >
          <carousel-item v-for="(item, index) in [1, 2, 3, 4]">
            <div class="media review__content">
              <div class="media-left">
                <div class="review__image img-circle">
                  <img class="media-object mw-100" src="../../assets/test.jpg" alt="">
                </div>
              </div>
              <div class="media-body">
                <h4 class="media-heading">Всё было. Быстро и качественно!</h4>
                <p>Пользоваться услугами "Достависты" начали в этом году весной. Доверить доставку свадебных товаров сторонней компании, да еще и с оплатой по факту, было решением не из легких. Но у нас не было выбора, доставка нужна была срочно! По-этому мы решили воспользоваться услугами данной компании. Заполнили заявку, через некоторое время курьер позвонил и после подъехал. Оказался очень милый молодой человек, которого мы теперь часто выбираем в качестве курьера.</p>
                <p><b>Светлана Васильева</b></p>
                <p>владелец магазина необычных подарков и аксессуаров</p>
              </div>
            </div>
          </carousel-item>
        </carousel> -->
      </div>
    </div>
  </section>
</template>

<script>
// import { Carousel, CarouselItem } from 'vue-l-carousel'

export default {
  name: 'reviews',
  data () {
    return {
    }
  },
  components: {
    // 'carousel': Carousel,
    // 'carousel-item': CarouselItem
  }
}
</script>
