<template>
  <div class="page-bottom-space">

    <!-- Filter -->
    <div class="bg-white rounded current-shadow px-3 pt-3 pb-0 form-group">
      <div class="row align-items-center flex-lg-nowrap">
        <div class="col-12 col-md-auto mr-auto mb-3 filter-number-input">
          <input type="text" class="form-control form-control-sm" v-model="numberForFilter" placeholder="Номер заказа" v-on:keyup="reloadOrders()">
        </div>
        <div class="col-12 col-sm d-flex flex-nowrap mb-3">
          <v-select
            class="text-nowrap"
            :options="statuses"
            :optionValue="'value'"
            :outerClass="['d-inline-block']"
            :dropdownClass="['dropdown-menu-right dropdown-menu-sm-fixed']"
            :tag="'div'"
            v-on:selected="getByStatus"
            selectedItem="0"
            ref="statusSelect"
          ></v-select>
        </div>
        <div class="col-12 col-sm text-nowrap mb-3">
          <a href="#" v-on:click="clearFilter" tooltip="Очистить" flow="left" class="mr-2 link-reset" v-if="dateFrom">&#10006;</a>
          <datepicker :options="fpOptions"
            placeholder="За все время"
            class="datepicker-link"
            v-on:input="getByDateRange"
            ref="rangeSelect"
          ></datepicker>
        </div>
        <div class="col-12 col-sm mb-3 text-left text-md-right">
          <label class="custom-check text-nowrap">
            <input type="checkbox" class="custom-check__input" v-on:change="reloadOrders()" v-model="payStatus">
            <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
            Не оплачен
          </label>
        </div>
      </div>
    </div>
    <!-- /Filter -->

    <!-- Cap -->
    <p class="text-muted" v-if="count">Найдено <span v-thousands="count"></span> заказов на сумму <span v-thousands="sum"></span> руб.</p>
    <div class="bg-white rounded current-shadow p-3 widget--min-height relative" v-if="!count && !showLoader">
      <div class="text-center cap">
        <div class="cap__noresults ml-auto mr-auto"></div>
        <p class="lead cap__text">Заказов не найдено</p>
        <router-link :to="{ name: 'new-order'}" class="btn btn-success">Создать заказ</router-link>
      </div>
    </div>
    <!-- /Cap -->

    <loader v-if="showLoader"></loader>

    <!-- Orders -->
    <div class="bg-white rounded current-shadow widget--min-height relative mb-3" v-show="count">
      <div class="overflow-x">
        <table class="table table-hover nomargin small-orders-table">
          <thead>
            <tr class="d-none d-lg-table-row">
              <th><span class="pl-lg-2 show">{{$t('order-number')}}</span></th>
              <th>{{$t('order.status')}}</th>
              <th class="d-none d-lg-table-cell hidden-sm">{{$t('order.created')}}</th>
              <th class="d-none d-lg-table-cell">{{$t('order.route')}}</th>
              <th>{{$t('price')}}</th>
            </tr>
          </thead>
          <tbody>
            <router-link :to="{name: 'profile-order', query: { id: item.idt_order }}" v-for="(item, index) in orders" tag="tr" class="cursor-pointer d-block d-lg-table-row" :key="index">
              <td class="d-block d-lg-table-cell">
                <router-link :to="{name: 'profile-order', query: { id: item.idt_order }}" class="pl-lg-2 mr-3 small-orders-table__number d-none d-lg-table-cell">{{item.order_number}}</router-link>
                <div class="d-inline-block w-100 d-lg-none">
                  <div class="float-left">
                    <router-link :to="{name: 'profile-order', query: { id: item.idt_order }}" class="pl-lg-2 mr-3 small-orders-table__number">{{item.order_number}}</router-link>
                    <div class="d-lg-none small text-muted">{{item.a_time_format}}</div>
                  </div>
                  <div class="d-lg-none float-right text-right clearfix">
                    <div class="text-large">
                      <img src="../assets/icons/credit-card.svg" alt="" v-if="item.idt_pay_method" class="order-table-pay-type">
                      <img src="../assets/icons/funds.svg" alt="" v-else class="order-table-pay-type">
                      {{item.cost}} руб.
                    </div>
                    <span class="small text-muted d-block">({{item.is_already_payed ? 'Оплачен' : 'Не оплачен'}})</span>
                  </div>
                </div>
              </td>
              <td class="d-block d-lg-table-cell">
                <span v-bind:class="['status', 'status--' + (item.idc_order_state)]">
                  {{statuses[item.idc_order_state].value}}
                  <span v-if="item.finish_time_format">{{item.finish_time_format}}</span>
                </span>
              </td>
              <td class="d-none d-lg-table-cell hidden-sm"><span>{{item.a_time_format}}</span></td>
              <td class="d-block d-lg-table-cell">
                <div class="sm-point"
                  :key="index"
                  v-for="(address, index) in item.addresses"
                  v-bind:class="{'sm-point--first' : index === 0, 'sm-point--last': index === item.addresses.length - 1}"
                >{{address.address}}</div>
              </td>
              <td class="d-none d-lg-table-cell">
                <div class="d-inline-block text-right">
                  <div class="text-nowrap">
                    <payment-method :type="item.idc_pay_method_type" class="order-table-pay-type"></payment-method>
                    {{item.cost}} руб.
                  </div>
                  <span class="small" v-bind:class="`${!item.is_already_payed ? 'text-danger' : 'text-muted'}`">{{item.is_already_payed ? $t('order.payed') : $t('order.not-payed')}}</span>
                </div>
              </td>
            </router-link>
          </tbody>
        </table>
      </div>
    </div>
    <!-- /Orders -->

    <!-- Pagination -->
    <pagination
      :count="count"
      :itemsPerPage="itemsPerPage"
      :pushQuery="true"
      :moreBtn="true"
      v-on:pageChanged="setOrders"
      v-on:showMore="pushOrders"
      ref="pagination"
    ></pagination>
    <!-- /Pagination -->

  </div>
