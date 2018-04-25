<template>
  <div class="bg-white rounded current-shadow p-3 widget--min-height relative p-3 p-md-4">
    <loader v-if="showLoader"></loader>
    <div class="form-group">
      <h3>{{$t('fave')}}</h3>
      <p class="text-muted">
        {{$t('favorite.fave-subtext')}}
      </p>
    </div>
    <div class="form-group mw-400">
      <autocomplete
        placehldr="Добавить адрес"
        :classNames="['form-control']"
        v-model="newAddress"
        :value="newAddress"
        :windowMaps="windowMaps"
        v-on:placeChanged="addAddress($event)"
        v-if="mapLoaded"
      ></autocomplete>
    </div>
    <p v-for="(address, index) in addresses" :key="index">
      <span class="mr-2">{{address.address}}</span>
      <a href="#" v-on:click.prevent="removeAddress(address.idt_fave_address)" title="Удалить">
        <img src="../assets/icons/close-del.svg" alt="X">
      </a>
    </p>
    <pagination
      class="mw-400"
      :moreBtn="false"
      :count="count"
      :itemsPerPage="itemsPerPage"
      v-on:pageChanged="getAddresses"
    ></pagination>
  </div>
</template>

<script>
import api from '../store/api'
import Pagination from '../components/utils/Pagination'
import Loader from '../components/utils/Loader'
import Autocomplete from '../components/utils/Autocomplete'
import gMapsInit from '../store/gmaps-init'

export default {
  name: 'profile-fave',
  data () {
    return {
      addresses: [],
      newAddress: '',
      currentOffset: null,
      showNextBtn: true,
      activeTab: 1,
      count: null,
      itemsPerPage: 7,
      windowMaps: {},
      showLoader: false,
      mapLoaded: false
    }
  },
  beforeMount () {
    this.getAddresses(0)
    // this.getFaveAddresses(0)
    gMapsInit.loaded.then(() => {
      this.windowMaps = window.google.maps
      this.mapLoaded = true
    })
  },
  components: {
    Pagination,
    Loader,
    Autocomplete
  },
  methods: {
    getAddresses (offset, perpage) {
      let options = {
        offset: offset || 0,
        limit: perpage || 7
      }
      this.$http.get(api.API_REST_LINK4 + 'webclient/fave', {params: options}).then((response) => {
        let data = response.data

        this.addresses = data.addresses
        this.count = data.count
      })
    },
    addAddress (event) {
      let options = {
        address: `${event.address_components[1].long_name}, ${event.address_components[0].long_name}`,
        lat: event.geometry.location.lat(),
        lng: event.geometry.location.lng()
      }
      this.$http.post(api.API_REST_LINK4 + 'webclient/fave', options).then(() => {
        this.newAddress = ''
        this.getAddresses()
      })
    },
    removeAddress (id) {
      this.$http.delete(api.API_REST_LINK4 + 'webclient/fave/' + id).then(() => {
        this.getAddresses()
      })
    }
  }
}
</script>
