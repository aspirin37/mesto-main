<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3">Тарифы</h1>
    </div>
    <hr class="my-0">
    <div class="container py-5">
      <p class="mb-0 text-xlarge text-muted">
        Стоимость доставки расчитывается автоматически при совершении заказа на сайте и является окончательной.
      </p>
      <p class="text-xlarge text-muted mb-5">
        Скрытые платежи и абонентская плата отсутствуют.
      </p>
      <div class="d-flex align-items-start flex-wrap flex-sm-nowrap">
        <div class="w-100 mw-400 pb-4 pr-sm-3 pr-lg-5">
          <transport-types class="mb-3"></transport-types>
          <tariffs-item
            v-for="(tariff, index) in tariffsIds"
            :key="`tariff-${index}`"
            :color="colors[index + 1]"
            :id="tariff"
            :currentSelected="selectedTariff === tariff"
            v-on:select="selectedTariff = $event"
          ></tariffs-item>
        </div>
        <div class="w-100" style="height: 550px;">
          <div class="profile-order-map relative h-100" v-if="showMap">
            <gmap-map
              class="h-100 profile-order-map rounded overflow-hidden current-shadow"
              ref="mmap"
              :center="currentLocation.center"
              :zoom="10"
              :options="{
                styles: mapStyles
              }"
            >
              <gmap-circle
                v-for="(m, index) in subway"
                :key="`zone-${index}`"
                :options="{
                  fillColor: '#5E39BA',
                  strokeColor: '#5E39BA',
                  strokeOpacity: '0.8',
                  strokeWeight: '2',
                  fillOpacity: '0.2',
                  zIndex: '9'
                }"
                :center="{lat: +m.lat, lng: +m.lng}"
                :radius="m.radius"
              ></gmap-circle>
              <polygons-item
                v-for="(polygon, index) in polygons"
                v-on:select="selectedTariff = $event"
                :color="colors[tariffsIds.indexOf(polygon.idt_tariff) + 1]"
                :id="polygon.idt_poly"
                :selected="selectedTariff === polygon.idt_tariff"
                :key="`subway-${index}`"
              ></polygons-item>
            </gmap-map>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/store/api'
import gMapsInit from '@/store/gmaps-init'
import mapStyles from '@/mixins/mapStyles'
import PolygonsItem from '@/components/tariffs/PolygonsItem'
import TariffsItem from '@/components/tariffs/TariffsItem'
import TransportTypes from '@/components/new-order/TransportTypes'

export default {
  name: 'tariffs',
  data () {
    return {
      errorMessage: '',
      windowMaps: {},
      subway: [],
      polygons: [],
      tariffs: [],
      tariffsIds: [],
      showMap: false,
      colors: {
        1: '#417928',
        2: '#512d8a',
        3: '#2b8cca',
        4: '#2d358a',
        5: '#c73030'
      },
      selectedTariff: null
    }
  },
  components: {
    'GmapMap': gMapsInit.Map,
    PolygonsItem,
    TariffsItem,
    TransportTypes
  },
  mixins: [mapStyles],
  beforeMount () {
    this.initTariffsPage()
  },
  computed: {
    currentLocation () {
      return this.$store.state.locations[this.$store.state.currentLocation]
    }
  },
  watch: {
    currentLocation () {
      this.initTariffsPage()
      this.center = this.currentLocation.center
    }
  },
  methods: {
    initTariffsPage () {
      this.getAllPolygons().then(() => {
        this.getSubway()
      })
      gMapsInit.loaded.then(() => {
        this.windowMaps = window.google.maps
        this.center = this.currentLocation.center
      })
    },
    getSubway () {
      let options = {
        idt_city: this.currentLocation.id
      }

      this.subway = []

      this.$http.get(api.API_REST_LINK4 + 'common/subway', {params: options}).then(response => {
        this.subway = response.data.subways
      }).catch(error => {
        this.errorMessage = error.data.message
      })
    },
    getAllPolygons () {
      let options = {
        limit: 50,
        cities: this.currentLocation.id
      }

      this.polygons = []
      this.tariffsIds = []

      return this.$http.get(api.API_REST_LINK4 + 'common/poly', {params: options}).then(response => {
        this.polygons = response.data.polys
        this.tariffsIds = [...new Set(this.polygons.map(item => item.idt_tariff))].filter(item => item)
        setTimeout(() => {
          // Page shaking fix
          this.showMap = true
        }, 600)
      })
    }
  }
}
</script>
