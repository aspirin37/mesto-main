<template>
  <div class="widget-min-height relative">
    <loader v-if="showLoader"></loader>
    <div class="form-group mw-400">
      <autocomplete
        placehldr="Добавить адрес"
        :classNames="['form-control']"
        :value="newAddress"
        :windowMaps="windowMaps"
        v-model="newAddress"
        v-on:placeChanged="addAddress($event)"
        v-if="mapLoaded"
      ></autocomplete>
    </div>
    <div class="text-center cap mt-4" v-if="!addresses">
      <div class="cap__noresults ml-auto mr-auto"></div>
      <p class="lead cap__text">Нет избранных адресов</p>
    </div>
    <p v-for="(address, index) in addresses" :key="index">
      <a href="#" class="mr-2 text-dark" v-if="clickableAddr" v-on:click.prevent="$emit('selected', address)">{{address.address}}</a>
      <span class="mr-2" v-else>{{address.address}}</span>
      <a href="#" v-on:click.prevent="removeAddress(address.idt_fave_address)" title="Удалить">
        <img src="@/assets/icons/close-del.svg" alt="X">
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
import api from '@/store/api'
import gMapsInit from '@/store/gmaps-init'
import Pagination from '@/components/utils/Pagination'
import Loader from '@/components/utils/Loader'
import Autocomplete from '@/components/utils/Autocomplete'

export default {
  name: 'fave-addresses',
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
  props: {
    clickableAddr: false
  },
  beforeMount () {
    // this.getAddresses(0)
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
      this.$http.get(api.API_REST_LINK4 + 'webclient/fave', {params: options}).then(response => {
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
