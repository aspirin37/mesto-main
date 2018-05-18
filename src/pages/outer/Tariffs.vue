<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3">Тарифы</h1>
    </div>
    <hr class="my-0">
    <div class="container py-5">
      <p class="mb-0 text-xlarge text-muted">
        Стоимость доставки расчитывается автоматически при совершении заказа на сайте и является окончательной.
      </p>
      <p class="text-xlarge text-muted mb-5">
        Скрытые платежи и абонентская плата отсутствуют.
      </p>
      <tariffs-map v-if="isCityGetted"></tariffs-map>
    </div>
  </section>
</template>

<script>
import TariffsMap from '@/components/tariffs/TariffsMap'

export default {
  name: 'tariffs',
  data () {
    return {
    }
  },
  components: {
    TariffsMap
  },
  computed: {
    isCityGetted () {
      return this.$store.state.isCityGetted
    }
  }
}
</script>
