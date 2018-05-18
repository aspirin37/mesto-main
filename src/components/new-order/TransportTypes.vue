<template>
  <div class="check-tabs mw-280">
    <label class="check-tabs__label w-50">
      <input type="radio" class="check-tabs__input" value="1" name="transport-type" v-model="orderTransport" v-on:change="setValue">
      <span class="check-tabs__outer d-flex align-items-center">
        <img src="@/assets/icons/run.svg" alt="" class="mr-2">
        <span>
          <span class="d-block">Пешком</span>
          <span class="text-muted d-block small">от 150 руб.</span>
        </span>
      </span>
    </label>
    <label class="check-tabs__label w-50">
      <input type="radio" class="check-tabs__input" value="4" name="transport-type" v-model="orderTransport" v-on:change="setValue">
      <span class="check-tabs__outer d-flex align-items-center">
        <img src="@/assets/icons/car-front.svg" alt="" class="mr-2">
        <span>
          <span class="d-block">На авто</span>
          <span class="text-muted d-block small">от 250 руб.</span>
        </span>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'transport-types',
  data () {
    return {
      orderTransport: 1
    }
  },
  mounted () {
    this.orderTransport = this.$store.state.orderTransport
  },
  methods: {
    setValue () {
      let options = {
        key: 'orderTransport',
        value: +this.orderTransport
      }
      this.$store.commit('SET_STATE_VALUE', {options})
      this.$emit('selected', this.orderTransport)
      // this.$store.dispatch('CALC_ORDER_PRICE')
    }
  }
}
</script>
