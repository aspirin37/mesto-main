<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3">{{orderDone ? 'Заказ оформлен' : paymentError ? 'Ошибка оплаты' : 'Новый заказ'}}</h1>
    </div>
    <hr class="my-0">
    <div class="bg-light">

      <!-- Order done -->
      <div class="container" v-if="orderDone">
        <div class="container-sm mx-auto pb-5 pt-4">
          <order-done v-on:repeat="repeatOrder" v-on:createNew="orderDone = false" :orderData="addedOrderData"></order-done>
        </div>
      </div>
      <!-- /Order done -->

      <!-- Payment error -->
      <div class="container" v-else-if="paymentError && !orderDone">
        <div class="container-sm mx-auto pb-5 pt-4">
          <payment-error v-on:payed="setOrderDone" :orderData="errorOrderData"></payment-error>
        </div>
      </div>
      <!-- /Payment error -->

      <div class="container pb-5 pt-4 d-flex overflow-hidden" v-else>

        <!-- Sidebar -->
        <aside class="new-order-sidebar" v-bind:class="sidebarClass">
          <nav class="new-order-nav d-flex flex-column align-items-center text-center" ref="order-sidebar">

            <!-- Transport -->
            <div class="new-order-nav__block mb-3 bg-white current-shadow text-center cursor-pointer" v-scroll-to="setScrollOptions('#transport-type')">
              <div class="new-order-nav__item">
                <img src="../assets/icons/run-color.svg" alt="run" v-if="orderTransport === 1" class="new-order-nav__icon">
                <img src="../assets/icons/car-front-color.svg" alt="run" v-else class="new-order-nav__icon">
              </div>
            </div>
            <!-- /Transport -->

            <!-- Points -->
            <div class="new-order-nav__block mb-3 bg-white current-shadow">
              <draggable v-model="addressesKeys">
                <div class="new-order-nav__item relative cursor-move"
                  v-bind:class="{'new-order-nav__item--active': point === currentPoint, 'new-order-nav__item--line': point !== addressPointsNumber}"
                  v-for="(point, index) in addressPointsNumber"
                  :key="index"
                >
                  <img src="../assets/icons/drag.svg" alt="" class="new-order-nav__drag">
                  <a href="#"
                    :key="point"
                    class="address-marker d-inline-block cursor-move"
                    v-on:click="currentPoint = point"
                    v-bind:class="{'address-marker--first': point === 1,
                    'address-marker--last': point === addressPointsNumber,
                    'address-marker--disabled': !addresses.hasOwnProperty(point) && !(point === currentPoint)}"
                    v-scroll-to="setScrollOptions(`#point-${point}`)"
                  >{{$t('letters')[point - 1]}}</a>
                  <div
                    class="new-order-nav__address text-nowrap rounded p-2 current-shadow"
                    v-if="addresses[point]"
                  >
                    {{addresses[point].address || 'Адрес ' + $t('letters')[point - 1]}}
                  </div>
                </div>
              </draggable>
            </div>
            <!-- /Points -->

            <!-- Price -->
            <div class="new-order-nav__block bg-white current-shadow text-center updated-bg cursor-pointer"
              v-bind:class="{'updated-bg--active': isPriceChanged}"
              v-scroll-to="setScrollOptions('#payment')"
            >
              <div class="new-order-nav__item px-0">
                <img src="../assets/icons/wallet.svg" alt="wallet">
                <span v-if="price" class="line-height-one mt-2"><b>{{price}}</b><small class="d-block">руб.</small></span>
              </div>
            </div>
            <!-- /Price -->

          </nav>
        </aside>
        <!-- /Sidebar -->

        <!-- Content -->
        <div class="w-100 new-order-content" ref="main-content">

          <div class="d-flex flex-wrap flex-md-nowrap align-items-stretch">
            <div class="w-auto pr-md-3 order-2 order-md-1 mw-800">

              <!-- Packet -->
              <div class="bg-white rounded current-shadow p-3 p-lg-4 px-xl-5 mb-3 relative" id="transport-type">
                <div class="over-cap" v-if="isDisabled"></div>
                <h3 class="mb-3">Способ доставки</h3>
                <div class="overflow-x">
                  <transport-types class="mb-3"></transport-types>
                </div>
                <h3 class="mb-3">Посылка</h3>
                <order-packet></order-packet>
              </div>
              <!-- /Packet -->
