<template>
  <div>
    <div class="bg-white rounded current-shadow widget--min-height relative mb-3">
      <loader v-if="showLoader"></loader>
      <div class="text-center cap" v-if="!Object.keys(tickets).length && !showLoader">
        <div class="cap__noresults ml-auto mr-auto"></div>
        <p class="lead cap__text">{{$t('support.have-no')}}</p>
        <router-link :to="{ name: 'profile-add-ticket'}" class="btn btn-default">{{$t('support.create')}}</router-link>
      </div>
      <div v-show="Object.keys(tickets).length">
        <div class="overflow-x widget__inner-min-height">
          <table class="table table-hover nomargin table-md-height mb-0">
            <thead>
              <tr>
                <th class="border-top-0">{{$t('support.title')}}</th>
                <th class="border-top-0">{{$t('support.created')}}</th>
                <th class="border-top-0">{{$t('support.type')}}</th>
                <th class="d-none d-md-table-cell border-top-0">{{$t('support.status')}}</th>
              </tr>
            </thead>
            <tbody>
              <router-link :to="{name: 'profile-ticket', query: { id: ticket.idt_ticket, orderId: ticket.idt_order }}" v-for="(ticket, index) in tickets" tag="tr" class="cursor-pointer" :key="index">
                <td><router-link :to="{name: 'profile-ticket', query: { id: ticket.idt_ticket, orderId: ticket.idt_order }}">{{ticket.title}}</router-link></td>
                <td><span v-dt-format="ticket.a_time"></span></td>
                <td><span>{{types[ticket.idc_ticket_type]}}</span></td>
                <td class="d-none d-md-table-cell"><span v-bind:class="['status', 'status--' + (ticket.idc_ticket_state)]">{{statuses[ticket.idc_ticket_state]}}</span></td>
              </router-link>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <pagination
      :count="count"
      :itemsPerPage="itemsPerPage"
      :pushQuery="true"
      :moreBtn="true"
      v-on:pageChanged="setTickets"
      v-on:showMore="pushTickets"
      ref="pagination"
    ></pagination>
  </div>
</template>

<script>
import api from '../../store/api'
import dtFormat from '../../directives/formatDateTime'
import Pagination from '../utils/Pagination'
import Loader from '../utils/Loader'

export default {
  name: 'support-open',
  data () {
    return {
      tickets: [],
      statuses: {
        '1': 'В очереди на обработку',
        '2': 'В обработке',
        '3': 'Получен ответ',
        '4': 'Закрыт'
      },
      count: 0,
      itemsPerPage: 6,
      showLoader: false,
      filterStatuses: ''
    }
  },
  computed: {
    types () {
      return this.$store.state.ticketTypes
    }
  },
  components: {
    Pagination,
    Loader
  },
  directives: {
    dtFormat
  },
  methods: {
    getTickets (offset) {
      this.showLoader = true
      let options = {
        target: 'client',
        limit: this.itemsPerPage,
        offset: offset || 0,
        states: '1,2,3'
      }
      return this.$http.get(api.API_REST_LINK2 + 'web/tickets', {params: options}).then((response) => {
        let data = response.data

        this.sum = data.cost
        this.earn = data.earn
        this.showLoader = false
        return data
      })
    },
    setTickets (offset, per) {
      this.getTickets(offset, per).then((data) => {
        this.tickets = data.tickets || []
        this.count = data.count
      })
    },
    pushTickets (offset, per) {
      this.getTickets(offset, per).then((data) => {
        this.tickets = [...new Set([...this.tickets, ...data.tickets])]
        this.count = data.count
      })
    }
  }
}
</script>
