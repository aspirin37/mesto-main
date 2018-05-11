<template>
  <div class="w-100">
    <div class="widget--min-height relative" v-if="showLoader">
      <loader></loader>
    </div>
    <div v-if="payMethods.length && !showAddingCard && !showLoader">
      <ul class="list-unstyled mb-3">
        <card-item
          v-for="(card, index) in payMethods"
          :key="index"
          :pan="card.alias || ''"
          :cardDescr="card.type_name"
          :checked="card.is_default"
          v-on:onChange="setPaymentCard(card.idt_pay_method)"
        ></card-item>
      </ul>
      <div class="card-list-item relative text-center" v-on:click.prevent="toggleShowAdding(true)">
        <span class="card-list-item__info">
          <b>Добавить банковскую карту</b>
        </span>
      </div>
    </div>
    <div v-else-if="!showLoader">
      <add-card v-on:cardAdded="getPayMethods" :showCancel="payMethods.length > 0" v-on:cancelAdd="toggleShowAdding(false)"></add-card>
    </div>
    <p class="text-danger text-center" v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import api from '@/store/api'
import CardItem from './CardItem'
import AddCard from '@/components/payment/AddCard'
import Loader from '@/components/utils/Loader'

export default {
  name: 'choose-payment-method',
  data () {
    return {
      payMethod: null,
      payMethods: [],
      showAddingCard: false,
      errorMessage: '',
      showLoader: false
    }
  },
  components: {
    CardItem,
    AddCard,
    Loader
  },
  mounted () {
    this.getPayMethods()
  },
  methods: {
    getPayMethods () {
      this.showLoader = true
      this.$http.get(api.API_REST_LINK2 + 'webclient/payMethods').then(response => {
        this.showLoader = false
        this.errorMessage = ''
        this.payMethods = response.data.payMethods
      }).catch(error => {
        this.showLoader = false
        this.errorMessage = error.data.message
      })
    },
    setPaymentCard (val) {
      this.$emit('payMethodSetted', val)
    },
    toggleShowAdding (val) {
      this.showAddingCard = val
      this.$emit('showAdding', this.showAddingCard)
    }
  }
}
</script>
