<template>
  <div class="mb-3" v-if="isCompany">
    <h3 class="mb-3">Баланс</h3>
    <b class="d-block">{{userProfile.company.company_name}}</b>
    <span class="mr-2 d-md-block">Баланс: <b v-thousands="userProfile.company.balance"></b> руб.</span>
    <span class="mr-2 d-md-block">Лимит: <b v-thousands="userProfile.company.balance_limit"></b> руб.</span>
    <button class="btn btn-theme mt-3" v-on:click="toggleModal('get-bill')" v-if="!messageSended">Запросить пополнение</button>
    <span class="border border-success p-3 rounded mt-3 d-inline-block" v-else>Запрошено пополнение баланса</span>

    <modal
      modalSize="modal-xs"
      modalTitle="Запросить пополнение баланса"
      ref="get-bill"
    >
      <div slot="modalBody">
        <div class="form-group">
          <input type="number" class="form-control input-number-reset" min="0" maxlength="7" placeholder="Сумма, руб" v-model="sum">
        </div>
        <button class="btn btn-theme w-100" v-on:click="sendBackCall" :disabled="!sum">Запросить</button>
      </div>
    </modal>

  </div>
</template>

<script>
import Modal from '@/components/utils/Modal'
import api from '@/store/api'

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
      },
      sum: '',
      messageSended: false
    }
  },
  components: {
    Modal
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
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    getByDateRange (e) {
      let datesArray = e.split(' ')
      this.dateFrom = datesArray[0]
      this.dateTo = (+datesArray[2] + 86399).toString()
      if (datesArray.length > 1) {
        this.reloadOrders()
      }
    },
    sendBackCall () {
      let fullName = this.userProfile.company.company_name + `${this.userProfile.name ? ' (' + this.userProfile.name + ')' : ''}`
      let options = {
        name: fullName,
        text: `Пожалуйста, пополните мне баланс на сумму ${this.sum} руб.`,
        phone: this.userProfile.phone_format
      }
      if (this.userProfile.email) { options.email = this.userProfile.email }
      this.$http.post(api.API_REST_LINK2 + 'web/feedbackForm', options).then(response => {
        this.messageSended = true
        this.toggleModal('get-bill')
      })
    }
  }
}
</script>
