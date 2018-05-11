<template>
  <div>
    <div class="over-cap" v-if="showLoader">
      <loader></loader>
      <div class="over-cap__text text-center">
        <h4>Оплата заказа</h4>
      </div>
    </div>
    <form v-on:submit.prevent="payForOrder">
      <choose-payment-method v-on:payMethodSetted="payMethod = $event" v-on:showAdding="showAddingCard = $event" :payType="payType" class="mb-3"></choose-payment-method>
      <div class="text-center mb-3">
        <button type="submit" class="btn btn-theme btn-lg px-4" :disabled="payMethod === null" v-show="!showAddingCard">Оплатить <span v-if="price">{{price}} руб.</span></button>
      </div>
      <p class="text-danger text-center" v-for="(message, index) in errorMessages" :key="index">{{message}}</p>
    </form>
    <p class="text-center text-muted small mw-400 mx-auto">Оплата работает через «Альфа-Банк», защищена сертификатом SSL и соответствует стандартам безопасности PCI DSS</p>
    <div class="text-center mb-4">
      <img src="../../assets/icons/visa-verified.svg" alt="" class="mx-1 mx-lg-3 payment-window-logos">
      <img src="../../assets/icons/mastercard-securecode.svg" alt="" class="mx-1 mx-lg-3 payment-window-logos">
      <img src="../../assets/icons/logo-alfabank.svg" alt="" class="mx-1 mx-lg-3 payment-window-logos">
    </div>
  </div>
</template>

<script>
import api from '../../store/api'
import ChoosePaymentMethod from './ChoosePaymentMethod'
import Loader from '../utils/Loader'

export default {
  name: 'payment-modal',
  data () {
    return {
      showAddingCard: false,
      payMethod: null,
      errorMessages: [],
      showLoader: false
    }
  },
  components: {
    ChoosePaymentMethod,
    Loader
  },
  props: {
    payType: null,
    price: '',
    orderId: ''
  },
  methods: {
    setCurrentPayMethod () {
      let options = {
        idt_pay_method: this.payMethod
      }
      this.$http.put(api.API_REST_LINK4 + 'webclient/payMethods', options)
    },
    payForOrder () {
      this.showLoader = true

      let options = {
        idt_order: this.orderId,
        idt_pay_method: this.payMethod
      }
      this.$http.post(api.API_REST_LINK4 + 'webclient/pay', options).then(response => {
        this.errorMessages = []
        this.$emit('payed', response.data.order)
        this.showLoader = false
      }).catch(error => {
        let errorData = error.data

        this.$emit('error', errorData)
        this.errorMessages = errorData.messages
        this.showLoader = false
      })
      this.setCurrentPayMethod()
    }
  }
}
</script>
