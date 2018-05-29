<template>
  <div class="mb-2">
    <p class="d-block mb-2">
      <img src="@/assets/icons/insurance.svg" alt="" class="inline-img mr-1 align-middle">
      <b>Застраховать</b> <span class="text-muted">(за 1% от оценочной стоимости)</span>
      <a href="#" class="ml-3" v-on:click.prevent="removeOrderInsurance" title="Очистить">
        <img src="@/assets/icons/close-del.svg" alt="X" v-if="orderCostDeclare">
      </a>
    </p>
    <div class="mb-4 mw-400 d-flex flex-wrap align-items-center justify-content-between">
      <form v-on:submit.prevent="editOrderInsurance" class="mt-2 pl-md-4">
        <span class="mr-1">Оценочная стоимость —</span>
        <div class="text-nowrap d-inline-block mr-2">
          <input type="number"
            class="form-control form-control-sm d-inline-block mr-1 align-middle change-mx input-number-reset"
            maxlength="5"
            max="50000"
            v-model="price"
            v-on:keyup="validPrice"
            v-on:blur="editOrderInsurance"
          >
          <span class="align-middle">руб.</span>
        </div>
      </form>
      <span v-if="orderCostDeclare" class='mt-2'>+ {{getPercentSum(orderCostDeclare) || 10}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-insurance',
  data () {
    return {
      price: ''
    }
  },
  computed: {
    orderCostDeclare () {
      return this.$store.state.orderCostDeclare
    }
  },
  methods: {
    getPercentSum (price) {
      return `${price ? ((price / 100 > 10) ? (price / 100 + ' руб.') : 10 + ' руб.') : ''}`
    },
    removeOrderInsurance () {
      this.price = ''
      this.editOrderInsurance()
    },
    editOrderInsurance () {
      this.$store.commit('SET_ORDER_INSURANCE', this.price)
      this.$store.dispatch('CALC_ORDER_PRICE')
    },
    validPrice () {
      if (+this.price > 50000) {
        this.price = 50000
      }
    }
  }
}
</script>
