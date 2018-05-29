<template>
  <img src="@/assets/icons/wallet-border.svg" alt="cash" v-if="+type === 1" title="Наличные">
  <img src="@/assets/icons/fin-card-gray.svg" alt="card" v-else-if="+type === 2" title="Банковская карта">
  <img src="@/assets/icons/internal.svg" alt="internal" v-else-if="+type === 3" title="Внутренний заказ">
  <img src="@/assets/icons/invoice.svg" alt="invoice" v-else-if="+type === 4" title="Безнал срочный">
  <img src="@/assets/icons/invoice2.svg" alt="bill" v-else-if="+type === 5" title="Безнал ожидающий подтверждения">
  <img src="@/assets/icons/balance.svg" alt="balance" v-else-if="+type === 6" title="Платеж с баланса клиента">
  <img src="@/assets/icons/file-doc.svg" alt="bill" v-else>
</template>

<script>
export default {
  props: {
    type: null
  }
}
</script>
