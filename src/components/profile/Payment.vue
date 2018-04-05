<template>
  <div class="bg-white rounded current-shadow p-2 p-sm-3 relative mb-3 widget--min-height">

    <div class="text-center cap" v-if="!userCards.length && !isShowForm && !showLoader">
      <div class="cap__noresults ml-auto mr-auto"></div>
      <p class="lead cap__text">У вас еще нет добавленных карт</p>
      <button class="btn btn-success" v-on:click="isShowForm = true">Добавить карту</button>
    </div>

    <loader v-if="showLoader"></loader>
    <div class="p-3" v-if="userCards && userCards.length">
      <h3 class="text-center nomargin">Мои карты</h3>
      <ul class="list-unstyled list-inline cards-list text-center">
        <card-item
          v-for="(card, index) in userCards"
          :pan="card.pan"
          :key="index"
          v-on:deleteCard="confirmDelete(card)"
          :animate="index === animatedCard"
          class="mx-2"
        ></card-item>
      </ul>
    </div>

    <div class="p-3" v-if="isShowForm || userCards.length && !showLoader">
      <add-card v-on:cardAdded="getCards(true)" :showCancel="false" v-bind:class="{'add-card-padd-top' : !userCards.length}"></add-card>
      <p class="text-danger text-center">{{errorMessage}}</p>
    </div>

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
import AddCard from '../order/AddCard'
import Loader from '../utils/Loader'

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
    Loader
  },
  mixins: [checkCard],
  beforeMount () {
    this.getCards()
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
