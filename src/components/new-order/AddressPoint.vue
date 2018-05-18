<template>
  <div v-on:click="$emit('active', step)">
    <div class="relative p-3 py-md-4 px-lg-4 px-xl-5">
      <form>
        <div class="row align-items-center">
          <div class="col-12 col-sm-8 mb-2 pr-sm-0">
            <div class="relative">
              <transition name="side-slide">
                <div class="address-warning current-shadow px-3 py-2 rounded cursor-pointer bg-white" v-if="addressNotFull" v-on:click="addressNotFull = false">
                  Адрес не содержит номер дома, возможно курьеру будет сложно вас найти.
                </div>
              </transition>
              <input type="text" class="form-control" placeholder="Адрес" v-if="!mapLoaded" disabled>
              <autocomplete
                v-else
                placehldr="Адрес"
                :classNames="['form-control', `${errors.has('address') ? 'border-danger' : ''}`, {'border-success' : address.length}]"
                v-model="address"
                :value="currentAddress.address"
                :windowMaps="windowMaps"
                v-on:placeChanged="setMarkerFromInput"
              ></autocomplete>
              <input type="hidden" v-model="address" name="address" v-validate="'required'">
              <!-- data-vv-validate-on="none" -->
              <a href="#" v-on:click.prevent="getUserLocation" class="order-form-arrow" title="Мое местоположение"></a>
            </div>
          </div>
          <div class="col-12 col-sm-4 mb-2 pl-sm-2">
            <input type="text" class="form-control" placeholder="Квартира или офис" v-model="room" v-on:blur="setAddressData">
          </div>
          <div class="col-12 mb-2">
            <input type="text" class="form-control" placeholder="Комментарий к адресу, необязательно" v-model="comment" v-on:blur="setAddressData">
          </div>
          <div class="col-12 col-sm-6 col-lg-4 mb-2 pr-sm-0">
            <input type="tel" class="form-control" placeholder="Телефон"
              v-masked-input="currentPhoneMask[0]"
              v-model="phone"
              name="phone"
              v-bind:class="{'border-danger' : errors.has('phone'), 'border-success' : formattedPhone.length > 10}"
              v-on:blur="setAddressData"
              v-validate="'required|min:12'"
              data-vv-validate-on="keyup"
            >
          </div>
          <div class="col-12 col-sm-6 col-lg-8 mb-2 pl-sm-2">
            <input type="text" class="form-control" v-model="name" placeholder="Имя, необязательно" v-on:blur="setAddressData">
          </div>
          <div class="col-12 col-sm-6 col-lg-4 mb-2 pr-sm-0">
            <address-time :step="step" v-on:dateSetted="setAddressData(time = $event)"></address-time>
          </div>
        </div>
      </form>
      <transition name="fade">
        <a href="#"
          class="p-2 bg-white rounded-circle current-shadow d-inline-block address-point-remove line-height-one cursor-pointer"
          title="Удалить"
          v-on:click.prevent="removeAddress"
          v-if="Object.keys(addresses).length > 2"
        >
          <img src="../../assets/icons/close-del-gray.svg" alt="X">
        </a>
      </transition>
      <!-- <div class="order-1 order-md-2 mb-2 ml-auto">
        <button type="button" class="btn btn-default px-3" v-on:click.prevent="removeAddress" :disabled="Object.keys(addresses).length <= 2">
          <img src="../../assets/icons/close-del-gray.svg" alt="X">
        </button>
      </div> -->
      <address-actions :step="step" v-if="false"></address-actions>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@/components/utils/Autocomplete'
import gMapsInit from '@/store/gmaps-init'
import AddressTime from './AddressTime'
import AddressActions from './AddressActions'
import areaErrorAlert from '@/mixins/areaErrorAlert'
import maskedInput from '@/directives/maskedInput'

