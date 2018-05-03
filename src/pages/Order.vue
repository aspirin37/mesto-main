<template>
  <div class="page-bottom-space">

    <!-- Header -->
    <div class="row bottom-space">
      <div class="col-12 col-md-4">
        <go-back class="d-none d-md-block"></go-back>
      </div>
      <div class="col-12 col-md-8 text-right">
        <button class="btn btn-default btn-sm" v-on:click="toggleModal('reject')" v-if="[1, 3, 4, 9].indexOf(status) >= 0">{{$t('order.cancel')}}</button>
      </div>
    </div>
    <!-- /Header -->

    <div class="bg-white rounded current-shadow form-group relative" v-bind:class="{'widget--min-height' : showLoader}">
      <loader v-if="showLoader"></loader>
      <div class="row flex-lg-nowrap justify-content-stretch" v-if="!showLoader || Object.keys(order).length">
        <div class="col-12 col-lg-6 col-xl-5 pr-lg-0">
          <div class="p-3 p-md-4">
            <div class="form-group relative">
              <h2 class="order-info-widget__title">
                <small>Заказ </small><b>{{order.order_number}}</b>
                <repeat-order :orderData="order"></repeat-order>
              </h2>
              <!-- <div class="order-actions" v-bind:class="{'order-actions--active' : showDrop}">
                <a href="#" class="order-actions__link" v-on:click="showDrop = !showDrop"><img src="../assets/icons/dots-menu.svg" alt="actions" class=""></a>
                <ul class="order-actions__menu list-unstyled" v-if="showDrop">
                  <li class="relative" tooltip="Что-то пошло не так?" flow="left">
                    <router-link :to="{ name: 'profile-add-ticket', query: { orderId: order.idt_order, orderNumber: orderNumber }}" title="Что-то пошло не так?"><img src="../assets/icons/question.svg" alt="actions" class="order-actions__icon"></router-link>
                  </li>
                  <li class="relative" tooltip="Повторить заказ" flow="left">
                    <a href="#"><img src="../assets/icons/repeat.svg" alt="actions" class="order-actions__icon" title="Повторить заказ" v-on:click.prevent="toggleModal('repeat')"></a>
                  </li>
                  <li class="relative" tooltip="Лог заказа" flow="left">
                    <a href="#"><img src="../assets/icons/clipboard.svg" alt="actions" class="order-actions__icon" title="Лог заказа"></a>
                  </li>
                </ul>
              </div> -->
              <div class="order-icons">
                <div>
                  <img src="../assets/icons/run.svg" alt="run" v-if="order.idc_courier_transport === 1" class="new-order-nav__icon" title="Курьер пешком">
                  <img src="../assets/icons/car-front.svg" alt="car" v-else class="new-order-nav__icon" title="Курьер на авто">
                </div>
                <!-- <a href="#" class="order-icons__icon order-icons__icon--repeat" v-on:click.prevent="toggleModal('repeat')" tooltip="Повторить заказ" flow="down"></a> -->
              </div>
            </div>
            <div class="border rounded p-3 mb-3">
              <table>
                <tr>
                  <td class="align-top pr-2 text-right pb-1 small pt-1">
                    <span class="text-muted">{{$t('order.created')}}:</span>
                  </td>
                  <td>
                    <span>{{order.a_time_format}}</span>
                  </td>
                </tr>
                <tr>
                  <td class="align-top pr-2 text-right pb-1 small pt-1">
                    <span class="text-muted">{{$t('order.status')}}:</span>
                  </td>
                  <td class="pb-1">
                    <svg v-if="status === 3" class="steps-animated" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       width="25.5px" height="25.5px" viewBox="0 0 25.5 25.5" style="enable-background:new 0 0 25.5 25.5;" xml:space="preserve">
                      <g>
                        <path d="M19.7,20.4c-1.7-0.5-3-0.8-4.3-1.3C11,25.5,19,28.9,19.7,20.4z"/>
                        <path d="M22.5,11.4C22.4,8.8,22,5.5,18.4,6c-1.7,0.4-2.9,2.3-3.5,5.4c-0.3,1.7-0.1,4.2,0.2,5.6c0.3,1,0.2,1,0.6,1.2
                          c1.4,0.3,2.8,0.7,4.3,1C21.5,18.3,22.7,12.8,22.5,11.4z"/>
                      </g>
                      <g>
                        <path d="M11.5,11.2c0.4-1.5,0.6-3.9,0.2-5.6c-0.6-3.2-1.8-5-3.5-5.4c-3.6-0.5-4,2.8-4.1,5.3c-0.2,1.4,1,6.9,2.5,7.9
                          c1.4-0.4,2.9-0.7,4.3-1C11.3,12.1,11.2,12.2,11.5,11.2z"/>
                        <path d="M11.3,13.2C9.9,13.7,8.7,14,7,14.5C7.7,23,15.7,19.6,11.3,13.2z"/>
                      </g>
                    </svg>
                    <span v-bind:class="['status', 'status--' + (status)]" v-if="status !== 3">{{statuses[status]}}</span>
                    <span v-if="status === 3">{{statuses[status]}}</span>
                    <span>{{$t('letters')[activePoint]}}</span>
                    <span v-if="order.finish_time_format">{{order.finish_time_format}}</span>
                  </td>
                </tr>
                <tr v-if="order.cost_declare">
                  <td class="align-top pr-2 text-right pb-1 small pt-1">
                    <span class="text-muted">Оценочная стоимость:</span>
                  </td>
                  <td class="pb-1">
                    <span><span v-thousands="order.cost_declare"></span> руб.</span>
                  </td>
                </tr>
                <tr v-if="order.description">
                  <td class="align-top pr-2 text-right pb-1 small pt-1">
                    <span class="text-muted">{{$t('order.description')}}:</span>
                  </td>
                  <td class="pb-1 pre-wrap">
                    <span>{{order.description}}</span>
                  </td>
                </tr>
                <tr v-if="order.options && order.options.length">
                  <td class="align-top pr-2 text-right pb-1 small pt-1">
                    <span class="text-muted">{{$t('order.options')}}:</span>
                  </td>
                  <td class="pb-1">
                    <div v-for="(option, index) in order.options" class="d-flex" :key="index">
                      <img :src="option.url_icon" alt="icon" class="inline-img mr-2">
                      <span>
                        <span class="mr-1">{{option.name}}</span>
                        <span class="text-nowrap text-muted" v-if="option.cost !== 0">(<span v-if="option.cost > 0">+</span>{{option.cost}} руб.)</span>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr v-if="order.photos && order.photos.client && order.photos.client.length">
                  <td class="align-top pr-2 text-right pb-1 small pt-1">
                    <span class="text-muted">Фото (клиент):</span>
                  </td>
                  <td class="pb-1">
                    <thumbnails-outer>
                      <thumbnail
                        v-for="(pic, index) in order.photos.client"
                        :key="index"
                        :img="pic.thumbnail"
                        :thumb="pic.url"
                        :thumbClasses="['d-inline-block', 'mr-2']"
                        :linkClasses="['order-photos__item']"
                        :index="index"
                      ></thumbnail>
                    </thumbnails-outer>
                  </td>
                </tr>
                <tr v-if="order.photos && order.photos.courier && order.photos.courier.length">
                  <td class="align-top pr-2 text-right pb-1 small pt-1">
                    <span class="text-muted">Фото (курьер):</span>
                  </td>
                  <td class="pb-1">
                    <thumbnails-outer>
                      <thumbnail
                        v-for="(pic, index) in order.photos.courier"
                        :key="index"
                        :img="pic.thumbnail"
                        :thumb="pic.url"
                        :thumbClasses="['d-inline-block', 'mr-2']"
                        :linkClasses="['order-photos__item']"
                        :index="index"
                      ></thumbnail>
                    </thumbnails-outer>
                  </td>
                </tr>
              </table>
            </div>

            <p class="text-muted small mb-2" v-if="order.packets">Посылки:</p>
            <div class="d-flex mb-3 mr-2 flex-wrap">
              <div v-for="(packet, index) in order.packets" class="border rounded p-3 mb-3" :key="index">
                <p class="mb-0"><b>{{packet.packetType.alias}}</b></p>
                <span>{{packet.packetType.description}}</span>
                <span class="mt-3" v-if="packet.size_x">{{+packet.size_x / 10 || '-'}} см <span class="text-muted">x</span> {{+packet.size_y / 10 || '-'}} см <span class="text-muted">x</span> {{+packet.size_z / 10 || '-'}} см</span>
              </div>
            </div>

            <div class="d-flex pb-4 relative" v-for="(address, index) in order.addresses" :key="index">
              <div class="mr-3 mt-1" v-on:click="setPointCenter(index)">
                <span class="address-marker d-inline-block cursor-pointer"
                  v-bind:class="{'address-marker--first': index === 0, 'address-marker--last': (index + 1) === order.addresses.length}"
                >{{$t('letters')[index]}}</span>
              </div>
              <div>
                <div class="mr-3 cursor-pointer" v-on:click="setPointCenter(index)" v-bind:class="{'text-muted' : pointToShow === index}">
                  <b class="pre-wrap mr-1">{{address.address}}</b>
                  <b v-if="address.room" class="mr-1">({{address.room}})</b>
                  <span class="small text-nowrap" v-if="address.is_payment_address && !order.is_already_payed">(Оплата здесь)</span>
                </div>
                <a :href="'tel:+' + address.contact_phone" class="phone-link">{{address.contact_phone_format}}</a>
                <span v-if="address.contact_name">, {{address.contact_name}}</span>
                <span class="d-block" v-if="address.contact_time_format">
                  {{address.contact_time_format || ''}}
                </span>
                <span class="d-block px-2 mt-2 border-left border-success small" v-if="address.description">«{{address.description}}»</span>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between flex-wrap flex-lg-nowrap align-items-center">
              <router-link :to="{ name: 'profile-add-ticket', query: { orderid: order.idt_order, ordernumber: order.order_number }}" class="small">Что-то пошло не так?</router-link>
              <div class="text-right mb-0 text-nowrap">
                <span v-if="status !== 1">
                  <payment-method :type="order.idc_pay_method_type" class="inline-img align-middle"></payment-method>
                  {{order.is_already_payed ? $t('order.payed') + '.' : $t('order.not-payed') + '.'}}
                </span>
                <a href="#" class="link-dotted" v-if="!order.is_already_payed && !([2, 7, 8, 12].indexOf(status) >= 0)" v-on:click.prevent="toggleModal('payment')">
                  <span v-if="status === 1">Подтвердить</span><span v-else>{{$t('order.make-pay')}}</span>
                </a>
                <!-- <small class="d-none d-md-block">Цена: </small> -->
                <b
                  class="py-1 px-2 rounded text-white ml-1"
                  v-bind:class="order.is_already_payed ? 'bg-success' : 'bg-warning'"
                >
                  <span v-thousands="order.cost"></span> руб.
                </b>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 col-xl-7 d-flex pl-lg-0">

          <!-- Map -->
          <div class="relative profile-order-map h-100 w-100" v-if="showMap">
            <gmap-map
              :center="center"
              :zoom="11"
              ref="mmap"
              class="h-100"
            >
              <gmap-marker
                v-for="(m, index) in markers"
                :zIndex="+`${(index === pointToShow) ? 9 : 1}`"
                :position="{lat: m.lat, lng: m.lng}"
                :clickable="true"
                :draggable="false"
                :scrollable="false"
                :key="index"
                :icon="generateMarkerIcon(markers.length < 2 ? 'K' : $t('letters')[index], `${markers.length < 2 ? '#383340' : index === 0 ? '#0B9A87' : (index + 1) === markers.length ? '#7846C3' : ''}`)"
                class="sm-point"
              ></gmap-marker>
              <gmap-marker
                :position="{'lat': parseFloat(order.courier.lat), 'lng': parseFloat(order.courier.lng)}"
                :clickable="true"
                :draggable="false"
                :scrollable="false"
                :icon="generateMarkerIcon('K', '#383340')"
              ></gmap-marker>
            </gmap-map>
          </div>
          <!-- /Map -->

        </div>
      </div>
    </div>

    <!-- Feedback -->
    <feedback-courier
      :courier="order.courier"
      :rate="order.rate"
      :isDone="status === 7"
      :orderId="'' + itemId"
      v-if="order.courier && order.courier.idt_courier"
      v-on:added="getOrderData"
    ></feedback-courier>
    <!-- /Feedback -->

    <modal
      modalSize="modal-xs"
      :modalTitle="$t('order.cancel-confirm')"
      ref="reject"
    >
      <div slot="modalBody">
        <div class="text-center">
          <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click.prevent="toggleModal('reject')">{{$t('no')}}</button>
          <button type="button" class="btn btn-theme" v-on:click.prevent="rejectOrder">{{$t('yes')}}</button>
        </div>
      </div>
    </modal>

    <modal
      modalSize="modal-md"
      modalTitle="Оплата заказа"
      ref="payment"
    >
      <div slot="modalBody">
        <h4 class="mb-3 text-center">Выберите способ оплаты:</h4>
        <payment-modal v-on:payed="donePayment" :orderId="this.itemId" :price="order.cost" class="mw-400 mx-auto"></payment-modal>
      </div>
    </modal>

    <modal
      modalSize="modal-sm"
      modalTitle="Задание пароля"
      ref="password"
    >
      <div slot="modalBody">
        <p class="text-center"><b>Вы авторизовались в своем аккаунте.</b></p>
        <p class="text-center">Чтобы иметь доступ к нему в будущем, пожалуйста, задайте новый пароль.</p>
        <new-password v-on:onPassSetted="onPassSetted" :phone="phone"></new-password>
      </div>
    </modal>

    <alert :if="showAlert" state="success" :dismissAfterSeconds="dismissCountDown">{{alertText}}</alert>

  </div>
