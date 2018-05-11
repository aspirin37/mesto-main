<template>
  <div class="page-bottom-space">
    <div class="bottom-space">
      <router-link :to="{ name: 'profile-support'}" class="back-btn base-line-height">Список обращений</router-link>
    </div>

    <div class="bg-white rounded current-shadow p-3 widget--min-height">
      <div class="form-group">
        <h3 class="text-center">Обращение <b>№{{itemId}}</b></h3>
        <p class="text-center" v-if="ticketInfo.idc_ticket_state !== 4"><a href="#" class="link-dotted small" v-on:click.prevent="toggleModal('confirm-close')">Вопрос решен</a></p>
        <p class="text-center" v-if="orderNumber"><router-link :to="{name: 'profile-order', query: { id: orderId }}">Заказ <b>{{orderNumber}}</b></router-link></p>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-6">
          <form v-on:submit.prevent="sendMessage">
            <div class="form-group">
              <textarea rows="3" class="form-control" placeholder="Сообщение" v-model="newMessage"></textarea>
            </div>
            <div class="text-right form-group">
              <button type="submit" class="btn btn-success" :disabled="newMessage.replace(/\s/g, '').length < 2">Отправить сообщение</button>
            </div>
          </form>
          <!-- <pre>{{ticketInfo}}</pre> -->
          <transition-group name="slide" class="list-unstyled" tag="ul">
            <li v-for="(item, index) in ticketInfo.messages"
              class="border rounded px-3 py-2 mb-3"
              v-bind:class="{'bg-light' : item.idt_user !== null}"
              :key="index"
            >
              <p class="small text-muted mb-2">{{item.idt_user === null ? 'Вы' : 'Менеджер'}}<span class="float-right" v-dt-format="item.a_time"></span></p>
              <span>{{item.message}}</span>
            </li>
          </transition-group>
          <div class="alert alert-warning" v-if="ticketInfo.messages && ticketInfo.messages.length < 2">Ответ пока не получен</div>
          <div class="text-center" v-if="ticketInfo.messages">
            <a href="#" class="link-dotted" v-on:click.prevent="showMore" v-if="ticketInfo.messages.length < count">Показать все</a>
          </div>
        </div>
      </div>
      <modal
        modalSize="modal-xs"
        modalTitle="Вы уверены что хотите закрыть обращение?"
        ref="confirm-close"
      >
        <div slot="modalBody">
          <div class="text-center">
            <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="toggleModal('confirm-close')">Нет, отменить</button>
            <button type="button" class="btn btn-theme" v-on:click.prevent="closeTicket">Да</button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import api from '../../store/api'
import dtFormat from '../../directives/formatDateTime'
import Modal from '../../components/utils/Modal'

export default {
  name: 'profile-ticket',
  data () {
    return {
      ticketInfo: {},
      types: {
        '1': 'Общий вопрос',
        '2': 'Пропал курьер',
        '3': 'Заказ отменен',
        '4': 'Испорчена упаковка',
        '5': 'Пропал отправитель',
        '6': 'Пропал получатель',
        '7': 'Неправильная упаковка',
        '8': 'Отмена получателем',
        '9': 'Проблема с курьером'
      },
      itemId: +this.$route.query.id || '',
      orderId: +this.$route.query.orderId || '',
      orderNumber: +this.$route.query.orderNumber || '',
      newMessage: '',
      messagesPerPage: 5,
      count: 0
    }
  },
  beforeMount () {
    this.getTicket()
  },
  components: {
    Modal
  },
  directives: {
    dtFormat
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    getTicket () {
      let options = {
        idt_ticket: this.itemId,
        target: 'client',
        limit: this.messagesPerPage,
        offset: 0
      }
      this.$http.get(api.API_REST_LINK2 + 'web/tickets/', {params: options}).then(response => {
        let data = response.data

        this.count = data.message_count
        this.ticketInfo = data
      })
    },
    messageAction (close) {
      let options = {
        idt_ticket: this.itemId,
        target: 'client'
      }
      if (this.newMessage) { options.message = this.newMessage }
      if (close === true) { options.idc_ticket_state = '4' }
      return this.$http.put(api.API_REST_LINK2 + 'web/tickets/', options)
    },
    closeTicket () {
      this.messageAction(true).then(() => {
        this.toggleModal('confirm-close')
        this.$router.push({name: 'profile-support'})
      })
    },
    sendMessage () {
      this.messageAction().then(() => {
        this.getTicket()
        this.newMessage = ''
      })
    },
    showMore () {
      this.messagesPerPage = 20
      this.getTicket()
    }
  }
}
</script>
