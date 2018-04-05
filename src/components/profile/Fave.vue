<template>
  <div class="page-bottom-space">
    <div class="bg-white rounded current-shadow p-3 widget--min-height relative">
      <loader v-if="showLoader"></loader>
      <div class="text-center cap"
        v-if="!addresses && !showLoader"
      >
        <div class="cap__noresults ml-auto mr-auto"></div>
        <p class="lead cap__text">{{$t('favorite.no-fave')}}</p>
        <router-link :to="{ name: 'new-order'}" class="btn btn-success">{{$t('new-order')}}</router-link>
      </div>
      <div class="row" v-show="addresses && !showLoader">
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <h5>{{$t('fave')}}</h5>
            <p class="text-muted">
              {{$t('favorite.fave-subtext')}}
            </p>
          </div>
          <div class="form-group">
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
          <ul class="list-unstyled fave-list">
            <li v-for="(address, index) in faveAddresses" class="fave-list__item relative" :key="index">
              <span class="fave-list__star fave-list__star--active" v-on:click="toggleFave(address, true)" title="Remove from favorite">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 19.481 19.481" enable-background="new 0 0 19.481 19.481" width="24px" height="24px">
                  <g>
                    <path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z" fill="#F0F0F0"/>
                  </g>
                </svg>
              </span>
              <p>{{address.address}}</p>
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <h5>{{$t('favorite.my-addr')}}</h5>
            <p class="text-muted">
              {{$t('favorite.my-subtext')}}
            </p>
          </div>
          <ul class="list-unstyled fave-list">
            <li v-for="(address, index) in addresses" class="fave-list__item relative" :key="index">
              <span class="fave-list__star" v-on:click="toggleFave(address)" title="Add to favorite">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 19.481 19.481" enable-background="new 0 0 19.481 19.481" width="24px" height="24px">
                  <g>
                    <path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z" fill="#F0F0F0"/>
                  </g>
                </svg>
              </span>
              <p>{{address.address}}</p>
            </li>
          </ul>
          <pagination
            :moreBtn="false"
            :count="count"
            :itemsPerPage="8"
            v-on:pageChanged="getAddresses"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../store/api'
import Pagination from '../utils/Pagination'
import Loader from '../utils/Loader'
import Autocomplete from '../utils/Autocomplete'
import gMapsInit from '../../store/gmaps-init'

export default {
  name: 'profile-fave',
  data () {
    return {
      addresses: [],
      faveAddresses: [],
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
    // this.getAddresses(0)
    this.getFaveAddresses(0)
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
        limit: perpage || 7,
        only_fave: false,
        get_count: true
      }
      this.$http.post(api.API_LINK + '2/webclient/getAddresses', options).then((response) => {
        let data = response.data

        if (!data) {
          return
        }
        if (data.error !== 0) {
          this.errorMessage = data.error_description
          return
        }
        this.addresses = data.data.content
        this.count = data.data.count
      })
    },
    getNextHistory () {
      this.currentOffset += this.itemsPerPage
      this.getAddresses(this.currentOffset)
    },
    getPrevHistory () {
      this.currentOffset -= this.itemsPerPage
      this.getAddresses(this.currentOffset)
    },
    getFaveAddresses (offset) {
      this.showLoader = true
      let options = {
        offset: offset || 0,
        // limit: this.itemsPerPage,
        only_fave: true,
        get_count: true
      }
      this.$http.post(api.WEBCLIENT_URL + 'getAddresses', options).then((response) => {
        let data = response.data

        this.showLoader = false

        if (data.error === 0) {
          this.faveAddresses = data.data
          // delete this.faveAddresses.count
          this.errorMessage = ''
        } else {
          this.errorMessage = data.error_description
        }
      })
    },
    toggleFave (item, unset) {
      let options = {
        idt_address: item.idt_address,
        unset: unset || false
      }
      this.$http.post(api.WEBCLIENT_URL + 'setFaveAddress', options).then((response) => {
        let data = response.data
        if (!data) {
          return
        }
        if (data.error !== 0) {
          return
        }
        // this.getAddresses()
        this.getFaveAddresses()
      })
    },
    addAddress (event) {
      let options = {
        addr: `${event.address_components[1].long_name}, ${event.address_components[0].long_name}`,
        lat: event.geometry.location.lat(),
        long: event.geometry.location.lng()
      }
      this.$http.post(api.WEBCLIENT_URL + 'addAddress', options).then((response) => {
        let data = response.data
        if (!data) {
          return
        }
        if (data.error !== 0) {
          return
        }
        this.toggleFave(response.data.data)
        this.newAddress = ''
      })
    }
  }
}
</script>
