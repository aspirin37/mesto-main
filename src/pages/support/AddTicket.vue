<template>
  <div class="page-bottom-space">
    <div class="bottom-space">
      <router-link :to="{ name: 'profile-support'}" class="back-btn base-line-height">Список обращений</router-link>
    </div>

    <div class="bg-white rounded current-shadow p-3 widget--min-height relative">
      <div class="over-cap" v-if="showLoader">
        <loader></loader>
      </div>
      <div v-if="messageSended && !showLoader" class="text-center cap">
        <div class="cap__success ml-auto mr-auto"></div>
        <p class="lead cap__text"><span class="text-success">Ваше сообщениe отправлено</span></p>
        <p class="text-muted">Следите за историей обращений в разделе <router-link :to="{ name: 'profile-support'}">"Поддержка"</router-link></p>
      </div>
      <div v-else>
        <div class="form-group">
          <h3 class="text-center">Новое обращение</h3>
          <p v-if="orderNumber" class="text-center"><router-link :to="{name: 'profile-order', query: { id: orderId }}">Заказ <b>{{orderNumber}}</b></router-link></p>
        </div>
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-5">
            <form v-on:submit.prevent="addTicket">
              <div class="form-group">
                <u-select
                  :options="types"
                  :linkClass="['w-100', 'link-reset', 'form-control']"
                  :optionValue="'value'"
                  :dropdownClass="['w-100']"
                  :popperOptions="{positionFixed: false}"
                  v-on:selected="setTicketType"
                  selectedItem="0"
                ></u-select>
                <!-- <select type="text" class="form-control" v-model="ticketType">
                  <option :value="index" v-for="(option, index) in types">{{option}}</option>
                </select> -->
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Заголовок или номер заказа" v-model="ticketTitle">
              </div>
              <div class="form-group">
                <textarea rows="6" class="form-control" placeholder="Сообщение" v-model="newMessage"></textarea>
              </div>
              <div class="text-right form-group">
                <button type="submit" class="btn btn-success small-display-block small-w-100" :disabled="(newMessage.length < 2) || (ticketTitle.length < 2)">Отправить сообщение</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../store/api'
import dtFormat from '../../directives/formatDateTime'
import Loader from '../../components/utils/Loader'

export default {
  name: 'profile-add-ticket',
  data () {
    return {
      ticketInfo: {},
      orderNumber: this.$route.query.ordernumber,
      newMessage: '',
      ticketType: 1,
      ticketTitle: '',
      messageSended: false,
      showLoader: false
    }
  },
  computed: {
    orderId () {
      return this.$route.query.orderid
    },
    types () {
      let typesArray = []
      let stateTypes = this.$store.state.ticketTypes
      Object.keys(stateTypes).map((key) => {
        let item = {}
        item.key = +key
        item.value = stateTypes[key]
        typesArray.push(item)
      })
      return typesArray
    }
  },
  components: {
    Loader
  },
  directives: {
    dtFormat
  },
  methods: {
    addTicket () {
      this.showLoader = true
      let options = {
        target: 'client',
        title: this.ticketTitle,
        message: this.newMessage,
        idc_ticket_type: this.ticketType
      }
      if (this.orderId) {
        options.idt_order = this.orderId
      }
      this.$http.post(api.API_REST_LINK2 + 'web/tickets', options).then(response => {
        this.showLoader = false
        this.messageSended = true
      })
    },
    setTicketType (event) {
      this.ticketType = event.key
    }
  }
}
</script>
