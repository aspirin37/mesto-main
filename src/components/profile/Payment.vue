<template>
  <div class="bg-white rounded current-shadow p-3 p-md-4 relative mb-3 widget--min-height">

    <!-- <div class="text-center cap" v-if="!cardsLength && !isShowForm && !showLoader">
      <div class="cap__noresults ml-auto mr-auto"></div>
      <p class="lead cap__text">У вас еще нет добавленных карт</p>
      <button class="btn btn-success" v-on:click="isShowForm = true">Добавить карту</button>
    </div> -->

    <loader v-if="showLoader"></loader>
    <h3 class="mb-3">Мои карты</h3>
    <ul class="list-unstyled list-inline cards-list mb-3">
      <card-item
        v-if="cardsLength"
        v-for="(card, index) in userCards"
        v-on:deleteCard="confirmDelete(card)"
        :pan="card.pan"
        :key="index"
        :animate="index === animatedCard"
        class="mr-3"
      ></card-item>
      <li class="cards-list__item d-inline-block mr-3">
        <a href="#" class="small-card text-left d-block link-reset" v-on:click.prevent="isShowForm = !isShowForm">
          <span class="small-card__plus">+</span>
        </a>
      </li>
    </ul>

    <div class="p-3 mb-3" v-if="isShowForm && !showLoader">
      <add-card v-on:cardAdded="getCards(true)" :showCancel="false"></add-card>
      <p class="text-danger text-center">{{errorMessage}}</p>
    </div>

    <payment-balance></payment-balance>

    <modal
      modalSize="modal-xs"
      modalTitle="Вы уверены что хотите удалить эту карту?"
      ref="confirm"
    >
      <div slot="modalBody">
        <div class="text-center">
          <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="toggleModal('confirm')">Нет, отменить</button>
          <button type="button" class="btn btn-theme" v-on:click.prevent="deleteCard(cardToDelete)">Да</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import api from '../../store/api'
import Modal from '../utils/Modal'
import checkCard from '../../mixins/checkCard'
import CardItem from './CardItem'
import AddCard from '../payment/AddCard'
import Loader from '../utils/Loader'
import PaymentBalance from '../payment/PaymentBalance'

export default {
  name: 'profile-payment',
  data () {
    return {
      userCards: [],
      cardPan: '',
      cardCvc: '',
      cardYyyy: '',
      cardMm: '',
      cardName: '',
      errorMessage: '',
      cardToDelete: '',
      isShowForm: false,
      showLoader: false,
      animatedCard: ''
    }
  },
  components: {
    Modal,
    CardItem,
    AddCard,
    Loader,
    PaymentBalance
  },
  mixins: [checkCard],
  beforeMount () {
    this.getCards()
  },
  computed: {
    cardsLength () {
      return this.userCards.length
    }
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    getCards (anim) {
      this.showLoader = true
      this.animatedCard = (anim ? this.userCards.length : null)
      let options = {
        target: 'client'
      }
      this.$http.get(api.API_REST_LINK2 + 'web/bankCards/', {params: options}).then((response) => {
        let data = response.data.cards

        this.showLoader = false
        this.userCards = data
      }).catch((error) => {
        this.errorMessage = error.data.message
      })
    },
    deleteCard (item) {
      this.$http.delete(api.API_REST_LINK2 + 'web/bankCards/' + item.idt_pay_method + '/target/client').then((response) => {
        this.getCards()
        this.toggleModal('confirm')
      }).catch((error) => {
        this.errorMessage = error.data.message
      })
    },
    confirmDelete (card) {
      this.cardToDelete = card
      this.toggleModal('confirm')
    }
  }
}
</script>
