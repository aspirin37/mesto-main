<template>
  <div>
    <p class="d-block mb-3 text-dark">
      <img src="@/assets/icons/plus-sm-icon.svg" alt="" class="inline-img mr-1 align-middle">
      <b>Дополнительные опции</b>
    </p>
    <div class="pl-md-4 mw-400">
      <label v-for="(option, index) in options" class="custom-check d-flex flex-row mb-3 justify-content-between flex-wrap flex-md-nowrap" :key="index">
        <span>
          <input type="checkbox" class="custom-check__input" :value="option.idt_order_options" v-model="checkedOptions" v-on:change="setOrderOptions">
          <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
          <p class="mb-0 mr-1">{{option.name}}</p>
        </span>
        <span>{{option.cost_format}}</span>
      </label>
    </div>
  </div>
</template>

<script>
import api from '@/store/api'

export default {
  name: 'order-options',
  data () {
    return {
      options: {},
      checkedOptions: []
    }
  },
  computed: {
    orderOptions () {
      return this.$store.state.orderOptions
    },
    optionsLength () {
      return Object.keys(this.options).length
    }
  },
  mounted () {
    this.getOrderOptions()
  },
  methods: {
    getOrderOptions () {
      this.$http.get(api.API_REST_LINK3 + 'webclient/deliveryOptions').then(response => {
        this.options = response.data.options
        this.checkedOptions = this.orderOptions
      })
    },
    removeOrderOption (val) {
      let index = this.checkedOptions.indexOf(val)

      this.checkedOptions.splice(index, 1)
      this.setOrderOptions()
    },
    setOrderOptions () {
      let options = {
        key: 'orderOptions',
        value: this.checkedOptions
      }

      this.$store.commit('SET_STATE_VALUE', {options})
      this.$store.dispatch('CALC_ORDER_PRICE')
    }
  }
}
</script>