</template>

<script>
import api from '../store/api'
import Modal from '../components/utils/Modal'
import gMapsInit from '../store/gmaps-init'
import Alert from '../components/utils/Alert'
import GoBack from '../components/inner/GoBack'
import Thumbnail from '../components/utils/Thumbnail'
import ThumbnailsOuter from '../components/utils/ThumbnailsOuter'
import NewPassword from '../components/sign/NewPassword'
import Loader from '../components/utils/Loader'
import generateMarkerIcon from '../mixins/generateMarkerIcon'
import PaymentModal from '../components/order/PaymentModal'
import RepeatOrder from '../components/order/RepeatOrder'
import FeedbackCourier from '../components/order/FeedbackCourier'
import PaymentMethod from '../components/inner/PaymentMethod'

export default {
  name: 'profile-order',
  data () {
    return {
      status: '',
      center: {lat: 59.936, lng: 30.352},
      errorMessage: '',
      courier: {},
      windowMaps: {},
      directionsDisplay: null,
      directionsService: null,
      showMap: false,
      order: {},
      showAlert: false,
      dismissCountDown: 0,
      alertText: '',
      showLoader: false,
      interval: null,
      pointToShow: false,
      showAddingCard: false,
      showDrop: false,
      markers: []
    }
  },
  components: {
    Modal,
    'GmapMap': gMapsInit.Map,
    'GmapMarker': gMapsInit.Marker,
    Alert,
    Thumbnail,
    ThumbnailsOuter,
    NewPassword,
    Loader,
    GoBack,
    PaymentModal,
    FeedbackCourier,
    PaymentMethod,
    RepeatOrder
  },
  mixins: [generateMarkerIcon],
  beforeMount () {
    this.getOrderData()
  },
  mounted () {
    if (this.$route.query.passform === true) {
      // this.toggleModal('password')
    }
  },
  watch: {
    showMap: function (val) {
      if (val) {
        this.initMap().then(() => {
          this.showMapEls()
        })
      }
    },
    status (val) {
      this.getInfoInterval(val)
    }
  },
  computed: {
    phone () {
      return this.$store.state.profile.phone
    },
    itemId () {
      return this.$route.query.id
    },
    statuses () {
      return {
        '1': this.$t('order-status.1'),
        '2': this.$t('order-status.2'),
        '3': this.$t('order-status.3'),
        '4': this.$t('order-status.4'),
        '5': this.$t('order-status.5'),
        '6': this.$t('order-status.6'),
        '7': this.$t('order-status.7'),
        '8': this.$t('order-status.8'),
        '9': this.$t('order-status.9'),
        '10': this.$t('order-status.10'),
        '11': this.$t('order-status.11'),
        '12': this.$t('order-status.12'),
        '13': this.$t('order-status.13')
      }
    },
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    },
    activePoint () {
      return Object.values(this.order.addresses).findIndex(item => { return item.is_active === true })
    }
  },
  beforeDestroy () {
    this.showMap = false
    clearInterval(this.interval)
  },
  methods: {
    initMap () {
      return gMapsInit.loaded.then(() => {
        this.windowMaps = window.google.maps
        this.directionsDisplay = new this.windowMaps.DirectionsRenderer()
        this.directionsService = new this.windowMaps.DirectionsService()
      })
    },
    showMapEls () {
      // setTimeout(() => {
      //   this.$refs.mmap.resizePreserveCenter()
      //   this.displayRoute()
      // }, 1000)
      this.$refs.mmap.$mapCreated.then(() => {
        this.displayRoute()
      })
    },
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    getInfoInterval (status) {
      clearInterval(this.interval)
      if ([1, 2, 7, 8, 12, 13].indexOf(status) === -1) {
        if (status === 4) {
          this.getOrderData()
        }
        this.interval = setInterval(() => {
          this.getOrderData()
        }, 15000)
      } else if (status === 7) {
        this.getOrderData()
      } else {
        clearInterval(this.interval)
      }
    },
    getOrderData () {
      this.showLoader = true
      let options = {
        idt_order: this.itemId
      }
      this.$http.get(api.API_REST_LINK4 + 'webclient/order', {params: options}).then((response) => {
        let data = response.data

        this.showLoader = false
        this.order = data

        this.status = this.order.idc_order_state
        this.markers = this.order.addresses.map((item) => {
          let newItem = {}
          newItem.lat = item.lat
          newItem.lng = item.lng
          return newItem
        })
        this.showMap = true
      }).catch((error) => {
        this.errorMessage = error.data.message
      })
    },
    rejectOrder () {
      this.$http.delete(api.API_REST_LINK2 + 'webclient/order/' + this.itemId).then(response => {
        clearInterval(this.interval)
        this.toggleModal('reject')
        this.getOrderData()
      })
    },
    displayRoute () {
      let waypoints = []
      for (let i = 1; i < this.markers.length - 1; i++) {
        let point = {}
        point.location = new this.windowMaps.LatLng(this.markers[i].lat, this.markers[i].lng)
        point.stopover = false
        waypoints.push(point)
      }
      if (this.markers.length >= 2) {
        this.directionsDisplay.setMap(this.$refs.mmap.$mapObject)
        this.directionsDisplay.setOptions({ suppressMarkers: true, suppressPolylines: false })
        this.directionsService.route({
          origin: this.markers[0],
          destination: this.markers[this.markers.length - 1],
          waypoints: waypoints,
          travelMode: 'WALKING',
          avoidTolls: true
        }, (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response)
          } else {
            console.log('Could not display directions due to: ' + status)
          }
        })
      }
    },
    donePayment () {
      this.getOrderData()
      this.toggleModal('payment')
    },
    onPassSetted () {
      this.toggleModal('password')
      this.dismissCountDown = 3
      this.alertText = 'Пароль успешно сменен'
    },
    setPointCenter (point) {
      this.pointToShow = (this.pointToShow === point ? false : point)

      if (this.pointToShow !== false) {
        let pos = this.markers[point]

        this.$refs.mmap.$mapObject.setCenter(pos)
        this.$refs.mmap.$mapObject.setZoom(18)
      } else {
        this.displayRoute()
      }
    }
  }
}
</script>