<!--               <pre>{{$store.state.orderPackets}}</pre>
<pre>{{$store.state.orderAddresses}}</pre> -->
              <!-- Addresses -->
              <transition-group name="side-slide" mode="out-in">
                <div class="bg-white rounded relative current-shadow mb-3"
                  v-bind:class="{'current-shadow-lg': point === currentPoint}"
                  v-for="point in addressPointsNumber"
                  :key="point"
                  :id="`point-${point}`"
                >
                  <div class="over-cap" v-if="isDisabled"></div>
                  <span class="p-md-2 bg-white rounded-circle current-shadow d-inline-block address-point-title">
                    <span
                      class="address-marker d-inline-block"
                      v-bind:class="{'address-marker--first': point === 1, 'address-marker--last': point === addressPointsNumber}"
                    >{{$t('letters')[point - 1]}}</span>
                  </span>
                  <address-point
                    :valid="startValidation"
                    :isCurrent="point === currentPoint"
                    :step="point"
                    v-on:removed="addressPointsNumber--"
                    v-on:submit="pushError"
                    v-on:active="currentPoint = $event"
                  ></address-point>
                </div>
              </transition-group>
              <!-- /Addresses -->

              <button class="btn btn-light bg-white w-100 mb-3" :disabled="addressPointsNumber > 9 || isDisabled" v-on:click="addAddressPoint">
                <img src="../assets/icons/plus-circle.svg" alt="" class="mr-2">Добавить адрес
              </button>
              <p class="text-right text-muted" v-if="distances.distance">{{orderTransport === 1 ? 'Пешком ' : 'На авто '}}{{distances.distance}}, ~{{distances.duration}}</p>

              <!-- Payment -->
              <div id="payment"></div>
              <payment-type
                :price="price"
                v-on:typeSetted="payType = $event"
                v-on:error="setPaymentError"
                v-if="isAuth" ref="payment"
                v-on:added="setOrderDone"
                v-on:adding="isDisabled = $event"
              ></payment-type>
              <!-- /Payment -->

              <order-sign v-if="!isAuth"></order-sign>
              <button class="btn btn-theme btn-lg px-md-5 w-100" v-on:click="submitForms" :disabled="!isAuth || +payType === 0">Вызвать курьера</button>
            </div>

            <!-- Map -->
            <div class="order-fixed-map order-1 order-md-2 mb-3 mb-md-0" v-bind:class="mapClass">
              <div class="order-fixed-map__map h-100 current-shadow rounded overflow-hidden" ref="order-map">
                <div class="profile-order-map relative h-100 w-100">
                  <gmap-map
                    :center="center"
                    :zoom="11"
                    ref="mmap"
                    class="h-100 profile-order-map"
                    v-on:click="setMarkerByClick"
                  >
                    <gmap-marker
                      v-for="(point, index) in Object.keys(addresses)"
                      :key="index"
                      :position="{'lat': parseFloat(addresses[point].lat), 'lng': parseFloat(addresses[point].lng)}"
                      :clickable="true"
                      :draggable="isDisabled ? false : true"
                      :scrollable="false"
                      :animation="((index === currentPoint - 1) && isMarkerAnim) ? windowMaps.Animation.BOUNCE : null"
                      :zIndex="+`${(index === currentPoint - 1) ? 9 : 1}`"
                      v-on:dragstart="currentPoint = index + 1"
                      v-on:dragend="setDragPosition($event)"
                      v-on:click="center={lat: addresses[point].lat, lng: addresses[point].lng}"
                      :icon="generateMarkerIcon($t('letters')[point - 1], `${+point === 1 ? '#0B9A87' : +point === addressPointsNumber ? '#7846C3' : ''}`)"
                    ></gmap-marker>
                  </gmap-map>
                </div>
              </div>
            </div>
            <!-- /Map -->

          </div>
        </div>
        <!-- /Content -->
      </div>
    </div>
  </section>
</template>

<script>
import auth from '../auth'
import gMapsInit from '../store/gmaps-init'
import draggable from 'vuedraggable'
import VueScrollTo from 'vue-scrollto'
import AddressPoint from '../components/order/AddressPoint'
import PaymentType from '../components/order/PaymentType'
import PaymentModal from '../components/order/PaymentModal'
import OrderPacket from '../components/order/OrderPacket'
import OrderDone from '../components/order/OrderDone'
import PaymentError from '../components/order/PaymentError'
import TransportTypes from '../components/order/TransportTypes'
import OrderSign from '../components/order/OrderSign'
import generateMarkerIcon from '../mixins/generateMarkerIcon'
import areaErrorAlert from '../mixins/areaErrorAlert'

