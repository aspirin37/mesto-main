<template>
  <div class="bg-white rounded relative current-shadow p-3 p-md-4 mb-3 mw-600 mx-auto">
    <p class="text-large text-danger" v-if="payErrors"><b>{{payErrors.message}}</b></p>
    <p class="text-large text-danger" v-for="(error, index) in orderData.messages" v-else-if="orderData.messages" :key="index"><b>{{error}}</b></p>
    <p class="text-large text-danger" v-else><b>Ошибка при оплате</b></p>
    <p class="mb-4">К сожалению, произошла ошибка. Заказ не был оплачен, деньги не списаны. Пожалуйста, попробуйте еще раз или выберите другой способ оплаты.</p>
    <payment-modal v-on:payed="$emit('payed', $event)" v-on:error="payErrors = $event" :orderId="orderData.paymentErr.idt_order" :price="price" class="mw-400"></payment-modal>
  </div>
</template>

<script>
import PaymentModal from './PaymentModal'

export default {
  name: 'payment-error',
  data () {
    return {
      payErrors: ''
    }
  },
  props: {
    orderData: {}
  },
  computed: {
    price () {
      return this.$store.state.orderPrice
    }
  },
  components: {
    PaymentModal
  },
  methods: {
  }
}
</script>