export default {
  name: 'address-point',
  props: {
    step: '',
    valid: false
  },
  data () {
    return {
      geocoder: null,
      address: '',
      lat: '',
      lng: '',
      mapLoaded: false,
      office: '',
      phone: '',
      name: '',
      comment: '',
      room: '',
      time: '',
      addressNotFull: false
    }
  },
  components: {
    Autocomplete,
    AddressTime,
    AddressActions
  },
  directives: {
    maskedInput
  },
  mixins: [areaErrorAlert],
  watch: {
    valid (oldVal, val) {
      if (val !== oldVal) {
        this.validateBeforeSubmit()
      }
    }
  },
  mounted () {
    if (!Object.values(this.currentAddress).length) {
      this.setAddressData()
    }
    gMapsInit.loaded.then(() => {
      this.windowMaps = window.google.maps
      this.geocoder = new this.windowMaps.Geocoder()
      this.mapLoaded = true
    })
  },
  computed: {
    currentPhoneMask () {
      return this.$store.state.phoneMasks[this.$store.state.currentCountry]
    },
    formattedPhone () {
      return this.phone.replace(/\+|-|_|\(|\)|\s/g, '')
    },
    addresses () {
      return this.$store.state.orderAddresses
    },
    currentAddress () {
      let stateData = this.$store.state.orderAddresses[this.step]

      this.setCurrentValues(stateData)

      // if (stateData && stateData.hasOwnProperty('lat')) {
      //   this.setCurrentValues(stateData)
      // } else {
      //   this.setCurrentValues()
      // }
      return stateData || {}
    }
  },
  methods: {
    setCurrentValues (data = {}) {
      this.lat = data.lat || ''
      this.lng = data.lng || ''
      this.address = data.address || `${this.lat ? (this.lat + ', ' + this.lng) : ''}`
      this.room = data.room || ''
      this.comment = data.description || ''
      this.name = data.contact_name || ''
      this.phone = data.contact_phone ? '+' + data.contact_phone : ''
      this.time = data.contact_time || ''
    },
    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.getAddress(pos).then(() => {
            this.lat = pos.lat
            this.lng = pos.lng
            this.center = pos
            this.setAddressData()
          })
          this.$store.dispatch('GET_CURRENT_CITY', pos)
        }, () => {
          console.log('Geolocation error')
        })
      } else {
        console.log('Browser doesn\'t support Geolocation')
      }
    },
    getAddress (newmarker) {
      return new Promise(resolve => {
        this.geocoder.geocode({ 'location': newmarker }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              let fullAdress = `${results[0].address_components[1].long_name}, ${results[0].address_components[0].long_name}`

              this.address = fullAdress
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
    validateBeforeSubmit () {
      this.$validator.validateAll().then(success => {
        let errors = {}
        if (!success) {
          errors[this.step] = 'false'
          this.$emit('submit', errors)
          return
        }
        errors[this.step] = 'true'
        this.$emit('submit', errors)
        this.submitForm()
      })
    },
    submitForm () {
      this.setAddressData()
    },
    setAddressData () {
      let addressData = {}
      if (this.lat) { addressData.lat = this.lat }
      if (this.lng) { addressData.lng = this.lng }
      if (this.formattedPhone) { addressData.contact_phone = this.formattedPhone }
      if (this.address) { addressData.address = this.address }
      if (this.time) { addressData.contact_time = this.time }
      if (this.name) { addressData.contact_name = this.name }
      if (this.room) { addressData.room = this.room }
      if (this.comment) { addressData.description = this.comment }
      if (this.time) { addressData.contact_time = this.time }

      let options = {
        key: this.step,
        value: addressData
      }

      this.$store.commit('SET_ORDER_ADDRESS', {options})
      this.$store.dispatch('CALC_ORDER_PRICE').then(() => {
        this.$alert.hide()
      }).catch(error => {
        this.showAreaAlertError(error)
      })
    },
    removeAddress () {
      this.$store.commit('REMOVE_ORDER_ADDRESS', this.step)
      this.$emit('removed')
      this.$store.dispatch('CALC_ORDER_PRICE')
    },
    setMarkerFromInput (place) {
      if (place.address_components !== undefined) {
        this.address = place.name
        this.lat = place.geometry.location.lat()
        this.lng = place.geometry.location.lng()
        this.setAddressData()
        this.checkAddressNotFull(place.types)
      } else {
        // this.errorMessage = 'Такой адрес не найден'
        // return
      }
    },
    pushPacketOption (key, value) {
      this.packetOptions[key] = value
    },
    checkAddressNotFull (types) {
      this.addressNotFull = types.includes('route')
    }
  }
}
</script>