export default {
  name: 'order-block',
  data () {
    return {
      center: {lat: 59.936, lng: 30.352},
      mapLoaded: false,
      windowMaps: {},
      point: {
        lat: null,
        lng: null,
        address: ''
      },
      payType: 1,
      geocoder: null,
      transportType: 1,
      currentPoint: 1,
      addressPointsNumber: 2,
      startValidation: false,
      orderDone: false,
      paymentError: false,
      isPaymentShow: false,
      addressesErrors: {},
      addedOrderData: {},
      errorOrderData: {},
      isPriceChanged: false,
      isMarkerAnim: false,
      distances: {},
      idOrder: null,
      isDisabled: false,
      sidebarClass: '',
      mapClass: '',
      calcError: ''
    }
  },
  components: {
    AddressPoint,
    PaymentType,
    TransportTypes,
    OrderDone,
    'GmapMap': gMapsInit.Map,
    'GmapMarker': gMapsInit.Marker,
    OrderPacket,
    OrderSign,
    PaymentModal,
    draggable,
    PaymentError
  },
  mixins: [generateMarkerIcon, areaErrorAlert],
  directives: {
    'scroll-to': VueScrollTo
  },
  computed: {
    isAuth () {
      return auth.user.authenticated
    },
    currentLocation () {
      return this.$store.state.locations[this.$store.state.currentLocation]
    },
    addresses () {
      return this.$store.state.orderAddresses
    },
    addressesKeys: {
      get () {
        return Object.keys(this.addresses)
      },
      set (value) {
        this.$store.commit('REORDER_ADDRESSES', value)
      }
    },
    price () {
      return this.$store.state.orderPrice
    },
    addressesLength () {
      return Object.keys(this.addresses).length
    },
    orderTransport () {
      return this.$store.state.orderTransport
    }
  },
  beforeMount () {
    this.initMap().then(() => {
      this.showMapEls()
    })
  },
  mounted () {
    this.addressPointsNumber = this.addressesLength
    this.calPrice()
    document.addEventListener('scroll', this.stickyElements)
  },
  destroyed () {
    this.$alert.hide()
    this.removeStickyElements()
  },
  beforeRouteLeave (to, from, next) {
    if (this.orderDone) {
      this.$store.commit('CLEAR_ORDER_DATA')
    }
    next()
  },
  watch: {
    addresses: {
      handler: function (val) {
        this.isMarkersSetted(val)
      },
      deep: true
    },
    orderTransport (val, oldVal) {
      if (val !== oldVal) {
        this.isMarkersSetted(this.addresses)
      }
    },
    price (val, oldVal) {
      if (val !== oldVal) {
        this.isPriceChanged = true
        setTimeout(() => {
          this.isPriceChanged = false
        }, 600)
      }
    },
    currentPoint (val, oldVal) {
      if (val !== oldVal) {
        this.isMarkerAnim = true
        setTimeout(() => {
          this.isMarkerAnim = false
        }, 300)
      }
    }
  },
  methods: {
    calPrice () {
      this.$store.dispatch('CALC_ORDER_PRICE').then(() => {
        this.$alert.hide()
      }).catch(error => {
        this.showAreaAlertError(error)
      })
    },
    pushError (event) {
      let errors = this.addressesErrors

      Object.assign(errors, event)
      this.setErrorsEvent(Object.values(errors))
    },
    setErrorsEvent (val) {
      let allErrorsGetted = val.length === this.addressPointsNumber
      let indexOfError = val.indexOf('false')

      if (allErrorsGetted && indexOfError === -1) {
        this.goToPayment()
      } else if (allErrorsGetted && indexOfError !== -1) {
        let pointErrorIndex = +indexOfError + 1

        VueScrollTo.scrollTo('#point-' + pointErrorIndex, 300, {
          easing: 'ease-in-out',
          offset: -80
        })
      }
    },
    setCurrentMapCenter () {
      if (this.addresses[1] && this.addresses[1].lat) {
        let options = {
          lat: this.addresses[1].lat,
          lng: this.addresses[1].lng
        }
        this.center = options
      }
    },
    isMarkersSetted (val) {
      let valLength = Object.keys(val).length
      let valOne = val[1]
      if (valOne && valOne.hasOwnProperty('lat') && val[valLength] && val[valLength].hasOwnProperty('lat')) {
        this.displayRoute()
      }
    },
    initMap () {
      return gMapsInit.loaded.then(() => {
        this.windowMaps = window.google.maps
        this.geocoder = new this.windowMaps.Geocoder()
        this.directionsDisplay = new this.windowMaps.DirectionsRenderer()
        this.directionsService = new this.windowMaps.DirectionsService()
        this.mapLoaded = true
        this.center = this.currentLocation.center
      })
    },
    showMapEls () {
      this.$refs.mmap.$mapCreated.then(() => {
        this.setCurrentMapCenter()
        this.isMarkersSetted(this.addresses)
      })
    },
    addAddressPoint () {
      this.addressPointsNumber++
      this.currentPoint = this.addressPointsNumber
    },
    setOrderTransport (key, value) {
      if (this.mapLoaded) { this.isMarkersSetted(this.addresses) }
      this.setOrderTransport(key, value)
    },
    setScrollOptions (el) {
      return {
        el: el,
        duration: 300,
        easing: 'ease-in-out',
        offset: -80,
        cancelable: true,
        x: false,
        y: true
      }
    },
    submitForms () {
      this.addressesErrors = {}
      this.startValidation = !this.startValidation
    },
    goToPayment () {
      this.currentPoint = this.addressPointsNumber + 1
      this.$refs.payment.addOrder()
    },
    setAddressData () {
      let addressData = {}
      if (this.point.lat) { addressData.lat = this.point.lat }
      if (this.point.lng) { addressData.lng = this.point.lng }
      if (this.point.address) { addressData.address = this.point.address }

      if (Object.keys(addressData).length) {
        let options = {
          key: this.currentPoint || 1,
          value: addressData
        }
        this.$store.commit('SET_ORDER_ADDRESS_CORDS', {options})
        this.calPrice()
      }
    },
    setPoint (pos) {
      this.point = pos
      this.getAddress(pos).then(() => {
        this.setAddressData()
      })
    },
    getAddress (newmarker) {
      return new Promise(resolve => {
        this.geocoder.geocode({ 'location': newmarker }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              let fullAdress = `${results[0].address_components[1].long_name}, ${results[0].address_components[0].long_name}`

              this.point.address = fullAdress
              resolve()
            } else {
              console.log('No results found')
            }
          } else {
            console.log('Geocoder failed due to: ' + status)
          }
        })
      })
    },
    setDragPosition (event) {
      let newPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }

      this.setPoint(newPos)
    },
    setMarkerByClick (event) {
      if (this.isDisabled) {
        return
      }
      let newPos = {
        lat: event.lat || event.latLng.lat(),
        lng: event.lng || event.latLng.lng()
      }

      if (+this.currentPoint <= this.addressPointsNumber) {
        this.setPoint(newPos)
      }
    },
    displayRoute () {
      let waypoints = []

      for (let i = 1; i < this.addressesLength; i++) {
        let point = {}
        let address = this.addresses[i]
        if (address && address.hasOwnProperty('lat')) {
          point.location = new this.windowMaps.LatLng(address.lat || '', address.lng || '')
          point.stopover = false
          waypoints.push(point)
        }
      }

      this.directionsDisplay.setMap(this.$refs.mmap.$mapObject)
      this.directionsDisplay.setOptions({ suppressMarkers: true, suppressPolylines: false, preserveViewport: false })
      this.directionsService.route({
        origin: this.addresses[1],
        destination: this.addresses[this.addressesLength],
        waypoints: waypoints,
        travelMode: `${+this.orderTransport === 1 ? 'WALKING' : 'DRIVING'}`,
        avoidTolls: true
      }, (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response)
          this.distances = {distance: response.routes[0].legs[0].distance.text, duration: response.routes[0].legs[0].duration.text}
        } else {
          console.log('Could not display directions due to: ' + status)
        }
      })
    },
    setOrderDone (event) {
      this.removeStickyElements()
      this.orderDone = true
      this.addedOrderData = event
      window.scrollTo(0, 0)
    },
    setPaymentError (event) {
      this.removeStickyElements()
      this.errorOrderData = event
      this.paymentError = true
      window.scrollTo(0, 0)
    },
    setStickyElement (contentOffsetTop, scrollTop, contentHeight, el) {
      let element = this.$refs['order-' + el]
      let elementHeight = element.clientHeight
      let elementAtEnd = (contentHeight + contentOffsetTop) - scrollTop < elementHeight + 78

      if (scrollTop > 60 && !elementAtEnd) {
        this[el + 'Class'] = 'new-order-fixed-el'
      } else if (elementAtEnd) {
        this[el + 'Class'] = 'd-flex align-items-end'
      } else {
        this[el + 'Class'] = ''
      }
    },
    stickyElements () {
      let content = this.$refs['main-content']
      let contentOffsetTop = content.offsetTop
      let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
      let contentHeight = content.clientHeight

      this.setStickyElement(contentOffsetTop, scrollTop, contentHeight, 'map')
      this.setStickyElement(contentOffsetTop, scrollTop, contentHeight, 'sidebar')
    },
    removeStickyElements () {
      document.removeEventListener('scroll', this.stickyElements)
    },
    repeatOrder () {
      this.orderDone = false
      this.paymentError = false
    }
  }
}
</script>
