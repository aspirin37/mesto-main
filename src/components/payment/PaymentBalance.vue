<template>
  <div class="mb-3" v-if="isCompany">
    <h3 class="mb-3">Баланс</h3>
    <b class="d-block">{{userProfile.company.company_name}}</b>
    <span class="mr-2 d-md-block">Баланс: <b v-thousands="userProfile.company.balance"></b> руб.</span>
    <span class="mr-2 d-md-block">Лимит: <b v-thousands="userProfile.company.balance_limit"></b> руб.</span>
    <balance-request></balance-request>
  </div>
</template>

<script>
import BalanceRequest from './BalanceRequest'

export default {
  name: 'payment-balance',
  data () {
    return {
      fpOptions: {
        mode: 'range',
        enableTime: false,
        firstDayOfWeek: 2,
        shorthandCurrentMonth: true,
        altInput: true,
        altFormat: 'd.m.Y',
        altInputClass: '',
        dateFormat: 'U',
        utc: true
      }
    }
  },
  components: {
    BalanceRequest
  },
  computed: {
    userProfile () {
      return this.$store.state.profile
    },
    isCompany () {
      return this.userProfile.is_company
    }
  },
  methods: {
    getByDateRange (e) {
      let datesArray = e.split(' ')
      this.dateFrom = datesArray[0]
      this.dateTo = (+datesArray[2] + 86399).toString()
      if (datesArray.length > 1) {
        this.reloadOrders()
      }
    }
  }
}
</script>
