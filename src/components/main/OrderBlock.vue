<template>
  <div class="row flex-lg-nowrap justify-content-stretch">
    <div class="col-12 col-md-6 pr-md-0">
      <div class="main-block__form rounded-left p-4 d-flex align-items-center justify-content-around">
        <div class="py-2 d-none d-lg-block main-block__img"><img src="../../assets/courier-window.svg" alt="main" class="mw-100"></div>
        <div class="p-md-4">
          <form class="order-form-width mb-4">
            <div class="d-flex align-items-center my-1">
              <div class="main-block__img w-25 mr-3 d-md-none"><img src="../../assets/courier-window.svg" alt="main" class="mw-100"></div>
              <h2 class="mb-4 w-100">Сервис умных<br>доставок день в день в Санкт-Петербурге</h2>
            </div>
            <div class="form-group relative">
              <input type="text" class="form-control" placeholder="Адрес «А»" v-if="!mapLoaded" disabled>
              <autocomplete
                v-else
                placehldr="Адрес «А»"
                :classNames="['form-control']"
                v-model="point.address"
                :value="point.address"
                :windowMaps="windowMaps"
                v-on:placeChanged="setMarkerFromInput"
              ></autocomplete>
              <a href="#" v-on:click.prevent="getUserLocation" class="order-form-arrow" title="Мое местоположение"></a>
            </div>
            <transport-types class="mb-3 w-100" v-on:selected="moveType = $event"></transport-types>
            <div class="form-group">
              <button v-on:click.prevent="setAddressData" class="btn btn-lg btn-theme w-100">{{point.address ? 'Вызвать курьера сюда' : 'Вызвать курьера'}}</button>
              <!-- <router-link tag="button" :to="{path: '/new-order', query: queries}" class="btn btn-lg btn-theme w-100">Вызвать курьера сюда</router-link> -->
            </div>
          </form>
          <!-- <div class="d-flex">
            <img src="../../assets/icons/antenna.svg" alt="" class="mr-3">
            <div>
              <p class="mb-0"><b>63 активных курьера</b></p>
              <span>51 пешком, 12 на авто</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 pl-md-0">
      <div class="profile-order-map relative h-100">
        <gmap-map
          :center="center"
          :zoom="11"
          ref="mmap"
          class="h-100 profile-order-map rounded-right overflow-hidden"
          v-on:click="setMarkerByClick"
        >
          <gmap-marker
            :position="getPointCords(point)"
            :clickable="true"
            :draggable="true"
            :scrollable="false"
            v-on:dragend="setDragPosition($event, 0)"
            v-on:click="center=getPointCords(point)"
            :icon="generateMarkerIcon('A', '#0B9A87')"
          ></gmap-marker>
        </gmap-map>
      </div>
    </div>
  </div>
</template>

<script>
import gMapsInit from '../../store/gmaps-init'
import Autocomplete from '../utils/Autocomplete'
import TransportTypes from '../order/TransportTypes'
import generateMarkerIcon from '../../mixins/generateMarkerIcon'

export default {
  name: 'order-block',
  data () {
    return {
      center: {lat: 59.936, lng: 30.352},
      mapLoaded: false,
      windowMaps: {},
      address: '',
      moveType: 1,
      geocoder: null,
      point: {
        position: {
          lat: null,
          lng: null
        },
        address: ''
      }
    }
  },
  components: {
    'GmapMap': gMapsInit.Map,
    'GmapMarker': gMapsInit.Marker,
    Autocomplete,
    TransportTypes
  },
  mixins: [generateMarkerIcon],
  beforeMount () {
    gMapsInit.loaded.then(() => {
      this.windowMaps = window.google.maps
      this.geocoder = new this.windowMaps.Geocoder()
      this.mapLoaded = true
      this.center = this.currentLocation.center
    })
  },
  computed: {
    currentLocation () {
      return this.$store.state.locations[this.$store.state.currentLocation]
    },
    queries () {
      let options = {}
      if (this.point.position.lat) { options.lat = this.point.position.lat }
      if (this.point.position.lng) { options.lng = this.point.position.lng }
      if (this.point.address) { options.address = this.point.address }
      return options
    }
  },
  watch: {
    currentLocation () {
      this.center = this.currentLocation.center
    }
  },
  methods: {
    getPointCords (point) {
      let cords = {
        'lat': parseFloat(point.position.lat),
        'lng': parseFloat(point.position.lng)
      }
      return cords
    },
    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.center = pos
          this.setMarkerByClick(pos)
        }, () => {
          console.log('Geolocation error')
        })
      } else {
        console.log('Browser doesn\'t support Geolocation')
      }
    },
    setPoint (pos, addr) {
      this.point.position = pos
      if (addr) {
        this.point.address = addr
      } else {
        this.getAddress(pos)
      }
    },
    setAddressData () {
      let addressData = {}
      if (this.point.position.lat) { addressData.lat = this.point.position.lat }
      if (this.point.position.lng) { addressData.lng = this.point.position.lng }
      if (this.point.address) { addressData.address = this.point.address }

      let options = {
        key: '1',
        value: addressData
      }

      this.$store.commit('SET_ORDER_ADDRESS', {options})
      this.$router.push({path: '/new-order'})
    },
    getAddress (newmarker) {
      this.geocoder.geocode({ 'location': newmarker }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let fullAdress = `${results[0].address_components[1].long_name}, ${results[0].address_components[0].long_name}`

            this.point.address = fullAdress
          } else {
            console.log('No results found')
          }
        } else {
          console.log('Geocoder failed due to: ' + status)
        }
      })
    },
    setMarkerByClick (event) {
      let newPos = {
        lat: event.lat || event.latLng.lat(),
        lng: event.lng || event.latLng.lng()
      }

      this.setPoint(newPos)
    },
    containsAll (arrayA, arrayB) {
      let success = arrayA.every((val) => arrayB.includes(val))
      return success
    },
    setMapView (place) {
      if (place.geometry.viewport) {
        this.$refs.mmap.$mapObject.fitBounds(place.geometry.viewport)
      } else {
        this.$refs.mmap.$mapObject.setCenter(place.geometry.location)
        this.$refs.mmap.$mapObject.setZoom(16)
      }
    },
    setDragPosition (event) {
      let newPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.setPoint(newPos)
    },
    setMarkerFromInput (place) {
      if (place.address_components !== undefined) {
        let newPos = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

        if (!this.containsAll(place.types, ['street_address', 'route', 'intersection', 'airport'])) {
          place.name = undefined
        }

        this.setPoint(newPos, place.name)

        this.setMapView(place)
        this.errorMessage = ''
      } else {
        this.errorMessage = 'Такой адрес не найден'
      }
    }
  }
}
</script>
