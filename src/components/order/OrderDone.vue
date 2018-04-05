<template>
  <div class="bg-white rounded relative current-shadow p-3 p-md-5 mb-3">
    <img src="../../assets/icons/checked.svg" alt="done" class="order-done-check d-none d-md-block">
    <div class="row">
      <div class="col-12 col-md-5">
        <router-link :to="{name: 'profile-order', query: { id: orderData.idt_order }}" class="h2 link-arrow link-reset">№ {{orderData.order_number}}</router-link>
        <p class="mb-1 text-muted">{{orderData.a_time_format}}</p>
        <p>
          <span class="mr-2">Ожидает назначения курьера</span>
          <router-link :to="{ name: 'faq', query: { question: 2}}" class="small text-nowrap">(Сколько ждать?)</router-link>
        </p>
        <h2 class="mb-3">{{orderData.cost}} руб.</h2>
        <span
          class="payment-status"
          v-bind:class="orderData.is_already_payed ? 'text-success border-success' : 'text-warning border-warning'"
        ><b>{{orderData.is_already_payed ? 'Оплачен' : 'Не оплачен'}}</b></span>
        <div class="mt-5">
          <router-link :to="{name: 'profile-order', query: { id: orderData.idt_order }}" class="text-dark d-block mb-2"><img src="../../assets/icons/file-doc.svg" alt="" class="mr-2">Посмотреть заказ</router-link>
          <!-- <a href="#" class="text-dark d-block mb-2"><img src="../../assets/icons/share.svg" alt="" class="mr-2">Поделиться ссылкой</a> -->
          <!-- <a href="#" class="text-dark d-block mb-2"><img src="../../assets/icons/gear-settings.svg" alt="" class="mr-2">Настроить уведомления</a> -->
          <a href="#" class="text-dark d-block mb-2" v-on:click.prevent="$emit('repeat')"><img src="../../assets/icons/repeat-refresh.svg" alt="" class="mr-2">Повторить заказ</a>
          <a href="#" class="text-dark d-block mb-2" v-on:click="createNew"><img src="../../assets/icons/sm-plus.svg" alt="" class="mr-2">Новый заказ</a>
        </div>
      </div>
      <div class="col-12 col-md-7">
        <img src="../../assets/order-complited.svg" alt="complete" class="mw-100">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-done',
  data () {
    return {
    }
  },
  props: {
    orderData: {
      type: Object,
      default: () => {
        return {
          type: Object,
          default: {}
        }
      }
    }
  },
  methods: {
    createNew () {
      this.clearData()
      this.$emit('createNew')
    },
    clearData () {
      this.$store.commit('CLEAR_ORDER_DATA')
    }
  }
}
</script>
