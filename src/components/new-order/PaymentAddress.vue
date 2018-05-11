<template>
  <div>
    <label class="custom-radio d-block pb-3" v-for="address in Object.keys(orderAddresses)" :key="address">
      <input type="radio" name="address" class="custom-radio__input" :checked="address === payAddress" :value="address" v-model="payAddress" v-on:change="setPaymentAddress">
      <span class="custom-radio__outer mt-1"><span class="custom-radio__inner"></span></span>
      <span
        class="address-marker d-inline-block mx-2"
        v-bind:class="{'address-marker--first': +address === 1,
        'address-marker--last': +address === Object.keys(orderAddresses).length}"
      >{{$t('letters')[address - 1]}}</span>
      <span v-if="orderAddresses[address].address">{{orderAddresses[address].address}}</span>
      <span class="text-danger" v-else>Заполните адрес</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'payment-address',
  data () {
    return {
      payAddress: null
    }
  },
  computed: {
    orderAddresses () {
      return this.$store.state.orderAddresses
    }
  },
  mounted () {
    this.payAddress = this.$store.state.paymentAddress || 1
    this.setPaymentAddress()
  },
  methods: {
    setPaymentAddress () {
      this.$store.commit('SET_PAYMENT_ADDRESS', this.payAddress)
    }
  }
}
</script>