</template>

<script>
import api from '../store/api'
import Pagination from '../components/utils/Pagination'
import Loader from '../components/utils/Loader'
import Datepicker from '../components/utils/Datepicker'
import vSelect from '../components/utils/Select'
import PaymentMethod from '../components/inner/PaymentMethod'

export default {
  name: 'order-history',
  data () {
    return {
      orders: [],
      currentOffset: null,
      itemsPerPage: 7,
      showNextBtn: true,
      count: 0,
      sum: '',
      showLoader: false,
      numberForFilter: '',
      payStatus: false,
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
      dateFrom: '',
      dateTo: ''
    }
  },
  beforeMount () {
    // this.getOrders()
  },
  components: {
    Pagination,
    Loader,
    Datepicker,
    vSelect,
    PaymentMethod
  },
  computed: {
    statuses () {
      return [
        {key: '', value: 'Все заказы'},
        {key: '1', value: this.$t('order-status.1')},
        {key: '2', value: this.$t('order-status.2')},
        {key: '3', value: this.$t('order-status.3')},
        {key: '4', value: this.$t('order-status.4')},
        {key: '5', value: this.$t('order-status.5')},
        {key: '6', value: this.$t('order-status.6')},
        {key: '7', value: this.$t('order-status.7')},
        {key: '8', value: this.$t('order-status.8')},
        {key: '9', value: this.$t('order-status.9')},
        {key: '10', value: this.$t('order-status.10')},
        {key: '11', value: this.$t('order-status.11')},
        {key: '12', value: this.$t('order-status.12')},
        {key: '13', value: this.$t('order-status.13')}
      ]
    }
  },
  methods: {
    getOrders (offset, per) {
      this.showLoader = true
      this.itemsPerPage = +per || this.itemsPerPage
      let options = {
        offset: offset || 0,
        limit: this.itemsPerPage,
        get_active: true
      }
      if (this.sortParameter) {
        options.sort = this.sortParameter
      }
      if (this.dateTo) {
        options.a_time_from = this.dateFrom
        options.a_time_to = this.dateTo
      }
      if (this.payStatus) {
        options.is_already_payed = false
      }
      if (this.searchStatus) {
        options.idc_order_state = this.searchStatus
      }
      if (this.numberForFilter) {
        options.order_number = this.numberForFilter
      }
      return this.$http.get(api.API_REST_LINK2 + 'webclient/history', {params: options}).then((response) => {
        let data = response.data

        this.sum = data.cost
        this.earn = data.earn
        this.showLoader = false
        return data
      }).catch((error) => {
        this.showLoader = false
        this.errorMessage = error.data.message
      })
    },
    setOrders (offset, per) {
      this.getOrders(offset, per).then((data) => {
        this.orders = data.orders || []
        this.count = data.count
      })
    },
    pushOrders (offset, per) {
      this.getOrders(offset, per).then((data) => {
        this.orders = this._.union(this.orders, data.orders)
        this.count = data.count
      })
    },
    getByDateRange (e) {
      let datesArray = e.split(' ')
      this.dateFrom = datesArray[0]
      this.dateTo = (+datesArray[2] + 86399).toString()
      if (datesArray.length > 1) {
        this.reloadOrders()
      }
    },
    getByStatus (e) {
      this.searchStatus = e.key
      this.reloadOrders()
    },
    clearFilter () {
      this.showClearBtn = false
      this.$refs.rangeSelect.clearValue()
      this.dateFrom = ''
      this.dateTo = ''
      this.reloadOrders()
    },
    reloadOrders () {
      this.$refs.pagination.toPage(0)
    }
  }
}
</script>
